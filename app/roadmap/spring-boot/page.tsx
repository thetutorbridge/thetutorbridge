'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Leaf,
  Code,
  Database,
  Shield,
  Globe,
  Layers,
  Settings,
  Cloud,
  Zap,
  TestTube,
  GitBranch,
  Server
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
    title: 'Java Fundamentals',
    icon: Code,
    color: 'bg-orange-500',
    steps: [
      {
        id: 1,
        title: 'Core Java',
        description: 'Java language basics',
        topics: ['Syntax', 'OOP', 'Collections', 'Generics', 'Exception Handling', 'Java 17+']
      },
      {
        id: 2,
        title: 'Advanced Java',
        description: 'Advanced language features',
        topics: ['Streams API', 'Lambda Expressions', 'Concurrency', 'I/O', 'Reflection']
      }
    ],
    milestone: 'You know Java!'
  },
  {
    title: 'Build Tools',
    icon: Settings,
    color: 'bg-gray-600',
    steps: [
      {
        id: 3,
        title: 'Maven & Gradle',
        description: 'Project management',
        topics: ['Maven', 'Gradle', 'Dependencies', 'Build Lifecycle', 'Plugins', 'Profiles']
      }
    ]
  },
  {
    title: 'Spring Core',
    icon: Leaf,
    color: 'bg-green-500',
    steps: [
      {
        id: 4,
        title: 'Spring Framework',
        description: 'Core Spring concepts',
        topics: ['IoC Container', 'Dependency Injection', 'Beans', 'Configuration', 'AOP']
      },
      {
        id: 5,
        title: 'Spring Boot Basics',
        description: 'Getting started',
        topics: ['Auto Configuration', 'Starters', 'Application Properties', 'Profiles', 'Actuator']
      }
    ],
    milestone: 'You understand Spring!'
  },
  {
    title: 'Web Development',
    icon: Globe,
    color: 'bg-blue-500',
    steps: [
      {
        id: 6,
        title: 'Spring MVC',
        description: 'Web applications',
        topics: ['Controllers', 'Request Mapping', 'View Resolution', 'Form Handling', 'Validation']
      },
      {
        id: 7,
        title: 'REST APIs',
        description: 'Build RESTful services',
        topics: ['RestController', 'HTTP Methods', 'Response Handling', 'Exception Handling', 'HATEOAS']
      },
      {
        id: 8,
        title: 'API Documentation',
        description: 'Document your APIs',
        topics: ['OpenAPI', 'Swagger', 'SpringDoc', 'API Versioning']
      }
    ]
  },
  {
    title: 'Data Access',
    icon: Database,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 9,
        title: 'Spring Data JPA',
        description: 'ORM with JPA',
        topics: ['Entities', 'Repositories', 'Query Methods', 'JPQL', 'Specifications']
      },
      {
        id: 10,
        title: 'Advanced Data',
        description: 'Complex data operations',
        topics: ['Transactions', 'Caching', 'Auditing', 'Projections', 'Native Queries']
      },
      {
        id: 11,
        title: 'Database Migration',
        description: 'Schema management',
        topics: ['Flyway', 'Liquibase', 'Migration Scripts', 'Version Control']
      }
    ],
    milestone: 'You can build data-driven apps!'
  },
  {
    title: 'Security',
    icon: Shield,
    color: 'bg-red-500',
    steps: [
      {
        id: 12,
        title: 'Spring Security',
        description: 'Application security',
        topics: ['Authentication', 'Authorization', 'Security Filters', 'CORS', 'CSRF']
      },
      {
        id: 13,
        title: 'OAuth2 & JWT',
        description: 'Token-based security',
        topics: ['JWT', 'OAuth2', 'Resource Server', 'Authorization Server', 'Social Login']
      }
    ]
  },
  {
    title: 'Testing',
    icon: TestTube,
    color: 'bg-teal-500',
    steps: [
      {
        id: 14,
        title: 'Unit Testing',
        description: 'Test your code',
        topics: ['JUnit 5', 'Mockito', 'AssertJ', 'Test Slices', '@MockBean']
      },
      {
        id: 15,
        title: 'Integration Testing',
        description: 'End-to-end tests',
        topics: ['@SpringBootTest', 'TestContainers', 'MockMvc', 'WebTestClient']
      }
    ]
  },
  {
    title: 'Async & Messaging',
    icon: Zap,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 16,
        title: 'Async Processing',
        description: 'Asynchronous operations',
        topics: ['@Async', 'CompletableFuture', 'Scheduling', 'Events']
      },
      {
        id: 17,
        title: 'Message Queues',
        description: 'Message-based communication',
        topics: ['RabbitMQ', 'Kafka', 'Spring AMQP', 'Spring Kafka']
      }
    ]
  },
  {
    title: 'Microservices',
    icon: Layers,
    color: 'bg-purple-500',
    steps: [
      {
        id: 18,
        title: 'Spring Cloud',
        description: 'Distributed systems',
        topics: ['Service Discovery', 'Config Server', 'API Gateway', 'Circuit Breaker']
      },
      {
        id: 19,
        title: 'Microservice Patterns',
        description: 'Architecture patterns',
        topics: ['Saga Pattern', 'Event Sourcing', 'CQRS', 'Service Mesh']
      }
    ]
  },
  {
    title: 'DevOps & Cloud',
    icon: Cloud,
    color: 'bg-sky-500',
    steps: [
      {
        id: 20,
        title: 'Containerization',
        description: 'Docker for Spring',
        topics: ['Docker', 'Docker Compose', 'Kubernetes', 'Helm', 'Cloud Foundry']
      },
      {
        id: 21,
        title: 'Cloud Deployment',
        description: 'Deploy to cloud',
        topics: ['AWS', 'Azure', 'GCP', 'CI/CD', 'GitOps']
      }
    ],
    milestone: 'You are a professional Spring Boot Developer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$70K - $95K', avg: '$82K' },
  { level: 'Mid (2-5 yrs)', range: '$95K - $140K', avg: '$115K' },
  { level: 'Senior (5-8 yrs)', range: '$140K - $180K', avg: '$158K' },
  { level: 'Lead (8+ yrs)', range: '$180K - $240K+', avg: '$205K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹4L - ₹8L', avg: '₹6L' },
  { level: 'Junior (1-3 yrs)', range: '₹7L - ₹14L', avg: '₹10L' },
  { level: 'Mid (3-5 yrs)', range: '₹14L - ₹28L', avg: '₹20L' },
  { level: 'Senior (5+ yrs)', range: '₹28L - ₹55L+', avg: '₹38L' }
];

// Project Ideas
const projects = [
  {
    title: 'REST API',
    level: 'Beginner' as const,
    description: 'CRUD API with JPA',
    skills: ['Controllers', 'JPA', 'Validation', 'Swagger']
  },
  {
    title: 'Auth Service',
    level: 'Beginner' as const,
    description: 'JWT authentication system',
    skills: ['Security', 'JWT', 'Users', 'Roles']
  },
  {
    title: 'E-commerce Backend',
    level: 'Intermediate' as const,
    description: 'Full e-commerce API',
    skills: ['JPA Relations', 'Caching', 'Payments', 'Email']
  },
  {
    title: 'Blog Platform',
    level: 'Intermediate' as const,
    description: 'Blog with comments and likes',
    skills: ['Spring Data', 'Security', 'Pagination', 'Search']
  },
  {
    title: 'Microservices System',
    level: 'Advanced' as const,
    description: 'Distributed microservices',
    skills: ['Spring Cloud', 'Eureka', 'Gateway', 'Messaging']
  },
  {
    title: 'Event-Driven App',
    level: 'Advanced' as const,
    description: 'Kafka-based event system',
    skills: ['Kafka', 'Event Sourcing', 'CQRS', 'Saga']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to learn Spring Boot?',
    answer: 'With Java basics, Spring Boot fundamentals take 2-3 months. Building production applications with security, JPA, and testing takes 4-6 months. Mastering microservices, Spring Cloud, and advanced patterns takes 8-12 months of practice.'
  },
  {
    question: 'Do I need to learn Spring Framework before Spring Boot?',
    answer: 'You can start directly with Spring Boot - it\'s designed to be beginner-friendly. However, understanding core Spring concepts (IoC, DI, AOP) helps when you need to customize behavior. Spring Boot abstracts much complexity but doesn\'t replace understanding.'
  },
  {
    question: 'Spring Boot vs Node.js - which should I learn?',
    answer: 'Spring Boot is preferred for enterprise applications, complex business logic, and organizations using Java. Node.js is better for startups, real-time apps, and JavaScript-centric teams. Both are excellent - choose based on job market and team preferences.'
  },
  {
    question: 'Is Spring Boot still popular in 2026?',
    answer: 'Yes, Spring Boot is the most popular Java framework and dominates enterprise backend development. Banks, insurance companies, and large enterprises heavily use Spring. Java remains one of the most in-demand languages, and Spring is its leading framework.'
  },
  {
    question: 'What databases work best with Spring Boot?',
    answer: 'PostgreSQL and MySQL are most common. Spring Data JPA supports all major databases. Use H2 for development/testing. For NoSQL, MongoDB with Spring Data Mongo is popular. Most enterprises use PostgreSQL or Oracle with Spring Boot.'
  },
  {
    question: 'Should I learn reactive Spring (WebFlux)?',
    answer: 'Learn traditional Spring MVC first - it covers 90%+ of use cases. Add WebFlux if you need high concurrency with limited threads (streaming, real-time). Reactive programming has a learning curve. Most jobs still use blocking Spring MVC.'
  },
  {
    question: 'How important is Spring Security?',
    answer: 'Very important. Almost every production application needs authentication and authorization. Spring Security is complex but essential. Understand JWT, OAuth2, and basic auth. Security is a common interview topic and critical for enterprise development.'
  },
  {
    question: 'How do I get a Spring Boot developer job?',
    answer: 'Build 3-5 projects with REST APIs, JPA, and security. Use Docker for deployment. Know SQL and database design well. Understand microservices concepts. Prepare for questions on Spring IoC, JPA, transactions, and design patterns.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'Java Developer',
    description: 'Core Java skills',
    href: '/roadmap/java',
    icon: Code,
    color: 'bg-orange-500'
  },
  {
    title: 'Backend Developer',
    description: 'General backend skills',
    href: '/roadmap/backend-developer',
    icon: Server,
    color: 'bg-green-500'
  },
  {
    title: 'System Design',
    description: 'Architecture skills',
    href: '/roadmap/system-design',
    icon: Layers,
    color: 'bg-purple-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Spring Boot Developer Roadmap 2026',
  description: 'Complete guide to becoming a Spring Boot Developer in 2026',
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

export default function SpringBootRoadmapPage() {
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
          title="Spring Boot Roadmap"
          description="Master Java, Spring Framework, REST APIs, JPA, security, microservices, and cloud deployment. Your complete guide to becoming a professional Spring Boot Developer in 2026."
          duration="5-8 Months"
          difficulty="Intermediate"
          accentColor="#6DB33F"
        />

        <WhatIsSection
          title="What is a Spring Boot Developer?"
          paragraphs={[
            'Spring Boot developers build enterprise-grade Java applications using the Spring ecosystem. They create robust backend systems, microservices, and APIs that power large-scale business applications across industries.',
            'As a Spring Boot developer, you will design RESTful APIs, implement security, work with databases using JPA, build microservices, and deploy applications to cloud platforms.'
          ]}
          responsibilities={[
            'Build RESTful APIs and web applications',
            'Implement authentication and authorization',
            'Design database schemas and use JPA/Hibernate',
            'Write unit and integration tests',
            'Build microservices architectures',
            'Deploy to cloud platforms (AWS, Azure)',
            'Integrate with messaging systems (Kafka, RabbitMQ)'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#6DB33F"
        />

        <SalarySection
          title="Spring Boot Developer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Spring Boot developers are in high demand in enterprise environments. Banks, insurance companies, and large tech firms pay premium salaries. Microservices and cloud skills significantly boost compensation."
          gradient="bg-gradient-to-r from-green-500 to-emerald-600"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your Spring Boot Journey?"
          description="Get personalized guidance from experienced Spring Boot developers who have built enterprise systems."
          gradient="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"
        />
      </main>

      <Footer />
    </>
  );
}
