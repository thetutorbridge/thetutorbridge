'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  MessageSquare,
  Brain,
  BookOpen,
  Code,
  Layers,
  Cpu,
  Search,
  Zap,
  Bot,
  Database,
  Globe,
  FileText
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

const roadmapStages: RoadmapStage[] = [
  {
    title: 'Programming & Math Foundation',
    icon: Code,
    color: 'bg-blue-500',
    steps: [
      {
        id: 1,
        title: 'Python & Libraries',
        description: 'Core programming',
        topics: ['Python Fundamentals', 'NumPy', 'Pandas', 'Regular Expressions', 'String Processing', 'Data Structures']
      },
      {
        id: 2,
        title: 'Mathematics',
        description: 'NLP math foundations',
        topics: ['Linear Algebra', 'Probability', 'Statistics', 'Information Theory', 'Optimization', 'Calculus Basics']
      }
    ],
    milestone: 'You have programming foundation!'
  },
  {
    title: 'Text Processing Fundamentals',
    icon: FileText,
    color: 'bg-green-500',
    steps: [
      {
        id: 3,
        title: 'Text Preprocessing',
        description: 'Clean and prepare text',
        topics: ['Tokenization', 'Normalization', 'Stemming/Lemmatization', 'Stop Words', 'Text Cleaning', 'Unicode Handling']
      },
      {
        id: 4,
        title: 'NLP Libraries',
        description: 'Core NLP tools',
        topics: ['NLTK', 'spaCy', 'TextBlob', 'POS Tagging', 'Dependency Parsing', 'Named Entities']
      }
    ]
  },
  {
    title: 'Text Representation',
    icon: Layers,
    color: 'bg-purple-500',
    steps: [
      {
        id: 5,
        title: 'Classical Methods',
        description: 'Traditional text vectors',
        topics: ['Bag of Words', 'TF-IDF', 'N-grams', 'One-Hot Encoding', 'Document Vectors', 'Similarity Metrics']
      },
      {
        id: 6,
        title: 'Word Embeddings',
        description: 'Dense representations',
        topics: ['Word2Vec', 'GloVe', 'FastText', 'Embedding Visualization', 'Analogy Tasks', 'Pre-trained Embeddings']
      }
    ],
    milestone: 'You understand text representation!'
  },
  {
    title: 'Deep Learning for NLP',
    icon: Brain,
    color: 'bg-orange-500',
    steps: [
      {
        id: 7,
        title: 'Neural Network Basics',
        description: 'Deep learning foundations',
        topics: ['Neural Networks', 'PyTorch/TensorFlow', 'Backpropagation', 'Loss Functions', 'Optimizers', 'Regularization']
      },
      {
        id: 8,
        title: 'Sequence Models',
        description: 'Sequential text processing',
        topics: ['RNNs', 'LSTMs', 'GRUs', 'Bidirectional Models', 'Sequence-to-Sequence', 'Encoder-Decoder']
      }
    ]
  },
  {
    title: 'Transformers & Attention',
    icon: Zap,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 9,
        title: 'Attention Mechanism',
        description: 'Core transformer concept',
        topics: ['Self-Attention', 'Multi-Head Attention', 'Positional Encoding', 'Attention Visualization', 'Attention Patterns']
      },
      {
        id: 10,
        title: 'Transformer Architecture',
        description: 'The breakthrough model',
        topics: ['Encoder Architecture', 'Decoder Architecture', 'Feed-Forward Networks', 'Layer Normalization', 'Residual Connections']
      }
    ],
    milestone: 'You understand transformers!'
  },
  {
    title: 'Pre-trained Language Models',
    icon: BookOpen,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 11,
        title: 'BERT & Encoders',
        description: 'Bidirectional models',
        topics: ['BERT Architecture', 'Masked Language Modeling', 'RoBERTa', 'DistilBERT', 'ALBERT', 'Sentence Transformers']
      },
      {
        id: 12,
        title: 'GPT & Decoders',
        description: 'Autoregressive models',
        topics: ['GPT Architecture', 'Causal Language Modeling', 'GPT-2/3/4', 'Text Generation', 'Sampling Strategies', 'Perplexity']
      }
    ]
  },
  {
    title: 'Hugging Face Ecosystem',
    icon: Cpu,
    color: 'bg-pink-500',
    steps: [
      {
        id: 13,
        title: 'Transformers Library',
        description: 'Industry-standard toolkit',
        topics: ['Model Hub', 'Pipelines', 'Tokenizers', 'Model Loading', 'Inference', 'Auto Classes']
      },
      {
        id: 14,
        title: 'Fine-Tuning',
        description: 'Adapt models to tasks',
        topics: ['Transfer Learning', 'Task-Specific Heads', 'Trainer API', 'Evaluation Metrics', 'Hyperparameter Tuning', 'Custom Datasets']
      }
    ],
    milestone: 'You can fine-tune models!'
  },
  {
    title: 'NLP Tasks',
    icon: MessageSquare,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 15,
        title: 'Classification Tasks',
        description: 'Categorize text',
        topics: ['Sentiment Analysis', 'Text Classification', 'Intent Detection', 'Multi-Label', 'Zero-Shot Classification', 'Aspect-Based']
      },
      {
        id: 16,
        title: 'Sequence Tasks',
        description: 'Token-level predictions',
        topics: ['Named Entity Recognition', 'Part-of-Speech Tagging', 'Slot Filling', 'Keyphrase Extraction', 'Token Classification']
      },
      {
        id: 17,
        title: 'Generation Tasks',
        description: 'Generate text',
        topics: ['Summarization', 'Translation', 'Question Answering', 'Text Generation', 'Paraphrasing', 'Data-to-Text']
      }
    ]
  },
  {
    title: 'LLMs & RAG',
    icon: Bot,
    color: 'bg-red-500',
    steps: [
      {
        id: 18,
        title: 'Large Language Models',
        description: 'Working with LLMs',
        topics: ['OpenAI API', 'Claude API', 'Open-Source LLMs', 'Llama', 'Mistral', 'Prompt Engineering']
      },
      {
        id: 19,
        title: 'RAG Systems',
        description: 'Retrieval-augmented generation',
        topics: ['Vector Databases', 'Embeddings for RAG', 'Chunking Strategies', 'LangChain/LlamaIndex', 'Hybrid Search', 'Evaluation']
      }
    ],
    milestone: 'You can build LLM applications!'
  },
  {
    title: 'Conversational AI',
    icon: Search,
    color: 'bg-teal-500',
    steps: [
      {
        id: 20,
        title: 'Chatbots & Assistants',
        description: 'Build conversational systems',
        topics: ['Dialog Management', 'Intent Recognition', 'Slot Filling', 'Context Handling', 'Multi-Turn Conversations', 'Rasa/Dialogflow']
      },
      {
        id: 21,
        title: 'Advanced Conversational',
        description: 'Production chatbots',
        topics: ['Memory Systems', 'Tool Use', 'Agent Frameworks', 'Guardrails', 'Evaluation', 'A/B Testing']
      }
    ]
  },
  {
    title: 'Production & Deployment',
    icon: Globe,
    color: 'bg-emerald-500',
    steps: [
      {
        id: 22,
        title: 'Model Optimization',
        description: 'Production-ready NLP',
        topics: ['Quantization', 'Distillation', 'Pruning', 'ONNX', 'Batching', 'Caching']
      },
      {
        id: 23,
        title: 'NLP APIs',
        description: 'Deploy NLP services',
        topics: ['FastAPI', 'Model Serving', 'Async Processing', 'Rate Limiting', 'Monitoring', 'MLOps for NLP']
      }
    ],
    milestone: 'You are an NLP Engineer!'
  }
];

const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$90K - $120K', avg: '$105K' },
  { level: 'Mid (2-5 yrs)', range: '$120K - $170K', avg: '$145K' },
  { level: 'Senior (5-8 yrs)', range: '$160K - $220K', avg: '$190K' },
  { level: 'Staff/Principal (8+ yrs)', range: '$210K - $320K+', avg: '$260K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹6L - ₹12L', avg: '₹9L' },
  { level: 'Junior (1-3 yrs)', range: '₹12L - ₹24L', avg: '₹17L' },
  { level: 'Mid (3-5 yrs)', range: '₹22L - ₹40L', avg: '₹30L' },
  { level: 'Senior (5+ yrs)', range: '₹38L - ₹70L+', avg: '₹52L' }
];

const projects = [
  { title: 'Sentiment Analyzer', level: 'Beginner' as const, description: 'Text sentiment classification', skills: ['BERT', 'Fine-tuning', 'Hugging Face', 'Streamlit'] },
  { title: 'Named Entity System', level: 'Beginner' as const, description: 'Extract entities from text', skills: ['spaCy', 'NER', 'Custom Entities', 'Evaluation'] },
  { title: 'Document Q&A', level: 'Intermediate' as const, description: 'Answer questions from docs', skills: ['RAG', 'Vector DB', 'LangChain', 'Embeddings'] },
  { title: 'Text Summarizer', level: 'Intermediate' as const, description: 'Summarize long documents', skills: ['T5/BART', 'Fine-tuning', 'Evaluation Metrics', 'API'] },
  { title: 'Conversational Agent', level: 'Advanced' as const, description: 'Multi-turn chatbot', skills: ['Dialog Management', 'Memory', 'Tool Use', 'Guardrails'] },
  { title: 'Custom LLM Fine-tune', level: 'Advanced' as const, description: 'Fine-tune open LLM', skills: ['LoRA/QLoRA', 'PEFT', 'Instruction Tuning', 'Evaluation'] }
];

const faqs = [
  {
    question: 'What programming skills do I need for NLP?',
    answer: 'Python is essential - virtually all NLP work uses Python. Master string manipulation, regex, NumPy, and Pandas. Learn PyTorch or TensorFlow for deep learning. Familiarity with SQL helps for data work. Some roles need basic web development for APIs.'
  },
  {
    question: 'How long does it take to become an NLP engineer?',
    answer: 'With ML background, 4-6 months to specialize in NLP. Starting fresh takes 12-18 months. Mastering LLMs and production systems takes 2+ years. The field evolves rapidly - ChatGPT changed everything in 2023. Continuous learning is mandatory.'
  },
  {
    question: 'Do I need a PhD for NLP jobs?',
    answer: 'No, most industry NLP roles don\'t require PhDs. Strong portfolios and practical skills matter more. Research positions often prefer PhDs. Publications help but aren\'t required. MS degree provides good foundation; BS with projects works too.'
  },
  {
    question: 'Is NLP a good career in 2026?',
    answer: 'Excellent career. LLMs have created massive demand. Every company wants AI assistants, chatbots, and text processing. Competition is high for top roles, but overall demand exceeds supply. Salaries are among the highest in tech.'
  },
  {
    question: 'Should I focus on traditional NLP or LLMs?',
    answer: 'Learn both. Traditional NLP (tokenization, NER, classification) provides foundations. LLM skills (prompting, RAG, fine-tuning) are essential for modern work. Many production systems combine both approaches. Don\'t skip fundamentals for hype.'
  },
  {
    question: 'What\'s the difference between NLP Engineer and ML Engineer?',
    answer: 'NLP Engineers specialize in text/language, while ML Engineers are generalists. Significant overlap exists. NLP Engineers focus on transformers, language models, and text processing. The distinction is blurring as LLMs become central to many ML applications.'
  },
  {
    question: 'How important is linguistics knowledge?',
    answer: 'Helpful but not required. Understanding syntax, semantics, and pragmatics aids intuition. Deep learning has reduced the need for linguistic feature engineering. Focus on ML fundamentals first; add linguistics knowledge over time.'
  },
  {
    question: 'How do I build an NLP portfolio?',
    answer: 'Build end-to-end projects: data processing, training, deployment. Include both classification and generation tasks. Show RAG and LLM integration skills. Deploy as APIs or demos. Document clearly on GitHub. Kaggle competitions help. Blog about your learnings.'
  }
];

const relatedRoadmaps = [
  { title: 'Machine Learning', description: 'ML fundamentals', href: '/roadmap/machine-learning', icon: Brain, color: 'bg-purple-500' },
  { title: 'AI Engineer', description: 'Applied AI skills', href: '/roadmap/ai-engineer', icon: Cpu, color: 'bg-blue-500' },
  { title: 'Prompt Engineering', description: 'LLM prompting', href: '/roadmap/prompt-engineering', icon: MessageSquare, color: 'bg-green-500' }
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'NLP Engineer Roadmap 2026',
  description: 'Complete guide to becoming an NLP Engineer in 2026',
  author: { '@type': 'Organization', name: 'The Tutor Bridge' },
  publisher: { '@type': 'Organization', name: 'The Tutor Bridge' }
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } }))
};

export default function NLPEngineerRoadmapPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <RoadmapHero
          title="NLP Engineer Roadmap"
          description="Master transformers, BERT, GPT, LLMs, RAG, text processing, and conversational AI. Your complete guide to becoming an NLP Engineer in 2026."
          duration="8-14 Months"
          difficulty="Advanced"
          accentColor="#10B981"
        />
        <WhatIsSection
          title="What is an NLP Engineer?"
          paragraphs={[
            'NLP Engineers specialize in Natural Language Processing - teaching machines to understand, interpret, and generate human language. They build systems for text classification, entity recognition, sentiment analysis, chatbots, and more.',
            'As an NLP Engineer, you will work with transformers and large language models, develop text processing pipelines, build RAG systems, fine-tune models for specific tasks, and deploy NLP solutions to production.'
          ]}
          responsibilities={[
            'Build and fine-tune NLP models (BERT, GPT)',
            'Develop text classification and NER systems',
            'Create RAG and LLM-based applications',
            'Process and analyze text data at scale',
            'Build conversational AI and chatbots',
            'Deploy NLP models to production',
            'Evaluate and improve model performance'
          ]}
        />
        <VisualRoadmapSection stages={roadmapStages} accentColor="#10B981" />
        <SalarySection
          title="NLP Engineer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="LLM expertise commands premium salaries as companies race to build AI products. RAG and production deployment skills are highly valued. Research publications boost compensation. Big Tech pays significantly above market averages."
          gradient="bg-gradient-to-r from-emerald-500 to-teal-500"
        />
        <ProjectsSection projects={projects} />
        <FAQSection faqs={faqs} />
        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />
        <CTASection
          title="Ready to Start Your NLP Engineering Journey?"
          description="Get personalized guidance from experienced NLP engineers who have built production language systems."
          gradient="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"
        />
      </main>
      <Footer />
    </>
  );
}
