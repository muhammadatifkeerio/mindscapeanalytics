"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Code, ExternalLink } from "lucide-react";
import Image from "next/image";
import ProductDetailsClient from "./ProductDetailsClient";
import ProductGallery from "./ProductGallery";

import type { ProductWithSeller } from "@/lib/types";
import { asStringList } from "@/lib/json-list";

interface ProductDetailsModalProps {
    product: ProductWithSeller | null;
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
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
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
                        className="relative w-full max-w-[1200px] h-full max-h-[900px] bg-card dark:bg-[#0f0f11] border border-border rounded-[3rem] overflow-hidden flex flex-col lg:flex-row shadow-[0_0_100px_rgba(0,0,0,0.5)]"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 z-[110] p-4 bg-foreground/5 hover:bg-foreground/10 border border-border rounded-full text-foreground/40 hover:text-foreground transition-all backdrop-blur-xl"
                        >
                            <X size={20} />
                        </button>

                        {/* Left: Gallery Section */}
                        <div className="w-full lg:w-1/2 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-border overflow-y-auto no-scrollbar institutional-grid">
                            <div className="space-y-8">
                                <div className="aspect-[4/3] relative rounded-[2rem] overflow-hidden border border-border">
                                    <Image
                                        src={product.images[0]?.url || "https://placehold.co/600x400/0a0a0b/ffffff?text=No+Image"}
                                        alt={product.name}
                                        fill
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
                                <div className="grid grid-cols-2 gap-3">
                                    {techStack.map((tech: string, i: number) => (
                                        <div key={i} className="px-4 py-3 bg-foreground/[0.02] border border-border rounded-xl flex items-center gap-3">
                                            <Code size={12} className="text-foreground/20" />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-foreground/40">{tech}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Description Context */}
                                <div className="pt-8">
                                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-foreground/20 mb-4 block">Core Abstract</span>
                                    <p className="text-foreground/40 text-sm font-medium leading-relaxed border-l border-border pl-6">
                                        {product.description || "Elite architectural primitive engineered for high-tier deployments."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Interaction Interface */}
                        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col overflow-y-auto no-scrollbar">
                            <div className="mb-10">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="px-3 py-1 bg-foreground/5 border border-border rounded-full text-[8px] font-black uppercase tracking-[0.4em] text-foreground/40">
                                        {product.category.replace(/_/g, ' ')}
                                    </span>
                                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-foreground/10">#{product.id.slice(-6).toUpperCase()}</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black tracking-tightest leading-none uppercase text-foreground mb-6">
                                    {product.name}
                                </h2>
                            </div>

                            {/* Features Grid */}
                            <div className="flex-1 space-y-8">
                                <div className="grid grid-cols-1 gap-4">
                                    {features.map((feature: string, i: number) => (
                                        <div key={i} className="flex gap-4 items-center p-4 bg-foreground/[0.01] border border-border rounded-2xl group hover:bg-foreground/[0.03] transition-all">
                                            <div className="w-6 h-6 rounded-lg bg-foreground/5 flex items-center justify-center flex-shrink-0">
                                                <CheckCircle2 size={12} className="text-foreground/20 group-hover:text-foreground transition-colors" />
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 group-hover:text-foreground/80 transition-colors">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Acquisition Footer */}
                            <div className="mt-12 pt-10 border-t border-border">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-foreground/20 mb-1">Standard Allocation</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl font-black tracking-tighter text-foreground">${product.price}</span>
                                            <span className="text-foreground/20 text-[9px] font-bold uppercase">USD</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 px-4 py-2 bg-foreground/5 rounded-xl border border-border">
                                        <span className="text-[8px] font-black uppercase tracking-widest text-foreground/40">Verified Ready</span>
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

                                <div className="mt-10 text-center">
                                    <a
                                        href={`/shop/${product.id}`}
                                        className="text-[9px] font-black uppercase tracking-[0.4em] text-foreground/20 hover:text-foreground transition-all flex items-center justify-center gap-2 group"
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
