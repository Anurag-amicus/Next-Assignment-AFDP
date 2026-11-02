import type { ApiResult } from "../types/api";
import { apiRequest } from "./apiClient";
import type {
    Country,
    CountriesResponse,
    State,
    StatesResponse,
    CitiesResponse,
} from "../types/geoData";

export type {
    Country,
    CountriesResponse,
    State,
    StatesResponse,
    CitiesResponse,
};

class GeoApiService {
    private readonly countriesNowBaseUrl: string;

    constructor() {
        this.countriesNowBaseUrl = "https://countriesnow.space/api/v0.1";
    }

    async getCountries(options?: RequestInit): Promise<ApiResult<Country[]>> {
        const result = await apiRequest<CountriesResponse>(
            `${this.countriesNowBaseUrl}/countries`,
            {
                next: { revalidate: 86400 },
                ...options,
            }
        );

        if (result.success === false) {
            return result;
        }

        if (result.data?.error) {
            return {
                success: false as const,
                error: result.data.msg,
            };
        }

        return {
            success: true as const,
            data: result.data.data,
        };
    }

    async getStates(
        country: string,
        options?: RequestInit
    ): Promise<ApiResult<State[]>> {
        const result = await apiRequest<StatesResponse>(
            `${this.countriesNowBaseUrl}/countries/states`,
            {
                next: { revalidate: 86400 },
                ...options,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...options?.headers,
                },
                body: JSON.stringify({
                    country,
                }),
            }
        );

        if (result.success === false) {
            return result;
        }

        if (result.data?.error) {
            return {
                success: false as const,
                error: result.data.msg,
            };
        }

        return {
            success: true as const,
            data: result.data.data.states,
        };
    }

    async getCities(
        country: string,
        state: string,
        options?: RequestInit
    ): Promise<ApiResult<string[]>> {
        const result = await apiRequest<CitiesResponse>(
            `${this.countriesNowBaseUrl}/countries/state/cities`,
            {
                next: { revalidate: 86400 },
                ...options,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...options?.headers,
                },
                body: JSON.stringify({
                    country,
                    state,
                }),
            }
        );

        if (result.success === false) {
            return result;
        }

        if (result.data?.error) {
            return {
                success: false as const,
                error: result.data.msg,
            };
        }

        return {
            success: true as const,
            data: result.data.data,
        };
    }
}

export const geoApiService = new GeoApiService();
