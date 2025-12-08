'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Database,
  Server,
  Shield,
  Zap,
  HardDrive,
  Network,
  Settings,
  LineChart,
  RefreshCw,
  Lock,
  Cloud,
  Wrench
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
    title: 'PostgreSQL Fundamentals',
    icon: Database,
    color: 'bg-blue-500',
    steps: [
      {
        id: 1,
        title: 'SQL Mastery',
        description: 'Advanced SQL skills',
        topics: ['Complex Queries', 'JOINs', 'Subqueries', 'CTEs', 'Window Functions', 'Aggregations']
      },
      {
        id: 2,
        title: 'PostgreSQL Basics',
        description: 'PostgreSQL-specific features',
        topics: ['Installation', 'psql', 'Data Types', 'Schemas', 'Roles', 'Tablespaces']
      }
    ],
    milestone: 'You know PostgreSQL basics!'
  },
  {
    title: 'Database Design',
    icon: Settings,
    color: 'bg-purple-500',
    steps: [
      {
        id: 3,
        title: 'Schema Design',
        description: 'Design databases',
        topics: ['Normalization', 'Denormalization', 'Constraints', 'Foreign Keys', 'Data Modeling']
      },
      {
        id: 4,
        title: 'Advanced Data Types',
        description: 'PostgreSQL types',
        topics: ['Arrays', 'JSON/JSONB', 'UUID', 'Range Types', 'Custom Types', 'Domains']
      }
    ]
  },
  {
    title: 'Indexing & Query Optimization',
    icon: Zap,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 5,
        title: 'Indexes',
        description: 'Index strategies',
        topics: ['B-tree', 'Hash', 'GIN', 'GiST', 'BRIN', 'Partial Indexes', 'Index-Only Scans']
      },
      {
        id: 6,
        title: 'Query Analysis',
        description: 'Optimize queries',
        topics: ['EXPLAIN ANALYZE', 'Query Plans', 'Cost Estimation', 'Statistics', 'Planner Hints']
      }
    ],
    milestone: 'You can optimize queries!'
  },
  {
    title: 'Performance Tuning',
    icon: LineChart,
    color: 'bg-green-500',
    steps: [
      {
        id: 7,
        title: 'Configuration Tuning',
        description: 'Tune PostgreSQL',
        topics: ['postgresql.conf', 'Memory Settings', 'WAL Configuration', 'Connection Pooling', 'PgBouncer']
      },
      {
        id: 8,
        title: 'Maintenance',
        description: 'Database maintenance',
        topics: ['VACUUM', 'ANALYZE', 'Autovacuum', 'Bloat', 'REINDEX', 'pg_repack']
      }
    ]
  },
  {
    title: 'Backup & Recovery',
    icon: RefreshCw,
    color: 'bg-orange-500',
    steps: [
      {
        id: 9,
        title: 'Backup Strategies',
        description: 'Protect your data',
        topics: ['pg_dump', 'pg_basebackup', 'Continuous Archiving', 'WAL Archiving', 'Backup Tools']
      },
      {
        id: 10,
        title: 'Recovery',
        description: 'Restore databases',
        topics: ['Point-in-Time Recovery', 'pg_restore', 'WAL Replay', 'Recovery Configuration', 'Disaster Recovery']
      }
    ],
    milestone: 'You can protect data!'
  },
  {
    title: 'Replication',
    icon: Network,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 11,
        title: 'Streaming Replication',
        description: 'Database replication',
        topics: ['Primary/Standby', 'Synchronous Replication', 'Replication Slots', 'Cascading', 'Failover']
      },
      {
        id: 12,
        title: 'Logical Replication',
        description: 'Selective replication',
        topics: ['Publications', 'Subscriptions', 'Logical Decoding', 'pglogical', 'Use Cases']
      }
    ]
  },
  {
    title: 'High Availability',
    icon: Server,
    color: 'bg-red-500',
    steps: [
      {
        id: 13,
        title: 'HA Solutions',
        description: 'Build HA clusters',
        topics: ['Patroni', 'Stolon', 'repmgr', 'pg_auto_failover', 'Load Balancing']
      },
      {
        id: 14,
        title: 'Clustering',
        description: 'Distributed PostgreSQL',
        topics: ['Connection Pooling', 'Read Replicas', 'Geographic Distribution', 'Split Brain Prevention']
      }
    ],
    milestone: 'You can build HA systems!'
  },
  {
    title: 'Security',
    icon: Shield,
    color: 'bg-rose-500',
    steps: [
      {
        id: 15,
        title: 'Authentication',
        description: 'Secure access',
        topics: ['pg_hba.conf', 'Authentication Methods', 'SSL/TLS', 'Certificate Auth', 'LDAP Integration']
      },
      {
        id: 16,
        title: 'Authorization',
        description: 'Access control',
        topics: ['Roles & Privileges', 'Row-Level Security', 'Column-Level Security', 'Audit Logging']
      }
    ]
  },
  {
    title: 'Monitoring & Troubleshooting',
    icon: Wrench,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 17,
        title: 'Monitoring',
        description: 'Monitor PostgreSQL',
        topics: ['pg_stat Views', 'pgAdmin', 'Prometheus', 'Grafana', 'pg_stat_statements', 'Logs']
      },
      {
        id: 18,
        title: 'Troubleshooting',
        description: 'Debug issues',
        topics: ['Lock Analysis', 'Long Queries', 'Connection Issues', 'Corruption', 'Performance Issues']
      }
    ]
  },
  {
    title: 'Advanced & Cloud',
    icon: Cloud,
    color: 'bg-sky-500',
    steps: [
      {
        id: 19,
        title: 'Extensions',
        description: 'Extend PostgreSQL',
        topics: ['PostGIS', 'pg_cron', 'pg_partman', 'TimescaleDB', 'Citus', 'Custom Extensions']
      },
      {
        id: 20,
        title: 'Partitioning',
        description: 'Scale with partitions',
        topics: ['Range Partitioning', 'List Partitioning', 'Hash Partitioning', 'Partition Pruning', 'Maintenance']
      },
      {
        id: 21,
        title: 'Cloud PostgreSQL',
        description: 'Managed services',
        topics: ['AWS RDS', 'Azure PostgreSQL', 'GCP Cloud SQL', 'Supabase', 'Migration Strategies']
      }
    ],
    milestone: 'You are a PostgreSQL DBA!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Junior DBA (0-2 yrs)', range: '$70K - $95K', avg: '$82K' },
  { level: 'Mid DBA (2-5 yrs)', range: '$95K - $130K', avg: '$112K' },
  { level: 'Senior DBA (5-8 yrs)', range: '$125K - $170K', avg: '$148K' },
  { level: 'Principal/Lead (8+ yrs)', range: '$160K - $220K+', avg: '$190K' }
];

const indiaSalaries = [
  { level: 'Junior DBA (0-2 yrs)', range: '₹5L - ₹10L', avg: '₹7L' },
  { level: 'Mid DBA (2-5 yrs)', range: '₹10L - ₹20L', avg: '₹15L' },
  { level: 'Senior DBA (5-8 yrs)', range: '₹20L - ₹35L', avg: '₹27L' },
  { level: 'Principal (8+ yrs)', range: '₹32L - ₹55L+', avg: '₹42L' }
];

// Project Ideas
const projects = [
  {
    title: 'Development Database',
    level: 'Beginner' as const,
    description: 'Set up PostgreSQL for development',
    skills: ['Installation', 'Configuration', 'Users', 'Backup']
  },
  {
    title: 'Performance Audit',
    level: 'Beginner' as const,
    description: 'Audit and tune slow queries',
    skills: ['EXPLAIN', 'Indexing', 'Statistics', 'Monitoring']
  },
  {
    title: 'Replication Setup',
    level: 'Intermediate' as const,
    description: 'Configure streaming replication',
    skills: ['Primary/Standby', 'Failover', 'Monitoring', 'Testing']
  },
  {
    title: 'Backup System',
    level: 'Intermediate' as const,
    description: 'Automated backup solution',
    skills: ['pgBackRest', 'Scheduling', 'Verification', 'Recovery Testing']
  },
  {
    title: 'HA Cluster',
    level: 'Advanced' as const,
    description: 'Production HA with Patroni',
    skills: ['Patroni', 'etcd', 'HAProxy', 'Failover', 'Monitoring']
  },
  {
    title: 'Multi-Region Setup',
    level: 'Advanced' as const,
    description: 'Geographically distributed DB',
    skills: ['Logical Replication', 'Latency', 'Conflict Resolution', 'Architecture']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to become a PostgreSQL DBA?',
    answer: 'Basic DBA skills take 6-12 months to develop. Intermediate skills (replication, performance tuning) require 1-2 years. Senior-level expertise in HA, disaster recovery, and complex troubleshooting takes 3-5 years. Continuous learning is essential as PostgreSQL evolves.'
  },
  {
    question: 'PostgreSQL vs MySQL - which should I learn?',
    answer: 'PostgreSQL is preferred for complex queries, data integrity, and advanced features. MySQL has a larger market share but PostgreSQL is growing faster. PostgreSQL is more standards-compliant and extensible. Both are valuable; PostgreSQL skills often command higher salaries.'
  },
  {
    question: 'Is PostgreSQL DBA a good career?',
    answer: 'Excellent career choice. PostgreSQL adoption is growing rapidly in enterprises. Cloud-managed services haven\'t replaced DBAs - they\'ve shifted focus to optimization, architecture, and complex issues. Demand exceeds supply for experienced PostgreSQL DBAs.'
  },
  {
    question: 'Do DBAs need programming skills?',
    answer: 'Yes, scripting is essential (Bash, Python). SQL expertise is required at an advanced level. Understanding application code helps with optimization. Some DBAs write PL/pgSQL functions. Programming skills differentiate senior DBAs from basic administrators.'
  },
  {
    question: 'What certifications exist for PostgreSQL?',
    answer: 'EnterpriseDB offers PostgreSQL certifications (Associate, Professional). EDB certifications are well-recognized. Cloud certifications (AWS Database Specialty) are valuable. Practical experience matters more than certifications, but they help for career advancement.'
  },
  {
    question: 'How is cloud affecting DBA jobs?',
    answer: 'Cloud shifts DBA work from hardware/OS to performance, security, and architecture. Managed services (RDS, Cloud SQL) handle routine maintenance. DBAs focus on optimization, HA design, migration, and complex issues. Cloud skills are now essential for DBAs.'
  },
  {
    question: 'What\'s the difference between DBA and Data Engineer?',
    answer: 'DBAs focus on database reliability, performance, security, and maintenance. Data Engineers build data pipelines and ETL processes. Significant overlap exists. DBAs typically specialize in one database deeply; Data Engineers work with multiple data technologies.'
  },
  {
    question: 'How do I prepare for PostgreSQL DBA interviews?',
    answer: 'Know internals: MVCC, WAL, vacuum, query planner. Practice performance troubleshooting scenarios. Understand replication setup and failover. Be ready to discuss backup/recovery strategies. Hands-on experience with real problems is most valuable preparation.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'SQL',
    description: 'SQL fundamentals',
    href: '/roadmap/sql',
    icon: Database,
    color: 'bg-blue-500'
  },
  {
    title: 'Data Engineer',
    description: 'Data pipelines',
    href: '/roadmap/data-engineer',
    icon: Settings,
    color: 'bg-cyan-500'
  },
  {
    title: 'DevOps',
    description: 'Infrastructure skills',
    href: '/roadmap/devops',
    icon: Server,
    color: 'bg-orange-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'PostgreSQL DBA Roadmap 2026',
  description: 'Complete guide to becoming a PostgreSQL DBA in 2026',
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

export default function PostgreSQLDBARoadmapPage() {
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
          title="PostgreSQL DBA Roadmap"
          description="Master performance tuning, replication, backup & recovery, high availability, security, and cloud PostgreSQL. Your complete guide to becoming a PostgreSQL DBA in 2026."
          duration="6-12 Months"
          difficulty="Intermediate"
          accentColor="#336791"
        />

        <WhatIsSection
          title="What is a PostgreSQL DBA?"
          paragraphs={[
            'PostgreSQL Database Administrators ensure PostgreSQL databases are reliable, performant, secure, and available. They manage database infrastructure, optimize queries, implement backup strategies, and design high-availability solutions.',
            'As a PostgreSQL DBA, you will tune database performance, set up replication, implement backup and recovery, manage security, monitor database health, and architect scalable database solutions.'
          ]}
          responsibilities={[
            'Install, configure, and upgrade PostgreSQL',
            'Optimize queries and database performance',
            'Implement backup and recovery strategies',
            'Set up and maintain replication',
            'Design high availability solutions',
            'Manage database security and access',
            'Monitor and troubleshoot issues'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#336791"
        />

        <SalarySection
          title="PostgreSQL DBA Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="PostgreSQL DBA salaries have increased significantly as adoption grows. Cloud platform expertise (AWS RDS, GCP) adds premium. HA and performance specialization command top salaries. Consulting rates for PostgreSQL experts are excellent."
          gradient="bg-gradient-to-r from-blue-600 to-indigo-600"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your PostgreSQL DBA Journey?"
          description="Get personalized guidance from experienced PostgreSQL DBAs who have managed production databases at scale."
          gradient="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
        />
      </main>

      <Footer />
    </>
  );
}
