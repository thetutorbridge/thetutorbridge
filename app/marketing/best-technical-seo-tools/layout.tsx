import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '25 Best Technical SEO Tools for 2026 (Free & Paid) - Complete Guide',
  description: 'Discover the best technical SEO tools for 2026. Compare 25 tools including Screaming Frog, Sitebulb, DeepCrawl, Botify & more. Free & paid options with pricing, features, pros & cons.',
  keywords: [
    'best technical seo tools',
    'technical seo tools 2026',
    'free technical seo tools',
    'technical seo software',
    'website crawler tools',
    'site audit tools',
    'screaming frog alternatives',
    'technical seo audit tools',
    'core web vitals tools',
    'page speed tools',
    'schema markup tools',
    'xml sitemap generators',
    'crawl budget optimization',
    'javascript seo tools',
    'mobile seo tools',
    'log file analysis tools',
    'structured data testing tools',
    'site migration tools',
    'indexation tools',
    'robots.txt testing tools',
    'canonical tag checker',
    'redirect checker tools',
    'broken link checker',
    'duplicate content checker',
    'hreflang testing tools'
  ],
  openGraph: {
    title: '25 Best Technical SEO Tools for 2026 (Free & Paid) - Complete Guide',
    description: 'Compare 25 top technical SEO tools with pricing, features, pros & cons. Find the perfect tools for site audits, crawling, Core Web Vitals & more.',
    type: 'article',
    url: 'https://www.thetutorbridge.com/marketing/best-technical-seo-tools',
    siteName: 'The Tutor Bridge',
  },
  twitter: {
    card: 'summary_large_image',
    title: '25 Best Technical SEO Tools for 2026 (Free & Paid)',
    description: 'Compare 25 top technical SEO tools - Screaming Frog, Sitebulb, DeepCrawl & more. Free & paid options reviewed.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/marketing/best-technical-seo-tools'
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

export default function BestTechnicalSEOToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
