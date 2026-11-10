"use client";

import { useEffect } from "react";
import "./globals.css";
import Button from "@/components/common/Button";
import type { ErrorProps } from "@/types/error";

export default function GlobalError({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error("Global critical error caught by global-error boundary:", error);
    }, [error]);

    return (
        <html lang="en" className="h-full antialiased">
            <body className="min-h-full flex items-center justify-center bg-white text-black font-sans p-6">
                <div className="w-full max-w-md border border-border bg-white rounded-xs p-8 text-center shadow-xs">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-600 text-2xl font-bold">
                        !
                    </div>
                    <h2 className="font-display text-xl font-bold uppercase text-charcoal mb-2">
                        Something Went Wrong
                    </h2>
                    <p className="text-sm text-muted mb-6 leading-relaxed">
                        {error?.message ||
                            "A critical system error occurred. Please try again or refresh your browser."}
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <Button
                            variant="primary"
                            onClick={() => reset()}
                            className="h-10 px-6 font-bold uppercase text-xs tracking-wider cursor-pointer"
                        >
                            Try Again
                        </Button>
                    </div>
                </div>
            </body>
        </html>
    );
}
