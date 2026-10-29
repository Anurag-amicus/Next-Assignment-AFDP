import AccountSummarySkeleton from "@/components/dashboard/AccountSummarySkeleton";
import RecentOrdersSkeleton from "@/components/dashboard/RecentOrdersSkeleton";

export default function DashboardLoading() {
    return (
        <div
            className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 overflow-x-hidden min-w-0 animate-pulse"
            aria-busy="true"
            aria-label="Loading dashboard"
        >
            {/* Breadcrumb Skeleton */}
            <div className="flex items-center gap-2 mb-6">
                <div className="h-3.5 w-12 bg-gray-200 rounded-xs" />
                <span className="text-gray-300 text-xs">›</span>
                <div className="h-3.5 w-20 bg-gray-200 rounded-xs" />
            </div>

            {/* Welcome Banner Skeleton */}
            <div className="w-full bg-white border border-border rounded-xs p-4 sm:p-6 mb-8 shadow-xs">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6">
                    <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
                        <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gray-200 shrink-0" />
                        <div className="flex flex-col gap-2 min-w-0 flex-1">
                            <div className="h-4 w-24 bg-gray-200 rounded-xs" />
                            <div className="h-7 w-56 max-w-full bg-gray-200 rounded-xs" />
                            <div className="h-3.5 w-72 max-w-full bg-gray-100 rounded-xs" />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto shrink-0 pt-2 md:pt-0">
                        <div className="h-10 w-full sm:w-32 bg-gray-200 rounded-xs" />
                        <div className="h-10 w-full sm:w-32 bg-gray-200 rounded-xs" />
                    </div>
                </div>
            </div>

            {/* Account Summary Skeleton */}
            <AccountSummarySkeleton />

            {/* Recent Orders Skeleton */}
            <RecentOrdersSkeleton />
        </div>
    );
}
