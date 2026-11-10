import Link from "next/link";
import type { OrderFilterTab } from "@/types/order";

interface OrderFilterTabsProps {
    activeTab: OrderFilterTab;
}

export default function OrderFilterTabs({
    activeTab,
}: OrderFilterTabsProps) {
    const tabs: OrderFilterTab[] = [
        "All Orders",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
    ];

    return (
        <nav
            aria-label="Filter orders"
            className="w-full border-b border-border mb-6 overflow-x-auto no-scrollbar"
        >
            <div className="flex items-center gap-1 sm:gap-2 min-w-max pb-px">
                {tabs.map((tab) => {
                    const isSelected = activeTab === tab;

                    return (
                        <Link
                            key={tab}
                            href={
                                tab === "All Orders"
                                    ? "/orders"
                                    : `/orders?status=${encodeURIComponent(tab)}`
                            }
                            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold tracking-wide uppercase transition-all border-b-2 ${
                                isSelected
                                    ? "border-orange text-orange bg-orange-light/40"
                                    : "border-transparent text-muted hover:text-black hover:border-border-dark"
                            }`}
                        >
                            <span>{tab}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}