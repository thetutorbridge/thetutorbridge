import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NLP Engineer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master NLP with our comprehensive 2026 roadmap. Learn transformers, LLMs, BERT, GPT, RAG, text processing, and conversational AI. Start your NLP engineering career today!',
  keywords: [
    'nlp engineer roadmap',
    'nlp roadmap 2026',
    'natural language processing',
    'nlp developer roadmap',
    'nlp learning path',
    'transformers tutorial',
    'bert tutorial',
    'gpt development',
    'llm engineering',
    'rag development',
    'hugging face tutorial',
    'text classification',
    'named entity recognition',
    'sentiment analysis',
    'chatbot development',
    'nlp salary',
    'nlp jobs',
    'nlp interview',
    'nlp python',
    'spacy nltk',
    'text processing',
    'word embeddings',
    'language models',
    'seq2seq models',
    'attention mechanism',
    'fine tuning llm',
    'prompt engineering nlp',
    'conversational ai',
    'nlp projects',
    'nlp career'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/roadmap/nlp-engineer',
  },
  openGraph: {
    title: 'NLP Engineer Roadmap 2026 - Complete Learning Path',
    description: 'Master NLP with our comprehensive 2026 roadmap. Learn transformers, LLMs, BERT, GPT, RAG, and conversational AI.',
    url: 'https://www.thetutorbridge.com/roadmap/nlp-engineer',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [{ url: 'https://www.thetutorbridge.com/og-image.png', width: 1200, height: 630, alt: 'NLP Engineer Roadmap 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NLP Engineer Roadmap 2026 - Complete Learning Path',
    description: 'Master NLP with our comprehensive 2026 roadmap. Learn transformers, LLMs, BERT, GPT, RAG, and conversational AI.',
    images: ['https://www.thetutorbridge.com/og-image.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function NLPEngineerRoadmapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
