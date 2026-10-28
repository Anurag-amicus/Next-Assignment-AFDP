"use server";

import { redirect } from "next/navigation";
import { authApiService } from "@/services/authApiService";
import { createSession, deleteSession, getSession } from "@/lib/session";
import type { User, AuthActionState } from "@/types/auth";

function getFormString(formData: FormData, key: string): string {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
}

function sanitizeReturnUrl(returnUrl?: string | null): string {
    if (returnUrl && returnUrl.startsWith("/") && !returnUrl.startsWith("//") && !returnUrl.includes("\\")) {
        return returnUrl;
    }
    return "/";
}


export async function loginAction(
    _prevState: AuthActionState,
    formData: FormData
): Promise<AuthActionState> {
    const email = getFormString(formData, "email").trim();
    const password = getFormString(formData, "password");
    const rawReturnUrl = getFormString(formData, "returnUrl");
    const targetUrl = sanitizeReturnUrl(rawReturnUrl);

    const fieldErrors: Record<string, string> = {};

    if (!email) {
        fieldErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        fieldErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
        fieldErrors.password = "Password is required.";
    }

    if (Object.keys(fieldErrors).length > 0) {
        return {
            success: false,
            fieldErrors,
            inputs: { email },
        };
    }

    try {
        const result = await authApiService.login({ email, password });

        if (!result.success) {
            return {
                success: false,
                error: result.error || "Invalid credentials. Please try again.",
                inputs: { email },
            };
        }

        const user: User = {
            customerId: result.data.customerId,
            name: result.data.name || email.split("@")[0],
            role: result.data.role || "Customer",
            email: email.toLowerCase(),
        };

        await createSession(result.data.token, result.data.refreshToken, user);
    } catch {
        return {
            success: false,
            error: "Unable to complete login. Please try again.",
            inputs: { email },
        };
    }

    redirect(targetUrl);
}

export async function registerAction(
    _prevState: AuthActionState,
    formData: FormData
): Promise<AuthActionState> {
    const name = getFormString(formData, "name").trim();
    const email = getFormString(formData, "email").trim().toLowerCase();
    const password = getFormString(formData, "password");
    const confirmPassword = getFormString(formData, "confirmPassword");

    const fieldErrors: Record<string, string> = {};

    if (name.length < 2) {
        fieldErrors.name = "Full name must be at least 2 characters.";
    }

    if (!email) {
        fieldErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        fieldErrors.email = "Please enter a valid email address.";
    }

    if (password.length < 8) {
        fieldErrors.password = "Password must be at least 8 characters.";
    }

    if (password !== confirmPassword) {
        fieldErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(fieldErrors).length > 0) {
        return {
            success: false,
            fieldErrors,
            inputs: { name, email },
        };
    }

    try {
        const result = await authApiService.register({ name, email, password });

        if (!result.success) {
            return {
                success: false,
                error: result.error || "Registration failed. Please try again.",
                inputs: { name, email },
            };
        }
    } catch {
        return {
            success: false,
            error: "Unable to complete registration. Please try again.",
            inputs: { name, email },
        };
    }

    redirect("/login?registered=true");
}

export async function logoutAction(): Promise<void> {
    try {
        const session = await getSession();
        if (session.accessToken) {
            await authApiService.logout(session.accessToken).catch(() => {});
        }
    } finally {
        await deleteSession();
    }

    redirect("/login");
}
