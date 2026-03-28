import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Decimal to Binary Converter - Free Online Tool',
  description: 'Free decimal-binary-converter. Convert decimal to binary. Perfect for developers and text processing.',
  keywords: ['decimal-binary-converter', 'Decimal to Binary Converter'],
  openGraph: { title: 'Decimal to Binary Converter', description: 'Convert decimal to binary', type: 'website', url: 'https://www.thetutorbridge.com/tools/decimal-binary-converter' },
  twitter: { card: 'summary_large_image', title: 'Decimal to Binary Converter', description: 'Convert decimal to binary' },
  alternates: { canonical: 'https://www.thetutorbridge.com/tools/decimal-binary-converter' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
