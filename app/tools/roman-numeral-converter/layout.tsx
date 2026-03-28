import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roman Numeral Converter - Convert Roman Numerals Free',
  description: 'Free Roman numeral converter. Convert between numbers and Roman numerals instantly. Perfect for education, dates, and historical documents.',
  keywords: [
    'roman numeral converter',
    'roman numerals',
    'convert roman numerals',
    'roman to number',
  ],
  openGraph: {
    title: 'Free Roman Numeral Converter',
    description: 'Convert Roman numerals.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/roman-numeral-converter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Roman Numeral Converter',
    description: 'Convert Roman numerals.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/roman-numeral-converter',
  },
};

export default function RomanNumeralConverterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
