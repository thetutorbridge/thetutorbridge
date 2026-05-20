import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student Loan Calculator - Free Loan Repayment Calculator | The Tutor Bridge',
  description: 'Free Student Loan Calculator to estimate monthly payments, total interest, and payoff time. Plan your student loan repayment with our easy-to-use calculator. Compare repayment plans.',
  keywords: [
    'student loan calculator',
    'student loan repayment calculator',
    'student loan payment calculator',
    'education loan calculator',
    'college loan calculator',
    'student debt calculator',
    'loan payoff calculator',
    'student loan interest calculator',
    'federal student loan calculator',
    'private student loan calculator',
    'student loan monthly payment',
    'how much will my student loan cost',
    'student loan amortization calculator',
    'student loan refinance calculator',
    'student loan consolidation calculator',
    'income driven repayment calculator',
    'idr calculator',
    'paye calculator',
    'repaye calculator',
    'ibr calculator',
    'pslf calculator',
    'public service loan forgiveness calculator',
    'student loan forgiveness calculator',
    'loan balance calculator',
    'extra payment calculator',
    'student loan payoff time',
    'how long to pay off student loans',
    'student loan interest rate calculator',
    'education loan emi calculator',
    'study loan calculator',
    'university loan calculator',
    'graduate loan calculator',
    'undergraduate loan calculator',
    'student finance calculator',
    'tuition loan calculator',
    'free student loan calculator',
    'best student loan calculator',
    'student loan estimator',
    'loan repayment estimator',
    'student loan planning',
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
    canonical: 'https://www.thetutorbridge.com/calculators/student-loan-calculator',
  },
  openGraph: {
    title: 'Student Loan Calculator - Repayment Calculator | The Tutor Bridge',
    description: 'Calculate your student loan payments, total interest, and payoff timeline. Free calculator to plan your education loan repayment.',
    url: 'https://www.thetutorbridge.com/calculators/student-loan-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Student Loan Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Loan Calculator - Free Repayment Tool',
    description: 'Plan your student loan repayment with our free calculator. Estimate payments and payoff time.',
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

export default function StudentLoanCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
