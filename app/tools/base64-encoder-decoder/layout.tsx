import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Base64 Encoder/Decoder - Encode & Decode Base64 Online Free',
  description: 'Free online Base64 encoder and decoder. Convert text to Base64 and decode Base64 strings instantly. 100% secure - all conversion done locally in your browser. Perfect for developers.',
  keywords: [
    'base64 encoder',
    'base64 decoder',
    'encode base64',
    'decode base64',
    'base64 converter',
    'base64 online',
    'base64 tool',
    'text to base64',
    'base64 to text',
    'online base64',
  ],
  openGraph: {
    title: 'Free Base64 Encoder/Decoder - Convert Text Online',
    description: 'Encode and decode Base64 instantly. 100% secure and private.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/base64-encoder-decoder',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Base64 Encoder/Decoder',
    description: 'Convert text to/from Base64 instantly.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/base64-encoder-decoder',
  },
};

export default function Base64EncoderDecoderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
