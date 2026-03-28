import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSV to JSON Converter - Convert CSV to JSON Free Online',
  description: 'Free CSV to JSON converter. Convert comma-separated values to JSON format instantly. Perfect for data transformation and API development.',
  keywords: [
    'csv to json',
    'convert csv',
    'csv converter',
    'json converter',
  ],
  openGraph: {
    title: 'Free CSV to JSON Converter',
    description: 'Convert CSV to JSON.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/csv-to-json',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free CSV to JSON',
    description: 'Convert CSV.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/csv-to-json',
  },
};

export default function CsvToJsonLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
