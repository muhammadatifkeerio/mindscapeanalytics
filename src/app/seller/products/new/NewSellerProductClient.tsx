
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
        <div className="min-h-screen bg-background text-foreground relative">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            </div>
            <Navbar />

            <main className="relative z-10 px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36 lg:pb-32 lg:pt-44">
                <div className="max-w-4xl mx-auto">
                    <Link href="/seller/products" className="mb-8 inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:mb-12">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to inventory</span>
                    </Link>

                    <div className="mb-8 sm:mb-12">
                        <h1
                            className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl"
                        >
                            Add an asset
                        </h1>
                        <p className="text-sm text-muted-foreground">Share the details buyers need to evaluate your product.</p>
                    </div>

                    <div className="mb-8 flex items-start gap-3 rounded-xl border border-border bg-muted/60 px-4 py-4 sm:mb-12 sm:px-6">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <p className="text-xs leading-5 text-muted-foreground sm:text-sm">
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
