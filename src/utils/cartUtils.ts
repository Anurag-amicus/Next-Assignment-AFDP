import type { CartItem } from "@/types/cart";

/**
 * Calculates total item quantity across all cart items.
 */
export function calculateCartCount(items: CartItem[]): number {
    return items.reduce((acc, item) => acc + item.quantity, 0);
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
