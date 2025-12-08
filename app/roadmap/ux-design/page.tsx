'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Palette,
  Users,
  Search,
  PenTool,
  Layout,
  Layers,
  TestTube,
  Smartphone,
  BarChart3,
  Briefcase,
  Settings,
  Globe
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
    title: 'UX Fundamentals',
    icon: Palette,
    color: 'bg-purple-500',
    steps: [
      {
        id: 1,
        title: 'Introduction to UX',
        description: 'Understand UX design basics',
        topics: ['What is UX?', 'UX vs UI', 'User-Centered Design', 'Design Thinking', 'UX Process']
      },
      {
        id: 2,
        title: 'UX Principles',
        description: 'Core design principles',
        topics: ['Usability', 'Accessibility', 'Consistency', 'Hierarchy', 'Feedback']
      },
      {
        id: 3,
        title: 'Psychology for UX',
        description: 'User psychology basics',
        topics: ['Cognitive Load', 'Mental Models', 'Heuristics', 'Gestalt Principles', 'Decision Making']
      }
    ],
    milestone: 'You understand UX fundamentals!'
  },
  {
    title: 'User Research',
    icon: Users,
    color: 'bg-blue-500',
    steps: [
      {
        id: 4,
        title: 'Research Methods',
        description: 'Learn research techniques',
        topics: ['User Interviews', 'Surveys', 'Contextual Inquiry', 'Diary Studies', 'Focus Groups']
      },
      {
        id: 5,
        title: 'User Analysis',
        description: 'Analyze and synthesize data',
        topics: ['Personas', 'User Journey Maps', 'Empathy Maps', 'Jobs-to-be-Done', 'Affinity Diagrams']
      },
      {
        id: 6,
        title: 'Competitive Analysis',
        description: 'Analyze competitors',
        topics: ['Competitor Research', 'Feature Comparison', 'UX Benchmarking', 'Gap Analysis']
      }
    ],
    milestone: 'You can conduct user research!'
  },
  {
    title: 'Information Architecture',
    icon: Search,
    color: 'bg-green-500',
    steps: [
      {
        id: 7,
        title: 'IA Fundamentals',
        description: 'Organize information',
        topics: ['Content Strategy', 'Taxonomy', 'Navigation Design', 'Site Maps', 'Card Sorting']
      },
      {
        id: 8,
        title: 'Content Design',
        description: 'Design for content',
        topics: ['Content Audit', 'Content Hierarchy', 'Labeling', 'Search Design', 'Findability']
      }
    ]
  },
  {
    title: 'Wireframing',
    icon: PenTool,
    color: 'bg-gray-600',
    steps: [
      {
        id: 9,
        title: 'Low-Fidelity Design',
        description: 'Sketch and wireframe',
        topics: ['Sketching', 'Paper Prototypes', 'Lo-Fi Wireframes', 'User Flows', 'Rapid Ideation']
      },
      {
        id: 10,
        title: 'Wireframe Tools',
        description: 'Digital wireframing',
        topics: ['Figma Basics', 'Sketch Basics', 'Balsamiq', 'Wireframe Components', 'Annotation']
      }
    ],
    milestone: 'You can create wireframes!'
  },
  {
    title: 'Prototyping',
    icon: Layout,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 11,
        title: 'Interactive Prototypes',
        description: 'Build clickable prototypes',
        topics: ['Figma Prototyping', 'Interactions', 'Transitions', 'Micro-interactions', 'Prototype Fidelity']
      },
      {
        id: 12,
        title: 'Advanced Prototyping',
        description: 'Complex interactions',
        topics: ['Variables', 'Conditionals', 'Component Interactions', 'Animation', 'Framer']
      }
    ]
  },
  {
    title: 'Design Tools',
    icon: Layers,
    color: 'bg-pink-500',
    steps: [
      {
        id: 13,
        title: 'Figma Mastery',
        description: 'Master Figma',
        topics: ['Components', 'Auto Layout', 'Styles', 'Variants', 'Plugins']
      },
      {
        id: 14,
        title: 'Design Systems',
        description: 'Build design systems',
        topics: ['Design Tokens', 'Component Libraries', 'Documentation', 'Pattern Libraries', 'Consistency']
      }
    ],
    milestone: 'You can design professional UIs!'
  },
  {
    title: 'Usability Testing',
    icon: TestTube,
    color: 'bg-orange-500',
    steps: [
      {
        id: 15,
        title: 'Testing Methods',
        description: 'Conduct usability tests',
        topics: ['Moderated Testing', 'Unmoderated Testing', 'A/B Testing', 'Think-Aloud Protocol', 'Task Analysis']
      },
      {
        id: 16,
        title: 'Test Analysis',
        description: 'Analyze test results',
        topics: ['Findings Synthesis', 'Usability Metrics', 'Reporting', 'Recommendations', 'Iteration']
      }
    ]
  },
  {
    title: 'Mobile & Responsive',
    icon: Smartphone,
    color: 'bg-teal-500',
    steps: [
      {
        id: 17,
        title: 'Mobile UX',
        description: 'Design for mobile',
        topics: ['Mobile Patterns', 'Touch Design', 'Gestures', 'Mobile Navigation', 'Responsive Design']
      },
      {
        id: 18,
        title: 'Cross-Platform',
        description: 'Multi-device design',
        topics: ['iOS vs Android', 'Platform Guidelines', 'Adaptive Design', 'Progressive Enhancement']
      }
    ]
  },
  {
    title: 'UX Metrics',
    icon: BarChart3,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 19,
        title: 'Measuring UX',
        description: 'Quantify UX success',
        topics: ['SUS', 'NPS', 'Task Success Rate', 'Time on Task', 'Error Rate']
      },
      {
        id: 20,
        title: 'Analytics for UX',
        description: 'Data-driven design',
        topics: ['Google Analytics', 'Heatmaps', 'Session Recordings', 'Funnel Analysis', 'Conversion']
      }
    ],
    milestone: 'You can measure and improve UX!'
  },
  {
    title: 'Professional Skills',
    icon: Briefcase,
    color: 'bg-emerald-500',
    steps: [
      {
        id: 21,
        title: 'Portfolio',
        description: 'Build your portfolio',
        topics: ['Case Studies', 'Process Documentation', 'Storytelling', 'Portfolio Website', 'Presentation']
      },
      {
        id: 22,
        title: 'Soft Skills',
        description: 'Professional development',
        topics: ['Stakeholder Management', 'Design Critique', 'Collaboration', 'Design Advocacy', 'Leadership']
      }
    ],
    milestone: 'You are a professional UX Designer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Junior (0-2 yrs)', range: '$60K - $85K', avg: '$72K' },
  { level: 'Mid (2-5 yrs)', range: '$85K - $120K', avg: '$100K' },
  { level: 'Senior (5-8 yrs)', range: '$120K - $160K', avg: '$140K' },
  { level: 'Lead/Director (8+ yrs)', range: '$160K - $220K+', avg: '$185K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹4L - ₹8L', avg: '₹6L' },
  { level: 'Junior (1-3 yrs)', range: '₹7L - ₹14L', avg: '₹10L' },
  { level: 'Mid (3-5 yrs)', range: '₹14L - ₹25L', avg: '₹18L' },
  { level: 'Senior (5+ yrs)', range: '₹25L - ₹45L+', avg: '₹32L' }
];

// Project Ideas
const projects = [
  {
    title: 'App Redesign',
    level: 'Beginner' as const,
    description: 'Redesign an existing app\'s UX',
    skills: ['Research', 'Wireframing', 'Prototyping', 'Case Study']
  },
  {
    title: 'E-commerce Checkout',
    level: 'Beginner' as const,
    description: 'Design a checkout flow',
    skills: ['User Flows', 'Forms', 'Usability', 'Conversion']
  },
  {
    title: 'Mobile Banking App',
    level: 'Intermediate' as const,
    description: 'Design a banking experience',
    skills: ['Mobile UX', 'Security UX', 'Complex Flows', 'Accessibility']
  },
  {
    title: 'Design System',
    level: 'Intermediate' as const,
    description: 'Create a complete design system',
    skills: ['Components', 'Documentation', 'Tokens', 'Figma']
  },
  {
    title: 'SaaS Dashboard',
    level: 'Advanced' as const,
    description: 'Design a complex B2B dashboard',
    skills: ['Data Visualization', 'Information Architecture', 'Enterprise UX']
  },
  {
    title: 'Healthcare App',
    level: 'Advanced' as const,
    description: 'Design for healthcare domain',
    skills: ['Compliance', 'Accessibility', 'Sensitive Design', 'User Research']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to become a UX designer?',
    answer: 'With dedicated practice, you can learn UX fundamentals in 3-4 months. Building a portfolio strong enough for entry-level positions takes 6-9 months. Bootcamps offer intensive 3-6 month programs. Self-taught designers may take 9-12 months to be job-ready with a solid portfolio.'
  },
  {
    question: 'Do I need to know how to code to be a UX designer?',
    answer: 'No, coding is not required for UX design. However, understanding basic HTML/CSS helps you communicate with developers and understand technical constraints. Many UX designers focus purely on research and design, while others learn front-end basics to enhance collaboration.'
  },
  {
    question: 'What tools should I learn for UX design?',
    answer: 'Start with Figma - it\'s the industry standard and free to learn. Other useful tools: FigJam for collaboration, Maze/UserTesting for research, Hotjar for analytics, Notion for documentation. Many designers only need Figma and research tools for most work.'
  },
  {
    question: 'UX Designer vs UI Designer vs Product Designer?',
    answer: 'UX Designers focus on user research and experience flow. UI Designers focus on visual design and aesthetics. Product Designers do both UX and UI, plus work on strategy. Most modern roles are Product Designer, combining all skills. Start with UX fundamentals, add UI skills.'
  },
  {
    question: 'How do I build a UX portfolio without experience?',
    answer: 'Do redesign projects for existing apps, create conceptual projects, volunteer for non-profits, take on freelance work, participate in design challenges. Focus on 3-4 detailed case studies showing your process. Quality matters more than quantity - show research and iteration.'
  },
  {
    question: 'Is UX design a good career in 2026?',
    answer: 'Yes, UX design demand continues growing as companies prioritize user experience. Salaries are competitive and work is creative. However, the field is becoming more competitive. Specializing in areas like AI UX, voice UX, or enterprise UX can help differentiate you.'
  },
  {
    question: 'Do I need a degree for UX design?',
    answer: 'No degree is required - portfolios matter most in UX. Many successful designers come from different backgrounds (psychology, marketing, development). Bootcamps and self-learning are valid paths. However, degrees in HCI, Design, or Psychology can be advantageous for some roles.'
  },
  {
    question: 'How do I transition into UX from another field?',
    answer: 'Leverage transferable skills: developers understand constraints, marketers understand users, PMs understand products. Build a portfolio with 3-4 case studies. Take a course or bootcamp. Network with UX designers. Start with roles combining UX with your background.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'Frontend Developer',
    description: 'Implement your designs',
    href: '/roadmap/frontend-developer',
    icon: Globe,
    color: 'bg-blue-500'
  },
  {
    title: 'Product Manager',
    description: 'Product strategy skills',
    href: '/roadmap/product-manager',
    icon: Briefcase,
    color: 'bg-indigo-500'
  },
  {
    title: 'Data Analyst',
    description: 'Data-driven design',
    href: '/roadmap/data-analyst',
    icon: BarChart3,
    color: 'bg-cyan-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'UX Design Roadmap 2026',
  description: 'Complete guide to becoming a UX Designer in 2026',
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

export default function UXDesignRoadmapPage() {
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
          title="UX Design Roadmap"
          description="Master user research, wireframing, prototyping, usability testing, and design systems. Your complete guide to becoming a professional UX Designer in 2026."
          duration="4-8 Months"
          difficulty="Beginner Friendly"
          accentColor="#EC4899"
        />

        <WhatIsSection
          title="What is a UX Designer?"
          paragraphs={[
            'UX Designers create meaningful and enjoyable experiences for users interacting with products. They research user needs, design solutions, and validate designs through testing to ensure products are useful, usable, and delightful.',
            'As a UX Designer, you will conduct user research, create personas and user flows, design wireframes and prototypes, run usability tests, and collaborate with product teams to improve user experience.'
          ]}
          responsibilities={[
            'Conduct user research and interviews',
            'Create user personas and journey maps',
            'Design wireframes and prototypes',
            'Build and maintain design systems',
            'Conduct usability testing',
            'Analyze UX metrics and data',
            'Collaborate with developers and PMs'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#EC4899"
        />

        <SalarySection
          title="UX Designer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Product Designer roles (combining UX and UI) typically pay more than pure UX roles. FAANG companies offer significantly higher compensation. Specializing in areas like enterprise UX, AI UX, or accessibility can command premium salaries."
          gradient="bg-gradient-to-r from-pink-500 to-purple-600"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your UX Design Journey?"
          description="Get personalized guidance from experienced UX designers who have built products used by millions."
          gradient="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
        />
      </main>

      <Footer />
    </>
  );
}
