import { memo } from "react";
import type { OrderStatus } from "@/types/order";
import { cn } from "@/utils/cn";

interface StatusBadgeProps {
    status?: OrderStatus | string | null;
    className?: string;
}

const statusConfig: Record<
    OrderStatus,
    { bg: string; text: string; border: string; dot: string }
> = {
    Processing: {
        bg: "bg-orange-50",
        text: "text-orange-700",
        border: "border-orange-200",
        dot: "bg-orange-600",
    },
    Shipped: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        dot: "bg-blue-600",
    },
    Delivered: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        dot: "bg-emerald-600",
    },
    Cancelled: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        dot: "bg-red-600",
    },
};

function resolveStatus(raw?: string | null): OrderStatus {
    if (!raw) return "Processing";
    const s = raw.trim().toLowerCase();
    if (s === "placed" || s === "pending" || s === "processing") return "Processing";
    if (s === "shipped") return "Shipped";
    if (s === "delivered") return "Delivered";
    if (s === "cancelled" || s === "canceled") return "Cancelled";
    return "Processing";
}

const StatusBadge = memo(function StatusBadge({
    status,
    className = "",
}: StatusBadgeProps) {
    const resolved = resolveStatus(status);
    const config = statusConfig[resolved] || statusConfig.Processing;

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold uppercase tracking-wider border-2 rounded-full",
                config.bg,
                config.text,
                config.border,
                className
            )}
        >
            <span className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
            {resolved}
        </span>
    );
});

export default StatusBadge;

