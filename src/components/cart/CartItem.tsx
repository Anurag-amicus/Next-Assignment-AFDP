import { memo } from "react";
import Image from "next/image";
import QuantitySelector from "@/components/common/QuantitySelector";
import type { CartItem as CartItemType } from "@/types/cart";

export interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (productId: number, quantity: number) => void;
    onRemove: (productId: number) => void;
    isActionLoading?: boolean;
}

const CartItem = memo(function CartItem({
    item,
    onUpdateQuantity,
    onRemove,
    isActionLoading = false,
}: CartItemProps) {
    const fallbackImage = "/product-placeholder.svg";

    return (
        <div className="grid grid-cols-12 items-center gap-4 bg-white p-4 border border-border rounded-xs transition-shadow hover:shadow-xs max-[640px]:grid-cols-1 max-[640px]:gap-3">
            <div className="col-span-5 flex items-center gap-3.5 max-[640px]:col-span-1">
                <div className="h-18 w-18 shrink-0 flex items-center justify-center p-1.5 border border-border rounded-xs bg-white">
                    <Image
                        src={item.imageUrl || fallbackImage}
                        alt={item.productName}
                        onError={(e) => {
                            e.currentTarget.src = fallbackImage;
                        }}
                        className="h-full w-full object-contain"
                        width={50}
                        height={50}
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="m-0 font-display text-sm font-bold text-black leading-snug line-clamp-2">
                        {item.productName}
                    </h3>
                    <span className="text-xs text-muted block mt-0.5">
                        #PRD-{item.productId}
                    </span>
                    <button
                        type="button"
                        onClick={() => onRemove(item.productId)}
                        disabled={isActionLoading}
                        className="mt-1 inline-block text-xs font-semibold text-red-600 hover:text-red-700 hover:underline cursor-pointer border-0 bg-transparent p-0 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {isActionLoading ? "Removing..." : "Remove"}
                    </button>
                </div>
            </div>

            <div className="col-span-2 text-center text-sm font-semibold text-charcoal max-[640px]:col-span-1 max-[640px]:flex max-[640px]:justify-between">
                <span className="hidden text-xs text-muted max-[640px]:inline">Unit Price:</span>
                <span>₹{item.price.toFixed(2)}</span>
            </div>

            <div className="col-span-3 flex justify-center max-[640px]:col-span-1 max-[640px]:justify-between max-[640px]:items-center">
                <span className="hidden text-xs text-muted max-[640px]:inline">Quantity:</span>
                <QuantitySelector
                    quantity={item.quantity}
                    onChange={(newQty) => onUpdateQuantity(item.productId, newQty)}
                    disabled={isActionLoading}
                />
            </div>

            <div className="col-span-2 text-right font-display text-base font-bold text-orange max-[640px]:col-span-1 max-[640px]:flex max-[640px]:justify-between">
                <span className="hidden text-xs text-muted max-[640px]:inline">Total:</span>
                <span>₹{item.itemSubtotal.toFixed(2)}</span>
            </div>
        </div>
    );
});

export default CartItem;
