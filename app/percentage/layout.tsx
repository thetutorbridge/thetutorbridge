import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Percentage Calculator - Calculate 100+ Common Problems',
  description: 'Calculate percentages with step-by-step solutions. What is X% of Y? Find answers for 100+ popular problems with detailed explanations.',
  keywords: [
    'percentage calculator',
    'what is percent of',
    'calculate percentage',
    'percent calculation',
    'percentage math',
    'how to calculate percentages',
    'percentage problems',
    'percentage solutions',
  ],
  openGraph: {
    title: 'Percentage Calculator - 100+ Solved Problems',
    description: 'Calculate percentages with step-by-step solutions for 100+ popular problems.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/percentage',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Percentage Calculator',
    description: 'Calculate 100+ percentage problems with detailed step-by-step solutions.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/percentage',
  },
};

export default function PercentageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
