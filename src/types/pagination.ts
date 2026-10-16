import type { ProductResponse } from "./product";

export interface PaginationProps {
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
}

export interface ProductPagedResponse {
    products: ProductResponse[];
    page: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
}