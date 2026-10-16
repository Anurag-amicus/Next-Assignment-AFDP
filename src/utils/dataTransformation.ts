import type { Product, ProductResponse } from "@/types/product";

export function transformProduct(product: ProductResponse): Product {
    return {
        id: product.productId,
        name: product.name,
        category: product.categoryName,
        price: product.price,
        imageUrl: "/product-placeholder.svg",
        rating: product.rating,
        description: product.description,
        brandName: product.brandName,
    };
}

export function transformProducts(products: ProductResponse[]): Product[] {
    return products.map(transformProduct);
}
