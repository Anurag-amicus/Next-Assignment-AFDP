import type { OrderHistoryResponse } from "../types/order";
import type { ApiResult } from "../types/api";
import { apiRequest } from "./apiClient";

class OrderApiService {
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl =
            process.env.API_URL ||
            "https://training-ecom1-a9a2cmbsefdvgwha.centralindia-01.azurewebsites.net";
    }

    async getOrderHistory(
        token: string,
        params?: { status?: string; page?: number; pageSize?: number },
        options?: RequestInit
    ): Promise<ApiResult<OrderHistoryResponse>> {
        const query = new URLSearchParams();
        if (params?.status && params.status !== "All Orders") {
            const trimmed = params.status.trim();
            const apiStatus =
                trimmed.toLowerCase() === "processing" ? "Placed" : trimmed;
            query.append("status", apiStatus);
        }
        if (params?.page) {
            query.append("page", params.page.toString());
        }
        if (params?.pageSize) {
            query.append("pageSize", params.pageSize.toString());
        }

        const queryString = query.toString() ? `?${query.toString()}` : "";
        return apiRequest<OrderHistoryResponse>(
            `${this.baseUrl}/api/v1/orders/history${queryString}`,
            {
                ...options,
                headers: {
                    Authorization: `Bearer ${token}`,
                    ...options?.headers,
                },
                cache: "no-store",
            }
        );
    }
}

export const orderApiService = new OrderApiService();
