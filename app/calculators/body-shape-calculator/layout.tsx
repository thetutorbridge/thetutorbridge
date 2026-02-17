import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Body Shape Calculator - Find Your Body Type | Free Online Tool',
  description: 'Free body shape calculator to determine your body type (hourglass, pear, apple, rectangle, inverted triangle). Enter bust, waist, and hip measurements to get personalized fashion tips.',
  keywords: [
    // Primary Keywords
    'body shape calculator',
    'body type calculator',
    'body shape test',
    'what is my body shape',
    'find my body shape',

    // Body Shape Types
    'hourglass body shape',
    'pear body shape',
    'apple body shape',
    'rectangle body shape',
    'inverted triangle body shape',
    'spoon body shape',
    'triangle body shape',

    // Question Keywords
    'what body shape am I',
    'how to know my body shape',
    'how to determine body shape',
    'how to find body type',
    'which body shape do I have',
    'what is my body type quiz',

    // Measurement Keywords
    'body measurements calculator',
    'bust waist hip calculator',
    'bust waist hip ratio',
    'body proportion calculator',
    'body ratio calculator',

    // Fashion Keywords
    'dress for your body shape',
    'clothes for my body type',
    'fashion for body shape',
    'style for body type',
    'how to dress for your body',
    'flattering clothes body shape',
    'body shape fashion guide',

    // Feature Keywords
    'free body shape calculator',
    'online body shape test',
    'body shape analyzer',
    'body type finder',
    'body shape identifier',
    'body figure calculator',

    // Specific Shape Keywords
    'am I an hourglass',
    'am I a pear shape',
    'am I an apple shape',
    'hourglass figure calculator',
    'pear shape calculator',
    'apple shape calculator',

    // Health Keywords
    'body shape health',
    'body type and health',
    'body composition calculator',
    'body proportions',
    'healthy body shape',

    // Women Keywords
    'women body shape calculator',
    'female body shape test',
    'women body type quiz',
    'female figure calculator',
    'ladies body shape',

    // Long-tail Keywords
    'calculate your body shape free',
    'body shape calculator with measurements',
    'accurate body shape calculator',
    'body shape calculator bust waist hips',
    'determine body shape from measurements',

    // India-Specific
    'body shape calculator india',
    'indian body type calculator',
    'body shape for indian women',
    'saree for body shape',

    // Related Terms
    'silhouette calculator',
    'figure type calculator',
    'body frame calculator',
    'body shape guide',
    'body shape chart',

    // Celebrity Keywords
    'celebrity body shapes',
    'hourglass celebrities',
    'pear shape celebrities',
    'dress like celebrity body type',

    // Shopping Keywords
    'shop for my body shape',
    'best clothes for my figure',
    'swimsuit for body shape',
    'jeans for body type',
    'wedding dress body shape',
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
    canonical: 'https://www.thetutorbridge.com/calculators/body-shape-calculator',
  },
  openGraph: {
    title: 'Free Body Shape Calculator - Find Your Body Type',
    description: 'Discover your body shape (hourglass, pear, apple, rectangle, or inverted triangle) based on your measurements. Get personalized fashion tips and style recommendations.',
    url: 'https://www.thetutorbridge.com/calculators/body-shape-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Body Shape Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Body Shape Calculator',
    description: 'Find your body shape with our free calculator. Enter bust, waist, and hip measurements to discover your body type and get fashion recommendations.',
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

export default function BodyShapeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
