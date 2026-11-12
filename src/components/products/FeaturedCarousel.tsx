import dynamic from "next/dynamic";
import { productApiService } from "@/services/productApiServices";
import { transformProducts } from "@/utils/dataTransformation";
import { FeaturedCarouselSkeleton } from "./FeaturedCarouselSkeleton";
import FeaturedCarouselError from "./FeaturedCarouselError";
import type { FeaturedCarouselProps, Product } from "@/types/product";

const FeaturedCarouselClient = dynamic(
    () => import("./FeaturedCarouselClient"),
    { loading: () => <FeaturedCarouselSkeleton /> }
);

export default async function FeaturedCarousel({ initialProducts }: FeaturedCarouselProps = {}) {
    let products: Product[] = initialProducts ?? [];
    let fetchError: Error | null = null;

    if (products.length === 0) {
        try {
            const res = await productApiService.getProducts(
                { Page: 1, PageSize: 8 },
                { next: { revalidate: 60 } }
            );

            if (!res.success) {
                fetchError = new Error(res.error || "Failed to load featured products.");
            } else if (!res.data?.products || res.data.products.length === 0) {
                fetchError = new Error("No featured products found.");
            } else {
                products = transformProducts(res.data.products);
            }
        } catch (error) {
            fetchError = error instanceof Error ? error : new Error("Failed to load featured products.");
        }
    }

    if (fetchError) {
        return <FeaturedCarouselError error={fetchError} />;
    }

    if (!products || products.length === 0) {
        return null;
    }

    return <FeaturedCarouselClient products={products} />;
}