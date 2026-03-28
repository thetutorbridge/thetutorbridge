import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JavaScript Beautifier - Format JS Code Free Online',
  description: 'Free JavaScript beautifier. Format and beautify JS code with proper indentation. Perfect for developers.',
  keywords: ['js beautifier', 'format javascript', 'js formatter'],
  openGraph: {
    title: 'Free JS Beautifier',
    description: 'Beautify JavaScript code.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/js-beautifier',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JS Beautifier',
    description: 'Format JavaScript.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/js-beautifier',
  },
};

export default function JsBeautifierLayout({ children }: { children: React.ReactNode}) {
  return <>{children}</>;
}
