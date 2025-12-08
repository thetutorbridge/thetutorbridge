'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  MessageSquare,
  Brain,
  Code,
  Layers,
  Zap,
  Shield,
  FileText,
  Settings,
  Sparkles,
  Target,
  BookOpen,
  Workflow
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
    title: 'LLM Fundamentals',
    icon: Brain,
    color: 'bg-purple-500',
    steps: [
      {
        id: 1,
        title: 'Understanding LLMs',
        description: 'How language models work',
        topics: ['Transformer Architecture', 'Tokenization', 'Context Windows', 'Temperature', 'Token Limits']
      },
      {
        id: 2,
        title: 'Major LLM Models',
        description: 'Know the landscape',
        topics: ['GPT-4/GPT-4o', 'Claude', 'Gemini', 'Llama', 'Mistral', 'Open vs Closed Models']
      }
    ],
    milestone: 'You understand how LLMs work!'
  },
  {
    title: 'Basic Prompting Techniques',
    icon: MessageSquare,
    color: 'bg-blue-500',
    steps: [
      {
        id: 3,
        title: 'Prompt Fundamentals',
        description: 'Core prompting skills',
        topics: ['Clear Instructions', 'Context Setting', 'Output Format', 'Constraints', 'Examples']
      },
      {
        id: 4,
        title: 'Zero-Shot & Few-Shot',
        description: 'Learning paradigms',
        topics: ['Zero-Shot Prompting', 'One-Shot Learning', 'Few-Shot Examples', 'Example Selection', 'Format Consistency']
      }
    ]
  },
  {
    title: 'Advanced Prompting',
    icon: Zap,
    color: 'bg-orange-500',
    steps: [
      {
        id: 5,
        title: 'Chain-of-Thought',
        description: 'Reasoning prompts',
        topics: ['CoT Prompting', 'Step-by-Step Reasoning', 'Self-Consistency', 'Tree of Thoughts', 'Reasoning Chains']
      },
      {
        id: 6,
        title: 'Advanced Techniques',
        description: 'Sophisticated methods',
        topics: ['ReAct', 'Self-Refine', 'Metacognitive Prompting', 'Prompt Chaining', 'Iterative Refinement']
      }
    ],
    milestone: 'You can write advanced prompts!'
  },
  {
    title: 'Role & Persona Design',
    icon: Target,
    color: 'bg-green-500',
    steps: [
      {
        id: 7,
        title: 'Role Prompting',
        description: 'Create effective personas',
        topics: ['System Prompts', 'Role Definition', 'Expertise Specification', 'Tone & Style', 'Behavioral Guidelines']
      },
      {
        id: 8,
        title: 'Custom Instructions',
        description: 'Persistent settings',
        topics: ['User Preferences', 'Output Preferences', 'Memory & Context', 'Personalization', 'Default Behaviors']
      }
    ]
  },
  {
    title: 'Prompt Engineering for Code',
    icon: Code,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 9,
        title: 'Code Generation',
        description: 'Generate quality code',
        topics: ['Code Prompts', 'Language Specification', 'Code Review', 'Debugging Prompts', 'Documentation']
      },
      {
        id: 10,
        title: 'AI Coding Assistants',
        description: 'Use coding tools',
        topics: ['GitHub Copilot', 'Cursor', 'Claude for Code', 'Code Completion', 'Refactoring']
      }
    ]
  },
  {
    title: 'RAG & Knowledge Integration',
    icon: BookOpen,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 11,
        title: 'RAG Fundamentals',
        description: 'Retrieval-augmented generation',
        topics: ['Vector Databases', 'Embeddings', 'Chunking Strategies', 'Retrieval Methods', 'Context Injection']
      },
      {
        id: 12,
        title: 'Advanced RAG',
        description: 'Optimize retrieval',
        topics: ['Hybrid Search', 'Reranking', 'Query Transformation', 'Multi-hop Retrieval', 'RAG Evaluation']
      }
    ],
    milestone: 'You can build RAG systems!'
  },
  {
    title: 'Prompt Optimization',
    icon: Settings,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 13,
        title: 'Evaluation & Testing',
        description: 'Measure prompt quality',
        topics: ['Evaluation Metrics', 'A/B Testing', 'Human Evaluation', 'Automated Testing', 'Benchmarks']
      },
      {
        id: 14,
        title: 'Optimization Techniques',
        description: 'Improve prompts',
        topics: ['Prompt Tuning', 'DSPy', 'Automatic Prompt Optimization', 'Cost Optimization', 'Latency Reduction']
      }
    ]
  },
  {
    title: 'AI Application Development',
    icon: Workflow,
    color: 'bg-pink-500',
    steps: [
      {
        id: 15,
        title: 'LLM Frameworks',
        description: 'Build AI applications',
        topics: ['LangChain', 'LlamaIndex', 'Semantic Kernel', 'Haystack', 'OpenAI SDK']
      },
      {
        id: 16,
        title: 'Agent Development',
        description: 'Create AI agents',
        topics: ['Tool Use', 'Function Calling', 'Multi-Agent Systems', 'Autonomous Agents', 'Agent Orchestration']
      }
    ]
  },
  {
    title: 'Security & Safety',
    icon: Shield,
    color: 'bg-red-500',
    steps: [
      {
        id: 17,
        title: 'Prompt Security',
        description: 'Secure your prompts',
        topics: ['Prompt Injection', 'Jailbreaking', 'Input Validation', 'Output Filtering', 'Red Teaming']
      },
      {
        id: 18,
        title: 'Responsible AI',
        description: 'Ethical considerations',
        topics: ['Bias Mitigation', 'Hallucination Handling', 'Content Moderation', 'Transparency', 'AI Ethics']
      }
    ]
  },
  {
    title: 'Production & Scale',
    icon: Sparkles,
    color: 'bg-emerald-500',
    steps: [
      {
        id: 19,
        title: 'Production Systems',
        description: 'Deploy prompt systems',
        topics: ['Prompt Management', 'Version Control', 'Caching', 'Rate Limiting', 'Error Handling']
      },
      {
        id: 20,
        title: 'Enterprise Applications',
        description: 'Scale AI solutions',
        topics: ['Enterprise Use Cases', 'Compliance', 'Cost Management', 'Multi-Model Strategies', 'Monitoring']
      }
    ],
    milestone: 'You are a Prompt Engineer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-1 yr)', range: '$80K - $120K', avg: '$100K' },
  { level: 'Mid (1-3 yrs)', range: '$120K - $170K', avg: '$145K' },
  { level: 'Senior (3-5 yrs)', range: '$160K - $220K', avg: '$190K' },
  { level: 'Lead/Staff (5+ yrs)', range: '$200K - $300K+', avg: '$250K' }
];

const indiaSalaries = [
  { level: 'Entry (0-1 yr)', range: '₹8L - ₹15L', avg: '₹12L' },
  { level: 'Mid (1-3 yrs)', range: '₹15L - ₹28L', avg: '₹22L' },
  { level: 'Senior (3-5 yrs)', range: '₹28L - ₹45L', avg: '₹36L' },
  { level: 'Lead (5+ yrs)', range: '₹40L - ₹70L+', avg: '₹55L' }
];

// Project Ideas
const projects = [
  {
    title: 'ChatGPT Prompt Library',
    level: 'Beginner' as const,
    description: 'Curated prompts for various tasks',
    skills: ['Prompt Writing', 'Documentation', 'Testing', 'Categorization']
  },
  {
    title: 'AI Writing Assistant',
    level: 'Beginner' as const,
    description: 'Custom writing prompts system',
    skills: ['Role Prompts', 'Tone Control', 'Format Specification', 'Iteration']
  },
  {
    title: 'RAG Chatbot',
    level: 'Intermediate' as const,
    description: 'Document Q&A system',
    skills: ['RAG', 'Vector DB', 'LangChain', 'Chunking']
  },
  {
    title: 'Code Review Agent',
    level: 'Intermediate' as const,
    description: 'Automated code review system',
    skills: ['Code Prompts', 'Chain-of-Thought', 'Multi-step', 'Feedback']
  },
  {
    title: 'Multi-Agent System',
    level: 'Advanced' as const,
    description: 'Collaborative AI agents',
    skills: ['Agent Design', 'Tool Use', 'Orchestration', 'Memory']
  },
  {
    title: 'Enterprise AI Platform',
    level: 'Advanced' as const,
    description: 'Production prompt management',
    skills: ['Versioning', 'A/B Testing', 'Analytics', 'Security']
  }
];

// FAQs
const faqs = [
  {
    question: 'What is Prompt Engineering?',
    answer: 'Prompt Engineering is the art and science of designing effective inputs (prompts) for AI language models to get desired outputs. It involves understanding how LLMs work, crafting clear instructions, and optimizing prompts for accuracy, consistency, and safety.'
  },
  {
    question: 'How long does it take to learn Prompt Engineering?',
    answer: 'Basic prompting skills can be learned in 2-4 weeks. Intermediate skills (CoT, few-shot, role prompting) take 2-3 months. Advanced skills (RAG, agents, production systems) require 4-6 months. The field evolves rapidly, so continuous learning is essential.'
  },
  {
    question: 'Is Prompt Engineering a real career?',
    answer: 'Yes, it\'s a legitimate and growing career. Companies hire Prompt Engineers for AI product development, content generation, customer service AI, and enterprise AI implementations. Salaries are competitive, especially for those with production experience.'
  },
  {
    question: 'Do I need to know programming for Prompt Engineering?',
    answer: 'Not for basic prompting, but programming (especially Python) is essential for advanced work. Building RAG systems, AI agents, and production applications requires coding. Most high-paying roles expect programming skills alongside prompt expertise.'
  },
  {
    question: 'What\'s the difference between Prompt Engineering and AI Engineering?',
    answer: 'Prompt Engineering focuses specifically on crafting effective prompts for LLMs. AI Engineering is broader, covering model training, deployment, infrastructure, and system design. Prompt Engineers often specialize within AI Engineering teams.'
  },
  {
    question: 'Will Prompt Engineering become obsolete?',
    answer: 'Unlikely in the near term. While models improve at understanding intent, complex applications still need careful prompt design. The role may evolve toward AI application architecture, agent design, and system optimization rather than disappear.'
  },
  {
    question: 'Which LLM should I learn first?',
    answer: 'Start with GPT-4 or Claude - they\'re powerful and well-documented. Understand their strengths and limitations. Then explore open-source models (Llama, Mistral) and specialized models. Different models excel at different tasks.'
  },
  {
    question: 'How do I build a Prompt Engineering portfolio?',
    answer: 'Create diverse projects: chatbots, RAG systems, code assistants, content generators. Document your prompt iterations and improvements. Share on GitHub with clear explanations. Write about your learnings. Contribute to open-source AI projects.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'AI Engineer',
    description: 'Build AI systems',
    href: '/roadmap/ai-engineer',
    icon: Brain,
    color: 'bg-purple-500'
  },
  {
    title: 'Machine Learning',
    description: 'ML fundamentals',
    href: '/roadmap/machine-learning',
    icon: Sparkles,
    color: 'bg-blue-500'
  },
  {
    title: 'Python Developer',
    description: 'Programming foundation',
    href: '/roadmap/python-developer',
    icon: Code,
    color: 'bg-green-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Prompt Engineering Roadmap 2026',
  description: 'Complete guide to becoming a Prompt Engineer in 2026',
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

export default function PromptEngineeringRoadmapPage() {
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
          title="Prompt Engineering Roadmap"
          description="Master LLM prompting, chain-of-thought reasoning, RAG systems, AI agents, and production prompt optimization. Your complete guide to becoming a Prompt Engineer in 2026."
          duration="3-6 Months"
          difficulty="Beginner Friendly"
          accentColor="#8B5CF6"
        />

        <WhatIsSection
          title="What is a Prompt Engineer?"
          paragraphs={[
            'Prompt Engineers design, optimize, and manage the prompts that make AI language models produce useful, accurate, and safe outputs. They bridge the gap between powerful AI capabilities and practical business applications.',
            'As a Prompt Engineer, you will craft effective prompts for various use cases, build RAG systems, develop AI agents, ensure AI safety, and help organizations leverage LLMs effectively.'
          ]}
          responsibilities={[
            'Design and optimize prompts for LLMs',
            'Build RAG and knowledge retrieval systems',
            'Develop AI agents and workflows',
            'Ensure prompt security and safety',
            'Evaluate and test prompt performance',
            'Create prompt templates and libraries',
            'Integrate LLMs into applications'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#8B5CF6"
        />

        <SalarySection
          title="Prompt Engineer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Prompt Engineering is one of the fastest-growing roles in tech. Salaries are rising as companies race to implement AI. Those with RAG, agent development, and production experience command premium compensation. Remote opportunities are abundant."
          gradient="bg-gradient-to-r from-purple-500 to-pink-500"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your Prompt Engineering Journey?"
          description="Get personalized guidance from experienced AI professionals who have built production LLM applications."
          gradient="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500"
        />
      </main>

      <Footer />
    </>
  );
}
