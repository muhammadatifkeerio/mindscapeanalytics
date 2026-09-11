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
                "absolute top-full mt-2 w-80 rounded-2xl overflow-hidden py-0 z-[100] bg-card dark:bg-[#0f0f11] border border-border/50 dark:border-[#27272a] shadow-xl",
                align === "center" && "left-1/2 -translate-x-1/2",
                align === "right" && "right-0 mt-3 py-3 shadow-[0_32px_64px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_rgba(0,0,0,1)]",
                className
            )}
        >
            <div className="absolute -top-4 left-0 right-0 h-4 bg-transparent" aria-hidden />
            {header}
            {children}
        </div>
    );
}
