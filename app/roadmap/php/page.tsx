'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Code,
  Database,
  Globe,
  Layers,
  Shield,
  Settings,
  TestTube,
  Rocket,
  Box,
  Server,
  Zap,
  FileCode
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
    title: 'PHP Fundamentals',
    icon: Code,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 1,
        title: 'PHP Basics',
        description: 'Core PHP syntax',
        topics: ['Variables', 'Data Types', 'Operators', 'Control Structures', 'Functions', 'Arrays']
      },
      {
        id: 2,
        title: 'PHP 8 Features',
        description: 'Modern PHP',
        topics: ['Named Arguments', 'Attributes', 'Match Expression', 'Nullsafe Operator', 'Union Types', 'JIT']
      }
    ],
    milestone: 'You know PHP basics!'
  },
  {
    title: 'Object-Oriented PHP',
    icon: Layers,
    color: 'bg-purple-500',
    steps: [
      {
        id: 3,
        title: 'OOP Fundamentals',
        description: 'Object-oriented programming',
        topics: ['Classes', 'Objects', 'Inheritance', 'Encapsulation', 'Polymorphism', 'Interfaces']
      },
      {
        id: 4,
        title: 'Advanced OOP',
        description: 'Advanced concepts',
        topics: ['Traits', 'Abstract Classes', 'Namespaces', 'Autoloading', 'Design Patterns', 'SOLID Principles']
      }
    ]
  },
  {
    title: 'Composer & Dependencies',
    icon: Box,
    color: 'bg-orange-500',
    steps: [
      {
        id: 5,
        title: 'Composer',
        description: 'Package management',
        topics: ['Installing Packages', 'Autoloading', 'composer.json', 'Semantic Versioning', 'Packagist']
      },
      {
        id: 6,
        title: 'Common Packages',
        description: 'Essential libraries',
        topics: ['Guzzle', 'Carbon', 'Monolog', 'PHPMailer', 'Faker', 'Dotenv']
      }
    ]
  },
  {
    title: 'Database & MySQL',
    icon: Database,
    color: 'bg-blue-500',
    steps: [
      {
        id: 7,
        title: 'MySQL Fundamentals',
        description: 'Database basics',
        topics: ['SQL Queries', 'CRUD Operations', 'JOINs', 'Indexes', 'Normalization', 'Transactions']
      },
      {
        id: 8,
        title: 'PHP Database Access',
        description: 'Connect PHP to databases',
        topics: ['PDO', 'Prepared Statements', 'Query Builder', 'Migrations', 'Seeding', 'Eloquent ORM']
      }
    ],
    milestone: 'You can build database apps!'
  },
  {
    title: 'Laravel Framework',
    icon: Zap,
    color: 'bg-red-500',
    steps: [
      {
        id: 9,
        title: 'Laravel Basics',
        description: 'Laravel fundamentals',
        topics: ['Routing', 'Controllers', 'Views', 'Blade Templates', 'Eloquent', 'Migrations']
      },
      {
        id: 10,
        title: 'Laravel Advanced',
        description: 'Advanced Laravel features',
        topics: ['Middleware', 'Authentication', 'Authorization', 'Events', 'Queues', 'Broadcasting']
      },
      {
        id: 11,
        title: 'Laravel Ecosystem',
        description: 'Laravel tools',
        topics: ['Laravel Livewire', 'Inertia.js', 'Laravel Sanctum', 'Laravel Horizon', 'Laravel Nova']
      }
    ]
  },
  {
    title: 'APIs & Web Services',
    icon: Globe,
    color: 'bg-green-500',
    steps: [
      {
        id: 12,
        title: 'REST APIs',
        description: 'Build RESTful APIs',
        topics: ['REST Principles', 'API Resources', 'JSON Responses', 'API Versioning', 'Rate Limiting']
      },
      {
        id: 13,
        title: 'API Authentication',
        description: 'Secure your APIs',
        topics: ['JWT', 'OAuth 2.0', 'API Keys', 'Laravel Passport', 'Laravel Sanctum']
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
        title: 'PHP Testing',
        description: 'Test your code',
        topics: ['PHPUnit', 'Unit Tests', 'Feature Tests', 'Mocking', 'Test Coverage', 'TDD']
      },
      {
        id: 15,
        title: 'Laravel Testing',
        description: 'Laravel test tools',
        topics: ['HTTP Tests', 'Database Tests', 'Browser Tests', 'Dusk', 'Pest PHP']
      }
    ],
    milestone: 'You can write tested code!'
  },
  {
    title: 'Security',
    icon: Shield,
    color: 'bg-rose-500',
    steps: [
      {
        id: 16,
        title: 'PHP Security',
        description: 'Secure PHP apps',
        topics: ['SQL Injection', 'XSS', 'CSRF', 'Input Validation', 'Password Hashing', 'HTTPS']
      },
      {
        id: 17,
        title: 'Authentication',
        description: 'User authentication',
        topics: ['Sessions', 'Cookies', 'Password Reset', 'Two-Factor Auth', 'Social Login']
      }
    ]
  },
  {
    title: 'Performance & Caching',
    icon: Settings,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 18,
        title: 'Performance',
        description: 'Optimize PHP apps',
        topics: ['OPcache', 'Query Optimization', 'Profiling', 'N+1 Problem', 'Lazy Loading']
      },
      {
        id: 19,
        title: 'Caching',
        description: 'Cache strategies',
        topics: ['Redis', 'Memcached', 'Cache Drivers', 'Cache Tags', 'Cache Invalidation']
      }
    ]
  },
  {
    title: 'Deployment & DevOps',
    icon: Rocket,
    color: 'bg-emerald-500',
    steps: [
      {
        id: 20,
        title: 'Server Setup',
        description: 'Deploy PHP apps',
        topics: ['Nginx', 'Apache', 'PHP-FPM', 'SSL Certificates', 'Server Configuration']
      },
      {
        id: 21,
        title: 'CI/CD & Hosting',
        description: 'Automated deployment',
        topics: ['GitHub Actions', 'Laravel Forge', 'Envoyer', 'Docker', 'Cloud Hosting']
      }
    ],
    milestone: 'You are a PHP Developer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$55K - $75K', avg: '$65K' },
  { level: 'Mid (2-5 yrs)', range: '$75K - $105K', avg: '$90K' },
  { level: 'Senior (5-8 yrs)', range: '$100K - $140K', avg: '$120K' },
  { level: 'Lead (8+ yrs)', range: '$130K - $180K+', avg: '$155K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹3L - ₹6L', avg: '₹4.5L' },
  { level: 'Junior (1-3 yrs)', range: '₹5L - ₹10L', avg: '₹7L' },
  { level: 'Mid (3-5 yrs)', range: '₹10L - ₹18L', avg: '₹14L' },
  { level: 'Senior (5+ yrs)', range: '₹18L - ₹35L+', avg: '₹25L' }
];

// Project Ideas
const projects = [
  {
    title: 'Blog System',
    level: 'Beginner' as const,
    description: 'CRUD blog with authentication',
    skills: ['PHP Basics', 'MySQL', 'Sessions', 'CRUD']
  },
  {
    title: 'REST API',
    level: 'Beginner' as const,
    description: 'Build a RESTful API',
    skills: ['JSON', 'HTTP Methods', 'PDO', 'Authentication']
  },
  {
    title: 'E-commerce Platform',
    level: 'Intermediate' as const,
    description: 'Full shopping site with Laravel',
    skills: ['Laravel', 'Stripe', 'Eloquent', 'Queues']
  },
  {
    title: 'SaaS Application',
    level: 'Intermediate' as const,
    description: 'Multi-tenant SaaS app',
    skills: ['Laravel', 'Subscriptions', 'Multi-tenancy', 'Billing']
  },
  {
    title: 'Real-time Chat',
    level: 'Advanced' as const,
    description: 'WebSocket chat application',
    skills: ['Laravel', 'WebSockets', 'Broadcasting', 'Redis']
  },
  {
    title: 'CMS Platform',
    level: 'Advanced' as const,
    description: 'Content management system',
    skills: ['Laravel', 'Admin Panel', 'Media Library', 'Permissions']
  }
];

// FAQs
const faqs = [
  {
    question: 'Is PHP still relevant in 2026?',
    answer: 'Yes, PHP powers 77% of websites including WordPress, Facebook, and Wikipedia. PHP 8 brought major improvements with JIT compilation. Laravel remains one of the most popular frameworks. Billions of lines of PHP code need maintenance and development.'
  },
  {
    question: 'How long does it take to learn PHP?',
    answer: 'PHP basics can be learned in 4-6 weeks. Building simple applications takes 2-3 months. Mastering Laravel and building production apps takes 6-9 months. The language is beginner-friendly but has depth for advanced development.'
  },
  {
    question: 'Laravel vs Symfony - which should I learn?',
    answer: 'Start with Laravel - it\'s more beginner-friendly and has better documentation. Laravel dominates job postings. Symfony is more enterprise-focused and modular. Many Laravel components use Symfony packages. Learn Laravel first, add Symfony later if needed.'
  },
  {
    question: 'PHP vs Node.js vs Python - which is better?',
    answer: 'Each has strengths. PHP excels at web development with mature ecosystem. Node.js offers full-stack JavaScript. Python leads in AI/ML. PHP has the lowest learning curve for web development. Choose based on job market and project type in your area.'
  },
  {
    question: 'Do I need to learn WordPress?',
    answer: 'WordPress knowledge is valuable but optional. It powers 43% of websites, creating many jobs. However, you can have a successful PHP career without WordPress. Laravel developers often earn more. Consider WordPress for freelancing or agency work.'
  },
  {
    question: 'Is PHP good for beginners?',
    answer: 'Excellent choice for beginners. PHP was designed for web development, has gentle learning curve, and shows results quickly. Great documentation, huge community, and many tutorials. Easy to deploy on cheap hosting. Fast path to building real applications.'
  },
  {
    question: 'What about PHP performance?',
    answer: 'PHP 8 with JIT is significantly faster than previous versions. With OPcache, proper caching (Redis), and optimized queries, PHP apps perform excellently. Facebook (now Meta) proves PHP can scale to billions of users. Performance is rarely a bottleneck.'
  },
  {
    question: 'How do I get a PHP job?',
    answer: 'Build a portfolio with Laravel projects. Learn Git, MySQL, and REST APIs. Understand MVC architecture. Know testing basics with PHPUnit. Many companies hire PHP developers; job market is stable. Consider both startups and agencies.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'Backend Developer',
    description: 'Backend fundamentals',
    href: '/roadmap/backend-developer',
    icon: Server,
    color: 'bg-green-500'
  },
  {
    title: 'SQL',
    description: 'Database skills',
    href: '/roadmap/sql',
    icon: Database,
    color: 'bg-blue-500'
  },
  {
    title: 'JavaScript',
    description: 'Frontend complement',
    href: '/roadmap/javascript',
    icon: Code,
    color: 'bg-yellow-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'PHP Developer Roadmap 2026',
  description: 'Complete guide to becoming a PHP Developer in 2026',
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

export default function PHPRoadmapPage() {
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
          title="PHP Developer Roadmap"
          description="Master PHP 8, Laravel, MySQL, REST APIs, testing, and modern development practices. Your complete guide to becoming a professional PHP Developer in 2026."
          duration="4-6 Months"
          difficulty="Beginner Friendly"
          accentColor="#777BB4"
        />

        <WhatIsSection
          title="What is a PHP Developer?"
          paragraphs={[
            'PHP developers build server-side web applications using PHP, one of the most widely-used programming languages on the web. They create dynamic websites, APIs, and web applications that power millions of sites worldwide.',
            'As a PHP developer, you will write backend logic, interact with databases, build RESTful APIs, implement authentication, and develop applications using frameworks like Laravel or Symfony.'
          ]}
          responsibilities={[
            'Build server-side web applications',
            'Design and implement REST APIs',
            'Work with MySQL and other databases',
            'Develop applications with Laravel/Symfony',
            'Write unit and integration tests',
            'Implement security best practices',
            'Deploy and maintain PHP applications'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#777BB4"
        />

        <SalarySection
          title="PHP Developer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="PHP salaries vary significantly by specialization. Laravel developers command higher salaries than WordPress developers. E-commerce and fintech PHP roles pay premiums. Senior developers with DevOps skills are highly valued."
          gradient="bg-gradient-to-r from-indigo-500 to-purple-600"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your PHP Journey?"
          description="Get personalized guidance from experienced PHP developers who have built successful web applications."
          gradient="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        />
      </main>

      <Footer />
    </>
  );
}
