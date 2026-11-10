"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import  Button  from "@/components/common/Button";
import { reorderAction } from "@/app/actions/orderActions";

export default function ReorderButton({ orderId }: { orderId: number }) {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(reorderAction.bind(null, orderId), null);

    useEffect(() => {
        if (!state) return;
        if (state.success) {
            toast.success(state.message);
            router.push("/cart");
        } else {
            toast.error(state.message);
        }
    }, [state, router]);

    return (
        <form action={formAction}>
            <Button type="submit" variant="primary" disabled={isPending} className="px-4 py-2 text-sm font-semibold">
                {isPending ? "ADDING..." : "REORDER"}
            </Button>
        </form>
    );
}