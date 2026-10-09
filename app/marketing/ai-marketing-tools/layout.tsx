import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '35 Best AI Marketing Tools for 2026 (Free & Paid) - Complete Guide to AI in Marketing',
  description: 'Discover the best AI marketing tools for 2026. Compare 35 AI marketing tools for content creation, SEO, social media, email marketing & automation. Free & paid AI tools reviewed.',
  keywords: [
    'ai marketing',
    'ai marketing tools',
    'artificial intelligence marketing',
    'ai tools for marketing',
    'best ai marketing tools',
    'ai marketing software',
    'ai powered marketing tools',
    'ai marketing automation',
    'ai content marketing tools',
    'ai social media marketing',
    'ai email marketing tools',
    'ai seo tools',
    'ai copywriting tools',
    'marketing ai tools',
    'ai digital marketing tools',
    'ai marketing platforms',
    'free ai marketing tools',
    'ai marketing solutions',
    'ai for marketers',
    'ai marketing technology',
    'machine learning marketing tools',
    'ai advertising tools',
    'ai marketing analytics',
    'generative ai marketing',
    'ai content creation tools',
    'ai marketing assistant',
    'chatgpt for marketing',
    'ai marketing strategy',
    'best ai tools for digital marketing',
    'ai marketing campaigns'
  ],
  openGraph: {
    title: '35 Best AI Marketing Tools for 2026 - Complete Guide to AI in Marketing',
    description: 'Compare 35 top AI marketing tools with pricing, features, pros & cons. Find the perfect AI tools for content creation, SEO, social media, and marketing automation.',
    type: 'article',
    url: 'https://thetutorbridge.com/marketing/ai-marketing-tools',
    siteName: 'The Tutor Bridge',
  },
  twitter: {
    card: 'summary_large_image',
    title: '35 Best AI Marketing Tools for 2026 (Free & Paid)',
    description: 'Compare 35 top AI marketing tools - ChatGPT, Jasper, Copy.ai & more. Free & paid AI tools for marketers reviewed.',
  },
  alternates: {
    canonical: 'https://thetutorbridge.com/marketing/ai-marketing-tools'
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

export default function AIMarketingToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
