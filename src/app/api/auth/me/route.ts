import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const session = await getSession();
        return NextResponse.json(
            {
                user: session.user,
                isAuthenticated: session.isAuthenticated,
            },
            {
                headers: {
                    "Cache-Control": "no-store, max-age=0",
                },
            }
        );
    } catch {
        return NextResponse.json(
            { user: null, isAuthenticated: false },
            {
                status: 200,
                headers: {
                    "Cache-Control": "no-store, max-age=0",
                },
            }
        );
    }
}
