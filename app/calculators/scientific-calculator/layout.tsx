import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Scientific Calculator - Free Online Scientific Calculator | The Tutor Bridge',
  description: 'Free online Scientific Calculator with trigonometry, logarithms, exponents, roots, and more. Perfect for students, engineers, and scientists. Supports sin, cos, tan, log, ln, and advanced functions.',
  keywords: [
    'scientific calculator',
    'scientific calculator online',
    'free scientific calculator',
    'online scientific calculator',
    'calculator scientific',
    'advanced calculator',
    'math calculator',
    'trigonometry calculator',
    'sin cos tan calculator',
    'logarithm calculator',
    'log calculator',
    'ln calculator',
    'exponent calculator',
    'square root calculator',
    'cube root calculator',
    'power calculator',
    'factorial calculator',
    'pi calculator',
    'e calculator',
    'engineering calculator',
    'scientific calc',
    'sin calculator',
    'cos calculator',
    'tan calculator',
    'inverse trig calculator',
    'arcsin calculator',
    'arccos calculator',
    'arctan calculator',
    'degree radian calculator',
    'scientific notation calculator',
    'exponential calculator',
    'natural log calculator',
    'log base 10 calculator',
    'parentheses calculator',
    'order of operations calculator',
    'pemdas calculator',
    'bodmas calculator',
    'student calculator',
    'algebra calculator',
    'calculus calculator',
    'physics calculator',
    'chemistry calculator',
    'best scientific calculator online',
    'casio scientific calculator online',
    'ti calculator online',
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
    canonical: 'https://www.thetutorbridge.com/calculators/scientific-calculator',
  },
  openGraph: {
    title: 'Scientific Calculator - Free Online Calculator | The Tutor Bridge',
    description: 'Free online scientific calculator with trig functions, logarithms, exponents, and more. Perfect for students and professionals.',
    url: 'https://www.thetutorbridge.com/calculators/scientific-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Scientific Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scientific Calculator - Free Online Tool',
    description: 'Free scientific calculator with sin, cos, tan, log, and advanced math functions.',
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

export default function ScientificCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
