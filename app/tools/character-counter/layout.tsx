import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Character Counter - Free Word Counter & Text Analysis Tool',
  description: 'Free online character counter and word counter. Count characters, words, sentences, paragraphs, and lines instantly. Perfect for writers, students, and social media. Real-time text analysis.',
  keywords: [
    'character counter',
    'word counter',
    'character count',
    'word count',
    'text counter',
    'letter counter',
    'online character counter',
    'free word counter',
    'sentence counter',
    'paragraph counter',
    'twitter character counter',
    'essay word count',
  ],
  openGraph: {
    title: 'Free Character Counter & Word Counter Online',
    description: 'Count characters, words, sentences instantly. Perfect for essays, social media, and content writing.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/character-counter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Character & Word Counter',
    description: 'Real-time text analysis for writers and students.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/character-counter',
  },
};

export default function CharacterCounterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
