import type {
    CheckoutRequest,
    CheckoutResponse,
    MockPaymentRequest,
    MockPaymentResponse,
} from "../types/checkout";
import type { ApiResult } from "../types/api";
import { apiRequest } from "./apiClient";

class CheckoutApiService {
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl =
            process.env.API_URL ||
            "https://training-ecom1-a9a2cmbsefdvgwha.centralindia-01.azurewebsites.net";
    }

    async checkout(
        data: CheckoutRequest,
        token: string,
        options?: RequestInit
    ): Promise<ApiResult<CheckoutResponse>> {
        return apiRequest<CheckoutResponse>(`${this.baseUrl}/api/v1/checkout`, {
            ...options,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                ...options?.headers,
            },
            body: JSON.stringify(data),
        });
    }

    async mockPayment(
        data: MockPaymentRequest,
        token: string,
        options?: RequestInit
    ): Promise<ApiResult<MockPaymentResponse>> {
        return apiRequest<MockPaymentResponse>(`${this.baseUrl}/api/payments/mock`, {
            ...options,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                ...options?.headers,
            },
            body: JSON.stringify(data),
        });
    }
}

export const checkoutApiService = new CheckoutApiService();
