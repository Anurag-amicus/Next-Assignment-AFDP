import { z } from "zod";
import type { CartItemPayload } from "@/types/cart";

/**
 * Unified Zod schema for both adding and updating cart items.
 */
export const cartItemPayloadSchema = z.object({
    productId: z.coerce
        .number({ message: "Product ID must be a number" })
        .int("Product ID must be an integer")
        .positive("Product ID must be a positive number"),
    quantity: z.coerce
        .number({ message: "Quantity must be a number" })
        .int("Quantity must be an integer")
        .min(1, "Quantity must be at least 1")
        .max(99, "Quantity cannot exceed 99"),
});

/**
 * Zod schema for removing an item from the cart.
 */
export const removeCartItemSchema = z.object({
    productId: z.coerce
        .number({ message: "Product ID must be a number" })
        .int("Product ID must be an integer")
        .positive("Product ID must be a positive number"),
});

/**
 * Helper to validate CartItemPayload from JSON object or FormData.
 */
export function validateCartItemPayload(
    raw: unknown
): { success: true; data: CartItemPayload } | { success: false; error: string } {
    let payload = raw;
    if (raw instanceof FormData) {
        payload = Object.fromEntries(raw.entries());
    }

    const result = cartItemPayloadSchema.safeParse(payload);
    if (!result.success) {
        return {
            success: false,
            error: result.error.issues?.[0]?.message || "Invalid cart item data",
        };
    }

    return { success: true, data: result.data };
}

/**
 * Helper to validate productId for item removal.
 */
export function validateRemoveItemPayload(
    raw: unknown
): { success: true; data: { productId: number } } | { success: false; error: string } {
    let payload = raw;
    if (raw instanceof FormData) {
        payload = Object.fromEntries(raw.entries());
    }

    const result = removeCartItemSchema.safeParse(payload);
    if (!result.success) {
        return {
            success: false,
            error: result.error.issues?.[0]?.message || "Invalid product ID",
        };
    }

    return { success: true, data: result.data };
}
