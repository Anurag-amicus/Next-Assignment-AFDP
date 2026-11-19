"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDebounce } from "@/hooks/useDebounce";

function buildProductsUrl(params: URLSearchParams, search: string): string {
    const next = new URLSearchParams(params.toString());
    if (search) {
        next.set("search", search);
    } else {
        next.delete("search");
    }
    next.delete("page");
    const query = next.toString();
    return `/products${query ? `?${query}` : ""}`;
}

export default function SearchBar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [, startTransition] = useTransition();

    const isProductListingPage = pathname === "/products";
    const queryParam = isProductListingPage ? searchParams.get("search") || "" : "";

    const [searchValue, setSearchValue] = useState(queryParam);
    const lastPushed = useRef(queryParam);

    // Sync input when URL search param changes externally (Back/Forward, clear button)
    useEffect(() => {
        if (queryParam !== lastPushed.current) {
            lastPushed.current = queryParam;
            setSearchValue(queryParam);
        }
    }, [queryParam]);

    const debouncedSearch = useDebounce(searchValue, 300);

    // Live debounced search when on /products
    useEffect(() => {
        if (!isProductListingPage) return;

        const currentParam = searchParams.get("search") || "";
        const nextSearch = debouncedSearch.trim();

        if (currentParam !== nextSearch) {
            lastPushed.current = nextSearch;
            startTransition(() => {
                router.replace(buildProductsUrl(searchParams, nextSearch));
            });
        }
    }, [debouncedSearch, isProductListingPage, searchParams, router]);

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const trimmed = searchValue.trim();
        lastPushed.current = trimmed;

        if (isProductListingPage) {
            router.push(buildProductsUrl(searchParams, trimmed));
        } else {
            router.push(trimmed ? `/products?search=${encodeURIComponent(trimmed)}` : "/products");
        }
    };

    return (
        <form
            id="search-products"
            onSubmit={handleSearchSubmit}
            className="order-4 mt-2.5 flex h-9.5 w-full min-w-0 items-stretch overflow-hidden rounded-sm border border-border-dark bg-white transition-[border-color,box-shadow] duration-200 focus-within:border-orange focus-within:ring-2 focus-within:ring-orange/20 min-[600px]:order-3 min-[600px]:mt-0 min-[600px]:ml-10 min-[600px]:mr-8 min-[600px]:h-10.5 min-[600px]:max-w-162.5 min-[600px]:flex-1 max-[1100px]:min-[600px]:ml-6 max-[1100px]:min-[600px]:mr-4 max-[768px]:min-[600px]:mx-3 max-[768px]:min-[600px]:h-9.5"
        >
            <input
                name="search"
                type="text"
                placeholder="Search products..."
                aria-label="Search products"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                className="min-w-0 flex-1 border-0 bg-transparent px-3 text-xs text-black outline-none placeholder:text-subtle min-[600px]:px-3.5 min-[600px]:text-sm"
            />
            <button
                type="submit"
                aria-label="Search"
                className="flex h-full w-9 shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0 min-[600px]:w-12 max-[768px]:min-[600px]:w-9"
            >
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="text-sm text-orange w-3.5 h-3.5 shrink-0 min-[600px]:text-base min-[600px]:w-4 min-[600px]:h-4 max-[768px]:min-[600px]:text-sm"
                />
            </button>
        </form>
    );
}

