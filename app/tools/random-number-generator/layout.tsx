import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Random Number Generator - Free Random Number Picker & RNG Tool',
  description: 'Free random number generator. Generate random numbers instantly with customizable min/max range. Perfect for lottery, dice, games, and statistical sampling. True randomness guaranteed.',
  keywords: [
    'random number generator',
    'random number picker',
    'RNG',
    'random numbers',
    'number generator',
    'lottery number generator',
    'dice roller',
    'random picker',
    'random generator',
    'number picker',
    'random dice',
    'online random number generator',
  ],
  openGraph: {
    title: 'Free Random Number Generator - True Random Numbers Online',
    description: 'Generate random numbers with custom ranges. Perfect for games, lottery, statistical sampling, and more.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/random-number-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Random Number Generator',
    description: 'Generate truly random numbers instantly with our free RNG tool.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/random-number-generator',
  },
};

export default function RandomNumberGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
