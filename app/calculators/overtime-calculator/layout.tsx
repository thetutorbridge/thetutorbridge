import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Overtime Calculator - Free Overtime Pay Calculator | The Tutor Bridge',
  description: 'Free overtime calculator to calculate overtime pay with regular hours and overtime hours. Supports 1.5x, 2x multipliers, hourly/weekly/monthly rates. Find total pay instantly.',
  keywords: [
    'overtime calculator',
    'overtime pay calculator',
    'calculate overtime',
    'overtime hours calculator',
    'time and a half calculator',
    '1.5x overtime calculator',
    'double time calculator',
    '2x overtime',
    'overtime wage calculator',
    'overtime salary calculator',
    'overtime pay rate',
    'overtime multiplier',
    'how to calculate overtime',
    'overtime formula',
    'overtime calculation',
    'regular hours calculator',
    'extra hours pay',
    'overtime earnings',
    'weekly overtime calculator',
    'monthly overtime calculator',
    'hourly overtime rate',
    'overtime pay rate calculator',
    'total pay calculator',
    'paycheck calculator overtime',
    'work hours calculator',
    'overtime payment',
    'overtime wages',
    'overtime compensation',
    'OT calculator',
    'OT pay calculator',
    '40 hour work week',
    'overtime after 40 hours',
    'overtime rules',
    'FLSA overtime',
    'overtime exemption',
    'non-exempt overtime',
    'overtime rate calculator',
    'overtime income',
    'overtime paycheck',
    'free overtime calculator',
    'online overtime calculator',
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
    canonical: '/calculators/overtime-calculator',
  },
  openGraph: {
    title: 'Overtime Calculator - Calculate Overtime Pay',
    description: 'Free overtime calculator with regular hours, overtime hours, and multipliers. Calculate total pay with 1.5x or 2x overtime rates.',
    url: 'https://thetutorbridge.com/calculators/overtime-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Overtime Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Overtime Calculator - Free Tool',
    description: 'Calculate overtime pay with 1.5x, 2x multipliers. Find total earnings from regular and overtime hours.',
    images: ['https://thetutorbridge.com/og-calculator.png'],
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

export default function OvertimeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
