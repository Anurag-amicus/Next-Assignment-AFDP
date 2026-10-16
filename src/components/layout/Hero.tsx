"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/common/Button";

function Hero() {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearchSubmit = (e: FormEvent) => {
        e.preventDefault();
        const trimmed = searchQuery.trim();
        if (trimmed) {
            router.push(`/products?search=${encodeURIComponent(trimmed)}`);
        } else {
            router.push("/products");
        }
    };

    return (
        <section
            className="relative w-full min-h-125 py-17.5 px-[7%] flex items-center justify-start text-left bg-cover bg-no-repeat bg-center max-[900px]:min-h-115 max-[900px]:py-15 max-[900px]:px-[6%] max-[768px]:min-h-125 max-[768px]:py-13.75 max-[768px]:px-6 max-[768px]:items-start max-[768px]:bg-position-[65%_center] max-[480px]:min-h-117.5 max-[480px]:py-11.25 max-[480px]:px-4.5 max-[480px]:bg-position-[68%_center]"
            style={{
                backgroundImage: `linear-gradient(90deg, rgba(255, 248, 238, 0.92) 0%, rgba(255, 248, 238, 0.65) 55%, rgba(255, 248, 238, 0.15) 100%), url(/herosection.png)`,
            }}
        >
            <div className="w-full max-w-155 flex flex-col items-start max-[768px]:max-w-140 max-[768px]:pt-6.25 max-[480px]:pt-3.75">
                <p className="m-0 mb-2 text-orange font-display text-sm font-extrabold tracking-widest uppercase max-[480px]:text-xs max-[480px]:mb-3">
                    ONLINE EXPRESS
                </p>

                <h1 className="m-0 text-black font-display text-5xl font-extrabold leading-none tracking-tight max-[900px]:text-4xl max-[480px]:text-3xl max-[480px]:leading-tight">
                    FIND THE RIGHT PRODUCTS
                </h1>

                <p className="max-w-125 mt-5.5 mb-6.5 text-charcoal text-base leading-relaxed max-[900px]:max-w-112.5 max-[768px]:mt-4.5 max-[768px]:mb-5.5 max-[480px]:max-w-82.5 max-[480px]:mt-4 max-[480px]:mb-5 max-[480px]:text-sm max-[480px]:leading-normal">
                    Discover quality products designed to fit your everyday needs.
                </p>

                {/* Hero Search Bar */}
                <form
                    onSubmit={handleSearchSubmit}
                    className="w-full max-w-130 mb-5 flex h-12 items-stretch overflow-hidden rounded-sm border border-border bg-white transition-[border-color,box-shadow] duration-200 focus-within:border-orange focus-within:ring-2 focus-within:ring-orange/20 max-[768px]:h-10.5 max-[480px]:max-w-full max-[480px]:h-10"
                >
                    <input
                        name="search-from-hero"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        aria-label="Search products"
                        className="min-w-0 flex-1 border-0 bg-transparent px-4 text-sm text-charcoal outline-none placeholder:text-muted max-[768px]:text-xs max-[480px]:px-3"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            aria-label="Clear search input"
                            className="flex shrink-0 items-center justify-center border-0 bg-transparent px-1 text-lg text-muted cursor-pointer leading-none hover:text-charcoal"
                        >
                            ×
                        </button>
                    )}
                    <button
                        type="submit"
                        aria-label="Search"
                        className="flex h-full w-12 shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0"
                    >
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="text-base text-orange max-[768px]:text-sm"
                        />
                    </button>
                </form>

                {/* Primary CTA Button */}
                <Button
                    variant="primary"
                    onClick={() => router.push("/products")}
                    className="w-45 h-13 rounded font-display text-base font-bold tracking-wider uppercase flex items-center justify-center max-[480px]:w-37.5 max-[480px]:h-11.5 max-[480px]:text-sm"
                >
                    Shop Now
                </Button>
            </div>
        </section>
    );
}

export default Hero;