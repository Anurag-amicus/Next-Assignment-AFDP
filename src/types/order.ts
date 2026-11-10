export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

export type OrderFilterTab = "All Orders" | OrderStatus;

export interface OrderItem {
    orderItemId: number;
    productId: number;
    productName: string;
    quantity: number;
    price: number;
    itemSubtotal: number;
    imageUrl?: string;
}

export interface OrderShippingAddress {
    fullName?: string;
    streetAddress: string;
    aptSuite?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}
export interface OrderPayment {
    paymentId?: number;
    orderId?: number;
    paymentStatus?: string;
    paymentMethod?: string;
    amount?: number;
    transactionReference?: string;
    createdAt?: string;
}

export interface OrderDetail {
    orderId: number;
    customerId?: number;
    subtotal?: number;
    shippingCharge?: number;
    tax?: number;
    totalAmount: number;
    orderStatus?: string;
    createdAt: string;
    items?: OrderItem[];
    shipping?: OrderShippingAddress;
    payment?: OrderPayment;
}

export interface OrderHistoryResponse {
    orders: OrderDetail[];
    totalRecords?: number;
    totalPages?: number;
    page?: number;
    pageSize?: number;
}
