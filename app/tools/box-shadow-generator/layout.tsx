import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Box Shadow Generator - Create CSS Shadows Free Online',
  description: 'Free CSS box shadow generator. Create custom shadows with visual preview. Copy CSS code instantly for web design.',
  keywords: ['box shadow', 'css shadow', 'shadow generator'],
  openGraph: {
    title: 'Free Box Shadow Generator',
    description: 'Generate CSS shadows.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/box-shadow-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Box Shadow Generator',
    description: 'Generate shadows.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/box-shadow-generator',
  },
};

export default function BoxShadowGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
