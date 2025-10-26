import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FD Calculator India — Calculate Fixed Deposit Returns & Maturity Amount',
  description: 'Free FD calculator to calculate fixed deposit returns, maturity amount, and interest earned. Plan your FD investments with accurate quarterly compounding calculations for Indian banks.',
  keywords: "FD calculator, fixed deposit calculator India, FD maturity calculator, bank FD calculator, fixed deposit interest calculator, FD returns calculator, post office FD calculator, senior citizen FD calculator",
  openGraph: {
    title: "FD Calculator India — Calculate Fixed Deposit Returns & Maturity Amount",
    description: "Free FD calculator to calculate fixed deposit maturity amount and interest earned. Get instant calculations with quarterly compounding.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FD Calculator - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FD Calculator India — Calculate Fixed Deposit Returns & Maturity Amount",
    description: "Free FD calculator for fixed deposits. Calculate maturity amount and interest instantly.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/calculators/fd-calculator",
  },
};

export default function FDCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
