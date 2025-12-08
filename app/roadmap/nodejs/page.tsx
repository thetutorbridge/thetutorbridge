'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Server,
  Box,
  Code,
  Database,
  Shield,
  Zap,
  Terminal,
  Layers,
  Globe,
  Settings,
  FileCode,
  GitBranch
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
    title: 'Node.js Fundamentals',
    icon: Server,
    color: 'bg-green-600',
    steps: [
      {
        id: 1,
        title: 'Introduction to Node.js',
        description: 'Understand what Node.js is',
        topics: ['What is Node.js', 'Node vs Browser', 'Event Loop', 'V8 Engine', 'Running Node']
      },
      {
        id: 2,
        title: 'Modules System',
        description: 'Organize your code',
        topics: ['CommonJS', 'ES Modules', 'Creating Modules', 'Module Resolution', 'Built-in Modules']
      }
    ],
    milestone: 'You understand Node.js basics!'
  },
  {
    title: 'Package Management',
    icon: Box,
    color: 'bg-red-500',
    steps: [
      {
        id: 3,
        title: 'npm Fundamentals',
        description: 'Manage dependencies',
        topics: ['package.json', 'Installing Packages', 'Scripts', 'Semantic Versioning', 'npm vs yarn vs pnpm']
      },
      {
        id: 4,
        title: 'Advanced npm',
        description: 'Professional package management',
        topics: ['Workspaces', 'Publishing Packages', 'Private Registry', 'Security Audits']
      }
    ]
  },
  {
    title: 'Async Programming',
    icon: Zap,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 5,
        title: 'Async Fundamentals',
        description: 'Handle async operations',
        topics: ['Callbacks', 'Promises', 'async/await', 'Error Handling', 'Promise.all']
      },
      {
        id: 6,
        title: 'Event System',
        description: 'Event-driven programming',
        topics: ['EventEmitter', 'Event Loop', 'process.nextTick', 'setImmediate', 'Timers']
      }
    ],
    milestone: 'You can handle async Node.js!'
  },
  {
    title: 'File System & Streams',
    icon: FileCode,
    color: 'bg-blue-500',
    steps: [
      {
        id: 7,
        title: 'File System',
        description: 'Work with files',
        topics: ['fs Module', 'Reading/Writing Files', 'Directories', 'File Watching', 'path Module']
      },
      {
        id: 8,
        title: 'Streams',
        description: 'Process data efficiently',
        topics: ['Readable Streams', 'Writable Streams', 'Transform Streams', 'Piping', 'Backpressure']
      }
    ]
  },
  {
    title: 'Web Frameworks',
    icon: Globe,
    color: 'bg-gray-700',
    steps: [
      {
        id: 9,
        title: 'Express.js',
        description: 'Most popular Node.js framework',
        topics: ['Routing', 'Middleware', 'Request/Response', 'Error Handling', 'Static Files']
      },
      {
        id: 10,
        title: 'Other Frameworks',
        description: 'Modern alternatives',
        topics: ['Fastify', 'NestJS', 'Hono', 'Koa', 'Framework Comparison']
      }
    ],
    milestone: 'You can build Node.js APIs!'
  },
  {
    title: 'APIs & Authentication',
    icon: Shield,
    color: 'bg-purple-500',
    steps: [
      {
        id: 11,
        title: 'RESTful APIs',
        description: 'Build REST APIs',
        topics: ['REST Principles', 'HTTP Methods', 'Status Codes', 'Validation', 'Documentation']
      },
      {
        id: 12,
        title: 'Authentication',
        description: 'Secure your APIs',
        topics: ['JWT', 'Sessions', 'OAuth 2.0', 'Passport.js', 'bcrypt', 'Refresh Tokens']
      }
    ]
  },
  {
    title: 'Databases',
    icon: Database,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 13,
        title: 'SQL Databases',
        description: 'Relational databases',
        topics: ['PostgreSQL', 'MySQL', 'Prisma', 'Drizzle', 'Knex.js', 'Migrations']
      },
      {
        id: 14,
        title: 'NoSQL Databases',
        description: 'Document databases',
        topics: ['MongoDB', 'Mongoose', 'Redis', 'Data Modeling', 'Indexes']
      }
    ]
  },
  {
    title: 'Testing',
    icon: Settings,
    color: 'bg-teal-500',
    steps: [
      {
        id: 15,
        title: 'Testing Node.js',
        description: 'Write reliable tests',
        topics: ['Jest', 'Vitest', 'Supertest', 'Mocking', 'Test Databases', 'Coverage']
      },
      {
        id: 16,
        title: 'Integration Testing',
        description: 'Test API endpoints',
        topics: ['API Testing', 'Database Testing', 'Test Containers', 'CI Integration']
      }
    ]
  },
  {
    title: 'Advanced Topics',
    icon: Terminal,
    color: 'bg-orange-500',
    steps: [
      {
        id: 17,
        title: 'Performance',
        description: 'Optimize Node.js apps',
        topics: ['Clustering', 'Worker Threads', 'Memory Management', 'Profiling', 'Caching']
      },
      {
        id: 18,
        title: 'Production Ready',
        description: 'Deploy to production',
        topics: ['PM2', 'Logging', 'Error Tracking', 'Environment Variables', 'Health Checks']
      }
    ]
  },
  {
    title: 'DevOps & Deployment',
    icon: GitBranch,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 19,
        title: 'Containerization',
        description: 'Docker for Node.js',
        topics: ['Dockerfile', 'Docker Compose', 'Multi-stage Builds', 'Best Practices']
      },
      {
        id: 20,
        title: 'Deployment',
        description: 'Deploy Node.js apps',
        topics: ['Cloud Platforms', 'CI/CD', 'Serverless', 'Monitoring', 'Scaling']
      }
    ],
    milestone: 'You are a professional Node.js Developer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$60K - $85K', avg: '$72K' },
  { level: 'Mid (2-5 yrs)', range: '$85K - $130K', avg: '$105K' },
  { level: 'Senior (5-8 yrs)', range: '$130K - $175K', avg: '$150K' },
  { level: 'Lead (8+ yrs)', range: '$175K - $240K+', avg: '$200K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹3.5L - ₹7L', avg: '₹5L' },
  { level: 'Junior (1-3 yrs)', range: '₹6L - ₹12L', avg: '₹9L' },
  { level: 'Mid (3-5 yrs)', range: '₹12L - ₹24L', avg: '₹17L' },
  { level: 'Senior (5+ yrs)', range: '₹24L - ₹45L+', avg: '₹32L' }
];

// Project Ideas
const projects = [
  {
    title: 'REST API',
    level: 'Beginner' as const,
    description: 'CRUD API for a todo app',
    skills: ['Express', 'REST', 'JSON', 'Postman']
  },
  {
    title: 'Authentication System',
    level: 'Beginner' as const,
    description: 'JWT auth with refresh tokens',
    skills: ['JWT', 'bcrypt', 'Middleware', 'Sessions']
  },
  {
    title: 'Blog API with Database',
    level: 'Intermediate' as const,
    description: 'Full CRUD with PostgreSQL',
    skills: ['Prisma', 'PostgreSQL', 'Validation', 'Relations']
  },
  {
    title: 'Real-time Chat Server',
    level: 'Intermediate' as const,
    description: 'WebSocket chat application',
    skills: ['Socket.io', 'Redis', 'Rooms', 'Events']
  },
  {
    title: 'E-Commerce Backend',
    level: 'Advanced' as const,
    description: 'Complete e-commerce API',
    skills: ['Payments', 'Orders', 'Inventory', 'Webhooks']
  },
  {
    title: 'Microservices Architecture',
    level: 'Advanced' as const,
    description: 'Distributed system with queues',
    skills: ['RabbitMQ', 'Docker', 'API Gateway', 'Service Discovery']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to learn Node.js?',
    answer: 'With JavaScript knowledge, you can learn Node.js basics in 2-4 weeks. Building REST APIs with Express takes 1-2 months. Becoming job-ready with databases, authentication, and testing takes 3-4 months. Mastering advanced patterns takes 6+ months of practice.'
  },
  {
    question: 'Do I need to learn JavaScript before Node.js?',
    answer: 'Yes, Node.js IS JavaScript running on the server. Strong JavaScript fundamentals are essential, especially async programming (promises, async/await), ES6+ features, and working with objects. Don\'t skip JavaScript - it will make Node.js much easier.'
  },
  {
    question: 'Express vs NestJS vs Fastify - which should I learn?',
    answer: 'Start with Express - it\'s the most popular, has the most tutorials, and is requested in most job postings. Once comfortable, learn Fastify (faster, modern) or NestJS (enterprise, TypeScript-first). Express knowledge transfers easily to other frameworks.'
  },
  {
    question: 'Should I learn MongoDB or PostgreSQL?',
    answer: 'Learn both, but PostgreSQL first. Relational databases are more common in production and teach important concepts. Then learn MongoDB for document-based use cases. Most Node.js developers need both. Use Prisma or Drizzle as your ORM.'
  },
  {
    question: 'Is Node.js still relevant in 2026?',
    answer: 'Absolutely. Node.js powers backends at Netflix, LinkedIn, Uber, and thousands of companies. The JavaScript ecosystem keeps growing. While alternatives like Go and Rust exist, Node.js remains one of the most in-demand backend technologies with excellent job prospects.'
  },
  {
    question: 'Node.js vs Python vs Go for backend?',
    answer: 'Node.js is excellent for I/O-heavy applications and when you want to use JavaScript full-stack. Python is better for data science integration. Go is better for CPU-heavy tasks. Node.js has the largest ecosystem and is great for most web applications.'
  },
  {
    question: 'Should I learn TypeScript with Node.js?',
    answer: 'Yes, TypeScript has become standard for professional Node.js development. It catches bugs early, improves code quality, and is expected in most companies. Learn JavaScript first, then add TypeScript. Frameworks like NestJS are TypeScript-first.'
  },
  {
    question: 'How do I get my first Node.js job?',
    answer: 'Build 3-5 backend projects with different databases and features. Deploy them (Render, Railway, or AWS). Write tests. Use TypeScript. Understand authentication and security. Prepare for system design questions. Apply for junior backend or full-stack roles.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'JavaScript Developer',
    description: 'Master JavaScript first',
    href: '/roadmap/javascript',
    icon: Code,
    color: 'bg-yellow-500'
  },
  {
    title: 'Backend Developer',
    description: 'Complete backend path',
    href: '/roadmap/backend-developer',
    icon: Server,
    color: 'bg-green-500'
  },
  {
    title: 'Full Stack Developer',
    description: 'Add frontend skills',
    href: '/roadmap/full-stack-developer',
    icon: Layers,
    color: 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66]'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Node.js Developer Roadmap 2026',
  description: 'Complete guide to becoming a Node.js developer in 2026',
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

export default function NodejsRoadmapPage() {
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
          title="Node.js Developer Roadmap"
          description="Master Node.js, Express, databases, authentication, and API development. Your complete guide to becoming a professional Node.js developer in 2026."
          duration="3-5 Months"
          difficulty="Beginner Friendly"
          accentColor="#339933"
        />

        <WhatIsSection
          title="What is a Node.js Developer?"
          paragraphs={[
            'Node.js developers build server-side applications and APIs using JavaScript. They leverage Node.js\'s event-driven, non-blocking architecture to create fast, scalable backend systems that power modern web applications.',
            'As a Node.js developer, you will design RESTful APIs, manage databases, implement authentication, handle real-time features, and ensure your applications are secure, tested, and production-ready.'
          ]}
          responsibilities={[
            'Build RESTful and GraphQL APIs',
            'Design and manage databases',
            'Implement authentication and authorization',
            'Handle file uploads and streaming',
            'Write unit and integration tests',
            'Optimize performance and scalability',
            'Deploy and monitor applications'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#339933"
        />

        <SalarySection
          title="Node.js Developer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Full-stack JavaScript developers (React + Node.js) are highly sought after. TypeScript skills and experience with NestJS or serverless boost salaries. Remote positions at US companies offer premium compensation."
          gradient="bg-gradient-to-r from-green-600 to-emerald-500"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your Node.js Journey?"
          description="Get personalized guidance from experienced Node.js developers who have built production systems."
          gradient="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500"
        />
      </main>

      <Footer />
    </>
  );
}
