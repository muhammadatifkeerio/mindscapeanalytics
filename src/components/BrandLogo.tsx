import Image from "@/components/SmartImage";

type BrandLogoProps = {
    alt: string;
    className: string;
    width: number;
    height: number;
    priority?: boolean;
};

/**
 * SOURCE OF TRUTH KEYWORDS: Mindscape logo, light theme, dark theme, transparent wordmark
 * WHAT: Renders the supplied dark or light wordmark according to the active site theme.
 * WHY: Keep the brand legible on both surfaces without baking a white disc into the logo.
 * WHERE: Shared navigation, footer, loading, and account entry points.
 */
export default function BrandLogo({ alt, className, width, height, priority = false }: BrandLogoProps) {
    return (
        <span className="relative inline-flex shrink-0 items-center">
            <Image
                src="/images/brand/mindscape-analytics-logo-light-2026.webp"
                alt={alt}
                width={width}
                height={height}
                priority={priority}
                className={`${className} dark:hidden`}
            />
            <Image
                src="/images/brand/mindscape-analytics-logo-dark-2026.webp"
                alt={alt}
                width={width}
                height={height}
                priority={priority}
                className={`${className} hidden dark:block`}
            />
        </span>
    );
}
