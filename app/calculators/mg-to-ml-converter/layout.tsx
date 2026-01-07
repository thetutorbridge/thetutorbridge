import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'mg to mL Converter | 500mg = ? mL (Formula: mg ÷ density) [Free]',
  description: 'Free mg to mL converter: Use formula mL = mg ÷ density. For water: 1mg = 0.001mL. Convert medication dosages, liquid medicine & cooking ingredients instantly.',
  keywords: [
    // Primary Keywords
    'mg to ml converter',
    'mg to ml calculator',
    'milligrams to milliliters',
    'convert mg to ml',
    'mg to ml conversion',

    // Reverse Conversion
    'ml to mg converter',
    'ml to mg calculator',
    'milliliters to milligrams',
    'convert ml to mg',
    'ml to mg conversion',

    // Question Keywords
    'how to convert mg to ml',
    'how many ml in mg',
    'is 1 mg equal to 1 ml',
    'how many ml is 500 mg',
    'how many ml is 100 mg',
    'what is mg to ml formula',

    // Formula Keywords
    'mg to ml formula',
    'mass to volume conversion',
    'density conversion calculator',
    'mg ml density calculator',

    // Substance-Specific
    'mg to ml water',
    'mg to ml oil',
    'mg to ml honey',
    'mg to ml medication',
    'mg to ml medicine',
    'mg to ml liquid',

    // Medical/Pharmaceutical
    'medication dosage converter',
    'drug dosage calculator',
    'liquid medicine converter',
    'pharmaceutical calculator',
    'medicine mg to ml',

    // Cooking Keywords
    'cooking conversion mg to ml',
    'ingredient conversion calculator',
    'recipe conversion mg ml',
    'oil mg to ml',
    'honey mg to ml',

    // Feature Keywords
    'online mg to ml converter',
    'free mg ml converter',
    'instant mg to ml calculator',
    'mg to ml with density',
    'mass volume converter',

    // Unit Keywords
    'milligram calculator',
    'milliliter calculator',
    'weight to volume converter',
    'mass volume calculator',

    // Long-tail Keywords
    'convert milligrams to milliliters calculator',
    'mg to ml converter with substance density',
    'accurate mg to ml conversion',
    'mg to ml calculator online free',

    // India-Specific
    'mg to ml converter india',
    'medicine dosage calculator india',
    'ayurvedic medicine converter',

    // Related Terms
    'density calculator',
    'unit converter',
    'measurement converter',
    'scientific calculator',
    'chemistry calculator',

    // Educational Keywords
    'mg ml conversion explained',
    'why density matters mg to ml',
    'learn mg to ml conversion',
    'mg to ml tutorial',
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
    canonical: 'https://www.thetutorbridge.com/calculators/mg-to-ml-converter',
  },
  openGraph: {
    title: 'Free mg to ml Converter - Milligrams to Milliliters Calculator',
    description: 'Convert mg to ml instantly with our free calculator. Enter mass and density to calculate volume. Includes presets for water, oil, honey, medications, and more.',
    url: 'https://www.thetutorbridge.com/calculators/mg-to-ml-converter',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: '/TheTutorBridge Logo New.png',
        width: 1200,
        height: 630,
        alt: 'mg to ml Converter - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free mg to ml Converter',
    description: 'Convert milligrams to milliliters with density. Works for water, oil, medications, and any liquid. Instant results with step-by-step explanation.',
    images: ['/TheTutorBridge Logo New.png'],
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

export default function MgToMlConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
