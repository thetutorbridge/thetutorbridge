'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Globe,
  Code,
  GitBranch,
  Database,
  Server,
  Shield,
  Cloud,
  Layers,
  Monitor,
  Terminal
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
    title: 'Internet Fundamentals',
    icon: Globe,
    color: 'bg-blue-500',
    steps: [
      {
        id: 1,
        title: 'How the Internet Works',
        description: 'Understand networking fundamentals',
        topics: ['DNS', 'HTTP/HTTPS', 'TCP/IP', 'Ports', 'SSL/TLS']
      },
      {
        id: 2,
        title: 'Web Servers',
        description: 'Learn how servers handle requests',
        topics: ['Nginx', 'Apache', 'Request/Response', 'Load Balancing']
      }
    ],
    milestone: 'You understand how the web works!'
  },
  {
    title: 'Programming Language',
    icon: Code,
    color: 'bg-green-500',
    steps: [
      {
        id: 3,
        title: 'Choose a Language',
        description: 'Pick one: Node.js, Python, Go, or Java',
        topics: ['Node.js (Recommended)', 'Python', 'Go', 'Java']
      },
      {
        id: 4,
        title: 'Language Fundamentals',
        description: 'Master core programming concepts',
        topics: ['Variables', 'Functions', 'OOP', 'Data Structures']
      },
      {
        id: 5,
        title: 'Advanced Concepts',
        description: 'Deepen your language knowledge',
        topics: ['Async Programming', 'Error Handling', 'Modules', 'Testing']
      }
    ],
    milestone: 'You can write backend code!'
  },
  {
    title: 'Version Control',
    icon: GitBranch,
    color: 'bg-orange-500',
    steps: [
      {
        id: 6,
        title: 'Git Fundamentals',
        description: 'Track and manage code changes',
        topics: ['Commits', 'Branches', 'Merging', 'Rebasing']
      },
      {
        id: 7,
        title: 'GitHub Collaboration',
        description: 'Work with teams effectively',
        topics: ['Pull Requests', 'Code Reviews', 'CI/CD', 'Actions']
      }
    ]
  },
  {
    title: 'Databases',
    icon: Database,
    color: 'bg-purple-500',
    steps: [
      {
        id: 8,
        title: 'Relational Databases',
        description: 'SQL and relational data modeling',
        topics: ['PostgreSQL', 'MySQL', 'SQL Queries', 'Joins', 'Indexes']
      },
      {
        id: 9,
        title: 'NoSQL Databases',
        description: 'Document and key-value stores',
        topics: ['MongoDB', 'Redis', 'Firebase', 'DynamoDB']
      },
      {
        id: 10,
        title: 'ORMs & Query Builders',
        description: 'Abstract database interactions',
        topics: ['Prisma', 'Drizzle', 'TypeORM', 'Sequelize']
      }
    ],
    milestone: 'You can work with databases!'
  },
  {
    title: 'APIs',
    icon: Server,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 11,
        title: 'REST APIs',
        description: 'Build RESTful web services',
        topics: ['HTTP Methods', 'Status Codes', 'CRUD', 'Best Practices']
      },
      {
        id: 12,
        title: 'API Frameworks',
        description: 'Use frameworks to build APIs faster',
        topics: ['Express.js', 'Fastify', 'NestJS', 'Hono']
      },
      {
        id: 13,
        title: 'Authentication',
        description: 'Secure your APIs',
        topics: ['JWT', 'OAuth 2.0', 'Sessions', 'API Keys']
      },
      {
        id: 14,
        title: 'GraphQL (Optional)',
        description: 'Alternative to REST',
        topics: ['Schema', 'Queries', 'Mutations', 'Apollo Server']
      }
    ],
    milestone: 'You can build APIs!'
  },
  {
    title: 'Security',
    icon: Shield,
    color: 'bg-red-500',
    steps: [
      {
        id: 15,
        title: 'Web Security',
        description: 'Protect against common vulnerabilities',
        topics: ['OWASP Top 10', 'XSS', 'CSRF', 'SQL Injection']
      },
      {
        id: 16,
        title: 'Security Best Practices',
        description: 'Implement security measures',
        topics: ['Input Validation', 'Encryption', 'HTTPS', 'Rate Limiting']
      }
    ]
  },
  {
    title: 'DevOps Basics',
    icon: Cloud,
    color: 'bg-sky-500',
    steps: [
      {
        id: 17,
        title: 'Linux & Terminal',
        description: 'Command line proficiency',
        topics: ['Bash', 'SSH', 'File System', 'Processes']
      },
      {
        id: 18,
        title: 'Docker',
        description: 'Containerize applications',
        topics: ['Images', 'Containers', 'Dockerfile', 'Docker Compose']
      },
      {
        id: 19,
        title: 'Cloud Deployment',
        description: 'Deploy to the cloud',
        topics: ['AWS', 'GCP', 'Vercel', 'Railway', 'Render']
      },
      {
        id: 20,
        title: 'CI/CD',
        description: 'Automate deployments',
        topics: ['GitHub Actions', 'Jenkins', 'Testing', 'Monitoring']
      }
    ],
    milestone: 'You are a professional Backend Developer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$65K - $90K', avg: '$77K' },
  { level: 'Mid (2-5 yrs)', range: '$90K - $140K', avg: '$115K' },
  { level: 'Senior (5-8 yrs)', range: '$140K - $190K', avg: '$160K' },
  { level: 'Lead (8+ yrs)', range: '$190K - $280K+', avg: '$230K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹4L - ₹8L', avg: '₹6L' },
  { level: 'Junior (1-3 yrs)', range: '₹7L - ₹15L', avg: '₹10L' },
  { level: 'Mid (3-5 yrs)', range: '₹15L - ₹28L', avg: '₹20L' },
  { level: 'Senior (5+ yrs)', range: '₹28L - ₹55L+', avg: '₹38L' }
];

// Project Ideas
const projects = [
  {
    title: 'REST API',
    level: 'Beginner' as const,
    description: 'Build a simple CRUD API for a todo app',
    skills: ['Node.js', 'Express', 'JSON']
  },
  {
    title: 'Authentication System',
    level: 'Beginner' as const,
    description: 'JWT-based user auth with registration/login',
    skills: ['JWT', 'bcrypt', 'Middleware']
  },
  {
    title: 'Blog API',
    level: 'Intermediate' as const,
    description: 'Full-featured blog with posts, comments, users',
    skills: ['PostgreSQL', 'Prisma', 'Validation']
  },
  {
    title: 'E-Commerce Backend',
    level: 'Advanced' as const,
    description: 'Products, cart, orders, payment integration',
    skills: ['Stripe', 'Redis', 'Queue']
  },
  {
    title: 'Real-time Chat',
    level: 'Advanced' as const,
    description: 'WebSocket-based chat application',
    skills: ['Socket.io', 'MongoDB', 'Redis']
  },
  {
    title: 'URL Shortener',
    level: 'Intermediate' as const,
    description: 'Shorten URLs with analytics tracking',
    skills: ['Redis', 'Analytics', 'Caching']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to become a backend developer?',
    answer: 'With 3-4 hours of daily practice, you can become job-ready in 5-8 months. This includes learning a programming language, databases, APIs, and basic DevOps. Reaching senior level typically takes 3-5 years of professional experience.'
  },
  {
    question: 'Which programming language should I learn first?',
    answer: 'We recommend Node.js (JavaScript) due to its popularity, vast ecosystem, and the ability to use one language for both frontend and backend. Python is great for data-heavy applications, while Go excels in performance-critical systems.'
  },
  {
    question: 'Do I need to learn frontend development?',
    answer: 'Not required, but understanding basic HTML/CSS/JavaScript helps you collaborate better with frontend developers and debug issues. Many backend developers know enough frontend to build simple interfaces when needed.'
  },
  {
    question: 'SQL or NoSQL - which should I learn?',
    answer: 'Learn SQL first (PostgreSQL recommended). Relational databases are more common in production systems and SQL skills transfer across all databases. Learn NoSQL (MongoDB, Redis) afterward for specific use cases.'
  },
  {
    question: 'Is Docker necessary for backend development?',
    answer: 'Docker has become essential in modern development. It ensures consistency across environments, simplifies deployment, and is expected in most job postings. Learn the basics early in your journey.'
  },
  {
    question: 'How important is system design knowledge?',
    answer: 'System design becomes crucial as you advance. Junior roles focus on coding, but mid-level and senior positions require understanding scalability, caching, load balancing, and distributed systems. Start learning basics early.'
  },
  {
    question: 'Should I learn microservices or monoliths?',
    answer: 'Start with monolithic architecture - it is simpler and sufficient for most applications. Learn microservices concepts later when you understand the problems they solve. Many companies still use well-structured monoliths.'
  },
  {
    question: 'What is the best way to practice backend development?',
    answer: 'Build real projects! Start with simple APIs, then add databases, authentication, and deployment. Contribute to open source, recreate popular services (URL shortener, chat app), and deploy everything you build.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'Full Stack Developer',
    description: 'Add frontend skills with React and Next.js',
    href: '/roadmap/full-stack-developer',
    icon: Layers,
    color: 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66]'
  },
  {
    title: 'Frontend Developer',
    description: 'Build beautiful user interfaces',
    href: '/roadmap/frontend-developer',
    icon: Monitor,
    color: 'bg-purple-500'
  },
  {
    title: 'DevOps Engineer',
    description: 'Master deployment and infrastructure',
    href: '/roadmap/devops-engineer',
    icon: Cloud,
    color: 'bg-orange-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Backend Developer Roadmap 2026',
  description: 'Complete guide to becoming a backend developer in 2026',
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

export default function BackendDeveloperRoadmapPage() {
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
          title="Backend Developer Roadmap"
          description="Master server-side programming, databases, APIs, security, and DevOps. Your complete guide to becoming a professional backend developer in 2026."
          duration="5-8 Months"
          difficulty="Intermediate"
          accentColor="#10B981"
        />

        <WhatIsSection
          title="What is a Backend Developer?"
          paragraphs={[
            'Backend developers build the server-side of web applications - the part users do not see. They create APIs, manage databases, handle authentication, and ensure applications are secure, scalable, and performant.',
            'As a backend developer, you will write server logic, design database schemas, build RESTful APIs, implement security measures, and deploy applications to the cloud.'
          ]}
          responsibilities={[
            'Design and implement server-side logic',
            'Build and maintain databases and data models',
            'Create RESTful APIs and web services',
            'Implement authentication and authorization',
            'Ensure application security and performance',
            'Write unit and integration tests',
            'Deploy and monitor applications',
            'Collaborate with frontend developers'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#10B981"
        />

        <SalarySection
          title="Backend Developer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Backend developers with cloud expertise (AWS/GCP) and system design skills command premium salaries. Senior backend engineers at top tech companies can earn $300K+ with equity."
          gradient="bg-gradient-to-r from-green-600 to-teal-600"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your Backend Journey?"
          description="Get personalized guidance from experienced backend developers who have built scalable systems."
          gradient="bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600"
        />
      </main>

      <Footer />
    </>
  );
}
