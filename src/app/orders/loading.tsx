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

            {/* Orders List Skeleton (3 Cards matching React layout) */}
            <div className="flex flex-col gap-4">
                {[1, 2, 3].map((key) => (
                    <article
                        key={key}
                        className="w-full bg-white border border-border rounded-xs shadow-xs overflow-hidden"
                        aria-hidden="true"
                    >
                        {/* Header Placeholder */}
                        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-surface/50 border-b border-border">
                            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                                <div>
                                    <div className="w-16 h-2.5 bg-gray-200 rounded-xs mb-1.5" />
                                    <div className="w-20 h-4 bg-gray-300 rounded-xs" />
                                </div>

                                <div className="border-l border-border pl-3 sm:pl-6">
                                    <div className="w-16 h-2.5 bg-gray-200 rounded-xs mb-1.5" />
                                    <div className="w-24 h-3.5 bg-gray-200 rounded-xs" />
                                </div>

                                <div className="border-l border-border pl-3 sm:pl-6">
                                    <div className="w-14 h-2.5 bg-gray-200 rounded-xs mb-1.5" />
                                    <div className="w-16 h-3.5 bg-gray-200 rounded-xs" />
                                </div>
                            </div>

                            <div className="w-20 h-6 bg-gray-200 rounded-full" />
                        </div>

                        {/* Body Placeholder: Thumbnails & Amount */}
                        <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-2.5 min-w-0 py-1">
                                <div className="w-14 h-14 shrink-0 rounded-xs bg-gray-200 border border-border" />
                                <div className="w-14 h-14 shrink-0 rounded-xs bg-gray-200 border border-border" />
                                <div className="w-14 h-14 shrink-0 rounded-xs bg-gray-200 border border-border hidden sm:block" />

                                <div className="ml-2 hidden md:flex flex-col gap-1.5">
                                    <div className="w-36 h-3.5 bg-gray-200 rounded-xs" />
                                    <div className="w-24 h-2.5 bg-gray-200 rounded-xs" />
                                </div>
                            </div>

                            <div className="flex flex-col sm:items-end justify-center gap-1.5 shrink-0">
                                <div className="w-16 h-2.5 bg-gray-200 rounded-xs" />
                                <div className="w-24 h-6 bg-gray-300 rounded-xs" />
                            </div>
                        </div>

                        {/* Actions Bar Placeholder */}
                        <div className="px-4 py-3 bg-surface/30 border-t border-border flex items-center justify-between">
                            <div className="w-24 h-3.5 bg-gray-200 rounded-xs" />
                            <div className="w-20 h-8 bg-gray-200 rounded-xs" />
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
