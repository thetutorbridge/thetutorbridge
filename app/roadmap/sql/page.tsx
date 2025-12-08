'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Database,
  Table,
  Search,
  Link,
  Zap,
  Shield,
  BarChart3,
  Settings,
  Server,
  Layers,
  GitBranch,
  Code
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
    title: 'Database Fundamentals',
    icon: Database,
    color: 'bg-blue-500',
    steps: [
      {
        id: 1,
        title: 'Introduction to Databases',
        description: 'Understand database concepts',
        topics: ['What is a Database?', 'RDBMS vs NoSQL', 'Tables & Rows', 'Data Types', 'Primary Keys']
      },
      {
        id: 2,
        title: 'Database Design',
        description: 'Design good schemas',
        topics: ['Normalization', '1NF/2NF/3NF', 'Entity-Relationship', 'Schema Design', 'Denormalization']
      }
    ],
    milestone: 'You understand database fundamentals!'
  },
  {
    title: 'Basic SQL',
    icon: Table,
    color: 'bg-green-500',
    steps: [
      {
        id: 3,
        title: 'SELECT Queries',
        description: 'Retrieve data',
        topics: ['SELECT', 'FROM', 'WHERE', 'ORDER BY', 'LIMIT', 'DISTINCT']
      },
      {
        id: 4,
        title: 'Filtering & Sorting',
        description: 'Refine your queries',
        topics: ['Comparison Operators', 'AND/OR/NOT', 'IN', 'BETWEEN', 'LIKE', 'NULL Handling']
      },
      {
        id: 5,
        title: 'Data Manipulation',
        description: 'Modify data',
        topics: ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'Transactions Basics']
      }
    ],
    milestone: 'You can write basic SQL!'
  },
  {
    title: 'Joins',
    icon: Link,
    color: 'bg-purple-500',
    steps: [
      {
        id: 6,
        title: 'Join Types',
        description: 'Combine tables',
        topics: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'CROSS JOIN']
      },
      {
        id: 7,
        title: 'Advanced Joins',
        description: 'Complex table relationships',
        topics: ['Self Joins', 'Multiple Joins', 'Join Conditions', 'ON vs WHERE', 'Join Performance']
      }
    ]
  },
  {
    title: 'Aggregations',
    icon: BarChart3,
    color: 'bg-orange-500',
    steps: [
      {
        id: 8,
        title: 'Aggregate Functions',
        description: 'Summarize data',
        topics: ['COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'GROUP BY']
      },
      {
        id: 9,
        title: 'Advanced Grouping',
        description: 'Complex aggregations',
        topics: ['HAVING', 'ROLLUP', 'CUBE', 'GROUPING SETS', 'Conditional Aggregation']
      }
    ],
    milestone: 'You can aggregate and analyze data!'
  },
  {
    title: 'Subqueries',
    icon: Search,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 10,
        title: 'Subquery Basics',
        description: 'Nested queries',
        topics: ['Scalar Subqueries', 'Column Subqueries', 'Table Subqueries', 'Correlated Subqueries']
      },
      {
        id: 11,
        title: 'Subquery Operators',
        description: 'Subquery techniques',
        topics: ['EXISTS', 'NOT EXISTS', 'IN Subqueries', 'ANY', 'ALL']
      }
    ]
  },
  {
    title: 'Window Functions',
    icon: Zap,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 12,
        title: 'Window Basics',
        description: 'Analytics functions',
        topics: ['OVER', 'PARTITION BY', 'ORDER BY', 'ROW_NUMBER', 'RANK', 'DENSE_RANK']
      },
      {
        id: 13,
        title: 'Advanced Windows',
        description: 'Complex analytics',
        topics: ['LEAD', 'LAG', 'FIRST_VALUE', 'LAST_VALUE', 'NTILE', 'Window Frames']
      }
    ],
    milestone: 'You know advanced SQL!'
  },
  {
    title: 'DDL & Schema',
    icon: Settings,
    color: 'bg-gray-600',
    steps: [
      {
        id: 14,
        title: 'Schema Management',
        description: 'Create and modify structure',
        topics: ['CREATE TABLE', 'ALTER TABLE', 'DROP TABLE', 'Constraints', 'Foreign Keys']
      },
      {
        id: 15,
        title: 'Indexes',
        description: 'Optimize queries',
        topics: ['CREATE INDEX', 'Index Types', 'Composite Indexes', 'Index Selection', 'Index Maintenance']
      }
    ]
  },
  {
    title: 'Advanced SQL',
    icon: Code,
    color: 'bg-pink-500',
    steps: [
      {
        id: 16,
        title: 'CTEs & Recursion',
        description: 'Common Table Expressions',
        topics: ['WITH Clause', 'Recursive CTEs', 'Hierarchical Data', 'Multiple CTEs']
      },
      {
        id: 17,
        title: 'Set Operations',
        description: 'Combine result sets',
        topics: ['UNION', 'UNION ALL', 'INTERSECT', 'EXCEPT', 'Set Operation Rules']
      },
      {
        id: 18,
        title: 'Stored Procedures',
        description: 'Programmable SQL',
        topics: ['Stored Procedures', 'Functions', 'Variables', 'Control Flow', 'Cursors']
      }
    ]
  },
  {
    title: 'Query Optimization',
    icon: Zap,
    color: 'bg-red-500',
    steps: [
      {
        id: 19,
        title: 'Query Performance',
        description: 'Optimize slow queries',
        topics: ['EXPLAIN', 'Query Plans', 'Index Usage', 'Query Rewriting', 'Statistics']
      },
      {
        id: 20,
        title: 'Performance Tuning',
        description: 'Database tuning',
        topics: ['Query Hints', 'Partitioning', 'Materialized Views', 'Connection Pooling']
      }
    ]
  },
  {
    title: 'Database Platforms',
    icon: Server,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 21,
        title: 'PostgreSQL',
        description: 'Advanced open-source DB',
        topics: ['PostgreSQL Features', 'JSONB', 'Arrays', 'Full-Text Search', 'Extensions']
      },
      {
        id: 22,
        title: 'MySQL & Others',
        description: 'Other platforms',
        topics: ['MySQL', 'SQL Server', 'SQLite', 'Platform Differences', 'Migration']
      }
    ],
    milestone: 'You are a SQL expert!'
  }
];

// Salary Data (SQL skills enhance other roles)
const usaSalaries = [
  { level: 'Data Analyst (Entry)', range: '$55K - $75K', avg: '$65K' },
  { level: 'Database Admin (Mid)', range: '$80K - $120K', avg: '$98K' },
  { level: 'Data Engineer (Senior)', range: '$130K - $180K', avg: '$152K' },
  { level: 'DB Architect (Lead)', range: '$160K - $220K+', avg: '$185K' }
];

const indiaSalaries = [
  { level: 'Data Analyst (Entry)', range: '₹4L - ₹8L', avg: '₹6L' },
  { level: 'Database Admin (Mid)', range: '₹10L - ₹20L', avg: '₹14L' },
  { level: 'Data Engineer (Senior)', range: '₹20L - ₹40L', avg: '₹28L' },
  { level: 'DB Architect (Lead)', range: '₹35L - ₹60L+', avg: '₹45L' }
];

// Project Ideas
const projects = [
  {
    title: 'Employee Database',
    level: 'Beginner' as const,
    description: 'Design and query an HR database',
    skills: ['Schema Design', 'Basic Queries', 'Joins', 'Aggregations']
  },
  {
    title: 'E-commerce Analytics',
    level: 'Beginner' as const,
    description: 'Analyze sales and customer data',
    skills: ['JOINs', 'GROUP BY', 'Date Functions', 'Reporting']
  },
  {
    title: 'Social Media Schema',
    level: 'Intermediate' as const,
    description: 'Design Twitter-like database',
    skills: ['Normalization', 'Self-Joins', 'Many-to-Many', 'Indexes']
  },
  {
    title: 'Financial Reports',
    level: 'Intermediate' as const,
    description: 'Build financial reporting queries',
    skills: ['Window Functions', 'CTEs', 'Rolling Averages', 'YoY Analysis']
  },
  {
    title: 'Query Optimization Project',
    level: 'Advanced' as const,
    description: 'Optimize slow database queries',
    skills: ['EXPLAIN', 'Index Tuning', 'Query Rewriting', 'Benchmarking']
  },
  {
    title: 'Data Warehouse Design',
    level: 'Advanced' as const,
    description: 'Design a star schema warehouse',
    skills: ['Star Schema', 'Fact Tables', 'Dimensions', 'ETL Logic']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to learn SQL?',
    answer: 'Basic SQL (SELECT, WHERE, JOINs) can be learned in 2-4 weeks. Intermediate SQL (aggregations, subqueries, window functions) takes 2-3 months. Advanced SQL (optimization, stored procedures, complex analytics) takes 4-6 months. SQL is easy to start but has depth to master.'
  },
  {
    question: 'Which SQL database should I learn?',
    answer: 'Start with PostgreSQL - it\'s free, feature-rich, and widely used. SQL fundamentals transfer between databases. If your target company uses MySQL or SQL Server, the core concepts are similar. PostgreSQL is often preferred for learning due to its standards compliance.'
  },
  {
    question: 'Is SQL still relevant in 2026?',
    answer: 'Absolutely. SQL remains the most important skill for working with data. Every data analyst, scientist, engineer, and backend developer needs SQL. Even with NoSQL databases, SQL skills transfer to tools like Spark SQL, BigQuery, and analytics platforms. SQL is timeless.'
  },
  {
    question: 'SQL vs NoSQL - which should I learn first?',
    answer: 'Learn SQL first. Relational databases are more common, SQL teaches data modeling fundamentals, and SQL skills are required for most data jobs. After SQL, learning NoSQL (MongoDB, Redis) is straightforward. Many modern systems use both SQL and NoSQL databases.'
  },
  {
    question: 'How important are window functions?',
    answer: 'Very important for intermediate+ SQL roles. Window functions (ROW_NUMBER, RANK, LAG, LEAD) are essential for analytics and reporting. They\'re commonly asked in SQL interviews. Master them if you want to work in data analytics, business intelligence, or data engineering.'
  },
  {
    question: 'Do I need to learn stored procedures?',
    answer: 'Depends on your role. Data analysts rarely write stored procedures. Database developers and DBAs should know them well. Backend developers may need them for legacy systems. Focus on queries and optimization first, then learn stored procedures if your job requires them.'
  },
  {
    question: 'How do I practice SQL?',
    answer: 'Use online platforms like LeetCode, HackerRank, SQLZoo, or Mode Analytics. Download sample databases (Northwind, Sakila). Practice with real datasets from Kaggle. Work through SQL exercises daily. The key is consistent practice with increasingly complex queries.'
  },
  {
    question: 'What jobs require SQL?',
    answer: 'Data Analyst, Data Scientist, Data Engineer, Business Intelligence Analyst, Database Administrator, Backend Developer, Financial Analyst, Marketing Analyst, Product Analyst - essentially any role involving data. SQL is one of the most universally valuable tech skills.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'Data Analyst',
    description: 'SQL for analytics',
    href: '/roadmap/data-analyst',
    icon: BarChart3,
    color: 'bg-blue-500'
  },
  {
    title: 'Data Engineer',
    description: 'Build data pipelines',
    href: '/roadmap/data-engineer',
    icon: Database,
    color: 'bg-indigo-500'
  },
  {
    title: 'Backend Developer',
    description: 'SQL in applications',
    href: '/roadmap/backend-developer',
    icon: Server,
    color: 'bg-green-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'SQL Roadmap 2026',
  description: 'Complete guide to learning SQL in 2026',
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

export default function SQLRoadmapPage() {
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
          title="SQL Roadmap"
          description="Master database fundamentals, queries, joins, aggregations, window functions, and query optimization. Your complete guide to becoming proficient in SQL in 2026."
          duration="2-4 Months"
          difficulty="Beginner Friendly"
          accentColor="#336791"
        />

        <WhatIsSection
          title="What is SQL?"
          paragraphs={[
            'SQL (Structured Query Language) is the standard language for managing and manipulating relational databases. It\'s used to query data, create and modify database structures, and perform complex data analysis across virtually every industry.',
            'Learning SQL enables you to retrieve insights from data, build database-driven applications, and work in roles ranging from data analyst to backend developer. SQL is one of the most valuable and universally applicable technical skills.'
          ]}
          responsibilities={[
            'Write queries to retrieve and analyze data',
            'Design database schemas and tables',
            'Optimize queries for performance',
            'Create reports and dashboards',
            'Manage data integrity with constraints',
            'Build stored procedures and functions',
            'Work with multiple database platforms'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#336791"
        />

        <SalarySection
          title="SQL-Related Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="SQL is typically a required skill rather than a standalone job title. Strong SQL skills significantly boost salaries for data analysts, data engineers, and backend developers. Advanced SQL (window functions, optimization) is especially valuable."
          gradient="bg-gradient-to-r from-blue-600 to-indigo-600"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Master SQL?"
          description="Get personalized guidance from experienced data professionals who use SQL daily to drive business decisions."
          gradient="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500"
        />
      </main>

      <Footer />
    </>
  );
}
