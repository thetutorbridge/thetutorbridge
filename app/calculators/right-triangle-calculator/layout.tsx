import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Right Triangle Calculator - Find Sides, Angles & Area | The Tutor Bridge',
  description: 'Free right triangle calculator to find sides, angles, area, and perimeter. Use the Pythagorean theorem and SOHCAHTOA to solve right triangles. Supports multiple units and input modes.',
  keywords: [
    'right triangle calculator',
    'right triangle',
    'pythagorean theorem calculator',
    'right angle triangle calculator',
    'triangle calculator',
    'hypotenuse calculator',
    'right triangle solver',
    'triangle side calculator',
    'triangle angle calculator',
    'trigonometry calculator',
    'SOHCAHTOA',
    'pythagorean theorem',
    'right triangle formula',
    'calculate hypotenuse',
    'find triangle sides',
    'find triangle angles',
    'right triangle area',
    'right triangle perimeter',
    'sine cosine tangent',
    'opposite adjacent hypotenuse',
    '90 degree triangle',
    'right triangle sides',
    'right triangle angles',
    '3-4-5 triangle',
    '30-60-90 triangle',
    '45-45-90 triangle',
    'pythagorean triples',
    'special right triangles',
    'triangle geometry',
    'geometry calculator',
    'math calculator',
    'trigonometric ratios',
    'right angle triangle solver',
    'calculate triangle',
    'free triangle calculator',
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
    canonical: 'https://www.thetutorbridge.com/calculators/right-triangle-calculator',
  },
  openGraph: {
    title: 'Right Triangle Calculator - Pythagorean Theorem & Trigonometry Tool',
    description: 'Calculate right triangle sides, angles, area, and perimeter using the Pythagorean theorem and SOHCAHTOA. Free online calculator with multiple input modes.',
    url: 'https://www.thetutorbridge.com/calculators/right-triangle-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Right Triangle Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Right Triangle Calculator - Free Online Tool',
    description: 'Solve right triangles using the Pythagorean theorem and trigonometry. Find sides, angles, area, and perimeter instantly.',
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

export default function RightTriangleCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
