import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON Formatter - Format, Minify & Validate JSON Free Online',
  description: 'Free JSON formatter and validator. Format, minify, and validate JSON data instantly. Perfect for developers, API testing, and debugging.',
  keywords: [
    'json formatter',
    'json validator',
    'json minifier',
    'json beautifier',
    'format json',
    'validate json',
    'json pretty print',
    'json editor',
  ],
  openGraph: {
    title: 'Free JSON Formatter & Validator',
    description: 'Format, minify, and validate JSON instantly.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/json-formatter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free JSON Formatter',
    description: 'Format and validate JSON.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/json-formatter',
  },
};

export default function JsonFormatterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
