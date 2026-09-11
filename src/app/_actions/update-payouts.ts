"use server";

/**
 * SOURCE OF TRUTH KEYWORDS: updatePayouts, payout:update, protectedFormMutation, seller.service
 * WHAT: Save seller payout protocol and destination.
 * WHY: Settlement config is a registered resource; the block audits it automatically.
 * WHERE: admin and seller payment forms.
 */

import { revalidatePath } from "next/cache";
import { protectedFormMutation, formValue } from "@/lib/protected";
import { PERMISSIONS, payoutSchema } from "@/lib/types";
import * as sellerService from "@/services/seller.service";

export const updatePayouts = protectedFormMutation(
    {
        permission: PERMISSIONS.payout.update,
        schema: payoutSchema,
        fromFormData: (formData) => ({
            payoutMethod: formValue(formData, "payoutMethod"),
            payoutDetails: formValue(formData, "payoutDetails").trim(),
        }),
    },
    async ({ ctx, input }) => {
        await sellerService.updatePayout(ctx.userId, input.payoutMethod, input.payoutDetails);
        revalidatePath("/admin/payments");
        revalidatePath("/seller");
        return { error: null, success: true };
    },
);
