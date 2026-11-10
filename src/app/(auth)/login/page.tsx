import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to your Online Express account to manage your profile, orders, and cart.",
};

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="w-full max-w-120 h-96 bg-white animate-pulse" />}>
            <LoginForm />
        </Suspense>
    );
}
