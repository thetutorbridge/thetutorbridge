import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SWP Calculator India — Systematic Withdrawal Plan Calculator',
  description: 'Free SWP (Systematic Withdrawal Plan) calculator to plan regular withdrawals from mutual funds. Calculate how long your corpus will last with monthly withdrawals while earning returns.',
  keywords: "SWP calculator, systematic withdrawal plan calculator, mutual fund withdrawal calculator, SWP calculator India, retirement income calculator, monthly withdrawal calculator, pension planning calculator, corpus withdrawal",
  openGraph: {
    title: "SWP Calculator India — Systematic Withdrawal Plan Calculator",
    description: "Calculate systematic withdrawals from your mutual fund corpus. Plan retirement income with SWP - withdraw regularly while your investment continues to grow.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SWP Calculator - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SWP Calculator India — Systematic Withdrawal Plan Calculator",
    description: "Free SWP calculator for mutual fund withdrawals. Plan your retirement income with systematic withdrawals.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/calculators/swp-calculator",
  },
};

export default function SWPCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
