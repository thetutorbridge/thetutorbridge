import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Basic Calculator - Free Online Scientific Calculator | The Tutor Bridge',
  description: 'Free online basic calculator with scientific functions including square root, percentage, memory, and power operations. Perfect for students, homework, shopping, business calculations. Works on all devices - no installation needed.',
  keywords: [
    'basic calculator',
    'online calculator',
    'free calculator',
    'scientific calculator',
    'calculator online',
    'web calculator',
    'math calculator',
    'simple calculator',
    'calculator with memory',
    'percentage calculator',
    'square root calculator',
    'calculator for students',
    'homework calculator',
    'mobile calculator',
    'calculator app',
    'addition calculator',
    'subtraction calculator',
    'multiplication calculator',
    'division calculator',
    'calculator tool',
    'digital calculator',
    'calculator with history',
    'pi calculator',
    'power calculator',
    'reciprocal calculator',
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
    canonical: '/calculators/basic-calculator',
  },
  openGraph: {
    title: 'Basic Calculator - Free Online Scientific Calculator',
    description: 'Free online calculator with memory functions, square root, percentage, and all basic arithmetic operations. Perfect for students, professionals, and quick calculations.',
    url: 'https://thetutorbridge.com/calculators/basic-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Basic Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Basic Calculator - Free Online Scientific Calculator',
    description: 'Free online calculator with memory, scientific functions, and calculation history. Works on all devices.',
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

export default function BasicCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
