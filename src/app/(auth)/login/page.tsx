"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Logged in with:", { email, password });
        router.push("/products");
    };

    return (
        <div className="w-full max-w-120 bg-white px-8 py-10 sm:px-12 sm:py-12 border border-border shadow-xs rounded-xs">
            {/* Title */}
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-black uppercase tracking-wider text-center m-0 mb-3 leading-none">
                SIGN IN
            </h1>
            <p className="text-center text-xs text-muted mb-6">
                Sign in to your Online Express account to browse top deals and track orders.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Email Input */}
                <div>
                    <label
                        htmlFor="login-email"
                        className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5"
                    >
                        Email Address
                    </label>
                    <input
                        id="login-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full h-11 px-3.5 border border-border-input rounded-xs text-sm text-charcoal outline-none focus:border-orange focus:ring-1 focus:ring-orange"
                    />
                </div>

                {/* Password Input */}
                <div>
                    <div className="flex justify-between items-center mb-1.5">
                        <label
                            htmlFor="login-password"
                            className="block text-xs font-bold text-charcoal uppercase tracking-wider"
                        >
                            Password
                        </label>
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-xs text-muted hover:text-orange border-0 bg-transparent cursor-pointer p-0 font-medium"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    <input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full h-11 px-3.5 border border-border-input rounded-xs text-sm text-charcoal outline-none focus:border-orange focus:ring-1 focus:ring-orange"
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="primary"
                    className="w-full h-12 mt-2 uppercase tracking-wide font-display text-base font-bold flex items-center justify-center"
                >
                    Sign In
                </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-border text-center">
                <p className="text-xs text-muted m-0">
                    Don&apos;t have an account?{" "}
                    <Link href="/products" className="text-orange font-bold hover:underline">
                        Explore Catalog
                    </Link>
                </p>
            </div>
        </div>
    );
}
