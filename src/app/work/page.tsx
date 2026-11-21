import type {Metadata} from 'next';
import PortfolioIndexShell from '@/components/portfolio/PortfolioIndexShell';
import WorkArchive from '@/components/portfolio/WorkArchive';
import {siteName, siteShareImage} from '@/lib/site';

const title = `Experience | ${siteName}`;
const description = 'Explore Nirmal Chandrasiri’s experience in SaaS operations, site reliability engineering, and DevOps at Sitecore, Cryptoworth, IFS, and Sysco LABS.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {canonical: '/work'},
  openGraph: {type: 'website', title, description, url: '/work', siteName, images: [siteShareImage]},
  twitter: {card: 'summary_large_image', title, description, images: [siteShareImage]},
};

export default function WorkPage() {
  return (
    <PortfolioIndexShell>
      <header className="profile-index-heading">
        <h1>Experience</h1>
        <p>My work in SaaS operations, site reliability, and DevOps spans production support, cloud automation, and observability.</p>
      </header>
      <WorkArchive />
    </PortfolioIndexShell>
  );
}
