import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VO2 Max Calculator - Free Aerobic Capacity Calculator | The Tutor Bridge',
  description: 'Free VO2 max calculator to measure your aerobic capacity. Use 5 test methods: resting heart rate, 1-mile walk, 3-min step test, 1.5-mile run, or rowing. Get fitness classification.',
  keywords: [
    'VO2 max calculator',
    'aerobic capacity calculator',
    'VO2 max test',
    'cardio fitness calculator',
    'cardiovascular fitness',
    'maximal oxygen uptake',
    'VO2 max estimation',
    'fitness level calculator',
    'aerobic fitness test',
    'resting heart rate VO2 max',
    '1 mile walk test',
    'rockport walk test',
    '3 minute step test',
    'queens college step test',
    '1.5 mile run test',
    'cooper test VO2 max',
    '2000m rowing test',
    'VO2 max formula',
    'cardiorespiratory fitness',
    'endurance fitness',
    'VO2 max by age',
    'VO2 max chart',
    'good VO2 max',
    'VO2 max norms',
    'aerobic capacity test',
    'oxygen consumption',
    'ml/kg/min',
    'fitness classification',
    'cardiovascular health',
    'athletic performance',
    'HIIT VO2 max',
    'improve VO2 max',
    'free VO2 max calculator',
    'online VO2 max test',
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
    canonical: '/calculators/vo2-max-calculator',
  },
  openGraph: {
    title: 'VO2 Max Calculator - Aerobic Capacity Test',
    description: 'Calculate your VO2 max using 5 different test methods. Get your fitness classification and tips to improve cardiovascular health.',
    url: 'https://thetutorbridge.com/calculators/vo2-max-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'VO2 Max Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VO2 Max Calculator - Free Tool',
    description: 'Calculate your aerobic capacity with 5 test methods. Free VO2 max calculator with fitness classification.',
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

export default function VO2MaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
