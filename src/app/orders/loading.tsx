export default function OrdersLoading() {
    return (
        <div
            className="w-full pt-4.5 px-6 pb-15 max-[520px]:pt-7 max-[520px]:px-4 max-[520px]:pb-10 animate-pulse"
            aria-busy="true"
            aria-label="Loading orders"
        >
            {/* Breadcrumb Skeleton */}
            <div className="flex items-center gap-2 mb-4">
                <div className="h-3.5 w-12 bg-gray-200 rounded-xs" />
                <span className="text-gray-300 text-xs">/</span>
                <div className="h-3.5 w-20 bg-gray-200 rounded-xs" />
            </div>

            {/* Header: Title & Order Count Skeleton */}
            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
                <div className="h-7 w-36 bg-gray-200 rounded-xs" />
                <div className="h-4 w-24 bg-gray-100 rounded-xs" />
            </div>

            {/* Filter Tabs Skeleton */}
            <div className="w-full border-b border-border mb-6 pb-px flex items-center gap-2 overflow-x-auto no-scrollbar">
                <div className="h-8 w-24 bg-gray-200 rounded-xs" />
                <div className="h-8 w-24 bg-gray-100 rounded-xs" />
                <div className="h-8 w-24 bg-gray-100 rounded-xs" />
                <div className="h-8 w-24 bg-gray-100 rounded-xs" />
                <div className="h-8 w-24 bg-gray-100 rounded-xs" />
            </div>

            {/* Orders List Skeleton (3 Cards) */}
            <div className="flex flex-col gap-4">
                {[1, 2, 3].map((key) => (
                    <div
                        key={key}
                        className="border border-surface rounded-lg p-6 bg-white shadow-xs flex flex-col gap-4"
                    >
                        {/* Card Header: Order # + Date on left, Badge on right */}
                        <div className="flex flex-wrap justify-between items-center gap-2 border-b border-surface pb-4">
                            <div className="flex flex-col gap-2">
                                <div className="h-4 w-28 bg-gray-200 rounded-xs" />
                                <div className="h-3 w-20 bg-gray-100 rounded-xs" />
                            </div>
                            <div className="h-6 w-24 bg-gray-100 rounded-full" />
                        </div>

                        {/* Thumbnails Row */}
                        <div className="flex gap-2 items-center py-2 overflow-x-auto">
                            <div className="w-16 h-16 rounded bg-surface shrink-0" />
                            <div className="w-16 h-16 rounded bg-surface shrink-0" />
                            <div className="w-16 h-16 rounded bg-surface shrink-0 hidden sm:block" />
                        </div>

                        {/* Card Footer: Total on left, Buttons on right */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                            <div className="h-4 w-36 bg-gray-200 rounded-xs" />
                            <div className="flex gap-2">
                                <div className="h-9 w-28 bg-gray-200 rounded" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

