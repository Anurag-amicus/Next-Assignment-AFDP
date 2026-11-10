import CartSkeleton from "@/components/cart/CartSkeleton";

export default function CartLoading() {
    return (
        <div
            className="w-full pt-4.5 px-6 pb-15 max-[520px]:pt-7 max-[520px]:px-4 max-[520px]:pb-10 animate-pulse"
            aria-busy="true"
            aria-label="Loading shopping cart"
        >
            {/* Breadcrumb Skeleton */}
            <div className="flex items-center gap-2 mb-4">
                <div className="h-3.5 w-12 bg-gray-200 rounded-xs" />
                <span className="text-gray-300 text-xs">/</span>
                <div className="h-3.5 w-24 bg-gray-200 rounded-xs" />
            </div>

            {/* Page Title Skeleton */}
            <div className="h-8 w-48 bg-gray-200 rounded-xs mb-6" />

            {/* Two-Column Grid: Cart Items (8 cols) + Order Summary (4 cols) */}
            <div className="grid grid-cols-12 gap-6 items-start max-[990px]:grid-cols-1">
                {/* Left: Cart Items Skeleton */}
                <div className="col-span-8 max-[990px]:col-span-1 min-w-0">
                    <CartSkeleton />
                </div>

                {/* Right: Order Summary Skeleton */}
                <div className="col-span-4 max-[990px]:col-span-1">
                    <div className="bg-surface/50 border border-border rounded-xs p-5 flex flex-col gap-4">
                        <div className="h-5 w-32 bg-gray-200 rounded-xs border-b border-border pb-3" />

                        <div className="space-y-3 py-2 border-b border-border">
                            <div className="flex justify-between">
                                <div className="h-3.5 w-20 bg-gray-200 rounded-xs" />
                                <div className="h-3.5 w-16 bg-gray-200 rounded-xs" />
                            </div>
                            <div className="flex justify-between">
                                <div className="h-3.5 w-24 bg-gray-200 rounded-xs" />
                                <div className="h-3.5 w-14 bg-gray-200 rounded-xs" />
                            </div>
                            <div className="flex justify-between">
                                <div className="h-3.5 w-16 bg-gray-200 rounded-xs" />
                                <div className="h-3.5 w-14 bg-gray-200 rounded-xs" />
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-1">
                            <div className="h-4 w-20 bg-gray-200 rounded-xs" />
                            <div className="h-5 w-24 bg-gray-200 rounded-xs" />
                        </div>

                        <div className="h-11 w-full bg-gray-200 rounded mt-2" />
                    </div>
                </div>
            </div>
        </div>
    );
}

