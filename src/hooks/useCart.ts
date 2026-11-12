"use client";

import { useContext } from "react";
import { CartCountContext } from "@/context/CartContext";

export function useCart() {
    const context = useContext(CartCountContext);
    if (!context) {
        return {
            cartCount: 0,
            setCartCount: () => {},
        };
    }
    return context;
}
