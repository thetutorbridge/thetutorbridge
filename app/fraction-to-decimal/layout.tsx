import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fraction to Decimal Converter - Convert 200+ Popular Fractions',
  description:
    'Convert 200+ fractions to decimals with step-by-step solutions. Free math help including 1/2, 1/3, 3/4 & more.',
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
    description: 'Convert 200+ fractions to decimals with step-by-step solutions. Free math help for students.',
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
