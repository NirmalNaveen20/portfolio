import type {Metadata} from 'next';
import Link from 'next/link';
import {Suspense} from 'react';
import {ArrowLeft} from 'lucide-react';
import BlogCard from '@/components/blog/BlogCard';
import BlogIndex from '@/components/blog/BlogIndex';
import {getPosts} from '@/lib/blog';
export const metadata:Metadata={title:'Blog | Nirmal Chandrasiri',description:'Practical notes on cloud infrastructure, DevOps, observability, and systems engineering.',alternates:{canonical:'/blog'}};
export default function BlogPage(){
  const posts=getPosts();
  return <div className="journal-wrap editorial-index"><header className="journal-index-heading">
    <Link href="/#blog" className="journal-back"><ArrowLeft size={16}/> Back to portfolio</Link>
    <h1>Field notes on cloud<br/><span>and reliability.</span></h1>
    <p>Articles by Nirmal Chandrasiri on the tools and decisions behind reliable SaaS applications.</p>
  </header>{posts[0] && <section className="lead-story" aria-label="Latest article"><BlogCard post={posts[0]}/></section>}<Suspense fallback={<p>Loading articles…</p>}><BlogIndex posts={posts}/></Suspense></div>;
}
