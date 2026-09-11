"use client";

import React from "react";
import { Trash2 } from "lucide-react";

interface DeleteAssetButtonProps {
    productId: string;
    action: (formData: FormData) => Promise<void>;
}

export default function DeleteAssetButton({ productId, action }: DeleteAssetButtonProps) {
    return (
        <form action={action}>
            <input type="hidden" name="id" value={productId} />
            <button
                type="submit"
                className="w-12 h-12 flex items-center justify-center bg-red-500/5 border border-red-500/10 rounded-2xl text-red-400/40 hover:text-red-400 hover:bg-red-500/10 transition-all active:scale-90"
                onClick={(e) => {
                    if (!confirm('Are you sure you want to delete this architectural asset? This action is irreversible.')) {
                        e.preventDefault();
                    }
                }}
            >
                <Trash2 size={16} />
            </button>
        </form>
    );
}
