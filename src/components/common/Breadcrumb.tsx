"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

export interface BreadcrumbProps {
    items?: BreadcrumbItem[];
    className?: string;
    variant?: "default" | "light";
}

const SEGMENT_LABELS: Record<string, string> = {
    products: "Products",
    cart: "Shopping Cart",
    orders: "My Orders",
    dashboard: "Dashboard",
    login: "Sign In",
    about: "About Us",
};

export default function Breadcrumb({
    items,
    className = "",
    variant = "default",
}: BreadcrumbProps) {
    const pathname = usePathname();

    if (pathname === "/" || pathname === "/home") {
        return null;
    }

    const trail: BreadcrumbItem[] = items ?? (() => {
        const segments = pathname.split("/").filter(Boolean);
        const generated: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

        let accumulatedPath = "";
        segments.forEach((segment, index) => {
            accumulatedPath += `/${segment}`;
            const isLast = index === segments.length - 1;
            const label = SEGMENT_LABELS[segment] || decodeURIComponent(segment);
            generated.push({
                label,
                href: isLast ? undefined : accumulatedPath,
            });
        });

        return generated;
    })();

    if (trail.length <= 1) {
        return null;
    }

    return (
        <nav
            aria-label="Breadcrumb"
            className={`flex flex-wrap items-center gap-1.5 text-xs leading-none mb-4 ${className}`}
        >
            {trail.map((item, index) => {
                const isLast = index === trail.length - 1;
                return (
                    <span key={item.href || item.label} className="inline-flex items-center gap-1.5">
                        {item.href && !isLast ? (
                            <Link
                                href={item.href}
                                className={
                                    variant === "light"
                                        ? "text-white/75 hover:text-white no-underline transition-colors duration-200"
                                        : "text-muted hover:text-orange no-underline transition-colors duration-200"
                                }
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span
                                className={
                                    variant === "light"
                                        ? "text-white font-semibold"
                                        : "text-charcoal font-semibold"
                                }
                            >
                                {item.label}
                            </span>
                        )}
                        {!isLast && (
                            <span
                                className={
                                    variant === "light"
                                        ? "text-white/50 select-none"
                                        : "text-muted select-none"
                                }
                                aria-hidden="true"
                            >
                                ›
                            </span>
                        )}
                    </span>
                );
            })}
        </nav>
    );
}
