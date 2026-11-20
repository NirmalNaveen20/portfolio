import type {MetadataRoute} from 'next'
import {siteOrigin} from '@/lib/site'

/**
 * Generates a robots.txt file for the website.
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: ['Googlebot', 'Googlebot-Image'],
                allow: ['/']
            },
            {
                userAgent: ['Applebot', 'Bingbot'],
                disallow: ['/'],
            },
            {
                userAgent: '*',
                disallow: '/',
            },
        ],
        sitemap: `${siteOrigin}/sitemap.xml`,
    }
}
