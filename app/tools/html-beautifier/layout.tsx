import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTML Beautifier - Format HTML Code Free Online',
  description: 'Free HTML beautifier. Format and beautify HTML code with proper indentation. Perfect for developers and code formatting.',
  keywords: ['html beautifier', 'format html', 'html formatter'],
  openGraph: {
    title: 'Free HTML Beautifier',
    description: 'Beautify HTML code.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/html-beautifier',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HTML Beautifier',
    description: 'Format HTML.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/html-beautifier',
  },
};

export default function HtmlBeautifierLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
