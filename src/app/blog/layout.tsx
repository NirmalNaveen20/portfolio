import type {ReactNode} from 'react';
import BlogShell from '@/components/blog/BlogShell';
import '@/components/portfolio/portfolio.css';
import '@/components/blog/blog.css';
export default function BlogLayout({children}: {children: ReactNode}) {return <BlogShell>{children}</BlogShell>;}
