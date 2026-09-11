/**
 * Hero atmosphere — primary orb + secondary wash + blueprint grid.
 * Grid is intentional: deployment stage world (map/blueprint), not random décor.
 * Lighter on mobile for GPU cost; mesh figure is lg-only in HeroStage.
 */
export default function HeroBackdrop() {
    return (
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
            <div className="hero-orb absolute -top-[16%] left-1/2 h-[90vw] w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--foreground)/0.08),transparent_64%)] blur-[64px] md:-top-[18%] md:left-[35%] md:h-[60vw] md:w-[60vw] md:translate-x-0 md:blur-[110px]" />
            <div className="hero-orb-secondary absolute bottom-[-12%] right-[5%] hidden h-[40vw] w-[40vw] rounded-full bg-[radial-gradient(circle,hsl(var(--foreground)/0.04),transparent_68%)] blur-[90px] md:block" />

            <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,hsl(var(--foreground)/0.035)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.035)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_50%_28%,black,transparent_78%)] md:opacity-100 md:[background-size:64px_64px] md:[mask-image:radial-gradient(ellipse_at_75%_45%,black,transparent_68%)]" />

            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/15 to-background md:via-transparent md:to-background/90 lg:bg-gradient-to-r lg:from-background lg:via-background/40 lg:to-transparent" />
        </div>
    );
}
