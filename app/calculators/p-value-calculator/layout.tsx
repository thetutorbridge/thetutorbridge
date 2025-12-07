import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'P-Value Calculator - Calculate Statistical Significance | The Tutor Bridge',
  description: 'Free p-value calculator for statistical hypothesis testing. Calculate p-values from z-score, t-score, chi-square, or F-statistic with one-tailed and two-tailed tests.',
  keywords: [
    'p-value calculator',
    'p value calculator',
    'calculate p-value',
    'p-value from z-score',
    'p-value from t-score',
    'statistical significance calculator',
    'hypothesis testing calculator',
    'z-score to p-value',
    't-score to p-value',
    'chi-square p-value',
    'f-test p-value',
    'one-tailed p-value',
    'two-tailed p-value',
    'left-tailed test',
    'right-tailed test',
    'significance level calculator',
    'alpha level calculator',
    'null hypothesis calculator',
    'statistical test calculator',
    'probability value calculator',
    'p-value formula',
    'how to calculate p-value',
    'what is p-value',
    'p-value interpretation',
    'p-value meaning',
    'reject null hypothesis',
    'statistical significance',
    'p-value from test statistic',
    'normal distribution p-value',
    't-distribution p-value',
    'degrees of freedom calculator',
    'p-value statistics',
    'hypothesis test p-value',
    'p-value for research',
    'online p-value calculator',
    'free p-value calculator',
    'p-value significance test',
    'p < 0.05 calculator',
    'critical value calculator',
    'test statistic to p-value',
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
    canonical: '/calculators/p-value-calculator',
  },
  openGraph: {
    title: 'P-Value Calculator - Calculate Statistical Significance',
    description: 'Free p-value calculator for hypothesis testing. Calculate p-values from z-score, t-score, chi-square, or F-statistic.',
    url: 'https://thetutorbridge.com/calculators/p-value-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'P-Value Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'P-Value Calculator - Free Statistical Tool',
    description: 'Calculate p-values from z-score, t-score, chi-square, or F-statistic with visual distribution graphs.',
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

export default function PValueCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
