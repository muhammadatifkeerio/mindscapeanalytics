"use server";

/**
 * SOURCE OF TRUTH KEYWORDS: becomeSeller, seller:create, protectedFormMutation, seller.service
 * WHAT: Enroll the signed-in user as a seller.
 * WHY: Role writes stay in the adapter/service home; the block only checks seller:create.
 * WHERE: /become-seller form.
 */

import { revalidatePath } from "next/cache";
import { protectedFormMutation, formValue } from "@/lib/protected";
import { PERMISSIONS, sellerEnrollSchema } from "@/lib/types";
import * as sellerService from "@/services/seller.service";

export const becomeSeller = protectedFormMutation(
    {
        permission: PERMISSIONS.seller.create,
        schema: sellerEnrollSchema,
        fromFormData: (formData) => ({
            storeName: formValue(formData, "storeName").trim(),
            storeDescription: formValue(formData, "storeDescription").trim(),
        }),
    },
    async ({ ctx, input }) => {
        await sellerService.enroll(ctx.userId, input.storeName, input.storeDescription);
        revalidatePath("/", "layout");
        revalidatePath("/seller");
        revalidatePath("/shop");
        revalidatePath("/admin");
        return { error: null, success: true, url: "/seller" };
    },
);
