'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Code,
  Box,
  Database,
  Globe,
  Cog,
  TestTube,
  Package,
  Layers,
  Server,
  Monitor,
  Brain
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
    title: 'Python Basics',
    icon: Code,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 1,
        title: 'Syntax & Fundamentals',
        description: 'Learn Python basics',
        topics: ['Variables', 'Data Types', 'Operators', 'Control Flow', 'Functions']
      },
      {
        id: 2,
        title: 'Data Structures',
        description: 'Master built-in data structures',
        topics: ['Lists', 'Tuples', 'Dictionaries', 'Sets', 'Comprehensions']
      },
      {
        id: 3,
        title: 'File Handling',
        description: 'Work with files',
        topics: ['Reading Files', 'Writing Files', 'CSV', 'JSON', 'Context Managers']
      }
    ],
    milestone: 'You know Python basics!'
  },
  {
    title: 'Object-Oriented Programming',
    icon: Box,
    color: 'bg-blue-500',
    steps: [
      {
        id: 4,
        title: 'OOP Concepts',
        description: 'Master object-oriented programming',
        topics: ['Classes', 'Objects', 'Inheritance', 'Polymorphism', 'Encapsulation']
      },
      {
        id: 5,
        title: 'Advanced OOP',
        description: 'Deep dive into OOP',
        topics: ['Magic Methods', 'Decorators', 'Property', 'Abstract Classes', 'Dataclasses']
      }
    ]
  },
  {
    title: 'Advanced Python',
    icon: Cog,
    color: 'bg-purple-500',
    steps: [
      {
        id: 6,
        title: 'Advanced Concepts',
        description: 'Master advanced features',
        topics: ['Generators', 'Iterators', 'Context Managers', 'Closures', 'Lambda']
      },
      {
        id: 7,
        title: 'Concurrency',
        description: 'Parallel and async programming',
        topics: ['Threading', 'Multiprocessing', 'Asyncio', 'Async/Await', 'Concurrent.futures']
      },
      {
        id: 8,
        title: 'Error Handling',
        description: 'Handle errors properly',
        topics: ['Exceptions', 'Try/Except', 'Custom Exceptions', 'Logging', 'Debugging']
      }
    ],
    milestone: 'You are an advanced Python developer!'
  },
  {
    title: 'Package Management',
    icon: Package,
    color: 'bg-green-500',
    steps: [
      {
        id: 9,
        title: 'Virtual Environments',
        description: 'Manage project dependencies',
        topics: ['venv', 'virtualenv', 'conda', 'pyenv', 'Poetry']
      },
      {
        id: 10,
        title: 'Package Distribution',
        description: 'Create and publish packages',
        topics: ['pip', 'PyPI', 'setup.py', 'pyproject.toml', 'Publishing Packages']
      }
    ]
  },
  {
    title: 'Testing',
    icon: TestTube,
    color: 'bg-red-500',
    steps: [
      {
        id: 11,
        title: 'Testing Frameworks',
        description: 'Write and run tests',
        topics: ['unittest', 'pytest', 'Fixtures', 'Mocking', 'Coverage']
      },
      {
        id: 12,
        title: 'Testing Best Practices',
        description: 'Professional testing patterns',
        topics: ['TDD', 'Integration Tests', 'E2E Tests', 'CI/CD Testing', 'Test Organization']
      }
    ],
    milestone: 'You can write tested code!'
  },
  {
    title: 'Web Development',
    icon: Globe,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 13,
        title: 'Django',
        description: 'Full-featured web framework',
        topics: ['MVT Pattern', 'ORM', 'Templates', 'Admin', 'Django REST Framework']
      },
      {
        id: 14,
        title: 'FastAPI',
        description: 'Modern async API framework',
        topics: ['Async APIs', 'Pydantic', 'OpenAPI', 'Dependency Injection', 'Authentication']
      },
      {
        id: 15,
        title: 'Flask',
        description: 'Lightweight web framework',
        topics: ['Routing', 'Templates', 'Blueprints', 'Extensions', 'Flask-RESTful']
      }
    ]
  },
  {
    title: 'Databases',
    icon: Database,
    color: 'bg-orange-500',
    steps: [
      {
        id: 16,
        title: 'SQL Databases',
        description: 'Work with relational databases',
        topics: ['PostgreSQL', 'MySQL', 'SQLite', 'SQLAlchemy', 'Raw SQL']
      },
      {
        id: 17,
        title: 'NoSQL & Caching',
        description: 'Non-relational data storage',
        topics: ['MongoDB', 'Redis', 'Elasticsearch', 'ORMs', 'Database Design']
      }
    ],
    milestone: 'You can build full applications!'
  },
  {
    title: 'Specializations',
    icon: Brain,
    color: 'bg-pink-500',
    steps: [
      {
        id: 18,
        title: 'Data Science & ML',
        description: 'Python for data',
        topics: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn', 'Jupyter']
      },
      {
        id: 19,
        title: 'Automation & Scripting',
        description: 'Automate everything',
        topics: ['Web Scraping', 'Selenium', 'Task Automation', 'CLI Tools', 'APIs']
      },
      {
        id: 20,
        title: 'DevOps & Cloud',
        description: 'Python in production',
        topics: ['Docker', 'AWS SDK', 'CI/CD', 'Infrastructure Scripts', 'Monitoring']
      }
    ],
    milestone: 'You are a professional Python Developer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$65K - $90K', avg: '$75K' },
  { level: 'Mid (2-5 yrs)', range: '$90K - $130K', avg: '$110K' },
  { level: 'Senior (5-8 yrs)', range: '$130K - $170K', avg: '$150K' },
  { level: 'Lead (8+ yrs)', range: '$170K - $220K+', avg: '$190K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹3L - ₹6L', avg: '₹4.5L' },
  { level: 'Junior (1-3 yrs)', range: '₹6L - ₹12L', avg: '₹9L' },
  { level: 'Mid (3-5 yrs)', range: '₹12L - ₹22L', avg: '₹16L' },
  { level: 'Senior (5+ yrs)', range: '₹22L - ₹40L+', avg: '₹30L' }
];

// Project Ideas
const projects = [
  {
    title: 'CLI Todo App',
    level: 'Beginner' as const,
    description: 'Build a command-line task manager',
    skills: ['Python Basics', 'File I/O', 'argparse']
  },
  {
    title: 'Web Scraper',
    level: 'Beginner' as const,
    description: 'Scrape data from websites',
    skills: ['BeautifulSoup', 'Requests', 'Data Processing']
  },
  {
    title: 'REST API with FastAPI',
    level: 'Intermediate' as const,
    description: 'Build a full-featured REST API',
    skills: ['FastAPI', 'Pydantic', 'PostgreSQL']
  },
  {
    title: 'Django Blog',
    level: 'Intermediate' as const,
    description: 'Full-stack blog application',
    skills: ['Django', 'Templates', 'Authentication']
  },
  {
    title: 'Automation Bot',
    level: 'Advanced' as const,
    description: 'Automate repetitive tasks',
    skills: ['Selenium', 'Scheduling', 'APIs']
  },
  {
    title: 'ML Pipeline',
    level: 'Advanced' as const,
    description: 'Build a machine learning pipeline',
    skills: ['Scikit-learn', 'Pandas', 'MLflow']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to learn Python?',
    answer: 'Python basics can be learned in 2-4 weeks with consistent practice. Becoming proficient enough for a job typically takes 3-6 months of dedicated learning. Mastering Python including frameworks, testing, and specializations takes 1-2 years. Python is known for its gentle learning curve and readable syntax.'
  },
  {
    question: 'Is Python good for web development?',
    answer: 'Yes, Python is excellent for web development. Django is a batteries-included framework for large applications. FastAPI is modern and fast for APIs. Flask is great for smaller projects. While not as dominant as JavaScript in frontend, Python powers many successful backends including Instagram, Spotify, and Pinterest.'
  },
  {
    question: 'Should I learn Python 2 or Python 3?',
    answer: 'Learn Python 3 only. Python 2 reached end-of-life in January 2020 and is no longer maintained. All modern libraries and frameworks use Python 3. Any legacy Python 2 code is being migrated. Start with Python 3.10+ to access the latest features like pattern matching and improved error messages.'
  },
  {
    question: 'Which Python framework should I learn first?',
    answer: 'For web development, start with Django if you want a complete solution with admin panel, ORM, and authentication built-in. Choose FastAPI if you want to build modern APIs with automatic documentation. Flask is good for learning fundamentals but requires more manual setup. Django has the most job opportunities.'
  },
  {
    question: 'Is Python good for beginners?',
    answer: 'Python is one of the best languages for beginners. Its syntax is clean and readable, resembling plain English. It has a gentle learning curve, excellent documentation, and a supportive community. You can build real projects quickly, which keeps motivation high. Many universities teach programming with Python.'
  },
  {
    question: 'What jobs can I get with Python?',
    answer: 'Python opens doors to many careers: Backend Developer, Data Scientist, Data Analyst, Machine Learning Engineer, DevOps Engineer, Automation Engineer, and Security Professional. It is also valuable for roles in finance, research, and scientific computing. Python is consistently among the most in-demand programming languages.'
  },
  {
    question: 'Is Python enough for a programming career?',
    answer: 'Python alone can get you a job, especially in data science, automation, or backend development. However, most careers benefit from additional skills: SQL for data roles, JavaScript for full-stack, cloud platforms for DevOps. Python is an excellent primary language, but diversifying your skills increases opportunities.'
  },
  {
    question: 'How do I practice Python effectively?',
    answer: 'Build projects that interest you - this is the most effective way to learn. Start with small scripts, then progress to full applications. Practice on LeetCode or HackerRank for algorithms. Contribute to open source. Read other peoples code on GitHub. Code daily, even if just for 30 minutes.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'Backend Developer',
    description: 'Server-side development',
    href: '/roadmap/backend-developer',
    icon: Server,
    color: 'bg-green-500'
  },
  {
    title: 'Data Analyst',
    description: 'Data analysis and visualization',
    href: '/roadmap/data-analyst',
    icon: Database,
    color: 'bg-blue-500'
  },
  {
    title: 'DevOps Engineer',
    description: 'Infrastructure and automation',
    href: '/roadmap/devops',
    icon: Layers,
    color: 'bg-orange-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Python Developer Roadmap 2026',
  description: 'Complete guide to becoming a Python developer in 2026',
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

export default function PythonDeveloperRoadmapPage() {
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
          title="Python Developer Roadmap"
          description="Master Python programming from basics to advanced concepts, web frameworks, testing, and specializations. Your complete guide to becoming a professional Python developer in 2026."
          duration="4-8 Months"
          difficulty="Beginner Friendly"
          accentColor="#3776AB"
        />

        <WhatIsSection
          title="What is a Python Developer?"
          paragraphs={[
            'Python Developers use one of the worlds most versatile programming languages to build applications, automate tasks, analyze data, and create AI/ML solutions. Python is known for its readable syntax and extensive ecosystem.',
            'As a Python Developer, you may work on web applications with Django or FastAPI, build data pipelines, create automation scripts, develop machine learning models, or write backend services for complex systems.'
          ]}
          responsibilities={[
            'Build web applications and REST APIs',
            'Write automation and scripting solutions',
            'Develop data processing pipelines',
            'Create and maintain Python packages',
            'Write unit and integration tests',
            'Work with databases (SQL and NoSQL)',
            'Collaborate with data scientists and ML engineers',
            'Optimize application performance'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#3776AB"
        />

        <SalarySection
          title="Python Developer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Python developers with ML/AI skills command premium salaries. Backend specialists with Django or FastAPI are in high demand. Data engineering and automation roles often pay more than general Python positions. Remote opportunities are abundant."
          gradient="bg-gradient-to-r from-yellow-500 to-blue-500"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your Python Journey?"
          description="Get personalized guidance from experienced Python developers who have built production applications."
          gradient="bg-gradient-to-r from-yellow-500 via-blue-500 to-yellow-500"
        />
      </main>

      <Footer />
    </>
  );
}
