import type {Metadata} from 'next';
import Link from 'next/link';
import {Suspense} from 'react';
import {ArrowLeft} from 'lucide-react';
import BlogCard from '@/components/blog/BlogCard';
import BlogIndex from '@/components/blog/BlogIndex';
import {getPosts} from '@/lib/blog';
import {siteName, siteShareImage} from '@/lib/site';

const title = `Blog | ${siteName}`;
const description = 'Practical articles on cloud infrastructure, DevOps, observability, and the systems behind reliable SaaS applications.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {canonical: '/blog'},
  openGraph: {type: 'website', title, description, url: '/blog', siteName, images: [siteShareImage]},
  twitter: {card: 'summary_large_image', title, description, images: [siteShareImage]},
};
export default function BlogPage(){
  const posts=getPosts();
  return <div className="journal-wrap editorial-index"><header className="journal-index-heading">
    <Link href="/#blog" className="journal-back"><ArrowLeft size={16}/> Back to portfolio</Link>
    <h1>Field notes on cloud<br/><span>and reliability.</span></h1>
    <p>Articles by Nirmal Chandrasiri on the tools and decisions behind reliable SaaS applications.</p>
  </header>{posts[0] && <section className="lead-story" aria-label="Latest article"><BlogCard post={posts[0]}/></section>}<Suspense fallback={<p>Loading articles…</p>}><BlogIndex posts={posts}/></Suspense></div>;
}
