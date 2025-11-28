import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salary to Hourly Calculator - Convert Annual/Monthly Salary to Hourly Rate | The Tutor Bridge',
  description: 'Free salary to hourly calculator to convert annual, monthly, or weekly salary to hourly rate. Calculate your wage across daily, weekly, biweekly, and monthly periods. Perfect for job comparisons and budgeting.',
  keywords: [
    // Primary Keywords
    'salary to hourly calculator',
    'salary to hourly converter',
    'convert salary to hourly',
    'annual salary to hourly',
    'monthly salary to hourly',

    // Question Keywords
    'how to convert salary to hourly',
    'how to calculate hourly rate from salary',
    'what is my hourly rate',
    'how much do i make per hour',
    'salary to hourly formula',

    // Feature Keywords
    'hourly wage calculator',
    'hourly rate calculator',
    'pay rate converter',
    'wage converter',
    'salary converter',

    // Period-Specific Keywords
    'annual to hourly calculator',
    'monthly to hourly calculator',
    'weekly to hourly calculator',
    'daily rate calculator',
    'biweekly salary calculator',

    // India-Specific Keywords
    'salary to hourly calculator india',
    'hourly rate calculator inr',
    'indian salary converter',
    'ctc to hourly calculator',
    'monthly salary to hourly india',

    // Use Case Keywords
    'job offer comparison calculator',
    'freelance rate calculator',
    'hourly rate for freelancers',
    'salary negotiation calculator',
    'overtime rate calculator',

    // Long-tail Keywords
    'convert annual salary to hourly wage',
    'calculate hourly rate from monthly salary',
    'how much is 50000 salary per hour',
    'salary breakdown calculator',
    'wage conversion tool',

    // Related Keywords
    'salary calculator',
    'pay calculator',
    'income calculator',
    'earnings calculator',
    'compensation calculator',
    'take home pay calculator',
    'gross salary calculator',

    // Educational Keywords
    'salary conversion formula',
    'hourly rate formula',
    '2080 hours calculation',
    'working hours per year',
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
    canonical: 'https://thetutorbridge.com/calculators/salary-to-hourly-calculator',
  },
  openGraph: {
    title: 'Free Salary to Hourly Calculator - Convert Any Salary to Hourly Rate',
    description: 'Convert annual, monthly, or weekly salary to hourly rate instantly. Calculate your wage across all time periods. Works for INR, USD, EUR, GBP.',
    url: 'https://thetutorbridge.com/calculators/salary-to-hourly-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: '/TheTutorBridge Logo New.png',
        width: 1200,
        height: 630,
        alt: 'Salary to Hourly Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Salary to Hourly Calculator',
    description: 'Convert annual, monthly, or weekly salary to hourly rate. Calculate daily, weekly, biweekly, and monthly wages instantly.',
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

export default function SalaryToHourlyCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
