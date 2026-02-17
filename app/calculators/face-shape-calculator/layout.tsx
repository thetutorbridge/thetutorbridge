import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Face Shape Calculator - Find Your Face Shape | Free Online Tool',
  description: 'Free face shape calculator to determine your face shape (oval, round, square, heart, oblong, diamond, triangle). Get personalized hairstyle, glasses, and makeup recommendations.',
  keywords: [
    // Primary Keywords
    'face shape calculator',
    'face shape test',
    'what is my face shape',
    'find my face shape',
    'face shape detector',

    // Face Shape Types
    'oval face shape',
    'round face shape',
    'square face shape',
    'heart face shape',
    'oblong face shape',
    'diamond face shape',
    'triangle face shape',
    'rectangle face shape',

    // Question Keywords
    'what face shape am I',
    'how to know my face shape',
    'how to determine face shape',
    'how to find face shape',
    'which face shape do I have',
    'what is my face shape quiz',

    // Measurement Keywords
    'face measurement calculator',
    'forehead width measurement',
    'cheekbone width measurement',
    'jawline measurement',
    'face length measurement',

    // Styling Keywords
    'hairstyle for face shape',
    'glasses for face shape',
    'haircut for my face shape',
    'best hairstyle for my face',
    'sunglasses for face shape',
    'eyeglasses for face shape',

    // Makeup Keywords
    'makeup for face shape',
    'contouring for face shape',
    'blush placement face shape',
    'makeup tips by face shape',

    // Feature Keywords
    'free face shape calculator',
    'online face shape test',
    'face shape analyzer',
    'face shape identifier',
    'face shape finder',

    // Specific Shape Queries
    'do I have an oval face',
    'is my face round or oval',
    'how to tell if face is square',
    'heart shaped face test',
    'diamond face shape characteristics',

    // Gender Keywords
    'face shape calculator female',
    'face shape calculator male',
    'men face shape',
    'women face shape',

    // Long-tail Keywords
    'determine face shape from measurements',
    'face shape calculator with measurements',
    'accurate face shape calculator',
    'face shape and hairstyle guide',
    'best haircut for face shape',

    // India-Specific
    'face shape calculator india',
    'indian face shape',
    'face cut for face shape',

    // Related Terms
    'facial structure calculator',
    'face proportions calculator',
    'face shape guide',
    'face shape chart',
    'face geometry calculator',

    // Celebrity Keywords
    'celebrity face shapes',
    'oval face celebrities',
    'round face celebrities',
    'square face celebrities',

    // Beauty Keywords
    'beauty face shape',
    'flattering styles face shape',
    'face shape beauty tips',
    'enhance face shape',
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
    canonical: 'https://www.thetutorbridge.com/calculators/face-shape-calculator',
  },
  openGraph: {
    title: 'Free Face Shape Calculator - Discover Your Face Shape',
    description: 'Find your face shape with our free calculator. Enter facial measurements to discover if you have an oval, round, square, heart, or diamond face. Get personalized style tips.',
    url: 'https://www.thetutorbridge.com/calculators/face-shape-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Face Shape Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Face Shape Calculator',
    description: 'Discover your face shape and get personalized hairstyle, glasses, and makeup recommendations based on your facial measurements.',
    images: ['https://www.thetutorbridge.com/og-image.png'],
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

export default function FaceShapeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
