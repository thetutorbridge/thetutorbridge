'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Terminal,
  Server,
  HardDrive,
  Network,
  Shield,
  Settings,
  FileText,
  Users,
  Cpu,
  Box,
  Cloud,
  Wrench
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
    title: 'Linux Basics',
    icon: Terminal,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 1,
        title: 'Introduction to Linux',
        description: 'Understand Linux fundamentals',
        topics: ['Linux History', 'Distributions', 'Installation', 'Desktop vs Server', 'Open Source']
      },
      {
        id: 2,
        title: 'Command Line Basics',
        description: 'Essential commands',
        topics: ['Terminal Navigation', 'ls/cd/pwd', 'mkdir/rm/cp/mv', 'cat/less/head/tail', 'man Pages']
      }
    ],
    milestone: 'You can use the terminal!'
  },
  {
    title: 'File System & Permissions',
    icon: HardDrive,
    color: 'bg-blue-500',
    steps: [
      {
        id: 3,
        title: 'File System Hierarchy',
        description: 'Linux directory structure',
        topics: ['/home', '/etc', '/var', '/usr', '/bin', '/opt', 'Mount Points']
      },
      {
        id: 4,
        title: 'Permissions & Ownership',
        description: 'File security',
        topics: ['chmod', 'chown', 'chgrp', 'Octal Notation', 'SUID/SGID', 'Sticky Bit', 'ACLs']
      }
    ]
  },
  {
    title: 'Text Processing & Editing',
    icon: FileText,
    color: 'bg-green-500',
    steps: [
      {
        id: 5,
        title: 'Text Editors',
        description: 'Edit files in terminal',
        topics: ['Vim', 'Nano', 'Vim Modes', 'Vim Commands', 'Configuration Files']
      },
      {
        id: 6,
        title: 'Text Processing',
        description: 'Manipulate text',
        topics: ['grep', 'sed', 'awk', 'sort', 'cut', 'wc', 'Regular Expressions']
      }
    ]
  },
  {
    title: 'Shell Scripting',
    icon: Terminal,
    color: 'bg-orange-500',
    steps: [
      {
        id: 7,
        title: 'Bash Basics',
        description: 'Write shell scripts',
        topics: ['Variables', 'Input/Output', 'Conditionals', 'Loops', 'Functions', 'Exit Codes']
      },
      {
        id: 8,
        title: 'Advanced Scripting',
        description: 'Complex automation',
        topics: ['Arrays', 'String Manipulation', 'Process Substitution', 'Debugging', 'Best Practices']
      }
    ],
    milestone: 'You can automate tasks!'
  },
  {
    title: 'User & Process Management',
    icon: Users,
    color: 'bg-purple-500',
    steps: [
      {
        id: 9,
        title: 'User Management',
        description: 'Manage users and groups',
        topics: ['useradd/usermod', 'Groups', '/etc/passwd', '/etc/shadow', 'sudo', 'PAM']
      },
      {
        id: 10,
        title: 'Process Management',
        description: 'Control processes',
        topics: ['ps', 'top/htop', 'kill/pkill', 'nice/renice', 'Background Jobs', 'nohup']
      }
    ]
  },
  {
    title: 'Package Management',
    icon: Box,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 11,
        title: 'Package Managers',
        description: 'Install and manage software',
        topics: ['apt/apt-get', 'yum/dnf', 'Repositories', 'Dependencies', 'Compiling from Source']
      }
    ]
  },
  {
    title: 'System Administration',
    icon: Settings,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 12,
        title: 'System Services',
        description: 'Manage services',
        topics: ['systemd', 'systemctl', 'Service Units', 'Boot Process', 'Runlevels/Targets']
      },
      {
        id: 13,
        title: 'Disk Management',
        description: 'Storage administration',
        topics: ['fdisk/parted', 'LVM', 'RAID', 'File Systems', 'Mounting', 'fstab']
      },
      {
        id: 14,
        title: 'Logging & Monitoring',
        description: 'System logs',
        topics: ['journalctl', '/var/log', 'rsyslog', 'Log Rotation', 'Monitoring Tools']
      }
    ],
    milestone: 'You can administer Linux!'
  },
  {
    title: 'Networking',
    icon: Network,
    color: 'bg-teal-500',
    steps: [
      {
        id: 15,
        title: 'Network Basics',
        description: 'Linux networking',
        topics: ['IP Configuration', 'ifconfig/ip', 'netstat/ss', 'DNS', '/etc/hosts', 'NetworkManager']
      },
      {
        id: 16,
        title: 'Network Services',
        description: 'Configure services',
        topics: ['SSH', 'Firewall (iptables/nftables)', 'UFW', 'Port Forwarding', 'VPN']
      },
      {
        id: 17,
        title: 'Network Tools',
        description: 'Troubleshooting',
        topics: ['ping', 'traceroute', 'nslookup/dig', 'curl/wget', 'netcat', 'tcpdump']
      }
    ]
  },
  {
    title: 'Security',
    icon: Shield,
    color: 'bg-red-500',
    steps: [
      {
        id: 18,
        title: 'Linux Security',
        description: 'Secure your systems',
        topics: ['SELinux/AppArmor', 'SSH Hardening', 'Fail2ban', 'Security Updates', 'Auditing']
      },
      {
        id: 19,
        title: 'Backup & Recovery',
        description: 'Data protection',
        topics: ['tar/gzip', 'rsync', 'Backup Strategies', 'Recovery', 'Disaster Planning']
      }
    ]
  },
  {
    title: 'Containers & Cloud',
    icon: Cloud,
    color: 'bg-sky-500',
    steps: [
      {
        id: 20,
        title: 'Containers',
        description: 'Container technology',
        topics: ['Docker Basics', 'Container Commands', 'Volumes', 'Networking', 'Docker Compose']
      },
      {
        id: 21,
        title: 'Cloud & Automation',
        description: 'Modern infrastructure',
        topics: ['AWS/GCP/Azure CLI', 'Ansible Basics', 'Terraform', 'Infrastructure as Code']
      }
    ],
    milestone: 'You are a Linux Administrator!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$55K - $75K', avg: '$65K' },
  { level: 'Mid (2-5 yrs)', range: '$75K - $100K', avg: '$87K' },
  { level: 'Senior (5-8 yrs)', range: '$100K - $140K', avg: '$118K' },
  { level: 'Lead/Architect (8+ yrs)', range: '$130K - $180K+', avg: '$155K' }
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
    title: 'Home Lab Server',
    level: 'Beginner' as const,
    description: 'Set up a Linux server at home',
    skills: ['Installation', 'SSH', 'User Management', 'Services']
  },
  {
    title: 'Automation Scripts',
    level: 'Beginner' as const,
    description: 'Automate daily tasks',
    skills: ['Bash Scripting', 'Cron Jobs', 'Text Processing', 'Logging']
  },
  {
    title: 'Web Server Setup',
    level: 'Intermediate' as const,
    description: 'Configure LAMP/LEMP stack',
    skills: ['Nginx/Apache', 'MySQL', 'PHP', 'SSL', 'Virtual Hosts']
  },
  {
    title: 'Network Monitoring',
    level: 'Intermediate' as const,
    description: 'Build monitoring system',
    skills: ['Nagios/Zabbix', 'SNMP', 'Alerting', 'Dashboards']
  },
  {
    title: 'Container Platform',
    level: 'Advanced' as const,
    description: 'Docker/Kubernetes cluster',
    skills: ['Docker', 'Kubernetes', 'Networking', 'Storage']
  },
  {
    title: 'Infrastructure Automation',
    level: 'Advanced' as const,
    description: 'Ansible-managed infrastructure',
    skills: ['Ansible', 'Terraform', 'CI/CD', 'IaC']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to learn Linux?',
    answer: 'Basic command line skills take 2-4 weeks. System administration fundamentals require 3-4 months. Becoming proficient enough for a job takes 6-9 months. Mastery of advanced topics like security and automation takes 1-2 years of practice.'
  },
  {
    question: 'Which Linux distribution should I start with?',
    answer: 'Ubuntu or Linux Mint for beginners - great documentation and community. For servers, learn Ubuntu Server or CentOS/Rocky Linux. Once comfortable, try Fedora or Arch. Distribution matters less than understanding Linux concepts that transfer across all distros.'
  },
  {
    question: 'Is Linux certification worth it?',
    answer: 'Yes, especially RHCSA (Red Hat) and LPIC. They validate skills and are recognized by employers. RHCSA is most valued in enterprise. CompTIA Linux+ is good for beginners. Certifications help get past HR filters but practical skills matter more in interviews.'
  },
  {
    question: 'Can I learn Linux on Windows?',
    answer: 'Yes, use WSL2 (Windows Subsystem for Linux) for an integrated experience. Virtual machines (VirtualBox, VMware) work well for full Linux environments. Cloud instances (AWS free tier) provide real server experience. Dual-boot for complete immersion.'
  },
  {
    question: 'Linux Administrator vs DevOps Engineer?',
    answer: 'Linux admins focus on system management, security, and maintenance. DevOps combines development and operations with automation, CI/CD, and cloud. Linux skills are foundational for DevOps. Many admins transition to DevOps for higher salaries.'
  },
  {
    question: 'Is Linux administration a good career?',
    answer: 'Excellent career with strong demand. Linux runs 96% of web servers, cloud infrastructure, and most containers. Skills are foundational for DevOps, SRE, and cloud roles. Job security is high as Linux adoption continues growing.'
  },
  {
    question: 'Do I need to memorize all commands?',
    answer: 'No, understanding concepts matters more than memorization. Learn to use man pages and --help. Know common commands well; look up obscure ones. Build muscle memory through practice. Command proficiency comes naturally with daily use.'
  },
  {
    question: 'Should I learn shell scripting?',
    answer: 'Absolutely essential. Bash scripting automates repetitive tasks, making you more efficient. Required for system administration, DevOps, and most Linux roles. Start with basic scripts, gradually add complexity. It\'s one of the most valuable Linux skills.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'DevOps Engineer',
    description: 'Build on Linux skills',
    href: '/roadmap/devops',
    icon: Settings,
    color: 'bg-orange-500'
  },
  {
    title: 'AWS',
    description: 'Cloud infrastructure',
    href: '/roadmap/aws',
    icon: Cloud,
    color: 'bg-yellow-500'
  },
  {
    title: 'Cyber Security',
    description: 'Security specialization',
    href: '/roadmap/cyber-security',
    icon: Shield,
    color: 'bg-red-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Linux Roadmap 2026',
  description: 'Complete guide to learning Linux in 2026',
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

export default function LinuxRoadmapPage() {
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
          title="Linux Roadmap"
          description="Master command line, shell scripting, system administration, networking, security, and DevOps. Your complete guide to learning Linux in 2026."
          duration="4-8 Months"
          difficulty="Beginner Friendly"
          accentColor="#FCC624"
        />

        <WhatIsSection
          title="What is a Linux Administrator?"
          paragraphs={[
            'Linux administrators manage and maintain Linux-based servers and systems. They ensure system reliability, security, and performance while automating routine tasks and troubleshooting issues.',
            'As a Linux administrator, you will configure servers, manage users and permissions, write automation scripts, monitor system health, implement security measures, and support development teams.'
          ]}
          responsibilities={[
            'Install and configure Linux systems',
            'Manage users, groups, and permissions',
            'Write shell scripts for automation',
            'Monitor system performance and logs',
            'Implement security and backup strategies',
            'Configure networking and firewalls',
            'Troubleshoot system issues'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#FCC624"
        />

        <SalarySection
          title="Linux Administrator Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Linux skills command premium salaries when combined with cloud (AWS, GCP) or DevOps expertise. RHCSA/RHCE certifications increase earning potential. Remote positions at US companies offer excellent compensation for experienced administrators."
          gradient="bg-gradient-to-r from-yellow-500 to-orange-500"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your Linux Journey?"
          description="Get personalized guidance from experienced Linux professionals who have managed enterprise infrastructure."
          gradient="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"
        />
      </main>

      <Footer />
    </>
  );
}
