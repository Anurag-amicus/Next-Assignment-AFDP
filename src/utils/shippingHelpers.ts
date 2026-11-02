import { addressApiService } from "@/services/addressApiService";
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
    customerId?: number
): Address {
    return {
        customerId,
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

export async function saveAddress(
    addressId: number | null,
    payload: Address,
    token: string
) {
    if (addressId) {
        const result = await addressApiService.updateAddress(
            addressId,
            payload,
            token
        );

        if (result.success === false) {
            return {
                success: false as const,
                error: result.error || "Failed to update address.",
            };
        }

        return {
            success: true as const,
            addressId,
        };
    }

    const result = await addressApiService.createAddress(payload, token);

    if (result.success === false) {
        return {
            success: false as const,
            error: result.error || "Failed to create address.",
        };
    }

    return {
        success: true as const,
        addressId: result.data.addressId,
    };
}
