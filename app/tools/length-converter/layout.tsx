import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Length Converter - Convert Meters, Feet, Inches, CM, KM Free',
  description: 'Free online length converter. Convert between metric (mm, cm, m, km) and imperial (inches, feet, yards, miles) units instantly. Perfect for construction, travel, and shopping.',
  keywords: [
    'length converter',
    'convert length',
    'meters to feet',
    'feet to meters',
    'cm to inches',
    'inches to cm',
    'distance converter',
    'unit converter',
    'metric to imperial',
    'length conversion',
  ],
  openGraph: {
    title: 'Free Length Converter - Metric & Imperial Units',
    description: 'Convert meters, feet, inches, cm, km and more instantly.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/length-converter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Length Converter',
    description: 'Convert between metric and imperial length units.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/length-converter',
  },
};

export default function LengthConverterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
