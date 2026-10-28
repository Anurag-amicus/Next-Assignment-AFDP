import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_ACCESS_TOKEN } from "@/lib/session";

export function proxy(request: NextRequest): NextResponse {
    const start = performance.now();
    const { pathname, search } = request.nextUrl;

    const hasAuth = Boolean(request.cookies.get(COOKIE_ACCESS_TOKEN)?.value);

    const isProtectedRoute =
        pathname === "/checkout" ||
        pathname.startsWith("/checkout/") ||
        pathname === "/orders" ||
        pathname.startsWith("/orders/");

    const isAuthRoute = pathname === "/login" || pathname === "/register";

    let response: NextResponse;
    let status = 200;

    if (isProtectedRoute && !hasAuth) {
        const returnUrl = pathname + search;
        const loginUrl = new URL(`/login?returnUrl=${encodeURIComponent(returnUrl)}`, request.url);
        response = NextResponse.redirect(loginUrl);
        status = 307;
    } else if (isAuthRoute && hasAuth) {
        const rawReturnUrl = request.nextUrl.searchParams.get("returnUrl");
        const target =
            rawReturnUrl &&
            rawReturnUrl.startsWith("/") &&
            !rawReturnUrl.startsWith("//") &&
            !rawReturnUrl.includes("\\")
                ? rawReturnUrl
                : "/";
        response = NextResponse.redirect(new URL(target, request.url));
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
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|otf|ttf|woff|woff2)$).*)",
    ],
};
