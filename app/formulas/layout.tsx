import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Math Formulas Database - 500+ Formulas with Examples',
  description: 'Comprehensive database of 500+ math formulas covering algebra, geometry, trigonometry, calculus, statistics, physics, and chemistry. Each formula includes examples, practice problems, and real-world applications.',
  keywords: [
    'math formulas',
    'algebra formulas',
    'geometry formulas',
    'trigonometry formulas',
    'calculus formulas',
    'statistics formulas',
    'physics formulas',
    'chemistry formulas',
    'formula database',
    'mathematical formulas',
  ],
  openGraph: {
    title: 'Math Formulas Database - 500+ Formulas',
    description: 'Complete reference for all major math formulas with step-by-step examples.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/formulas',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Math Formulas Database',
    description: '500+ formulas with detailed explanations and examples.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/formulas',
  },
};

export default function FormulasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
