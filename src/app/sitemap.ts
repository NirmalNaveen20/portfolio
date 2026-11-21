import type {MetadataRoute} from 'next';
import {getPosts} from '@/lib/blog';
import {siteOrigin} from '@/lib/site';
import projects from '@/data/projects';
import work from '@/data/work';

/**
 * Generates a sitemap.xml file for the website.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    return [
        ...['/', '/work', '/projects', '/blog'].map(path => ({url: `${siteOrigin}${path}`})),
        ...projects.map(({slug}) => ({url: `${siteOrigin}/projects/${slug}`})),
        ...work.map(({slug}) => ({url: `${siteOrigin}/work/${slug}`})),
        ...getPosts().map(post => ({
            url: `${siteOrigin}/blog/${post.slug}`,
            lastModified: new Date(post.updated || post.date),
        })),
    ]
}
