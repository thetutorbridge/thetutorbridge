import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'ASCII Text Generator - Free Online Tool',
  description: 'Free ascii-text-generator. Generate ASCII art text. Perfect for developers and text processing.',
  keywords: ['ascii-text-generator', 'ASCII Text Generator'],
  openGraph: { title: 'ASCII Text Generator', description: 'Generate ASCII art text', type: 'website', url: 'https://www.thetutorbridge.com/tools/ascii-text-generator' },
  twitter: { card: 'summary_large_image', title: 'ASCII Text Generator', description: 'Generate ASCII art text' },
  alternates: { canonical: 'https://www.thetutorbridge.com/tools/ascii-text-generator' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
