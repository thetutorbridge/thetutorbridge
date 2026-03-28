import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSS Beautifier - Format CSS Code Free Online',
  description: 'Free CSS beautifier. Format and beautify CSS code with proper indentation. Perfect for developers and styling work.',
  keywords: ['css beautifier', 'format css', 'css formatter'],
  openGraph: {
    title: 'Free CSS Beautifier',
    description: 'Beautify CSS code.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/css-beautifier',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CSS Beautifier',
    description: 'Format CSS.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/css-beautifier',
  },
};

export default function CssBeautifierLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
