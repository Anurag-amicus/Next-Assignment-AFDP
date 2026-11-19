import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HeaderUserMenu from "@/components/layout/HeaderUserMenu";
import type { User } from "@/types/auth";

const mockUser: User = {
    customerId: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "User",
};

describe("HeaderUserMenu Component", () => {
    const handleLogout = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders skeleton placeholder when isLoading is true", () => {
        const { container } = render(
            <HeaderUserMenu user={null} onLogout={handleLogout} isLoading={true} />
        );

        expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
        expect(screen.queryByText("Sign In")).not.toBeInTheDocument();
        expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    });

    test("renders Sign In link when user is null and not loading", () => {
        render(<HeaderUserMenu user={null} onLogout={handleLogout} isLoading={false} />);

        const signInLink = screen.getByRole("link", { name: /sign in/i });
        expect(signInLink).toBeInTheDocument();
        expect(signInLink).toHaveAttribute("href", "/login");
    });

    test("renders user profile trigger and opens dropdown on click when user is authenticated", () => {
        render(<HeaderUserMenu user={mockUser} onLogout={handleLogout} isLoading={false} />);

        const userButton = screen.getByRole("button", { name: /user account menu/i });
        expect(userButton).toBeInTheDocument();
        expect(screen.getByText("John")).toBeInTheDocument();

        // Click to open dropdown
        fireEvent.click(userButton);

        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Role: User")).toBeInTheDocument();
        expect(screen.getByText("Sign Out")).toBeInTheDocument();

        // Click sign out
        const signOutButton = screen.getByText("Sign Out");
        fireEvent.click(signOutButton);
        expect(handleLogout).toHaveBeenCalledTimes(1);
    });
});
