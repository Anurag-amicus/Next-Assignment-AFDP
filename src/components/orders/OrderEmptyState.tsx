import Link from "next/link";
import Button from "@/components/common/Button";
import type { OrderFilterTab } from "@/types/order";

export interface EmptyOrdersStateProps {
    tab?: OrderFilterTab;
    onResetTab?: () => void;
}

export function EmptyOrdersState({ tab, onResetTab }: EmptyOrdersStateProps) {
    const isFiltered = tab && tab !== "All Orders";

    return (
        <div className="w-full flex flex-col items-center justify-center py-16 px-4 bg-white border border-border rounded-xs text-center">
            {/* Shopping bag illustration */}
            <div className="w-16 h-16 rounded-full bg-surface/50 border border-border flex items-center justify-center text-3xl mb-4 text-subtle">
                🛍️
            </div>

            <h3 className="m-0 mb-2 font-display text-lg sm:text-xl font-bold text-dark uppercase tracking-wide">
                No orders yet. Start shopping!
            </h3>

            <p className="m-0 mb-6 text-xs sm:text-sm text-muted max-w-sm leading-relaxed">
                {isFiltered
                    ? `You don't have any orders with "${tab}" status. Check your other order tabs or browse our catalog.`
                    : "Looks like you haven't placed any orders yet. Discover our latest collection and start adding items to your cart!"}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
                {isFiltered && (
                    onResetTab ? (
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onResetTab}
                            className="w-auto h-10 px-5 text-xs font-bold uppercase tracking-wider border border-border"
                        >
                            VIEW ALL ORDERS
                        </Button>
                    ) : (
                        <Link href="/orders">
                            <Button
                                type="button"
                                variant="secondary"
                                className="w-auto h-10 px-5 text-xs font-bold uppercase tracking-wider border border-border"
                            >
                                VIEW ALL ORDERS
                            </Button>
                        </Link>
                    )
                )}

                <Link href="/products">
                    <Button
                        type="button"
                        variant="primary"
                        className="w-auto h-10 px-6 text-xs font-bold uppercase tracking-wider"
                    >
                        START SHOPPING
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default EmptyOrdersState;
