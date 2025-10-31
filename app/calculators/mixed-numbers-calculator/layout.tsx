import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mixed Numbers Calculator — Add, Subtract, Multiply & Divide Fractions',
  description: 'Free mixed numbers calculator with step-by-step solutions. Add, subtract, multiply, and divide mixed numbers, fractions, and whole numbers. Get detailed solutions with two solving methods.',
  keywords: "mixed numbers calculator, fraction calculator, add mixed numbers, subtract mixed numbers, multiply mixed numbers, divide mixed numbers, mixed fraction calculator, improper fractions, fraction addition, fraction subtraction",
  openGraph: {
    title: "Mixed Numbers Calculator — Calculate with Fractions & Mixed Numbers",
    description: "Calculate with mixed numbers and fractions. Get step-by-step solutions with multiple solving methods. Perfect for students and teachers.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [{url: "/og-image.jpg", width: 1200, height: 630, alt: "Mixed Numbers Calculator"}],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/calculators/mixed-numbers-calculator",
  },
};

export default function MixedNumbersCalculatorLayout({children}: {children: React.ReactNode}) {
  return <>{children}</>;
}
