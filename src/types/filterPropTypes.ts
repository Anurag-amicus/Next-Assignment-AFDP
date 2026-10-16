import type { CategoryItem, BrandItem } from "./product";

export type CategoryFilterProps = {
    categories: CategoryItem[];
    selectedCategoryId: number | null;
    onChange: (categoryId: number | null) => void;
};

export type BrandFilterProps = {
    brands: BrandItem[];
    selectedBrandId: number | null;
    onChange: (brandId: number | null) => void;
};

export type SortOption = "name" | "price" | "rating";

export type SortDirection = "asc" | "desc" | null;

export type SortFilterProps = {
    selectedSort: SortOption | null;
    selectedDirection: SortDirection;
    onSortChange: (sort: SortOption) => void;
    onDirectionChange: (direction: SortDirection) => void;
    onClearSort: () => void;
};

export type RatingFilterProps = {
    selectedRating: number | null;
    onChange: (rating: number | null) => void;
};

export type HeaderProps = {
    searchTerm?: string;
    onSearchChange?: (value: string) => void;
    cartCount?: number;
};

export interface PriceRange {
    min: number;
    max: number | null;
}

export interface PriceFilterProps {
    selectedPriceRange: PriceRange | null;
    onChange: (priceRange: PriceRange | null) => void;
}