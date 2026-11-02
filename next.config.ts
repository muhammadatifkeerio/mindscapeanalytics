import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "files.stripe.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "recharts",
      "better-auth",
      "clsx",
      "tailwind-merge",
    ],
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  async redirects() {
    return [
      /**
       * SOURCE OF TRUTH KEYWORDS: legacy case study redirects, unsupported project claims, portfolio paths, sitemap cleanup, permanent redirect
       * WHAT: Moves legacy case-study URLs with unverified client-result claims to the verified product portfolio.
       * WHY: Prevents unsupported case-study claims from remaining publicly accessible while preserving useful inbound links.
       * WHERE: Next.js production redirects for retired /projects/[slug] case-study paths.
       */
      ...[
        "global-enterprise-erp",
        "automated-inventory-system",
        "production-esg-intelligence",
        "dblynx-neural-intelligence",
        "ai-sales-agent",
        "dblynx-regional-bank",
        "fuel-station-erp",
      ].map((slug) => ({
        source: `/projects/${slug}`,
        destination: "/projects",
        permanent: true,
      })),
      {
        // Preserve old logo URLs while consolidating image discovery on the current brand asset.
        source: "/images/logo/mindscape-analytics.png",
        destination: "/images/brand/mindscape-analytics-logo-light-2026.webp",
        permanent: true,
      },
      {
        source: "/founder/zeeshan-keerio",
        destination: "/zeeshan-keerio",
        permanent: true,
      },
      {
        // Consolidate the former sourcing route on the expanded canonical service page.
        source: "/china-sourcing",
        destination: "/services/china-sourcing",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
