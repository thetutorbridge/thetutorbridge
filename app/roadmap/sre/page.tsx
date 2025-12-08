'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Activity,
  Server,
  Shield,
  AlertTriangle,
  LineChart,
  Settings,
  Zap,
  Target,
  Clock,
  RefreshCw,
  Code,
  Database
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

const roadmapStages: RoadmapStage[] = [
  {
    title: 'Foundation',
    icon: Server,
    color: 'bg-blue-500',
    steps: [
      {
        id: 1,
        title: 'Systems Fundamentals',
        description: 'Core infrastructure skills',
        topics: ['Linux Administration', 'Networking (TCP/IP, DNS)', 'Operating Systems', 'Distributed Systems', 'Databases']
      },
      {
        id: 2,
        title: 'Programming',
        description: 'Automation and tooling',
        topics: ['Python', 'Go', 'Bash Scripting', 'Data Structures', 'System Programming']
      }
    ],
    milestone: 'You have foundation skills!'
  },
  {
    title: 'SRE Principles',
    icon: Target,
    color: 'bg-purple-500',
    steps: [
      {
        id: 3,
        title: 'SLIs, SLOs, SLAs',
        description: 'Service level objectives',
        topics: ['Defining SLIs', 'Setting SLOs', 'SLA Contracts', 'Measuring Reliability', 'User Journey SLOs']
      },
      {
        id: 4,
        title: 'Error Budgets',
        description: 'Balance reliability and velocity',
        topics: ['Error Budget Concept', 'Budget Policies', 'Feature vs Reliability', 'Risk Analysis', 'Budget Burn Rate']
      }
    ]
  },
  {
    title: 'Observability',
    icon: LineChart,
    color: 'bg-green-500',
    steps: [
      {
        id: 5,
        title: 'Monitoring & Metrics',
        description: 'Measure everything',
        topics: ['Prometheus', 'Grafana', 'The Four Golden Signals', 'RED/USE Methods', 'Custom Metrics']
      },
      {
        id: 6,
        title: 'Logging & Tracing',
        description: 'Debug production',
        topics: ['Centralized Logging', 'ELK Stack', 'Distributed Tracing', 'Jaeger/Zipkin', 'OpenTelemetry']
      },
      {
        id: 7,
        title: 'Alerting',
        description: 'Smart notifications',
        topics: ['Alert Design', 'On-Call Rotations', 'PagerDuty/Opsgenie', 'Alert Fatigue', 'Runbooks']
      }
    ],
    milestone: 'You can observe systems!'
  },
  {
    title: 'Incident Management',
    icon: AlertTriangle,
    color: 'bg-red-500',
    steps: [
      {
        id: 8,
        title: 'Incident Response',
        description: 'Handle production issues',
        topics: ['Incident Roles', 'Severity Levels', 'Communication', 'War Rooms', 'Escalation']
      },
      {
        id: 9,
        title: 'Postmortems',
        description: 'Learn from failures',
        topics: ['Blameless Culture', 'Root Cause Analysis', 'Action Items', 'Documentation', 'Knowledge Sharing']
      }
    ]
  },
  {
    title: 'Reliability Practices',
    icon: Shield,
    color: 'bg-orange-500',
    steps: [
      {
        id: 10,
        title: 'Capacity Planning',
        description: 'Plan for growth',
        topics: ['Load Testing', 'Traffic Forecasting', 'Resource Planning', 'Scaling Strategies', 'Cost Modeling']
      },
      {
        id: 11,
        title: 'Disaster Recovery',
        description: 'Prepare for failures',
        topics: ['Backup Strategies', 'RTO/RPO', 'Failover', 'Multi-Region', 'DR Testing']
      }
    ],
    milestone: 'You can ensure reliability!'
  },
  {
    title: 'Automation & Toil',
    icon: Zap,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 12,
        title: 'Toil Reduction',
        description: 'Eliminate manual work',
        topics: ['Identifying Toil', 'Automation ROI', 'Self-Healing Systems', 'Auto-Remediation', 'Playbook Automation']
      },
      {
        id: 13,
        title: 'Infrastructure as Code',
        description: 'Codify everything',
        topics: ['Terraform', 'Ansible', 'GitOps', 'Configuration Management', 'Immutable Infrastructure']
      }
    ]
  },
  {
    title: 'Containers & Orchestration',
    icon: Settings,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 14,
        title: 'Container Platforms',
        description: 'Modern infrastructure',
        topics: ['Docker', 'Kubernetes', 'Service Mesh', 'Container Security', 'Resource Management']
      },
      {
        id: 15,
        title: 'Platform Reliability',
        description: 'Reliable platforms',
        topics: ['K8s Operators', 'Pod Disruption Budgets', 'Health Checks', 'Rolling Updates', 'Cluster Management']
      }
    ],
    milestone: 'You can manage platforms!'
  },
  {
    title: 'Chaos Engineering',
    icon: RefreshCw,
    color: 'bg-pink-500',
    steps: [
      {
        id: 16,
        title: 'Chaos Principles',
        description: 'Break things on purpose',
        topics: ['Chaos Theory', 'Game Days', 'Blast Radius', 'Steady State', 'Hypothesis Testing']
      },
      {
        id: 17,
        title: 'Chaos Tools',
        description: 'Chaos in practice',
        topics: ['Chaos Monkey', 'Litmus', 'Gremlin', 'Fault Injection', 'Network Chaos']
      }
    ]
  },
  {
    title: 'Performance Engineering',
    icon: Activity,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 18,
        title: 'Performance Analysis',
        description: 'Find bottlenecks',
        topics: ['Profiling', 'Flame Graphs', 'Latency Analysis', 'Resource Utilization', 'Benchmarking']
      },
      {
        id: 19,
        title: 'Optimization',
        description: 'Make things faster',
        topics: ['Caching Strategies', 'Query Optimization', 'CDN', 'Connection Pooling', 'Code Optimization']
      }
    ]
  },
  {
    title: 'Advanced SRE',
    icon: Code,
    color: 'bg-emerald-500',
    steps: [
      {
        id: 20,
        title: 'SRE Culture',
        description: 'Build SRE teams',
        topics: ['SRE Team Models', 'Embedded vs Platform', 'Production Readiness', 'Service Handoff', 'Training']
      },
      {
        id: 21,
        title: 'Advanced Topics',
        description: 'Expert-level SRE',
        topics: ['Multi-Region Architectures', 'Global Load Balancing', 'Data Consistency', 'Reliability at Scale', 'SRE Leadership']
      }
    ],
    milestone: 'You are a Site Reliability Engineer!'
  }
];

const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$90K - $120K', avg: '$105K' },
  { level: 'Mid (2-5 yrs)', range: '$120K - $170K', avg: '$145K' },
  { level: 'Senior (5-8 yrs)', range: '$160K - $220K', avg: '$190K' },
  { level: 'Staff/Principal (8+ yrs)', range: '$200K - $300K+', avg: '$245K' }
];

const indiaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '₹10L - ₹18L', avg: '₹14L' },
  { level: 'Mid (2-5 yrs)', range: '₹18L - ₹32L', avg: '₹24L' },
  { level: 'Senior (5-8 yrs)', range: '₹32L - ₹50L', avg: '₹40L' },
  { level: 'Staff (8+ yrs)', range: '₹50L - ₹80L+', avg: '₹62L' }
];

const projects = [
  { title: 'Monitoring Stack', level: 'Beginner' as const, description: 'Prometheus + Grafana setup', skills: ['Prometheus', 'Grafana', 'Alerting', 'Dashboards'] },
  { title: 'SLO Dashboard', level: 'Beginner' as const, description: 'Build SLO tracking system', skills: ['SLIs', 'SLOs', 'Error Budgets', 'Visualization'] },
  { title: 'Incident Management', level: 'Intermediate' as const, description: 'Automated incident workflow', skills: ['PagerDuty', 'Slack', 'Runbooks', 'Automation'] },
  { title: 'Chaos Testing', level: 'Intermediate' as const, description: 'Chaos engineering pipeline', skills: ['Chaos Monkey', 'Game Days', 'Fault Injection', 'Recovery'] },
  { title: 'Auto-Scaling Platform', level: 'Advanced' as const, description: 'Intelligent auto-scaling', skills: ['Kubernetes', 'HPA/VPA', 'Custom Metrics', 'Prediction'] },
  { title: 'Multi-Region DR', level: 'Advanced' as const, description: 'Disaster recovery system', skills: ['Multi-Region', 'Failover', 'Data Replication', 'Testing'] }
];

const faqs = [
  {
    question: 'What is the difference between SRE and DevOps?',
    answer: 'SRE is an implementation of DevOps with specific practices. DevOps is a culture/philosophy; SRE provides concrete methods like SLOs, error budgets, and toil measurement. SRE originated at Google and focuses on reliability. Many organizations blend both approaches.'
  },
  {
    question: 'How long does it take to become an SRE?',
    answer: 'With software engineering or operations background, 1-2 years to transition. Building expertise in SRE practices (SLOs, incident management, chaos engineering) takes another 2-3 years. Senior SRE roles require 5+ years of production experience.'
  },
  {
    question: 'Do SREs need to code?',
    answer: 'Yes, coding is essential. SREs automate toil, build internal tools, write monitoring systems, and contribute to service reliability. Python and Go are most common. Expect to spend 50%+ time on engineering work, not just operations.'
  },
  {
    question: 'Is SRE a good career in 2026?',
    answer: 'Excellent career choice. Companies increasingly need reliability experts as systems grow complex. SRE salaries are among the highest in tech. Demand exceeds supply, especially for experienced SREs. The role continues evolving with cloud and AI.'
  },
  {
    question: 'What background is best for SRE?',
    answer: 'Software engineering or system administration both work. Developers learn operations; ops people learn coding. Understanding distributed systems is crucial. Database, networking, or security backgrounds also translate well to SRE.'
  },
  {
    question: 'How do I handle on-call as an SRE?',
    answer: 'On-call is part of SRE work. Good practices: actionable alerts only, clear runbooks, blameless postmortems, and on-call compensation. Teams rotate responsibility. Work to reduce on-call burden through automation and better reliability.'
  },
  {
    question: 'What tools do SREs use most?',
    answer: 'Prometheus/Grafana for monitoring, PagerDuty for alerting, Kubernetes for orchestration, Terraform for IaC, and Python/Go for automation. Also: ELK stack, Jaeger for tracing, Chaos Monkey for testing. Tools vary by organization.'
  },
  {
    question: 'How do I prepare for SRE interviews?',
    answer: 'Study: system design, Linux internals, networking, coding (Python/Go). Practice: debugging scenarios, incident response, SLO design. Know concepts: error budgets, toil, blameless postmortems. Google\'s SRE books are essential reading.'
  }
];

const relatedRoadmaps = [
  { title: 'DevOps', description: 'CI/CD and automation', href: '/roadmap/devops', icon: Settings, color: 'bg-orange-500' },
  { title: 'Cloud Engineer', description: 'Cloud infrastructure', href: '/roadmap/cloud-engineer', icon: Server, color: 'bg-yellow-500' },
  { title: 'Linux', description: 'Linux administration', href: '/roadmap/linux', icon: Server, color: 'bg-gray-700' }
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Site Reliability Engineer (SRE) Roadmap 2026',
  description: 'Complete guide to becoming a Site Reliability Engineer in 2026',
  author: { '@type': 'Organization', name: 'The Tutor Bridge' },
  publisher: { '@type': 'Organization', name: 'The Tutor Bridge' }
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } }))
};

export default function SRERoadmapPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <RoadmapHero
          title="Site Reliability Engineer Roadmap"
          description="Master SLOs, observability, incident management, chaos engineering, and reliability practices. Your complete guide to becoming an SRE in 2026."
          duration="8-14 Months"
          difficulty="Advanced"
          accentColor="#6366F1"
        />
        <WhatIsSection
          title="What is a Site Reliability Engineer?"
          paragraphs={[
            'Site Reliability Engineers (SREs) ensure that software systems are reliable, scalable, and efficient. They bridge development and operations, using software engineering to solve infrastructure and operations problems.',
            'As an SRE, you will define and track SLOs, manage incidents, automate toil, implement observability, conduct chaos experiments, and build resilient systems that users can depend on.'
          ]}
          responsibilities={[
            'Define and monitor SLIs, SLOs, and error budgets',
            'Build observability (monitoring, logging, tracing)',
            'Manage incidents and conduct blameless postmortems',
            'Automate toil and repetitive operations tasks',
            'Implement chaos engineering practices',
            'Ensure system capacity and performance',
            'Collaborate with developers on reliability'
          ]}
        />
        <VisualRoadmapSection stages={roadmapStages} accentColor="#6366F1" />
        <SalarySection
          title="SRE Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="SRE salaries are among the highest in tech due to the critical nature of the role. FAANG companies pay premium for experienced SREs. On-call typically comes with additional compensation. Platform/infrastructure specialization adds value."
          gradient="bg-gradient-to-r from-indigo-500 to-purple-500"
        />
        <ProjectsSection projects={projects} />
        <FAQSection faqs={faqs} />
        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />
        <CTASection
          title="Ready to Start Your SRE Journey?"
          description="Get personalized guidance from experienced SREs who have built and maintained reliable systems at scale."
          gradient="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        />
      </main>
      <Footer />
    </>
  );
}
