import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discount Calculator - Free Sale Price Calculator | The Tutor Bridge',
  description: 'Free discount calculator with 10 discount types: % off, fixed amount, 2 for 1, 3 for 2, double/triple discounts, and multi-unit pricing. Calculate final price and savings instantly.',
  keywords: [
    'discount calculator',
    'sale price calculator',
    'discount price calculator',
    'percentage discount calculator',
    'calculate discount',
    'how to calculate discount',
    '2 for 1 calculator',
    '3 for 2 calculator',
    'buy one get one free',
    'BOGO calculator',
    'double discount calculator',
    'triple discount calculator',
    'fixed discount calculator',
    'amount off calculator',
    'multi unit discount',
    'bulk discount calculator',
    'sale calculator',
    'shopping calculator',
    'price reduction calculator',
    'final price calculator',
    'savings calculator',
    'tax included discount',
    'discount with tax',
    'promotional discount',
    'trade discount calculator',
    'quantity discount',
    'clearance calculator',
    'markdown calculator',
    'coupon calculator',
    'deal calculator',
    'offer calculator',
    'price after discount',
    'original price from discount',
    'reverse discount calculator',
    'discount percentage calculator',
    'how much discount',
    'calculate savings',
    'Black Friday calculator',
    'Cyber Monday deals',
    'free discount tool',
    'online discount calculator',
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
    canonical: '/calculators/discount-calculator',
  },
  openGraph: {
    title: 'Discount Calculator - 10 Discount Types | Free Tool',
    description: 'Calculate discounts with 10 types: % off, 2 for 1, 3 for 2, fixed amount, double/triple discounts. Find final price and savings instantly.',
    url: 'https://thetutorbridge.com/calculators/discount-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Discount Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discount Calculator - 10 Discount Types',
    description: 'Calculate discounts with % off, 2 for 1, 3 for 2, double/triple discounts and more. Free instant results.',
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

export default function DiscountCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
