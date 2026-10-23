import { NextRequest, NextResponse } from "next/server";
import { productApiService } from "@/services/productApiServices";
import {
    transformProducts,
    transformProduct,
    validateAndTransformCreatePayload,
} from "@/utils/dataTransformation";
import type { ProductQueryParams } from "@/types/product";

/**
 * GET /api/products
 * Proxies request to upstream .NET search endpoint with pagination, filtering, and sorting.
 * Returns transformed paginated products and total counts.
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
        const pageSize = searchParams.get("pageSize") ? Number(searchParams.get("pageSize")) : 8;

        if (isNaN(page) || page < 1) {
            return NextResponse.json(
                { error: "Page parameter must be a positive integer." },
                { status: 400 }
            );
        }

        if (isNaN(pageSize) || pageSize < 1 || pageSize > 100) {
            return NextResponse.json(
                { error: "PageSize parameter must be between 1 and 100." },
                { status: 400 }
            );
        }

        const queryParams: ProductQueryParams = {
            Page: page,
            PageSize: pageSize,
        };

        const search = searchParams.get("search");
        if (search?.trim()) queryParams.Search = search.trim();

        const categoryId = searchParams.get("categoryId");
        if (categoryId && !isNaN(Number(categoryId))) queryParams.CategoryId = Number(categoryId);

        const brandId = searchParams.get("brandId");
        if (brandId && !isNaN(Number(brandId))) queryParams.BrandId = Number(brandId);

        const minPrice = searchParams.get("minPrice");
        if (minPrice && !isNaN(Number(minPrice))) queryParams.MinPrice = Number(minPrice);

        const maxPrice = searchParams.get("maxPrice");
        if (maxPrice && !isNaN(Number(maxPrice))) queryParams.MaxPrice = Number(maxPrice);

        const minRating = searchParams.get("minRating");
        if (minRating && !isNaN(Number(minRating))) queryParams.MinRating = Number(minRating);

        const sortBy = searchParams.get("sortBy");
        if (sortBy) queryParams.SortBy = sortBy;

        const sortOrder = searchParams.get("sortOrder");
        if (sortOrder === "asc" || sortOrder === "desc") queryParams.SortOrder = sortOrder;

        const result = await productApiService.getProducts(queryParams, { cache: "no-store" });

        if (!result.success) {
            return NextResponse.json(
                { error: result.error || "Failed to fetch products from upstream service." },
                { status: result.status ?? 502 }
            );
        }

        const transformedProducts = transformProducts(result.data.products);

        return NextResponse.json(
            {
                products: transformedProducts,
                page: result.data.page,
                pageSize: result.data.pageSize,
                totalRecords: result.data.totalRecords,
                totalPages: result.data.totalPages,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "An unexpected error occurred while fetching products.",
            },
            { status: 500 }
        );
    }
}

/**
 * POST /api/products
 * Validates incoming body, converts to .NET DTO shape, and forwards to .NET create endpoint.
 * Returns 201 with the created product in React shape.
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json().catch(() => null);

        if (!body) {
            return NextResponse.json(
                { error: "Invalid JSON in request body." },
                { status: 400 }
            );
        }

        const validation = validateAndTransformCreatePayload(body);
        if (!validation.isValid || !validation.data) {
            return NextResponse.json(
                { error: validation.error || "Invalid product creation input." },
                { status: 400 }
            );
        }

        const result = await productApiService.createProduct(validation.data);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error || "Failed to create product in upstream service." },
                { status: result.status ?? 502 }
            );
        }

        const transformed = transformProduct(result.data);

        return NextResponse.json(transformed, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "An unexpected error occurred while creating product.",
            },
            { status: 500 }
        );
    }
}
