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
    const isRequestAccess = product.category === "request_access";

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
                {isRequestAccess ? (
                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setIsDemoModalOpen(true)}
                        className="flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 group sm:rounded-2xl sm:py-5"
                    >
                        Request access <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                ) : <>
                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleBuyNow}
                    disabled={isBuying}
                    className="flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background shadow-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 group sm:rounded-2xl sm:py-5"
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
                    className="flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-border bg-muted px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted/70 disabled:opacity-50 sm:rounded-2xl sm:py-4"
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
                    className="mt-2 flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted/50 sm:mt-4 sm:rounded-2xl sm:py-4"
                >
                    Request Demo
                </motion.button>
                </>}
            </div>

            {isRequestAccess ? (
                <p className="pt-4 border-t border-border text-xs leading-5 text-muted-foreground">No payment is collected here. Our team will confirm availability, access, licensing, and pricing.</p>
            ) : <div className="pt-6 border-t border-border space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground group">
                    <ShieldCheck size={16} className="transition-colors group-hover:text-foreground" />
                    <span className="text-xs font-medium">Secure checkout powered by Stripe</span>
                </div>
            </div>}

            <RequestDemoModal
                isOpen={isDemoModalOpen}
                onClose={() => setIsDemoModalOpen(false)}
                productName={product.name}
                requestType={isRequestAccess ? "access" : "demo"}
            />
        </div>
    );
}
