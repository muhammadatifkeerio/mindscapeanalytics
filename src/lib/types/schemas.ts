/**
 * SOURCE OF TRUTH KEYWORDS: Zod, productSchema, leadSchema, contactFormSchema, checkoutItemsSchema, payoutSchema, sellerSchema
 * WHAT: Input schemas for every mutation and public form.
 * WHY: Invalid payloads must fail at the boundary; routers/actions never trust FormData/JSON as-is.
 * WHERE: protected form mutations, API base-handler routes, ProductForm.
 */

import { z } from "zod";

export const actionStateSchema = z.object({
    error: z.string().nullable(),
    success: z.boolean().optional(),
    url: z.string().nullable().optional(),
});

export const productSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(3, "Name must be at least 3 characters"),
    price: z.number().min(0, "Price must be positive"),
    category: z.string().min(1, "Category is required"),
    description: z.string().optional(),
    demoUrl: z.string().url("Invalid demo URL").optional().or(z.literal("")),
    images: z.array(z.string().url("Invalid image URL")).min(1, "At least one image is required"),
    features: z.array(z.string()).optional(),
    techStack: z.array(z.string()).optional(),
    productFiles: z
        .array(
            z.object({
                filename: z.string().min(1, "Filename is required"),
                url: z.string().url("Invalid asset URL"),
            }),
        )
        .optional(),
});

export const productIdSchema = z.object({
    id: z.string().min(1, "Product ID is required"),
});

export const sellerEnrollSchema = z.object({
    storeName: z.string().min(2, "Store name is required"),
    storeDescription: z.string().min(10, "Asset description is required"),
});

export const payoutSchema = z.object({
    payoutMethod: z.string().min(1, "Payout protocol is required"),
    payoutDetails: z.string().min(1, "Payout destination is required"),
});

export const checkoutItemSchema = z.object({
    id: z.string().min(1),
    quantity: z.number().int().positive().max(99),
});

export const checkoutItemsSchema = z.array(checkoutItemSchema).min(1).max(50);

export const checkoutProductIdSchema = z.object({
    productId: z.string().min(1),
});

export const stripeSessionIdSchema = z.object({
    sessionId: z.string().min(1),
});

export const leadSchema = z.object({
    email: z.string().email("Invalid email"),
    name: z.string().optional(),
    company: z.string().optional(),
    phone: z.string().optional(),
    source: z.string().default("website"),
    service: z.string().optional(),
    message: z.string().optional(),
    metadata: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])).optional(),
});

export const contactFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    company: z.string().optional(),
    phone: z.string().optional(),
    service: z.string().min(1, "Please select a service"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

export const chatMessageSchema = z.object({
    role: z.enum(["user", "assistant", "system"]),
    content: z.string().min(1),
});

export const chatRequestSchema = z.object({
    messages: z.array(chatMessageSchema).min(1).max(50),
});

export const voiceRequestSchema = z.object({
    transcript: z.string().min(1, "No transcript provided"),
    history: z
        .array(
            z.object({
                role: z.enum(["user", "assistant"]),
                content: z.string(),
            }),
        )
        .optional()
        .default([]),
});

export const roadmapSchema = z.object({
    description: z.string().min(8, "Describe the process or paste a URL"),
});

export type ProductInput = z.infer<typeof productSchema>;
export type LeadInput = z.infer<typeof leadSchema>;
export type ContactInput = z.infer<typeof contactFormSchema>;
