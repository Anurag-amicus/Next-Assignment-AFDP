import Button from "@/components/common/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "404 - Page Not Found | Online Express",
    description: "The page you are looking for could not be found.",
};

export default function NotFound() {
    return (
        <div className="w-full min-h-[70vh] flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="w-full max-w-lg border border-border bg-white rounded-xs p-8 sm:p-12 shadow-xs">
                {/* 404 Badge */}
                <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-orange-light border border-orange/20 flex items-center justify-center text-orange text-2xl font-display font-extrabold tracking-wider">
                    404
                </div>

                <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase text-charcoal mb-3 tracking-wide">
                    Page Not Found
                </h1>

                <p className="text-sm text-muted mb-8 leading-relaxed max-w-md mx-auto">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                    <Button
                        href="/"
                        variant="primary"
                        className="h-11 px-6 font-bold uppercase text-xs tracking-wider cursor-pointer"
                    >
                        Back to Home
                    </Button>

                    <Button
                        href="/products"
                        variant="secondary"
                        className="h-11 px-6 font-bold uppercase text-xs tracking-wider border border-border cursor-pointer hover:border-charcoal transition-colors"
                    >
                        Browse Products
                    </Button>
                </div>
            </div>
        </div>
    );
}

