import { productApiService } from "@/services/productApiServices";
import { transformProducts } from "@/utils/dataTransformation";
import type { FeaturedCarouselProps, Product } from "@/types/product";
import FeaturedCarouselClient from "./FeaturedCarouselClient";

export default async function FeaturedCarousel({ initialProducts }: FeaturedCarouselProps = {}) {
    let products: Product[] = initialProducts ?? [];

    if (products.length === 0) {
        try {
            const res = await productApiService.getProducts(
                { Page: 1, PageSize: 8 },
                { next: { revalidate: 60 } }
            );

            if (res.success && res.data?.products) {
                products = transformProducts(res.data.products);
            }
        } catch (error) {
            console.error("FeaturedCarousel: Failed to fetch products:", error);
        }
    }

    if (!products || products.length === 0) {
        return null;
    }

    return <FeaturedCarouselClient products={products} />;
}