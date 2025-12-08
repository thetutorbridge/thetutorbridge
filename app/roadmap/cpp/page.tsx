'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Code,
  Box,
  Cpu,
  Layers,
  Zap,
  Shield,
  Settings,
  Terminal,
  Gamepad2,
  TestTube,
  GitBranch,
  Server
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
    title: 'C++ Fundamentals',
    icon: Code,
    color: 'bg-blue-600',
    steps: [
      {
        id: 1,
        title: 'Basic Syntax',
        description: 'Learn C++ basics',
        topics: ['Variables', 'Data Types', 'Operators', 'Control Flow', 'Functions', 'Arrays']
      },
      {
        id: 2,
        title: 'Pointers & References',
        description: 'Memory concepts',
        topics: ['Pointers', 'References', 'Pointer Arithmetic', 'nullptr', 'const Correctness']
      },
      {
        id: 3,
        title: 'Memory Management',
        description: 'Dynamic memory',
        topics: ['new/delete', 'Stack vs Heap', 'Memory Leaks', 'RAII', 'Smart Pointers Intro']
      }
    ],
    milestone: 'You know C++ basics!'
  },
  {
    title: 'Object-Oriented C++',
    icon: Box,
    color: 'bg-purple-500',
    steps: [
      {
        id: 4,
        title: 'Classes & Objects',
        description: 'OOP fundamentals',
        topics: ['Classes', 'Constructors', 'Destructors', 'Access Specifiers', 'this Pointer']
      },
      {
        id: 5,
        title: 'Inheritance & Polymorphism',
        description: 'OOP pillars',
        topics: ['Inheritance', 'Virtual Functions', 'Abstract Classes', 'Multiple Inheritance', 'VTABLE']
      },
      {
        id: 6,
        title: 'Operator Overloading',
        description: 'Custom operators',
        topics: ['Operator Overloading', 'Friend Functions', 'Copy Constructor', 'Assignment Operator']
      }
    ],
    milestone: 'You understand C++ OOP!'
  },
  {
    title: 'Standard Template Library',
    icon: Layers,
    color: 'bg-green-500',
    steps: [
      {
        id: 7,
        title: 'STL Containers',
        description: 'Data structures',
        topics: ['vector', 'list', 'deque', 'set', 'map', 'unordered_map']
      },
      {
        id: 8,
        title: 'STL Algorithms',
        description: 'Built-in algorithms',
        topics: ['sort', 'find', 'transform', 'accumulate', 'Algorithm Complexity']
      },
      {
        id: 9,
        title: 'Iterators',
        description: 'Container traversal',
        topics: ['Iterator Types', 'Iterator Categories', 'Range-based for', 'Iterator Adapters']
      }
    ]
  },
  {
    title: 'Templates & Generics',
    icon: Settings,
    color: 'bg-orange-500',
    steps: [
      {
        id: 10,
        title: 'Function Templates',
        description: 'Generic functions',
        topics: ['Function Templates', 'Template Arguments', 'Template Specialization', 'Overloading']
      },
      {
        id: 11,
        title: 'Class Templates',
        description: 'Generic classes',
        topics: ['Class Templates', 'Template Parameters', 'Partial Specialization', 'Type Traits']
      },
      {
        id: 12,
        title: 'Variadic Templates',
        description: 'Advanced templates',
        topics: ['Variadic Templates', 'Parameter Packs', 'Fold Expressions', 'SFINAE']
      }
    ],
    milestone: 'You can write generic C++ code!'
  },
  {
    title: 'Modern C++',
    icon: Zap,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 13,
        title: 'C++11/14 Features',
        description: 'Modern foundations',
        topics: ['auto', 'Lambda Expressions', 'Move Semantics', 'nullptr', 'Range-based for']
      },
      {
        id: 14,
        title: 'C++17/20 Features',
        description: 'Latest standards',
        topics: ['std::optional', 'std::variant', 'Structured Bindings', 'Concepts', 'Ranges']
      },
      {
        id: 15,
        title: 'Smart Pointers',
        description: 'Memory safety',
        topics: ['unique_ptr', 'shared_ptr', 'weak_ptr', 'Custom Deleters', 'make_unique/shared']
      }
    ]
  },
  {
    title: 'Concurrency',
    icon: Cpu,
    color: 'bg-red-500',
    steps: [
      {
        id: 16,
        title: 'Multithreading',
        description: 'Thread programming',
        topics: ['std::thread', 'Joining', 'Detaching', 'Thread Safety', 'Race Conditions']
      },
      {
        id: 17,
        title: 'Synchronization',
        description: 'Thread coordination',
        topics: ['Mutex', 'Lock Guard', 'Condition Variables', 'Atomic Operations', 'Memory Order']
      },
      {
        id: 18,
        title: 'Async Programming',
        description: 'Async patterns',
        topics: ['std::async', 'std::future', 'std::promise', 'Thread Pools', 'Parallel Algorithms']
      }
    ]
  },
  {
    title: 'Build Systems',
    icon: Terminal,
    color: 'bg-gray-700',
    steps: [
      {
        id: 19,
        title: 'CMake',
        description: 'Modern build system',
        topics: ['CMakeLists.txt', 'Targets', 'Dependencies', 'Generators', 'Modules']
      },
      {
        id: 20,
        title: 'Package Management',
        description: 'Dependency management',
        topics: ['vcpkg', 'Conan', 'FetchContent', 'Library Linking']
      }
    ]
  },
  {
    title: 'Testing & Debugging',
    icon: TestTube,
    color: 'bg-teal-500',
    steps: [
      {
        id: 21,
        title: 'Testing',
        description: 'Test your code',
        topics: ['Google Test', 'Catch2', 'Unit Testing', 'Mocking', 'TDD']
      },
      {
        id: 22,
        title: 'Debugging',
        description: 'Find and fix bugs',
        topics: ['GDB', 'Valgrind', 'Sanitizers', 'Profiling', 'Memory Debugging']
      }
    ]
  },
  {
    title: 'Application Domains',
    icon: Gamepad2,
    color: 'bg-pink-500',
    steps: [
      {
        id: 23,
        title: 'Systems Programming',
        description: 'Low-level development',
        topics: ['OS Concepts', 'File I/O', 'Networking', 'IPC', 'Embedded Systems']
      },
      {
        id: 24,
        title: 'Performance',
        description: 'Optimize for speed',
        topics: ['Profiling', 'Cache Optimization', 'SIMD', 'Memory Layout', 'Benchmarking']
      }
    ],
    milestone: 'You are a professional C++ Developer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$75K - $100K', avg: '$87K' },
  { level: 'Mid (2-5 yrs)', range: '$100K - $145K', avg: '$120K' },
  { level: 'Senior (5-8 yrs)', range: '$145K - $190K', avg: '$165K' },
  { level: 'Lead (8+ yrs)', range: '$190K - $280K+', avg: '$225K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹4L - ₹8L', avg: '₹6L' },
  { level: 'Junior (1-3 yrs)', range: '₹8L - ₹15L', avg: '₹11L' },
  { level: 'Mid (3-5 yrs)', range: '₹15L - ₹28L', avg: '₹20L' },
  { level: 'Senior (5+ yrs)', range: '₹28L - ₹55L+', avg: '₹38L' }
];

// Project Ideas
const projects = [
  {
    title: 'Memory Allocator',
    level: 'Beginner' as const,
    description: 'Custom memory allocation',
    skills: ['Pointers', 'Memory', 'Data Structures']
  },
  {
    title: 'JSON Parser',
    level: 'Beginner' as const,
    description: 'Parse JSON files',
    skills: ['Strings', 'Recursion', 'File I/O']
  },
  {
    title: 'Multithreaded Server',
    level: 'Intermediate' as const,
    description: 'TCP/HTTP server',
    skills: ['Networking', 'Threads', 'Sockets']
  },
  {
    title: 'Game Engine',
    level: 'Intermediate' as const,
    description: 'Simple 2D game engine',
    skills: ['OOP', 'Graphics', 'Game Loop', 'ECS']
  },
  {
    title: 'Database Engine',
    level: 'Advanced' as const,
    description: 'Simple key-value store',
    skills: ['File I/O', 'B-Trees', 'Caching', 'Concurrency']
  },
  {
    title: 'Compiler/Interpreter',
    level: 'Advanced' as const,
    description: 'Language implementation',
    skills: ['Parsing', 'AST', 'Code Generation', 'Optimization']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to learn C++?',
    answer: 'C++ basics take 2-3 months. Understanding OOP, STL, and memory management takes 4-6 months. Mastering modern C++, templates, and concurrency takes 1-2 years. C++ has more depth than most languages - expect continuous learning throughout your career.'
  },
  {
    question: 'Is C++ still relevant in 2026?',
    answer: 'Absolutely. C++ powers game engines (Unreal), browsers (Chrome), operating systems, embedded systems, high-frequency trading, and more. When performance matters, C++ is often the choice. Rust is growing but hasn\'t replaced C++ in most domains.'
  },
  {
    question: 'C++ vs Rust - which should I learn?',
    answer: 'Learn C++ if targeting game development, existing codebases, or broader job opportunities. Learn Rust for new systems programming with better safety guarantees. C++ has more jobs and resources; Rust is growing in certain domains. Both are valuable skills.'
  },
  {
    question: 'Which C++ version should I learn?',
    answer: 'Start with C++17 - it\'s widely supported and has modern features. Learn C++11/14 concepts as they\'re foundational. Add C++20 features (concepts, ranges) as you advance. Avoid pre-C++11 patterns in new code but understand them for legacy work.'
  },
  {
    question: 'Do I need to learn C before C++?',
    answer: 'No, you can learn C++ directly. While C++ evolved from C, modern C++ is a different language. Learning C first might teach bad habits for C++. However, understanding C helps when working with C libraries or embedded systems.'
  },
  {
    question: 'Is C++ good for game development?',
    answer: 'C++ is the industry standard for game development. Unreal Engine uses C++, and most AAA games are written in C++ for performance. Knowledge of C++ is essential for professional game programming. Unity uses C# but its engine is C++.'
  },
  {
    question: 'How important is memory management?',
    answer: 'Critical for C++. Understanding stack vs heap, RAII, and smart pointers is essential. Modern C++ (smart pointers, containers) reduces manual memory management but you must understand what\'s happening. Memory bugs are common interview topics.'
  },
  {
    question: 'How do I get a C++ developer job?',
    answer: 'Build projects showing memory management, STL usage, and modern C++. Know data structures and algorithms well - C++ interviews are technical. Contribute to open-source C++ projects. Target specific domains: games, finance, embedded, or systems.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'Game Developer',
    description: 'C++ for game dev',
    href: '/roadmap/game-developer',
    icon: Gamepad2,
    color: 'bg-purple-500'
  },
  {
    title: 'System Design',
    description: 'Architecture skills',
    href: '/roadmap/system-design',
    icon: Server,
    color: 'bg-indigo-500'
  },
  {
    title: 'DSA',
    description: 'Data structures in C++',
    href: '/roadmap/dsa',
    icon: GitBranch,
    color: 'bg-emerald-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'C++ Developer Roadmap 2026',
  description: 'Complete guide to becoming a C++ Developer in 2026',
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

export default function CppRoadmapPage() {
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
          title="C++ Developer Roadmap"
          description="Master C++ fundamentals, OOP, STL, modern C++, memory management, and concurrency. Your complete guide to becoming a professional C++ Developer in 2026."
          duration="6-12 Months"
          difficulty="Intermediate"
          accentColor="#00599C"
        />

        <WhatIsSection
          title="What is a C++ Developer?"
          paragraphs={[
            'C++ developers build high-performance software systems where efficiency and control over hardware resources are critical. They work on game engines, operating systems, embedded systems, financial trading platforms, and other performance-intensive applications.',
            'As a C++ developer, you will write efficient code, manage memory, implement data structures, build systems-level software, and optimize performance for demanding applications.'
          ]}
          responsibilities={[
            'Write efficient, high-performance code',
            'Manage memory and system resources',
            'Implement complex data structures',
            'Build systems and applications software',
            'Optimize code for performance',
            'Work with hardware interfaces',
            'Debug and profile applications'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#00599C"
        />

        <SalarySection
          title="C++ Developer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="C++ developers in high-frequency trading and game development often earn premium salaries. Systems programming and embedded development also pay well. Companies like Google, Microsoft, and game studios actively hire C++ developers."
          gradient="bg-gradient-to-r from-blue-600 to-indigo-600"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your C++ Journey?"
          description="Get personalized guidance from experienced C++ developers who have built performance-critical systems."
          gradient="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
        />
      </main>

      <Footer />
    </>
  );
}
