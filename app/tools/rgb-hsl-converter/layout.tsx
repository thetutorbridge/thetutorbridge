import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'RGB to HSL Converter - Free Online Tool',
  description: 'Free rgb-hsl-converter. Convert RGB to HSL colors. Perfect for developers and text processing.',
  keywords: ['rgb-hsl-converter', 'RGB to HSL Converter'],
  openGraph: { title: 'RGB to HSL Converter', description: 'Convert RGB to HSL colors', type: 'website', url: 'https://www.thetutorbridge.com/tools/rgb-hsl-converter' },
  twitter: { card: 'summary_large_image', title: 'RGB to HSL Converter', description: 'Convert RGB to HSL colors' },
  alternates: { canonical: 'https://www.thetutorbridge.com/tools/rgb-hsl-converter' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
