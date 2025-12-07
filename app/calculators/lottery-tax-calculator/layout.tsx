import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lottery Tax Calculator - Federal & State Tax on Lottery Winnings | The Tutor Bridge',
  description: 'Free lottery tax calculator to estimate federal and state taxes on lottery winnings. Compare lump sum vs annuity payouts, calculate take-home amount with 2024 tax brackets.',
  keywords: [
    'lottery tax calculator',
    'lottery winnings tax calculator',
    'how much tax on lottery winnings',
    'lottery payout calculator',
    'lottery tax rate',
    'federal tax on lottery',
    'state tax on lottery',
    'lump sum vs annuity lottery',
    'lottery after tax calculator',
    'powerball tax calculator',
    'mega millions tax calculator',
    'lottery prize calculator',
    'how much will I get if I win the lottery',
    'lottery winnings after tax',
    'lottery cash option calculator',
    'lottery annuity calculator',
    'gambling tax calculator',
    'lottery take home calculator',
    'lottery net payout',
    'lottery withholding tax',
    '24% federal lottery tax',
    'lottery tax by state',
    'state lottery tax rates',
    'no lottery tax states',
    'lottery winner tax calculator',
    'jackpot tax calculator',
    'sweepstakes tax calculator',
    'prize money tax calculator',
    'lottery lump sum payout percentage',
    'lottery annuity payments',
    'lottery tax brackets 2024',
    'how to calculate lottery tax',
    'lottery winnings tax rate',
    'federal withholding lottery',
    'additional federal tax lottery',
    'lottery payout options',
    'lottery cash value calculator',
    'lottery prize tax estimator',
    'gambling winnings tax',
    'IRS lottery tax',
    'lottery 1099 tax',
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
    canonical: '/calculators/lottery-tax-calculator',
  },
  openGraph: {
    title: 'Lottery Tax Calculator - Federal & State Tax on Lottery Winnings',
    description: 'Free lottery tax calculator to estimate federal and state taxes. Compare lump sum vs annuity payouts with 2024 tax brackets.',
    url: 'https://thetutorbridge.com/calculators/lottery-tax-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Lottery Tax Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lottery Tax Calculator - Free Tool',
    description: 'Calculate lottery taxes on winnings. Compare lump sum vs annuity with federal and state tax breakdowns.',
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

export default function LotteryTaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
