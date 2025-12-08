'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Building2,
  Code,
  Layers,
  Database,
  Globe,
  Cloud,
  Shield,
  Users,
  Settings,
  FileText,
  Network,
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
    title: 'Software Engineering Foundation',
    icon: Code,
    color: 'bg-blue-500',
    steps: [
      {
        id: 1,
        title: 'Programming Mastery',
        description: 'Deep language expertise',
        topics: ['Multiple Languages', 'Design Patterns', 'Clean Code', 'Code Review', 'Technical Debt']
      },
      {
        id: 2,
        title: 'Software Development',
        description: 'Professional development',
        topics: ['SDLC', 'Agile/Scrum', 'Version Control', 'CI/CD', 'DevOps Practices']
      }
    ],
    milestone: 'Strong engineering foundation!'
  },
  {
    title: 'System Design Fundamentals',
    icon: Network,
    color: 'bg-purple-500',
    steps: [
      {
        id: 3,
        title: 'Scalability Concepts',
        description: 'Design for scale',
        topics: ['Horizontal vs Vertical', 'Load Balancing', 'Caching', 'Database Sharding', 'CDNs']
      },
      {
        id: 4,
        title: 'Reliability Engineering',
        description: 'Build reliable systems',
        topics: ['Availability', 'Fault Tolerance', 'Disaster Recovery', 'SLAs/SLOs', 'Redundancy']
      },
      {
        id: 5,
        title: 'Performance',
        description: 'Optimize performance',
        topics: ['Latency', 'Throughput', 'Bottlenecks', 'Profiling', 'Optimization']
      }
    ],
    milestone: 'You understand system design!'
  },
  {
    title: 'Architecture Patterns',
    icon: Layers,
    color: 'bg-green-500',
    steps: [
      {
        id: 6,
        title: 'Application Architecture',
        description: 'Structure applications',
        topics: ['Layered Architecture', 'Clean Architecture', 'Hexagonal', 'DDD', 'CQRS']
      },
      {
        id: 7,
        title: 'Microservices',
        description: 'Distributed systems',
        topics: ['Service Decomposition', 'API Gateway', 'Service Mesh', 'Event-Driven', 'Saga Pattern']
      },
      {
        id: 8,
        title: 'Integration Patterns',
        description: 'System integration',
        topics: ['REST', 'GraphQL', 'gRPC', 'Message Queues', 'Event Sourcing']
      }
    ]
  },
  {
    title: 'Data Architecture',
    icon: Database,
    color: 'bg-orange-500',
    steps: [
      {
        id: 9,
        title: 'Database Design',
        description: 'Data storage decisions',
        topics: ['SQL vs NoSQL', 'Data Modeling', 'Normalization', 'Indexing', 'Partitioning']
      },
      {
        id: 10,
        title: 'Distributed Data',
        description: 'Data at scale',
        topics: ['CAP Theorem', 'Consistency Patterns', 'Replication', 'Consensus', 'Event Streaming']
      }
    ],
    milestone: 'You can design data systems!'
  },
  {
    title: 'Cloud Architecture',
    icon: Cloud,
    color: 'bg-sky-500',
    steps: [
      {
        id: 11,
        title: 'Cloud Platforms',
        description: 'Major cloud providers',
        topics: ['AWS', 'Azure', 'GCP', 'Cloud Services', 'Multi-Cloud']
      },
      {
        id: 12,
        title: 'Cloud-Native',
        description: 'Modern cloud patterns',
        topics: ['Containers', 'Kubernetes', 'Serverless', 'IaC', '12-Factor Apps']
      },
      {
        id: 13,
        title: 'Cloud Cost',
        description: 'Cost optimization',
        topics: ['Cost Models', 'Reserved Capacity', 'Spot Instances', 'FinOps', 'TCO']
      }
    ]
  },
  {
    title: 'Security Architecture',
    icon: Shield,
    color: 'bg-red-500',
    steps: [
      {
        id: 14,
        title: 'Security Fundamentals',
        description: 'Security principles',
        topics: ['Authentication', 'Authorization', 'Encryption', 'Zero Trust', 'OWASP']
      },
      {
        id: 15,
        title: 'Security Design',
        description: 'Architect for security',
        topics: ['Threat Modeling', 'Security Layers', 'API Security', 'Compliance', 'Auditing']
      }
    ]
  },
  {
    title: 'Architecture Documentation',
    icon: FileText,
    color: 'bg-gray-600',
    steps: [
      {
        id: 16,
        title: 'Documentation',
        description: 'Document architecture',
        topics: ['ADRs', 'C4 Model', 'UML', 'Sequence Diagrams', 'Architecture Views']
      },
      {
        id: 17,
        title: 'Technical Writing',
        description: 'Communicate effectively',
        topics: ['Technical Proposals', 'RFCs', 'Design Documents', 'Runbooks']
      }
    ]
  },
  {
    title: 'Leadership & Governance',
    icon: Users,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 18,
        title: 'Technical Leadership',
        description: 'Lead technical direction',
        topics: ['Technical Vision', 'Standards', 'Code Review', 'Mentoring', 'Decision Making']
      },
      {
        id: 19,
        title: 'Architecture Governance',
        description: 'Maintain quality',
        topics: ['Architecture Review', 'Tech Radar', 'Technical Debt', 'Migration Strategies']
      }
    ]
  },
  {
    title: 'Business & Strategy',
    icon: TrendingUp,
    color: 'bg-emerald-500',
    steps: [
      {
        id: 20,
        title: 'Business Alignment',
        description: 'Connect tech to business',
        topics: ['Business Requirements', 'Stakeholder Management', 'Trade-offs', 'Risk Assessment']
      },
      {
        id: 21,
        title: 'Technology Strategy',
        description: 'Strategic planning',
        topics: ['Technology Roadmaps', 'Build vs Buy', 'Vendor Evaluation', 'Innovation']
      }
    ],
    milestone: 'You are a Software Architect!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Junior Architect (5-8 yrs)', range: '$140K - $180K', avg: '$160K' },
  { level: 'Software Architect (8-12 yrs)', range: '$180K - $240K', avg: '$210K' },
  { level: 'Principal Architect (12-15 yrs)', range: '$220K - $300K', avg: '$260K' },
  { level: 'Chief Architect (15+ yrs)', range: '$280K - $400K+', avg: '$340K' }
];

const indiaSalaries = [
  { level: 'Junior Architect (5-8 yrs)', range: '₹25L - ₹40L', avg: '₹32L' },
  { level: 'Software Architect (8-12 yrs)', range: '₹40L - ₹65L', avg: '₹50L' },
  { level: 'Principal Architect (12-15 yrs)', range: '₹60L - ₹90L', avg: '₹75L' },
  { level: 'Chief Architect (15+ yrs)', range: '₹80L - ₹1.5Cr+', avg: '₹1Cr' }
];

// Project Ideas
const projects = [
  {
    title: 'System Design Document',
    level: 'Beginner' as const,
    description: 'Design a URL shortener',
    skills: ['Requirements', 'API Design', 'Database', 'Scaling']
  },
  {
    title: 'Microservices Demo',
    level: 'Beginner' as const,
    description: 'Convert monolith to microservices',
    skills: ['Service Decomposition', 'API Gateway', 'Docker']
  },
  {
    title: 'E-commerce Architecture',
    level: 'Intermediate' as const,
    description: 'Full e-commerce system design',
    skills: ['High Availability', 'Caching', 'Search', 'Payments']
  },
  {
    title: 'Real-time System',
    level: 'Intermediate' as const,
    description: 'Design a chat/notification system',
    skills: ['WebSockets', 'Message Queues', 'Fan-out', 'Presence']
  },
  {
    title: 'Data Pipeline Architecture',
    level: 'Advanced' as const,
    description: 'Design a data analytics platform',
    skills: ['ETL', 'Data Lake', 'Stream Processing', 'Analytics']
  },
  {
    title: 'Cloud Migration Strategy',
    level: 'Advanced' as const,
    description: 'Plan enterprise cloud migration',
    skills: ['Assessment', 'Migration Patterns', 'Cost', 'Risk']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to become a Software Architect?',
    answer: 'Most architects have 8-15 years of experience before the title. After strong development skills (5+ years), add 3-5 years focusing on system design, architecture patterns, and technical leadership. The path requires both deep technical expertise and broad knowledge.'
  },
  {
    question: 'Do I need to stop coding to become an architect?',
    answer: 'No, architects should stay hands-on. The balance shifts from implementation to design, but coding keeps you grounded. Many architects write proof-of-concepts, review code, and contribute to critical components. Completely non-coding architects often lose credibility.'
  },
  {
    question: 'Software Architect vs Solutions Architect vs Enterprise Architect?',
    answer: 'Software Architects focus on application design and technical decisions. Solutions Architects work on customer-facing solutions, often in pre-sales. Enterprise Architects define organization-wide standards and strategy. Titles vary by company; understand the actual scope.'
  },
  {
    question: 'What skills matter most for architects?',
    answer: 'Technical depth (system design, distributed systems), communication (writing, presenting), business acumen (understanding requirements, trade-offs), and leadership (mentoring, decision-making). Pure technical skills are insufficient - architects must influence and communicate.'
  },
  {
    question: 'Should I get architecture certifications?',
    answer: 'Certifications like AWS Solutions Architect or TOGAF can help, especially for enterprise architecture. However, experience and demonstrated skills matter more than certifications. Certifications are helpful for career transitions or specific client requirements.'
  },
  {
    question: 'How do I prepare for architecture interviews?',
    answer: 'Practice system design problems (Designing Data-Intensive Applications, System Design Interview books). Be ready to discuss past architectural decisions with trade-offs. Prepare for behavioral questions about technical leadership. Show both depth and breadth.'
  },
  {
    question: 'Can I become an architect without FAANG experience?',
    answer: 'Yes, many excellent architects work at smaller companies, consultancies, or enterprises. FAANG experience helps with name recognition and certain scale problems but isn\'t required. Focus on solving complex problems and demonstrating technical leadership wherever you are.'
  },
  {
    question: 'How do I transition from developer to architect?',
    answer: 'Seek projects with architectural scope. Document technical decisions (ADRs). Mentor junior developers. Volunteer for system design discussions. Read architecture books and case studies. Build relationships with current architects. The transition is gradual.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'System Design',
    description: 'Core design skills',
    href: '/roadmap/system-design',
    icon: Network,
    color: 'bg-purple-500'
  },
  {
    title: 'DevOps Engineer',
    description: 'Infrastructure skills',
    href: '/roadmap/devops',
    icon: Settings,
    color: 'bg-orange-500'
  },
  {
    title: 'Backend Developer',
    description: 'Development foundation',
    href: '/roadmap/backend-developer',
    icon: Code,
    color: 'bg-green-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Software Architect Roadmap 2026',
  description: 'Complete guide to becoming a Software Architect in 2026',
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

export default function SoftwareArchitectRoadmapPage() {
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
          title="Software Architect Roadmap"
          description="Master system design, architecture patterns, cloud architecture, security, and technical leadership. Your complete guide to becoming a Software Architect in 2026."
          duration="5-10 Years"
          difficulty="Advanced"
          accentColor="#7C3AED"
        />

        <WhatIsSection
          title="What is a Software Architect?"
          paragraphs={[
            'Software Architects design the high-level structure of software systems. They make critical technical decisions about system organization, technology selection, and design patterns that shape how software is built and evolved over time.',
            'As a Software Architect, you will define system architecture, create technical standards, evaluate technologies, mentor developers, and communicate with stakeholders to align technical decisions with business objectives.'
          ]}
          responsibilities={[
            'Design system architecture and components',
            'Make technology selection decisions',
            'Define technical standards and patterns',
            'Review designs and critical code',
            'Mentor developers and technical leads',
            'Communicate with business stakeholders',
            'Plan technical roadmaps and migrations'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#7C3AED"
        />

        <SalarySection
          title="Software Architect Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Architecture roles are among the highest-paid in software. Cloud and security expertise command premiums. Principal and Chief Architect roles at FAANG can exceed $500K total compensation. Consulting architects often have higher base salaries."
          gradient="bg-gradient-to-r from-violet-500 to-purple-600"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your Architecture Journey?"
          description="Get personalized guidance from experienced Software Architects who have designed systems at scale."
          gradient="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"
        />
      </main>

      <Footer />
    </>
  );
}
