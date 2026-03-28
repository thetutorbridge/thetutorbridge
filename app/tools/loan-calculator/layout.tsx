import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Loan Calculator - Calculate Loan Payments Free Online',
  description: 'Free loan calculator. Calculate monthly payments, total interest, and loan costs. Perfect for mortgages, car loans, and personal loans.',
  keywords: [
    'loan calculator',
    'mortgage calculator',
    'loan payment calculator',
    'interest calculator',
    'monthly payment',
  ],
  openGraph: {
    title: 'Free Loan Calculator',
    description: 'Calculate loan payments instantly.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/loan-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Loan Calculator',
    description: 'Calculate loans.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/loan-calculator',
  },
};

export default function LoanCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
