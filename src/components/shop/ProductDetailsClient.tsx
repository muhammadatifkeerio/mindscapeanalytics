"use client";

import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Check, ShieldCheck, ArrowRight } from "lucide-react";
import { useState } from "react";
import { createCheckoutSession } from "@/app/_actions/stripe";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { RequestDemoModal } from "./RequestDemoModal";

interface ProductDetailsClientProps {
    product: {
        id: string;
        name: string;
        price: number;
        description: string | null;
        demoUrl?: string | null;
        features?: string[] | null;
        techStack?: string[] | null;
        category: string;
        images: { url: string }[];
    };
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const [isBuying, setIsBuying] = useState(false);
    const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
    const { data: session } = authClient.useSession();
    const router = useRouter();
    const pathname = usePathname();

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0]?.url,
        });
        setTimeout(() => setIsAdding(false), 1000);
    };

    const handleBuyNow = async () => {
        if (!session) {
            router.push(`/sign-in?callbackUrl=${pathname}`);
            return;
        }

        setIsBuying(true);
        try {
            const result = await createCheckoutSession(product.id);
            if (result.url) {
                window.location.href = result.url;
            }
        } catch (error) {
            console.error("Checkout failed:", error);
            alert("Checkout failed. Please try again.");
        } finally {
            setIsBuying(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4">
                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleBuyNow}
                    disabled={isBuying}
                    className="w-full py-6 bg-foreground text-background font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-foreground/90 disabled:bg-foreground/20 disabled:cursor-not-allowed transition-all shadow-[0_0_50px_hsl(var(--foreground)/0.1)] flex items-center justify-center gap-3 group"
                >
                    {isBuying ? "INITIALIZING SECURE LINK..." : (
                        <>
                            Immediate Acquisition
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="w-full py-5 bg-foreground/5 border border-border text-foreground font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-foreground/10 disabled:bg-foreground/10 transition-all flex items-center justify-center gap-3"
                >
                    {isAdding ? (
                        <>
                            <Check size={14} />
                            ALLOCATED TO CART
                        </>
                    ) : (
                        <>
                            <ShoppingCart size={14} className="text-foreground/40" />
                            Add to Allocation
                        </>
                    )}
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setIsDemoModalOpen(true)}
                    className="w-full py-5 bg-transparent border border-border text-foreground font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:bg-foreground/5 transition-all flex items-center justify-center gap-3 mt-4"
                >
                    Request Demo
                </motion.button>
            </div>

            <div className="pt-6 border-t border-border space-y-3">
                <div className="flex items-center gap-3 text-foreground/30 group">
                    <ShieldCheck size={14} className="group-hover:text-foreground transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Stripe Security Protocol Active</span>
                </div>
            </div>

            <RequestDemoModal
                isOpen={isDemoModalOpen}
                onClose={() => setIsDemoModalOpen(false)}
                productName={product.name}
            />
        </div>
    );
}
