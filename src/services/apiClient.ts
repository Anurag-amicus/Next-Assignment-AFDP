import type { ApiResult, ApiRequestOptions } from "../types/api";



export async function apiRequest<T>(
    url: string,
    options?: ApiRequestOptions
): Promise<ApiResult<T>> {
    try {
        const headers = new Headers(options?.headers);
        if (!headers.has("Accept")) {
            headers.set("Accept", "application/json");
        }
        if (!headers.has("User-Agent")) {
            headers.set(
                "User-Agent",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            );
        }


        const response = await fetch(url, {
            ...options,
            headers,
        });


        if (!response.ok) {
            const text = await response.text().catch(() => "");
            let errorMessage: string | null = null;
            try {
                const parsed = JSON.parse(text);
                errorMessage = parsed.message || parsed.title || parsed.error || (typeof parsed === "string" ? parsed : null);
            } catch {
                if (text && text.length < 200) {
                    errorMessage = text;
                }
            }

            return {
                success: false,
                status: response.status,
                error: errorMessage ?? `Request failed with status ${response.status}`,
            };
        }

        // Safely parse JSON or handle empty response bodies (e.g. 204 or DELETE)
        const text = await response.text();
        const data: T = text ? JSON.parse(text) : (null as T);

        return {
            success: true,
            status: response.status,
            data,
        };
    } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
            return {
                success: false,
                status: 499,
                error: "Request was cancelled.",
            };
        }

        return {
            success: false,
            status: 502,
            error:
                error instanceof Error
                    ? error.message
                    : "Network request failed.",
        };
    }
}