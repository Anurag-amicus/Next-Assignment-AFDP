import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import Button from "@/components/common/Button";

export const metadata = {
    title: "Checkout | Online Express",
    description: "Complete your purchase securely.",
};

export default async function CheckoutPage() {
    const session = await getSession();

    if (!session.isAuthenticated || !session.user) {
        redirect("/login?returnUrl=/checkout");
    }

    return (
        <div className="w-full max-w-4xl mx-auto px-6 py-12">
            <div className="mb-6">
                <span className="inline-block text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-xs bg-amber-100 text-amber-800 border border-amber-300">
                    Feature Not Configured Yet
                </span>
                <h1 className="font-display text-3xl font-extrabold text-charcoal mt-3 mb-1">
                    Checkout
                </h1>
                <p className="text-sm text-muted">
                    This protected checkout process is currently in development.
                </p>
            </div>

            <div className="bg-white border border-border rounded-xs p-6 shadow-xs">
                <h2 className="font-display text-lg font-bold text-charcoal mb-4">
                    Ready to Checkout
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                    <div className="p-3.5 bg-neutral-50 rounded-xs border border-border">
                        <span className="text-xs text-muted block uppercase tracking-wider font-semibold">Customer</span>
                        <span className="font-bold text-charcoal">{session.user.name}</span>
                    </div>
                    <div className="p-3.5 bg-neutral-50 rounded-xs border border-border">
                        <span className="text-xs text-muted block uppercase tracking-wider font-semibold">Email</span>
                        <span className="font-bold text-charcoal">{session.user.email}</span>
                    </div>
                    <div className="p-3.5 bg-neutral-50 rounded-xs border border-border">
                        <span className="text-xs text-muted block uppercase tracking-wider font-semibold">Role</span>
                        <span className="font-bold text-charcoal">{session.user.role || "Customer"}</span>
                    </div>
                    <div className="p-3.5 bg-neutral-50 rounded-xs border border-border">
                        <span className="text-xs text-muted block uppercase tracking-wider font-semibold">Account ID</span>
                        <span className="font-bold text-charcoal">{session.user.customerId || "N/A"}</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Link href="/products">
                        <Button variant="primary" className="text-sm">
                            Return to Store
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
