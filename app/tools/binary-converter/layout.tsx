import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Binary Converter - Convert Text to Binary Free Online',
  description: 'Free binary converter. Convert text to binary and binary to text instantly. Perfect for computer science, programming, and learning.',
  keywords: [
    'binary converter',
    'text to binary',
    'binary to text',
    'binary translator',
  ],
  openGraph: {
    title: 'Free Binary Converter',
    description: 'Convert binary instantly.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/binary-converter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Binary Converter',
    description: 'Convert binary.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/binary-converter',
  },
};

export default function BinaryConverterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
