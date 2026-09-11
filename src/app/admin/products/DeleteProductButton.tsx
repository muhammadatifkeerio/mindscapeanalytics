"use client";

import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/app/_actions/delete-product";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function DeleteProductButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
            return;
        }

        startTransition(async () => {
            const formData = new FormData();
            formData.append("id", id);
            const result = await deleteProduct(formData);
            if (result.success) {
                router.refresh();
            } else {
                alert(result.error || "Failed to delete product");
            }
        });
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className={`p-2.5 bg-foreground/5 hover:bg-red-500/10 hover:text-red-400 rounded-xl border border-border transition-all outline-none ${isPending ? "opacity-50 cursor-not-allowed" : ""
                }`}
            title="Delete product"
        >
            <Trash2 size={16} className={isPending ? "animate-pulse" : ""} />
        </button>
    );
}
