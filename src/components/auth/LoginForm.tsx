"use client";

import { useState, useActionState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/common/Button";
import { loginAction } from "@/app/actions/authActions";
import type { AuthActionState } from "@/types/auth";

const initialState: AuthActionState = {
    success: false,
};

export default function LoginForm() {
    const searchParams = useSearchParams();
    const returnUrl = searchParams.get("returnUrl") || "";
    const isRegistered = searchParams.get("registered") === "true";

    const [state, formAction, isPending] = useActionState(loginAction, initialState);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full max-w-120 bg-white px-8 py-10 sm:px-12 sm:py-12 border border-border shadow-xs rounded-xs">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-black uppercase tracking-wider text-center m-0 mb-3 leading-none">
                SIGN IN
            </h1>
            <p className="text-center text-xs text-muted mb-6">
                Sign in to your Online Express account to browse top deals and track orders.
            </p>

            {isRegistered && (
                <div className="mb-5 p-3 rounded-xs bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                    Account created successfully. Please sign in below.
                </div>
            )}

            {state.error && (
                <div className="mb-5 p-3 rounded-xs bg-red-50 border border-red-200 text-xs text-red-700">
                    {state.error}
                </div>
            )}

            <form action={formAction} className="flex flex-col gap-4">
                <input type="hidden" name="returnUrl" value={returnUrl} />

                <div>
                    <label
                        htmlFor="login-email"
                        className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5"
                    >
                        Email Address
                    </label>
                    <input
                        id="login-email"
                        name="email"
                        type="email"
                        required
                        defaultValue={state.inputs?.email || ""}
                        placeholder="you@example.com"
                        className="w-full h-11 px-3.5 border border-border-input rounded-xs text-sm text-charcoal outline-none focus:border-orange focus:ring-1 focus:ring-orange"
                    />
                    {state.fieldErrors?.email && (
                        <p className="mt-1 text-xs text-red-600 m-0">{state.fieldErrors.email}</p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="login-password"
                        className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5"
                    >
                        Password
                    </label>
                    <div className="relative flex items-center">
                        <input
                            id="login-password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="Enter your password"
                            className="w-full h-11 pl-3.5 pr-10 border border-border-input rounded-xs text-sm text-charcoal outline-none focus:border-orange focus:ring-1 focus:ring-orange"
                        />
                        <button
                            type="button"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 text-muted hover:text-charcoal border-0 bg-transparent cursor-pointer p-1 flex items-center justify-center transition-colors"
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-sm" />
                        </button>
                    </div>
                    {state.fieldErrors?.password && (
                        <p className="mt-1 text-xs text-red-600 m-0">{state.fieldErrors.password}</p>
                    )}
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    disabled={isPending}
                    className="w-full h-12 mt-2 uppercase tracking-wide font-display text-base font-bold flex items-center justify-center cursor-pointer disabled:opacity-60"
                >
                    {isPending ? "Signing In..." : "Sign In"}
                </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-border text-center">
                <p className="text-xs text-muted m-0">
                    Don&apos;t have an account?{" "}
                    <Link
                        href={`/register${returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ""}`}
                        className="text-orange font-bold hover:underline"
                    >
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
}
