import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prompt Engineering Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master Prompt Engineering with our comprehensive 2026 roadmap. Learn ChatGPT prompts, LLM optimization, chain-of-thought, RAG, and AI application development. Start your AI career today!',
  keywords: [
    'prompt engineering roadmap',
    'prompt engineering roadmap 2026',
    'prompt engineering learning path',
    'chatgpt prompts',
    'llm prompts',
    'ai prompt design',
    'prompt engineer',
    'chain of thought prompting',
    'few shot learning',
    'zero shot prompting',
    'rag prompts',
    'langchain',
    'openai api',
    'claude prompts',
    'gpt-4 prompting',
    'prompt optimization',
    'prompt templates',
    'ai engineering',
    'llm applications',
    'generative ai',
    'prompt injection',
    'prompt security',
    'prompt engineering jobs',
    'prompt engineering career',
    'prompt engineering skills',
    'prompt engineering tutorial',
    'prompt engineering course',
    'prompt engineering certification',
    'ai prompts best practices',
    'prompt engineering for beginners'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/roadmap/prompt-engineering',
  },
  openGraph: {
    title: 'Prompt Engineering Roadmap 2026 - Complete Learning Path',
    description: 'Master Prompt Engineering with our comprehensive 2026 roadmap. Learn ChatGPT prompts, LLM optimization, chain-of-thought, RAG, and AI application development.',
    url: 'https://www.thetutorbridge.com/roadmap/prompt-engineering',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Prompt Engineering Roadmap 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prompt Engineering Roadmap 2026 - Complete Learning Path',
    description: 'Master Prompt Engineering with our comprehensive 2026 roadmap. Learn ChatGPT prompts, LLM optimization, chain-of-thought, RAG, and AI application development.',
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

export default function PromptEngineeringRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
