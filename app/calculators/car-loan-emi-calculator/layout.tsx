import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Loan EMI Calculator India — Calculate Auto Loan EMI Online',
  description: 'Free car loan EMI calculator to calculate monthly payments for new & used car loans in India. Get instant EMI, interest, down payment calculations for your dream car.',
  keywords: "car loan EMI calculator, auto loan calculator India, car EMI calculator, vehicle loan calculator, new car loan EMI, used car loan calculator, car finance calculator, automobile loan EMI",
  openGraph: {
    title: "Car Loan EMI Calculator India — Calculate Auto Loan EMI Online",
    description: "Free car loan EMI calculator to calculate monthly payments for new & used car loans in India. Get instant EMI, interest, down payment calculations.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Car Loan EMI Calculator - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Loan EMI Calculator India — Calculate Auto Loan EMI Online",
    description: "Free car loan EMI calculator for new & used cars. Calculate monthly payments instantly.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/calculators/car-loan-emi-calculator",
  },
};

export default function CarLoanEMICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
