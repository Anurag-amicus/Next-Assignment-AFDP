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
const COOKIE_BASE = { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" };

export async function proxy(request: NextRequest): Promise<NextResponse> {
    const start = performance.now();
    const { pathname, search } = request.nextUrl;
    const accessToken = request.cookies.get(COOKIE_ACCESS_TOKEN)?.value;
    const refreshToken = request.cookies.get(COOKIE_REFRESH_TOKEN)?.value;

    const log = (response: NextResponse): NextResponse => {
        const duration = Math.round((performance.now() - start) * 100) / 100;
        console.log(`[Proxy] ${request.method} ${pathname} - ${duration}ms (${response.status})`);
        return response;
    };

    const isProtected = PROTECTED_ROUTES.some(
        (r) => pathname === r || pathname.startsWith(`${r}/`)
    );
    const isAuth = pathname === "/login" || pathname === "/register";

    // 1. Auth routes (/login, /register) -> redirect away if already logged in
    if (isAuth && (accessToken || refreshToken)) {
        const returnUrl = request.nextUrl.searchParams.get("returnUrl");
        const target = returnUrl?.startsWith("/") && !returnUrl.startsWith("//") ? returnUrl : "/";
        return log(NextResponse.redirect(new URL(target, request.url)));
    }

    // 2. Protected routes -> auto-refresh or guard
    if (isProtected) {
        // Attempt refresh if access token expired
        if (!accessToken && refreshToken) {
            const res = await authApiService.refreshToken({ refreshToken });
            if (res.success && res.data) {
                // Forward fresh tokens to page Server Components
                request.cookies.set(COOKIE_ACCESS_TOKEN, res.data.token);
                request.cookies.set(COOKIE_REFRESH_TOKEN, res.data.refreshToken);

                const response = NextResponse.next({ request: { headers: request.headers } });
                response.cookies.set(COOKIE_ACCESS_TOKEN, res.data.token, { ...COOKIE_BASE, maxAge: ACCESS_TOKEN_MAX_AGE });
                response.cookies.set(COOKIE_REFRESH_TOKEN, res.data.refreshToken, { ...COOKIE_BASE, maxAge: REFRESH_TOKEN_MAX_AGE });
                return log(response);
            }
        }

        // If still no valid token (not logged in OR refresh failed)
        if (!accessToken) {
            const loginUrl = new URL(`/login?returnUrl=${encodeURIComponent(pathname + search)}`, request.url);
            const response = NextResponse.redirect(loginUrl);
            response.cookies.delete(COOKIE_ACCESS_TOKEN);
            response.cookies.delete(COOKIE_REFRESH_TOKEN);
            response.cookies.delete(COOKIE_AUTH_USER);
            return log(response);
        }
    }

    // 3. Public routes -> pass through immediately
    return log(NextResponse.next());
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|\\.well-known|.*\\.(?:svg|png|jpg|jpeg|gif|webp|otf|ttf|woff|woff2)$).*)",
    ],
};
