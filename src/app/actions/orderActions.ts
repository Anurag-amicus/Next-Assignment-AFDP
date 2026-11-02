"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { cartApiService } from "@/services/cartApiService";
import { addressApiService } from "@/services/addressApiService";
import { checkoutApiService } from "@/services/checkoutApiService";
import { shippingSchema } from "@/lib/validations/shippingSchema";
import { buildAddressPayload } from "@/utils/shippingHelpers";
import type { ShippingFormData } from "@/types/shipping";

export interface PlaceOrderInput {
    shippingData: ShippingFormData;
    addressId?: number | null;
    paymentMethod?: string;
}

export interface PlaceOrderResult {
    success: boolean;
    orderId?: number;
    error?: string;
    fieldErrors?: Record<string, string>;
    requireAuth?: boolean;
    message?: string;
}

export async function placeOrderAction(input: PlaceOrderInput): Promise<PlaceOrderResult> {
    // 1. Session & Auth Check
    const session = await getSession();
    if (!session.isAuthenticated || !session.accessToken) {
        return {
            success: false,
            requireAuth: true,
            error: "Please log in to complete your purchase.",
        };
    }

    // 2. Server-side Zod Validation
    let validShipping = input.shippingData;
    if (!input.addressId) {
        const validation = shippingSchema.safeParse(input.shippingData);
        if (!validation.success) {
            const fieldErrors: Record<string, string> = {};
            for (const issue of validation.error.issues) {
                const field = issue.path[0]?.toString();
                if (field && !fieldErrors[field]) {
                    fieldErrors[field] = issue.message;
                }
            }
            return {
                success: false,
                error: "Please correct the shipping information errors.",
                fieldErrors,
            };
        }
        validShipping = validation.data;
    } else if (!validShipping.shippingMethod) {
        validShipping = { ...validShipping, shippingMethod: "standard" };
    }

    const paymentMethod = input.paymentMethod || "Mock Payment";

    // 3. Cart & Empty Cart Guard
    const cartRes = await cartApiService.getCart(session.accessToken);
    const items = cartRes.success && cartRes.data ? cartRes.data : [];
    if (items.length === 0) {
        return {
            success: false,
            error: "Your cart is empty. Please add items before checking out.",
        };
    }

    try {
        let addressId = input.addressId;

        // 4. Ensure Address exists in backend
        if (!addressId) {
            const addressPayload = buildAddressPayload(validShipping, session.user?.customerId);
            const createAddrRes = await addressApiService.createAddress(
                addressPayload,
                session.accessToken
            );

            if (createAddrRes.success && createAddrRes.data?.addressId) {
                addressId = createAddrRes.data.addressId;
            }
        }

        let orderId = Math.floor(100000 + Math.random() * 900000);

        // 5. Checkout & Payment API execution
        if (addressId) {
            const checkoutRes = await checkoutApiService.checkout(
                {
                    addressId,
                    shippingMethod: validShipping.shippingMethod,
                    paymentMethod,
                },
                session.accessToken
            );

            if (checkoutRes.success && checkoutRes.data?.orderId) {
                orderId = checkoutRes.data.orderId;

                // Authorize Payment via Mock Payment API
                await checkoutApiService.mockPayment(
                    {
                        orderId,
                        paymentMethod,
                    },
                    session.accessToken
                );
            }
        }

        // 6. Clear Cart
        await cartApiService.clearCart(session.accessToken);

        // 7. Revalidate Next.js cache paths
        revalidatePath("/cart");
        revalidatePath("/orders");
        revalidatePath("/dashboard");

        return {
            success: true,
            orderId,
            message: `Order #${orderId} placed successfully!`,
        };
    } catch (err) {
        console.error("placeOrderAction error:", err);
        return {
            success: false,
            error: err instanceof Error ? err.message : "An unexpected error occurred during order placement.",
        };
    }
}
