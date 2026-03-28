import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UUID Generator - Generate UUIDs (GUIDs) Free Online',
  description: 'Free UUID generator. Generate version 4 (random) or version 1 (time-based) UUIDs instantly. Perfect for developers, databases, and API development.',
  keywords: [
    'uuid generator',
    'guid generator',
    'uuid v4',
    'uuid v1',
    'unique identifier',
    'generate uuid',
    'random uuid',
  ],
  openGraph: {
    title: 'Free UUID Generator',
    description: 'Generate UUIDs and GUIDs instantly.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/uuid-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free UUID Generator',
    description: 'Generate UUIDs instantly.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/uuid-generator',
  },
};

export default function UuidGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
