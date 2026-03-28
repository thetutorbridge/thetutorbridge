import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unit Converter - Convert Length, Weight, Volume & More',
  description: 'Free online unit converter for length, weight, volume, temperature, area, and speed. Convert between metric and imperial units instantly with step-by-step explanations.',
  keywords: [
    'unit converter',
    'convert units',
    'cm to inches',
    'kg to pounds',
    'celsius to fahrenheit',
    'meters to feet',
    'liters to gallons',
    'metric to imperial',
    'unit conversion calculator',
  ],
  openGraph: {
    title: 'Unit Converter - 10,000+ Conversions',
    description: 'Convert units of length, weight, volume, temperature, and more with detailed step-by-step solutions.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/convert',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unit Converter',
    description: 'Convert between metric and imperial units with step-by-step explanations.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/convert',
  },
};

export default function ConvertLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
