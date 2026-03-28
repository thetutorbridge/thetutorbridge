import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Countdown Timer - Create Event Countdowns Free Online',
  description: 'Free countdown timer. Create countdowns for events, deadlines, birthdays, and special occasions. Track time remaining with days, hours, minutes, and seconds.',
  keywords: [
    'countdown timer',
    'countdown clock',
    'event countdown',
    'days until',
    'time until',
    'countdown generator',
    'event timer',
  ],
  openGraph: {
    title: 'Free Countdown Timer',
    description: 'Create countdown timers for any event.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/countdown-timer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Countdown Timer',
    description: 'Create event countdowns.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/countdown-timer',
  },
};

export default function CountdownTimerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
