import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'String Utility - Text Manipulation Tools Free Online',
  description: 'Free string utility tool. Reverse, count, remove spaces, and manipulate text strings. Perfect for developers and writers.',
  keywords: ['string utility', 'text manipulation', 'string tools'],
  openGraph: {
    title: 'Free String Utility Tool',
    description: 'Manipulate text strings.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/string-utility',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free String Utility',
    description: 'Text manipulation.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/string-utility',
  },
};

export default function StringUtilityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
