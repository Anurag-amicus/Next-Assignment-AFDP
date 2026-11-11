import { addToCartAction } from "@/app/actions/cartActions";
import { getSession } from "@/lib/session";
import { cartApiService } from "@/services/cartApiService";
import { revalidatePath } from "next/cache";

jest.mock("@/lib/session", () => ({
    getSession: jest.fn(),
}));

jest.mock("@/services/cartApiService", () => ({
    cartApiService: {
        getCart: jest.fn(),
        addToCart: jest.fn(),
        updateQuantity: jest.fn(),
        removeItem: jest.fn(),
    },
}));

describe("cartActions Server Actions", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("rejects invalid payload immediately before checking session or calling API", async () => {
        // Invalid payload: negative product ID and 0 quantity
        const result = await addToCartAction({
            productId: -1,
            quantity: 0,
        });

        // 1. Returns validation error
        expect(result.success).toBe(false);
        expect(result.error).toBeDefined();

        // 2. Verified that session check and API were bypassed
        expect(getSession).not.toHaveBeenCalled();
        expect(cartApiService.addToCart).not.toHaveBeenCalled();
    });

    test("rejects unauthenticated requests and returns requireAuth flag", async () => {
        // Mock unauthenticated session
        (getSession as jest.Mock).mockResolvedValue({
            isAuthenticated: false,
            accessToken: null,
            user: null,
        });

        const result = await addToCartAction({
            productId: 101,
            quantity: 2,
        });

        // 1. Returns requireAuth payload
        expect(result.success).toBe(false);
        expect(result.requireAuth).toBe(true);
        expect(result.message).toBe("Please log in to add products to your cart.");

        // 2. API service was not called
        expect(cartApiService.addToCart).not.toHaveBeenCalled();
    });

    test("delegates to cartApiService with valid token and triggers revalidatePath on success", async () => {
        // 1. Mock authenticated session
        (getSession as jest.Mock).mockResolvedValue({
            isAuthenticated: true,
            accessToken: "mock-valid-token",
            user: { customerId: 1, email: "anurag@example.com" },
        });

        // 2. Mock API service mutation response
        (cartApiService.addToCart as jest.Mock).mockResolvedValue({
            success: true,
            data: { message: "Item added to cart successfully!" },
        });

        // 3. Mock fresh cart refetch response
        const mockFreshCart = [
            {
                cartItemId: 1,
                productId: 101,
                productName: "Mechanical Keyboard",
                price: 4999,
                quantity: 2,
                itemSubtotal: 9998,
            },
        ];
        (cartApiService.getCart as jest.Mock).mockResolvedValue({
            success: true,
            data: mockFreshCart,
        });

        const result = await addToCartAction({
            productId: 101,
            quantity: 2,
        });

        // Assert API service called with exact arguments
        expect(cartApiService.addToCart).toHaveBeenCalledTimes(1);
        expect(cartApiService.addToCart).toHaveBeenCalledWith(
            "mock-valid-token",
            101,
            2
        );

        // Assert fresh cart was refetched
        expect(cartApiService.getCart).toHaveBeenCalledWith("mock-valid-token");

        // Assert Next.js cache revalidation was triggered
        expect(revalidatePath).toHaveBeenCalledWith("/cart");

        // Assert response object
        expect(result.success).toBe(true);
        expect(result.message).toBe("Item added to cart successfully!");
        expect(result.items).toEqual(mockFreshCart);
        expect(result.count).toBe(2);
    });
});

