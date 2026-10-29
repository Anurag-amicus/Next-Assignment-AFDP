export interface Address {
    addressId?: number;
    customerId?: number;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault?: boolean;
}

export interface AddressResponse {
    addressId: number;
    message?: string;
}
