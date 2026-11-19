"use client";

import { useState } from "react";
import Image from "next/image";
import { formatCurrency, formatOrderDate, normalizeOrderStatus } from "@/utils/orderHelpers";
import Button from "@/components/common/Button";
import ReorderButton from "@/components/orders/ReorderButton";
import StatusBadge from "@/components/orders/StatusBadge";
import OrderDetailsAccordion from "@/components/orders/OrderDetailsAccordion";
import OrderDetailsSkeleton from "@/components/orders/OrderDetailsSkeleton";
import { getOrderDetailsAction } from "@/app/actions/orderActions";
import { SHIMMER_BLUR_DATA_URL } from "@/utils/imageUtils";
import type { OrderDetail } from "@/types/order";
import defaultImage from "@/assets/product-placeholder.svg";

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

        const hasDetails = Boolean(activeOrder.items && activeOrder.items.length > 0 && activeOrder.shipping);
        if (!hasDetails && !details) {
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
        <article className="w-full bg-white border border-border rounded-xs shadow-xs transition-all hover:border-gray-400 overflow-hidden">
            {/* ─── Card Header ─── */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-surface/50 border-b border-border">
                <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                    <div>
                        <span className="text-[10px] text-muted block uppercase tracking-wider font-semibold">
                            Order Number
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-black font-mono">
                            #{order.orderId}
                        </span>
                    </div>

                    <div className="border-l border-border pl-3 sm:pl-6">
                        <span className="text-[10px] text-muted block uppercase tracking-wider font-semibold">
                            Date Placed
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-charcoal">
                            {formatOrderDate(order.createdAt)}
                        </span>
                    </div>

                    <div className="border-l border-border pl-3 sm:pl-6">
                        <span className="text-[10px] text-muted block uppercase tracking-wider font-semibold">
                            Total Items
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-charcoal">
                            {itemCount} {itemCount === 1 ? "item" : "items"}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <StatusBadge status={status} />
                </div>
            </div>

            {/* ─── Card Body: Thumbnails & Total ─── */}
            <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
                {/* Thumbnails Row */}
                <div className="flex items-center gap-2.5 min-w-0 overflow-x-auto py-1">
                    {items.length > 0 ? (
                        <>
                            {items.slice(0, 4).map((item) => (
                                <div
                                    key={item.productId || item.orderItemId}
                                    className="relative w-14 h-14 shrink-0 rounded-xs border border-border bg-white p-1 flex items-center justify-center group"
                                    title={`${item.productName} (Qty: ${item.quantity})`}
                                >
                                    <Image
                                        src={item.imageUrl || defaultImage}
                                        alt={item.productName}
                                        width={56}
                                        height={56}
                                        placeholder="blur"
                                        blurDataURL={SHIMMER_BLUR_DATA_URL}
                                        className="w-full h-full object-contain"
                                    />
                                    {item.quantity > 1 && (
                                        <span className="absolute -top-1.5 -right-1.5 bg-charcoal text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                                            {item.quantity}
                                        </span>
                                    )}
                                </div>
                            ))}

                            {items.length > 4 && (
                                <div className="w-14 h-14 shrink-0 rounded-xs border border-dashed border-border bg-surface flex flex-col items-center justify-center text-xs font-bold text-muted">
                                    +{items.length - 4}
                                    <span className="text-[9px] text-muted font-normal">more</span>
                                </div>
                            )}

                            <div className="ml-2 hidden md:block min-w-0">
                                <p className="m-0 text-xs font-bold text-charcoal truncate max-w-xs">
                                    {items[0]?.productName}
                                </p>
                                {items.length > 1 && (
                                    <span className="text-[11px] text-muted block mt-0.5">
                                        and {items.length - 1} other item{items.length > 2 ? "s" : ""}
                                    </span>
                                )}
                            </div>
                        </>
                    ) : (
                        <span className="text-xs text-muted">No item preview available</span>
                    )}
                </div>

                {/* Right Metrics & Primary Actions */}
                <div className="flex flex-col sm:items-end justify-center shrink-0">
                    <span className="text-[10px] text-muted uppercase tracking-wider font-semibold">
                        Total Amount
                    </span>
                    <span className="font-display text-lg sm:text-xl font-bold text-orange">
                        {formatCurrency(order.totalAmount)}
                    </span>
                </div>
            </div>

            {/* ─── Card Actions Bar ─── */}
            <div className="px-4 py-3 bg-surface border-t border-border flex flex-wrap items-center justify-between gap-3">
                <button
                    type="button"
                    onClick={handleToggleDetails}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-charcoal hover:text-orange transition-colors cursor-pointer border-0 bg-transparent p-0"
                >
                    <span>{isLoading ? "LOADING..." : isOpen ? "▲ HIDE DETAILS" : "▼ VIEW DETAILS"}</span>
                </button>

                <div className="flex items-center gap-2">
                    <ReorderButton orderId={order.orderId} />
                </div>
            </div>

            {/* ─── Expandable Details Accordion ─── */}
            {isOpen && (
                <div>
                    {isLoading ? (
                        <div className="p-4 bg-white border-t border-border">
                            <OrderDetailsSkeleton />
                        </div>
                    ) : error ? (
                        <div className="py-4 text-center border-t border-border bg-white">
                            <p className="text-xs text-red-600 mb-2">{error}</p>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleToggleDetails}
                                className="w-auto h-8 px-4 text-xs font-bold uppercase tracking-wider border border-border"
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
