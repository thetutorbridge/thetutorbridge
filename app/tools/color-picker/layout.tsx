import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Picker - Get HEX, RGB, HSL Color Codes Free Online',
  description: 'Free online color picker tool. Pick colors and get HEX, RGB, and HSL codes instantly. Perfect for web design, graphic design, and CSS styling. Includes preset colors.',
  keywords: [
    'color picker',
    'hex color picker',
    'rgb color picker',
    'color code picker',
    'online color picker',
    'color selector',
    'hex to rgb',
    'color tool',
    'web color picker',
    'css color picker',
  ],
  openGraph: {
    title: 'Free Color Picker - HEX, RGB, HSL Color Codes',
    description: 'Pick colors and get codes instantly. Perfect for designers and developers.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/color-picker',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Color Picker Tool',
    description: 'Get HEX, RGB, HSL color codes instantly.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/color-picker',
  },
};

export default function ColorPickerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
