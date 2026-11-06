'use client';

import React from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import {
  TrendingUp,
  DollarSign,
  CheckCircle,
  Star,
  ChevronDown,
  Home,
  Zap,
  Award,
  Shield,
  Sparkles,
  ArrowRight,
  Linkedin,
  FileText,
  Scale
} from 'lucide-react';

// Helper function to extract domain from website URL
const getDomainFromUrl = (url: string): string => {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
};

// Local logo paths for AI Contract Generator tools
const localLogoPaths: { [key: string]: string } = {
  "Juro": "/juro logo.png",
  "Ironclad": "/ironclad logo.png",
  "DocuSign CLM": "/docusign logo.png",
  "ContractPodAi": "/contractpodai logo.png",
  "Icertis": "/icertis logo.png",
  "Agiloft": "/agiloft logo.png",
  "PandaDoc": "/pandadoc logo.png",
  "Concord": "/concord logo.png",
  "Precisely": "/precisely logo.png",
  "SpotDraft": "/spotdraft logo.png",
  "LinkSquares": "/linksquares logo.png",
  "Evisort": "/evisort logo.png",
  "LawGeex": "/lawgeex logo.png",
  "Lexion": "/lexion logo.png",
  "ContractWorks": "/contractworks logo.png",
  "Proposify": "/proposify logo.png",
  "HoneyBook": "/honeybook logo.png",
  "Contractbook": "/contractbook logo.png",
};

// Custom domain mappings for fallback
const customLogoDomains: { [key: string]: string } = {
  "Juro": "juro.com",
  "Ironclad": "ironcladhq.com",
  "DocuSign CLM": "docusign.com",
  "ContractPodAi": "contractpodai.com",
  "Icertis": "icertis.com",
  "Agiloft": "agiloft.com",
  "PandaDoc": "pandadoc.com",
  "Concord": "concordnow.com",
  "Precisely": "precisely.com",
  "SpotDraft": "spotdraft.com",
  "LinkSquares": "linksquares.com",
  "Evisort": "evisort.com",
  "LawGeex": "lawgeex.com",
  "Lexion": "lexion.ai",
  "ContractWorks": "contractworks.com",
  "Proposify": "proposify.com",
  "HoneyBook": "honeybook.com",
  "Contractbook": "contractbook.com",
};

// Premium Logo component
const ToolLogo = ({ name, website, size = 40 }: { name: string; website: string; size?: number }) => {
  const [hasError, setHasError] = React.useState(false);
  const localPath = localLogoPaths[name];

  if (localPath && !hasError) {
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <img
          src={localPath}
          alt={`${name} logo`}
          width={size}
          height={size}
          className="rounded-xl object-contain bg-white shadow-sm ring-1 ring-gray-100"
          onError={() => setHasError(true)}
          style={{ width: size, height: size }}
        />
      </div>
    );
  }

  const domain = customLogoDomains[name] || getDomainFromUrl(website);

  if (hasError || !domain) {
    return (
      <div
        className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl flex items-center justify-center text-white font-semibold shadow-sm"
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <img
      src={`https://img.logo.dev/${domain}?token=pk_VAZ6PckCTbmKsFgtpWmVOA`}
      alt={`${name} logo`}
      width={size}
      height={size}
      className="rounded-xl object-contain bg-white shadow-sm ring-1 ring-gray-100"
      onError={() => setHasError(true)}
      style={{ width: size, height: size }}
    />
  );
};

// AI Contract Generator Tools Data - 18 Tools
const contractTools = [
  {
    id: 1,
    name: "Juro",
    category: "AI Contract Automation",
    bestFor: "End-to-end contract automation",
    pricing: "Paid",
    pricingDetails: "Custom pricing / Starting around $500/mo",
    website: "https://juro.com",
    rating: 4.7,
    difficulty: "Intermediate",
    description: "Juro is an AI-native contract automation platform that enables legal and business teams to create, execute, and manage contracts in one unified workspace. Its browser-based editor and AI assistant help teams work 10x faster on routine contracts.",
    keyFeatures: [
      "AI contract assistant",
      "Browser-based editor",
      "Automated workflows",
      "Template library",
      "E-signature built-in",
      "Analytics dashboard"
    ],
    pros: [
      "Intuitive modern interface",
      "Strong AI capabilities",
      "Fast implementation",
      "Excellent collaboration"
    ],
    cons: [
      "Premium pricing",
      "Better for mid-market+",
      "Limited integrations vs legacy",
      "Newer platform"
    ],
    useCases: ["Legal teams", "Sales operations", "HR departments", "Procurement teams"]
  },
  {
    id: 2,
    name: "Ironclad",
    category: "AI Contract Automation",
    bestFor: "Enterprise digital contracting",
    pricing: "Paid",
    pricingDetails: "Custom enterprise pricing",
    website: "https://ironcladhq.com",
    rating: 4.8,
    difficulty: "Advanced",
    description: "Ironclad is a leading enterprise contract lifecycle management platform trusted by companies like Dropbox, L'Oreal, and Mastercard. Its AI-powered Clickwrap, workflow automation, and repository features streamline the entire contract process.",
    keyFeatures: [
      "AI contract review",
      "Workflow designer",
      "Smart repository",
      "Clickwrap agreements",
      "Advanced analytics",
      "Enterprise integrations"
    ],
    pros: [
      "Enterprise-grade security",
      "Powerful workflow automation",
      "Excellent AI extraction",
      "Strong Salesforce integration"
    ],
    cons: [
      "High price point",
      "Complex implementation",
      "Steep learning curve",
      "Requires dedicated admin"
    ],
    useCases: ["Enterprise legal", "Large sales teams", "Corporate procurement", "Compliance teams"]
  },
  {
    id: 3,
    name: "DocuSign CLM",
    category: "AI Contract Automation",
    bestFor: "Complete agreement cloud",
    pricing: "Paid",
    pricingDetails: "Custom pricing / Enterprise plans",
    website: "https://www.docusign.com/products/clm",
    rating: 4.5,
    difficulty: "Intermediate",
    description: "DocuSign CLM (Contract Lifecycle Management) extends DocuSign's famous e-signature platform with AI-powered contract generation, negotiation, and management. It provides end-to-end agreement automation integrated with the world's leading e-signature solution.",
    keyFeatures: [
      "AI contract generation",
      "Clause library",
      "Negotiation workflows",
      "DocuSign eSignature integration",
      "Contract analytics",
      "Obligation management"
    ],
    pros: [
      "Trusted DocuSign brand",
      "Seamless e-signature",
      "Strong ecosystem",
      "Global compliance"
    ],
    cons: [
      "Can be expensive",
      "Complex setup",
      "Some features lack depth",
      "Better with full suite"
    ],
    useCases: ["DocuSign customers", "Enterprise agreements", "Global organizations", "Regulated industries"]
  },
  {
    id: 4,
    name: "ContractPodAi",
    category: "AI Contract Automation",
    bestFor: "AI-first contract management",
    pricing: "Paid",
    pricingDetails: "Custom pricing based on users & volume",
    website: "https://contractpodai.com",
    rating: 4.6,
    difficulty: "Intermediate",
    description: "ContractPodAi is an AI-powered contract management platform built on Microsoft Azure. It uses advanced machine learning to automate contract creation, review, and analysis, helping legal teams reduce manual work by up to 80%.",
    keyFeatures: [
      "AI contract review",
      "Smart clause extraction",
      "Risk identification",
      "Template automation",
      "Microsoft integration",
      "Contract analytics"
    ],
    pros: [
      "Strong AI capabilities",
      "Microsoft ecosystem",
      "Good implementation support",
      "Comprehensive training"
    ],
    cons: [
      "Enterprise-focused pricing",
      "Requires configuration",
      "Learning curve",
      "Limited small biz options"
    ],
    useCases: ["Corporate legal", "Microsoft-centric orgs", "Contract-heavy businesses", "Risk management"]
  },
  {
    id: 5,
    name: "Icertis",
    category: "AI Contract Automation",
    bestFor: "Enterprise contract intelligence",
    pricing: "Paid",
    pricingDetails: "Enterprise custom pricing",
    website: "https://www.icertis.com",
    rating: 4.7,
    difficulty: "Advanced",
    description: "Icertis is an enterprise contract intelligence platform used by Fortune 100 companies like Microsoft, Johnson & Johnson, and Cognizant. Its AI transforms contracts into strategic business assets with unmatched compliance and risk management.",
    keyFeatures: [
      "Contract AI engine",
      "Risk scoring",
      "Compliance tracking",
      "Obligation management",
      "Spend analytics",
      "Global scalability"
    ],
    pros: [
      "Industry leader",
      "Powerful AI analytics",
      "Enterprise proven",
      "Comprehensive compliance"
    ],
    cons: [
      "Very high cost",
      "Long implementation",
      "Complex for SMBs",
      "Requires commitment"
    ],
    useCases: ["Fortune 500", "Global enterprises", "Heavily regulated industries", "Complex supply chains"]
  },
  {
    id: 6,
    name: "Agiloft",
    category: "AI Contract Automation",
    bestFor: "No-code CLM customization",
    pricing: "Paid",
    pricingDetails: "From $65/user/mo to enterprise custom",
    website: "https://www.agiloft.com",
    rating: 4.6,
    difficulty: "Intermediate",
    description: "Agiloft is a highly customizable no-code contract lifecycle management platform with AI capabilities. Its flexibility allows organizations to configure complex workflows without developers, making it ideal for unique contracting processes.",
    keyFeatures: [
      "No-code customization",
      "AI contract analysis",
      "Workflow automation",
      "Custom reporting",
      "Integration hub",
      "Compliance tools"
    ],
    pros: [
      "Extremely flexible",
      "No-code configuration",
      "Strong automation",
      "Good value for features"
    ],
    cons: [
      "Can be overwhelming",
      "Dated UI design",
      "Customization takes time",
      "Admin training needed"
    ],
    useCases: ["Legal operations", "IT procurement", "Complex workflows", "Custom requirements"]
  },
  {
    id: 7,
    name: "PandaDoc",
    category: "Document Automation",
    bestFor: "Sales document automation",
    pricing: "Freemium",
    pricingDetails: "Free plan / $35/user/mo (Business) to $65/user/mo (Enterprise)",
    website: "https://www.pandadoc.com",
    rating: 4.5,
    difficulty: "Beginner",
    description: "PandaDoc is a popular document automation platform that helps teams create, send, and track contracts, proposals, and quotes. Its AI-powered features include content suggestions, smart templates, and automated workflows for faster deal closure.",
    keyFeatures: [
      "AI content assistant",
      "Template builder",
      "E-signatures",
      "CRM integrations",
      "Document analytics",
      "Payment collection"
    ],
    pros: [
      "Easy to use",
      "Great CRM integrations",
      "Affordable pricing",
      "Fast implementation"
    ],
    cons: [
      "Less robust CLM features",
      "Limited for complex contracts",
      "Basic approval workflows",
      "Not ideal for legal teams"
    ],
    useCases: ["Sales teams", "Small businesses", "Proposals & quotes", "Simple contracts"]
  },
  {
    id: 8,
    name: "Concord",
    category: "Document Automation",
    bestFor: "Collaborative contract management",
    pricing: "Paid",
    pricingDetails: "From $17/user/mo to custom enterprise",
    website: "https://www.concordnow.com",
    rating: 4.4,
    difficulty: "Beginner",
    description: "Concord is a user-friendly contract management platform focused on collaboration and ease of use. It enables teams to draft, negotiate, sign, and manage contracts in one place with real-time collaboration and version control.",
    keyFeatures: [
      "Real-time collaboration",
      "Version control",
      "E-signature included",
      "Template library",
      "Approval workflows",
      "Contract tracking"
    ],
    pros: [
      "Very intuitive",
      "Affordable pricing",
      "Good collaboration",
      "Quick to implement"
    ],
    cons: [
      "Limited AI features",
      "Basic analytics",
      "Fewer integrations",
      "Not for complex needs"
    ],
    useCases: ["Small teams", "Startups", "Simple contracts", "Budget-conscious orgs"]
  },
  {
    id: 9,
    name: "Precisely",
    category: "AI Contract Automation",
    bestFor: "Data-driven contract intelligence",
    pricing: "Paid",
    pricingDetails: "Custom pricing",
    website: "https://www.precisely.com",
    rating: 4.3,
    difficulty: "Advanced",
    description: "Precisely offers data integrity and contract intelligence solutions that help organizations extract value from their contracts. Its AI-powered tools provide deep insights into contract data for better decision-making and risk management.",
    keyFeatures: [
      "AI data extraction",
      "Contract analytics",
      "Risk assessment",
      "Data integration",
      "Compliance monitoring",
      "Business intelligence"
    ],
    pros: [
      "Strong data capabilities",
      "Excellent extraction",
      "Enterprise-ready",
      "Good compliance tools"
    ],
    cons: [
      "Complex implementation",
      "Requires data expertise",
      "High cost",
      "Steep learning curve"
    ],
    useCases: ["Data-driven legal", "Large enterprises", "Compliance teams", "Analytics-focused orgs"]
  },
  {
    id: 10,
    name: "SpotDraft",
    category: "AI Contract Automation",
    bestFor: "Modern legal teams",
    pricing: "Paid",
    pricingDetails: "Custom pricing / Mid-market focus",
    website: "https://www.spotdraft.com",
    rating: 4.6,
    difficulty: "Beginner",
    description: "SpotDraft is an AI-first contract management platform designed for modern legal teams. It combines contract creation, negotiation, execution, and analytics in one intuitive platform with strong AI assistance for faster turnaround.",
    keyFeatures: [
      "AI contract drafting",
      "Smart redlining",
      "Workflow automation",
      "Template management",
      "E-signature integration",
      "Contract repository"
    ],
    pros: [
      "Modern, clean UI",
      "Strong AI assistance",
      "Fast implementation",
      "Great customer support"
    ],
    cons: [
      "Newer platform",
      "Growing feature set",
      "Limited enterprise features",
      "Smaller ecosystem"
    ],
    useCases: ["Legal teams", "Fast-growing startups", "Tech companies", "In-house counsel"]
  },
  {
    id: 11,
    name: "LinkSquares",
    category: "AI Contract Analytics",
    bestFor: "AI-powered contract analytics",
    pricing: "Paid",
    pricingDetails: "Custom pricing based on contract volume",
    website: "https://linksquares.com",
    rating: 4.5,
    difficulty: "Intermediate",
    description: "LinkSquares is an AI-powered contract analytics platform that helps legal teams find answers in their contracts instantly. Its machine learning extracts key data points, tracks obligations, and provides insights across your entire contract portfolio.",
    keyFeatures: [
      "AI contract analysis",
      "Smart search",
      "Data extraction",
      "Obligation tracking",
      "Custom reporting",
      "Integration APIs"
    ],
    pros: [
      "Excellent AI search",
      "Fast data extraction",
      "Easy to implement",
      "Strong analytics"
    ],
    cons: [
      "Analytics-focused only",
      "Limited creation tools",
      "Premium pricing",
      "Requires contract volume"
    ],
    useCases: ["Legal analytics", "M&A due diligence", "Contract audits", "Risk assessment"]
  },
  {
    id: 12,
    name: "Evisort",
    category: "AI Contract Analytics",
    bestFor: "Contract intelligence platform",
    pricing: "Paid",
    pricingDetails: "Custom enterprise pricing",
    website: "https://www.evisort.com",
    rating: 4.6,
    difficulty: "Intermediate",
    description: "Evisort is an AI contract intelligence platform that automatically reads, analyzes, and organizes contracts. Its advanced AI understands contract language to extract data, identify risks, and surface insights across thousands of documents.",
    keyFeatures: [
      "AI document analysis",
      "Automatic extraction",
      "Risk identification",
      "Smart organization",
      "Workflow automation",
      "Obligation management"
    ],
    pros: [
      "Powerful AI analysis",
      "High accuracy",
      "Fast processing",
      "Good visualization"
    ],
    cons: [
      "Enterprise pricing",
      "Setup complexity",
      "Requires training",
      "Analytics-heavy focus"
    ],
    useCases: ["Legal operations", "Contract intelligence", "Due diligence", "Compliance review"]
  },
  {
    id: 13,
    name: "LawGeex",
    category: "AI Contract Review",
    bestFor: "Automated contract review",
    pricing: "Paid",
    pricingDetails: "Custom pricing based on volume",
    website: "https://www.lawgeex.com",
    rating: 4.5,
    difficulty: "Beginner",
    description: "LawGeex uses AI to automate the review of routine contracts, comparing them against your company's policies and legal playbook. It accelerates contract review from days to minutes while ensuring consistency and reducing risk.",
    keyFeatures: [
      "AI contract review",
      "Policy compliance check",
      "Risk scoring",
      "Playbook enforcement",
      "Redline suggestions",
      "Audit trail"
    ],
    pros: [
      "Fast review automation",
      "High accuracy",
      "Easy to deploy",
      "Consistent results"
    ],
    cons: [
      "Review-focused only",
      "Requires playbook setup",
      "Limited contract types",
      "Not full CLM"
    ],
    useCases: ["Contract review teams", "High-volume contracts", "Legal departments", "Compliance teams"]
  },
  {
    id: 14,
    name: "Lexion",
    category: "AI Contract Automation",
    bestFor: "AI-powered contract management",
    pricing: "Paid",
    pricingDetails: "Custom pricing / Mid-market focus",
    website: "https://lexion.ai",
    rating: 4.5,
    difficulty: "Beginner",
    description: "Lexion is an AI contract management platform that automatically organizes contracts, extracts key terms, and tracks obligations. Built by former Microsoft engineers, it uses advanced NLP to make contracts searchable and actionable.",
    keyFeatures: [
      "AI organization",
      "Term extraction",
      "Email integration",
      "Obligation tracking",
      "Smart alerts",
      "Quick implementation"
    ],
    pros: [
      "Easy implementation",
      "Strong AI extraction",
      "Works with email",
      "User-friendly"
    ],
    cons: [
      "Limited drafting tools",
      "Newer platform",
      "Growing integrations",
      "Not for complex workflows"
    ],
    useCases: ["Growing companies", "Legal teams", "Contract tracking", "Renewal management"]
  },
  {
    id: 15,
    name: "ContractWorks",
    category: "Contract Repository",
    bestFor: "Simple contract storage",
    pricing: "Paid",
    pricingDetails: "From $600/mo to $2,000/mo",
    website: "https://www.contractworks.com",
    rating: 4.3,
    difficulty: "Beginner",
    description: "ContractWorks is a straightforward contract management solution focused on secure storage, organization, and retrieval. Its AI-powered search and OCR capabilities make finding contracts and key terms fast and easy.",
    keyFeatures: [
      "AI-powered search",
      "OCR scanning",
      "Secure repository",
      "Milestone alerts",
      "User permissions",
      "Reporting tools"
    ],
    pros: [
      "Easy to use",
      "Fast implementation",
      "Affordable",
      "Good support"
    ],
    cons: [
      "Limited automation",
      "Basic workflows",
      "No contract creation",
      "Simpler feature set"
    ],
    useCases: ["Contract storage", "Small legal teams", "Simple needs", "Budget-conscious orgs"]
  },
  {
    id: 16,
    name: "Proposify",
    category: "Document Automation",
    bestFor: "Proposal & contract creation",
    pricing: "Paid",
    pricingDetails: "$49/user/mo (Team) to $590/mo flat (Business)",
    website: "https://www.proposify.com",
    rating: 4.4,
    difficulty: "Beginner",
    description: "Proposify is a proposal software that helps sales teams create beautiful, on-brand proposals and contracts. Its AI-powered content library and templates enable faster document creation with consistent messaging and design.",
    keyFeatures: [
      "Template builder",
      "Content library",
      "E-signatures",
      "Analytics dashboard",
      "CRM integrations",
      "Team collaboration"
    ],
    pros: [
      "Beautiful templates",
      "Easy to use",
      "Good analytics",
      "Sales-focused"
    ],
    cons: [
      "Proposal-focused",
      "Limited CLM features",
      "Basic approval workflows",
      "Not for legal teams"
    ],
    useCases: ["Sales teams", "Agencies", "Proposals", "Simple contracts"]
  },
  {
    id: 17,
    name: "HoneyBook",
    category: "Document Automation",
    bestFor: "Creative business contracts",
    pricing: "Paid",
    pricingDetails: "$19/mo (Starter) to $79/mo (Premium)",
    website: "https://www.honeybook.com",
    rating: 4.6,
    difficulty: "Beginner",
    description: "HoneyBook is a client management platform for creative professionals that includes AI-powered contract creation. It helps photographers, designers, and consultants create professional contracts, collect signatures, and manage payments in one place.",
    keyFeatures: [
      "Smart templates",
      "E-signatures",
      "Payment processing",
      "Client portal",
      "Workflow automation",
      "Mobile app"
    ],
    pros: [
      "All-in-one solution",
      "Beautiful design",
      "Affordable",
      "Easy for non-lawyers"
    ],
    cons: [
      "For creatives only",
      "Basic contract features",
      "Limited customization",
      "Not for complex contracts"
    ],
    useCases: ["Photographers", "Designers", "Consultants", "Creative freelancers"]
  },
  {
    id: 18,
    name: "Contractbook",
    category: "AI Contract Automation",
    bestFor: "Automated contract workflows",
    pricing: "Freemium",
    pricingDetails: "Free plan / From $49/user/mo to custom",
    website: "https://contractbook.com",
    rating: 4.4,
    difficulty: "Beginner",
    description: "Contractbook is a modern contract automation platform from Denmark that uses AI to streamline the entire contract lifecycle. It offers smart templates, automated workflows, and data extraction to help teams work faster on contracts.",
    keyFeatures: [
      "AI data extraction",
      "Smart templates",
      "Automated workflows",
      "E-signatures",
      "Contract analytics",
      "API integrations"
    ],
    pros: [
      "Modern interface",
      "Good automation",
      "Free plan available",
      "European compliance"
    ],
    cons: [
      "Smaller ecosystem",
      "Growing feature set",
      "Limited US presence",
      "Newer platform"
    ],
    useCases: ["European companies", "SMBs", "Legal teams", "HR contracts"]
  }
];

// FAQ Data
const faqs = [
  {
    question: "What is an AI contract generator?",
    answer: "An AI contract generator is software that uses artificial intelligence to automatically create, review, and manage legal contracts. These tools use natural language processing (NLP) and machine learning to understand contract language, suggest clauses, extract key terms, and automate repetitive contract tasks that traditionally required manual legal review."
  },
  {
    question: "How accurate are AI contract generators?",
    answer: "Modern AI contract generators achieve 85-95% accuracy for routine contract tasks like data extraction and clause identification. However, they work best as assistants to legal professionals rather than replacements. Complex negotiations, unusual terms, and high-stakes contracts still benefit from human legal expertise and review."
  },
  {
    question: "Can AI contract tools replace lawyers?",
    answer: "No, AI contract tools are designed to augment lawyers, not replace them. They handle routine, repetitive tasks like first-pass review, data extraction, and template generation, freeing lawyers to focus on complex negotiations, strategic advice, and high-value work. The best results come from humans and AI working together."
  },
  {
    question: "What's the difference between CLM and contract generators?",
    answer: "Contract Lifecycle Management (CLM) platforms manage the entire contract process from creation to renewal, including workflows, approvals, and storage. AI contract generators specifically focus on creating and drafting contracts. Many modern CLM platforms now include AI generation features, offering both capabilities in one solution."
  },
  {
    question: "Are AI-generated contracts legally binding?",
    answer: "Yes, AI-generated contracts can be legally binding if they meet standard contract requirements: offer, acceptance, consideration, and mutual intent. The AI is simply a tool for drafting—the legal validity depends on the contract's content and proper execution, not how it was created. Always have important contracts reviewed by a qualified attorney."
  },
  {
    question: "How much do AI contract tools cost?",
    answer: "Pricing varies widely: simple tools like PandaDoc start around $35/user/month, mid-market platforms like Juro or SpotDraft range from $200-500/month, and enterprise solutions like Ironclad or Icertis have custom pricing often exceeding $50,000/year. Most offer volume-based or per-user pricing models."
  },
  {
    question: "What features should I look for in contract AI software?",
    answer: "Key features include: AI-powered drafting and templates, clause libraries, automated review and redlining, e-signature integration, contract repository with smart search, workflow automation, analytics and reporting, and integrations with your CRM, ERP, or other business systems. Prioritize based on your specific workflow needs."
  },
  {
    question: "How long does it take to implement contract AI?",
    answer: "Implementation varies by complexity: simple tools like PandaDoc or Concord can be set up in days, mid-market platforms like SpotDraft or Juro typically take 2-4 weeks, and enterprise solutions like Ironclad or Icertis may require 3-6 months for full deployment including integrations, training, and template configuration."
  },
  {
    question: "Is my contract data safe with AI tools?",
    answer: "Reputable contract AI vendors prioritize security with SOC 2 compliance, encryption at rest and in transit, role-based access controls, and audit trails. Enterprise platforms often offer additional security features like SSO, dedicated instances, and custom data retention policies. Always review vendor security certifications before purchasing."
  },
  {
    question: "Can AI contract tools integrate with my existing software?",
    answer: "Most modern contract AI platforms offer integrations with popular business tools including Salesforce, HubSpot, Microsoft 365, Google Workspace, Slack, and various ERPs. Enterprise platforms typically offer APIs for custom integrations. Check specific integration availability with each vendor, as capabilities vary significantly."
  }
];

export default function BestAIContractGeneratorsPage() {
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");

  const categories = ["All", ...Array.from(new Set(contractTools.map(tool => tool.category)))];

  const filteredTools = selectedCategory === "All"
    ? contractTools
    : contractTools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "18 Best AI Contract Generators for 2026 - Complete Guide",
            "description": "Comprehensive guide to the best AI contract generators in 2026. Compare features, pricing, pros & cons of top platforms including Juro, Ironclad, DocuSign CLM, and more.",
            "author": {
              "@type": "Organization",
              "name": "The Tutor Bridge"
            },
            "publisher": {
              "@type": "Organization",
              "name": "The Tutor Bridge",
              "logo": {
                "@type": "ImageObject",
                "url": "https://thetutorbridge.com/logo.png"
              }
            },
            "datePublished": "2026-11-06",
            "dateModified": "2026-11-06"
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": contractTools.slice(0, 10).map((tool, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": tool.name,
              "description": tool.description
            }))
          })
        }}
      />

      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 py-3 px-4 sm:px-6 sticky top-0 z-40">
        <div className="container mx-auto max-w-6xl">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-indigo-700 flex items-center transition-colors">
              <Home className="w-3.5 h-3.5 mr-1" />
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/marketing" className="hover:text-indigo-700 transition-colors">Marketing</Link>
            <span className="text-gray-300">/</span>
            <span className="text-indigo-700 font-medium">Best AI Contract Generators</span>
          </nav>
        </div>
      </div>

      {/* Premium Hero Section */}
      <section className="relative overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #312e81 0%, #4f46e5 50%, #312e81 100%)' }}>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

        <div className="relative py-20 md:py-28 px-4 sm:px-6">
          <div className="container mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-8">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-gray-100">Curated & Updated for 2026</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight text-white">
              The Definitive Guide to
              <span className="block text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #a5b4fc, #c7d2fe, #a5b4fc)' }}>
                AI Contract Generators
              </span>
            </h1>

            {/* Author Byline */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <img
                src="/rishabh-jain.webp"
                alt="Rishabh Jain"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white/30"
              />
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-300">By</span>
                <a
                  href="https://www.linkedin.com/in/rishabh-jain-33b946214/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-white hover:text-indigo-200 transition-colors flex items-center gap-1"
                >
                  Rishabh Jain
                  <Linkedin className="w-4 h-4" />
                </a>
                <span className="text-gray-400">·</span>
                <span className="text-gray-400">Nov 2026</span>
              </div>
            </div>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
              18 meticulously reviewed tools for contract automation, AI drafting, and legal ops.
              From startup-friendly platforms to enterprise CLM solutions.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">18</div>
                <div className="text-sm text-gray-400 mt-1">Tools Reviewed</div>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-4xl font-bold text-white">5</div>
                <div className="text-sm text-gray-400 mt-1">Categories</div>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-300">2</div>
                <div className="text-sm text-gray-400 mt-1">Free Options</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Picks - Premium Cards */}
      <section className="py-12 px-4 sm:px-6 -mt-8 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-4">
            <a
              href="#tool-1"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 mb-3">
                <Award className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best Overall</p>
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">Juro</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="#tool-2"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best Enterprise</p>
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">Ironclad</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="#tool-7"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-violet-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-violet-50 text-violet-600 mb-3">
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best Value</p>
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">PandaDoc</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="#tool-10"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 text-amber-600 mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best for Startups</p>
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">SpotDraft</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
          </div>
        </div>
      </section>

      {/* Comparison Table - Premium Design */}
      <section id="comparison-table" className="py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Complete Tool Comparison</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Every tool at a glance—pricing, ratings, and categories to help you decide faster.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50/80">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tool</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Best For</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Pricing</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {contractTools.map((tool, idx) => (
                    <tr key={tool.id} className="hover:bg-indigo-50/30 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a href={`#tool-${tool.id}`} className="flex items-center gap-3 font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                          <ToolLogo name={tool.name} website={tool.website} size={32} />
                          <span>{tool.name}</span>
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">{tool.category}</span>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span className="text-sm text-gray-500">{tool.bestFor}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className="inline-flex px-2.5 py-1 text-xs font-semibold rounded-lg"
                          style={
                            tool.pricing === 'Free'
                              ? { backgroundColor: '#d1fae5', color: '#047857', border: '1px solid #a7f3d0' }
                              : tool.pricing === 'Freemium'
                              ? { backgroundColor: '#d1fae5', color: '#059669', border: '1px solid #6ee7b7' }
                              : { backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb' }
                          }
                        >
                          {tool.pricing}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="font-semibold text-gray-900">{tool.rating}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* All Tools Section - Premium Cards */}
      <section id="all-tools" className="py-16 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">In-Depth Tool Reviews</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Detailed analysis with features, pricing, pros, cons, and expert recommendations.</p>
          </div>

          {/* Category Filter - Premium Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={selectedCategory === category ? { backgroundColor: '#4f46e5', color: '#ffffff' } : {}}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tool Cards - Premium Design */}
          <div className="space-y-8">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                id={`tool-${tool.id}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 scroll-mt-24 overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-6 md:p-8 border-b border-gray-50">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex items-start gap-5">
                      <div className="relative">
                        <ToolLogo name={tool.name} website={tool.website} size={56} />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                          {tool.id}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 flex-wrap mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{tool.name}</h3>
                          <span
                            className="px-2.5 py-1 text-xs font-semibold rounded-lg"
                            style={
                              tool.pricing === 'Free'
                                ? { backgroundColor: '#d1fae5', color: '#047857' }
                                : tool.pricing === 'Freemium'
                                ? { backgroundColor: '#d1fae5', color: '#059669' }
                                : { backgroundColor: '#f3f4f6', color: '#374151' }
                            }
                          >
                            {tool.pricing}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm mb-3">{tool.category} · {tool.bestFor}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            <span className="font-semibold text-gray-900">{tool.rating}</span>
                          </div>
                          <span className="text-gray-300">|</span>
                          <span
                            className="text-sm px-2.5 py-1 rounded-md font-medium"
                            style={
                              tool.difficulty === 'Beginner'
                                ? { backgroundColor: '#dcfce7', color: '#15803d' }
                                : tool.difficulty === 'Intermediate'
                                ? { backgroundColor: '#fef3c7', color: '#b45309' }
                                : { backgroundColor: '#fee2e2', color: '#dc2626' }
                            }
                          >
                            {tool.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 md:p-8">
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-8">{tool.description}</p>

                  {/* Pricing Banner */}
                  <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl p-4 mb-8 border border-indigo-100">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-indigo-600" />
                      <div>
                        <span className="font-semibold text-gray-900">Pricing: </span>
                        <span className="text-gray-600">{tool.pricingDetails}</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Key Features</h4>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {tool.keyFeatures.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2.5">
                          <CheckCircle className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pros & Cons */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="rounded-xl p-5 border border-emerald-200" style={{ backgroundColor: '#ecfdf5' }}>
                      <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#065f46' }}>Advantages</h4>
                      <ul className="space-y-2.5">
                        {tool.pros.map((pro, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm" style={{ color: '#047857' }}>
                            <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs" style={{ backgroundColor: '#a7f3d0', color: '#065f46' }}>+</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl p-5 border border-red-200" style={{ backgroundColor: '#fef2f2' }}>
                      <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#991b1b' }}>Limitations</h4>
                      <ul className="space-y-2.5">
                        {tool.cons.map((con, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm" style={{ color: '#dc2626' }}>
                            <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs" style={{ backgroundColor: '#fecaca', color: '#991b1b' }}>-</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Use Cases */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">Ideal for:</span>
                    {tool.useCases.map((useCase, idx) => (
                      <span key={idx} className="px-3 py-1.5 text-sm rounded-full font-medium" style={{ backgroundColor: '#e0e7ff', color: '#3730a3' }}>
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Premium Accordion */}
      <section id="faq" className="py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-500">Expert answers to common AI contract generator questions.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-gray-50 rounded-2xl overflow-hidden transition-all duration-300 ${
                  expandedFaq === index ? 'ring-2 ring-indigo-200' : ''
                }`}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  <div className={`w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                    expandedFaq === index ? 'rotate-180' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  expandedFaq === index ? 'max-h-96' : 'max-h-0'
                }`}>
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Content - Premium Grid */}
      <section className="py-16 px-4 sm:px-6 bg-[#FAFBFC]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">Explore More Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { href: "/marketing/ai-marketing-tools", title: "AI Marketing Tools", desc: "35+ AI tools for modern marketers." },
              { href: "/marketing/best-seo-tools", title: "Best SEO Tools", desc: "32 top SEO tools for rankings and traffic." },
              { href: "/marketing/best-pr-outreach-tools", title: "PR & Outreach Tools", desc: "18 tools for media relations and outreach." }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 mb-2 transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
                <div className="mt-4 text-indigo-600 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
