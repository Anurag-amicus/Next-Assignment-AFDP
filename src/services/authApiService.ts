import type { ApiResult } from "../types/api";
import type { Login, Register, RefreshToken, AuthResponse } from "../types/auth";
import { apiRequest } from "./apiClient";

class AuthApiService {
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl =
            process.env.API_URL ||
            "https://training-ecom1-a9a2cmbsefdvgwha.centralindia-01.azurewebsites.net";
    }

    /**
     * POST /api/auth/login
     */
    async login(credentials: Login): Promise<ApiResult<AuthResponse>> {
        return apiRequest<AuthResponse>(`${this.baseUrl}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
            cache: "no-store",
        });
    }

    /**
     * POST /api/auth/register
     */
    async register(data: Register): Promise<ApiResult<AuthResponse>> {
        return apiRequest<AuthResponse>(`${this.baseUrl}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            cache: "no-store",
        });
    }

    /**
     * POST /api/auth/refresh
     */
    async refreshToken(tokenData: RefreshToken): Promise<ApiResult<AuthResponse>> {
        return apiRequest<AuthResponse>(`${this.baseUrl}/api/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tokenData),
            cache: "no-store",
        });
    }

    /**
     * POST /api/auth/logout
     */
    async logout(token?: string): Promise<ApiResult<void>> {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        return apiRequest<void>(`${this.baseUrl}/api/auth/logout`, {
            method: "POST",
            headers,
            cache: "no-store",
        });
    }
}

export const authApiService = new AuthApiService();
