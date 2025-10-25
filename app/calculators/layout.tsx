import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Financial Calculators - The Tutor Bridge",
  description: "Free online financial calculators including SIP calculator, compound interest calculator, and more. Plan your investments and financial goals effectively.",
  keywords: "financial calculators, SIP calculator, investment calculator, compound interest calculator, mutual fund calculator",
  openGraph: {
    title: "Financial Calculators - The Tutor Bridge",
    description: "Free online financial calculators including SIP calculator, compound interest calculator, and more. Plan your investments and financial goals effectively.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Financial Calculators - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Financial Calculators - The Tutor Bridge",
    description: "Free online financial calculators for students and professionals.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/calculators",
  },
};

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
