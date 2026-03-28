import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Converter - Convert Text to Uppercase, Lowercase, Title Case Free',
  description: 'Free online case converter tool. Convert text to uppercase, lowercase, title case, sentence case, and more. Instant text transformation for any format. Perfect for writers and editors.',
  keywords: [
    'case converter',
    'text case converter',
    'uppercase converter',
    'lowercase converter',
    'title case converter',
    'sentence case converter',
    'text transformer',
    'capitalization tool',
    'change case',
    'convert case',
    'text case changer',
    'online case converter',
  ],
  openGraph: {
    title: 'Free Case Converter - Convert Text Case Online Instantly',
    description: 'Convert text to uppercase, lowercase, title case, sentence case and more. Free online text case changer.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/case-converter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Case Converter Tool',
    description: 'Transform text case instantly with our free online converter.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/case-converter',
  },
};

export default function CaseConverterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
