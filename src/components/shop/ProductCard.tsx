"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";

interface Product {
    id: string;
    name: string;
    description: string | null;
    price: number;
    category: string;
    images: { url: string }[];
    seller?: {
        name: string | null;
        image: string | null;
        storeName: string | null;
    };
}

export default function ProductCard({
    product,
    onQuickView,
    priority = false
}: {
    product: Product;
    onQuickView?: (product: Product) => void;
    priority?: boolean;
}) {
    const [isLiked, setIsLiked] = useState(false);
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsAdding(true);
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0]?.url,
        });
        setTimeout(() => setIsAdding(false), 1000);
    };

    const imageUrl = product.images[0]?.url || "https://placehold.co/600x400/0a0a0b/ffffff?text=No+Image";

    return (
        <Link href={`/shop/${product.id}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -8 }}
                className="group relative rounded-3xl bg-card dark:bg-[#0f0f11] border border-border overflow-hidden hover:border-secondary transition-all duration-500 cursor-pointer card-premium"
            >
                {/* Image Container */}
                <div className="relative aspect-[16/10] bg-background overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        priority={priority}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    {/* Industrial Tint for legibility */}
                    <div className="absolute inset-0 bg-transparent/20 mix-blend-multiply group-hover:opacity-0 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />

                    {/* Category Label */}
                    <div className="absolute bottom-5 left-5">
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-foreground/50 bg-foreground/5 px-3 py-1.5 rounded-md backdrop-blur-md border border-border shadow-xl">
                            {product.category.replace(/_/g, ' ')}
                        </span>
                    </div>

                    {/* Hover Stats */}
                    <div className="absolute top-5 right-5 flex gap-2">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onQuickView?.(product);
                            }}
                            className="p-2.5 bg-foreground text-background rounded-lg opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 hover:scale-110 active:scale-95 shadow-xl duration-300"
                            title="Quick View"
                        >
                            <Eye size={16} strokeWidth={3} />
                        </button>
                        <div className="p-2.5 bg-background/40 backdrop-blur-md rounded-lg border border-border opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
                            <span className="text-[9px] font-black uppercase tracking-widest text-foreground/80 flex items-center gap-1.5">
                                <Star size={10} className="fill-secondary text-secondary" />
                                4.8
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content Panel */}
                <div className="p-6">
                    <div className="flex justify-between items-start gap-4 mb-4">
                        <h3 className="text-xl font-black uppercase tracking-tightest leading-none group-hover:text-foreground transition-colors flex-1 line-clamp-1 text-foreground/90">
                            {product.name}
                        </h3>
                    </div>

                    <p className="text-[11px] text-foreground/40 line-clamp-2 mb-6 font-medium leading-relaxed uppercase tracking-tighter">
                        {product.description || "Elite architectural primitive engineered for high-tier deployments."}
                    </p>

                    {/* Gumroad Style Checkout Trigger */}
                    <div className="flex items-center gap-3">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onQuickView?.(product);
                            }}
                            className="bg-foreground text-background px-6 py-4 rounded-xl flex-1 flex items-center justify-between group/btn shadow-[0_10px_20px_hsl(var(--foreground) / 0.05)]"
                        >
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                View & Acquire
                            </span>
                            <div className="flex items-center gap-2">
                                <div className="w-px h-3 bg-background/10" />
                                <span className="text-sm font-black text-secondary">${product.price}</span>
                            </div>
                        </motion.button>

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsLiked(!isLiked);
                            }}
                            className={cn(
                                "p-4 rounded-xl border transition-all",
                                isLiked ? "bg-secondary/10 border-secondary text-secondary" : "bg-foreground/5 border-border text-foreground/20 hover:text-foreground"
                            )}
                        >
                            <Heart size={16} className={isLiked ? "fill-current" : ""} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
