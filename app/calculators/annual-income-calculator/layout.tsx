import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Annual Income Calculator - Convert Hourly Wage to Yearly Salary | Free Online Tool',
  description: 'Free annual income calculator to convert hourly wage to yearly salary. Calculate gross and net income with tax deductions. Works for any currency and work schedule.',
  keywords: [
    // Primary Keywords
    'annual income calculator',
    'yearly salary calculator',
    'hourly to annual salary',
    'hourly to yearly calculator',
    'salary calculator',

    // Hourly to Annual Keywords
    'hourly wage to annual salary',
    'hourly to salary converter',
    'convert hourly to yearly',
    'hourly rate to annual income',
    'hourly pay to annual salary',

    // Annual to Hourly Keywords
    'annual salary to hourly',
    'salary to hourly calculator',
    'yearly to hourly converter',
    'convert salary to hourly rate',

    // Question Keywords
    'how much is 15 an hour annually',
    'how much is 20 an hour yearly',
    'what is 25 an hour annually',
    'how to calculate annual income',
    'how many hours in a work year',

    // Specific Hourly Rate Questions
    '15 an hour is how much a year',
    '20 an hour is how much a year',
    '25 dollars an hour annually',
    '30 an hour is how much a year',
    '50 an hour annual salary',

    // Income Related Keywords
    'gross annual income calculator',
    'net annual income calculator',
    'take home pay calculator',
    'after tax income calculator',
    'gross vs net income',

    // Work Schedule Keywords
    'full time salary calculator',
    'part time salary calculator',
    'weekly to annual salary',
    'monthly to annual income',
    'biweekly salary calculator',

    // Tax Keywords
    'salary after tax calculator',
    'income tax calculator',
    'net pay calculator',
    'paycheck calculator',
    'tax deduction calculator',

    // Feature Keywords
    'free salary calculator',
    'online income calculator',
    'instant salary calculator',
    'wage calculator',
    'pay calculator',

    // Long-tail Keywords
    'calculate annual salary from hourly wage',
    'hourly wage to yearly salary converter',
    'annual income calculator with tax',
    'salary calculator hourly to yearly',
    'how to convert hourly pay to salary',

    // India-Specific Keywords
    'annual income calculator india',
    'salary calculator india',
    'ctc calculator',
    'in hand salary calculator',

    // Related Terms
    'compensation calculator',
    'earnings calculator',
    'income converter',
    'money calculator',
    'finance calculator',

    // Job Related Keywords
    'job salary calculator',
    'employment income calculator',
    'work income calculator',
    'freelance income calculator',
    'contract salary calculator',

    // Comparison Keywords
    'salary comparison calculator',
    'hourly vs salary calculator',
    'income comparison tool',
    'wage comparison calculator',
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
    canonical: 'https://www.thetutorbridge.com/calculators/annual-income-calculator',
  },
  openGraph: {
    title: 'Free Annual Income Calculator - Hourly to Yearly Salary Converter',
    description: 'Convert hourly wage to annual salary instantly. Calculate gross and net income with tax deductions. Free online salary calculator for any work schedule.',
    url: 'https://www.thetutorbridge.com/calculators/annual-income-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: '/TheTutorBridge Logo New.png',
        width: 1200,
        height: 630,
        alt: 'Annual Income Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Annual Income Calculator',
    description: 'Convert hourly wage to yearly salary. Calculate gross and net income with tax deductions. Instant results with income breakdown.',
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

export default function AnnualIncomeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
