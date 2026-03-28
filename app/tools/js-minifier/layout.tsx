import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JavaScript Minifier - Minify JS Code Free Online',
  description: 'Free JavaScript minifier. Compress and minify JS code to reduce file size. Perfect for web optimization and performance.',
  keywords: ['js minifier', 'minify javascript', 'compress js'],
  openGraph: {
    title: 'Free JS Minifier',
    description: 'Minify JavaScript code.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/js-minifier',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free JS Minifier',
    description: 'Minify JS.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/js-minifier',
  },
};

export default function JsMinifierLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
