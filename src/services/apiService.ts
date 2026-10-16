
import type { ApiResult } from "../types/api";
import type { ProductPagedResponse } from "../types/pagination";
import type {
    ProductResponse,
    ProductQueryParams,
    CategoryResponse,
    BrandResponse,
} from "../types/product";
import { apiRequest } from "./apiClient";

class ApiService {
    private readonly ecommerceBaseUrl: string;
    private readonly countriesNowBaseUrl: string;

    constructor() {
        this.ecommerceBaseUrl =
            process.env.NEXT_PUBLIC_API_URL ||
            process.env.API_URL ||
            "https://training-ecom1-a9a2cmbsefdvgwha.centralindia-01.azurewebsites.net";
        this.countriesNowBaseUrl = "https://countriesnow.space/api/v0.1";
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

    async getProducts(params?: ProductQueryParams, options?: RequestInit) {
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
            ? `${this.ecommerceBaseUrl}/api/v1/Products/search?${query}`
            : `${this.ecommerceBaseUrl}/api/v1/Products/search`;

        return apiRequest<ProductPagedResponse>(url, options);
    }

    async getProductById(
        id: number | string,
        options?: RequestInit
    ): Promise<ApiResult<ProductResponse>> {
        const result = await apiRequest<ProductResponse>(
            `${this.ecommerceBaseUrl}/api/v1/Products/${id}`,
            options
        );

        if (result.success) {
            return result;
        }

        // Fallback: search across products to locate product by ID
        const searchResult = await this.getProducts({ PageSize: 50 }, options);
        if (searchResult.success && searchResult.data.products) {
            const found = searchResult.data.products.find(
                (p) => String(p.productId) === String(id)
            );
            if (found) {
                return {
                    success: true as const,
                    data: found,
                };
            }
        }

        return result;
    }

    async getCategories(options?: RequestInit) {
        return apiRequest<CategoryResponse>(
            `${this.ecommerceBaseUrl}/api/Categories`,
            options
        );
    }

    async getBrands(options?: RequestInit) {
        return apiRequest<BrandResponse>(
            `${this.ecommerceBaseUrl}/api/Brands`,
            options
        );
    }

}

const apiService = new ApiService();

export { apiService };