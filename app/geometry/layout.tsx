import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Geometry Calculator - Area, Perimeter, Volume & Surface Area',
  description: 'Calculate area, perimeter, volume, and surface area for all shapes. Triangle, circle, rectangle, sphere, cylinder, and more with step-by-step solutions.',
  keywords: [
    'geometry calculator',
    'area calculator',
    'perimeter calculator',
    'volume calculator',
    'surface area calculator',
    'triangle area',
    'circle area',
    'rectangle area',
    'cylinder volume',
    'sphere volume',
  ],
  openGraph: {
    title: 'Geometry Calculator - 5,000+ Solved Problems',
    description: 'Calculate geometry problems with step-by-step solutions for all shapes.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/geometry',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Geometry Calculator',
    description: 'Solve 5,000+ geometry problems with detailed explanations.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/geometry',
  },
};

export default function GeometryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
