/**
 * SOURCE OF TRUTH KEYWORDS: asStringList, Prisma JsonValue, features, techStack
 * WHAT: Coerce Prisma Json columns into string lists for UI.
 * WHY: Shared by RSC pages and client forms without pulling server-only services into the bundle.
 * WHERE: ProductForm, shop product page, product cards.
 */

export function asStringList(value: unknown): string[] {
    if (!Array.isArray(value)) return [];
    return value.filter((item): item is string => typeof item === "string");
}
