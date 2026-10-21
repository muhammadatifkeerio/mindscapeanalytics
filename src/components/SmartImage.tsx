import Image, { type ImageProps } from "next/image";

/**
 * SOURCE OF TRUTH KEYWORDS: Local WebP delivery, image loading performance, responsive image component
 * WHAT: Uses pre-optimized local WebP assets directly while retaining Next.js optimization for other sources.
 * WHY: Avoid repeat server-side format conversion for assets already compressed for the web.
 * WHERE: Shared image component used across public and application surfaces.
 */
export default function SmartImage(props: ImageProps) {
    const source = props.src;
    const isLocalWebp = typeof source === "string" && source.startsWith("/") && /\.webp(?:$|[?#])/i.test(source);

    return <Image {...props} unoptimized={props.unoptimized ?? isLocalWebp} />;
}
