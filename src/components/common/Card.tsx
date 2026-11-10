import type { CardProps } from "@/types/card";
import { cn } from "@/utils/cn";
import { variantCardClasses } from "@/types/card";
function Card({
    variant = "elevated",
    children,
    className = "",
}: CardProps) {
    

    return (
        <article
            className={cn(
                "flex h-full w-full min-h-55 flex-col justify-between rounded px-9 pt-6.25 pb-5.75 font-display",
                variantCardClasses[variant],
                className
            )}
        >
            {children}
        </article>
    );
}

export default Card;