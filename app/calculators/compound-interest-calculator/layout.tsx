import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compound Interest Calculator India — Calculate CI with Different Frequencies',
  description: 'Free compound interest calculator with monthly, quarterly, half-yearly, and yearly compounding. Calculate compound interest on investments and see the power of compounding.',
  keywords: "compound interest calculator, CI calculator india, compounding calculator, monthly compounding, quarterly compounding, investment calculator",
  openGraph: {
    title: "Compound Interest Calculator India",
    description: "Calculate compound interest with different compounding frequencies. Free CI calculator for investments.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [{url: "/og-image.jpg", width: 1200, height: 630, alt: "Compound Interest Calculator"}],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/calculators/compound-interest-calculator",
  },
};

export default function CompoundInterestCalculatorLayout({children}: {children: React.ReactNode}) {
  return <>{children}</>;
}
