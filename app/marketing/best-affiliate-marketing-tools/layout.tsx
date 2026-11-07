import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '18 Best Affiliate Marketing Tools for 2026 (Free & Paid) - Complete Guide',
  description: 'Discover the best affiliate marketing tools for 2026. Compare 18 tools including ShareASale, Impact, CJ Affiliate & more. Free & paid options with pricing, features, pros & cons.',
  keywords: [
    'best affiliate marketing tools',
    'affiliate marketing tools 2026',
    'affiliate marketing software',
    'affiliate tracking software',
    'affiliate network platforms',
    'shareasale alternatives',
    'cj affiliate review',
    'impact affiliate platform',
    'affiliate link management',
    'affiliate commission tracking',
    'best affiliate programs',
    'affiliate marketing for beginners',
    'affiliate management tools',
    'affiliate reporting tools',
    'passive income tools',
    'affiliate link cloaking',
    'affiliate marketing platforms',
    'rakuten advertising review',
    'partnerstack review',
    'tapfiliate review'
  ],
  openGraph: {
    title: '18 Best Affiliate Marketing Tools for 2026 (Free & Paid) - Complete Guide',
    description: 'Compare 18 top affiliate marketing tools with pricing, features, pros & cons. Find the perfect tools for affiliate tracking, link management & commission optimization.',
    type: 'article',
    url: 'https://www.thetutorbridge.com/marketing/best-affiliate-marketing-tools',
    siteName: 'The Tutor Bridge',
  },
  twitter: {
    card: 'summary_large_image',
    title: '18 Best Affiliate Marketing Tools for 2026 (Free & Paid)',
    description: 'Compare 18 top affiliate marketing tools - ShareASale, Impact, CJ Affiliate & more. Free & paid options reviewed.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/marketing/best-affiliate-marketing-tools'
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

export default function BestAffiliateMarketingToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
