"use client";

import { memo, useState } from "react";
import type { CategoryFilterProps } from "@/types/filterPropTypes";

const CategoryFilter = memo(function CategoryFilter({
    categories,
    selectedCategoryId,
    onChange,
}: CategoryFilterProps) {
    const [showMore, setShowMore] = useState(false);

    const visibleCategories = categories.slice(0, 4);
    const hiddenCategories = categories.slice(4);

    const handleCategoryChange = (categoryId: number) => {
        if (selectedCategoryId === categoryId) {
            onChange(null);
            return;
        }

        onChange(categoryId);
    };

    const handleAllChange = () => {
        onChange(null);
    };

    const categoryOption = (category: (typeof categories)[number]) => (
        <label
            className="group flex items-center gap-2 text-charcoal text-xs leading-tight cursor-pointer"
            key={category.categoryId}
        >
            <input
                type="checkbox"
                checked={selectedCategoryId === category.categoryId}
                onChange={() => handleCategoryChange(category.categoryId)}
                className="w-3.5 h-3.5 m-0 accent-orange cursor-pointer"
            />

            <span className="select-none leading-tight group-hover:text-orange">
                {category.name.toUpperCase()}
            </span>
        </label>
    );

    return (
        <div className="flex flex-col gap-2.5">
            {/* All */}
            <label className="group flex items-center gap-2 text-charcoal text-xs leading-tight cursor-pointer">
                <input
                    type="checkbox"
                    checked={selectedCategoryId === null}
                    onChange={handleAllChange}
                    className="w-3.5 h-3.5 m-0 accent-orange cursor-pointer"
                />

                <span className="select-none leading-tight group-hover:text-orange">
                    All
                </span>
            </label>

            {/* First 4 categories */}
            {visibleCategories.map(categoryOption)}

            {/* Remaining categories + More/Less */}
            {hiddenCategories.length > 0 && (
                <div>
                    {/* Remaining categories */}
                    <div
                        className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                            showMore
                                ? "grid-rows-[1fr]"
                                : "grid-rows-[0fr]"
                        }`}
                    >
                        <div className="overflow-hidden flex flex-col gap-2.5">
                            {hiddenCategories.map(categoryOption)}
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

export default CategoryFilter;