"use client";

import { memo } from "react";
import {
    ShieldCheck,
    Activity,
    BarChart3,
    Globe,
    ArrowLeft,
    Layers,
    Package,
    CreditCard,
    ShoppingCart,
} from "lucide-react";
import type { NavIconKey } from "@/components/navbar/types";

const ICONS = {
    "shield-check": ShieldCheck,
    activity: Activity,
    "bar-chart-3": BarChart3,
    globe: Globe,
    "arrow-left": ArrowLeft,
    layers: Layers,
    package: Package,
    "credit-card": CreditCard,
    "shopping-cart": ShoppingCart,
} as const satisfies Record<NavIconKey, typeof ShieldCheck>;

interface NavLinkIconProps {
    name: NavIconKey;
    size?: number;
    className?: string;
}

export const NavLinkIcon = memo(function NavLinkIcon({ name, size = 12, className }: NavLinkIconProps) {
    const Icon = ICONS[name];
    return <Icon size={size} className={className} aria-hidden />;
});
