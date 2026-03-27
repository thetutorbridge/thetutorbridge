'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Globe,
  Layout,
  Code,
  GitBranch,
  Palette,
  Layers,
  Settings,
  Shield,
  Zap,
  Server,
  Database,
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
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { getRoadmapRelatedCalculators } from '@/lib/content-relationships';

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
        description: 'Understand the basics of how data travels across the web',
        topics: ['DNS', 'HTTP/HTTPS', 'Browsers', 'Hosting', 'Domain Names']
      }
    ],
    milestone: 'You understand how the web works!'
  },
  {
    title: 'HTML & CSS',
    icon: Layout,
    color: 'bg-purple-500',
    steps: [
      {
        id: 2,
        title: 'HTML5 Essentials',
        description: 'Learn semantic markup and document structure',
        topics: ['Semantic Tags', 'Forms', 'Accessibility', 'SEO Basics']
      },
      {
        id: 3,
        title: 'CSS Fundamentals',
        description: 'Master styling and layout techniques',
        topics: ['Selectors', 'Box Model', 'Flexbox', 'CSS Grid']
      },
      {
        id: 4,
        title: 'Responsive Design',
        description: 'Build layouts that work on all devices',
        topics: ['Media Queries', 'Mobile-First', 'Fluid Typography', 'Images']
      }
    ],
    milestone: 'You can build static websites!'
  },
  {
    title: 'JavaScript',
    icon: Code,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 5,
        title: 'JS Fundamentals',
        description: 'Core programming concepts in JavaScript',
        topics: ['Variables', 'Functions', 'Arrays', 'Objects', 'Loops']
      },
      {
        id: 6,
        title: 'DOM Manipulation',
        description: 'Interact with web page elements dynamically',
        topics: ['Selectors', 'Events', 'Event Delegation', 'Forms']
      },
      {
        id: 7,
        title: 'ES6+ Features',
        description: 'Modern JavaScript syntax and features',
        topics: ['Arrow Functions', 'Destructuring', 'Modules', 'Classes']
      },
      {
        id: 8,
        title: 'Async JavaScript',
        description: 'Handle asynchronous operations',
        topics: ['Promises', 'Async/Await', 'Fetch API', 'Error Handling']
      }
    ],
    milestone: 'You can build interactive websites!'
  },
  {
    title: 'Version Control',
    icon: GitBranch,
    color: 'bg-orange-500',
    steps: [
      {
        id: 9,
        title: 'Git Basics',
        description: 'Track and manage code changes',
        topics: ['Commits', 'Branches', 'Merging', 'Conflicts']
      },
      {
        id: 10,
        title: 'GitHub',
        description: 'Collaborate with other developers',
        topics: ['Pull Requests', 'Code Reviews', 'Issues', 'Actions']
      }
    ]
  },
  {
    title: 'CSS Frameworks',
    icon: Palette,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 11,
        title: 'Tailwind CSS',
        description: 'Utility-first CSS framework',
        topics: ['Utility Classes', 'Configuration', 'Plugins', 'Dark Mode']
      },
      {
        id: 12,
        title: 'CSS Architecture',
        description: 'Organize CSS at scale',
        topics: ['BEM', 'CSS Modules', 'CSS-in-JS', 'SASS']
      }
    ]
  },
  {
    title: 'React',
    icon: Layers,
    color: 'bg-sky-500',
    steps: [
      {
        id: 13,
        title: 'React Fundamentals',
        description: 'Build component-based UIs',
        topics: ['Components', 'JSX', 'Props', 'State', 'Hooks']
      },
      {
        id: 14,
        title: 'React Advanced',
        description: 'Advanced patterns and optimization',
        topics: ['Context', 'Custom Hooks', 'Memo', 'Error Boundaries']
      },
      {
        id: 15,
        title: 'State Management',
        description: 'Manage complex application state',
        topics: ['React Query', 'Zustand', 'Redux Toolkit', 'Jotai']
      },
      {
        id: 16,
        title: 'Routing & Forms',
        description: 'Navigation and form handling',
        topics: ['React Router', 'React Hook Form', 'Zod', 'Validation']
      }
    ],
    milestone: 'You can build React applications!'
  },
  {
    title: 'TypeScript & Tooling',
    icon: Settings,
    color: 'bg-blue-600',
    steps: [
      {
        id: 17,
        title: 'TypeScript',
        description: 'Add type safety to JavaScript',
        topics: ['Types', 'Interfaces', 'Generics', 'Type Guards']
      },
      {
        id: 18,
        title: 'Build Tools',
        description: 'Modern development tooling',
        topics: ['Vite', 'npm/pnpm', 'ESLint', 'Prettier']
      }
    ]
  },
  {
    title: 'Testing',
    icon: Shield,
    color: 'bg-green-500',
    steps: [
      {
        id: 19,
        title: 'Unit Testing',
        description: 'Test individual components',
        topics: ['Vitest', 'Jest', 'Testing Library', 'Mocking']
      },
      {
        id: 20,
        title: 'E2E Testing',
        description: 'Test complete user flows',
        topics: ['Playwright', 'Cypress', 'CI Integration']
      }
    ]
  },
  {
    title: 'Next.js',
    icon: Zap,
    color: 'bg-black',
    steps: [
      {
        id: 21,
        title: 'Next.js Framework',
        description: 'Full-stack React framework',
        topics: ['App Router', 'SSR', 'SSG', 'Server Components', 'API Routes']
      }
    ],
    milestone: 'You are a professional Frontend Developer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$60K - $85K', avg: '$72K' },
  { level: 'Mid (2-5 yrs)', range: '$85K - $130K', avg: '$105K' },
  { level: 'Senior (5-8 yrs)', range: '$130K - $180K', avg: '$150K' },
  { level: 'Lead (8+ yrs)', range: '$180K - $250K+', avg: '$210K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹3.5L - ₹7L', avg: '₹5L' },
  { level: 'Junior (1-3 yrs)', range: '₹6L - ₹12L', avg: '₹8.5L' },
  { level: 'Mid (3-5 yrs)', range: '₹12L - ₹22L', avg: '₹16L' },
  { level: 'Senior (5+ yrs)', range: '₹22L - ₹45L+', avg: '₹30L' }
];

// Project Ideas
const projects = [
  {
    title: 'Portfolio Website',
    level: 'Beginner' as const,
    description: 'Personal site showcasing your projects and skills',
    skills: ['HTML', 'CSS', 'Responsive Design']
  },
  {
    title: 'Weather App',
    level: 'Beginner' as const,
    description: 'Display weather data from an API',
    skills: ['JavaScript', 'Fetch API', 'DOM']
  },
  {
    title: 'Task Manager',
    level: 'Intermediate' as const,
    description: 'Kanban board with drag-and-drop',
    skills: ['React', 'State Management', 'Local Storage']
  },
  {
    title: 'E-Commerce Store',
    level: 'Advanced' as const,
    description: 'Full shopping experience with cart and checkout',
    skills: ['Next.js', 'TypeScript', 'Stripe']
  },
  {
    title: 'Social Dashboard',
    level: 'Advanced' as const,
    description: 'Analytics dashboard with charts',
    skills: ['React', 'Chart.js', 'Tailwind']
  },
  {
    title: 'Blog Platform',
    level: 'Intermediate' as const,
    description: 'MDX-powered blog with authentication',
    skills: ['Next.js', 'MDX', 'Auth']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to become a frontend developer?',
    answer: 'With 3-4 hours of daily practice, you can become job-ready in 4-6 months. This includes HTML, CSS, JavaScript, and React. Mastering the field and reaching senior level typically takes 2-4 years of professional experience.'
  },
  {
    question: 'Do I need a degree to become a frontend developer?',
    answer: 'No, a degree is not required. Many successful developers are self-taught or bootcamp graduates. Employers value your portfolio, GitHub contributions, and practical skills over formal education.'
  },
  {
    question: 'Should I learn React, Vue, or Angular?',
    answer: 'We recommend React due to its dominant market share (65%+ of job postings), massive ecosystem, and excellent learning resources. Vue is great for beginners, while Angular is mainly used in enterprise settings.'
  },
  {
    question: 'Is TypeScript necessary?',
    answer: 'While not strictly required, TypeScript has become an industry standard. Most professional React/Next.js projects use it. It catches bugs early and is increasingly required in job postings. Learn it after mastering JavaScript.'
  },
  {
    question: 'Frontend vs Full Stack - which is better?',
    answer: 'Neither is better - they are different paths. Frontend developers specialize in UI/UX and can earn similar salaries to full stack developers. Choose based on your interests: do you prefer visual design or system architecture?'
  },
  {
    question: 'Is frontend development still relevant with AI?',
    answer: 'Absolutely! AI tools help developers work faster but cannot replace the creativity, problem-solving, and user empathy that frontend developers bring. The demand for skilled frontend developers remains high.'
  },
  {
    question: 'How do I build a standout portfolio?',
    answer: 'Build 3-5 polished projects that solve real problems. Include at least one complex project (e-commerce or dashboard). Deploy everything, use TypeScript, add tests, and document your process. Contribute to open source.'
  },
  {
    question: 'What is the best way to get my first job?',
    answer: 'Build a strong portfolio, contribute to open source, network on LinkedIn/Twitter, and apply consistently. Consider freelancing or internships to gain experience. Prepare for technical interviews and never give up.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'Full Stack Developer',
    description: 'Add backend skills with Node.js and databases',
    href: '/roadmap/full-stack-developer',
    icon: Layers,
    color: 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66]'
  },
  {
    title: 'Backend Developer',
    description: 'Server-side programming and APIs',
    href: '/roadmap/backend-developer',
    icon: Server,
    color: 'bg-green-500'
  },
  {
    title: 'DevOps Engineer',
    description: 'Deployment, CI/CD, and infrastructure',
    href: '/roadmap/devops-engineer',
    icon: Cloud,
    color: 'bg-orange-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Frontend Developer Roadmap 2026',
  description: 'Complete guide to becoming a frontend developer in 2026',
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

export default function FrontendDeveloperRoadmapPage() {
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
          title="Frontend Developer Roadmap"
          description="Master HTML, CSS, JavaScript, React, and modern web technologies. Your complete guide to becoming a professional frontend developer in 2026."
          duration="4-6 Months"
          difficulty="Beginner Friendly"
          accentColor="#8B5CF6"
        />

        <WhatIsSection
          title="What is a Frontend Developer?"
          paragraphs={[
            'Frontend developers build the visual and interactive parts of websites that users see and interact with. They transform designs into functional, responsive web experiences using HTML, CSS, and JavaScript.',
            'As a frontend developer, you will create user interfaces, ensure cross-browser compatibility, optimize performance, and collaborate with designers and backend developers.'
          ]}
          responsibilities={[
            'Build responsive, mobile-first web interfaces',
            'Write clean, semantic HTML and CSS',
            'Implement interactive features with JavaScript',
            'Work with UI/UX designers to implement designs',
            'Ensure cross-browser compatibility',
            'Optimize applications for speed and performance',
            'Collaborate with backend developers on APIs'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#8B5CF6"
        />

        <SalarySection
          title="Frontend Developer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Specialize in React + TypeScript + Next.js for maximum earning potential. Remote positions at US companies can offer 2-3x higher salaries for developers in India."
          gradient="bg-gradient-to-r from-blue-600 to-purple-600"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        {/* Related Calculators */}
        <div className="bg-gray-50">
          <RelatedCalculators calculators={getRoadmapRelatedCalculators('frontend-developer')} variant="compact" />
        </div>

        <CTASection
          title="Ready to Start Your Frontend Journey?"
          description="Get personalized guidance from experienced developers who have been where you are."
          gradient="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
        />
      </main>

      <Footer />
    </>
  );
}
