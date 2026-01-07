import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Steps to Miles Calculator | 10,000 Steps = 4.5 Miles (by Height) [Free]',
  description: 'Free steps to miles calculator: 10,000 steps≈4.5 miles, 5,000 steps≈2.25 miles. Convert walking steps to miles based on your height, stride length, or gender average.',
  keywords: [
    // Primary Keywords
    'steps to miles calculator',
    'steps to distance calculator',
    'convert steps to miles',
    'steps to miles converter',
    'how many miles is 10000 steps',

    // Step Count Keywords
    '10000 steps in miles',
    '5000 steps in miles',
    '20000 steps in miles',
    '15000 steps in miles',
    'steps per mile calculator',

    // Question Keywords
    'how many steps in a mile',
    'how far is 10000 steps',
    'steps to miles formula',
    'how many miles walked',
    'convert steps to distance',

    // Stride Keywords
    'stride length calculator',
    'steps to miles by height',
    'stride length by height',
    'average stride length',
    'stride length male female',

    // Distance Keywords
    'steps to kilometers',
    'steps to km calculator',
    'walking distance calculator',
    'pedometer distance calculator',
    'step counter miles',

    // Fitness Keywords
    'walking steps calculator',
    'daily steps to miles',
    'fitness steps calculator',
    'exercise steps distance',
    'walking distance tracker',

    // Feature Keywords
    'free steps calculator',
    'online steps converter',
    'instant steps to miles',
    'accurate step distance',
    'step distance tool',

    // Gender Keywords
    'steps to miles male',
    'steps to miles female',
    'stride length men women',
    'average steps per mile',

    // Goal Keywords
    '10k steps distance',
    'daily step goal miles',
    'walking goal calculator',
    'step target distance',

    // Long-tail Keywords
    'how many miles is 10000 steps walking',
    'convert steps walked to miles',
    'steps to miles based on height',
    'calculate distance from steps',
    'walking steps to miles conversion',

    // Health Keywords
    'health steps calculator',
    'step count distance',
    'walking exercise distance',
    'daily walking miles',

    // Device Keywords
    'fitbit steps to miles',
    'apple watch steps miles',
    'pedometer steps calculator',
    'step tracker distance',

    // Running Keywords
    'running steps to miles',
    'jogging steps calculator',
    'steps per mile running',

    // India-Specific
    'steps to miles calculator india',
    'steps to kilometers india',
    'walking distance calculator india',
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
    canonical: 'https://www.thetutorbridge.com/calculators/steps-to-miles-calculator',
  },
  openGraph: {
    title: 'Free Steps to Miles Calculator - Convert Walking Steps to Distance',
    description: 'Convert your walking steps to miles, kilometers, or meters. Calculate based on average stride length, your height, or custom measurements.',
    url: 'https://www.thetutorbridge.com/calculators/steps-to-miles-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: '/TheTutorBridge Logo New.png',
        width: 1200,
        height: 630,
        alt: 'Steps to Miles Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Steps to Miles Calculator',
    description: 'Find out how many miles your steps equal. 10,000 steps = ~4-5 miles. Calculate your exact distance based on stride length.',
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

export default function StepsToMilesCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
