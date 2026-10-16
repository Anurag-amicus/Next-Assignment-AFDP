"use client";

import { memo, useState } from "react";
import type { BrandFilterProps } from "@/types/filterPropTypes";

const BrandFilter = memo(function BrandFilter({
    brands,
    selectedBrandId,
    onChange,
}: BrandFilterProps) {
    const [showMore, setShowMore] = useState(false);

    const visibleBrands = brands.slice(0, 4);
    const hiddenBrands = brands.slice(4);

    const handleBrandChange = (brandId: number) => {
        if (selectedBrandId === brandId) {
            onChange(null);
            return;
        }

        onChange(brandId);
    };

    const handleAllChange = () => {
        onChange(null);
    };

    const brandOption = (brand: (typeof brands)[number]) => (
        <label
            className="group flex items-center gap-2 text-charcoal text-xs leading-tight cursor-pointer"
            key={brand.brandId}
        >
            <input
                type="checkbox"
                checked={selectedBrandId === brand.brandId}
                onChange={() => handleBrandChange(brand.brandId)}
                className="w-3.5 h-3.5 m-0 accent-orange cursor-pointer"
            />

            <span className="select-none leading-tight group-hover:text-orange">
                {brand.name.toUpperCase()}
            </span>
        </label>
    );

    return (
        <div className="flex flex-col gap-2.5">
            {/* All */}
            <label className="group flex items-center gap-2 text-charcoal text-xs leading-tight cursor-pointer">
                <input
                    type="checkbox"
                    checked={selectedBrandId === null}
                    onChange={handleAllChange}
                    className="w-3.5 h-3.5 m-0 accent-orange cursor-pointer"
                />

                <span className="select-none leading-tight group-hover:text-orange">
                    All
                </span>
            </label>

            {/* First 4 brands */}
            {visibleBrands.map(brandOption)}

            {/* Remaining brands + More/Less */}
            {hiddenBrands.length > 0 && (
                <div>
                    {/* Remaining brands */}
                    <div
                        className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                            showMore
                                ? "grid-rows-[1fr]"
                                : "grid-rows-[0fr]"
                        }`}
                    >
                        <div className="overflow-hidden flex flex-col gap-2.5">
                            {hiddenBrands.map(brandOption)}
                        </div>
                    </div>

                    {/* More / Less */}
                    <button
                        type="button"
                        onClick={() => setShowMore((previous) => !previous)}
                        className={`group flex items-center gap-1 w-fit p-0 border-0 bg-transparent text-charcoal text-sm leading-tight cursor-pointer ${
                            showMore ? "mt-2.5" : ""
                        }`}
                    >
                        <span className="group-hover:text-orange">
                            {showMore ? "Less" : "More"}
                        </span>

                        <span
                            className={`w-1.5 h-1.5 border-r border-b border-charcoal transition-transform duration-300 group-hover:border-orange ${
                                showMore
                                    ? "rotate-[-135deg]"
                                    : "rotate-45"
                            }`}
                        />
                    </button>
                </div>
            )}
        </div>
    );
});

export default BrandFilter;