import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Percentage Calculator - Calculate Percentages Free Online',
  description: 'Free percentage calculator. Calculate percentage of a number, percentage change, percentage increase/decrease, and more. Perfect for discounts, tips, and taxes.',
  keywords: [
    'percentage calculator',
    'calculate percentage',
    'percent calculator',
    'percentage change',
    'percentage increase',
    'percentage decrease',
    'percent of',
  ],
  openGraph: {
    title: 'Free Percentage Calculator',
    description: 'Calculate percentages instantly.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/percentage-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Percentage Calculator',
    description: 'Calculate percentages.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/percentage-calculator',
  },
};

export default function PercentageCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
