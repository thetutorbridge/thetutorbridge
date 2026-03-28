import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Age Calculator - Calculate Your Exact Age in Years, Months & Days Free',
  description: 'Free online age calculator. Calculate your exact age in years, months, days, weeks, and hours. Find days until next birthday. Perfect for documents, retirement planning, and age verification.',
  keywords: [
    'age calculator',
    'calculate age',
    'age calculation',
    'how old am i',
    'date of birth calculator',
    'age in days',
    'age in months',
    'birthday calculator',
    'exact age',
    'age counter',
    'online age calculator',
    'free age calculator',
  ],
  openGraph: {
    title: 'Free Age Calculator - Calculate Your Exact Age Online',
    description: 'Calculate your exact age in years, months, days. Find days until birthday. 100% free.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/age-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Age Calculator',
    description: 'Calculate your exact age in years, months, and days.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/age-calculator',
  },
};

export default function AgeCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
