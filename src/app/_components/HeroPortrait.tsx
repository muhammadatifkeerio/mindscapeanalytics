import Image from "@/components/SmartImage";

/**
 * SOURCE OF TRUTH KEYWORDS: HeroPortrait, original portrait, static fallback, hero image, responsive sizing, brand visual
 * WHAT: Renders the original portrait with its established responsive fade.
 * WHY: Preserves the face and hair until a verified strand-motion asset is available.
 * WHERE: Homepage hero portrait column.
 */
export default function HeroPortrait() {
    return <Image src="/images/hero/mindscape-intelligence-2026.webp" alt="An ethereal AI portrait visualizing connected intelligence" width={1024} height={1536} priority sizes="(max-width: 639px) 76vw, (max-width: 1023px) 50vw, 42vw" className="hero-portrait-image block h-full w-auto max-w-full object-contain object-bottom mix-blend-multiply dark:mix-blend-screen" />;
}
