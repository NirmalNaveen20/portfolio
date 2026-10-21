import type {Metadata} from 'next';
import Link from 'next/link';
import {Suspense} from 'react';
import {ArrowLeft} from 'lucide-react';
import BlogIndex from '@/components/blog/BlogIndex';
import {getPosts} from '@/lib/blog';
export const metadata:Metadata={title:'Blog | Nirmal Chandrasiri',description:'Practical notes on cloud infrastructure, DevOps, observability, and systems engineering.',alternates:{canonical:'/blog'}};
export default function BlogPage(){
  return <div className="journal-wrap"><header className="journal-index-heading">
    <Link href="/#blog" className="journal-back"><ArrowLeft size={16}/> Back to portfolio</Link>
    <div className="journal-title-row"><div><p className="kicker">NOTES & GUIDES</p><h1>Blog<span>.</span></h1></div><p>What I’m learning and building.<br/>Cloud, DevOps, and the systems behind them.</p></div>
  </header><Suspense fallback={<p>Loading articles…</p>}><BlogIndex posts={getPosts()}/></Suspense></div>;
}
