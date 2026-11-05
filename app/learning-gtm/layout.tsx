import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learn GTM: 100 Go-To-Market Terms Explained | The Tutor Bridge',
  description: 'Master Go-To-Market strategy with 100 essential GTM terms explained. Learn about ICP, pipeline generation, RevOps, demand generation, PLG, and more with real examples.',
  keywords: [
    'GTM terms',
    'go-to-market strategy',
    'GTM glossary',
    'sales terminology',
    'marketing terms',
    'revenue operations',
    'B2B SaaS terms',
    'pipeline generation',
    'demand generation',
    'ICP ideal customer profile',
    'product-led growth',
    'sales-led growth'
  ],
  openGraph: {
    title: 'Learn GTM: 100 Go-To-Market Terms Explained',
    description: 'Master Go-To-Market strategy with 100 essential GTM terms explained with real-world examples.',
    type: 'website',
    url: 'https://thetutorbridge.com/learning-gtm',
    siteName: 'The Tutor Bridge',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learn GTM: 100 Go-To-Market Terms Explained',
    description: 'Master Go-To-Market strategy with 100 essential GTM terms explained with real-world examples.',
  },
  alternates: {
    canonical: 'https://thetutorbridge.com/learning-gtm'
  }
};

export default function LearningGTMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
