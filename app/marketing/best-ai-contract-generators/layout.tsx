import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '18 Best AI Contract Generators for 2026 (Free & Paid) - Complete Guide',
  description: 'Discover the best AI contract generators for 2026. Compare 18 tools including Juro, Ironclad, DocuSign CLM & more. Free & paid options with pricing, features, pros & cons.',
  keywords: [
    'best ai contract generators',
    'ai contract software 2026',
    'contract automation tools',
    'contract management software',
    'ai contract drafting',
    'juro alternatives',
    'ironclad review',
    'docusign clm review',
    'contract lifecycle management',
    'legal tech tools',
    'contract templates ai',
    'automated contract creation',
    'contract review software',
    'ai legal document generators',
    'smart contract tools',
    'contract negotiation software',
    'enterprise contract management',
    'contract analytics tools',
    'pandadoc review',
    'spotdraft review'
  ],
  openGraph: {
    title: '18 Best AI Contract Generators for 2026 (Free & Paid) - Complete Guide',
    description: 'Compare 18 top AI contract generators with pricing, features, pros & cons. Find the perfect tools for contract automation, drafting & lifecycle management.',
    type: 'article',
    url: 'https://www.thetutorbridge.com/marketing/best-ai-contract-generators',
    siteName: 'The Tutor Bridge',
  },
  twitter: {
    card: 'summary_large_image',
    title: '18 Best AI Contract Generators for 2026 (Free & Paid)',
    description: 'Compare 18 top AI contract generators - Juro, Ironclad, DocuSign CLM & more. Free & paid options reviewed.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/marketing/best-ai-contract-generators'
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

export default function BestAIContractGeneratorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
