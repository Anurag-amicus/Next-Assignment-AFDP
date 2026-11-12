"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { formatCurrency, formatOrderDate, normalizeOrderStatus } from "@/utils/orderHelpers";
import Button from "@/components/common/Button";
import ReorderButton from "@/components/orders/ReorderButton";
import OrderDetailsAccordion from "@/components/orders/OrderDetailsAccordion";
import OrderDetailsSkeleton from "@/components/orders/OrderDetailsSkeleton";
import { getOrderDetailsAction } from "@/app/actions/orderActions";
import { SHIMMER_BLUR_DATA_URL } from "@/utils/imageUtils";
import type { OrderDetail } from "@/types/order";
import defaultImage from "@/assets/product-placeholder.svg";

const BADGE: Record<string, string> = {
    Processing: "bg-orange-light text-orange",
    Placed: "bg-orange-light text-orange",
    Shipped: "bg-sky-50 text-sky-700",
    Delivered: "bg-emerald-50 text-emerald-700",
    Cancelled: "bg-red-50 text-red-700",
};

export default function OrderCard({ order }: { order: OrderDetail }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [details, setDetails] = useState<OrderDetail | null>(null);
    const [error, setError] = useState<string | null>(null);

    const activeOrder = details || order;
    const items = activeOrder.items || [];
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const status = normalizeOrderStatus(activeOrder.orderStatus);

    const handleToggleDetails = async () => {
        if (isOpen) {
            setIsOpen(false);
            return;
        }

        setIsOpen(true);

        if (!details) {
            setIsLoading(true);
            setError(null);
            try {
                const res = await getOrderDetailsAction(order.orderId);
                if (res.success && res.data) {
                    setDetails(res.data);
                } else {
                    setError(res.error || "Could not load order details.");
                }
            } catch {
                setError("An unexpected error occurred while loading details.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <article className="border border-surface rounded-lg p-6 bg-white shadow-sm">
            <header className="flex flex-wrap justify-between items-center gap-2 border-b border-surface pb-4 mb-4">
                <div>
                    <p className="font-display text-base font-bold text-charcoal m-0">
                        Order #{order.orderId}
                    </p>
                    <p className="text-xs text-muted m-0">
                        {formatOrderDate(order.createdAt)}
                    </p>
                </div>
                <span
                    className={cn(
                        "px-3 py-1 rounded-full text-xs font-semibold capitalize",
                        BADGE[status] || "bg-neutral-100 text-neutral-700"
                    )}
                >
                    {status}
                </span>
            </header>

            <div className="flex gap-2 items-center overflow-x-auto py-2">
                {items.length > 0 ? (
                    items.map((item) => (
                        <Image
                            key={item.productId || item.orderItemId}
                            src={item.imageUrl || defaultImage}
                            alt={item.productName}
                            width={64}
                            height={64}
                            placeholder="blur"
                            blurDataURL={SHIMMER_BLUR_DATA_URL}
                            className="w-16 h-16 object-cover border border-surface rounded bg-surface"
                        />
                    ))
                ) : (
                    <span className="text-xs text-muted">No item preview available</span>
                )}
            </div>

            <footer className="flex flex-wrap items-center justify-between gap-3 mt-4">
                <p className="text-sm text-muted m-0">
                    {itemCount} {itemCount === 1 ? "item" : "items"} ·{" "}
                    <span className="font-semibold text-black">
                        {formatCurrency(order.totalAmount)}
                    </span>
                </p>
                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleToggleDetails}
                        disabled={isLoading}
                        className="px-4 py-2 text-sm font-semibold border border-charcoal text-charcoal rounded hover:bg-surface cursor-pointer"
                    >
                        {isLoading ? "LOADING..." : isOpen ? "HIDE DETAILS" : "VIEW DETAILS"}
                    </Button>
                    {status === "Delivered" && (
                        <ReorderButton orderId={order.orderId} />
                    )}
                </div>
            </footer>

            {isOpen && (
                <div className="mt-4 pt-2">
                    {isLoading ? (
                        <OrderDetailsSkeleton />
                    ) : error ? (
                        <div className="py-4 text-center border-t border-border mt-3">
                            <p className="text-xs text-red-600 mb-2">{error}</p>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleToggleDetails}
                                className="px-3 py-1 text-xs"
                            >
                                Retry
                            </Button>
                        </div>
                    ) : (
                        <OrderDetailsAccordion order={activeOrder} />
                    )}
                </div>
            )}
        </article>
    );
}