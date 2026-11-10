import { Suspense } from "react";
import CtaGrid from "@/components/products/CtaGrid";
import Hero from "@/components/layout/Hero";
import FeaturedCarousel from "@/components/products/FeaturedCarousel";
import CategoryGrid from "@/components/products/CategoryGrid";
import { FeaturedCarouselSkeleton } from "@/components/products/FeaturedCarouselSkeleton";
import { CategoryGridSkeleton } from "@/components/products/CategoryGridSkeleton";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Home",
    description: "Welcome to Online Express - Discover top deals, featured categories, and premium products.",
};



export default function HomePage() {
    return (
        <div className="w-full">
            <Hero />
            <CtaGrid />
            <Suspense fallback={<FeaturedCarouselSkeleton />}>
                <FeaturedCarousel />
            </Suspense>
            <Suspense fallback={<CategoryGridSkeleton />}>
                <CategoryGrid />
            </Suspense>
        </div>
    );
}