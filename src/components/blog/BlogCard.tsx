/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import {ArrowUpRight, BookOpen} from 'lucide-react';
import type {Post} from '@/lib/blog';
import {formatDate, postVisual, tagLabel} from './presentation';
export default function BlogCard({post}: {post: Post}) {
  const image = postVisual(post.tags);
  return <article className="journal-card"><Link href={`/blog/${post.slug}`} className="journal-card-link">
    <div className="journal-card-art" aria-hidden="true"><span className="journal-card-category">{tagLabel(post.tags[0] || 'Notes')}</span>
      {image ? <img src={image} width="64" height="64" alt="" loading="lazy"/> : <BookOpen size={52}/>}
    </div>
    <div className="journal-card-copy"><div className="journal-meta"><time dateTime={post.date}>{formatDate(post.date)}</time><span>{post.readingTime} min read</span></div>
      <h3>{post.title}</h3><p>{post.summary}</p><div className="journal-tags">{post.tags.map(tag => <span key={tag}>{tagLabel(tag)}</span>)}</div>
      <span className="journal-read">Read article <ArrowUpRight size={15}/></span></div>
  </Link></article>;
}
