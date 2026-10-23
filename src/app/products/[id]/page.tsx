import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/common/Breadcrumb";
import Button from "@/components/common/Button";
import AddToCartSection from "@/components/products/AddToCartSection";
import { productApiService } from "@/services/productApiServices";
import { transformProduct } from "@/utils/dataTransformation";
import type { Metadata } from "next";

export interface ProductDetailPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({
    params,
}: ProductDetailPageProps): Promise<Metadata> {
    const { id } = await params;

    try {
        const res = await productApiService.getProductById(id, { cache: "no-store" });
        if (res.success && res.data) {
            const product = transformProduct(res.data);
            return {
                title: `${product.name} | Online Express`,
                description: `Buy ${product.name} at the best price on Online Express. ${
                    product.description || ""
                }`.trim(),
            };
        }
    } catch {
        // Fallback below
    }

    return {
        title: "Product Details | Online Express",
        description: "View product details and specifications on Online Express.",
    };
}

export default async function ProductDetailPage({
    params,
}: ProductDetailPageProps) {
    const { id } = await params;

    let product = null;
    let error: string | null = null;

    try {
        const res = await productApiService.getProductById(id, { cache: "no-store" });
        if (res.success && res.data) {
            product = transformProduct(res.data);
        } else {
            error = !res.success
                ? res.error
                : "The product you requested could not be located.";
        }
    } catch (err) {
        error =
            err instanceof Error ? err.message : "Failed to load product details.";
    }

    const fullStars = product ? Math.floor(product.rating) : 0;
    const emptyStars = product ? 5 - fullStars : 0;

    return (
        <div className="w-full pt-4.5 px-6 pb-15 max-[520px]:pt-7 max-[520px]:px-4 max-[520px]:pb-10">
            {/* Breadcrumb Navigation */}
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "Products", href: "/products" },
                    {
                        label: product
                            ? product.name
                            : id
                            ? `Product #${id}`
                            : "Product",
                    },
                ]}
            />

            {/* Back Link */}
            <div className="mb-4">
                <Link
                    href="/products"
                    className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-orange transition-colors no-underline"
                >
                    <span aria-hidden="true">←</span>
                    <span>Back to Products</span>
                </Link>
            </div>

            {/* Error / Not Found State */}
            {(!product || error) && (
                <div className="max-w-md mx-auto text-center py-12 px-6 border border-border bg-white rounded-xs shadow-xs">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-2xl font-bold">
                        !
                    </div>
                    <h2 className="font-display text-xl font-bold uppercase text-charcoal mb-2">
                        Product Not Found
                    </h2>
                    <p className="text-sm text-muted mb-6 leading-relaxed">
                        {error || "The product you requested could not be located."}
                    </p>
                    <Link href="/products">
                        <Button
                            variant="primary"
                            className="h-10 px-6 font-bold uppercase text-xs tracking-wider"
                        >
                            Browse All Products
                        </Button>
                    </Link>
                </div>
            )}

            {/* Product Details View */}
            {product && (
                <div className="grid grid-cols-12 gap-8 max-[900px]:grid-cols-1 items-start">
                    {/* Left: Product Image Card */}
                    <div className="col-span-5 max-[900px]:col-span-1 bg-white border border-border rounded-xs p-6 flex items-center justify-center min-h-90 shadow-xs">
                        <Image
                            src={product.imageUrl || "/product-placeholder.svg"}
                            alt={product.name}
                            width={320}
                            height={320}
                            unoptimized
                            className="max-h-80 max-w-full object-contain transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    {/* Right: Product Information */}
                    <div className="col-span-7 max-[900px]:col-span-1 flex flex-col">
                        {/* Category & Brand Badges */}
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="text-[11px] font-bold uppercase tracking-wider bg-orange/10 text-orange px-2.5 py-1 rounded-xs">
                                {product.category}
                            </span>
                            {product.brandName && (
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted bg-surface px-2.5 py-1 rounded-xs">
                                    Brand: {product.brandName}
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="font-display text-2xl md:text-3xl font-bold uppercase text-charcoal leading-tight m-0 mb-3 tracking-wide">
                            {product.name}
                        </h1>

                        {/* Ratings */}
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-orange text-lg leading-none tracking-[-1px]">
                                {"★".repeat(fullStars)}
                                <span className="text-gray-200">
                                    {"★".repeat(emptyStars)}
                                </span>
                            </span>
                            <span className="text-xs font-semibold text-charcoal">
                                {product.rating.toFixed(1)} / 5.0
                            </span>
                            <span className="text-xs text-muted">
                                (Verified Product)
                            </span>
                        </div>

                        {/* Price */}
                        <div className="mb-4 pb-4 border-b border-border">
                            <div className="flex items-baseline gap-2">
                                <span className="font-display text-3xl font-extrabold text-charcoal">
                                    ₹{product.price.toLocaleString("en-IN")}
                                </span>
                                <span className="text-xs text-muted font-normal">
                                    Inclusive of all taxes
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-2 font-display">
                                Description
                            </h2>
                            <p className="text-sm text-charcoal leading-relaxed m-0">
                                {product.description ||
                                    "High-quality product engineered for outstanding durability, everyday versatility, and premium performance."}
                            </p>
                        </div>

                        {/* Interactive Quantity & Add to Cart */}
                        <AddToCartSection product={product} />

                        {/* Product Guarantee Perks */}
                        <div className="grid grid-cols-3 max-[600px]:grid-cols-1 gap-3 pt-2 text-xs text-muted border-t border-border">
                            <div className="flex items-center gap-2">
                                <span className="text-orange font-bold text-base">✓</span>
                                <span>Free shipping over ₹500</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-orange font-bold text-base">✓</span>
                                <span>7-day easy returns</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-orange font-bold text-base">✓</span>
                                <span>100% Genuine product</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
