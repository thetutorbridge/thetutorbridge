import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sukanya Samriddhi Yojana Calculator 2026 — SSY Calculator India',
  description: 'Free Sukanya Samriddhi Yojana (SSY) calculator to calculate maturity amount for girl child savings scheme. Current interest rate 8.2% p.a. with tax benefits under Section 80C. Plan your daughter\'s future today.',
  keywords: "sukanya samriddhi yojana calculator, SSY calculator 2026, sukanya samriddhi account calculator, girl child scheme calculator, SSY maturity calculator, sukanya yojana interest rate 8.2%, post office SSY calculator, beti bachao beti padhao scheme",
  openGraph: {
    title: "Sukanya Samriddhi Yojana Calculator 2026 — SSY Calculator India",
    description: "Calculate SSY maturity amount with current 8.2% interest rate. Government scheme for girl child with tax benefits. Plan your daughter's future education and marriage.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sukanya Samriddhi Yojana Calculator - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sukanya Samriddhi Yojana Calculator 2026 — SSY Calculator India",
    description: "Free SSY calculator with 8.2% interest rate. Calculate maturity amount for your daughter's future.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/calculators/sukanya-samriddhi-yojana-calculator",
  },
};

export default function SSYCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
