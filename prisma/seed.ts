import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from '../src/generated/prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({
    connectionString,
    max: 1, // Only need 1 connection for seeding
    ssl: connectionString.includes("localhost") || connectionString.includes("127.0.0.1")
        ? false
        : { rejectUnauthorized: process.env.VERCEL === "1" ? false : true },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Starting Master Initialization Protocol...');

    const adminEmail = 'zeeshan.keerio@mindscapeanalytics.com';

    // 1. Initialize Admin User
    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {
            role: 'admin',
            isSeller: true,
            sellerVerified: true,
            username: 'zeeshankeerio',
            displayUsername: 'Zeeshan Keerio',
        },
        create: {
            email: adminEmail,
            name: 'Zeeshan Keerio',
            role: 'admin',
            isSeller: true,
            sellerVerified: true,
            username: 'zeeshankeerio',
            displayUsername: 'Zeeshan Keerio',
        },
    });

    console.log(`✅ Admin Localized: ${admin.email} (ID: ${admin.id})`);

    // 2. Clear existing products associated with this admin to prevent duplicates if re-seeded
    // Only if we want a fresh start. For now, let's just create them.

    const products = [
        // Custom Enterprise Products
        {
            name: 'Enterprise LMS Solution',
            description: 'A fully-featured Learning Management System built for scale. Includes course builders, student analytics, customizable graduation certificates, and integrated billing.',
            price: 899.00,
            category: 'management_systems',
            approvedForSale: true,
            demoUrl: 'https://lms.mindscapeanalytics.com/en',
            techStack: ['Next.js 15', 'PostgreSQL', 'Tailwind CSS', 'Stripe Integration', 'Vercel Deployment'],
            features: ['Drag-and-Drop Course Builder', 'Student Progress Tracking', 'Automated Certificate Generation', 'White-label Customization available'],
            imageUrl: '/images/projects/LMS_opt.webp',
        },
        {
            name: 'BreachData Intelligence Platform',
            description: 'Advanced data breach monitoring and intelligence dashboard. Tracks compromised credentials across the dark web with high-frequency alerts.',
            price: 999.00,
            category: 'saas',
            approvedForSale: true,
            demoUrl: 'https://breachdata.mindscapeanalytics.com/',
            techStack: ['React Enterprise', 'ElasticSearch Vectors', 'Redis Caching', 'Dark Web Telemetry'],
            features: ['Live Breach Search Engine', 'Compromised Credential Alerts', 'Domain & Identity Parsing', 'Extensive custom scraping available'],
            imageUrl: '/images/projects/breachdata_opt.webp',
        },
        {
            name: 'Global Formations LLC Portal',
            description: 'Complete automated incorporation and registered agent platform. Allows users to form LLCs and generate operating agreements automatically.',
            price: 1199.00,
            category: 'saas',
            approvedForSale: true,
            demoUrl: 'https://llc.mindscapeanalytics.com/',
            techStack: ['System Automation', 'PDF Auto-Generation', 'Stripe Billing', 'DocuSign Integration'],
            features: ['One-Click LLC Incorporation', 'Registered Agent Dashboard', 'Compliance Reminders & Filings', 'State API automation ready'],
            imageUrl: '/images/projects/global_formations_opt.webp',
        },
        // Premium Standard Products
        {
            name: 'Premium Dashboard UI Kit',
            description: 'Modern, responsive dashboard template with 50+ components. Built with React and Tailwind CSS.',
            price: 49.99,
            category: 'ui_kits',
            approvedForSale: true,
            imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        },
        {
            name: 'SaaS Starter Template',
            description: 'Complete SaaS boilerplate with authentication, billing, and multi-tenancy. Next.js 14 + Stripe.',
            price: 99.99,
            category: 'saas',
            approvedForSale: true,
            imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        },
        {
            name: 'N8N Automation Workflows',
            description: 'Pre-built automation workflows for common business processes. Includes CRM, email, and social media automations.',
            price: 29.99,
            category: 'n8n_workflows',
            approvedForSale: true,
            imageUrl: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800',
        },
        {
            name: 'Inventory Management Pro',
            description: 'Professional inventory analysis dashboard with automated reports and tracking.',
            price: 149.99,
            category: 'management_systems',
            approvedForSale: true,
            imageUrl: '/images/projects/amazon_invontry_management_system_opt.webp',
        },
        {
            name: 'AgriChain Logistics Platform',
            description: 'Traceability and logistics management for modern agricultural supply chains.',
            price: 599.00,
            category: 'management_systems',
            approvedForSale: true,
            imageUrl: '/images/projects/AgriChian_opt.webp',
        }
    ];

    console.log('📦 Seeding Assets...');

    for (const p of products) {
        const { imageUrl, ...productData } = p;

        await prisma.product.upsert({
            where: { id: `seed_${p.name.replace(/\s+/g, '_').toLowerCase()}` }, // Stable seed ID
            update: {
                ...productData,
                sellerId: admin.id,
                images: {
                    deleteMany: {},
                    create: [{ url: imageUrl }]
                }
            },
            create: {
                id: `seed_${p.name.replace(/\s+/g, '_').toLowerCase()}`,
                ...productData,
                sellerId: admin.id,
                images: {
                    create: [{ url: imageUrl }]
                }
            },
        });
        console.log(`✅ Asset Synchronized: ${p.name}`);
    }

    console.log('🎉 Phase 5 Initialization Complete!');
}

main()
    .catch((e) => {
        console.error('❌ Protocol Failure:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
