"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ArrowLeft, Settings, Menu, X, Package, ShoppingCart, Users, DollarSign } from "lucide-react";
import LogoutButton from "@/components/auth/LogoutButton";

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

    return (
        <>
            {/* Mobile Header */}
            <header className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-black/40 backdrop-blur-xl sticky top-0 z-50">
                <Image
                    src="/images/logo/mindscape-analytics.png"
                    alt="Mindscape Analytics"
                    width={140}
                    height={32}
                    className="h-8 w-auto object-contain brightness-0 invert contrast-125 opacity-90"
                />
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-xl bg-foreground/5 border border-border"
                    aria-label={isOpen ? "Close admin sidebar" : "Open admin sidebar"}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </header>

            {/* Sidebar Overlay */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-[100] w-72 border-r border-border p-8 flex flex-col backdrop-blur-2xl bg-black/90 lg:bg-foreground/[0.02] lg:sticky lg:h-screen transition-transform duration-500",
                isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                <button
                    onClick={() => setIsOpen(false)}
                    className="lg:hidden absolute top-8 right-8 text-foreground/40 hover:text-foreground"
                    aria-label="Close admin sidebar"
                >
                    <ArrowLeft size={20} />
                </button>

                <div className="mb-12">
                    <Image
                        src="/images/logo/mindscape-analytics.png"
                        alt="Mindscape Analytics"
                        width={180}
                        height={40}
                        className="h-10 w-auto object-contain brightness-0 invert contrast-125 opacity-90"
                    />
                    <div className="mt-2 text-[8px] font-mono text-foreground/20 uppercase tracking-[0.5em]">
                        Central // Hub
                    </div>
                </div>

                <nav className="space-y-2 flex-1">
                    {navItems.map((item) => {
                        const Icon = ICON_MAP[item.icon] || LayoutDashboard;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-all group"
                            >
                                <Icon size={20} className="group-hover:text-blue-400 transition-colors" />
                                <span className="font-bold text-sm tracking-wide uppercase">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="pt-8 border-t border-border space-y-2 mt-auto">
                    <Link
                        href="/admin/settings"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-all"
                    >
                        <Settings size={20} />
                        <span className="font-bold text-sm uppercase">Settings</span>
                    </Link>
                    <LogoutButton />
                </div>
            </aside>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
