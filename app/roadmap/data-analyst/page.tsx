'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  BarChart3,
  Database,
  Code,
  TrendingUp,
  PieChart,
  Brain,
  FileSpreadsheet,
  Server,
  Layers,
  Monitor,
  Cloud
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
    title: 'Data Analytics Fundamentals',
    icon: BarChart3,
    color: 'bg-blue-500',
    steps: [
      {
        id: 1,
        title: 'What is Data Analytics',
        description: 'Understand the role of data in business decisions',
        topics: ['Data-Driven Decisions', 'Analytics vs Reporting', 'Business Intelligence', 'Data Lifecycle']
      },
      {
        id: 2,
        title: 'Types of Analytics',
        description: 'Learn the four types of data analytics',
        topics: ['Descriptive', 'Diagnostic', 'Predictive', 'Prescriptive']
      }
    ],
    milestone: 'You understand the data analytics landscape!'
  },
  {
    title: 'Excel Mastery',
    icon: FileSpreadsheet,
    color: 'bg-green-600',
    steps: [
      {
        id: 3,
        title: 'Excel Functions',
        description: 'Master essential Excel formulas',
        topics: ['VLOOKUP/HLOOKUP', 'IF/IFS', 'SUMIF/COUNTIF', 'INDEX/MATCH', 'TEXT Functions']
      },
      {
        id: 4,
        title: 'Data Analysis in Excel',
        description: 'Analyze and visualize data in Excel',
        topics: ['Pivot Tables', 'Charts & Graphs', 'Conditional Formatting', 'Data Validation']
      },
      {
        id: 5,
        title: 'Advanced Excel',
        description: 'Power features for analysis',
        topics: ['Power Query', 'Power Pivot', 'Macros Basics', 'Dashboard Creation']
      }
    ],
    milestone: 'You can analyze data in Excel!'
  },
  {
    title: 'SQL & Databases',
    icon: Database,
    color: 'bg-orange-500',
    steps: [
      {
        id: 6,
        title: 'SQL Fundamentals',
        description: 'Query databases effectively',
        topics: ['SELECT', 'WHERE', 'ORDER BY', 'GROUP BY', 'HAVING']
      },
      {
        id: 7,
        title: 'SQL Joins & Subqueries',
        description: 'Combine data from multiple tables',
        topics: ['INNER JOIN', 'LEFT/RIGHT JOIN', 'Subqueries', 'CTEs', 'UNION']
      },
      {
        id: 8,
        title: 'Advanced SQL',
        description: 'Complex queries and optimization',
        topics: ['Window Functions', 'CASE Statements', 'Query Optimization', 'Indexing']
      }
    ],
    milestone: 'You can extract insights from databases!'
  },
  {
    title: 'Python for Data Analysis',
    icon: Code,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 9,
        title: 'Python Basics',
        description: 'Learn Python programming fundamentals',
        topics: ['Variables', 'Data Types', 'Loops', 'Functions', 'Lists & Dictionaries']
      },
      {
        id: 10,
        title: 'Pandas & NumPy',
        description: 'Data manipulation libraries',
        topics: ['DataFrames', 'Series', 'Filtering', 'Grouping', 'Merging', 'NumPy Arrays']
      },
      {
        id: 11,
        title: 'Data Cleaning',
        description: 'Prepare data for analysis',
        topics: ['Missing Values', 'Duplicates', 'Outliers', 'Data Types', 'Transformation']
      }
    ],
    milestone: 'You can wrangle data with Python!'
  },
  {
    title: 'Statistics',
    icon: TrendingUp,
    color: 'bg-purple-500',
    steps: [
      {
        id: 12,
        title: 'Descriptive Statistics',
        description: 'Summarize and describe data',
        topics: ['Mean/Median/Mode', 'Standard Deviation', 'Variance', 'Percentiles', 'Distribution']
      },
      {
        id: 13,
        title: 'Inferential Statistics',
        description: 'Draw conclusions from data',
        topics: ['Hypothesis Testing', 'p-values', 'Confidence Intervals', 'A/B Testing']
      },
      {
        id: 14,
        title: 'Correlation & Regression',
        description: 'Understand relationships in data',
        topics: ['Correlation', 'Linear Regression', 'Multiple Regression', 'R-squared']
      }
    ]
  },
  {
    title: 'Data Visualization',
    icon: PieChart,
    color: 'bg-pink-500',
    steps: [
      {
        id: 15,
        title: 'Visualization Principles',
        description: 'Design effective visualizations',
        topics: ['Chart Selection', 'Color Theory', 'Storytelling', 'Best Practices']
      },
      {
        id: 16,
        title: 'Python Visualization',
        description: 'Create charts with Python',
        topics: ['Matplotlib', 'Seaborn', 'Plotly', 'Interactive Charts']
      },
      {
        id: 17,
        title: 'Tableau',
        description: 'Build interactive dashboards',
        topics: ['Worksheets', 'Dashboards', 'Calculations', 'Filters', 'Parameters']
      },
      {
        id: 18,
        title: 'Power BI',
        description: 'Microsoft BI tool mastery',
        topics: ['Data Modeling', 'DAX', 'Reports', 'Dashboards', 'Publishing']
      }
    ],
    milestone: 'You can visualize data professionally!'
  },
  {
    title: 'Machine Learning Basics',
    icon: Brain,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 19,
        title: 'ML Fundamentals',
        description: 'Introduction to machine learning',
        topics: ['Supervised Learning', 'Unsupervised Learning', 'Training/Testing', 'Model Evaluation']
      },
      {
        id: 20,
        title: 'Common Algorithms',
        description: 'Learn key ML algorithms',
        topics: ['Linear Regression', 'Logistic Regression', 'Decision Trees', 'K-Means Clustering']
      }
    ]
  },
  {
    title: 'Big Data & Tools',
    icon: Server,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 21,
        title: 'Big Data Concepts',
        description: 'Handle large datasets',
        topics: ['Hadoop', 'Spark', 'Data Lakes', 'ETL Pipelines']
      },
      {
        id: 22,
        title: 'Cloud Analytics',
        description: 'Cloud-based analytics platforms',
        topics: ['AWS', 'Google BigQuery', 'Azure Synapse', 'Snowflake']
      }
    ],
    milestone: 'You are a professional Data Analyst!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$55K - $75K', avg: '$65K' },
  { level: 'Mid (2-5 yrs)', range: '$75K - $100K', avg: '$87K' },
  { level: 'Senior (5-8 yrs)', range: '$100K - $130K', avg: '$115K' },
  { level: 'Lead (8+ yrs)', range: '$130K - $170K+', avg: '$145K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹3L - ₹6L', avg: '₹4.5L' },
  { level: 'Junior (1-3 yrs)', range: '₹5L - ₹10L', avg: '₹7L' },
  { level: 'Mid (3-5 yrs)', range: '₹10L - ₹18L', avg: '₹13L' },
  { level: 'Senior (5+ yrs)', range: '₹18L - ₹35L+', avg: '₹25L' }
];

// Project Ideas
const projects = [
  {
    title: 'Sales Dashboard',
    level: 'Beginner' as const,
    description: 'Excel dashboard analyzing sales trends',
    skills: ['Excel', 'Pivot Tables', 'Charts']
  },
  {
    title: 'Customer Segmentation',
    level: 'Intermediate' as const,
    description: 'Segment customers using clustering',
    skills: ['Python', 'K-Means', 'Pandas']
  },
  {
    title: 'SQL Data Analysis',
    level: 'Beginner' as const,
    description: 'Analyze e-commerce database',
    skills: ['SQL', 'Joins', 'Aggregations']
  },
  {
    title: 'Interactive Dashboard',
    level: 'Intermediate' as const,
    description: 'Build Tableau/Power BI dashboard',
    skills: ['Tableau', 'Power BI', 'Storytelling']
  },
  {
    title: 'A/B Test Analysis',
    level: 'Advanced' as const,
    description: 'Analyze A/B test results statistically',
    skills: ['Statistics', 'Python', 'Hypothesis Testing']
  },
  {
    title: 'Churn Prediction',
    level: 'Advanced' as const,
    description: 'Predict customer churn with ML',
    skills: ['Python', 'Scikit-learn', 'Logistic Regression']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to become a data analyst?',
    answer: 'With 3-4 hours of daily practice, you can become job-ready in 4-6 months. This includes Excel, SQL, Python basics, statistics, and visualization tools. Mastering advanced analytics and ML typically takes 1-2 years of professional experience.'
  },
  {
    question: 'Do I need a degree to become a data analyst?',
    answer: 'No, a degree is not strictly required. Many successful data analysts are self-taught or have completed bootcamps. However, a background in math, statistics, economics, or computer science can be helpful. Employers value practical skills and portfolio projects.'
  },
  {
    question: 'Should I learn Python or R for data analysis?',
    answer: 'We recommend Python due to its versatility and job market demand. Python is used not just for analytics but also for automation, web scraping, and machine learning. R is excellent for statistical analysis but has a narrower scope. Learn Python first, then R if needed.'
  },
  {
    question: 'Is SQL important for data analysts?',
    answer: 'SQL is essential - it is the most important skill for data analysts. Almost every company stores data in databases, and SQL is how you access it. You will use SQL daily in most data analyst roles. Master it thoroughly.'
  },
  {
    question: 'Tableau vs Power BI - which should I learn?',
    answer: 'Both are valuable. Power BI is more common in companies using Microsoft products and is often cheaper. Tableau is considered more powerful for complex visualizations and is popular in larger enterprises. Learn one deeply, then pick up the other - skills transfer well.'
  },
  {
    question: 'What is the difference between data analyst and data scientist?',
    answer: 'Data analysts focus on analyzing existing data to answer business questions using SQL, Excel, and visualization tools. Data scientists build predictive models and work with machine learning. Analysts typically need less programming and math. Many analysts transition to data science later.'
  },
  {
    question: 'How do I build a data analyst portfolio?',
    answer: 'Create 3-5 projects showcasing different skills: SQL analysis, Python data cleaning, visualization dashboard, and a statistical analysis. Use real datasets from Kaggle or public sources. Document your process, insights, and business recommendations. Host on GitHub and create a portfolio website.'
  },
  {
    question: 'What industries hire the most data analysts?',
    answer: 'Data analysts are needed everywhere: tech, finance, healthcare, retail, marketing, consulting, and government. Tech and finance typically pay the highest. E-commerce and marketing offer great entry-level opportunities. Choose an industry that interests you.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'Full Stack Developer',
    description: 'Build complete web applications',
    href: '/roadmap/full-stack-developer',
    icon: Layers,
    color: 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66]'
  },
  {
    title: 'Backend Developer',
    description: 'Server-side programming and databases',
    href: '/roadmap/backend-developer',
    icon: Server,
    color: 'bg-green-500'
  },
  {
    title: 'Frontend Developer',
    description: 'Build beautiful user interfaces',
    href: '/roadmap/frontend-developer',
    icon: Monitor,
    color: 'bg-purple-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Data Analyst Roadmap 2026',
  description: 'Complete guide to becoming a data analyst in 2026',
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

export default function DataAnalystRoadmapPage() {
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
          title="Data Analyst Roadmap"
          description="Master Excel, SQL, Python, Statistics, and visualization tools. Your complete guide to becoming a professional data analyst in 2026."
          duration="4-6 Months"
          difficulty="Beginner Friendly"
          accentColor="#3B82F6"
        />

        <WhatIsSection
          title="What is a Data Analyst?"
          paragraphs={[
            'Data analysts collect, clean, and interpret data to help businesses make informed decisions. They transform raw data into actionable insights using tools like Excel, SQL, Python, and visualization platforms.',
            'As a data analyst, you will query databases, create reports and dashboards, identify trends, and communicate findings to stakeholders. It is a high-demand career that bridges the gap between data and business strategy.'
          ]}
          responsibilities={[
            'Collect and clean data from various sources',
            'Write SQL queries to extract insights from databases',
            'Create visualizations and dashboards in Tableau/Power BI',
            'Perform statistical analysis to identify trends',
            'Present findings to stakeholders and leadership',
            'Collaborate with business teams to understand requirements',
            'Automate reporting processes with Python/Excel',
            'Ensure data quality and accuracy'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#3B82F6"
        />

        <SalarySection
          title="Data Analyst Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Data analysts with Python, SQL, and Tableau expertise are in highest demand. Specializing in a domain (finance, healthcare, marketing) can increase your value. Senior analysts at top tech companies can earn $150K+ with bonuses."
          gradient="bg-gradient-to-r from-blue-500 to-cyan-500"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your Data Analyst Journey?"
          description="Get personalized guidance from experienced data professionals who have helped hundreds break into data analytics."
          gradient="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500"
        />
      </main>

      <Footer />
    </>
  );
}
