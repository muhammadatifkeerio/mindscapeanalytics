import Image, { type ImageProps } from "next/image";

/**
 * SOURCE OF TRUTH KEYWORDS: Local WebP delivery, image loading performance, responsive image component
 * WHAT: Delivers local and remote images through Next.js responsive optimization.
 * WHY: Serves device-appropriate dimensions and modern formats instead of loading full-size local WebP files on every screen.
 * WHERE: Shared image component used across public and application surfaces.
 */
export default function SmartImage(props: ImageProps) {
    return <Image {...props} />;
}
