import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Circumference Calculator - Find Circle Circumference, Radius, Diameter & Area | Free Online Tool',
  description: 'Free circumference calculator to find circle circumference from radius or diameter. Calculate C = 2πr instantly. Also calculates radius, diameter, and area. Perfect for math students and geometry.',
  keywords: [
    // Primary Keywords
    'circumference calculator',
    'circle circumference calculator',
    'calculate circumference',
    'circumference of a circle calculator',
    'find circumference',

    // Formula Keywords
    'circumference formula',
    'C = 2πr calculator',
    'C = πd calculator',
    '2 pi r calculator',
    'pi times diameter',

    // Radius Keywords
    'circumference from radius',
    'radius to circumference',
    'calculate circumference from radius',
    'radius circumference calculator',
    'find circumference from radius',

    // Diameter Keywords
    'circumference from diameter',
    'diameter to circumference',
    'calculate circumference from diameter',
    'diameter circumference calculator',
    'find circumference from diameter',

    // Reverse Calculations
    'radius from circumference',
    'diameter from circumference',
    'find radius from circumference',
    'circumference to radius calculator',
    'circumference to diameter',

    // Area Related
    'circle area calculator',
    'area from circumference',
    'circumference and area calculator',
    'pi r squared calculator',
    'A = πr² calculator',

    // Question Keywords
    'how to calculate circumference',
    'how to find circumference of a circle',
    'what is circumference formula',
    'how to find circumference from radius',
    'how to find circumference from diameter',
    'what is circumference of a circle',

    // Feature Keywords
    'online circumference calculator',
    'free circumference calculator',
    'circle calculator',
    'perimeter of circle calculator',
    'circle perimeter calculator',

    // Educational Keywords
    'circumference math',
    'geometry circle calculator',
    'circle properties calculator',
    'pi calculator',
    'circle measurement calculator',

    // Long-tail Keywords
    'calculate all circle properties',
    'circumference diameter radius calculator',
    'circle calculator with steps',
    'circumference calculator with formula',
    'instant circumference calculator',

    // India-Specific
    'circumference calculator india',
    'circle calculator for students',
    'maths circumference calculator',
    'geometry calculator india',

    // Unit Keywords
    'circumference in cm',
    'circumference in meters',
    'circumference in inches',
    'circumference unit converter',

    // Related Terms
    'perimeter calculator',
    'circle solver',
    'round shape calculator',
    'circular measurement',
    '2πr',
    'πd formula',

    // Application Keywords
    'wheel circumference calculator',
    'tire circumference calculator',
    'pipe circumference calculator',
    'circular track length calculator',
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
    canonical: 'https://www.thetutorbridge.com/calculators/circumference-calculator',
  },
  openGraph: {
    title: 'Free Circumference Calculator - Circle Circumference, Radius, Diameter & Area',
    description: 'Calculate circle circumference using C = 2πr or C = πd formula. Enter radius, diameter, circumference, or area to find all circle properties instantly. Free online geometry tool.',
    url: 'https://www.thetutorbridge.com/calculators/circumference-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: '/TheTutorBridge Logo New.png',
        width: 1200,
        height: 630,
        alt: 'Circumference Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Circumference Calculator - C = 2πr',
    description: 'Calculate circumference, radius, diameter, and area of any circle. Enter one value to find all circle properties instantly.',
    images: ['/TheTutorBridge Logo New.png'],
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

export default function CircumferenceCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
