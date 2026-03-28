import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Number Base Converter - Free Online Tool',
  description: 'Free number-base-converter. Convert between binary, decimal, hex, octal. Perfect for developers and text processing.',
  keywords: ['number-base-converter', 'Number Base Converter'],
  openGraph: { title: 'Number Base Converter', description: 'Convert between binary, decimal, hex, octal', type: 'website', url: 'https://www.thetutorbridge.com/tools/number-base-converter' },
  twitter: { card: 'summary_large_image', title: 'Number Base Converter', description: 'Convert between binary, decimal, hex, octal' },
  alternates: { canonical: 'https://www.thetutorbridge.com/tools/number-base-converter' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
