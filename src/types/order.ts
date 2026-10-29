export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

export interface BackendOrderItem {
    orderItemId: number;
    productId: number;
    productName: string;
    quantity: number;
    price: number;
    itemSubtotal: number;
    imageUrl?: string;
}

export interface BackendOrderShipping {
    shippingName?: string;
    shippingAddress?: string;
    shippingCity?: string;
    shippingState?: string;
    shippingPostalCode?: string;
    shippingMethod?: string;
    shippingCharge?: number;
}

export interface BackendOrderPayment {
    paymentId?: number;
    orderId?: number;
    paymentStatus?: string;
    paymentMethod?: string;
    amount?: number;
    transactionReference?: string;
    createdAt?: string;
}

export interface BackendOrderDetail {
    orderId: number;
    customerId?: number;
    subtotal?: number;
    shippingCharge?: number;
    tax?: number;
    totalAmount: number;
    orderStatus?: string;
    createdAt: string;
    items?: BackendOrderItem[];
    shipping?: BackendOrderShipping;
    payment?: BackendOrderPayment;
}

export interface OrderHistoryResponse {
    orders: BackendOrderDetail[];
    totalRecords?: number;
    totalPages?: number;
    page?: number;
    pageSize?: number;
}
