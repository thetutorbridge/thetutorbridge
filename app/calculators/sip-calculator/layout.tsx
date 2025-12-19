import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SIP Calculator India — Estimate Mutual Fund Returns Online',
  description: 'Use The Tutor Bridge SIP calculator to estimate monthly SIP returns, total investment, and maturity amount. Plan your mutual fund investments today!',
  keywords: "SIP calculator, systematic investment plan calculator, mutual fund calculator, SIP returns calculator, investment calculator India, monthly SIP calculator, wealth planning calculator",
  openGraph: {
    title: "SIP Calculator India — Estimate Mutual Fund Returns Online",
    description: "Use The Tutor Bridge SIP calculator to estimate monthly SIP returns, total investment, and maturity amount. Plan your mutual fund investments today!",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SIP Calculator - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SIP Calculator India — Estimate Mutual Fund Returns Online",
    description: "Use The Tutor Bridge SIP calculator to estimate monthly SIP returns, total investment, and maturity amount.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/calculators/sip-calculator",
  },
};

export default function SIPCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
