import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GPA Calculator - Free Grade Point Average Calculator | The Tutor Bridge',
  description: 'Free GPA calculator to calculate your grade point average. Supports 4.0 scale, weighted GPA, cumulative GPA, semester GPA, and multiple grading systems. Calculate high school and college GPA instantly.',
  keywords: [
    // Primary keywords
    'gpa calculator',
    'grade point average calculator',
    'calculate gpa',
    'gpa calc',
    'grade calculator',

    // GPA types
    'cumulative gpa calculator',
    'semester gpa calculator',
    'weighted gpa calculator',
    'unweighted gpa calculator',
    'high school gpa calculator',
    'college gpa calculator',
    'university gpa calculator',

    // Scale-specific
    '4.0 gpa calculator',
    '4.0 scale calculator',
    '5.0 gpa calculator',
    'weighted 5.0 scale',
    '10 point gpa calculator',
    'percentage to gpa',
    'gpa to percentage',

    // Actions
    'how to calculate gpa',
    'calculate my gpa',
    'find my gpa',
    'check gpa',
    'gpa checker',
    'what is my gpa',

    // Grade conversions
    'letter grade to gpa',
    'grade to gpa converter',
    'gpa converter',
    'a to gpa',
    'b+ to gpa',
    'grade points',

    // Academic terms
    'credit hours calculator',
    'quality points',
    'academic gpa',
    'overall gpa',
    'term gpa',
    'final gpa calculator',

    // Specific scenarios
    'gpa calculator with credits',
    'gpa calculator online',
    'free gpa calculator',
    'simple gpa calculator',
    'easy gpa calculator',
    'accurate gpa calculator',

    // Long-tail keywords
    'how to calculate cumulative gpa',
    'how to calculate weighted gpa',
    'gpa calculator for college students',
    'gpa calculator for high school students',
    'calculate gpa from grades',
    'calculate gpa with credit hours',
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
    canonical: '/calculators/gpa-calculator',
  },
  openGraph: {
    title: 'GPA Calculator - Calculate Your Grade Point Average Free',
    description: 'Free GPA calculator supporting 4.0 scale, weighted/unweighted GPA, cumulative and semester calculations. Perfect for high school and college students.',
    url: 'https://thetutorbridge.com/calculators/gpa-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'GPA Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GPA Calculator - Free Grade Point Average Calculator',
    description: 'Calculate your GPA instantly. Supports 4.0 scale, weighted GPA, cumulative GPA for high school and college.',
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

export default function GPACalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
