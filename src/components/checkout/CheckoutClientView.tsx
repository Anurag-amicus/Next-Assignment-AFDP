"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Breadcrumb from "@/components/common/Breadcrumb";
import ShippingForm from "./ShippingForm";
import PaymentStep from "./PaymentStep";
import ReviewStep from "./ReviewStep";
import CheckoutSummary from "./CheckoutSummary";
import { placeOrderAction } from "@/app/actions/orderActions";
import { notifyCartUpdated } from "@/utils/cartUtils";
import { initialShippingForm } from "@/types/shipping";
import type { CartItem } from "@/types/cart";
import type { Address } from "@/types/address";
import type { ShippingFormData } from "@/types/shipping";
import type { CheckoutStep } from "@/types/checkout";
import type { Country } from "@/types/geoData";

export interface CheckoutClientViewProps {
    initialItems: CartItem[];
    savedAddresses?: Address[];
    initialCountries?: Country[];
    accessToken?: string;
    defaultFullName?: string;
    defaultEmail?: string;
}

export default function CheckoutClientView({
    initialItems,
    savedAddresses = [],
    initialCountries = [],
    accessToken,
    defaultFullName = "",
    defaultEmail = "",
}: CheckoutClientViewProps) {
    const router = useRouter();
    const [items] = useState<CartItem[]>(initialItems);

    // Multi-step checkout states
    const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
    const [highestStepReached, setHighestStepReached] = useState<CheckoutStep>(1);

    // Form data state across steps
    const defaultAddress = savedAddresses.find((a) => a.isDefault) || savedAddresses[0];
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
        defaultAddress ? (defaultAddress.addressId || null) : null
    );

    const [shippingData, setShippingData] = useState<ShippingFormData>({
        ...initialShippingForm,
        fullName: defaultAddress ? defaultFullName : defaultFullName,
        email: defaultEmail,
        streetAddress: defaultAddress?.addressLine1 || "",
        aptSuite: defaultAddress?.addressLine2 || "",
        city: defaultAddress?.city || "",
        state: defaultAddress?.state || "",
        zip: defaultAddress?.postalCode || "",
        country: defaultAddress?.country || "",
        isDefault: !!defaultAddress?.isDefault,
    });

    const [isShippingValid, setIsShippingValid] = useState(
        Boolean(defaultAddress?.addressId)
    );
    const [shippingCost, setShippingCost] = useState(100.0);
    const [paymentMethod, setPaymentMethod] = useState("Mock Payment");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [, startTransition] = useTransition();

    // ─── Empty Cart Guard (Client safeguard) ───
    useEffect(() => {
        if (items.length === 0 && !isSubmitting) {
            toast.error("Your cart is empty. Please add items before checking out.");
            router.replace("/products");
        }
    }, [items.length, isSubmitting, router]);

    // ─── Step 1: Shipping Submit Success ───
    const handleShippingSuccess = (data: ShippingFormData, addressId: number | null) => {
        setShippingData(data);
        setSelectedAddressId(addressId);
        setCurrentStep(2);
        setHighestStepReached((prev) => (prev < 2 ? 2 : prev));
    };

    // ─── Step 2: Payment Submit Success ───
    const handlePaymentSuccess = (method: string) => {
        setPaymentMethod(method);
        setCurrentStep(3);
        setHighestStepReached((prev) => (prev < 3 ? 3 : prev));
    };

    // ─── Step 3: Final Place Order Execution ───
    const handlePlaceOrder = () => {
        if (isSubmitting) return;

        setIsSubmitting(true);
        startTransition(async () => {
            try {
                const res = await placeOrderAction({
                    shippingData,
                    addressId: selectedAddressId,
                    paymentMethod,
                });

                if (res.requireAuth) {
                    toast.error("Please log in to complete your order.");
                    router.push("/login?returnUrl=/checkout");
                    setIsSubmitting(false);
                    return;
                }

                if (res.success) {
                    // Update header cart badge to 0 immediately
                    notifyCartUpdated(0);
                    toast.success(res.message || "Order placed successfully! Thank you for your purchase.");
                    router.push("/orders");
                } else {
                    toast.error(res.error || "Failed to place order. Please check your information.");
                    setIsSubmitting(false);
                }
            } catch (err) {
                toast.error(err instanceof Error ? err.message : "An unexpected error occurred.");
                setIsSubmitting(false);
            }
        });
    };

    const handleStepClick = (step: CheckoutStep) => {
        if (step <= highestStepReached) {
            setCurrentStep(step);
        }
    };

    if (items.length === 0) {
        return null;
    }

    return (
        <div className="w-full">
            <Breadcrumb />

            <h1 className="m-0 font-display text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight">
                Checkout
            </h1>

            {/* ─── Step Indicators: 1. Shipping | 2. Payment | 3. Review ─── */}
            <div className="flex items-center w-[70%] max-[900px]:w-full max-[900px]:max-w-175 my-6 max-[600px]:my-5 mx-auto max-[600px]:gap-1.5">
                {/* Step 1: Shipping */}
                <button
                    type="button"
                    onClick={() => handleStepClick(1)}
                    className={`flex-1 h-8.5 max-[600px]:h-8 flex items-center justify-center px-3.5 max-[600px]:px-2 rounded-full text-xs font-bold border-0 transition-colors ${
                        currentStep === 1
                            ? "bg-orange text-white"
                            : currentStep > 1
                              ? "bg-charcoal text-white cursor-pointer hover:bg-orange"
                              : "bg-surface text-charcoal"
                    }`}
                >
                    <span>1. Shipping {currentStep > 1 ? "✓" : ""}</span>
                </button>

                <div
                    className={`w-11.5 max-[600px]:w-3.5 h-0.5 shrink-0 mx-1.5 transition-colors ${
                        currentStep > 1 ? "bg-orange" : "bg-border"
                    }`}
                />

                {/* Step 2: Payment */}
                <button
                    type="button"
                    onClick={() => handleStepClick(2)}
                    disabled={highestStepReached < 2}
                    className={`flex-1 h-8.5 max-[600px]:h-8 flex items-center justify-center px-3.5 max-[600px]:px-2 rounded-full text-xs font-bold border-0 transition-colors ${
                        currentStep === 2
                            ? "bg-orange text-white"
                            : currentStep > 2
                              ? "bg-charcoal text-white cursor-pointer hover:bg-orange"
                              : "bg-surface text-muted disabled:cursor-not-allowed"
                    }`}
                >
                    <span>2. Payment {currentStep > 2 ? "✓" : ""}</span>
                </button>

                <div
                    className={`w-11.5 max-[600px]:w-3.5 h-0.5 shrink-0 mx-1.5 transition-colors ${
                        currentStep > 2 ? "bg-orange" : "bg-border"
                    }`}
                />

                {/* Step 3: Review */}
                <button
                    type="button"
                    onClick={() => handleStepClick(3)}
                    disabled={highestStepReached < 3}
                    className={`flex-1 h-8.5 max-[600px]:h-8 flex items-center justify-center px-3.5 max-[600px]:px-2 rounded-full text-xs font-bold border-0 transition-colors ${
                        currentStep === 3
                            ? "bg-orange text-white"
                            : "bg-surface text-muted disabled:cursor-not-allowed"
                    }`}
                >
                    <span>3. Review</span>
                </button>
            </div>

            {/* ─── 2-Column Main Layout: Active Step on Left, Summary on Right ─── */}
            <div className="grid grid-cols-12 gap-6 items-start max-[990px]:grid-cols-1">
                <div className="col-span-8 max-[990px]:col-span-1 min-w-0">
                    {currentStep === 1 && (
                        <ShippingForm
                            initialValues={shippingData}
                            initialAddressId={selectedAddressId}
                            savedAddresses={savedAddresses}
                            initialCountries={initialCountries}
                            accessToken={accessToken}
                            onValidityChange={setIsShippingValid}
                            onShippingCostChange={setShippingCost}
                            onSubmitSuccess={handleShippingSuccess}
                            isSubmitting={isSubmitting}
                        />
                    )}

                    {currentStep === 2 && (
                        <PaymentStep onSubmit={handlePaymentSuccess} />
                    )}

                    {currentStep === 3 && (
                        <ReviewStep
                            items={items}
                            shippingData={shippingData}
                            paymentMethod={paymentMethod}
                            shippingCost={shippingCost}
                            onEditShipping={() => setCurrentStep(1)}
                            onEditPayment={() => setCurrentStep(2)}
                        />
                    )}
                </div>

                <div className="col-span-4 max-[990px]:col-span-1 sticky top-6 self-start">
                    <CheckoutSummary
                        items={items}
                        isFormValid={currentStep === 1 ? isShippingValid : true}
                        formId={
                            currentStep === 1
                                ? "checkout-form-rhf"
                                : currentStep === 2
                                  ? "payment-form"
                                  : undefined
                        }
                        shippingCost={shippingCost}
                        actionButtonText={
                            currentStep === 1
                                ? "CONTINUE TO PAYMENT"
                                : currentStep === 2
                                  ? "CONTINUE TO REVIEW"
                                  : "PLACE ORDER"
                        }
                        onActionClick={currentStep === 3 ? handlePlaceOrder : undefined}
                        backButtonText={
                            currentStep === 2
                                ? "← BACK TO SHIPPING"
                                : currentStep === 3
                                  ? "← BACK TO PAYMENT"
                                  : undefined
                        }
                        onBackClick={
                            currentStep === 2
                                ? () => setCurrentStep(1)
                                : currentStep === 3
                                  ? () => setCurrentStep(2)
                                  : undefined
                        }
                        isSubmitting={isSubmitting}
                    />
                </div>
            </div>
        </div>
    );
}
