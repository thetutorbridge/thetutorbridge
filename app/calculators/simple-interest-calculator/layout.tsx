import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Simple Interest Calculator India — Calculate SI on Loans & Deposits',
  description: 'Free simple interest calculator for loans, deposits, and investments. Calculate total interest and amount with SI formula. Quick and accurate calculations.',
  keywords: "simple interest calculator, SI calculator india, simple interest formula, loan interest calculator, deposit interest calculator",
  openGraph: {
    title: "Simple Interest Calculator India",
    description: "Calculate simple interest on loans and deposits. Free SI calculator with instant results.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [{url: "/og-image.jpg", width: 1200, height: 630, alt: "Simple Interest Calculator"}],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/calculators/simple-interest-calculator",
  },
};

export default function SimpleInterestCalculatorLayout({children}: {children: React.ReactNode}) {
  return <>{children}</>;
}
