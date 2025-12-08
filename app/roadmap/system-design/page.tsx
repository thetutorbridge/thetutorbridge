'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Network,
  Database,
  Server,
  Layers,
  Globe,
  Shield,
  Zap,
  GitBranch,
  Cloud,
  Monitor,
  Code
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
    title: 'Fundamentals',
    icon: Code,
    color: 'bg-blue-500',
    steps: [
      {
        id: 1,
        title: 'Core Concepts',
        description: 'Understand basic system design concepts',
        topics: ['Client-Server Model', 'IP & DNS', 'HTTP/HTTPS', 'APIs', 'Latency vs Throughput']
      },
      {
        id: 2,
        title: 'Performance Metrics',
        description: 'Key metrics for system evaluation',
        topics: ['Availability', 'Reliability', 'Scalability', 'Maintainability', 'SLAs']
      }
    ],
    milestone: 'You understand system basics!'
  },
  {
    title: 'Databases',
    icon: Database,
    color: 'bg-green-500',
    steps: [
      {
        id: 3,
        title: 'SQL Databases',
        description: 'Relational database design',
        topics: ['ACID Properties', 'Normalization', 'Indexing', 'Transactions', 'Joins']
      },
      {
        id: 4,
        title: 'NoSQL Databases',
        description: 'Non-relational data storage',
        topics: ['Document Stores', 'Key-Value', 'Column Family', 'Graph DBs', 'When to Use NoSQL']
      },
      {
        id: 5,
        title: 'Database Scaling',
        description: 'Scale databases for high traffic',
        topics: ['Replication', 'Sharding', 'Partitioning', 'Read Replicas', 'CAP Theorem']
      }
    ]
  },
  {
    title: 'Caching',
    icon: Zap,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 6,
        title: 'Caching Strategies',
        description: 'Implement effective caching',
        topics: ['Cache-Aside', 'Write-Through', 'Write-Behind', 'Refresh-Ahead']
      },
      {
        id: 7,
        title: 'Caching Technologies',
        description: 'Popular caching solutions',
        topics: ['Redis', 'Memcached', 'CDN Caching', 'Browser Cache', 'Cache Invalidation']
      }
    ],
    milestone: 'You can optimize with caching!'
  },
  {
    title: 'Load Balancing',
    icon: Network,
    color: 'bg-purple-500',
    steps: [
      {
        id: 8,
        title: 'Load Balancer Concepts',
        description: 'Distribute traffic effectively',
        topics: ['Round Robin', 'Least Connections', 'IP Hash', 'Weighted', 'Health Checks']
      },
      {
        id: 9,
        title: 'Load Balancer Types',
        description: 'Different load balancing approaches',
        topics: ['L4 vs L7', 'HAProxy', 'Nginx', 'AWS ALB/NLB', 'DNS Load Balancing']
      }
    ]
  },
  {
    title: 'Scalability Patterns',
    icon: Layers,
    color: 'bg-orange-500',
    steps: [
      {
        id: 10,
        title: 'Horizontal vs Vertical',
        description: 'Scaling strategies',
        topics: ['Scale Up', 'Scale Out', 'Auto Scaling', 'Stateless Design', 'Session Management']
      },
      {
        id: 11,
        title: 'Microservices',
        description: 'Distributed architecture',
        topics: ['Service Decomposition', 'API Gateway', 'Service Discovery', 'Circuit Breaker']
      }
    ],
    milestone: 'You can design scalable systems!'
  },
  {
    title: 'Message Queues',
    icon: GitBranch,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 12,
        title: 'Async Communication',
        description: 'Decouple services with queues',
        topics: ['Pub/Sub', 'Point-to-Point', 'Message Brokers', 'Event-Driven Architecture']
      },
      {
        id: 13,
        title: 'Queue Technologies',
        description: 'Popular message queue systems',
        topics: ['Kafka', 'RabbitMQ', 'AWS SQS', 'Redis Pub/Sub', 'Event Sourcing']
      }
    ]
  },
  {
    title: 'Distributed Systems',
    icon: Globe,
    color: 'bg-pink-500',
    steps: [
      {
        id: 14,
        title: 'Distributed Concepts',
        description: 'Core distributed system principles',
        topics: ['Consensus', 'Consistency Models', 'Vector Clocks', 'Gossip Protocol']
      },
      {
        id: 15,
        title: 'Fault Tolerance',
        description: 'Build resilient systems',
        topics: ['Redundancy', 'Failover', 'Disaster Recovery', 'Data Replication', 'Backups']
      }
    ],
    milestone: 'You understand distributed systems!'
  },
  {
    title: 'Security & Monitoring',
    icon: Shield,
    color: 'bg-red-500',
    steps: [
      {
        id: 16,
        title: 'Security Design',
        description: 'Secure system architecture',
        topics: ['Authentication', 'Authorization', 'Encryption', 'Rate Limiting', 'DDoS Protection']
      },
      {
        id: 17,
        title: 'Observability',
        description: 'Monitor and debug systems',
        topics: ['Logging', 'Metrics', 'Tracing', 'Alerting', 'Dashboards']
      }
    ]
  },
  {
    title: 'Real-World Design',
    icon: Server,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 18,
        title: 'Common Systems',
        description: 'Design popular applications',
        topics: ['URL Shortener', 'Twitter/X', 'Instagram', 'WhatsApp', 'YouTube']
      },
      {
        id: 19,
        title: 'Interview Prep',
        description: 'Ace system design interviews',
        topics: ['Framework', 'Requirements', 'High-Level Design', 'Deep Dives', 'Trade-offs']
      }
    ],
    milestone: 'You are a System Design Expert!'
  }
];

// Salary Data (System Design skills are valued in senior/staff roles)
const usaSalaries = [
  { level: 'Mid (3-5 yrs)', range: '$120K - $160K', avg: '$140K' },
  { level: 'Senior (5-8 yrs)', range: '$160K - $220K', avg: '$190K' },
  { level: 'Staff (8-12 yrs)', range: '$220K - $350K', avg: '$280K' },
  { level: 'Principal (12+ yrs)', range: '$350K - $500K+', avg: '$400K' }
];

const indiaSalaries = [
  { level: 'Mid (3-5 yrs)', range: '₹18L - ₹30L', avg: '₹24L' },
  { level: 'Senior (5-8 yrs)', range: '₹30L - ₹50L', avg: '₹40L' },
  { level: 'Staff (8-12 yrs)', range: '₹50L - ₹80L', avg: '₹65L' },
  { level: 'Principal (12+ yrs)', range: '₹80L - ₹1.5Cr+', avg: '₹1Cr' }
];

// Project Ideas
const projects = [
  {
    title: 'URL Shortener',
    level: 'Beginner' as const,
    description: 'Design a system like bit.ly',
    skills: ['Hashing', 'Database', 'Caching']
  },
  {
    title: 'Rate Limiter',
    level: 'Beginner' as const,
    description: 'Build API rate limiting',
    skills: ['Token Bucket', 'Redis', 'Algorithms']
  },
  {
    title: 'Chat Application',
    level: 'Intermediate' as const,
    description: 'Design WhatsApp-like system',
    skills: ['WebSockets', 'Message Queues', 'Scaling']
  },
  {
    title: 'News Feed System',
    level: 'Intermediate' as const,
    description: 'Design Twitter/Facebook feed',
    skills: ['Fan-out', 'Caching', 'Ranking']
  },
  {
    title: 'Video Streaming',
    level: 'Advanced' as const,
    description: 'Design YouTube-like platform',
    skills: ['CDN', 'Encoding', 'Storage']
  },
  {
    title: 'Distributed Cache',
    level: 'Advanced' as const,
    description: 'Build Redis-like system',
    skills: ['Consistent Hashing', 'Replication', 'Partitioning']
  }
];

// FAQs
const faqs = [
  {
    question: 'How do I prepare for system design interviews?',
    answer: 'Start by understanding fundamental concepts like databases, caching, and load balancing. Practice designing common systems (URL shortener, Twitter, Instagram). Use a structured framework: clarify requirements, estimate scale, design high-level architecture, then deep dive into components. Study real-world systems and their trade-offs.'
  },
  {
    question: 'How long does it take to learn system design?',
    answer: 'Basic concepts can be learned in 2-3 months. Becoming proficient enough for senior-level interviews takes 6-12 months of dedicated study and practice. True mastery comes from years of building and operating real systems. Focus on understanding trade-offs rather than memorizing solutions.'
  },
  {
    question: 'Do I need to know system design for entry-level jobs?',
    answer: 'System design is typically not required for entry-level or junior positions. It becomes important for mid-level (3+ years) and essential for senior roles. However, understanding basics early in your career accelerates growth. Start learning fundamentals after mastering data structures and algorithms.'
  },
  {
    question: 'What is the difference between HLD and LLD?',
    answer: 'High-Level Design (HLD) focuses on overall system architecture - components, data flow, and how services interact. Low-Level Design (LLD) covers detailed implementation - class diagrams, database schemas, and API contracts. Interviews usually start with HLD and may dive into LLD for specific components.'
  },
  {
    question: 'Which resources are best for learning system design?',
    answer: 'Start with "Designing Data-Intensive Applications" by Martin Kleppmann. Use roadmap.sh and system design primers on GitHub. Practice on platforms like Educative or ByteByteGo. Watch engineering blogs from Netflix, Uber, and Airbnb. Mock interviews are invaluable for practice.'
  },
  {
    question: 'Is system design only for backend engineers?',
    answer: 'While backend engineers use it most, system design knowledge benefits all senior roles. Frontend engineers need it for performance optimization and architecture decisions. Mobile developers need it for offline-first design. Data engineers use it for pipeline design. It is valuable for any senior technical role.'
  },
  {
    question: 'How important is CAP theorem?',
    answer: 'CAP theorem is fundamental to distributed systems. It states you can only guarantee two of three: Consistency, Availability, and Partition tolerance. Understanding CAP helps make database choices and design trade-offs. However, modern systems often use eventual consistency to balance all three to some degree.'
  },
  {
    question: 'Should I focus on breadth or depth in system design?',
    answer: 'Start with breadth - understand all major components and patterns. Then develop depth in areas relevant to your target roles. For interviews, you need broad knowledge to discuss any system, plus deep expertise in 2-3 areas. Real-world work requires deep knowledge of your specific domain.'
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
    title: 'DevOps Engineer',
    description: 'Infrastructure and deployment',
    href: '/roadmap/devops',
    icon: Cloud,
    color: 'bg-orange-500'
  },
  {
    title: 'Full Stack Developer',
    description: 'Build complete applications',
    href: '/roadmap/full-stack-developer',
    icon: Layers,
    color: 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66]'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'System Design Roadmap 2026',
  description: 'Complete guide to learning system design in 2026',
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

export default function SystemDesignRoadmapPage() {
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
          title="System Design Roadmap"
          description="Master databases, caching, load balancing, microservices, and distributed systems. Your complete guide to acing system design interviews and building scalable applications in 2026."
          duration="6-12 Months"
          difficulty="Intermediate to Advanced"
          accentColor="#6366F1"
        />

        <WhatIsSection
          title="What is System Design?"
          paragraphs={[
            'System Design is the process of defining the architecture, components, and data flow of a system to satisfy specified requirements. It involves making decisions about scalability, reliability, and performance trade-offs.',
            'As you grow in your engineering career, system design becomes essential. You will design APIs, choose databases, implement caching strategies, and architect systems that can handle millions of users.'
          ]}
          responsibilities={[
            'Design scalable and reliable system architectures',
            'Choose appropriate databases and storage solutions',
            'Implement caching strategies for performance',
            'Design APIs and service interfaces',
            'Plan for fault tolerance and disaster recovery',
            'Make trade-off decisions (consistency vs availability)',
            'Communicate designs to stakeholders',
            'Lead technical design discussions'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#6366F1"
        />

        <SalarySection
          title="System Design Skills Impact on Salary 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="System design expertise is the key differentiator for senior and staff-level positions. Engineers who can design and architect systems command significantly higher compensation. FAANG companies heavily weight system design interviews for senior roles."
          gradient="bg-gradient-to-r from-indigo-500 to-purple-500"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Master System Design?"
          description="Get personalized guidance from experienced architects who have designed systems at scale."
          gradient="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"
        />
      </main>

      <Footer />
    </>
  );
}
