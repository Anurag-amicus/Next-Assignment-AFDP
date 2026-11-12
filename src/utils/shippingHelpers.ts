import type { Address } from "@/types/address";
import type {
    ShippingFormData,
    ShippingMethod,
} from "@/types/shipping";

/**
 * Convert form data into the API address format.
 */
export function buildAddressPayload(
    data: ShippingFormData,
): Address {
    return {
        addressLine1: data.streetAddress,
        addressLine2: data.aptSuite || "",
        city: data.city,
        state: data.state,
        postalCode: data.zip,
        country: data.country,
        isDefault: !!data.isDefault,
    };
}

export const SHIPPING_METHODS: {
    id: ShippingMethod;
    label: string;
    price: number;
}[] = [
    {
        id: "standard",
        label: "Standard Shipping (5-7 days)",
        price: 100,
    },
    {
        id: "express",
        label: "Express Shipping (2-3 days)",
        price: 250,
    },
    {
        id: "same day",
        label: "Same Day Delivery (Today)",
        price: 400,
    },
];
