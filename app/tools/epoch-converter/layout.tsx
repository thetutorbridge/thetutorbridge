import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Epoch Converter - Unix Timestamp Converter Free Online',
  description: 'Free Unix epoch converter. Convert between date/time and Unix timestamp instantly. Perfect for developers, system administrators, and programmers.',
  keywords: [
    'epoch converter',
    'unix timestamp',
    'timestamp converter',
    'epoch time',
    'unix time',
  ],
  openGraph: {
    title: 'Free Epoch Converter',
    description: 'Convert Unix timestamps.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/epoch-converter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Epoch Converter',
    description: 'Convert timestamps.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/epoch-converter',
  },
};

export default function EpochConverterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
