'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Code,
  Server,
  Database,
  Shield,
  Globe,
  Layers,
  Settings,
  Cloud,
  Zap,
  TestTube,
  GitBranch,
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
    title: 'C# Fundamentals',
    icon: Code,
    color: 'bg-purple-600',
    steps: [
      {
        id: 1,
        title: 'C# Basics',
        description: 'Learn the C# language',
        topics: ['Syntax', 'Variables', 'Control Flow', 'Methods', 'Classes', 'Namespaces']
      },
      {
        id: 2,
        title: 'Object-Oriented Programming',
        description: 'Master OOP in C#',
        topics: ['Classes & Objects', 'Inheritance', 'Interfaces', 'Polymorphism', 'Abstraction']
      },
      {
        id: 3,
        title: 'Advanced C#',
        description: 'Advanced language features',
        topics: ['Generics', 'LINQ', 'Async/Await', 'Delegates', 'Events', 'Extension Methods']
      }
    ],
    milestone: 'You know C#!'
  },
  {
    title: '.NET Fundamentals',
    icon: Layers,
    color: 'bg-blue-600',
    steps: [
      {
        id: 4,
        title: '.NET Basics',
        description: 'Understand the .NET platform',
        topics: ['.NET 8', 'CLR', 'BCL', 'NuGet', 'Project Structure', 'SDK vs Runtime']
      },
      {
        id: 5,
        title: 'Collections & Data',
        description: 'Working with data',
        topics: ['Collections', 'Generics', 'Serialization', 'JSON', 'File I/O']
      }
    ]
  },
  {
    title: 'ASP.NET Core Basics',
    icon: Server,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 6,
        title: 'Web Fundamentals',
        description: 'HTTP and web basics',
        topics: ['HTTP', 'Request/Response', 'Middleware', 'Hosting', 'Configuration']
      },
      {
        id: 7,
        title: 'MVC Pattern',
        description: 'Model-View-Controller',
        topics: ['Controllers', 'Views', 'Models', 'Routing', 'Tag Helpers', 'Razor']
      },
      {
        id: 8,
        title: 'Minimal APIs',
        description: 'Lightweight API development',
        topics: ['Minimal API Syntax', 'Route Handlers', 'Parameter Binding', 'Endpoints']
      }
    ],
    milestone: 'You can build ASP.NET Core apps!'
  },
  {
    title: 'Web APIs',
    icon: Globe,
    color: 'bg-green-500',
    steps: [
      {
        id: 9,
        title: 'REST API Development',
        description: 'Build RESTful APIs',
        topics: ['Controllers', 'HTTP Methods', 'Status Codes', 'Content Negotiation', 'Versioning']
      },
      {
        id: 10,
        title: 'API Best Practices',
        description: 'Professional API development',
        topics: ['Validation', 'Error Handling', 'Logging', 'CORS', 'Documentation']
      },
      {
        id: 11,
        title: 'OpenAPI & Swagger',
        description: 'API documentation',
        topics: ['Swagger', 'OpenAPI Spec', 'Swashbuckle', 'API Testing']
      }
    ]
  },
  {
    title: 'Data Access',
    icon: Database,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 12,
        title: 'Entity Framework Core',
        description: 'ORM for .NET',
        topics: ['DbContext', 'Entities', 'Migrations', 'Queries', 'Relationships', 'Fluent API']
      },
      {
        id: 13,
        title: 'Advanced EF Core',
        description: 'Complex data operations',
        topics: ['Change Tracking', 'Raw SQL', 'Performance', 'Concurrency', 'Database Providers']
      },
      {
        id: 14,
        title: 'Dapper & Alternatives',
        description: 'Other data access options',
        topics: ['Dapper', 'ADO.NET', 'Repository Pattern', 'Unit of Work']
      }
    ],
    milestone: 'You can work with databases!'
  },
  {
    title: 'Authentication & Security',
    icon: Shield,
    color: 'bg-red-500',
    steps: [
      {
        id: 15,
        title: 'ASP.NET Core Identity',
        description: 'User management',
        topics: ['Identity', 'User Manager', 'Role Manager', 'Claims', 'Password Hashing']
      },
      {
        id: 16,
        title: 'JWT Authentication',
        description: 'Token-based auth',
        topics: ['JWT', 'Bearer Tokens', 'Refresh Tokens', 'Token Validation']
      },
      {
        id: 17,
        title: 'OAuth & External Auth',
        description: 'Third-party authentication',
        topics: ['OAuth 2.0', 'OpenID Connect', 'Google/Microsoft Auth', 'IdentityServer']
      }
    ]
  },
  {
    title: 'Architecture',
    icon: Settings,
    color: 'bg-orange-500',
    steps: [
      {
        id: 18,
        title: 'Clean Architecture',
        description: 'Scalable app architecture',
        topics: ['Layers', 'Dependencies', 'Domain Layer', 'Application Layer', 'Infrastructure']
      },
      {
        id: 19,
        title: 'Dependency Injection',
        description: 'Built-in DI container',
        topics: ['Service Lifetimes', 'Registration', 'Scopes', 'Options Pattern']
      },
      {
        id: 20,
        title: 'CQRS & MediatR',
        description: 'Advanced patterns',
        topics: ['CQRS Pattern', 'MediatR', 'Commands', 'Queries', 'Handlers']
      }
    ]
  },
  {
    title: 'Real-Time & Advanced',
    icon: Zap,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 21,
        title: 'SignalR',
        description: 'Real-time communication',
        topics: ['Hubs', 'Clients', 'Groups', 'Streaming', 'Azure SignalR']
      },
      {
        id: 22,
        title: 'Background Services',
        description: 'Background processing',
        topics: ['Hosted Services', 'Background Tasks', 'Hangfire', 'Worker Services']
      }
    ]
  },
  {
    title: 'Testing',
    icon: TestTube,
    color: 'bg-teal-500',
    steps: [
      {
        id: 23,
        title: 'Unit Testing',
        description: 'Test your code',
        topics: ['xUnit', 'Mocking', 'Test Fixtures', 'Assertions', 'AAA Pattern']
      },
      {
        id: 24,
        title: 'Integration Testing',
        description: 'Test APIs end-to-end',
        topics: ['WebApplicationFactory', 'Test Server', 'Database Testing', 'Authentication Testing']
      }
    ]
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    color: 'bg-sky-500',
    steps: [
      {
        id: 25,
        title: 'Azure Deployment',
        description: 'Deploy to Azure',
        topics: ['Azure App Service', 'Azure SQL', 'Azure Functions', 'Application Insights']
      },
      {
        id: 26,
        title: 'Containers & CI/CD',
        description: 'Modern deployment',
        topics: ['Docker', 'Container Registry', 'GitHub Actions', 'Azure DevOps']
      }
    ],
    milestone: 'You are a professional ASP.NET Core Developer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$70K - $95K', avg: '$82K' },
  { level: 'Mid (2-5 yrs)', range: '$95K - $135K', avg: '$112K' },
  { level: 'Senior (5-8 yrs)', range: '$135K - $175K', avg: '$152K' },
  { level: 'Lead (8+ yrs)', range: '$175K - $230K+', avg: '$195K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹4L - ₹8L', avg: '₹6L' },
  { level: 'Junior (1-3 yrs)', range: '₹7L - ₹14L', avg: '₹10L' },
  { level: 'Mid (3-5 yrs)', range: '₹14L - ₹26L', avg: '₹19L' },
  { level: 'Senior (5+ yrs)', range: '₹26L - ₹50L+', avg: '₹35L' }
];

// Project Ideas
const projects = [
  {
    title: 'REST API',
    level: 'Beginner' as const,
    description: 'CRUD API with Entity Framework',
    skills: ['Controllers', 'EF Core', 'Validation', 'Swagger']
  },
  {
    title: 'Auth System',
    level: 'Beginner' as const,
    description: 'JWT authentication implementation',
    skills: ['Identity', 'JWT', 'Middleware', 'Authorization']
  },
  {
    title: 'Blog Platform',
    level: 'Intermediate' as const,
    description: 'Full blog with admin panel',
    skills: ['MVC', 'Razor', 'EF Core', 'File Upload']
  },
  {
    title: 'Real-Time Chat',
    level: 'Intermediate' as const,
    description: 'Chat app with SignalR',
    skills: ['SignalR', 'Authentication', 'Groups', 'Persistence']
  },
  {
    title: 'E-Commerce API',
    level: 'Advanced' as const,
    description: 'Complete e-commerce backend',
    skills: ['Clean Architecture', 'CQRS', 'Payments', 'Testing']
  },
  {
    title: 'Microservices',
    level: 'Advanced' as const,
    description: 'Distributed .NET services',
    skills: ['Docker', 'RabbitMQ', 'gRPC', 'API Gateway']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to learn ASP.NET Core?',
    answer: 'With C# basics, you can learn ASP.NET Core fundamentals in 2-3 months. Building production-ready applications with authentication, databases, and proper architecture takes 4-6 months. Mastering advanced topics like microservices and cloud deployment takes 8-12 months.'
  },
  {
    question: 'Should I learn ASP.NET Core or Node.js?',
    answer: 'ASP.NET Core is excellent for enterprise applications, offers great performance, and is preferred in Microsoft-centric organizations. Node.js is more popular in startups and for JavaScript full-stack development. Choose ASP.NET Core if you prefer C# or target enterprise environments.'
  },
  {
    question: 'Is .NET still relevant in 2026?',
    answer: 'Yes, .NET is highly relevant. Microsoft heavily invests in .NET, which powers Azure services. .NET 8+ offers excellent performance, cross-platform support, and modern features. Many enterprises rely on .NET, ensuring strong job demand and competitive salaries.'
  },
  {
    question: 'Should I learn .NET Framework or .NET Core?',
    answer: 'Learn .NET 8 (formerly .NET Core). The old .NET Framework is legacy and Windows-only. Modern .NET is cross-platform, faster, and actively developed. New projects should always use .NET 8+. Framework knowledge only helps for maintaining legacy applications.'
  },
  {
    question: 'Minimal APIs vs Controllers - which should I use?',
    answer: 'Start with Controllers (MVC pattern) as they\'re more structured and easier to learn. Minimal APIs are great for microservices and simple APIs with less boilerplate. Controllers work better for large applications with complex requirements. Learn both.'
  },
  {
    question: 'What database should I use with ASP.NET Core?',
    answer: 'SQL Server integrates best with .NET and Entity Framework. PostgreSQL is a great open-source alternative. For learning, SQLite works without setup. Entity Framework Core supports most databases. Choose based on your project needs and existing infrastructure.'
  },
  {
    question: 'How important is Azure for .NET developers?',
    answer: 'Azure skills significantly boost employability for .NET developers. Microsoft\'s ecosystem (C#, .NET, Azure, Visual Studio) works seamlessly together. Many enterprises using .NET also use Azure. Learn Azure App Service, Azure SQL, and Azure Functions at minimum.'
  },
  {
    question: 'How do I get my first ASP.NET Core job?',
    answer: 'Build 3-5 projects showing REST APIs, authentication, and database skills. Use Clean Architecture patterns. Deploy to Azure. Write tests. Know Entity Framework well. Prepare for questions on C#, ASP.NET Core pipeline, dependency injection, and SQL.'
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
    title: 'Full Stack Developer',
    description: 'Add frontend skills',
    href: '/roadmap/full-stack-developer',
    icon: Layers,
    color: 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66]'
  },
  {
    title: 'DevOps Engineer',
    description: 'Deployment and CI/CD',
    href: '/roadmap/devops',
    icon: GitBranch,
    color: 'bg-orange-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'ASP.NET Core Developer Roadmap 2026',
  description: 'Complete guide to becoming an ASP.NET Core Developer in 2026',
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

export default function AspNetCoreRoadmapPage() {
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
          title="ASP.NET Core Roadmap"
          description="Master C#, .NET, Web APIs, Entity Framework, authentication, and Azure deployment. Your complete guide to becoming a professional ASP.NET Core Developer in 2026."
          duration="4-8 Months"
          difficulty="Intermediate"
          accentColor="#512BD4"
        />

        <WhatIsSection
          title="What is an ASP.NET Core Developer?"
          paragraphs={[
            'ASP.NET Core developers build web applications and APIs using Microsoft\'s modern, cross-platform framework. They leverage C# and the .NET ecosystem to create high-performance, scalable backend systems for enterprises and startups alike.',
            'As an ASP.NET Core developer, you will design RESTful APIs, implement authentication systems, work with databases using Entity Framework, and deploy applications to Azure or other cloud platforms.'
          ]}
          responsibilities={[
            'Build RESTful APIs and web applications',
            'Implement authentication and authorization',
            'Design database schemas with Entity Framework',
            'Write unit and integration tests',
            'Implement clean architecture patterns',
            'Deploy to Azure and manage CI/CD',
            'Optimize application performance'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#512BD4"
        />

        <SalarySection
          title="ASP.NET Core Developer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip=".NET developers with Azure skills command premium salaries. Enterprise roles often pay more than startup positions. Microsoft certifications (AZ-204, AZ-400) can boost compensation. Remote positions at US companies offer excellent opportunities."
          gradient="bg-gradient-to-r from-purple-600 to-blue-600"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your ASP.NET Core Journey?"
          description="Get personalized guidance from experienced .NET developers who have built enterprise applications."
          gradient="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500"
        />
      </main>

      <Footer />
    </>
  );
}
