import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tbsp to Grams Converter - Free Tablespoon to Grams Calculator | The Tutor Bridge',
  description: 'Free tbsp to grams converter for cooking. Convert tablespoons to grams for butter, flour, sugar, honey, oil, and 15+ ingredients. Works with metric and US tablespoons.',
  keywords: [
    'tbsp to grams',
    'tablespoon to grams',
    'tbsp to g',
    'tbsp to grams converter',
    'tablespoon to grams converter',
    'tbsp to grams calculator',
    'how many grams in a tablespoon',
    '1 tbsp to grams',
    '2 tbsp to grams',
    '3 tbsp to grams',
    'tbsp butter to grams',
    'tbsp flour to grams',
    'tbsp sugar to grams',
    'tbsp honey to grams',
    'tbsp oil to grams',
    'tbsp to grams cooking',
    'tbsp to grams baking',
    'tablespoon grams',
    'grams to tbsp',
    'grams to tablespoon',
    'cooking conversion',
    'baking conversion',
    'ingredient converter',
    'kitchen calculator',
    'recipe converter',
    'US tablespoon to grams',
    'metric tablespoon to grams',
    'tbsp water to grams',
    'tbsp milk to grams',
    'tbsp salt to grams',
    'tbsp cream to grams',
    'tbsp maple syrup to grams',
    'tbsp nutella to grams',
    'ingredient weight',
    'volume to weight',
    'free tbsp to grams converter',
    'online tablespoon calculator',
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
    canonical: '/calculators/tbsp-to-grams-converter',
  },
  openGraph: {
    title: 'Tbsp to Grams Converter - Kitchen Conversion Tool',
    description: 'Convert tablespoons to grams for any ingredient. Free cooking and baking converter with 15+ ingredients.',
    url: 'https://thetutorbridge.com/calculators/tbsp-to-grams-converter',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Tbsp to Grams Converter - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tbsp to Grams Converter - Free Tool',
    description: 'Convert tablespoons to grams for butter, flour, sugar, honey, and more. Free cooking calculator.',
    images: ['https://thetutorbridge.com/og-calculator.png'],
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

export default function TbspToGramsConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
