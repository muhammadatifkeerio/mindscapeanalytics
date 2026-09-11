"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Brain, Cpu, Database, Cloud, Code, Shield, Network, Zap, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TechIcon = ({ name, iconSlug, fallbackIcon: FallbackIcon }: { name: string; iconSlug?: string; fallbackIcon?: any }) => {
    const [imgError, setImgError] = useState(false);
    const iconUrl = iconSlug ? `https://cdn.simpleicons.org/${iconSlug}/${imgError ? '71717a' : 'ffffff'}` : null;

    if (!iconUrl || imgError) {
        return (
            <div className="w-10 h-10 rounded-lg bg-foreground/5 border border-border flex items-center justify-center group-hover:bg-foreground/10 transition-colors">
                {FallbackIcon ? (
                    <FallbackIcon className="w-5 h-5 text-foreground/40 group-hover:text-foreground/80 transition-colors" />
                ) : (
                    <span className="font-bold text-xs text-foreground/40 uppercase">
                        {name.slice(0, 2)}
                    </span>
                )}
            </div>
        );
    }

    return (
        <div className="w-10 h-10 flex items-center justify-center p-1.5 overflow-hidden">
            <img
                src={iconUrl}
                alt={name}
                className="w-full h-full object-contain opacity-40 group-hover:opacity-100 transition-all duration-300"
                onError={() => setImgError(true)}
                loading="lazy"
            />
        </div>
    );
};

type TechItem = {
    name: string;
    category: string;
    iconSlug?: string;
    fallbackIcon: any;
};

const techStackData: TechItem[] = [
    { name: "OpenAI", category: "ai", iconSlug: "openai", fallbackIcon: Brain },
    { name: "Anthropic", category: "ai", iconSlug: "anthropic", fallbackIcon: Brain },
    { name: "LangChain", category: "ai", iconSlug: undefined, fallbackIcon: Network },
    { name: "TensorFlow", category: "ai", iconSlug: "tensorflow", fallbackIcon: Cpu },
    { name: "PyTorch", category: "ai", iconSlug: "pytorch", fallbackIcon: Cpu },
    { name: "Hugging Face", category: "ai", iconSlug: "huggingface", fallbackIcon: Brain },

    { name: "PostgreSQL", category: "data", iconSlug: "postgresql", fallbackIcon: Database },
    { name: "Supabase", category: "data", iconSlug: "supabase", fallbackIcon: Database },
    { name: "Redis", category: "data", iconSlug: "redis", fallbackIcon: Zap },
    { name: "MongoDB", category: "data", iconSlug: "mongodb", fallbackIcon: Database },
    { name: "Kafka", category: "data", iconSlug: "apachekafka", fallbackIcon: Network },
    { name: "Pinecone", category: "data", iconSlug: undefined, fallbackIcon: Database },

    { name: "AWS", category: "cloud", iconSlug: "amazonaws", fallbackIcon: Cloud },
    { name: "Google Cloud", category: "cloud", iconSlug: "googlecloud", fallbackIcon: Cloud },
    { name: "Azure", category: "cloud", iconSlug: "microsoftazure", fallbackIcon: Cloud },
    { name: "Vercel", category: "cloud", iconSlug: "vercel", fallbackIcon: Globe },
    { name: "Docker", category: "cloud", iconSlug: "docker", fallbackIcon: Shield },
    { name: "Kubernetes", category: "cloud", iconSlug: "kubernetes", fallbackIcon: Shield },

    { name: "Next.js", category: "dev", iconSlug: "nextdotjs", fallbackIcon: Code },
    { name: "React", category: "dev", iconSlug: "react", fallbackIcon: Code },
    { name: "TypeScript", category: "dev", iconSlug: "typescript", fallbackIcon: Code },
    { name: "Python", category: "dev", iconSlug: "python", fallbackIcon: Code },
    { name: "Node.js", category: "dev", iconSlug: "nodedotjs", fallbackIcon: Code },
    { name: "Tailwind CSS", category: "dev", iconSlug: "tailwindcss", fallbackIcon: Code }
];

const categories = [
    { id: "all", label: "All" },
    { id: "ai", label: "AI & ML" },
    { id: "data", label: "Data" },
    { id: "cloud", label: "Cloud" },
    { id: "dev", label: "Dev" }
];

export default function TechStackShowcase() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    const filteredTech = techStackData.filter(tech => {
        const matchesCategory = activeCategory === "all" || tech.category === activeCategory;
        const matchesSearch = tech.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (!hasMounted) return null;

    return (
        <section className="w-full py-24 bg-background border-t border-border relative overflow-hidden institutional-grid">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-16 pb-12 border-b border-border">
                    <div className="text-left space-y-4">
                        <Badge variant="outline" className="bg-foreground/5 text-foreground/40 border-border px-4 py-1.5 text-[9px] tracking-[0.4em] uppercase font-black">
                            Technical_Infrastructure
                        </Badge>
                        <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tightest uppercase">
                            ELITE <span className="opacity-20">TEK STACK.</span>
                        </h2>
                        <p className="text-[11px] font-black text-foreground/30 uppercase tracking-widest leading-relaxed max-w-xl">
                            We bridge the gap between abstract intelligence and industrial-grade execution using leading technologies.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        <div className="flex bg-foreground/5 p-1 rounded-xl border border-border overflow-x-auto max-w-full">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat.id
                                            ? 'bg-foreground text-background shadow-lg'
                                            : 'text-foreground/40 hover:text-foreground hover:bg-foreground/5'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full sm:w-48 group">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-foreground/20 group-focus-within:text-foreground transition-colors" />
                            <Input
                                placeholder="FIND_NODE..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-foreground/5 border-border w-full focus:ring-0 focus:border-secondary h-11 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all text-foreground"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <AnimatePresence mode="popLayout">
                        {filteredTech.map((item) => (
                            <motion.div
                                layout
                                key={item.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="aspect-square bg-card dark:bg-[#0f0f11] border border-border rounded-2xl hover:bg-foreground/5 hover:border-secondary/30 transition-all duration-300 flex flex-col items-center justify-center gap-3 group cursor-default"
                            >
                                <TechIcon name={item.name} iconSlug={item.iconSlug} fallbackIcon={item.fallbackIcon} />
                                <span className="text-[9px] font-black uppercase text-foreground/20 group-hover:text-foreground tracking-[0.2em] transition-all text-center px-2">
                                    {item.name}
                                </span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredTech.length === 0 && (
                    <div className="text-center py-20 text-foreground/20 flex flex-col items-center gap-3">
                        <Database size={24} strokeWidth={1} />
                        <p className="text-[10px] font-black uppercase tracking-[0.3em]">No matching nodes identified.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
