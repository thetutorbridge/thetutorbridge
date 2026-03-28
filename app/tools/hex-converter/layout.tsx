import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hex Converter - Convert Hexadecimal Free Online',
  description: 'Free hexadecimal converter. Convert between text, hex, and decimal instantly. Perfect for programmers and computer science students.',
  keywords: [
    'hex converter',
    'hexadecimal converter',
    'decimal to hex',
    'hex to decimal',
  ],
  openGraph: {
    title: 'Free Hex Converter',
    description: 'Convert hexadecimal.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/hex-converter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Hex Converter',
    description: 'Convert hex.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/hex-converter',
  },
};

export default function HexConverterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
