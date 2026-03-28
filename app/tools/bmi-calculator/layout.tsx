import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BMI Calculator - Calculate Body Mass Index Free Online',
  description: 'Free BMI calculator. Calculate your Body Mass Index with metric or imperial units. Understand your weight category and health status.',
  keywords: [
    'bmi calculator',
    'body mass index',
    'bmi',
    'calculate bmi',
    'weight calculator',
    'health calculator',
    'obesity calculator',
  ],
  openGraph: {
    title: 'Free BMI Calculator',
    description: 'Calculate your BMI instantly.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/bmi-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free BMI Calculator',
    description: 'Calculate BMI.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/bmi-calculator',
  },
};

export default function BmiCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
