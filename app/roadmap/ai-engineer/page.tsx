'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Brain,
  MessageSquare,
  Database,
  Cpu,
  Sparkles,
  Shield,
  Code,
  Layers,
  Server,
  Monitor,
  Cloud
} from 'lucide-react';
import {
  RoadmapHero,
  WhatIsSection,
  VisualRoadmapSection,
  SalarySection,
  ProjectsSection,
  FAQSection,
  RelatedRoadmapsSection,
  CTASection,
  RoadmapStage
} from '@/components/roadmap/RoadmapComponents';

// Roadmap Stages Data
const roadmapStages: RoadmapStage[] = [
  {
    title: 'AI Fundamentals',
    icon: Brain,
    color: 'bg-purple-500',
    steps: [
      {
        id: 1,
        title: 'What is AI Engineering?',
        description: 'Understand the role and scope of AI engineering',
        topics: ['AI vs ML vs DL', 'AI Engineer vs ML Engineer', 'LLMs', 'Generative AI']
      },
      {
        id: 2,
        title: 'Core Terminology',
        description: 'Learn essential AI concepts and terms',
        topics: ['Inference', 'Training', 'Embeddings', 'Tokens', 'Context Window', 'Fine-tuning']
      }
    ],
    milestone: 'You understand the AI landscape!'
  },
  {
    title: 'Programming & Tools',
    icon: Code,
    color: 'bg-blue-500',
    steps: [
      {
        id: 3,
        title: 'Python for AI',
        description: 'Master Python for AI development',
        topics: ['Python Basics', 'NumPy', 'Data Structures', 'APIs', 'Async Programming']
      },
      {
        id: 4,
        title: 'Development Environment',
        description: 'Set up your AI development workflow',
        topics: ['Jupyter Notebooks', 'VS Code', 'Git', 'Virtual Environments', 'Docker']
      }
    ]
  },
  {
    title: 'LLM APIs & Platforms',
    icon: MessageSquare,
    color: 'bg-green-500',
    steps: [
      {
        id: 5,
        title: 'OpenAI Platform',
        description: 'Master the OpenAI API ecosystem',
        topics: ['Chat Completions', 'GPT-4', 'Tokens & Pricing', 'Playground', 'Fine-tuning']
      },
      {
        id: 6,
        title: 'Other AI Providers',
        description: 'Explore alternative AI platforms',
        topics: ['Anthropic Claude', 'Google Gemini', 'Mistral AI', 'Cohere', 'Hugging Face']
      },
      {
        id: 7,
        title: 'Open Source Models',
        description: 'Work with open source LLMs',
        topics: ['Llama', 'Mistral', 'Ollama', 'Hugging Face Hub', 'Local Deployment']
      }
    ],
    milestone: 'You can work with LLM APIs!'
  },
  {
    title: 'Prompt Engineering',
    icon: Sparkles,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 8,
        title: 'Prompt Fundamentals',
        description: 'Learn effective prompt writing',
        topics: ['Zero-shot', 'Few-shot', 'Chain of Thought', 'System Prompts', 'Templates']
      },
      {
        id: 9,
        title: 'Advanced Prompting',
        description: 'Master advanced techniques',
        topics: ['ReAct', 'Tree of Thoughts', 'Self-Consistency', 'Prompt Chaining']
      }
    ]
  },
  {
    title: 'Embeddings & Vector DBs',
    icon: Database,
    color: 'bg-orange-500',
    steps: [
      {
        id: 10,
        title: 'Understanding Embeddings',
        description: 'Learn how embeddings work',
        topics: ['Text Embeddings', 'Semantic Search', 'OpenAI Embeddings', 'Sentence Transformers']
      },
      {
        id: 11,
        title: 'Vector Databases',
        description: 'Store and query embeddings',
        topics: ['Pinecone', 'Chroma', 'Weaviate', 'Qdrant', 'FAISS', 'pgvector']
      }
    ],
    milestone: 'You can build semantic search!'
  },
  {
    title: 'RAG Applications',
    icon: Layers,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 12,
        title: 'RAG Fundamentals',
        description: 'Build retrieval-augmented generation systems',
        topics: ['What is RAG', 'Chunking', 'Retrieval', 'Generation', 'RAG vs Fine-tuning']
      },
      {
        id: 13,
        title: 'RAG Frameworks',
        description: 'Use frameworks to build RAG apps',
        topics: ['LangChain', 'LlamaIndex', 'Haystack', 'RAG Evaluation']
      }
    ]
  },
  {
    title: 'AI Agents',
    icon: Cpu,
    color: 'bg-pink-500',
    steps: [
      {
        id: 14,
        title: 'Agent Fundamentals',
        description: 'Build autonomous AI agents',
        topics: ['What are Agents', 'Tools & Functions', 'ReAct Pattern', 'Agent Memory']
      },
      {
        id: 15,
        title: 'Building Agents',
        description: 'Implement production agents',
        topics: ['OpenAI Functions', 'LangChain Agents', 'AutoGPT', 'CrewAI', 'Agent Orchestration']
      }
    ],
    milestone: 'You can build AI agents!'
  },
  {
    title: 'AI Safety & Production',
    icon: Shield,
    color: 'bg-red-500',
    steps: [
      {
        id: 16,
        title: 'AI Safety',
        description: 'Build safe and responsible AI',
        topics: ['Prompt Injection', 'Jailbreaking', 'Content Moderation', 'Bias & Fairness']
      },
      {
        id: 17,
        title: 'Production Deployment',
        description: 'Deploy AI applications at scale',
        topics: ['API Design', 'Rate Limiting', 'Caching', 'Monitoring', 'Cost Optimization']
      }
    ],
    milestone: 'You are a professional AI Engineer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$90K - $130K', avg: '$110K' },
  { level: 'Mid (2-5 yrs)', range: '$130K - $180K', avg: '$155K' },
  { level: 'Senior (5-8 yrs)', range: '$180K - $250K', avg: '$210K' },
  { level: 'Lead (8+ yrs)', range: '$250K - $400K+', avg: '$300K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹8L - ₹15L', avg: '₹12L' },
  { level: 'Junior (1-3 yrs)', range: '₹15L - ₹25L', avg: '₹18L' },
  { level: 'Mid (3-5 yrs)', range: '₹25L - ₹45L', avg: '₹32L' },
  { level: 'Senior (5+ yrs)', range: '₹45L - ₹80L+', avg: '₹55L' }
];

// Project Ideas
const projects = [
  {
    title: 'AI Chatbot',
    level: 'Beginner' as const,
    description: 'Build a chatbot using OpenAI API',
    skills: ['OpenAI API', 'Python', 'Streamlit']
  },
  {
    title: 'Document Q&A',
    level: 'Intermediate' as const,
    description: 'RAG app to chat with PDFs',
    skills: ['LangChain', 'Vector DB', 'Embeddings']
  },
  {
    title: 'Code Assistant',
    level: 'Intermediate' as const,
    description: 'AI-powered coding helper',
    skills: ['GPT-4', 'Function Calling', 'Streaming']
  },
  {
    title: 'Multi-Agent System',
    level: 'Advanced' as const,
    description: 'Autonomous agents working together',
    skills: ['CrewAI', 'LangChain', 'Agent Orchestration']
  },
  {
    title: 'AI Content Generator',
    level: 'Intermediate' as const,
    description: 'Generate blog posts and social media content',
    skills: ['Prompt Engineering', 'Templates', 'API']
  },
  {
    title: 'Semantic Search Engine',
    level: 'Advanced' as const,
    description: 'Build a search engine with embeddings',
    skills: ['Embeddings', 'Pinecone', 'React']
  }
];

// FAQs
const faqs = [
  {
    question: 'What is the difference between AI Engineer and ML Engineer?',
    answer: 'AI Engineers focus on building applications using pre-trained models and APIs (like GPT-4, Claude), while ML Engineers train and deploy custom machine learning models from scratch. AI Engineers work more with prompt engineering, RAG, and LLM orchestration. ML Engineers need deeper math and model training expertise.'
  },
  {
    question: 'Do I need a PhD to become an AI Engineer?',
    answer: 'No, a PhD is not required for AI Engineering roles. Unlike traditional ML research, AI Engineering focuses on applying existing models. Strong programming skills, understanding of LLMs, and practical project experience are more important. Many successful AI Engineers are self-taught or have bootcamp backgrounds.'
  },
  {
    question: 'Which programming language should I learn for AI Engineering?',
    answer: 'Python is essential and sufficient for most AI Engineering work. It is used for API integration, LangChain, and most AI frameworks. JavaScript/TypeScript is useful for building AI-powered web apps. Learn Python first, then pick up JS if needed for frontend work.'
  },
  {
    question: 'How long does it take to become an AI Engineer?',
    answer: 'With 3-4 hours of daily practice and existing programming knowledge, you can become job-ready in 3-6 months. This includes mastering LLM APIs, prompt engineering, RAG, and building projects. The field moves fast, so continuous learning is essential.'
  },
  {
    question: 'What is RAG and why is it important?',
    answer: 'RAG (Retrieval-Augmented Generation) combines LLMs with external knowledge bases. Instead of relying only on trained knowledge, RAG retrieves relevant documents and uses them to generate accurate responses. It is crucial for building chatbots that answer questions about specific documents or data.'
  },
  {
    question: 'Should I learn to fine-tune models or use RAG?',
    answer: 'Start with RAG - it is faster, cheaper, and works well for most use cases. Fine-tuning requires more data, compute, and expertise. Use RAG when you need the model to access specific information. Consider fine-tuning only when you need to change the model behavior or style significantly.'
  },
  {
    question: 'Which LLM provider should I start with?',
    answer: 'Start with OpenAI - it has the best documentation, most tutorials, and GPT-4 is highly capable. Once comfortable, explore Anthropic Claude for longer contexts and Google Gemini for multimodal tasks. Also learn to use open-source models via Hugging Face or Ollama for cost-effective solutions.'
  },
  {
    question: 'Is AI Engineering a good career choice in 2026?',
    answer: 'Yes, AI Engineering is one of the fastest-growing and highest-paying tech roles. Every company wants to integrate AI into their products. The demand far exceeds supply, leading to high salaries and remote opportunities. The field will continue growing as AI becomes more prevalent.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'Full Stack Developer',
    description: 'Build complete web applications',
    href: '/roadmap/full-stack-developer',
    icon: Layers,
    color: 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66]'
  },
  {
    title: 'Data Analyst',
    description: 'Analyze data and build dashboards',
    href: '/roadmap/data-analyst',
    icon: Database,
    color: 'bg-blue-500'
  },
  {
    title: 'Backend Developer',
    description: 'Server-side programming and APIs',
    href: '/roadmap/backend-developer',
    icon: Server,
    color: 'bg-green-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'AI Engineer Roadmap 2026',
  description: 'Complete guide to becoming an AI engineer in 2026',
  author: { '@type': 'Organization', name: 'The Tutor Bridge' },
  publisher: { '@type': 'Organization', name: 'The Tutor Bridge' }
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer }
  }))
};

export default function AIEngineerRoadmapPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navigation />

      <main className="min-h-screen bg-gray-50">
        <RoadmapHero
          title="AI Engineer Roadmap"
          description="Master LLMs, Prompt Engineering, RAG, Vector Databases, and AI Agents. Your complete guide to becoming a professional AI engineer in 2026."
          duration="3-6 Months"
          difficulty="Intermediate"
          accentColor="#8B5CF6"
        />

        <WhatIsSection
          title="What is an AI Engineer?"
          paragraphs={[
            'AI Engineers build applications powered by artificial intelligence, particularly Large Language Models (LLMs) like GPT-4 and Claude. They focus on integrating AI capabilities into products rather than training models from scratch.',
            'As an AI Engineer, you will work with APIs, build RAG systems, create AI agents, implement prompt engineering strategies, and deploy AI-powered applications that solve real business problems.'
          ]}
          responsibilities={[
            'Integrate LLM APIs (OpenAI, Anthropic, etc.) into applications',
            'Design and implement RAG (Retrieval-Augmented Generation) systems',
            'Build AI agents and autonomous workflows',
            'Write effective prompts and prompt templates',
            'Work with embeddings and vector databases',
            'Ensure AI safety and handle edge cases',
            'Optimize costs and performance of AI applications',
            'Stay updated with rapidly evolving AI landscape'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#8B5CF6"
        />

        <SalarySection
          title="AI Engineer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="AI Engineers are among the highest-paid roles in tech. Experience with production RAG systems, agent frameworks, and multiple LLM providers commands premium salaries. Senior AI Engineers at top companies can earn $400K+ with equity."
          gradient="bg-gradient-to-r from-purple-500 to-pink-500"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your AI Engineering Journey?"
          description="Get personalized guidance from experienced AI professionals who have built production AI systems."
          gradient="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
        />
      </main>

      <Footer />
    </>
  );
}
