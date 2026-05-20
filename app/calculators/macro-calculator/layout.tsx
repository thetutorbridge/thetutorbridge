import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Macro Calculator - Free Macronutrient Calculator | The Tutor Bridge',
  description: 'Free Macro Calculator to calculate your daily protein, carbs, and fat needs. Get personalized macros for weight loss, muscle gain, or maintenance. Instant macro split calculation.',
  keywords: [
    'macro calculator',
    'macronutrient calculator',
    'macros calculator',
    'protein calculator',
    'carbs calculator',
    'fat calculator',
    'iifym calculator',
    'flexible dieting calculator',
    'macro split calculator',
    'daily macros calculator',
    'weight loss macros',
    'muscle gain macros',
    'bulking macros calculator',
    'cutting macros calculator',
    'maintenance macros',
    'keto macro calculator',
    'low carb macro calculator',
    'high protein calculator',
    'bodybuilding macro calculator',
    'fitness macro calculator',
    'diet macro calculator',
    'calorie macro calculator',
    'how to calculate macros',
    'what are my macros',
    'macro ratio calculator',
    'protein carbs fat calculator',
    'macro tracking calculator',
    'macro counting calculator',
    'free macro calculator',
    'online macro calculator',
    'best macro calculator',
    'accurate macro calculator',
    'personalized macro calculator',
    'macro calculator for weight loss',
    'macro calculator for bulking',
    'macro calculator for cutting',
    'macro calculator bodybuilding',
    'macro breakdown calculator',
    'daily protein needs',
    'how much protein do i need',
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
    canonical: 'https://www.thetutorbridge.com/calculators/macro-calculator',
  },
  openGraph: {
    title: 'Macro Calculator - Protein, Carbs & Fat Calculator | The Tutor Bridge',
    description: 'Calculate your daily macros for weight loss, muscle gain, or maintenance. Free macro calculator with personalized protein, carbs, and fat recommendations.',
    url: 'https://www.thetutorbridge.com/calculators/macro-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Macro Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Macro Calculator - Free Macronutrient Calculator',
    description: 'Calculate your daily protein, carbs, and fat needs with our free macro calculator.',
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

export default function MacroCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
