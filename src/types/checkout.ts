import type { CartItem } from "./cart";
import type { ShippingFormData } from "./shipping";

export type CheckoutStep = 1 | 2 | 3;

export interface CheckoutRequest {
    addressId: number;
    shippingMethod: string;
    paymentMethod: string;
}

export interface CheckoutResponse {
    subtotal: number;
    shippingCharge: number;
    tax: number;
    totalAmount: number;
    priceChanges?: unknown[];
    stockIssues?: unknown[];
    orderId: number;
}

export interface MockPaymentRequest {
    orderId: number;
    paymentMethod: string;
}

export interface MockPaymentResponse {
    orderId: number;
    paymentStatus: string;
    transactionReference: string;
    amount: number;
}

export interface PaymentStepProps {
    onSubmit: (paymentMethod: string) => void;
}

export interface ReviewStepProps {
    items: CartItem[];
    shippingData: ShippingFormData;
    paymentMethod: string;
    shippingCost: number;
    currency?: string;
    onEditShipping: () => void;
    onEditPayment: () => void;
}

export interface CheckoutSummaryProps {
    items?: CartItem[];
    loading?: boolean;
    isFormValid?: boolean;
    formId?: string;
    currency?: string;
    className?: string;
    shippingCost?: number;
    actionButtonText?: string;
    onActionClick?: () => void;
    backButtonText?: string;
    onBackClick?: () => void;
    isSubmitting?: boolean;
}
