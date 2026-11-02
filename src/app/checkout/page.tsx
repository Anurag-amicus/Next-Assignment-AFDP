import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { cartApiService } from "@/services/cartApiService";
import { addressApiService } from "@/services/addressApiService";
import { geoApiService } from "@/services/geoApiService";
import CheckoutClientView from "@/components/checkout/CheckoutClientView";
import type { Metadata } from "next";
import type { Country } from "@/types/geoData";

export const metadata: Metadata = {
    title: "Checkout | Online Express",
    description: "Complete your order with secure shipping and payment options.",
};

export default async function CheckoutPage() {
    // 1. Route Guard: Check Authenticated Session
    const session = await getSession();
    if (!session.isAuthenticated || !session.user || !session.accessToken) {
        redirect("/login?returnUrl=/checkout");
    }

    // 2. Server-side Empty Cart Guard
    const cartRes = await cartApiService.getCart(session.accessToken);
    const items = cartRes.success && cartRes.data ? cartRes.data : [];
    if (items.length === 0) {
        redirect("/products");
    }

    // 3. Preload Saved Addresses
    const addressRes = await addressApiService.getAddresses(session.accessToken);
    const savedAddresses = addressRes.success && addressRes.data ? addressRes.data : [];

    // 4. Preload Countries with 24-hour Next.js Data Cache
    let initialCountries: Country[] = [];
    try {
        const countriesRes = await geoApiService.getCountries({ next: { revalidate: 86400 } });
        if (countriesRes.success && countriesRes.data) {
            initialCountries = countriesRes.data;
        }
    } catch (err) {
        console.warn("CheckoutPage: Failed to pre-fetch countries:", err);
    }

    return (
        <div className="w-full pt-4.5 px-6 pb-15 max-[520px]:pt-7 max-[520px]:px-4 max-[520px]:pb-10">
            <CheckoutClientView
                initialItems={items}
                savedAddresses={savedAddresses}
                initialCountries={initialCountries}
                accessToken={session.accessToken}
                defaultFullName={session.user.name || ""}
                defaultEmail={session.user.email || ""}
            />
        </div>
    );
}
