import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON to CSV Converter - Convert JSON to CSV Free Online',
  description: 'Free JSON to CSV converter. Convert JSON arrays to CSV format instantly. Perfect for data export and spreadsheet import.',
  keywords: ['json to csv', 'convert json', 'csv converter'],
  openGraph: {
    title: 'Free JSON to CSV Converter',
    description: 'Convert JSON to CSV.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/json-to-csv-converter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON to CSV Converter',
    description: 'Convert JSON to CSV.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/json-to-csv-converter',
  },
};

export default function JsonToCsvConverterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
