import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const response = NextResponse.next();
    response.headers.set("x-pathname", request.nextUrl.pathname);

    // --- Enterprise Security Headers ---

    // Prevent clickjacking attacks by ensuring the site can only be framed by itself
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');

    // Prevent MIME-sniffing vulnerabilities
    response.headers.set('X-Content-Type-Options', 'nosniff');

    // Control how much referrer information is included with requests
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Enforce HTTPS routing (HSTS) is handled natively by Vercel in production.
    // Setting it manually here causes infinite redirect loops in local development.

    // Disable legacy XSS protection (often causes more issues than it solves; CSP is preferred)
    // However, explicitly setting it to '0' is a recognized best practice for modern browsers
    response.headers.set('X-XSS-Protection', '0');

    // Restrict access to powerful browser features
    response.headers.set(
        'Permissions-Policy',
        'camera=(), microphone=(), geolocation=(), browsing-topics=()'
    );

    return response;
}

export const config = {
    // Highly optimized matcher to prevent Edge proxy from running on static assets
    // This significantly reduces invocation costs and latency
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         * - images/ (public directory assets)
         */
        {
            source: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images/).*)',
            missing: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ],
        },
    ],
};
