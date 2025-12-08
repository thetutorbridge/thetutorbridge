'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Cog,
  Code,
  Database,
  Cloud,
  GitBranch,
  Server,
  LineChart,
  Shield,
  Box,
  Layers,
  Zap,
  Settings
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
    title: 'ML & Programming Foundation',
    icon: Code,
    color: 'bg-blue-500',
    steps: [
      {
        id: 1,
        title: 'Python for ML',
        description: 'Python ecosystem for ML',
        topics: ['NumPy', 'Pandas', 'Scikit-learn', 'TensorFlow/PyTorch', 'Jupyter']
      },
      {
        id: 2,
        title: 'ML Fundamentals',
        description: 'Core ML concepts',
        topics: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Feature Engineering', 'Hyperparameter Tuning']
      }
    ],
    milestone: 'You understand ML basics!'
  },
  {
    title: 'Version Control & Collaboration',
    icon: GitBranch,
    color: 'bg-purple-500',
    steps: [
      {
        id: 3,
        title: 'Git & GitHub',
        description: 'Code versioning',
        topics: ['Git Basics', 'Branching', 'Pull Requests', 'Code Review', 'GitHub Actions']
      },
      {
        id: 4,
        title: 'Data Versioning',
        description: 'Version data & models',
        topics: ['DVC', 'LakeFS', 'Delta Lake', 'Data Lineage', 'Artifact Management']
      }
    ]
  },
  {
    title: 'Containerization & Orchestration',
    icon: Box,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 5,
        title: 'Docker',
        description: 'Containerize ML apps',
        topics: ['Dockerfile', 'Docker Compose', 'Multi-stage Builds', 'GPU Containers', 'Best Practices']
      },
      {
        id: 6,
        title: 'Kubernetes',
        description: 'Container orchestration',
        topics: ['Pods & Deployments', 'Services', 'ConfigMaps', 'Persistent Volumes', 'Helm Charts']
      }
    ],
    milestone: 'You can containerize ML workloads!'
  },
  {
    title: 'ML Pipelines',
    icon: Layers,
    color: 'bg-green-500',
    steps: [
      {
        id: 7,
        title: 'Pipeline Orchestration',
        description: 'Build ML pipelines',
        topics: ['Apache Airflow', 'Kubeflow Pipelines', 'Prefect', 'Dagster', 'Argo Workflows']
      },
      {
        id: 8,
        title: 'Feature Engineering',
        description: 'Feature pipelines',
        topics: ['Feature Stores', 'Feast', 'Tecton', 'Feature Transformation', 'Online/Offline Features']
      }
    ]
  },
  {
    title: 'Experiment Tracking',
    icon: LineChart,
    color: 'bg-orange-500',
    steps: [
      {
        id: 9,
        title: 'Experiment Management',
        description: 'Track ML experiments',
        topics: ['MLflow', 'Weights & Biases', 'Neptune', 'Comet ML', 'Sacred']
      },
      {
        id: 10,
        title: 'Model Registry',
        description: 'Manage model versions',
        topics: ['MLflow Registry', 'Model Versioning', 'Model Metadata', 'Stage Transitions', 'Model Approval']
      }
    ],
    milestone: 'You can track experiments!'
  },
  {
    title: 'Model Deployment',
    icon: Server,
    color: 'bg-red-500',
    steps: [
      {
        id: 11,
        title: 'Model Serving',
        description: 'Deploy models to production',
        topics: ['TensorFlow Serving', 'TorchServe', 'Seldon Core', 'KServe', 'BentoML']
      },
      {
        id: 12,
        title: 'Deployment Patterns',
        description: 'Production strategies',
        topics: ['Blue-Green', 'Canary', 'Shadow', 'A/B Testing', 'Multi-Armed Bandit']
      },
      {
        id: 13,
        title: 'APIs & Inference',
        description: 'Build inference APIs',
        topics: ['FastAPI', 'gRPC', 'REST APIs', 'Batch Inference', 'Real-time Inference']
      }
    ]
  },
  {
    title: 'CI/CD for ML',
    icon: Settings,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 14,
        title: 'ML CI/CD',
        description: 'Automate ML workflows',
        topics: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'CircleCI', 'Azure DevOps']
      },
      {
        id: 15,
        title: 'Testing for ML',
        description: 'Test ML systems',
        topics: ['Unit Tests', 'Data Tests', 'Model Tests', 'Integration Tests', 'Great Expectations']
      }
    ]
  },
  {
    title: 'Cloud Platforms',
    icon: Cloud,
    color: 'bg-sky-500',
    steps: [
      {
        id: 16,
        title: 'AWS ML Services',
        description: 'AWS for MLOps',
        topics: ['SageMaker', 'S3', 'Lambda', 'Step Functions', 'ECR']
      },
      {
        id: 17,
        title: 'GCP & Azure ML',
        description: 'Multi-cloud MLOps',
        topics: ['Vertex AI', 'Azure ML', 'Cloud Run', 'Cloud Functions', 'Managed Services']
      }
    ],
    milestone: 'You can deploy on any cloud!'
  },
  {
    title: 'Monitoring & Observability',
    icon: Zap,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 18,
        title: 'Model Monitoring',
        description: 'Monitor model performance',
        topics: ['Data Drift', 'Model Drift', 'Performance Metrics', 'Alerting', 'Evidently AI']
      },
      {
        id: 19,
        title: 'Infrastructure Monitoring',
        description: 'Monitor ML infrastructure',
        topics: ['Prometheus', 'Grafana', 'ELK Stack', 'Distributed Tracing', 'Log Aggregation']
      }
    ]
  },
  {
    title: 'Security & Governance',
    icon: Shield,
    color: 'bg-rose-500',
    steps: [
      {
        id: 20,
        title: 'ML Security',
        description: 'Secure ML systems',
        topics: ['Model Security', 'Data Privacy', 'Access Control', 'Secrets Management', 'Compliance']
      },
      {
        id: 21,
        title: 'ML Governance',
        description: 'Govern ML lifecycle',
        topics: ['Model Documentation', 'Audit Trails', 'Reproducibility', 'Fairness', 'Explainability']
      }
    ],
    milestone: 'You are an MLOps Engineer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$100K - $130K', avg: '$115K' },
  { level: 'Mid (2-5 yrs)', range: '$130K - $175K', avg: '$150K' },
  { level: 'Senior (5-8 yrs)', range: '$170K - $220K', avg: '$195K' },
  { level: 'Staff/Lead (8+ yrs)', range: '$200K - $280K+', avg: '$240K' }
];

const indiaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '₹12L - ₹20L', avg: '₹16L' },
  { level: 'Mid (2-5 yrs)', range: '₹20L - ₹35L', avg: '₹27L' },
  { level: 'Senior (5-8 yrs)', range: '₹35L - ₹55L', avg: '₹45L' },
  { level: 'Lead (8+ yrs)', range: '₹50L - ₹80L+', avg: '₹65L' }
];

// Project Ideas
const projects = [
  {
    title: 'ML Pipeline with DVC',
    level: 'Beginner' as const,
    description: 'Version controlled ML pipeline',
    skills: ['DVC', 'Git', 'Python', 'Scikit-learn']
  },
  {
    title: 'Model Serving API',
    level: 'Beginner' as const,
    description: 'Deploy model with FastAPI',
    skills: ['FastAPI', 'Docker', 'Model Serialization', 'REST API']
  },
  {
    title: 'Experiment Tracking System',
    level: 'Intermediate' as const,
    description: 'MLflow-based tracking',
    skills: ['MLflow', 'Model Registry', 'Hyperparameter Tuning', 'Metrics']
  },
  {
    title: 'Kubernetes ML Platform',
    level: 'Intermediate' as const,
    description: 'Deploy ML on Kubernetes',
    skills: ['Kubernetes', 'Helm', 'Seldon Core', 'Monitoring']
  },
  {
    title: 'End-to-End ML Platform',
    level: 'Advanced' as const,
    description: 'Full MLOps platform',
    skills: ['Kubeflow', 'Feature Store', 'CI/CD', 'Monitoring']
  },
  {
    title: 'Real-time ML System',
    level: 'Advanced' as const,
    description: 'Streaming ML predictions',
    skills: ['Kafka', 'Feature Store', 'Low Latency', 'Auto-scaling']
  }
];

// FAQs
const faqs = [
  {
    question: 'What is MLOps and why is it important?',
    answer: 'MLOps (Machine Learning Operations) applies DevOps practices to ML systems. It bridges the gap between ML development and production deployment. Important because 87% of ML projects never reach production - MLOps solves deployment, monitoring, and maintenance challenges.'
  },
  {
    question: 'How long does it take to learn MLOps?',
    answer: 'With ML and DevOps background, 3-6 months for core MLOps skills. Without prior experience, 9-12 months including ML fundamentals, Docker, Kubernetes, and cloud platforms. Continuous learning is essential as the field evolves rapidly.'
  },
  {
    question: 'Do I need to know Machine Learning to do MLOps?',
    answer: 'Yes, understanding ML fundamentals is essential. You need to understand model training, evaluation metrics, and common issues like overfitting. You don\'t need to be an ML researcher, but should understand the ML lifecycle and model behavior.'
  },
  {
    question: 'MLOps Engineer vs Data Engineer vs ML Engineer?',
    answer: 'Data Engineers build data pipelines and infrastructure. ML Engineers develop and optimize ML models. MLOps Engineers focus on productionizing models - deployment, monitoring, CI/CD, and infrastructure. Significant overlap exists; roles vary by company.'
  },
  {
    question: 'Which MLOps tools should I learn first?',
    answer: 'Start with Docker (containerization), MLflow (experiment tracking), and one cloud platform (AWS SageMaker or GCP Vertex AI). Add DVC for data versioning and Kubernetes for orchestration. Learn tools that solve real problems in your workflow.'
  },
  {
    question: 'Is MLOps a good career in 2026?',
    answer: 'Excellent career choice. Demand for MLOps engineers exceeds supply significantly. As more companies adopt AI, they need MLOps to operationalize models. Salaries are high and growing. The field will remain critical as AI adoption accelerates.'
  },
  {
    question: 'Should I get MLOps certifications?',
    answer: 'Cloud certifications (AWS ML Specialty, GCP Professional ML) add value. They demonstrate platform expertise. However, practical experience matters more. Build projects, contribute to open source, and understand real production challenges.'
  },
  {
    question: 'What\'s the difference between MLOps and DataOps?',
    answer: 'DataOps focuses on data pipeline automation, data quality, and data governance. MLOps specifically addresses ML model lifecycle - training, deployment, monitoring, and retraining. MLOps often depends on DataOps for data infrastructure.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'Machine Learning',
    description: 'ML fundamentals',
    href: '/roadmap/machine-learning',
    icon: LineChart,
    color: 'bg-purple-500'
  },
  {
    title: 'DevOps Engineer',
    description: 'DevOps practices',
    href: '/roadmap/devops',
    icon: Settings,
    color: 'bg-orange-500'
  },
  {
    title: 'Data Engineer',
    description: 'Data infrastructure',
    href: '/roadmap/data-engineer',
    icon: Database,
    color: 'bg-cyan-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'MLOps Engineer Roadmap 2026',
  description: 'Complete guide to becoming an MLOps Engineer in 2026',
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

export default function MLOpsRoadmapPage() {
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
          title="MLOps Engineer Roadmap"
          description="Master ML pipelines, model deployment, CI/CD for ML, monitoring, Kubernetes, and production ML systems. Your complete guide to becoming an MLOps Engineer in 2026."
          duration="6-12 Months"
          difficulty="Advanced"
          accentColor="#8B5CF6"
        />

        <WhatIsSection
          title="What is an MLOps Engineer?"
          paragraphs={[
            'MLOps Engineers bridge the gap between Machine Learning development and production systems. They build and maintain the infrastructure, pipelines, and processes that enable ML models to run reliably in production at scale.',
            'As an MLOps Engineer, you will automate ML pipelines, deploy models to production, set up monitoring and alerting, manage model versioning, and ensure ML systems are scalable, secure, and maintainable.'
          ]}
          responsibilities={[
            'Build and maintain ML pipelines',
            'Deploy models to production environments',
            'Set up experiment tracking and model registry',
            'Implement CI/CD for ML workflows',
            'Monitor model performance and data drift',
            'Manage ML infrastructure on cloud platforms',
            'Ensure reproducibility and governance'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#8B5CF6"
        />

        <SalarySection
          title="MLOps Engineer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="MLOps is one of the highest-paying specializations in tech. Companies struggle to find qualified MLOps engineers. Cloud platform expertise (AWS, GCP) and hands-on production experience command premium salaries. Remote positions at US companies offer excellent compensation."
          gradient="bg-gradient-to-r from-violet-500 to-purple-600"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your MLOps Journey?"
          description="Get personalized guidance from experienced MLOps engineers who have built production ML systems at scale."
          gradient="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"
        />
      </main>

      <Footer />
    </>
  );
}
