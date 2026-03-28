import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Text Statistics - Analyze Text Data Free Online',
  description: 'Free text statistics tool. Get detailed analysis of characters, words, sentences, paragraphs, and reading time. Perfect for writers and editors.',
  keywords: ['text statistics', 'text analysis', 'word count', 'character count'],
  openGraph: {
    title: 'Free Text Statistics Tool',
    description: 'Analyze text data instantly.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/text-statistics',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text Statistics Tool',
    description: 'Analyze text.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/text-statistics',
  },
};

export default function TextStatisticsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
