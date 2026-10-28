/**
 * Authentication and Session Types
 * Assignment 7 & 8: Auth Flow & Proxy
 * Following exact React convention
 */

export interface Login {
    email: string;
    password: string;
}

export interface Register {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    refreshToken: string;
    customerId: number;
    name: string;
    role: string;
}

export interface RefreshToken {
    refreshToken: string;
}

// ─── User Model Types ───

export type User = Pick<AuthResponse, "customerId" | "name" | "role"> & {
    email: string;
};

export type AuthUser = User;

export interface SessionData {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
}

export interface AuthActionState {
    success: boolean;
    error?: string | null;
    fieldErrors?: Record<string, string>;
    inputs?: Record<string, string>;
}
