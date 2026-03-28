import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSS Minifier - Minify CSS Code Free Online',
  description: 'Free CSS minifier. Compress and minify CSS code to reduce file size. Perfect for web optimization and performance.',
  keywords: ['css minifier', 'minify css', 'compress css'],
  openGraph: {
    title: 'Free CSS Minifier',
    description: 'Minify CSS code.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/css-minifier',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free CSS Minifier',
    description: 'Minify CSS.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/css-minifier',
  },
};

export default function CssMinifierLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
