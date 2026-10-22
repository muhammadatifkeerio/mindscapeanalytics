import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetailsClient from "@/components/shop/ProductDetailsClient";
import ProductGallery from "@/components/shop/ProductGallery";
import {
    ShieldCheck,
    Zap,
    Box,
    Cpu,
    Globe,
    ArrowLeft,
    CheckCircle2,
    Database,
    Code,
    Activity
} from "lucide-react";
import Link from "next/link";
import Image from "@/components/SmartImage";
import { asStringList } from "@/lib/json-list";
import * as productService from "@/services/product.service";

/** SOURCE OF TRUTH KEYWORDS: product metadata, canonical, productService, Open Graph, shop
 * WHAT: Loads approved product details for route-specific search and share metadata.
 * WHY: Product pages need accurate titles, availability, canonical paths, and previews.
 * WHERE: Next.js metadata generation for /shop/[id].
 */
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const product = await productService.getById(id);
    if (!product) notFound();

    const description = product.description || `Explore ${product.name}, available from the Mindscape Analytics digital product shop.`;
    const image = product.images[0]?.url || "/images/og-mindscape-2026.png";

    return {
        title: `${product.name} | Mindscape Analytics Shop`,
        description,
        alternates: { canonical: `/shop/${id}` },
        robots: product.approvedForSale ? { index: true, follow: true } : { index: false, follow: false },
        openGraph: {
            title: `${product.name} | Mindscape Analytics Shop`,
            description,
            url: `https://www.mindscapeanalytics.com/shop/${id}`,
            type: "website",
            images: [{ url: image, alt: product.name }],
        },
        twitter: { card: "summary_large_image", title: product.name, description, images: [image] },
    };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const product = await productService.getById(id);

    if (!product) {
        notFound();
    }

    const parsedStack = asStringList(product.techStack);
    const techStack = parsedStack.length > 0 ? parsedStack : ["Enterprise AI", "Cloud Native", "Secure Scalability"];
    const parsedFeatures = asStringList(product.features);
    const features = parsedFeatures.length > 0 ? parsedFeatures : [
        "High-performance architecture",
        "Industrial-grade security",
        "Seamless API integration",
        "Optimized for global scale"
    ];

    return (
        <div className="min-h-screen bg-transparent text-foreground selection:bg-foreground selection:text-background">
            <Navbar />

            <main className="px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36 lg:pb-32 lg:pt-44">
                <div className="mx-auto max-w-[1400px]">
                    {/* Navigation */}
                    <div className="mb-7 sm:mb-12">
                        <Link
                            href="/shop"
                            className="inline-flex min-h-11 items-center gap-3 text-sm font-medium text-muted-foreground transition-colors group hover:text-foreground"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Market
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-16 xl:gap-20">
                        <div className="space-y-5 sm:space-y-8">
                            <ProductGallery images={product.images} name={product.name} />

                            {/* Tech Stack Overlay */}
                            <div className="grid grid-cols-2 gap-2 sm:gap-4">
                                {techStack.map((tech: string, i: number) => (
                                    <div key={i} className="flex min-w-0 items-center gap-2 rounded-xl border border-border bg-card px-3 py-3 shadow-sm transition-colors group hover:border-brand/35 sm:gap-4 sm:rounded-2xl sm:px-6 sm:py-4">
                                        <Code size={16} className="shrink-0 text-muted-foreground transition-colors group-hover:text-brand" />
                                        <span className="break-words text-xs font-medium text-foreground transition-colors group-hover:text-brand">{tech}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Acquisition Interface */}
                        <div className="space-y-7 sm:space-y-10 lg:sticky lg:top-32 lg:space-y-12">
                            <div>
                                <div className="mb-4 flex flex-wrap items-center gap-2 sm:mb-6 sm:gap-4">
                                    <span className="rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-semibold capitalize text-muted-foreground sm:px-4 sm:text-sm">
                                        {product.category.replace(/_/g, ' ')}
                                    </span>
                                    <span className="text-xs text-muted-foreground sm:text-sm">Product ID: #{product.id.slice(-6)}</span>
                                </div>
                                <h1
                                    className="mb-5 break-words text-[clamp(2.25rem,10vw,4.5rem)] font-bold leading-[.98] tracking-tight sm:mb-8 sm:text-[clamp(3rem,6vw,6rem)]"
                                >
                                    {product.name}
                                </h1>
                                <p className="border-l-2 border-brand/35 pl-4 text-base leading-7 text-muted-foreground sm:pl-6 sm:text-lg sm:leading-relaxed md:text-xl">
                                    {product.description || "Elite architectural primitive engineered for high-tier deployments."}
                                </p>
                            </div>

                            {/* Key Features Protocol */}
                            <div className="space-y-5 rounded-2xl border border-border bg-card p-4 shadow-sm sm:space-y-6 sm:rounded-3xl sm:p-8">
                                <h3 className="px-1 text-sm font-semibold text-foreground sm:mb-4 sm:px-2">Key specifications</h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                                    {features.map((feature: string, i: number) => (
                                        <div key={i} className="flex gap-4 items-start group">
                                            <CheckCircle2 size={16} className="text-brand mt-0.5" />
                                            <span className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Price & Primary CTA Wrapper */}
                            <div className="relative overflow-hidden rounded-2xl border border-border bg-muted/70 p-4 sm:rounded-3xl sm:p-8 lg:p-10">
                                <div className="absolute top-0 right-0 p-12 opacity-[0.02]">
                                    <ShieldCheck size={200} strokeWidth={0.5} />
                                </div>

                                <div className="relative z-10 flex flex-col items-stretch justify-between gap-6 sm:gap-8 md:flex-row md:items-center">
                                    <div>
                                        <span className="mb-2 block text-sm font-medium text-muted-foreground">{product.category === "request_access" ? "Availability" : product.category === "trading_intelligence" ? "One-time purchase" : "Product price"}</span>
                                        <div className="flex items-baseline gap-2">
                                            {product.category === "request_access" ? <span className="text-2xl font-semibold tracking-tight sm:text-3xl">Request access</span> : <><span className="text-4xl font-bold tracking-tight sm:text-5xl">${product.price}</span><span className="text-xs font-medium uppercase text-muted-foreground">USD</span></>}
                                        </div>
                                        {product.category === "trading_intelligence" && <p className="mt-2 text-sm text-muted-foreground">Single payment. No recurring charge.</p>}
                                        {product.category === "request_access" && <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">No payment is collected here. Availability, licensing, and pricing are confirmed by our team.</p>}
                                    </div>

                                    <div className="w-full md:max-w-[350px] md:flex-1">
                                        <ProductDetailsClient
                                            product={{
                                                id: product.id,
                                                name: product.name,
                                                price: product.price,
                                                description: product.description,
                                                demoUrl: product.demoUrl,
                                                features: asStringList(product.features),
                                                techStack: asStringList(product.techStack),
                                                category: product.category,
                                                images: product.images,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Seller/Architect Context */}
                            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-colors group hover:border-brand/30 sm:gap-6 sm:p-8">
                                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-border bg-muted sm:h-16 sm:w-16 sm:rounded-2xl">
                                    {product.seller?.image ? (
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={product.seller.image}
                                                alt={product.seller.name || "Architect"}
                                                fill
                                                className="object-cover grayscale group-hover:grayscale-0 transition-all"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-foreground/10 uppercase font-black text-xl">
                                            {product.seller?.name?.[0] || product.seller?.storeName?.[0] || 'A'}
                                        </div>
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <span className="mb-1 block text-xs font-medium text-muted-foreground">Seller</span>
                                    <h4 className="break-words text-base font-semibold leading-5 transition-colors group-hover:text-foreground sm:text-xl">{product.seller?.storeName || product.seller?.name || "System Core"}</h4>
                                </div>
                                <div className="ml-auto flex shrink-0 items-center gap-2 rounded-full border border-border bg-muted px-2.5 py-1.5 sm:px-3">
                                    <Activity size={10} className="text-green-500 animate-pulse" />
                                    <span className="text-xs font-medium text-muted-foreground">Active</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
