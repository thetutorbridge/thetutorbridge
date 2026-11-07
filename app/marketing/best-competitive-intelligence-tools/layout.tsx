import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '18 Best Competitive Intelligence Tools for 2026 (Free & Paid) - Complete Guide',
  description: 'Discover the best competitive intelligence tools for 2026. Compare 18 tools including Crayon, Klue, SimilarWeb & more. Free & paid options with pricing, features, pros & cons.',
  keywords: [
    'best competitive intelligence tools',
    'competitive intelligence software 2026',
    'competitor analysis tools',
    'market intelligence software',
    'competitive monitoring tools',
    'crayon alternatives',
    'klue review',
    'similarweb review',
    'competitor tracking software',
    'business intelligence tools',
    'market research tools',
    'competitive benchmarking',
    'competitor price monitoring',
    'industry analysis tools',
    'strategic intelligence tools',
    'competitor website analysis',
    'market positioning tools',
    'competitive landscape analysis',
    'kompyte review',
    'contify review'
  ],
  openGraph: {
    title: '18 Best Competitive Intelligence Tools for 2026 (Free & Paid) - Complete Guide',
    description: 'Compare 18 top competitive intelligence tools with pricing, features, pros & cons. Find the perfect tools for competitor tracking, market research & strategic analysis.',
    type: 'article',
    url: 'https://www.thetutorbridge.com/marketing/best-competitive-intelligence-tools',
    siteName: 'The Tutor Bridge',
  },
  twitter: {
    card: 'summary_large_image',
    title: '18 Best Competitive Intelligence Tools for 2026 (Free & Paid)',
    description: 'Compare 18 top competitive intelligence tools - Crayon, Klue, SimilarWeb & more. Free & paid options reviewed.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/marketing/best-competitive-intelligence-tools'
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

export default function BestCompetitiveIntelligenceToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
