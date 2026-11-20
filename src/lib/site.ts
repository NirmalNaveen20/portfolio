export const siteOrigin = 'https://www.nirmalchandrasiri.com';
export const siteName = 'Nirmal Chandrasiri';
export const siteTitle = `${siteName} | SaaS Operations Engineer`;
export const siteDescription = 'Nirmal Chandrasiri is a SaaS Operations Engineer working in cloud infrastructure, automation, and observability. Explore his experience and engineering articles.';

export const siteShareImage = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'Nirmal Chandrasiri, SaaS Operations Engineer',
};

export const siteOpenGraph = {
  type: 'website' as const,
  title: siteTitle,
  description: siteDescription,
  siteName,
  images: [siteShareImage],
};
