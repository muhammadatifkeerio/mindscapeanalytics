"use client";

import { updateProduct } from "@/app/_actions/product";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useActionState } from "react";
import ProductForm from "@/components/admin/ProductForm";

import type { ProductFormInitial } from "@/lib/types";

interface EditProductClientProps {
    product: ProductFormInitial;
}

const initialState = {
    error: null as string | null,
};

export default function EditProductClient({ product }: EditProductClientProps) {
    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-12">
                <Link href="/admin/products" className="inline-flex items-center gap-3 text-foreground/40 hover:text-foreground transition-all group text-[10px] font-black uppercase tracking-[0.4em] mb-6">
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Terminal
                </Link>
                <h1
                    className="text-5xl font-black tracking-tightest uppercase"
                    style={{ fontSize: "clamp(2.5rem, 6vw, 3rem)" }}
                >
                    Modify Asset.
                </h1>
            </div>

            <ProductForm
                action={updateProduct}
                submitLabel="Sync Changes"
                initialData={product}
            />
        </div>
    );
}
