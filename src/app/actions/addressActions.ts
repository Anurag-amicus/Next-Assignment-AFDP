"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { addressApiService } from "@/services/addressApiService";
import { validateAddressPayload } from "@/lib/validations/shippingSchema";
import type { AddressActionResult } from "@/types/address";

/**
 * Server Action to create or update an address securely on the server.
 */
export async function saveAddressAction(
    addressId: number | null,
    rawPayload: unknown
): Promise<AddressActionResult> {
    const session = await getSession();
    if (!session.isAuthenticated || !session.accessToken) {
        return {
            success: false,
            requireAuth: true,
            error: "Please log in to manage your addresses.",
        };
    }

    const validation = validateAddressPayload(rawPayload);
    if (!validation.success || !validation.data) {
        return {
            success: false,
            error: validation.error || "Invalid address data.",
        };
    }

    if (addressId && addressId > 0) {
        const updateRes = await addressApiService.updateAddress(
            addressId,
            validation.data,
            session.accessToken
        );

        if (!updateRes.success) {
            return {
                success: false,
                error: updateRes.error || "Failed to update address.",
            };
        }

        revalidatePath("/checkout");
        return {
            success: true,
            addressId,
        };
    }

    const createRes = await addressApiService.createAddress(
        validation.data,
        session.accessToken
    );

    if (!createRes.success) {
        return {
            success: false,
            error: createRes.error || "Failed to create address.",
        };
    }

    revalidatePath("/checkout");
    return {
        success: true,
        addressId: createRes.data.addressId,
    };
}

/**
 * Server Action to fetch all addresses for the authenticated user securely.
 */
export async function getAddressesAction(): Promise<AddressActionResult> {
    const session = await getSession();
    if (!session.isAuthenticated || !session.accessToken) {
        return {
            success: false,
            requireAuth: true,
            addresses: [],
        };
    }

    const res = await addressApiService.getAddresses(session.accessToken);
    if (!res.success) {
        return {
            success: false,
            error: res.error || "Failed to fetch addresses.",
            addresses: [],
        };
    }

    return {
        success: true,
        addresses: res.data,
    };
}
