import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({
    connectionString,
    max: 1,
    ssl: connectionString.includes("localhost") || connectionString.includes("127.0.0.1")
        ? false
        : { rejectUnauthorized: process.env.VERCEL === "1" ? false : true },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function run() {
    try {
        console.log("🧼 Purging preliminary data for registration...");
        // Ensure we only clear data that conflicts with fresh registration
        await prisma.product.deleteMany({ where: { id: { startsWith: 'seed_' } } });
        await prisma.user.deleteMany({ where: { email: 'zeeshan.keerio@mindscapeanalytics.com' } });
        console.log("✨ DB Clear: You can now register at /register");
    } catch (e) {
        console.error("❌ Cleanup Failed:", e);
    } finally {
        await pool.end();
    }
}

run();
