import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Scientific Calculator - Free Online Calculator',
  description: 'Free scientific calculator. Perform advanced mathematical calculations with trigonometry, logarithms, and more.',
  keywords: ['scientific calculator', 'calculator', 'math calculator'],
  openGraph: { title: 'Scientific Calculator', description: 'Scientific calculations.', type: 'website', url: 'https://www.thetutorbridge.com/tools/scientific-calculator' },
  twitter: { card: 'summary_large_image', title: 'Scientific Calculator', description: 'Scientific calc.' },
  alternates: { canonical: 'https://www.thetutorbridge.com/tools/scientific-calculator' },
};
export default function ScientificCalculatorLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
