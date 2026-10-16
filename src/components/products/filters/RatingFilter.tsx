"use client";

import { memo } from "react";
import type { RatingFilterProps } from "@/types/filterPropTypes";

const ratingOptions = [
    { label: "★★★★ & above", value: 4 },
    { label: "★★★ & above", value: 3 },
];

const RatingFilter = memo(function RatingFilter({ selectedRating, onChange }: RatingFilterProps) {
    const handleRatingChange = (rating: number) => {
        if (selectedRating === rating) {
            onChange(null);
            return;
        }

        onChange(rating);
    };

    return (
        <div className="flex flex-col gap-2.5">
            {ratingOptions.map((option) => (
                <label
                    className="group flex items-center gap-2 text-charcoal text-xs leading-tight cursor-pointer"
                    key={option.value}
                >
                    <input
                        type="checkbox"
                        checked={selectedRating === option.value}
                        onChange={() => handleRatingChange(option.value)}
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

export default RatingFilter;