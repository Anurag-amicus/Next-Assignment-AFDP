import type { ReactNode } from "react";

export type ButtonProps = {
    variant?: "primary" | "secondary" | "outline" | "danger" | "generic";
    children: ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    form?: string;
    href?: string;
};

export type ArrowProps = {
    direction: "left" | "right";
    className?: string;
    ariaLabel: string;
};


export const variantButtonClasses = {
        primary:
            "bg-orange text-white border-2 border-orange hover:bg-orange-dark hover:border-orange-dark",

        secondary:
            "bg-white text-black border-2 border-black hover:bg-black hover:border-black hover:text-white",

        outline:
            "bg-white text-orange border-2 border-orange hover:bg-orange hover:border-orange hover:text-white",

        danger:
            "bg-red-700 text-white border-2 border-red-700 hover:bg-red-800 hover:border-red-800",

        generic:
            "bg-transparent border-none text-inherit hover:bg-transparent hover:border-transparent",
    };
