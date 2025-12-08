'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Shield,
  Network,
  Terminal,
  Lock,
  Search,
  AlertTriangle,
  Server,
  Layers,
  Monitor,
  Award
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
    title: 'IT Fundamentals',
    icon: Monitor,
    color: 'bg-blue-500',
    steps: [
      {
        id: 1,
        title: 'Computer Basics',
        description: 'Understand computer hardware and software',
        topics: ['Hardware Components', 'Operating Systems', 'File Systems', 'Troubleshooting']
      },
      {
        id: 2,
        title: 'Operating Systems',
        description: 'Master Windows and Linux',
        topics: ['Windows Administration', 'Linux CLI', 'Permissions', 'Process Management']
      }
    ],
    milestone: 'You understand IT fundamentals!'
  },
  {
    title: 'Networking',
    icon: Network,
    color: 'bg-green-500',
    steps: [
      {
        id: 3,
        title: 'Network Fundamentals',
        description: 'Learn how networks work',
        topics: ['OSI Model', 'TCP/IP', 'DNS', 'DHCP', 'Subnetting', 'IP Addressing']
      },
      {
        id: 4,
        title: 'Network Devices',
        description: 'Understand network infrastructure',
        topics: ['Routers', 'Switches', 'Firewalls', 'Load Balancers', 'VPNs']
      },
      {
        id: 5,
        title: 'Protocols & Ports',
        description: 'Master common protocols',
        topics: ['HTTP/HTTPS', 'SSH', 'FTP', 'SMTP', 'Common Ports', 'SSL/TLS']
      }
    ],
    milestone: 'You understand networking!'
  },
  {
    title: 'Linux & Terminal',
    icon: Terminal,
    color: 'bg-orange-500',
    steps: [
      {
        id: 6,
        title: 'Linux Administration',
        description: 'Master Linux for security',
        topics: ['Bash Scripting', 'File Permissions', 'User Management', 'Services']
      },
      {
        id: 7,
        title: 'Security Tools',
        description: 'Learn essential CLI tools',
        topics: ['nmap', 'netstat', 'tcpdump', 'Wireshark', 'iptables', 'grep/awk/sed']
      }
    ]
  },
  {
    title: 'Security Fundamentals',
    icon: Lock,
    color: 'bg-purple-500',
    steps: [
      {
        id: 8,
        title: 'Security Concepts',
        description: 'Core security principles',
        topics: ['CIA Triad', 'Defense in Depth', 'Zero Trust', 'Risk Management']
      },
      {
        id: 9,
        title: 'Authentication',
        description: 'Identity and access management',
        topics: ['MFA', 'SSO', 'OAuth', 'Kerberos', 'LDAP', 'Certificates']
      },
      {
        id: 10,
        title: 'Cryptography',
        description: 'Encryption fundamentals',
        topics: ['Symmetric/Asymmetric', 'Hashing', 'PKI', 'Digital Signatures']
      }
    ],
    milestone: 'You know security fundamentals!'
  },
  {
    title: 'Threats & Vulnerabilities',
    icon: AlertTriangle,
    color: 'bg-red-500',
    steps: [
      {
        id: 11,
        title: 'Common Attacks',
        description: 'Understand attack vectors',
        topics: ['Phishing', 'Malware', 'SQL Injection', 'XSS', 'CSRF', 'DDoS']
      },
      {
        id: 12,
        title: 'Vulnerability Management',
        description: 'Find and fix vulnerabilities',
        topics: ['CVEs', 'CVSS', 'Scanning', 'Patch Management', 'OWASP Top 10']
      }
    ]
  },
  {
    title: 'Penetration Testing',
    icon: Search,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 13,
        title: 'Ethical Hacking',
        description: 'Learn offensive security',
        topics: ['Reconnaissance', 'Scanning', 'Exploitation', 'Post-Exploitation']
      },
      {
        id: 14,
        title: 'Pentest Tools',
        description: 'Master hacking tools',
        topics: ['Kali Linux', 'Metasploit', 'Burp Suite', 'John the Ripper', 'Hashcat']
      },
      {
        id: 15,
        title: 'Web App Security',
        description: 'Test web applications',
        topics: ['OWASP Testing', 'API Security', 'Authentication Bypass', 'Injection']
      }
    ],
    milestone: 'You can perform penetration tests!'
  },
  {
    title: 'Security Operations',
    icon: Shield,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 16,
        title: 'SOC Operations',
        description: 'Work in a Security Operations Center',
        topics: ['SIEM', 'Log Analysis', 'Incident Response', 'Threat Hunting']
      },
      {
        id: 17,
        title: 'Forensics',
        description: 'Digital forensics basics',
        topics: ['Evidence Collection', 'Memory Analysis', 'Disk Forensics', 'Chain of Custody']
      }
    ]
  },
  {
    title: 'Certifications',
    icon: Award,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 18,
        title: 'Entry Certifications',
        description: 'Start your certification journey',
        topics: ['CompTIA Security+', 'CompTIA Network+', 'CEH', 'eJPT']
      },
      {
        id: 19,
        title: 'Advanced Certifications',
        description: 'Professional certifications',
        topics: ['OSCP', 'CISSP', 'CISM', 'GPEN', 'GCIH']
      }
    ],
    milestone: 'You are a Cyber Security Professional!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$60K - $85K', avg: '$72K' },
  { level: 'Mid (2-5 yrs)', range: '$85K - $120K', avg: '$100K' },
  { level: 'Senior (5-8 yrs)', range: '$120K - $160K', avg: '$140K' },
  { level: 'Lead (8+ yrs)', range: '$160K - $220K+', avg: '$185K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹4L - ₹8L', avg: '₹6L' },
  { level: 'Junior (1-3 yrs)', range: '₹8L - ₹15L', avg: '₹11L' },
  { level: 'Mid (3-5 yrs)', range: '₹15L - ₹28L', avg: '₹20L' },
  { level: 'Senior (5+ yrs)', range: '₹28L - ₹50L+', avg: '₹35L' }
];

// Project Ideas
const projects = [
  {
    title: 'Home Lab Setup',
    level: 'Beginner' as const,
    description: 'Build a virtual security lab',
    skills: ['VirtualBox', 'Kali Linux', 'Vulnerable VMs']
  },
  {
    title: 'Network Scanner',
    level: 'Beginner' as const,
    description: 'Build a Python port scanner',
    skills: ['Python', 'Sockets', 'nmap']
  },
  {
    title: 'CTF Challenges',
    level: 'Intermediate' as const,
    description: 'Complete HackTheBox machines',
    skills: ['Pentesting', 'Linux', 'Web Exploitation']
  },
  {
    title: 'SIEM Dashboard',
    level: 'Intermediate' as const,
    description: 'Set up ELK stack for log analysis',
    skills: ['Elasticsearch', 'Logstash', 'Kibana']
  },
  {
    title: 'Malware Analysis',
    level: 'Advanced' as const,
    description: 'Analyze malware samples safely',
    skills: ['Reverse Engineering', 'Assembly', 'Sandboxing']
  },
  {
    title: 'Bug Bounty',
    level: 'Advanced' as const,
    description: 'Find vulnerabilities in real apps',
    skills: ['Web Security', 'Burp Suite', 'Reporting']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to become a cyber security professional?',
    answer: 'With dedicated study (3-4 hours daily), you can become entry-level ready in 6-12 months. This includes networking fundamentals, security concepts, and getting CompTIA Security+ certified. Becoming a skilled penetration tester or security engineer typically takes 2-3 years of hands-on experience.'
  },
  {
    question: 'Do I need a degree for cyber security?',
    answer: 'No, a degree is not required. Many successful security professionals are self-taught or have certifications. Employers value practical skills, certifications (Security+, CEH, OSCP), and demonstrable experience (CTFs, bug bounties, home labs). However, a degree can help for some government or enterprise roles.'
  },
  {
    question: 'Which certification should I get first?',
    answer: 'Start with CompTIA Security+ - it is widely recognized, covers fundamentals, and is often required for entry-level roles. After that, choose based on your path: CEH or eJPT for pentesting, CySA+ for SOC analyst, or CCNA for network security. OSCP is the gold standard for penetration testing.'
  },
  {
    question: 'Is coding required for cyber security?',
    answer: 'Basic coding helps significantly. Python is essential for automation and tool development. Bash scripting is needed for Linux administration. For web security, understanding JavaScript, SQL, and PHP helps identify vulnerabilities. You do not need to be an expert programmer, but coding skills accelerate your career.'
  },
  {
    question: 'What is the best way to practice cyber security?',
    answer: 'Build a home lab with VirtualBox and vulnerable VMs (Metasploitable, DVWA). Practice on platforms like HackTheBox, TryHackMe, and PicoCTF. Participate in CTF competitions. Do bug bounty hunting on HackerOne or Bugcrowd. These provide hands-on experience that employers value highly.'
  },
  {
    question: 'Red team vs Blue team - which should I choose?',
    answer: 'Red team (offensive security) involves penetration testing and finding vulnerabilities. Blue team (defensive security) focuses on monitoring, incident response, and hardening systems. Both are valuable. Red team is more glamorous but competitive. Blue team has more job openings. Many professionals do both throughout their career.'
  },
  {
    question: 'How do I get my first cyber security job?',
    answer: 'Start with Security+ certification and an entry-level role like SOC Analyst, IT Support with security focus, or Junior Security Analyst. Build a home lab and document it on GitHub. Complete CTF challenges and list them on your resume. Network on LinkedIn and attend security meetups. Consider internships.'
  },
  {
    question: 'Is cyber security a good career in 2026?',
    answer: 'Yes, cyber security is one of the most in-demand fields. There is a global shortage of security professionals. Every company needs security as cyber attacks increase. Salaries are high and growing. Remote work is common. The field offers diverse specializations from pentesting to cloud security to GRC.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'DevOps Engineer',
    description: 'Infrastructure and deployment',
    href: '/roadmap/devops',
    icon: Server,
    color: 'bg-orange-500'
  },
  {
    title: 'Backend Developer',
    description: 'Server-side programming',
    href: '/roadmap/backend-developer',
    icon: Layers,
    color: 'bg-green-500'
  },
  {
    title: 'Full Stack Developer',
    description: 'Build complete applications',
    href: '/roadmap/full-stack-developer',
    icon: Monitor,
    color: 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66]'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Cyber Security Roadmap 2026',
  description: 'Complete guide to becoming a cyber security professional in 2026',
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

export default function CyberSecurityRoadmapPage() {
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
          title="Cyber Security Roadmap"
          description="Master networking, penetration testing, security operations, and certifications. Your complete guide to becoming a cyber security professional in 2026."
          duration="6-12 Months"
          difficulty="Intermediate"
          accentColor="#EF4444"
        />

        <WhatIsSection
          title="What is Cyber Security?"
          paragraphs={[
            'Cyber security professionals protect organizations from digital threats. They defend networks, systems, and data from hackers, malware, and other cyber attacks. It is one of the most critical and in-demand fields in technology.',
            'As a cyber security professional, you may work as a SOC analyst monitoring threats, a penetration tester finding vulnerabilities, a security engineer building defenses, or a security consultant advising organizations on risk management.'
          ]}
          responsibilities={[
            'Monitor networks and systems for security threats',
            'Conduct penetration tests to find vulnerabilities',
            'Respond to and investigate security incidents',
            'Implement security controls and policies',
            'Perform vulnerability assessments and risk analysis',
            'Configure firewalls, IDS/IPS, and security tools',
            'Train employees on security awareness',
            'Ensure compliance with security standards'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#EF4444"
        />

        <SalarySection
          title="Cyber Security Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Certifications significantly boost salaries. OSCP holders earn 20-30% more. Specialized roles like cloud security and application security pay premium rates. Bug bounty hunters can earn additional income. Government clearances unlock high-paying defense contracts."
          gradient="bg-gradient-to-r from-red-500 to-orange-500"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your Cyber Security Journey?"
          description="Get personalized guidance from experienced security professionals who have protected enterprise systems."
          gradient="bg-gradient-to-r from-red-500 via-orange-500 to-red-500"
        />
      </main>

      <Footer />
    </>
  );
}
