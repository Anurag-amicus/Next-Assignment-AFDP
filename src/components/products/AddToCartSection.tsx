"use client";

import { useState } from "react";
import QuantitySelector from "@/components/common/QuantitySelector";
import Button from "@/components/common/Button";
import type { Product } from "@/types/product";

export interface AddToCartSectionProps {
    product: Product;
    onAddToCart?: (product: Product, quantity: number) => void;
}

export default function AddToCartSection({
    product,
    onAddToCart,
}: AddToCartSectionProps) {
    const [quantity, setQuantity] = useState(1);
    const [addedSuccess, setAddedSuccess] = useState(false);

    const totalPrice = product.price * quantity;

    const handleAddToCart = () => {
        if (onAddToCart) {
            onAddToCart(product, quantity);
        } else {
            console.log(`Added ${quantity}x "${product.name}" to cart!`);
        }

        setAddedSuccess(true);
        setTimeout(() => setAddedSuccess(false), 2500);
    };

    return (
        <div className="bg-surface border border-border rounded-xs p-4 mb-6">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <span className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                    Quantity
                </span>
                <span className="text-sm font-bold text-charcoal font-display">
                    Total: ₹{totalPrice.toLocaleString("en-IN")}
                </span>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
                <QuantitySelector
                    quantity={quantity}
                    onChange={setQuantity}
                />

                <Button
                    variant="primary"
                    onClick={handleAddToCart}
                    className="flex-1 min-w-44 h-11 text-xs font-bold uppercase tracking-wider"
                >
                    ADD TO CART
                </Button>
            </div>

            {/* Added to Cart Feedback Toast */}
            {addedSuccess && (
                <div className="mt-3 p-2.5 bg-green-50 border border-green-200 text-green-700 text-xs font-medium rounded-xs transition-opacity duration-200">
                    ✓ Added {quantity} item(s) to your shopping cart!
                </div>
            )}
        </div>
    );
}
