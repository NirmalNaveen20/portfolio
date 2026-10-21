'use client';
import {useEffect, type ReactNode} from 'react';
import {usePathname} from 'next/navigation';
import {Header, Footer} from '@/components/portfolio/SiteChrome';
export default function BlogShell({children}: {children: ReactNode}) {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement; let frame = 0;
    const paint = () => {frame=0; root.style.setProperty('--header-tint',String(.62-.34*Math.min(scrollY/160,1))); root.style.setProperty('--page-progress',String(scrollY/Math.max(1,root.scrollHeight-innerHeight)));};
    const schedule = () => {if(!frame)frame=requestAnimationFrame(paint);};
    paint();addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);
    return () => {cancelAnimationFrame(frame);removeEventListener('scroll',schedule);removeEventListener('resize',schedule);root.style.removeProperty('--header-tint');root.style.removeProperty('--page-progress');};
  },[pathname]);
  return <div className="portfolio-page journal-page" id="top"><a className="skip-link" href="#main">Skip to content</a><Header key={pathname} inner/><main id="main">{children}</main><Footer/></div>;
}
