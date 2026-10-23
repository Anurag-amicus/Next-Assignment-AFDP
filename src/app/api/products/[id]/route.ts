import { NextRequest, NextResponse } from "next/server";
import { productApiService } from "@/services/productApiServices";
import {
    transformProduct,
    validateAndTransformUpdatePayload,
} from "@/utils/dataTransformation";

interface RouteContext {
    params: Promise<{ id: string }>;
}

/**
 * GET /api/products/[id]
 * Forwards request to .NET get-by-id endpoint.
 * Returns product in React shape or 404 if not found.
 */
export async function GET(
    _request: NextRequest,
    context: RouteContext
) {
    try {
        const { id } = await context.params;

        if (!id || isNaN(Number(id))) {
            return NextResponse.json(
                { error: "Invalid product ID. ID must be a numeric value." },
                { status: 400 }
            );
        }

        const result = await productApiService.getProductById(id, { cache: "no-store" });

        if (!result.success) {
            const status = result.status === 404 ? 404 : result.status ?? 502;
            return NextResponse.json(
                { error: result.error || "Product not found." },
                { status }
            );
        }

        const product = transformProduct(result.data);

        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "An unexpected error occurred while fetching product.",
            },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/products/[id]
 * Validates update payload, converts to .NET DTO shape, and forwards to .NET update endpoint.
 */
export async function PUT(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { id } = await context.params;

        if (!id || isNaN(Number(id))) {
            return NextResponse.json(
                { error: "Invalid product ID. ID must be a numeric value." },
                { status: 400 }
            );
        }

        const body = await request.json().catch(() => null);

        if (!body) {
            return NextResponse.json(
                { error: "Invalid JSON in request body." },
                { status: 400 }
            );
        }

        const validation = validateAndTransformUpdatePayload(body);
        if (!validation.isValid || !validation.data) {
            return NextResponse.json(
                { error: validation.error || "Invalid product update input." },
                { status: 400 }
            );
        }

        const result = await productApiService.updateProduct(id, validation.data);

        if (!result.success) {
            const status = result.status === 404 ? 404 : result.status ?? 502;
            return NextResponse.json(
                { error: result.error || "Failed to update product in upstream service." },
                { status }
            );
        }

        const updatedProduct = transformProduct(result.data);

        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "An unexpected error occurred while updating product.",
            },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/products/[id]
 * Forwards delete request to upstream .NET API.
 */
export async function DELETE(
    _request: NextRequest,
    context: RouteContext
) {
    try {
        const { id } = await context.params;

        if (!id || isNaN(Number(id))) {
            return NextResponse.json(
                { error: "Invalid product ID. ID must be a numeric value." },
                { status: 400 }
            );
        }

        const result = await productApiService.deleteProduct(id);

        if (!result.success) {
            const status = result.status === 404 ? 404 : result.status ?? 502;
            return NextResponse.json(
                { error: result.error || "Failed to delete product in upstream service." },
                { status }
            );
        }

        return NextResponse.json(
            { message: "Product deleted successfully." },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "An unexpected error occurred while deleting product.",
            },
            { status: 500 }
        );
    }
}
