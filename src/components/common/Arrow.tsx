import type { ArrowProps } from "@/types/button";
import { cn } from "@/utils/cn";

function Arrow({
    direction,
    className = "",
    ariaLabel
}: ArrowProps) {
    return (
        <button
            type="button"
            className={cn(
                "flex w-7 h-7 p-0 items-center justify-center bg-transparent border-0 text-orange cursor-pointer z-20",
                direction === "left" && "rotate-180",
                className
            )}
            aria-label={ariaLabel}
        >
            <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 320 512"
                className="block w-4 h-6.5 fill-current"
            >
                <path
                    fill="currentColor"
                    d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
                />
            </svg>
        </button>
    );
}

export default Arrow;