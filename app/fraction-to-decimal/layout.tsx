import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fraction to Decimal Converter - Convert 200+ Popular Fractions',
  description:
    'Convert fractions to decimals with step-by-step explanations. Get detailed solutions for 200+ popular fractions including 1/2, 1/3, 3/4, and more. Free math help for students.',
  keywords: [
    'fraction to decimal',
    'decimal converter',
    'convert fraction to decimal',
    'fraction calculator',
    'decimal calculator',
    'math converter',
    'fraction help',
    'decimal help',
    'math help',
    'fraction to decimal converter',
  ],
  openGraph: {
    title: 'Fraction to Decimal Converter',
    description: 'Convert 200+ popular fractions to decimals with detailed step-by-step solutions.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/fraction-to-decimal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fraction to Decimal Converter',
    description: 'Convert 200+ popular fractions to decimals with detailed solutions.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/fraction-to-decimal',
  },
};

export default function FractionToDecimalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
