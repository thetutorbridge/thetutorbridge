'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Cloud,
  Server,
  Network,
  Shield,
  Database,
  Container,
  Settings,
  LineChart,
  DollarSign,
  Code,
  Zap,
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

const roadmapStages: RoadmapStage[] = [
  {
    title: 'Foundation',
    icon: Server,
    color: 'bg-blue-500',
    steps: [
      {
        id: 1,
        title: 'Linux & Networking',
        description: 'Essential infrastructure skills',
        topics: ['Linux Administration', 'TCP/IP', 'DNS', 'HTTP/HTTPS', 'Load Balancers', 'Firewalls']
      },
      {
        id: 2,
        title: 'Programming Basics',
        description: 'Scripting and automation',
        topics: ['Python', 'Bash Scripting', 'PowerShell', 'JSON/YAML', 'APIs', 'Version Control']
      }
    ],
    milestone: 'You have foundation skills!'
  },
  {
    title: 'Cloud Platform Fundamentals',
    icon: Cloud,
    color: 'bg-orange-500',
    steps: [
      {
        id: 3,
        title: 'Choose Your Platform',
        description: 'Start with one cloud',
        topics: ['AWS (Most Popular)', 'Azure (Enterprise)', 'GCP (Innovation)', 'Platform Overview', 'Free Tier']
      },
      {
        id: 4,
        title: 'Core Services',
        description: 'Essential cloud services',
        topics: ['Compute (EC2/VMs)', 'Storage (S3/Blob)', 'Databases (RDS)', 'Networking (VPC)', 'IAM']
      }
    ]
  },
  {
    title: 'Cloud Networking',
    icon: Network,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 5,
        title: 'Virtual Networks',
        description: 'Cloud networking',
        topics: ['VPCs', 'Subnets', 'Route Tables', 'Internet Gateways', 'NAT Gateways', 'Peering']
      },
      {
        id: 6,
        title: 'Advanced Networking',
        description: 'Complex network designs',
        topics: ['Transit Gateway', 'VPN Connections', 'Direct Connect/ExpressRoute', 'CDN', 'Global Accelerator']
      }
    ],
    milestone: 'You can design cloud networks!'
  },
  {
    title: 'Security & Identity',
    icon: Shield,
    color: 'bg-red-500',
    steps: [
      {
        id: 7,
        title: 'Identity Management',
        description: 'Cloud security basics',
        topics: ['IAM Policies', 'Roles & Groups', 'SSO/SAML', 'MFA', 'Service Accounts', 'Least Privilege']
      },
      {
        id: 8,
        title: 'Security Services',
        description: 'Protect your cloud',
        topics: ['Security Groups', 'WAF', 'Shield', 'KMS/Encryption', 'Secrets Management', 'Compliance']
      }
    ]
  },
  {
    title: 'Infrastructure as Code',
    icon: Code,
    color: 'bg-purple-500',
    steps: [
      {
        id: 9,
        title: 'Terraform',
        description: 'Multi-cloud IaC',
        topics: ['HCL Syntax', 'Providers', 'State Management', 'Modules', 'Workspaces', 'Best Practices']
      },
      {
        id: 10,
        title: 'Cloud-Native IaC',
        description: 'Platform-specific tools',
        topics: ['CloudFormation', 'ARM Templates', 'Pulumi', 'CDK', 'Ansible', 'Configuration Management']
      }
    ],
    milestone: 'You can automate infrastructure!'
  },
  {
    title: 'Containers & Orchestration',
    icon: Container,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 11,
        title: 'Containers',
        description: 'Container fundamentals',
        topics: ['Docker', 'Container Registry', 'Image Building', 'Multi-stage Builds', 'Security Scanning']
      },
      {
        id: 12,
        title: 'Kubernetes',
        description: 'Container orchestration',
        topics: ['EKS/AKS/GKE', 'Pods & Deployments', 'Services', 'Ingress', 'Helm', 'GitOps']
      }
    ]
  },
  {
    title: 'Serverless & Modern Services',
    icon: Zap,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 13,
        title: 'Serverless Computing',
        description: 'Event-driven architecture',
        topics: ['Lambda/Functions', 'API Gateway', 'Event Bridge', 'Step Functions', 'SQS/SNS']
      },
      {
        id: 14,
        title: 'Managed Services',
        description: 'Platform services',
        topics: ['Managed Databases', 'Cache Services', 'Search Services', 'AI/ML Services', 'Analytics']
      }
    ],
    milestone: 'You understand modern cloud!'
  },
  {
    title: 'Data & Databases',
    icon: Database,
    color: 'bg-green-500',
    steps: [
      {
        id: 15,
        title: 'Database Services',
        description: 'Cloud databases',
        topics: ['RDS/Cloud SQL', 'DynamoDB/CosmosDB', 'ElastiCache/Redis', 'Database Migration', 'Replication']
      },
      {
        id: 16,
        title: 'Data Services',
        description: 'Big data and analytics',
        topics: ['Data Lakes', 'ETL Services', 'Data Warehouses', 'Streaming (Kinesis)', 'BI Tools']
      }
    ]
  },
  {
    title: 'Monitoring & Observability',
    icon: LineChart,
    color: 'bg-teal-500',
    steps: [
      {
        id: 17,
        title: 'Cloud Monitoring',
        description: 'Monitor everything',
        topics: ['CloudWatch/Monitor', 'Metrics & Alarms', 'Log Management', 'Distributed Tracing', 'APM']
      },
      {
        id: 18,
        title: 'Third-Party Tools',
        description: 'Enterprise observability',
        topics: ['Datadog', 'Prometheus/Grafana', 'Splunk', 'New Relic', 'PagerDuty', 'Alerting']
      }
    ]
  },
  {
    title: 'Cost Optimization & FinOps',
    icon: DollarSign,
    color: 'bg-emerald-500',
    steps: [
      {
        id: 19,
        title: 'Cost Management',
        description: 'Control cloud costs',
        topics: ['Cost Explorer', 'Budgets & Alerts', 'Reserved Instances', 'Spot Instances', 'Savings Plans']
      },
      {
        id: 20,
        title: 'FinOps Practices',
        description: 'Cloud financial management',
        topics: ['Tagging Strategy', 'Rightsizing', 'Waste Elimination', 'Cost Allocation', 'Showback/Chargeback']
      }
    ]
  },
  {
    title: 'Architecture & Multi-Cloud',
    icon: Globe,
    color: 'bg-rose-500',
    steps: [
      {
        id: 21,
        title: 'Cloud Architecture',
        description: 'Design patterns',
        topics: ['Well-Architected Framework', 'High Availability', 'Disaster Recovery', 'Multi-Region', 'Hybrid Cloud']
      },
      {
        id: 22,
        title: 'Multi-Cloud & Advanced',
        description: 'Enterprise strategies',
        topics: ['Multi-Cloud Strategy', 'Cloud Migration', 'Landing Zones', 'Governance', 'Enterprise Architecture']
      }
    ],
    milestone: 'You are a Cloud Engineer!'
  }
];

const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$75K - $100K', avg: '$88K' },
  { level: 'Mid (2-5 yrs)', range: '$100K - $145K', avg: '$122K' },
  { level: 'Senior (5-8 yrs)', range: '$140K - $190K', avg: '$165K' },
  { level: 'Architect (8+ yrs)', range: '$180K - $250K+', avg: '$210K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹5L - ₹10L', avg: '₹7L' },
  { level: 'Junior (1-3 yrs)', range: '₹10L - ₹18L', avg: '₹14L' },
  { level: 'Mid (3-5 yrs)', range: '₹18L - ₹32L', avg: '₹24L' },
  { level: 'Senior (5+ yrs)', range: '₹30L - ₹55L+', avg: '₹42L' }
];

const projects = [
  { title: 'Static Website Hosting', level: 'Beginner' as const, description: 'Host on S3/CloudFront', skills: ['S3', 'CloudFront', 'Route 53', 'SSL'] },
  { title: 'VPC Design', level: 'Beginner' as const, description: 'Multi-tier network', skills: ['VPC', 'Subnets', 'Security Groups', 'NAT'] },
  { title: 'Terraform Infrastructure', level: 'Intermediate' as const, description: 'IaC for web app', skills: ['Terraform', 'Modules', 'State', 'CI/CD'] },
  { title: 'Kubernetes Cluster', level: 'Intermediate' as const, description: 'EKS/AKS deployment', skills: ['Kubernetes', 'Helm', 'Ingress', 'Monitoring'] },
  { title: 'Serverless Application', level: 'Advanced' as const, description: 'Event-driven architecture', skills: ['Lambda', 'API Gateway', 'DynamoDB', 'Step Functions'] },
  { title: 'Multi-Region DR', level: 'Advanced' as const, description: 'Disaster recovery setup', skills: ['Multi-Region', 'Replication', 'Failover', 'RTO/RPO'] }
];

const faqs = [
  {
    question: 'Which cloud platform should I learn first?',
    answer: 'AWS has the largest market share and most job openings - start there. Azure is strong in enterprises using Microsoft products. GCP excels in data/ML. Learn one deeply first, then expand. Core concepts transfer between platforms.'
  },
  {
    question: 'How long does it take to become a Cloud Engineer?',
    answer: 'With IT background, 6-9 months for entry-level. Complete beginners need 12-18 months. Getting certified (AWS Solutions Architect Associate) takes 2-3 months of focused study. Senior roles require 3-5 years of hands-on experience.'
  },
  {
    question: 'Are cloud certifications worth it?',
    answer: 'Yes, especially early in your career. AWS Solutions Architect Associate is highly valued. Certifications prove baseline knowledge and help pass resume screening. Combine with hands-on experience - certs alone aren\'t enough.'
  },
  {
    question: 'Do I need coding skills for cloud engineering?',
    answer: 'Yes, scripting is essential. Python and Bash are most important. You\'ll write IaC (Terraform, CloudFormation), automation scripts, and Lambda functions. Deep programming isn\'t required, but you must be comfortable with code.'
  },
  {
    question: 'What\'s the difference between Cloud Engineer and DevOps?',
    answer: 'Significant overlap exists. Cloud Engineers focus on cloud infrastructure and services. DevOps emphasizes CI/CD pipelines and developer workflows. Many roles combine both. Cloud skills are essential for modern DevOps.'
  },
  {
    question: 'Is cloud engineering a good career in 2026?',
    answer: 'Excellent career choice. Cloud spending continues growing rapidly. Every company is moving to cloud. Demand far exceeds supply for experienced cloud engineers. Remote work opportunities are abundant.'
  },
  {
    question: 'Should I learn multi-cloud?',
    answer: 'Start with one cloud deeply. Multi-cloud is valuable for senior roles but premature for beginners. Learn Terraform - it works across clouds. Understanding cloud concepts matters more than knowing every service on every platform.'
  },
  {
    question: 'How do I get cloud experience without a job?',
    answer: 'Use free tiers extensively - AWS, Azure, GCP all offer them. Build projects and document on GitHub. Get certified. Contribute to open-source cloud projects. Create a tech blog about your learning. Labs and sandboxes help too.'
  }
];

const relatedRoadmaps = [
  { title: 'DevOps', description: 'CI/CD and automation', href: '/roadmap/devops', icon: Settings, color: 'bg-orange-500' },
  { title: 'AWS', description: 'Amazon Web Services', href: '/roadmap/aws', icon: Cloud, color: 'bg-yellow-500' },
  { title: 'Linux', description: 'Linux administration', href: '/roadmap/linux', icon: Server, color: 'bg-gray-700' }
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Cloud Engineer Roadmap 2026',
  description: 'Complete guide to becoming a Cloud Engineer in 2026',
  author: { '@type': 'Organization', name: 'The Tutor Bridge' },
  publisher: { '@type': 'Organization', name: 'The Tutor Bridge' }
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } }))
};

export default function CloudEngineerRoadmapPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <RoadmapHero
          title="Cloud Engineer Roadmap"
          description="Master AWS, Azure, GCP, infrastructure as code, containerization, serverless, and cloud architecture. Your complete guide to becoming a Cloud Engineer in 2026."
          duration="6-12 Months"
          difficulty="Intermediate"
          accentColor="#FF9900"
        />
        <WhatIsSection
          title="What is a Cloud Engineer?"
          paragraphs={[
            'Cloud Engineers design, implement, and manage cloud infrastructure on platforms like AWS, Azure, and GCP. They build scalable, secure, and cost-effective solutions that power modern applications and businesses.',
            'As a Cloud Engineer, you will provision infrastructure, implement security controls, automate deployments, optimize costs, and ensure high availability of cloud systems.'
          ]}
          responsibilities={[
            'Design and implement cloud architecture',
            'Manage cloud infrastructure (compute, storage, networking)',
            'Implement Infrastructure as Code (Terraform, CloudFormation)',
            'Configure security, IAM, and compliance controls',
            'Deploy and manage containers and Kubernetes',
            'Monitor systems and optimize performance',
            'Control and optimize cloud costs'
          ]}
        />
        <VisualRoadmapSection stages={roadmapStages} accentColor="#FF9900" />
        <SalarySection
          title="Cloud Engineer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Cloud certifications significantly boost starting salaries. Multi-cloud expertise commands premium pay. Cloud Architects and those with security specialization earn top salaries. Remote opportunities are abundant with competitive compensation."
          gradient="bg-gradient-to-r from-orange-500 to-yellow-500"
        />
        <ProjectsSection projects={projects} />
        <FAQSection faqs={faqs} />
        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />
        <CTASection
          title="Ready to Start Your Cloud Engineering Journey?"
          description="Get personalized guidance from experienced cloud engineers who have built enterprise-scale cloud solutions."
          gradient="bg-gradient-to-r from-orange-500 via-yellow-500 to-amber-500"
        />
      </main>
      <Footer />
    </>
  );
}
