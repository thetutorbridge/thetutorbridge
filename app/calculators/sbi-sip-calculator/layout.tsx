import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SBI SIP Calculator 2025 — SBI Mutual Fund SIP Calculator India',
  description: 'Official SBI SIP calculator for SBI mutual funds. Calculate SIP and lumpsum returns for SBI schemes. Plan your investments with SBI MF calculator.',
  keywords: "SBI SIP calculator, SBI mutual fund calculator, SBI MF SIP, SBI lumpsum calculator, SBI investment calculator",
  openGraph: {
    title: "SBI SIP Calculator 2025",
    description: "Calculate SBI mutual fund SIP and lumpsum returns. Official SBI MF calculator.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [{url: "/og-image.png", width: 1200, height: 630, alt: "SBI SIP Calculator"}],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/calculators/sbi-sip-calculator",
  },
};

export default function SbiSipCalculatorLayout({children}: {children: React.ReactNode}) {
  return <>{children}</>;
}
