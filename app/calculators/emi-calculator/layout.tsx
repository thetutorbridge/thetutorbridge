import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EMI Calculator India — Calculate Loan EMI & Interest Online',
  description: 'Free EMI calculator to calculate monthly loan payments for home, car, personal, and education loans. Get instant EMI, interest, and total payment calculations in INR.',
  keywords: "EMI calculator, loan calculator, home loan EMI calculator, car loan calculator, personal loan EMI, education loan calculator, monthly installment calculator, loan interest calculator India",
  openGraph: {
    title: "EMI Calculator India — Calculate Loan EMI & Interest Online",
    description: "Free EMI calculator to calculate monthly loan payments for home, car, personal, and education loans. Get instant EMI, interest, and total payment calculations in INR.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EMI Calculator - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EMI Calculator India — Calculate Loan EMI & Interest Online",
    description: "Free EMI calculator to calculate monthly loan payments for home, car, personal, and education loans.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/calculators/emi-calculator",
  },
};

export default function EMICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
