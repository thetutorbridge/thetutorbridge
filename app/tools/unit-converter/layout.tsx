import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unit Converter - Convert Units Free Online',
  description: 'Free unit converter. Convert length, weight, temperature, and volume units instantly. Perfect for cooking, construction, and everyday conversions.',
  keywords: [
    'unit converter',
    'convert units',
    'length converter',
    'weight converter',
    'temperature converter',
    'volume converter',
  ],
  openGraph: {
    title: 'Free Unit Converter',
    description: 'Convert units instantly.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/unit-converter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Unit Converter',
    description: 'Convert units.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/unit-converter',
  },
};

export default function UnitConverterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
