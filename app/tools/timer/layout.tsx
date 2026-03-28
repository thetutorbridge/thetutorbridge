import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Timer & Stopwatch - Free Online Timer and Stopwatch Tool',
  description: 'Free online timer and stopwatch. Perfect for workouts, cooking, studying, Pomodoro technique, and productivity. Set custom timers or use presets. Accurate stopwatch with milliseconds.',
  keywords: [
    'timer',
    'stopwatch',
    'online timer',
    'countdown timer',
    'free timer',
    'pomodoro timer',
    'workout timer',
    'cooking timer',
    'study timer',
    'stopwatch online',
    'online stopwatch',
    'free stopwatch',
  ],
  openGraph: {
    title: 'Free Online Timer & Stopwatch',
    description: 'Set custom timers or track time with our accurate stopwatch. Perfect for workouts, cooking, studying, and more.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/timer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Timer & Stopwatch',
    description: 'Custom timers and accurate stopwatch for any activity.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/timer',
  },
};

export default function TimerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
