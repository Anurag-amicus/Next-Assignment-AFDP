"use client";

import { memo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { ProductCardProps } from "@/types/product";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import QuantitySelector from "@/components/common/QuantitySelector";

const ProductCard = memo(function ProductCard({
    id,
    name,
    category,
    price,
    imageUrl,
    rating,
    onAddToCart,
}: ProductCardProps) {
    const [quantity, setQuantity] = useState(1);

    const unitPrice = price;
    const totalPrice = unitPrice * quantity;

    const handleClick = () => {
        if (onAddToCart) {
            onAddToCart(
                { id, name, category, price, imageUrl, rating },
                quantity
            );
        } else {
            console.log(`Added ${quantity}x "${name}" to cart!`);
        }
    };

    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    return (
        <Card
            variant="elevated"
            className="flex flex-col min-h-120 p-0 overflow-hidden bg-white border border-border rounded-xs shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md max-[768px]:min-h-127.5 max-[480px]:min-h-125"
        >
            <div className="relative w-full h-55 p-5 flex items-center justify-center bg-white max-[768px]:h-52.5 max-[480px]:h-57.5">
                <Link
                    href={`/products/${id}`}
                    className="flex w-full h-full items-center justify-center"
                    aria-label={`View details for ${name}`}
                >
                    <Image
                        src={imageUrl || "/product-placeholder.svg"}
                        alt={name}
                        width={220}
                        height={220}
                        unoptimized
                        className="block w-full h-full object-contain object-center transition-transform duration-250 ease hover:scale-105"
                    />
                </Link>
            </div>

            <div className="flex-1 pt-4.5 px-5 pb-5.5 flex flex-col items-center text-center">
                <div className="w-full">
                    <Link
                        href={`/products/${id}`}
                        className="no-underline block group"
                    >
                        <h2 className="w-full m-0 mb-1.75 text-orange font-display text-base font-bold leading-[1.35] tracking-[0.4px] uppercase line-clamp-2 overflow-hidden group-hover:underline">
                            {name}
                        </h2>
                    </Link>
                </div>

                <div className="w-full mt-auto flex flex-col items-center">
                    <span className="block mb-3.25 text-muted text-xs font-semibold leading-[1.3] tracking-[0.6px] uppercase">
                        {category}
                    </span>

                    <div className="flex items-center justify-center gap-1.5 mb-3.75">
                        <span className="text-orange text-lg font-bold leading-none tracking-[-2px]">
                            {"★".repeat(fullStars)}

                            <span className="text-gray-200">
                                {"★".repeat(emptyStars)}
                            </span>
                        </span>

                        <span className="ml-0.5 text-muted text-xs font-medium leading-none">
                            {rating.toFixed(1)} (1)
                        </span>
                    </div>

                    <div className="m-0 mb-4 flex items-baseline justify-center gap-1 font-display leading-[1.2]">
                        <span className="text-black text-lg font-bold leading-[1.2]">
                            ₹{price.toLocaleString("en-IN")}
                        </span>
                    </div>

                    <QuantitySelector
                        quantity={quantity}
                        onChange={setQuantity}
                        className="mb-2.5"
                    />

                    <p className="m-0 mb-4 text-black font-display text-base font-bold leading-[1.2]">
                        Total: ₹{totalPrice.toLocaleString("en-IN")}
                    </p>
                </div>

                <Button
                    onClick={handleClick}
                    className="w-42 h-13 mt-3 py-3 px-4 rounded-xs font-display text-base font-bold leading-none tracking-wide uppercase whitespace-nowrap shrink-0 hover:bg-orange-dark active:translate-y-px max-[480px]:w-45"
                >
                    ADD TO CART
                </Button>
            </div>
        </Card>
    );
});

export default ProductCard;