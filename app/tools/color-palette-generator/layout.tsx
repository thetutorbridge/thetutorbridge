import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Palette Generator - Generate Color Schemes Free',
  description: 'Free color palette generator. Generate beautiful color schemes and palettes instantly. Perfect for web design, branding, and UI design.',
  keywords: [
    'color palette generator',
    'color scheme',
    'palette generator',
    'color harmony',
  ],
  openGraph: {
    title: 'Free Color Palette Generator',
    description: 'Generate color palettes.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/color-palette-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Color Palette Generator',
    description: 'Generate palettes.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/color-palette-generator',
  },
};

export default function ColorPaletteGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
