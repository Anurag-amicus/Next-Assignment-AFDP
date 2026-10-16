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
