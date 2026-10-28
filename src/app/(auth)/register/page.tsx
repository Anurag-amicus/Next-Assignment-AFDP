import { Suspense } from "react";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
    title: "Create Account | Online Express",
    description: "Sign up for Online Express to browse products, track orders, and checkout seamlessly.",
};

export default function RegisterPage() {
    return (
        <Suspense fallback={<div className="w-full max-w-120 h-96 bg-white animate-pulse" />}>
            <RegisterForm />
        </Suspense>
    );
}
