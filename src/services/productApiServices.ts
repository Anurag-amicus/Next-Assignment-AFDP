import type { ApiResult } from "../types/api";
import type { ProductPagedResponse } from "../types/pagination";
import type {
    ProductResponse,
    ProductQueryParams,
    ProductCreateInput,
    ProductUpdateInput,
    CategoryResponse,
    BrandResponse,
} from "../types/product";
import { apiRequest } from "./apiClient";

class ProductApiService {
    private readonly baseUrl: string;

    constructor() {
        // Kept strictly on the server: process.env.API_URL
        this.baseUrl =
            process.env.API_URL ||
            "https://training-ecom1-a9a2cmbsefdvgwha.centralindia-01.azurewebsites.net";
    }

    private setQueryParam(
        searchParams: URLSearchParams,
        key: string,
        value: string | number | null | undefined
    ) {
        if (value !== undefined && value !== null && value !== "") {
            searchParams.set(key, value.toString());
        }
    }

    /**
     * GET /api/v1/Products/search with pagination, filtering, and sorting
     */
    async getProducts(
        params?: ProductQueryParams,
        options?: RequestInit
    ): Promise<ApiResult<ProductPagedResponse>> {
        const searchParams = new URLSearchParams();

        const queryParams = {
            ...params,
            Page: params?.Page ?? 1,
            PageSize: params?.PageSize ?? 8,
        };

        Object.entries(queryParams).forEach(([key, value]) => {
            this.setQueryParam(searchParams, key, value);
        });

        const query = searchParams.toString();
        const url = query
            ? `${this.baseUrl}/api/v1/Products/search?${query}`
            : `${this.baseUrl}/api/v1/Products/search`;

        return apiRequest<ProductPagedResponse>(url, options);
    }

    /**
     * GET /api/v1/Products/{id}
     */
    async getProductById(
        id: number | string,
        options?: RequestInit
    ): Promise<ApiResult<ProductResponse>> {
        const result = await apiRequest<ProductResponse>(
            `${this.baseUrl}/api/v1/Products/${id}`,
            options
        );

        if (result.success) {
            return result;
        }

        // Fallback: search across products to locate product by ID if direct route returned 404
        if (result.status === 404 || !result.success) {
            const searchResult = await this.getProducts({ PageSize: 50 }, options);
            if (searchResult.success && searchResult.data.products) {
                const found = searchResult.data.products.find(
                    (p) => String(p.productId) === String(id)
                );
                if (found) {
                    return {
                        success: true,
                        status: 200,
                        data: found,
                    };
                }
            }
        }

        return result;
    }

    /**
     * POST /api/v1/Products
     */
    async createProduct(
        payload: ProductCreateInput,
        options?: RequestInit
    ): Promise<ApiResult<ProductResponse>> {
        return apiRequest<ProductResponse>(`${this.baseUrl}/api/v1/Products`, {
            ...options,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(options?.headers ? Object.fromEntries(new Headers(options.headers).entries()) : {}),
            },
            body: JSON.stringify(payload),
        });
    }

    /**
     * PUT /api/v1/Products/{id}
     */
    async updateProduct(
        id: number | string,
        payload: ProductUpdateInput,
        options?: RequestInit
    ): Promise<ApiResult<ProductResponse>> {
        return apiRequest<ProductResponse>(`${this.baseUrl}/api/v1/Products/${id}`, {
            ...options,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...(options?.headers ? Object.fromEntries(new Headers(options.headers).entries()) : {}),
            },
            body: JSON.stringify(payload),
        });
    }

    /**
     * DELETE /api/v1/Products/{id}
     */
    async deleteProduct(
        id: number | string,
        options?: RequestInit
    ): Promise<ApiResult<{ message?: string } | null>> {
        return apiRequest<{ message?: string } | null>(
            `${this.baseUrl}/api/v1/Products/${id}`,
            {
                ...options,
                method: "DELETE",
            }
        );
    }

    /**
     * GET /api/Categories
     */
    async getCategories(options?: RequestInit): Promise<ApiResult<CategoryResponse>> {
        return apiRequest<CategoryResponse>(`${this.baseUrl}/api/Categories`, options);
    }

    /**
     * GET /api/Brands
     */
    async getBrands(options?: RequestInit): Promise<ApiResult<BrandResponse>> {
        return apiRequest<BrandResponse>(`${this.baseUrl}/api/Brands`, options);
    }
}

const productApiService = new ProductApiService();

export { ProductApiService, productApiService };
