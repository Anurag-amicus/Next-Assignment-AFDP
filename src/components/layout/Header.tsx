"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faCartShopping,
    faRightToBracket,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/hooks/useCart";
import { logoutAction } from "@/app/actions/authActions";
import HeaderUserMenu from "./HeaderUserMenu";
import SearchBar from "./SearchBar";

interface NavItem {
    href: string;
    label: string;
    requiresAuth?: boolean;
}

const NAV_ITEMS: NavItem[] = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/dashboard", label: "Dashboard", requiresAuth: true },
    { href: "/orders", label: "Orders", requiresAuth: true },
];

const formatCount = (count: number) => (count > 99 ? "99+" : count.toString());

export default function Header() {
    const pathname = usePathname();

    const { user, setUser, cartCount, setCartCount, isLoading } = useCart();

    const [mounted, setMounted] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const isCartLoading = !mounted || isLoading;

    const handleLogout = async () => {
        setUser(null);
        setCartCount(0);
        await logoutAction();
    };

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const navLinkClass = (active: boolean) =>
        `flex items-center whitespace-nowrap text-sm font-semibold leading-none no-underline transition-all duration-200 ${
            active
                ? "text-orange font-bold relative after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-0.5 after:bg-orange after:rounded-full"
                : "text-muted hover:text-orange"
        }`;

    return (
        <header className="w-full border-b border-border bg-white sticky top-0 z-40 overflow-x-clip">
            <div className="w-full bg-white px-7 py-3 max-[1100px]:px-5 max-[768px]:px-4 max-[600px]:px-3 max-[600px]:py-2.5">
                <div className="flex flex-wrap items-center w-full min-h-12 max-[600px]:min-h-10">
                    <button
                        type="button"
                        aria-label="Toggle navigation menu"
                        aria-controls="mobile-navigation-menu"
                        aria-expanded={mobileMenuOpen}
                        onClick={() => setMobileMenuOpen((open) => !open)}
                        className="order-1 mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-1 text-charcoal hover:text-orange transition-colors max-[768px]:mr-2 max-[600px]:mr-1.5"
                    >
                        <FontAwesomeIcon
                            icon={faBars}
                            className="w-5.5 h-auto text-xl max-[768px]:w-5 max-[600px]:w-4.5"
                        />
                    </button>

                    <Link
                        href="/"
                        className="order-2 flex w-45 shrink-0 flex-col justify-center border-l border-border-dark pl-4.5 leading-none no-underline max-[1100px]:w-40 max-[768px]:w-auto max-[768px]:pl-2.5 max-[600px]:pl-2"
                    >
                        <span className="ml-0.5 font-display text-xs font-medium tracking-[3px] text-muted max-[768px]:text-[9px] max-[768px]:tracking-[2px] max-[600px]:text-[8px] max-[600px]:tracking-[1.5px]">
                            ONLINE
                        </span>
                        <span className="font-display text-3xl font-extrabold tracking-tight text-charcoal max-[1100px]:text-2xl max-[768px]:text-xl max-[600px]:text-base">
                            EXPRESS
                        </span>
                    </Link>

                    <SearchBar />

                    <nav
                        className="order-3 ml-auto flex shrink-0 items-center gap-6 max-[1100px]:gap-4 max-[768px]:gap-3 min-[600px]:order-4"
                        aria-label="Main navigation"
                    >
                        {NAV_ITEMS.filter((item) => !item.requiresAuth).map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                aria-current={isActive(href) ? "page" : undefined}
                                className={`${navLinkClass(isActive(href))} max-[768px]:hidden`}
                            >
                                {label}
                            </Link>
                        ))}

                        {isCartLoading ? (
                            <div
                                className="flex items-center gap-1.5 pr-1.5 animate-pulse"
                                aria-hidden="true"
                            >
                                <div className="h-5 w-5 rounded-full bg-gray-200 shrink-0" />
                                <div className="h-3.5 w-8 bg-gray-200 rounded-xs max-[768px]:hidden" />
                            </div>
                        ) : (
                            <Link
                                href="/cart"
                                className={`group relative flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold leading-none no-underline transition-colors duration-200 pr-1.5 ${
                                    isActive("/cart")
                                        ? "text-orange font-bold relative after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-0.5 after:bg-orange after:rounded-full"
                                        : "text-muted hover:text-orange"
                                }`}
                                aria-label={`Shopping cart with ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
                            >
                                <div className="relative flex items-center justify-center">
                                    <FontAwesomeIcon
                                        icon={faCartShopping}
                                        className="text-base leading-none transition-transform duration-200 group-hover:scale-110 w-4 h-4 shrink-0"
                                    />
                                    <span
                                        id="cart-item-badge"
                                        aria-hidden="true"
                                        className={`absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange px-1 font-display font-bold text-white shadow-xs leading-none max-[600px]:h-3.5 max-[600px]:min-w-3.5 ${
                                            cartCount > 99
                                                ? "text-[8px] tracking-tighter max-[600px]:text-[7.5px]"
                                                : "text-[10px] max-[600px]:text-[9px]"
                                        }`}
                                    >
                                        {formatCount(cartCount)}
                                    </span>
                                </div>
                                <span className="max-[768px]:hidden">Cart</span>
                            </Link>
                        )}

                        <HeaderUserMenu user={user} onLogout={handleLogout} isLoading={isCartLoading} />
                    </nav>
                </div>
            </div>

            {mobileMenuOpen && (
                <div
                    id="mobile-navigation-menu"
                    className="w-full border-t border-border bg-white px-5 py-3 min-[769px]:hidden flex flex-col gap-2.5 shadow-xs"
                >
                    {NAV_ITEMS.filter((item) => !item.requiresAuth || (mounted && user)).map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            aria-current={isActive(href) ? "page" : undefined}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`text-sm font-semibold py-1.5 no-underline transition-colors ${
                                isActive(href)
                                    ? "text-orange font-bold pl-2 border-l-2 border-orange"
                                    : "text-muted hover:text-orange"
                            }`}
                        >
                            {label}
                        </Link>
                    ))}

                    {isCartLoading ? (
                        <div className="flex items-center gap-2 py-1.5 animate-pulse" aria-hidden="true">
                            <div className="h-4 w-4 rounded-full bg-gray-200 shrink-0" />
                            <div className="h-3.5 w-16 bg-gray-200 rounded-xs" />
                        </div>
                    ) : (
                        <Link
                            href="/cart"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`text-sm font-semibold py-1.5 no-underline transition-colors flex items-center gap-2 ${
                                isActive("/cart") ? "text-orange font-bold pl-2 border-l-2 border-orange" : "text-muted hover:text-orange"
                            }`}
                        >
                            <FontAwesomeIcon icon={faCartShopping} className="text-sm w-3.5 h-3.5 shrink-0" />
                            <span>Cart ({formatCount(cartCount)})</span>
                        </Link>
                    )}

                    {isCartLoading ? (
                        <div className="border-t border-border pt-2 mt-1 flex items-center gap-2 py-1 animate-pulse" aria-hidden="true">
                            <div className="h-7 w-7 rounded-full bg-gray-200 shrink-0" />
                            <div className="flex flex-col gap-1">
                                <div className="h-3 w-20 bg-gray-200 rounded-xs" />
                                <div className="h-2 w-14 bg-gray-200 rounded-xs" />
                            </div>
                        </div>
                    ) : user ? (
                        <div className="border-t border-border pt-2 mt-1 flex flex-col gap-2">
                            <div className="flex items-center gap-2 py-1">
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange/15 border border-orange/40 text-orange font-bold text-xs">
                                    {user.name ? user.name.charAt(0).toUpperCase() : "👤"}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-charcoal truncate">
                                        {user.name || "Customer"}
                                    </span>
                                    <span className="text-[10px] text-muted uppercase tracking-wider">
                                        {user.role ? `Role: ${user.role}` : "Active Session"}
                                    </span>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    handleLogout();
                                }}
                                className="text-xs font-semibold text-red-600 py-1.5 no-underline text-left border-0 bg-transparent cursor-pointer flex items-center gap-2 hover:text-red-700 transition-colors"
                            >
                                <FontAwesomeIcon icon={faRightFromBracket} className="text-xs w-3 h-3 shrink-0" />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-sm font-semibold py-1.5 no-underline text-muted hover:text-orange border-t border-border pt-2 mt-1 flex items-center justify-between"
                        >
                            <span>Sign In</span>
                            <FontAwesomeIcon icon={faRightToBracket} className="text-sm w-3.5 h-3.5 shrink-0" />
                        </Link>
                    )}
                </div>
            )}
        </header>
    );
}
