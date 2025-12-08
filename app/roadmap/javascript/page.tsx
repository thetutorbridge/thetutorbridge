'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Code,
  Variable,
  Box,
  Repeat,
  Zap,
  Globe,
  Server,
  Layers,
  Shield,
  Settings,
  FileJson,
  Smartphone
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
    title: 'JavaScript Basics',
    icon: Code,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 1,
        title: 'Introduction to JavaScript',
        description: 'Get started with JavaScript',
        topics: ['What is JS', 'History', 'How to Run JS', 'Browser Console', 'Script Tags']
      },
      {
        id: 2,
        title: 'Variables & Data Types',
        description: 'Store and work with data',
        topics: ['var, let, const', 'Hoisting', 'Primitive Types', 'Objects', 'typeof']
      },
      {
        id: 3,
        title: 'Operators & Expressions',
        description: 'Perform operations on data',
        topics: ['Arithmetic', 'Comparison', 'Logical', 'Assignment', 'Ternary']
      }
    ],
    milestone: 'You understand JavaScript basics!'
  },
  {
    title: 'Control Flow & Functions',
    icon: Repeat,
    color: 'bg-blue-500',
    steps: [
      {
        id: 4,
        title: 'Conditionals',
        description: 'Make decisions in code',
        topics: ['if/else', 'switch', 'Truthy/Falsy', 'Nullish Coalescing', 'Optional Chaining']
      },
      {
        id: 5,
        title: 'Loops',
        description: 'Repeat code execution',
        topics: ['for', 'while', 'do-while', 'for...in', 'for...of', 'break/continue']
      },
      {
        id: 6,
        title: 'Functions',
        description: 'Reusable blocks of code',
        topics: ['Function Declaration', 'Arrow Functions', 'Parameters', 'Return Values', 'Scope']
      },
      {
        id: 7,
        title: 'Advanced Functions',
        description: 'Master function concepts',
        topics: ['Closures', 'Callbacks', 'IIFE', 'Recursion', 'Higher-Order Functions']
      }
    ]
  },
  {
    title: 'Data Structures',
    icon: Box,
    color: 'bg-green-500',
    steps: [
      {
        id: 8,
        title: 'Arrays',
        description: 'Work with lists of data',
        topics: ['Array Methods', 'map/filter/reduce', 'forEach', 'find/findIndex', 'Spread/Rest']
      },
      {
        id: 9,
        title: 'Objects',
        description: 'Key-value data structures',
        topics: ['Object Literals', 'Properties', 'Methods', 'Destructuring', 'Object Methods']
      },
      {
        id: 10,
        title: 'Advanced Data Structures',
        description: 'Modern JavaScript collections',
        topics: ['Map', 'Set', 'WeakMap', 'WeakSet', 'JSON']
      }
    ],
    milestone: 'You can work with data in JavaScript!'
  },
  {
    title: 'DOM Manipulation',
    icon: Globe,
    color: 'bg-purple-500',
    steps: [
      {
        id: 11,
        title: 'DOM Basics',
        description: 'Interact with web pages',
        topics: ['Selecting Elements', 'querySelector', 'DOM Tree', 'Node Types']
      },
      {
        id: 12,
        title: 'DOM Manipulation',
        description: 'Modify page content',
        topics: ['innerHTML', 'textContent', 'Attributes', 'Classes', 'Styles']
      },
      {
        id: 13,
        title: 'Events',
        description: 'Handle user interactions',
        topics: ['Event Listeners', 'Event Object', 'Event Bubbling', 'Event Delegation', 'Forms']
      }
    ]
  },
  {
    title: 'Asynchronous JavaScript',
    icon: Zap,
    color: 'bg-orange-500',
    steps: [
      {
        id: 14,
        title: 'Async Basics',
        description: 'Understand async concepts',
        topics: ['Event Loop', 'Call Stack', 'Callback Queue', 'setTimeout', 'setInterval']
      },
      {
        id: 15,
        title: 'Promises',
        description: 'Handle async operations',
        topics: ['Creating Promises', 'then/catch', 'Promise.all', 'Promise.race', 'Error Handling']
      },
      {
        id: 16,
        title: 'Async/Await',
        description: 'Modern async syntax',
        topics: ['async Functions', 'await Keyword', 'Error Handling', 'Parallel Execution']
      },
      {
        id: 17,
        title: 'Working with APIs',
        description: 'Fetch data from servers',
        topics: ['Fetch API', 'REST APIs', 'HTTP Methods', 'Headers', 'Error Handling']
      }
    ],
    milestone: 'You can handle async JavaScript!'
  },
  {
    title: 'Modern JavaScript (ES6+)',
    icon: Settings,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 18,
        title: 'ES6 Features',
        description: 'Modern JavaScript syntax',
        topics: ['Template Literals', 'Default Parameters', 'Rest/Spread', 'Destructuring', 'Modules']
      },
      {
        id: 19,
        title: 'Classes & OOP',
        description: 'Object-oriented JavaScript',
        topics: ['Classes', 'Constructor', 'Inheritance', 'Static Methods', 'Private Fields']
      },
      {
        id: 20,
        title: 'Advanced ES6+',
        description: 'Latest JavaScript features',
        topics: ['Symbols', 'Iterators', 'Generators', 'Proxy', 'Reflect']
      }
    ]
  },
  {
    title: 'TypeScript',
    icon: FileJson,
    color: 'bg-blue-600',
    steps: [
      {
        id: 21,
        title: 'TypeScript Basics',
        description: 'Add types to JavaScript',
        topics: ['Type Annotations', 'Interfaces', 'Type Aliases', 'Union Types', 'Type Guards']
      },
      {
        id: 22,
        title: 'Advanced TypeScript',
        description: 'Master TypeScript features',
        topics: ['Generics', 'Utility Types', 'Decorators', 'Module System', 'tsconfig']
      }
    ]
  },
  {
    title: 'Frameworks & Libraries',
    icon: Layers,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 23,
        title: 'React',
        description: 'Build user interfaces',
        topics: ['Components', 'JSX', 'Props', 'State', 'Hooks', 'Context']
      },
      {
        id: 24,
        title: 'Node.js Basics',
        description: 'JavaScript on the server',
        topics: ['npm', 'Modules', 'File System', 'Path', 'Environment Variables']
      }
    ],
    milestone: 'You can build full-stack JS apps!'
  },
  {
    title: 'Testing & Tools',
    icon: Shield,
    color: 'bg-teal-500',
    steps: [
      {
        id: 25,
        title: 'Testing',
        description: 'Write reliable code',
        topics: ['Jest', 'Vitest', 'Testing Library', 'Unit Tests', 'Integration Tests']
      },
      {
        id: 26,
        title: 'Build Tools',
        description: 'Modern development workflow',
        topics: ['Vite', 'Webpack', 'ESLint', 'Prettier', 'npm/pnpm']
      }
    ],
    milestone: 'You are a professional JavaScript Developer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$55K - $80K', avg: '$68K' },
  { level: 'Mid (2-5 yrs)', range: '$80K - $130K', avg: '$105K' },
  { level: 'Senior (5-8 yrs)', range: '$130K - $175K', avg: '$150K' },
  { level: 'Lead (8+ yrs)', range: '$175K - $250K+', avg: '$200K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹3L - ₹6L', avg: '₹4.5L' },
  { level: 'Junior (1-3 yrs)', range: '₹5L - ₹12L', avg: '₹8L' },
  { level: 'Mid (3-5 yrs)', range: '₹12L - ₹22L', avg: '₹16L' },
  { level: 'Senior (5+ yrs)', range: '₹22L - ₹45L+', avg: '₹30L' }
];

// Project Ideas
const projects = [
  {
    title: 'To-Do List App',
    level: 'Beginner' as const,
    description: 'Task manager with local storage',
    skills: ['DOM', 'Events', 'Local Storage']
  },
  {
    title: 'Weather Dashboard',
    level: 'Beginner' as const,
    description: 'Display weather from API',
    skills: ['Fetch API', 'Async/Await', 'DOM']
  },
  {
    title: 'Quiz Application',
    level: 'Intermediate' as const,
    description: 'Interactive quiz with scoring',
    skills: ['Arrays', 'Objects', 'Timer', 'DOM']
  },
  {
    title: 'E-Commerce Cart',
    level: 'Intermediate' as const,
    description: 'Shopping cart with React',
    skills: ['React', 'State', 'useReducer']
  },
  {
    title: 'Real-time Chat App',
    level: 'Advanced' as const,
    description: 'WebSocket-based chat',
    skills: ['Node.js', 'Socket.io', 'React']
  },
  {
    title: 'Full-Stack Blog',
    level: 'Advanced' as const,
    description: 'Blog with authentication',
    skills: ['Next.js', 'MongoDB', 'JWT', 'TypeScript']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to learn JavaScript?',
    answer: 'With 2-3 hours of daily practice, you can learn JavaScript fundamentals in 2-3 months. Becoming proficient with async programming, DOM manipulation, and a framework like React takes 4-6 months. Mastery comes with years of building real projects.'
  },
  {
    question: 'Should I learn JavaScript or Python first?',
    answer: 'For web development, start with JavaScript - it\'s the language of the web and essential for frontend development. Python is better if you\'re interested in data science or machine learning. JavaScript is more versatile for full-stack web development.'
  },
  {
    question: 'Is JavaScript enough to get a job?',
    answer: 'JavaScript alone can get you a job, but you\'ll be more competitive with additional skills. Learn HTML/CSS for frontend, or Node.js for backend. Add a framework like React and TypeScript to significantly boost your job prospects.'
  },
  {
    question: 'Should I learn TypeScript after JavaScript?',
    answer: 'Yes, absolutely! TypeScript has become an industry standard. Most modern React and Node.js projects use TypeScript. Learn JavaScript first to understand the fundamentals, then add TypeScript. It catches bugs early and makes code more maintainable.'
  },
  {
    question: 'React, Vue, or Angular - which framework should I learn?',
    answer: 'We recommend React due to its dominant market share (65%+ job postings), excellent ecosystem, and strong community. Vue is simpler and great for beginners. Angular is mainly used in enterprise settings. React skills transfer well to React Native for mobile.'
  },
  {
    question: 'Is Node.js necessary to learn?',
    answer: 'Node.js is highly valuable but not strictly necessary. It enables you to be a full-stack JavaScript developer. If you want to focus on frontend only, you don\'t need deep Node.js knowledge. But understanding basics helps with build tools and npm.'
  },
  {
    question: 'What JavaScript projects should I build?',
    answer: 'Start simple: to-do app, calculator, weather app. Progress to: quiz game, shopping cart, API-based apps. Advanced: full-stack apps with authentication, real-time features, and databases. Focus on projects that solve real problems.'
  },
  {
    question: 'How do I prepare for JavaScript interviews?',
    answer: 'Master core concepts: closures, hoisting, event loop, promises, prototypes. Practice coding problems on LeetCode. Build projects and be ready to explain your code. Understand React hooks and state management. Prepare for system design questions for senior roles.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'Frontend Developer',
    description: 'Complete frontend development path',
    href: '/roadmap/frontend-developer',
    icon: Globe,
    color: 'bg-purple-500'
  },
  {
    title: 'Full Stack Developer',
    description: 'Frontend + Backend development',
    href: '/roadmap/full-stack-developer',
    icon: Layers,
    color: 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66]'
  },
  {
    title: 'Backend Developer',
    description: 'Server-side with Node.js',
    href: '/roadmap/backend-developer',
    icon: Server,
    color: 'bg-green-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'JavaScript Developer Roadmap 2026',
  description: 'Complete guide to becoming a JavaScript developer in 2026',
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

export default function JavaScriptRoadmapPage() {
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
          title="JavaScript Developer Roadmap"
          description="Master JavaScript from basics to advanced concepts, async programming, and modern frameworks. Your complete guide to becoming a professional JavaScript developer in 2026."
          duration="4-6 Months"
          difficulty="Beginner Friendly"
          accentColor="#EAB308"
        />

        <WhatIsSection
          title="What is a JavaScript Developer?"
          paragraphs={[
            'JavaScript developers build interactive web applications, server-side APIs, and mobile apps using JavaScript and its ecosystem. They are essential for creating dynamic user experiences on the web.',
            'As a JavaScript developer, you will write clean, efficient code for both frontend and backend, work with modern frameworks, handle asynchronous operations, and collaborate with design and backend teams.'
          ]}
          responsibilities={[
            'Build interactive and responsive web interfaces',
            'Write clean, efficient JavaScript code',
            'Work with modern frameworks like React or Vue',
            'Handle asynchronous operations and API calls',
            'Implement state management solutions',
            'Write unit and integration tests',
            'Optimize application performance'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#EAB308"
        />

        <SalarySection
          title="JavaScript Developer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Specialize in React + TypeScript + Node.js for maximum earning potential. Full-stack JavaScript developers are highly sought after. Remote positions at US companies can offer 2-3x higher salaries for developers in India."
          gradient="bg-gradient-to-r from-yellow-500 to-orange-500"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your JavaScript Journey?"
          description="Get personalized guidance from experienced JavaScript developers who have been where you are."
          gradient="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"
        />
      </main>

      <Footer />
    </>
  );
}
