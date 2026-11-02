import type { Address, AddressResponse } from "../types/address";
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

    async createAddress(
        address: Address,
        token: string,
        options?: RequestInit
    ): Promise<ApiResult<AddressResponse>> {
        return apiRequest<AddressResponse>(`${this.baseUrl}/api/v1/addresses`, {
            ...options,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                ...options?.headers,
            },
            body: JSON.stringify(address),
        });
    }

    async updateAddress(
        addressId: number,
        address: Address,
        token: string,
        options?: RequestInit
    ): Promise<ApiResult<{ message?: string }>> {
        return apiRequest<{ message?: string }>(
            `${this.baseUrl}/api/v1/addresses/${addressId}`,
            {
                ...options,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    ...options?.headers,
                },
                body: JSON.stringify(address),
            }
        );
    }

    async deleteAddress(
        addressId: number,
        token: string,
        options?: RequestInit
    ): Promise<ApiResult<void>> {
        return apiRequest<void>(`${this.baseUrl}/api/v1/addresses/${addressId}`, {
            ...options,
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                ...options?.headers,
            },
        });
    }
}

export const addressApiService = new AddressApiService();
