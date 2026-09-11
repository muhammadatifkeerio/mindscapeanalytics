import { NextResponse } from "next/server";
import { withBaseHandler } from "@/lib/base-handler";
import { resolvePagination } from "@/lib/types/pagination";
import * as productService from "@/services/product.service";

/**
 * SOURCE OF TRUTH KEYWORDS: GET /api/products, listApproved, withBaseHandler
 * WHAT: Public catalog JSON for approved products.
 * WHY: Read-only listing still sits on the base rate spine; Prisma lives in product.service.
 * WHERE: shop clients that fetch over HTTP.
 */

export const GET = withBaseHandler(async () => {
    try {
        const products = await productService.listApproved(resolvePagination({ pageSize: 100 }));
        return NextResponse.json(products);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        const isConnectionError =
            message.includes("connect") ||
            message.includes("ECONNREFUSED") ||
            message.includes("timeout") ||
            message.includes("Can't reach database") ||
            message.includes("initial connection");

        const headers = {
            "Cache-Control": "no-store, max-age=0, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
        };

        if (isConnectionError) {
            return NextResponse.json(
                {
                    error: "Registry Connection Severed",
                    details: "The database terminal is initializing or unreachable.",
                    code: "DB_INIT_RETRY",
                },
                { status: 503, headers },
            );
        }

        return NextResponse.json(
            { error: "Data Query Exception", details: message, code: "INTERNAL_CORE_ERROR" },
            { status: 500, headers },
        );
    }
}, { maxRequests: 120, windowMs: 60_000 });
