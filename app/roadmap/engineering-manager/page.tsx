'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Users,
  Target,
  TrendingUp,
  MessageSquare,
  Calendar,
  Shield,
  Briefcase,
  Award,
  Settings,
  Heart,
  Lightbulb,
  Building2
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
    title: 'Technical Foundation',
    icon: Settings,
    color: 'bg-blue-500',
    steps: [
      {
        id: 1,
        title: 'Engineering Excellence',
        description: 'Strong technical background',
        topics: ['Software Development', 'System Design', 'Code Quality', 'Technical Decisions', 'Architecture']
      },
      {
        id: 2,
        title: 'Technical Leadership',
        description: 'Lead without authority',
        topics: ['Tech Lead Experience', 'Code Reviews', 'Mentoring', 'Technical Direction', 'Best Practices']
      }
    ],
    milestone: 'You have technical credibility!'
  },
  {
    title: 'People Management Fundamentals',
    icon: Users,
    color: 'bg-green-500',
    steps: [
      {
        id: 3,
        title: 'One-on-Ones',
        description: 'Effective 1:1 meetings',
        topics: ['1:1 Structure', 'Active Listening', 'Building Trust', 'Career Conversations', 'Feedback Delivery']
      },
      {
        id: 4,
        title: 'Team Dynamics',
        description: 'Build high-performing teams',
        topics: ['Team Building', 'Conflict Resolution', 'Psychological Safety', 'Team Culture', 'Motivation']
      }
    ]
  },
  {
    title: 'Hiring & Onboarding',
    icon: Briefcase,
    color: 'bg-purple-500',
    steps: [
      {
        id: 5,
        title: 'Hiring',
        description: 'Build your team',
        topics: ['Job Descriptions', 'Sourcing', 'Interview Design', 'Evaluation', 'Closing Candidates']
      },
      {
        id: 6,
        title: 'Onboarding',
        description: 'Set up for success',
        topics: ['30-60-90 Plans', 'Buddy System', 'Documentation', 'Expectations Setting', 'Integration']
      }
    ],
    milestone: 'You can build teams!'
  },
  {
    title: 'Performance Management',
    icon: TrendingUp,
    color: 'bg-orange-500',
    steps: [
      {
        id: 7,
        title: 'Goal Setting',
        description: 'Align on objectives',
        topics: ['OKRs', 'SMART Goals', 'Career Ladders', 'Expectations', 'Success Metrics']
      },
      {
        id: 8,
        title: 'Performance Reviews',
        description: 'Evaluate and develop',
        topics: ['Review Process', 'Feedback', 'Calibration', 'Promotions', 'PIPs']
      },
      {
        id: 9,
        title: 'Compensation',
        description: 'Fair and competitive pay',
        topics: ['Salary Bands', 'Equity', 'Market Data', 'Raise Conversations', 'Retention']
      }
    ]
  },
  {
    title: 'Communication & Influence',
    icon: MessageSquare,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 10,
        title: 'Communication Skills',
        description: 'Clear and effective',
        topics: ['Written Communication', 'Presentations', 'Status Updates', 'Difficult Conversations', 'Transparency']
      },
      {
        id: 11,
        title: 'Stakeholder Management',
        description: 'Work across teams',
        topics: ['Managing Up', 'Cross-functional', 'Executive Communication', 'Alignment', 'Influence']
      }
    ]
  },
  {
    title: 'Project & Delivery Management',
    icon: Calendar,
    color: 'bg-red-500',
    steps: [
      {
        id: 12,
        title: 'Agile & Process',
        description: 'Delivery frameworks',
        topics: ['Scrum', 'Kanban', 'Sprint Planning', 'Retrospectives', 'Continuous Improvement']
      },
      {
        id: 13,
        title: 'Execution',
        description: 'Deliver results',
        topics: ['Roadmap Planning', 'Estimation', 'Risk Management', 'Dependencies', 'Shipping']
      }
    ],
    milestone: 'You can deliver projects!'
  },
  {
    title: 'Technical Strategy',
    icon: Target,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 14,
        title: 'Technical Vision',
        description: 'Set direction',
        topics: ['Tech Strategy', 'Architecture Decisions', 'Tech Debt Management', 'Innovation', 'Standards']
      },
      {
        id: 15,
        title: 'Engineering Metrics',
        description: 'Measure what matters',
        topics: ['DORA Metrics', 'Velocity', 'Quality Metrics', 'Team Health', 'Productivity']
      }
    ]
  },
  {
    title: 'Team Health & Culture',
    icon: Heart,
    color: 'bg-pink-500',
    steps: [
      {
        id: 16,
        title: 'Team Culture',
        description: 'Build great culture',
        topics: ['Values', 'Norms', 'Rituals', 'Recognition', 'Inclusion']
      },
      {
        id: 17,
        title: 'Wellbeing',
        description: 'Support your team',
        topics: ['Work-Life Balance', 'Burnout Prevention', 'Mental Health', 'Remote Work', 'Flexibility']
      }
    ]
  },
  {
    title: 'Scaling & Organization',
    icon: Building2,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 18,
        title: 'Scaling Teams',
        description: 'Grow the organization',
        topics: ['Team Structures', 'Hiring Plans', 'Organizational Design', 'Manager of Managers', 'Delegation']
      },
      {
        id: 19,
        title: 'Process at Scale',
        description: 'Scale processes',
        topics: ['Documentation', 'Standardization', 'Knowledge Sharing', 'Tooling', 'Automation']
      }
    ]
  },
  {
    title: 'Leadership Growth',
    icon: Award,
    color: 'bg-emerald-500',
    steps: [
      {
        id: 20,
        title: 'Self-Development',
        description: 'Grow as a leader',
        topics: ['Self-Awareness', 'Feedback Seeking', 'Coaching', 'Mentorship', 'Learning']
      },
      {
        id: 21,
        title: 'Senior Leadership',
        description: 'Path to Director+',
        topics: ['Strategic Thinking', 'Business Acumen', 'Executive Presence', 'Organizational Impact', 'Vision']
      }
    ],
    milestone: 'You are an Engineering Manager!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'New Manager (0-2 yrs)', range: '$150K - $190K', avg: '$170K' },
  { level: 'Manager (2-5 yrs)', range: '$180K - $240K', avg: '$210K' },
  { level: 'Senior Manager (5-8 yrs)', range: '$220K - $300K', avg: '$260K' },
  { level: 'Director+ (8+ yrs)', range: '$280K - $400K+', avg: '$340K' }
];

const indiaSalaries = [
  { level: 'New Manager (0-2 yrs)', range: '₹30L - ₹45L', avg: '₹38L' },
  { level: 'Manager (2-5 yrs)', range: '₹45L - ₹70L', avg: '₹55L' },
  { level: 'Senior Manager (5-8 yrs)', range: '₹65L - ₹1Cr', avg: '₹80L' },
  { level: 'Director+ (8+ yrs)', range: '₹90L - ₹1.5Cr+', avg: '₹1.2Cr' }
];

// Project Ideas (Activities for skill development)
const projects = [
  {
    title: 'Lead a Project',
    level: 'Beginner' as const,
    description: 'Lead a small project end-to-end',
    skills: ['Planning', 'Coordination', 'Communication', 'Delivery']
  },
  {
    title: 'Mentor a Junior',
    level: 'Beginner' as const,
    description: 'Formally mentor a teammate',
    skills: ['Mentoring', 'Feedback', 'Career Guidance', 'Teaching']
  },
  {
    title: 'Run Hiring Loop',
    level: 'Intermediate' as const,
    description: 'Own hiring for a role',
    skills: ['JD Writing', 'Interviewing', 'Evaluation', 'Closing']
  },
  {
    title: 'Process Improvement',
    level: 'Intermediate' as const,
    description: 'Improve team processes',
    skills: ['Analysis', 'Change Management', 'Measurement', 'Iteration']
  },
  {
    title: 'Cross-team Initiative',
    level: 'Advanced' as const,
    description: 'Lead cross-functional project',
    skills: ['Stakeholder Management', 'Influence', 'Coordination', 'Execution']
  },
  {
    title: 'Team Scaling',
    level: 'Advanced' as const,
    description: 'Double your team size',
    skills: ['Hiring', 'Onboarding', 'Structure', 'Culture']
  }
];

// FAQs
const faqs = [
  {
    question: 'How do I transition from engineer to engineering manager?',
    answer: 'Start by taking on leadership opportunities: lead projects, mentor juniors, run meetings. Have explicit conversations with your manager about management interest. Consider a tech lead role first. Read management books, find a mentor who is a manager. The transition often happens when an opportunity arises.'
  },
  {
    question: 'How long does it take to become an engineering manager?',
    answer: 'Most engineering managers have 5-10 years of engineering experience before transitioning. However, timeline varies significantly. Some become managers in 3-4 years at fast-growing startups. Focus on developing leadership skills rather than a specific timeline.'
  },
  {
    question: 'Engineering Manager vs Tech Lead - what\'s the difference?',
    answer: 'Tech Leads focus primarily on technical direction while still coding significantly. Engineering Managers focus on people, team health, and delivery with less coding. Some roles combine both (Tech Lead Manager). EMs have direct reports; Tech Leads typically don\'t. Both are valid career paths.'
  },
  {
    question: 'Do engineering managers still write code?',
    answer: 'Varies by company and team size. New managers of small teams often code 20-40% of time. Managers of larger teams code much less. Most stay technical by reviewing code, participating in design discussions, and staying current with technology. Coding shouldn\'t block your team.'
  },
  {
    question: 'What if I don\'t like management?',
    answer: 'It\'s common to try management and prefer the IC (individual contributor) track. Many companies have Staff/Principal engineer paths that match manager compensation. Trying management teaches valuable skills either way. It\'s okay to go back to IC - there\'s no failure in finding your best fit.'
  },
  {
    question: 'What skills matter most for new engineering managers?',
    answer: 'One-on-ones and feedback delivery are foundational. Clear communication prevents most problems. Delegation is challenging but essential. Hiring well saves enormous pain. Build trust quickly. The best technical skills matter less than people skills in management.'
  },
  {
    question: 'How do I handle difficult conversations?',
    answer: 'Be direct but kind. Prepare thoroughly. Focus on behavior and impact, not personality. Listen more than you speak. Have conversations early before problems grow. Follow up in writing. Practice with lower-stakes conversations first. Get coaching from experienced managers.'
  },
  {
    question: 'How do I know if I\'m a good engineering manager?',
    answer: 'Your team is productive and improving. People want to stay and grow on your team. You have high trust with directs and peers. Projects ship consistently. You\'re not a bottleneck. Team members give honest feedback. Your skip-levels with your reports\' team are positive.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'Software Architect',
    description: 'Technical leadership path',
    href: '/roadmap/software-architect',
    icon: Building2,
    color: 'bg-purple-500'
  },
  {
    title: 'Product Manager',
    description: 'Product leadership',
    href: '/roadmap/product-manager',
    icon: Target,
    color: 'bg-blue-500'
  },
  {
    title: 'System Design',
    description: 'Stay technical',
    href: '/roadmap/system-design',
    icon: Settings,
    color: 'bg-orange-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Engineering Manager Roadmap 2026',
  description: 'Complete guide to becoming an Engineering Manager in 2026',
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

export default function EngineeringManagerRoadmapPage() {
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
          title="Engineering Manager Roadmap"
          description="Master people management, technical leadership, hiring, performance management, and organizational skills. Your complete guide to becoming an Engineering Manager in 2026."
          duration="2-4 Years"
          difficulty="Advanced"
          accentColor="#6366F1"
        />

        <WhatIsSection
          title="What is an Engineering Manager?"
          paragraphs={[
            'Engineering Managers lead software engineering teams, focusing on people development, team health, and delivery execution. They bridge the gap between technical work and organizational goals while growing their team members\' careers.',
            'As an Engineering Manager, you will conduct one-on-ones, hire and onboard engineers, manage performance, set technical direction, remove blockers, and ensure your team delivers value while maintaining work-life balance.'
          ]}
          responsibilities={[
            'Lead and develop engineering team members',
            'Conduct effective one-on-ones and feedback',
            'Hire, onboard, and retain talent',
            'Manage performance and career growth',
            'Set technical direction and standards',
            'Drive project delivery and execution',
            'Build healthy team culture'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#6366F1"
        />

        <SalarySection
          title="Engineering Manager Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Engineering Manager salaries vary significantly by company stage and team size. FAANG and well-funded startups pay significantly more. Total compensation often includes significant equity. Director+ roles at large companies can exceed $500K total compensation."
          gradient="bg-gradient-to-r from-indigo-500 to-purple-600"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your Management Journey?"
          description="Get personalized guidance from experienced Engineering Managers who have built and led successful teams."
          gradient="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        />
      </main>

      <Footer />
    </>
  );
}
