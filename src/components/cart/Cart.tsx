import Link from "next/link";
import Button from "@/components/common/Button";
import CartItem from "./CartItem";
import CartSkeleton from "./CartSkeleton";
import type { CartItem as CartItemType } from "@/types/cart";

export interface CartProps {
    items: CartItemType[];
    loading?: boolean;
    error?: string | null;
    onClearError?: () => void;
    onUpdateQuantity: (productId: number, quantity: number) => void;
    onRemove: (productId: number) => void;
    onClearCart?: () => void;
    actionLoadingId?: number | null;
}

export default function Cart({
    items,
    loading = false,
    error = null,
    onClearError,
    onUpdateQuantity,
    onRemove,
    actionLoadingId = null,
}: CartProps) {
    return (
        <div className="w-full flex flex-col gap-3">
            <div className="grid grid-cols-12 items-center gap-4 bg-charcoal text-white px-4 py-3.5 rounded-xs font-display text-sm font-bold uppercase tracking-wider leading-none max-[640px]:hidden">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Unit Price</div>
                <div className="col-span-3 text-center">Qty</div>
                <div className="col-span-2 text-right">Total</div>
            </div>

            {loading ? (
                <CartSkeleton />
            ) : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 bg-white border border-border rounded-xs text-center">
                    <div className="text-5xl mb-4">🛒</div>
                    <h3 className="m-0 mb-2 font-display text-xl font-bold text-black uppercase">
                        Your Cart is Empty
                    </h3>
                    <p className="m-0 mb-6 text-sm text-muted max-w-sm">
                        Looks like you have not added anything to your cart yet. Explore our catalog and find something you like!
                    </p>
                    <Link href="/products">
                        <Button
                            variant="primary"
                            className="w-auto h-11 px-6 text-sm font-bold uppercase tracking-wider"
                        >
                            Browse Products
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {items.map((item) => (
                        <CartItem
                            key={item.productId}
                            item={item}
                            onUpdateQuantity={onUpdateQuantity}
                            onRemove={onRemove}
                            isActionLoading={actionLoadingId === item.productId}
                        />
                    ))}
                </div>
            )}

            {error && (
                <div className="flex items-center justify-between p-3.5 bg-red-50 border border-red-300 rounded-xs text-red-700 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-base">⚠️</span>
                        <span>{error}</span>
                    </div>
                    {onClearError && (
                        <button
                            type="button"
                            onClick={onClearError}
                            className="text-red-700 font-bold hover:text-red-900 cursor-pointer border-0 bg-transparent text-base p-1"
                            aria-label="Dismiss error"
                        >
                            ✕
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
