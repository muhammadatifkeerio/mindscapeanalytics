import type { Metadata, Viewport } from "next";
import "./style.css";
import { CartProvider } from "@/contexts/CartContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ChatWidgetLazy } from "@/components/chat-widget-lazy";
import { fontVariables } from "@/lib/fonts";
import { SEO_CONFIG, serializeJsonLd } from "@/config/seo";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "AI & Software Development Company | Mindscape Analytics",
  description: "AI agents, workflow automation, SaaS and web apps, data platforms, and cloud infrastructure—built by Mindscape Analytics, with China sourcing through production.",
  authors: [{ name: "Mindscape Analytics", url: "https://mindscapeanalytics.com" }],
  creator: "Mindscape Analytics",
  publisher: "Mindscape Analytics",
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.BAIDU_SITE_VERIFICATION
      ? { other: { "baidu-site-verification": process.env.BAIDU_SITE_VERIFICATION } }
      : {}),
  },
  // Public marketing URLs use the verified brand domain, independently of auth/API origins.
  metadataBase: new URL(SEO_CONFIG.siteUrl),
  openGraph: {
    title: "AI & Software Development Company | Mindscape Analytics",
    description: "AI agents, workflow automation, SaaS and web apps, data platforms, and cloud infrastructure—built by Mindscape Analytics, with China sourcing through production.",
    type: "website",
    url: SEO_CONFIG.siteUrl,
    siteName: 'Mindscape Analytics',
    images: [
      {
        url: SEO_CONFIG.defaultSocialImage,
        width: 1200,
        height: 630,
        alt: 'Mindscape Analytics builds AI agents, SaaS and web apps, data platforms, cloud infrastructure, and China sourcing programs.',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mindscape Analytics | AI & Software Development",
    description: "AI agents, SaaS and web applications, cloud infrastructure, data platforms, and China sourcing through production.",
    images: [SEO_CONFIG.defaultSocialImage],
  },
  alternates: { canonical: "https://mindscapeanalytics.com/" },
  icons: {
    icon: [
      // An opaque, theme-independent mark stays legible in browser and search chrome.
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      // Keep the conventional root path explicit for browsers and search crawlers.
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
      "alternateName": "Mindscape",
      "legalName": "Mindscape Analytics LLC",
      "url": "https://mindscapeanalytics.com",
      "logo": "https://mindscapeanalytics.com/images/brand/mindscape-analytics-logo-light-2026.webp",
      "description": "An AI, data, and software company building automation, digital products, and China sourcing programs for real business operations.",
      "areaServed": [
        { "@type": "Country", "name": "United States" },
        { "@type": "Country", "name": "China" }
      ],
      "knowsAbout": [
        "AI agents and business automation",
        "Lead generation systems",
        "Data engineering and analytics",
        "Custom software and digital products",
        "Web and SaaS application development",
        "UI/UX design for web applications",
        "AI workflow and chatbot development",
        "AWS cost optimization, architecture, and deployment",
        "China sourcing and production coordination"
      ],
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
      "sameAs": ["https://www.linkedin.com/company/mindscapeanalytics/"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Mindscape Analytics Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Agents & Generative AI", "url": "https://mindscapeanalytics.com/solutions/ai-genai" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SaaS Application Development", "url": "https://mindscapeanalytics.com/solutions/enterprise-software" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UI/UX Design", "url": "https://mindscapeanalytics.com/solutions/enterprise-software#ui-ux-design" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AWS Cost Optimization, Architecture & Deployment", "url": "https://mindscapeanalytics.com/solutions/cloud-infrastructure" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "China Direct Factory Sourcing", "url": "https://mindscapeanalytics.com/china-sourcing" } }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://mindscapeanalytics.com/#website",
      "url": "https://mindscapeanalytics.com",
      "name": "Mindscape Analytics",
      "alternateName": ["Mindscape", "Mindscape Analytics LLC"],
      "description": "AI agents, data systems, software products, and China sourcing for real business operations.",
      "publisher": { "@id": "https://mindscapeanalytics.com/#organization" },
      "inLanguage": ["en-US", "zh-CN"]
    },
    {
      "@type": "Person",
      "@id": "https://mindscapeanalytics.com/#founder",
      "name": "Zeeshan Keerio",
      "jobTitle": "Lead AI Engineer & Solutions Architect",
      "description": "Founder of Mindscape Analytics and Lead AI Engineer & Solutions Architect, working across AI products, business software, data systems, and automation.",
      "url": "https://mindscapeanalytics.com/zeeshan-keerio",
      "sameAs": [
        "https://linkedin.com/in/zeeshan-keerio",
        "https://github.com/zeeshan-keerio"
      ]
    },
    {
      "@type": "SoftwareApplication",
      "name": "RSIQ Pro",
      "url": "https://rsiq.mindscapeanalytics.com/",
      "creator": { "@id": "https://mindscapeanalytics.com/#organization" },
      "description": "Market analysis and intelligent alerting for digital asset markets.",
      "applicationCategory": "FinTech AI",
      "operatingSystem": "Web-based"
    },
    {
      "@type": "SoftwareApplication",
      "name": "DBlynx",
      "description": "Data intelligence platform for natural-language database queries and analytics.",
      "applicationCategory": "AI Data Intelligence",
      "operatingSystem": "Web-based"
    },
    {
      "@type": "SoftwareApplication",
      "name": "DisposIQ",
      "url": "https://disposiq.tenvo.store/",
      "creator": { "@id": "https://mindscapeanalytics.com/#organization" },
      "description": "Bakery production and disposal automation platform with operational tracking and a planned packaging-factory sourcing pathway.",
      "applicationCategory": "Automation / ERP",
      "operatingSystem": "Web-based"
    },
    {
      "@type": "SoftwareApplication",
      "name": "TENVO",
      "url": "https://www.tenvo.store/",
      "creator": { "@id": "https://mindscapeanalytics.com/#organization" },
      "description": "Business operations platform connecting storefront, point of sale, inventory, manufacturing, and finance workflows.",
      "applicationCategory": "Enterprise SaaS",
      "operatingSystem": "Web-based"
    },
    {
      "@type": "SoftwareApplication",
      "name": "Smart Dairy & Cattle Farm Management System",
      "url": "https://cattle.mindscapeanalytics.com/",
      "creator": { "@id": "https://mindscapeanalytics.com/#organization" },
      "description": "Farm operations software for cattle records, milk production, feed, herd health, and farm performance.",
      "applicationCategory": "Agriculture Management Software",
      "operatingSystem": "Web-based"
    }
  ]
}


/**
 * SOURCE OF TRUTH KEYWORDS: RootLayout, global metadata, organization schema, theme bootstrap, CartProvider, chat widget
 * WHAT: Renders the document shell and global crawler, theme, commerce, and chat integrations.
 * WHY: Keeps site-wide identity and providers in one stable App Router boundary.
 * WHERE: Every route in the application.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} antialiased`} suppressHydrationWarning>
      <body className="font-sans" suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('mindscape-theme');var d=t==='dark';document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light'}catch(e){document.documentElement.style.colorScheme='light'}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
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
