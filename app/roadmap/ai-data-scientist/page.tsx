'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Calculator,
  Code,
  Database,
  Brain,
  Layers,
  Cloud,
  GitBranch,
  Server,
  LineChart,
  Cpu,
  FlaskConical,
  BarChart3
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
    title: 'Mathematics Foundation',
    icon: Calculator,
    color: 'bg-blue-600',
    steps: [
      {
        id: 1,
        title: 'Linear Algebra',
        description: 'Foundation for machine learning algorithms',
        topics: ['Vectors', 'Matrices', 'Eigenvalues', 'Matrix Operations', 'Transformations']
      },
      {
        id: 2,
        title: 'Calculus',
        description: 'Essential for optimization and gradient descent',
        topics: ['Derivatives', 'Integrals', 'Partial Derivatives', 'Chain Rule', 'Optimization']
      },
      {
        id: 3,
        title: 'Statistics & Probability',
        description: 'Core of data analysis and inference',
        topics: ['Distributions', 'Hypothesis Testing', 'Central Limit Theorem', 'Bayesian Statistics', 'A/B Testing']
      }
    ],
    milestone: 'You have the mathematical foundation!'
  },
  {
    title: 'Programming & SQL',
    icon: Code,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 4,
        title: 'Python Programming',
        description: 'The primary language for data science',
        topics: ['Syntax', 'Data Structures', 'OOP', 'File I/O', 'Virtual Environments']
      },
      {
        id: 5,
        title: 'SQL Mastery',
        description: 'Query and manipulate databases',
        topics: ['SELECT Queries', 'JOINs', 'Aggregations', 'Window Functions', 'CTEs']
      }
    ]
  },
  {
    title: 'Data Analysis & EDA',
    icon: BarChart3,
    color: 'bg-green-500',
    steps: [
      {
        id: 6,
        title: 'NumPy & Pandas',
        description: 'Data manipulation and numerical computing',
        topics: ['Arrays', 'DataFrames', 'Data Cleaning', 'Merging', 'Grouping']
      },
      {
        id: 7,
        title: 'Data Visualization',
        description: 'Communicate insights through visuals',
        topics: ['Matplotlib', 'Seaborn', 'Plotly', 'Dashboard Design', 'Storytelling']
      },
      {
        id: 8,
        title: 'Exploratory Data Analysis',
        description: 'Discover patterns and insights in data',
        topics: ['Univariate Analysis', 'Bivariate Analysis', 'Feature Engineering', 'Outlier Detection']
      }
    ],
    milestone: 'You can analyze and visualize data!'
  },
  {
    title: 'Machine Learning',
    icon: Brain,
    color: 'bg-purple-500',
    steps: [
      {
        id: 9,
        title: 'Supervised Learning',
        description: 'Learn from labeled data',
        topics: ['Linear Regression', 'Logistic Regression', 'Decision Trees', 'Random Forest', 'SVM']
      },
      {
        id: 10,
        title: 'Unsupervised Learning',
        description: 'Find patterns in unlabeled data',
        topics: ['K-Means', 'Hierarchical Clustering', 'PCA', 'DBSCAN', 'Anomaly Detection']
      },
      {
        id: 11,
        title: 'Model Evaluation',
        description: 'Assess and improve model performance',
        topics: ['Cross-Validation', 'Metrics', 'Confusion Matrix', 'ROC-AUC', 'Hyperparameter Tuning']
      },
      {
        id: 12,
        title: 'Ensemble Methods',
        description: 'Combine models for better predictions',
        topics: ['Bagging', 'Boosting', 'XGBoost', 'LightGBM', 'Stacking']
      }
    ],
    milestone: 'You can build ML models!'
  },
  {
    title: 'Deep Learning',
    icon: Layers,
    color: 'bg-pink-500',
    steps: [
      {
        id: 13,
        title: 'Neural Network Basics',
        description: 'Foundation of deep learning',
        topics: ['Perceptrons', 'Activation Functions', 'Backpropagation', 'Optimizers', 'Loss Functions']
      },
      {
        id: 14,
        title: 'CNNs for Computer Vision',
        description: 'Image and video analysis',
        topics: ['Convolutions', 'Pooling', 'ResNet', 'Transfer Learning', 'Object Detection']
      },
      {
        id: 15,
        title: 'RNNs & Transformers',
        description: 'Sequential and text data',
        topics: ['LSTM', 'GRU', 'Attention Mechanism', 'BERT', 'GPT']
      },
      {
        id: 16,
        title: 'DL Frameworks',
        description: 'Tools for building neural networks',
        topics: ['TensorFlow', 'PyTorch', 'Keras', 'Model Serialization', 'GPU Training']
      }
    ],
    milestone: 'You can build deep learning models!'
  },
  {
    title: 'MLOps & Deployment',
    icon: Cloud,
    color: 'bg-orange-500',
    steps: [
      {
        id: 17,
        title: 'Model Deployment',
        description: 'Put models into production',
        topics: ['REST APIs', 'Flask/FastAPI', 'Docker', 'Model Serving', 'Batch vs Real-time']
      },
      {
        id: 18,
        title: 'MLOps Practices',
        description: 'Manage ML systems at scale',
        topics: ['MLflow', 'DVC', 'CI/CD for ML', 'Model Monitoring', 'Feature Stores']
      },
      {
        id: 19,
        title: 'Cloud Platforms',
        description: 'Scale with cloud services',
        topics: ['AWS SageMaker', 'GCP Vertex AI', 'Azure ML', 'Databricks', 'Kubernetes']
      }
    ],
    milestone: 'You are a professional AI & Data Scientist!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$85K - $110K', avg: '$95K' },
  { level: 'Mid (2-5 yrs)', range: '$110K - $150K', avg: '$130K' },
  { level: 'Senior (5-8 yrs)', range: '$150K - $200K', avg: '$175K' },
  { level: 'Principal (8+ yrs)', range: '$200K - $300K+', avg: '$240K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹6L - ₹12L', avg: '₹8L' },
  { level: 'Junior (1-3 yrs)', range: '₹10L - ₹20L', avg: '₹14L' },
  { level: 'Mid (3-5 yrs)', range: '₹18L - ₹35L', avg: '₹25L' },
  { level: 'Senior (5+ yrs)', range: '₹35L - ₹70L+', avg: '₹50L' }
];

// Project Ideas
const projects = [
  {
    title: 'Exploratory Data Analysis',
    level: 'Beginner' as const,
    description: 'Analyze a dataset and create visualizations',
    skills: ['Pandas', 'Matplotlib', 'Statistics']
  },
  {
    title: 'House Price Predictor',
    level: 'Beginner' as const,
    description: 'Build a regression model to predict prices',
    skills: ['Scikit-learn', 'Feature Engineering', 'Linear Regression']
  },
  {
    title: 'Customer Segmentation',
    level: 'Intermediate' as const,
    description: 'Cluster customers for marketing insights',
    skills: ['K-Means', 'PCA', 'Visualization']
  },
  {
    title: 'Sentiment Analysis',
    level: 'Intermediate' as const,
    description: 'Classify text sentiment from reviews',
    skills: ['NLP', 'BERT', 'Text Processing']
  },
  {
    title: 'Image Classification',
    level: 'Advanced' as const,
    description: 'Build a CNN to classify images',
    skills: ['PyTorch', 'CNN', 'Transfer Learning']
  },
  {
    title: 'End-to-End ML Pipeline',
    level: 'Advanced' as const,
    description: 'Production ML system with monitoring',
    skills: ['MLflow', 'Docker', 'FastAPI', 'AWS']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to become a data scientist?',
    answer: 'With dedicated study (4-6 hours daily), you can become job-ready in 8-12 months. This includes mathematics, programming, ML, and deep learning. Mastering the field takes 2-4 years of hands-on experience with real-world problems.'
  },
  {
    question: 'Do I need a PhD to become a data scientist?',
    answer: 'No, a PhD is not required for most data science roles. While some research positions prefer advanced degrees, many companies hire candidates with bachelor\'s degrees, bootcamp certificates, or self-taught skills. Your portfolio and practical skills matter most.'
  },
  {
    question: 'Python or R for data science?',
    answer: 'We recommend Python due to its versatility, dominant market share, and better integration with production systems. Python is used by 90%+ of data scientists and has superior deep learning libraries. R is mainly used in academia and specific statistical applications.'
  },
  {
    question: 'Is math really necessary for data science?',
    answer: 'Yes, a solid understanding of linear algebra, calculus, and statistics is essential. You don\'t need to be a mathematician, but understanding the math behind algorithms helps you choose the right approach, debug issues, and innovate. Focus on applied math rather than proofs.'
  },
  {
    question: 'Data Scientist vs ML Engineer - what\'s the difference?',
    answer: 'Data Scientists focus on analysis, experimentation, and model building. ML Engineers focus on deploying and scaling models in production. Data Scientists work more with statistics and business insights, while ML Engineers work more with software engineering and infrastructure.'
  },
  {
    question: 'Will AI replace data scientists?',
    answer: 'AI tools like ChatGPT and AutoML help data scientists work faster but cannot replace the human judgment, domain expertise, and creative problem-solving they bring. The role is evolving - data scientists who embrace AI tools will be more productive, not replaced.'
  },
  {
    question: 'What projects should I build for my portfolio?',
    answer: 'Build 3-5 diverse projects: one EDA project, one classical ML project, one deep learning project, and one end-to-end deployed system. Use real-world datasets, document your process, and focus on business impact rather than just accuracy metrics.'
  },
  {
    question: 'How do I get my first data science job?',
    answer: 'Build a strong portfolio with deployed projects, contribute to Kaggle competitions, network on LinkedIn, and apply to entry-level roles. Consider internships or contract work to gain experience. Prepare for technical interviews including SQL, statistics, and ML case studies.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'Data Engineer',
    description: 'Build data pipelines and infrastructure',
    href: '/roadmap/data-engineer',
    icon: Database,
    color: 'bg-blue-500'
  },
  {
    title: 'Python Developer',
    description: 'Master Python programming',
    href: '/roadmap/python-developer',
    icon: Code,
    color: 'bg-yellow-500'
  },
  {
    title: 'DevOps Engineer',
    description: 'Deploy and scale ML systems',
    href: '/roadmap/devops',
    icon: Server,
    color: 'bg-orange-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'AI & Data Scientist Roadmap 2026',
  description: 'Complete guide to becoming an AI and Data Scientist in 2026',
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

export default function AIDataScientistRoadmapPage() {
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
          title="AI & Data Scientist Roadmap"
          description="Master mathematics, Python, machine learning, deep learning, and MLOps. Your complete guide to becoming a professional AI & Data Scientist in 2026."
          duration="8-12 Months"
          difficulty="Intermediate"
          accentColor="#8B5CF6"
        />

        <WhatIsSection
          title="What is an AI & Data Scientist?"
          paragraphs={[
            'AI & Data Scientists combine mathematics, programming, and domain expertise to extract insights from data and build intelligent systems. They use statistical analysis, machine learning, and deep learning to solve complex business problems.',
            'As an AI & Data Scientist, you will analyze large datasets, build predictive models, develop AI solutions, and communicate findings to stakeholders to drive data-informed decisions.'
          ]}
          responsibilities={[
            'Analyze complex datasets to extract actionable insights',
            'Build and deploy machine learning models',
            'Develop deep learning solutions for AI applications',
            'Create data visualizations and dashboards',
            'Design and run A/B tests and experiments',
            'Collaborate with engineering to productionize models',
            'Communicate findings to non-technical stakeholders'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#8B5CF6"
        />

        <SalarySection
          title="AI & Data Scientist Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Specialize in deep learning + MLOps for maximum earning potential. FAANG companies and AI startups offer the highest salaries. Remote positions at US companies can offer 3-4x higher salaries for developers in India."
          gradient="bg-gradient-to-r from-purple-600 to-pink-600"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your AI & Data Science Journey?"
          description="Get personalized guidance from experienced data scientists who have been where you are."
          gradient="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600"
        />
      </main>

      <Footer />
    </>
  );
}
