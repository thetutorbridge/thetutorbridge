'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Cog,
  Code,
  Shield,
  Zap,
  Box,
  Globe,
  Cpu,
  Layers,
  TestTube,
  Rocket,
  Database,
  Terminal
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
    title: 'Rust Fundamentals',
    icon: Code,
    color: 'bg-orange-500',
    steps: [
      {
        id: 1,
        title: 'Basic Syntax',
        description: 'Core Rust syntax',
        topics: ['Variables', 'Data Types', 'Functions', 'Control Flow', 'Comments', 'Cargo']
      },
      {
        id: 2,
        title: 'Compound Types',
        description: 'Complex data types',
        topics: ['Tuples', 'Arrays', 'Slices', 'Strings', 'Vectors', 'HashMaps']
      }
    ],
    milestone: 'You know Rust basics!'
  },
  {
    title: 'Ownership & Memory',
    icon: Shield,
    color: 'bg-red-500',
    steps: [
      {
        id: 3,
        title: 'Ownership',
        description: 'Rust\'s core concept',
        topics: ['Ownership Rules', 'Move Semantics', 'Copy Trait', 'Clone', 'Drop']
      },
      {
        id: 4,
        title: 'Borrowing & References',
        description: 'Borrow checker',
        topics: ['References', 'Mutable Borrowing', 'Borrow Rules', 'Dangling References', 'Slices']
      },
      {
        id: 5,
        title: 'Lifetimes',
        description: 'Reference validity',
        topics: ['Lifetime Annotations', 'Lifetime Elision', 'Static Lifetime', 'Generic Lifetimes']
      }
    ],
    milestone: 'You understand ownership!'
  },
  {
    title: 'Structs & Enums',
    icon: Layers,
    color: 'bg-blue-500',
    steps: [
      {
        id: 6,
        title: 'Structs',
        description: 'Custom data types',
        topics: ['Struct Definition', 'Methods', 'Associated Functions', 'Tuple Structs', 'Unit Structs']
      },
      {
        id: 7,
        title: 'Enums & Pattern Matching',
        description: 'Algebraic data types',
        topics: ['Enum Definition', 'Option', 'Result', 'match', 'if let', 'Destructuring']
      }
    ]
  },
  {
    title: 'Traits & Generics',
    icon: Box,
    color: 'bg-purple-500',
    steps: [
      {
        id: 8,
        title: 'Traits',
        description: 'Shared behavior',
        topics: ['Trait Definition', 'Implementing Traits', 'Default Implementations', 'Trait Bounds', 'Derive']
      },
      {
        id: 9,
        title: 'Generics',
        description: 'Type parameters',
        topics: ['Generic Functions', 'Generic Structs', 'Generic Enums', 'Monomorphization', 'Associated Types']
      }
    ]
  },
  {
    title: 'Error Handling',
    icon: Shield,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 10,
        title: 'Error Handling',
        description: 'Handle failures gracefully',
        topics: ['Result Type', 'Option Type', '? Operator', 'panic!', 'Custom Errors', 'Error Propagation']
      }
    ],
    milestone: 'You can handle errors!'
  },
  {
    title: 'Advanced Concepts',
    icon: Zap,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 11,
        title: 'Smart Pointers',
        description: 'Heap allocation',
        topics: ['Box', 'Rc', 'Arc', 'RefCell', 'Mutex', 'RwLock']
      },
      {
        id: 12,
        title: 'Closures & Iterators',
        description: 'Functional programming',
        topics: ['Closures', 'Fn Traits', 'Iterators', 'Iterator Adapters', 'Lazy Evaluation']
      }
    ]
  },
  {
    title: 'Concurrency',
    icon: Cpu,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 13,
        title: 'Threads',
        description: 'Parallel execution',
        topics: ['Spawning Threads', 'Thread Communication', 'Channels', 'Shared State', 'Send & Sync']
      },
      {
        id: 14,
        title: 'Async Programming',
        description: 'Asynchronous Rust',
        topics: ['async/await', 'Futures', 'Tokio', 'async-std', 'Streams', 'Pinning']
      }
    ],
    milestone: 'You can write concurrent code!'
  },
  {
    title: 'Ecosystem & Tools',
    icon: Terminal,
    color: 'bg-green-500',
    steps: [
      {
        id: 15,
        title: 'Cargo & Crates',
        description: 'Package management',
        topics: ['Cargo.toml', 'Dependencies', 'Workspaces', 'Features', 'Publishing Crates']
      },
      {
        id: 16,
        title: 'Testing',
        description: 'Test your code',
        topics: ['Unit Tests', 'Integration Tests', 'Doc Tests', 'Benchmarks', 'Property Testing']
      }
    ]
  },
  {
    title: 'Web Development',
    icon: Globe,
    color: 'bg-pink-500',
    steps: [
      {
        id: 17,
        title: 'Web Frameworks',
        description: 'Build web services',
        topics: ['Actix Web', 'Axum', 'Rocket', 'Warp', 'REST APIs']
      },
      {
        id: 18,
        title: 'WebAssembly',
        description: 'Rust in the browser',
        topics: ['wasm-pack', 'wasm-bindgen', 'Web APIs', 'WASM Performance', 'Yew/Leptos']
      }
    ]
  },
  {
    title: 'Systems Programming',
    icon: Cog,
    color: 'bg-gray-600',
    steps: [
      {
        id: 19,
        title: 'Low-Level Programming',
        description: 'Systems-level code',
        topics: ['Unsafe Rust', 'Raw Pointers', 'FFI', 'C Interop', 'Inline Assembly']
      },
      {
        id: 20,
        title: 'CLI & Tools',
        description: 'Build CLI applications',
        topics: ['clap', 'CLI Design', 'Config Files', 'Cross-compilation', 'Distribution']
      },
      {
        id: 21,
        title: 'Embedded & Performance',
        description: 'Specialized domains',
        topics: ['no_std', 'Embedded Rust', 'Performance Optimization', 'Profiling', 'Memory Layout']
      }
    ],
    milestone: 'You are a Rust Developer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$90K - $120K', avg: '$105K' },
  { level: 'Mid (2-5 yrs)', range: '$120K - $165K', avg: '$142K' },
  { level: 'Senior (5-8 yrs)', range: '$160K - $210K', avg: '$185K' },
  { level: 'Staff (8+ yrs)', range: '$200K - $280K+', avg: '$240K' }
];

const indiaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '₹8L - ₹15L', avg: '₹12L' },
  { level: 'Mid (2-5 yrs)', range: '₹15L - ₹28L', avg: '₹22L' },
  { level: 'Senior (5-8 yrs)', range: '₹28L - ₹50L', avg: '₹38L' },
  { level: 'Staff (8+ yrs)', range: '₹45L - ₹80L+', avg: '₹60L' }
];

// Project Ideas
const projects = [
  {
    title: 'CLI Tool',
    level: 'Beginner' as const,
    description: 'Build a command-line utility',
    skills: ['Clap', 'File I/O', 'Error Handling', 'Args Parsing']
  },
  {
    title: 'Guessing Game',
    level: 'Beginner' as const,
    description: 'Classic Rust tutorial project',
    skills: ['Input', 'Random', 'Control Flow', 'Error Handling']
  },
  {
    title: 'REST API',
    level: 'Intermediate' as const,
    description: 'Build web API with Actix/Axum',
    skills: ['Web Framework', 'Database', 'Async', 'JSON']
  },
  {
    title: 'Concurrent Downloader',
    level: 'Intermediate' as const,
    description: 'Parallel file downloader',
    skills: ['Async', 'Concurrency', 'Progress', 'Error Recovery']
  },
  {
    title: 'WebAssembly App',
    level: 'Advanced' as const,
    description: 'Browser application in Rust',
    skills: ['WASM', 'wasm-bindgen', 'Web APIs', 'Performance']
  },
  {
    title: 'Database Engine',
    level: 'Advanced' as const,
    description: 'Simple key-value store',
    skills: ['File I/O', 'Data Structures', 'Concurrency', 'Persistence']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to learn Rust?',
    answer: 'Rust has a steep learning curve due to ownership and borrowing concepts. Basic syntax takes 2-4 weeks. Understanding ownership takes 2-3 months of practice. Becoming productive takes 4-6 months. Mastery of advanced concepts takes 1-2 years. The learning investment pays off in reliability.'
  },
  {
    question: 'Is Rust worth learning in 2026?',
    answer: 'Absolutely. Rust is growing rapidly in adoption. It\'s being adopted by Microsoft, Google, Amazon, Meta, and Linux kernel. Demand exceeds supply significantly, leading to premium salaries. Rust excels in performance-critical and safety-critical applications.'
  },
  {
    question: 'Rust vs Go - which should I learn?',
    answer: 'Go is easier to learn and excels at networked services and DevOps tools. Rust offers better performance and memory safety guarantees, ideal for systems programming. Go has more jobs currently; Rust jobs pay more. Choose based on your target domain.'
  },
  {
    question: 'Why is Rust so difficult to learn?',
    answer: 'The ownership system is unique and requires new mental models. The borrow checker catches errors at compile time that other languages catch at runtime. This strictness front-loads the learning but produces more reliable code. It gets easier with practice.'
  },
  {
    question: 'What is Rust used for?',
    answer: 'Systems programming (OS, drivers), WebAssembly applications, CLI tools, web services, game engines, embedded systems, blockchain, and performance-critical components. Many companies use Rust to replace C/C++ for safety benefits while maintaining performance.'
  },
  {
    question: 'Can I use Rust for web development?',
    answer: 'Yes, Rust has excellent web frameworks (Actix, Axum, Rocket). For frontend, Rust compiles to WebAssembly for browser apps. Frameworks like Yew and Leptos enable full-stack Rust. However, Node.js/Go may be simpler for typical web services.'
  },
  {
    question: 'Do I need to know C/C++ before Rust?',
    answer: 'No, though systems programming concepts help. Coming from high-level languages (Python, JavaScript), you\'ll learn memory concepts along the way. Rust\'s tooling is more beginner-friendly than C++. Many successful Rust developers never learned C.'
  },
  {
    question: 'How do I get a Rust job?',
    answer: 'Build projects demonstrating ownership understanding. Contribute to open-source Rust projects. Many jobs are in crypto/blockchain, cloud infrastructure, and systems tools. Remote positions are common. Network in the Rust community. The job market is smaller but well-paying.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'Golang',
    description: 'Alternative systems language',
    href: '/roadmap/golang',
    icon: Code,
    color: 'bg-cyan-500'
  },
  {
    title: 'C++',
    description: 'Traditional systems language',
    href: '/roadmap/cpp',
    icon: Cpu,
    color: 'bg-blue-500'
  },
  {
    title: 'Backend Developer',
    description: 'Backend fundamentals',
    href: '/roadmap/backend-developer',
    icon: Database,
    color: 'bg-green-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Rust Developer Roadmap 2026',
  description: 'Complete guide to becoming a Rust Developer in 2026',
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

export default function RustRoadmapPage() {
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
          title="Rust Developer Roadmap"
          description="Master ownership, borrowing, lifetimes, async programming, WebAssembly, and systems programming. Your complete guide to becoming a professional Rust Developer in 2026."
          duration="6-12 Months"
          difficulty="Advanced"
          accentColor="#DEA584"
        />

        <WhatIsSection
          title="What is a Rust Developer?"
          paragraphs={[
            'Rust developers build high-performance, reliable software using Rust, a systems programming language that guarantees memory safety without garbage collection. They create applications where performance and reliability are critical.',
            'As a Rust developer, you will write memory-safe code, build high-performance systems, develop CLI tools and web services, work with WebAssembly, and contribute to infrastructure that powers modern applications.'
          ]}
          responsibilities={[
            'Write safe, concurrent, and fast code',
            'Build systems and infrastructure software',
            'Develop CLI tools and web services',
            'Create WebAssembly applications',
            'Optimize performance-critical code',
            'Maintain memory safety without GC',
            'Integrate with C/C++ codebases'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#DEA584"
        />

        <SalarySection
          title="Rust Developer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Rust developers command premium salaries due to high demand and limited supply. Blockchain/crypto companies pay exceptionally well for Rust skills. Infrastructure companies (Cloudflare, Fastly) also pay top of market. Remote positions are very common in the Rust ecosystem."
          gradient="bg-gradient-to-r from-orange-500 to-red-500"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your Rust Journey?"
          description="Get personalized guidance from experienced Rust developers who have built production systems."
          gradient="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"
        />
      </main>

      <Footer />
    </>
  );
}
