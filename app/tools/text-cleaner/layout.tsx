import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Text Cleaner - Free Online Tool',
  description: 'Free text-cleaner. Clean and format text. Perfect for developers and text processing.',
  keywords: ['text-cleaner', 'Text Cleaner'],
  openGraph: { title: 'Text Cleaner', description: 'Clean and format text', type: 'website', url: 'https://www.thetutorbridge.com/tools/text-cleaner' },
  twitter: { card: 'summary_large_image', title: 'Text Cleaner', description: 'Clean and format text' },
  alternates: { canonical: 'https://www.thetutorbridge.com/tools/text-cleaner' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
