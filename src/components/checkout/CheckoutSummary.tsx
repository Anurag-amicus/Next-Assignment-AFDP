import Button from "@/components/common/Button";
import type { CartItem } from "@/types/cart";
import { calculateCartSubtotal } from "@/utils/cartUtils";

export interface CheckoutSummaryProps {
    items: CartItem[];
    loading?: boolean;
    isFormValid?: boolean;
    formId?: string;
    currency?: string;
    className?: string;
    shippingCost?: number;
    actionButtonText?: string;
    onActionClick?: () => void;
    backButtonText?: string;
    onBackClick?: () => void;
    isSubmitting?: boolean;
}

export function CheckoutSummary({
    items = [],
    loading = false,
    isFormValid = true,
    formId,
    currency = "₹",
    className = "",
    shippingCost = 100.0,
    actionButtonText = "CONTINUE TO PAYMENT",
    onActionClick,
    backButtonText,
    onBackClick,
    isSubmitting = false,
}: CheckoutSummaryProps) {
    const subtotal = calculateCartSubtotal(items);
    const tax = +(subtotal * 0.08).toFixed(2);
    const total = +(subtotal + shippingCost + tax).toFixed(2);

    return (
        <aside
            className={`w-full border border-border bg-white overflow-hidden rounded-xs sticky top-6 self-start ${className}`}
        >
            <div className="bg-charcoal text-white px-5 py-3.5">
                <h2 className="m-0 font-display text-sm font-bold tracking-wider uppercase leading-none">
                    ORDER SUMMARY
                </h2>
            </div>

            <div className="p-5 flex flex-col gap-4">
                {/* Items preview list */}
                <div className="flex flex-col gap-2.5 pb-4 border-b border-border">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <div
                                key={item.productId}
                                className="flex justify-between items-center gap-4 text-xs"
                            >
                                <h3 className="m-0 font-normal leading-snug truncate text-charcoal">
                                    {item.productName}{" "}
                                    <span className="text-muted">
                                        x{item.quantity}
                                    </span>
                                </h3>
                                <span className="font-semibold whitespace-nowrap text-black">
                                    {currency}
                                    {((item.itemSubtotal ?? item.price * item.quantity)).toFixed(2)}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="m-0 text-xs text-muted">No items in order</p>
                    )}
                </div>

                {/* Subtotal, Shipping, Tax, Total */}
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center text-sm text-charcoal">
                        <span>Subtotal:</span>
                        {loading ? (
                            <span className="h-4 w-18 bg-surface animate-pulse rounded-xs" />
                        ) : (
                            <span className="font-semibold text-black">
                                {currency}
                                {subtotal.toFixed(2)}
                            </span>
                        )}
                    </div>

                    <div className="flex justify-between items-center text-sm text-charcoal">
                        <span>Shipping:</span>
                        {loading ? (
                            <span className="h-4 w-14 bg-surface animate-pulse rounded-xs" />
                        ) : (
                            <span className="font-semibold text-black">
                                {currency}
                                {shippingCost.toFixed(2)}
                            </span>
                        )}
                    </div>

                    <div className="flex justify-between items-center text-sm text-charcoal">
                        <span>Tax (8%):</span>
                        {loading ? (
                            <span className="h-4 w-14 bg-surface animate-pulse rounded-xs" />
                        ) : (
                            <span className="font-semibold text-black">
                                {currency}
                                {tax.toFixed(2)}
                            </span>
                        )}
                    </div>

                    <hr className="my-1 border-0 border-t border-orange" />

                    <div className="flex justify-between items-baseline pt-1">
                        <span className="font-display text-lg font-bold text-black uppercase">
                            Total:
                        </span>
                        {loading ? (
                            <span className="h-6 w-24 bg-surface animate-pulse rounded-xs" />
                        ) : (
                            <span className="font-display text-2xl font-extrabold text-orange leading-none">
                                {currency}
                                {total.toFixed(2)}
                            </span>
                        )}
                    </div>
                </div>

                {/* Action and Back Buttons */}
                <div className="flex flex-col gap-2.5 pt-2">
                    <Button
                        type={formId ? "submit" : "button"}
                        form={formId}
                        variant="primary"
                        onClick={!formId ? onActionClick : undefined}
                        disabled={items.length === 0 || loading || !isFormValid || isSubmitting}
                        className="w-full h-11 text-xs font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "PROCESSING..." : actionButtonText}
                    </Button>

                    {backButtonText && onBackClick && (
                        <button
                            type="button"
                            onClick={onBackClick}
                            disabled={isSubmitting}
                            className="w-full text-center py-2 text-xs font-bold text-muted hover:text-charcoal hover:underline cursor-pointer border-0 bg-transparent disabled:opacity-50"
                        >
                            {backButtonText}
                        </button>
                    )}
                </div>
            </div>
        </aside>
    );
}

export default CheckoutSummary;
