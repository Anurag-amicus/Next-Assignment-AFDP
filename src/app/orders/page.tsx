import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { orderApiService } from "@/services/orderApiService";
import { normalizeOrderStatus } from "@/utils/orderHelpers";
import OrderFilterTabs from "@/components/orders/OrderFilterTabs";
import OrderCard from "@/components/orders/OrderCard";
import EmptyOrdersState from "@/components/orders/OrderEmptyState";
import Breadcrumb from "@/components/common/Breadcrumb";
import type { Metadata } from "next";
import type { OrderDetail } from "@/types/order";

export const metadata: Metadata = {
    title: "My Orders",
    description: "View and manage your recent orders, track shipments, and reorder past purchases on Online Express.",
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

    const isError = !res.success;
    const errorMessage = !res.success ? (res.error ?? "Failed to load orders.") : null;
    const rawOrders = res.success ? (res.data?.orders ?? []) : [];

    // Parallel server-side hydration of complete order details
    const orders: OrderDetail[] = await Promise.all(
        rawOrders.map(async (rawOrder) => {
            try {
                const detailRes = await orderApiService.getOrderById(
                    { token: session.accessToken! },
                    rawOrder.orderId
                );
                if (detailRes.success && detailRes.data) {
                    return {
                        ...rawOrder,
                        ...detailRes.data,
                        items: detailRes.data.items ?? rawOrder.items ?? [],
                    };
                }
            } catch (error) {
                console.error(`Failed to load details for order #${rawOrder.orderId}:`, error);
            }
            return rawOrder;
        })
    );

    const totalRecords = res.success ? (res.data?.totalRecords ?? orders.length) : 0;

    return (
        <div className="w-full pt-4.5 px-6 pb-15 max-[520px]:pt-7 max-[520px]:px-4 max-[520px]:pb-10">
            <Breadcrumb className="mb-4" />
            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
                <h1 className="font-display text-2xl font-bold uppercase text-charcoal m-0 max-[520px]:text-xl">
                    My Orders
                </h1>
                {!isError && (
                    <span className="text-xs text-muted font-medium">
                        {totalRecords} {totalRecords === 1 ? "order" : "orders"} found
                    </span>
                )}
            </div>

            <OrderFilterTabs activeTab={activeStatus} />

            {isError ? (
                <div className="w-full flex flex-col items-center justify-center py-12 px-4 bg-white border border-border rounded-xs text-center shadow-xs">
                    <div className="w-14 h-14 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-2xl mb-3 text-orange">
                        ⚠️
                    </div>
                    <h3 className="m-0 mb-2 font-display text-base sm:text-lg font-bold text-charcoal">
                        Unable to load your orders
                    </h3>
                    <p className="m-0 mb-5 text-xs sm:text-sm text-muted max-w-md leading-relaxed">
                        {errorMessage || "We encountered a temporary connection issue while retrieving your order history. Please try refreshing or check back in a few moments."}
                    </p>
                    <div className="flex gap-3">
                        <Link
                            href="/orders"
                            className="inline-flex items-center justify-center h-9 px-4 rounded-xs bg-orange hover:bg-orange-dark text-white text-xs font-bold uppercase tracking-wider transition-colors no-underline"
                        >
                            Try Again
                        </Link>
                        <Link
                            href="/products"
                            className="inline-flex items-center justify-center h-9 px-4 rounded-xs border border-border hover:bg-surface text-charcoal text-xs font-bold uppercase tracking-wider transition-colors no-underline"
                        >
                            Browse Products
                        </Link>
                    </div>
                </div>
            ) : orders.length > 0 ? (
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

