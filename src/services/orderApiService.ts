import type { OrderDetail, OrderHistoryResponse } from "../types/order";
import type { ApiResult } from "../types/api";
import type { AuthRequest } from "@/types/auth";
import { apiRequest } from "./apiClient";
import getAuthHeaders from "@/utils/authHelper";

class OrderApiService {
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl =
            process.env.API_URL ||
            "https://training-ecom1-a9a2cmbsefdvgwha.centralindia-01.azurewebsites.net";
    }

    async getOrderHistory(
        { token, options }: AuthRequest,
        params?: { status?: string; page?: number; pageSize?: number }
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
                headers: getAuthHeaders(token, options?.headers),
                cache: "no-store",
            }
        );
    }

    async reorder({ token, options }: AuthRequest,
    orderId: number) {
        return apiRequest<{ message?: string }>(
            `${this.baseUrl}/api/v1/orders/${orderId}/reorder`,
            {
                ...options,
                headers: getAuthHeaders(token, options?.headers),
                method: "POST",
            }
        );
    }

    async getOrderById(
        { token, options }: AuthRequest,
        orderId: number
    ): Promise<ApiResult<OrderDetail>> {
        return apiRequest<OrderDetail>(
            `${this.baseUrl}/api/v1/orders/${orderId}`,
            {
                ...options,
                headers: getAuthHeaders(token, options?.headers),
                cache: "no-store",
            }
        );
    }
}

export const orderApiService = new OrderApiService();
