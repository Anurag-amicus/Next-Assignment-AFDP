import Image from "next/image";
import type { OrderDetail } from "@/types/order";
import defaultImage from "@/assets/product-placeholder.svg";

export interface OrderDetailsAccordionProps {
    order: OrderDetail;
}

export function OrderDetailsAccordion({ order }: OrderDetailsAccordionProps) {
    const itemsList = order.items || [];
    const shippingAddress = order.shipping;
    const shippingCost = order.shippingCharge ?? 100;
    const itemsSubtotal =
        order.subtotal ??
        itemsList.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    const taxAmount = order.tax ?? (itemsSubtotal * 0.18);
    const paymentMethod = order.payment?.paymentMethod || "Online Payment (Verified)";

    return (
        <div className="border-t border-border bg-white p-4 sm:p-5 text-xs animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-5 border-b border-border">
                {/* 1. Shipping Address */}
                <div className="flex flex-col gap-1">
                    <span className="font-display text-xs font-bold uppercase tracking-wider text-black mb-1">
                        Delivery Address
                    </span>
                    {shippingAddress ? (
                        <div className="text-charcoal text-xs leading-relaxed">
                            <p className="font-bold text-black m-0">
                                {shippingAddress.fullName || "Customer"}
                            </p>
                            <p className="m-0 mt-0.5">
                                {shippingAddress.streetAddress}
                                {shippingAddress.aptSuite ? `, ${shippingAddress.aptSuite}` : ""}
                            </p>
                            <p className="m-0 text-muted">
                                {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.zip}
                            </p>
                            <p className="m-0 text-muted">{shippingAddress.country}</p>
                        </div>
                    ) : (
                        <p className="text-muted text-xs m-0">
                            Standard shipping address on file.
                        </p>
                    )}
                </div>

                {/* 2. Shipping & Payment Method */}
                <div className="flex flex-col gap-2">
                    <div>
                        <span className="font-display text-xs font-bold uppercase tracking-wider text-black mb-1 block">
                            Shipping Method
                        </span>
                        <span className="text-xs text-charcoal font-medium capitalize">
                            Standard Delivery (₹{shippingCost.toFixed(2)})
                        </span>
                    </div>

                    <div className="mt-1">
                        <span className="font-display text-xs font-bold uppercase tracking-wider text-black mb-1 block">
                            Payment Method
                        </span>
                        <span className="text-xs text-charcoal font-medium">
                            {paymentMethod}
                        </span>
                    </div>
                </div>

                {/* 3. Cost Breakdown */}
                <div className="flex flex-col gap-1.5 text-xs">
                    <span className="font-display text-xs font-bold uppercase tracking-wider text-black mb-1 block">
                        Payment Summary
                    </span>
                    <div className="flex justify-between text-muted">
                        <span>Items Subtotal:</span>
                        <span>₹{itemsSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted">
                        <span>Shipping:</span>
                        <span>₹{shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted">
                        <span>Tax (18%):</span>
                        <span>₹{taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-black font-bold pt-1.5 border-t border-border text-xs">
                        <span>Total Paid:</span>
                        <span className="text-orange">₹{order.totalAmount.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Itemized Products Table */}
            <div className="pt-4">
                <span className="font-display text-xs font-bold uppercase tracking-wider text-black mb-2.5 block">
                    Order Items ({itemsList.length})
                </span>

                <div className="divide-y divide-border">
                    {itemsList.map((item) => (
                        <div
                            key={item.productId || item.orderItemId}
                            className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <Image
                                    src={item.imageUrl || defaultImage}
                                    alt={item.productName}
                                    width={40}
                                    height={40}
                                    className="w-10 h-10 object-contain p-0.5 bg-white border border-border rounded-xs shrink-0"
                                />
                                <div className="min-w-0">
                                    <p className="m-0 font-medium text-black truncate">
                                        {item.productName}
                                    </p>
                                    <span className="text-muted text-xs">
                                        Qty: {item.quantity} × ₹{item.price.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <span className="font-bold text-black shrink-0">
                                ₹{(item.price * item.quantity).toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OrderDetailsAccordion;
