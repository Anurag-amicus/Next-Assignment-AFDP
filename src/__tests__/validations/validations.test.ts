import { shippingSchema } from "@/lib/validations/shippingSchema";
import { cartItemPayloadSchema, validateCartItemPayload } from "@/lib/validations/cartSchema";

describe("Validation Schemas", () => {
    describe("shippingSchema", () => {
        const validShippingData = {
            fullName: "Anurag Chandra",
            email: "anurag@example.com",
            phone: "9876543210",
            streetAddress: "123 Tech Park Boulevard",
            aptSuite: "Suite 4B",
            country: "India",
            state: "Karnataka",
            city: "Bengaluru",
            zip: "560001",
            shippingMethod: "standard" as const,
            isDefault: true,
        };

        test("accepts completely valid shipping form data", () => {
            const result = shippingSchema.safeParse(validShippingData);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.fullName).toBe("Anurag Chandra");
                expect(result.data.phone).toBe("9876543210");
                expect(result.data.zip).toBe("560001");
                expect(result.data.shippingMethod).toBe("standard");
                expect(result.data.isDefault).toBe(true);
            }
        });

        test("rejects invalid inputs with specific constraint error messages", () => {
            // 1. Phone number with fewer than 10 digits
            const invalidPhoneResult = shippingSchema.safeParse({
                ...validShippingData,
                phone: "12345",
            });
            expect(invalidPhoneResult.success).toBe(false);
            if (!invalidPhoneResult.success) {
                const phoneError = invalidPhoneResult.error.issues.find((i) => i.path.includes("phone"));
                expect(phoneError?.message).toBe("Phone number must contain exactly 10 digits.");
            }

            // 2. Malformed email address
            const invalidEmailResult = shippingSchema.safeParse({
                ...validShippingData,
                email: "not-an-email",
            });
            expect(invalidEmailResult.success).toBe(false);
            if (!invalidEmailResult.success) {
                const emailError = invalidEmailResult.error.issues.find((i) => i.path.includes("email"));
                expect(emailError?.message).toBe("Enter a valid email address.");
            }

            // 3. Short street address (less than 10 chars)
            const shortAddressResult = shippingSchema.safeParse({
                ...validShippingData,
                streetAddress: "Short St",
            });
            expect(shortAddressResult.success).toBe(false);
            if (!shortAddressResult.success) {
                const addressError = shortAddressResult.error.issues.find((i) => i.path.includes("streetAddress"));
                expect(addressError?.message).toBe("Street address must be at least 10 characters.");
            }

            // 4. Invalid ZIP code (less than 5 alphanumeric characters)
            const invalidZipResult = shippingSchema.safeParse({
                ...validShippingData,
                zip: "12",
            });
            expect(invalidZipResult.success).toBe(false);
            if (!invalidZipResult.success) {
                const zipError = invalidZipResult.error.issues.find((i) => i.path.includes("zip"));
                expect(zipError?.message).toBe("ZIP code must contain 5–6 alphanumeric characters.");
            }
        });
    });

    describe("cartItemPayloadSchema & validateCartItemPayload", () => {
        test("validates quantity boundaries (1-99) and coercible inputs", () => {
            // Valid boundary values
            expect(cartItemPayloadSchema.safeParse({ productId: 101, quantity: 1 }).success).toBe(true);
            expect(cartItemPayloadSchema.safeParse({ productId: 101, quantity: 50 }).success).toBe(true);

            // Valid string coercion
            const coercedResult = validateCartItemPayload({ productId: "101", quantity: "3" });
            expect(coercedResult.success).toBe(true);
            if (coercedResult.success) {
                expect(coercedResult.data.productId).toBe(101);
                expect(coercedResult.data.quantity).toBe(3);
            }

            // Invalid: Zero quantity
            const zeroQtyResult = cartItemPayloadSchema.safeParse({ productId: 101, quantity: 0 });
            expect(zeroQtyResult.success).toBe(false);
            if (!zeroQtyResult.success) {
                expect(zeroQtyResult.error.issues[0]?.message).toBe("Quantity must be at least 1");
            }

            // Invalid: Quantity exceeding 99
            const overflowQtyResult = cartItemPayloadSchema.safeParse({ productId: 101, quantity: 150 });
            expect(overflowQtyResult.success).toBe(false);
            if (!overflowQtyResult.success) {
                expect(overflowQtyResult.error.issues[0]?.message).toBe("Quantity cannot exceed 50");
            }

            // Invalid: Negative product ID
            const negativeIdResult = cartItemPayloadSchema.safeParse({ productId: -5, quantity: 1 });
            expect(negativeIdResult.success).toBe(false);
            if (!negativeIdResult.success) {
                expect(negativeIdResult.error.issues[0]?.message).toBe("Product ID must be a positive number");
            }
        });
    });
});

