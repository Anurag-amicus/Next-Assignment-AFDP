import { Suspense } from "react";
import ProductCard from "@/components/products/ProductCard";
import Pagination from "@/components/common/Pagination";
import { productApiService } from "@/services/productApiServices";
import { transformProducts } from "@/utils/dataTransformation";
import type { ProductQueryParams, Product, ProductsPageProps } from "@/types/product";

export const revalidate = 60;

export const metadata = {
    title: "Product Listing | Online Express",
    description: "Explore our extensive collection of quality products, top deals, and curated categories.",
};



export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const resolvedParams = await searchParams;
    const currentPage = Number(resolvedParams.page) || 1;

    const queryParams: ProductQueryParams = {
        Page: currentPage,
        PageSize: 8,
    };

    if (resolvedParams.search?.trim()) {
        queryParams.Search = resolvedParams.search.trim();
    }
    if (resolvedParams.categoryId) {
        queryParams.CategoryId = Number(resolvedParams.categoryId);
    }
    if (resolvedParams.brandId) {
        queryParams.BrandId = Number(resolvedParams.brandId);
    }
    if (resolvedParams.minPrice) {
        queryParams.MinPrice = Number(resolvedParams.minPrice);
    }
    if (resolvedParams.maxPrice) {
        queryParams.MaxPrice = Number(resolvedParams.maxPrice);
    }
    if (resolvedParams.minRating) {
        queryParams.MinRating = Number(resolvedParams.minRating);
    }
    if (resolvedParams.sortBy) {
        queryParams.SortBy = resolvedParams.sortBy;
    }
    if (resolvedParams.sortOrder) {
        queryParams.SortOrder = resolvedParams.sortOrder;
    }

    const response = await productApiService.getProducts(queryParams, {
        next: { revalidate: 60 },
    });

    if (!response.success) {
        throw new Error(response.error || "Failed to load product catalog from server.");
    }

    const products: Product[] = transformProducts(response.data?.products);
    const totalRecords = response.data?.totalRecords || 0;
    const totalPages = response.data?.totalPages || 1;

    const searchTerm = resolvedParams.search?.trim();

    // Sort labels for info bar
    let sortLabel: string | null = null;
    if (resolvedParams.sortBy === "name") sortLabel = "Name";
    if (resolvedParams.sortBy === "price") sortLabel = "Price";
    if (resolvedParams.sortBy === "rating") sortLabel = "Ratings";

    let directionLabel: string | null = null;
    if (resolvedParams.sortBy && resolvedParams.sortOrder) {
        if (resolvedParams.sortOrder === "asc") {
            directionLabel = resolvedParams.sortBy === "name" ? "A → Z" : "Low to High";
        } else if (resolvedParams.sortOrder === "desc") {
            directionLabel = resolvedParams.sortBy === "name" ? "Z → A" : "High to Low";
        }
    }

    return (
        <div className="w-full">
            {/* Results count & active sorting info bar */}
            <div className="w-full min-h-6 mb-3 flex items-center justify-between max-[520px]:items-start max-[520px]:gap-2.5">
                <p className="m-0 text-sm leading-none">
                    Showing {products.length} of {totalRecords} results
                    {searchTerm && ` for "${searchTerm}"`}
                </p>

                {sortLabel && directionLabel && (
                    <p className="m-0 text-muted text-xs leading-tight text-right">
                        Sorted by:{" "}
                        <strong className="text-charcoal font-bold">{sortLabel}</strong>{" "}
                        {directionLabel}
                    </p>
                )}
            </div>

            {/* Products Grid or Empty State */}
            {products.length === 0 ? (
                    <div className="min-h-80 flex flex-col items-center justify-center gap-2 border border-border text-center">
                        <p className="m-0 text-charcoal text-lg font-bold leading-normal">
                            No products found
                        </p>
                        <p className="m-0 text-muted text-sm leading-normal">
                            Try changing your search or filters.
                        </p>
                    </div>
                ) : (
                    <div className="w-full grid grid-cols-4 gap-4 max-[1100px]:grid-cols-3 max-[800px]:grid-cols-2 max-[520px]:grid-cols-1">
                        {products.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>
                )
            }

            {/* Pagination */}
            {totalPages > 1 && (
                <Suspense fallback={null}>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                    />
                </Suspense>
            )}
        </div>
    );
}
