import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RGB to HEX Converter - Convert RGB and HEX Color Codes Free',
  description: 'Free RGB to HEX and HEX to RGB converter. Convert between color formats instantly. Perfect for web design, CSS, and graphic design.',
  keywords: [
    'rgb to hex',
    'hex to rgb',
    'rgb converter',
    'hex converter',
    'color converter',
    'rgb to hex converter',
    'hex to rgb converter',
    'color code converter',
  ],
  openGraph: {
    title: 'Free RGB/HEX Color Converter',
    description: 'Convert between RGB and HEX color codes instantly.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/rgb-hex-converter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free RGB/HEX Converter',
    description: 'Convert color codes instantly.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/rgb-hex-converter',
  },
};

export default function RgbHexConverterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
