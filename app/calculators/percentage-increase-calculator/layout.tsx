import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Percentage Increase Calculator - Free % Change Calculator with Steps | The Tutor Bridge',
  description: 'Free percentage increase calculator with step-by-step solutions. Calculate percentage change, growth rate, price increase, salary raise, and more with proper mathematical notation. Perfect for business, finance, and education.',
  keywords: [
    'percentage increase calculator',
    'percentage change calculator',
    'percent increase calculator',
    'calculate percentage increase',
    'percentage growth calculator',
    'percent change calculator',
    'how to calculate percentage increase',
    'percentage calculator',
    'increase calculator',
    'growth rate calculator',
    'percentage difference calculator',
    'percent calculator',
    'price increase calculator',
    'salary increase calculator',
    'percentage rise calculator',
    'rate of increase calculator',
    'percentage gain calculator',
    'percent growth calculator',
    'calculate percent change',
    'percentage formula calculator',
    'relative increase calculator',
    'percentage increase formula',
    'increase percentage calculator',
    'percentage markup calculator',
    'growth percentage calculator',
    'percent increase formula',
    'calculate growth rate',
    'percentage increase decrease calculator',
    'find percentage increase',
    'percentage calculator increase',
    'online percentage calculator',
    'free percentage calculator',
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
    canonical: '/calculators/percentage-increase-calculator',
  },
  openGraph: {
    title: 'Percentage Increase Calculator - Calculate % Change with Steps',
    description: 'Free percentage increase calculator with step-by-step solutions and mathematical notation. Perfect for calculating price increases, salary raises, and growth rates.',
    url: 'https://thetutorbridge.com/calculators/percentage-increase-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Percentage Increase Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Percentage Increase Calculator - Free % Change Tool',
    description: 'Calculate percentage increase instantly with step-by-step solutions. Perfect for business, finance, and education.',
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

export default function PercentageIncreaseCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
