import CtaGrid from "@/components/products/CtaGrid";
import Hero from "@/components/layout/Hero";
import FeaturedCarousel from "@/components/products/FeaturedCarousel";
import CategoryGrid from "@/components/products/CategoryGrid";
import { productApiService } from "@/services/productApiServices";
import { transformProducts } from "@/utils/dataTransformation";
import type { Product } from "@/types/product";

export const revalidate = 60;

export const metadata = {
    title: "Home | Online Express",
    description: "Welcome to Online Express - Discover top deals, featured categories, and premium products.",
};

export default async function HomePage() {
    const res = await productApiService.getProducts(
        { Page: 1, PageSize: 8 },
        { next: { revalidate: 60 } }
    );

    if (!res.success) {
        throw new Error(res.error || "Failed to load featured products from server.");
    }

    const featuredProducts: Product[] = transformProducts(res.data?.products);

    return (
        <div className="w-full">
            <Hero />
            <CtaGrid />
            <FeaturedCarousel initialProducts={featuredProducts} />
            <CategoryGrid />
        </div>
    );
}