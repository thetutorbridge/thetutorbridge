import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Text Diff Checker - Compare Text Differences Free Online',
  description: 'Free text diff checker. Compare two texts and find differences line by line. Perfect for code review, document comparison, and text analysis.',
  keywords: [
    'text diff',
    'text compare',
    'diff checker',
    'compare text',
    'text difference',
    'file compare',
  ],
  openGraph: {
    title: 'Free Text Diff Checker',
    description: 'Compare texts and find differences.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/text-diff-checker',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Text Diff Checker',
    description: 'Compare texts.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/text-diff-checker',
  },
};

export default function TextDiffCheckerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
