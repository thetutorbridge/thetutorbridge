import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Word Counter - Count Words, Characters, Sentences Free Online',
  description: 'Free online word counter. Count words, characters, sentences, and paragraphs instantly. Real-time text analysis with reading time estimates. Perfect for essays, articles, and content writing.',
  keywords: [
    'word counter',
    'count words',
    'word count',
    'online word counter',
    'character counter',
    'text counter',
    'word counter online',
    'free word counter',
    'essay word count',
    'sentence counter',
  ],
  openGraph: {
    title: 'Free Word Counter - Count Words & Characters Online',
    description: 'Count words, characters, sentences instantly. Real-time analysis for writers and students.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/word-counter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Word Counter',
    description: 'Real-time word and character counting tool.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/word-counter',
  },
};

export default function WordCounterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
