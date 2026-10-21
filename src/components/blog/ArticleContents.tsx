'use client';

import {useEffect, useRef, useState} from 'react';
import type {Heading} from '@/lib/blog-mdx';

export default function ArticleContents({headings}: {headings: Heading[]}) {
  const [activeId, setActiveId] = useState('');
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sections = headings.map(heading => document.getElementById(heading.id)).filter((element): element is HTMLElement => Boolean(element));
    let frame = 0;
    const update = () => {
      frame = 0;
      // Follow the last heading above the reading line, just below the fixed header.
      let current = '';
      for (const section of sections) {
        if (section.getBoundingClientRect().top > 150) break;
        current = section.id;
      }
      setActiveId(current);
    };
    const schedule = () => {if (!frame) frame = requestAnimationFrame(update);};
    update();
    window.addEventListener('scroll', schedule, {passive: true});
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', schedule);
    const observer = new ResizeObserver(schedule);
    const article = document.querySelector('.journal-prose');
    if (article) observer.observe(article);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('hashchange', schedule);
      observer.disconnect();
    };
  }, [headings]);

  useEffect(() => {
    const aside = asideRef.current;
    const link = aside?.querySelector<HTMLElement>('[aria-current="location"]');
    // Keep long desktop contents lists in view without moving the article itself.
    if (!aside || !link || getComputedStyle(aside).position !== 'sticky') return;
    const bounds = aside.getBoundingClientRect();
    const item = link.getBoundingClientRect();
    if (item.bottom > bounds.bottom - 12) aside.scrollTop += item.bottom - bounds.bottom + 12;
    else if (item.top < bounds.top + 12) aside.scrollTop += item.top - bounds.top - 12;
  }, [activeId]);

  return <aside ref={asideRef} className="journal-contents"><details open><summary>On this page</summary>
    <nav aria-label="Article contents">{headings.map(heading => <a key={heading.id}
      className={heading.depth === 3 ? 'subheading' : ''}
      href={`#${heading.id}`} aria-current={activeId === heading.id ? 'location' : undefined}>
      {heading.title}
    </a>)}</nav>
  </details></aside>;
}
