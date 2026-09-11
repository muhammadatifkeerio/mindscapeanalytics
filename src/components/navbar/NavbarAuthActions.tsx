"use client";

import { memo } from "react";
import {
    ArrowRight,
    ChevronDown,
    User,
    LogOut,
    Settings,
    ShieldCheck,
    Zap,
    Rocket,
    BarChart3,
    Package,
} from "lucide-react";
import type { Session } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { NavLinkItem } from "@/components/navbar/NavLinkItem";
import { NavbarDropdown } from "@/components/navbar/NavbarDropdown";
import {
    authCtaClass,
    authLoginClass,
    profileLinkClass,
    profileSectionClass,
} from "@/components/navbar/typography";
import { navLinkTransition, navFocusRing } from "@/components/navbar/motion";

const initializeButtonClass = cn(
    navFocusRing,
    authCtaClass,
    "px-7 py-2.5 rounded-full",
    "bg-foreground text-background border border-foreground",
    "hover:bg-transparent hover:text-foreground",
    "hover:shadow-[0_0_24px_hsl(var(--foreground)/0.12)]",
    "transition-[color,background-color,box-shadow,transform] duration-150 active:scale-95",
    "flex items-center gap-3 group/init not-italic"
);

interface NavbarAuthBaseProps {
    session: Session | null;
    isAdmin: boolean;
    isRegisteredSeller: boolean;
    onSignOut: () => void;
    /** Homepage first viewport: demote Sign up until scroll. */
    quietPrimary?: boolean;
}

interface NavbarAuthDesktopProps extends NavbarAuthBaseProps {
    variant: "desktop";
    activeDropdown: string | null;
    onMouseEnter: (name: string) => void;
    onMouseLeave: () => void;
}

interface NavbarAuthMobileProps extends NavbarAuthBaseProps {
    variant: "mobile";
    onNavigate?: () => void;
}

type NavbarAuthActionsProps = NavbarAuthDesktopProps | NavbarAuthMobileProps;

export const NavbarAuthActions = memo(function NavbarAuthActions(props: NavbarAuthActionsProps) {
    const { session, isAdmin, isRegisteredSeller, onSignOut, variant, quietPrimary = false } = props;

    if (variant === "desktop") {
        const { activeDropdown, onMouseEnter, onMouseLeave } = props;

        if (session) {
            return (
                <div
                    className="relative group/profile hidden sm:block"
                    onMouseEnter={() => onMouseEnter("profile")}
                    onMouseLeave={onMouseLeave}
                >
                    <button
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded={activeDropdown === "profile"}
                        className="flex items-center gap-3 px-4 py-2 bg-foreground/5 border border-border rounded-full hover:bg-foreground/10 hover:border-foreground/20 transition-[background-color,border-color,transform] duration-150 active:scale-95 shadow-lg"
                    >
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-600 flex items-center justify-center text-xs font-semibold text-foreground/90 uppercase border border-foreground/20">
                            {session.user.name?.charAt(0) || "U"}
                        </div>
                        <span className="hidden sm:inline text-[13px] font-medium text-foreground/70 group-hover/profile:text-foreground tracking-normal normal-case transition-colors">
                            {session.user.name?.split(" ")[0]}
                        </span>
                        {isAdmin ? (
                            <ShieldCheck className="w-4 h-4 text-emerald-400/70" />
                        ) : isRegisteredSeller ? (
                            <Zap className="w-4 h-4 text-amber-400/70" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-foreground/70" />
                        )}
                    </button>

                    <NavbarDropdown
                        isOpen={activeDropdown === "profile"}
                        align="right"
                        header={
                            <div className="px-6 py-4 border-b border-border/50 mb-3 hover:bg-foreground/[0.02] transition-colors cursor-default">
                                <p
                                    className={cn(
                                        profileSectionClass,
                                        "text-secondary dark:text-foreground/60 mb-1.5 flex items-center gap-2"
                                    )}
                                >
                                    <User size={12} /> Authenticated Access
                                </p>
                                <p className="text-sm font-semibold text-foreground truncate">{session.user.name}</p>
                                <p className="text-xs font-medium text-foreground/60 truncate mt-1">
                                    {session.user.email}
                                </p>
                            </div>
                        }
                    >
                        {isAdmin && (
                            <div className="pb-2">
                                <p
                                    className={cn(
                                        "px-6 py-2 text-emerald-400/80 flex items-center gap-3",
                                        profileSectionClass
                                    )}
                                >
                                    <ShieldCheck size={12} /> Controller HUD
                                </p>
                                <NavLinkItem
                                    href="/admin"
                                    className={cn(
                                        profileLinkClass,
                                        navLinkTransition,
                                        "flex items-center gap-3 px-6 py-3 text-foreground/80 hover:text-foreground hover:bg-emerald-400/5"
                                    )}
                                >
                                    Master Dashboard
                                </NavLinkItem>
                            </div>
                        )}

                        {isRegisteredSeller ? (
                            <div className="pb-2 border-t border-border pt-2">
                                <p
                                    className={cn(
                                        "px-6 py-2 text-amber-400/80 flex items-center gap-3",
                                        profileSectionClass
                                    )}
                                >
                                    <BarChart3 size={12} /> Builder Operations
                                </p>
                                <NavLinkItem
                                    href="/seller"
                                    className={cn(
                                        profileLinkClass,
                                        navLinkTransition,
                                        "flex items-center gap-3 px-6 py-3 text-foreground/80 hover:text-foreground hover:bg-amber-400/5"
                                    )}
                                >
                                    Seller Dashboard
                                </NavLinkItem>
                                <NavLinkItem
                                    href="/seller/products"
                                    className={cn(
                                        profileLinkClass,
                                        navLinkTransition,
                                        "flex items-center gap-3 px-6 py-3 text-foreground/80 hover:text-foreground hover:bg-amber-400/5"
                                    )}
                                >
                                    Inventory Control
                                </NavLinkItem>
                            </div>
                        ) : (
                            <div className="pb-2 border-t border-border pt-2">
                                <p
                                    className={cn(
                                        "px-6 py-2 text-foreground/60 flex items-center gap-3",
                                        profileSectionClass
                                    )}
                                >
                                    <Rocket size={12} /> Network Expansion
                                </p>
                                <NavLinkItem
                                    href="/become-seller"
                                    className={cn(
                                        navFocusRing,
                                        profileLinkClass,
                                        "mx-4 mt-1 flex items-center justify-center gap-3 px-6 py-3.5",
                                        "bg-gradient-to-r from-zinc-800 to-zinc-900 border border-border rounded-xl",
                                        "text-foreground hover:bg-transparent hover:border-foreground/60",
                                        "hover:shadow-[0_0_20px_hsl(var(--foreground)/0.1)]",
                                        "transition-[color,background-color,border-color,box-shadow] duration-150 shadow-xl"
                                    )}
                                >
                                    <Zap size={14} className="text-amber-400" /> Join as Seller
                                </NavLinkItem>
                            </div>
                        )}

                        <div className="py-2 border-t border-border">
                            <p className={cn("px-6 py-2 text-foreground/60", profileSectionClass)}>Personal Access</p>
                            <NavLinkItem
                                href="/admin/settings"
                                className={cn(
                                    profileLinkClass,
                                    navLinkTransition,
                                    "flex items-center gap-3 px-6 py-3 text-foreground/75 hover:text-foreground hover:bg-foreground/5"
                                )}
                            >
                                <Settings size={14} /> Account Config
                            </NavLinkItem>
                            <NavLinkItem
                                href={isAdmin ? "/admin/orders" : "/shop"}
                                className={cn(
                                    profileLinkClass,
                                    navLinkTransition,
                                    "flex items-center gap-3 px-6 py-3 text-foreground/75 hover:text-foreground hover:bg-foreground/5"
                                )}
                            >
                                <Package size={14} /> Acquisitions
                            </NavLinkItem>
                        </div>

                        <button
                            type="button"
                            onClick={onSignOut}
                            className={cn(
                                profileLinkClass,
                                navLinkTransition,
                                "w-full flex items-center gap-3 px-6 py-4 mt-2 border-t border-border text-red-400 hover:text-red-500 hover:bg-red-400/5 group/logout"
                            )}
                        >
                            <LogOut size={16} className="group-hover/logout:-translate-x-1 transition-transform" />
                            Logout / Terminate Access
                        </button>
                    </NavbarDropdown>
                </div>
            );
        }

        return (
            <div className="hidden sm:flex items-center gap-3">
                <NavLinkItem
                    href="/sign-in"
                    className={cn(
                        navFocusRing,
                        authLoginClass,
                        "text-foreground/80 hover:text-foreground px-5 py-2.5 rounded-full transition-[color,background-color,border-color] duration-150 hover:bg-foreground/5 border border-transparent hover:border-foreground/20"
                    )}
                >
                    Login
                </NavLinkItem>
                <NavLinkItem
                    href="/sign-up"
                    className={cn(
                        quietPrimary
                            ? cn(
                                  navFocusRing,
                                  authLoginClass,
                                  "text-foreground/80 hover:text-foreground px-5 py-2.5 rounded-full transition-[color,background-color,border-color,transform] duration-150 hover:bg-foreground/5 border border-transparent hover:border-foreground/20 flex items-center gap-2 active:scale-[0.97]"
                              )
                            : initializeButtonClass
                    )}
                >
                    Sign up
                    {!quietPrimary ? (
                        <ArrowRight size={14} className="group-hover/init:translate-x-1 transition-transform" />
                    ) : null}
                </NavLinkItem>
            </div>
        );
    }

    const { onNavigate } = props;

    return (
        <div className="pt-12 border-t border-border">
            {session ? (
                <div className="space-y-8">
                    <div className="flex items-center gap-5 px-6 py-5 bg-foreground/5 border border-border rounded-3xl">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-semibold text-foreground border border-border">
                            {session.user.name?.charAt(0) || "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate leading-none mb-1.5 tracking-normal normal-case">
                                {session.user.name}
                            </p>
                            <p className="text-xs font-medium text-foreground/60 truncate">{session.user.email}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3.5">
                        {isAdmin && (
                            <NavLinkItem
                                href="/admin"
                                onClick={onNavigate}
                                className="flex items-center justify-between px-8 py-5 bg-foreground text-background rounded-3xl text-sm font-bold uppercase tracking-[0.08em] shadow-xl shadow-white/5 transition-[transform,opacity] duration-150 active:scale-95"
                            >
                                Master Dashboard
                                <ShieldCheck size={16} />
                            </NavLinkItem>
                        )}
                        {isRegisteredSeller ? (
                            <NavLinkItem
                                href="/seller"
                                onClick={onNavigate}
                                className="flex items-center justify-between px-8 py-5 bg-foreground/5 border border-border text-foreground rounded-3xl text-sm font-semibold tracking-normal normal-case transition-[transform,opacity] duration-150 active:scale-95"
                            >
                                Seller Dashboard
                                <BarChart3 size={16} className="text-amber-500" />
                            </NavLinkItem>
                        ) : (
                            <NavLinkItem
                                href="/become-seller"
                                onClick={onNavigate}
                                className="flex items-center justify-between px-8 py-5 bg-foreground text-background rounded-3xl text-sm font-bold uppercase tracking-[0.08em] shadow-xl transition-[transform,opacity] duration-150 active:scale-95"
                            >
                                Join Global Network
                                <Rocket size={16} className="text-amber-500" />
                            </NavLinkItem>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={onSignOut}
                        className="w-full flex items-center justify-center gap-4 py-6 border-t border-border text-red-400/80 hover:text-red-400 text-sm font-medium tracking-normal transition-colors duration-150"
                    >
                        <LogOut size={16} />
                        Logout / Terminate Session
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    <NavLinkItem
                        href="/sign-up"
                        onClick={onNavigate}
                        className={cn(initializeButtonClass, "w-full py-5 rounded-[2rem] shadow-2xl justify-center")}
                    >
                        Create an account
                        <ArrowRight size={14} className="group-hover/init:translate-x-1 transition-transform" />
                    </NavLinkItem>
                    <NavLinkItem
                        href="/sign-in"
                        onClick={onNavigate}
                        className={cn(
                            navFocusRing,
                            authLoginClass,
                            "w-full bg-foreground/5 border border-white/20 text-white/80 py-5 rounded-[2rem] transition-[color,background-color,border-color] duration-150 hover:bg-foreground/10 hover:text-white hover:border-foreground/30 flex items-center justify-center"
                        )}
                    >
                        Sign in
                    </NavLinkItem>
                </div>
            )}
        </div>
    );
});
