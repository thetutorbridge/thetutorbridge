import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Square Footage Calculator | 10×12 Room = 120 Sq Ft (L×W Formula) [Free]',
  description: 'Free square footage calculator: 10×12=120 sq ft, 15×20=300 sq ft. Calculate area for rooms, flooring, paint. Formula: Length×Width. Includes material cost & waste factor.',
  keywords: [
    'square footage calculator',
    'square feet calculator',
    'area calculator',
    'sq ft calculator',
    'footage calculator',
    'floor area calculator',
    'room size calculator',
    'calculate square footage',
    'square meter calculator',
    'square yard calculator',
    'flooring calculator',
    'tile calculator',
    'paint calculator',
    'carpet calculator',
    'roofing calculator',
    'construction area calculator',
    'land area calculator',
    'rectangle area calculator',
    'circle area calculator',
    'triangle area calculator',
    'material cost calculator',
    'waste factor calculator',
    'sq ft to sq yd',
    'sq ft to sq m',
    'square footage to acres',
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
    canonical: 'https://www.thetutorbridge.com/calculators/square-footage-calculator',
  },
  openGraph: {
    title: 'Square Footage Calculator - Free Area & Cost Calculator',
    description: 'Calculate square footage for any shape with unit conversions and cost estimation. Perfect for flooring, painting, roofing, and construction projects.',
    url: 'https://www.thetutorbridge.com/calculators/square-footage-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Square Footage Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Square Footage Calculator - Area & Material Cost Calculator',
    description: 'Free square footage calculator with waste factor and cost estimation for flooring, painting, and construction.',
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

export default function SquareFootageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
