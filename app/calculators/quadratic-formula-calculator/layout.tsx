import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quadratic Formula Calculator - Free Quadratic Equation Solver with Steps | The Tutor Bridge',
  description: 'Free quadratic formula calculator solves ax² + bx + c = 0 with step-by-step solutions. Get exact radical forms, decimal approximations, discriminant analysis, and complex roots. Perfect for algebra, physics, and engineering.',
  keywords: [
    'quadratic formula calculator',
    'quadratic equation solver',
    'solve quadratic equation',
    'quadratic calculator',
    'ax2 + bx + c calculator',
    'discriminant calculator',
    'quadratic formula',
    'quadratic equation calculator',
    'roots calculator',
    'quadratic solver',
    'parabola calculator',
    'algebra calculator',
    'polynomial solver',
    'quadratic roots',
    'complex roots calculator',
    'quadratic equation roots',
    'solve ax^2 + bx + c',
    'quadratic formula solver',
    'step by step quadratic',
    'quadratic equation solution',
    'discriminant formula',
    'b^2 - 4ac calculator',
    'exact form calculator',
    'radical form calculator',
    'quadratic equation helper',
    'math equation solver',
    'algebra equation solver',
    'quadratic vertex calculator',
    'parabola roots calculator',
    'polynomial equation solver',
    'online quadratic calculator',
    'free quadratic solver',
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
    canonical: '/calculators/quadratic-formula-calculator',
  },
  openGraph: {
    title: 'Quadratic Formula Calculator - Solve ax² + bx + c = 0 with Steps',
    description: 'Free quadratic equation solver with step-by-step solutions, discriminant analysis, and both exact and decimal forms. Handles real and complex roots.',
    url: 'https://thetutorbridge.com/calculators/quadratic-formula-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Quadratic Formula Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quadratic Formula Calculator - Free Equation Solver',
    description: 'Solve quadratic equations instantly with step-by-step solutions, discriminant analysis, and exact radical forms.',
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

export default function QuadraticFormulaCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
