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

/**
 * Dispatches a client-side event so Header and other components update reactively.
 */
export function notifyCartUpdated(count?: number): void {
    if (typeof window !== "undefined") {
        window.dispatchEvent(
            new CustomEvent("cart:updated", {
                detail: { count },
            })
        );
    }
}
