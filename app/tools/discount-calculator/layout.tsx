import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discount Calculator - Calculate Sale Prices & Savings Free',
  description: 'Free discount calculator. Calculate sale prices, final prices, and savings instantly. Perfect for shopping, Black Friday sales, and clearance events.',
  keywords: [
    'discount calculator',
    'sale calculator',
    'price calculator',
    'savings calculator',
    'percent off',
    'sale price',
    'discount price',
  ],
  openGraph: {
    title: 'Free Discount Calculator',
    description: 'Calculate discounts and sale prices.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/discount-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Discount Calculator',
    description: 'Calculate discounts.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/discount-calculator',
  },
};

export default function DiscountCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
