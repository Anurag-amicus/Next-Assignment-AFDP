import { cookies } from "next/headers";
import type { User, SessionData } from "@/types/auth";

// Expiration intervals (in seconds)
export const ACCESS_TOKEN_MAX_AGE = 60 * 60; // 1 hour
export const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
export const AUTH_USER_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// Cookie names
export const COOKIE_ACCESS_TOKEN = "access_token";
export const COOKIE_REFRESH_TOKEN = "refresh_token";
export const COOKIE_AUTH_USER = "auth_user";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

/**
 * Creates user session by storing tokens and minimal display data in separate HttpOnly cookies.
 */
export async function createSession(
    accessToken: string,
    refreshToken: string,
    user: User
): Promise<void> {
    const cookieStore = await cookies();

    // 1. Access Token Cookie (Short-lived)
    cookieStore.set(COOKIE_ACCESS_TOKEN, accessToken, {
        httpOnly: true,
        secure: IS_PRODUCTION,
        sameSite: "lax",
        path: "/",
        maxAge: ACCESS_TOKEN_MAX_AGE,
    });

    // 2. Refresh Token Cookie (Long-lived)
    cookieStore.set(COOKIE_REFRESH_TOKEN, refreshToken, {
        httpOnly: true,
        secure: IS_PRODUCTION,
        sameSite: "lax",
        path: "/",
        maxAge: REFRESH_TOKEN_MAX_AGE,
    });

    // 3. Auth User Cookie (Minimal display data for Header/Layout)
    cookieStore.set(COOKIE_AUTH_USER, JSON.stringify(user), {
        httpOnly: true,
        secure: IS_PRODUCTION,
        sameSite: "lax",
        path: "/",
        maxAge: AUTH_USER_MAX_AGE,
    });
}

/**
 * Reads session cookies on the server and returns minimal user info and tokens.
 */
export async function getSession(): Promise<SessionData> {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get(COOKIE_ACCESS_TOKEN)?.value || null;
    const userCookie = cookieStore.get(COOKIE_AUTH_USER)?.value;

    let user: User | null = null;
    if (userCookie) {
        try {
            user = JSON.parse(userCookie);
        } catch {
            user = null;
        }
    }

    return {
        user,
        accessToken,
        isAuthenticated: Boolean(accessToken && user),
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
 * Updates access token and rotated refresh token after a successful refresh.
 */
export async function updateSessionTokens(
    accessToken: string,
    refreshToken: string
): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.set(COOKIE_ACCESS_TOKEN, accessToken, {
        httpOnly: true,
        secure: IS_PRODUCTION,
        sameSite: "lax",
        path: "/",
        maxAge: ACCESS_TOKEN_MAX_AGE,
    });

    cookieStore.set(COOKIE_REFRESH_TOKEN, refreshToken, {
        httpOnly: true,
        secure: IS_PRODUCTION,
        sameSite: "lax",
        path: "/",
        maxAge: REFRESH_TOKEN_MAX_AGE,
    });
}

/**
 * Deletes all authentication-related cookies.
 */
export async function deleteSession(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_ACCESS_TOKEN);
    cookieStore.delete(COOKIE_REFRESH_TOKEN);
    cookieStore.delete(COOKIE_AUTH_USER);
}
