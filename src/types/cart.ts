export interface CartItem {
    cartItemId: number;
    productId: number;
    productName: string;
    quantity: number;
    price: number;
    itemSubtotal: number;
    imageUrl?: string;
}

export interface CartItemPayload {
    productId: number;
    quantity: number;
}

export interface CartActionResult {
    success: boolean;
    message?: string;
    error?: string;
    requireAuth?: boolean;
    items?: CartItem[];
    count?: number;
}
