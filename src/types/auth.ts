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

export type User = Pick<AuthResponse, "customerId" | "name" | "role"> & {
    email: string;
};

export interface SessionData {
    accessToken: string | null;
    isAuthenticated: boolean;
}

export interface AuthActionState {
    success: boolean;
    error?: string | null;
    fieldErrors?: Record<string, string>;
    inputs?: Record<string, string>;
    user?: User;
    cartCount?: number;
    returnUrl?: string;
}


export interface AuthRequest {
    token: string,
    options?: RequestInit;
}

export const defaultUser: User = {
    customerId:  1,
    name: "John Doe",
    role: "Customer",
    email: "john.doe@example.com",
};