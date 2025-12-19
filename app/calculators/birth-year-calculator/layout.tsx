import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Birth Year Calculator - Find Birth Year from Age | Free Online Tool',
  description: 'Free birth year calculator to find birth year from age or calculate age from birth year. Includes generation info, Chinese zodiac sign, and historical context.',
  keywords: [
    // Primary Keywords
    'birth year calculator',
    'what year was I born',
    'birth year from age',
    'calculate birth year',
    'find birth year',

    // Age to Birth Year Keywords
    'age to birth year calculator',
    'what year was I born if I am',
    'born what year calculator',
    'birth year finder',
    'year of birth calculator',

    // Birth Year to Age Keywords
    'birth year to age calculator',
    'age from birth year',
    'calculate age from birth year',
    'how old am I if born in',
    'age calculator birth year',

    // Specific Age Questions
    'what year was I born if I am 20',
    'what year was I born if I am 25',
    'what year was I born if I am 30',
    'what year was I born if I am 40',
    'what year was I born if I am 50',

    // Generation Keywords
    'what generation am I',
    'generation calculator',
    'gen z birth years',
    'millennial birth years',
    'baby boomer birth years',
    'gen x birth years',
    'gen alpha birth years',

    // Chinese Zodiac Keywords
    'chinese zodiac by birth year',
    'chinese zodiac calculator',
    'what is my chinese zodiac',
    'zodiac sign birth year',

    // Question Keywords
    'how to calculate birth year',
    'how to find birth year from age',
    'what is my birth year',
    'when was I born calculator',
    'year I was born',

    // Feature Keywords
    'free birth year calculator',
    'online birth year calculator',
    'instant birth year calculator',
    'birth year tool',
    'age birth year converter',

    // Long-tail Keywords
    'calculate birth year from current age',
    'find year of birth from age',
    'birth year calculator with generation',
    'what year were you born calculator',
    'year born age calculator',

    // Date Keywords
    'birth date calculator',
    'birthday year calculator',
    'year of birth from age today',
    'calculate year born',

    // India-Specific
    'birth year calculator india',
    'year of birth calculator',
    'age calculator india',

    // Related Terms
    'year born calculator',
    'born in what year',
    'calculate what year born',
    'age year calculator',
    'birth year lookup',

    // Historical Keywords
    'what happened in my birth year',
    'historical events birth year',
    'born during what era',
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
    canonical: 'https://www.thetutorbridge.com/calculators/birth-year-calculator',
  },
  openGraph: {
    title: 'Free Birth Year Calculator - Find Year of Birth from Age',
    description: 'Calculate birth year from age or find age from birth year. Includes generation classification, Chinese zodiac sign, and milestone years.',
    url: 'https://www.thetutorbridge.com/calculators/birth-year-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: '/TheTutorBridge Logo New.png',
        width: 1200,
        height: 630,
        alt: 'Birth Year Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Birth Year Calculator',
    description: 'Find birth year from age instantly. Includes generation info, Chinese zodiac, and historical context for your birth year.',
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

export default function BirthYearCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
