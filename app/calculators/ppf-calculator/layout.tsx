import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PPF Calculator India 2025 — Public Provident Fund Calculator with Interest',
  description: 'Free PPF calculator to calculate maturity amount, interest, and returns for Public Provident Fund investments in India. Plan your PPF deposits with current interest rates (7.1% for 2024-25).',
  keywords: "PPF calculator, Public Provident Fund calculator India, PPF interest calculator 2025, PPF maturity calculator, PPF investment calculator, PPF return calculator, PPF account calculator, post office PPF calculator",
  openGraph: {
    title: "PPF Calculator India 2025 — Public Provident Fund Calculator",
    description: "Free PPF calculator for Public Provident Fund. Calculate maturity amount, interest earned, and plan your tax-saving investments with current PPF rates.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PPF Calculator - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PPF Calculator India 2025 — Public Provident Fund Calculator",
    description: "Free PPF calculator for Public Provident Fund. Calculate maturity, interest, and returns instantly.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/calculators/ppf-calculator",
  },
};

export default function PPFCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
