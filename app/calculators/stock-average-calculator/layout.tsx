import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stock Average Calculator — Calculate Average Buy Price for Stocks',
  description: 'Free stock average calculator to find average purchase price across multiple stock transactions. Perfect for averaging down or tracking your stock portfolio cost.',
  keywords: "stock average calculator, average stock price calculator, stock cost average, portfolio average calculator, averaging down calculator",
  openGraph: {
    title: "Stock Average Calculator",
    description: "Calculate average buy price for multiple stock purchases. Free stock averaging calculator.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [{url: "/og-image.jpg", width: 1200, height: 630, alt: "Stock Average Calculator"}],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/calculators/stock-average-calculator",
  },
};

export default function StockAverageCalculatorLayout({children}: {children: React.ReactNode}) {
  return <>{children}</>;
}
