import type {MetadataRoute} from 'next';
import {getPosts} from '@/lib/blog';

/**
 * Generates a sitemap.xml file for the website.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    return [
        ...getPosts().map(post => ({url: `https://www.nirmalchandrasiri.com/blog/${post.slug}`, lastModified: new Date(post.updated || post.date), changeFrequency: "monthly" as const, priority: 0.7})),
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
