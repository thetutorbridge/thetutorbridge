'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Code,
  Zap,
  Server,
  Database,
  Globe,
  Layers,
  Terminal,
  Shield,
  TestTube,
  Cloud,
  GitBranch,
  Settings
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
    title: 'Go Fundamentals',
    icon: Code,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 1,
        title: 'Go Basics',
        description: 'Learn Go syntax and basics',
        topics: ['Variables', 'Types', 'Functions', 'Control Flow', 'Packages', 'Modules']
      },
      {
        id: 2,
        title: 'Data Structures',
        description: 'Go built-in data structures',
        topics: ['Arrays', 'Slices', 'Maps', 'Structs', 'Pointers', 'make vs new']
      },
      {
        id: 3,
        title: 'Methods & Interfaces',
        description: 'Go\'s approach to OOP',
        topics: ['Methods', 'Interfaces', 'Type Embedding', 'Type Assertions', 'Empty Interface']
      }
    ],
    milestone: 'You know Go basics!'
  },
  {
    title: 'Concurrency',
    icon: Zap,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 4,
        title: 'Goroutines',
        description: 'Lightweight threads',
        topics: ['Goroutines', 'go Keyword', 'WaitGroups', 'Concurrency vs Parallelism']
      },
      {
        id: 5,
        title: 'Channels',
        description: 'Communication between goroutines',
        topics: ['Channels', 'Buffered Channels', 'Select Statement', 'Channel Direction', 'Closing Channels']
      },
      {
        id: 6,
        title: 'Concurrency Patterns',
        description: 'Advanced concurrency',
        topics: ['Worker Pools', 'Fan-out/Fan-in', 'Pipeline', 'Context', 'Mutex & Sync']
      }
    ],
    milestone: 'You understand Go concurrency!'
  },
  {
    title: 'Error Handling',
    icon: Shield,
    color: 'bg-red-500',
    steps: [
      {
        id: 7,
        title: 'Error Handling',
        description: 'Go\'s error philosophy',
        topics: ['Error Type', 'Error Wrapping', 'Custom Errors', 'errors Package', 'Sentinel Errors']
      },
      {
        id: 8,
        title: 'Panic & Recover',
        description: 'Exception-like handling',
        topics: ['Panic', 'Recover', 'Defer', 'When to Panic', 'Graceful Degradation']
      }
    ]
  },
  {
    title: 'Standard Library',
    icon: Layers,
    color: 'bg-blue-500',
    steps: [
      {
        id: 9,
        title: 'Essential Packages',
        description: 'Core standard library',
        topics: ['fmt', 'strings', 'strconv', 'time', 'sort', 'math']
      },
      {
        id: 10,
        title: 'I/O & Files',
        description: 'File operations',
        topics: ['io', 'os', 'bufio', 'filepath', 'Reading/Writing Files']
      },
      {
        id: 11,
        title: 'Encoding',
        description: 'Data serialization',
        topics: ['encoding/json', 'encoding/xml', 'encoding/csv', 'Struct Tags', 'Custom Marshaling']
      }
    ]
  },
  {
    title: 'Web Development',
    icon: Globe,
    color: 'bg-green-500',
    steps: [
      {
        id: 12,
        title: 'net/http',
        description: 'Built-in HTTP package',
        topics: ['HTTP Server', 'Handlers', 'Middleware', 'ServeMux', 'HTTP Client']
      },
      {
        id: 13,
        title: 'Web Frameworks',
        description: 'Popular Go frameworks',
        topics: ['Gin', 'Echo', 'Fiber', 'Chi', 'Framework Comparison']
      },
      {
        id: 14,
        title: 'REST APIs',
        description: 'Build RESTful services',
        topics: ['Routing', 'JSON APIs', 'Validation', 'Error Responses', 'API Versioning']
      }
    ],
    milestone: 'You can build Go web services!'
  },
  {
    title: 'Databases',
    icon: Database,
    color: 'bg-orange-500',
    steps: [
      {
        id: 15,
        title: 'database/sql',
        description: 'Standard SQL interface',
        topics: ['Connection Pools', 'Queries', 'Prepared Statements', 'Transactions', 'Scanning']
      },
      {
        id: 16,
        title: 'ORMs & Query Builders',
        description: 'Database abstractions',
        topics: ['GORM', 'sqlx', 'sqlc', 'Migrations', 'Relationships']
      },
      {
        id: 17,
        title: 'NoSQL',
        description: 'Non-relational databases',
        topics: ['MongoDB', 'Redis', 'Cache Patterns', 'Key-Value Stores']
      }
    ]
  },
  {
    title: 'CLI Applications',
    icon: Terminal,
    color: 'bg-gray-700',
    steps: [
      {
        id: 18,
        title: 'CLI Development',
        description: 'Build command-line tools',
        topics: ['flag Package', 'Cobra', 'CLI Arguments', 'Interactive CLI', 'Configuration']
      }
    ]
  },
  {
    title: 'Testing',
    icon: TestTube,
    color: 'bg-teal-500',
    steps: [
      {
        id: 19,
        title: 'Testing in Go',
        description: 'Write tests',
        topics: ['testing Package', 'Table Tests', 'Benchmarks', 'Test Coverage', 'Subtests']
      },
      {
        id: 20,
        title: 'Advanced Testing',
        description: 'Comprehensive testing',
        topics: ['Mocking', 'httptest', 'Integration Tests', 'Testcontainers', 'Fuzzing']
      }
    ]
  },
  {
    title: 'Microservices',
    icon: Server,
    color: 'bg-purple-500',
    steps: [
      {
        id: 21,
        title: 'gRPC',
        description: 'High-performance RPC',
        topics: ['Protocol Buffers', 'gRPC Server', 'gRPC Client', 'Streaming', 'Interceptors']
      },
      {
        id: 22,
        title: 'Service Architecture',
        description: 'Distributed systems',
        topics: ['Service Discovery', 'Load Balancing', 'Circuit Breakers', 'Observability']
      }
    ]
  },
  {
    title: 'DevOps & Cloud',
    icon: Cloud,
    color: 'bg-sky-500',
    steps: [
      {
        id: 23,
        title: 'Docker & Kubernetes',
        description: 'Containerization',
        topics: ['Docker', 'Multi-stage Builds', 'Kubernetes', 'Helm', 'Operators']
      },
      {
        id: 24,
        title: 'Cloud Native Go',
        description: 'Cloud deployment',
        topics: ['Cloud Functions', 'Cloud Run', 'AWS Lambda', 'CI/CD', 'Infrastructure as Code']
      }
    ],
    milestone: 'You are a professional Go Developer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$75K - $100K', avg: '$87K' },
  { level: 'Mid (2-5 yrs)', range: '$100K - $150K', avg: '$125K' },
  { level: 'Senior (5-8 yrs)', range: '$150K - $200K', avg: '$172K' },
  { level: 'Lead (8+ yrs)', range: '$200K - $280K+', avg: '$230K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹5L - ₹10L', avg: '₹7L' },
  { level: 'Junior (1-3 yrs)', range: '₹10L - ₹18L', avg: '₹14L' },
  { level: 'Mid (3-5 yrs)', range: '₹18L - ₹35L', avg: '₹25L' },
  { level: 'Senior (5+ yrs)', range: '₹35L - ₹60L+', avg: '₹45L' }
];

// Project Ideas
const projects = [
  {
    title: 'CLI Task Manager',
    level: 'Beginner' as const,
    description: 'Command-line todo application',
    skills: ['CLI', 'File I/O', 'JSON', 'Cobra']
  },
  {
    title: 'REST API',
    level: 'Beginner' as const,
    description: 'CRUD API with Gin framework',
    skills: ['Gin', 'GORM', 'PostgreSQL', 'JSON']
  },
  {
    title: 'URL Shortener',
    level: 'Intermediate' as const,
    description: 'URL shortening service',
    skills: ['Redis', 'HTTP', 'Concurrency', 'Caching']
  },
  {
    title: 'Chat Server',
    level: 'Intermediate' as const,
    description: 'WebSocket chat application',
    skills: ['WebSockets', 'Goroutines', 'Channels', 'Real-time']
  },
  {
    title: 'gRPC Microservice',
    level: 'Advanced' as const,
    description: 'gRPC service with streaming',
    skills: ['gRPC', 'Protocol Buffers', 'Docker', 'Kubernetes']
  },
  {
    title: 'Distributed Cache',
    level: 'Advanced' as const,
    description: 'Distributed caching system',
    skills: ['Consistent Hashing', 'Replication', 'Concurrency', 'Networking']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to learn Go?',
    answer: 'Go is designed to be simple. You can learn the basics in 2-4 weeks. Building production services takes 2-3 months. Mastering concurrency patterns, microservices, and cloud-native development takes 6-12 months. Go\'s simplicity means you can be productive quickly.'
  },
  {
    question: 'Why should I learn Go in 2026?',
    answer: 'Go excels at building cloud infrastructure, microservices, and CLI tools. It powers Docker, Kubernetes, and many cloud-native tools. Companies like Google, Uber, and Twitch use Go. Excellent performance, simple syntax, and great concurrency make it highly valuable.'
  },
  {
    question: 'Go vs Rust - which should I learn?',
    answer: 'Go is simpler to learn and better for web services, APIs, and cloud infrastructure. Rust offers more safety and control, better for systems programming and performance-critical code. Learn Go for backend/cloud work, Rust for systems/embedded. Many teams use both.'
  },
  {
    question: 'Go vs Node.js - which is better for backend?',
    answer: 'Go offers better performance, simpler concurrency, and static typing. Node.js has a larger ecosystem and is better if you\'re already in JavaScript. Go is preferred for high-performance services, microservices, and cloud infrastructure. Node.js is fine for most web apps.'
  },
  {
    question: 'Is Go good for microservices?',
    answer: 'Go is excellent for microservices. Fast compilation, small binaries, efficient goroutines, and great standard library make it ideal. Most cloud-native tools (Docker, Kubernetes, Prometheus) are written in Go. gRPC support is first-class. Many companies choose Go for microservices.'
  },
  {
    question: 'Do I need to learn generics in Go?',
    answer: 'Generics were added in Go 1.18 and are increasingly important. While you can write Go without generics, understanding them helps with modern codebases and standard library. Learn basics first, then add generics. They simplify code that works with multiple types.'
  },
  {
    question: 'Which Go web framework should I use?',
    answer: 'Start with the standard library (net/http) to understand fundamentals. Then learn Gin (most popular), Echo, or Chi for production apps. Gin is beginner-friendly with good performance. For minimal overhead, Chi is excellent. The standard library is surprisingly capable.'
  },
  {
    question: 'How do I get a Go developer job?',
    answer: 'Build CLI tools, REST APIs, and a microservice project. Deploy to Kubernetes. Understand concurrency patterns well. Contribute to open-source Go projects. Show Docker/Kubernetes knowledge. Companies hiring Go developers often want cloud-native and DevOps skills.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'Backend Developer',
    description: 'General backend skills',
    href: '/roadmap/backend-developer',
    icon: Server,
    color: 'bg-green-500'
  },
  {
    title: 'DevOps Engineer',
    description: 'Go powers DevOps tools',
    href: '/roadmap/devops',
    icon: GitBranch,
    color: 'bg-orange-500'
  },
  {
    title: 'System Design',
    description: 'Design distributed systems',
    href: '/roadmap/system-design',
    icon: Settings,
    color: 'bg-purple-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Golang Developer Roadmap 2026',
  description: 'Complete guide to becoming a Go Developer in 2026',
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

export default function GolangRoadmapPage() {
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
          title="Golang Developer Roadmap"
          description="Master Go fundamentals, concurrency, web development, microservices, and cloud-native applications. Your complete guide to becoming a professional Go Developer in 2026."
          duration="3-6 Months"
          difficulty="Beginner Friendly"
          accentColor="#00ADD8"
        />

        <WhatIsSection
          title="What is a Go Developer?"
          paragraphs={[
            'Go (Golang) developers build high-performance backend systems, CLI tools, and cloud-native applications using Google\'s Go programming language. They leverage Go\'s simplicity, excellent concurrency model, and fast compilation to create efficient, scalable software.',
            'As a Go developer, you will build microservices, REST and gRPC APIs, command-line tools, and work extensively with cloud infrastructure and container technologies like Docker and Kubernetes.'
          ]}
          responsibilities={[
            'Build high-performance backend services',
            'Develop RESTful and gRPC APIs',
            'Implement concurrent systems with goroutines',
            'Create CLI tools and utilities',
            'Work with databases and caching',
            'Deploy to Kubernetes and cloud platforms',
            'Write tests and optimize performance'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#00ADD8"
        />

        <SalarySection
          title="Go Developer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Go developers are in high demand, especially for cloud-native and infrastructure roles. Companies like Google, Uber, Dropbox, and Cloudflare actively hire Go developers. Kubernetes and DevOps skills combined with Go command premium salaries."
          gradient="bg-gradient-to-r from-cyan-500 to-blue-600"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your Go Journey?"
          description="Get personalized guidance from experienced Go developers who have built cloud-native systems at scale."
          gradient="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500"
        />
      </main>

      <Footer />
    </>
  );
}
