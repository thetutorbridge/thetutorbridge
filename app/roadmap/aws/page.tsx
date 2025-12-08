'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Cloud,
  Server,
  Database,
  Shield,
  Globe,
  Zap,
  HardDrive,
  Network,
  Lock,
  Layers,
  Settings,
  BarChart3
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
    title: 'AWS Fundamentals',
    icon: Cloud,
    color: 'bg-orange-500',
    steps: [
      {
        id: 1,
        title: 'Cloud Computing Basics',
        description: 'Understand cloud concepts',
        topics: ['What is Cloud', 'AWS Global Infrastructure', 'Regions & AZs', 'AWS Console', 'AWS CLI']
      },
      {
        id: 2,
        title: 'IAM (Identity & Access)',
        description: 'Security and access management',
        topics: ['Users & Groups', 'Policies', 'Roles', 'MFA', 'Instance Profiles', 'Best Practices']
      }
    ],
    milestone: 'You understand AWS basics!'
  },
  {
    title: 'Compute Services',
    icon: Server,
    color: 'bg-blue-500',
    steps: [
      {
        id: 3,
        title: 'EC2 (Virtual Servers)',
        description: 'Core compute service',
        topics: ['Instance Types', 'AMIs', 'Security Groups', 'Key Pairs', 'Elastic IPs', 'User Data']
      },
      {
        id: 4,
        title: 'Auto Scaling & Load Balancing',
        description: 'Scale applications automatically',
        topics: ['Launch Templates', 'Auto Scaling Groups', 'ALB', 'NLB', 'Target Groups', 'Health Checks']
      }
    ]
  },
  {
    title: 'Networking',
    icon: Network,
    color: 'bg-purple-500',
    steps: [
      {
        id: 5,
        title: 'VPC (Virtual Private Cloud)',
        description: 'Network isolation and security',
        topics: ['CIDR Blocks', 'Subnets', 'Route Tables', 'Internet Gateway', 'NAT Gateway', 'NACLs']
      },
      {
        id: 6,
        title: 'Route 53 & CloudFront',
        description: 'DNS and content delivery',
        topics: ['Hosted Zones', 'Record Types', 'Routing Policies', 'Health Checks', 'CDN', 'SSL/TLS']
      }
    ],
    milestone: 'You can design AWS networks!'
  },
  {
    title: 'Storage Services',
    icon: HardDrive,
    color: 'bg-green-500',
    steps: [
      {
        id: 7,
        title: 'S3 (Object Storage)',
        description: 'Scalable object storage',
        topics: ['Buckets', 'Objects', 'Storage Classes', 'Lifecycle Policies', 'Versioning', 'Encryption']
      },
      {
        id: 8,
        title: 'EBS & EFS',
        description: 'Block and file storage',
        topics: ['EBS Volumes', 'Snapshots', 'Volume Types', 'EFS', 'Mount Targets', 'Performance']
      }
    ]
  },
  {
    title: 'Database Services',
    icon: Database,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 9,
        title: 'RDS (Relational)',
        description: 'Managed relational databases',
        topics: ['DB Instances', 'Multi-AZ', 'Read Replicas', 'Backups', 'Aurora', 'Parameter Groups']
      },
      {
        id: 10,
        title: 'DynamoDB (NoSQL)',
        description: 'Managed NoSQL database',
        topics: ['Tables', 'Primary Keys', 'Secondary Indexes', 'Streams', 'Capacity Modes', 'DAX']
      },
      {
        id: 11,
        title: 'ElastiCache',
        description: 'In-memory caching',
        topics: ['Redis', 'Memcached', 'Clusters', 'Replication', 'Use Cases']
      }
    ],
    milestone: 'You can manage AWS databases!'
  },
  {
    title: 'Serverless',
    icon: Zap,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 12,
        title: 'Lambda',
        description: 'Serverless compute',
        topics: ['Functions', 'Triggers', 'Layers', 'Versions', 'Aliases', 'Cold Starts', 'Limits']
      },
      {
        id: 13,
        title: 'API Gateway',
        description: 'Build and manage APIs',
        topics: ['REST APIs', 'HTTP APIs', 'Stages', 'Authorization', 'Throttling', 'CORS']
      },
      {
        id: 14,
        title: 'Other Serverless',
        description: 'Serverless ecosystem',
        topics: ['Step Functions', 'EventBridge', 'SQS', 'SNS', 'Fargate']
      }
    ]
  },
  {
    title: 'Containers',
    icon: Layers,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 15,
        title: 'ECS (Container Service)',
        description: 'Run Docker containers',
        topics: ['Clusters', 'Task Definitions', 'Services', 'Fargate', 'EC2 Launch Type', 'Load Balancing']
      },
      {
        id: 16,
        title: 'EKS (Kubernetes)',
        description: 'Managed Kubernetes',
        topics: ['Clusters', 'Node Groups', 'Pods', 'Services', 'Ingress', 'IAM Integration']
      }
    ]
  },
  {
    title: 'Monitoring & DevOps',
    icon: BarChart3,
    color: 'bg-pink-500',
    steps: [
      {
        id: 17,
        title: 'CloudWatch',
        description: 'Monitoring and observability',
        topics: ['Metrics', 'Alarms', 'Logs', 'Dashboards', 'Events', 'Insights']
      },
      {
        id: 18,
        title: 'Infrastructure as Code',
        description: 'Automate infrastructure',
        topics: ['CloudFormation', 'CDK', 'Terraform', 'Templates', 'Stacks', 'Drift Detection']
      },
      {
        id: 19,
        title: 'CI/CD on AWS',
        description: 'Deployment automation',
        topics: ['CodeCommit', 'CodeBuild', 'CodeDeploy', 'CodePipeline', 'Elastic Beanstalk']
      }
    ],
    milestone: 'You are AWS proficient!'
  },
  {
    title: 'Security & Compliance',
    icon: Shield,
    color: 'bg-red-500',
    steps: [
      {
        id: 20,
        title: 'Security Services',
        description: 'Secure your infrastructure',
        topics: ['KMS', 'Secrets Manager', 'WAF', 'Shield', 'GuardDuty', 'Security Hub']
      },
      {
        id: 21,
        title: 'Compliance & Governance',
        description: 'Meet compliance requirements',
        topics: ['AWS Config', 'CloudTrail', 'Organizations', 'Control Tower', 'Service Control Policies']
      }
    ],
    milestone: 'You are an AWS professional!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$70K - $100K', avg: '$85K' },
  { level: 'Mid (2-5 yrs)', range: '$100K - $145K', avg: '$120K' },
  { level: 'Senior (5-8 yrs)', range: '$145K - $190K', avg: '$165K' },
  { level: 'Architect (8+ yrs)', range: '$190K - $280K+', avg: '$230K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹4L - ₹8L', avg: '₹6L' },
  { level: 'Junior (1-3 yrs)', range: '₹8L - ₹16L', avg: '₹11L' },
  { level: 'Mid (3-5 yrs)', range: '₹16L - ₹30L', avg: '₹22L' },
  { level: 'Senior (5+ yrs)', range: '₹30L - ₹55L+', avg: '₹40L' }
];

// Project Ideas
const projects = [
  {
    title: 'Static Website Hosting',
    level: 'Beginner' as const,
    description: 'Host a static site with S3 and CloudFront',
    skills: ['S3', 'CloudFront', 'Route 53']
  },
  {
    title: 'Serverless REST API',
    level: 'Beginner' as const,
    description: 'Build an API with Lambda and API Gateway',
    skills: ['Lambda', 'API Gateway', 'DynamoDB']
  },
  {
    title: 'Auto-Scaling Web App',
    level: 'Intermediate' as const,
    description: 'Deploy app with auto-scaling and load balancing',
    skills: ['EC2', 'ALB', 'Auto Scaling', 'RDS']
  },
  {
    title: 'CI/CD Pipeline',
    level: 'Intermediate' as const,
    description: 'Automated deployment pipeline',
    skills: ['CodePipeline', 'CodeBuild', 'CodeDeploy']
  },
  {
    title: 'Containerized Microservices',
    level: 'Advanced' as const,
    description: 'Run microservices on ECS/EKS',
    skills: ['ECS', 'Fargate', 'ECR', 'Service Mesh']
  },
  {
    title: 'Multi-Region Architecture',
    level: 'Advanced' as const,
    description: 'Highly available multi-region setup',
    skills: ['Route 53', 'Global Accelerator', 'DynamoDB Global Tables']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to learn AWS?',
    answer: 'With 2-3 hours of daily practice, you can learn core AWS services in 2-3 months and be ready for entry-level roles. Preparing for Solutions Architect Associate certification takes 3-4 months. Becoming proficient across multiple domains takes 1-2 years of hands-on experience.'
  },
  {
    question: 'Which AWS certification should I get first?',
    answer: 'Start with AWS Cloud Practitioner for fundamentals (1-2 months prep). Then pursue Solutions Architect Associate - it\'s the most popular and valuable certification. After that, choose based on your career path: Developer Associate, SysOps Associate, or specialty certifications.'
  },
  {
    question: 'Do I need programming skills for AWS?',
    answer: 'Basic programming knowledge helps, especially for Lambda, automation, and Infrastructure as Code. Python is most commonly used with AWS. However, many AWS roles focus on architecture and operations where programming is less critical. Learn Python basics alongside AWS.'
  },
  {
    question: 'AWS vs Azure vs GCP - which should I learn?',
    answer: 'AWS has the largest market share (32%) and most job postings. Start with AWS - the concepts transfer to other clouds. Once comfortable with AWS, learning Azure or GCP is much easier. Many organizations use multi-cloud, so AWS skills remain valuable regardless.'
  },
  {
    question: 'How much does it cost to practice AWS?',
    answer: 'AWS Free Tier provides 12 months of limited free usage for most services. This is sufficient for learning. Budget $20-50/month for additional practice. Always set billing alerts and clean up resources. Use AWS Calculator to estimate costs before deploying.'
  },
  {
    question: 'What is the best way to learn AWS?',
    answer: 'Combine theory with hands-on practice. Watch tutorials, then immediately implement in your AWS account. Build real projects, not just follow-along exercises. Use the Free Tier extensively. Consider A Cloud Guru, Stephane Maarek courses, or AWS Skill Builder for structured learning.'
  },
  {
    question: 'Is AWS still in demand in 2026?',
    answer: 'Yes, cloud computing demand continues to grow. AWS remains the market leader with consistent growth. Every company is either on the cloud or moving to it. AWS skills are among the most sought-after in tech. The shift to cloud is accelerating, not slowing down.'
  },
  {
    question: 'How do I get my first AWS job?',
    answer: 'Get at least one certification (Cloud Practitioner or Solutions Architect Associate). Build 3-5 projects demonstrating different AWS services. Create architecture diagrams. Contribute to open source projects using AWS. Network on LinkedIn and apply for Cloud Engineer or DevOps roles.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'DevOps Engineer',
    description: 'CI/CD and infrastructure automation',
    href: '/roadmap/devops',
    icon: Settings,
    color: 'bg-orange-500'
  },
  {
    title: 'Backend Developer',
    description: 'Server-side development',
    href: '/roadmap/backend-developer',
    icon: Server,
    color: 'bg-green-500'
  },
  {
    title: 'System Design',
    description: 'Design scalable systems',
    href: '/roadmap/system-design',
    icon: Network,
    color: 'bg-purple-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'AWS Roadmap 2026',
  description: 'Complete guide to learning Amazon Web Services in 2026',
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

export default function AWSRoadmapPage() {
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
          title="AWS Roadmap"
          description="Master Amazon Web Services from fundamentals to advanced architecture. Your complete guide to becoming an AWS professional in 2026."
          duration="3-6 Months"
          difficulty="Beginner Friendly"
          accentColor="#FF9900"
        />

        <WhatIsSection
          title="What is AWS?"
          paragraphs={[
            'Amazon Web Services (AWS) is the world\'s leading cloud platform, offering over 200 services for computing, storage, databases, machine learning, and more. AWS powers millions of applications from startups to enterprises.',
            'As an AWS professional, you will design, deploy, and manage cloud infrastructure, build scalable applications, implement security best practices, and help organizations leverage cloud computing effectively.'
          ]}
          responsibilities={[
            'Design and implement cloud architecture on AWS',
            'Deploy and manage EC2, containers, and serverless',
            'Configure networking, security, and IAM',
            'Set up databases and storage solutions',
            'Implement monitoring and logging',
            'Automate infrastructure with IaC',
            'Optimize costs and performance'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#FF9900"
        />

        <SalarySection
          title="AWS Professional Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="AWS certifications significantly boost earning potential. Solutions Architect and DevOps Engineer roles command premium salaries. Multi-cloud experience (AWS + Azure/GCP) increases marketability."
          gradient="bg-gradient-to-r from-orange-500 to-yellow-500"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your AWS Journey?"
          description="Get personalized guidance from AWS-certified professionals who have built production systems on AWS."
          gradient="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600"
        />
      </main>

      <Footer />
    </>
  );
}
