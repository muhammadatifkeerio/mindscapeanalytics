
"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createProduct } from "@/app/_actions/product";
import ProductForm from "@/components/admin/ProductForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewSellerProductClient() {
    return (
        <div className="min-h-screen bg-monochrome-cinematic text-foreground relative">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            </div>
            <Navbar />

            <main className="relative z-10 pt-44 pb-32 px-6">
                <div className="max-w-4xl mx-auto">
                    <Link href="/seller/products" className="inline-flex items-center gap-2 text-foreground/40 hover:text-foreground mb-12 transition-all group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Abort Initialization</span>
                    </Link>

                    <div className="mb-16">
                        <h1
                            className="text-5xl font-black mb-4 uppercase tracking-tighter"
                            style={{ fontSize: "clamp(2.5rem, 6vw, 3rem)" }}
                        >
                            NEW ASSET <span className="text-foreground/20">INITIALIZATION.</span>
                        </h1>
                        <p className="text-foreground/40 text-[11px] font-black uppercase tracking-[0.5em]">Authorized Listing Generation Terminal</p>
                    </div>

                    <div className="flex items-center gap-3 px-6 py-4 bg-foreground/[0.02] border border-border rounded-2xl mb-12">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground/30 leading-loose">
                            Institutional Policy: Released assets are subject to a 10-day settlement threshold and a standard 10% platform fee upon capital distribution.
                        </p>
                    </div>

                    <ProductForm
                        action={createProduct}
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
}
