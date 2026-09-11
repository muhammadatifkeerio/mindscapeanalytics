"use server";

/**
 * SOURCE OF TRUTH KEYWORDS: deleteProduct, product:delete, protectedMutation, product.service
 * WHAT: Delete a product the actor owns (or any product if hasFullAccess).
 * WHY: Ownership check stays in the service; permission is enforced by the block.
 * WHERE: admin/seller product tables.
 */

import { revalidatePath } from "next/cache";
import { runProtected, formValue } from "@/lib/protected";
import { PERMISSIONS, productIdSchema, type ActionState } from "@/lib/types";
import * as productService from "@/services/product.service";

export async function deleteProduct(formData: FormData): Promise<ActionState> {
    const parsed = productIdSchema.safeParse({ id: formValue(formData, "id") });
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Product ID missing", success: false };
    }

    try {
        const result = await runProtected({ permission: PERMISSIONS.product.delete }, async (ctx) =>
            productService.deleteOwned(parsed.data.id, ctx.userId, ctx.hasFullAccess),
        );
        if (!result.ok) return { error: result.error, success: false };
        revalidatePath("/admin/products");
        revalidatePath("/shop");
        return { error: null, success: true };
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to delete product";
        return { error: message, success: false };
    }
}
