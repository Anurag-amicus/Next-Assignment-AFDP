export default function AccountSummarySkeleton() {
    return (
        <div className="w-full mb-8 animate-pulse" aria-busy="true" aria-label="Loading account summary">
            <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
                <div className="h-5 w-40 bg-gray-200 rounded-xs" />
                <div className="h-4 w-28 bg-gray-100 rounded-xs hidden sm:block" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile Card Skeleton */}
                <div className="bg-white border border-border rounded-xs p-4 sm:p-6 shadow-xs">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-border gap-2 flex-wrap">
                        <div className="h-5 w-32 bg-gray-200 rounded-xs" />
                        <div className="h-4 w-16 bg-gray-100 rounded-xs" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="p-3 bg-neutral-50 rounded-xs border border-border min-w-0">
                            <div className="h-3 w-16 bg-gray-200 rounded-xs mb-2" />
                            <div className="h-4 w-28 max-w-full bg-gray-200 rounded-xs" />
                        </div>
                        <div className="p-3 bg-neutral-50 rounded-xs border border-border min-w-0">
                            <div className="h-3 w-20 bg-gray-200 rounded-xs mb-2" />
                            <div className="h-4 w-36 max-w-full bg-gray-200 rounded-xs" />
                        </div>
                        <div className="p-3 bg-neutral-50 rounded-xs border border-border min-w-0">
                            <div className="h-3 w-16 bg-gray-200 rounded-xs mb-2" />
                            <div className="h-4 w-20 max-w-full bg-gray-200 rounded-xs" />
                        </div>
                        <div className="p-3 bg-neutral-50 rounded-xs border border-border min-w-0">
                            <div className="h-3 w-20 bg-gray-200 rounded-xs mb-2" />
                            <div className="h-4 w-24 max-w-full bg-gray-200 rounded-xs" />
                        </div>
                    </div>
                </div>

                {/* Default Address Card Skeleton */}
                <div className="bg-white border border-border rounded-xs p-4 sm:p-6 shadow-xs">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-border gap-2 flex-wrap">
                        <div className="h-5 w-36 bg-gray-200 rounded-xs" />
                        <div className="h-4 w-20 bg-gray-100 rounded-xs" />
                    </div>

                    <div className="p-4 bg-neutral-50 rounded-xs border border-border flex flex-col gap-2.5">
                        <div className="h-4 w-48 max-w-full bg-gray-200 rounded-xs" />
                        <div className="h-4 w-40 max-w-full bg-gray-200 rounded-xs" />
                        <div className="h-3.5 w-32 max-w-full bg-gray-100 rounded-xs" />
                        <div className="h-3.5 w-24 max-w-full bg-gray-100 rounded-xs mt-1" />
                    </div>
                </div>
            </div>
        </div>
    );
}
