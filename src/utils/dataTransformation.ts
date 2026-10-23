import type {
    Product,
    ProductResponse,
    ProductCreateInput,
    ProductUpdateInput,
} from "@/types/product";

/**
 * Transforms upstream .NET ProductResponse into React app Product shape:
 * (id, name, price, category, image, rating)
 */
export function transformProduct(product: ProductResponse): Product {
    const placeholder = "/product-placeholder.svg";
    return {
        id: product.productId,
        name: product.name,
        category: product.categoryName,
        price: product.price,
        imageUrl: placeholder,
        image: placeholder,
        rating: product.rating,
        description: product.description,
        brandName: product.brandName,
    };
}

/**
 * Transforms an array of upstream ProductResponse objects into React app Product shapes
 */
export function transformProducts(products: ProductResponse[]): Product[] {
    return (products || []).map(transformProduct);
}

export interface ValidationResult<T> {
    isValid: boolean;
    error?: string;
    data?: T;
}

/**
 * Validates incoming request body for product creation and converts to .NET ProductCreateInput
 */
export function validateAndTransformCreatePayload(
    body: unknown
): ValidationResult<ProductCreateInput> {
    if (!body || typeof body !== "object") {
        return { isValid: false, error: "Request body must be a valid JSON object." };
    }

    const record = body as Record<string, unknown>;

    // 1. Name validation
    if (typeof record.name !== "string" || !record.name.trim()) {
        return { isValid: false, error: "Product name is required and cannot be empty." };
    }

    // 2. Price validation
    if (record.price === undefined || record.price === null) {
        return { isValid: false, error: "Product price is required." };
    }
    const priceNum = Number(record.price);
    if (isNaN(priceNum) || priceNum < 0) {
        return { isValid: false, error: "Price must be a valid non-negative number." };
    }

    // 3. Category ID validation
    if (record.categoryId === undefined || record.categoryId === null) {
        return { isValid: false, error: "Product categoryId is required." };
    }
    const categoryIdNum = Number(record.categoryId);
    if (isNaN(categoryIdNum) || categoryIdNum <= 0) {
        return { isValid: false, error: "A valid positive categoryId is required." };
    }

    const payload: ProductCreateInput = {
        name: record.name.trim(),
        price: priceNum,
        categoryId: categoryIdNum,
    };

    if (record.description && typeof record.description === "string") {
        payload.description = record.description.trim();
    }

    if (record.brandId !== undefined && record.brandId !== null) {
        const brandIdNum = Number(record.brandId);
        if (!isNaN(brandIdNum) && brandIdNum > 0) {
            payload.brandId = brandIdNum;
        }
    }

    if (record.rating !== undefined && record.rating !== null) {
        const ratingNum = Number(record.rating);
        if (!isNaN(ratingNum) && ratingNum >= 0 && ratingNum <= 5) {
            payload.rating = ratingNum;
        }
    }

    return { isValid: true, data: payload };
}

/**
 * Validates incoming request body for product update and converts to .NET ProductUpdateInput
 */
export function validateAndTransformUpdatePayload(
    body: unknown
): ValidationResult<ProductUpdateInput> {
    if (!body || typeof body !== "object") {
        return { isValid: false, error: "Request body must be a valid JSON object." };
    }

    const record = body as Record<string, unknown>;
    const payload: ProductUpdateInput = {};

    if (record.name !== undefined) {
        if (typeof record.name !== "string" || !record.name.trim()) {
            return { isValid: false, error: "Product name cannot be empty." };
        }
        payload.name = record.name.trim();
    }

    if (record.price !== undefined) {
        const priceNum = Number(record.price);
        if (isNaN(priceNum) || priceNum < 0) {
            return { isValid: false, error: "Price must be a valid non-negative number." };
        }
        payload.price = priceNum;
    }

    if (record.categoryId !== undefined) {
        const categoryIdNum = Number(record.categoryId);
        if (isNaN(categoryIdNum) || categoryIdNum <= 0) {
            return { isValid: false, error: "CategoryId must be a positive number." };
        }
        payload.categoryId = categoryIdNum;
    }

    if (record.description !== undefined && typeof record.description === "string") {
        payload.description = record.description.trim();
    }

    if (record.brandId !== undefined && record.brandId !== null) {
        const brandIdNum = Number(record.brandId);
        if (!isNaN(brandIdNum) && brandIdNum > 0) {
            payload.brandId = brandIdNum;
        }
    }

    if (record.rating !== undefined && record.rating !== null) {
        const ratingNum = Number(record.rating);
        if (!isNaN(ratingNum) && ratingNum >= 0 && ratingNum <= 5) {
            payload.rating = ratingNum;
        }
    }

    if (Object.keys(payload).length === 0) {
        return { isValid: false, error: "At least one field must be provided to update." };
    }

    return { isValid: true, data: payload };
}
