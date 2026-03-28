import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Text Repeater - Repeat Text Multiple Times Free Online',
  description: 'Free text repeater tool. Repeat any text multiple times with custom separators. Perfect for testing, formatting, and creating repetitive content.',
  keywords: [
    'text repeater',
    'repeat text',
    'text multiplier',
    'duplicate text',
    'repeat words',
    'text generator',
    'text replicator',
  ],
  openGraph: {
    title: 'Free Text Repeater',
    description: 'Repeat text multiple times instantly.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/text-repeater',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Text Repeater',
    description: 'Repeat text multiple times.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/text-repeater',
  },
};

export default function TextRepeaterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
