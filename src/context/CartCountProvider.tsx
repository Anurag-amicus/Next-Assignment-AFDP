import { useState } from "react";
import { CartCountContext } from "./CartContext";

export function CartProvider({
    children,
    initialCount,
}: {
    children: React.ReactNode;
    initialCount: number;
}) {
    const [cartCount, setCartCount] = useState(initialCount);

    return (
        <CartCountContext.Provider value={{ cartCount, setCartCount }}>
            {children}
        </CartCountContext.Provider>
    );
}
