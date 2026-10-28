import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_ACCESS_TOKEN, COOKIE_AUTH_USER } from "@/lib/session";

/**
 * Next.js 16 Request Proxy (replaces deprecated middleware.ts)
 * Handles route protection for /checkout and /orders, and logs proxy execution timing.
 */
export function proxy(request: NextRequest): NextResponse {
    const start = performance.now();
    const { pathname, search } = request.nextUrl;

    const hasAuth = Boolean(
        request.cookies.get(COOKIE_ACCESS_TOKEN)?.value ||
        request.cookies.get(COOKIE_AUTH_USER)?.value
    );

    const isProtectedRoute =
        pathname === "/checkout" ||
        pathname.startsWith("/checkout/") ||
        pathname === "/orders" ||
        pathname.startsWith("/orders/");

    const isAuthRoute = pathname === "/login" || pathname === "/register";

    let response: NextResponse;
    let status = 200;

    if (isProtectedRoute && !hasAuth) {
        // Unauthenticated access to protected route -> Redirect to login with returnUrl
        const returnUrl = pathname + search;
        const loginUrl = new URL(`/login?returnUrl=${encodeURIComponent(returnUrl)}`, request.url);
        response = NextResponse.redirect(loginUrl);
        status = 307;
    } else if (isAuthRoute && hasAuth) {
        // Authenticated user accessing login/register -> Redirect to products catalog
        response = NextResponse.redirect(new URL("/products", request.url));
        status = 307;
    } else {
        response = NextResponse.next();
        status = 200;
    }

    const duration = Math.round((performance.now() - start) * 10) / 10;
    console.log(`[Proxy] ${request.method} ${pathname} - ${duration}ms (${status})`);

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - static image formats (svg, png, jpg, jpeg, gif, webp)
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
