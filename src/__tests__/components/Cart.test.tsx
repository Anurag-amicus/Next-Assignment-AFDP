import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "@/components/cart/Cart";
import type { CartItem as CartItemType } from "@/types/cart";

describe("Cart Component", () => {
    const mockItems: CartItemType[] = [
        {
            cartItemId: 1,
            productId: 101,
            productName: "Wireless Noise-Canceling Headphones",
            price: 2499,
            quantity: 2,
            itemSubtotal: 4998,
            imageUrl: "https://example.com/headphones.jpg",
        },
        {
            cartItemId: 2,
            productId: 102,
            productName: "Mechanical Gaming Keyboard",
            price: 3999,
            quantity: 1,
            itemSubtotal: 3999,
            imageUrl: "https://example.com/keyboard.jpg",
        },
    ];

    test("renders empty cart state with accessible navigation link to products", () => {
        render(
            <Cart
                items={[]}
                onUpdateQuantity={jest.fn()}
                onRemove={jest.fn()}
            />
        );

        // 1. Empty state heading
        const emptyHeading = screen.getByRole("heading", {
            name: /your cart is empty/i,
            level: 3,
        });
        expect(emptyHeading).toBeInTheDocument();

        // 2. Helpful empty state message
        expect(
            screen.getByText(/looks like you have not added anything to your cart yet/i)
        ).toBeInTheDocument();

        // 3. Accessible browse products link pointing to /products
        const browseLink = screen.getByRole("link", {
            name: /browse products/i,
        });
        expect(browseLink).toBeInTheDocument();
        expect(browseLink).toHaveAttribute("href", "/products");
    });

    test("renders item list with accurate prices, product IDs, and calculated line totals", () => {
        render(
            <Cart
                items={mockItems}
                onUpdateQuantity={jest.fn()}
                onRemove={jest.fn()}
            />
        );

        // 1. Both item headings rendered
        expect(
            screen.getByRole("heading", {
                name: "Wireless Noise-Canceling Headphones",
                level: 3,
            })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("heading", {
                name: "Mechanical Gaming Keyboard",
                level: 3,
            })
        ).toBeInTheDocument();

        // 2. Product ID tags displayed
        expect(screen.getByText("#PRD-101")).toBeInTheDocument();
        expect(screen.getByText("#PRD-102")).toBeInTheDocument();

        // 3. Unit prices and calculated line totals formatted properly
        expect(screen.getByText("₹2499.00")).toBeInTheDocument(); // Item 1 unit price
        expect(screen.getByText("₹4998.00")).toBeInTheDocument(); // Item 1 total (2499 * 2)
        expect(screen.getAllByText("₹3999.00")).toHaveLength(2); // Item 2 unit price + line total (3999 * 1)

        // 5. Images rendered for all items
        const images = screen.getAllByRole("img");
        expect(images).toHaveLength(2);
        expect(images[0]).toHaveAttribute("alt", "Wireless Noise-Canceling Headphones");
        expect(images[1]).toHaveAttribute("alt", "Mechanical Gaming Keyboard");
    });

    test("handles user interactions: quantity update and item removal", async () => {
        const user = userEvent.setup();
        const handleUpdateQuantity = jest.fn();
        const handleRemove = jest.fn();

        render(
            <Cart
                items={mockItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemove}
            />
        );

        // 1. Increase quantity of first item (current: 2 -> next: 3)
        const plusButtons = screen.getAllByRole("button", { name: "+" });
        await user.click(plusButtons[0]);

        expect(handleUpdateQuantity).toHaveBeenCalledTimes(1);
        expect(handleUpdateQuantity).toHaveBeenCalledWith(101, 3);

        // 2. Click Remove button on second item
        const removeButtons = screen.getAllByRole("button", { name: /remove/i });
        await user.click(removeButtons[1]);

        expect(handleRemove).toHaveBeenCalledTimes(1);
        expect(handleRemove).toHaveBeenCalledWith(102);
    });
});
