import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '7 Best Keyword Research Tools in 2026 (Free & Paid) | Complete Guide',
  description: 'Discover the best keyword research tools for SEO in 2026. Compare Semrush, Ahrefs, Google Keyword Planner, Moz & more keyword research software. Find search volume, keyword difficulty & ranking opportunities.',
  keywords: [
    'best keyword research tools',
    'keyword research software',
    'keyword research tools',
    'keyword research',
    'best keyword research software',
    'keyword finder',
    'keyword generator',
    'seo keyword research',
    'free keyword research tools',
    'keyword analysis tools',
    'find keywords for seo',
    'keyword research tools for seo',
    'keyword planner',
    'keyword difficulty checker',
    'search volume tool'
  ],
  openGraph: {
    title: '7 Best Keyword Research Tools in 2026 (Free & Paid)',
    description: 'Compare the best keyword research tools including Semrush, Ahrefs, Google Keyword Planner & more. Find the perfect keyword research software for your SEO strategy.',
    type: 'article',
    url: 'https://thetutorbridge.com/marketing/best-keyword-research-tools',
    siteName: 'The Tutor Bridge',
  },
  alternates: {
    canonical: 'https://thetutorbridge.com/marketing/best-keyword-research-tools'
  }
};

export default function BestKeywordResearchToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
