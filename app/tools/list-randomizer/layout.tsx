import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'List Randomizer - Free Online Tool',
  description: 'Free list-randomizer. Randomize list order. Perfect for developers and text processing.',
  keywords: ['list-randomizer', 'List Randomizer'],
  openGraph: { title: 'List Randomizer', description: 'Randomize list order', type: 'website', url: 'https://www.thetutorbridge.com/tools/list-randomizer' },
  twitter: { card: 'summary_large_image', title: 'List Randomizer', description: 'Randomize list order' },
  alternates: { canonical: 'https://www.thetutorbridge.com/tools/list-randomizer' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
