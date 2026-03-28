import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reverse Text - Reverse Text, Words, Lines Free Online',
  description: 'Free text reverser tool. Reverse text character by character, reverse word order, or reverse lines instantly. Perfect for fun text effects and encoding.',
  keywords: [
    'reverse text',
    'text reverser',
    'backwards text',
    'flip text',
    'reverse words',
    'reverse string',
    'mirror text',
  ],
  openGraph: {
    title: 'Free Reverse Text Tool',
    description: 'Reverse text, words, or lines instantly.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/reverse-text',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Reverse Text Tool',
    description: 'Reverse text instantly.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/reverse-text',
  },
};

export default function ReverseTextLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
