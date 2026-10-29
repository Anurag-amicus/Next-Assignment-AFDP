import Link from "next/link";
import type { User } from "@/types/auth";

interface DashboardWelcomeBannerProps {
    user: User;
}

export default function DashboardWelcomeBanner({ user }: DashboardWelcomeBannerProps) {
    const initial = user.name ? user.name.charAt(0).toUpperCase() : "👤";

    return (
        <div className="w-full bg-white border border-border rounded-xs p-4 sm:p-6 mb-8 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6">
                <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full bg-orange/15 border border-orange/40 text-orange font-bold font-display text-xl sm:text-2xl shadow-xs">
                        {initial}
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="inline-block text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-xs bg-emerald-50 text-emerald-700 border border-emerald-200">
                                Active Session
                            </span>
                            {user.role && (
                                <span className="inline-block text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-xs bg-orange/10 text-orange border border-orange/20">
                                    {user.role}
                                </span>
                            )}
                        </div>
                        <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-charcoal mt-1 mb-0.5 break-words">
                            Welcome back, {user.name || "Customer"}!
                        </h1>
                        <p className="text-xs sm:text-sm text-muted m-0 break-words">
                            Here is an overview of your account, default shipping address, and recent activity.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto shrink-0 pt-2 md:pt-0">
                    <Link
                        href="/products"
                        className="inline-flex items-center justify-center w-full sm:w-auto min-h-10 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xs border-2 border-orange bg-white text-orange hover:bg-orange hover:text-white transition-all duration-150 text-center no-underline cursor-pointer shadow-xs active:scale-[0.98]"
                    >
                        Browse Catalog
                    </Link>
                    <Link
                        href="/orders"
                        className="inline-flex items-center justify-center w-full sm:w-auto min-h-10 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xs border-2 border-orange bg-orange text-white hover:bg-orange-dark hover:border-orange-dark transition-all duration-150 text-center no-underline cursor-pointer shadow-xs active:scale-[0.98]"
                    >
                        View All Orders
                    </Link>
                </div>
            </div>
        </div>
    );
}
