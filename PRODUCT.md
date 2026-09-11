# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary visitors are business decision-makers evaluating Mindscape Analytics through the marketing site — founders, operators, and enterprise buyers who want AI automation, packaged deployments, or licensed assets without wading through a pure portfolio or a pure SaaS dashboard.

Secondary audiences (present on the same site, not the primary marketing job): shop buyers licensing reusable AI assets; sellers in the multi-vendor marketplace; internal admin/seller operators.

## Product Purpose

Mindscape Analytics is a company marketing website that sells and explains:

1. **Packaged deployments** (Starter / Growth / comparable investment tiers) — turnkey AI systems with setup investment and managed infrastructure.
2. **The Mindscape Shop** — licensing of reusable, production-ready AI assets, boilerplates, and blueprints.
3. **Custom agentic AI / automation architecture** for enterprises — bespoke agents, GenAI systems, and automation when packaged or shop options are not enough.

Success means a visitor understands the offer, trusts the proof, and books a strategy call, starts a project, or purchases from the shop.

## Positioning

Mindscape Analytics positions as an Agentic AI and Gen AI solutions company: autonomous agents, custom generative models, and intelligent automation shipped as production systems — not generic “AI consulting slides.” Engagement spans shop licensing, packaged deployments, and custom enterprise architecture under one brand.

Open / unconfirmed: whether the public claim “world’s first Agentic AI company” remains a binding brand claim for all future copy, or is marketing language that can be softened. Do not invent alternate superlatives.

## Operating Context

- Primary surface: marketing site (`/`, solutions, pricing, projects, about, contact) with Cal.com-style booking CTAs (“Start a project”, strategy / audit calls).
- Commerce: `/shop`, cart, Stripe checkout; seller registration and dashboards; admin product/order workflows.
- Product catalog and case study narratives live in app routes (e.g. `src/app/projects/`, homepage case-study sections).
- Chat widget (“Zee”) and lead magnets support inquiry; they must not invent case studies, metrics, or client claims beyond confirmed evidence.

## Capabilities and Constraints

**Confirmed capabilities**

- Marketing site for services and positioning.
- Packaged deployment tiers (pricing page: Starter, Growth, and related managed plans).
- Shop for reusable AI assets with Stripe checkout.
- Custom enterprise AI / automation / architecture engagements.
- Auth (Better Auth), Prisma/Postgres data layer, seller and admin surfaces.
- Named product lines referenced in brand metadata: RSIQ Pro, DBlynx / DBLynx, DisposIQ, Tenvo (and related project pages).

**Constraints**

- Case studies and institutional project proof are **protected product truth**: do not overwrite, replace, or invent case studies, client stories, industries, or outcome metrics. Update only with explicit user approval of the factual change.
- Do not fabricate testimonials, press, benchmarks, logos of clients, or ROI numbers not already confirmed in Evidence.
- Platform is web (Next.js); not a native app design language.

**Undecided**

- Relative priority among the three offers when a surface can only lead with one (homepage hierarchy may need a later surface brief).
- Which case-study metrics are independently verified vs. marketing figures — until clarified, treat existing case-study content as locked, not as a license to invent more.

## Brand Commitments

- **Name:** Mindscape Analytics (also MSA); legal references include Mindscape Analytics LLC.
- **Founder / public lead:** Zeeshan Keerio (founder page `/zeeshan-keerio`).
- **Site:** https://mindscapeanalytics.com
- **Voice (from product surfaces):** confident, technical-but-accessible, ROI-aware; chat persona “Zee” is warm and professional — not robotic.
- **Assets:** logo at `/images/logo/mindscape-analytics.png` (and related favicon / OG assets). Preserve brand name prominence on marketing surfaces.
- Binding visual system is **not** defined here; record or replace via DESIGN.md / new-work when needed.

## Evidence on Hand

Protected case-study and project surfaces (do not overwrite without approval):

- Homepage case studies component: `src/components/CaseStudies.tsx` (Tenvo, Enterprise ERP, DBLynx Autonomous Hub, Fuel Station ERP).
- Portfolio / case study routes: `src/app/projects/page.tsx`, `src/app/projects/[slug]/page.tsx` (e.g. global enterprise ERP, inventory/logistics, DisposIQ, DBlynx, AI sales agent, fuel station ERP, and related entries).
- Project imagery under `/images/projects/`.
- Team and about content: `src/app/about/page.tsx`.
- Pricing tiers as published on `src/app/pricing/page.tsx` (treat as live commercial copy; change only with approval).

**Must not fabricate:** new client names, fake logos, invented case studies, or metrics that replace or dilute the protected case-study record.

## Product Principles

1. **Marketing clarity first** — the site’s job is to explain offers and convert; secondary product surfaces (shop, seller, admin) must not confuse the primary visitor story.
2. **Three commercial paths, one brand** — packaged deployments, shop assets, and custom enterprise architecture are all real; lead with the path that fits the surface without erasing the others.
3. **Proof is sacred** — case studies and project evidence are durable; never overwrite or invent them.
4. **Ship production systems, not demos** — copy and UX should reinforce agents, automation, and deployments that run in the real world.
5. **Earn the next step** — every major marketing surface should make booking, project start, or shop purchase the obvious next action.

## Accessibility & Inclusion

No product-specific accessibility standard was confirmed in init. Default to strong web a11y practice on future work; record a required standard here when one is chosen.
