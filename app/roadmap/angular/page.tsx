'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Code,
  Layers,
  Zap,
  Database,
  Globe,
  Shield,
  TestTube,
  Rocket,
  Box,
  Settings,
  FileCode,
  Workflow
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
    title: 'TypeScript Fundamentals',
    icon: Code,
    color: 'bg-blue-500',
    steps: [
      {
        id: 1,
        title: 'TypeScript Basics',
        description: 'Type-safe JavaScript',
        topics: ['Types', 'Interfaces', 'Classes', 'Generics', 'Enums', 'Type Guards']
      },
      {
        id: 2,
        title: 'Advanced TypeScript',
        description: 'Advanced type features',
        topics: ['Utility Types', 'Mapped Types', 'Conditional Types', 'Decorators', 'Module System']
      }
    ],
    milestone: 'You know TypeScript!'
  },
  {
    title: 'Angular Basics',
    icon: Layers,
    color: 'bg-red-500',
    steps: [
      {
        id: 3,
        title: 'Angular CLI & Setup',
        description: 'Development environment',
        topics: ['Angular CLI', 'Project Structure', 'Configuration', 'Schematics', 'Workspaces']
      },
      {
        id: 4,
        title: 'Components',
        description: 'Building blocks of Angular',
        topics: ['Component Basics', 'Templates', 'Data Binding', 'Lifecycle Hooks', 'Standalone Components']
      },
      {
        id: 5,
        title: 'Directives & Pipes',
        description: 'Template manipulation',
        topics: ['Built-in Directives', 'Custom Directives', 'Built-in Pipes', 'Custom Pipes', 'Pure vs Impure']
      }
    ]
  },
  {
    title: 'Services & Dependency Injection',
    icon: Settings,
    color: 'bg-purple-500',
    steps: [
      {
        id: 6,
        title: 'Services',
        description: 'Business logic layer',
        topics: ['Creating Services', 'Dependency Injection', 'Providers', 'Injection Tokens', 'Hierarchical DI']
      },
      {
        id: 7,
        title: 'HTTP Client',
        description: 'API communication',
        topics: ['HttpClient', 'Requests', 'Interceptors', 'Error Handling', 'Retry Logic']
      }
    ],
    milestone: 'You can build Angular apps!'
  },
  {
    title: 'RxJS & Reactive Programming',
    icon: Zap,
    color: 'bg-pink-500',
    steps: [
      {
        id: 8,
        title: 'RxJS Fundamentals',
        description: 'Reactive programming',
        topics: ['Observables', 'Observers', 'Subjects', 'Subscriptions', 'Schedulers']
      },
      {
        id: 9,
        title: 'RxJS Operators',
        description: 'Transform streams',
        topics: ['map/filter/tap', 'switchMap/mergeMap', 'combineLatest/forkJoin', 'debounceTime', 'catchError']
      }
    ]
  },
  {
    title: 'Routing & Navigation',
    icon: Globe,
    color: 'bg-green-500',
    steps: [
      {
        id: 10,
        title: 'Angular Router',
        description: 'Navigation system',
        topics: ['Route Configuration', 'Router Outlet', 'Route Parameters', 'Query Parameters', 'Child Routes']
      },
      {
        id: 11,
        title: 'Advanced Routing',
        description: 'Complex navigation',
        topics: ['Lazy Loading', 'Guards', 'Resolvers', 'Preloading', 'Router Events']
      }
    ]
  },
  {
    title: 'Forms',
    icon: FileCode,
    color: 'bg-orange-500',
    steps: [
      {
        id: 12,
        title: 'Template-Driven Forms',
        description: 'Simple forms',
        topics: ['ngModel', 'Form Validation', 'Validation Messages', 'Form States', 'Custom Validators']
      },
      {
        id: 13,
        title: 'Reactive Forms',
        description: 'Complex forms',
        topics: ['FormControl', 'FormGroup', 'FormArray', 'Validators', 'Dynamic Forms']
      }
    ],
    milestone: 'You can handle complex forms!'
  },
  {
    title: 'State Management',
    icon: Database,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 14,
        title: 'Component State',
        description: 'Local state management',
        topics: ['Signals', 'Input/Output', 'Service-based State', 'BehaviorSubject', 'State Patterns']
      },
      {
        id: 15,
        title: 'NgRx',
        description: 'Redux for Angular',
        topics: ['Store', 'Actions', 'Reducers', 'Selectors', 'Effects', 'Entity']
      }
    ]
  },
  {
    title: 'Angular Material & UI',
    icon: Box,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 16,
        title: 'Angular Material',
        description: 'UI component library',
        topics: ['Setup', 'Components', 'Theming', 'CDK', 'Accessibility']
      },
      {
        id: 17,
        title: 'Styling',
        description: 'CSS in Angular',
        topics: ['Component Styles', 'View Encapsulation', 'CSS Variables', 'Tailwind', 'SCSS']
      }
    ]
  },
  {
    title: 'Testing',
    icon: TestTube,
    color: 'bg-teal-500',
    steps: [
      {
        id: 18,
        title: 'Unit Testing',
        description: 'Test components',
        topics: ['Jasmine', 'Karma', 'TestBed', 'Component Testing', 'Service Testing', 'Mocking']
      },
      {
        id: 19,
        title: 'E2E Testing',
        description: 'End-to-end tests',
        topics: ['Playwright', 'Cypress', 'Test Scenarios', 'Page Objects', 'CI Integration']
      }
    ]
  },
  {
    title: 'Performance & Deployment',
    icon: Rocket,
    color: 'bg-emerald-500',
    steps: [
      {
        id: 20,
        title: 'Performance',
        description: 'Optimize Angular apps',
        topics: ['Change Detection', 'OnPush Strategy', 'trackBy', 'Bundle Size', 'Tree Shaking']
      },
      {
        id: 21,
        title: 'Build & Deploy',
        description: 'Production deployment',
        topics: ['Production Build', 'SSR/SSG', 'PWA', 'Docker', 'CI/CD', 'Cloud Hosting']
      }
    ],
    milestone: 'You are an Angular Developer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$70K - $95K', avg: '$82K' },
  { level: 'Mid (2-5 yrs)', range: '$95K - $135K', avg: '$115K' },
  { level: 'Senior (5-8 yrs)', range: '$130K - $175K', avg: '$152K' },
  { level: 'Lead/Architect (8+ yrs)', range: '$165K - $220K+', avg: '$190K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹4L - ₹8L', avg: '₹6L' },
  { level: 'Junior (1-3 yrs)', range: '₹7L - ₹14L', avg: '₹10L' },
  { level: 'Mid (3-5 yrs)', range: '₹14L - ₹25L', avg: '₹18L' },
  { level: 'Senior (5+ yrs)', range: '₹24L - ₹45L+', avg: '₹32L' }
];

// Project Ideas
const projects = [
  {
    title: 'Task Manager',
    level: 'Beginner' as const,
    description: 'Todo app with Angular',
    skills: ['Components', 'Services', 'Forms', 'Local Storage']
  },
  {
    title: 'Weather Dashboard',
    level: 'Beginner' as const,
    description: 'Weather data from API',
    skills: ['HTTP Client', 'RxJS', 'Routing', 'Material']
  },
  {
    title: 'E-commerce Store',
    level: 'Intermediate' as const,
    description: 'Full shopping experience',
    skills: ['NgRx', 'Lazy Loading', 'Guards', 'Cart Logic']
  },
  {
    title: 'Admin Dashboard',
    level: 'Intermediate' as const,
    description: 'Data management dashboard',
    skills: ['Material', 'Charts', 'Tables', 'Forms']
  },
  {
    title: 'Real-time Chat',
    level: 'Advanced' as const,
    description: 'WebSocket chat application',
    skills: ['WebSockets', 'RxJS', 'Authentication', 'Real-time']
  },
  {
    title: 'Enterprise App',
    level: 'Advanced' as const,
    description: 'Multi-module enterprise app',
    skills: ['Micro Frontends', 'SSR', 'Performance', 'Testing']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to learn Angular?',
    answer: 'Angular has a steeper learning curve than React or Vue. Basic concepts take 2-3 months. Building production apps takes 4-6 months. Mastering RxJS, NgRx, and enterprise patterns takes 9-12 months. TypeScript knowledge accelerates learning significantly.'
  },
  {
    question: 'Angular vs React - which should I learn?',
    answer: 'Angular excels in large enterprise applications with its opinionated structure and built-in features. React offers more flexibility and a larger job market. Angular developers often earn slightly more due to enterprise focus. Choose based on job market in your area.'
  },
  {
    question: 'Is Angular still relevant in 2026?',
    answer: 'Yes, Angular remains strong in enterprise environments. Google maintains it actively with regular releases. Version 17+ brought significant improvements (Signals, standalone components, SSR). Many large companies (Microsoft, IBM, Samsung) use Angular extensively.'
  },
  {
    question: 'Do I need to learn RxJS for Angular?',
    answer: 'Yes, RxJS is fundamental to Angular. HTTP client, router, and forms all use Observables. You don\'t need to master every operator initially - learn common ones (map, filter, switchMap) and expand as needed. Understanding reactive programming is essential.'
  },
  {
    question: 'Should I learn NgRx?',
    answer: 'For large applications, yes. NgRx provides predictable state management similar to Redux. Smaller apps can use services with BehaviorSubject or Signals. Learn it when your app\'s state becomes complex. Many enterprise jobs require NgRx experience.'
  },
  {
    question: 'What about Angular Universal (SSR)?',
    answer: 'Angular 17+ simplified SSR significantly. Learn it for SEO-critical applications. Most SPAs don\'t need SSR. Understanding SSR concepts is valuable for senior roles. The new @angular/ssr package makes implementation much easier.'
  },
  {
    question: 'How do I prepare for Angular interviews?',
    answer: 'Know component lifecycle, dependency injection, and RxJS operators thoroughly. Understand change detection and performance optimization. Be ready to discuss NgRx patterns. Practice building features under time constraints. Review Angular-specific interview questions.'
  },
  {
    question: 'Is Angular good for beginners?',
    answer: 'Angular has a steeper learning curve but provides excellent structure. TypeScript catches errors early. The CLI handles configuration. Opinionated architecture teaches good patterns. Consider React/Vue first if you\'re new to programming; Angular if you know JavaScript.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'React Developer',
    description: 'Alternative frontend',
    href: '/roadmap/react',
    icon: Code,
    color: 'bg-cyan-500'
  },
  {
    title: 'TypeScript',
    description: 'TypeScript deep dive',
    href: '/roadmap/javascript',
    icon: FileCode,
    color: 'bg-blue-500'
  },
  {
    title: 'Node.js',
    description: 'Backend complement',
    href: '/roadmap/nodejs',
    icon: Globe,
    color: 'bg-green-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Angular Developer Roadmap 2026',
  description: 'Complete guide to becoming an Angular Developer in 2026',
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

export default function AngularRoadmapPage() {
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
          title="Angular Developer Roadmap"
          description="Master TypeScript, RxJS, NgRx, Angular Material, testing, and enterprise application development. Your complete guide to becoming a professional Angular Developer in 2026."
          duration="5-8 Months"
          difficulty="Intermediate"
          accentColor="#DD0031"
        />

        <WhatIsSection
          title="What is an Angular Developer?"
          paragraphs={[
            'Angular developers build enterprise-grade single-page applications using the Angular framework. They leverage TypeScript, RxJS, and Angular\'s powerful tooling to create scalable, maintainable web applications.',
            'As an Angular developer, you will build component-based UIs, manage application state, implement routing, handle forms, write tests, and deploy production applications using Angular\'s comprehensive ecosystem.'
          ]}
          responsibilities={[
            'Build single-page applications with Angular',
            'Write type-safe code with TypeScript',
            'Implement reactive patterns with RxJS',
            'Manage state with services or NgRx',
            'Create responsive UIs with Angular Material',
            'Write unit and e2e tests',
            'Optimize application performance'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#DD0031"
        />

        <SalarySection
          title="Angular Developer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Angular developers often earn premium salaries in enterprise environments. Financial services and large corporations heavily use Angular. Full-stack Angular + Node.js developers are highly valued. Remote enterprise positions offer excellent compensation."
          gradient="bg-gradient-to-r from-red-500 to-pink-600"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your Angular Journey?"
          description="Get personalized guidance from experienced Angular developers who have built enterprise applications."
          gradient="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500"
        />
      </main>

      <Footer />
    </>
  );
}
