import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON to XML Converter - Convert JSON to XML Free Online',
  description: 'Free JSON to XML converter. Convert JSON data to XML format instantly. Perfect for data transformation and API integration.',
  keywords: ['json to xml', 'convert json', 'xml converter'],
  openGraph: {
    title: 'Free JSON to XML Converter',
    description: 'Convert JSON to XML.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/json-to-xml',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON to XML Converter',
    description: 'Convert JSON.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/json-to-xml',
  },
};

export default function JsonToXmlLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
