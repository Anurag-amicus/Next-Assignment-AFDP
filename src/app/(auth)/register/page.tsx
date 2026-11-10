import { Suspense } from "react";
import RegisterForm from "@/components/auth/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Account",
    description: "Sign up for Online Express to browse products, track orders, and checkout seamlessly.",
};

export default function RegisterPage() {
    return (
        <Suspense fallback={<div className="w-full max-w-120 h-96 bg-white animate-pulse" />}>
            <RegisterForm />
        </Suspense>
    );
}
