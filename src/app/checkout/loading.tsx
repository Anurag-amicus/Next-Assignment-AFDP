export default function CheckoutLoading() {
    return (
        <div
            className="w-full pt-4.5 px-6 pb-15 max-[520px]:pt-7 max-[520px]:px-4 max-[520px]:pb-10 animate-pulse"
            aria-busy="true"
            aria-label="Loading checkout"
        >
            {/* Breadcrumb Skeleton */}
            <div className="flex items-center gap-2 mb-4">
                <div className="h-3.5 w-12 bg-gray-200 rounded-xs" />
                <span className="text-gray-300 text-xs">/</span>
                <div className="h-3.5 w-20 bg-gray-200 rounded-xs" />
            </div>

            {/* Page Title */}
            <div className="h-8 w-44 bg-gray-200 rounded-xs mb-6" />

            {/* Step Navigation Bar Skeleton */}
            <div className="flex items-center gap-2 mb-8 border-b border-border pb-3 overflow-x-auto">
                <div className="h-7 w-28 bg-gray-200 rounded-xs" />
                <span className="text-gray-300">›</span>
                <div className="h-7 w-28 bg-gray-100 rounded-xs" />
                <span className="text-gray-300">›</span>
                <div className="h-7 w-28 bg-gray-100 rounded-xs" />
            </div>

            {/* 2-Column Main Layout */}
            <div className="grid grid-cols-12 gap-6 items-start max-[990px]:grid-cols-1">
                {/* Left Column: Form Fields Skeleton (8 cols) */}
                <div className="col-span-8 max-[990px]:col-span-1 bg-white border border-border rounded-xs p-6 flex flex-col gap-5">
                    <div className="h-5 w-40 bg-gray-200 rounded-xs mb-1" />

                    {/* Saved address card placeholder */}
                    <div className="h-16 w-full bg-surface/60 rounded-xs border border-border" />

                    {/* Inputs grid */}
                    <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
                        <div className="flex flex-col gap-1.5">
                            <div className="h-3.5 w-20 bg-gray-100 rounded-xs" />
                            <div className="h-10 w-full bg-gray-100 rounded-xs" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <div className="h-3.5 w-24 bg-gray-100 rounded-xs" />
                            <div className="h-10 w-full bg-gray-100 rounded-xs" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="h-3.5 w-28 bg-gray-100 rounded-xs" />
                        <div className="h-10 w-full bg-gray-100 rounded-xs" />
                    </div>

                    <div className="grid grid-cols-3 gap-4 max-[600px]:grid-cols-1">
                        <div className="flex flex-col gap-1.5">
                            <div className="h-3.5 w-16 bg-gray-100 rounded-xs" />
                            <div className="h-10 w-full bg-gray-100 rounded-xs" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <div className="h-3.5 w-16 bg-gray-100 rounded-xs" />
                            <div className="h-10 w-full bg-gray-100 rounded-xs" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <div className="h-3.5 w-16 bg-gray-100 rounded-xs" />
                            <div className="h-10 w-full bg-gray-100 rounded-xs" />
                        </div>
                    </div>
                </div>

                {/* Right Column: Checkout Summary Skeleton (4 cols) */}
                <div className="col-span-4 max-[990px]:col-span-1">
                    <div className="bg-surface/50 border border-border rounded-xs p-5 flex flex-col gap-4">
                        <div className="h-5 w-36 bg-gray-200 rounded-xs border-b border-border pb-3" />

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

