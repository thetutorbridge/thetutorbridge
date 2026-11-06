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
  Send,
  Users
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

// Local logo paths for PR & Outreach tools
const localLogoPaths: { [key: string]: string } = {
  "Cision": "/cision logo.png",
  "Meltwater": "/meltwater logo.png",
  "Muck Rack": "/muckrack logo.png",
  "Prowly": "/prowly logo.png",
  "Prezly": "/prezly logo.png",
  "PR Newswire": "/prnewswire logo.png",
  "BuzzStream": "/buzzstream logo.png",
  "Pitchbox": "/pitchbox logo.png",
  "Respona": "/respona logo.png",
  "Ninja Outreach": "/ninjaoutreach logo.png",
  "BuzzSumo": "/buzzsumo logo.png",
  "Traackr": "/traackr logo.png",
  "Upfluence": "/upfluence logo.png",
  "CreatorIQ": "/creatoriq logo.png",
  "Brandwatch": "/brandwatch logo.png",
  "Sprinklr": "/sprinklr logo.png",
  "Agility PR Solutions": "/agilitypr logo.png",
  "Connectively": "/connectively logo.png",
};

// Custom domain mappings for fallback
const customLogoDomains: { [key: string]: string } = {
  "Cision": "cision.com",
  "Meltwater": "meltwater.com",
  "Muck Rack": "muckrack.com",
  "Prowly": "prowly.com",
  "Prezly": "prezly.com",
  "PR Newswire": "prnewswire.com",
  "BuzzStream": "buzzstream.com",
  "Pitchbox": "pitchbox.com",
  "Respona": "respona.com",
  "Ninja Outreach": "ninjaoutreach.com",
  "BuzzSumo": "buzzsumo.com",
  "Traackr": "traackr.com",
  "Upfluence": "upfluence.com",
  "CreatorIQ": "creatoriq.com",
  "Brandwatch": "brandwatch.com",
  "Sprinklr": "sprinklr.com",
  "Agility PR Solutions": "agilitypr.com",
  "Connectively": "connectively.us",
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
        className="bg-gradient-to-br from-rose-600 to-pink-700 rounded-xl flex items-center justify-center text-white font-semibold shadow-sm"
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

// PR & Outreach Tools Data - 18 Tools
const prTools = [
  {
    id: 1,
    name: "Cision",
    category: "Media & PR Platform",
    bestFor: "Enterprise PR & media intelligence",
    pricing: "Paid",
    pricingDetails: "Custom pricing (typically $5,000-$25,000+/year)",
    website: "https://www.cision.com",
    rating: 4.5,
    difficulty: "Advanced",
    description: "Cision is the world's leading PR and earned media platform, providing access to the largest media database with over 1.6 million journalist profiles. It offers comprehensive media monitoring, press release distribution, and analytics to measure PR impact and ROI.",
    keyFeatures: [
      "1.6M+ journalist database",
      "Media monitoring & alerts",
      "Press release distribution",
      "PR analytics & reporting",
      "Social media monitoring",
      "Influencer identification"
    ],
    pros: [
      "Largest media database",
      "Comprehensive PR suite",
      "Strong analytics",
      "Global coverage"
    ],
    cons: [
      "Expensive enterprise pricing",
      "Complex interface",
      "Long-term contracts",
      "Steep learning curve"
    ],
    useCases: ["Enterprise PR teams", "Communications agencies", "Global brands", "Media relations"]
  },
  {
    id: 2,
    name: "Meltwater",
    category: "Media & PR Platform",
    bestFor: "Media monitoring & social listening",
    pricing: "Paid",
    pricingDetails: "Custom pricing (typically $6,000-$24,000+/year)",
    website: "https://www.meltwater.com",
    rating: 4.4,
    difficulty: "Intermediate",
    description: "Meltwater is a global media intelligence company providing media monitoring, social listening, and PR analytics. It tracks mentions across news, social media, podcasts, and broadcasts, helping PR teams understand their brand's share of voice and sentiment.",
    keyFeatures: [
      "Global media monitoring",
      "Social listening",
      "Influencer discovery",
      "PR analytics dashboard",
      "Competitive intelligence",
      "Custom reporting"
    ],
    pros: [
      "Excellent media monitoring",
      "Strong social listening",
      "Good visualizations",
      "Reliable customer support"
    ],
    cons: [
      "Expensive pricing",
      "Can be overwhelming",
      "Some data gaps",
      "Contract lock-in"
    ],
    useCases: ["PR teams", "Brand managers", "Marketing teams", "Competitive analysis"]
  },
  {
    id: 3,
    name: "Muck Rack",
    category: "Media & PR Platform",
    bestFor: "Journalist database & media relations",
    pricing: "Paid",
    pricingDetails: "Custom pricing (starts ~$5,000/year)",
    website: "https://muckrack.com",
    rating: 4.6,
    difficulty: "Beginner",
    description: "Muck Rack is a modern PR platform built around a comprehensive journalist database. It helps PR professionals find relevant journalists, pitch stories, monitor media coverage, and measure the impact of their earned media efforts with an intuitive interface.",
    keyFeatures: [
      "Journalist database & search",
      "Media monitoring",
      "Pitch tracking",
      "Coverage reports",
      "Email verification",
      "Portfolio building"
    ],
    pros: [
      "Excellent journalist data",
      "User-friendly interface",
      "Good pitch tracking",
      "Accurate contact info"
    ],
    cons: [
      "Smaller database than Cision",
      "Limited international coverage",
      "No press release distribution",
      "Mid-range pricing"
    ],
    useCases: ["PR professionals", "In-house comms teams", "PR agencies", "Media relations"]
  },
  {
    id: 4,
    name: "Prowly",
    category: "Media & PR Platform",
    bestFor: "PR software for growing teams",
    pricing: "Paid",
    pricingDetails: "$369/mo (Essential) to $589/mo (Professional)",
    website: "https://prowly.com",
    rating: 4.5,
    difficulty: "Beginner",
    description: "Prowly (owned by Semrush) is an all-in-one PR software that combines media database access, online newsrooms, press release creation, and media monitoring. It's designed for PR teams who want professional tools without enterprise complexity or pricing.",
    keyFeatures: [
      "Media database access",
      "Online newsroom builder",
      "Press release creator",
      "Media monitoring",
      "Email pitching tools",
      "Coverage tracking"
    ],
    pros: [
      "Affordable pricing",
      "Easy to use",
      "Good newsroom features",
      "Semrush integration"
    ],
    cons: [
      "Smaller media database",
      "Limited analytics",
      "Basic monitoring",
      "Fewer enterprise features"
    ],
    useCases: ["SMB PR teams", "Startups", "Marketing agencies", "In-house communications"]
  },
  {
    id: 5,
    name: "Prezly",
    category: "Media & PR Platform",
    bestFor: "PR CRM & newsroom software",
    pricing: "Paid",
    pricingDetails: "$90/mo (Starter) to $550/mo (Premium)",
    website: "https://www.prezly.com",
    rating: 4.4,
    difficulty: "Beginner",
    description: "Prezly is a PR CRM and newsroom platform that helps teams manage media contacts, create beautiful online newsrooms, and distribute stories. It focuses on relationship management and branded content experiences rather than traditional wire distribution.",
    keyFeatures: [
      "PR CRM & contact management",
      "Online newsroom builder",
      "Story & campaign creation",
      "Email tracking",
      "Media kit hosting",
      "Multi-language support"
    ],
    pros: [
      "Beautiful newsroom designs",
      "Strong CRM features",
      "Good email tracking",
      "Affordable plans"
    ],
    cons: [
      "No media database",
      "Limited monitoring",
      "Smaller market presence",
      "Basic analytics"
    ],
    useCases: ["Brand PR teams", "Agencies", "Newsroom management", "Media relations"]
  },
  {
    id: 6,
    name: "PR Newswire",
    category: "Media & PR Platform",
    bestFor: "Press release distribution",
    pricing: "Paid",
    pricingDetails: "$350-$6,000+ per release (varies by reach)",
    website: "https://www.prnewswire.com",
    rating: 4.3,
    difficulty: "Beginner",
    description: "PR Newswire is one of the world's largest press release distribution networks, reaching journalists, newsrooms, and consumers globally. Part of Cision, it offers wide distribution reach, multimedia capabilities, and compliance features for regulated industries.",
    keyFeatures: [
      "Global distribution network",
      "Multimedia press releases",
      "Targeted distribution",
      "Compliance & disclosure",
      "Analytics & reporting",
      "SEO optimization"
    ],
    pros: [
      "Widest distribution reach",
      "Trusted by journalists",
      "Compliance features",
      "Strong SEO benefits"
    ],
    cons: [
      "Expensive per release",
      "No monthly subscription",
      "Additional fees add up",
      "Can feel outdated"
    ],
    useCases: ["Press releases", "Product launches", "Financial disclosures", "Corporate announcements"]
  },
  {
    id: 7,
    name: "BuzzStream",
    category: "Link Building & Outreach",
    bestFor: "Outreach CRM & link building",
    pricing: "Paid",
    pricingDetails: "$24/mo (Starter) to $999/mo (Custom)",
    website: "https://www.buzzstream.com",
    rating: 4.5,
    difficulty: "Intermediate",
    description: "BuzzStream is a dedicated outreach CRM designed for link building and digital PR. It helps teams research prospects, manage relationships, send personalized outreach at scale, and track campaign performance with detailed analytics.",
    keyFeatures: [
      "Outreach CRM",
      "Link prospecting",
      "Email templates & sequences",
      "Team collaboration",
      "Performance tracking",
      "Browser extension"
    ],
    pros: [
      "Purpose-built for outreach",
      "Good team features",
      "Affordable pricing",
      "Strong tracking"
    ],
    cons: [
      "Learning curve",
      "Basic UI design",
      "Limited integrations",
      "No built-in database"
    ],
    useCases: ["Link builders", "Digital PR teams", "SEO agencies", "Content promotion"]
  },
  {
    id: 8,
    name: "Pitchbox",
    category: "Link Building & Outreach",
    bestFor: "Influencer outreach & link building",
    pricing: "Paid",
    pricingDetails: "$550/mo (Professional) to custom (Enterprise)",
    website: "https://pitchbox.com",
    rating: 4.6,
    difficulty: "Intermediate",
    description: "Pitchbox is a premium outreach and link building platform used by top SEO agencies. It combines prospecting, personalized outreach, follow-up automation, and reporting in one platform, with integrations to major SEO tools like Moz, Ahrefs, and Semrush.",
    keyFeatures: [
      "Automated prospecting",
      "Personalized outreach",
      "Follow-up sequences",
      "SEO tool integrations",
      "Team workflows",
      "Advanced reporting"
    ],
    pros: [
      "Powerful automation",
      "Excellent integrations",
      "Time-saving workflows",
      "Agency-focused features"
    ],
    cons: [
      "Expensive pricing",
      "Steep learning curve",
      "Overkill for small teams",
      "Complex setup"
    ],
    useCases: ["SEO agencies", "Link building teams", "Digital PR", "Enterprise outreach"]
  },
  {
    id: 9,
    name: "Respona",
    category: "Link Building & Outreach",
    bestFor: "AI-powered link building outreach",
    pricing: "Paid",
    pricingDetails: "$99/mo (Starter) to $399/mo (Unlimited)",
    website: "https://respona.com",
    rating: 4.5,
    difficulty: "Beginner",
    description: "Respona is an AI-powered link building and digital PR platform that streamlines the entire outreach process. It uses AI to find contact information, personalize emails, and automate follow-ups while maintaining a personal touch in communications.",
    keyFeatures: [
      "AI email personalization",
      "Automated prospecting",
      "Contact finder",
      "Campaign automation",
      "Performance analytics",
      "Email warm-up"
    ],
    pros: [
      "AI-powered personalization",
      "Easy to use",
      "Good automation",
      "Reasonable pricing"
    ],
    cons: [
      "Newer platform",
      "Smaller user base",
      "Limited advanced features",
      "Some AI limitations"
    ],
    useCases: ["Link building", "Digital PR", "Content promotion", "Guest posting"]
  },
  {
    id: 10,
    name: "Ninja Outreach",
    category: "Link Building & Outreach",
    bestFor: "Influencer & blogger outreach",
    pricing: "Paid",
    pricingDetails: "$49/mo (Flex) to $299/mo (Pro)",
    website: "https://ninjaoutreach.com",
    rating: 4.2,
    difficulty: "Beginner",
    description: "Ninja Outreach is an influencer and blogger outreach tool with a built-in database of millions of influencers and bloggers. It helps find prospects by niche, manage outreach campaigns, and track results for link building and influencer marketing.",
    keyFeatures: [
      "Influencer database",
      "Blogger prospecting",
      "Email outreach",
      "CRM features",
      "Chrome extension",
      "Campaign tracking"
    ],
    pros: [
      "Built-in database",
      "Affordable pricing",
      "Easy to start",
      "Good for beginners"
    ],
    cons: [
      "Database quality varies",
      "Basic features",
      "Limited automation",
      "Outdated contacts"
    ],
    useCases: ["Blogger outreach", "Influencer marketing", "Link building", "Content promotion"]
  },
  {
    id: 11,
    name: "BuzzSumo",
    category: "Influencer & Creator Platform",
    bestFor: "Content research & influencer discovery",
    pricing: "Paid",
    pricingDetails: "$199/mo (Content Creation) to $999/mo (Enterprise)",
    website: "https://buzzsumo.com",
    rating: 4.5,
    difficulty: "Beginner",
    description: "BuzzSumo is a content research and influencer discovery platform that shows what content performs best in any niche. It helps identify trending topics, find influential content creators, and analyze competitor content strategies for PR and outreach.",
    keyFeatures: [
      "Content analysis",
      "Influencer identification",
      "Trending topic discovery",
      "Backlink analysis",
      "Content alerts",
      "Competitor monitoring"
    ],
    pros: [
      "Excellent content insights",
      "Good influencer data",
      "Easy to use",
      "Reliable data"
    ],
    cons: [
      "Expensive pricing",
      "Limited outreach features",
      "No CRM functionality",
      "Social data limitations"
    ],
    useCases: ["Content marketing", "PR research", "Influencer discovery", "Competitive analysis"]
  },
  {
    id: 12,
    name: "Traackr",
    category: "Influencer & Creator Platform",
    bestFor: "Enterprise influencer marketing",
    pricing: "Paid",
    pricingDetails: "Custom pricing (typically $20,000+/year)",
    website: "https://www.traackr.com",
    rating: 4.4,
    difficulty: "Advanced",
    description: "Traackr is an enterprise influencer marketing platform providing data-driven influencer discovery, relationship management, and campaign measurement. It offers deep analytics on influencer audiences and performance for sophisticated brand partnerships.",
    keyFeatures: [
      "Influencer discovery",
      "Audience analytics",
      "Campaign management",
      "ROI measurement",
      "Relationship tracking",
      "Compliance tools"
    ],
    pros: [
      "Deep analytics",
      "Enterprise-grade",
      "Strong vetting tools",
      "Global coverage"
    ],
    cons: [
      "Enterprise pricing",
      "Complex platform",
      "Long implementation",
      "Overkill for small brands"
    ],
    useCases: ["Enterprise brands", "Global campaigns", "Influencer vetting", "Performance marketing"]
  },
  {
    id: 13,
    name: "Upfluence",
    category: "Influencer & Creator Platform",
    bestFor: "Influencer marketing & e-commerce",
    pricing: "Paid",
    pricingDetails: "Custom pricing (starts ~$478/mo)",
    website: "https://www.upfluence.com",
    rating: 4.3,
    difficulty: "Intermediate",
    description: "Upfluence is an influencer marketing platform with a database of 3M+ influencers across social platforms. It specializes in e-commerce integrations, helping brands find influencers among their existing customers and manage creator partnerships.",
    keyFeatures: [
      "3M+ influencer database",
      "E-commerce integrations",
      "Customer influencer matching",
      "Campaign management",
      "Payment processing",
      "Performance tracking"
    ],
    pros: [
      "Large database",
      "E-commerce focus",
      "Good integrations",
      "Customer matching feature"
    ],
    cons: [
      "Pricing not transparent",
      "Learning curve",
      "Some outdated profiles",
      "Support response times"
    ],
    useCases: ["E-commerce brands", "DTC companies", "Influencer campaigns", "Ambassador programs"]
  },
  {
    id: 14,
    name: "CreatorIQ",
    category: "Influencer & Creator Platform",
    bestFor: "Enterprise creator management",
    pricing: "Paid",
    pricingDetails: "Custom enterprise pricing ($36,000+/year)",
    website: "https://creatoriq.com",
    rating: 4.5,
    difficulty: "Advanced",
    description: "CreatorIQ is the enterprise standard for creator and influencer marketing, used by major brands like Disney, Unilever, and Dell. It offers AI-powered creator discovery, fraud detection, campaign management, and comprehensive analytics at scale.",
    keyFeatures: [
      "AI-powered discovery",
      "Fraud detection",
      "Campaign orchestration",
      "Advanced analytics",
      "API integrations",
      "Compliance management"
    ],
    pros: [
      "Enterprise-grade platform",
      "Excellent fraud detection",
      "Powerful analytics",
      "Used by top brands"
    ],
    cons: [
      "Very expensive",
      "Complex implementation",
      "Not for small brands",
      "Requires training"
    ],
    useCases: ["Enterprise brands", "Large agencies", "Global campaigns", "Creator programs"]
  },
  {
    id: 15,
    name: "Brandwatch",
    category: "Media Intelligence",
    bestFor: "Social listening & PR analytics",
    pricing: "Paid",
    pricingDetails: "Custom pricing (typically $800-$3,000+/mo)",
    website: "https://www.brandwatch.com",
    rating: 4.6,
    difficulty: "Advanced",
    description: "Brandwatch is an enterprise social listening and consumer intelligence platform. For PR teams, it provides deep insights into brand mentions, sentiment, share of voice, and crisis monitoring across social media, news, forums, and reviews.",
    keyFeatures: [
      "Social listening",
      "Sentiment analysis",
      "Crisis monitoring",
      "Share of voice",
      "Influencer identification",
      "Custom dashboards"
    ],
    pros: [
      "Comprehensive monitoring",
      "Advanced analytics",
      "Historical data",
      "Strong visualizations"
    ],
    cons: [
      "Enterprise pricing",
      "Complex platform",
      "Steep learning curve",
      "Requires training"
    ],
    useCases: ["Brand monitoring", "Crisis management", "PR measurement", "Competitive intelligence"]
  },
  {
    id: 16,
    name: "Sprinklr",
    category: "Media Intelligence",
    bestFor: "Enterprise social & PR suite",
    pricing: "Paid",
    pricingDetails: "Custom enterprise pricing ($60,000+/year)",
    website: "https://www.sprinklr.com",
    rating: 4.3,
    difficulty: "Advanced",
    description: "Sprinklr is a unified customer experience platform with powerful PR and social capabilities. It offers social listening, media monitoring, publishing, engagement, and analytics across 30+ channels for enterprise brands managing global communications.",
    keyFeatures: [
      "Unified CXM platform",
      "30+ channel support",
      "AI-powered insights",
      "Crisis management",
      "Global collaboration",
      "Compliance tools"
    ],
    pros: [
      "Unified platform",
      "Enterprise-scale",
      "Strong AI features",
      "Global capabilities"
    ],
    cons: [
      "Very expensive",
      "Complex implementation",
      "Steep learning curve",
      "Long sales cycles"
    ],
    useCases: ["Enterprise comms", "Global brands", "Multi-channel PR", "Customer experience"]
  },
  {
    id: 17,
    name: "Agility PR Solutions",
    category: "Media Intelligence",
    bestFor: "Media database & monitoring",
    pricing: "Paid",
    pricingDetails: "Custom pricing (more affordable than Cision)",
    website: "https://www.agilitypr.com",
    rating: 4.2,
    difficulty: "Intermediate",
    description: "Agility PR Solutions offers media database, monitoring, and distribution services as a more affordable alternative to Cision. It provides access to journalist contacts, press release distribution, and media monitoring for PR teams of all sizes.",
    keyFeatures: [
      "Media database",
      "Press release distribution",
      "Media monitoring",
      "Journalist profiles",
      "Email pitching",
      "Analytics & reports"
    ],
    pros: [
      "More affordable than competitors",
      "Good database quality",
      "Flexible packages",
      "Responsive support"
    ],
    cons: [
      "Smaller database",
      "Less brand recognition",
      "Basic interface",
      "Limited integrations"
    ],
    useCases: ["Mid-market PR teams", "Agencies", "Media relations", "Press distribution"]
  },
  {
    id: 18,
    name: "Connectively",
    category: "Journalist Platform",
    bestFor: "Source & journalist matching",
    pricing: "Freemium",
    pricingDetails: "Free (basic) / $49/mo (Pro) / $149/mo (Premium)",
    website: "https://www.connectively.us",
    rating: 4.4,
    difficulty: "Beginner",
    description: "Connectively (formerly HARO - Help A Reporter Out) connects journalists seeking sources with experts and brands. It's one of the most accessible ways to earn media coverage by responding to journalist queries and building relationships with reporters.",
    keyFeatures: [
      "Journalist query matching",
      "Expert source platform",
      "Daily opportunity emails",
      "Category filtering",
      "Response tracking",
      "Media opportunity alerts"
    ],
    pros: [
      "Free tier available",
      "Direct journalist access",
      "Easy to start",
      "High-quality opportunities"
    ],
    cons: [
      "Competitive responses",
      "Time-consuming",
      "No guaranteed coverage",
      "Query quality varies"
    ],
    useCases: ["Thought leadership", "Earned media", "Expert positioning", "Brand awareness"]
  }
];

// FAQ Data
const faqs = [
  {
    question: "What is PR outreach and why is it important?",
    answer: "PR outreach is the process of building relationships with journalists, influencers, and media outlets to earn coverage for your brand. It's important because earned media is more credible than paid advertising, builds brand authority, generates high-quality backlinks for SEO, and reaches audiences through trusted third-party voices."
  },
  {
    question: "What's the difference between PR software and outreach tools?",
    answer: "PR software (like Cision, Meltwater, Muck Rack) focuses on media relations - finding journalists, distributing press releases, and monitoring coverage. Outreach tools (like BuzzStream, Pitchbox, Respona) focus on link building and content promotion through email outreach. Many teams use both for comprehensive earned media strategies."
  },
  {
    question: "How much do PR tools cost?",
    answer: "PR tool pricing varies widely. Entry-level tools like Prowly start at $369/mo. Mid-tier solutions like BuzzStream start at $24/mo. Enterprise platforms like Cision and Meltwater typically cost $5,000-$25,000+/year. Press release distribution costs $350-$6,000+ per release depending on reach."
  },
  {
    question: "What's the best free PR tool?",
    answer: "Connectively (formerly HARO) offers a free tier for responding to journalist queries. Google Alerts provides free media monitoring. For outreach, you can start with Gmail and spreadsheets. However, scaling PR efforts effectively typically requires paid tools for contact databases and automation."
  },
  {
    question: "Cision vs Meltwater vs Muck Rack: Which is best?",
    answer: "Cision has the largest database and is best for enterprise global PR. Meltwater excels at media monitoring and social listening. Muck Rack offers the best user experience and journalist data accuracy. Choose based on your priorities: database size (Cision), monitoring (Meltwater), or usability (Muck Rack)."
  },
  {
    question: "Do I need a media database tool?",
    answer: "A media database is valuable if you regularly pitch journalists and need accurate contact information, journalist beats/interests, and media list building. If you only occasionally need journalist contacts, tools like Connectively or manual research on Twitter/LinkedIn may suffice initially."
  },
  {
    question: "What's the best tool for link building outreach?",
    answer: "BuzzStream is the most popular choice for its balance of features and price. Pitchbox is preferred by agencies for its automation and integrations. Respona is great for AI-powered personalization. Choose based on team size, budget, and automation needs."
  },
  {
    question: "How do I measure PR and outreach success?",
    answer: "Key metrics include: media mentions and coverage volume, share of voice vs competitors, sentiment analysis, domain authority of coverage, referral traffic from earned media, backlinks acquired, journalist response rates, and ultimately brand awareness and business impact."
  },
  {
    question: "What is digital PR vs traditional PR?",
    answer: "Traditional PR focuses on broadcast media, print publications, and press releases. Digital PR combines traditional PR with SEO goals - earning online coverage, building high-quality backlinks, and improving search visibility. Most modern PR strategies blend both approaches."
  },
  {
    question: "How do I build a journalist relationship?",
    answer: "Start by following journalists on social media and engaging with their content. Use tools to understand their beats and interests. Pitch relevant stories, not generic press releases. Provide value even when you don't have a pitch. Respect deadlines and be responsive. Build long-term relationships, not transactional interactions."
  }
];

export default function BestPROutreachToolsPage() {
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");

  const categories = ["All", ...Array.from(new Set(prTools.map(tool => tool.category)))];

  const filteredTools = selectedCategory === "All"
    ? prTools
    : prTools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "18 Best PR & Outreach Tools for 2026 - Complete Guide",
            "description": "Comprehensive guide to the best PR and outreach tools in 2026. Compare features, pricing, pros & cons of top platforms including Cision, Meltwater, Muck Rack, and more.",
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
            "itemListElement": prTools.slice(0, 10).map((tool, index) => ({
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
            <Link href="/" className="hover:text-rose-700 flex items-center transition-colors">
              <Home className="w-3.5 h-3.5 mr-1" />
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/marketing" className="hover:text-rose-700 transition-colors">Marketing</Link>
            <span className="text-gray-300">/</span>
            <span className="text-rose-700 font-medium">Best PR & Outreach Tools</span>
          </nav>
        </div>
      </div>

      {/* Premium Hero Section */}
      <section className="relative overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #881337 0%, #be123c 50%, #881337 100%)' }}>
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
              <span className="block text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #fda4af, #fecdd3, #fda4af)' }}>
                PR & Outreach Tools
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
                  className="font-semibold text-white hover:text-rose-200 transition-colors flex items-center gap-1"
                >
                  Rishabh Jain
                  <Linkedin className="w-4 h-4" />
                </a>
                <span className="text-gray-400">·</span>
                <span className="text-gray-400">Nov 2026</span>
              </div>
            </div>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
              18 meticulously reviewed tools for media relations, link building, and influencer outreach.
              From affordable solutions to enterprise platforms—amplify your earned media.
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
                <div className="text-4xl font-bold text-emerald-400">1</div>
                <div className="text-sm text-gray-400 mt-1">Free Option</div>
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
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-rose-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-rose-50 text-rose-600 mb-3">
                <Award className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best Enterprise PR</p>
              <p className="font-semibold text-gray-900 group-hover:text-rose-700 transition-colors">Cision</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="#tool-3"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best User Experience</p>
              <p className="font-semibold text-gray-900 group-hover:text-rose-700 transition-colors">Muck Rack</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="#tool-7"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-violet-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-violet-50 text-violet-600 mb-3">
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best for Link Building</p>
              <p className="font-semibold text-gray-900 group-hover:text-rose-700 transition-colors">BuzzStream</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="#tool-18"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 text-amber-600 mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best Free Option</p>
              <p className="font-semibold text-gray-900 group-hover:text-rose-700 transition-colors">Connectively</p>
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
                  {prTools.map((tool, idx) => (
                    <tr key={tool.id} className="hover:bg-rose-50/30 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a href={`#tool-${tool.id}`} className="flex items-center gap-3 font-medium text-gray-900 group-hover:text-rose-600 transition-colors">
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
                              ? { backgroundColor: '#ffe4e6', color: '#be123c', border: '1px solid #fecdd3' }
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
                style={selectedCategory === category ? { backgroundColor: '#be123c', color: '#ffffff' } : {}}
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
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
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
                                ? { backgroundColor: '#ffe4e6', color: '#be123c' }
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
                  <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-4 mb-8 border border-rose-100">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-rose-600" />
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
                          <CheckCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
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
                      <span key={idx} className="px-3 py-1.5 text-sm rounded-full font-medium" style={{ backgroundColor: '#ffe4e6', color: '#be123c' }}>
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
            <p className="text-gray-500">Expert answers to common PR and outreach questions.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-gray-50 rounded-2xl overflow-hidden transition-all duration-300 ${
                  expandedFaq === index ? 'ring-2 ring-rose-200' : ''
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
              { href: "/marketing/best-seo-tools", title: "Best SEO Tools", desc: "32 top SEO tools for rankings and traffic." },
              { href: "/marketing/best-competitive-intelligence-tools", title: "Competitive Intelligence Tools", desc: "18 tools to track and analyze competitors." },
              { href: "/marketing/best-link-building-tools", title: "Link Building Tools", desc: "Top tools for building quality backlinks." }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-rose-600 mb-2 transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
                <div className="mt-4 text-rose-600 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
