import { getSession } from "@/lib/session";
import { cartApiService } from "@/services/cartApiService";
import Breadcrumb from "@/components/common/Breadcrumb";
import CartClientView from "@/components/cart/CartClientView";
import type { CartItem } from "@/types/cart";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shopping Cart | Online Express",
    description: "Review your shopping cart, manage item quantities, and proceed to checkout on Online Express.",
};

export default async function CartPage() {
    const session = await getSession();
    let initialItems: CartItem[] = [];

    if (session.accessToken) {
        const res = await cartApiService.getCart(session.accessToken);
        if (res.success && res.data) {
            initialItems = res.data;
        }
    }

    return (
        <div className="w-full pt-4.5 px-6 pb-15 max-[520px]:pt-7 max-[520px]:px-4 max-[520px]:pb-10">
            <Breadcrumb />
            <CartClientView initialItems={initialItems} />
        </div>
    );
}
