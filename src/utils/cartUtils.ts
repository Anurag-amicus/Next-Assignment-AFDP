import type { CartItem } from "@/types/cart";

/**
 * Calculates distinct item count across all cart items.
 */
export function calculateCartCount(items: CartItem[]): number {
    return items.length;
}

/**
 * Calculates cart subtotal using itemSubtotal or unit price * quantity.
 */
export function calculateCartSubtotal(items: CartItem[]): number {
    return items.reduce(
        (sum, item) => sum + (item.itemSubtotal ?? item.price * item.quantity),
        0
    );
}
