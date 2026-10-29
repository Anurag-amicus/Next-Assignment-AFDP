import type { Address } from "../types/address";
import type { ApiResult } from "../types/api";
import { apiRequest } from "./apiClient";

class AddressApiService {
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl =
            process.env.API_URL ||
            "https://training-ecom1-a9a2cmbsefdvgwha.centralindia-01.azurewebsites.net";
    }

    async getAddresses(token: string, options?: RequestInit): Promise<ApiResult<Address[]>> {
        return apiRequest<Address[]>(`${this.baseUrl}/api/v1/addresses`, {
            ...options,
            headers: {
                Authorization: `Bearer ${token}`,
                ...options?.headers,
            },
            cache: "no-store",
        });
    }
}

export const addressApiService = new AddressApiService();
