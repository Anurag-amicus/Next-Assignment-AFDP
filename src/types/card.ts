import type { ReactNode } from "react";

export type CardProps = {
    variant?: "elevated" | "bordered" | "flat";
    children: ReactNode;
    className?: string;
};

export type CtaCardProps = {
    title: string;
    description: string;
    buttonText: string;
    icon?: ReactNode;
    variant?: "elevated" | "bordered" | "flat";
    buttonvariant?: "primary" | "secondary" | "outline" | "danger" | "generic";
};


export const variantCardClasses = {
        elevated:
            "bg-white border border-surface shadow-[0_3px_8px_rgba(0,0,0,0.18)]",

        bordered:
            "bg-white border-2 border-subtle shadow-none",

        flat:
            "bg-surface border border-surface shadow-none",
    };