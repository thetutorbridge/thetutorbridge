'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Database,
  Server,
  Layers,
  Zap,
  GitBranch,
  Cloud,
  Code,
  Settings,
  Activity,
  Shield,
  LineChart,
  HardDrive
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
    title: 'Programming Foundation',
    icon: Code,
    color: 'bg-blue-500',
    steps: [
      {
        id: 1,
        title: 'Core Programming',
        description: 'Essential languages',
        topics: ['Python', 'SQL (Advanced)', 'Scala Basics', 'Java Basics', 'Shell Scripting', 'Data Structures']
      },
      {
        id: 2,
        title: 'Distributed Computing Concepts',
        description: 'Understand scale',
        topics: ['CAP Theorem', 'Distributed Systems', 'Partitioning', 'Replication', 'Consistency Models', 'Fault Tolerance']
      }
    ],
    milestone: 'You have programming foundation!'
  },
  {
    title: 'Linux & Infrastructure',
    icon: Server,
    color: 'bg-green-500',
    steps: [
      {
        id: 3,
        title: 'Linux Administration',
        description: 'System fundamentals',
        topics: ['Linux Commands', 'File Systems', 'Networking', 'Process Management', 'SSH/SCP', 'Cron Jobs']
      },
      {
        id: 4,
        title: 'Containerization',
        description: 'Modern deployment',
        topics: ['Docker', 'Docker Compose', 'Kubernetes Basics', 'Container Networking', 'Resource Management']
      }
    ]
  },
  {
    title: 'Hadoop Ecosystem',
    icon: HardDrive,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 5,
        title: 'HDFS & MapReduce',
        description: 'Hadoop fundamentals',
        topics: ['HDFS Architecture', 'Data Blocks', 'NameNode/DataNode', 'MapReduce Paradigm', 'YARN', 'Cluster Management']
      },
      {
        id: 6,
        title: 'Hadoop Tools',
        description: 'Ecosystem components',
        topics: ['Hive', 'Pig', 'HBase', 'Sqoop', 'Flume', 'Zookeeper']
      }
    ],
    milestone: 'You understand Hadoop!'
  },
  {
    title: 'Apache Spark',
    icon: Zap,
    color: 'bg-orange-500',
    steps: [
      {
        id: 7,
        title: 'Spark Core',
        description: 'In-memory processing',
        topics: ['RDDs', 'Transformations', 'Actions', 'Spark Architecture', 'Memory Management', 'Partitioning']
      },
      {
        id: 8,
        title: 'Spark SQL & DataFrames',
        description: 'Structured data',
        topics: ['DataFrames API', 'Spark SQL', 'Catalyst Optimizer', 'Tungsten', 'UDFs', 'Window Functions']
      },
      {
        id: 9,
        title: 'PySpark',
        description: 'Python for Spark',
        topics: ['PySpark API', 'pandas Integration', 'Koalas', 'ML Pipelines', 'Performance Tuning', 'Best Practices']
      }
    ]
  },
  {
    title: 'Stream Processing',
    icon: Activity,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 10,
        title: 'Apache Kafka',
        description: 'Event streaming',
        topics: ['Kafka Architecture', 'Topics & Partitions', 'Producers/Consumers', 'Consumer Groups', 'Kafka Connect', 'Schema Registry']
      },
      {
        id: 11,
        title: 'Stream Processing Frameworks',
        description: 'Real-time processing',
        topics: ['Spark Streaming', 'Structured Streaming', 'Apache Flink', 'Kafka Streams', 'Event Time/Watermarks', 'State Management']
      }
    ],
    milestone: 'You can process streams!'
  },
  {
    title: 'Data Lakes & Storage',
    icon: Database,
    color: 'bg-purple-500',
    steps: [
      {
        id: 12,
        title: 'Data Lake Architecture',
        description: 'Modern data storage',
        topics: ['Data Lake vs Warehouse', 'Medallion Architecture', 'Zone Design', 'File Formats (Parquet, ORC)', 'Data Catalogs']
      },
      {
        id: 13,
        title: 'Table Formats',
        description: 'Modern table formats',
        topics: ['Delta Lake', 'Apache Iceberg', 'Apache Hudi', 'ACID Transactions', 'Time Travel', 'Schema Evolution']
      }
    ]
  },
  {
    title: 'Query Engines',
    icon: Layers,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 14,
        title: 'SQL Engines',
        description: 'Query at scale',
        topics: ['Presto/Trino', 'Apache Drill', 'Impala', 'Query Optimization', 'Federation', 'Performance Tuning']
      },
      {
        id: 15,
        title: 'Data Warehouses',
        description: 'Cloud warehouses',
        topics: ['Snowflake', 'BigQuery', 'Redshift', 'Synapse', 'Warehouse Design', 'Cost Optimization']
      }
    ],
    milestone: 'You can query big data!'
  },
  {
    title: 'Workflow Orchestration',
    icon: GitBranch,
    color: 'bg-pink-500',
    steps: [
      {
        id: 16,
        title: 'Apache Airflow',
        description: 'Pipeline orchestration',
        topics: ['DAGs', 'Operators', 'Sensors', 'XComs', 'Scheduling', 'Dynamic DAGs']
      },
      {
        id: 17,
        title: 'Advanced Orchestration',
        description: 'Modern tools',
        topics: ['Dagster', 'Prefect', 'dbt', 'Luigi', 'CI/CD for Data', 'Testing Pipelines']
      }
    ]
  },
  {
    title: 'Cloud Big Data',
    icon: Cloud,
    color: 'bg-sky-500',
    steps: [
      {
        id: 18,
        title: 'AWS Big Data',
        description: 'AWS services',
        topics: ['EMR', 'Glue', 'Athena', 'Kinesis', 'S3', 'Redshift']
      },
      {
        id: 19,
        title: 'Multi-Cloud',
        description: 'Other platforms',
        topics: ['Databricks', 'GCP Dataproc', 'Azure HDInsight', 'Managed Services', 'Cloud Data Lakes']
      }
    ],
    milestone: 'You know cloud big data!'
  },
  {
    title: 'Data Quality & Governance',
    icon: Shield,
    color: 'bg-red-500',
    steps: [
      {
        id: 20,
        title: 'Data Quality',
        description: 'Ensure accuracy',
        topics: ['Data Validation', 'Great Expectations', 'Data Contracts', 'Anomaly Detection', 'Data Profiling', 'SLAs']
      },
      {
        id: 21,
        title: 'Data Governance',
        description: 'Compliance and catalog',
        topics: ['Data Lineage', 'Metadata Management', 'Access Control', 'GDPR/CCPA', 'Data Discovery', 'Data Mesh']
      }
    ]
  },
  {
    title: 'Performance & Operations',
    icon: LineChart,
    color: 'bg-emerald-500',
    steps: [
      {
        id: 22,
        title: 'Performance Tuning',
        description: 'Optimize at scale',
        topics: ['Spark Tuning', 'Memory Management', 'Shuffle Optimization', 'Data Skew', 'Caching', 'Benchmarking']
      },
      {
        id: 23,
        title: 'Monitoring & Operations',
        description: 'Production systems',
        topics: ['Cluster Monitoring', 'Job Monitoring', 'Alerting', 'Cost Management', 'Capacity Planning', 'Incident Response']
      }
    ],
    milestone: 'You are a Big Data Engineer!'
  }
];

const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$85K - $115K', avg: '$100K' },
  { level: 'Mid (2-5 yrs)', range: '$115K - $160K', avg: '$135K' },
  { level: 'Senior (5-8 yrs)', range: '$150K - $200K', avg: '$175K' },
  { level: 'Staff/Principal (8+ yrs)', range: '$190K - $280K+', avg: '$230K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹6L - ₹12L', avg: '₹9L' },
  { level: 'Junior (1-3 yrs)', range: '₹12L - ₹22L', avg: '₹16L' },
  { level: 'Mid (3-5 yrs)', range: '₹20L - ₹38L', avg: '₹28L' },
  { level: 'Senior (5+ yrs)', range: '₹35L - ₹60L+', avg: '₹46L' }
];

const projects = [
  { title: 'Batch ETL Pipeline', level: 'Beginner' as const, description: 'Spark data processing', skills: ['PySpark', 'S3', 'Parquet', 'Airflow'] },
  { title: 'Kafka Streaming', level: 'Beginner' as const, description: 'Real-time event pipeline', skills: ['Kafka', 'Producer/Consumer', 'Avro', 'Docker'] },
  { title: 'Data Lake', level: 'Intermediate' as const, description: 'Medallion architecture', skills: ['Delta Lake', 'Spark', 'Data Quality', 'Catalog'] },
  { title: 'Real-Time Analytics', level: 'Intermediate' as const, description: 'Streaming dashboard', skills: ['Kafka', 'Flink/Spark', 'Elasticsearch', 'Kibana'] },
  { title: 'ML Data Platform', level: 'Advanced' as const, description: 'Feature engineering at scale', skills: ['Feature Store', 'Spark ML', 'Airflow', 'MLOps'] },
  { title: 'Multi-Tenant Platform', level: 'Advanced' as const, description: 'Self-service data platform', skills: ['Kubernetes', 'Spark', 'Resource Management', 'Security'] }
];

const faqs = [
  {
    question: 'What is the difference between Big Data Engineer and Data Engineer?',
    answer: 'Big Data Engineers specialize in distributed systems processing massive datasets (TB/PB scale). Data Engineers work at all scales. Significant overlap exists - the distinction is mainly about scale and tooling (Spark, Kafka vs smaller-scale tools). Many job postings use terms interchangeably.'
  },
  {
    question: 'How long does it take to become a Big Data Engineer?',
    answer: 'With programming background, 6-12 months for core skills (Spark, Kafka, SQL). Deep expertise in distributed systems takes 2-3 years. Cloud platforms and modern architectures require ongoing learning. The field evolves rapidly with new tools emerging regularly.'
  },
  {
    question: 'Is Hadoop still relevant in 2026?',
    answer: 'HDFS and YARN remain foundational in many enterprises. MapReduce is largely replaced by Spark. Cloud storage (S3) often replaces HDFS for new projects. Understanding Hadoop concepts is valuable even if you use modern alternatives. Many legacy systems still run Hadoop.'
  },
  {
    question: 'Should I learn Spark or Flink?',
    answer: 'Start with Spark - larger ecosystem, more jobs, better for batch and micro-batch. Flink excels at true streaming and stateful processing. Both are valuable; Spark is more versatile. Learn Flink after mastering Spark if streaming is your focus.'
  },
  {
    question: 'Is Big Data Engineering a good career in 2026?',
    answer: 'Excellent career. Data volumes continue exploding. AI/ML creates more demand for data infrastructure. Cloud migration drives modernization projects. Salaries remain strong. Competition exists but demand exceeds supply for experienced engineers.'
  },
  {
    question: 'Do I need cloud certifications?',
    answer: 'Helpful but not required. AWS Big Data Specialty or Databricks certifications demonstrate knowledge. Practical experience matters more than certifications. They help pass resume screening and show commitment to learning.'
  },
  {
    question: 'Python or Scala for Big Data?',
    answer: 'Python (PySpark) is more common and easier to learn. Scala offers better Spark performance and type safety. Most teams use Python. Learn Scala if working on performance-critical systems or existing Scala codebases. SQL is essential regardless.'
  },
  {
    question: 'How do I get Big Data experience without a job?',
    answer: 'Use cloud free tiers and local Docker setups. Process public datasets (NYC Taxi, Wikipedia). Build end-to-end projects on GitHub. Contribute to open-source (Spark, Airflow). Get Databricks Community Edition. Take online courses with hands-on labs.'
  }
];

const relatedRoadmaps = [
  { title: 'Data Engineer', description: 'General data engineering', href: '/roadmap/data-engineer', icon: Database, color: 'bg-cyan-500' },
  { title: 'Data Scientist', description: 'Data analysis and ML', href: '/roadmap/data-scientist', icon: LineChart, color: 'bg-purple-500' },
  { title: 'Cloud Engineer', description: 'Cloud infrastructure', href: '/roadmap/cloud-engineer', icon: Cloud, color: 'bg-orange-500' }
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Big Data Engineer Roadmap 2026',
  description: 'Complete guide to becoming a Big Data Engineer in 2026',
  author: { '@type': 'Organization', name: 'The Tutor Bridge' },
  publisher: { '@type': 'Organization', name: 'The Tutor Bridge' }
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } }))
};

export default function BigDataEngineerRoadmapPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <RoadmapHero
          title="Big Data Engineer Roadmap"
          description="Master Apache Spark, Kafka, Hadoop, data lakes, stream processing, and distributed systems. Your complete guide to becoming a Big Data Engineer in 2026."
          duration="8-14 Months"
          difficulty="Advanced"
          accentColor="#F97316"
        />
        <WhatIsSection
          title="What is a Big Data Engineer?"
          paragraphs={[
            'Big Data Engineers design, build, and maintain systems that process massive datasets at scale. They work with distributed computing frameworks like Spark and Kafka to enable organizations to derive insights from terabytes or petabytes of data.',
            'As a Big Data Engineer, you will build data pipelines, optimize distributed processing, manage data lakes, implement real-time streaming systems, and ensure data quality at massive scale.'
          ]}
          responsibilities={[
            'Design and build large-scale data pipelines',
            'Develop batch and real-time processing systems',
            'Manage data lakes and warehouses',
            'Optimize Spark jobs for performance',
            'Build streaming systems with Kafka',
            'Implement data quality frameworks',
            'Monitor and troubleshoot distributed systems'
          ]}
        />
        <VisualRoadmapSection stages={roadmapStages} accentColor="#F97316" />
        <SalarySection
          title="Big Data Engineer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Spark and Kafka expertise command premium salaries. Cloud platform experience (Databricks, EMR) is highly valued. Real-time streaming specialization pays well. Companies with massive data volumes (finance, tech, retail) pay above market."
          gradient="bg-gradient-to-r from-orange-500 to-red-500"
        />
        <ProjectsSection projects={projects} />
        <FAQSection faqs={faqs} />
        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />
        <CTASection
          title="Ready to Start Your Big Data Engineering Journey?"
          description="Get personalized guidance from experienced big data engineers who have built petabyte-scale systems."
          gradient="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"
        />
      </main>
      <Footer />
    </>
  );
}
