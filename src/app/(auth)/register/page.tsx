import Link from "next/link";
import Button from "@/components/common/Button";

export const metadata = {
    title: "Register | Online Express",
    description: "Create an Online Express account.",
};

export default function RegisterPage() {
    return (
        <div className="w-full max-w-120 bg-white px-8 py-10 sm:px-12 sm:py-12 border border-border shadow-xs rounded-xs text-center">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-black uppercase tracking-wider m-0 mb-3 leading-none">
                CREATE ACCOUNT
            </h1>
            <p className="text-xs text-muted mb-6">
                Registration Page
            </p>

            <Link href="/login">
                <Button variant="primary" className="w-full h-12 uppercase tracking-wide font-display text-base font-bold flex items-center justify-center">
                    Go to Sign In
                </Button>
            </Link>
        </div>
    );
}
