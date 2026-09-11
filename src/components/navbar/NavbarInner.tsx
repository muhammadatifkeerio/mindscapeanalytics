"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import CartIcon from "@/components/CartIcon";
import { authClient, type Session, type SessionUser } from "@/lib/auth-client";
import { signOutAndRedirect } from "@/lib/auth-actions";
import { getNavLinks, getContextTheme } from "@/config/navbar-links";
import { getNavContext } from "@/components/navbar/utils";
import { useNavLocation } from "@/components/navbar/hooks/useNavLocation";
import { useNavbarScroll } from "@/components/navbar/hooks/useNavbarScroll";
import { NavbarDesktopNav } from "@/components/navbar/NavbarDesktopNav";
import { NavbarAuthActions } from "@/components/navbar/NavbarAuthActions";
import { NavbarMobileMenu } from "@/components/navbar/NavbarMobileMenu";
import { contextBadgeClass } from "@/components/navbar/typography";
import { navFocusRing, navShellTransition } from "@/components/navbar/motion";

function NavbarInner() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const isScrolled = useNavbarScroll();
    const location = useNavLocation();
    const { pathname } = location;

    const { data: session } = authClient.useSession();
    const router = useRouter();

    const sessionUser = session?.user as SessionUser | undefined;
    const userRole = sessionUser?.role;
    const isSellerUser = sessionUser?.isSeller;
    const isAdmin = userRole === "admin" || userRole === "super_admin";
    const isRegisteredSeller = isSellerUser || userRole === "seller" || isAdmin;
    const sessionData = (session as Session | null) ?? null;

    const navContext = useMemo(() => getNavContext(pathname), [pathname]);
    const navLinks = useMemo(() => getNavLinks(navContext), [navContext]);
    const contextTheme = useMemo(() => getContextTheme(navContext), [navContext]);

    useEffect(() => {
        setMobileMenuOpen(false);
        setActiveMobileDropdown(null);
        setActiveDropdown(null);
    }, [pathname, location.hash, location.searchParams.toString()]);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setMobileMenuOpen(false);
                setActiveMobileDropdown(null);
                setActiveDropdown(null);
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    useEffect(() => {
        return () => {
            if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        };
    }, []);

    const handleSignOut = useCallback(async () => {
        await signOutAndRedirect(router);
    }, [router]);

    const handleMouseEnter = useCallback((name: string) => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setActiveDropdown(name);
    }, []);

    const handleMouseLeave = useCallback(() => {
        closeTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 80);
    }, []);

    const toggleMobileMenu = useCallback(() => {
        setMobileMenuOpen((prev) => !prev);
    }, []);

    const closeMobileMenu = useCallback(() => {
        setMobileMenuOpen(false);
    }, []);

    return (
        <nav
            aria-label="Primary Navigation"
            className={cn(
                "fixed top-0 left-0 right-0 z-50 px-4 md:px-0 flex flex-col items-center",
                navShellTransition,
                isScrolled ? "pt-3 sm:pt-4" : "pt-6 sm:pt-8"
            )}
        >
            <div
                className={cn(
                    "w-full max-w-7xl flex items-center justify-between px-6 py-3 rounded-full border relative",
                    navShellTransition,
                    isScrolled
                        ? "bg-background/90 md:bg-background/80 backdrop-blur-xl border-border shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                        : "bg-transparent border-transparent"
                )}
            >
                <div className="flex items-center gap-4 min-w-0">
                    <Link
                        href="/"
                        aria-label="Mindscape Analytics Home"
                        className="flex items-center group transition-transform hover:scale-105 active:scale-95 shrink-0"
                    >
                        <Image
                            src="/images/logo/mindscape-analytics.png"
                            alt="Mindscape Analytics Logo"
                            width={160}
                            height={35}
                            priority
                            className="h-8 sm:h-9 w-auto object-contain brightness-0 invert contrast-125 transition-opacity duration-200 opacity-90 group-hover:opacity-100"
                        />
                    </Link>
                    {contextTheme && (
                        <div
                            className={cn(
                                "hidden sm:flex px-2.5 py-1 rounded-md border self-center not-italic shrink-0",
                                contextBadgeClass,
                                contextTheme.color,
                                contextTheme.bg,
                                contextTheme.border
                            )}
                        >
                            {contextTheme.label}
                        </div>
                    )}
                </div>

                <NavbarDesktopNav
                    location={location}
                    navLinks={navLinks}
                    activeDropdown={activeDropdown}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                />

                <div className="flex items-center gap-4 shrink-0">
                    {navContext === "shop" && (
                        <div className="flex items-center h-full">
                            <CartIcon />
                        </div>
                    )}

                    <NavbarAuthActions
                        variant="desktop"
                        session={sessionData}
                        isAdmin={isAdmin}
                        isRegisteredSeller={isRegisteredSeller}
                        activeDropdown={activeDropdown}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onSignOut={handleSignOut}
                        quietPrimary={pathname === "/" && !isScrolled}
                    />

                    <button
                        type="button"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle Navigation HUD"
                        aria-expanded={mobileMenuOpen}
                        className={cn(
                            navFocusRing,
                            "lg:hidden p-3 bg-secondary/5 border border-secondary/10 rounded-2xl text-foreground/50 hover:text-foreground transition-colors duration-150 active:scale-90 shadow-inner"
                        )}
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            <NavbarMobileMenu
                isOpen={mobileMenuOpen}
                location={location}
                navLinks={navLinks}
                activeMobileDropdown={activeMobileDropdown}
                onToggleMobileDropdown={setActiveMobileDropdown}
                onClose={closeMobileMenu}
                session={sessionData}
                isAdmin={isAdmin}
                isRegisteredSeller={isRegisteredSeller}
                onSignOut={handleSignOut}
            />
        </nav>
    );
}

export default memo(NavbarInner);
