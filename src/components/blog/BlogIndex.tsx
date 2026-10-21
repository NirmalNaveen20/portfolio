'use client';
import {useMemo,useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {Search,X} from 'lucide-react';
import type {Post} from '@/lib/blog';
import BlogCard from './BlogCard';
import {tagLabel} from './presentation';
export default function BlogIndex({posts}: {posts: Post[]}) {
  const params=useSearchParams();
  const initialTag=params.get('tag');
  const [tags,setTags]=useState<string[]>(initialTag?[initialTag.toLowerCase()]:[]);
  const [query,setQuery]=useState('');
  const [sort,setSort]=useState('newest');
  const [page,setPage]=useState(1);
  const pageSize=6;
  const categories=useMemo(()=>Array.from(new Set(posts.flatMap(post=>post.tags))).sort(),[posts]);
  const filtered=useMemo(()=>posts.filter(post=>(!tags.length||tags.some(tag=>post.tags.includes(tag)))&&
    `${post.title} ${post.summary} ${post.tags.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a,b)=>sort==='oldest'?a.date.localeCompare(b.date):b.date.localeCompare(a.date)),[posts,query,tags,sort]);
  const pages=Math.ceil(filtered.length/pageSize);
  const reset=()=>{setTags([]);setQuery('');setPage(1);};
  return <section className="journal-library" aria-label="Browse blog articles">
    <div className="journal-toolbar"><div className="journal-search"><Search size={18} aria-hidden="true"/><label className="sr-only" htmlFor="article-search">Search articles</label><input id="article-search" type="search" placeholder="Search articles, topics, or tools…" value={query} onChange={e=>{setQuery(e.target.value);setPage(1);}}/></div>
    <div className="journal-sort"><label htmlFor="article-sort">Sort by</label><select id="article-sort" value={sort} onChange={e=>{setSort(e.target.value);setPage(1);}}><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select></div></div>
    <fieldset className="journal-filters"><legend>Browse by topic</legend><div><button type="button" aria-pressed={!tags.length} onClick={()=>{setTags([]);setPage(1);}}>All topics <span>{posts.length}</span></button>
    {categories.map(tag=><button key={tag} type="button" aria-pressed={tags.includes(tag)} onClick={()=>{setTags(current=>current.includes(tag)?current.filter(t=>t!==tag):[...current,tag]);setPage(1);}}>{tagLabel(tag)} <span>{posts.filter(post=>post.tags.includes(tag)).length}</span></button>)}</div></fieldset>
    <div className="journal-results"><p role="status">{filtered.length} {filtered.length===1?'article':'articles'}{tags.length>1?' matching any selected topic':''}</p>{(tags.length>0||query)&&<button type="button" onClick={reset}>Clear filters <X size={14}/></button>}</div>
    {filtered.length?<div className="journal-grid">{filtered.slice((page-1)*pageSize,page*pageSize).map(post=><BlogCard key={post.slug} post={post}/>)}</div>:<div className="journal-empty"><Search size={28}/><h2>No articles found</h2><p>Try another search or clear your topic filters.</p><button className="button" onClick={reset}>Show all articles</button></div>}
    {pages>1&&<nav className="journal-pagination" aria-label="Article pages"><button disabled={page===1} onClick={()=>setPage(page-1)}>Previous</button><span aria-live="polite">Page {page} of {pages}</span><button disabled={page===pages} onClick={()=>setPage(page+1)}>Next</button></nav>}
  </section>;
}
