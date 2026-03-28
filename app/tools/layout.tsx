import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Online Tools - Timer, Character Counter, Password Generator & More',
  description: 'Free online tools for students and professionals. Timer, stopwatch, character counter, password generator, random number generator, case converter. 100% free, no sign-up required.',
  keywords: [
    'free online tools',
    'online tools',
    'web tools',
    'free tools',
    'timer',
    'stopwatch',
    'character counter',
    'word counter',
    'password generator',
    'random number generator',
    'case converter',
    'text tools',
    'productivity tools',
    'student tools',
  ],
  openGraph: {
    title: 'Free Online Tools - 27M+ Monthly Users',
    description: '5 powerful free tools: Timer, Character Counter, Password Generator, Random Number Generator, Case Converter. All 100% free.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Tools',
    description: 'Powerful free tools for everyone. No sign-up required.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools',
  },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
