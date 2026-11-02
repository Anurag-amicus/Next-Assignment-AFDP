import Link from "next/link";
import Image from "next/image";
import type { ReviewStepProps } from "@/types/checkout";

export function ReviewStep({
    items,
    shippingData,
    paymentMethod,
    shippingCost,
    currency = "₹",
    onEditShipping,
    onEditPayment,
}: ReviewStepProps) {
    const shippingMethodLabel =
        shippingData.shippingMethod === "same day"
            ? "Same Day Delivery (Today)"
            : shippingData.shippingMethod === "express"
              ? "Express Shipping (2-3 days)"
              : "Standard Shipping (5-7 days)";

    const fallbackImage = "/product-placeholder.svg";

    return (
        <section className="w-full border border-border bg-white rounded-xs overflow-hidden">
            <h2 className="m-0 py-2.75 px-4.5 bg-dark text-white font-display text-sm font-bold tracking-wider leading-tight">
                3. REVIEW YOUR ORDER
            </h2>

            <div className="p-5 flex flex-col gap-6">
                {/* ─── 1. Cart Items Section ─── */}
                <div className="border border-border rounded-xs overflow-hidden">
                    <div className="flex items-center justify-between bg-surface/50 px-4 py-2.5 border-b border-border">
                        <h3 className="m-0 font-display text-xs font-bold text-dark uppercase tracking-wide">
                            1. Order Items ({items.length})
                        </h3>
                        <Link
                            href="/cart"
                            className="flex items-center gap-1 text-xs font-bold text-orange hover:underline cursor-pointer"
                            title="Edit Cart Items"
                        >
                            <span>✎ Edit Cart</span>
                        </Link>
                    </div>

                    <div className="divide-y divide-border p-4 flex flex-col gap-3">
                        {items.map((item) => (
                            <div
                                key={item.productId}
                                className="flex items-center justify-between gap-4 pt-2 first:pt-0"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-11 h-11 shrink-0 bg-white border border-border p-1 rounded-xs flex items-center justify-center">
                                        <Image
                                            src={item.imageUrl || fallbackImage}
                                            alt={item.productName}
                                            width={36}
                                            height={36}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="m-0 text-xs font-semibold text-black truncate">
                                            {item.productName}
                                        </h4>
                                        <span className="text-xs text-muted">
                                            Qty: {item.quantity} × {currency}{item.price.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-black whitespace-nowrap">
                                    {currency}{((item.itemSubtotal ?? item.price * item.quantity)).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ─── 2. Shipping Address & Method Section ─── */}
                <div className="border border-border rounded-xs overflow-hidden">
                    <div className="flex items-center justify-between bg-surface/50 px-4 py-2.5 border-b border-border">
                        <h3 className="m-0 font-display text-xs font-bold text-dark uppercase tracking-wide">
                            2. Shipping Address & Delivery
                        </h3>
                        <button
                            type="button"
                            onClick={onEditShipping}
                            className="flex items-center gap-1 text-xs font-bold text-orange hover:underline cursor-pointer border-0 bg-transparent p-0"
                            title="Edit Shipping Details"
                        >
                            <span>✎ Edit</span>
                        </button>
                    </div>

                    <div className="p-4 grid grid-cols-2 max-[640px]:grid-cols-1 gap-4 text-xs text-charcoal">
                        <div className="flex flex-col gap-1">
                            <span className="font-bold text-black">{shippingData.fullName}</span>
                            <span className="text-muted leading-relaxed">
                                {shippingData.streetAddress}
                                {shippingData.aptSuite ? `, ${shippingData.aptSuite}` : ""}
                                <br />
                                {shippingData.city}, {shippingData.state} {shippingData.zip}
                                <br />
                                {shippingData.country}
                            </span>
                            <span className="text-muted mt-1">
                                Phone: {shippingData.phone} | Email: {shippingData.email}
                            </span>
                        </div>

                        <div className="flex flex-col gap-1 border-l max-[640px]:border-l-0 max-[640px]:border-t border-border pl-4 max-[640px]:pl-0 max-[640px]:pt-3">
                            <span className="font-bold text-black">Shipping Method:</span>
                            <span className="text-orange font-semibold">
                                {shippingMethodLabel}
                            </span>
                            <span className="text-muted">
                                Cost: {currency}{shippingCost.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ─── 3. Payment Method Section ─── */}
                <div className="border border-border rounded-xs overflow-hidden">
                    <div className="flex items-center justify-between bg-surface/50 px-4 py-2.5 border-b border-border">
                        <h3 className="m-0 font-display text-xs font-bold text-dark uppercase tracking-wide">
                            3. Payment Method
                        </h3>
                        <button
                            type="button"
                            onClick={onEditPayment}
                            className="flex items-center gap-1 text-xs font-bold text-orange hover:underline cursor-pointer border-0 bg-transparent p-0"
                            title="Edit Payment Method"
                        >
                            <span>✎ Edit</span>
                        </button>
                    </div>

                    <div className="p-4 flex items-center justify-between text-xs">
                        <div className="flex flex-col gap-1">
                            <span className="font-bold text-black">
                                {paymentMethod}
                            </span>
                            <span className="text-muted">
                                Simulated payment gateway for assignment testing.
                            </span>
                        </div>
                        <span className="px-2 py-1 text-xs font-bold bg-emerald-50 text-emerald-700 rounded-xs">
                            Active
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ReviewStep;
