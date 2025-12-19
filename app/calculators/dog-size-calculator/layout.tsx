import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dog Size Calculator - Predict Puppy Adult Weight & Size | Free Online Tool',
  description: 'Free dog size calculator to predict your puppy\'s adult weight and size category. Enter puppy age and current weight to estimate how big your dog will grow.',
  keywords: [
    // Primary Keywords
    'dog size calculator',
    'puppy weight calculator',
    'puppy adult size predictor',
    'how big will my puppy get',
    'dog weight predictor',

    // Puppy Keywords
    'puppy size calculator',
    'puppy growth calculator',
    'puppy weight predictor',
    'estimate puppy adult weight',
    'predict puppy size',

    // Question Keywords
    'how big will my dog be',
    'what size will my puppy be',
    'how much will my puppy weigh',
    'puppy size prediction',
    'dog adult weight calculator',

    // Breed Size Keywords
    'small dog calculator',
    'medium dog size',
    'large dog weight',
    'giant breed weight',
    'toy dog size',

    // Growth Keywords
    'puppy growth chart',
    'dog growth calculator',
    'puppy weight chart',
    'when do dogs stop growing',
    'dog growth stages',

    // Age Keywords
    'puppy weight by age',
    '8 week puppy weight',
    '12 week puppy size',
    '6 month puppy weight',
    'puppy age calculator',

    // Feature Keywords
    'free dog calculator',
    'online puppy calculator',
    'instant dog size estimate',
    'accurate puppy weight',
    'dog size predictor tool',

    // Breed Keywords
    'labrador adult weight',
    'german shepherd size',
    'golden retriever weight',
    'french bulldog adult size',
    'mixed breed size calculator',

    // Long-tail Keywords
    'calculate adult dog weight from puppy',
    'predict dog size from puppy weight',
    'puppy to adult weight calculator',
    'estimate dog full grown size',
    'how to calculate dog adult weight',

    // Category Keywords
    'toy breed weight calculator',
    'small breed size predictor',
    'medium breed adult weight',
    'large breed growth calculator',
    'giant breed size estimator',

    // Pet Keywords
    'pet size calculator',
    'dog growth prediction',
    'puppy development calculator',
    'canine weight calculator',
    'dog breed size chart',

    // Health Keywords
    'healthy puppy weight',
    'puppy weight guide',
    'dog weight range',
    'ideal dog weight',
    'puppy growth milestones',

    // Related Terms
    'dog maturity calculator',
    'puppy full grown size',
    'adult dog weight estimator',
    'dog size chart by breed',
    'puppy weight formula',
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
    canonical: 'https://www.thetutorbridge.com/calculators/dog-size-calculator',
  },
  openGraph: {
    title: 'Free Dog Size Calculator - Predict Puppy Adult Weight',
    description: 'Find out how big your puppy will grow! Enter current age and weight to predict adult size. Includes size categories, growth milestones, and breed comparisons.',
    url: 'https://www.thetutorbridge.com/calculators/dog-size-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: '/TheTutorBridge Logo New.png',
        width: 1200,
        height: 630,
        alt: 'Dog Size Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Dog Size Calculator',
    description: 'Predict your puppy\'s adult weight and size category. Find out if your pup will be toy, small, medium, large, or giant sized!',
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

export default function DogSizeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
