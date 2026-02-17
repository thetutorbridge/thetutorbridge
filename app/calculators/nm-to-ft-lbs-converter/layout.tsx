import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nm to ft-lbs Converter | 1 Nm = 0.7376 ft-lb (Torque Calculator) [Free]',
  description: 'Free Nm to ft-lbs torque converter: 1 Nm = 0.7376 ft-lbs. Convert Newton-meters to foot-pounds for automotive torque specs, lug nuts & engine bolts instantly.',
  keywords: [
    // Primary Keywords
    'nm to ft-lbs converter',
    'newton meters to foot pounds',
    'torque converter',
    'nm to ft lbs',
    'ft-lbs to nm',

    // Conversion Keywords
    'convert nm to ft-lbs',
    'convert newton meters to foot pounds',
    'torque conversion calculator',
    'nm to lb ft',
    'ft lbs to nm converter',

    // Question Keywords
    'how to convert nm to ft-lbs',
    'how many ft-lbs in a nm',
    'what is nm in ft-lbs',
    'nm to ft-lbs formula',
    'ft-lbs to nm formula',

    // Specific Conversion Keywords
    '100 nm to ft-lbs',
    '50 nm to ft-lbs',
    '25 nm to ft-lbs',
    '200 nm to ft-lbs',
    '10 nm to ft-lbs',
    '150 nm in ft-lbs',

    // Automotive Keywords
    'torque wrench converter',
    'wheel torque converter',
    'lug nut torque converter',
    'automotive torque converter',
    'car torque specs converter',

    // Other Units Keywords
    'nm to in-lbs',
    'inch pounds to foot pounds',
    'kgf-m to nm',
    'torque unit converter',
    'all torque units converter',

    // Engineering Keywords
    'torque calculator',
    'rotational force converter',
    'bolt torque converter',
    'fastener torque calculator',
    'mechanical torque converter',

    // Feature Keywords
    'free torque converter',
    'online torque converter',
    'instant torque conversion',
    'accurate torque calculator',
    'torque conversion tool',

    // Long-tail Keywords
    'newton meter to foot pound conversion',
    'convert torque units online',
    'metric to imperial torque',
    'torque specification converter',
    'foot pounds to newton meters calculator',

    // Tool Keywords
    'torque wrench conversion chart',
    'torque conversion table',
    'torque specs lookup',
    'common torque conversions',
    'torque reference guide',

    // Application Keywords
    'engine torque converter',
    'motorcycle torque converter',
    'bicycle torque converter',
    'industrial torque calculator',
    'construction torque specs',

    // Regional Keywords
    'nm to ft-lbs usa',
    'metric torque to imperial',
    'european torque specs',
    'american torque units',

    // Related Terms
    'rotational moment converter',
    'twisting force calculator',
    'torque measurement converter',
    'force moment calculator',
    'lever force converter',
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
    canonical: 'https://www.thetutorbridge.com/calculators/nm-to-ft-lbs-converter',
  },
  openGraph: {
    title: 'Free Nm to ft-lbs Converter - Torque Unit Conversion',
    description: 'Convert torque between Newton-meters and foot-pounds instantly. Includes inch-pounds, kgf-m, and common automotive torque specifications.',
    url: 'https://www.thetutorbridge.com/calculators/nm-to-ft-lbs-converter',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nm to ft-lbs Converter - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Nm to ft-lbs Converter',
    description: 'Convert Newton-meters to foot-pounds and other torque units. Perfect for automotive, engineering, and mechanical applications.',
    images: ['https://www.thetutorbridge.com/og-image.png'],
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

export default function NmToFtLbsConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
