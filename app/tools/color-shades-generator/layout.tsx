import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Color Shades Generator - Generate Color Shades Free',
  description: 'Free color shades generator. Generate lighter and darker shades of any color. Perfect for designers and UI work.',
  keywords: ['color shades', 'color tints', 'color generator'],
  openGraph: { title: 'Color Shades Generator', description: 'Generate color shades.', type: 'website', url: 'https://www.thetutorbridge.com/tools/color-shades-generator' },
  twitter: { card: 'summary_large_image', title: 'Color Shades Generator', description: 'Generate shades.' },
  alternates: { canonical: 'https://www.thetutorbridge.com/tools/color-shades-generator' },
};
export default function ColorShadesGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
