'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Terminal,
  Server,
  Cloud,
  Container,
  GitBranch,
  Settings,
  Shield,
  BarChart3,
  Layers,
  Monitor,
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

// Roadmap Stages Data
const roadmapStages: RoadmapStage[] = [
  {
    title: 'Learn a Language',
    icon: Terminal,
    color: 'bg-blue-500',
    steps: [
      {
        id: 1,
        title: 'Python',
        description: 'Scripting and automation',
        topics: ['Python Basics', 'File Operations', 'APIs', 'Automation Scripts']
      },
      {
        id: 2,
        title: 'Go or Rust',
        description: 'Systems programming',
        topics: ['Go Basics', 'Concurrency', 'CLI Tools', 'Performance']
      }
    ],
    milestone: 'You can write automation scripts!'
  },
  {
    title: 'Operating Systems',
    icon: Monitor,
    color: 'bg-green-500',
    steps: [
      {
        id: 3,
        title: 'Linux Fundamentals',
        description: 'Master Linux for DevOps',
        topics: ['File System', 'Permissions', 'Shell Scripting', 'Process Management']
      },
      {
        id: 4,
        title: 'Server Administration',
        description: 'Manage Linux servers',
        topics: ['SSH', 'systemd', 'Cron Jobs', 'Log Management', 'Performance Tuning']
      }
    ]
  },
  {
    title: 'Networking & Security',
    icon: Shield,
    color: 'bg-purple-500',
    steps: [
      {
        id: 5,
        title: 'Networking Basics',
        description: 'Understand network fundamentals',
        topics: ['OSI Model', 'TCP/IP', 'DNS', 'HTTP/HTTPS', 'Load Balancing']
      },
      {
        id: 6,
        title: 'Security',
        description: 'DevSecOps practices',
        topics: ['SSL/TLS', 'Firewalls', 'IAM', 'Secrets Management', 'OWASP']
      }
    ],
    milestone: 'You understand infrastructure!'
  },
  {
    title: 'Version Control',
    icon: GitBranch,
    color: 'bg-orange-500',
    steps: [
      {
        id: 7,
        title: 'Git',
        description: 'Master version control',
        topics: ['Git Basics', 'Branching', 'Merging', 'Rebasing', 'Git Flow']
      },
      {
        id: 8,
        title: 'Git Platforms',
        description: 'Collaborate with teams',
        topics: ['GitHub', 'GitLab', 'Bitbucket', 'Pull Requests', 'Code Review']
      }
    ]
  },
  {
    title: 'Containers',
    icon: Container,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 9,
        title: 'Docker',
        description: 'Containerize applications',
        topics: ['Docker Basics', 'Dockerfile', 'Docker Compose', 'Networking', 'Volumes']
      },
      {
        id: 10,
        title: 'Kubernetes',
        description: 'Container orchestration',
        topics: ['K8s Architecture', 'Pods', 'Deployments', 'Services', 'Helm', 'ConfigMaps']
      }
    ],
    milestone: 'You can containerize applications!'
  },
  {
    title: 'CI/CD',
    icon: Settings,
    color: 'bg-pink-500',
    steps: [
      {
        id: 11,
        title: 'CI/CD Concepts',
        description: 'Continuous Integration & Deployment',
        topics: ['CI/CD Pipeline', 'Build Automation', 'Testing', 'Deployment Strategies']
      },
      {
        id: 12,
        title: 'CI/CD Tools',
        description: 'Implement pipelines',
        topics: ['Jenkins', 'GitHub Actions', 'GitLab CI', 'ArgoCD', 'CircleCI']
      }
    ]
  },
  {
    title: 'Cloud Providers',
    icon: Cloud,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 13,
        title: 'AWS',
        description: 'Amazon Web Services',
        topics: ['EC2', 'S3', 'RDS', 'Lambda', 'VPC', 'IAM', 'CloudFormation']
      },
      {
        id: 14,
        title: 'Azure / GCP',
        description: 'Other cloud platforms',
        topics: ['Azure DevOps', 'Google Cloud', 'Multi-Cloud', 'Cloud Native']
      }
    ],
    milestone: 'You can deploy to the cloud!'
  },
  {
    title: 'Infrastructure as Code',
    icon: Server,
    color: 'bg-teal-500',
    steps: [
      {
        id: 15,
        title: 'Terraform',
        description: 'Infrastructure provisioning',
        topics: ['HCL', 'Providers', 'State Management', 'Modules', 'Workspaces']
      },
      {
        id: 16,
        title: 'Configuration Management',
        description: 'Automate server configuration',
        topics: ['Ansible', 'Chef', 'Puppet', 'Playbooks', 'Inventory']
      }
    ]
  },
  {
    title: 'Monitoring & Logging',
    icon: BarChart3,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 17,
        title: 'Monitoring',
        description: 'Application and infrastructure monitoring',
        topics: ['Prometheus', 'Grafana', 'Datadog', 'New Relic', 'Alerting']
      },
      {
        id: 18,
        title: 'Logging',
        description: 'Centralized logging',
        topics: ['ELK Stack', 'Loki', 'Fluentd', 'Log Aggregation', 'Tracing']
      }
    ],
    milestone: 'You are a DevOps Engineer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$70K - $100K', avg: '$85K' },
  { level: 'Mid (2-5 yrs)', range: '$100K - $140K', avg: '$120K' },
  { level: 'Senior (5-8 yrs)', range: '$140K - $180K', avg: '$160K' },
  { level: 'Lead (8+ yrs)', range: '$180K - $250K+', avg: '$210K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹5L - ₹10L', avg: '₹7L' },
  { level: 'Junior (1-3 yrs)', range: '₹10L - ₹18L', avg: '₹14L' },
  { level: 'Mid (3-5 yrs)', range: '₹18L - ₹30L', avg: '₹24L' },
  { level: 'Senior (5+ yrs)', range: '₹30L - ₹55L+', avg: '₹40L' }
];

// Project Ideas
const projects = [
  {
    title: 'Dockerize an App',
    level: 'Beginner' as const,
    description: 'Containerize a web application',
    skills: ['Docker', 'Dockerfile', 'Docker Compose']
  },
  {
    title: 'CI/CD Pipeline',
    level: 'Beginner' as const,
    description: 'Build automated deployment pipeline',
    skills: ['GitHub Actions', 'Testing', 'Deployment']
  },
  {
    title: 'Kubernetes Cluster',
    level: 'Intermediate' as const,
    description: 'Deploy app to K8s cluster',
    skills: ['Kubernetes', 'Helm', 'kubectl']
  },
  {
    title: 'Infrastructure with Terraform',
    level: 'Intermediate' as const,
    description: 'Provision cloud infrastructure',
    skills: ['Terraform', 'AWS', 'IaC']
  },
  {
    title: 'Monitoring Stack',
    level: 'Advanced' as const,
    description: 'Set up Prometheus and Grafana',
    skills: ['Prometheus', 'Grafana', 'Alerting']
  },
  {
    title: 'GitOps with ArgoCD',
    level: 'Advanced' as const,
    description: 'Implement GitOps workflow',
    skills: ['ArgoCD', 'Kubernetes', 'Git']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to become a DevOps Engineer?',
    answer: 'With consistent learning (3-4 hours daily) and some prior IT experience, you can become job-ready in 6-12 months. Focus on Linux, Docker, CI/CD, and one cloud provider first. Hands-on practice with real projects is essential. Those with development or sysadmin background can transition faster.'
  },
  {
    question: 'Do I need coding skills for DevOps?',
    answer: 'Yes, scripting skills are essential. Python and Bash are most important for automation, configuration management, and writing CI/CD pipelines. You do not need to be a full-stack developer, but understanding code helps you work with development teams and automate effectively.'
  },
  {
    question: 'Which cloud provider should I learn first?',
    answer: 'Start with AWS - it has the largest market share and most job opportunities. Learn core services like EC2, S3, VPC, IAM, and Lambda. Once comfortable, expand to Azure or GCP. Most DevOps concepts transfer between clouds, so deep knowledge of one is better than surface knowledge of all.'
  },
  {
    question: 'Is Kubernetes necessary for DevOps?',
    answer: 'Kubernetes is increasingly important but not mandatory for entry-level roles. Start with Docker to understand containers, then learn Kubernetes. Many companies use managed Kubernetes (EKS, GKE, AKS) or simpler alternatives. However, K8s knowledge significantly boosts your career prospects and salary.'
  },
  {
    question: 'What is the difference between DevOps and SRE?',
    answer: 'DevOps focuses on culture, practices, and tools to improve collaboration between development and operations. SRE (Site Reliability Engineering) is Google approach to operations, emphasizing automation, SLOs, and treating operations as a software problem. SRE is more specialized with heavier focus on reliability and incident management.'
  },
  {
    question: 'Which DevOps certifications are valuable?',
    answer: 'AWS Solutions Architect and DevOps Professional are highly valued. CKA (Certified Kubernetes Administrator) is excellent for container roles. HashiCorp Terraform Associate for IaC. Docker Certified Associate is good for beginners. Certifications help but practical experience and projects matter more.'
  },
  {
    question: 'Should I learn Ansible or Terraform first?',
    answer: 'Learn Terraform first - it is the industry standard for infrastructure provisioning and has clearer syntax. Terraform handles "what infrastructure exists" while Ansible handles "how servers are configured." Both are valuable, but Terraform is more fundamental to modern DevOps. Learn Ansible after for configuration management.'
  },
  {
    question: 'Is DevOps a good career in 2026?',
    answer: 'Yes, DevOps remains one of the most in-demand and well-paid IT careers. Cloud adoption continues growing, companies need automation expertise, and the shift to Kubernetes and GitOps creates new opportunities. Remote work is common, and the skills transfer across industries.'
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
    title: 'Cyber Security',
    description: 'Security and pentesting',
    href: '/roadmap/cyber-security',
    icon: Shield,
    color: 'bg-red-500'
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
  headline: 'DevOps Engineer Roadmap 2026',
  description: 'Complete guide to becoming a DevOps engineer in 2026',
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

export default function DevOpsRoadmapPage() {
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
          title="DevOps Engineer Roadmap"
          description="Master Linux, Docker, Kubernetes, CI/CD, Cloud Platforms, and Infrastructure as Code. Your complete guide to becoming a professional DevOps engineer in 2026."
          duration="6-12 Months"
          difficulty="Intermediate"
          accentColor="#F97316"
        />

        <WhatIsSection
          title="What is a DevOps Engineer?"
          paragraphs={[
            'DevOps Engineers bridge the gap between software development and IT operations. They automate processes, manage infrastructure, implement CI/CD pipelines, and ensure reliable, scalable deployments.',
            'As a DevOps Engineer, you will work with containers, orchestration tools, cloud platforms, and monitoring systems to help teams deliver software faster and more reliably.'
          ]}
          responsibilities={[
            'Design and implement CI/CD pipelines',
            'Manage and automate infrastructure with IaC',
            'Deploy and manage containerized applications',
            'Monitor system performance and reliability',
            'Implement security best practices (DevSecOps)',
            'Manage cloud infrastructure (AWS, Azure, GCP)',
            'Troubleshoot production issues',
            'Collaborate with development teams'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#F97316"
        />

        <SalarySection
          title="DevOps Engineer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Kubernetes and cloud certifications significantly boost salaries. SRE roles typically pay 10-20% more. Companies in fintech and big tech offer the highest compensation. Remote DevOps roles are abundant and well-paid."
          gradient="bg-gradient-to-r from-orange-500 to-red-500"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your DevOps Journey?"
          description="Get personalized guidance from experienced DevOps professionals who have built and managed production infrastructure."
          gradient="bg-gradient-to-r from-orange-500 via-red-500 to-orange-500"
        />
      </main>

      <Footer />
    </>
  );
}
