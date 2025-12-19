import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Percentage Change Calculator - Free % Change Calculator with Steps | The Tutor Bridge',
  description: 'Free percentage change calculator with step-by-step solutions. Calculate percentage increase, decrease, growth rate, and change between any two values. Perfect for business, finance, statistics, and education with proper mathematical notation.',
  keywords: [
    'percentage change calculator',
    'percent change calculator',
    'calculate percentage change',
    'percentage calculator',
    'percent calculator',
    'change calculator',
    'percentage growth calculator',
    'percentage decrease calculator',
    'calculate percent change',
    'how to calculate percentage change',
    'percentage change formula',
    'percent change formula',
    'percentage difference calculator',
    'relative change calculator',
    'rate of change calculator',
    'percentage variation calculator',
    'percent increase decrease calculator',
    'calculate growth rate',
    'percentage fluctuation calculator',
    'compare percentage change',
    'percentage change between two numbers',
    'percent change step by step',
    'online percentage calculator',
    'free percent calculator',
    'percentage change solver',
    'business percentage calculator',
    'financial percentage calculator',
    'statistical percentage calculator',
    'math percentage calculator',
    'percentage analysis tool',
    'calculate relative change',
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
    canonical: 'https://www.thetutorbridge.com/calculators/percentage-change-calculator',
  },
  openGraph: {
    title: 'Percentage Change Calculator - Calculate % Change with Steps',
    description: 'Free percentage change calculator with step-by-step solutions and mathematical notation. Measure increases, decreases, and growth rates between any two values.',
    url: 'https://www.thetutorbridge.com/calculators/percentage-change-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Percentage Change Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Percentage Change Calculator - Free % Change Tool',
    description: 'Calculate percentage change instantly with detailed step-by-step solutions. Perfect for business analysis and data comparison.',
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

export default function PercentageChangeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
