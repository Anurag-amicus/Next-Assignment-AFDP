"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";
import Button from "@/components/common/Button";

export interface CategoryGridErrorProps {
    error?: Error;
    reset?: () => void;
}

export function CategoryGridError({ error, reset }: CategoryGridErrorProps) {
    const router = useRouter();

    const handleRetry = () => {
        startTransition(() => {
            router.refresh();
            reset?.();
        });
    };

    return (
        <section className="w-full bg-white px-6 py-10 max-[520px]:px-4.5">
            <div className="mx-auto w-full max-w-287.5">
                <div className="w-full border border-border bg-surface/30 rounded-xs p-8 text-center flex flex-col items-center justify-center">
                    <div className="w-12 h-12 mb-3 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-600 text-xl font-bold">
                        !
                    </div>
                    <h2 className="font-display text-lg font-bold uppercase text-charcoal mb-1">
                        Failed to Load Categories
                    </h2>
                    <p className="text-sm text-muted max-w-md mb-4 leading-relaxed">
                        {error?.message || "We encountered an issue fetching product categories. Please try again."}
                    </p>
                    <Button
                        variant="primary"
                        onClick={handleRetry}
                        className="w-auto h-9.5 px-5 text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                        Try Again
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default CategoryGridError;
