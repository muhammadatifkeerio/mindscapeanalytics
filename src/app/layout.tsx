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
  title: "AI, Data & Software for Real Operations | Mindscape Analytics",
  description: "Mindscape Analytics builds AI agents, business software, farm management systems, and data platforms, and helps bring products from China sourcing to production.",
  keywords: [
    "AI Agents", "Gen AI Solutions", "Agentic AI Automation",
    "RSIQ Pro", "DBlynx", "DisposIQ", "Tenvo",
    "AI Systems Engineering", "Custom Software Development", "AI Asset Shop",
    "Mindscape Analytics", "Enterprise AI Solutions",
    "Automated Sales Agents", "Scalable Cloud Infrastructure", "Expert Execution Services",
    "Zeeshan Keerio", "AI Engineer Portfolio"
  ],
  authors: [{ name: "Mindscape Analytics", url: "https://mindscapeanalytics.com" }],
  creator: "Mindscape Analytics",
  publisher: "Mindscape Analytics",
  // Public marketing URLs use the verified brand domain, independently of auth/API origins.
  metadataBase: new URL('https://mindscapeanalytics.com'),
  openGraph: {
    title: "AI, Data & Software for Real Operations | Mindscape Analytics",
    description: "AI agents, business software, farm management systems, data platforms, and product sourcing built around real operating needs.",
    type: "website",
    url: 'https://mindscapeanalytics.com',
    siteName: 'Mindscape Analytics',
    images: [
      {
        url: '/images/og-mindscape-2026.png',
        alt: 'Mindscape Analytics: turning data into smart decisions with AI, analytics, automation, and custom software.',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mindscape Analytics | AI, Data, Products & Production",
    description: "Build the intelligent system your next stage needs.",
    images: ['/images/og-mindscape-2026.png'],
  },
  icons: {
    icon: '/images/brand/mindscape-icon-light.png',
    apple: '/images/brand/mindscape-icon-light.png',
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
      "logo": "https://mindscapeanalytics.com/images/brand/mindscape-analytics-logo.webp",
      "description": "An AI, data, and product company building autonomous automation, enterprise software, and factory-direct sourcing programs.",
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
      "sameAs": ["https://www.linkedin.com/company/mindscapeanalytics/"]
    },
    {
      "@type": "Person",
      "@id": "https://mindscapeanalytics.com/#founder",
      "name": "Zeeshan Keerio",
      "jobTitle": "Founder & Lead AI Engineer",
      "description": "Founder and Lead AI Engineer at Mindscape Analytics, working across AI products, business software, data systems, and automation.",
      "url": "https://mindscapeanalytics.com/zeeshan-keerio",
      "sameAs": [
        "https://linkedin.com/in/zeeshan-keerio",
        "https://github.com/zeeshan-keerio"
      ]
    },
    {
      "@type": "SoftwareApplication",
      "name": "RSIQ Pro",
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
      "description": "Production and disposal operations platform for tracking activity and operational insights.",
      "applicationCategory": "Automation / ERP",
      "operatingSystem": "Web-based"
    },
    {
      "@type": "SoftwareApplication",
      "name": "Tenvo",
      "description": "Business operations platform connecting storefront, point of sale, inventory, and business workflows.",
      "applicationCategory": "Enterprise SaaS",
      "operatingSystem": "Web-based"
    },
    {
      "@type": "SoftwareApplication",
      "name": "Smart Dairy & Cattle Farm Management System",
      "description": "Farm operations software for cattle records, milk production, feed, herd health, and farm performance.",
      "applicationCategory": "Agriculture Management Software",
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
    <html lang="en" className={`${fontVariables} antialiased`} suppressHydrationWarning>
      <body className="font-sans" suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('mindscape-theme');var d=t==='dark';document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';var icons=document.querySelectorAll('link[rel~="icon"]');for(var i=0;i<icons.length;i++){icons[i].href=d?'/images/brand/mindscape-icon-dark.png':'/images/brand/mindscape-icon-light.png'}}catch(e){document.documentElement.style.colorScheme='light'}})();`,
          }}
        />
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
