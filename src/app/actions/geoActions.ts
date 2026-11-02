"use server";

import { geoApiService } from "@/services/geoApiService";
import type { State } from "@/types/geoData";

/**
 * Server Action to fetch states for a given country with Next.js 24-hour server caching.
 */
export async function getStatesAction(country: string): Promise<State[]> {
    if (!country || !country.trim()) {
        return [];
    }

    try {
        const res = await geoApiService.getStates(country.trim());
        if (res.success && res.data) {
            return res.data;
        }
        return [];
    } catch (err) {
        console.error(`getStatesAction failed for "${country}":`, err);
        return [];
    }
}

/**
 * Server Action to fetch cities for a country and state with Next.js 24-hour server caching.
 */
export async function getCitiesAction(country: string, state: string): Promise<string[]> {
    if (!country || !state || !country.trim() || !state.trim()) {
        return [];
    }

    try {
        const res = await geoApiService.getCities(country.trim(), state.trim());
        if (res.success && res.data) {
            return res.data.filter((c): c is string => typeof c === "string" && Boolean(c));
        }
        return [];
    } catch (err) {
        console.error(`getCitiesAction failed for "${country}, ${state}":`, err);
        return [];
    }
}
