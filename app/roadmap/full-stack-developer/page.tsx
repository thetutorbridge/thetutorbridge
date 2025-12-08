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
  Database,
  Server,
  Shield,
  Cloud,
  Monitor,
  Zap
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
        description: 'Understand the basics of web communication',
        topics: ['DNS', 'HTTP/HTTPS', 'Browsers', 'Hosting', 'TCP/IP']
      }
    ],
    milestone: 'You understand how the web works!'
  },
  {
    title: 'HTML & CSS',
    icon: Layout,
    color: 'bg-orange-500',
    steps: [
      {
        id: 2,
        title: 'HTML5 Fundamentals',
        description: 'Learn semantic markup and page structure',
        topics: ['Semantic Tags', 'Forms', 'Accessibility', 'SEO']
      },
      {
        id: 3,
        title: 'CSS Mastery',
        description: 'Style and layout web pages',
        topics: ['Selectors', 'Box Model', 'Flexbox', 'CSS Grid']
      },
      {
        id: 4,
        title: 'Responsive Design',
        description: 'Build for all screen sizes',
        topics: ['Media Queries', 'Mobile-First', 'Fluid Layouts']
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
        description: 'Core programming concepts',
        topics: ['Variables', 'Functions', 'Arrays', 'Objects']
      },
      {
        id: 6,
        title: 'DOM & Events',
        description: 'Make pages interactive',
        topics: ['DOM API', 'Events', 'Forms', 'Dynamic Content']
      },
      {
        id: 7,
        title: 'ES6+ & Async',
        description: 'Modern JavaScript features',
        topics: ['Arrow Functions', 'Promises', 'Async/Await', 'Modules']
      }
    ],
    milestone: 'You can build interactive websites!'
  },
  {
    title: 'Version Control',
    icon: GitBranch,
    color: 'bg-gray-700',
    steps: [
      {
        id: 8,
        title: 'Git & GitHub',
        description: 'Track and collaborate on code',
        topics: ['Commits', 'Branches', 'Pull Requests', 'Merging']
      }
    ]
  },
  {
    title: 'CSS Frameworks',
    icon: Palette,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 9,
        title: 'Tailwind CSS',
        description: 'Utility-first CSS framework',
        topics: ['Utility Classes', 'Configuration', 'Components', 'Dark Mode']
      }
    ]
  },
  {
    title: 'React & Next.js',
    icon: Layers,
    color: 'bg-sky-500',
    steps: [
      {
        id: 10,
        title: 'React Fundamentals',
        description: 'Build component-based UIs',
        topics: ['Components', 'Props', 'State', 'Hooks']
      },
      {
        id: 11,
        title: 'React Advanced',
        description: 'Advanced patterns and state',
        topics: ['Context', 'Custom Hooks', 'React Query', 'Forms']
      },
      {
        id: 12,
        title: 'Next.js',
        description: 'Full-stack React framework',
        topics: ['App Router', 'SSR', 'SSG', 'API Routes']
      }
    ],
    milestone: 'You are a Frontend Developer!'
  },
  {
    title: 'Backend with Node.js',
    icon: Server,
    color: 'bg-green-600',
    steps: [
      {
        id: 13,
        title: 'Node.js Basics',
        description: 'Server-side JavaScript',
        topics: ['Modules', 'File System', 'NPM', 'Environment']
      },
      {
        id: 14,
        title: 'Express.js',
        description: 'Build REST APIs',
        topics: ['Routing', 'Middleware', 'Controllers', 'Error Handling']
      },
      {
        id: 15,
        title: 'Authentication',
        description: 'Secure your applications',
        topics: ['JWT', 'OAuth', 'Sessions', 'Password Hashing']
      }
    ]
  },
  {
    title: 'Databases',
    icon: Database,
    color: 'bg-purple-500',
    steps: [
      {
        id: 16,
        title: 'SQL Databases',
        description: 'Relational data management',
        topics: ['PostgreSQL', 'SQL Queries', 'Joins', 'Indexes']
      },
      {
        id: 17,
        title: 'NoSQL & ORMs',
        description: 'Modern database tools',
        topics: ['MongoDB', 'Redis', 'Prisma', 'Drizzle']
      }
    ],
    milestone: 'You can build full-stack apps!'
  },
  {
    title: 'TypeScript',
    icon: Shield,
    color: 'bg-blue-600',
    steps: [
      {
        id: 18,
        title: 'TypeScript',
        description: 'Type-safe JavaScript',
        topics: ['Types', 'Interfaces', 'Generics', 'Type Guards']
      }
    ]
  },
  {
    title: 'DevOps Basics',
    icon: Cloud,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 19,
        title: 'Deployment',
        description: 'Ship your applications',
        topics: ['Vercel', 'AWS', 'Docker', 'CI/CD']
      },
      {
        id: 20,
        title: 'Testing',
        description: 'Ensure code quality',
        topics: ['Jest', 'Testing Library', 'E2E Testing', 'Playwright']
      }
    ],
    milestone: 'You are a Full Stack Developer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$70K - $95K', avg: '$82K' },
  { level: 'Mid (2-5 yrs)', range: '$95K - $145K', avg: '$120K' },
  { level: 'Senior (5-8 yrs)', range: '$145K - $200K', avg: '$170K' },
  { level: 'Lead (8+ yrs)', range: '$200K - $300K+', avg: '$245K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹5L - ₹10L', avg: '₹7L' },
  { level: 'Junior (1-3 yrs)', range: '₹8L - ₹18L', avg: '₹12L' },
  { level: 'Mid (3-5 yrs)', range: '₹18L - ₹32L', avg: '₹24L' },
  { level: 'Senior (5+ yrs)', range: '₹32L - ₹60L+', avg: '₹42L' }
];

// Project Ideas
const projects = [
  {
    title: 'Portfolio Website',
    level: 'Beginner' as const,
    description: 'Personal site with contact form',
    skills: ['HTML', 'CSS', 'JavaScript']
  },
  {
    title: 'Task Manager',
    level: 'Intermediate' as const,
    description: 'CRUD app with authentication',
    skills: ['React', 'Node.js', 'MongoDB']
  },
  {
    title: 'E-Commerce Store',
    level: 'Advanced' as const,
    description: 'Full shopping experience with payments',
    skills: ['Next.js', 'Stripe', 'PostgreSQL']
  },
  {
    title: 'Social Media Clone',
    level: 'Advanced' as const,
    description: 'Posts, likes, comments, followers',
    skills: ['React', 'Node.js', 'Redis', 'WebSocket']
  },
  {
    title: 'Blog Platform',
    level: 'Intermediate' as const,
    description: 'CMS with markdown support',
    skills: ['Next.js', 'MDX', 'Prisma']
  },
  {
    title: 'Real-time Chat',
    level: 'Intermediate' as const,
    description: 'Group chat with typing indicators',
    skills: ['Socket.io', 'React', 'Express']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to become a full stack developer?',
    answer: 'With 4-5 hours of daily practice, you can become job-ready in 6-12 months. This includes learning frontend (HTML, CSS, JS, React), backend (Node.js, databases), and deployment. Reaching senior level typically takes 3-5 years of professional experience.'
  },
  {
    question: 'Should I learn frontend or backend first?',
    answer: 'Start with frontend. It provides visual feedback as you learn, which is motivating for beginners. Once comfortable with HTML, CSS, and JavaScript, transition to backend. React naturally leads to Node.js, making the full stack journey smooth.'
  },
  {
    question: 'Is full stack development too much to learn?',
    answer: 'It seems overwhelming at first, but technologies overlap. JavaScript works for both frontend (React) and backend (Node.js). Once you understand core concepts, adding new tools becomes easier. Focus on depth in key areas rather than breadth.'
  },
  {
    question: 'MERN or MEAN stack - which is better?',
    answer: 'MERN (MongoDB, Express, React, Node) is more popular in 2026 due to React dominance. However, the specific stack matters less than understanding concepts. Many companies use different databases (PostgreSQL) with React and Node.js.'
  },
  {
    question: 'Do I need to know DevOps?',
    answer: 'Basic DevOps knowledge is essential for full stack developers. You should know how to deploy applications (Vercel, AWS), use Docker basics, and set up CI/CD. Deep DevOps expertise is optional but valuable for senior roles.'
  },
  {
    question: 'Full stack vs specialized developer - which pays more?',
    answer: 'At senior levels, both can earn similar salaries. Specialists often earn slightly more in their domain (e.g., senior frontend at FAANG). Full stack developers have more job flexibility and are highly valued at startups. Choose based on interest.'
  },
  {
    question: 'How do I manage learning so many technologies?',
    answer: 'Follow a structured roadmap and learn sequentially. Master one technology before moving to the next. Build projects that combine skills. Do not try to learn everything at once - focus on the most demanded stack (React + Node.js + PostgreSQL).'
  },
  {
    question: 'Is Next.js replacing traditional full stack development?',
    answer: 'Next.js is becoming the default choice for new full stack projects in 2026. It combines React frontend with API routes and server components, simplifying the stack. Understanding traditional separation (React + Express) still helps with legacy systems.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'Frontend Developer',
    description: 'Specialize in user interfaces',
    href: '/roadmap/frontend-developer',
    icon: Monitor,
    color: 'bg-purple-500'
  },
  {
    title: 'Backend Developer',
    description: 'Focus on servers and databases',
    href: '/roadmap/backend-developer',
    icon: Server,
    color: 'bg-green-500'
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
  headline: 'Full Stack Developer Roadmap 2026',
  description: 'Complete guide to becoming a full stack developer in 2026',
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

export default function FullStackDeveloperRoadmapPage() {
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
          title="Full Stack Developer Roadmap"
          description="Master frontend, backend, databases, and deployment. Your complete guide to becoming a professional full stack developer in 2026."
          duration="6-12 Months"
          difficulty="Intermediate"
          accentColor="#2BAE66"
        />

        <WhatIsSection
          title="What is a Full Stack Developer?"
          paragraphs={[
            'Full stack developers build complete web applications from start to finish. They work on both the frontend (what users see) and backend (servers, databases, APIs), making them versatile problem solvers.',
            'As a full stack developer, you will create user interfaces, build APIs, manage databases, implement authentication, and deploy applications. This comprehensive skill set makes you valuable to any team.'
          ]}
          responsibilities={[
            'Build responsive user interfaces with React/Next.js',
            'Create RESTful APIs and server-side logic',
            'Design and manage databases (SQL and NoSQL)',
            'Implement user authentication and authorization',
            'Write clean, maintainable, testable code',
            'Deploy and monitor applications in production',
            'Collaborate with designers, product managers, and other developers',
            'Debug and optimize application performance'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#2BAE66"
        />

        <SalarySection
          title="Full Stack Developer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Full stack developers with Next.js, TypeScript, and cloud expertise (AWS/Vercel) are in highest demand. Senior full stack engineers at top companies can earn $350K+ with equity."
          gradient="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66]"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Become a Full Stack Developer?"
          description="Get personalized guidance from experienced developers who have built production applications."
          gradient="bg-gradient-to-r from-[#1A3D7C] via-[#2BAE66] to-[#1A3D7C]"
        />
      </main>

      <Footer />
    </>
  );
}
