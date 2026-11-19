import { cookies } from "next/headers";
import type { SessionData } from "@/types/auth";

// 1. Expiration intervals (in seconds)
export const ACCESS_TOKEN_MAX_AGE = 60 * 60 * 2; // 2 hours
export const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// 2. Cookie names
export const COOKIE_ACCESS_TOKEN = "access_token";
export const COOKIE_REFRESH_TOKEN = "refresh_token";

export const COOKIE_BASE_CONFIG = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
};

/**
 * Creates user session by storing tokens in separate HttpOnly cookies.
 */
export async function createSession(
    accessToken: string,
    refreshToken: string,
): Promise<void> {
    const cookieStore = await cookies();

    // 1. Access Token Cookie (Short-lived)
    cookieStore.set(COOKIE_ACCESS_TOKEN, accessToken, {
        ...COOKIE_BASE_CONFIG,
        maxAge: ACCESS_TOKEN_MAX_AGE,
    });

    // 2. Refresh Token Cookie (Long-lived)
    cookieStore.set(COOKIE_REFRESH_TOKEN, refreshToken, {
        ...COOKIE_BASE_CONFIG,
        maxAge: REFRESH_TOKEN_MAX_AGE,
    });
}

/**
 * Reads cookies on the server and return accesstoken.
 */
export async function getSession(): Promise<SessionData> {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get(COOKIE_ACCESS_TOKEN)?.value || null;

    return {
        accessToken,
        isAuthenticated: Boolean(accessToken)
    };
}

/**
 * Reads the raw refresh token on the server for token renewal.
 */
export async function getRefreshToken(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get(COOKIE_REFRESH_TOKEN)?.value || null;
}

/**
 * Deletes all authentication-related cookies.
 */
export async function deleteSession(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_ACCESS_TOKEN);
    cookieStore.delete(COOKIE_REFRESH_TOKEN);

}
