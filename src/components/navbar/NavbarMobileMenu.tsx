"use client";

import { memo } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Session } from "@/lib/auth-client";
import type { NavLink, NavLocation } from "@/components/navbar/types";
import { isNavLinkActive, isNavSubLinkActive } from "@/components/navbar/utils";
import { NavLinkItem } from "@/components/navbar/NavLinkItem";
import { NavLinkIcon } from "@/components/navbar/NavLinkIcon";
import { NavbarAuthActions } from "@/components/navbar/NavbarAuthActions";
import { mobileNavLinkClass, mobileSubmenuClass } from "@/components/navbar/typography";
import { dropdownPanelMotion, dropdownPanelState, navFocusRing } from "@/components/navbar/motion";

interface NavbarMobileMenuProps {
    isOpen: boolean;
    location: NavLocation;
    navLinks: NavLink[];
    activeMobileDropdown: string | null;
    onToggleMobileDropdown: (name: string | null) => void;
    onClose: () => void;
    session: Session | null;
    isAdmin: boolean;
    isRegisteredSeller: boolean;
    onSignOut: () => void;
}

export const NavbarMobileMenu = memo(function NavbarMobileMenu({
    isOpen,
    location,
    navLinks,
    activeMobileDropdown,
    onToggleMobileDropdown,
    onClose,
    session,
    isAdmin,
    isRegisteredSeller,
    onSignOut,
}: NavbarMobileMenuProps) {
    /**
     * SOURCE OF TRUTH KEYWORDS: Mobile navigation, touch menu, viewport scroll, safe area, drawer usability
     * WHAT: Scroll-contained mobile navigation with touch-sized links.
     * WHY: Short screens need to reach every destination without losing the page's scroll context.
     * WHERE: Rendered from NavbarInner across public routes below the desktop navigation breakpoint.
     */
    return (
        <div
            role="dialog"
            aria-modal={isOpen}
            aria-hidden={!isOpen}
            aria-label="Mobile Navigation"
            {...(!isOpen ? { inert: true } : {})}
            className={cn(
                dropdownPanelMotion,
                dropdownPanelState(isOpen),
                "xl:hidden absolute left-4 right-4 top-full z-50 mx-auto mt-3 w-auto max-w-sm origin-top overflow-x-hidden overflow-y-auto overscroll-y-contain touch-pan-y rounded-3xl border border-border bg-card shadow-[0_24px_64px_hsl(var(--foreground)/0.14)] max-h-[calc(100dvh-7rem)]"
            )}
        >
            <div className="relative z-10 space-y-5 p-5 sm:space-y-8 sm:p-8">
                {navLinks.map((link) => {
                    const isActive = isNavLinkActive(location, link);
                    const isSubmenuOpen = activeMobileDropdown === link.name;

                    return (
                        <div key={link.name} className="space-y-4">
                            <div className="flex items-center justify-between group">
                                <NavLinkItem
                                    href={link.href}
                                    prefetch={link.prefetch}
                                    className={cn(
                                        navFocusRing,
                                        mobileNavLinkClass,
                                        "flex min-h-11 items-center gap-4 py-2 transition-colors duration-150",
                                        isActive
                                            ? "text-foreground"
                                            : "text-foreground/80 hover:text-foreground"
                                    )}
                                    onClick={onClose}
                                >
                                    {link.icon ? (
                                        <NavLinkIcon name={link.icon} size={14} />
                                    ) : (
                                        <div
                                            className={cn(
                                                "w-2 h-2 rounded-full transition-colors duration-150",
                                                isActive
                                                    ? "bg-foreground"
                                                    : "bg-foreground/20 group-hover:bg-foreground"
                                            )}
                                        />
                                    )}
                                    {link.name}
                                </NavLinkItem>
                                {link.submenu && (
                                    <button
                                        type="button"
                                        aria-expanded={isSubmenuOpen}
                                        aria-label={`Toggle ${link.name} submenu`}
                                        onClick={() =>
                                            onToggleMobileDropdown(isSubmenuOpen ? null : link.name)
                                        }
                                        className={cn(
                                            navFocusRing,
                                            "grid h-11 w-11 shrink-0 place-items-center text-foreground/70 hover:text-foreground transition-colors duration-150 bg-foreground/10 rounded-xl border border-border shadow-sm"
                                        )}
                                    >
                                        <ChevronDown
                                            size={16}
                                            className={cn(
                                                "transition-transform duration-150",
                                                isSubmenuOpen ? "rotate-180" : "rotate-0"
                                            )}
                                        />
                                    </button>
                                )}
                            </div>

                            {link.submenu && (
                                <div
                                    className={cn(
                                        "grid transition-[grid-template-rows,opacity] duration-150 ease-out",
                                        isSubmenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                    )}
                                >
                                    <div className="overflow-hidden ml-6 border-l-2 border-border pl-6 mt-2 py-1 space-y-2">
                                        {link.submenu.map((item) => {
                                            const isSubActive = isNavSubLinkActive(location, item);

                                            return (
                                                <NavLinkItem
                                                    key={item.name}
                                                    href={item.href}
                                                    className={cn(
                                                        navFocusRing,
                                                        mobileSubmenuClass,
                                        "flex min-h-11 items-center gap-3 py-2 transition-colors duration-150",
                                                        isSubActive
                                                            ? "text-foreground"
                                                            : "text-foreground/75 hover:text-foreground"
                                                    )}
                                                    onClick={onClose}
                                                >
                                                    {item.name}
                                                </NavLinkItem>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}

                <NavbarAuthActions
                    variant="mobile"
                    session={session}
                    isAdmin={isAdmin}
                    isRegisteredSeller={isRegisteredSeller}
                    onSignOut={onSignOut}
                    onNavigate={onClose}
                />
            </div>
        </div>
    );
});
