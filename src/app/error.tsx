"use client";

import { useEffect } from "react";
import Button from "@/components/common/Button";
import type { ErrorProps } from "@/types/error";

export default function RootError({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error("Root error boundary caught an error:", error);
    }, [error]);

    return (
        <div className="w-full min-h-[60vh] flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="w-full max-w-md border border-border bg-white rounded-xs p-8 shadow-xs">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-600 text-2xl font-bold">
                    !
                </div>
                <h2 className="font-display text-xl font-bold uppercase text-charcoal mb-2">
                    Something Went Wrong
                </h2>
                <p className="text-sm text-muted mb-6 leading-relaxed">
                    {error?.message ||
                        "An unexpected error occurred while loading this page. Please try again or refresh the browser."}
                </p>
                <div className="flex items-center justify-center gap-4">
                    <Button
                        variant="primary"
                        onClick={() => reset()}
                        className="h-10 px-6 font-bold uppercase text-xs tracking-wider"
                    >
                        Try Again
                    </Button>
                </div>
            </div>
        </div>
    );
}
