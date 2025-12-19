import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Currency Converter - Free Real-Time Exchange Rate Calculator | The Tutor Bridge',
  description: 'Free currency converter with live exchange rates for 150+ currencies. Convert USD to INR, EUR to INR, AED to INR, GBP to INR and more. Accurate rates updated daily.',
  keywords: [
    // Primary keywords
    'currency converter',
    'exchange rate calculator',
    'currency exchange calculator',
    'money converter',
    'forex calculator',

    // USD conversions
    'usd to inr',
    'dollar to rupee',
    'usd to inr today',
    '1 dollar in rupees',
    'dollar rate today',
    'us dollar to indian rupee',
    'usd to cad',
    'usd to php',
    'usd to idr',
    'dollar to rand',
    'usd to zar',
    'dollar to peso',

    // EUR conversions
    'euro to inr',
    'euro to dollar',
    'eur to usd',
    'euro to rupee',
    '1 euro in rupees',
    'euro rate today',

    // GBP conversions
    'gbp to inr',
    'pound to rupee',
    'pound to inr',
    'british pound to inr',
    'gbp to usd',

    // AED conversions
    'aed to inr',
    'dirham to rupee',
    'uae dirham to inr',
    '1 aed to inr',
    'dubai currency to inr',

    // SAR conversions
    'sar to inr',
    'saudi riyal to inr',
    'riyal to rupee',
    '1 sar to inr',

    // KWD conversions
    'kwd to inr',
    'kuwait dinar to inr',
    'kuwaiti dinar to rupee',
    '1 kwd to inr',

    // Other popular conversions
    'cad to inr',
    'aud to inr',
    'sgd to inr',
    'myr to inr',
    'jpy to inr',
    'chf to inr',
    'nzd to inr',
    'thb to inr',
    'qar to inr',
    'omr to inr',
    'bhd to inr',

    // Long-tail keywords
    'live currency exchange rates',
    'real time currency converter',
    'free currency calculator',
    'online currency converter',
    'currency conversion calculator',
    'foreign exchange calculator',
    'international currency converter',
    'world currency converter',
    'best currency converter',
    'accurate exchange rates',
  ],
  authors: [{ name: 'The Tutor Bridge' }],
  creator: 'The Tutor Bridge',
  publisher: 'The Tutor Bridge',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/calculators/currency-converter',
  },
  openGraph: {
    title: 'Currency Converter - Free Real-Time Exchange Rates',
    description: 'Convert currencies instantly with live exchange rates. USD to INR, EUR to INR, AED to INR, GBP to INR and 150+ currencies supported.',
    url: 'https://www.thetutorbridge.com/calculators/currency-converter',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Currency Converter - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Currency Converter - Free Exchange Rate Calculator',
    description: 'Convert 150+ currencies with live exchange rates. USD, EUR, GBP, AED, INR and more.',
    images: ['https://www.thetutorbridge.com/og-calculator.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function CurrencyConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
