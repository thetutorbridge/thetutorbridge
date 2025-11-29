import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Percent Off Calculator - Free Discount Calculator | The Tutor Bridge',
  description: 'Free percent off calculator to find sale prices and savings. Calculate discounts with stackable percentages and sales tax. Perfect for shopping, Black Friday deals, and coupons.',
  keywords: [
    'percent off calculator',
    'percent off',
    'discount calculator',
    'sale price calculator',
    'percentage off calculator',
    'calculate percent off',
    '10% off calculator',
    '20% off calculator',
    '25% off calculator',
    '30% off calculator',
    '40% off calculator',
    '50% off calculator',
    '15 percent off',
    '20 percent off',
    '25 percent off',
    '30 percent off',
    '50 percent off',
    'how to calculate percent off',
    'percent discount calculator',
    'sale calculator',
    'discount price calculator',
    'coupon calculator',
    'Black Friday calculator',
    'Cyber Monday calculator',
    'shopping calculator',
    'savings calculator',
    'markdown calculator',
    'price reduction calculator',
    'stackable discount calculator',
    'double discount calculator',
    'multiple discounts',
    'sales tax calculator',
    'final price calculator',
    'price after discount',
    'how much is 20 percent off',
    'how much is 30 percent off',
    'what is 25 off',
    'calculate sale price',
    'original price calculator',
    'discount percentage',
    'money off calculator',
    'percentage savings',
    'free discount calculator',
    'online percent calculator',
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
    canonical: '/calculators/percent-off-calculator',
  },
  openGraph: {
    title: 'Percent Off Calculator - Find Sale Prices & Savings',
    description: 'Free percent off calculator to find sale prices and savings. Calculate discounts with stackable percentages and sales tax.',
    url: 'https://thetutorbridge.com/calculators/percent-off-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Percent Off Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Percent Off Calculator - Free Discount Tool',
    description: 'Calculate sale prices, savings, and stackable discounts instantly. Perfect for shopping and Black Friday deals.',
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

export default function PercentOffCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
