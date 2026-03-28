import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Word Problems with Step-by-Step Solutions - 2000+ Problems',
  description: 'Solve 2000+ word problems with detailed step-by-step solutions. Covers age, distance, money, percentage, geometry, and more. Free math word problem solver for all grade levels.',
  keywords: [
    'word problems',
    'math word problems',
    'word problem solver',
    'age problems',
    'distance problems',
    'money problems',
    'percentage word problems',
    'geometry word problems',
    'step by step solutions',
    'math help',
  ],
  openGraph: {
    title: 'Word Problems Solver - 2000+ Problems with Solutions',
    description: 'Master word problems with detailed step-by-step explanations for all types.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/word-problems',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Word Problems Solver',
    description: '2000+ word problems with step-by-step solutions.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/word-problems',
  },
};

export default function WordProblemsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
