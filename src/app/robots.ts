import { MetadataRoute } from 'next'
import { getAbsoluteUrl, SEO_CONFIG } from '@/config/seo'

/**
 * SOURCE OF TRUTH KEYWORDS: robots.txt, Baiduspider, canonical host, sitemap discovery, crawler access, private routes
 * WHAT: Publishes crawler rules and the canonical sitemap location.
 * WHY: Search engines may index public marketing pages while private application and API surfaces stay out of crawl queues.
 * WHERE: /robots.txt.
 */

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: 'Baiduspider',
                allow: '/',
                disallow: ['/api/', '/admin/'],
            },
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/admin/'],
            },
        ],
        sitemap: getAbsoluteUrl('/sitemap.xml'),
        host: SEO_CONFIG.siteUrl,
    }
}
