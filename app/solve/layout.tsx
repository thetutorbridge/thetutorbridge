import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Equation Solver - Step-by-Step Solutions for 100+ Algebra Equations',
  description:
    'Solve algebra equations with our comprehensive step-by-step guides. Get detailed solutions for 100+ popular equations including linear equations, two-step equations, and multi-step problems. Free math help for students.',
  keywords: [
    'equation solver',
    'algebra solver',
    'step by step solutions',
    'solve equations',
    'linear equations',
    'math help',
    'algebra help',
    'equation calculator',
    'free math solver',
  ],
  openGraph: {
    title: 'Equation Solver - Step-by-Step Solutions',
    description: 'Solve 100+ algebra equations with detailed step-by-step solutions. Free math help for students.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/solve',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Equation Solver - Step-by-Step Solutions',
    description: 'Solve 100+ algebra equations with detailed step-by-step solutions.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/solve',
  },
};

export default function SolveLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
