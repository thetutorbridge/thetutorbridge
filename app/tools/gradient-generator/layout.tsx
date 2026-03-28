import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSS Gradient Generator - Create Gradients Free Online',
  description: 'Free CSS gradient generator. Create linear gradients with custom colors and angles. Copy CSS code instantly for web design.',
  keywords: ['gradient generator', 'css gradient', 'linear gradient'],
  openGraph: {
    title: 'Free CSS Gradient Generator',
    description: 'Generate CSS gradients.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/gradient-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Gradient Generator',
    description: 'Generate gradients.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/gradient-generator',
  },
};

export default function GradientGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
