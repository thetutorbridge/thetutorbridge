import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Random Color Generator - Free Online Tool',
  description: 'Free random-color-generator. Generate random colors. Perfect for developers and text processing.',
  keywords: ['random-color-generator', 'Random Color Generator'],
  openGraph: { title: 'Random Color Generator', description: 'Generate random colors', type: 'website', url: 'https://www.thetutorbridge.com/tools/random-color-generator' },
  twitter: { card: 'summary_large_image', title: 'Random Color Generator', description: 'Generate random colors' },
  alternates: { canonical: 'https://www.thetutorbridge.com/tools/random-color-generator' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
