import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Area of a Circle Calculator - Free A = πr² Calculator with Steps | The Tutor Bridge',
  description: 'Free area of a circle calculator with step-by-step solutions. Calculate circle area from radius, diameter, or circumference using A = πr² formula. Get instant results with detailed explanations.',
  keywords: [
    'area of a circle',
    'area of circle calculator',
    'circle area calculator',
    'area of a circle formula',
    'a = πr²',
    'pi r squared',
    'circle area',
    'how to find area of a circle',
    'calculate circle area',
    'area from radius',
    'area from diameter',
    'circle surface area',
    'area of circle with radius',
    'area of circle with diameter',
    'circle area formula',
    'πr² calculator',
    'pi r squared calculator',
    'area calculator circle',
    'free circle calculator',
    'online area calculator',
    'geometry calculator',
    'math circle calculator',
    'circle solver',
    'find area of circle',
    'circle measurements',
    'radius to area',
    'diameter to area',
    'circumference to area',
    'area from circumference',
    'circle properties calculator',
    'area of a round shape',
    'circular area calculator',
    'area of disc',
    'area of circular region',
    'pi times radius squared',
    'area circle equation',
    'circle area steps',
    'circle area examples',
    'area of a circle practice',
    'circle area problems',
    'area of a circle explained',
    'circle geometry calculator',
    'area of circles',
    'calculate area from radius',
    'calculate area from diameter',
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
    canonical: 'https://www.thetutorbridge.com/calculators/area-of-a-circle-calculator',
  },
  openGraph: {
    title: 'Area of a Circle Calculator - A = πr² Calculator',
    description: 'Free area of a circle calculator with step-by-step solutions. Calculate circle area from radius, diameter, or circumference instantly.',
    url: 'https://www.thetutorbridge.com/calculators/area-of-a-circle-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Area of a Circle Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Area of a Circle Calculator - Free Tool',
    description: 'Calculate circle area from radius, diameter, or circumference with detailed step-by-step solutions.',
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

export default function AreaOfCircleCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
