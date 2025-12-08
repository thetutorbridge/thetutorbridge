'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Link,
  Server,
  Cloud,
  Code,
  Database,
  Shield,
  Zap,
  GitBranch,
  MessageSquare,
  Settings,
  Globe,
  Layers
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
        topics: ['Java/Python', 'JavaScript', 'XML/JSON', 'SQL', 'Shell Scripting', 'Regular Expressions']
      },
      {
        id: 2,
        title: 'Web Technologies',
        description: 'Web fundamentals',
        topics: ['HTTP/HTTPS', 'REST Principles', 'SOAP Basics', 'Web Servers', 'SSL/TLS', 'OAuth/JWT']
      }
    ],
    milestone: 'You have programming foundation!'
  },
  {
    title: 'API Development',
    icon: Globe,
    color: 'bg-green-500',
    steps: [
      {
        id: 3,
        title: 'REST APIs',
        description: 'RESTful services',
        topics: ['REST Design', 'HTTP Methods', 'Status Codes', 'OpenAPI/Swagger', 'API Versioning', 'HATEOAS']
      },
      {
        id: 4,
        title: 'API Standards',
        description: 'Other API styles',
        topics: ['GraphQL', 'gRPC', 'WebSockets', 'SOAP/WSDL', 'JSON-RPC', 'AsyncAPI']
      }
    ]
  },
  {
    title: 'Enterprise Integration Patterns',
    icon: GitBranch,
    color: 'bg-purple-500',
    steps: [
      {
        id: 5,
        title: 'Messaging Patterns',
        description: 'Core integration patterns',
        topics: ['Message Channel', 'Message Router', 'Message Translator', 'Content Enricher', 'Splitter/Aggregator', 'Dead Letter']
      },
      {
        id: 6,
        title: 'Integration Styles',
        description: 'Architecture patterns',
        topics: ['Point-to-Point', 'Hub-and-Spoke', 'Publish-Subscribe', 'Request-Reply', 'Event-Driven', 'Saga Pattern']
      }
    ],
    milestone: 'You know integration patterns!'
  },
  {
    title: 'Message Queues & Events',
    icon: MessageSquare,
    color: 'bg-orange-500',
    steps: [
      {
        id: 7,
        title: 'Message Brokers',
        description: 'Async messaging',
        topics: ['Apache Kafka', 'RabbitMQ', 'ActiveMQ', 'Amazon SQS/SNS', 'Azure Service Bus', 'Message Persistence']
      },
      {
        id: 8,
        title: 'Event-Driven Architecture',
        description: 'Event streaming',
        topics: ['Event Sourcing', 'CQRS', 'Event Storming', 'Schema Registry', 'Event Versioning', 'Idempotency']
      }
    ]
  },
  {
    title: 'Integration Platforms',
    icon: Layers,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 9,
        title: 'MuleSoft',
        description: 'Popular iPaaS',
        topics: ['Anypoint Studio', 'Mule Runtime', 'DataWeave', 'Connectors', 'API Manager', 'CloudHub']
      },
      {
        id: 10,
        title: 'Other Platforms',
        description: 'Alternative iPaaS',
        topics: ['Dell Boomi', 'Workato', 'Microsoft Power Automate', 'Zapier', 'Apache Camel', 'Spring Integration']
      }
    ],
    milestone: 'You can use integration platforms!'
  },
  {
    title: 'API Management',
    icon: Settings,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 11,
        title: 'API Gateways',
        description: 'Manage API traffic',
        topics: ['Kong', 'AWS API Gateway', 'Apigee', 'Azure APIM', 'Rate Limiting', 'Throttling']
      },
      {
        id: 12,
        title: 'API Lifecycle',
        description: 'API governance',
        topics: ['API Design', 'Documentation', 'Versioning Strategy', 'Deprecation', 'Developer Portal', 'Analytics']
      }
    ]
  },
  {
    title: 'Data Integration',
    icon: Database,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 13,
        title: 'Data Transformation',
        description: 'Transform data formats',
        topics: ['JSON/XML Transform', 'Data Mapping', 'Schema Validation', 'Data Enrichment', 'Canonical Models', 'ETL Basics']
      },
      {
        id: 14,
        title: 'Database Integration',
        description: 'Connect to databases',
        topics: ['JDBC/ODBC', 'Database Connectors', 'Change Data Capture', 'Batch Processing', 'Real-time Sync', 'Data Virtualization']
      }
    ],
    milestone: 'You can integrate data!'
  },
  {
    title: 'B2B & EDI',
    icon: Link,
    color: 'bg-pink-500',
    steps: [
      {
        id: 15,
        title: 'B2B Integration',
        description: 'Partner integration',
        topics: ['EDI Standards', 'X12/EDIFACT', 'AS2/SFTP', 'Partner Onboarding', 'Trading Partners', 'B2B Gateways']
      },
      {
        id: 16,
        title: 'Industry Standards',
        description: 'Domain-specific',
        topics: ['HL7/FHIR (Healthcare)', 'SWIFT (Finance)', 'ACORD (Insurance)', 'Rosettanet', 'Industry APIs']
      }
    ]
  },
  {
    title: 'Security & Compliance',
    icon: Shield,
    color: 'bg-red-500',
    steps: [
      {
        id: 17,
        title: 'API Security',
        description: 'Secure integrations',
        topics: ['OAuth 2.0', 'OpenID Connect', 'API Keys', 'Mutual TLS', 'Token Management', 'CORS']
      },
      {
        id: 18,
        title: 'Compliance',
        description: 'Regulatory requirements',
        topics: ['Data Privacy', 'GDPR/CCPA', 'Audit Logging', 'Data Masking', 'Encryption at Rest/Transit', 'SOC 2']
      }
    ]
  },
  {
    title: 'Cloud Integration',
    icon: Cloud,
    color: 'bg-sky-500',
    steps: [
      {
        id: 19,
        title: 'Cloud Services',
        description: 'Cloud integration',
        topics: ['AWS Integration', 'Azure Integration', 'GCP Integration', 'SaaS Connectors', 'Hybrid Integration', 'Multi-Cloud']
      },
      {
        id: 20,
        title: 'Microservices Integration',
        description: 'Modern architecture',
        topics: ['Service Mesh', 'Sidecar Pattern', 'API Composition', 'Circuit Breaker', 'Service Discovery', 'Distributed Tracing']
      }
    ],
    milestone: 'You know cloud integration!'
  },
  {
    title: 'Operations & Advanced',
    icon: Zap,
    color: 'bg-emerald-500',
    steps: [
      {
        id: 21,
        title: 'Monitoring & Operations',
        description: 'Production systems',
        topics: ['Integration Monitoring', 'Error Handling', 'Retry Strategies', 'Alerting', 'SLAs', 'Capacity Planning']
      },
      {
        id: 22,
        title: 'Integration Architecture',
        description: 'Enterprise design',
        topics: ['Integration Strategy', 'API-First Design', 'Event Mesh', 'Integration Governance', 'Reference Architecture', 'Best Practices']
      }
    ],
    milestone: 'You are an Integration Engineer!'
  }
];

const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$70K - $95K', avg: '$82K' },
  { level: 'Mid (2-5 yrs)', range: '$95K - $135K', avg: '$115K' },
  { level: 'Senior (5-8 yrs)', range: '$130K - $175K', avg: '$150K' },
  { level: 'Architect (8+ yrs)', range: '$165K - $220K+', avg: '$190K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹5L - ₹10L', avg: '₹7L' },
  { level: 'Junior (1-3 yrs)', range: '₹10L - ₹18L', avg: '₹14L' },
  { level: 'Mid (3-5 yrs)', range: '₹18L - ₹32L', avg: '₹24L' },
  { level: 'Senior (5+ yrs)', range: '₹30L - ₹55L+', avg: '₹42L' }
];

const projects = [
  { title: 'REST API Gateway', level: 'Beginner' as const, description: 'API proxy with auth', skills: ['Kong/Express', 'OAuth', 'Rate Limiting', 'Logging'] },
  { title: 'Message Queue Integration', level: 'Beginner' as const, description: 'Async system integration', skills: ['RabbitMQ', 'Producer/Consumer', 'Dead Letter', 'Retry'] },
  { title: 'SaaS Integration', level: 'Intermediate' as const, description: 'Connect CRM to ERP', skills: ['MuleSoft/Workato', 'Data Mapping', 'Error Handling', 'Monitoring'] },
  { title: 'Event-Driven System', level: 'Intermediate' as const, description: 'Kafka event streaming', skills: ['Kafka', 'Event Sourcing', 'Schema Registry', 'CQRS'] },
  { title: 'B2B Gateway', level: 'Advanced' as const, description: 'EDI partner integration', skills: ['EDI', 'AS2', 'Partner Management', 'Compliance'] },
  { title: 'Integration Platform', level: 'Advanced' as const, description: 'Internal iPaaS', skills: ['Apache Camel', 'Kubernetes', 'Monitoring', 'Self-Service'] }
];

const faqs = [
  {
    question: 'What does an Integration Engineer do?',
    answer: 'Integration Engineers connect different software systems, enabling them to share data and functionality. They build APIs, implement message queues, configure iPaaS platforms, and ensure data flows correctly between applications. It\'s the glue that holds enterprise software together.'
  },
  {
    question: 'How long does it take to become an Integration Engineer?',
    answer: 'With programming background, 6-9 months for basic integration skills. Mastering platforms (MuleSoft, Boomi) takes additional 6-12 months. Enterprise integration patterns and architecture expertise takes 2-3 years. Certification paths help accelerate learning.'
  },
  {
    question: 'Should I learn MuleSoft or another platform?',
    answer: 'MuleSoft is the market leader with most job opportunities. Dell Boomi and Workato are strong alternatives. Microsoft shops use Power Automate/Logic Apps. Learn concepts first - they transfer between platforms. Consider certifications for career advancement.'
  },
  {
    question: 'Is Integration Engineering a good career in 2026?',
    answer: 'Excellent career. Every company needs integrations as SaaS adoption grows. API economy continues expanding. Event-driven architecture creates new opportunities. Competition is moderate compared to other tech roles. Salaries are strong, especially with certifications.'
  },
  {
    question: 'Do I need coding skills for integration engineering?',
    answer: 'Yes, but varies by role. Low-code platforms (MuleSoft, Workato) reduce coding but you still need scripting, transformation logic, and debugging skills. Understanding APIs, JSON/XML, and basic programming is essential. Deep coding matters for custom integrations.'
  },
  {
    question: 'What\'s the difference between Integration Engineer and Backend Developer?',
    answer: 'Backend Developers build applications; Integration Engineers connect them. Significant overlap exists. Integration Engineers focus on APIs, message queues, data transformation, and enterprise patterns. They work more with existing systems than building from scratch.'
  },
  {
    question: 'Are certifications important for Integration Engineers?',
    answer: 'Yes, more than most tech roles. MuleSoft certifications are highly valued. Boomi and Workato offer certifications too. Enterprises require certified professionals for platform decisions. Certifications boost salaries and job opportunities significantly.'
  },
  {
    question: 'How do I get integration experience without a job?',
    answer: 'MuleSoft and Boomi offer free training environments. Build personal projects connecting free APIs (weather, social media). Learn Kafka and RabbitMQ with Docker locally. Practice with Postman and API testing. Open-source projects like Apache Camel welcome contributors.'
  }
];

const relatedRoadmaps = [
  { title: 'Backend Developer', description: 'Server-side development', href: '/roadmap/backend-developer', icon: Server, color: 'bg-green-500' },
  { title: 'DevOps', description: 'CI/CD and automation', href: '/roadmap/devops', icon: Settings, color: 'bg-orange-500' },
  { title: 'Software Architect', description: 'System design', href: '/roadmap/software-architect', icon: Layers, color: 'bg-purple-500' }
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Integration Engineer Roadmap 2026',
  description: 'Complete guide to becoming an Integration Engineer in 2026',
  author: { '@type': 'Organization', name: 'The Tutor Bridge' },
  publisher: { '@type': 'Organization', name: 'The Tutor Bridge' }
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } }))
};

export default function IntegrationEngineerRoadmapPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <RoadmapHero
          title="Integration Engineer Roadmap"
          description="Master APIs, MuleSoft, enterprise integration patterns, message queues, and iPaaS platforms. Your complete guide to becoming an Integration Engineer in 2026."
          duration="6-10 Months"
          difficulty="Intermediate"
          accentColor="#3B82F6"
        />
        <WhatIsSection
          title="What is an Integration Engineer?"
          paragraphs={[
            'Integration Engineers connect disparate software systems, enabling seamless data flow between applications across an organization. They work with APIs, message queues, iPaaS platforms, and enterprise integration patterns to build the digital nervous system of modern businesses.',
            'As an Integration Engineer, you will design API integrations, implement messaging solutions, configure integration platforms like MuleSoft, handle data transformations, and ensure reliable communication between systems.'
          ]}
          responsibilities={[
            'Design and implement API integrations',
            'Configure iPaaS platforms (MuleSoft, Boomi)',
            'Build message queue solutions',
            'Transform data between systems',
            'Implement enterprise integration patterns',
            'Manage B2B and EDI integrations',
            'Monitor and troubleshoot integrations'
          ]}
        />
        <VisualRoadmapSection stages={roadmapStages} accentColor="#3B82F6" />
        <SalarySection
          title="Integration Engineer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="MuleSoft certification significantly increases salary potential. Enterprise integration experience with complex patterns is highly valued. B2B/EDI specialists command premiums in specific industries. Consulting and contract rates are excellent."
          gradient="bg-gradient-to-r from-blue-500 to-cyan-500"
        />
        <ProjectsSection projects={projects} />
        <FAQSection faqs={faqs} />
        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />
        <CTASection
          title="Ready to Start Your Integration Engineering Journey?"
          description="Get personalized guidance from experienced integration engineers who have connected enterprise systems."
          gradient="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500"
        />
      </main>
      <Footer />
    </>
  );
}
