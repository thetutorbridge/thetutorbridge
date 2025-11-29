import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grams to Cups Calculator - Free Cooking Converter | The Tutor Bridge',
  description: 'Free grams to cups converter for cooking. Convert grams to cups for flour, sugar, butter, honey, and 20+ ingredients. Supports US cups, US legal cups, and metric cups.',
  keywords: [
    'grams to cups',
    'grams to cups converter',
    'grams to cups calculator',
    'g to cups',
    'grams to cup',
    'cooking converter',
    'baking converter',
    'ingredient converter',
    'flour grams to cups',
    'sugar grams to cups',
    'butter grams to cups',
    'honey grams to cups',
    'milk grams to cups',
    'water grams to cups',
    '100 grams to cups',
    '200 grams to cups',
    '250 grams to cups',
    '500 grams to cups',
    'grams to US cups',
    'grams to metric cups',
    'kitchen calculator',
    'recipe converter',
    'weight to volume',
    'cooking measurements',
    'baking measurements',
    'ingredient weight',
    'cups to grams',
    'metric conversion',
    'US customary cups',
    'US legal cups',
    'UK cups',
    'Australia cups',
    'free grams to cups converter',
    'online cooking calculator',
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
    canonical: '/calculators/grams-to-cups-calculator',
  },
  openGraph: {
    title: 'Grams to Cups Calculator - Cooking Conversion Tool',
    description: 'Convert grams to cups for any ingredient. Free cooking calculator with 20+ ingredients and multiple cup types.',
    url: 'https://thetutorbridge.com/calculators/grams-to-cups-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Grams to Cups Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grams to Cups Calculator - Free Tool',
    description: 'Convert grams to cups for flour, sugar, butter, and 20+ ingredients. Free cooking converter.',
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

export default function GramsToCupsCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
