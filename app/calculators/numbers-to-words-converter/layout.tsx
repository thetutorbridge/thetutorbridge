import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Numbers to Words Converter | 123 = One Hundred Twenty-Three [Free]',
  description: 'Free numbers to words converter: Convert any number to words instantly. Perfect for writing checks (One Hundred Dollars), invoices & legal documents. Supports billions, currency & all cases.',
  keywords: "numbers to words converter, number to words, convert numbers to text, spell numbers, number spelling, check writing, currency converter, numbers in words, digit to words converter, number translator",
  openGraph: {
    title: "Numbers to Words Converter — Convert Any Number to Written Form",
    description: "Convert numbers to words instantly. Perfect for writing checks, invoices, and legal documents. Supports currency and custom letter cases.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [{url: "/og-image.png", width: 1200, height: 630, alt: "Numbers to Words Converter"}],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/calculators/numbers-to-words-converter",
  },
};

export default function NumbersToWordsConverterLayout({children}: {children: React.ReactNode}) {
  return <>{children}</>;
}
