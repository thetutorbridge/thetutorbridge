import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'XML Formatter - Format XML Data Free Online',
  description: 'Free XML formatter. Format and beautify XML data for better readability. Perfect for developers and data analysts.',
  keywords: ['xml formatter', 'format xml', 'xml beautifier'],
  openGraph: {
    title: 'Free XML Formatter',
    description: 'Format XML data.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/xml-formatter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free XML Formatter',
    description: 'Format XML.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/xml-formatter',
  },
};

export default function XmlFormatterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
