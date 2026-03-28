import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'URL Encoder/Decoder - Encode & Decode URLs Free Online',
  description: 'Free URL encoder and decoder. Convert URLs to percent-encoded format or decode them back. Perfect for web developers, APIs, and query strings.',
  keywords: [
    'url encoder',
    'url decoder',
    'percent encoding',
    'url escape',
    'encode url',
    'decode url',
    'url encoding tool',
  ],
  openGraph: {
    title: 'Free URL Encoder/Decoder',
    description: 'Encode and decode URLs instantly.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/url-encoder-decoder',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free URL Encoder/Decoder',
    description: 'Encode and decode URLs.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/url-encoder-decoder',
  },
};

export default function UrlEncoderDecoderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
