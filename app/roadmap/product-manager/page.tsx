'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Lightbulb,
  Users,
  Target,
  Map,
  Palette,
  Rocket,
  BarChart3,
  MessageSquare,
  Settings,
  Shield,
  Layers,
  TrendingUp
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
    title: 'PM Fundamentals',
    icon: Lightbulb,
    color: 'bg-blue-500',
    steps: [
      {
        id: 1,
        title: 'What is Product Management?',
        description: 'Understand the PM role',
        topics: ['PM vs Project Management', 'Types of PMs', 'Day in the Life', 'Key Skills', 'Career Paths']
      },
      {
        id: 2,
        title: 'Product Lifecycle',
        description: 'Understand product stages',
        topics: ['Introduction', 'Growth', 'Maturity', 'Decline', 'Product-Market Fit']
      }
    ],
    milestone: 'You understand PM fundamentals!'
  },
  {
    title: 'Discovery & Research',
    icon: Users,
    color: 'bg-purple-500',
    steps: [
      {
        id: 3,
        title: 'User Research',
        description: 'Understand your users',
        topics: ['User Interviews', 'Surveys', 'Personas', 'Jobs-to-be-Done', 'Ethnographic Research']
      },
      {
        id: 4,
        title: 'Market Analysis',
        description: 'Analyze the market',
        topics: ['Market Sizing', 'Competitive Analysis', 'SWOT', 'Porter\'s Five Forces', 'Trends']
      },
      {
        id: 5,
        title: 'Problem Identification',
        description: 'Find problems worth solving',
        topics: ['Problem Framing', 'Opportunity Assessment', 'Validation', 'Prioritization']
      }
    ],
    milestone: 'You can conduct product discovery!'
  },
  {
    title: 'Strategy & Vision',
    icon: Target,
    color: 'bg-orange-500',
    steps: [
      {
        id: 6,
        title: 'Product Strategy',
        description: 'Define product direction',
        topics: ['Vision & Mission', 'Product Strategy', 'OKRs', 'North Star Metric', 'Strategic Bets']
      },
      {
        id: 7,
        title: 'Value Proposition',
        description: 'Articulate product value',
        topics: ['Value Proposition Canvas', 'USP', 'Positioning', 'Messaging', 'Differentiation']
      }
    ]
  },
  {
    title: 'Planning & Roadmapping',
    icon: Map,
    color: 'bg-green-500',
    steps: [
      {
        id: 8,
        title: 'Product Roadmap',
        description: 'Plan product development',
        topics: ['Roadmap Types', 'Timeline vs Outcome-Based', 'Themes', 'Now/Next/Later', 'Communication']
      },
      {
        id: 9,
        title: 'Prioritization',
        description: 'Decide what to build',
        topics: ['RICE', 'ICE', 'MoSCoW', 'Kano Model', 'Opportunity Scoring', 'Stack Ranking']
      },
      {
        id: 10,
        title: 'Requirements',
        description: 'Document what to build',
        topics: ['PRDs', 'User Stories', 'Acceptance Criteria', 'Job Stories', 'Story Mapping']
      }
    ],
    milestone: 'You can plan and prioritize!'
  },
  {
    title: 'Design & UX',
    icon: Palette,
    color: 'bg-pink-500',
    steps: [
      {
        id: 11,
        title: 'Design Thinking',
        description: 'Human-centered approach',
        topics: ['Empathize', 'Define', 'Ideate', 'Prototype', 'Test']
      },
      {
        id: 12,
        title: 'UX Fundamentals',
        description: 'Understand user experience',
        topics: ['Wireframing', 'Prototyping', 'Usability Testing', 'Information Architecture', 'Design Reviews']
      }
    ]
  },
  {
    title: 'Development & Agile',
    icon: Settings,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 13,
        title: 'Agile Methodology',
        description: 'Work with engineering',
        topics: ['Scrum', 'Kanban', 'Sprint Planning', 'Daily Standups', 'Retrospectives']
      },
      {
        id: 14,
        title: 'Technical Knowledge',
        description: 'Understand technology',
        topics: ['APIs', 'Databases', 'Frontend/Backend', 'Technical Constraints', 'Technical Debt']
      },
      {
        id: 15,
        title: 'Working with Engineers',
        description: 'Collaborate effectively',
        topics: ['Grooming', 'Estimation', 'Trade-offs', 'Scope Management', 'Release Planning']
      }
    ]
  },
  {
    title: 'Launch & Growth',
    icon: Rocket,
    color: 'bg-red-500',
    steps: [
      {
        id: 16,
        title: 'Product Launch',
        description: 'Go to market',
        topics: ['Launch Planning', 'GTM Strategy', 'Beta Testing', 'Feature Flags', 'Rollout Strategies']
      },
      {
        id: 17,
        title: 'Growth Strategies',
        description: 'Scale the product',
        topics: ['Growth Loops', 'Acquisition', 'Activation', 'Retention', 'Growth Hacking']
      }
    ],
    milestone: 'You can launch and grow products!'
  },
  {
    title: 'Analytics & Metrics',
    icon: BarChart3,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 18,
        title: 'Product Metrics',
        description: 'Measure success',
        topics: ['DAU/MAU', 'Retention', 'Churn', 'LTV', 'CAC', 'NPS', 'Conversion Rates']
      },
      {
        id: 19,
        title: 'Data-Driven Decisions',
        description: 'Use data effectively',
        topics: ['A/B Testing', 'Cohort Analysis', 'Funnel Analysis', 'Dashboards', 'SQL Basics']
      }
    ]
  },
  {
    title: 'Stakeholder Management',
    icon: MessageSquare,
    color: 'bg-teal-500',
    steps: [
      {
        id: 20,
        title: 'Communication',
        description: 'Communicate effectively',
        topics: ['Storytelling', 'Presentations', 'Writing', 'Active Listening', 'Difficult Conversations']
      },
      {
        id: 21,
        title: 'Leadership',
        description: 'Lead without authority',
        topics: ['Influence', 'Alignment', 'Conflict Resolution', 'Building Buy-in', 'Managing Up']
      }
    ],
    milestone: 'You are a professional Product Manager!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Associate PM (0-2 yrs)', range: '$80K - $110K', avg: '$95K' },
  { level: 'PM (2-5 yrs)', range: '$110K - $160K', avg: '$135K' },
  { level: 'Senior PM (5-8 yrs)', range: '$160K - $220K', avg: '$185K' },
  { level: 'Director/GPM (8+ yrs)', range: '$220K - $350K+', avg: '$270K' }
];

const indiaSalaries = [
  { level: 'Associate PM (0-2 yrs)', range: '₹10L - ₹18L', avg: '₹14L' },
  { level: 'PM (2-5 yrs)', range: '₹18L - ₹35L', avg: '₹25L' },
  { level: 'Senior PM (5-8 yrs)', range: '₹35L - ₹55L', avg: '₹45L' },
  { level: 'Director (8+ yrs)', range: '₹55L - ₹1Cr+', avg: '₹70L' }
];

// Project Ideas
const projects = [
  {
    title: 'Product Teardown',
    level: 'Beginner' as const,
    description: 'Analyze a popular product deeply',
    skills: ['Analysis', 'UX Review', 'Feature Mapping']
  },
  {
    title: 'User Research Project',
    level: 'Beginner' as const,
    description: 'Conduct interviews and create personas',
    skills: ['Interviews', 'Personas', 'Insights']
  },
  {
    title: 'Feature Spec Document',
    level: 'Intermediate' as const,
    description: 'Write a complete PRD for a new feature',
    skills: ['PRD', 'User Stories', 'Requirements']
  },
  {
    title: 'Product Strategy Case',
    level: 'Intermediate' as const,
    description: 'Develop strategy for a product problem',
    skills: ['Strategy', 'Prioritization', 'Roadmap']
  },
  {
    title: 'Metrics Dashboard',
    level: 'Advanced' as const,
    description: 'Design metrics framework and dashboard',
    skills: ['Analytics', 'KPIs', 'Data Analysis']
  },
  {
    title: 'Full Product Concept',
    level: 'Advanced' as const,
    description: 'End-to-end product from idea to GTM',
    skills: ['Discovery', 'Strategy', 'Design', 'Launch']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to become a Product Manager?',
    answer: 'Transitioning to PM typically takes 6-12 months of dedicated preparation. This includes learning PM frameworks, building a portfolio of case studies, and networking. Many PMs transition from engineering, design, analytics, or consulting. Breaking into FAANG-level PM roles may take longer.'
  },
  {
    question: 'Do I need a technical background to be a PM?',
    answer: 'Not necessarily, but technical understanding helps significantly. You don\'t need to code, but understanding how products are built helps you communicate with engineers and make better trade-offs. Technical PMs are more common at B2B/infrastructure companies. Learn basic technical concepts.'
  },
  {
    question: 'Do I need an MBA to become a Product Manager?',
    answer: 'No, an MBA is not required. Many successful PMs don\'t have MBAs. However, top MBA programs (Stanford, HBS, Wharton) have strong PM recruiting pipelines. An MBA can help with career transitions and is valued at some companies, but skills and experience matter more.'
  },
  {
    question: 'What is the difference between PM and Product Owner?',
    answer: 'Product Managers focus on strategy, vision, and market fit - the "why" and "what." Product Owners focus on execution within Agile teams - managing backlogs and sprints. In many companies, one person does both. PM is typically more senior/strategic, PO more tactical.'
  },
  {
    question: 'Which PM tools should I learn?',
    answer: 'Essential tools: Jira/Linear (project management), Figma (design collaboration), Amplitude/Mixpanel (analytics), Notion/Confluence (documentation), Miro (collaboration). Also learn SQL basics for data analysis. Tools vary by company, but concepts transfer.'
  },
  {
    question: 'How do I build a PM portfolio without PM experience?',
    answer: 'Create product teardowns analyzing existing products. Do mock PM projects with full PRDs and roadmaps. Write about product thinking on Medium/LinkedIn. Participate in product communities. Take ownership of product decisions in your current role, even if not a PM title.'
  },
  {
    question: 'What types of PM roles exist?',
    answer: 'Growth PM (acquisition, retention), Platform PM (internal tools, APIs), Technical PM (infrastructure), Data PM (data products), AI PM (AI/ML products), Design PM (design tools), and more. Most start as generalist PMs before specializing. Choose based on your background and interests.'
  },
  {
    question: 'How do I prepare for PM interviews?',
    answer: 'Practice product design questions (design X for Y), product strategy (how would you improve X), metrics (how would you measure success), estimation, and behavioral questions. Use frameworks but don\'t be robotic. Do mock interviews. Study the company\'s products before interviewing.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'Data Analyst',
    description: 'Analytics for PMs',
    href: '/roadmap/data-analyst',
    icon: BarChart3,
    color: 'bg-blue-500'
  },
  {
    title: 'Full Stack Developer',
    description: 'Technical understanding',
    href: '/roadmap/full-stack-developer',
    icon: Layers,
    color: 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66]'
  },
  {
    title: 'System Design',
    description: 'Technical architecture',
    href: '/roadmap/system-design',
    icon: Settings,
    color: 'bg-purple-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Product Manager Roadmap 2026',
  description: 'Complete guide to becoming a Product Manager in 2026',
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

export default function ProductManagerRoadmapPage() {
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
          title="Product Manager Roadmap"
          description="Master product strategy, user research, roadmapping, agile, and stakeholder management. Your complete guide to becoming a professional Product Manager in 2026."
          duration="6-12 Months"
          difficulty="Intermediate"
          accentColor="#6366F1"
        />

        <WhatIsSection
          title="What is a Product Manager?"
          paragraphs={[
            'Product Managers are responsible for the strategy, roadmap, and feature definition of a product. They work at the intersection of business, technology, and user experience to ensure the product delivers value to users and the business.',
            'As a Product Manager, you will define product vision, conduct user research, prioritize features, work with engineering and design teams, and measure product success through data and user feedback.'
          ]}
          responsibilities={[
            'Define product vision and strategy',
            'Conduct user research and market analysis',
            'Create and maintain the product roadmap',
            'Write requirements and user stories',
            'Prioritize features and manage backlog',
            'Collaborate with engineering, design, and stakeholders',
            'Analyze metrics and drive product improvements'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#6366F1"
        />

        <SalarySection
          title="Product Manager Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="PM salaries at FAANG companies are significantly higher (often 50%+ more). Technical PM and AI PM roles command premium salaries. Stock compensation can significantly increase total compensation at tech companies."
          gradient="bg-gradient-to-r from-indigo-500 to-purple-600"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your Product Management Journey?"
          description="Get personalized guidance from experienced Product Managers who have built successful products."
          gradient="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        />
      </main>

      <Footer />
    </>
  );
}
