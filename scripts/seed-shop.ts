import { prisma } from '../src/lib/prisma.js';

const products = [
    {
        name: 'Oracle-Alpha Trading Engine',
        description: 'Institutional-grade gold and forex trading engine with 93% historical accuracy. Features neural-gate filters and liquidity-grab detection.',
        price: 1499.00,
        category: 'TRADING_SYSTEMS',
        features: ['Real-time Liquidity Mapping', 'Neural Signal Gating', 'Risk Management V3', 'Pine Script v6 Optimized'],
        approvedForSale: true,
        images: { create: [{ url: '/oracle_alpha_trading_engine.png' }] }
    },
    {
        name: 'Neural-Lead-Gen n8n Pack',
        description: 'Autonomous lead generation system that scrapes, validates, and enriches B2B contacts. Built for massive outbound scale.',
        price: 499.00,
        category: 'AUTOMATION_PACKS',
        features: ['Multimodal Scraping', 'Apollo/Lusha Integration', 'AI Intent Analysis', 'CRM Auto-Sync'],
        approvedForSale: true,
        images: { create: [{ url: '/neural_lead_gen_n8n.png' }] }
    },
    {
        name: 'Sentience CRM Sync',
        description: 'Intelligent bridge between communication channels and your CRM. Automatically maps calls, emails, and meetings into structured insights.',
        price: 299.00,
        category: 'ENTERPRISE_TOOLS',
        features: ['Sentiment Tracking', 'Automated Note-Taking', 'Entity Extraction', 'Universal API Support'],
        approvedForSale: true,
        images: { create: [{ url: '/sentience_crm_sync.png' }] }
    },
    {
        name: 'Sovereign SaaS Boilerplate',
        description: 'The ultimate Next.js 15 starter kit for AI SaaS. Includes Auth, Stripe, Prisma, and MSA AGENT voice integration out of the box.',
        price: 199.00,
        category: 'SOFTWARE_KITS',
        features: ['Next.js 15 App Router', 'Clerk / Supabase Ready', 'Stripe Subscription Flow', 'Tailwind v4 Engine'],
        approvedForSale: true,
        images: { create: [{ url: '/sovereign_saas_boilerplate.png' }] }
    },
    {
        name: 'Aether-Flow Voice AI',
        description: 'High-performance voice AI orchestrator for customer support. Sub-100ms latency with human-like reasoning and emotional intelligence.',
        price: 899.00,
        category: 'VOICE_INTELLIGENCE',
        features: ['Ultra-Low Latency', 'Emotional Tone Mapping', 'Dynamic Scripting', 'Multi-Language Support'],
        approvedForSale: true,
        images: { create: [{ url: '/aether-flow.png' }] }
    },
    {
        name: 'Ghost-Writer SEO Engine',
        description: 'Autonomous content engine that produces human-grade, SEO-optimized articles. Outperforms standard LLM output with deep research loops.',
        price: 349.00,
        category: 'CONTENT_AUTOMATION',
        features: ['Keyword Cluster Generation', 'Serpstat/Ahrefs Integration', 'Semantic Optimization', 'Bulk CMS Publishing'],
        approvedForSale: true,
        images: { create: [{ url: '/ghost-writer.png' }] }
    }
];

async function main() {
    console.log('--- SEEDING MINDSCAPE MARKETPLACE ---');
    
    for (const product of products) {
        const existing = await prisma.product.findFirst({
            where: { name: product.name }
        });

        if (existing) {
            console.log(`Updating: ${product.name}`);
            // Delete existing images to avoid duplicates on re-seed
            await prisma.image.deleteMany({ where: { productId: existing.id } });
            
            await prisma.product.update({
                where: { id: existing.id },
                data: {
                    ...product,
                    images: product.images
                }
            });
        } else {
            console.log(`Creating: ${product.name}`);
            await prisma.product.create({
                data: product
            });
        }
    }

    console.log('--- MARKETPLACE SEEDED SUCCESSFULLY ---');
}

main()
    .catch((e) => {
        console.error('Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
