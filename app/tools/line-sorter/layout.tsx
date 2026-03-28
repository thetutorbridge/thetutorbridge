import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Line Sorter - Free Online Tool',
  description: 'Free line-sorter. Sort lines alphabetically. Perfect for developers and text processing.',
  keywords: ['line-sorter', 'Line Sorter'],
  openGraph: { title: 'Line Sorter', description: 'Sort lines alphabetically', type: 'website', url: 'https://www.thetutorbridge.com/tools/line-sorter' },
  twitter: { card: 'summary_large_image', title: 'Line Sorter', description: 'Sort lines alphabetically' },
  alternates: { canonical: 'https://www.thetutorbridge.com/tools/line-sorter' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
