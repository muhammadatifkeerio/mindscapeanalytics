"use client";

import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartIcon() {
    const { itemCount } = useCart();

    return (
        <Link href="/cart" aria-label="View cart" className="group/cart relative rounded-xl border border-border bg-foreground/5 p-2.5 transition-all hover:bg-foreground/10">
                <ShoppingCart size={18} className="text-white/60 group-hover/cart:text-white transition-colors" />
                {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground text-background text-[9px] font-black rounded-full flex items-center justify-center shadow-xl">
                        {itemCount}
                    </span>
                )}
        </Link>
    );
}
