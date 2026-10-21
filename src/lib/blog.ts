import fs from 'node:fs';
import path from 'node:path';
import {cache} from 'react';
import {parse} from 'yaml';

export type Post = {slug: string; title: string; summary: string; date: string; updated?: string; tags: string[]; readingTime: number};
const directory = path.join(process.cwd(), 'src/data/blog');
// Compile only trusted, repository-owned MDX, never visitor content.
export const getBlogEntries = cache(() => fs.readdirSync(directory).filter(file => file.endsWith('.mdx')).map(file => {
  const slug = file.slice(0, -4);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid blog filename: ${file}`);
  const source = fs.readFileSync(path.join(directory, file), 'utf8').replace(/\r\n?/g, '\n');
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) throw new Error(`Missing frontmatter: ${file}`);
  const data = parse(match[1]);
  if (data.draft === true) return null;
  for (const field of ['title', 'summary', 'date']) {
    if (typeof data[field] !== 'string' || !data[field].trim()) throw new Error(`Missing ${field}: ${file}`);
  }
  for (const field of ['date', 'updated']) {
    if (data[field] !== undefined && (!/^\d{4}-\d{2}-\d{2}$/.test(data[field]) || Number.isNaN(Date.parse(data[field])))) throw new Error(`Invalid ${field}: ${file}`);
  }
  if (!Array.isArray(data.tags) || data.tags.some((tag: unknown) => typeof tag !== 'string' || !tag.trim())) throw new Error(`Invalid tags: ${file}`);
  const content = source.slice(match[0].length);
  const post: Post = {slug, title: data.title, summary: data.summary, date: data.date,
    ...(data.updated ? {updated: data.updated} : {}),
    tags: Array.from(new Set<string>(data.tags.map((tag: string) => tag.trim().toLowerCase()))),
    readingTime: Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200))};
  return {post, content};
}).filter((entry): entry is {post: Post; content: string} => entry !== null)
.sort((a,b) => b.post.date.localeCompare(a.post.date) || a.post.slug.localeCompare(b.post.slug)));
export const getPosts = () => getBlogEntries().map(entry => entry.post);
export const getPost = (slug: string) => getBlogEntries().find(entry => entry.post.slug === slug);
export function relatedPosts(current: Post) {
  return getPosts().filter(post => post.slug !== current.slug)
    .map(post => ({post, score: post.tags.filter(tag => current.tags.includes(tag)).length}))
    .filter(item => item.score > 0).sort((a,b) => b.score-a.score || b.post.date.localeCompare(a.post.date))
    .slice(0,3).map(item => item.post);
}
