'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Blocks,
  Key,
  Code,
  FileCode,
  Shield,
  Globe,
  Layers,
  Coins,
  Server,
  GitBranch,
  Zap,
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
    title: 'Blockchain Fundamentals',
    icon: Blocks,
    color: 'bg-blue-600',
    steps: [
      {
        id: 1,
        title: 'What is Blockchain',
        description: 'Understand the core concepts',
        topics: ['Distributed Ledger', 'Blocks & Chains', 'Decentralization', 'Immutability', 'Consensus']
      },
      {
        id: 2,
        title: 'How Blockchain Works',
        description: 'Technical understanding',
        topics: ['Mining', 'Nodes', 'Transactions', 'Merkle Trees', 'Block Structure']
      },
      {
        id: 3,
        title: 'Types of Blockchains',
        description: 'Different blockchain categories',
        topics: ['Public vs Private', 'Permissioned', 'Layer 1 vs Layer 2', 'Sidechains']
      }
    ],
    milestone: 'You understand blockchain fundamentals!'
  },
  {
    title: 'Cryptography Basics',
    icon: Key,
    color: 'bg-purple-500',
    steps: [
      {
        id: 4,
        title: 'Cryptographic Primitives',
        description: 'Security foundations',
        topics: ['Hash Functions', 'SHA-256', 'Digital Signatures', 'Public Key Crypto']
      },
      {
        id: 5,
        title: 'Wallets & Keys',
        description: 'Manage crypto assets',
        topics: ['Private Keys', 'Public Keys', 'Wallet Types', 'Seed Phrases', 'HD Wallets']
      }
    ]
  },
  {
    title: 'Programming Prerequisites',
    icon: Code,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 6,
        title: 'JavaScript Essentials',
        description: 'Frontend and Web3 development',
        topics: ['ES6+', 'Async/Await', 'Node.js', 'npm', 'React Basics']
      },
      {
        id: 7,
        title: 'Version Control',
        description: 'Collaborate on projects',
        topics: ['Git', 'GitHub', 'Branching', 'Pull Requests']
      }
    ],
    milestone: 'You have the programming foundation!'
  },
  {
    title: 'Ethereum & EVM',
    icon: Network,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 8,
        title: 'Ethereum Basics',
        description: 'The smart contract platform',
        topics: ['Ethereum Architecture', 'EVM', 'Gas', 'Accounts', 'Transactions']
      },
      {
        id: 9,
        title: 'EVM-Compatible Chains',
        description: 'Expand to other networks',
        topics: ['Polygon', 'BSC', 'Arbitrum', 'Optimism', 'Avalanche']
      }
    ]
  },
  {
    title: 'Smart Contract Development',
    icon: FileCode,
    color: 'bg-green-500',
    steps: [
      {
        id: 10,
        title: 'Solidity Basics',
        description: 'Learn the smart contract language',
        topics: ['Syntax', 'Data Types', 'Functions', 'Modifiers', 'Events']
      },
      {
        id: 11,
        title: 'Advanced Solidity',
        description: 'Complex contract patterns',
        topics: ['Inheritance', 'Interfaces', 'Libraries', 'Assembly', 'Gas Optimization']
      },
      {
        id: 12,
        title: 'Development Frameworks',
        description: 'Tools for building dApps',
        topics: ['Hardhat', 'Foundry', 'Truffle', 'Remix IDE', 'Testing']
      },
      {
        id: 13,
        title: 'Token Standards',
        description: 'Create fungible and non-fungible tokens',
        topics: ['ERC-20', 'ERC-721', 'ERC-1155', 'ERC-4626', 'OpenZeppelin']
      }
    ],
    milestone: 'You can write smart contracts!'
  },
  {
    title: 'Smart Contract Security',
    icon: Shield,
    color: 'bg-red-500',
    steps: [
      {
        id: 14,
        title: 'Common Vulnerabilities',
        description: 'Understand attack vectors',
        topics: ['Reentrancy', 'Integer Overflow', 'Front-running', 'Access Control', 'Flash Loans']
      },
      {
        id: 15,
        title: 'Security Tools',
        description: 'Audit and secure contracts',
        topics: ['Slither', 'Mythril', 'Echidna', 'Formal Verification', 'Bug Bounties']
      }
    ]
  },
  {
    title: 'Web3 & Frontend',
    icon: Globe,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 16,
        title: 'Web3 Libraries',
        description: 'Connect apps to blockchain',
        topics: ['ethers.js', 'web3.js', 'wagmi', 'viem', 'RainbowKit']
      },
      {
        id: 17,
        title: 'dApp Development',
        description: 'Build decentralized applications',
        topics: ['Wallet Connection', 'Contract Interaction', 'Transaction Handling', 'Events']
      },
      {
        id: 18,
        title: 'Infrastructure',
        description: 'Node services and APIs',
        topics: ['Alchemy', 'Infura', 'QuickNode', 'The Graph', 'IPFS']
      }
    ],
    milestone: 'You can build full dApps!'
  },
  {
    title: 'DeFi & Advanced Topics',
    icon: Coins,
    color: 'bg-orange-500',
    steps: [
      {
        id: 19,
        title: 'DeFi Protocols',
        description: 'Decentralized finance',
        topics: ['AMMs', 'Lending', 'Yield Farming', 'Staking', 'Liquidity Pools']
      },
      {
        id: 20,
        title: 'NFTs & DAOs',
        description: 'Digital ownership and governance',
        topics: ['NFT Marketplaces', 'Minting', 'Royalties', 'DAO Governance', 'Voting']
      },
      {
        id: 21,
        title: 'Scaling Solutions',
        description: 'Improve blockchain performance',
        topics: ['Rollups', 'ZK Proofs', 'Optimistic Rollups', 'State Channels', 'Plasma']
      }
    ],
    milestone: 'You are a professional Blockchain Developer!'
  }
];

// Salary Data
const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$80K - $120K', avg: '$100K' },
  { level: 'Mid (2-4 yrs)', range: '$120K - $180K', avg: '$150K' },
  { level: 'Senior (4-6 yrs)', range: '$180K - $280K', avg: '$220K' },
  { level: 'Lead/Principal (6+ yrs)', range: '$280K - $400K+', avg: '$320K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹8L - ₹15L', avg: '₹12L' },
  { level: 'Junior (1-3 yrs)', range: '₹15L - ₹30L', avg: '₹22L' },
  { level: 'Mid (3-5 yrs)', range: '₹30L - ₹55L', avg: '₹40L' },
  { level: 'Senior (5+ yrs)', range: '₹55L - ₹1Cr+', avg: '₹70L' }
];

// Project Ideas
const projects = [
  {
    title: 'Simple Token (ERC-20)',
    level: 'Beginner' as const,
    description: 'Create your own fungible token',
    skills: ['Solidity', 'ERC-20', 'Hardhat']
  },
  {
    title: 'NFT Collection',
    level: 'Beginner' as const,
    description: 'Launch an NFT collection with minting',
    skills: ['Solidity', 'ERC-721', 'IPFS', 'React']
  },
  {
    title: 'Voting dApp',
    level: 'Intermediate' as const,
    description: 'Decentralized voting system',
    skills: ['Solidity', 'ethers.js', 'React', 'Events']
  },
  {
    title: 'DEX (Token Swap)',
    level: 'Advanced' as const,
    description: 'Build an automated market maker',
    skills: ['Solidity', 'DeFi', 'Liquidity Pools', 'Math']
  },
  {
    title: 'Lending Protocol',
    level: 'Advanced' as const,
    description: 'Collateralized lending platform',
    skills: ['Solidity', 'Oracles', 'Interest Rates', 'Security']
  },
  {
    title: 'DAO with Treasury',
    level: 'Intermediate' as const,
    description: 'Governance with proposal voting',
    skills: ['Solidity', 'Governance', 'Multi-sig', 'React']
  }
];

// FAQs
const faqs = [
  {
    question: 'How long does it take to become a blockchain developer?',
    answer: 'With prior programming experience, you can become job-ready in 4-6 months of dedicated study. Complete beginners should add 2-3 months for JavaScript fundamentals. Mastering advanced DeFi and security concepts takes 1-2 years of hands-on experience.'
  },
  {
    question: 'Do I need to know JavaScript before learning blockchain?',
    answer: 'Yes, JavaScript is essential. Most Web3 libraries (ethers.js, web3.js) are JavaScript-based, and dApp frontends use React. Learn JavaScript basics first, then move to Solidity and Web3 development. Python is useful but secondary.'
  },
  {
    question: 'Solidity or Rust - which should I learn?',
    answer: 'Start with Solidity - it has the largest ecosystem (Ethereum, Polygon, BSC, Arbitrum). Rust is needed for Solana development. Most blockchain jobs require Solidity. Learn Rust later if you want to work on Solana or contribute to core protocol development.'
  },
  {
    question: 'Is blockchain development still in demand in 2026?',
    answer: 'Yes, demand remains strong despite market volatility. Enterprise blockchain adoption is growing, DeFi continues evolving, and new use cases emerge constantly. The talent shortage means skilled developers command premium salaries even in bear markets.'
  },
  {
    question: 'How important is smart contract security?',
    answer: 'Extremely important. Billions of dollars have been lost to smart contract exploits. Security is not optional - it\'s a core skill. Learn common vulnerabilities, use security tools, get your code audited, and consider specializing in security auditing for higher pay.'
  },
  {
    question: 'What blockchain should I build on?',
    answer: 'Start with Ethereum and EVM-compatible chains (Polygon, Arbitrum, Optimism). They have the largest ecosystem, most tutorials, and highest job demand. Your skills transfer across all EVM chains. Explore Solana or other chains once you\'re comfortable.'
  },
  {
    question: 'Do I need to understand DeFi to get a job?',
    answer: 'Understanding DeFi basics is increasingly expected. You don\'t need to be an expert, but know how AMMs, lending, and yield farming work conceptually. Many blockchain jobs involve DeFi protocols. Build at least one DeFi-related project for your portfolio.'
  },
  {
    question: 'How do I get my first blockchain developer job?',
    answer: 'Build 3-5 deployed dApps on testnets, contribute to open source Web3 projects, participate in hackathons (ETHGlobal, Gitcoin), and be active in Discord communities. Many jobs come through networking. Consider bug bounties to build reputation and earn while learning.'
  }
];

// Related Roadmaps
const relatedRoadmaps = [
  {
    title: 'JavaScript Developer',
    description: 'Master the Web3 frontend language',
    href: '/roadmap/javascript',
    icon: Code,
    color: 'bg-yellow-500'
  },
  {
    title: 'Full Stack Developer',
    description: 'Build complete applications',
    href: '/roadmap/full-stack-developer',
    icon: Layers,
    color: 'bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66]'
  },
  {
    title: 'Cyber Security',
    description: 'Secure systems and smart contracts',
    href: '/roadmap/cyber-security',
    icon: Shield,
    color: 'bg-red-500'
  }
];

// Schema.org structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Blockchain Developer Roadmap 2026',
  description: 'Complete guide to becoming a blockchain developer in 2026',
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

export default function BlockchainRoadmapPage() {
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
          title="Blockchain Developer Roadmap"
          description="Master Solidity, smart contracts, DeFi, Web3, and decentralized applications. Your complete guide to becoming a professional blockchain developer in 2026."
          duration="4-6 Months"
          difficulty="Intermediate"
          accentColor="#6366F1"
        />

        <WhatIsSection
          title="What is a Blockchain Developer?"
          paragraphs={[
            'Blockchain developers build decentralized applications (dApps), smart contracts, and protocols on blockchain networks. They work at the intersection of cryptography, distributed systems, and software engineering.',
            'As a blockchain developer, you will write secure smart contracts, build Web3 frontends, integrate with DeFi protocols, and create innovative solutions that leverage the power of decentralization.'
          ]}
          responsibilities={[
            'Write and deploy secure smart contracts',
            'Build decentralized applications (dApps)',
            'Integrate Web3 libraries with frontends',
            'Audit and test smart contract security',
            'Work with DeFi protocols and token standards',
            'Implement wallet connections and transactions',
            'Stay updated on blockchain innovations'
          ]}
        />

        <VisualRoadmapSection
          stages={roadmapStages}
          accentColor="#6366F1"
        />

        <SalarySection
          title="Blockchain Developer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Specialize in smart contract security for maximum earning potential. Security auditors and senior Solidity developers command the highest salaries. Remote work is common in Web3, allowing access to global opportunities."
          gradient="bg-gradient-to-r from-indigo-600 to-purple-600"
        />

        <ProjectsSection projects={projects} />

        <FAQSection faqs={faqs} />

        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />

        <CTASection
          title="Ready to Start Your Blockchain Journey?"
          description="Get personalized guidance from experienced blockchain developers who have been where you are."
          gradient="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
        />
      </main>

      <Footer />
    </>
  );
}
