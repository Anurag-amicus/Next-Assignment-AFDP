import { getCurrentUserAction, getHeaderStateAction, loginAction } from "@/app/actions/authActions";
import { getSession, createSession } from "@/lib/session";
import { authApiService } from "@/services/authApiService";
import { getCartCountAction } from "@/app/actions/cartActions";
import { defaultUser } from "@/types/auth";

jest.mock("@/lib/session", () => ({
    getSession: jest.fn(),
    getRefreshToken: jest.fn(),
    createSession: jest.fn(),
    deleteSession: jest.fn(),
}));

jest.mock("@/services/authApiService", () => ({
    authApiService: {
        login: jest.fn(),
        register: jest.fn(),
        refreshToken: jest.fn(),
        logout: jest.fn(),
    },
}));

jest.mock("@/app/actions/cartActions", () => ({
    getCartCountAction: jest.fn(),
}));

jest.mock("next/navigation", () => ({
    redirect: jest.fn(),
}));

describe("authActions Server Actions", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("returns null when user session is not authenticated", async () => {
        (getSession as jest.Mock).mockResolvedValue({
            isAuthenticated: false,
            accessToken: null,
        });

        const result = await getCurrentUserAction();
        expect(result).toBeNull();
    });

    test("returns defaultUser when session has valid accessToken", async () => {
        (getSession as jest.Mock).mockResolvedValue({
            isAuthenticated: true,
            accessToken: "valid-jwt-token",
        });

        const result = await getCurrentUserAction();
        expect(result).toEqual(defaultUser);
    });

    test("getHeaderStateAction returns user and cartCount when authenticated", async () => {
        (getSession as jest.Mock).mockResolvedValue({
            isAuthenticated: true,
            accessToken: "valid-token",
        });
        (getCartCountAction as jest.Mock).mockResolvedValue(3);

        const result = await getHeaderStateAction();
        expect(result).toEqual({ user: defaultUser, cartCount: 3 });
    });

    test("getHeaderStateAction returns null user and 0 cartCount when unauthenticated", async () => {
        (getSession as jest.Mock).mockResolvedValue({
            isAuthenticated: false,
            accessToken: null,
        });

        const result = await getHeaderStateAction();
        expect(result).toEqual({ user: null, cartCount: 0 });
    });

    test("loginAction sets session and returns user, cartCount, and returnUrl on success", async () => {
        (authApiService.login as jest.Mock).mockResolvedValue({
            success: true,
            data: {
                token: "token-123",
                refreshToken: "refresh-123",
            },
        });
        (getCartCountAction as jest.Mock).mockResolvedValue(2);

        const formData = new FormData();
        formData.set("email", "john.doe@example.com");
        formData.set("password", "password123");
        formData.set("returnUrl", "/checkout");

        const result = await loginAction({ success: false }, formData);

        expect(createSession).toHaveBeenCalledWith("token-123", "refresh-123");
        expect(result.success).toBe(true);
        expect(result.user).toEqual(defaultUser);
        expect(result.cartCount).toBe(2);
        expect(result.returnUrl).toBe("/checkout");
    });
});
