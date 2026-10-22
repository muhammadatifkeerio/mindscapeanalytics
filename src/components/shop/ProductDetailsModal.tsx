"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Code, ExternalLink } from "lucide-react";
import Image from "@/components/SmartImage";
import ProductDetailsClient from "./ProductDetailsClient";

import type { ShopProduct } from "@/lib/types";
import { asStringList } from "@/lib/json-list";

interface ProductDetailsModalProps {
    product: ShopProduct | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ProductDetailsModal({ product, isOpen, onClose }: ProductDetailsModalProps) {
    if (!product) return null;

    const techStack = asStringList(product.techStack);
    const features = asStringList(product.features);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 lg:p-10">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                        className="relative flex h-[calc(100dvh-1.5rem)] max-h-[900px] w-full max-w-[1200px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:h-[calc(100dvh-2.5rem)] sm:rounded-3xl lg:h-full lg:flex-row"
                    >
                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close product details"
                            className="absolute right-3 top-3 z-[110] grid h-11 w-11 place-items-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-muted sm:right-5 sm:top-5"
                        >
                            <X size={20} />
                        </button>

                        {/* Left: Gallery Section */}
                        <div className="min-h-0 w-full shrink-0 overflow-y-auto border-b border-border p-4 pt-16 sm:p-6 sm:pt-16 lg:h-full lg:w-1/2 lg:shrink lg:border-b-0 lg:border-r lg:p-8 xl:p-12 institutional-grid">
                            <div className="space-y-5 sm:space-y-8">
                                <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border sm:aspect-[4/3] sm:rounded-2xl">
                                    <Image
                                        src={product.images[0]?.url || "https://placehold.co/600x400/0a0a0b/ffffff?text=No+Image"}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 1023px) 100vw, 50vw"
                                        className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 left-6 flex gap-2">
                                        <div className="px-3 py-1 bg-background/40 backdrop-blur-md rounded-full border border-border text-[8px] font-black uppercase tracking-widest text-foreground">
                                            V 2.1.0-STABLE
                                        </div>
                                    </div>
                                </div>

                                {/* Tech Stack Protocol */}
                                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                    {techStack.map((tech: string, i: number) => (
                                        <div key={i} className="px-4 py-3 bg-foreground/[0.02] border border-border rounded-xl flex items-center gap-3">
                                            <Code size={12} className="text-foreground/20" />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-foreground/40">{tech}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Description Context */}
                                <div className="pt-2 sm:pt-4">
                                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">About this product</span>
                                    <p className="border-l border-border pl-4 text-sm leading-6 text-muted-foreground sm:pl-5">
                                        {product.description || "Elite architectural primitive engineered for high-tier deployments."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Interaction Interface */}
                        <div className="min-h-0 w-full flex-1 overflow-y-auto p-4 pt-5 sm:p-6 lg:h-full lg:w-1/2 lg:flex-none lg:p-8 xl:p-12">
                            <div className="mb-6 sm:mb-8">
                                <div className="mb-3 flex flex-wrap items-center gap-2 sm:gap-4">
                                    <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium capitalize text-muted-foreground">
                                        {product.category.replace(/_/g, ' ')}
                                    </span>
                                    <span className="text-xs text-muted-foreground">#{product.id.slice(-6).toUpperCase()}</span>
                                </div>
                                <h2 className="mb-4 break-words text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                                    {product.name}
                                </h2>
                            </div>

                            {/* Features Grid */}
                            <div className="space-y-5 sm:space-y-8">
                                <div className="grid grid-cols-1 gap-4">
                                    {features.map((feature: string, i: number) => (
                                        <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-background p-3 transition-colors hover:bg-muted/50 sm:items-center sm:p-4">
                                            <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-muted text-brand">
                                                <CheckCircle2 size={15} />
                                            </div>
                                            <span className="text-sm leading-5 text-foreground">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Acquisition Footer */}
                            <div className="mt-6 border-t border-border pt-5 sm:mt-10 sm:pt-8">
                                <div className="mb-5 flex items-center justify-between gap-3 sm:mb-8">
                                    <div className="flex flex-col">
                                        <span className="mb-1 text-xs font-medium text-muted-foreground">{product.category === "request_access" ? "Availability" : product.category === "trading_intelligence" ? "One-time purchase" : "Price"}</span>
                                        <div className="flex items-baseline gap-2">
                                            {product.category === "request_access" ? <span className="text-xl font-semibold text-foreground">Request access</span> : <><span className="text-3xl font-bold tracking-tight text-foreground">${product.price}</span><span className="text-xs font-medium uppercase text-muted-foreground">USD</span></>}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 rounded-xl border border-border bg-muted px-3 py-2">
                                        <span className="text-xs font-medium text-muted-foreground">{product.category === "request_access" ? "Availability by request" : "Ready to purchase"}</span>
                                    </div>
                                </div>

                                <div className="w-full flex justify-center">
                                    <div className="w-full max-w-md">
                                        <ProductDetailsClient
                                            product={{
                                                id: product.id,
                                                name: product.name,
                                                price: product.price,
                                                description: product.description,
                                                demoUrl: product.demoUrl,
                                                features,
                                                techStack,
                                                category: product.category,
                                                images: product.images,
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 text-center sm:mt-8">
                                    <a
                                        href={`/shop/${product.id}`}
                                        className="inline-flex min-h-11 items-center justify-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        Inspect Full Documentation
                                        <ExternalLink size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
