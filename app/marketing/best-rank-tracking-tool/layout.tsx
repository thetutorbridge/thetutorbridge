import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '21 Best Rank Tracking Tools for 2026 (Free & Paid) - Complete Comparison',
  description: 'Discover the best rank tracking tools for 2026. Compare 21 tools including Semrush, Ahrefs, SE Ranking, AccuRanker & more. Track your keyword rankings accurately.',
  keywords: [
    'best rank tracking tools',
    'rank tracker software',
    'keyword rank tracker',
    'serp tracking tools',
    'rank tracking tools 2026',
    'free rank tracker',
    'keyword position tracker',
    'seo rank tracker',
    'google rank tracker',
    'local rank tracking',
    'best rank tracker',
    'semrush vs ahrefs rank tracking',
    'accuranker alternatives',
    'rank tracking software',
    'serp checker',
    'keyword ranking tool',
    'daily rank tracking',
    'competitor rank tracking',
    'white label rank tracker',
    'enterprise rank tracking'
  ],
  openGraph: {
    title: '21 Best Rank Tracking Tools for 2026 (Free & Paid) - Complete Guide',
    description: 'Compare 21 top rank tracking tools with pricing, features, pros & cons. Find the perfect tool for monitoring your keyword rankings.',
    type: 'article',
    url: 'https://thetutorbridge.com/marketing/best-rank-tracking-tool',
    siteName: 'The Tutor Bridge',
  },
  twitter: {
    card: 'summary_large_image',
    title: '21 Best Rank Tracking Tools for 2026 (Free & Paid)',
    description: 'Compare 21 top rank tracking tools - Semrush, Ahrefs, SE Ranking & more. Free & paid options reviewed.',
  },
  alternates: {
    canonical: 'https://thetutorbridge.com/marketing/best-rank-tracking-tool'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function BestRankTrackingToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
