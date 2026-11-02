import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
    title: "Online Express | Premium Shopping Experience",
    description: "Discover quality products designed to fit your everyday needs across electronics, fashion, home, and more.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="h-full antialiased">
            <body className="min-h-full flex flex-col bg-white text-black font-sans">
                <Suspense fallback={<header className="w-full border-b border-border bg-white min-h-18" />}>
                    <Header />
                </Suspense>
                <main className="flex-1 w-full flex flex-col">{children}</main>
                <Footer />
                <Toaster position="top-right" />
            </body>
        </html>
    );
}
