import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pregnancy Calculator - Free Due Date Calculator | The Tutor Bridge',
  description: 'Free Pregnancy Calculator to calculate your due date, conception date, and pregnancy milestones. Track your pregnancy week by week with our accurate due date calculator.',
  keywords: [
    'pregnancy calculator',
    'due date calculator',
    'pregnancy due date calculator',
    'when is my due date',
    'conception calculator',
    'pregnancy week calculator',
    'how far along am i',
    'pregnancy date calculator',
    'baby due date calculator',
    'estimated due date calculator',
    'edd calculator',
    'lmp calculator',
    'last menstrual period calculator',
    'pregnancy countdown',
    'weeks pregnant calculator',
    'conception date calculator',
    'when did i conceive',
    'pregnancy timeline calculator',
    'trimester calculator',
    'pregnancy milestone calculator',
    'ivf due date calculator',
    'ultrasound due date calculator',
    'ovulation due date calculator',
    'delivery date calculator',
    'expected delivery date',
    'baby calculator',
    'maternity calculator',
    'gestation calculator',
    'gestational age calculator',
    'pregnancy tracker',
    'how many weeks pregnant',
    'pregnancy calendar',
    'due date predictor',
    'baby due date',
    'free pregnancy calculator',
    'accurate due date calculator',
    'online pregnancy calculator',
    'best due date calculator',
    '40 week calculator',
    'naegele rule calculator',
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
    canonical: 'https://www.thetutorbridge.com/calculators/pregnancy-calculator',
  },
  openGraph: {
    title: 'Pregnancy Calculator - Due Date Calculator | The Tutor Bridge',
    description: 'Calculate your due date and track your pregnancy week by week. Free pregnancy calculator with conception date, trimester info, and milestone tracking.',
    url: 'https://www.thetutorbridge.com/calculators/pregnancy-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Pregnancy Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pregnancy Calculator - Free Due Date Calculator',
    description: 'Calculate your due date and pregnancy milestones with our free pregnancy calculator.',
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

export default function PregnancyCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
