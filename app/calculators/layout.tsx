import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free Online Calculators - GPA, Finance, Math & More",
  description: "Free online calculators for students and professionals. Calculate GPA, grades, SIP returns, EMI, percentages, time conversions, and more educational tools.",
  keywords: "online calculators, GPA calculator, grade calculator, SIP calculator, EMI calculator, percentage calculator, math calculators, educational tools",
  openGraph: {
    title: "Free Online Calculators - GPA, Finance, Math & More",
    description: "Free online calculators for students and professionals. Calculate GPA, grades, SIP returns, EMI, percentages, time conversions, and more educational tools.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Free Online Calculators - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Calculators - GPA, Finance, Math & More",
    description: "Free online calculators for students and professionals. GPA, grades, finance, math and more.",
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
