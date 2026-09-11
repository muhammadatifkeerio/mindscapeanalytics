/**
 * Hero atmosphere — primary orb + secondary wash + blueprint grid.
 * Grid is intentional: deployment stage world (map/blueprint), not random décor.
 * Lighter on mobile for GPU cost.
 */
export default function HeroBackdrop() {
    return (
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
            <div className="hero-orb absolute -top-[22%] left-[8%] h-[85vw] w-[85vw] rounded-full bg-[radial-gradient(circle,hsl(var(--foreground)/0.07),transparent_64%)] blur-[72px] md:-top-[18%] md:left-[35%] md:h-[60vw] md:w-[60vw] md:blur-[110px]" />
            <div className="hero-orb-secondary absolute bottom-[-20%] right-[-10%] h-[55vw] w-[55vw] rounded-full bg-[radial-gradient(circle,hsl(var(--foreground)/0.04),transparent_68%)] blur-[56px] md:bottom-[-12%] md:right-[5%] md:h-[40vw] md:w-[40vw] md:blur-[90px]" />

            <div className="absolute inset-0 [background-image:linear-gradient(to_right,hsl(var(--foreground)/0.035)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.035)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_72%)] md:[background-size:64px_64px] md:[mask-image:radial-gradient(ellipse_at_75%_45%,black,transparent_68%)]" />

            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background/90 md:bg-gradient-to-r md:from-background md:via-background/40 md:to-transparent" />
        </div>
    );
}
