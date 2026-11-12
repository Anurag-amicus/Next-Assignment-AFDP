export default function OrderDetailsSkeleton() {
    return (
        <div className="border-t border-border bg-white p-4 sm:p-5 text-xs animate-pulse" aria-hidden="true">
            {/* Top 3-Column Metadata Grid matching OrderDetailsAccordion */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-5 border-b border-border">
                {/* 1. Delivery Address Skeleton */}
                <div className="flex flex-col gap-2">
                    <div className="h-3.5 w-28 bg-gray-200 rounded-xs mb-1" />
                    <div className="h-3 w-36 bg-gray-200 rounded-xs" />
                    <div className="h-3 w-48 bg-gray-100 rounded-xs" />
                    <div className="h-3 w-40 bg-gray-100 rounded-xs" />
                    <div className="h-3 w-20 bg-gray-100 rounded-xs" />
                </div>

                {/* 2. Shipping & Payment Method Skeleton */}
                <div className="flex flex-col gap-3">
                    <div>
                        <div className="h-3.5 w-28 bg-gray-200 rounded-xs mb-1.5" />
                        <div className="h-3 w-44 bg-gray-100 rounded-xs" />
                    </div>
                    <div>
                        <div className="h-3.5 w-28 bg-gray-200 rounded-xs mb-1.5" />
                        <div className="h-3 w-36 bg-gray-100 rounded-xs" />
                    </div>
                </div>

                {/* 3. Cost Breakdown Skeleton */}
                <div className="flex flex-col gap-2 text-xs">
                    <div className="h-3.5 w-32 bg-gray-200 rounded-xs mb-1" />
                    <div className="flex justify-between">
                        <div className="h-3 w-20 bg-gray-100 rounded-xs" />
                        <div className="h-3 w-14 bg-gray-100 rounded-xs" />
                    </div>
                    <div className="flex justify-between">
                        <div className="h-3 w-16 bg-gray-100 rounded-xs" />
                        <div className="h-3 w-12 bg-gray-100 rounded-xs" />
                    </div>
                    <div className="flex justify-between">
                        <div className="h-3 w-16 bg-gray-100 rounded-xs" />
                        <div className="h-3 w-12 bg-gray-100 rounded-xs" />
                    </div>
                    <div className="flex justify-between pt-1.5 border-t border-border">
                        <div className="h-3.5 w-18 bg-gray-200 rounded-xs" />
                        <div className="h-3.5 w-16 bg-gray-200 rounded-xs" />
                    </div>
                </div>
            </div>

            {/* Bottom Itemized Products Table Skeleton */}
            <div className="pt-4">
                <div className="h-3.5 w-28 bg-gray-200 rounded-xs mb-3" />
                <div className="space-y-3">
                    {[1, 2].map((i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between p-2.5 rounded-xs bg-surface/50 border border-border"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xs bg-gray-200 shrink-0" />
                                <div className="flex flex-col gap-1.5">
                                    <div className="h-3.5 w-40 bg-gray-200 rounded-xs" />
                                    <div className="h-3 w-24 bg-gray-100 rounded-xs" />
                                </div>
                            </div>
                            <div className="h-3.5 w-16 bg-gray-200 rounded-xs" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

