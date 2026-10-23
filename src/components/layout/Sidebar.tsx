"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CategoryFilter from "@/components/products/filters/CategoryFilter";
import BrandFilter from "@/components/products/filters/BrandFilter";
import PriceFilter from "@/components/products/filters/PriceFilter";
import RatingFilter from "@/components/products/filters/RatingFilter";
import SortFilter from "@/components/products/filters/SortFilter";
import type { CategoryItem, BrandItem } from "@/types/product";
import type { SortOption, SortDirection, PriceRange } from "@/types/filterPropTypes";

export interface SidebarProps {
    categories: CategoryItem[];
    brands: BrandItem[];
}

export default function Sidebar({ categories, brands }: SidebarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [filtersOpen, setFiltersOpen] = useState(false);

    // Read current filter state from URL
    const categoryIdParam = searchParams.get("categoryId");
    const selectedCategoryId = categoryIdParam ? Number(categoryIdParam) : null;

    const brandIdParam = searchParams.get("brandId");
    const selectedBrandId = brandIdParam ? Number(brandIdParam) : null;

    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    const selectedPriceRange: PriceRange | null = minPriceParam !== null
        ? {
              min: Number(minPriceParam),
              max: maxPriceParam !== null ? Number(maxPriceParam) : null,
          }
        : null;

    const ratingParam = searchParams.get("minRating");
    const selectedRating = ratingParam ? Number(ratingParam) : null;

    const sortByParam = searchParams.get("sortBy") as SortOption | null;
    const sortOrderParam = searchParams.get("sortOrder") as SortDirection;

    const updateFilters = (updates: Record<string, string | number | null | undefined>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(updates).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== "") {
                params.set(key, String(value));
            } else {
                params.delete(key);
            }
        });
        params.delete("page"); // Reset pagination on any filter change
        const queryString = params.toString();
        router.push(`/products${queryString ? `?${queryString}` : ""}`);
    };

    return (
        <aside className="w-full mt-9 p-3 border border-border bg-white sticky top-4 self-start max-[800px]:static max-[800px]:mt-0 max-[800px]:p-0">
            <button
                type="button"
                className={`w-full m-0 p-0 pb-1.75 flex items-center justify-between border-t-0 border-x-0 border-b-2 border-orange bg-transparent text-charcoal text-base font-bold leading-tight text-left cursor-pointer outline-none select-none max-[800px]:min-h-11 max-[800px]:px-3 max-[800px]:py-0 max-[800px]:border-b-0 ${
                    filtersOpen ? "max-[800px]:border-b-2 max-[800px]:border-orange" : ""
                }`}
                onClick={() => setFiltersOpen((prev) => !prev)}
                aria-expanded={filtersOpen}
            >
                <span>FILTERS</span>

                <span className="hidden text-orange text-xl font-normal leading-none max-[800px]:w-5 max-[800px]:h-5 max-[800px]:inline-flex max-[800px]:items-center max-[800px]:justify-center">
                    {filtersOpen ? "−" : "+"}
                </span>
            </button>

            <div
                className={`block max-[800px]:px-3 max-[800px]:pb-3 max-[800px]:pt-0 ${
                    filtersOpen ? "max-[800px]:block" : "max-[800px]:hidden"
                }`}
            >
                {/* ── Category Filter ── */}
                <div className="pt-2.5">
                    <h3 className="m-0 mb-2.5 text-charcoal text-xs font-bold leading-normal">
                        Category
                    </h3>

                    <CategoryFilter
                        categories={categories}
                        selectedCategoryId={selectedCategoryId}
                        onChange={(catId) => updateFilters({ categoryId: catId })}
                    />
                </div>

                {/* ── Brand Filter ── */}
                <div className="pt-2.5">
                    <h3 className="m-0 mb-2.5 text-charcoal text-xs font-bold leading-normal">
                        Brand
                    </h3>

                    <BrandFilter
                        brands={brands}
                        selectedBrandId={selectedBrandId}
                        onChange={(brandId) => updateFilters({ brandId })}
                    />
                </div>

                {/* ── Price Filter ── */}
                <div className="pt-2.5">
                    <h3 className="m-0 mb-2.5 text-charcoal text-xs font-bold leading-normal">
                        Price
                    </h3>

                    <PriceFilter
                        selectedPriceRange={selectedPriceRange}
                        onChange={(priceRange) =>
                            updateFilters({
                                minPrice: priceRange?.min,
                                maxPrice: priceRange?.max,
                            })
                        }
                    />
                </div>

                {/* ── Rating Filter ── */}
                <div className="pt-2.5">
                    <h3 className="m-0 mb-2.5 text-charcoal text-xs font-bold leading-normal">
                        Rating
                    </h3>

                    <RatingFilter
                        selectedRating={selectedRating}
                        onChange={(rating) => updateFilters({ minRating: rating })}
                    />
                </div>

                {/* ── Sort Filter ── */}
                <div className="pt-2.5">
                    <h3 className="m-0 mb-2.5 text-charcoal text-xs font-bold leading-normal">
                        Sort by
                    </h3>

                    <SortFilter
                        selectedSort={sortByParam}
                        selectedDirection={sortOrderParam}
                        onSortChange={(sort) => updateFilters({ sortBy: sort, sortOrder: sortOrderParam || "asc" })}
                        onDirectionChange={(dir) => updateFilters({ sortOrder: dir })}
                        onClearSort={() => updateFilters({ sortBy: null, sortOrder: null })}
                    />
                </div>
            </div>
        </aside>
    );
}
