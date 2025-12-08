'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Database,
  Code,
  GitBranch,
  Cloud,
  Workflow,
  Server,
  Layers,
  BarChart3,
  Zap,
  Monitor,
  Brain
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
        description: 'Primary language for data engineering',
        topics: ['Python Basics', 'Data Structures', 'File I/O', 'APIs', 'Pandas', 'NumPy']
      },
      {
        id: 2,
        title: 'SQL Mastery',
        description: 'Advanced SQL for data engineering',
        topics: ['Complex Joins', 'Window Functions', 'CTEs', 'Query Optimization', 'Stored Procedures']
      }
    ],
    milestone: 'You can work with data programmatically!'
  },
  {
    title: 'Databases',
    icon: Database,
    color: 'bg-green-500',
    steps: [
      {
        id: 3,
        title: 'Relational Databases',
        description: 'Master SQL databases',
        topics: ['PostgreSQL', 'MySQL', 'Data Modeling', 'Normalization', 'Indexing', 'Transactions']
      },
      {
        id: 4,
        title: 'NoSQL Databases',
        description: 'Non-relational data storage',
        topics: ['MongoDB', 'Cassandra', 'Redis', 'DynamoDB', 'When to Use NoSQL']
      }
    ]
  },
  {
    title: 'Data Warehousing',
    icon: Server,
    color: 'bg-purple-500',
    steps: [
      {
        id: 5,
        title: 'Data Warehouse Concepts',
        description: 'Understand DWH architecture',
        topics: ['Star Schema', 'Snowflake Schema', 'Fact/Dimension Tables', 'SCD Types', 'OLAP vs OLTP']
      },
      {
        id: 6,
        title: 'Modern Data Warehouses',
        description: 'Cloud data warehouses',
        topics: ['Snowflake', 'BigQuery', 'Redshift', 'Databricks', 'Data Lakehouse']
      }
    ],
    milestone: 'You can design data warehouses!'
  },
  {
    title: 'ETL/ELT Pipelines',
    icon: Workflow,
    color: 'bg-orange-500',
    steps: [
      {
        id: 7,
        title: 'ETL Fundamentals',
        description: 'Extract, Transform, Load',
        topics: ['ETL vs ELT', 'Data Extraction', 'Data Transformation', 'Data Loading', 'Incremental Loads']
      },
      {
        id: 8,
        title: 'Transformation Tools',
        description: 'Modern transformation stack',
        topics: ['dbt', 'SQL Transformations', 'Data Quality', 'Testing', 'Documentation']
      }
    ]
  },
  {
    title: 'Orchestration',
    icon: GitBranch,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 9,
        title: 'Workflow Orchestration',
        description: 'Schedule and manage pipelines',
        topics: ['Apache Airflow', 'DAGs', 'Operators', 'Sensors', 'Task Dependencies']
      },
      {
        id: 10,
        title: 'Alternative Orchestrators',
        description: 'Other orchestration tools',
        topics: ['Prefect', 'Dagster', 'Luigi', 'Mage', 'Step Functions']
      }
    ],
    milestone: 'You can build automated pipelines!'
  },
  {
    title: 'Big Data Processing',
    icon: Zap,
    color: 'bg-red-500',
    steps: [
      {
        id: 11,
        title: 'Apache Spark',
        description: 'Distributed data processing',
        topics: ['Spark Core', 'Spark SQL', 'DataFrames', 'RDDs', 'PySpark', 'Spark Optimization']
      },
      {
        id: 12,
        title: 'Streaming',
        description: 'Real-time data processing',
        topics: ['Apache Kafka', 'Spark Streaming', 'Flink', 'Kinesis', 'Event-Driven Architecture']
      }
    ]
  },
  {
    title: 'Cloud Platforms',
    icon: Cloud,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 13,
        title: 'AWS Data Services',
        description: 'Amazon Web Services',
        topics: ['S3', 'Glue', 'Redshift', 'EMR', 'Athena', 'Lambda', 'Step Functions']
      },
      {
        id: 14,
        title: 'GCP / Azure',
        description: 'Other cloud platforms',
        topics: ['BigQuery', 'Dataflow', 'Pub/Sub', 'Azure Synapse', 'Data Factory', 'Multi-Cloud']
      }
    ],
    milestone: 'You can build cloud data pipelines!'
  },
  {
    title: 'Data Engineering Best Practices',
    icon: Layers,
    color: 'bg-pink-500',
    steps: [
      {
        id: 15,
        title: 'Data Quality & Governance',
        description: 'Ensure data reliability',
        topics: ['Data Quality Checks', 'Great Expectations', 'Data Lineage', 'Data Catalog', 'Metadata Management']
      },
      {
        id: 16,
        title: 'DevOps for Data',
        description: 'DataOps practices',
        topics: ['CI/CD for Pipelines', 'Infrastructure as Code', 'Monitoring', 'Alerting', 'Version Control']
      }
    ],
    milestone: 'You are a professional Data Engineer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$85K - $115K', avg: '$100K' },
  { level: 'Mid (2-5 yrs)', range: '$115K - $160K', avg: '$135K' },
  { level: 'Senior (5-8 yrs)', range: '$160K - $220K', avg: '$185K' },
  { level: 'Staff (8+ yrs)', range: '$220K - $320K+', avg: '$260K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹6L - ₹12L', avg: '₹9L' },
  { level: 'Junior (1-3 yrs)', range: '₹12L - ₹22L', avg: '₹16L' },
  { level: 'Mid (3-5 yrs)', range: '₹22L - ₹40L', avg: '₹30L' },
  { level: 'Senior (5+ yrs)', range: '₹40L - ₹70L+', avg: '₹52L' }
];

// Project Ideas
const projects = [
  {
    title: 'ETL Pipeline',
    level: 'Beginner' as const,
    description: 'Build a simple ETL with Python',
    skills: ['Python', 'SQL', 'CSV/JSON']
  },
  {
    title: 'Data Warehouse Design',
    level: 'Beginner' as const,
    description: 'Design star schema for a business',
    skills: ['Data Modeling', 'SQL', 'ERD']
  },
  {
    title: 'Airflow Pipeline',
    level: 'Intermediate' as const,
    description: 'Orchestrate ETL with Airflow',
    skills: ['Airflow', 'Python', 'Docker']
  },
  {
    title: 'dbt Project',
    level: 'Intermediate' as const,
    description: 'Transform data warehouse with dbt',
    skills: ['dbt', 'SQL', 'Testing']
  },
  {
    title: 'Streaming Pipeline',
    level: 'Advanced' as const,
    description: 'Real-time data with Kafka + Spark',
    skills: ['Kafka', 'Spark Streaming', 'Python']
  },
  {
    title: 'End-to-End Data Platform',
    level: 'Advanced' as const,
    description: 'Build complete data platform on cloud',
    skills: ['AWS/GCP', 'Airflow', 'dbt', 'Spark']
  }
];

// FAQs
const faqs = [
  {
    question: 'What is the difference between Data Engineer and Data Scientist?',
    answer: 'Data Engineers build and maintain data infrastructure - pipelines, warehouses, and data platforms. Data Scientists analyze data and build ML models. Data Engineers focus on "how to get and store data," while Data Scientists focus on "what insights can we extract." Data Engineers need stronger software engineering skills; Data Scientists need more statistics and ML knowledge.'
  },
  {
    question: 'How long does it take to become a Data Engineer?',
    answer: 'With consistent study (3-4 hours daily), you can become job-ready in 6-12 months. This assumes you already know basic programming. Focus on SQL, Python, one cloud platform, and one orchestration tool first. Real-world experience through projects or internships is crucial. Those with software engineering backgrounds can transition faster.'
  },
  {
    question: 'Which cloud platform should I learn first?',
    answer: 'Start with AWS - it has the largest market share and most job opportunities. Learn S3, Glue, Redshift, and Athena. Once comfortable, expand to GCP (BigQuery is excellent) or Azure based on job market in your area. The concepts transfer between clouds, so deep knowledge of one is better than surface knowledge of all.'
  },
  {
    question: 'Is SQL still important for Data Engineers?',
    answer: 'SQL is absolutely essential. It is the most important skill for data engineers. Modern tools like dbt are SQL-first. Data warehouses are queried with SQL. Even Spark has Spark SQL. Master advanced SQL concepts like window functions, CTEs, and query optimization. You will use SQL daily as a data engineer.'
  },
  {
    question: 'Should I learn Spark or focus on SQL tools?',
    answer: 'Learn both, but prioritize based on data size. For most companies with moderate data volumes, SQL-based tools (dbt, warehouse queries) are sufficient. Spark becomes essential when dealing with massive datasets that cannot fit in a single machine. Learn Spark after mastering SQL fundamentals.'
  },
  {
    question: 'What is dbt and why is it popular?',
    answer: 'dbt (data build tool) transforms data inside your warehouse using SQL. It brings software engineering practices (version control, testing, documentation) to analytics. It is popular because it is simple yet powerful - you write SQL, dbt handles dependencies, testing, and deployment. Most modern data teams use dbt.'
  },
  {
    question: 'Do Data Engineers need to know Machine Learning?',
    answer: 'Basic ML understanding helps but is not required for most roles. Data Engineers build pipelines that feed ML models, so understanding what data scientists need is valuable. MLOps roles (deploying ML models) require more ML knowledge. Focus on core data engineering skills first, then expand to ML if interested.'
  },
  {
    question: 'Is Data Engineering a good career in 2026?',
    answer: 'Yes, data engineering is one of the fastest-growing and well-paid tech roles. Every company needs data infrastructure. The rise of AI/ML has increased demand for quality data pipelines. Remote opportunities are abundant. The field continues to evolve with new tools, keeping the work interesting.'
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
    title: 'Data Scientist',
    description: 'Machine learning and statistics',
    href: '/roadmap/data-scientist',
    icon: Brain,
    color: 'bg-emerald-500'
  },
  {
    title: 'DevOps Engineer',
    description: 'Infrastructure and automation',
    href: '/roadmap/devops',
    icon: Server,
    color: 'bg-orange-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Data Engineer Roadmap 2026',
  description: 'Complete guide to becoming a data engineer in 2026',
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

export default function DataEngineerRoadmapPage() {
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
          title="Data Engineer Roadmap"
          description="Master SQL, Python, ETL pipelines, data warehousing, Spark, and cloud platforms. Your complete guide to becoming a professional data engineer in 2026."
          duration="6-12 Months"
          difficulty="Intermediate"
          accentColor="#8B5CF6"
        />

        <WhatIsSection
          title="What is a Data Engineer?"
          paragraphs={[
            'Data Engineers build and maintain the infrastructure that allows organizations to collect, store, and analyze data. They design data pipelines, build data warehouses, and ensure data quality and reliability.',
            'As a Data Engineer, you will work with SQL and Python, build ETL/ELT pipelines, manage data warehouses, use tools like Spark and Airflow, and deploy solutions on cloud platforms like AWS, GCP, or Azure.'
          ]}
          responsibilities={[
            'Design and build data pipelines (ETL/ELT)',
            'Create and maintain data warehouses',
            'Ensure data quality and reliability',
            'Optimize query performance',
            'Work with big data technologies (Spark)',
            'Implement data orchestration (Airflow)',
            'Deploy solutions on cloud platforms',
            'Collaborate with data scientists and analysts'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#8B5CF6"
        />

        <SalarySection
          title="Data Engineer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Data Engineers with Spark and cloud expertise command premium salaries. Experience with modern tools like dbt and Airflow is highly valued. Streaming data skills (Kafka) are increasingly in demand. Tech companies and fintech offer the highest compensation."
          gradient="bg-gradient-to-r from-purple-500 to-indigo-500"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your Data Engineering Journey?"
          description="Get personalized guidance from experienced data engineers who have built production data platforms."
          gradient="bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500"
        />
      </main>

      <Footer />
    </>
  );
}
