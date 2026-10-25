"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, Calendar, Globe, ChevronDown, MessageCircle } from "lucide-react";
import { LinkedinIcon } from "@/components/icons/brand-icons";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "@/components/SmartImage";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WechatNumber from "@/components/WechatNumber";
import { contactFormSchema } from "@/lib/types";

const contactInfo = [
    {
        icon: Mail,
        title: "Email",
        value: "info@mindscapeanalytics.com",
        link: "mailto:info@mindscapeanalytics.com",
        description: "For project questions, partnerships, and general inquiries."
    },
    {
        icon: MessageCircle,
        title: "🇺🇸 Message us on WhatsApp",
        value: "+1 (307) 210-6155",
        link: "https://wa.me/13072106155",
        description: "Contact our US team directly by phone or WhatsApp."
    },
    {
        icon: LinkedinIcon,
        title: "LinkedIn",
        value: "Mindscape Analytics",
        link: "https://www.linkedin.com/company/mindscapeanalytics/",
        description: "Follow Mindscape Analytics and connect with our team."
    },
    {
        icon: Calendar,
        title: "Book a strategy call",
        value: "Schedule Now",
        link: "#contact-chat",
        description: "Open a conversation with our team and tell us what you are building."
    },
    {
        icon: Globe,
        title: "Our website",
        value: "mindscapeanalytics.com",
        link: "https://mindscapeanalytics.com",
        description: "Explore our services, products, and project portfolio."
    }
];

const officeLocations = [
    { code: "US", flag: "🇺🇸", country: "United States", city: "Sheridan, Wyoming", address: "30 N Gould St, Suite R · Sheridan, WY 82801", phone: "+1 307 210 6155", href: "tel:+13072106155", pin: { left: "20.3%", top: "25.1%" } },
    { code: "PK", flag: "🇵🇰", country: "Pakistan", city: "Karachi", address: "Pearl Building · Bahria Town, Karachi", phone: "+92 307 210 6155", href: "tel:+923072106155", pin: { left: "68.6%", top: "36.2%" } },
    { code: "CN", flag: "🇨🇳", country: "China", city: "Beijing", address: "Beijing · China sourcing network", phone: "+86 178 0226 7424", href: "tel:+8617802267424", pin: { left: "82.3%", top: "27.8%" } },
];

const faqs = [
    {
        question: "What can Mindscape help us build?",
        answer: "Our work includes AI agents and automation, business and farm-management software, data systems, cloud architecture, and product sourcing. Tell us about your goals and we will help identify a suitable next step."
    },
    {
        question: "What happens after I send an inquiry?",
        answer: "The team reviews the information you share and follows up using your email. You can also call one of our offices directly."
    },
    {
        question: "Can you support a product after launch?",
        answer: "Ongoing support, maintenance, and monitoring can be discussed and included in a project scope where needed."
    },
    {
        question: "Can you work with our security and compliance requirements?",
        answer: "Share your requirements during the initial conversation. We can review them with you and confirm what is in scope before work begins."
    }
];

export default function ContactPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-muted-foreground">Loading contact options…</div>
            </div>
        }>
            <ContactFormContent />
        </Suspense>
    );
}

function ContactFormContent() {
    const searchParams = useSearchParams();
    const plan = searchParams.get('plan');

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        service: plan || "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validation = contactFormSchema.safeParse(formData);
        if (!validation.success) {
            setError(validation.error.issues[0]?.message ?? "Please check the form and try again.");
            return;
        }
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(validation.data),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error?.message || 'Failed to send message.');
            }

            setIsSubmitting(false);
            setIsSubmitted(true);

        } catch (err) {
            console.error('Submission error:', err);
            setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
            setIsSubmitting(false);
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="min-h-screen bg-background text-foreground relative">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-44 pb-32 overflow-hidden institutional-grid">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-foreground/[0.03] to-transparent pointer-events-none" />
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-foreground/[0.02] blur-[150px] rounded-full pointer-events-none" />

                <div className="container-standard relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h1 className="fluid-h1 mb-8">
                            Tell us what you’re looking to build.
                        </h1>
                        <p className="fluid-body max-w-4xl mx-auto text-foreground/70 font-medium tracking-tight">
                            Share a few details and our team will get back to you. Prefer to speak directly? Choose one of our office numbers below.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="section-spacing bg-transparent">
                <div className="container-standard">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={info.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                {info.title === "Book a strategy call" ? (
                                  <button
                                    type="button"
                                    onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
                                    aria-label="Start a conversation with the Mindscape Analytics team"
                                    className="block h-full w-full text-left transition-all duration-300 hover:-translate-y-0.5"
                                  >
                                  <div className="h-full p-8 rounded-2xl bg-card border border-border hover:border-brand/35 transition-all duration-300 group shadow-sm surface-frost">
                                    <div className="mb-6 w-12 h-12 rounded-xl bg-muted border border-border flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all duration-300"><info.icon className="h-6 w-6" /></div>
                                    <h3 className="text-meta mb-2">Start a conversation</h3>
                                    <p className="text-lg font-bold text-foreground mb-4 leading-tight">Chat with our team</p>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{info.description}</p>
                                  </div>
                                  </button>
                                ) : (
                                <a
                                    href={info.link}
                                    target={info.link.startsWith('http') ? '_blank' : undefined}
                                    rel={info.link.startsWith('http') ? 'noreferrer' : undefined}
                                    className="block h-full transition-all duration-300 transform hover:scale-[1.02]"
                                >
                    <div className="h-full p-8 rounded-2xl bg-card border border-border hover:border-brand/35 transition-all duration-300 group shadow-sm surface-frost">
                                        <div className="mb-6 w-12 h-12 rounded-xl bg-muted border border-border flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all duration-300">
                                            <info.icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-meta mb-2">{info.title}</h3>
                                        <p className="text-lg font-bold text-foreground mb-4 leading-tight">{info.value}</p>
                                        <p className="text-muted-foreground text-sm leading-relaxed">{info.description}</p>
                                    </div>
                                </a>
                                )}
                            </motion.div>
                        ))}
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: contactInfo.length * 0.1 }}
                            className="h-full rounded-2xl border border-border bg-card p-8 shadow-sm surface-frost"
                        >
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-muted text-foreground">
                                <MessageCircle className="h-6 w-6" aria-hidden="true" />
                            </div>
                            <h3 className="text-meta mb-2">🇨🇳 WeChat</h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">Find our China team in WeChat using this phone number.</p>
                            <WechatNumber />
                        </motion.article>
                    </div>
                </div>
            </section>

            <section className="container-standard pb-16 md:pb-24" aria-labelledby="global-offices-heading">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div><p className="text-xs font-semibold uppercase tracking-[.16em] text-brand">Global presence</p><h2 id="global-offices-heading" className="mt-3 font-heading text-3xl font-semibold tracking-[-.035em] sm:text-4xl">Reach our teams in three locations</h2></div>
                    <p className="max-w-lg text-sm leading-6 text-muted-foreground">Reach our US, Pakistan, or China teams directly. The map marks Sheridan, Karachi, and Beijing.</p>
                </div>

                <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr] lg:items-stretch">
                    <div className="relative min-h-[260px] overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-sm sm:min-h-[360px] sm:p-5" role="img" aria-label="World map showing Mindscape Analytics offices in Sheridan, Wyoming; Karachi, Pakistan; and Beijing, China">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_68%_34%,hsl(var(--brand)/.09),transparent_42%)]" />
                        <svg viewBox="0 0 900 420" className="absolute inset-0 h-full w-full text-foreground" fill="none" aria-hidden="true">
                            <defs><pattern id="office-map-grid" width="45" height="45" patternUnits="userSpaceOnUse"><path d="M45 0H0V45" fill="none" stroke="currentColor" strokeOpacity=".045" strokeWidth="1" /></pattern></defs>
                            <rect width="900" height="420" fill="url(#office-map-grid)" />
                            <g fill="currentColor" fillOpacity=".075" stroke="currentColor" strokeOpacity=".14" strokeWidth="1.5" strokeLinejoin="round">
                                <path d="M75 84 112 61 153 67 176 53 215 62 238 81 267 88 279 112 258 130 247 154 224 163 213 191 186 203 171 190 152 196 140 177 119 171 111 150 91 141 82 119 62 111Z" />
                                <path d="M226 207 253 214 269 234 263 258 277 279 266 304 253 330 240 359 227 342 221 316 209 291 211 263 199 242 205 222Z" />
                                <path d="M398 91 425 77 450 82 467 96 454 110 431 112 418 128 398 119Z" />
                                <path d="M424 132 458 118 489 130 505 157 494 184 481 210 468 239 450 226 443 199 427 179 417 157Z" />
                                <path d="M482 82 519 62 566 68 587 57 629 66 656 79 702 75 727 91 766 89 803 108 796 129 762 136 738 151 700 147 678 166 647 160 626 175 596 169 576 150 548 150 528 134 501 135 485 116Z" />
                                <path d="M714 258 748 245 780 254 799 274 787 297 758 306 731 292Z" />
                                <path d="M824 189 840 178 850 193 844 214 829 217Z" />
                            </g>
                            <path d="M183 106Q458 21 746 112" stroke="currentColor" strokeOpacity=".17" strokeWidth="1.5" strokeDasharray="4 7" />
                        </svg>
                        {officeLocations.map((office) => <div key={office.code} className="absolute z-10 -translate-x-1/2 -translate-y-1/2" style={office.pin} aria-hidden="true"><span className="absolute -inset-2 animate-ping rounded-full bg-brand/20 motion-reduce:animate-none" /><span className="relative grid h-7 min-w-7 place-items-center rounded-full border-2 border-background bg-brand px-1 text-[9px] font-bold text-white shadow-md">{office.code}</span></div>)}
                        <div className="absolute bottom-4 left-4 rounded-lg border border-border bg-background/95 px-3 py-2 text-xs font-medium text-muted-foreground shadow-sm sm:bottom-5 sm:left-5"><MapPin className="mr-1.5 inline h-3.5 w-3.5 text-brand" /> Offices across North America and Asia</div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                        {officeLocations.map((office) => <article key={office.code} className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                            <div className="flex items-start justify-between gap-4"><div className="flex items-center gap-3"><span className="text-xl" role="img" aria-label={`${office.country} flag`}>{office.flag}</span><div><h3 className="font-semibold">{office.city}</h3><p className="text-xs text-muted-foreground">{office.country}</p></div></div><MapPin className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden="true" /></div>
                            <p className="mt-3 text-xs leading-5 text-muted-foreground">{office.address}</p>
                            <a href={office.href} className="mt-3 inline-flex min-h-9 items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-brand"><Phone className="h-3.5 w-3.5 text-brand" />{office.phone}</a>
                        </article>)}
                    </div>
                </div>
            </section>

            {/* WhatsApp QR & Connection Matrix */}
            <section className="section-spacing bg-transparent">
                <div className="container-standard">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-7xl mx-auto rounded-3xl border border-border bg-card overflow-hidden shadow-sm"
                    >
                        <div className="p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-12 bg-card">
                            <div className="w-full md:w-1/3 flex justify-center">
                                <div className="p-4 rounded-2xl bg-background shadow-sm border border-border">
                                    <div className="relative w-48 h-48 md:w-64 md:h-64">
                                        <Image
                                            src="/images/whatsapp-qr.png"
                                            alt="WhatsApp Connection Protocol"
                                            fill
                                            sizes="(max-width: 767px) 192px, 256px"
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-2/3 space-y-6">
                                <h3 className="fluid-h2">
                                    Message our team on WhatsApp
                                </h3>
                                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                                    Prefer messaging? Start a WhatsApp conversation with our US office.
                                </p>
                                <div className="flex flex-wrap gap-4 pt-4">
                                    <Button size="lg" className="btn-institutional px-8" asChild>
                                        <a href="https://wa.me/13072106155" target="_blank" rel="noreferrer">Open WhatsApp</a>
                                    </Button>
                                    <div className="flex items-center gap-3 px-6 py-2 rounded-full border border-border bg-muted/60">
                                        <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                                        <span className="text-meta">WhatsApp contact</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="section-spacing bg-transparent border-t border-border">
                <div className="container-standard">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-12"
                        >
                            <div>
                                <h2 className="fluid-h2 mb-6">
                                    SEND <span className="opacity-30">SIGNAL.</span>
                                </h2>
                                <p className="text-xl text-foreground/50 font-medium leading-relaxed max-w-lg">
                                    Initialize connection with our global hub. Our architects respond within one standard operational cycle.
                                </p>
                            </div>

                            {/* FAQ Section Integrated into Sidebar */}
                            <div className="space-y-8 pt-8">
                                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-foreground/20">FREQUENTLY ASKED PROTOCOLS</h3>
                                <Accordion type="single" collapsible className="w-full">
                                    {faqs.map((faq, index) => (
                                        <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                                            <AccordionTrigger className="text-sm font-bold uppercase tracking-widest hover:text-foreground text-foreground/60 hover:no-underline py-4">
                                                {faq.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-foreground/40 text-sm leading-relaxed pb-6">
                                                {faq.answer}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                                    <Card className="bg-card border-border rounded-3xl overflow-hidden surface-frost relative group/form shadow-sm">
                                {/* Console Scanline */}
                                <motion.div 
                                    animate={{ y: ["-100%", "400%"] }} 
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-secondary/10 to-transparent z-0 opacity-30 pointer-events-none"
                                />
                                <CardContent className="p-8 md:p-12 relative z-10">
                                    {isSubmitted ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-20"
                                        >
                                            <div className="w-20 h-20 rounded-full bg-foreground/5 border border-border flex items-center justify-center mx-auto mb-8">
                                                <CheckCircle2 className="h-10 w-10 text-foreground animate-pulse" />
                                            </div>
                                            <h3 className="text-3xl font-black tracking-tight mb-4">Thanks for reaching out.</h3>
                                            <p className="text-muted-foreground font-medium">
                                                Your message has been received. We’ll follow up using the email address you provided.
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-8">
                                            {/* Form fields with improved styling */}
                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-4">
                                                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                                                    Your name
                                                    </label>
                                                    <Input
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        autoComplete="name"
                                                        maxLength={120}
                                                        required
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        className="h-14 bg-background/80 border-border focus:border-secondary focus:ring-2 focus:ring-secondary/10 text-base text-foreground placeholder:text-foreground/40 rounded-xl transition-all duration-300"
                                                        placeholder="Name"
                                                    />
                                                </div>
                                                <div className="space-y-4">
                                                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                                    Work email
                                                    </label>
                                                    <Input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        autoComplete="email"
                                                        maxLength={254}
                                                        required
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                className="h-14 bg-background border-border focus:border-brand focus:ring-2 focus:ring-brand/10 text-base text-foreground placeholder:text-muted-foreground rounded-xl transition-all duration-300"
                                                        placeholder="you@company.com"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-4">
                                                <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                                                    Company <span className="font-normal normal-case text-muted-foreground">(optional)</span>
                                                    </label>
                                                    <Input
                                                        id="company"
                                                        name="company"
                                                        type="text"
                                                        autoComplete="organization"
                                                        maxLength={160}
                                                        value={formData.company}
                                                        onChange={handleChange}
                                                        className="h-14 bg-background border-border focus:border-brand focus:ring-1 focus:ring-brand/20 text-base text-foreground placeholder:text-muted-foreground rounded-xl transition-all duration-300"
                                                        placeholder="Company name"
                                                    />
                                                </div>
                                                <div className="space-y-4">
                                                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                                                    Phone <span className="font-normal normal-case text-muted-foreground">(optional)</span>
                                                    </label>
                                                    <Input
                                                        id="phone"
                                                        name="phone"
                                                        type="tel"
                                                        autoComplete="tel"
                                                        maxLength={40}
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        className="h-14 bg-background border-border focus:border-brand focus:ring-1 focus:ring-brand/20 text-base text-foreground placeholder:text-muted-foreground rounded-xl transition-all duration-300"
                                                        placeholder="Include your country code"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                                                    What do you need help with?
                                                </label>
                                                <div className="relative group">
                                                    <select
                                                        id="service"
                                                        name="service"
                                                        value={formData.service}
                                                        onChange={handleChange}
                                                        className="w-full h-14 rounded-xl border border-border bg-background px-4 text-base text-foreground focus:border-brand focus:ring-1 focus:ring-brand/20 focus:outline-none transition-all appearance-none cursor-pointer"
                                                    >
                                                        <option value="" className="bg-background text-foreground">Select a service</option>
                                                        <option value="ai-automation" className="bg-background text-foreground">AI agents and automation</option>
                                                        <option value="software-development" className="bg-background text-foreground">Software or digital product</option>
                                                        <option value="data-cloud" className="bg-background text-foreground">Data systems or cloud architecture</option>
                                                        <option value="farm-management" className="bg-background text-foreground">Farm management software</option>
                                                        <option value="china-sourcing" className="bg-background text-foreground">China sourcing and production</option>
                                                        <option value="digital-supplier-shortlist" className="bg-background text-foreground">$299 digital supplier shortlist</option>
                                                        <option value="supplier-verification-report" className="bg-background text-foreground">$199 supplier verification report</option>
                                                        <option value="factory-sample-inspection" className="bg-background text-foreground">$349 factory or sample inspection</option>
                                                        <option value="expanded-factory-ev-inspection" className="bg-background text-foreground">$499 expanded factory or EV inspection</option>
                                                        <option value="tianjin-beijing-inspection" className="bg-background text-foreground">Tianjin or Beijing inspection</option>
                                                        <option value="qc-procurement-retainer" className="bg-background text-foreground">QC and procurement retainer</option>
                                                        <option value="china-go-global" className="bg-background text-foreground">中国企业出海 / China go-global</option>
                                                        <option value="other" className="bg-background text-foreground">Something else</option>
                                                    </select>
                                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 pointer-events-none group-focus-within:text-secondary transition-colors" />
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                                                    Tell us a little about the project
                                                </label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    required
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    rows={5}
                                                    className="w-full rounded-xl border border-border bg-background px-4 py-4 text-base text-foreground focus:border-brand focus:ring-1 focus:ring-brand/20 focus:outline-none transition-all resize-none placeholder:text-muted-foreground duration-300"
                                                    placeholder="What are you trying to improve or build? Mention any current tools or key requirements."
                                                />
                                            </div>

                                            {error && (
                                                <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                                                    {error}
                                                </p>
                                            )}

                                             <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="group relative w-full h-16 rounded-xl bg-brand text-white font-semibold tracking-[0.08em] overflow-hidden transition-all hover:bg-brand-deep hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                                <span className="relative flex items-center justify-center gap-4">
                                                {isSubmitting ? "Sending…" : (
                                                        <>
                                                            Send inquiry
                                                            <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                        </>
                                                    )}
                                                </span>
                                            </button>
                                        </form>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

