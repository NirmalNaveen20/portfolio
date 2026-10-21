import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ArrowLeft,ArrowUpRight,Clock,CalendarDays} from 'lucide-react';
import {compileMDX} from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import {getPost,getPosts,relatedPosts} from '@/lib/blog';
import {articleHeadings,blogComponents,type Heading} from '@/lib/blog-mdx';
import {formatDate,tagLabel} from '@/components/blog/presentation';
import BlogCard from '@/components/blog/BlogCard';
import ArticleContents from '@/components/blog/ArticleContents';
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return getPosts().map(post=>({slug:post.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
  const entry=getPost((await params).slug);
  if(!entry)return {title:'Article not found | Nirmal Chandrasiri'};
  const {post}=entry;
  return {title:`${post.title} | Nirmal Chandrasiri`,description:post.summary,alternates:{canonical:`/blog/${post.slug}`},
    openGraph:{type:'article',title:post.title,description:post.summary,url:`/blog/${post.slug}`,publishedTime:post.date,...(post.updated?{modifiedTime:post.updated}:{}),authors:['Nirmal Chandrasiri'],tags:post.tags,images:[{url:'/og-image.png'}]},
    twitter:{card:'summary_large_image',title:post.title,description:post.summary,images:['/og-image.png']}};
}
export default async function ArticlePage({params}:Props){
  const entry=getPost((await params).slug);
  if(!entry)notFound();
  const {post,content:source}=entry;
  const headings:Heading[]=[];
  const {content}=await compileMDX({source,components:blogComponents,options:{mdxOptions:{
    remarkPlugins:[remarkGfm,articleHeadings(headings,post.title)],rehypePlugins:[[rehypeHighlight,{ignoreMissing:true}]]
  }}});
  const related=relatedPosts(post);
  const schema={'@context':'https://schema.org','@type':'BlogPosting',headline:post.title,description:post.summary,datePublished:post.date,...(post.updated?{dateModified:post.updated}:{}),author:{'@type':'Person',name:'Nirmal Chandrasiri',url:'https://www.nirmalchandrasiri.com'},mainEntityOfPage:`https://www.nirmalchandrasiri.com/blog/${post.slug}`};
  return <div className="journal-wrap">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>
    <header className="journal-article-heading">
      <Link className="journal-back" href="/blog"><ArrowLeft size={16}/> All articles</Link>
      <div className="journal-tags article-topics">{post.tags.map(tag=><Link href={`/blog?tag=${encodeURIComponent(tag)}`} key={tag}>{tagLabel(tag)}</Link>)}</div>
      <h1>{post.title}</h1><p className="journal-deck">{post.summary}</p>
      <div className="journal-byline"><span><CalendarDays size={14}/><time dateTime={post.date}>{formatDate(post.date)}</time></span><span><Clock size={14}/>{post.readingTime} min read</span>{post.updated&&<span>Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time></span>}</div>
    </header>
    <div className="journal-reading-layout">
      {headings.length>0&&<ArticleContents headings={headings}/>}
      <article className="journal-prose" aria-label={post.title}>{content}
        <div className="journal-article-end"><Link href="/blog"><ArrowLeft size={16}/> Back to all articles</Link></div>
      </article>
    </div>
    {related.length>0&&<section className="journal-related" aria-labelledby="related-heading"><div className="section-heading"><h2 id="related-heading">Keep reading</h2><Link className="text-link" href="/blog">All articles <ArrowUpRight size={16}/></Link></div><div className="journal-grid">{related.map(item=><BlogCard key={item.slug} post={item}/>)}</div></section>}
  </div>;
}
