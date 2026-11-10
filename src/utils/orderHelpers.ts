import type { OrderFilterTab } from "@/types/order";

export function normalizeOrderStatus(status?: string): OrderFilterTab {
    if (!status) return "All Orders";
    const normalized = status.trim().toLowerCase();

    if (normalized === "placed" || normalized === "processing") return "Processing";
    if (normalized === "shipped") return "Shipped";
    if (normalized === "delivered") return "Delivered";
    if (normalized === "cancelled") return "Cancelled";

    return "All Orders";
}

export const formatOrderDate = (iso: string) =>
    new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));

export const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "INR" }).format(amount);