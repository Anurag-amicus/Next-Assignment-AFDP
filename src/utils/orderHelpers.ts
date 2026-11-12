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

export function formatOrderDate(iso?: string | null): string {
    if (!iso || typeof iso !== "string" || !iso.trim()) {
        return "Recent";
    }

    try {
        const date = new Date(iso);
        if (isNaN(date.getTime())) {
            return "Recent";
        }
        return new Intl.DateTimeFormat("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }).format(date);
    } catch {
        return "Recent";
    }
}

export const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "INR" }).format(amount);