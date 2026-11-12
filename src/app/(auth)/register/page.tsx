import { Suspense } from "react";
import RegisterForm from "@/components/auth/RegisterForm";
import AuthFormSkeleton from "@/components/auth/AuthFormSkeleton";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Account",
    description: "Sign up for Online Express to browse products, track orders, and checkout seamlessly.",
};

export default function RegisterPage() {
    return (
        <Suspense fallback={<AuthFormSkeleton isRegister />}>
            <RegisterForm />
        </Suspense>
    );
}
