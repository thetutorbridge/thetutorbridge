import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Find and Replace - Free Online Tool',
  description: 'Free find-and-replace. Find and replace text in bulk. Perfect for developers and text processing.',
  keywords: ['find-and-replace', 'Find and Replace'],
  openGraph: { title: 'Find and Replace', description: 'Find and replace text in bulk', type: 'website', url: 'https://www.thetutorbridge.com/tools/find-and-replace' },
  twitter: { card: 'summary_large_image', title: 'Find and Replace', description: 'Find and replace text in bulk' },
  alternates: { canonical: 'https://www.thetutorbridge.com/tools/find-and-replace' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
