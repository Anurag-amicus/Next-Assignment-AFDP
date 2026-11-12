import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";
import AuthFormSkeleton from "@/components/auth/AuthFormSkeleton";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to your Online Express account to manage your profile, orders, and cart.",
};

export default function LoginPage() {
    return (
        <Suspense fallback={<AuthFormSkeleton />}>
            <LoginForm />
        </Suspense>
    );
}
