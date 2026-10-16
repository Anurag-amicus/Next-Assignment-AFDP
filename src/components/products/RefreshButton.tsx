"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";

export default function RefreshButton() {
    const router = useRouter();

    const handleRefresh = () => {
        router.refresh();
    };

    return (
        <Button
            onClick={handleRefresh}
            className="w-30 h-10.5 py-2.5 px-4 rounded-xs font-display text-sm font-bold leading-none tracking-wide uppercase inline-flex items-center justify-center shrink-0 max-[520px]:w-25 max-[520px]:h-9.5 max-[520px]:py-2 max-[520px]:px-3 max-[520px]:text-xs"
        >
            Refresh
        </Button>
    );
}
