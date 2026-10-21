"use client"

import Link from "next/link"
import Image from "@/components/SmartImage"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import {
    Database,
    Cloud,
    ArrowRight,
    ArrowUpRight,
    Activity,
    Layers,
    Code,
} from "lucide-react"

/**
 * SOURCE OF TRUTH KEYWORDS: featuredProducts, AurumPulse, Smart Dairy, RSIQ Pro, TENVO, DisposiQ, portfolio
 * WHAT: Curated product summaries, capabilities, artwork, and official destinations for the portfolio grid.
 * WHY: Keeps product facts and their direct links together without presenting unsupported ROI figures.
 * WHERE: Rendered by ProjectsPage as the primary projects showcase.
 */
const featuredProducts = [
    {
        name: "AurumPulse Gold News Intelligence Pro",
        category: "Gold news intelligence",
        summary: "A desktop terminal for XAUUSD traders, combining economic calendar alerts, impact levels, pre-news market context, conditional scenarios, and validation workspaces. Analysis is informational, not a guaranteed prediction.",
        image: "/images/projects/aurumpulse-gold-intelligence.webp",
        imageAlt: "AurumPulse gold news intelligence dashboard with economic event impact and XAUUSD analysis",
        highlights: ["Economic event alerts", "XAUUSD context & scenarios", "Historical and forward validation"],
        href: "/shop/seed_aurumpulse_gold_news_intelligence_pro",
        action: "Shop AurumPulse · $299 one-time"
    },
    {
        name: "Smart Dairy & Cattle Farm",
        category: "Farm operations",
        summary: "A connected management system for cattle, milk production, feed, herd health, and farm finances, bringing daily farm activity into one clear operating view.",
        image: "/images/projects/smart-dairy-card.webp",
        imageAlt: "Smart Dairy farm-management dashboard showing herd, milk production, feed, health, and financial data",
        highlights: ["Herd and health records", "Milk production tracking", "Feed and farm operations"],
        href: "https://cattle.mindscapeanalytics.com/",
        action: "Explore Smart Dairy"
    },
    {
        name: "RSIQ Pro",
        category: "Market intelligence",
        summary: "A live market workspace combining multi-asset scanning, technical signal context, alerts, and portfolio risk tools to support more informed trading decisions.",
        image: "/images/projects/rsiq-pro-card.webp",
        imageAlt: "RSIQ Pro market-intelligence terminal with live signals, market data, and risk insights",
        highlights: ["Multi-asset market scanner", "Signal confluence", "Alerts and risk context"],
        href: "https://rsiq.mindscapeanalytics.com/",
        action: "Explore RSIQ Pro"
    },
    {
        name: "TENVO Business OS",
        category: "Business operations",
        summary: "A unified workspace for storefront, POS, inventory, CRM, accounting, and analytics, helping teams keep sales and operations connected across desktop and mobile.",
        image: "/images/projects/tenvo-card.webp",
        imageAlt: "TENVO Business OS dashboard for inventory, point of sale, finance, and business analytics",
        highlights: ["POS and inventory", "Finance and CRM", "AI-assisted insights"],
        href: "https://www.tenvo.store/",
        action: "Explore TENVO"
    },
    {
        name: "DisposiQ",
        category: "Production operations",
        summary: "An operations hub that brings production tracking, disposal records, team activity, and operational insights into one shared view.",
        image: "/images/projects/disposiq-card.webp",
        imageAlt: "DisposiQ operations dashboard for production, disposal, activity, and operational metrics",
        highlights: ["Production tracking", "Disposal records", "Operational insights"],
        href: "https://disposiq.tenvo.store/",
        action: "Explore DisposiQ"
    }
];

/**
 * SOURCE OF TRUTH KEYWORDS: marketplaceProducts, Global Formations, BreachData, Enterprise LMS, AgriChain, Inventory Management
 * WHAT: Shop assets that are available to browse and acquire through their canonical product pages.
 * WHY: Distinguishes packaged marketplace assets from the four live product platforms above.
 * WHERE: Rendered in the ready-to-acquire section on the /projects route.
 */
const marketplaceProducts = [
    {
        name: "AurumPulse Gold News Intelligence Pro",
        category: "Trading intelligence",
        summary: "Gold-focused news analysis with scheduled event alerts, low, medium, and high impact classifications, pre-release context, conditional scenarios, and validation views. No guaranteed predictions or results.",
        image: "/images/projects/aurumpulse-gold-intelligence.webp",
        imageAlt: "AurumPulse economic news and XAUUSD intelligence terminal",
        href: "/shop/seed_aurumpulse_gold_news_intelligence_pro",
        price: "$299 one-time",
    },
    {
        name: "Global Formations LLC Portal",
        category: "Business formation",
        summary: "An automated incorporation and registered-agent platform that helps users form LLCs and generate operating agreements.",
        image: "/images/projects/global_formations_opt.webp",
        imageAlt: "Global Formations LLC incorporation portal",
        href: "/shop/seed_global_formations_llc_portal",
        price: "$1,199",
    },
    {
        name: "BreachData Intelligence Platform",
        category: "SaaS",
        summary: "A breach-monitoring and intelligence dashboard for tracking compromised credentials, with high-frequency alerts.",
        image: "/images/projects/breachdata_opt.webp",
        imageAlt: "BreachData intelligence and monitoring platform",
        href: "/shop/seed_breachdata_intelligence_platform",
        price: "$999",
    },
    {
        name: "Enterprise LMS Solution",
        category: "Learning management",
        summary: "A learning platform with course-building tools, student analytics, customizable graduation certificates, and integrated billing.",
        image: "/images/projects/LMS_opt.webp",
        imageAlt: "Enterprise learning management system dashboard",
        href: "/shop/seed_enterprise_lms_solution",
        price: "$899",
    },
    {
        name: "AgriChain Logistics Platform",
        category: "Agriculture and logistics",
        summary: "Traceability and logistics management for modern agricultural supply chains.",
        image: "/images/projects/AgriChian_opt.webp",
        imageAlt: "AgriChain agricultural supply-chain logistics platform",
        href: "/shop/seed_agrichain_logistics_platform",
        price: "$599",
    },
    {
        name: "Inventory Management Pro",
        category: "Management systems",
        summary: "A professional inventory analysis system for teams that need a clearer view of stock and operations.",
        image: "/images/projects/amazon_invontry_management_system_opt.webp",
        imageAlt: "Inventory Management Pro analytics dashboard",
        href: "/shop/seed_inventory_management_pro",
        price: null,
    },
];

/**
 * SOURCE OF TRUTH KEYWORDS: tenvoDemoStores, TENVO live demo stores, storefronts, images, descriptions, public routes
 * WHAT: The verified public TENVO storefront demos, with the same card imagery and descriptions used by TENVO.
 * WHY: Lets Mindscape visitors preview working vertical-specific stores while keeping demo storefronts distinct from assets for sale.
 * WHERE: Rendered beneath marketplaceProducts in the ready-to-acquire portfolio section.
 */
const tenvoDemoStores = [
    { slug: "demo-textile", name: "Textile", description: "Premium fabrics, unstitched collections, and wholesale textile essentials.", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=85", imageAlt: "Textile live demo storefront" },
    { slug: "demo-retail", name: "Retail", description: "Everyday essentials, gifts, and quality general merchandise.", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=82", imageAlt: "Retail live demo storefront" },
    { slug: "demo-restaurant", name: "Roll Inn", description: "Experience the essence of Desi flavours at Roll Inn in Karachi. Hearty BBQ, rolls, biryani, and combos made with tradition and taste.", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=82&auto=format&fit=crop", imageAlt: "Roll Inn live demo storefront" },
    { slug: "demo-pharmacy", name: "Pharmacy", description: "Tenvo Pharmacy is a licensed online pharmacy in Pakistan offering genuine medicines, OTC products, vitamins, personal care, mother & baby essentials, and medical devices with pharmacist support and nationwide delivery.", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=85&auto=format&fit=crop", imageAlt: "Pharmacy live demo storefront" },
    { slug: "demo-dental", name: "Dental", description: "Dental care products and clinic essentials, professional-grade treatments.", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=82", imageAlt: "Dental live demo storefront" },
    { slug: "demo-supermarket", name: "Supermarket", description: "Tenvo Supermarket — Clifton-style online grocery with fresh produce, mega food & non-food offers, pharmacy, and household essentials. Delivery across Karachi.", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.1.0&auto=format&fit=crop&w=1920&q=85", imageAlt: "Supermarket live demo storefront" },
    { slug: "demo-hardware", name: "Hardware", description: "Tools, plumbing, sanitary ware, and building supplies for trade & DIY.", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=82", imageAlt: "Hardware live demo storefront" },
    { slug: "demo-autoparts", name: "Auto Parts", description: "Genuine car accessories, car care products, and auto parts. OEM filters, oils, brakes, and electronics.", image: "https://www.autostore.pk/wp-content/uploads/2026/02/hero2-slide4-oils.jpg", imageAlt: "Auto Parts live demo storefront" },
    { slug: "demo-showroom", name: "Car Dealership", description: "Tenvo Car Dealership showroom: new and used cars, auto parts, car care, PPF, conversions, and accessories with online booking.", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.1.0&auto=format&fit=crop&w=1920&q=85", imageAlt: "Car Dealership live demo storefront" },
    { slug: "demo-sgcarmart", name: "Tenvo Auto Marketplace", description: "Tenvo Auto Marketplace demo: new, used, and rental listings, e-shop parts, valuations, and motoring resources on one branded portal.", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=85&auto=format&fit=crop", imageAlt: "Tenvo Auto Marketplace live demo storefront" },
    { slug: "demo-ev", name: "TENVO EV", description: "Tenvo EV is Pakistan’s leading electric motorcycle & scooter showroom. Discover high-performance Vlektra EV motorbikes, Metro EV smart scooters, and Ramza Aima e-bikes with lithium battery serial tracking, fast chargers, and free test rides.", image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&q=80&auto=format&fit=crop", imageAlt: "TENVO EV live demo storefront" },
    { slug: "demo-oil", name: "Tenvo Lubricants", description: "TENVO OILS is Pakistan’s leading engine oil & filter distribution network supplying Shell, Caltex, ZIC, PSO, TotalEnergies, Guard, Leppon, and Vic filters to wholesalers, workshops, lube shops, and commercial fleets.", image: "https://images.unsplash.com/photo-1486262715619-67b85e44308f?w=1200&q=80&auto=format&fit=crop", imageAlt: "Tenvo Lubricants live demo storefront" },
    { slug: "demo-travel", name: "Dream Vista Travel & Tours", description: "Official travel agency desk offering luxury expeditions across Northern Pakistan, Dubai & UAE escapes, executive Umrah packages, and express visa filing with guaranteed deposit safety.", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80&auto=format&fit=crop", imageAlt: "Dream Vista Travel & Tours live demo storefront" },
    { slug: "demo-bakery", name: "Bakery", description: "Fresh breads, cakes, pastries, and custom celebration orders.", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=82", imageAlt: "Bakery live demo storefront" },
    { slug: "demo-boutique", name: "Boutique", description: "Women's unstitched, pret, western & accessories, new arrivals every week.", image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.1.0&auto=format&fit=crop&w=1000&q=85", imageAlt: "Boutique live demo storefront" },
    { slug: "demo-jewellery", name: "Jewellery", description: "Hallmark-certified gold (21K–24K), diamond jewellery, bridal sets, pearls, and sterling silver. Assay certificates, custom sizing, and insured delivery.", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.1.0&auto=format&fit=crop&w=1000&q=85", imageAlt: "Jewellery live demo storefront" },
    { slug: "demo-electronics", name: "Tenvo Electronics", description: "Home appliances, LED TVs, and gadgets with official warranty and installment enquiry support.", image: "https://cdn.shopify.com/s/files/1/0830/0897/9164/files/Untitleddesign_20_130dd02e-89eb-4f6b-9b91-dec6031dabe9.jpg", imageAlt: "Tenvo Electronics live demo storefront" },
    { slug: "demo-mobile", name: "Mobile Shop", description: "Latest smartphones, tablets, and accessories, official warranty included.", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=82", imageAlt: "Mobile Shop live demo storefront" },
    { slug: "demo-furniture", name: "Furniture Store", description: "Tenvo Furniture Store offers modern sofas, recliners, dining sets, beds, and mattresses with nationwide delivery and assembly on qualifying orders.", image: "https://comfy.sg/cdn/shop/files/comfy-sofa-singapore.webp?width=1920", imageAlt: "Furniture Store live demo storefront" },
    { slug: "demo-marbles", name: "Tenvo Marbles", description: "Tenvo Marbles offers porcelain and ceramic tile collections plus marble, granite, onyx, and natural stone slabs for homes and commercial projects across Pakistan.", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.1.0&auto=format&fit=crop&w=1920&q=85", imageAlt: "Tenvo Marbles live demo storefront" },
    { slug: "demo-tyre", name: "Tenvo Tyre Store", description: "Trade parts, consumables, and wholesale quantities for businesses.", image: "https://gtrweb.mediaidee.com/wp-content/uploads/2025/07/GTR-banner1.webp", imageAlt: "Tenvo Tyre Store live demo storefront" },
    { slug: "demo-milk", name: "Tenvo Milk Demo", description: "Fresh cow and buffalo milk by the kg, homemade dahi, makkhan, lassi, and packaged dairy — chilled daily.", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=82", imageAlt: "Tenvo Milk Demo live demo storefront" },
    { slug: "demo-fmcg", name: "FMCG", description: "Fast-moving consumer goods, household, personal care, and pantry staples — wholesale and retail with distributor pricing.", image: "https://www.dsmonline.pk/media/wysiwyg/MANGO_BANNER.png", imageAlt: "FMCG live demo storefront" },
    { slug: "demo-footwear", name: "Tenvo Footwear Demo", description: "Shop authentic local and imported footwear — men, women, kids, sports, and orthopedic — with size-first search and graded condition.", image: "https://images.footlocker.com/content/dam/final/footlocker/site/homepage/2026/july/260717-fl-recjctp9ltdwglxup-bts-sale-sotf-1up-hp/260717-fl-recJCTp9ltDWGLxup-bts-sale-sotf-1up-web.jpg", imageAlt: "Tenvo Footwear Demo live demo storefront" },
    { slug: "demo-fitness", name: "Fitness Demo", description: "Train wild with strength, mobility, and conditioning programs. Shop whey protein, pre-workout, vitamins, and memberships with nationwide supplement delivery.", image: "https://assets.website-files.com/62258d7594580b9078cf9018/62259760d123ca0a7c2f1c20_Image%2011.png", imageAlt: "Fitness Demo live demo storefront" },
    { slug: "demo-marine", name: "Tenvo Marine", description: "Marine spare parts and propulsion systems. Thrusters, rudder propellers, seals, and lifecycle support for commercial vessels.", image: "https://c11cbcde.delivery.rocketcdn.me/wp-content/uploads/2025/03/Home-topfoto-dwg-trading.jpg", imageAlt: "Tenvo Marine live demo storefront" },
    { slug: "demo-construction", name: "Tenvo Constructors", description: "Consigli Construction Life Sciences & Civil Engineering: PEC C-A / C-1 licensed general contractor for turnkey pharmaceutical, commercial, and high-tech infrastructure.", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=85&auto=format&fit=crop", imageAlt: "Tenvo Constructors live demo storefront" },
    { slug: "tenvo-packaging", name: "TENVO Packaging", description: "A factory and paper-converting storefront for food-grade packaging, including baking cups, paper bowls, parchment rolls, and custom-printed food-service boxes.", image: "https://www.tenvo.store/factory/img/eco-packaging-suite.webp", imageAlt: "TENVO Packaging factory and paper-converter storefront" },
];

const deliveryPhases = [
    { title: "Strategy & Architecture Design", icon: Layers },
    { title: "AI & System Development", icon: Code },
    { title: "Cloud Deployment & Optimization", icon: Cloud },
    { title: "Managed Database Integration", icon: Database },
    { title: "Ongoing Monitoring & Maintenance", icon: Activity }
];

/**
 * SOURCE OF TRUTH KEYWORDS: ProjectsPage, featuredProducts, deliveryPhases, Navbar, Footer, portfolio
 * WHAT: Renders the responsive product portfolio and Mindscape delivery information.
 * WHY: Gives visitors a clear path from shipped products to a related project conversation.
 * WHERE: Next.js /projects route.
 */
export default function ProjectsPage() {
    return (
        <div className="min-h-screen bg-transparent text-foreground relative">
            <Navbar />
            <main>
                <section className="relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-20 institutional-grid">
                    <div className="container-standard relative z-10">
                        <h1 className="fluid-h1 max-w-5xl text-left">
                            Built for the work that matters.
                        </h1>
                        <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
                            Explore products from Mindscape Analytics, shaped around real operating challenges, from farm management and market intelligence to business operations and production.
                        </p>
                        <Link href="/contact" className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
                            Discuss a product or project
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>
                </section>

                <section className="border-t border-border bg-background py-16 md:py-24">
                    <div className="container-standard">
                        <div className="mb-9 max-w-3xl md:mb-12">
                            <h2 className="fluid-h2 text-balance">Real products. Built for measurable impact.</h2>
                            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                                See how the product portfolio turns complex day-to-day work into clearer, connected systems. Open any product to explore it directly.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                            {featuredProducts.map((product) => (
                                <article
                                    key={product.name}
                                    className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <Link
                                        href={product.href}
                                        target="_blank"
                                                rel="noopener noreferrer"
                                        aria-label={`${product.action}, opens in a new tab`}
                                        className="block h-full rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                                    >
                                        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                                            <Image
                                                src={product.image}
                                                alt={product.imageAlt}
                                                fill
                                                sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 640px"
                                                className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                                            />
                                            <span className="absolute left-4 top-4 rounded-full border border-border bg-background/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm">
                                                {product.category}
                                            </span>
                                        </div>

                                        <div className="flex min-h-[260px] flex-col p-5 sm:p-7">
                                            <div>
                                                <h3 className="text-2xl font-semibold tracking-[-0.025em] text-foreground sm:text-3xl">
                                                    {product.name}
                                                </h3>
                                                <p className="mt-3 max-w-xl text-[15px] leading-6 text-muted-foreground">
                                                    {product.summary}
                                                </p>
                                            </div>

                                            <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${product.name} capabilities`}>
                                                {product.highlights.map((highlight) => (
                                                    <li key={highlight} className="rounded-full border border-border bg-muted/60 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                                                        {highlight}
                                                    </li>
                                                ))}
                                            </ul>

                                            <span className="mt-auto flex min-h-12 items-end justify-between gap-4 pt-6 text-sm font-semibold text-foreground">
                                                <span>{product.action}</span>
                                                <ArrowUpRight className="h-5 w-5 shrink-0 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                                            </span>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="border-t border-border bg-muted/30 py-16 md:py-24" aria-labelledby="acquire-products-heading">
                    <div className="container-standard">
                        <div className="mb-9 max-w-3xl md:mb-12">
                            <h2 id="acquire-products-heading" className="fluid-h2 text-balance">Ready-to-acquire digital products.</h2>
                            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                                Explore packaged software and business systems available through the Mindscape shop. Each listing opens its product page for current details and acquisition options.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 md:gap-6">
                            {marketplaceProducts.map((product) => (
                                <article key={product.href} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                                    <Link
                                        href={product.href}
                                        aria-label={`View ${product.name} in the shop`}
                                        className="flex h-full flex-col rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                                    >
                                        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                                            <Image
                                                src={product.image}
                                                alt={product.imageAlt}
                                                fill
                                                sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                                            />
                                            <span className="absolute left-4 top-4 rounded-full border border-border bg-background/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm">
                                                {product.category}
                                            </span>
                                        </div>
                                        <div className="flex flex-1 flex-col p-5 sm:p-6">
                                            <h3 className="text-xl font-semibold tracking-[-0.02em] text-foreground">{product.name}</h3>
                                            <p className="mt-2 text-sm leading-6 text-muted-foreground">{product.summary}</p>
                                            <span className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-4 text-sm font-semibold text-foreground">
                                                <span>{product.price === "Request access" ? "Request access" : product.price ? `Listed at ${product.price}` : "View product details"}</span>
                                                <span className="inline-flex items-center gap-2 text-brand">
                                                    View in shop
                                                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                                                </span>
                                            </span>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>

                        <div className="mt-16 border-t border-border pt-12 md:mt-20 md:pt-16" aria-labelledby="tenvo-demo-heading">
                            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between md:mb-10">
                                <div className="max-w-3xl">
                                    <h3 id="tenvo-demo-heading" className="text-2xl font-semibold tracking-[-0.025em] text-foreground sm:text-3xl">
                                        TENVO live demo storefronts.
                                    </h3>
                                    <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                                        Browse {tenvoDemoStores.length} public, industry-specific TENVO storefronts. Open a demo to explore its live catalog and shopping experience.
                                    </p>
                                </div>
                                <span className="shrink-0 text-sm font-medium text-muted-foreground">{tenvoDemoStores.length} live stores</span>
                            </div>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6">
                                {tenvoDemoStores.map((store) => (
                                    <article key={store.slug} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                                        <Link
                                            href={`https://www.tenvo.store/store/${store.slug}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Open the ${store.name} TENVO demo store in a new tab`}
                                            className="flex h-full flex-col rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                                        >
                                            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                                                <Image
                                                    src={store.image}
                                                    alt={store.imageAlt}
                                                    fill
                                                    unoptimized
                                                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
                                                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                                                />
                                                <span className="absolute bottom-3 right-3 rounded-full border border-border bg-background/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm">
                                                    Live demo <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" aria-hidden="true" />
                                                </span>
                                            </div>
                                            <div className="flex flex-1 flex-col p-5">
                                                <h4 className="text-lg font-semibold tracking-[-0.02em] text-foreground">{store.name}</h4>
                                                <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{store.description}</p>
                                                <span className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4 mt-5 text-sm font-semibold text-foreground">
                                                    <span>Explore storefront</span>
                                                    <ArrowUpRight className="h-4 w-4 shrink-0 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                                                </span>
                                            </div>
                                        </Link>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* --- 5-Phase Methodology Section --- */}
            <section className="section-spacing border-t border-border bg-background/40 backdrop-blur-3xl relative overflow-hidden institutional-grid">
                <div className="container-standard">
                    <div className="max-w-7xl mx-auto space-y-16">
                        <div className="text-center space-y-6">
                            <h2 className="fluid-h2">5-PHASE DELIVERY FRAMEWORK</h2>
                            <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
                                We deliver more than code. Every system follows a rigorous path from inception through continuous maintenance.
                            </p>
                        </div>

                         <div className="grid lg:grid-cols-5 gap-4">
                            {deliveryPhases.map((phase, i) => (
                                <div key={phase.title} className="p-8 bg-card border border-border rounded-2xl relative group hover:bg-muted/70 transition-colors shadow-sm surface-frost">
                                    <div className="text-[10px] font-mono font-black text-foreground/20 uppercase tracking-[0.3em] mb-6">Phase_0{i + 1}</div>
                                    <phase.icon className="w-8 h-8 text-muted-foreground mb-6 group-hover:text-foreground transition-colors" />
                                    <h3 className="text-sm font-black uppercase tracking-wider leading-relaxed">{phase.title}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Managed Infrastructure Callout --- */}
            <section className="section-spacing border-t border-border bg-muted/40 text-foreground text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-transparent opacity-30" />
                <div className="container-standard">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <span className="text-meta text-muted-foreground">The Infrastructure Advantage</span>
                        <h2 className="fluid-h2">
                            AGENCIES HAND OVER RAW CODE. <br /> <span className="text-brand">WE DELIVER MANAGED PERFORMANCE.</span>
                        </h2>
                        <p className="text-lg font-medium text-muted-foreground uppercase tracking-tighter max-w-2xl mx-auto">
                            All our deployed systems are backed by monthly infrastructure management, database optimization, and security monitoring to ensure long-term reliability and scalable growth.
                        </p>
                        <Link href="/pricing" className="inline-block pt-8">
                            <button className="btn-institutional group mx-auto">
                                <span className="relative z-10 flex items-center justify-center gap-4">
                                    View Pricing & SLAs
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
