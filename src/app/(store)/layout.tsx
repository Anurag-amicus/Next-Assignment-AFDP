import { Suspense } from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import RefreshButton from "@/components/products/RefreshButton";
import Sidebar from "@/components/layout/Sidebar";
import { apiService } from "@/services/apiService";
import type { CategoryItem, BrandItem } from "@/types/product";

export default async function StoreLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    let categories: CategoryItem[] = [];
    let brands: BrandItem[] = [];

    try {
        const [catRes, brandRes] = await Promise.all([
            apiService.getCategories({ cache: "no-store" }),
            apiService.getBrands({ cache: "no-store" }),
        ]);
        if (catRes.success && catRes.data) categories = catRes.data;
        if (brandRes.success && brandRes.data) brands = brandRes.data;
    } catch {
        // Fallback
    }

    return (
        <div className="w-full mx-auto pt-4.5 px-6 pb-15 max-[520px]:pt-7 max-[520px]:px-4 max-[520px]:pb-10">
            <div className="mb-4">
                {/* Breadcrumb */}
                <Breadcrumb />

                {/* Heading + Refresh */}
                <div className="flex items-center justify-between max-[520px]:items-start max-[520px]:gap-4">
                    <h1 className="m-0 text-charcoal font-display text-4xl font-bold leading-tight max-[520px]:text-2xl">
                        Product Listing
                    </h1>

                    <RefreshButton />
                </div>
            </div>

            {/* 2-Column Store Layout (Sidebar + Content) */}
            <div className="grid grid-cols-[200px_minmax(0,1fr)] gap-6.5 items-start max-[800px]:grid-cols-1 max-[800px]:gap-4.5">
                <Suspense fallback={<div className="w-full mt-9 h-96 bg-white animate-pulse" />}>
                    <Sidebar categories={categories} brands={brands} />
                </Suspense>
                <section className="min-w-0">{children}</section>
            </div>
        </div>
    );
}
