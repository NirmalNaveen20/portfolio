import type {Metadata} from 'next';
import ProjectsArchive from '@/components/portfolio/ProjectsArchive';
import {siteName, siteOrigin, siteShareImage} from '@/lib/site';

const title = `Projects | ${siteName}`;
const description = 'Engineering projects by Nirmal Chandrasiri, covering Kubernetes deployment, infrastructure monitoring, and an AI mock interview platform.';
const url = `${siteOrigin}/projects`;

export const metadata: Metadata = {
    title,
    description,
    alternates: {canonical: url},
    openGraph: {type: 'website', title, description, url, siteName, images: [siteShareImage]},
    twitter: {card: 'summary_large_image', title, description, images: [siteShareImage]},
};

export default function ProjectsPage() {
    return (
        <section className="px-4 max-w-4xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900 dark:text-gray-100">Projects</h1>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                    My work in Kubernetes, infrastructure monitoring, and applied AI. Explore the case studies or filter by technology.
                </p>
            </header>
            <ProjectsArchive/>
        </section>
    );
}
