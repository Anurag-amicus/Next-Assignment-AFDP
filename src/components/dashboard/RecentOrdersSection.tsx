import Link from "next/link";
import type { BackendOrderDetail } from "@/types/order";
import { orderApiService } from "@/services/orderApiService";
import { getSession } from "@/lib/session";

function getStatusBadgeClass(status?: string): string {
    const s = (status || "").toLowerCase();
    if (s === "delivered") {
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
    if (s === "processing" || s === "placed") {
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
    if (s === "shipped") {
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
    if (s === "cancelled") {
        return "bg-red-50 text-red-700 border-red-200";
    }
    return "bg-neutral-50 text-neutral-700 border-neutral-200";
}

export default async function RecentOrdersSection() {
    let orders: BackendOrderDetail[] = [];
    let ordersError: string | null = null;
    const session = await getSession();
    if (session.accessToken) {
        try {
            const result = await orderApiService.getOrderHistory(session.accessToken);
            if (result.success && result.data?.orders) {
                orders = result.data.orders.slice(0, 3);
            } else if (!result.success) {
                ordersError = result.error || "Unable to retrieve orders history";
            }
        } catch {
            ordersError = "Failed to connect to order service";
        }
    }

    return (
        <section className="w-full" aria-labelledby="recent-orders-heading">
            <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
                <h2 id="recent-orders-heading" className="font-display text-lg font-bold text-charcoal">
                    Recent Orders
                </h2>
                <Link
                    href="/orders"
                    className="text-xs font-semibold text-orange hover:underline no-underline"
                >
                    View All Orders &rarr;
                </Link>
            </div>

            {ordersError ? (
                <div className="bg-white border border-border rounded-xs p-6 shadow-xs text-center">
                    <p className="text-sm font-semibold text-charcoal m-0">
                        Notice
                    </p>
                    <p className="text-xs text-muted m-0 mt-1">{ordersError}</p>
                    <div className="mt-4">
                        <Link
                            href="/orders"
                            className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-xs border-2 border-orange bg-white text-orange hover:bg-orange hover:text-white transition-all duration-150 no-underline cursor-pointer shadow-xs active:scale-[0.98]"
                        >
                            Check Order History
                        </Link>
                    </div>
                </div>
            ) : orders.length === 0 ? (
                <div className="bg-white border border-border rounded-xs p-6 sm:p-8 shadow-xs text-center">
                    <p className="font-display text-base font-bold text-charcoal m-0">
                        You haven&apos;t placed any orders yet.
                    </p>
                    <p className="text-xs text-muted m-0 mt-1 mb-4">
                        When you purchase items, your order history will appear here.
                    </p>
                    <Link
                        href="/products"
                        className="inline-flex items-center justify-center px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xs border-2 border-orange bg-orange text-white hover:bg-orange-dark hover:border-orange-dark transition-all duration-150 no-underline cursor-pointer shadow-xs active:scale-[0.98]"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {orders.map((order) => {
                        const dateFormatted = order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })
                            : "Recent";

                        const itemCount =
                            order.items?.reduce((sum, item) => sum + (item.quantity || 1), 0) ||
                            order.items?.length ||
                            0;

                        return (
                            <div
                                key={order.orderId}
                                className="bg-white border border-border rounded-xs p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-colors hover:border-orange/40"
                            >
                                <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                                    <div className="flex items-center gap-2.5 flex-wrap">
                                        <span className="font-bold text-sm text-charcoal font-display">
                                            Order #{order.orderId}
                                        </span>
                                        <span
                                            className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs border ${getStatusBadgeClass(
                                                order.orderStatus
                                            )}`}
                                        >
                                            {order.orderStatus || "Placed"}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3 text-xs text-muted flex-wrap">
                                        <span>Placed on {dateFormatted}</span>
                                        {itemCount > 0 && (
                                            <>
                                                <span>•</span>
                                                <span>{itemCount} {itemCount === 1 ? "item" : "items"}</span>
                                            </>
                                        )}
                                    </div>

                                    {order.items && order.items.length > 0 && (
                                        <div className="text-xs text-charcoal mt-1 line-clamp-1 break-words">
                                            {order.items.map((i) => i.productName).filter(Boolean).join(", ")}
                                        </div>
                                    )}
                                </div>

                                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-border shrink-0">
                                    <span className="text-xs text-muted sm:text-right block">Total</span>
                                    <span className="font-display text-base font-extrabold text-charcoal">
                                        ${Number(order.totalAmount || 0).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        );
                    })}

                    <div className="pt-2 flex justify-stretch sm:justify-end">
                        <Link
                            href="/orders"
                            className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xs border-2 border-orange bg-white text-orange hover:bg-orange hover:text-white transition-all duration-150 no-underline text-center cursor-pointer shadow-xs active:scale-[0.98]"
                        >
                            View Full Order History &rarr;
                        </Link>
                    </div>
                </div>
            )}
        </section>
    );
}
