import type { ReactNode } from "react";

export type ButtonProps = {
    variant?: "primary" | "secondary" | "outline" | "danger" | "generic";
    children: ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    form?: string;
};

export type ArrowProps = {
    direction: "left" | "right";
    className?: string;
    ariaLabel: string;
};
