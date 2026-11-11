/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";
import { GET as getProductsList } from "@/app/api/products/route";
import { GET as getProductById } from "@/app/api/products/[id]/route";
import { productApiService } from "@/services/productApiServices";

jest.mock("@/services/productApiServices", () => ({
    productApiService: {
        getProducts: jest.fn(),
        getProductById: jest.fn(),
    },
}));

describe("Product Route Handlers", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/products", () => {
        test("delegates query parameters to service and returns 200 with transformed response", async () => {
            const mockBackendProducts = [
                {
                    productId: 101,
                    name: "Pro Mechanical Keyboard",
                    categoryName: "Electronics",
                    brandName: "Keychron",
                    price: 4999,
                    imageUrl: "https://example.com/keyboard.jpg",
                    rating: 4.8,
                },
            ];

            (productApiService.getProducts as jest.Mock).mockResolvedValue({
                success: true,
                data: {
                    products: mockBackendProducts,
                    page: 1,
                    pageSize: 10,
                    totalRecords: 1,
                    totalPages: 1,
                },
            });

            const request = new NextRequest(
                "http://localhost:3000/api/products?page=1&pageSize=10&search=Keyboard"
            );

            const response = await getProductsList(request);
            expect(response.status).toBe(200);

            const data = await response.json();
            expect(data.page).toBe(1);
            expect(data.pageSize).toBe(10);
            expect(data.totalRecords).toBe(1);
            expect(data.products).toHaveLength(1);

            // Verify transformed React shape
            expect(data.products[0]).toEqual(
                expect.objectContaining({
                    id: 101,
                    name: "Pro Mechanical Keyboard",
                    price: 4999,
                    category: "Electronics",
                })
            );

            // Verify upstream service call arguments
            expect(productApiService.getProducts).toHaveBeenCalledWith(
                expect.objectContaining({
                    Page: 1,
                    PageSize: 10,
                    Search: "Keyboard",
                }),
                { cache: "no-store" }
            );
        });

        test("returns 400 Bad Request when page query parameter is invalid", async () => {
            const request = new NextRequest(
                "http://localhost:3000/api/products?page=0&pageSize=10"
            );

            const response = await getProductsList(request);
            expect(response.status).toBe(400);

            const data = await response.json();
            expect(data.error).toBe("Page parameter must be a positive integer.");
            expect(productApiService.getProducts).not.toHaveBeenCalled();
        });
    });

    describe("GET /api/products/[id]", () => {
        const dummyRequest = new NextRequest("http://localhost:3000/api/products/1");

        test("returns 400 Bad Request for non-numeric product ID", async () => {
            const response = await getProductById(dummyRequest, {
                params: Promise.resolve({ id: "abc" }),
            });

            expect(response.status).toBe(400);
            const data = await response.json();
            expect(data.error).toBe("Invalid product ID. ID must be a numeric value.");
            expect(productApiService.getProductById).not.toHaveBeenCalled();
        });

        test("returns 404 when product is not found upstream", async () => {
            (productApiService.getProductById as jest.Mock).mockResolvedValue({
                success: false,
                status: 404,
                error: "Product not found.",
            });

            const response = await getProductById(dummyRequest, {
                params: Promise.resolve({ id: "99999" }),
            });

            expect(response.status).toBe(404);
            const data = await response.json();
            expect(data.error).toBe("Product not found.");
            expect(productApiService.getProductById).toHaveBeenCalledWith(
                "99999",
                { cache: "no-store" }
            );
        });
    });
});
