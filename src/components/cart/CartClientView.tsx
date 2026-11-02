"use client";

import { useState, useTransition } from "react";
import Cart from "./Cart";
import OrderSummary from "./OrderSummary";
import {
    updateQuantityAction,
    removeItemAction,
    clearCartAction,
} from "@/app/actions/cartActions";
import { notifyCartUpdated } from "@/utils/cartUtils";
import toast from "react-hot-toast";
import type { CartItem } from "@/types/cart";

export interface CartClientViewProps {
    initialItems: CartItem[];
}

export default function CartClientView({ initialItems }: CartClientViewProps) {
    const [items, setItems] = useState<CartItem[]>(initialItems);
    const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [, startTransition] = useTransition();

    const handleUpdateQuantity = (productId: number, quantity: number) => {
        setActionLoadingId(productId);
        setError(null);

        startTransition(async () => {
            const res = await updateQuantityAction({ productId, quantity });
            setActionLoadingId(null);

            if (res.success && res.items) {
                setItems(res.items);
                notifyCartUpdated(res.count);
            } else {
                setError(res.error || "Failed to update item quantity.");
                toast.error(res.error || "Failed to update item quantity.");
            }
        });
    };

    const handleRemoveItem = (productId: number) => {
        setActionLoadingId(productId);
        setError(null);

        startTransition(async () => {
            const res = await removeItemAction({ productId });
            setActionLoadingId(null);

            if (res.success && res.items) {
                setItems(res.items);
                notifyCartUpdated(res.count);
                toast.success("Item removed from cart.");
            } else {
                setError(res.error || "Failed to remove item.");
                toast.error(res.error || "Failed to remove item.");
            }
        });
    };

    const handleClearCart = () => {
        setActionLoadingId(-1);
        setError(null);

        startTransition(async () => {
            const res = await clearCartAction();
            setActionLoadingId(null);

            if (res.success) {
                setItems([]);
                notifyCartUpdated(0);
                toast.success("Cart cleared.");
            } else {
                setError(res.error || "Failed to clear cart.");
                toast.error(res.error || "Failed to clear cart.");
            }
        });
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6">
                <h1 className="m-0 font-display text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
                    Shopping Cart
                    {items.length > 0 ? ` (${items.length} ${items.length === 1 ? "Item" : "Items"})` : ""}
                </h1>

                {items.length > 0 && (
                    <button
                        type="button"
                        onClick={handleClearCart}
                        disabled={actionLoadingId !== null}
                        className="text-xs text-muted hover:text-red-600 hover:underline cursor-pointer border-0 bg-transparent p-0 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        {actionLoadingId === -1 ? "Clearing..." : "Clear Cart"}
                    </button>
                )}
            </div>

            <div className="grid grid-cols-12 gap-6 items-start max-[990px]:grid-cols-1">
                <div className="col-span-8 max-[990px]:col-span-1 min-w-0">
                    <Cart
                        items={items}
                        error={error}
                        onClearError={() => setError(null)}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemove={handleRemoveItem}
                        actionLoadingId={actionLoadingId}
                    />
                </div>

                <div className="col-span-4 max-[990px]:col-span-1 sticky top-6 self-start">
                    <OrderSummary items={items} />
                </div>
            </div>
        </div>
    );
}
