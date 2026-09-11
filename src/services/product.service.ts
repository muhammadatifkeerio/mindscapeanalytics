import "server-only";

/**
 * SOURCE OF TRUTH KEYWORDS: product.service, Prisma Product, approvedForSale, sellerId, images, productFiles
 * WHAT: Product persistence — list, get, create, update, delete.
 * WHY: Routers/pages must not touch Prisma; this is the only product DB home.
 * WHERE: shop pages, admin/seller product actions, products API, checkout validation.
 */

import { prisma } from "@/lib/prisma";
import type { Pagination, ProductInput } from "@/lib/types";

export async function listApproved(pagination: Pagination) {
    return prisma.product.findMany({
        where: { approvedForSale: true },
        include: { images: true, seller: true },
        orderBy: { createdAt: "desc" },
        skip: pagination.skip,
        take: pagination.take,
    });
}

export async function listApprovedAll() {
    return prisma.product.findMany({
        where: { approvedForSale: true },
        include: { images: true, seller: true },
        orderBy: { createdAt: "desc" },
    });
}

export async function listApprovedSitemap() {
    return prisma.product.findMany({
        where: { approvedForSale: true },
        select: { id: true, updatedAt: true },
    });
}

export async function getById(id: string) {
    return prisma.product.findUnique({
        where: { id },
        include: { images: true, seller: true, productFiles: true },
    });
}

export async function listForAdmin(sellerId?: string) {
    return prisma.product.findMany({
        where: sellerId ? { sellerId } : {},
        include: { images: true, seller: true },
        orderBy: { createdAt: "desc" },
    });
}

export async function listForSeller(sellerId: string) {
    return prisma.product.findMany({
        where: { sellerId },
        include: { images: true },
        orderBy: { createdAt: "desc" },
    });
}

export async function countProducts(sellerId?: string) {
    return prisma.product.count({
        where: sellerId ? { sellerId } : {},
    });
}

export async function createForSeller(
    sellerId: string,
    input: ProductInput,
    approvedForSale: boolean,
) {
    return prisma.product.create({
        data: {
            name: input.name,
            price: input.price,
            category: input.category,
            description: input.description || "",
            approvedForSale,
            demoUrl: input.demoUrl || null,
            features: input.features || [],
            techStack: input.techStack || [],
            sellerId,
            images: {
                create: input.images.map((url) => ({ url })),
            },
            productFiles: {
                create: input.productFiles || [],
            },
        },
    });
}

export async function updateOwned(
    id: string,
    sellerId: string,
    hasFullAccess: boolean,
    input: ProductInput,
) {
    const product = await prisma.product.findUnique({
        where: { id },
        select: { sellerId: true },
    });
    if (!product) return { ok: false as const, error: "Product not found." };
    if (!hasFullAccess && product.sellerId !== sellerId) {
        return { ok: false as const, error: "Unauthorized. You can only update your own products." };
    }

    await prisma.$transaction(async (tx) => {
        await tx.product.update({
            where: { id },
            data: {
                name: input.name,
                price: input.price,
                category: input.category,
                description: input.description || "",
                demoUrl: input.demoUrl || null,
                features: input.features || [],
                techStack: input.techStack || [],
            },
        });

        if (input.images.length > 0) {
            await tx.image.deleteMany({ where: { productId: id } });
            await tx.image.createMany({
                data: input.images.map((url) => ({ url, productId: id })),
            });
        }

        if (input.productFiles) {
            await tx.productFile.deleteMany({ where: { productId: id } });
            await tx.productFile.createMany({
                data: input.productFiles.map((file) => ({ ...file, productId: id })),
            });
        }
    });

    return { ok: true as const };
}

export async function deleteOwned(id: string, sellerId: string, hasFullAccess: boolean) {
    const product = await prisma.product.findUnique({
        where: { id },
        select: { sellerId: true },
    });
    if (!product) return { ok: false as const, error: "Product not found" };
    if (!hasFullAccess && product.sellerId !== sellerId) {
        return { ok: false as const, error: "Unauthorized. You can only delete your own products." };
    }

    await prisma.product.delete({ where: { id } });
    return { ok: true as const };
}

export async function findManyByIds(ids: string[]) {
    return prisma.product.findMany({
        where: { id: { in: ids } },
        include: { seller: { select: { stripeAccountId: true } } },
    });
}
