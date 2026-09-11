"use server";

/**
 * SOURCE OF TRUTH KEYWORDS: createProduct, updateProduct, protectedFormMutation, productSchema, product.service
 * WHAT: Product create/update Server Actions. Business-only; gates live in the block.
 * WHY: FormData from ProductForm must hit protectedProcedure-equivalent before Prisma.
 * WHERE: admin and seller product new/edit pages.
 */

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { protectedFormMutation, formValue, formValues } from "@/lib/protected";
import { PERMISSIONS, productSchema } from "@/lib/types";
import * as productService from "@/services/product.service";

function productFromFormData(formData: FormData) {
    const fileUrls = formValues(formData, "fileUrl");
    const fileNames = formValues(formData, "fileName");
    return {
        id: formValue(formData, "id") || undefined,
        name: formValue(formData, "name"),
        price: Number.parseFloat(formValue(formData, "price")),
        category: formValue(formData, "category"),
        description: formValue(formData, "description"),
        demoUrl: formValue(formData, "demoUrl"),
        images: formValues(formData, "imageUrl"),
        features: formValues(formData, "features"),
        techStack: formValues(formData, "techStack"),
        productFiles: fileUrls
            .map((url, index) => ({
                url,
                filename: fileNames[index] || `Asset_${index + 1}`,
            }))
            .filter((file) => file.url.trim() !== ""),
    };
}

export const createProduct = protectedFormMutation(
    {
        permission: PERMISSIONS.product.create,
        schema: productSchema,
        fromFormData: productFromFormData,
    },
    async ({ ctx, input }) => {
        await productService.createForSeller(ctx.userId, input, ctx.hasFullAccess);
        revalidatePath("/admin/products");
        revalidatePath("/seller");
        revalidatePath("/shop");
        redirect(ctx.hasFullAccess ? "/admin/products" : "/seller");
    },
);

export const updateProduct = protectedFormMutation(
    {
        permission: PERMISSIONS.product.update,
        schema: productSchema,
        fromFormData: productFromFormData,
    },
    async ({ ctx, input }) => {
        if (!input.id) return { error: "Product ID is required for updates.", success: false };
        const result = await productService.updateOwned(input.id, ctx.userId, ctx.hasFullAccess, input);
        if (!result.ok) return { error: result.error, success: false };
        revalidatePath("/admin/products");
        revalidatePath("/seller");
        revalidatePath(`/shop/${input.id}`);
        revalidatePath("/shop");
        redirect(ctx.hasFullAccess ? "/admin/products" : "/seller");
    },
);
