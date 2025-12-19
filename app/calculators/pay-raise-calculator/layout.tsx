import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pay Raise Calculator - Calculate New Salary After Raise | Free Online Tool',
  description: 'Free pay raise calculator to compute your new salary after a raise. Enter current pay and raise percentage to see hourly, weekly, monthly, and annual breakdowns instantly.',
  keywords: [
    // Primary Keywords
    'pay raise calculator',
    'salary raise calculator',
    'wage increase calculator',
    'raise calculator',
    'salary increase calculator',

    // Percentage Keywords
    'raise percentage calculator',
    'percent raise calculator',
    'salary percentage increase',
    'calculate raise percentage',
    'what percent raise',

    // New Salary Keywords
    'new salary calculator',
    'salary after raise',
    'calculate new pay',
    'post raise salary',
    'updated salary calculator',

    // Question Keywords
    'how much is my raise',
    'what will my new salary be',
    'how to calculate pay raise',
    'what is my raise percentage',
    'how much more will I make',

    // Conversion Keywords
    'hourly to annual raise',
    'annual salary raise',
    'weekly pay increase',
    'monthly salary raise',
    'hourly raise calculator',

    // Negotiation Keywords
    'salary negotiation calculator',
    'raise negotiation tool',
    'merit increase calculator',
    'promotion raise calculator',
    'job offer calculator',

    // Comparison Keywords
    'compare salaries',
    'before and after raise',
    'salary comparison tool',
    'pay increase comparison',
    'old vs new salary',

    // Work Keywords
    'work raise calculator',
    'employee raise calculator',
    'job raise calculator',
    'career salary calculator',
    'income increase calculator',

    // Financial Keywords
    'income raise calculator',
    'earnings increase calculator',
    'compensation calculator',
    'pay bump calculator',
    'wage raise calculator',

    // Specific Raise Keywords
    '3 percent raise',
    '5 percent raise calculator',
    '10 percent raise',
    'cost of living raise',
    'annual raise calculator',

    // Long-tail Keywords
    'calculate salary after percentage raise',
    'how to figure out pay raise',
    'convert raise percentage to dollars',
    'salary increase percentage calculator',
    'pay raise amount calculator',

    // Feature Keywords
    'free raise calculator',
    'online salary calculator',
    'instant raise calculation',
    'accurate pay calculator',
    'easy raise calculator',

    // Time Period Keywords
    'yearly raise calculator',
    'annual increase calculator',
    'monthly raise calculator',
    'hourly wage raise',
    'weekly pay raise',

    // Type Keywords
    'merit raise calculator',
    'performance raise calculator',
    'promotion salary calculator',
    'cost of living adjustment',
    'COLA calculator',

    // Planning Keywords
    'salary planning calculator',
    'raise planning tool',
    'budget raise calculator',
    'financial planning raise',
    'income planning tool',

    // Additional Keywords
    'pay increase tool',
    'wage calculator',
    'salary tool',
    'compensation increase',
    'take home pay raise',
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
    canonical: 'https://www.thetutorbridge.com/calculators/pay-raise-calculator',
  },
  openGraph: {
    title: 'Free Pay Raise Calculator - Calculate Your New Salary',
    description: 'Find out your new salary after a raise! Enter your current pay and raise percentage to see hourly, weekly, monthly, and annual breakdowns instantly.',
    url: 'https://www.thetutorbridge.com/calculators/pay-raise-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: '/TheTutorBridge Logo New.png',
        width: 1200,
        height: 630,
        alt: 'Pay Raise Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Pay Raise Calculator',
    description: 'Calculate your new salary after a raise. See the difference in hourly, weekly, monthly, and annual pay instantly!',
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

export default function PayRaiseCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
