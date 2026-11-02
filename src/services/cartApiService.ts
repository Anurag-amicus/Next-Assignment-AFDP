import type { ApiResult } from "../types/api";
import type { CartItem } from "../types/cart";
import { apiRequest } from "./apiClient";

class CartApiService {
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl =
            process.env.API_URL ||
            "https://training-ecom1-a9a2cmbsefdvgwha.centralindia-01.azurewebsites.net";
    }

    private getAuthHeaders(token: string, headers?: HeadersInit): Headers {
        const h = new Headers(headers);
        h.set("Authorization", `Bearer ${token}`);
        return h;
    }

    /**
     * GET /api/v1/cart
     * Fetches current user's cart items.
     */
    async getCart(token: string, options?: RequestInit): Promise<ApiResult<CartItem[]>> {
        return apiRequest<CartItem[]>(`${this.baseUrl}/api/v1/cart`, {
            ...options,
            headers: this.getAuthHeaders(token, options?.headers),
            cache: "no-store",
        });
    }

    /**
     * POST /api/v1/cart/items
     * Adds an item to the cart.
     */
    async addToCart(
        token: string,
        productId: number,
        quantity: number,
        options?: RequestInit
    ): Promise<ApiResult<{ message?: string } | null>> {
        const headers = this.getAuthHeaders(token, options?.headers);
        headers.set("Content-Type", "application/json");

        return apiRequest<{ message?: string } | null>(
            `${this.baseUrl}/api/v1/cart/items`,
            {
                ...options,
                method: "POST",
                headers,
                body: JSON.stringify({ productId, quantity }),
                cache: "no-store",
            }
        );
    }

    /**
     * PUT /api/v1/cart/items/{productId}
     * Updates quantity of a specific item in the cart.
     */
    async updateQuantity(
        token: string,
        productId: number,
        quantity: number,
        options?: RequestInit
    ): Promise<ApiResult<{ message?: string } | null>> {
        const headers = this.getAuthHeaders(token, options?.headers);
        headers.set("Content-Type", "application/json");

        return apiRequest<{ message?: string } | null>(
            `${this.baseUrl}/api/v1/cart/items/${productId}`,
            {
                ...options,
                method: "PUT",
                headers,
                body: JSON.stringify({ quantity }),
                cache: "no-store",
            }
        );
    }

    /**
     * DELETE /api/v1/cart/items/{productId}
     * Removes a single product from the cart.
     */
    async removeItem(
        token: string,
        productId: number,
        options?: RequestInit
    ): Promise<ApiResult<{ message?: string } | null>> {
        return apiRequest<{ message?: string } | null>(
            `${this.baseUrl}/api/v1/cart/items/${productId}`,
            {
                ...options,
                method: "DELETE",
                headers: this.getAuthHeaders(token, options?.headers),
                cache: "no-store",
            }
        );
    }

    /**
     * DELETE /api/v1/cart
     * Empties the entire cart.
     */
    async clearCart(
        token: string,
        options?: RequestInit
    ): Promise<ApiResult<{ message?: string } | null>> {
        return apiRequest<{ message?: string } | null>(
            `${this.baseUrl}/api/v1/cart`,
            {
                ...options,
                method: "DELETE",
                headers: this.getAuthHeaders(token, options?.headers),
                cache: "no-store",
            }
        );
    }

    /**
     * GET /api/v1/cart/count
     * Fetches the total item count of the cart.
     */
    async getCartCount(
        token: string,
        options?: RequestInit
    ): Promise<ApiResult<number>> {
        const result = await apiRequest<{ itemCount: number }>(
            `${this.baseUrl}/api/v1/cart/count`,
            {
                ...options,
                headers: this.getAuthHeaders(token, options?.headers),
                cache: "no-store",
            }
        );

        if (!result.success) {
            return result;
        }

        return {
            success: true,
            data: result.data.itemCount,
        };
    }
}

export const cartApiService = new CartApiService();
