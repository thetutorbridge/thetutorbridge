import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Right Triangle Calculator - Free Side & Angle Calculator | The Tutor Bridge',
  description: 'Free right triangle calculator to find sides, angles, area, and perimeter. Solve using two sides, angle and side, or area and side. Supports multiple units including degrees, radians, and more.',
  keywords: [
    'right triangle calculator',
    'right triangle',
    'triangle calculator',
    'pythagorean theorem calculator',
    'right angle triangle calculator',
    'triangle side calculator',
    'triangle angle calculator',
    'hypotenuse calculator',
    'right triangle solver',
    'trigonometry calculator',
    'right triangle sides',
    'right triangle angles',
    'right triangle area',
    'right triangle perimeter',
    'calculate hypotenuse',
    'find triangle sides',
    'find triangle angles',
    'pythagorean theorem',
    'sine cosine tangent',
    'SOH CAH TOA',
    'right triangle formula',
    'triangle side length',
    'opposite adjacent hypotenuse',
    'right angle triangle solver',
    '90 degree triangle',
    'triangle geometry',
    'math calculator',
    'geometry calculator',
    'free right triangle calculator',
    'online triangle calculator',
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
    canonical: '/calculators/right-triangle-calculator',
  },
  openGraph: {
    title: 'Right Triangle Calculator - Side & Angle Solver',
    description: 'Calculate right triangle sides, angles, area, and perimeter. Free tool with Pythagorean theorem and trigonometry.',
    url: 'https://thetutorbridge.com/calculators/right-triangle-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Right Triangle Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Right Triangle Calculator - Free Tool',
    description: 'Solve right triangles using two sides or angle and side. Calculate hypotenuse, angles, area, and perimeter.',
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

export default function RightTriangleCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
