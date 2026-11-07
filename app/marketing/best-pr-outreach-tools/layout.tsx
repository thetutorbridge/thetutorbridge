import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '18 Best PR & Outreach Tools for 2026 (Free & Paid) - Complete Guide',
  description: 'Discover the best PR and outreach tools for 2026. Compare 18 tools including Cision, Meltwater, Muck Rack & more. Free & paid options with pricing, features, pros & cons.',
  keywords: [
    'best pr tools',
    'pr outreach tools 2026',
    'media outreach software',
    'pr software',
    'press release distribution',
    'journalist database',
    'media monitoring tools',
    'cision alternatives',
    'meltwater review',
    'muck rack review',
    'pr management software',
    'influencer outreach tools',
    'media relations tools',
    'press coverage tracking',
    'pr analytics tools',
    'earned media tools',
    'pr pitch tools',
    'media list building',
    'buzzstream review',
    'pitchbox review'
  ],
  openGraph: {
    title: '18 Best PR & Outreach Tools for 2026 (Free & Paid) - Complete Guide',
    description: 'Compare 18 top PR and outreach tools with pricing, features, pros & cons. Find the perfect tools for media relations, influencer outreach & press coverage.',
    type: 'article',
    url: 'https://www.thetutorbridge.com/marketing/best-pr-outreach-tools',
    siteName: 'The Tutor Bridge',
  },
  twitter: {
    card: 'summary_large_image',
    title: '18 Best PR & Outreach Tools for 2026 (Free & Paid)',
    description: 'Compare 18 top PR outreach tools - Cision, Meltwater, Muck Rack & more. Free & paid options reviewed.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/marketing/best-pr-outreach-tools'
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

export default function BestPROutreachToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
