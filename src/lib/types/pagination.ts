/**
 * SOURCE OF TRUTH KEYWORDS: Pagination, PaginationOptions, skip, take, max page size
 * WHAT: Shared list pagination contract resolved once in the block.
 * WHY: Unbounded skip/take in handlers is a DoS vector; one home caps page size.
 * WHERE: protected.ts injects ctx.pagination; list services consume it.
 */

export const DEFAULT_PAGE_SIZE = 24;
export const MAX_PAGE_SIZE = 100;

export interface PaginationOptions {
    page?: number;
    pageSize?: number;
}

export interface Pagination {
    page: number;
    pageSize: number;
    skip: number;
    take: number;
}

export function resolvePagination(options: PaginationOptions = {}): Pagination {
    const page = Math.max(1, Math.floor(options.page ?? 1));
    const requested = Math.floor(options.pageSize ?? DEFAULT_PAGE_SIZE);
    const pageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, requested));
    return {
        page,
        pageSize,
        skip: (page - 1) * pageSize,
        take: pageSize,
    };
}
