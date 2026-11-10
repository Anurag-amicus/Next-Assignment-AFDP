import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { orderApiService } from "@/services/orderApiService";
import { normalizeOrderStatus } from "@/utils/orderHelpers";
import OrderFilterTabs from "@/components/orders/OrderFilterTabs";
import OrderCard from "@/components/orders/OrderCard";
import EmptyOrdersState from "@/components/orders/OrderEmptyState";
import Breadcrumb from "@/components/common/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Orders | Online Express",
    description: "View and manage your recent orders, track shipments, and reorder past purchases.",
};

interface OrdersPageProps {
    searchParams: Promise<{ status?: string }>;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
    const { status } = await searchParams;
    const activeStatus = normalizeOrderStatus(status);

    const session = await getSession();
    if (!session.isAuthenticated || !session.accessToken) {
        redirect("/login?returnUrl=%2Forders");
    }

    const res = await orderApiService.getOrderHistory(
        { token: session.accessToken },
        { status: activeStatus }
    );

    if (!res.success) {
        throw new Error(res.error ?? "Failed to load orders."); // handled by app/error.tsx
    }

    const orders = res.data?.orders ?? [];
    const totalRecords = res.data?.totalRecords ?? orders.length;

    return (
        <div className="w-full pt-4.5 px-6 pb-15 max-[520px]:pt-7 max-[520px]:px-4 max-[520px]:pb-10">
            <Breadcrumb className="mb-4" />
            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
                <h1 className="font-display text-2xl font-bold uppercase text-charcoal m-0 max-[520px]:text-xl">
                    My Orders
                </h1>
                <span className="text-xs text-muted font-medium">
                    {totalRecords} {totalRecords === 1 ? "order" : "orders"} found
                </span>
            </div>

            <OrderFilterTabs activeTab={activeStatus} />

            {orders.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {orders.map((order) => (
                        <OrderCard key={order.orderId} order={order} />
                    ))}
                </div>
            ) : (
                <EmptyOrdersState tab={activeStatus} />
            )}
        </div>
    );
}

