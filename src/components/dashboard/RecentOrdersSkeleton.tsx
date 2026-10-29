export default function RecentOrdersSkeleton() {
    return (
        <div className="w-full animate-pulse" aria-busy="true" aria-label="Loading recent orders">
            <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
                <div className="h-5 w-36 bg-gray-200 rounded-xs" />
                <div className="h-4 w-24 bg-gray-100 rounded-xs" />
            </div>

            <div className="flex flex-col gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div
                        key={index}
                        className="bg-white border border-border rounded-xs p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    >
                        <div className="flex flex-col gap-2 min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <div className="h-4 w-24 bg-gray-200 rounded-xs" />
                                <div className="h-5 w-20 bg-gray-100 rounded-xs" />
                            </div>
                            <div className="h-3.5 w-32 max-w-full bg-gray-100 rounded-xs" />
                            <div className="h-3.5 w-44 max-w-full bg-gray-200 rounded-xs mt-1" />
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-border shrink-0">
                            <div className="h-3 w-16 bg-gray-100 rounded-xs mb-1" />
                            <div className="h-5 w-24 bg-gray-200 rounded-xs" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
