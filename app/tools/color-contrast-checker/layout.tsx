import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Contrast Checker - WCAG Contrast Ratio Calculator',
  description: 'Free color contrast checker. Check WCAG accessibility contrast ratios between colors. Perfect for web designers and developers.',
  keywords: ['color contrast', 'wcag contrast', 'accessibility checker'],
  openGraph: {
    title: 'Free Color Contrast Checker',
    description: 'Check WCAG contrast ratios.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/color-contrast-checker',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Contrast Checker',
    description: 'Check color accessibility.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/color-contrast-checker',
  },
};

export default function ColorContrastCheckerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
