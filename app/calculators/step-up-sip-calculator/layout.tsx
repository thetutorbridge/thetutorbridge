import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Step Up SIP Calculator India 2025 — Calculate SIP with Annual Increase',
  description: 'Free Step Up SIP calculator to calculate returns with annual increment in SIP amount. Plan growing investments with auto-increment feature and maximize your mutual fund returns.',
  keywords: "step up sip calculator, sip with annual increase, step up sip india, growing sip calculator, sip increment calculator, top up sip calculator",
  openGraph: {
    title: "Step Up SIP Calculator India 2025 — Calculate SIP with Annual Increase",
    description: "Free Step Up SIP calculator to calculate returns with annual increment. Plan growing investments with auto-increment feature.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Step Up SIP Calculator - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Step Up SIP Calculator India 2025",
    description: "Calculate Step Up SIP returns with annual increment. Free calculator for growing SIP investments.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/calculators/step-up-sip-calculator",
  },
};

export default function StepUpSipCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
