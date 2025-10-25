import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Loan EMI Calculator India — Calculate Housing Loan EMI',
  description: 'Free home loan EMI calculator to calculate monthly mortgage payments for housing loans in India. Get instant EMI, interest, and affordability calculations.',
  keywords: "home loan EMI calculator, housing loan calculator India, mortgage EMI calculator, home loan calculator, property loan EMI, house loan calculator, housing finance EMI",
  openGraph: {
    title: "Home Loan EMI Calculator India — Calculate Housing Loan EMI",
    description: "Free home loan EMI calculator to calculate monthly mortgage payments. Get instant EMI, interest, and total payment calculations.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Home Loan EMI Calculator - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Loan EMI Calculator India — Calculate Housing Loan EMI",
    description: "Free home loan EMI calculator for housing loans. Calculate monthly payments instantly.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/calculators/home-loan-emi-calculator",
  },
};

export default function HomeLoanEMICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
