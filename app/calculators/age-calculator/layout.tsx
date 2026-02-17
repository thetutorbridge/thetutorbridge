import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Age Calculator - Calculate Exact Age in Years, Months, Days | Free Online Tool',
  description: 'Free online age calculator to find exact age between two dates. Calculate age in years, months, weeks, days, hours, minutes & seconds. Perfect for students, schools, job applications & official documents.',
  keywords: [
    'age calculator',
    'calculate age',
    'age calculator online',
    'date of birth calculator',
    'exact age calculator',
    'age in years months days',
    'how old am i',
    'age calculator for students',
    'age verification calculator',
    'date difference calculator',
    'time interval calculator',
    'birthday calculator',
    'age calculator india',
    'age calculator for school admission',
    'age calculator for job application',
    'calculate age from date of birth',
    'age calculator with date',
    'accurate age calculator',
    'age calculator for official documents',
    'age calculator for education',
  ],
  openGraph: {
    title: 'Free Age Calculator - Calculate Exact Age Online',
    description: 'Calculate your exact age or time interval between two dates instantly. Get age in years, months, weeks, days, hours, and seconds. Perfect for students and professionals.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/calculators/age-calculator',
    siteName: 'The Tutor Bridge',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Age Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Age Calculator - Calculate Exact Age Online',
    description: 'Calculate your exact age or time interval between two dates in years, months, weeks, days, hours, minutes & seconds.',
    images: ['https://www.thetutorbridge.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/calculators/age-calculator',
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

export default function AgeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
