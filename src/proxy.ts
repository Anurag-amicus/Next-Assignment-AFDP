import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authApiService } from "@/services/authApiService";
import {
    COOKIE_ACCESS_TOKEN,
    COOKIE_REFRESH_TOKEN,
    COOKIE_AUTH_USER,
    ACCESS_TOKEN_MAX_AGE,
    REFRESH_TOKEN_MAX_AGE,
} from "@/lib/session";

const PROTECTED_ROUTES = ["/checkout", "/orders", "/dashboard"];
const IS_PRODUCTION = process.env.NODE_ENV === "production";

export async function proxy(request: NextRequest): Promise<NextResponse> {
    const start = performance.now();
    const { pathname, search } = request.nextUrl;

    let accessToken = request.cookies.get(COOKIE_ACCESS_TOKEN)?.value;
    const refreshToken = request.cookies.get(COOKIE_REFRESH_TOKEN)?.value;

    const isProtectedRoute = PROTECTED_ROUTES.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`)
    );
    const isAuthRoute = pathname === "/login" || pathname === "/register";

    let refreshedTokens: { token: string; refreshToken: string } | null = null;
    let refreshFailed = false;

    // Only attempt token refresh when a protected route is accessed with an expired access token
    if (isProtectedRoute && !accessToken && refreshToken) {
        try {
            const refreshResult = await authApiService.refreshToken({ refreshToken });
            if (refreshResult.success && refreshResult.data) {
                refreshedTokens = {
                    token: refreshResult.data.token,
                    refreshToken: refreshResult.data.refreshToken,
                };
                accessToken = refreshedTokens.token;
            } else {
                refreshFailed = true;
            }
        } catch {
            refreshFailed = true;
        }
    }

    const hasAuth = Boolean(accessToken);

    let response: NextResponse;

    if (isProtectedRoute && !hasAuth) {
        const returnUrl = pathname + search;
        const loginUrl = new URL(`/login?returnUrl=${encodeURIComponent(returnUrl)}`, request.url);
        response = NextResponse.redirect(loginUrl);
    } else if (isAuthRoute && (hasAuth || refreshToken)) {
        const rawReturnUrl = request.nextUrl.searchParams.get("returnUrl");
        const target =
            rawReturnUrl &&
            rawReturnUrl.startsWith("/") &&
            !rawReturnUrl.startsWith("//") &&
            !rawReturnUrl.includes("\\")
                ? rawReturnUrl
                : "/";
        response = NextResponse.redirect(new URL(target, request.url));
    } else {
        if (refreshedTokens) {
            request.cookies.set(COOKIE_ACCESS_TOKEN, refreshedTokens.token);
            request.cookies.set(COOKIE_REFRESH_TOKEN, refreshedTokens.refreshToken);
            response = NextResponse.next({
                request: {
                    headers: request.headers,
                },
            });
        } else {
            response = NextResponse.next();
        }
    }

    // Set rotated cookies on the outgoing response so the browser stores them
    if (refreshedTokens) {
        response.cookies.set(COOKIE_ACCESS_TOKEN, refreshedTokens.token, {
            httpOnly: true,
            secure: IS_PRODUCTION,
            sameSite: "lax",
            path: "/",
            maxAge: ACCESS_TOKEN_MAX_AGE,
        });
        response.cookies.set(COOKIE_REFRESH_TOKEN, refreshedTokens.refreshToken, {
            httpOnly: true,
            secure: IS_PRODUCTION,
            sameSite: "lax",
            path: "/",
            maxAge: REFRESH_TOKEN_MAX_AGE,
        });
    } else if (refreshFailed) {
        response.cookies.delete(COOKIE_ACCESS_TOKEN);
        response.cookies.delete(COOKIE_REFRESH_TOKEN);
        response.cookies.delete(COOKIE_AUTH_USER);
    }

    const duration = Math.round((performance.now() - start) * 100) / 100;
    console.log(`[Proxy] ${request.method} ${pathname} - ${duration}ms (${response.status})`);

    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|\\.well-known|.*\\.(?:svg|png|jpg|jpeg|gif|webp|otf|ttf|woff|woff2)$).*)",
    ],
};
