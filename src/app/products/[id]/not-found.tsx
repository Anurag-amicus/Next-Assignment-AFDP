import Link from "next/link";
import Breadcrumb from "@/components/common/Breadcrumb";
import Button from "@/components/common/Button";

export default function ProductNotFound() {
    return (
        <div className="w-full pt-4.5 px-6 pb-15 max-[520px]:pt-7 max-[520px]:px-4 max-[520px]:pb-10">
            {/* Breadcrumb Navigation */}
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "Products", href: "/products" },
                    { label: "Product Not Found" },
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

            {/* Not Found Card */}
            <div className="max-w-md mx-auto text-center py-12 px-6 border border-border bg-white rounded-xs shadow-xs my-8">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 text-2xl font-bold">
                    ?
                </div>
                <h2 className="font-display text-xl font-bold uppercase text-charcoal mb-2">
                    Product Not Found
                </h2>
                <p className="text-sm text-muted mb-6 leading-relaxed">
                    The product you are looking for does not exist or may have been removed from our catalog.
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
        </div>
    );
}
