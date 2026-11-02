import type { Address } from "./address";

export type ShippingMethod = "standard" | "express" | "same day";

export interface ShippingFormData {
    fullName: string;
    email: string;
    phone: string;
    streetAddress: string;
    aptSuite: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    shippingMethod: ShippingMethod;
    isDefault?: boolean;
}

export const initialShippingForm: ShippingFormData = {
    fullName: "",
    email: "",
    phone: "",
    streetAddress: "",
    aptSuite: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    shippingMethod: "standard",
    isDefault: false,
};

export type ShippingFormErrors = Partial<Record<keyof ShippingFormData, string>>;

export type ShippingField = keyof ShippingFormData;

export interface SavedAddressListProps {
    savedAddresses: Address[];
    selectedAddressId: number | null;
    isLoadingAddresses?: boolean;
    onSelectAddress: (address: Address) => void;
    onEditAddress?: (address: Address) => void;
    onAddNewAddress?: () => void;
}
