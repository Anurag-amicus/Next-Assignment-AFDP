import { authApiService } from "@/services/authApiService";
import {
    getSession,
    getRefreshToken,
    updateSessionTokens,
    deleteSession,
} from "@/lib/session";

export async function getValidAccessToken(): Promise<string | null> {
    const session = await getSession();

    if (session.accessToken) {
        return session.accessToken;
    }

    const refreshToken = await getRefreshToken();
    if (refreshToken) {
        const refreshResult = await authApiService.refreshToken({ refreshToken });
        if (refreshResult.success && refreshResult.data) {
            await updateSessionTokens(
                refreshResult.data.token,
                refreshResult.data.refreshToken
            );
            return refreshResult.data.token;
        }
    }

    await deleteSession();
    return null;
}
