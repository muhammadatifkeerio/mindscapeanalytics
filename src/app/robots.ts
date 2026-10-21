import { MetadataRoute } from 'next'

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
        sitemap: 'https://mindscapeanalytics.com/sitemap.xml',
    }
}
