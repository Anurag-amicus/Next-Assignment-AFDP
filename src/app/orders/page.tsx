import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { orderApiService } from "@/services/orderApiService";
import Breadcrumb from "@/components/common/Breadcrumb";
import Button from "@/components/common/Button";
import type { BackendOrderDetail } from "@/types/order";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Orders | Online Express",
    description: "View and track your previous orders on Online Express.",
};

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

export default async function OrdersPage() {
    const session = await getSession();

    if (!session.isAuthenticated || !session.user || !session.accessToken) {
        redirect("/login?returnUrl=/orders");
    }

    let orders: BackendOrderDetail[] = [];
    let errorMessage: string | null = null;

    try {
        const res = await orderApiService.getOrderHistory(session.accessToken);
        if (res.success && res.data?.orders) {
            orders = res.data.orders;
        } else if (!res.success) {
            errorMessage = res.error || "Unable to retrieve your order history.";
        }
    } catch {
        errorMessage = "Failed to load orders from the server.";
    }

    return (
        <div className="w-full max-w-5xl mx-auto pt-4.5 px-6 pb-15 max-[520px]:pt-7 max-[520px]:px-4 max-[520px]:pb-10">
            <Breadcrumb />

            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                    <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight m-0">
                        My Orders
                    </h1>
                    <p className="text-sm text-muted mt-1 m-0">
                        View order details, delivery status, and tracking information.
                    </p>
                </div>

                <Link href="/products">
                    <Button variant="primary" className="text-xs font-bold uppercase tracking-wider">
                        Browse Catalog
                    </Button>
                </Link>
            </div>

            {errorMessage ? (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xs text-sm">
                    {errorMessage}
                </div>
            ) : orders.length === 0 ? (
                <div className="bg-white border border-border rounded-xs p-12 text-center shadow-xs">
                    <div className="text-5xl mb-3">📦</div>
                    <h2 className="font-display text-lg font-bold text-charcoal m-0 mb-1">
                        You haven&apos;t placed any orders yet
                    </h2>
                    <p className="text-sm text-muted m-0 mb-6">
                        Once you place an order, it will appear here so you can track its progress.
                    </p>
                    <Link href="/products">
                        <Button variant="primary" className="text-xs font-bold uppercase tracking-wider">
                            Start Shopping
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {orders.map((order) => {
                        const dateFormatted = order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString("en-IN", {
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
                                className="bg-white border border-border rounded-xs p-5 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-colors hover:border-orange/50"
                            >
                                <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                                    <div className="flex items-center gap-2.5 flex-wrap">
                                        <span className="font-bold text-base text-charcoal font-display">
                                            Order #{order.orderId}
                                        </span>
                                        <span
                                            className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs border ${getStatusBadgeClass(
                                                order.orderStatus
                                            )}`}
                                        >
                                            {order.orderStatus || "Processing"}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3 text-xs text-muted flex-wrap">
                                        <span>Placed on {dateFormatted}</span>
                                        {itemCount > 0 && (
                                            <>
                                                <span>•</span>
                                                <span>
                                                    {itemCount} {itemCount === 1 ? "item" : "items"}
                                                </span>
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
                                    <span className="text-xs text-muted sm:text-right block">Total Amount</span>
                                    <span className="font-display text-lg font-extrabold text-orange">
                                        ₹{Number(order.totalAmount || 0).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
