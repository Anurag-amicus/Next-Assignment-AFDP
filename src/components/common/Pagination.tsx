"use client";

import { memo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/common/Button";

export interface PaginationProps {
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
}

function getVisiblePages(currentPage: number, totalPages: number): number[] {
    if (totalPages <= 3) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 1) {
        return [1, 2, 3];
    }
    if (currentPage >= totalPages) {
        return [totalPages - 2, totalPages - 1, totalPages];
    }
    return [currentPage - 1, currentPage, currentPage + 1];
}

const Pagination = memo(function Pagination({
    currentPage = 1,
    totalPages = 1,
    onPageChange,
}: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    if (totalPages <= 1) {
        return null;
    }

    const visiblePages = getVisiblePages(currentPage, totalPages);

    const changePage = (page: number) => {
        if (onPageChange) {
            onPageChange(page);
        } else {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", String(page));
            router.push(`/products?${params.toString()}`);
        }
    };

    return (
        <div className="flex items-center justify-center gap-5 mb-10 mt-8 select-none">
            <Button
                variant="generic"
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage <= 1}
                aria-label="Previous page"
                className="w-auto h-auto p-0 text-base font-bold text-orange hover:text-orange-dark disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
            >
                &lt; Previous
            </Button>

            <div className="flex items-center gap-3">
                {visiblePages.map((page) => {
                    const isCurrent = page === currentPage;
                    return isCurrent ? (
                        <Button
                            key={page}
                            variant="primary"
                            className="w-8.5 h-8.5 p-0 rounded-xs flex items-center justify-center text-base font-bold"
                        >
                            {page}
                        </Button>
                    ) : (
                        <Button
                            key={page}
                            variant="generic"
                            onClick={() => changePage(page)}
                            className="w-8.5 h-8.5 p-0 rounded-xs flex items-center justify-center text-base font-bold text-black hover:text-orange border border-border hover:border-orange transition-all"
                        >
                            {page}
                        </Button>
                    );
                })}
            </div>

            <Button
                variant="generic"
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                aria-label="Next page"
                className="w-auto h-auto p-0 text-base font-bold text-orange hover:text-orange-dark disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
            >
                Next &gt;
            </Button>
        </div>
    );
});

export default Pagination;
