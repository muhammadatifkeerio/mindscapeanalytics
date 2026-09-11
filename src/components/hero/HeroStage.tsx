/**
 * Full-bleed decorative deployment stage — monochrome product character.
 * Labels are locked case-study names only (PRODUCT.md evidence). aria-hidden.
 * Motion: rare first-paint reveal (opacity + translate); no scale(0).
 */
export default function HeroStage() {
    return (
        <div
            aria-hidden="true"
            className="hero-stage pointer-events-none absolute inset-0 -z-[1] hidden overflow-hidden lg:block"
        >
            <svg
                className="hero-stage-svg absolute right-0 top-[8%] h-[85%] w-[55%] max-w-none opacity-90"
                viewBox="0 0 720 640"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="hero-stage-line" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="0.08" />
                        <stop offset="50%" stopColor="hsl(var(--foreground))" stopOpacity="0.28" />
                        <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0.06" />
                    </linearGradient>
                    <radialGradient id="hero-stage-node" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Edges — packaged deployment mesh */}
                <g stroke="url(#hero-stage-line)" strokeWidth="1.25" strokeLinecap="round">
                    <path d="M180 320 L320 180" />
                    <path d="M180 320 L320 460" />
                    <path d="M320 180 L480 240" />
                    <path d="M320 460 L480 400" />
                    <path d="M480 240 L560 320" />
                    <path d="M480 400 L560 320" />
                    <path d="M320 180 L320 460" />
                    <path d="M180 320 L560 320" opacity="0.45" />
                </g>

                {/* Soft node glows */}
                <circle cx="180" cy="320" r="48" fill="url(#hero-stage-node)" />
                <circle cx="320" cy="180" r="40" fill="url(#hero-stage-node)" />
                <circle cx="320" cy="460" r="40" fill="url(#hero-stage-node)" />
                <circle cx="480" cy="240" r="36" fill="url(#hero-stage-node)" />
                <circle cx="480" cy="400" r="36" fill="url(#hero-stage-node)" />
                <circle cx="560" cy="320" r="52" fill="url(#hero-stage-node)" />

                {/* Core nodes */}
                <g stroke="hsl(var(--foreground) / 0.45)" strokeWidth="1">
                    <circle cx="180" cy="320" r="7" fill="hsl(var(--foreground) / 0.12)" />
                    <circle cx="320" cy="180" r="6" fill="hsl(var(--foreground) / 0.1)" />
                    <circle cx="320" cy="460" r="6" fill="hsl(var(--foreground) / 0.1)" />
                    <circle cx="480" cy="240" r="5.5" fill="hsl(var(--foreground) / 0.1)" />
                    <circle cx="480" cy="400" r="5.5" fill="hsl(var(--foreground) / 0.1)" />
                    <circle cx="560" cy="320" r="9" fill="hsl(var(--foreground) / 0.18)" />
                </g>

                {/* Locked case-study labels — names only, no metrics */}
                <g
                    fill="hsl(var(--foreground) / 0.55)"
                    fontFamily="ui-sans-serif, system-ui, sans-serif"
                    fontSize="11"
                    letterSpacing="0.12em"
                >
                    <text x="96" y="312" className="hero-stage-label">
                        TENVO
                    </text>
                    <text x="268" y="152" className="hero-stage-label">
                        DBLYNX
                    </text>
                    <text x="248" y="508" className="hero-stage-label">
                        FUEL STATION ERP
                    </text>
                    <text x="448" y="214" className="hero-stage-label">
                        ENTERPRISE ERP
                    </text>
                    <text x="520" y="304" className="hero-stage-label" fontSize="10">
                        PACKAGED
                    </text>
                    <text x="524" y="320" className="hero-stage-label" fontSize="10" opacity="0.7">
                        DEPLOY
                    </text>
                </g>

                {/* Outer frame ticks — blueprint, not decoration for its own sake */}
                <g stroke="hsl(var(--foreground) / 0.12)" strokeWidth="1">
                    <path d="M40 40 H100 M40 40 V100" />
                    <path d="M680 40 H620 M680 40 V100" />
                    <path d="M40 600 H100 M40 600 V540" />
                    <path d="M680 600 H620 M680 600 V540" />
                </g>
            </svg>

            {/* Soft vignette so copy stays readable on the left */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent md:via-background/55 md:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        </div>
    );
}
