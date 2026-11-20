import type {MetadataRoute} from 'next';
import {getPosts} from '@/lib/blog';
import {siteOrigin} from '@/lib/site';

/**
 * Generates a sitemap.xml file for the website.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    return [
        ...['/', '/work', '/projects', '/blog'].map(path => ({url: `${siteOrigin}${path}`})),
        ...getPosts().map(post => ({
            url: `${siteOrigin}/blog/${post.slug}`,
            lastModified: new Date(post.updated || post.date),
        })),
    ]
}
