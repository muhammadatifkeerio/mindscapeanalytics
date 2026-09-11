import "server-only";
import "dotenv/config";

/**
 * SOURCE OF TRUTH KEYWORDS: prisma, PrismaClient, PrismaPg, pg Pool, server-only, DATABASE_URL
 * WHAT: Process-wide Prisma client with the Prisma 7 driver adapter.
 * WHY: Services are the only DB home; server-only prevents this module from entering a Client Component graph.
 * WHERE: imported exclusively by src/services and the Better Auth adapter in lib/auth.ts.
 */

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma";

declare global {
    var __pgPool: Pool | undefined;
    var __prismaClient: PrismaClient | undefined;
}

function isLocalDatabase(connectionString: string): boolean {
    return connectionString.includes("localhost") || connectionString.includes("127.0.0.1");
}

function getPool(): Pool {
    const connectionString = process.env.DATABASE_URL ?? "";
    if (!globalThis.__pgPool) {
        globalThis.__pgPool = new Pool({
            connectionString,
            max: 10,
            connectionTimeoutMillis: 30_000,
            idleTimeoutMillis: 60_000,
            maxUses: 7500,
            ssl: isLocalDatabase(connectionString)
                ? false
                : {
                      rejectUnauthorized: false,
                      ca: process.env.CA_CERT,
                  },
        });

        globalThis.__pgPool.on("error", (err) => {
            console.error("[PRISMA_POOL_ERROR] Unexpected protocol rejection:", err.message);
        });
    }
    return globalThis.__pgPool;
}

function getPrismaClient(): PrismaClient {
    if (!globalThis.__prismaClient) {
        const adapter = new PrismaPg(getPool());
        globalThis.__prismaClient = new PrismaClient({ adapter });
    }
    return globalThis.__prismaClient;
}

export const prisma = getPrismaClient();
