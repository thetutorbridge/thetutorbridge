import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ml to Grams Converter - Free Milliliters to Grams Calculator | The Tutor Bridge',
  description: 'Free ml to grams converter for cooking ingredients. Convert milliliters to grams for water, milk, flour, sugar, oil, honey and more. Instant results with density-based calculations.',
  keywords: [
    'ml to grams',
    'ml to g',
    'milliliters to grams',
    'ml to grams converter',
    'ml to grams calculator',
    'convert ml to grams',
    'grams to ml',
    'g to ml',
    'grams to milliliters',
    'grams to ml converter',
    'volume to weight converter',
    'cooking converter',
    'baking converter',
    'ingredient converter',
    'ml to grams water',
    'ml to grams milk',
    'ml to grams flour',
    'ml to grams sugar',
    'ml to grams oil',
    'ml to grams honey',
    'ml to grams butter',
    'liquid to grams',
    'volume to mass',
    'density converter',
    'cooking measurements',
    'baking measurements',
    'recipe converter',
    'kitchen calculator',
    'food weight converter',
    'ingredient weight',
    'ml grams conversion',
    'how many grams in ml',
    'how many ml in gram',
    'ml to gram formula',
    'grams per ml',
    'density based conversion',
    'cooking unit converter',
    'metric cooking converter',
    'ml to grams chart',
    'ml to grams table',
    'ml grams calculator',
    'volume weight conversion',
    'liquid measurement converter',
    'free ml converter',
    'online grams converter',
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
    canonical: '/calculators/ml-to-grams-converter',
  },
  openGraph: {
    title: 'ml to Grams Converter - Milliliters to Grams Calculator',
    description: 'Free ml to grams converter for cooking. Convert milliliters to grams for water, milk, flour, sugar, oil, honey and 30+ ingredients instantly.',
    url: 'https://thetutorbridge.com/calculators/ml-to-grams-converter',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'ml to Grams Converter - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ml to Grams Converter - Free Cooking Calculator',
    description: 'Convert milliliters to grams for cooking ingredients with density-based calculations and instant results.',
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

export default function MlToGramsConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
