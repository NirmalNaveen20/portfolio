import Link from 'next/link';
import type {ReactNode} from 'react';
import {Footer, Header} from './SiteChrome';
import './portfolio.css';

export default function PortfolioIndexShell({children}: {children: ReactNode}) {
  return (
    <div className="portfolio-page profile-index-page" id="top">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header inner/>
      <main id="main" className="wrap profile-index">
        <Link className="profile-index-link profile-index-back" href="/#journey">Back to portfolio</Link>
        {children}
        <nav className="profile-index-related" aria-label="Related portfolio pages">
          <Link className="profile-index-link" href="/projects">Engineering projects</Link>
          <Link className="profile-index-link" href="/blog">Engineering blog</Link>
        </nav>
      </main>
      <Footer/>
    </div>
  );
}
