"use client";

import React, { useState } from "react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ArrowLeft, Settings, Menu, X, Package, ShoppingCart, Users, DollarSign } from "lucide-react";
import LogoutButton from "@/components/auth/LogoutButton";
import { usePathname } from "next/navigation";

interface NavItem {
    label: string;
    href: string;
    icon: string;
}

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    DollarSign,
    Settings
};

interface AdminSidebarProps {
    navItems: NavItem[];
}

export function AdminSidebar({ navItems }: AdminSidebarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Header */}
            <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background/95 p-4 text-foreground backdrop-blur-xl lg:hidden">
                <BrandLogo alt="Mindscape Analytics" width={140} height={32} className="h-8 w-auto object-contain" />
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={isOpen ? "Close admin sidebar" : "Open admin sidebar"}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </header>

            {/* Sidebar Overlay */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-[100] flex w-72 flex-col border-r border-border bg-background p-5 text-foreground shadow-xl transition-transform duration-300 lg:sticky lg:h-screen lg:shrink-0 lg:bg-muted/40 lg:p-6 lg:shadow-none",
                isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
                    aria-label="Close admin sidebar"
                >
                    <ArrowLeft size={20} />
                </button>

                <div className="mb-8 pr-12 lg:mb-10 lg:pr-0">
                    <BrandLogo alt="Mindscape Analytics" width={180} height={40} className="h-10 w-auto object-contain" />
                    <div className="mt-2 text-xs font-medium text-muted-foreground">
                        Central // Hub
                    </div>
                </div>

                <nav aria-label="Admin navigation" className="flex-1 space-y-1">
                    {navItems.map((item) => {
                        const Icon = ICON_MAP[item.icon] || LayoutDashboard;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                aria-current={pathname === item.href ? "page" : undefined}
                                className={cn(
                                    "group flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                    pathname === item.href
                                        ? "bg-muted text-foreground"
                                        : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                                )}
                            >
                                <Icon size={18} className="shrink-0 transition-colors group-hover:text-brand" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto space-y-1 border-t border-border pt-5">
                    <Link
                        href="/admin/settings"
                        onClick={() => setIsOpen(false)}
                        className="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <Settings size={18} />
                        <span>Settings</span>
                    </Link>
                    <LogoutButton />
                </div>
            </aside>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[90] bg-foreground/40 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
