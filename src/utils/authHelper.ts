export default function getAuthHeaders(token: string, headers?: HeadersInit): Headers {
        const h = new Headers(headers);
        h.set("Authorization", `Bearer ${token}`);
        return h;
    }