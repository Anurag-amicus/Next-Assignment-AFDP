import type { ApiResult, ApiRequestOptions } from "../types/api";



export async function apiRequest<T>(
    url: string,
    options?: ApiRequestOptions
): Promise<ApiResult<T>> {
    try {
        const headers = new Headers(options?.headers);


        const response = await fetch(url, {
            ...options,
            headers,
        });


        if (!response.ok) {
            const errorData = await response.json().catch(() => null);

            return {
                success: false,
                error:
                    errorData?.message ??
                    `Request failed with status ${response.status}`,
            };
        }

        // Safely parse JSON or handle empty response bodies (e.g. 204 or DELETE)
        const text = await response.text();
        const data: T = text ? JSON.parse(text) : (null as T);

        return {
            success: true,
            data,
        };
    } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
            return {
                success: false,
                error: "Request was cancelled.",
            };
        }

        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Network request failed.",
        };
    }
}