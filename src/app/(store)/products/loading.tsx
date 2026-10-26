export default function ProductsLoading() {
    return (
        <div className="w-full animate-pulse" aria-busy="true" aria-label="Loading products">
            {/* Results count skeleton */}
            <div className="w-full min-h-6 mb-3 flex items-center justify-between">
                <div className="h-4 w-44 bg-gray-200 rounded-xs" />
                <div className="h-3 w-28 bg-gray-100 rounded-xs hidden sm:block" />
            </div>

            {/* Products Grid Skeleton (8 Cards) */}
            <div className="w-full grid grid-cols-4 gap-4 max-[1100px]:grid-cols-3 max-[800px]:grid-cols-2 max-[520px]:grid-cols-1">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div
                        key={index}
                        className="bg-white border border-border rounded-xs p-3 flex flex-col justify-between"
                    >
                        {/* Image Placeholder */}
                        <div className="w-full aspect-square bg-gray-100 rounded-xs mb-3 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-gray-200/60" />
                        </div>

                        {/* Text Placeholders */}
                        <div className="flex flex-col gap-2">
                            {/* Category pill */}
                            <div className="h-3 w-16 bg-gray-200 rounded-xs" />
                            {/* Product title (2 lines) */}
                            <div className="h-4 w-full bg-gray-200 rounded-xs" />
                            <div className="h-4 w-2/3 bg-gray-200 rounded-xs" />
                            {/* Rating stars */}
                            <div className="h-3 w-20 bg-gray-100 rounded-xs mt-1" />
                            {/* Price */}
                            <div className="h-5 w-24 bg-gray-200 rounded-xs mt-2" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="flex items-center justify-center gap-4 mt-8 mb-10">
                <div className="h-8 w-20 bg-gray-100 rounded-xs" />
                <div className="flex gap-2">
                    <div className="h-8 w-8 bg-gray-200 rounded-xs" />
                    <div className="h-8 w-8 bg-gray-100 rounded-xs" />
                    <div className="h-8 w-8 bg-gray-100 rounded-xs" />
                </div>
                <div className="h-8 w-16 bg-gray-100 rounded-xs" />
            </div>
        </div>
    );
}
