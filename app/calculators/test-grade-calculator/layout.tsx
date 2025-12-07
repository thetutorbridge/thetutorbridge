import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test Grade Calculator - Calculate Test Scores & Letter Grades | The Tutor Bridge',
  description: 'Free test grade calculator to convert test scores to percentages and letter grades. Enter total questions and wrong answers to instantly calculate your grade with multiple grading scales.',
  keywords: [
    'test grade calculator',
    'grade calculator',
    'test score calculator',
    'test percentage calculator',
    'calculate test grade',
    'test grading calculator',
    'how to calculate test grade',
    'test score to percentage',
    'calculate test percentage',
    'quiz grade calculator',
    'exam grade calculator',
    'test marks calculator',
    'grade percentage calculator',
    'points to grade calculator',
    'score to grade calculator',
    'letter grade calculator',
    'test result calculator',
    'free grade calculator',
    'online test calculator',
    'instant grade calculator',
    'what is my test grade',
    'how to find test percentage',
    'convert test score to grade',
    'test grade formula',
    'percentage score calculator',
    'academic grade calculator',
    'school grade calculator',
    'student grade calculator',
    'teacher grading tool',
    'grading scale calculator',
    'A B C D F grading',
    'pass fail calculator',
    'test scoring calculator',
    'points earned calculator',
    'number wrong to grade',
    'number correct to percentage',
    'test calculator for students',
    'homework grade calculator',
    'assignment grade calculator',
    'final exam calculator',
    'grade checker',
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
    canonical: '/calculators/test-grade-calculator',
  },
  openGraph: {
    title: 'Test Grade Calculator - Calculate Test Scores & Letter Grades',
    description: 'Free test grade calculator to convert test scores to percentages and letter grades instantly. Multiple grading scales supported.',
    url: 'https://thetutorbridge.com/calculators/test-grade-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Test Grade Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test Grade Calculator - Free Tool',
    description: 'Calculate test grades instantly. Convert scores to percentages and letter grades with multiple grading scales.',
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

export default function TestGradeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
