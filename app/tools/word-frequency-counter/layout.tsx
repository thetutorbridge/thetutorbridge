import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Word Frequency Counter - Free Online Tool',
  description: 'Free word-frequency-counter. Count word frequencies. Perfect for developers and text processing.',
  keywords: ['word-frequency-counter', 'Word Frequency Counter'],
  openGraph: { title: 'Word Frequency Counter', description: 'Count word frequencies', type: 'website', url: 'https://www.thetutorbridge.com/tools/word-frequency-counter' },
  twitter: { card: 'summary_large_image', title: 'Word Frequency Counter', description: 'Count word frequencies' },
  alternates: { canonical: 'https://www.thetutorbridge.com/tools/word-frequency-counter' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
