import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trigonometry Calculator - Sin Cos Tan & Right Triangle Solver | Free Online Tool',
  description: 'Free trigonometry calculator to find sin, cos, tan values and solve right triangles. Enter angle or sides to calculate missing values. Includes SOHCAHTOA guide.',
  keywords: [
    // Primary Keywords
    'trigonometry calculator',
    'sin cos tan calculator',
    'right triangle calculator',
    'trig calculator',
    'triangle solver',

    // Function Keywords
    'sine calculator',
    'cosine calculator',
    'tangent calculator',
    'sin calculator',
    'cos calculator',
    'tan calculator',

    // Triangle Keywords
    'right triangle solver',
    'find missing side triangle',
    'triangle angle calculator',
    'hypotenuse calculator',
    'pythagorean theorem calculator',

    // SOHCAHTOA Keywords
    'sohcahtoa calculator',
    'soh cah toa',
    'opposite adjacent hypotenuse',
    'trig ratios calculator',
    'trigonometric ratios',

    // Angle Keywords
    'angle calculator',
    'degrees to radians',
    'radians to degrees',
    'find angle from sides',
    'inverse trig calculator',

    // Question Keywords
    'how to calculate sin',
    'how to find cos',
    'what is tan of',
    'calculate missing angle',
    'find missing side',

    // Educational Keywords
    'trigonometry help',
    'trig functions calculator',
    'learn trigonometry',
    'trigonometry solver',
    'trig problem solver',

    // Specific Angle Keywords
    'sin 30 degrees',
    'cos 45 degrees',
    'tan 60 degrees',
    'sin 90',
    'cos 0',

    // Feature Keywords
    'free trig calculator',
    'online trigonometry',
    'instant trig calculations',
    'accurate trig values',
    'trig calculator tool',

    // Advanced Keywords
    'secant calculator',
    'cosecant calculator',
    'cotangent calculator',
    'csc sec cot',
    'reciprocal trig functions',

    // Formula Keywords
    'trig formulas',
    'pythagorean identity',
    'trig identities calculator',
    'angle sum formula',

    // Application Keywords
    'triangle calculations',
    'geometry calculator',
    'math triangle solver',
    'side length calculator',
    'angle finder',

    // Long-tail Keywords
    'calculate sin cos tan online',
    'solve right triangle calculator',
    'find hypotenuse from angle',
    'trigonometry calculator with steps',
    'right triangle trig calculator',

    // Student Keywords
    'trigonometry homework help',
    'trig practice calculator',
    'math trig calculator',
    'school trigonometry calculator',
    'student trig tool',
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
    canonical: 'https://www.thetutorbridge.com/calculators/trigonometry-calculator',
  },
  openGraph: {
    title: 'Free Trigonometry Calculator - Sin Cos Tan & Triangle Solver',
    description: 'Calculate trigonometric functions (sin, cos, tan) and solve right triangles instantly. Find missing sides and angles with SOHCAHTOA.',
    url: 'https://www.thetutorbridge.com/calculators/trigonometry-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Trigonometry Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Trigonometry Calculator',
    description: 'Calculate sin, cos, tan and solve right triangles. Enter any two values to find the rest. Perfect for students and professionals.',
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

export default function TrigonometryCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
