import type { PaymentStepProps } from "@/types/checkout";

export function PaymentStep({ onSubmit }: PaymentStepProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit("Mock Payment");
    };

    return (
        <section className="w-full border border-border bg-white rounded-xs overflow-hidden">
            <h2 className="m-0 py-2.75 px-4.5 bg-dark text-white font-display text-sm font-bold tracking-wider leading-tight">
                2. PAYMENT METHOD
            </h2>

            <form
                id="payment-form"
                onSubmit={handleSubmit}
                className="p-5 flex flex-col gap-5"
            >
                <div className="flex flex-col gap-2.5">
                    <span className="text-xs font-bold text-black">
                        Select Payment Option *
                    </span>

                    <label className="flex items-start gap-3 p-4 border border-orange bg-orange/5 cursor-pointer shadow-xs rounded-xs">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="Mock Payment"
                            checked={true}
                            readOnly
                            className="appearance-none w-3.5 h-3.5 mt-0.5 shrink-0 bg-white border border-orange rounded-full cursor-pointer checked:border-orange checked:bg-orange checked:shadow-[inset_0_0_0_3px_white]"
                        />
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-bold text-black font-display">
                                Mock Payment Gateway
                            </span>
                            <span className="text-xs text-muted leading-relaxed mt-1">
                                Simulated payment gateway for assignment testing. Clicking Continue will proceed to the final review step and automatically authorize your payment via backend Mock Payment API.
                            </span>
                            <span className="text-xs text-emerald-700 font-bold mt-2 flex items-center gap-1">
                                ✓ No payment details required (Test Mode Active)
                            </span>
                        </div>
                    </label>
                </div>
            </form>
        </section>
    );
}

export default PaymentStep;
