"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faCartShopping,
    faRightToBracket,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

export interface HeaderProps {
    cartCount?: number;
}

export default function Header({ cartCount = 0 }: HeaderProps) {
    const router = useRouter();
    const pathname = usePathname();

    const [searchValue, setSearchValue] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const trimmed = searchValue.trim();
        if (trimmed) {
            router.push(`/products?search=${encodeURIComponent(trimmed)}`);
        } else {
            router.push("/products");
        }
    };

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center whitespace-nowrap text-sm font-semibold leading-none no-underline transition-all duration-200 ${
            isActive
                ? "text-orange font-bold relative after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-0.5 after:bg-orange after:rounded-full"
                : "text-muted hover:text-orange"
        }`;

    return (
        <header className="w-full border-b border-border bg-white sticky top-0 z-40">
            <div className="w-full bg-white px-7 py-3 max-[1100px]:px-5 max-[768px]:px-4 max-[600px]:px-3 max-[600px]:py-2.5">
                <div className="flex items-center w-full min-h-12 max-[600px]:min-h-10">
                    {/* Hamburger Button for Mobile */}
                    <button
                        type="button"
                        aria-label="Toggle navigation menu"
                        aria-expanded={mobileMenuOpen}
                        onClick={() => setMobileMenuOpen((open) => !open)}
                        className="mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-1 max-[768px]:mr-2 max-[600px]:mr-1.5"
                    >
                        <Image
                            src="/burger-menu-svgrepo-com.svg"
                            alt="Menu"
                            width={28}
                            height={28}
                            className="w-7 h-auto max-[768px]:w-6 max-[600px]:w-5.5"
                        />
                    </button>

                    {/* Brand Logo */}
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

                    {/* Desktop / Tablet Search Form */}
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
                            onChange={(event) => setSearchValue(event.target.value)}
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

                    {/* Navigation Links */}
                    <nav
                        className="ml-auto flex shrink-0 items-center gap-4 max-[1100px]:gap-3 max-[768px]:gap-2"
                        aria-label="Main navigation"
                    >
                        <Link
                            href="/"
                            className={`${navLinkClass({ isActive: isActive("/") })} max-[768px]:hidden`}
                        >
                            Home
                        </Link>

                        <Link
                            href="/products"
                            className={`${navLinkClass({ isActive: isActive("/products") })} max-[768px]:hidden`}
                        >
                            Products
                        </Link>

                        <Link
                            href="/about"
                            className={`${navLinkClass({ isActive: isActive("/about") })} max-[768px]:hidden`}
                        >
                            About
                        </Link>

                        {/* Sign In Link */}
                        <Link
                            href="/login"
                            className="flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-charcoal hover:text-orange transition-colors px-2.5 py-1.5"
                        >
                            <span>Sign In</span>
                            <FontAwesomeIcon icon={faRightToBracket} className="text-sm" />
                        </Link>

                        {/* Cart Link */}
                        <Link
                            href="/cart"
                            className="relative flex items-center justify-center p-2 text-charcoal hover:text-orange transition-colors"
                            aria-label={`Shopping cart with ${cartCount} items`}
                        >
                            <FontAwesomeIcon icon={faCartShopping} className="text-lg" />
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-orange px-1 text-[10px] font-bold text-white leading-none">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </nav>
                </div>

                {/* Mobile Search Bar (<600px) */}
                <form
                    onSubmit={handleSearchSubmit}
                    className="mt-2.5 flex min-[600px]:hidden h-9 w-full items-stretch overflow-hidden rounded-sm border border-border-dark bg-white"
                >
                    <input
                        name="mobile-search"
                        type="text"
                        placeholder="Search products..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="min-w-0 flex-1 border-0 bg-transparent px-3 text-xs text-black outline-none"
                    />
                    <button
                        type="submit"
                        aria-label="Search"
                        className="flex h-full w-9 shrink-0 items-center justify-center border-0 bg-transparent p-0 text-orange"
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xs" />
                    </button>
                </form>
            </div>

            {/* Mobile Navigation Drawer */}
            {mobileMenuOpen && (
                <div className="min-[769px]:hidden fixed inset-0 z-50 flex">
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white p-6 shadow-xl">
                        <div className="flex items-center justify-between pb-4 border-b border-border">
                            <span className="font-display text-xl font-bold text-charcoal">
                                MENU
                            </span>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-1 text-muted hover:text-black cursor-pointer border-0 bg-transparent"
                                aria-label="Close menu"
                            >
                                <FontAwesomeIcon icon={faXmark} className="text-xl" />
                            </button>
                        </div>
                        <nav className="flex flex-col gap-4 mt-6">
                            <Link
                                href="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className={`text-base font-semibold py-1 transition-all duration-200 w-fit ${
                                    isActive("/")
                                        ? "text-orange font-bold relative after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-orange after:rounded-full"
                                        : "text-charcoal hover:text-orange"
                                }`}
                            >
                                Home
                            </Link>
                            <Link
                                href="/products"
                                onClick={() => setMobileMenuOpen(false)}
                                className={`text-base font-semibold py-1 transition-all duration-200 w-fit ${
                                    isActive("/products")
                                        ? "text-orange font-bold relative after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-orange after:rounded-full"
                                        : "text-charcoal hover:text-orange"
                                }`}
                            >
                                Products
                            </Link>
                            <Link
                                href="/about"
                                onClick={() => setMobileMenuOpen(false)}
                                className={`text-base font-semibold py-1 transition-all duration-200 w-fit ${
                                    isActive("/about")
                                        ? "text-orange font-bold relative after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-orange after:rounded-full"
                                        : "text-charcoal hover:text-orange"
                                }`}
                            >
                                About
                            </Link>
                            <Link
                                href="/login"
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-base font-semibold text-charcoal hover:text-orange py-2 flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faRightToBracket} />
                                Sign In
                            </Link>
                            <Link
                                href="/cart"
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-base font-semibold text-charcoal hover:text-orange py-2 flex items-center justify-between"
                            >
                                <span className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faCartShopping} />
                                    Cart
                                </span>
                                {cartCount > 0 && (
                                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-orange px-1.5 text-xs font-bold text-white leading-none">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}
