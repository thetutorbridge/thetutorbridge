import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Days Between Dates Calculator - Calculate Date Difference Free',
  description: 'Free days between dates calculator. Find the exact number of days, weeks, months, and years between two dates. Includes weekday and weekend count. Perfect for project planning.',
  keywords: [
    'days between dates',
    'date difference calculator',
    'calculate days between dates',
    'days calculator',
    'date duration',
    'how many days between',
    'days from date to date',
    'date difference',
    'days counter',
    'weekdays calculator',
  ],
  openGraph: {
    title: 'Free Days Between Dates Calculator - Calculate Date Differences',
    description: 'Calculate exact days, weeks, months between any two dates. Includes weekday analysis.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/days-between-dates',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Days Between Dates Calculator',
    description: 'Find days, weeks, months between any two dates.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/days-between-dates',
  },
};

export default function DaysBetweenDatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
