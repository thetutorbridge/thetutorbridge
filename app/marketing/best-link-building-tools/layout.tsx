import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '15 Best Link Building Tools in 2026 (Free & Paid) | Complete Guide',
  description: 'Discover the best link building tools for SEO in 2026. Compare Ahrefs, Semrush, Pitchbox, Hunter.io & more backlink tools. Free & paid link building software reviewed.',
  keywords: [
    'link building tools',
    'seo link building tools',
    'best link building tools',
    'best backlink tool',
    'best link building tool',
    'linkbuilding tool',
    'link building software',
    'backlink analysis',
    'free link building tools',
    'best seo link building tools',
    'link building platform',
    'backlink building tools',
    'best backlink checker',
    'automated link building tools',
    'backlinking tools',
    'best backlinks tool',
    'link building outreach tools',
    'backlink building software',
    'seo backlink tools',
    'link prospecting tools'
  ],
  openGraph: {
    title: '15 Best Link Building Tools in 2026 (Free & Paid)',
    description: 'Compare the best link building tools including Ahrefs, Semrush, Pitchbox, Hunter.io & more. Find the perfect backlink software for your SEO link building strategy.',
    type: 'article',
    url: 'https://thetutorbridge.com/marketing/best-link-building-tools',
    siteName: 'The Tutor Bridge',
  },
  alternates: {
    canonical: 'https://thetutorbridge.com/marketing/best-link-building-tools'
  }
};

export default function BestLinkBuildingToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
