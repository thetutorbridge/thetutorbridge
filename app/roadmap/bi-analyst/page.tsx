'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  BarChart3,
  Database,
  Table,
  PieChart,
  TrendingUp,
  FileSpreadsheet,
  Settings,
  Briefcase,
  Globe,
  Layers,
  Zap,
  LineChart
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
    title: 'Business Fundamentals',
    icon: Briefcase,
    color: 'bg-blue-500',
    steps: [
      {
        id: 1,
        title: 'Business Acumen',
        description: 'Understand business context',
        topics: ['Business Models', 'KPIs', 'Revenue Metrics', 'Industry Knowledge', 'Stakeholder Management']
      },
      {
        id: 2,
        title: 'Analytics Mindset',
        description: 'Think analytically',
        topics: ['Problem Framing', 'Hypothesis Testing', 'Root Cause Analysis', 'Data-Driven Decisions']
      }
    ],
    milestone: 'You understand business context!'
  },
  {
    title: 'SQL & Databases',
    icon: Database,
    color: 'bg-green-500',
    steps: [
      {
        id: 3,
        title: 'SQL Fundamentals',
        description: 'Query databases',
        topics: ['SELECT', 'JOINs', 'GROUP BY', 'Subqueries', 'Window Functions']
      },
      {
        id: 4,
        title: 'Advanced SQL',
        description: 'Complex queries',
        topics: ['CTEs', 'Recursive Queries', 'Performance Tuning', 'Stored Procedures']
      },
      {
        id: 5,
        title: 'Data Warehousing',
        description: 'BI data architecture',
        topics: ['Star Schema', 'Fact & Dimension Tables', 'ETL Basics', 'Data Modeling']
      }
    ],
    milestone: 'You can query any database!'
  },
  {
    title: 'Excel & Spreadsheets',
    icon: FileSpreadsheet,
    color: 'bg-emerald-500',
    steps: [
      {
        id: 6,
        title: 'Advanced Excel',
        description: 'Master Excel for BI',
        topics: ['Pivot Tables', 'VLOOKUP/XLOOKUP', 'Array Formulas', 'Data Validation', 'Macros']
      },
      {
        id: 7,
        title: 'Financial Modeling',
        description: 'Business modeling',
        topics: ['Financial Functions', 'Scenario Analysis', 'What-If Analysis', 'Data Tables']
      }
    ]
  },
  {
    title: 'Data Visualization',
    icon: PieChart,
    color: 'bg-purple-500',
    steps: [
      {
        id: 8,
        title: 'Visualization Principles',
        description: 'Effective visual communication',
        topics: ['Chart Types', 'Visual Encoding', 'Color Theory', 'Dashboard Design', 'Storytelling']
      },
      {
        id: 9,
        title: 'Power BI',
        description: 'Microsoft BI tool',
        topics: ['Data Import', 'DAX', 'Visualizations', 'Reports', 'Dashboards', 'Power Query']
      },
      {
        id: 10,
        title: 'Tableau',
        description: 'Leading visualization tool',
        topics: ['Connections', 'Calculations', 'Visualizations', 'Dashboards', 'Tableau Server']
      }
    ],
    milestone: 'You can create powerful visualizations!'
  },
  {
    title: 'ETL & Data Preparation',
    icon: Settings,
    color: 'bg-orange-500',
    steps: [
      {
        id: 11,
        title: 'Data Cleaning',
        description: 'Prepare data for analysis',
        topics: ['Missing Data', 'Outliers', 'Data Types', 'Standardization', 'Validation']
      },
      {
        id: 12,
        title: 'ETL Tools',
        description: 'Data transformation',
        topics: ['Power Query', 'SSIS', 'Alteryx', 'Python for ETL', 'Data Pipelines']
      }
    ]
  },
  {
    title: 'Statistical Analysis',
    icon: TrendingUp,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 13,
        title: 'Descriptive Statistics',
        description: 'Summarize data',
        topics: ['Central Tendency', 'Variance', 'Distributions', 'Correlation', 'Percentiles']
      },
      {
        id: 14,
        title: 'Business Statistics',
        description: 'Statistical methods for BI',
        topics: ['Forecasting', 'Trend Analysis', 'Cohort Analysis', 'A/B Testing', 'Regression Basics']
      }
    ]
  },
  {
    title: 'Reporting & Dashboards',
    icon: LineChart,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 15,
        title: 'Report Development',
        description: 'Build business reports',
        topics: ['Report Requirements', 'KPI Dashboards', 'Automated Reports', 'Self-Service BI']
      },
      {
        id: 16,
        title: 'Advanced Dashboards',
        description: 'Interactive dashboards',
        topics: ['Drill-Down', 'Filters', 'Parameters', 'Real-Time Data', 'Mobile Dashboards']
      }
    ],
    milestone: 'You can build complete BI solutions!'
  },
  {
    title: 'Cloud BI Platforms',
    icon: Globe,
    color: 'bg-sky-500',
    steps: [
      {
        id: 17,
        title: 'Cloud Data Platforms',
        description: 'Modern BI infrastructure',
        topics: ['Snowflake', 'BigQuery', 'Azure Synapse', 'Redshift', 'Databricks']
      },
      {
        id: 18,
        title: 'Cloud BI Tools',
        description: 'Cloud visualization',
        topics: ['Looker', 'Google Data Studio', 'QuickSight', 'Metabase', 'Mode']
      }
    ]
  },
  {
    title: 'Advanced Analytics',
    icon: Zap,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 19,
        title: 'Python for BI',
        description: 'Programming for analysis',
        topics: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter']
      },
      {
        id: 20,
        title: 'Predictive Analytics',
        description: 'Forward-looking insights',
        topics: ['Time Series', 'Forecasting', 'Segmentation', 'Propensity Models']
      }
    ],
    milestone: 'You are a professional BI Analyst!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$55K - $75K', avg: '$65K' },
  { level: 'Mid (2-5 yrs)', range: '$75K - $100K', avg: '$87K' },
  { level: 'Senior (5-8 yrs)', range: '$100K - $135K', avg: '$115K' },
  { level: 'Lead/Manager (8+ yrs)', range: '$130K - $170K+', avg: '$148K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹4L - ₹7L', avg: '₹5.5L' },
  { level: 'Junior (1-3 yrs)', range: '₹6L - ₹12L', avg: '₹9L' },
  { level: 'Mid (3-5 yrs)', range: '₹12L - ₹22L', avg: '₹16L' },
  { level: 'Senior (5+ yrs)', range: '₹20L - ₹40L+', avg: '₹28L' }
];

// Project Ideas
const projects = [
  {
    title: 'Sales Dashboard',
    level: 'Beginner' as const,
    description: 'Sales performance dashboard',
    skills: ['Power BI', 'SQL', 'KPIs', 'Charts']
  },
  {
    title: 'Financial Report',
    level: 'Beginner' as const,
    description: 'Monthly financial reporting',
    skills: ['Excel', 'Pivot Tables', 'Formulas', 'Charts']
  },
  {
    title: 'Customer Analytics',
    level: 'Intermediate' as const,
    description: 'Customer segmentation analysis',
    skills: ['SQL', 'Tableau', 'Cohorts', 'RFM Analysis']
  },
  {
    title: 'Executive Dashboard',
    level: 'Intermediate' as const,
    description: 'C-suite executive dashboard',
    skills: ['Multiple Data Sources', 'KPIs', 'Drill-Down', 'Storytelling']
  },
  {
    title: 'Marketing ROI Analysis',
    level: 'Advanced' as const,
    description: 'Multi-channel marketing attribution',
    skills: ['Python', 'Attribution Models', 'Statistical Analysis']
  },
  {
    title: 'Predictive Sales Model',
    level: 'Advanced' as const,
    description: 'Sales forecasting system',
    skills: ['Time Series', 'Machine Learning', 'Python', 'Automation']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to become a BI Analyst?',
    answer: 'With dedicated study, you can learn BI fundamentals (SQL, Excel, one visualization tool) in 3-4 months. Becoming job-ready with dashboards, data modeling, and business context takes 6-9 months. Mastering advanced analytics and multiple tools takes 1-2 years.'
  },
  {
    question: 'Power BI vs Tableau - which should I learn?',
    answer: 'Both are excellent. Power BI integrates well with Microsoft ecosystems and is often cheaper. Tableau offers more visualization flexibility and is popular at larger companies. Learn one deeply first. Many companies use both - skills transfer between tools.'
  },
  {
    question: 'Do I need programming skills for BI?',
    answer: 'SQL is essential - you must know it well. Python is increasingly valuable for advanced analytics and automation. DAX (Power BI) and Tableau calculations are domain-specific languages. Start with SQL, add Python later for career growth.'
  },
  {
    question: 'BI Analyst vs Data Analyst - what\'s the difference?',
    answer: 'Significant overlap exists. BI Analysts focus more on dashboards, reporting, and business metrics. Data Analysts may do more statistical analysis and ad-hoc exploration. BI often works with established metrics; Data Analysts may define new ones. Titles vary by company.'
  },
  {
    question: 'Is BI Analyst a good career in 2026?',
    answer: 'Yes, every company needs data-driven decisions. BI demand grows as businesses collect more data. The role is evolving - modern BI includes cloud platforms and some ML. Career paths lead to Senior BI, Analytics Manager, or Data Engineering.'
  },
  {
    question: 'How important is business knowledge?',
    answer: 'Critical. Technical skills without business context produce irrelevant reports. Understand KPIs, business processes, and industry metrics. The best BI Analysts translate business questions into data insights. Domain expertise often matters as much as technical skills.'
  },
  {
    question: 'What cloud platforms should I learn?',
    answer: 'Start with one major platform: Snowflake (popular, SQL-based), BigQuery (Google, generous free tier), or Azure Synapse (Microsoft ecosystem). Modern BI increasingly runs on cloud data warehouses. Cloud skills differentiate candidates.'
  },
  {
    question: 'How do I build a BI portfolio?',
    answer: 'Create dashboards using public datasets (Kaggle, data.gov). Solve realistic business problems - sales, marketing, HR analytics. Document your process and insights, not just visuals. Share on Tableau Public, GitHub, or personal website. Show SQL queries and data prep.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'Data Analyst',
    description: 'Broader analytics skills',
    href: '/roadmap/data-analyst',
    icon: BarChart3,
    color: 'bg-blue-500'
  },
  {
    title: 'SQL',
    description: 'Deep SQL knowledge',
    href: '/roadmap/sql',
    icon: Database,
    color: 'bg-indigo-500'
  },
  {
    title: 'Data Engineer',
    description: 'Build data pipelines',
    href: '/roadmap/data-engineer',
    icon: Layers,
    color: 'bg-cyan-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Business Intelligence Analyst Roadmap 2026',
  description: 'Complete guide to becoming a BI Analyst in 2026',
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

export default function BIAnalystRoadmapPage() {
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
          title="Business Intelligence Analyst Roadmap"
          description="Master SQL, data visualization, Power BI, Tableau, data modeling, and business analytics. Your complete guide to becoming a professional BI Analyst in 2026."
          duration="4-8 Months"
          difficulty="Beginner Friendly"
          accentColor="#F59E0B"
        />

        <WhatIsSection
          title="What is a Business Intelligence Analyst?"
          paragraphs={[
            'Business Intelligence Analysts transform raw data into actionable insights that drive business decisions. They build dashboards, create reports, and analyze data to help organizations understand performance and identify opportunities.',
            'As a BI Analyst, you will query databases, design visualizations, build interactive dashboards, and communicate insights to stakeholders across all levels of the organization.'
          ]}
          responsibilities={[
            'Write SQL queries to extract and analyze data',
            'Build dashboards in Power BI or Tableau',
            'Create automated reports and KPI tracking',
            'Design data models for analytics',
            'Collaborate with stakeholders on requirements',
            'Perform ad-hoc analysis for business questions',
            'Ensure data quality and accuracy'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#F59E0B"
        />

        <SalarySection
          title="BI Analyst Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="BI Analysts with Python skills and cloud platform experience command higher salaries. Finance and tech industries pay more. Senior BI roles lead to Analytics Manager or transition to Data Engineering for higher compensation."
          gradient="bg-gradient-to-r from-amber-500 to-orange-500"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your BI Journey?"
          description="Get personalized guidance from experienced BI professionals who have built data-driven organizations."
          gradient="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"
        />
      </main>

      <Footer />
    </>
  );
}
