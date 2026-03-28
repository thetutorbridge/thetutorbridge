import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Date Calculator - Add or Subtract Days, Weeks, Months, Years from Date',
  description: 'Free online date calculator. Add or subtract days, weeks, months, and years from any date. Calculate future and past dates easily. Perfect for project planning and deadlines.',
  keywords: [
    'date calculator',
    'add days to date',
    'subtract days from date',
    'date math',
    'calculate date',
    'date calculation',
    'days calculator',
    'date add subtract',
    'future date calculator',
    'past date calculator',
    'deadline calculator',
  ],
  openGraph: {
    title: 'Free Date Calculator - Add or Subtract Time from Any Date',
    description: 'Calculate future and past dates. Add or subtract days, weeks, months, years. 100% free.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/date-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Date Calculator',
    description: 'Add or subtract time from any date easily.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/date-calculator',
  },
};

export default function DateCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
