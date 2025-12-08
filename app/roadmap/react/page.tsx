'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Layers,
  Code,
  Box,
  Repeat,
  Database,
  Palette,
  Shield,
  Zap,
  Globe,
  Settings,
  Smartphone,
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
    title: 'Prerequisites',
    icon: Code,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 1,
        title: 'JavaScript Fundamentals',
        description: 'Master JS before React',
        topics: ['ES6+', 'Async/Await', 'Array Methods', 'Destructuring', 'Modules']
      },
      {
        id: 2,
        title: 'HTML & CSS',
        description: 'Web fundamentals',
        topics: ['Semantic HTML', 'Flexbox', 'Grid', 'Responsive Design', 'CSS-in-JS Basics']
      }
    ],
    milestone: 'You have the prerequisites!'
  },
  {
    title: 'React Fundamentals',
    icon: Layers,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 3,
        title: 'Components & JSX',
        description: 'Building blocks of React',
        topics: ['Functional Components', 'JSX Syntax', 'Props', 'Children', 'Fragments']
      },
      {
        id: 4,
        title: 'Rendering',
        description: 'How React renders UI',
        topics: ['Conditional Rendering', 'Lists & Keys', 'Component Composition', 'React DevTools']
      }
    ]
  },
  {
    title: 'React Hooks',
    icon: Repeat,
    color: 'bg-blue-500',
    steps: [
      {
        id: 5,
        title: 'Basic Hooks',
        description: 'Essential React hooks',
        topics: ['useState', 'useEffect', 'useRef', 'Event Handling', 'Forms']
      },
      {
        id: 6,
        title: 'Advanced Hooks',
        description: 'Powerful hook patterns',
        topics: ['useContext', 'useReducer', 'useMemo', 'useCallback', 'Custom Hooks']
      }
    ],
    milestone: 'You understand React hooks!'
  },
  {
    title: 'State Management',
    icon: Database,
    color: 'bg-purple-500',
    steps: [
      {
        id: 7,
        title: 'Context API',
        description: 'Built-in state sharing',
        topics: ['createContext', 'useContext', 'Provider Pattern', 'When to Use']
      },
      {
        id: 8,
        title: 'External State Libraries',
        description: 'Scale state management',
        topics: ['Zustand', 'Jotai', 'Redux Toolkit', 'Recoil', 'When to Use What']
      }
    ]
  },
  {
    title: 'Routing',
    icon: Globe,
    color: 'bg-green-500',
    steps: [
      {
        id: 9,
        title: 'React Router',
        description: 'Client-side routing',
        topics: ['Routes', 'Links', 'Nested Routes', 'URL Params', 'Protected Routes']
      },
      {
        id: 10,
        title: 'Advanced Routing',
        description: 'Modern routing solutions',
        topics: ['TanStack Router', 'Data Loading', 'Code Splitting', 'Lazy Loading']
      }
    ]
  },
  {
    title: 'Styling',
    icon: Palette,
    color: 'bg-pink-500',
    steps: [
      {
        id: 11,
        title: 'Styling Solutions',
        description: 'Style React components',
        topics: ['Tailwind CSS', 'CSS Modules', 'Styled Components', 'Emotion']
      },
      {
        id: 12,
        title: 'Component Libraries',
        description: 'Pre-built UI components',
        topics: ['shadcn/ui', 'Radix UI', 'Chakra UI', 'Material UI', 'Headless UI']
      }
    ],
    milestone: 'You can build styled React apps!'
  },
  {
    title: 'Data Fetching',
    icon: Zap,
    color: 'bg-orange-500',
    steps: [
      {
        id: 13,
        title: 'Fetching Data',
        description: 'Get data from APIs',
        topics: ['fetch API', 'Axios', 'Loading States', 'Error Handling']
      },
      {
        id: 14,
        title: 'Server State',
        description: 'Manage remote data',
        topics: ['TanStack Query', 'SWR', 'Caching', 'Mutations', 'Optimistic Updates']
      }
    ]
  },
  {
    title: 'Forms & Validation',
    icon: FileCode,
    color: 'bg-teal-500',
    steps: [
      {
        id: 15,
        title: 'Form Handling',
        description: 'Build complex forms',
        topics: ['React Hook Form', 'Formik', 'Controlled Components', 'Form State']
      },
      {
        id: 16,
        title: 'Validation',
        description: 'Validate form data',
        topics: ['Zod', 'Yup', 'Schema Validation', 'Error Messages']
      }
    ]
  },
  {
    title: 'TypeScript',
    icon: Settings,
    color: 'bg-blue-600',
    steps: [
      {
        id: 17,
        title: 'TypeScript with React',
        description: 'Add type safety',
        topics: ['Props Types', 'Event Types', 'Generic Components', 'Type Inference', 'Utility Types']
      }
    ]
  },
  {
    title: 'Testing',
    icon: Shield,
    color: 'bg-emerald-500',
    steps: [
      {
        id: 18,
        title: 'Testing React Apps',
        description: 'Write reliable tests',
        topics: ['Vitest', 'Jest', 'React Testing Library', 'User Events', 'Mocking']
      },
      {
        id: 19,
        title: 'E2E Testing',
        description: 'Test user flows',
        topics: ['Playwright', 'Cypress', 'Test Automation', 'CI Integration']
      }
    ]
  },
  {
    title: 'Frameworks & Advanced',
    icon: Box,
    color: 'bg-black',
    steps: [
      {
        id: 20,
        title: 'Next.js',
        description: 'Full-stack React framework',
        topics: ['App Router', 'Server Components', 'SSR/SSG', 'API Routes', 'Middleware']
      },
      {
        id: 21,
        title: 'Advanced Patterns',
        description: 'Expert React techniques',
        topics: ['Error Boundaries', 'Suspense', 'Portals', 'Performance', 'React 19 Features']
      }
    ],
    milestone: 'You are a professional React Developer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$65K - $90K', avg: '$78K' },
  { level: 'Mid (2-5 yrs)', range: '$90K - $140K', avg: '$115K' },
  { level: 'Senior (5-8 yrs)', range: '$140K - $185K', avg: '$160K' },
  { level: 'Lead (8+ yrs)', range: '$185K - $260K+', avg: '$215K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹4L - ₹8L', avg: '₹6L' },
  { level: 'Junior (1-3 yrs)', range: '₹7L - ₹14L', avg: '₹10L' },
  { level: 'Mid (3-5 yrs)', range: '₹14L - ₹26L', avg: '₹18L' },
  { level: 'Senior (5+ yrs)', range: '₹26L - ₹50L+', avg: '₹35L' }
];

// Project Ideas
const projects = [
  {
    title: 'Todo App',
    level: 'Beginner' as const,
    description: 'Classic todo with CRUD operations',
    skills: ['useState', 'Props', 'Lists', 'Forms']
  },
  {
    title: 'Weather Dashboard',
    level: 'Beginner' as const,
    description: 'Fetch and display weather data',
    skills: ['useEffect', 'API Calls', 'Loading States']
  },
  {
    title: 'E-Commerce Store',
    level: 'Intermediate' as const,
    description: 'Product listing with cart',
    skills: ['Context', 'Routing', 'State Management']
  },
  {
    title: 'Social Media Dashboard',
    level: 'Intermediate' as const,
    description: 'Dashboard with data visualization',
    skills: ['TanStack Query', 'Charts', 'Tailwind']
  },
  {
    title: 'Full-Stack Blog',
    level: 'Advanced' as const,
    description: 'Blog with auth and CMS',
    skills: ['Next.js', 'TypeScript', 'Prisma', 'Auth']
  },
  {
    title: 'Real-time Chat App',
    level: 'Advanced' as const,
    description: 'Chat with WebSockets',
    skills: ['WebSockets', 'Zustand', 'Optimistic UI']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to learn React?',
    answer: 'With JavaScript knowledge, you can learn React basics in 2-4 weeks. Becoming job-ready with hooks, state management, and routing takes 2-3 months. Mastering advanced patterns, testing, and Next.js takes 4-6 months. Continuous practice through projects is essential.'
  },
  {
    question: 'Do I need to learn JavaScript before React?',
    answer: 'Yes, absolutely. React is a JavaScript library, and strong JS fundamentals are essential. Focus on ES6+ features: arrow functions, destructuring, spread operator, array methods, async/await, and modules. Trying to learn React without JS leads to confusion and gaps.'
  },
  {
    question: 'Should I learn React or Vue or Angular?',
    answer: 'React has the largest market share (65%+ of job postings) and ecosystem. It\'s the safest career choice. Vue is simpler for beginners but has fewer jobs. Angular is mainly used in enterprises. Start with React - the component concepts transfer to other frameworks.'
  },
  {
    question: 'Is class components still relevant?',
    answer: 'No, focus on functional components with hooks. Class components are legacy code - you might encounter them in older projects, but all new React code uses functional components. Hooks provide better patterns for state and lifecycle management.'
  },
  {
    question: 'Do I need to learn Redux?',
    answer: 'Not necessarily. Start with useState and useContext - they handle most use cases. If you need external state management, consider Zustand (simpler) or Jotai. Redux Toolkit is still valuable for complex apps, but it\'s no longer required for every React project.'
  },
  {
    question: 'Should I learn Next.js after React?',
    answer: 'Yes, Next.js is highly recommended. It\'s the most popular React framework, used by many companies. It provides SSR, routing, API routes, and excellent developer experience. Many job postings specifically ask for Next.js. Learn React basics first, then move to Next.js.'
  },
  {
    question: 'Is TypeScript necessary for React?',
    answer: 'TypeScript has become an industry standard for React projects. Most professional React codebases use TypeScript. It catches bugs early and improves developer experience. Learn React basics with JavaScript first, then add TypeScript - it\'s worth the investment.'
  },
  {
    question: 'How do I get my first React job?',
    answer: 'Build 3-5 polished projects showcasing different skills. Include at least one full-stack Next.js project. Use TypeScript. Write tests. Deploy everything. Contribute to open source React projects. Prepare for technical interviews covering React concepts and coding challenges.'
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
    title: 'Frontend Developer',
    description: 'Complete frontend path',
    href: '/roadmap/frontend-developer',
    icon: Globe,
    color: 'bg-purple-500'
  },
  {
    title: 'Full Stack Developer',
    description: 'Add backend skills',
    href: '/roadmap/full-stack-developer',
    icon: Layers,
    color: 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66]'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'React Developer Roadmap 2026',
  description: 'Complete guide to becoming a React developer in 2026',
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

export default function ReactRoadmapPage() {
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
          title="React Developer Roadmap"
          description="Master React components, hooks, state management, routing, and Next.js. Your complete guide to becoming a professional React developer in 2026."
          duration="3-5 Months"
          difficulty="Beginner Friendly"
          accentColor="#61DAFB"
        />

        <WhatIsSection
          title="What is a React Developer?"
          paragraphs={[
            'React developers build modern, interactive user interfaces using React, the most popular JavaScript library for UI development. They create reusable components, manage application state, and deliver fast, responsive web applications.',
            'As a React developer, you will write component-based code, implement hooks and state management, integrate APIs, optimize performance, and collaborate with designers and backend developers.'
          ]}
          responsibilities={[
            'Build reusable UI components with React',
            'Manage application state with hooks and state libraries',
            'Implement client-side routing',
            'Integrate REST and GraphQL APIs',
            'Write unit and integration tests',
            'Optimize performance and accessibility',
            'Work with design systems and component libraries'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#61DAFB"
        />

        <SalarySection
          title="React Developer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="React + TypeScript + Next.js is the most in-demand combination. Full-stack React developers (with Node.js or Next.js backend skills) command higher salaries. Remote positions at US companies offer premium pay."
          gradient="bg-gradient-to-r from-cyan-500 to-blue-500"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your React Journey?"
          description="Get personalized guidance from experienced React developers who have built production applications."
          gradient="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
        />
      </main>

      <Footer />
    </>
  );
}
