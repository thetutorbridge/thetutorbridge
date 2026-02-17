import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Time Until Calculator - Free Countdown Timer with Live Updates | The Tutor Bridge',
  description: 'Free time until calculator to find exact time remaining until any future date. Calculate countdown in years, months, weeks, days, hours, minutes & seconds with live updates. Perfect for event planning, deadlines, and celebrations.',
  keywords: [
    // Primary Keywords
    'time until calculator',
    'countdown calculator',
    'time remaining calculator',
    'date countdown calculator',
    'time left calculator',

    // Question Keywords
    'how many days until',
    'how much time until',
    'how long until',
    'days until calculator',
    'time until christmas',
    'time until new year',
    'countdown to date',

    // Feature Keywords
    'live countdown timer',
    'real time countdown',
    'countdown clock',
    'date duration calculator',
    'time difference calculator',
    'days between dates calculator',

    // Unit-Specific Keywords
    'days until calculator',
    'weeks until calculator',
    'months until calculator',
    'hours until calculator',
    'minutes until calculator',
    'seconds until calculator',

    // Use Case Keywords
    'event countdown timer',
    'birthday countdown calculator',
    'holiday countdown calculator',
    'deadline countdown timer',
    'wedding countdown calculator',
    'vacation countdown',
    'christmas countdown calculator',
    'new year countdown',

    // Long-tail Keywords
    'free online countdown calculator',
    'calculate time until date',
    'time remaining until date calculator',
    'date to date countdown',
    'time until event calculator',
    'countdown days hours minutes seconds',
    'precise time until calculator',
    'countdown with live updates',

    // Educational Keywords
    'time calculation tool',
    'date math calculator',
    'calendar calculator',
    'time unit converter',

    // Geographic Keywords
    'time until calculator online',
    'time until calculator free',
    'best countdown calculator',
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
    canonical: 'https://www.thetutorbridge.com/calculators/time-until-calculator',
  },
  openGraph: {
    title: 'Free Time Until Calculator - Live Countdown Timer',
    description: 'Calculate exact time remaining until any date with live updates. Get countdown in years, months, weeks, days, hours, minutes & seconds. Perfect for events, deadlines & celebrations.',
    url: 'https://www.thetutorbridge.com/calculators/time-until-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Time Until Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Time Until Calculator - Live Countdown Timer',
    description: 'Calculate exact time remaining until any date. Live countdown in years, months, weeks, days, hours, minutes & seconds.',
    images: ['https://www.thetutorbridge.com/og-image.png'],
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

export default function TimeUntilCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
