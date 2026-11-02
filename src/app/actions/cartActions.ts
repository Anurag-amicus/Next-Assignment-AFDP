"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { cartApiService } from "@/services/cartApiService";
import {
    validateCartItemPayload,
    validateRemoveItemPayload,
} from "@/lib/validations/cartSchema";
import { calculateCartCount } from "@/utils/cartUtils";
import type { CartActionResult } from "@/types/cart";

/**
 * Retrieves the current authenticated user's cart.
 */
export async function getCartAction(): Promise<CartActionResult> {
    const session = await getSession();

    if (!session.isAuthenticated || !session.accessToken) {
        return {
            success: false,
            requireAuth: true,
            message: "Please log in to view your cart.",
            items: [],
            count: 0,
        };
    }

    const res = await cartApiService.getCart(session.accessToken);

    if (!res.success) {
        return {
            success: false,
            error: res.error || "Failed to load cart items from server.",
            items: [],
            count: 0,
        };
    }

    const items = res.data || [];
    return {
        success: true,
        items,
        count: calculateCartCount(items),
    };
}

/**
 * Adds an item to the cart and returns the freshly synced cart.
 */
export async function addToCartAction(rawPayload: unknown): Promise<CartActionResult> {
    // 1. Zod Validation (uses unified CartItemPayload)
    const validation = validateCartItemPayload(rawPayload);
    if (!validation.success) {
        return { success: false, error: validation.error };
    }

    // 2. Authentication check
    const session = await getSession();
    if (!session.isAuthenticated || !session.accessToken) {
        return {
            success: false,
            requireAuth: true,
            message: "Please log in to add products to your cart.",
        };
    }

    // 3. API Mutation
    const { productId, quantity } = validation.data;
    const addRes = await cartApiService.addToCart(session.accessToken, productId, quantity);
    if (!addRes.success) {
        return {
            success: false,
            error: addRes.error || "Failed to add product to cart.",
        };
    }

    // 4. Refetch fresh cart items for consistency
    const freshCart = await cartApiService.getCart(session.accessToken);
    const items = freshCart.success ? (freshCart.data || []) : [];
    const count = calculateCartCount(items);

    revalidatePath("/cart");

    return {
        success: true,
        message: addRes.data?.message || "Item added to cart successfully!",
        items,
        count,
    };
}

/**
 * Updates the quantity of a specific product in the cart.
 */
export async function updateQuantityAction(rawPayload: unknown): Promise<CartActionResult> {
    // 1. Zod Validation (uses unified CartItemPayload)
    const validation = validateCartItemPayload(rawPayload);
    if (!validation.success) {
        return { success: false, error: validation.error };
    }

    // 2. Authentication check
    const session = await getSession();
    if (!session.isAuthenticated || !session.accessToken) {
        return {
            success: false,
            requireAuth: true,
            message: "Please log in to update your cart.",
        };
    }

    // 3. API Mutation
    const { productId, quantity } = validation.data;
    const updateRes = await cartApiService.updateQuantity(session.accessToken, productId, quantity);
    if (!updateRes.success) {
        return {
            success: false,
            error: updateRes.error || "Failed to update item quantity.",
        };
    }

    // 4. Refetch fresh cart items for consistency
    const freshCart = await cartApiService.getCart(session.accessToken);
    const items = freshCart.success ? (freshCart.data || []) : [];
    const count = calculateCartCount(items);

    revalidatePath("/cart");

    return {
        success: true,
        message: "Quantity updated successfully",
        items,
        count,
    };
}

/**
 * Removes an item from the cart.
 */
export async function removeItemAction(rawPayload: unknown): Promise<CartActionResult> {
    // 1. Zod Validation
    const validation = validateRemoveItemPayload(rawPayload);
    if (!validation.success) {
        return { success: false, error: validation.error };
    }

    // 2. Authentication check
    const session = await getSession();
    if (!session.isAuthenticated || !session.accessToken) {
        return {
            success: false,
            requireAuth: true,
            message: "Please log in to manage your cart.",
        };
    }

    // 3. API Mutation
    const { productId } = validation.data;
    const removeRes = await cartApiService.removeItem(session.accessToken, productId);
    if (!removeRes.success) {
        return {
            success: false,
            error: removeRes.error || "Failed to remove item from cart.",
        };
    }

    // 4. Refetch fresh cart items for consistency
    const freshCart = await cartApiService.getCart(session.accessToken);
    const items = freshCart.success ? (freshCart.data || []) : [];
    const count = calculateCartCount(items);

    revalidatePath("/cart");

    return {
        success: true,
        message: "Item removed from cart",
        items,
        count,
    };
}

/**
 * Clears all items from the cart.
 */
export async function clearCartAction(): Promise<CartActionResult> {
    const session = await getSession();
    if (!session.isAuthenticated || !session.accessToken) {
        return {
            success: false,
            requireAuth: true,
            message: "Please log in to clear your cart.",
        };
    }

    const clearRes = await cartApiService.clearCart(session.accessToken);
    if (!clearRes.success) {
        return {
            success: false,
            error: clearRes.error || "Failed to clear shopping cart.",
        };
    }

    revalidatePath("/cart");

    return {
        success: true,
        message: "Cart cleared",
        items: [],
        count: 0,
    };
}

/**
 * Fast lookup for cart item count (used by Header and CartContext on initial page load / refresh).
 */
export async function getCartCountAction(): Promise<number> {
    const session = await getSession();
    if (!session.isAuthenticated || !session.accessToken) {
        return 0;
    }

    const res = await cartApiService.getCartCount(session.accessToken);
    return res.success && typeof res.data === "number" ? res.data : 0;
}
