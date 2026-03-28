import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTML Encoder/Decoder - Encode & Decode HTML Entities Free',
  description: 'Free HTML encoder and decoder. Convert special characters to HTML entities or decode them back. Perfect for preventing XSS attacks and displaying code safely.',
  keywords: [
    'html encoder',
    'html decoder',
    'html entities',
    'encode html',
    'decode html',
    'html escape',
    'xss prevention',
  ],
  openGraph: {
    title: 'Free HTML Encoder/Decoder',
    description: 'Encode and decode HTML entities instantly.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/html-encoder-decoder',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free HTML Encoder/Decoder',
    description: 'Encode and decode HTML.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/html-encoder-decoder',
  },
};

export default function HtmlEncoderDecoderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
