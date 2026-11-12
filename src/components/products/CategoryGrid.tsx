import Link from "next/link";
import { productApiService } from "@/services/productApiServices";
import CategoryGridError from "./CategoryGridError";
import type { CategoryItem } from "@/types/product";

export default async function CategoryGrid() {
    let fetchError: Error | null = null;
    let categories: CategoryItem[] = [];

    try {
        const res = await productApiService.getCategories({ next: { revalidate: 60 } });

        if (!res.success) {
            fetchError = new Error(res.error || "Failed to load product categories.");
        } else if (!res.data || res.data.length === 0) {
            fetchError = new Error("No product categories found.");
        } else {
            categories = res.data;
        }
    } catch (error) {
        fetchError = error instanceof Error ? error : new Error("Failed to load product categories.");
    }

    if (fetchError) {
        return <CategoryGridError error={fetchError} />;
    }

    return (
        <section className="w-full bg-white px-6 py-7.5 max-[520px]:px-4.5 max-[520px]:pt-10 max-[520px]:pb-13.75">
            <div className="mx-auto w-full max-w-287.5 max-[900px]:max-w-175 max-[520px]:max-w-full">
                <h2 className="m-0 mb-7 text-black font-display text-3xl font-extrabold leading-tight tracking-tight text-center max-[768px]:text-2xl max-[480px]:text-xl">
                    Shop by Category
                </h2>

                <div className="grid grid-cols-4 gap-x-6.5 gap-y-3 max-[900px]:grid-cols-2 max-[900px]:gap-x-4.5 max-[520px]:grid-cols-1 max-[520px]:gap-2.5">
                    {categories.map((category) => (
                        <Link
                            key={category.categoryId}
                            href={`/products?categoryId=${category.categoryId}`}
                            className="flex items-center justify-center w-full h-13 px-4 py-2.5 border-2 border-charcoal rounded-md bg-white text-orange font-display text-sm font-bold tracking-wide whitespace-nowrap hover:bg-orange hover:border-orange hover:text-white transition-colors max-[520px]:h-12 max-[520px]:text-xs no-underline"
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}