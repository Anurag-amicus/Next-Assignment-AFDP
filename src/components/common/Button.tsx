"use client";

import Link from "next/link";
import type { ButtonProps } from "@/types/button";
import { cn } from "@/utils/cn";
import { variantButtonClasses } from "@/types/button";

function Button({
    variant = "primary",
    children,
    disabled = false,
    onClick,
    className = "",
    type = "button",
    form,
    href,
}: ButtonProps) {
    
    const combinedClassName = cn(
        "inline-flex items-center justify-center text-center no-underline w-61.25 h-16 rounded text-lg font-semibold tracking-wide cursor-pointer font-sans transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
        variantButtonClasses[variant],
        disabled && "opacity-50 pointer-events-none cursor-not-allowed",
        className
    );

    if (href && !disabled) {
        return (
            <Link href={href} className={combinedClassName} onClick={onClick}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            form={form || undefined}
            className={combinedClassName}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;