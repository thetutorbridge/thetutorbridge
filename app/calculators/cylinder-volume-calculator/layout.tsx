import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cylinder Volume Calculator - Calculate Volume of Cylinder | Free Online Tool',
  description: 'Free cylinder volume calculator to find volume, surface area, and lateral area. Works with solid and hollow cylinders. Enter height, radius or diameter in any unit.',
  keywords: [
    // Primary Keywords
    'cylinder volume calculator',
    'volume of cylinder',
    'cylinder calculator',
    'volume of a cylinder',
    'cylinder volume formula',

    // Formula Keywords
    'πr²h calculator',
    'pi r squared h',
    'cylinder volume equation',
    'cylinder formula',
    'calculate cylinder volume',

    // Measurement Keywords
    'cylinder radius calculator',
    'cylinder diameter calculator',
    'cylinder height calculator',
    'cylinder dimensions calculator',
    'find cylinder volume',

    // Type Keywords
    'solid cylinder volume',
    'hollow cylinder volume',
    'pipe volume calculator',
    'tube volume calculator',
    'right cylinder volume',
    'oblique cylinder volume',

    // Surface Area Keywords
    'cylinder surface area calculator',
    'cylinder lateral area',
    'curved surface area cylinder',
    'total surface area cylinder',
    'cylinder area formula',

    // Unit Keywords
    'cylinder volume in liters',
    'cylinder volume in gallons',
    'cylinder volume cubic centimeters',
    'cylinder volume cubic inches',
    'cylinder volume cubic feet',

    // Question Keywords
    'how to calculate cylinder volume',
    'how to find volume of cylinder',
    'what is volume of cylinder',
    'cylinder volume formula with diameter',
    'cylinder volume from height and radius',

    // Application Keywords
    'tank volume calculator',
    'can volume calculator',
    'pipe capacity calculator',
    'cylindrical container volume',
    'drum volume calculator',

    // Feature Keywords
    'free cylinder calculator',
    'online cylinder calculator',
    'instant cylinder volume',
    'accurate cylinder calculator',
    'cylinder volume tool',

    // Educational Keywords
    'cylinder geometry calculator',
    'cylinder math calculator',
    '3D shape calculator',
    'cylinder properties calculator',
    'cylinder measurements',

    // Long-tail Keywords
    'calculate volume of cylinder with radius and height',
    'find volume of cylinder given diameter',
    'cylinder volume calculator metric',
    'cylinder volume calculator imperial',
    'hollow cylinder volume formula calculator',

    // Related Shape Keywords
    'circular cylinder volume',
    'cylindrical volume',
    'round container volume',
    'circular tank volume',

    // Specific Use Cases
    'water tank volume calculator cylinder',
    'fuel tank cylinder calculator',
    'storage cylinder volume',
    'cylinder capacity calculator',
    'pool volume cylinder',

    // India-Specific
    'cylinder volume calculator india',
    'cylinder volume in litres',
    'tank capacity calculator india',
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
    canonical: 'https://thetutorbridge.com/calculators/cylinder-volume-calculator',
  },
  openGraph: {
    title: 'Free Cylinder Volume Calculator - V = πr²h',
    description: 'Calculate cylinder volume, surface area, and lateral area instantly. Works with solid and hollow cylinders. Enter height and radius or diameter.',
    url: 'https://thetutorbridge.com/calculators/cylinder-volume-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: '/TheTutorBridge Logo New.png',
        width: 1200,
        height: 630,
        alt: 'Cylinder Volume Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Cylinder Volume Calculator',
    description: 'Calculate volume of solid or hollow cylinders using V = πr²h. Get surface area, lateral area, and base area with unit conversion.',
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

export default function CylinderVolumeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
