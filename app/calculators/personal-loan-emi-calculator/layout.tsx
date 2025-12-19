import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Loan EMI Calculator India — Calculate Personal Loan EMI',
  description: 'Free personal loan EMI calculator to calculate monthly installments for personal loans in India. Get instant EMI, interest, and total payment calculations for all banks.',
  keywords: "personal loan EMI calculator, personal loan calculator India, instant personal loan EMI, unsecured loan calculator, personal loan interest calculator, EMI calculator for personal loan, loan EMI calculator",
  openGraph: {
    title: "Personal Loan EMI Calculator India — Calculate Personal Loan EMI",
    description: "Free personal loan EMI calculator to calculate monthly payments. Get instant EMI, interest, and total payment calculations.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Personal Loan EMI Calculator - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Loan EMI Calculator India — Calculate Personal Loan EMI",
    description: "Free personal loan EMI calculator. Calculate monthly payments instantly for all banks.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/calculators/personal-loan-emi-calculator",
  },
};

export default function PersonalLoanEMICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
