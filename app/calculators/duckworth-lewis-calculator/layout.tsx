import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Duckworth Lewis Calculator - Free DLS Calculator for Cricket | The Tutor Bridge',
  description: 'Free Duckworth Lewis Stern (DLS) calculator for cricket. Calculate revised targets for rain-interrupted ODI and T20 matches. Find par scores and target scores instantly.',
  keywords: [
    'Duckworth Lewis calculator',
    'DLS calculator',
    'Duckworth Lewis Stern calculator',
    'cricket rain calculator',
    'DLS method calculator',
    'revised target calculator',
    'par score calculator',
    'cricket target calculator',
    'rain interrupted cricket',
    'ODI target calculator',
    'T20 DLS calculator',
    'cricket overs calculator',
    'DLS par score',
    'DLS target score',
    'Duckworth Lewis method',
    'Duckworth Lewis Stern method',
    'cricket resources calculator',
    'wickets remaining calculator',
    'overs remaining calculator',
    'cricket match calculator',
    'rain delay cricket',
    'interrupted innings',
    'cricket score calculator',
    'DLS formula',
    'DLS method explained',
    'how does DLS work',
    'DLS calculation',
    'ICC DLS',
    'one day cricket calculator',
    'limited overs cricket',
    'cricket statistics calculator',
    'cricket match result',
    'free DLS calculator',
    'online Duckworth Lewis calculator',
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
    canonical: '/calculators/duckworth-lewis-calculator',
  },
  openGraph: {
    title: 'Duckworth Lewis Calculator - DLS Method for Cricket',
    description: 'Calculate revised targets for rain-interrupted cricket matches using the Duckworth Lewis Stern method. Free DLS calculator.',
    url: 'https://thetutorbridge.com/calculators/duckworth-lewis-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Duckworth Lewis Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Duckworth Lewis Calculator - Free DLS Tool',
    description: 'Calculate DLS revised targets for rain-interrupted cricket matches. Free online calculator.',
    images: ['https://thetutorbridge.com/og-calculator.png'],
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

export default function DuckworthLewisCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
