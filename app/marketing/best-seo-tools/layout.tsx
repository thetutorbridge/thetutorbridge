import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '32 Best SEO Tools for 2026 (Free & Paid) - Complete Comparison Guide',
  description: 'Discover the best SEO tools for 2026. Compare 32 tools including Ahrefs, Semrush, Moz, Screaming Frog & more. Free & paid options with pricing, features, pros & cons.',
  keywords: [
    'best seo tools',
    'seo tools 2026',
    'free seo tools',
    'seo software',
    'keyword research tools',
    'backlink checker',
    'seo audit tools',
    'ahrefs vs semrush',
    'best free seo tools',
    'seo tools for beginners',
    'technical seo tools',
    'content optimization tools',
    'rank tracking tools',
    'local seo tools',
    'wordpress seo plugins',
    'seo analysis tools',
    'competitor analysis tools',
    'link building tools',
    'on page seo tools',
    'off page seo tools'
  ],
  openGraph: {
    title: '32 Best SEO Tools for 2026 (Free & Paid) - Complete Guide',
    description: 'Compare 32 top SEO tools with pricing, features, pros & cons. Find the perfect tools for keyword research, technical SEO, content optimization & more.',
    type: 'article',
    url: 'https://thetutorbridge.com/marketing/best-seo-tools',
    siteName: 'The Tutor Bridge',
  },
  twitter: {
    card: 'summary_large_image',
    title: '32 Best SEO Tools for 2026 (Free & Paid)',
    description: 'Compare 32 top SEO tools - Ahrefs, Semrush, Moz & more. Free & paid options reviewed.',
  },
  alternates: {
    canonical: 'https://thetutorbridge.com/marketing/best-seo-tools'
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

export default function BestSEOToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
