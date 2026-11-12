"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { cartApiService } from "@/services/cartApiService";
import { addressApiService } from "@/services/addressApiService";
import { checkoutApiService } from "@/services/checkoutApiService";
import { orderApiService } from "@/services/orderApiService";
import { shippingSchema , orderIdSchema} from "@/lib/validations/shippingSchema";
import { buildAddressPayload } from "@/utils/shippingHelpers";
import type { ShippingFormData } from "@/types/shipping";
import type { OrderDetail } from "@/types/order";

export interface PlaceOrderInput {
    shippingData: ShippingFormData;
    addressId?: number | null;
    paymentMethod?: string;
}

export interface ReorderState {
    success: boolean;
    message: string;
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
            const addressPayload = buildAddressPayload(validShipping);
            const createAddrRes = await addressApiService.createAddress(
                addressPayload,
                session.accessToken
            );

            if (!createAddrRes.success || !createAddrRes.data?.addressId) {
                return {
                    success: false,
                    error: createAddrRes.success === false
                        ? createAddrRes.error
                        : "Failed to create shipping address.",
                };
            }
            addressId = createAddrRes.data.addressId;
        }

        // 5. Checkout & Payment API execution
        const checkoutRes = await checkoutApiService.checkout(
            {
                addressId,
                shippingMethod: validShipping.shippingMethod,
                paymentMethod,
            },
            { token: session.accessToken }
        );

        if (!checkoutRes.success || !checkoutRes.data?.orderId) {
            return {
                success: false,
                error: checkoutRes.success === false
                    ? checkoutRes.error
                    : "Order placement failed. Please verify your details and try again.",
            };
        }

        const orderId = checkoutRes.data.orderId;

        // Authorize Payment via Mock Payment API
        const paymentRes = await checkoutApiService.mockPayment(
            {
                orderId,
                paymentMethod,
            },
            { token: session.accessToken }
        );

        if (!paymentRes.success) {
            return {
                success: false,
                error: paymentRes.error || "Payment authorization failed. Please try again.",
            };
        }

        // 6. Clear Cart only after verified successful checkout and payment
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




export async function reorderAction(orderId: number): Promise<ReorderState> {
    const session = await getSession();

    if (!session.isAuthenticated || !session.accessToken) {
        return { success: false, message: "Please log in to reorder." };
    }

    const parsed = orderIdSchema.safeParse(orderId);

    if (!parsed.success) {
        return { success: false, message: "Invalid order." };
    }

    try {
        const res = await orderApiService.reorder(
            { token: session.accessToken },
            parsed.data
        );

        if (!res.success) {
            return {
                success: false,
                message: res.error ?? "Unable to reorder. Please try again.",
            };
        }

        revalidatePath("/cart");

        return {
            success: true,
            message: res.data?.message ?? "Items added to your cart successfully.",
        };
    } catch (err) {
        console.error("reorderAction error:", err);

        return {
            success: false,
            message: "Something went wrong. Please try again.",
        };
    }
}

export interface OrderDetailsActionResult {
    success: boolean;
    data?: OrderDetail | null;
    error?: string;
}

export async function getOrderDetailsAction(
    orderId: number
): Promise<OrderDetailsActionResult> {
    const session = await getSession();

    if (!session.isAuthenticated || !session.accessToken) {
        return { success: false, error: "Please log in to view order details." };
    }

    if (!orderId || typeof orderId !== "number" || orderId <= 0 || !Number.isInteger(orderId)) {
        return { success: false, error: "Invalid order reference." };
    }

    try {
        const res = await orderApiService.getOrderById(
            { token: session.accessToken },
            orderId
        );

        if (!res.success) {
            return {
                success: false,
                error: res.error || `Order #${orderId} could not be found.`,
            };
        }

        return {
            success: true,
            data: res.data,
        };
    } catch (err) {
        console.error("getOrderDetailsAction error:", err);
        return {
            success: false,
            error: "An unexpected error occurred while fetching order details.",
        };
    }
}