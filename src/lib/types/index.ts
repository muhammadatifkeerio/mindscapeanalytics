/**
 * SOURCE OF TRUTH KEYWORDS: lib/types barrel, Permission, ProtectedCtx, ActionState, ProductWithImages, Zod schemas
 * WHAT: Barrel map for derived types and input schemas.
 * WHY: Agents locate the type home without walking every file.
 * WHERE: imported as @/lib/types from block, services, UI forms, and route auth.
 */

export * from "./resources";
export * from "./identity";
export * from "./pagination";
export * from "./prisma";
export * from "./schemas";
