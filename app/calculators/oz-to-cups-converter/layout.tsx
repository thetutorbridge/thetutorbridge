import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Oz to Cups Converter - Free Fluid Ounces to Cups Calculator | The Tutor Bridge',
  description: 'Free oz to cups converter. Convert fluid ounces to cups and cups to oz instantly. Supports US fl oz, UK fl oz, US customary cups, US legal cups, and metric cups.',
  keywords: [
    'oz to cups',
    'ounces to cups',
    'oz to cups converter',
    'fluid ounces to cups',
    'fl oz to cups',
    'cups to oz',
    'cups to ounces',
    'oz to cup calculator',
    'how many cups in an oz',
    'how many oz in a cup',
    '8 oz to cups',
    '16 oz to cups',
    '32 oz to cups',
    '4 oz to cups',
    '6 oz to cups',
    '12 oz to cups',
    '1 cup to oz',
    '2 cups to oz',
    'half cup to oz',
    'US fluid ounces',
    'UK fluid ounces',
    'US customary cups',
    'US legal cups',
    'metric cups',
    'cooking conversion',
    'baking measurements',
    'liquid measurement',
    'volume converter',
    'kitchen calculator',
    'recipe converter',
    'fl oz to cup',
    'fluid ounces converter',
    'cups converter',
    'ounces to cups calculator',
    'cups to ounces calculator',
    'free oz to cups tool',
    'online oz to cups converter',
  ],
  authors: [{ name: 'The Tutor Bridge' }],
  creator: 'The Tutor Bridge',
  publisher: 'The Tutor Bridge',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/calculators/oz-to-cups-converter',
  },
  openGraph: {
    title: 'Oz to Cups Converter - Convert Fluid Ounces to Cups',
    description: 'Free oz to cups converter with US/UK fluid ounces and multiple cup types. Convert cooking measurements instantly.',
    url: 'https://www.thetutorbridge.com/calculators/oz-to-cups-converter',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Oz to Cups Converter - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oz to Cups Converter - Free Tool',
    description: 'Convert fluid ounces to cups instantly. Supports US fl oz, UK fl oz, and multiple cup types.',
    images: ['https://www.thetutorbridge.com/og-calculator.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function OzToCupsConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
