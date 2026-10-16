"use client";

import { memo } from "react";
import type { PriceFilterProps } from "@/types/filterPropTypes";

const priceOptions = [
    { label: "₹0 - ₹10,000", min: 0, max: 10000 },
    { label: "₹10,000 - ₹50,000", min: 10000, max: 50000 },
    { label: "₹50,000 - ₹1,00,000", min: 50000, max: 100000 },
    { label: "₹1,00,000 & above", min: 100000, max: null },
];

const PriceFilter = memo(function PriceFilter({
    selectedPriceRange,
    onChange,
}: PriceFilterProps) {
    const handlePriceChange = (
        min: number,
        max: number | null
    ) => {
        if (
            selectedPriceRange?.min === min &&
            selectedPriceRange?.max === max
        ) {
            onChange(null);
            return;
        }

        onChange({ min, max });
    };

    return (
        <div className="flex flex-col gap-2.5">
            {priceOptions.map((option) => (
                <label
                    className="group flex items-center gap-2 text-charcoal text-xs leading-tight cursor-pointer"
                    key={`${option.min}-${option.max}`}
                >
                    <input
                        type="checkbox"
                        checked={
                            selectedPriceRange?.min === option.min &&
                            selectedPriceRange?.max === option.max
                        }
                        onChange={() =>
                            handlePriceChange(
                                option.min,
                                option.max
                            )
                        }
                        className="w-3.5 h-3.5 m-0 accent-orange cursor-pointer"
                    />

                    <span className="select-none leading-tight group-hover:text-orange">
                        {option.label}
                    </span>
                </label>
            ))}
        </div>
    );
});

export default PriceFilter;