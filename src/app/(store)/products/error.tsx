"use client";

import { useEffect } from "react";
import Button from "@/components/common/Button";
import type { ErrorProps } from "@/types/error";

export default function ProductsError({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error("Products catalog error caught by error boundary:", error);
    }, [error]);

    return (
        <div className="w-full min-h-96 flex flex-col items-center justify-center border border-border bg-white rounded-xs p-8 text-center shadow-xs">
            <div className="w-14 h-14 mb-4 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-600 text-2xl font-bold">
                !
            </div>
            <h2 className="font-display text-xl font-bold uppercase text-charcoal mb-2">
                Failed to Load Products
            </h2>
            <p className="text-sm text-muted max-w-md mb-6 leading-relaxed">
                {error?.message ||
                    "An unexpected error occurred while loading products. Please check your network connection and try again."}
            </p>
            <div className="flex items-center gap-3">
                <Button
                    variant="primary"
                    onClick={() => reset()}
                    className="h-10 px-6 font-bold uppercase text-xs tracking-wider"
                >
                    Try Again
                </Button>
            </div>
        </div>
    );
}
