import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Random Name Generator - Generate Random Names Free Online',
  description: 'Free random name generator. Generate realistic random names instantly for characters, stories, games, and testing. Choose male, female, or both. Perfect for writers and game developers.',
  keywords: [
    'random name generator',
    'name generator',
    'random names',
    'fake name generator',
    'character name generator',
    'name picker',
    'generate names',
    'random person name',
    'name randomizer',
  ],
  openGraph: {
    title: 'Free Random Name Generator - Generate Names Instantly',
    description: 'Generate realistic random names for characters, stories, and games.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/random-name-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Random Name Generator',
    description: 'Generate random names instantly.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/random-name-generator',
  },
};

export default function RandomNameGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
