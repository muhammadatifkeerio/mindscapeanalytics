"use client";

import { memo, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavLink, NavLocation } from "@/components/navbar/types";
import { isNavLinkActive, isNavSubLinkActive } from "@/components/navbar/utils";
import { NavLinkItem } from "@/components/navbar/NavLinkItem";
import { NavLinkIcon } from "@/components/navbar/NavLinkIcon";
import { NavbarDropdown } from "@/components/navbar/NavbarDropdown";
import { dropdownHeaderClass, dropdownItemClass, navLinkClass } from "@/components/navbar/typography";
import { navLinkTransition, navFocusRing } from "@/components/navbar/motion";

interface NavbarDesktopNavProps {
    navLinks: NavLink[];
    location: NavLocation;
    activeDropdown: string | null;
    onMouseEnter: (name: string) => void;
    onMouseLeave: () => void;
}

export const NavbarDesktopNav = memo(function NavbarDesktopNav({
    navLinks,
    location,
    activeDropdown,
    onMouseEnter,
    onMouseLeave,
}: NavbarDesktopNavProps) {
    return (
        <div className="hidden lg:flex items-center gap-x-6 relative">
            {navLinks.map((link) => {
                const isActive = isNavLinkActive(location, link);
                const isDropdownOpen = activeDropdown === link.name;

                return (
                    <div
                        key={link.name}
                        className="relative group flex items-center h-full"
                        onMouseEnter={() => link.submenu && onMouseEnter(link.name)}
                        onMouseLeave={onMouseLeave}
                    >
                        <NavLinkItem
                            href={link.href}
                            prefetch={link.prefetch}
                            aria-label={link.label}
                            aria-expanded={link.submenu ? isDropdownOpen : undefined}
                            aria-haspopup={link.submenu ? "menu" : undefined}
                            className={cn(
                                navFocusRing,
                                navLinkClass,
                                navLinkTransition,
                                "relative py-2.5 px-4 rounded-full flex items-center gap-2",
                                isActive
                                    ? "text-foreground bg-foreground/[0.05] dark:bg-white/[0.05]"
                                    : "text-foreground/80 hover:text-foreground hover:bg-foreground/[0.03] dark:hover:bg-white/[0.03]"
                            )}
                        >
                            {link.icon && (
                                <span
                                    className={cn(
                                        "transition-opacity duration-150",
                                        isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"
                                    )}
                                >
                                    <NavLinkIcon name={link.icon} />
                                </span>
                            )}
                            {link.name}
                            {link.submenu && (
                                <ChevronDown
                                    size={14}
                                    className={cn(
                                        "text-foreground/70 transition-transform duration-150 shrink-0",
                                        isActive || isDropdownOpen
                                            ? "opacity-100"
                                            : "opacity-80 group-hover:opacity-100",
                                        isDropdownOpen && "rotate-180"
                                    )}
                                />
                            )}
                        </NavLinkItem>

                        {link.submenu && (
                            <NavbarDropdown
                                isOpen={isDropdownOpen}
                                align="center"
                                header={
                                    <div className="relative px-5 py-4 mb-1 border-b border-border/50">
                                        <p
                                            className={cn(
                                                dropdownHeaderClass,
                                                "border-l-2 border-secondary/60 pl-3 leading-normal"
                                            )}
                                        >
                                            {link.label}
                                        </p>
                                    </div>
                                }
                            >
                                <div className="flex flex-col gap-0.5 py-1">
                                    {link.submenu.map((item) => {
                                        const isSubActive = isNavSubLinkActive(location, item);

                                        return (
                                            <NavLinkItem
                                                key={item.name}
                                                href={item.href}
                                                className={cn(
                                                    navFocusRing,
                                                    dropdownItemClass,
                                                    navLinkTransition,
                                                    "block px-5 py-3.5 mx-2 rounded-xl relative group/item",
                                                    isSubActive
                                                        ? "text-foreground bg-foreground/[0.08]"
                                                        : "text-foreground/90 hover:text-foreground hover:bg-foreground/[0.06]"
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    {item.icon && (
                                                        <span className="opacity-70 group-hover/item:opacity-100 transition-opacity duration-150">
                                                            <NavLinkIcon name={item.icon} />
                                                        </span>
                                                    )}
                                                    <span>{item.name}</span>
                                                </div>
                                            </NavLinkItem>
                                        );
                                    })}
                                </div>
                            </NavbarDropdown>
                        )}
                    </div>
                );
            })}
        </div>
    );
});
