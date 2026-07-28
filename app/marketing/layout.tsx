import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marketing Guides & Tools | The Tutor Bridge',
  description: 'Comprehensive marketing guides including SEO tools, content marketing, social media strategies, and digital marketing tips to grow your online presence.',
  keywords: [
    'marketing guides',
    'seo tools',
    'digital marketing',
    'content marketing',
    'online marketing',
    'marketing resources'
  ],
  openGraph: {
    title: 'Marketing Guides & Tools | The Tutor Bridge',
    description: 'Comprehensive marketing guides to help you grow your online presence.',
    type: 'website',
    url: 'https://thetutorbridge.com/marketing',
    siteName: 'The Tutor Bridge',
  },
  alternates: {
    canonical: 'https://thetutorbridge.com/marketing'
  }
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
