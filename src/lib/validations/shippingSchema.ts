import { z } from "zod";
import type {
    ShippingFormData,
    ShippingFormErrors,
    ShippingField,
} from "@/types/shipping";

/**
 * Zod validation schema for shipping form data matching React assignment rules.
 */
export const shippingSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(1, "Full name is required.")
        .min(3, "Full name must be at least 3 characters.")
        .max(50, "Full name must be 50 characters or less."),
    email: z
        .string()
        .trim()
        .min(1, "Email is required.")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address."),
    phone: z
        .string()
        .trim()
        .min(1, "Phone number is required.")
        .regex(/^\d{10}$/, "Phone number must contain exactly 10 digits."),
    streetAddress: z
        .string()
        .trim()
        .min(1, "Street address is required.")
        .min(10, "Street address must be at least 10 characters."),
    aptSuite: z.string().optional().default(""),
    country: z
        .string()
        .trim()
        .min(1, "Country is required."),
    state: z
        .string()
        .trim()
        .min(1, "State is required."),
    city: z
        .string()
        .trim()
        .min(1, "City is required."),
    zip: z
        .string()
        .trim()
        .min(1, "ZIP code is required.")
        .regex(/^[a-zA-Z0-9]{5,6}$/, "ZIP code must contain 5–6 alphanumeric characters."),
    shippingMethod: z.enum(["standard", "express", "same day"], {
        message: "Shipping method is required.",
    }),
    isDefault: z.boolean().optional().default(false),
});

/**
 * Validate a single field using the matching Zod field schema for instant blur/change feedback.
 */
export function validateField(
    field: ShippingField,
    value: unknown
): string | undefined {
    if (field === "isDefault") return undefined;

    const fieldSchema = (shippingSchema.shape as Record<string, z.ZodTypeAny>)[field];
    if (!fieldSchema) return undefined;

    const result = fieldSchema.safeParse(value);
    if (!result.success) {
        return result.error.issues?.[0]?.message;
    }
    return undefined;
}

/**
 * Validate the entire shipping form data and return an error map.
 */
export function validateShippingForm(
    formData: ShippingFormData
): ShippingFormErrors {
    const result = shippingSchema.safeParse(formData);
    if (result.success) {
        return {};
    }

    const errors: ShippingFormErrors = {};
    for (const issue of result.error.issues) {
        const fieldName = issue.path[0] as ShippingField;
        if (fieldName && !errors[fieldName]) {
            errors[fieldName] = issue.message;
        }
    }
    return errors;
}
