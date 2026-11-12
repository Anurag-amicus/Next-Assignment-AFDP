"use client";

import { useState } from "react";
import { CartCountContext } from "./CartContext";

export function CartProvider({
    children,
    initialCount = 0,
}: {
    children: React.ReactNode;
    initialCount?: number;
}) {
    const [cartCount, setCartCount] = useState(initialCount);
    const [prevInitialCount, setPrevInitialCount] = useState(initialCount);

    if (initialCount !== prevInitialCount) {
        setPrevInitialCount(initialCount);
        setCartCount(initialCount);
    }

    return (
        <CartCountContext.Provider value={{ cartCount, setCartCount }}>
            {children}
        </CartCountContext.Provider>
    );
}
