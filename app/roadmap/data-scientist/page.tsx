'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Brain,
  Database,
  BarChart3,
  Code,
  Calculator,
  Layers,
  Cpu,
  MessageSquare,
  Eye,
  Settings,
  Server,
  Monitor
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
    title: 'Programming Fundamentals',
    icon: Code,
    color: 'bg-blue-500',
    steps: [
      {
        id: 1,
        title: 'Python',
        description: 'Master Python for data science',
        topics: ['Python Basics', 'Data Structures', 'Functions', 'OOP', 'File Handling']
      },
      {
        id: 2,
        title: 'Data Libraries',
        description: 'Essential Python libraries',
        topics: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter Notebooks']
      }
    ],
    milestone: 'You can work with data in Python!'
  },
  {
    title: 'Mathematics & Statistics',
    icon: Calculator,
    color: 'bg-green-500',
    steps: [
      {
        id: 3,
        title: 'Statistics',
        description: 'Statistical foundations',
        topics: ['Descriptive Stats', 'Probability', 'Distributions', 'Hypothesis Testing', 'p-values']
      },
      {
        id: 4,
        title: 'Linear Algebra',
        description: 'Math for machine learning',
        topics: ['Vectors', 'Matrices', 'Eigenvalues', 'Matrix Operations', 'Dimensionality']
      },
      {
        id: 5,
        title: 'Calculus',
        description: 'Optimization fundamentals',
        topics: ['Derivatives', 'Gradients', 'Chain Rule', 'Partial Derivatives', 'Optimization']
      }
    ]
  },
  {
    title: 'Data Analysis',
    icon: BarChart3,
    color: 'bg-purple-500',
    steps: [
      {
        id: 6,
        title: 'Exploratory Data Analysis',
        description: 'Understand your data',
        topics: ['Data Cleaning', 'Missing Values', 'Outliers', 'Feature Engineering', 'EDA']
      },
      {
        id: 7,
        title: 'Data Visualization',
        description: 'Communicate insights visually',
        topics: ['Charts & Graphs', 'Dashboards', 'Storytelling', 'Plotly', 'Interactive Viz']
      }
    ],
    milestone: 'You can analyze and visualize data!'
  },
  {
    title: 'Databases & SQL',
    icon: Database,
    color: 'bg-orange-500',
    steps: [
      {
        id: 8,
        title: 'SQL Fundamentals',
        description: 'Query relational databases',
        topics: ['SELECT', 'JOINs', 'Aggregations', 'Subqueries', 'Window Functions']
      },
      {
        id: 9,
        title: 'Data Warehousing',
        description: 'Work with big data storage',
        topics: ['Data Modeling', 'ETL', 'BigQuery', 'Snowflake', 'Data Lakes']
      }
    ]
  },
  {
    title: 'Machine Learning',
    icon: Brain,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 10,
        title: 'Supervised Learning',
        description: 'Learn from labeled data',
        topics: ['Linear Regression', 'Logistic Regression', 'Decision Trees', 'Random Forest', 'SVM']
      },
      {
        id: 11,
        title: 'Unsupervised Learning',
        description: 'Find patterns in data',
        topics: ['K-Means', 'Hierarchical Clustering', 'PCA', 'Dimensionality Reduction']
      },
      {
        id: 12,
        title: 'Model Evaluation',
        description: 'Validate your models',
        topics: ['Cross-Validation', 'Metrics', 'Overfitting', 'Hyperparameter Tuning', 'Feature Selection']
      }
    ],
    milestone: 'You can build ML models!'
  },
  {
    title: 'Deep Learning',
    icon: Cpu,
    color: 'bg-pink-500',
    steps: [
      {
        id: 13,
        title: 'Neural Networks',
        description: 'Deep learning foundations',
        topics: ['Perceptrons', 'Activation Functions', 'Backpropagation', 'Optimization', 'Regularization']
      },
      {
        id: 14,
        title: 'DL Frameworks',
        description: 'Build neural networks',
        topics: ['TensorFlow', 'PyTorch', 'Keras', 'GPU Training', 'Model Architecture']
      },
      {
        id: 15,
        title: 'Advanced Architectures',
        description: 'Specialized neural networks',
        topics: ['CNNs', 'RNNs', 'LSTMs', 'Transformers', 'GANs']
      }
    ]
  },
  {
    title: 'Specializations',
    icon: Layers,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 16,
        title: 'Natural Language Processing',
        description: 'Work with text data',
        topics: ['Text Processing', 'Word Embeddings', 'BERT', 'Sentiment Analysis', 'LLMs']
      },
      {
        id: 17,
        title: 'Computer Vision',
        description: 'Work with image data',
        topics: ['Image Classification', 'Object Detection', 'Segmentation', 'Transfer Learning']
      }
    ],
    milestone: 'You have specialized skills!'
  },
  {
    title: 'MLOps & Production',
    icon: Settings,
    color: 'bg-red-500',
    steps: [
      {
        id: 18,
        title: 'MLOps',
        description: 'Deploy ML in production',
        topics: ['Model Serving', 'MLflow', 'Kubeflow', 'Feature Stores', 'Monitoring']
      },
      {
        id: 19,
        title: 'Cloud ML',
        description: 'ML on cloud platforms',
        topics: ['AWS SageMaker', 'Google Vertex AI', 'Azure ML', 'Model APIs', 'Scaling']
      }
    ],
    milestone: 'You are a professional Data Scientist!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$85K - $115K', avg: '$100K' },
  { level: 'Mid (2-5 yrs)', range: '$115K - $160K', avg: '$135K' },
  { level: 'Senior (5-8 yrs)', range: '$160K - $220K', avg: '$185K' },
  { level: 'Lead (8+ yrs)', range: '$220K - $350K+', avg: '$270K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹6L - ₹12L', avg: '₹9L' },
  { level: 'Junior (1-3 yrs)', range: '₹12L - ₹22L', avg: '₹16L' },
  { level: 'Mid (3-5 yrs)', range: '₹22L - ₹40L', avg: '₹30L' },
  { level: 'Senior (5+ yrs)', range: '₹40L - ₹75L+', avg: '₹55L' }
];

// Project Ideas
const projects = [
  {
    title: 'EDA Project',
    level: 'Beginner' as const,
    description: 'Analyze a public dataset',
    skills: ['Pandas', 'Matplotlib', 'Statistics']
  },
  {
    title: 'Prediction Model',
    level: 'Beginner' as const,
    description: 'Build a regression/classification model',
    skills: ['Scikit-learn', 'Feature Engineering', 'Evaluation']
  },
  {
    title: 'Sentiment Analyzer',
    level: 'Intermediate' as const,
    description: 'Analyze text sentiment',
    skills: ['NLP', 'Text Processing', 'Classification']
  },
  {
    title: 'Image Classifier',
    level: 'Intermediate' as const,
    description: 'Build a CNN for image classification',
    skills: ['TensorFlow/PyTorch', 'CNNs', 'Transfer Learning']
  },
  {
    title: 'Recommendation System',
    level: 'Advanced' as const,
    description: 'Build a recommender engine',
    skills: ['Collaborative Filtering', 'Matrix Factorization', 'Deep Learning']
  },
  {
    title: 'End-to-End ML Pipeline',
    level: 'Advanced' as const,
    description: 'Build and deploy ML system',
    skills: ['MLOps', 'Docker', 'Cloud Deployment']
  }
];

// FAQs
const faqs = [
  {
    question: 'What is the difference between Data Scientist and Data Analyst?',
    answer: 'Data Analysts focus on analyzing historical data, creating reports, and building dashboards. Data Scientists go further - they build predictive models, use machine learning, and work with complex algorithms. Data Scientists typically need stronger programming and math skills, while Data Analysts focus more on business intelligence and visualization.'
  },
  {
    question: 'How long does it take to become a Data Scientist?',
    answer: 'With consistent study (3-4 hours daily), you can become job-ready in 12-18 months starting from scratch. This includes Python, statistics, machine learning, and building projects. Those with programming or math backgrounds can transition faster (6-12 months). Mastery takes years of continuous learning and practice.'
  },
  {
    question: 'Do I need a PhD to become a Data Scientist?',
    answer: 'No, a PhD is not required for most data science roles. While some research positions prefer PhDs, many companies hire candidates with bachelor degrees, bootcamp training, or self-taught skills. What matters most is demonstrable skills through projects, Kaggle competitions, or work experience.'
  },
  {
    question: 'Is math important for Data Science?',
    answer: 'Yes, math is fundamental. Statistics is essential for all data science work. Linear algebra and calculus are important for understanding machine learning algorithms. You do not need to be a math expert, but solid understanding of these topics helps you build better models and troubleshoot issues effectively.'
  },
  {
    question: 'Should I learn TensorFlow or PyTorch?',
    answer: 'Both are excellent choices. PyTorch has become more popular in research and is known for its intuitive, Pythonic design. TensorFlow is widely used in production. For beginners, start with scikit-learn for classical ML, then learn one deep learning framework based on your industry preference. Many jobs accept either.'
  },
  {
    question: 'What programming languages should I learn?',
    answer: 'Python is the primary language for data science - learn it well. SQL is essential for data extraction and analysis. R is useful in academia and specific industries like biostatistics. Some roles may require Scala or Java for big data work. Focus on Python first, then add SQL, and consider R if relevant to your field.'
  },
  {
    question: 'How important are Kaggle competitions?',
    answer: 'Kaggle is excellent for learning and building a portfolio. Competitions teach practical ML skills and expose you to real problems. Top rankings impress employers, but participation matters more than winning. Focus on learning from others solutions and completing projects you can showcase. Quality projects beat competition rankings.'
  },
  {
    question: 'Is Data Science a good career in 2026?',
    answer: 'Yes, data science remains highly in-demand. Every industry needs data-driven decisions. While the field has matured, demand still exceeds supply for skilled practitioners. AI and ML integration is expanding opportunities. Focus on production skills (MLOps) and domain expertise to stand out in the competitive market.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'Data Analyst',
    description: 'Data analysis and visualization',
    href: '/roadmap/data-analyst',
    icon: BarChart3,
    color: 'bg-blue-500'
  },
  {
    title: 'AI Engineer',
    description: 'Build AI applications',
    href: '/roadmap/ai-engineer',
    icon: Brain,
    color: 'bg-purple-500'
  },
  {
    title: 'Python Developer',
    description: 'Python programming',
    href: '/roadmap/python-developer',
    icon: Code,
    color: 'bg-yellow-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Data Scientist Roadmap 2026',
  description: 'Complete guide to becoming a data scientist in 2026',
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

export default function DataScientistRoadmapPage() {
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
          title="Data Scientist Roadmap"
          description="Master Python, statistics, machine learning, deep learning, and MLOps. Your complete guide to becoming a professional data scientist in 2026."
          duration="12-18 Months"
          difficulty="Intermediate"
          accentColor="#10B981"
        />

        <WhatIsSection
          title="What is a Data Scientist?"
          paragraphs={[
            'Data Scientists extract insights and build predictive models from complex data. They combine programming, statistics, and domain knowledge to solve business problems using machine learning and AI.',
            'As a Data Scientist, you will analyze data, build ML models, create experiments, and deploy solutions that drive business decisions. You work at the intersection of engineering, statistics, and business strategy.'
          ]}
          responsibilities={[
            'Collect, clean, and preprocess data',
            'Perform exploratory data analysis',
            'Build and train machine learning models',
            'Design and run experiments (A/B tests)',
            'Deploy models to production',
            'Communicate findings to stakeholders',
            'Work with cross-functional teams',
            'Stay current with ML/AI advances'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#10B981"
        />

        <SalarySection
          title="Data Scientist Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="MLOps and production ML skills command premium salaries. Deep learning specialists (NLP, Computer Vision) earn more than general practitioners. Domain expertise in finance, healthcare, or tech leads to higher compensation. FAANG companies pay significantly above market rates."
          gradient="bg-gradient-to-r from-emerald-500 to-cyan-500"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your Data Science Journey?"
          description="Get personalized guidance from experienced data scientists who have built production ML systems."
          gradient="bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500"
        />
      </main>

      <Footer />
    </>
  );
}
