import type {Metadata} from 'next';
import Portfolio from "@/components/portfolio/Portfolio";
import "@/components/portfolio/portfolio.css";

import {getPosts} from "@/lib/blog";
import {siteName, siteOpenGraph, siteOrigin} from "@/lib/site";
import extras from "@/components/portfolio/content/extras.json";
import {profile} from "@/components/portfolio/content/portfolio.js";
import "@/components/blog/blog.css";

export const metadata: Metadata = {
  alternates: {canonical: '/'},
  openGraph: {...siteOpenGraph, url: '/'},
};

const homeUrl = `${siteOrigin}/`;
const personId = `${homeUrl}#nirmal`;
const websiteId = `${homeUrl}#website`;
const profileSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: siteName,
      url: homeUrl,
      inLanguage: 'en',
    },
    {
      '@type': 'ProfilePage',
      url: homeUrl,
      isPartOf: {'@id': websiteId},
      mainEntity: {'@id': personId},
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: siteName,
      url: homeUrl,
      jobTitle: profile.role,
      image: `${siteOrigin}/assets/nirmal-studio.webp`,
      sameAs: extras.socials.map(social => social.url),
    },
  ],
};

export default function Home() {
  const posts = getPosts();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(profileSchema).replace(/</g, '\\u003c')}}/>
      <Portfolio posts={posts} />
    </>
  );
}
