'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  GraduationCap,
  Code,
  Binary,
  Database,
  Globe,
  Cpu,
  Layers,
  Shield,
  Calculator,
  Terminal,
  Settings,
  Network
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
    title: 'Programming Fundamentals',
    icon: Code,
    color: 'bg-blue-500',
    steps: [
      {
        id: 1,
        title: 'Learn a Language',
        description: 'Start with programming basics',
        topics: ['Python or C', 'Variables', 'Control Flow', 'Functions', 'Basic I/O']
      },
      {
        id: 2,
        title: 'Problem Solving',
        description: 'Think algorithmically',
        topics: ['Problem Decomposition', 'Pseudocode', 'Flowcharts', 'Debugging', 'Testing']
      }
    ],
    milestone: 'You can program!'
  },
  {
    title: 'Mathematics',
    icon: Calculator,
    color: 'bg-purple-500',
    steps: [
      {
        id: 3,
        title: 'Discrete Mathematics',
        description: 'Foundation of CS math',
        topics: ['Logic', 'Sets', 'Relations', 'Functions', 'Proof Techniques', 'Combinatorics']
      },
      {
        id: 4,
        title: 'Linear Algebra',
        description: 'Essential for CS applications',
        topics: ['Vectors', 'Matrices', 'Linear Transformations', 'Eigenvalues', 'Applications']
      },
      {
        id: 5,
        title: 'Probability & Statistics',
        description: 'Data and uncertainty',
        topics: ['Probability Theory', 'Random Variables', 'Distributions', 'Statistical Inference']
      }
    ]
  },
  {
    title: 'Data Structures',
    icon: Binary,
    color: 'bg-green-500',
    steps: [
      {
        id: 6,
        title: 'Basic Data Structures',
        description: 'Fundamental structures',
        topics: ['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Hash Tables']
      },
      {
        id: 7,
        title: 'Trees & Graphs',
        description: 'Hierarchical and network data',
        topics: ['Binary Trees', 'BST', 'Heaps', 'Graphs', 'Traversals']
      },
      {
        id: 8,
        title: 'Advanced Structures',
        description: 'Complex data organization',
        topics: ['AVL Trees', 'Red-Black Trees', 'Tries', 'B-Trees', 'Disjoint Sets']
      }
    ],
    milestone: 'You know data structures!'
  },
  {
    title: 'Algorithms',
    icon: Settings,
    color: 'bg-orange-500',
    steps: [
      {
        id: 9,
        title: 'Algorithm Analysis',
        description: 'Analyze efficiency',
        topics: ['Big O Notation', 'Time Complexity', 'Space Complexity', 'Best/Worst/Average Case']
      },
      {
        id: 10,
        title: 'Sorting & Searching',
        description: 'Classic algorithms',
        topics: ['Merge Sort', 'Quick Sort', 'Binary Search', 'Heap Sort', 'Radix Sort']
      },
      {
        id: 11,
        title: 'Graph Algorithms',
        description: 'Network algorithms',
        topics: ['BFS', 'DFS', 'Dijkstra', 'Bellman-Ford', 'MST', 'Topological Sort']
      },
      {
        id: 12,
        title: 'Algorithm Paradigms',
        description: 'Problem-solving strategies',
        topics: ['Divide & Conquer', 'Dynamic Programming', 'Greedy', 'Backtracking']
      }
    ]
  },
  {
    title: 'Computer Architecture',
    icon: Cpu,
    color: 'bg-red-500',
    steps: [
      {
        id: 13,
        title: 'Digital Logic',
        description: 'Hardware fundamentals',
        topics: ['Boolean Algebra', 'Logic Gates', 'Combinational Circuits', 'Sequential Circuits']
      },
      {
        id: 14,
        title: 'Computer Organization',
        description: 'How computers work',
        topics: ['CPU Architecture', 'Memory Hierarchy', 'Cache', 'Pipelining', 'Assembly Language']
      }
    ],
    milestone: 'You understand computer architecture!'
  },
  {
    title: 'Operating Systems',
    icon: Terminal,
    color: 'bg-gray-700',
    steps: [
      {
        id: 15,
        title: 'OS Concepts',
        description: 'Operating system fundamentals',
        topics: ['Processes', 'Threads', 'Scheduling', 'Memory Management', 'Virtual Memory']
      },
      {
        id: 16,
        title: 'Advanced OS',
        description: 'Complex OS topics',
        topics: ['Synchronization', 'Deadlocks', 'File Systems', 'I/O Management', 'Security']
      }
    ]
  },
  {
    title: 'Database Systems',
    icon: Database,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 17,
        title: 'Database Fundamentals',
        description: 'Data management',
        topics: ['Relational Model', 'SQL', 'Normalization', 'ER Diagrams', 'Transactions']
      },
      {
        id: 18,
        title: 'Advanced Databases',
        description: 'Database internals',
        topics: ['Query Optimization', 'Indexing', 'Concurrency Control', 'Recovery', 'NoSQL']
      }
    ]
  },
  {
    title: 'Computer Networks',
    icon: Network,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 19,
        title: 'Networking Basics',
        description: 'How networks work',
        topics: ['OSI Model', 'TCP/IP', 'HTTP', 'DNS', 'Routing']
      },
      {
        id: 20,
        title: 'Network Programming',
        description: 'Building networked apps',
        topics: ['Sockets', 'Client-Server', 'Protocols', 'Security', 'Web Services']
      }
    ]
  },
  {
    title: 'Theory of Computation',
    icon: Layers,
    color: 'bg-pink-500',
    steps: [
      {
        id: 21,
        title: 'Automata Theory',
        description: 'Theoretical foundations',
        topics: ['Finite Automata', 'Regular Languages', 'Context-Free Grammars', 'Turing Machines']
      },
      {
        id: 22,
        title: 'Computability & Complexity',
        description: 'Limits of computation',
        topics: ['Decidability', 'P vs NP', 'NP-Completeness', 'Complexity Classes']
      }
    ]
  },
  {
    title: 'Software Engineering',
    icon: Globe,
    color: 'bg-emerald-500',
    steps: [
      {
        id: 23,
        title: 'SE Principles',
        description: 'Building real software',
        topics: ['SDLC', 'Design Patterns', 'Testing', 'Version Control', 'Code Review']
      },
      {
        id: 24,
        title: 'Professional Skills',
        description: 'Industry readiness',
        topics: ['Agile/Scrum', 'Documentation', 'Team Collaboration', 'Ethics']
      }
    ],
    milestone: 'You have CS fundamentals!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'New Grad (0-1 yr)', range: '$70K - $120K', avg: '$95K' },
  { level: 'SDE I (1-3 yrs)', range: '$100K - $150K', avg: '$125K' },
  { level: 'SDE II (3-6 yrs)', range: '$150K - $220K', avg: '$180K' },
  { level: 'Senior+ (6+ yrs)', range: '$200K - $400K+', avg: '$280K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹4L - ₹15L', avg: '₹8L' },
  { level: 'Junior (1-3 yrs)', range: '₹8L - ₹20L', avg: '₹14L' },
  { level: 'Mid (3-6 yrs)', range: '₹18L - ₹40L', avg: '₹28L' },
  { level: 'Senior (6+ yrs)', range: '₹35L - ₹80L+', avg: '₹50L' }
];

// Project Ideas
const projects = [
  {
    title: 'Shell Implementation',
    level: 'Beginner' as const,
    description: 'Simple command-line shell',
    skills: ['Processes', 'System Calls', 'Parsing', 'I/O']
  },
  {
    title: 'HTTP Server',
    level: 'Beginner' as const,
    description: 'Basic web server',
    skills: ['Sockets', 'HTTP Protocol', 'Concurrency', 'File I/O']
  },
  {
    title: 'Database from Scratch',
    level: 'Intermediate' as const,
    description: 'Simple relational database',
    skills: ['B-Trees', 'SQL Parsing', 'Storage', 'Indexing']
  },
  {
    title: 'Operating System Kernel',
    level: 'Intermediate' as const,
    description: 'Minimal OS kernel',
    skills: ['Boot Process', 'Memory', 'Scheduling', 'Assembly']
  },
  {
    title: 'Compiler',
    level: 'Advanced' as const,
    description: 'Simple language compiler',
    skills: ['Lexing', 'Parsing', 'AST', 'Code Generation']
  },
  {
    title: 'Distributed System',
    level: 'Advanced' as const,
    description: 'Consensus protocol implementation',
    skills: ['Networking', 'Consensus', 'Replication', 'Fault Tolerance']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to learn computer science?',
    answer: 'A traditional CS degree takes 4 years. Self-taught fundamentals (programming, DSA, systems basics) can take 1-2 years of dedicated study. Depth comparable to a degree requires 2-3 years. However, you can start working as a developer while continuing to deepen CS knowledge.'
  },
  {
    question: 'Do I need a CS degree to be a software developer?',
    answer: 'No, many successful developers are self-taught or bootcamp graduates. However, CS fundamentals (DSA, systems, math) help with complex problems, system design interviews, and advanced roles. You can learn CS concepts without a formal degree through books, courses, and projects.'
  },
  {
    question: 'Which programming language should I start with?',
    answer: 'Python is beginner-friendly with clear syntax. C teaches low-level concepts and memory management. Java is good for OOP and enterprise. For CS fundamentals, Python for algorithms and C for systems is a common path. Language matters less than concepts.'
  },
  {
    question: 'How important is mathematics for computer science?',
    answer: 'Essential for certain areas: ML/AI needs linear algebra and statistics, graphics needs geometry, cryptography needs number theory. For web development, basic discrete math is sufficient. Strong math foundations open doors to advanced CS fields.'
  },
  {
    question: 'What CS courses are most important?',
    answer: 'Core: Data Structures, Algorithms, Operating Systems, Databases. Important: Computer Architecture, Networks, Discrete Math. Advanced: Distributed Systems, Compilers, Machine Learning. Focus on core courses first - they\'re essential for technical interviews.'
  },
  {
    question: 'CS degree vs bootcamp vs self-taught?',
    answer: 'Degree: Deep fundamentals, best for research/advanced roles, 4 years. Bootcamp: Practical skills, faster to jobs, 3-6 months. Self-taught: Flexible, requires discipline, variable time. Many successful paths exist - choose based on goals and circumstances.'
  },
  {
    question: 'How do I practice CS concepts effectively?',
    answer: 'Implement data structures from scratch, solve LeetCode problems, build systems projects (OS, database, compiler), read classic CS books. Understanding trumps memorization - be able to derive and explain, not just recall. Teach others to solidify knowledge.'
  },
  {
    question: 'Are CS fundamentals needed for FAANG interviews?',
    answer: 'Yes, FAANG interviews heavily test DSA, system design, and CS fundamentals. Strong algorithmic thinking is required. System design requires understanding databases, networking, and distributed systems. CS fundamentals are the foundation for passing technical interviews.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'DSA',
    description: 'Deep dive into DSA',
    href: '/roadmap/dsa',
    icon: Binary,
    color: 'bg-emerald-500'
  },
  {
    title: 'System Design',
    description: 'Design scalable systems',
    href: '/roadmap/system-design',
    icon: Network,
    color: 'bg-purple-500'
  },
  {
    title: 'Backend Developer',
    description: 'Apply CS to backend',
    href: '/roadmap/backend-developer',
    icon: Terminal,
    color: 'bg-green-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Computer Science Roadmap 2026',
  description: 'Complete guide to learning Computer Science in 2026',
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

export default function ComputerScienceRoadmapPage() {
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
          title="Computer Science Roadmap"
          description="Master programming, data structures, algorithms, operating systems, databases, and networks. Your complete guide to building strong CS fundamentals in 2026."
          duration="12-24 Months"
          difficulty="Comprehensive"
          accentColor="#4F46E5"
        />

        <WhatIsSection
          title="What is Computer Science?"
          paragraphs={[
            'Computer Science is the study of computation, algorithms, and information. It provides the theoretical foundation for building software systems, from understanding how computers work to designing efficient algorithms that solve complex problems.',
            'Learning computer science equips you with fundamental knowledge that applies across all programming domains - whether you\'re building web applications, AI systems, games, or operating systems.'
          ]}
          responsibilities={[
            'Understand how computers work at all levels',
            'Design efficient algorithms and data structures',
            'Build and understand operating systems',
            'Work with databases and information systems',
            'Understand computer networks and protocols',
            'Apply theoretical concepts to practical problems',
            'Think computationally about complex problems'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#4F46E5"
        />

        <SalarySection
          title="Software Engineer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Strong CS fundamentals are essential for FAANG and top tech company interviews. System design and algorithmic skills command premium salaries. CS knowledge enables transitions into specialized high-paying fields like ML, distributed systems, and security."
          gradient="bg-gradient-to-r from-indigo-500 to-purple-600"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Build Strong CS Fundamentals?"
          description="Get personalized guidance from experienced software engineers who can help you master computer science concepts."
          gradient="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        />
      </main>

      <Footer />
    </>
  );
}
