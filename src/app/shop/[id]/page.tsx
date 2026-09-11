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
import Image from "next/image";
import { asStringList } from "@/lib/json-list";
import * as productService from "@/services/product.service";

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

            <main className="pt-44 pb-32 px-6">
                <div className="max-w-[1400px] mx-auto">
                    {/* Navigation */}
                    <div className="mb-12">
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-3 text-foreground/40 hover:text-foreground transition-all group text-[10px] font-black uppercase tracking-[0.4em]"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Market
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                        <div className="space-y-8">
                            <ProductGallery images={product.images} name={product.name} />

                            {/* Tech Stack Overlay */}
                            <div className="grid grid-cols-2 gap-4">
                                {techStack.map((tech: string, i: number) => (
                                    <div key={i} className="px-6 py-4 bg-foreground/[0.02] border border-border rounded-2xl flex items-center gap-4 group hover:border-foreground/20 transition-all">
                                        <Code size={16} className="text-foreground/20 group-hover:text-foreground transition-colors" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40 group-hover:text-foreground transition-colors">{tech}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Acquisition Interface */}
                        <div className="space-y-12 lg:sticky lg:top-32">
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="px-4 py-1.5 bg-foreground/5 border border-border rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-foreground/40">
                                        {product.category.replace(/_/g, ' ')}
                                    </span>
                                    <div className="w-px h-4 bg-foreground/10" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-foreground/20">Archived ID: #{product.id.slice(-6)}</span>
                                </div>
                                <h1
                                    className="text-6xl md:text-7xl font-black mb-8 tracking-tightest leading-[0.9] uppercase"
                                    style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
                                >
                                    {product.name}
                                </h1>
                                <p className="text-foreground/40 text-lg md:text-xl font-medium leading-relaxed border-l-2 border-border pl-8">
                                    {product.description || "Elite architectural primitive engineered for high-tier deployments."}
                                </p>
                            </div>

                            {/* Key Features Protocol */}
                            <div className="bg-foreground/[0.02] border border-border rounded-[2.5rem] p-10 space-y-6">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/20 mb-4 px-2">Key Specifications</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {features.map((feature: string, i: number) => (
                                        <div key={i} className="flex gap-4 items-start group">
                                            <CheckCircle2 size={16} className="text-foreground/20 mt-0.5 group-hover:text-foreground transition-colors" />
                                            <span className="text-[11px] font-bold uppercase tracking-widest text-foreground/40 leading-relaxed group-hover:text-foreground/80 transition-colors">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Price & Primary CTA Wrapper */}
                            <div className="bg-foreground/5 border border-border rounded-[3rem] p-12 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-12 opacity-[0.02]">
                                    <ShieldCheck size={200} strokeWidth={0.5} />
                                </div>

                                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-foreground/20 mb-2 block">Institutional Value</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl font-black tracking-tighter">${product.price}</span>
                                            <span className="text-foreground/20 text-xs font-bold uppercase">USD</span>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-[350px]">
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
                            <div className="flex items-center gap-6 p-8 bg-foreground/[0.02] border border-border rounded-[2rem] group hover:border-border transition-all">
                                <div className="w-16 h-16 rounded-2xl bg-foreground/5 border border-border overflow-hidden flex-shrink-0">
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
                                <div>
                                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-foreground/20 mb-1 block">Certified Architect</span>
                                    <h4 className="text-xl font-bold uppercase tracking-tight group-hover:text-foreground transition-colors">{product.seller?.storeName || product.seller?.name || "System Core"}</h4>
                                </div>
                                <div className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-foreground/5 rounded-full border border-border">
                                    <Activity size={10} className="text-green-500 animate-pulse" />
                                    <span className="text-[8px] font-black uppercase tracking-widest text-foreground/40">Active</span>
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
