import type { Metadata, Viewport } from "next";
import "./style.css";
import { CartProvider } from "@/contexts/CartContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ChatWidgetLazy } from "@/components/chat-widget-lazy";
import { fontVariables } from "@/lib/fonts";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Mindscape Analytics | First Agentic AI, Gen AI, Automation, SaaS & Web App Solutions",
  description: "Mindscape Analytics is the world's first Agentic AI and Gen AI solutions company. We specialize in high-performance automation, enterprise SaaS, and mission-critical web applications. Founded and lead by Zeeshan Keerio.",
  keywords: [
    "First Agentic AI Company", "Gen AI Solutions", "Agentic AI Automation",
    "RSIQ Pro", "DBlynx", "DisposIQ", "Tenvo",
    "AI Systems Engineering", "Custom Software Development", "AI Asset Shop",
    "Mindscape Analytics", "Enterprise AI Solutions",
    "Automated Sales Agents", "Scalable Cloud Infrastructure", "Expert Execution Services",
    "Zeeshan Keerio", "AI Engineer Portfolio"
  ],
  authors: [{ name: "Mindscape Analytics", url: "https://mindscapeanalytics.com" }],
  creator: "Mindscape Analytics",
  publisher: "Mindscape Analytics",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://mindscapeanalytics.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Mindscape Analytics | First Agentic AI, Gen AI & Automation Solutions",
    description: "The world's first Agentic AI and Gen AI solutions company. We architect high-performance automation, enterprise SaaS, and mission-critical web applications. Founded and lead by Zeeshan Keerio.",
    type: "website",
    url: 'https://mindscapeanalytics.com',
    siteName: 'Mindscape Analytics',
    images: [
      {
        url: 'https://mindscapeanalytics.com/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mindscape Analytics Architecture',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mindscape Analytics | First Agentic AI & Gen AI Infrastructure",
    description: "Architecting the future of automated enterprise systems. Founded by Zeeshan Keerio.",
    creator: '@mindscapeai',
    images: ['https://mindscapeanalytics.com/images/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://mindscapeanalytics.com/#organization",
      "name": "Mindscape Analytics",
      "legalName": "Mindscape Analytics",
      "foundingDate": "2025",
      "url": "https://mindscapeanalytics.com",
      "logo": "https://mindscapeanalytics.com/images/logo/mindscape-analytics.png",
      "description": "The world's first Agentic AI and Gen AI solutions company, specializing in automation architecture, enterprise SaaS, and high-performance web applications.",
      "founder": {
        "@id": "https://mindscapeanalytics.com/#founder"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Sheridan",
        "addressRegion": "WY",
        "addressCountry": "US"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-307-210-6155",
        "contactType": "customer service",
        "email": "info@mindscapeanalytics.com"
      },
      "sameAs": [
        "https://linkedin.com/company/mindscapeanalytics",
        "https://twitter.com/mindscapeai",
        "https://github.com/mindscapeai"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://mindscapeanalytics.com/#founder",
      "name": "Zeeshan Keerio",
      "jobTitle": "Founder, CEO & Lead AI Engineer",
      "description": "Founder, CEO, and Lead AI Engineer/Developer of all Mindscape Analytics products including RSIQ Pro, DBlynx, DisposIQ, and Tenvo. Expert in Agentic AI, Gen AI, and Enterprise Automation.",
      "url": "https://mindscapeanalytics.com/zeeshan-keerio",
      "sameAs": [
        "https://linkedin.com/in/zeeshan-keerio",
        "https://github.com/zeeshan-keerio"
      ]
    },
    {
      "@type": "SoftwareApplication",
      "name": "RSIQ Pro",
      "description": "First Agentic AI for institutional-grade market analysis and intelligent alerting.",
      "applicationCategory": "FinTech AI",
      "operatingSystem": "Web-based"
    },
    {
      "@type": "SoftwareApplication",
      "name": "DBlynx",
      "description": "Agentic AI platform for autonomous data analysis and Natural Language Querying (NLQ).",
      "applicationCategory": "AI Data Intelligence",
      "operatingSystem": "Web-based"
    },
    {
      "@type": "SoftwareApplication",
      "name": "DisposIQ",
      "description": "Agentic AI for intelligent industrial asset disposal and lifecycle management.",
      "applicationCategory": "Automation / ERP",
      "operatingSystem": "Web-based"
    },
    {
      "@type": "SoftwareApplication",
      "name": "Tenvo",
      "description": "Enterprise-grade Agentic AI framework for scalable SaaS and high-performance applications.",
      "applicationCategory": "Enterprise SaaS",
      "operatingSystem": "Web-based"
    }
  ]
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} antialiased dark`} suppressHydrationWarning>
      <body className="font-sans" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CartProvider>
          {children}
          <ChatWidgetLazy />
          {process.env.VERCEL && <SpeedInsights />}
        </CartProvider>
      </body>
    </html>
  );
}