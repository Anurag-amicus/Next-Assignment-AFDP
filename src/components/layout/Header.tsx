"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faCartShopping,
    faRightToBracket,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useDebounce } from "@/hooks/useDebounce";
import { logoutAction } from "@/app/actions/authActions";
import HeaderUserMenu from "./HeaderUserMenu";
import type { User } from "@/types/auth";

export interface HeaderProps {
    cartCount?: number;
    searchTerm?: string;
    onSearchChange?: (value: string) => void;
}

export default function Header({
    cartCount = 0,
    searchTerm,
    onSearchChange,
}: HeaderProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // If user is already loaded, skip fetching on regular page navigation
        if (user && pathname !== "/login" && pathname !== "/register") return;

        let isMounted = true;
        fetch("/api/auth/me", { cache: "no-store" })
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
                if (isMounted) {
                    setUser(data?.user || null);
                }
            })
            .catch(() => {
                if (isMounted) setUser(null);
            });

        return () => {
            isMounted = false;
        };
    }, [pathname, user]);

    const isProductListingPage = pathname === "/products";
    const queryParam = searchParams.get("search") || "";
    const targetValue = searchTerm ?? (isProductListingPage ? queryParam : "");

    const [searchValue, setSearchValue] = useState(targetValue);
    const [prevTargetValue, setPrevTargetValue] = useState(targetValue);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    if (targetValue !== prevTargetValue) {
        setPrevTargetValue(targetValue);
        setSearchValue(targetValue);
    }

    const debouncedSearch = useDebounce(searchValue, 300);

    useEffect(() => {
        if (!isProductListingPage) return;

        const currentSearch = searchParams.get("search") || "";
        const nextSearch = debouncedSearch.trim();

        if (currentSearch !== nextSearch) {
            const nextParams = new URLSearchParams(searchParams.toString());
            if (nextSearch) {
                nextParams.set("search", nextSearch);
            } else {
                nextParams.delete("search");
            }
            nextParams.delete("page");
            const query = nextParams.toString();
            router.push(`/products${query ? `?${query}` : ""}`);
        }
    }, [debouncedSearch, isProductListingPage, searchParams, router]);

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const trimmed = searchValue.trim();
        if (isProductListingPage) {
            const nextParams = new URLSearchParams(searchParams.toString());
            if (trimmed) {
                nextParams.set("search", trimmed);
            } else {
                nextParams.delete("search");
            }
            nextParams.delete("page");
            const query = nextParams.toString();
            router.push(`/products${query ? `?${query}` : ""}`);
        } else {
            router.push(trimmed ? `/products?search=${encodeURIComponent(trimmed)}` : "/products");
        }
    };

    const handleLogout = async () => {
        setUser(null);
        await logoutAction();
    };

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const navLinkClass = ({ active }: { active: boolean }) =>
        `flex items-center whitespace-nowrap text-sm font-semibold leading-none no-underline transition-all duration-200 ${
            active
                ? "text-orange font-bold relative after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-0.5 after:bg-orange after:rounded-full"
                : "text-muted hover:text-orange"
        }`;

    return (
        <header className="w-full border-b border-border bg-white sticky top-0 z-40 overflow-x-clip">
            <div className="w-full bg-white px-7 py-3 max-[1100px]:px-5 max-[768px]:px-4 max-[600px]:px-3 max-[600px]:py-2.5">
                <div className="flex items-center w-full min-h-12 max-[600px]:min-h-10">
                    <button
                        type="button"
                        aria-label="Toggle navigation menu"
                        aria-expanded={mobileMenuOpen}
                        onClick={() => setMobileMenuOpen((open) => !open)}
                        className="mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-1 max-[768px]:mr-2 max-[600px]:mr-1.5"
                    >
                        <Image
                            src="/burger-menu-svgrepo-com.svg"
                            alt=""
                            width={28}
                            height={28}
                            className="w-7 h-auto max-[768px]:w-6 max-[600px]:w-5.5"
                        />
                    </button>

                    <Link
                        href="/"
                        className="flex w-45 shrink-0 flex-col justify-center border-l border-border-dark pl-4.5 leading-none no-underline max-[1100px]:w-40 max-[768px]:w-auto max-[768px]:pl-2.5 max-[600px]:pl-2"
                    >
                        <span className="ml-0.5 font-display-medium text-xs font-medium tracking-[3px] text-muted max-[768px]:text-[9px] max-[768px]:tracking-[2px] max-[600px]:text-[8px] max-[600px]:tracking-[1.5px]">
                            ONLINE
                        </span>
                        <span className="font-display text-3xl font-extrabold tracking-tight text-charcoal max-[1100px]:text-2xl max-[768px]:text-xl max-[600px]:text-base">
                            EXPRESS
                        </span>
                    </Link>

                    <form
                        id="search-products"
                        onSubmit={handleSearchSubmit}
                        className="ml-10 mr-8 hidden min-[600px]:flex h-10.5 min-w-0 max-w-162.5 flex-1 items-stretch overflow-hidden rounded-sm border border-border-dark bg-white transition-[border-color,box-shadow] duration-200 focus-within:border-orange focus-within:ring-2 focus-within:ring-orange/20 max-[1100px]:ml-6 max-[1100px]:mr-4 max-[768px]:mx-3 max-[768px]:h-9.5"
                    >
                        <input
                            name="search"
                            type="text"
                            placeholder="Search Products..."
                            aria-label="Search Products"
                            value={searchValue}
                            onChange={(event) => {
                                setSearchValue(event.target.value);
                                onSearchChange?.(event.target.value);
                            }}
                            className="min-w-0 flex-1 border-0 bg-transparent px-3.5 text-sm text-black outline-none placeholder:text-subtle"
                        />
                        <button
                            type="submit"
                            aria-label="Search"
                            className="flex h-full w-12 shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0 max-[768px]:w-9"
                        >
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                className="text-base text-orange max-[768px]:text-sm"
                            />
                        </button>
                    </form>

                    <nav
                        className="ml-auto flex shrink-0 items-center gap-6 max-[1100px]:gap-4 max-[768px]:gap-3"
                        aria-label="Main navigation"
                    >
                        <Link
                            href="/"
                            className={`${navLinkClass({ active: isActive("/") })} max-[768px]:hidden`}
                        >
                            Home
                        </Link>

                        <Link
                            href="/products"
                            className={`${navLinkClass({ active: isActive("/products") })} max-[768px]:hidden`}
                        >
                            Products
                        </Link>

                        <Link
                            href="/about"
                            className={`${navLinkClass({ active: isActive("/about") })} max-[768px]:hidden`}
                        >
                            About
                        </Link>

                        <Link
                            href="/cart"
                            className={`group relative flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold leading-none no-underline transition-colors duration-200 pr-1.5 ${
                                isActive("/cart")
                                    ? "text-orange font-bold relative after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-0.5 after:bg-orange after:rounded-full"
                                    : "text-muted hover:text-orange"
                            }`}
                            aria-label={`Shopping cart with ${cartCount} items`}
                        >
                            <div className="relative flex items-center justify-center">
                                <FontAwesomeIcon
                                    icon={faCartShopping}
                                    className="text-base leading-none transition-transform duration-200 group-hover:scale-110"
                                />
                                <span
                                    id="cart-item-badge"
                                    className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange px-1 font-display text-[10px] font-bold text-white shadow-xs leading-none max-[600px]:h-3.5 max-[600px]:min-w-3.5 max-[600px]:text-[9px]"
                                >
                                    {cartCount}
                                </span>
                            </div>
                            <span className="max-[768px]:hidden">Cart</span>
                        </Link>

                        <HeaderUserMenu user={user} onLogout={handleLogout} />
                    </nav>
                </div>

                <form
                    onSubmit={handleSearchSubmit}
                    className="mt-2.5 flex h-9 w-full min-w-0 items-stretch overflow-hidden rounded-sm border border-border-dark bg-white transition-[border-color,box-shadow] duration-200 focus-within:border-orange focus-within:ring-2 focus-within:ring-orange/20 min-[600px]:hidden"
                >
                    <input
                        name="searchbar"
                        type="text"
                        placeholder="Search products..."
                        aria-label="Search products"
                        value={searchValue}
                        onChange={(event) => {
                            setSearchValue(event.target.value);
                            onSearchChange?.(event.target.value);
                        }}
                        className="w-full min-w-0 flex-1 border-0 bg-transparent px-3 text-xs text-black outline-none placeholder:text-subtle"
                    />
                    <button
                        type="submit"
                        aria-label="Search"
                        className="flex h-full w-9 shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0"
                    >
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="text-sm text-orange"
                        />
                    </button>
                </form>
            </div>

            {mobileMenuOpen && (
                <div
                    id="mobile-navigation-menu"
                    className="w-full border-t border-border bg-white px-5 py-3 min-[769px]:hidden flex flex-col gap-2.5 shadow-xs"
                >
                    <Link
                        href="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-sm font-semibold py-1.5 no-underline transition-colors ${
                            isActive("/") ? "text-orange font-bold pl-2 border-l-2 border-orange" : "text-muted hover:text-orange"
                        }`}
                    >
                        Home
                    </Link>

                    <Link
                        href="/products"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-sm font-semibold py-1.5 no-underline transition-colors ${
                            isActive("/products") ? "text-orange font-bold pl-2 border-l-2 border-orange" : "text-muted hover:text-orange"
                        }`}
                    >
                        Products
                    </Link>

                    {user && (
                        <Link
                            href="/dashboard"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`text-sm font-semibold py-1.5 no-underline transition-colors ${
                                isActive("/dashboard") ? "text-orange font-bold pl-2 border-l-2 border-orange" : "text-muted hover:text-orange"
                            }`}
                        >
                            Dashboard
                        </Link>
                    )}

                    <Link
                        href="/orders"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-sm font-semibold py-1.5 no-underline transition-colors ${
                            isActive("/orders") ? "text-orange font-bold pl-2 border-l-2 border-orange" : "text-muted hover:text-orange"
                        }`}
                    >
                        Orders
                    </Link>

                    <Link
                        href="/cart"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-sm font-semibold py-1.5 no-underline transition-colors flex items-center gap-2 ${
                            isActive("/cart") ? "text-orange font-bold pl-2 border-l-2 border-orange" : "text-muted hover:text-orange"
                        }`}
                    >
                        <FontAwesomeIcon icon={faCartShopping} className="text-sm" />
                        <span>Cart ({cartCount})</span>
                    </Link>

                    {user ? (
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
                                    handleLogout();
                                    setMobileMenuOpen(false);
                                }}
                                className="text-xs font-semibold text-red-600 py-1.5 no-underline text-left border-0 bg-transparent cursor-pointer flex items-center gap-2 hover:text-red-700 transition-colors"
                            >
                                <FontAwesomeIcon icon={faRightFromBracket} className="text-xs" />
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
                            <FontAwesomeIcon icon={faRightToBracket} className="text-sm" />
                        </Link>
                    )}
                </div>
            )}
        </header>
    );
}
