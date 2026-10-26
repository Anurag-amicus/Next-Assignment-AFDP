export default function ProductDetailLoading() {
    return (
        <div
            className="w-full pt-4.5 px-6 pb-15 max-[520px]:pt-7 max-[520px]:px-4 max-[520px]:pb-10 animate-pulse"
            aria-busy="true"
            aria-label="Loading product details"
        >
            {/* Breadcrumb Skeleton */}
            <div className="flex items-center gap-2 mb-4">
                <div className="h-3.5 w-12 bg-gray-200 rounded-xs" />
                <span className="text-gray-300 text-xs">›</span>
                <div className="h-3.5 w-16 bg-gray-200 rounded-xs" />
                <span className="text-gray-300 text-xs">›</span>
                <div className="h-3.5 w-32 bg-gray-200 rounded-xs" />
            </div>

            {/* Back Link Skeleton */}
            <div className="mb-4">
                <div className="h-3.5 w-28 bg-gray-200 rounded-xs" />
            </div>

            {/* Product Details Grid */}
            <div className="grid grid-cols-12 gap-8 max-[900px]:grid-cols-1 items-start">
                {/* Left: Product Image Skeleton */}
                <div className="col-span-5 max-[900px]:col-span-1 bg-white border border-border rounded-xs p-6 flex items-center justify-center min-h-90">
                    <div className="w-56 h-56 bg-gray-100 rounded-xs flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-gray-200/60" />
                    </div>
                </div>

                {/* Right: Product Information Skeleton */}
                <div className="col-span-7 max-[900px]:col-span-1 flex flex-col gap-3">
                    {/* Category & Brand Badges */}
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-5 w-20 bg-orange/15 rounded-xs" />
                        <div className="h-5 w-24 bg-gray-100 rounded-xs" />
                    </div>

                    {/* Title */}
                    <div className="h-8 w-4/5 bg-gray-200 rounded-xs" />
                    <div className="h-8 w-2/5 bg-gray-200 rounded-xs" />

                    {/* Ratings */}
                    <div className="flex items-center gap-2 my-1">
                        <div className="h-4 w-24 bg-gray-200 rounded-xs" />
                        <div className="h-3 w-16 bg-gray-100 rounded-xs" />
                    </div>

                    {/* Price */}
                    <div className="py-2 border-b border-border">
                        <div className="h-8 w-36 bg-gray-200 rounded-xs" />
                    </div>

                    {/* Description */}
                    <div className="space-y-2 my-2">
                        <div className="h-3 w-20 bg-gray-200 rounded-xs mb-2" />
                        <div className="h-3.5 w-full bg-gray-100 rounded-xs" />
                        <div className="h-3.5 w-11/12 bg-gray-100 rounded-xs" />
                        <div className="h-3.5 w-3/4 bg-gray-100 rounded-xs" />
                    </div>

                    {/* Quantity & Add to Cart Skeleton Box */}
                    <div className="bg-surface border border-border rounded-xs p-4 my-2">
                        <div className="flex justify-between mb-3">
                            <div className="h-3 w-16 bg-gray-200 rounded-xs" />
                            <div className="h-4 w-28 bg-gray-200 rounded-xs" />
                        </div>
                        <div className="flex gap-4">
                            <div className="h-11 w-32 bg-gray-200 rounded-xs" />
                            <div className="h-11 flex-1 bg-gray-200 rounded-xs" />
                        </div>
                    </div>

                    {/* Guarantee Perks Skeleton */}
                    <div className="grid grid-cols-3 max-[600px]:grid-cols-1 gap-3 pt-3 border-t border-border">
                        <div className="h-4 bg-gray-100 rounded-xs" />
                        <div className="h-4 bg-gray-100 rounded-xs" />
                        <div className="h-4 bg-gray-100 rounded-xs" />
                    </div>
                </div>
            </div>
        </div>
    );
}
