import type {MetadataRoute} from 'next';

/**
 * Generates a sitemap.xml file for the website.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://www.nirmalchandrasiri.com',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1
        },
        {
            url: 'https://www.nirmalchandrasiri.com/work',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8
        },
        {
            url: 'https://www.nirmalchandrasiri.com/projects',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8
        },
        {
            url: 'https://www.nirmalchandrasiri.com/blog',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8
        },
    ]
}
