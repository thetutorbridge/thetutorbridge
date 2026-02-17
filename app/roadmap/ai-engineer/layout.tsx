import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Engineer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master AI engineering with our comprehensive 2026 roadmap. Learn LLMs, Prompt Engineering, RAG, Vector Databases, AI Agents, and more. Step-by-step guide from beginner to professional AI engineer.',
  keywords: [
    'ai engineer roadmap',
    'ai engineer roadmap 2026',
    'how to become an ai engineer',
    'ai engineer learning path',
    'ai engineer skills',
    'llm engineer',
    'prompt engineering',
    'rag tutorial',
    'vector databases',
    'ai agents',
    'openai api',
    'langchain tutorial',
    'ai engineer salary',
    'ai engineer jobs',
    'machine learning engineer',
    'deep learning',
    'chatgpt api',
    'ai engineer course',
    'ai engineer for beginners',
    'ai engineer certification',
    'ai engineer interview',
    'generative ai',
    'hugging face',
    'embeddings',
    'llama index',
    'anthropic claude api',
    'ai engineer career',
    'ai engineer portfolio',
  ],
  authors: [{ name: 'The Tutor Bridge' }],
  creator: 'The Tutor Bridge',
  publisher: 'The Tutor Bridge',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/roadmap/ai-engineer',
  },
  openGraph: {
    title: 'AI Engineer Roadmap 2026 - Complete Learning Path',
    description: 'Master AI engineering with LLMs, RAG, Vector Databases, and AI Agents. Your complete guide to becoming a professional AI engineer.',
    url: 'https://www.thetutorbridge.com/roadmap/ai-engineer',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Engineer Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Engineer Roadmap 2026 - Complete Learning Path',
    description: 'Master AI engineering with LLMs, RAG, Vector Databases, and AI Agents.',
    images: ['https://www.thetutorbridge.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function AIEngineerRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
