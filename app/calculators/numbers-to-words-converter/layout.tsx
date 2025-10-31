import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Numbers to Words Converter — Convert Numbers to Written Form Online',
  description: 'Free online number to words converter. Convert numbers to words, currency format, and check writing format. Supports millions, billions, and different letter cases. Perfect for checks, invoices, and legal documents.',
  keywords: "numbers to words converter, number to words, convert numbers to text, spell numbers, number spelling, check writing, currency converter, numbers in words, digit to words converter, number translator",
  openGraph: {
    title: "Numbers to Words Converter — Convert Any Number to Written Form",
    description: "Convert numbers to words instantly. Perfect for writing checks, invoices, and legal documents. Supports currency and custom letter cases.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [{url: "/og-image.jpg", width: 1200, height: 630, alt: "Numbers to Words Converter"}],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/calculators/numbers-to-words-converter",
  },
};

export default function NumbersToWordsConverterLayout({children}: {children: React.ReactNode}) {
  return <>{children}</>;
}
