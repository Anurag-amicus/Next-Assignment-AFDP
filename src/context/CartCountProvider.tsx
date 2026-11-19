"use client";

import { useState, useEffect } from "react";
import { CartCountContext } from "./CartContext";
import { getHeaderStateAction } from "@/app/actions/authActions";
import type { User } from "@/types/auth";

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartCount, setCartCount] = useState(0);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function initSession() {
            try {
                const headerState = await getHeaderStateAction();
                if (isMounted) {
                    setUser(headerState.user);
                    setCartCount(headerState.cartCount);
                }
            } catch (err) {
                console.error("CartProvider: Error initializing session state:", err);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        initSession();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <CartCountContext.Provider value={{ cartCount, setCartCount, user, setUser, isLoading }}>
            {children}
        </CartCountContext.Provider>
    );
}
