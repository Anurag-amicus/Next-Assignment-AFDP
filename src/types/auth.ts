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
