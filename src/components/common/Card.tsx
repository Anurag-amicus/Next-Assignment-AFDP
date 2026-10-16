import type { CardProps } from "@/types/card";
import { cn } from "@/utils/cn";

function Card({
    variant = "elevated",
    children,
    className = "",
}: CardProps) {
    const variantClasses = {
        elevated:
            "bg-white border border-surface shadow-[0_3px_8px_rgba(0,0,0,0.18)]",

        bordered:
            "bg-white border-2 border-subtle shadow-none",

        flat:
            "bg-surface border border-surface shadow-none",
    };

    return (
        <article
            className={cn(
                "flex h-full w-full min-h-55 flex-col justify-between rounded px-9 pt-6.25 pb-5.75 font-display",
                variantClasses[variant],
                className
            )}
        >
            {children}
        </article>
    );
}

export default Card;