export interface Address {
    addressId?: number;
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

export interface AddressActionResult {
    success: boolean;
    addressId?: number;
    error?: string;
    requireAuth?: boolean;
    addresses?: Address[];
}
