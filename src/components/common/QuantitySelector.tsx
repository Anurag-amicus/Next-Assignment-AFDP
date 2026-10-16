"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";
import Button from "@/components/common/Button";
import type { QuantitySelectorProps } from "@/types/product";

export type { QuantitySelectorProps };

function QuantitySelector({
    quantity,
    onChange,
    className = "",
    disabled = false,
}: QuantitySelectorProps) {
    const [inputValue, setInputValue] = useState(String(quantity));
    const [prevQuantity, setPrevQuantity] = useState(quantity);

    if (quantity !== prevQuantity) {
        setPrevQuantity(quantity);
        setInputValue(String(quantity));
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        const value = event.target.value;

        if (value === "") {
            setInputValue("");
            return;
        }

        if (!/^\d+$/.test(value)) {
            return;
        }

        setInputValue(value);

        const numericValue = Number(value);

        if (numericValue >= 1) {
            onChange(numericValue);
        }
    };

    const handleInputBlur = () => {
        if (disabled) return;
        if (inputValue === "" || Number(inputValue) < 1) {
            setInputValue("1");
            onChange(1);
        }
    };

    const handleDecrease = () => {
        if (disabled) return;
        onChange(Math.max(1, quantity - 1));
    };

    const handleIncrease = () => {
        if (disabled) return;
        onChange(quantity + 1);
    };

    return (
        <div
            className={`flex h-8 w-fit items-center overflow-hidden rounded-full border border-border bg-white ${
                disabled ? "opacity-60 cursor-not-allowed" : ""
            } ${className}`}
        >
            <Button
                variant="generic"
                className="m-0 h-8 w-8 min-w-8 rounded-l-full rounded-r-none p-0 text-xl font-bold leading-none text-black hover:bg-orange hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                onClick={handleDecrease}
                disabled={disabled || quantity <= 1}
            >
                −
            </Button>

            <input
                name="quantity"
                className="h-7.5 w-13 border-0 border-l border-r border-border bg-white p-0 text-center text-base font-bold leading-none text-black outline-none focus:bg-surface disabled:bg-gray-100 disabled:cursor-not-allowed"
                type="text"
                inputMode="numeric"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                disabled={disabled}
                aria-label="Product quantity"
            />

            <Button
                variant="generic"
                className="m-0 h-8 w-8 min-w-8 rounded-l-none rounded-r-full p-0 text-xl font-bold leading-none text-black hover:bg-orange hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                onClick={handleIncrease}
                disabled={disabled}
            >
                +
            </Button>
        </div>
    );
}

export default QuantitySelector;
