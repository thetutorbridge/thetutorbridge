import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '11 Best LinkedIn Automation Tools for 2026 (Free & Paid) - Complete Guide',
  description: 'Discover the best LinkedIn automation tools for 2026. Compare 11 LinkedIn automation tools for lead generation, outreach, prospecting & sales. Dripify, Expandi, Valley & more reviewed.',
  keywords: [
    'linkedin automation',
    'linkedin automation tools',
    'best linkedin automation tools',
    'linkedin automation software',
    'linkedin lead generation tools',
    'linkedin outreach tools',
    'linkedin prospecting tools',
    'linkedin sales tools',
    'linkedin marketing automation',
    'linkedin connection automation',
    'linkedin message automation',
    'automated linkedin outreach',
    'linkedin bot',
    'linkedin scraper',
    'linkedin sales navigator tools',
    'dripify',
    'expandi',
    'valley ai outbound',
    'phantombuster linkedin',
    'waalaxy',
    'linkedin crm',
    'linkedin lead gen',
    'b2b linkedin tools',
    'linkedin campaign tools',
    'linkedin sequence tools',
    'safe linkedin automation'
  ],
  openGraph: {
    title: '11 Best LinkedIn Automation Tools for 2026 - Complete Guide',
    description: 'Compare 11 top LinkedIn automation tools with pricing, features, pros & cons. Find the perfect tools for LinkedIn lead generation, outreach, and sales automation.',
    type: 'article',
    url: 'https://thetutorbridge.com/marketing/linkedin-automation-tools',
    siteName: 'The Tutor Bridge',
  },
  twitter: {
    card: 'summary_large_image',
    title: '11 Best LinkedIn Automation Tools for 2026 (Free & Paid)',
    description: 'Compare 11 top LinkedIn automation tools - Dripify, Expandi, Valley & more. Free & paid LinkedIn tools for lead generation reviewed.',
  },
  alternates: {
    canonical: 'https://thetutorbridge.com/marketing/linkedin-automation-tools'
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

export default function LinkedInAutomationToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
