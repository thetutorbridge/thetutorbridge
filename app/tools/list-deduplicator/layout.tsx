import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'List Deduplicator - Free Online Tool',
  description: 'Free list-deduplicator. Remove duplicate lines. Perfect for developers and text processing.',
  keywords: ['list-deduplicator', 'List Deduplicator'],
  openGraph: { title: 'List Deduplicator', description: 'Remove duplicate lines', type: 'website', url: 'https://www.thetutorbridge.com/tools/list-deduplicator' },
  twitter: { card: 'summary_large_image', title: 'List Deduplicator', description: 'Remove duplicate lines' },
  alternates: { canonical: 'https://www.thetutorbridge.com/tools/list-deduplicator' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
