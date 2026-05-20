import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ovulation Calculator - Free Fertility & Ovulation Calendar 2025',
  description: 'Free ovulation calculator to find your most fertile days. Track your menstrual cycle, predict ovulation date, and maximize chances of getting pregnant with our accurate fertility calendar.',
  keywords: [
    'ovulation calculator',
    'fertility calculator',
    'ovulation calendar',
    'when am i ovulating',
    'ovulation predictor',
    'fertile window calculator',
    'conception calculator',
    'best time to conceive',
    'when to get pregnant',
    'ovulation tracker',
    'fertility calendar',
    'ovulation date calculator',
    'menstrual cycle calculator',
    'fertile days calculator',
    'pregnancy planning calculator',
    'when is my ovulation',
    'ovulation cycle calculator',
    'baby planning calculator',
    'TTC calculator',
    'trying to conceive calculator',
    'free ovulation calculator',
    'online ovulation calculator',
    'accurate ovulation calculator',
    'ovulation calculator by period',
    'ovulation calculator last period',
    'cycle length ovulation',
    'luteal phase calculator',
    'follicular phase calculator',
    'egg release calculator',
    'peak fertility days',
    'most fertile days',
    'fertility window',
    'implantation calculator',
    'when will i ovulate',
    'next ovulation date',
    'ovulation symptoms',
    'ovulation signs',
    'period tracker ovulation',
    'menstrual cycle ovulation',
    '28 day cycle ovulation',
    'irregular period ovulation',
    'ovulation calculator irregular periods',
    'natural family planning calculator',
    'rhythm method calculator',
    'basal body temperature',
    'cervical mucus ovulation',
    'LH surge calculator',
    'ovulation prediction',
    'baby making calculator',
    'get pregnant fast calculator'
  ],
  openGraph: {
    title: 'Ovulation Calculator - Free Fertility & Ovulation Calendar',
    description: 'Calculate your most fertile days with our free ovulation calculator. Predict ovulation date, track your cycle, and plan for pregnancy.',
    type: 'website',
    locale: 'en_US',
    siteName: 'The Tutor Bridge',
    url: 'https://thetutorbridge.com/calculators/ovulation-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ovulation Calculator - Free Fertility & Ovulation Calendar',
    description: 'Calculate your most fertile days with our free ovulation calculator. Predict ovulation date, track your cycle, and plan for pregnancy.',
  },
  alternates: {
    canonical: 'https://thetutorbridge.com/calculators/ovulation-calculator',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function OvulationCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
