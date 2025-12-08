'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  CheckCircle,
  Search,
  Code,
  Settings,
  Shield,
  Zap,
  GitBranch,
  Layers,
  Server,
  Monitor,
  Bug,
  FileCheck
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
    title: 'QA Fundamentals',
    icon: CheckCircle,
    color: 'bg-green-500',
    steps: [
      {
        id: 1,
        title: 'Testing Basics',
        description: 'Understand core QA concepts',
        topics: ['What is QA', 'QA vs QC', 'Testing Types', 'QA Mindset', 'Test Oracles']
      },
      {
        id: 2,
        title: 'SDLC & Methodologies',
        description: 'Learn software development lifecycles',
        topics: ['Waterfall', 'V-Model', 'Agile', 'Scrum', 'Kanban', 'SAFe']
      },
      {
        id: 3,
        title: 'Testing Approaches',
        description: 'Different testing strategies',
        topics: ['Black Box', 'White Box', 'Gray Box', 'Risk-Based Testing', 'Test Prioritization']
      }
    ],
    milestone: 'You understand QA fundamentals!'
  },
  {
    title: 'Manual Testing',
    icon: Search,
    color: 'bg-blue-500',
    steps: [
      {
        id: 4,
        title: 'Test Planning',
        description: 'Plan and document tests',
        topics: ['Test Strategy', 'Test Plan', 'Test Cases', 'Test Scenarios', 'Traceability Matrix']
      },
      {
        id: 5,
        title: 'Functional Testing',
        description: 'Test application functionality',
        topics: ['Unit Testing', 'Integration Testing', 'System Testing', 'Smoke Testing', 'Sanity Testing']
      },
      {
        id: 6,
        title: 'Advanced Manual Testing',
        description: 'Specialized testing techniques',
        topics: ['Regression Testing', 'Exploratory Testing', 'UAT', 'Compatibility Testing', 'Usability Testing']
      }
    ],
    milestone: 'You can perform manual testing!'
  },
  {
    title: 'Web Technologies',
    icon: Monitor,
    color: 'bg-purple-500',
    steps: [
      {
        id: 7,
        title: 'HTML, CSS, JavaScript',
        description: 'Understand web fundamentals',
        topics: ['HTML Basics', 'CSS Selectors', 'JavaScript Basics', 'DOM', 'Browser DevTools']
      },
      {
        id: 8,
        title: 'Web Concepts',
        description: 'Learn web architecture',
        topics: ['HTTP/HTTPS', 'REST APIs', 'AJAX', 'Cookies/Sessions', 'Web Storage']
      }
    ]
  },
  {
    title: 'Programming for QA',
    icon: Code,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 9,
        title: 'Programming Basics',
        description: 'Learn to code for automation',
        topics: ['Python or JavaScript', 'Variables', 'Loops', 'Functions', 'OOP Basics']
      },
      {
        id: 10,
        title: 'Version Control',
        description: 'Manage test code',
        topics: ['Git Basics', 'GitHub', 'Branching', 'Pull Requests', 'Code Reviews']
      }
    ]
  },
  {
    title: 'UI Automation',
    icon: Settings,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 11,
        title: 'Selenium WebDriver',
        description: 'Industry-standard automation tool',
        topics: ['Locators', 'WebDriver Commands', 'Waits', 'Page Object Model', 'Test Frameworks']
      },
      {
        id: 12,
        title: 'Modern Frameworks',
        description: 'Next-gen automation tools',
        topics: ['Cypress', 'Playwright', 'WebdriverIO', 'TestCafe']
      },
      {
        id: 13,
        title: 'Advanced Automation',
        description: 'Scale your automation',
        topics: ['Data-Driven Testing', 'Cross-Browser Testing', 'Parallel Execution', 'Reporting']
      }
    ],
    milestone: 'You can automate UI tests!'
  },
  {
    title: 'API Testing',
    icon: Server,
    color: 'bg-orange-500',
    steps: [
      {
        id: 14,
        title: 'API Testing Basics',
        description: 'Test REST APIs',
        topics: ['REST Concepts', 'HTTP Methods', 'Status Codes', 'Request/Response', 'Authentication']
      },
      {
        id: 15,
        title: 'API Testing Tools',
        description: 'Tools for API automation',
        topics: ['Postman', 'REST Assured', 'Karate', 'Newman', 'API Mocking']
      }
    ]
  },
  {
    title: 'Performance Testing',
    icon: Zap,
    color: 'bg-red-500',
    steps: [
      {
        id: 16,
        title: 'Performance Concepts',
        description: 'Understand performance testing',
        topics: ['Load Testing', 'Stress Testing', 'Spike Testing', 'Endurance Testing', 'Metrics']
      },
      {
        id: 17,
        title: 'Performance Tools',
        description: 'Tools for performance testing',
        topics: ['JMeter', 'K6', 'Gatling', 'Locust', 'Artillery']
      }
    ]
  },
  {
    title: 'Security Testing',
    icon: Shield,
    color: 'bg-rose-500',
    steps: [
      {
        id: 18,
        title: 'Security Basics',
        description: 'Test application security',
        topics: ['OWASP Top 10', 'SQL Injection', 'XSS', 'CSRF', 'Authentication Flaws']
      },
      {
        id: 19,
        title: 'Security Tools',
        description: 'Security testing tools',
        topics: ['OWASP ZAP', 'Burp Suite', 'Nmap', 'Vulnerability Scanners']
      }
    ]
  },
  {
    title: 'CI/CD & DevOps',
    icon: GitBranch,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 20,
        title: 'CI/CD Pipelines',
        description: 'Integrate tests in pipelines',
        topics: ['Jenkins', 'GitHub Actions', 'GitLab CI', 'Azure DevOps', 'CircleCI']
      },
      {
        id: 21,
        title: 'Containerization',
        description: 'Run tests in containers',
        topics: ['Docker Basics', 'Docker Compose', 'Selenium Grid', 'Test Environments']
      }
    ],
    milestone: 'You are a professional QA Engineer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$55K - $75K', avg: '$65K' },
  { level: 'Mid (2-5 yrs)', range: '$75K - $110K', avg: '$90K' },
  { level: 'Senior (5-8 yrs)', range: '$110K - $150K', avg: '$130K' },
  { level: 'Lead/Manager (8+ yrs)', range: '$150K - $200K+', avg: '$170K' }
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
    title: 'Test Case Portfolio',
    level: 'Beginner' as const,
    description: 'Document test cases for a web application',
    skills: ['Test Planning', 'Test Cases', 'Bug Reports']
  },
  {
    title: 'Selenium Test Suite',
    level: 'Beginner' as const,
    description: 'Automate tests for an e-commerce site',
    skills: ['Selenium', 'Page Object Model', 'TestNG']
  },
  {
    title: 'API Test Framework',
    level: 'Intermediate' as const,
    description: 'Build API automation framework',
    skills: ['REST Assured', 'Postman', 'JSON Validation']
  },
  {
    title: 'Cypress E2E Suite',
    level: 'Intermediate' as const,
    description: 'End-to-end tests with Cypress',
    skills: ['Cypress', 'JavaScript', 'CI Integration']
  },
  {
    title: 'Performance Test Suite',
    level: 'Advanced' as const,
    description: 'Load testing with JMeter',
    skills: ['JMeter', 'Performance Metrics', 'Reporting']
  },
  {
    title: 'Full QA Pipeline',
    level: 'Advanced' as const,
    description: 'Complete CI/CD with automated tests',
    skills: ['Jenkins', 'Docker', 'Selenium Grid', 'Reporting']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to become a QA Engineer?',
    answer: 'With consistent practice (3-4 hours daily), you can become job-ready in 3-5 months for manual testing roles. Add 2-3 more months to learn automation testing. Becoming a senior QA engineer with expertise in multiple testing types takes 3-5 years of professional experience.'
  },
  {
    question: 'Do I need programming skills to become a QA Engineer?',
    answer: 'For manual testing roles, programming is not strictly required. However, for automation testing roles (which pay more), you need programming skills in Python, JavaScript, or Java. We recommend learning programming early as automation skills are increasingly expected.'
  },
  {
    question: 'Which automation tool should I learn first?',
    answer: 'Start with Selenium WebDriver - it is the industry standard and most requested in job postings. Once comfortable, learn modern tools like Cypress or Playwright. Cypress is easier to learn and great for JavaScript-based projects. Playwright is newer but powerful for cross-browser testing.'
  },
  {
    question: 'Manual Testing vs Automation Testing - which is better?',
    answer: 'Both are valuable and complementary. Manual testing is essential for exploratory testing, usability, and ad-hoc scenarios. Automation is better for repetitive tests, regression, and CI/CD. Most QA roles require both skills. Automation-focused roles typically pay 20-30% more.'
  },
  {
    question: 'Is QA a good career in 2026?',
    answer: 'Yes, QA remains essential as software quality becomes more critical. The shift towards automation, DevOps, and continuous testing has increased demand for skilled QA engineers. Salaries are competitive, and there are clear paths to senior roles, management, or specializations like security testing.'
  },
  {
    question: 'Should I get certified (ISTQB)?',
    answer: 'ISTQB certification is valuable, especially for entry-level positions and in certain industries. It demonstrates foundational knowledge and commitment to the field. However, practical skills and project experience matter more for most employers. Consider getting certified after building hands-on experience.'
  },
  {
    question: 'What is the difference between QA and SDET?',
    answer: 'QA Engineers focus on testing strategy, manual testing, and automation. SDETs (Software Development Engineers in Test) are more developer-focused, building test infrastructure, frameworks, and tools. SDETs typically have stronger programming skills and earn higher salaries. Many QA Engineers transition to SDET roles.'
  },
  {
    question: 'How do I transition from manual to automation testing?',
    answer: 'Start by learning programming basics (Python or JavaScript). Then pick one automation tool (Selenium or Cypress) and practice daily. Automate tests for open-source projects or create your own test projects. Apply for roles that mention "hybrid" or "manual + automation" to gain professional experience.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'Frontend Developer',
    description: 'Understand what you are testing',
    href: '/roadmap/frontend-developer',
    icon: Monitor,
    color: 'bg-purple-500'
  },
  {
    title: 'Backend Developer',
    description: 'Learn API and server concepts',
    href: '/roadmap/backend-developer',
    icon: Server,
    color: 'bg-green-500'
  },
  {
    title: 'DevOps Engineer',
    description: 'CI/CD and infrastructure',
    href: '/roadmap/devops',
    icon: GitBranch,
    color: 'bg-orange-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'QA Engineer Roadmap 2026',
  description: 'Complete guide to becoming a QA engineer in 2026',
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

export default function QARoadmapPage() {
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
          title="QA Engineer Roadmap"
          description="Master manual testing, automation testing, API testing, performance testing, and CI/CD integration. Your complete guide to becoming a professional QA Engineer in 2026."
          duration="3-6 Months"
          difficulty="Beginner Friendly"
          accentColor="#22C55E"
        />

        <WhatIsSection
          title="What is a QA Engineer?"
          paragraphs={[
            'QA (Quality Assurance) Engineers ensure software products meet quality standards before release. They design test strategies, write test cases, execute tests, and report bugs to help deliver reliable software.',
            'As a QA Engineer, you will perform manual and automated testing, work closely with developers to identify issues early, and help maintain high-quality standards throughout the software development lifecycle.'
          ]}
          responsibilities={[
            'Create test plans, test cases, and test scenarios',
            'Perform manual functional and exploratory testing',
            'Build and maintain automated test suites',
            'Execute API and integration tests',
            'Report, track, and verify bug fixes',
            'Collaborate with developers in Agile teams',
            'Set up and maintain CI/CD test pipelines'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#22C55E"
        />

        <SalarySection
          title="QA Engineer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Automation skills significantly increase earning potential. SDETs and QA Engineers with strong programming skills earn 20-40% more. Specializing in performance or security testing also commands premium salaries."
          gradient="bg-gradient-to-r from-green-500 to-emerald-600"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your QA Engineering Journey?"
          description="Get personalized guidance from experienced QA professionals who have tested production systems."
          gradient="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"
        />
      </main>

      <Footer />
    </>
  );
}
