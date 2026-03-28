import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pomodoro Timer - Focus Timer Free Online',
  description: 'Free Pomodoro timer. Boost productivity with the Pomodoro Technique. 25-minute work sessions with 5-minute breaks. Perfect for studying and work.',
  keywords: [
    'pomodoro timer',
    'pomodoro technique',
    'focus timer',
    'productivity timer',
    'work timer',
    'study timer',
  ],
  openGraph: {
    title: 'Free Pomodoro Timer',
    description: 'Boost productivity with Pomodoro.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/pomodoro-timer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Pomodoro Timer',
    description: 'Focus timer.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/pomodoro-timer',
  },
};

export default function PomodoroTimerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
