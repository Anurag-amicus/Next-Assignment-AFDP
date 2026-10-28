import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
    title: "Sign In | Online Express",
    description: "Sign in to your Online Express account.",
};

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="w-full max-w-120 h-96 bg-white animate-pulse" />}>
            <LoginForm />
        </Suspense>
    );
}
