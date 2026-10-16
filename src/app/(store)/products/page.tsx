import { Suspense } from "react";
import ProductCard from "@/components/products/ProductCard";
import Pagination from "@/components/common/Pagination";
import { apiService } from "@/services/apiService";
import { transformProducts } from "@/utils/dataTransformation";
import type { ProductQueryParams, Product } from "@/types/product";

export const metadata = {
    title: "Product Listing | Online Express",
    description: "Explore our extensive collection of quality products, top deals, and curated categories.",
};

interface ProductsPageProps {
    searchParams: Promise<{
        search?: string;
        categoryId?: string;
        brandId?: string;
        minPrice?: string;
        maxPrice?: string;
        minRating?: string;
        sortBy?: string;
        sortOrder?: "asc" | "desc";
        page?: string;
    }>;
}

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

    let products: Product[] = [];
    let totalRecords = 0;
    let totalPages = 1;
    let error: string | null = null;

    try {
        const response = await apiService.getProducts(queryParams, { cache: "no-store" });
        if (response.success && response.data) {
            products = transformProducts(response.data.products);
            totalRecords = response.data.totalRecords;
            totalPages = response.data.totalPages;
        } else if (!response.success) {
            error = response.error;
        }
    } catch (err) {
        error = err instanceof Error ? err.message : "Failed to load products.";
    }

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
            {!error && (
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
            )}

            {/* Error state */}
            {error && (
                <div className="min-h-75 flex flex-col items-center justify-center gap-4.5 border border-border text-muted text-base text-center p-8">
                    <p className="m-0 leading-normal text-red-600">{error}</p>
                </div>
            )}

            {/* Products Grid or Empty State */}
            {!error && (
                products.length === 0 ? (
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
            )}

            {/* Pagination */}
            {!error && totalPages > 1 && (
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
