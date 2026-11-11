import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "@/components/products/ProductCard";
import { addToCartAction } from "@/app/actions/cartActions";
import defaultImage from "@/assets/product-placeholder.svg";
import toast from "react-hot-toast";

jest.mock("@/app/actions/cartActions", () => ({
    addToCartAction: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
    __esModule: true,
    default: Object.assign(jest.fn(), {
        success: jest.fn(),
        error: jest.fn(),
    }),
}));

describe("ProductCard Component", () => {
    const mockProduct = {
        id: 101,
        name: "Pro Mechanical Keyboard",
        category: "Electronics",
        price: 4999,
        imageUrl: "https://example.com/keyboard.jpg",
        rating: 4.5,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders product name, formatted price, rating, category, and image with accessible queries", () => {
        render(<ProductCard {...mockProduct} />);

        // 1. Product title rendered as an accessible heading
        const heading = screen.getByRole("heading", {
            name: "Pro Mechanical Keyboard",
            level: 2,
        });
        expect(heading).toBeInTheDocument();

        // 2. Unit price formatted as Indian currency
        expect(screen.getByText("₹4,999")).toBeInTheDocument();

        // 3. Category & Rating rendered
        expect(screen.getByText("Electronics")).toBeInTheDocument();
        expect(screen.getByText("4.5")).toBeInTheDocument();

        // 4. Image rendered with accessible name and source attribute
        const image = screen.getByRole("img", {
            name: "Pro Mechanical Keyboard",
        });
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", "https://example.com/keyboard.jpg");

        // 5. Product detail navigation link
        const detailLink = screen.getByRole("link", {
            name: /view details for pro mechanical keyboard/i,
        });
        expect(detailLink).toHaveAttribute("href", "/products/101");
    });

    test("updates quantity and dynamically recalculates total price on user interaction", async () => {
        const user = userEvent.setup();
        render(<ProductCard {...mockProduct} />);

        // Initial total is 1 * 4999
        expect(screen.getByText("Total: ₹4,999")).toBeInTheDocument();

        // Find quantity increment button (+) and click
        const increaseButton = screen.getByRole("button", { name: "+" });
        await user.click(increaseButton);

        // Quantity input should now reflect 2
        const quantityInput = screen.getByLabelText("Product quantity");
        expect(quantityInput).toHaveValue("2");

        // Live total price must dynamically update to 2 * 4999 = 9998
        expect(screen.getByText("Total: ₹9,998")).toBeInTheDocument();
    });

    test("fires addToCartAction with updated quantity when 'ADD TO CART' is clicked and handles response", async () => {
        const user = userEvent.setup();
        (addToCartAction as jest.Mock).mockResolvedValue({
            success: true,
            message: "Added 2 item(s) to cart!",
        });

        render(<ProductCard {...mockProduct} />);

        // Increment quantity to 2
        const increaseButton = screen.getByRole("button", { name: "+" });
        await user.click(increaseButton);

        // Click ADD TO CART
        const addButton = screen.getByRole("button", { name: /add to cart/i });
        await user.click(addButton);

        // Verify addToCartAction was called with product ID and updated quantity (2)
        expect(addToCartAction).toHaveBeenCalledTimes(1);
        expect(addToCartAction).toHaveBeenCalledWith({
            productId: 101,
            quantity: 2,
        });

        // Verify success toast notification
        expect(toast.success).toHaveBeenCalledWith("Added 2 item(s) to cart!");
    });

    test("handles missing image with fallback placeholder default", () => {
        const productWithoutImage = {
            id: 102,
            name: "Generic USB Cable",
            category: "Accessories",
            price: 299,
            imageUrl: "",
            rating: 4.0,
        };

        render(<ProductCard {...productWithoutImage} />);

        // Name and price still render properly
        expect(screen.getByRole("heading", { name: "Generic USB Cable", level: 2 })).toBeInTheDocument();
        expect(screen.getByText("₹299")).toBeInTheDocument();

        // Image falls back to default placeholder asset
        const fallbackImage = screen.getByRole("img", { name: "Generic USB Cable" });
        expect(fallbackImage).toBeInTheDocument();
        const expectedSrc = typeof defaultImage === "object" ? defaultImage.src : defaultImage;
        expect(fallbackImage).toHaveAttribute("src", expectedSrc);
    });
});

