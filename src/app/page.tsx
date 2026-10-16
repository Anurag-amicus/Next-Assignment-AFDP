import CtaGrid from "@/components/products/CtaGrid";
import Hero from "@/components/layout/Hero";
import FeaturedCarousel from "@/components/products/FeaturedCarousel";
import CategoryGrid from "@/components/products/CategoryGrid";

export const metadata = {
    title: "Home | Online Express",
    description: "Welcome to Online Express - Discover top deals, featured categories, and premium products.",
};

export default function HomePage() {
    return (
        <div className="w-full">
            <Hero />
            <CtaGrid />
            <FeaturedCarousel />
            <CategoryGrid />
        </div>
    );
}