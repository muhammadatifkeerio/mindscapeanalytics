"use client";

import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartIcon() {
    const { itemCount } = useCart();

    return (
        <Link href="/cart" className="relative">
            <button className="p-2.5 bg-foreground/5 hover:bg-foreground/10 border border-border hover:border-border rounded-xl transition-all relative group/cart">
                <ShoppingCart size={18} className="text-white/60 group-hover/cart:text-white transition-colors" />
                {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground text-background text-[9px] font-black rounded-full flex items-center justify-center shadow-xl">
                        {itemCount}
                    </span>
                )}
            </button>
        </Link>
    );
}
