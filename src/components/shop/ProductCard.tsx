"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Heart, Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "@/components/SmartImage";

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
    } | null;
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

    const imageUrl = product.images[0]?.url || "https://placehold.co/600x400/0a0a0b/ffffff?text=No+Image";

    return (
        <Link href={`/shop/${product.id}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-200 hover:border-brand/40 sm:rounded-3xl card-premium"
            >
                {/* Image Container */}
                <div className="relative aspect-[16/10] bg-background overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        priority={priority}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />

                    {/* Industrial Tint for legibility */}
                    <div className="absolute inset-0 bg-transparent/20 mix-blend-multiply group-hover:opacity-0 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90 transition-opacity duration-300" />

                    {/* Category Label */}
                    <div className="absolute bottom-5 left-5">
                            <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-foreground bg-background/95 px-3 py-1.5 rounded-md border border-border shadow-sm">
                            {product.category === "request_access" ? "Early access" : product.category.replace(/_/g, ' ')}
                        </span>
                    </div>

                    {/* Quick view */}
                    <div className="absolute top-5 right-5 flex gap-2">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onQuickView?.(product);
                            }}
                            aria-label={`Quick view ${product.name}`}
                            className="grid h-11 w-11 translate-y-0 place-items-center rounded-full bg-background text-foreground opacity-100 shadow-sm transition-all duration-200 hover:bg-muted active:scale-95 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
                            title="Quick View"
                        >
                            <Eye size={16} strokeWidth={3} />
                        </button>
                    </div>
                </div>

                {/* Content Panel */}
                <div className="p-4 sm:p-5">
                    <div className="mb-3 flex items-start justify-between gap-3 sm:mb-4">
                        <h3 className="line-clamp-2 flex-1 text-base font-semibold leading-5 text-foreground transition-colors sm:text-lg">
                            {product.name}
                        </h3>
                    </div>

                    <p className="mb-4 line-clamp-2 text-sm leading-5 text-muted-foreground sm:mb-5 sm:leading-relaxed">
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
                            className="flex min-h-11 flex-1 items-center justify-between gap-2 rounded-xl bg-foreground px-4 py-3 text-background transition-opacity hover:opacity-90 sm:px-5"
                        >
                            <span className="text-xs font-semibold">
                                {product.category === "request_access" ? "Request access" : "View & Acquire"}
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-background">{product.category === "request_access" ? "Contact" : `$${product.price}`}</span>
                            </div>
                        </motion.button>

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsLiked(!isLiked);
                            }}
                            aria-label={isLiked ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
                            className={cn(
                                "grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition-colors",
                                isLiked ? "bg-secondary/10 border-secondary text-secondary" : "bg-muted border-border text-muted-foreground hover:text-foreground"
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
