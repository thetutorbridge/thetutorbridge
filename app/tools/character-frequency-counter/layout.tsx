import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Character Frequency Counter - Free Online Tool',
  description: 'Free character-frequency-counter. Count character frequencies. Perfect for developers and text processing.',
  keywords: ['character-frequency-counter', 'Character Frequency Counter'],
  openGraph: { title: 'Character Frequency Counter', description: 'Count character frequencies', type: 'website', url: 'https://www.thetutorbridge.com/tools/character-frequency-counter' },
  twitter: { card: 'summary_large_image', title: 'Character Frequency Counter', description: 'Count character frequencies' },
  alternates: { canonical: 'https://www.thetutorbridge.com/tools/character-frequency-counter' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
