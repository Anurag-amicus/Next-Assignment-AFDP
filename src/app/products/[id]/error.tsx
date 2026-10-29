"use client";

import { useEffect } from "react";
import Link from "next/link";
import Button from "@/components/common/Button";
import type { ErrorProps } from "@/types/error";


export default function ProductDetailError({
    error,
    reset,
}: ErrorProps) {
    useEffect(() => {
        console.error("Product detail error caught by error boundary:", error);
    }, [error]);

    return (
        <div className="w-full pt-10 px-6 pb-16 max-w-2xl mx-auto text-center">
            <div className="border border-border bg-white rounded-xs p-8 shadow-xs">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-600 text-2xl font-bold">
                    !
                </div>
                <h2 className="font-display text-xl font-bold uppercase text-charcoal mb-2">
                    Something Went Wrong
                </h2>
                <p className="text-sm text-muted mb-6 leading-relaxed">
                    {error?.message ||
                        "An unexpected error occurred while loading this product. Please try again or browse our catalog."}
                </p>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                    <Button
                        variant="primary"
                        onClick={() => reset()}
                        className="h-10 px-6 font-bold uppercase text-xs tracking-wider"
                    >
                        Try Again
                    </Button>
                    <Link href="/products">
                        <Button
                            variant="generic"
                            className="h-10 px-6 font-bold uppercase text-xs tracking-wider border border-border text-charcoal hover:border-orange hover:text-orange transition-colors"
                        >
                            Browse All Products
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
