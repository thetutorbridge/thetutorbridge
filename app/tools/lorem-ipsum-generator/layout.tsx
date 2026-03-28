import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator - Generate Placeholder Text Free Online',
  description: 'Free Lorem Ipsum generator. Generate placeholder text in paragraphs, sentences, or words. Perfect for web design, mockups, and content layouts.',
  keywords: [
    'lorem ipsum generator',
    'lorem ipsum',
    'placeholder text',
    'dummy text',
    'filler text',
    'lorem generator',
    'text generator',
    'lipsum',
  ],
  openGraph: {
    title: 'Free Lorem Ipsum Generator',
    description: 'Generate placeholder text instantly for your designs.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/lorem-ipsum-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Lorem Ipsum Generator',
    description: 'Generate placeholder text instantly.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/lorem-ipsum-generator',
  },
};

export default function LoremIpsumGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
