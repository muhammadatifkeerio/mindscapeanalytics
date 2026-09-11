/**
 * SOURCE OF TRUTH KEYWORDS: ProductWithImages, ProductWithRelations, OrderWithItems, Prisma payload, derived types
 * WHAT: Prisma-derived payload aliases for common includes — not parallel domain models.
 * WHY: Pages and services share one include shape without inventing User/Product interfaces.
 * WHERE: shop, admin, seller pages and product/order services.
 */

import type { Prisma } from "@/generated/prisma";

export type ProductWithImages = Prisma.ProductGetPayload<{
    include: { images: true };
}>;

export type ProductWithRelations = Prisma.ProductGetPayload<{
    include: { images: true; seller: true; productFiles: true };
}>;

export type ProductWithSeller = Prisma.ProductGetPayload<{
    include: { images: true; seller: true };
}>;

export type ProductFormInitial = {
    id?: string;
    name?: string;
    price?: number;
    category?: string;
    description?: string | null;
    demoUrl?: string | null;
    features?: Prisma.JsonValue;
    techStack?: Prisma.JsonValue;
    images?: { url: string }[];
    productFiles?: { filename: string; url: string }[];
};

export type OrderWithItems = Prisma.OrderGetPayload<{
    include: {
        items: {
            include: {
                product: {
                    include: {
                        images: true;
                        productFiles: true;
                    };
                };
            };
        };
    };
}>;
