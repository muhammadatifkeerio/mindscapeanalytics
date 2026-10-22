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
      {
        // The Vercel project alias is a deployment address, not a public brand URL.
        source: "/:path*",
        has: [{ type: "host", value: "mindscapeanalytics.vercel.app" }],
        destination: "https://mindscapeanalytics.com/:path*",
        permanent: true,
      },
      {
        // Keep www requests on the same apex canonical if they reach the app.
        source: "/:path*",
        has: [{ type: "host", value: "www.mindscapeanalytics.com" }],
        destination: "https://mindscapeanalytics.com/:path*",
        permanent: true,
      },
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
    ];
  },
};

export default nextConfig;
