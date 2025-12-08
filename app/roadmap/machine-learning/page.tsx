'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Brain,
  Calculator,
  Code,
  Database,
  Layers,
  Cpu,
  Settings,
  Cloud,
  GitBranch,
  BarChart3,
  Network,
  Sparkles
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
        description: 'Essential for understanding ML algorithms',
        topics: ['Vectors', 'Matrices', 'Eigenvalues', 'Matrix Operations', 'SVD']
      },
      {
        id: 2,
        title: 'Calculus',
        description: 'Foundation for optimization',
        topics: ['Derivatives', 'Partial Derivatives', 'Chain Rule', 'Gradient', 'Hessian']
      },
      {
        id: 3,
        title: 'Probability & Statistics',
        description: 'Core of machine learning',
        topics: ['Probability', 'Distributions', 'Bayes Theorem', 'Inferential Stats', 'Hypothesis Testing']
      }
    ],
    milestone: 'You have the math foundation!'
  },
  {
    title: 'Programming & Tools',
    icon: Code,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 4,
        title: 'Python Programming',
        description: 'The language of ML',
        topics: ['Syntax', 'Data Structures', 'OOP', 'Functions', 'File I/O']
      },
      {
        id: 5,
        title: 'Essential Libraries',
        description: 'Core Python libraries for ML',
        topics: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter']
      }
    ]
  },
  {
    title: 'Data Processing',
    icon: Database,
    color: 'bg-green-500',
    steps: [
      {
        id: 6,
        title: 'Data Collection & Cleaning',
        description: 'Prepare data for ML',
        topics: ['Data Sources', 'Missing Values', 'Outliers', 'Data Types', 'Preprocessing']
      },
      {
        id: 7,
        title: 'Feature Engineering',
        description: 'Create meaningful features',
        topics: ['Feature Selection', 'Feature Scaling', 'Encoding', 'Dimensionality Reduction', 'PCA']
      },
      {
        id: 8,
        title: 'Exploratory Data Analysis',
        description: 'Understand your data',
        topics: ['Visualizations', 'Correlations', 'Distributions', 'Statistical Tests']
      }
    ],
    milestone: 'You can prepare data for ML!'
  },
  {
    title: 'Supervised Learning',
    icon: Brain,
    color: 'bg-purple-500',
    steps: [
      {
        id: 9,
        title: 'Regression Algorithms',
        description: 'Predict continuous values',
        topics: ['Linear Regression', 'Polynomial Regression', 'Ridge', 'Lasso', 'ElasticNet']
      },
      {
        id: 10,
        title: 'Classification Algorithms',
        description: 'Predict categories',
        topics: ['Logistic Regression', 'Decision Trees', 'Random Forest', 'SVM', 'KNN']
      },
      {
        id: 11,
        title: 'Ensemble Methods',
        description: 'Combine models for better results',
        topics: ['Bagging', 'Boosting', 'XGBoost', 'LightGBM', 'CatBoost', 'Stacking']
      }
    ],
    milestone: 'You can build ML models!'
  },
  {
    title: 'Unsupervised Learning',
    icon: Network,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 12,
        title: 'Clustering',
        description: 'Find patterns in data',
        topics: ['K-Means', 'Hierarchical', 'DBSCAN', 'Gaussian Mixture', 'Evaluation Metrics']
      },
      {
        id: 13,
        title: 'Dimensionality Reduction',
        description: 'Reduce data complexity',
        topics: ['PCA', 't-SNE', 'UMAP', 'Autoencoders', 'Feature Selection']
      }
    ]
  },
  {
    title: 'Model Evaluation',
    icon: BarChart3,
    color: 'bg-orange-500',
    steps: [
      {
        id: 14,
        title: 'Evaluation Metrics',
        description: 'Measure model performance',
        topics: ['Accuracy', 'Precision', 'Recall', 'F1-Score', 'ROC-AUC', 'Log Loss']
      },
      {
        id: 15,
        title: 'Validation Techniques',
        description: 'Prevent overfitting',
        topics: ['Train/Test Split', 'K-Fold CV', 'Stratified CV', 'LOOCV', 'Hyperparameter Tuning']
      }
    ]
  },
  {
    title: 'Deep Learning',
    icon: Layers,
    color: 'bg-pink-500',
    steps: [
      {
        id: 16,
        title: 'Neural Network Basics',
        description: 'Foundation of deep learning',
        topics: ['Perceptrons', 'Activation Functions', 'Forward Propagation', 'Backpropagation', 'Loss Functions']
      },
      {
        id: 17,
        title: 'CNNs',
        description: 'For image data',
        topics: ['Convolutions', 'Pooling', 'Architectures', 'Transfer Learning', 'Image Classification']
      },
      {
        id: 18,
        title: 'RNNs & Sequence Models',
        description: 'For sequential data',
        topics: ['RNN', 'LSTM', 'GRU', 'Sequence-to-Sequence', 'Time Series']
      },
      {
        id: 19,
        title: 'Transformers',
        description: 'State-of-the-art architectures',
        topics: ['Attention Mechanism', 'Self-Attention', 'BERT', 'GPT', 'Vision Transformers']
      }
    ],
    milestone: 'You can build deep learning models!'
  },
  {
    title: 'Deep Learning Frameworks',
    icon: Cpu,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 20,
        title: 'TensorFlow & Keras',
        description: 'Google\'s ML framework',
        topics: ['Keras API', 'Model Building', 'Training', 'Callbacks', 'TensorBoard']
      },
      {
        id: 21,
        title: 'PyTorch',
        description: 'Facebook\'s ML framework',
        topics: ['Tensors', 'Autograd', 'nn.Module', 'DataLoaders', 'Training Loop']
      }
    ]
  },
  {
    title: 'MLOps & Deployment',
    icon: Cloud,
    color: 'bg-red-500',
    steps: [
      {
        id: 22,
        title: 'Model Deployment',
        description: 'Put models in production',
        topics: ['Flask/FastAPI', 'Model Serialization', 'Docker', 'REST APIs', 'Batch vs Real-time']
      },
      {
        id: 23,
        title: 'MLOps Practices',
        description: 'Manage ML lifecycle',
        topics: ['MLflow', 'DVC', 'Feature Stores', 'Model Monitoring', 'CI/CD for ML']
      },
      {
        id: 24,
        title: 'Cloud Platforms',
        description: 'Scale with cloud ML services',
        topics: ['AWS SageMaker', 'GCP Vertex AI', 'Azure ML', 'Databricks']
      }
    ],
    milestone: 'You are a professional ML Engineer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$95K - $130K', avg: '$110K' },
  { level: 'Mid (2-5 yrs)', range: '$130K - $175K', avg: '$150K' },
  { level: 'Senior (5-8 yrs)', range: '$175K - $250K', avg: '$200K' },
  { level: 'Principal (8+ yrs)', range: '$250K - $400K+', avg: '$300K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹8L - ₹15L', avg: '₹10L' },
  { level: 'Junior (1-3 yrs)', range: '₹12L - ₹25L', avg: '₹18L' },
  { level: 'Mid (3-5 yrs)', range: '₹25L - ₹45L', avg: '₹32L' },
  { level: 'Senior (5+ yrs)', range: '₹45L - ₹80L+', avg: '₹55L' }
];

// Project Ideas
const projects = [
  {
    title: 'House Price Predictor',
    level: 'Beginner' as const,
    description: 'Linear regression for price prediction',
    skills: ['Pandas', 'Scikit-learn', 'Feature Engineering']
  },
  {
    title: 'Customer Churn Classifier',
    level: 'Beginner' as const,
    description: 'Predict customer churn with classification',
    skills: ['Classification', 'EDA', 'Model Evaluation']
  },
  {
    title: 'Image Classifier',
    level: 'Intermediate' as const,
    description: 'CNN for image classification',
    skills: ['TensorFlow', 'CNN', 'Transfer Learning']
  },
  {
    title: 'Sentiment Analyzer',
    level: 'Intermediate' as const,
    description: 'NLP for sentiment classification',
    skills: ['NLP', 'Text Processing', 'LSTM/Transformers']
  },
  {
    title: 'Recommendation System',
    level: 'Advanced' as const,
    description: 'Collaborative filtering recommender',
    skills: ['Matrix Factorization', 'Embeddings', 'Evaluation']
  },
  {
    title: 'End-to-End ML Pipeline',
    level: 'Advanced' as const,
    description: 'Production ML system with MLOps',
    skills: ['MLflow', 'Docker', 'FastAPI', 'Monitoring']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to become a Machine Learning Engineer?',
    answer: 'With dedicated study (4-6 hours daily), you can learn fundamentals in 6-9 months. Becoming job-ready with strong projects takes 9-12 months. Mastering advanced topics like deep learning and MLOps takes 1-2 years of hands-on experience. Prior programming experience accelerates the timeline.'
  },
  {
    question: 'Do I need a PhD for Machine Learning roles?',
    answer: 'No, most ML Engineer roles don\'t require a PhD. A strong portfolio with deployed projects, Kaggle competitions, and practical skills matter more. PhDs are mainly preferred for research roles at top AI labs. Focus on building practical skills and real-world projects instead.'
  },
  {
    question: 'How much math do I really need?',
    answer: 'You need solid understanding of linear algebra, calculus, and probability/statistics. You don\'t need to be a mathematician, but understanding the math behind algorithms helps you debug issues, tune models, and know when to use which approach. Focus on applied math rather than proofs.'
  },
  {
    question: 'TensorFlow or PyTorch - which should I learn?',
    answer: 'Both are excellent. PyTorch is more popular in research and has a more Pythonic API, making it easier to learn. TensorFlow (with Keras) is widely used in production. We recommend starting with PyTorch, then learning TensorFlow for production work. Most concepts transfer between them.'
  },
  {
    question: 'ML Engineer vs Data Scientist - what\'s the difference?',
    answer: 'ML Engineers focus on building and deploying ML systems at scale, with emphasis on software engineering and MLOps. Data Scientists focus more on analysis, experimentation, and insights. ML Engineers typically have stronger software engineering skills, while Data Scientists have stronger statistical and business skills.'
  },
  {
    question: 'Should I do Kaggle competitions?',
    answer: 'Yes, Kaggle is excellent for learning practical ML skills, building a portfolio, and getting recognized by employers. Focus on learning from top solutions rather than just competing. Achieving good rankings demonstrates real skills. Many companies specifically look for Kaggle experience.'
  },
  {
    question: 'Is traditional ML still relevant with deep learning?',
    answer: 'Absolutely! Traditional ML (XGBoost, Random Forest, etc.) often outperforms deep learning on tabular data and smaller datasets. It\'s also faster and more interpretable. Many production systems use traditional ML. Deep learning shines for images, text, and audio. Learn both.'
  },
  {
    question: 'How do I get my first ML job?',
    answer: 'Build 4-5 diverse projects showcasing different ML techniques. Participate in Kaggle competitions. Contribute to open-source ML projects. Write blog posts explaining your projects. Network on LinkedIn and Twitter. Apply for junior ML roles, ML internships, or Data Analyst roles that involve ML.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'AI & Data Scientist',
    description: 'Broader data science skills',
    href: '/roadmap/ai-data-scientist',
    icon: Brain,
    color: 'bg-purple-500'
  },
  {
    title: 'AI Engineer',
    description: 'Build LLM applications',
    href: '/roadmap/ai-engineer',
    icon: Sparkles,
    color: 'bg-pink-500'
  },
  {
    title: 'Python Developer',
    description: 'Master Python programming',
    href: '/roadmap/python-developer',
    icon: Code,
    color: 'bg-yellow-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Machine Learning Engineer Roadmap 2026',
  description: 'Complete guide to becoming a machine learning engineer in 2026',
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

export default function MachineLearningRoadmapPage() {
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
          title="Machine Learning Engineer Roadmap"
          description="Master mathematics, Python, ML algorithms, deep learning, neural networks, and MLOps. Your complete guide to becoming a professional ML Engineer in 2026."
          duration="9-12 Months"
          difficulty="Intermediate"
          accentColor="#EC4899"
        />

        <WhatIsSection
          title="What is a Machine Learning Engineer?"
          paragraphs={[
            'Machine Learning Engineers design, build, and deploy ML models that learn from data to make predictions and decisions. They bridge the gap between data science research and production engineering.',
            'As an ML Engineer, you will develop algorithms, train models, optimize performance, and deploy scalable ML systems that power intelligent applications across industries.'
          ]}
          responsibilities={[
            'Design and implement machine learning algorithms',
            'Train, evaluate, and optimize ML models',
            'Build data pipelines for feature engineering',
            'Deploy models to production environments',
            'Monitor and maintain ML systems in production',
            'Collaborate with data scientists and engineers',
            'Stay current with ML research and best practices'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#EC4899"
        />

        <SalarySection
          title="Machine Learning Engineer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Specializing in deep learning, NLP, or computer vision commands premium salaries. MLOps skills are increasingly valuable. FAANG companies and AI startups offer the highest compensation packages including equity."
          gradient="bg-gradient-to-r from-pink-500 to-rose-600"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your Machine Learning Journey?"
          description="Get personalized guidance from experienced ML engineers who have built production ML systems."
          gradient="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500"
        />
      </main>

      <Footer />
    </>
  );
}
