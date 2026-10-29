"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import type { User } from "@/types/auth";

interface HeaderUserMenuProps {
    user: User | null;
    onLogout: () => void;
}

export default function HeaderUserMenu({ user, onLogout }: HeaderUserMenuProps) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    if (!user) {
        return (
            <Link
                href="/login"
                id="header-sign-in-link"
                className="group flex items-center gap-1.75 whitespace-nowrap text-sm font-semibold leading-none text-muted no-underline transition-colors duration-200 hover:text-orange"
            >
                <span>Sign In</span>
                <FontAwesomeIcon
                    icon={faRightToBracket}
                    className="text-sm text-muted transition-colors duration-200 group-hover:text-orange"
                />
            </Link>
        );
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                id="header-profile-button"
                aria-expanded={open}
                aria-haspopup="true"
                aria-label="User account menu"
                onClick={() => setOpen((prev) => !prev)}
                className="group flex items-center gap-2 cursor-pointer border-0 bg-transparent p-0 transition-colors"
            >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange/15 border border-orange/40 text-orange font-bold font-display text-sm shadow-xs transition-transform duration-200 group-hover:scale-105">
                    {user.name ? user.name.charAt(0).toUpperCase() : "👤"}
                </div>
                <span className="text-xs font-semibold text-charcoal group-hover:text-orange max-[900px]:hidden">
                    {user.name ? user.name.split(" ")[0] : "Account"}
                </span>
                <span className="text-[10px] text-muted transition-transform duration-200 group-hover:text-orange">
                    {open ? "▲" : "▼"}
                </span>
            </button>

            {open && (
                <div
                    id="header-profile-dropdown"
                    className="absolute right-0 top-full mt-2 w-52 rounded-md border border-border bg-white py-2 shadow-lg z-50"
                >
                    <div className="px-3.5 py-2 border-b border-border">
                        <p className="text-xs font-bold text-charcoal m-0 truncate">
                            {user.name || "Customer"}
                        </p>
                        <p className="text-[11px] text-muted m-0 mt-0.5 truncate uppercase tracking-wider">
                            {user.role ? `Role: ${user.role}` : "Active Session"}
                        </p>
                    </div>

                    <div className="py-1">
                        <Link
                            href="/dashboard"
                            onClick={() => setOpen(false)}
                            className="flex items-center px-3.5 py-1.5 text-xs text-charcoal hover:bg-orange/10 hover:text-orange no-underline transition-colors"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/orders"
                            onClick={() => setOpen(false)}
                            className="flex items-center px-3.5 py-1.5 text-xs text-charcoal hover:bg-orange/10 hover:text-orange no-underline transition-colors"
                        >
                            My Orders
                        </Link>
                    </div>

                    <div className="border-t border-border pt-1">
                        <button
                            type="button"
                            id="header-logout-button"
                            onClick={() => {
                                setOpen(false);
                                onLogout();
                            }}
                            className="flex w-full items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 border-0 bg-transparent cursor-pointer transition-colors text-left"
                        >
                            <FontAwesomeIcon icon={faRightFromBracket} className="text-xs" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
