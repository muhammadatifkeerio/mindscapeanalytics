import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { dropdownPanelMotion, dropdownPanelState } from "@/components/navbar/motion";

interface NavbarDropdownProps {
    isOpen: boolean;
    align?: "center" | "right";
    header?: ReactNode;
    children: ReactNode;
    className?: string;
}

export function NavbarDropdown({
    isOpen,
    align = "center",
    header,
    children,
    className,
}: NavbarDropdownProps) {
    return (
        <div
            role="menu"
            aria-hidden={!isOpen}
            className={cn(
                dropdownPanelMotion,
                dropdownPanelState(isOpen),
                "absolute top-full mt-2 w-80 rounded-2xl overflow-hidden py-0 z-[100] bg-card border border-border shadow-[0_18px_52px_hsl(var(--foreground)/0.12)]",
                align === "center" && "left-1/2 -translate-x-1/2",
                align === "right" && "right-0 mt-3 py-3",
                className
            )}
        >
            <div className="absolute -top-4 left-0 right-0 h-4 bg-transparent" aria-hidden />
            {header}
            {children}
        </div>
    );
}
