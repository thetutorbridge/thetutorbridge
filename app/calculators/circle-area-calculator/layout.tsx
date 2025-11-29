import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Circle Area Calculator - Free Circle Calculator | The Tutor Bridge',
  description: 'Free circle area calculator. Calculate area from radius or diameter. Find radius, diameter, and circumference from area. Supports multiple units with visual diagram.',
  keywords: [
    'circle area calculator',
    'area of a circle',
    'circle calculator',
    'area of circle formula',
    'A = πr²',
    'pi r squared',
    'circle area from radius',
    'circle area from diameter',
    'radius from area',
    'diameter from area',
    'circumference from area',
    'circle properties',
    'circle geometry',
    'area calculator',
    'radius calculator',
    'diameter calculator',
    'pi calculator',
    'circle formula',
    'how to find area of circle',
    'calculate circle area',
    'circle area in square cm',
    'circle area in square meters',
    'circle area in square inches',
    'circle area in square feet',
    'circle measurement',
    'geometry calculator',
    'math calculator',
    'circle solver',
    'find circle area',
    'circle area formula calculator',
    'πr² calculator',
    'area from radius',
    'area from diameter',
    'circular area',
    'round area calculator',
    'free circle area calculator',
    'online circle calculator',
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
    canonical: '/calculators/circle-area-calculator',
  },
  openGraph: {
    title: 'Circle Area Calculator - A = πr² Calculator',
    description: 'Calculate circle area from radius or diameter. Find radius from area instantly. Free geometry calculator.',
    url: 'https://thetutorbridge.com/calculators/circle-area-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Circle Area Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Circle Area Calculator - Free Tool',
    description: 'Calculate circle area from radius or diameter. A = πr² calculator with unit conversions.',
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

export default function CircleAreaCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
