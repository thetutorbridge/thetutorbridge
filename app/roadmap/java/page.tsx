'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Coffee,
  Code,
  Box,
  Layers,
  Database,
  Server,
  Shield,
  Settings,
  GitBranch,
  Zap,
  FileText,
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
    title: 'Java Fundamentals',
    icon: Coffee,
    color: 'bg-orange-500',
    steps: [
      {
        id: 1,
        title: 'Basic Syntax',
        description: 'Learn the core Java syntax and structure',
        topics: ['Variables', 'Data Types', 'Operators', 'Type Casting', 'Input/Output']
      },
      {
        id: 2,
        title: 'Control Flow',
        description: 'Master program flow control',
        topics: ['If-Else', 'Switch', 'For Loops', 'While Loops', 'Break/Continue']
      },
      {
        id: 3,
        title: 'Arrays & Strings',
        description: 'Work with collections of data',
        topics: ['Arrays', 'Multi-dimensional Arrays', 'String Methods', 'StringBuilder', 'String Pool']
      }
    ],
    milestone: 'You can write basic Java programs!'
  },
  {
    title: 'Object-Oriented Programming',
    icon: Box,
    color: 'bg-blue-500',
    steps: [
      {
        id: 4,
        title: 'Classes & Objects',
        description: 'Foundation of OOP in Java',
        topics: ['Classes', 'Objects', 'Constructors', 'Methods', 'Access Modifiers']
      },
      {
        id: 5,
        title: 'OOP Principles',
        description: 'Master the four pillars of OOP',
        topics: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction']
      },
      {
        id: 6,
        title: 'Advanced OOP',
        description: 'Deep dive into OOP concepts',
        topics: ['Interfaces', 'Abstract Classes', 'Inner Classes', 'Enums', 'Records']
      }
    ],
    milestone: 'You understand OOP in Java!'
  },
  {
    title: 'Core Java',
    icon: Code,
    color: 'bg-red-500',
    steps: [
      {
        id: 7,
        title: 'Exception Handling',
        description: 'Handle errors gracefully',
        topics: ['Try-Catch', 'Finally', 'Throw', 'Custom Exceptions', 'Best Practices']
      },
      {
        id: 8,
        title: 'Collections Framework',
        description: 'Work with data structures',
        topics: ['List', 'Set', 'Map', 'Queue', 'Iterator', 'Comparable/Comparator']
      },
      {
        id: 9,
        title: 'Generics',
        description: 'Type-safe programming',
        topics: ['Generic Classes', 'Generic Methods', 'Bounded Types', 'Wildcards']
      },
      {
        id: 10,
        title: 'Java I/O',
        description: 'Input/Output operations',
        topics: ['File I/O', 'Streams', 'Readers/Writers', 'Serialization', 'NIO']
      }
    ]
  },
  {
    title: 'Advanced Java',
    icon: Layers,
    color: 'bg-purple-500',
    steps: [
      {
        id: 11,
        title: 'Multithreading',
        description: 'Concurrent programming',
        topics: ['Threads', 'Runnable', 'Synchronization', 'Executors', 'Virtual Threads']
      },
      {
        id: 12,
        title: 'Java 8+ Features',
        description: 'Modern Java syntax',
        topics: ['Lambda Expressions', 'Stream API', 'Optional', 'Functional Interfaces', 'Method References']
      },
      {
        id: 13,
        title: 'JVM Internals',
        description: 'Understand how Java works',
        topics: ['Memory Model', 'Garbage Collection', 'Class Loading', 'JIT Compilation']
      }
    ],
    milestone: 'You have advanced Java skills!'
  },
  {
    title: 'Build Tools & Version Control',
    icon: GitBranch,
    color: 'bg-gray-700',
    steps: [
      {
        id: 14,
        title: 'Build Tools',
        description: 'Automate project builds',
        topics: ['Maven', 'Gradle', 'Dependency Management', 'Build Lifecycle', 'Plugins']
      },
      {
        id: 15,
        title: 'Git & GitHub',
        description: 'Version control essentials',
        topics: ['Git Basics', 'Branching', 'Merging', 'Pull Requests', 'GitHub Actions']
      }
    ]
  },
  {
    title: 'Spring Framework',
    icon: Zap,
    color: 'bg-green-500',
    steps: [
      {
        id: 16,
        title: 'Spring Core',
        description: 'Foundation of Spring',
        topics: ['IoC Container', 'Dependency Injection', 'Beans', 'Configuration', 'AOP']
      },
      {
        id: 17,
        title: 'Spring Boot',
        description: 'Rapid application development',
        topics: ['Auto-configuration', 'Starters', 'Properties', 'Profiles', 'Actuator']
      },
      {
        id: 18,
        title: 'Spring Web',
        description: 'Build REST APIs',
        topics: ['REST Controllers', 'Request Mapping', 'Validation', 'Exception Handling', 'CORS']
      },
      {
        id: 19,
        title: 'Spring Security',
        description: 'Secure your applications',
        topics: ['Authentication', 'Authorization', 'JWT', 'OAuth2', 'CSRF Protection']
      }
    ],
    milestone: 'You can build Spring Boot applications!'
  },
  {
    title: 'Database & ORM',
    icon: Database,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 20,
        title: 'JDBC',
        description: 'Connect to databases',
        topics: ['Connections', 'Statements', 'ResultSet', 'Transactions', 'Connection Pooling']
      },
      {
        id: 21,
        title: 'JPA & Hibernate',
        description: 'Object-Relational Mapping',
        topics: ['Entities', 'Relationships', 'JPQL', 'Criteria API', 'Caching']
      },
      {
        id: 22,
        title: 'Spring Data JPA',
        description: 'Simplified data access',
        topics: ['Repositories', 'Query Methods', 'Pagination', 'Auditing', 'Projections']
      }
    ]
  },
  {
    title: 'Testing',
    icon: Shield,
    color: 'bg-teal-500',
    steps: [
      {
        id: 23,
        title: 'Unit Testing',
        description: 'Test individual components',
        topics: ['JUnit 5', 'Assertions', 'Test Lifecycle', 'Parameterized Tests']
      },
      {
        id: 24,
        title: 'Mocking & Integration',
        description: 'Advanced testing techniques',
        topics: ['Mockito', 'MockMvc', 'TestContainers', 'REST Assured', 'Code Coverage']
      }
    ]
  },
  {
    title: 'Microservices & Cloud',
    icon: Cloud,
    color: 'bg-sky-500',
    steps: [
      {
        id: 25,
        title: 'Microservices Architecture',
        description: 'Build distributed systems',
        topics: ['Service Discovery', 'API Gateway', 'Config Server', 'Circuit Breaker', 'Event-Driven']
      },
      {
        id: 26,
        title: 'Containers & Deployment',
        description: 'Deploy Java applications',
        topics: ['Docker', 'Kubernetes', 'CI/CD', 'AWS/GCP/Azure', 'Monitoring']
      }
    ],
    milestone: 'You are a professional Java Developer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$70K - $95K', avg: '$82K' },
  { level: 'Mid (2-5 yrs)', range: '$95K - $140K', avg: '$115K' },
  { level: 'Senior (5-8 yrs)', range: '$140K - $190K', avg: '$160K' },
  { level: 'Lead/Architect (8+ yrs)', range: '$190K - $280K+', avg: '$230K' }
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
    title: 'Console Banking App',
    level: 'Beginner' as const,
    description: 'Banking system with accounts and transactions',
    skills: ['Core Java', 'OOP', 'Collections']
  },
  {
    title: 'Library Management System',
    level: 'Beginner' as const,
    description: 'CRUD operations for books and users',
    skills: ['JDBC', 'MySQL', 'File I/O']
  },
  {
    title: 'REST API for Blog',
    level: 'Intermediate' as const,
    description: 'Blog API with authentication',
    skills: ['Spring Boot', 'JPA', 'Spring Security']
  },
  {
    title: 'E-Commerce Backend',
    level: 'Advanced' as const,
    description: 'Full e-commerce API with payments',
    skills: ['Spring Boot', 'Microservices', 'Redis']
  },
  {
    title: 'Real-time Chat Application',
    level: 'Advanced' as const,
    description: 'WebSocket-based chat with rooms',
    skills: ['Spring WebSocket', 'MongoDB', 'Redis Pub/Sub']
  },
  {
    title: 'Job Scheduler System',
    level: 'Intermediate' as const,
    description: 'Background job processing system',
    skills: ['Spring Batch', 'Quartz', 'PostgreSQL']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to become a Java developer?',
    answer: 'With consistent practice (3-4 hours daily), you can become job-ready in 6-9 months. This includes core Java, Spring Boot, and databases. Reaching senior level typically takes 3-5 years of professional experience working on production systems.'
  },
  {
    question: 'Is Java still relevant in 2026?',
    answer: 'Absolutely! Java remains one of the most in-demand programming languages. It powers enterprise applications, Android apps, and large-scale systems at companies like Google, Amazon, and Netflix. Java\'s stability, performance, and massive ecosystem keep it highly relevant.'
  },
  {
    question: 'Should I learn Java or Python first?',
    answer: 'It depends on your goals. Java is better for enterprise development, Android apps, and building large-scale systems. Python is better for data science, scripting, and rapid prototyping. Java teaches you strong OOP principles that transfer to other languages.'
  },
  {
    question: 'Is Spring Boot necessary to learn?',
    answer: 'Yes, Spring Boot is essential for Java developers. Over 60% of Java job postings require Spring experience. It\'s the de facto standard for building production-ready applications and microservices in the Java ecosystem.'
  },
  {
    question: 'Java vs Kotlin - which should I learn?',
    answer: 'Start with Java. It has broader industry adoption and more learning resources. Once you\'re comfortable with Java, Kotlin is easy to pick up. For Android development, Kotlin is preferred. For backend enterprise work, Java is more common.'
  },
  {
    question: 'Do I need to learn microservices?',
    answer: 'For senior roles, yes. Most modern enterprise applications use microservices architecture. Start with monolithic Spring Boot applications, then learn to break them into microservices. Understanding both approaches makes you more valuable.'
  },
  {
    question: 'What Java version should I learn?',
    answer: 'Learn Java 17 or newer (LTS versions). Most companies use Java 11 or 17 in production. Focus on modern features like records, pattern matching, and virtual threads. Understanding older syntax helps when maintaining legacy code.'
  },
  {
    question: 'How do I get my first Java developer job?',
    answer: 'Build 3-5 Spring Boot projects for your portfolio, contribute to open source, get certified (Oracle Java SE), and apply to entry-level positions. Prepare for technical interviews covering DSA, core Java, and Spring concepts.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'Backend Developer',
    description: 'Full backend development path',
    href: '/roadmap/backend-developer',
    icon: Server,
    color: 'bg-green-500'
  },
  {
    title: 'Full Stack Developer',
    description: 'Add frontend skills to your toolkit',
    href: '/roadmap/full-stack-developer',
    icon: Layers,
    color: 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66]'
  },
  {
    title: 'System Design',
    description: 'Design scalable systems',
    href: '/roadmap/system-design',
    icon: Settings,
    color: 'bg-purple-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Java Developer Roadmap 2026',
  description: 'Complete guide to becoming a Java developer in 2026',
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

export default function JavaRoadmapPage() {
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
          title="Java Developer Roadmap"
          description="Master Java, OOP, Spring Boot, databases, and enterprise development. Your complete guide to becoming a professional Java developer in 2026."
          duration="6-9 Months"
          difficulty="Beginner Friendly"
          accentColor="#EA580C"
        />

        <WhatIsSection
          title="What is a Java Developer?"
          paragraphs={[
            'Java developers build robust, scalable applications using the Java programming language. They work on enterprise software, web applications, Android apps, and distributed systems that power businesses worldwide.',
            'As a Java developer, you will write clean, maintainable code, design object-oriented systems, work with databases, and collaborate with teams to deliver high-quality software solutions.'
          ]}
          responsibilities={[
            'Build scalable backend applications and APIs',
            'Write clean, maintainable Java code following best practices',
            'Design and implement object-oriented systems',
            'Work with relational databases and ORMs',
            'Develop microservices using Spring Boot',
            'Write unit and integration tests',
            'Collaborate with cross-functional teams'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#EA580C"
        />

        <SalarySection
          title="Java Developer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Specialize in Spring Boot + Microservices + Cloud for maximum earning potential. Enterprise companies and banks offer the highest salaries for experienced Java developers."
          gradient="bg-gradient-to-r from-orange-600 to-red-600"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your Java Journey?"
          description="Get personalized guidance from experienced Java developers who have been where you are."
          gradient="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600"
        />
      </main>

      <Footer />
    </>
  );
}
