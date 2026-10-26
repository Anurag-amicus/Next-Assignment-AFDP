export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    imageUrl: string;
    image?: string;
    rating: number;
    description?: string;
    brandName?: string;
}

export interface BrandItem {
    brandId: number;
    name: string;
}

export type BrandResponse = BrandItem[];

export interface CategoryItem {
    categoryId: number;
    name: string;
}

export type CategoryResponse = CategoryItem[];

export interface ProductQueryParams {
    Search?: string;
    CategoryId?: number;
    BrandId?: number;
    MinPrice?: number;
    MaxPrice?: number;
    MinRating?: number;
    SortBy?: string;
    SortOrder?: "asc" | "desc";
    Page?: number;
    PageSize?: number;
}

export interface ProductResponse {
    productId: number;
    name: string;
    description: string;
    categoryId: number;
    categoryName: string;
    brandId: number;
    brandName: string;
    price: number;
    rating: number;
}

export interface ProductCreateInput {
    name: string;
    description?: string;
    categoryId: number;
    brandId?: number;
    price: number;
    rating?: number;
}

export interface ProductUpdateInput {
    name?: string;
    description?: string;
    categoryId?: number;
    brandId?: number;
    price?: number;
    rating?: number;
}

export interface QuantitySelectorProps {
    quantity: number;
    onChange: (value: number) => void;
    className?: string;
    disabled?: boolean;
}

export interface ProductCardProps extends Product {
    onAddToCart?: (product: Product, quantity: number) => void;
}

export interface FeaturedCarouselProps {
    onAddToCart?: (product: Product, quantity: number) => void;
    initialProducts?: Product[];
}

export interface ProductsPageProps {
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