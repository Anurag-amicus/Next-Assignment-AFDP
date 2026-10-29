import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Breadcrumb from "@/components/common/Breadcrumb";
import DashboardWelcomeBanner from "@/components/dashboard/DashboardWelcomeBanner";
import AccountSummarySection from "@/components/dashboard/AccountSummarySection";
import AccountSummarySkeleton from "@/components/dashboard/AccountSummarySkeleton";
import RecentOrdersSection from "@/components/dashboard/RecentOrdersSection";
import RecentOrdersSkeleton from "@/components/dashboard/RecentOrdersSkeleton";

export const metadata = {
    title: "Dashboard | Online Express",
    description: "Manage your personal profile, default shipping address, and review your recent orders.",
};

export default async function DashboardPage() {
    const session = await getSession();

    if (!session.isAuthenticated || !session.user || !session.accessToken) {
        redirect("/login?returnUrl=/dashboard");
    }

    const token = session.accessToken;

    return (
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 overflow-x-hidden min-w-0">
            <Breadcrumb className="mb-6" />

            <DashboardWelcomeBanner user={session.user} />

            <div className="flex flex-col gap-2">
                {/* Independent Suspense Boundary 1: Profile & Default Address */}
                <Suspense fallback={<AccountSummarySkeleton />}>
                    <AccountSummarySection user={session.user} token={token} />
                </Suspense>

                {/* Independent Suspense Boundary 2: Recent Orders */}
                <Suspense fallback={<RecentOrdersSkeleton />}>
                    <RecentOrdersSection token={token} />
                </Suspense>
            </div>
        </div>
    );
}
