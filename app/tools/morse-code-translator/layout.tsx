import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Morse Code Translator - Free Online Tool',
  description: 'Free morse-code-translator. Translate text to/from Morse code. Perfect for developers and text processing.',
  keywords: ['morse-code-translator', 'Morse Code Translator'],
  openGraph: { title: 'Morse Code Translator', description: 'Translate text to/from Morse code', type: 'website', url: 'https://www.thetutorbridge.com/tools/morse-code-translator' },
  twitter: { card: 'summary_large_image', title: 'Morse Code Translator', description: 'Translate text to/from Morse code' },
  alternates: { canonical: 'https://www.thetutorbridge.com/tools/morse-code-translator' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
