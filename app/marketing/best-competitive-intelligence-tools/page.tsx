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
  Eye,
  Target
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

// Local logo paths for Competitive Intelligence tools
const localLogoPaths: { [key: string]: string } = {
  "Crayon": "/crayon logo.png",
  "Klue": "/klue logo.png",
  "Kompyte": "/kompyte logo.png",
  "Contify": "/contify logo.png",
  "SimilarWeb": "/similarweb logo.png",
  "Semrush": "/Semrush logo.png",
  "SpyFu": "/spyfu logo.webp",
  "Ahrefs": "/ahrefs logo.png",
  "Brandwatch": "/brandwatch logo.png",
  "Mention": "/mention logo.png",
  "Rival IQ": "/rivaliq logo.png",
  "Sprout Social": "/sprout social logo.png",
  "Owler": "/owler logo.png",
  "Crunchbase": "/crunchbase logo.png",
  "G2": "/g2 logo.png",
  "BuiltWith": "/builtwith logo.png",
  "Wappalyzer": "/wappalyzer logo.png",
  "Visualping": "/visualping logo.png",
};

// Custom domain mappings for fallback
const customLogoDomains: { [key: string]: string } = {
  "Crayon": "crayon.co",
  "Klue": "klue.com",
  "Kompyte": "kompyte.com",
  "Contify": "contify.com",
  "SimilarWeb": "similarweb.com",
  "Semrush": "semrush.com",
  "SpyFu": "spyfu.com",
  "Ahrefs": "ahrefs.com",
  "Brandwatch": "brandwatch.com",
  "Mention": "mention.com",
  "Rival IQ": "rivaliq.com",
  "Sprout Social": "sproutsocial.com",
  "Owler": "owler.com",
  "Crunchbase": "crunchbase.com",
  "G2": "g2.com",
  "BuiltWith": "builtwith.com",
  "Wappalyzer": "wappalyzer.com",
  "Visualping": "visualping.io",
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
        className="bg-gradient-to-br from-indigo-700 to-indigo-900 rounded-xl flex items-center justify-center text-white font-semibold shadow-sm"
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

// Competitive Intelligence Tools Data - 18 Tools
const ciTools = [
  {
    id: 1,
    name: "Crayon",
    category: "Enterprise CI Platform",
    bestFor: "AI-powered competitive intelligence",
    pricing: "Paid",
    pricingDetails: "Custom pricing (typically $25,000-$100,000+/year)",
    website: "https://www.crayon.co",
    rating: 4.8,
    difficulty: "Advanced",
    description: "Crayon is an AI-powered competitive intelligence platform that automatically tracks, analyzes, and delivers actionable insights about your competitors. It monitors millions of sources to capture competitive movements including pricing changes, messaging updates, product launches, and executive changes.",
    keyFeatures: [
      "AI-powered competitive tracking",
      "Real-time competitor alerts",
      "Battle card creation",
      "Win/loss analysis",
      "Sales enablement tools",
      "Competitive landscape reports"
    ],
    pros: [
      "Comprehensive AI-driven insights",
      "Excellent sales enablement features",
      "Automatic intel gathering",
      "Strong integrations (Salesforce, Slack)"
    ],
    cons: [
      "Enterprise pricing",
      "Steep learning curve",
      "Requires dedicated CI team",
      "Overkill for small businesses"
    ],
    useCases: ["Enterprise sales teams", "Product marketing", "Strategic planning", "Win/loss analysis"]
  },
  {
    id: 2,
    name: "Klue",
    category: "Enterprise CI Platform",
    bestFor: "Competitive enablement for sales",
    pricing: "Paid",
    pricingDetails: "Custom pricing (starts ~$20,000/year)",
    website: "https://klue.com",
    rating: 4.7,
    difficulty: "Advanced",
    description: "Klue is a competitive enablement platform designed to help sales teams win more deals. It combines competitive intelligence gathering with sales enablement tools, making it easy to create and distribute battle cards, competitive comparisons, and win/loss insights directly to reps.",
    keyFeatures: [
      "Competitive battle cards",
      "AI-powered intel collection",
      "CRM integration",
      "Win/loss tracking",
      "Competitive newsletters",
      "Sales content management"
    ],
    pros: [
      "Excellent battle card system",
      "Strong Salesforce integration",
      "Easy for sales reps to use",
      "Good customer success support"
    ],
    cons: [
      "Expensive for SMBs",
      "Requires content investment",
      "Limited free trial",
      "Setup can be time-consuming"
    ],
    useCases: ["B2B sales teams", "Sales enablement", "Product marketing", "Competitive positioning"]
  },
  {
    id: 3,
    name: "Kompyte",
    category: "Enterprise CI Platform",
    bestFor: "Automated competitive tracking",
    pricing: "Paid",
    pricingDetails: "$15,000-$50,000+/year",
    website: "https://www.kompyte.com",
    rating: 4.5,
    difficulty: "Intermediate",
    description: "Kompyte (now part of Semrush) automates competitive intelligence by tracking competitor websites, social media, reviews, job postings, and more. It uses AI to surface the most important changes and helps teams stay informed without manual monitoring.",
    keyFeatures: [
      "Automated website monitoring",
      "Social media tracking",
      "Review monitoring",
      "Job posting analysis",
      "Custom alerts",
      "Battle card builder"
    ],
    pros: [
      "Comprehensive tracking coverage",
      "Good automation features",
      "Now integrated with Semrush",
      "User-friendly interface"
    ],
    cons: [
      "Mid-market pricing",
      "Some features require setup",
      "Limited historical data",
      "Occasional false positives"
    ],
    useCases: ["Marketing teams", "Product managers", "Competitive analysts", "Sales operations"]
  },
  {
    id: 4,
    name: "Contify",
    category: "Enterprise CI Platform",
    bestFor: "Market & competitive intelligence",
    pricing: "Paid",
    pricingDetails: "Custom pricing (starts ~$10,000/year)",
    website: "https://contify.com",
    rating: 4.4,
    difficulty: "Intermediate",
    description: "Contify is a market and competitive intelligence platform that uses AI to curate relevant intelligence from thousands of sources. It helps businesses track competitors, markets, customers, and industry trends with customizable dashboards and automated newsletters.",
    keyFeatures: [
      "AI-powered news curation",
      "Custom intelligence feeds",
      "Competitive dashboards",
      "Automated newsletters",
      "API access",
      "Team collaboration"
    ],
    pros: [
      "Broad source coverage",
      "Good customization options",
      "Affordable for enterprise CI",
      "Strong API capabilities"
    ],
    cons: [
      "Interface less polished",
      "Requires curation setup",
      "Limited battle card features",
      "Smaller customer base"
    ],
    useCases: ["Strategy teams", "Market research", "Investor relations", "Industry monitoring"]
  },
  {
    id: 5,
    name: "SimilarWeb",
    category: "Traffic & Market Analysis",
    bestFor: "Website traffic intelligence",
    pricing: "Freemium",
    pricingDetails: "Free limited / $149/mo (Starter) to custom (Enterprise)",
    website: "https://www.similarweb.com",
    rating: 4.7,
    difficulty: "Beginner",
    description: "SimilarWeb is the industry standard for digital market intelligence. It estimates website traffic, engagement metrics, traffic sources, and audience demographics for virtually any website. Essential for understanding competitor performance and market share.",
    keyFeatures: [
      "Website traffic estimates",
      "Traffic source breakdown",
      "Audience demographics",
      "Industry benchmarking",
      "Keyword analysis",
      "App intelligence"
    ],
    pros: [
      "Most comprehensive traffic data",
      "Easy to understand metrics",
      "Free tier available",
      "Great for quick competitor checks"
    ],
    cons: [
      "Estimates can be inaccurate",
      "Expensive premium plans",
      "Limited data for small sites",
      "Some features locked"
    ],
    useCases: ["Market research", "Competitor analysis", "Investment research", "Media planning"]
  },
  {
    id: 6,
    name: "Semrush",
    category: "Traffic & Market Analysis",
    bestFor: "SEO & competitive research",
    pricing: "Paid",
    pricingDetails: "$139.95/mo (Pro) to $499.95/mo (Business)",
    website: "https://www.semrush.com",
    rating: 4.8,
    difficulty: "Intermediate",
    description: "Semrush is a comprehensive digital marketing toolkit with powerful competitive intelligence features. Beyond SEO, it offers competitor traffic analysis, advertising research, social media tracking, and content gap analysis to help you understand and outperform competitors.",
    keyFeatures: [
      "Competitor traffic analytics",
      "Advertising research",
      "Keyword gap analysis",
      "Backlink gap analysis",
      "Market Explorer",
      "Social media tracker"
    ],
    pros: [
      "All-in-one marketing suite",
      "Excellent competitor research",
      "Regular feature updates",
      "Strong data accuracy"
    ],
    cons: [
      "Can be overwhelming",
      "Expensive for full features",
      "Learning curve",
      "Limits on lower plans"
    ],
    useCases: ["Digital marketers", "SEO professionals", "Content strategists", "PPC managers"]
  },
  {
    id: 7,
    name: "SpyFu",
    category: "Traffic & Market Analysis",
    bestFor: "Competitor keyword & PPC research",
    pricing: "Paid",
    pricingDetails: "$39/mo (Basic) to $299/mo (Team)",
    website: "https://www.spyfu.com",
    rating: 4.5,
    difficulty: "Beginner",
    description: "SpyFu specializes in competitor keyword research, showing you every keyword your competitors rank for organically and in paid search. It reveals their ad history, ad spend estimates, and most profitable keywords, making it invaluable for PPC and SEO competitive analysis.",
    keyFeatures: [
      "Competitor keyword research",
      "PPC competitor analysis",
      "Ad history & spend estimates",
      "Keyword grouping",
      "SERP analysis",
      "Backlink research"
    ],
    pros: [
      "Affordable pricing",
      "Great for PPC research",
      "Historical data access",
      "Easy to use interface"
    ],
    cons: [
      "US-focused data",
      "Less comprehensive than Semrush",
      "Dated interface design",
      "Limited international data"
    ],
    useCases: ["PPC managers", "SEO specialists", "Small businesses", "Agency prospecting"]
  },
  {
    id: 8,
    name: "Ahrefs",
    category: "Traffic & Market Analysis",
    bestFor: "Backlink & SEO competitive analysis",
    pricing: "Paid",
    pricingDetails: "$29/mo (Starter) to $374/mo (Advanced)",
    website: "https://ahrefs.com",
    rating: 4.8,
    difficulty: "Intermediate",
    description: "Ahrefs is the gold standard for backlink analysis and SEO competitive intelligence. With the largest backlink index, it shows you exactly how competitors build links, what content performs best, and where your SEO gaps are. Essential for content and link-building strategy.",
    keyFeatures: [
      "Competitor backlink analysis",
      "Content gap analysis",
      "Organic traffic estimates",
      "Keyword research",
      "Rank tracking",
      "Site audit"
    ],
    pros: [
      "Best backlink data",
      "Excellent content explorer",
      "Accurate traffic estimates",
      "Regular crawler updates"
    ],
    cons: [
      "Expensive for beginners",
      "No free trial",
      "Credit-based system",
      "Focused mainly on SEO"
    ],
    useCases: ["Link builders", "Content marketers", "SEO agencies", "Competitive SEO analysis"]
  },
  {
    id: 9,
    name: "Brandwatch",
    category: "Social & Brand Monitoring",
    bestFor: "Social listening & brand intelligence",
    pricing: "Paid",
    pricingDetails: "Custom pricing (typically $800-$3,000+/mo)",
    website: "https://www.brandwatch.com",
    rating: 4.6,
    difficulty: "Advanced",
    description: "Brandwatch is an enterprise social listening and consumer intelligence platform. It monitors social media, news, forums, and reviews to track brand mentions, sentiment, and competitive conversations at scale. Powerful for understanding market perception and share of voice.",
    keyFeatures: [
      "Social media monitoring",
      "Sentiment analysis",
      "Share of voice tracking",
      "Influencer identification",
      "Crisis monitoring",
      "Custom dashboards"
    ],
    pros: [
      "Comprehensive social coverage",
      "Advanced analytics",
      "Historical data access",
      "Enterprise-grade features"
    ],
    cons: [
      "Enterprise pricing",
      "Complex setup required",
      "Steep learning curve",
      "Overkill for small teams"
    ],
    useCases: ["Brand managers", "PR teams", "Market researchers", "Enterprise marketing"]
  },
  {
    id: 10,
    name: "Mention",
    category: "Social & Brand Monitoring",
    bestFor: "Media monitoring & competitive tracking",
    pricing: "Freemium",
    pricingDetails: "Free limited / $49/mo (Solo) to $179/mo (Pro)",
    website: "https://mention.com",
    rating: 4.4,
    difficulty: "Beginner",
    description: "Mention is an accessible media monitoring tool that tracks brand mentions across social media, news, blogs, and forums. It's more affordable than enterprise solutions while still offering competitive monitoring, sentiment analysis, and influencer tracking capabilities.",
    keyFeatures: [
      "Real-time brand monitoring",
      "Competitor tracking",
      "Sentiment analysis",
      "Influencer identification",
      "Custom alerts",
      "Reporting & analytics"
    ],
    pros: [
      "Affordable pricing",
      "Easy to set up",
      "Good for SMBs",
      "Real-time alerts"
    ],
    cons: [
      "Limited historical data",
      "Fewer sources than enterprise tools",
      "Basic sentiment analysis",
      "Limited customization"
    ],
    useCases: ["Small businesses", "PR professionals", "Social media managers", "Startups"]
  },
  {
    id: 11,
    name: "Rival IQ",
    category: "Social & Brand Monitoring",
    bestFor: "Social media competitive analytics",
    pricing: "Paid",
    pricingDetails: "$239/mo (Drive) to $519/mo (Engage)",
    website: "https://www.rivaliq.com",
    rating: 4.5,
    difficulty: "Beginner",
    description: "Rival IQ focuses specifically on social media competitive analysis. It benchmarks your social performance against competitors, tracks their content strategy, and identifies what's working in your industry. Great for social media managers who need competitive insights.",
    keyFeatures: [
      "Social media benchmarking",
      "Competitor content analysis",
      "Hashtag tracking",
      "Post-level analytics",
      "Automated reporting",
      "Industry benchmarks"
    ],
    pros: [
      "Purpose-built for social CI",
      "Easy benchmarking",
      "Good visualization",
      "Helpful industry reports"
    ],
    cons: [
      "Social-only focus",
      "Mid-range pricing",
      "Limited platforms",
      "No listening features"
    ],
    useCases: ["Social media managers", "Marketing agencies", "Brand managers", "Content strategists"]
  },
  {
    id: 12,
    name: "Sprout Social",
    category: "Social & Brand Monitoring",
    bestFor: "Social management with competitive insights",
    pricing: "Paid",
    pricingDetails: "$249/mo (Standard) to $499/mo (Advanced)",
    website: "https://sproutsocial.com",
    rating: 4.6,
    difficulty: "Beginner",
    description: "Sprout Social is a comprehensive social media management platform with built-in competitive analysis features. Beyond scheduling and engagement, it offers competitor reports, share of voice analysis, and performance benchmarking to understand your competitive position.",
    keyFeatures: [
      "Competitor performance reports",
      "Share of voice analysis",
      "Social listening",
      "Engagement benchmarking",
      "Publishing & scheduling",
      "Team collaboration"
    ],
    pros: [
      "All-in-one social platform",
      "Beautiful interface",
      "Strong analytics",
      "Excellent support"
    ],
    cons: [
      "Expensive per user",
      "CI features cost extra",
      "Limited to social",
      "Add-on pricing model"
    ],
    useCases: ["Social media teams", "Marketing agencies", "Enterprise brands", "Multi-location businesses"]
  },
  {
    id: 13,
    name: "Owler",
    category: "Business Intelligence",
    bestFor: "Company insights & news alerts",
    pricing: "Freemium",
    pricingDetails: "Free / $99/mo (Pro) to custom (Enterprise)",
    website: "https://www.owler.com",
    rating: 4.3,
    difficulty: "Beginner",
    description: "Owler is a business intelligence platform that provides company profiles, news alerts, and competitive insights. It aggregates information about millions of companies including revenue estimates, employee counts, funding, and news, making it easy to track competitors and prospects.",
    keyFeatures: [
      "Company profiles",
      "Daily news alerts",
      "Revenue estimates",
      "Competitor graphs",
      "Industry insights",
      "CRM integration"
    ],
    pros: [
      "Free tier available",
      "Easy to use",
      "Good company data",
      "Useful daily digests"
    ],
    cons: [
      "Data accuracy varies",
      "Limited deep analysis",
      "US company focus",
      "Basic compared to alternatives"
    ],
    useCases: ["Sales prospecting", "Business development", "Market research", "News monitoring"]
  },
  {
    id: 14,
    name: "Crunchbase",
    category: "Business Intelligence",
    bestFor: "Funding & business intelligence",
    pricing: "Freemium",
    pricingDetails: "Free limited / $99/mo (Starter) to $199/mo (Pro)",
    website: "https://www.crunchbase.com",
    rating: 4.5,
    difficulty: "Beginner",
    description: "Crunchbase is the go-to platform for startup and business intelligence. It tracks funding rounds, acquisitions, key hires, and company news for millions of companies. Essential for understanding competitor funding, growth trajectory, and strategic moves.",
    keyFeatures: [
      "Funding round tracking",
      "Acquisition monitoring",
      "Executive changes",
      "Company financials",
      "Investment trends",
      "Industry analysis"
    ],
    pros: [
      "Best funding data",
      "Comprehensive company profiles",
      "Good API access",
      "Regular updates"
    ],
    cons: [
      "Startup-focused",
      "Limited for public companies",
      "Some data behind paywall",
      "International coverage varies"
    ],
    useCases: ["Investors", "Business development", "Market research", "Startup tracking"]
  },
  {
    id: 15,
    name: "G2",
    category: "Business Intelligence",
    bestFor: "Software market intelligence",
    pricing: "Freemium",
    pricingDetails: "Free to browse / Paid for seller tools",
    website: "https://www.g2.com",
    rating: 4.6,
    difficulty: "Beginner",
    description: "G2 is the largest software review platform, making it invaluable for competitive intelligence in B2B software. Track competitor reviews, ratings, market presence, and customer sentiment. Understand how buyers perceive you versus alternatives.",
    keyFeatures: [
      "Software reviews & ratings",
      "Competitor comparison grids",
      "Market presence scores",
      "Review sentiment analysis",
      "Buyer intent data",
      "Category reports"
    ],
    pros: [
      "Largest review database",
      "Authentic buyer reviews",
      "Great comparison tools",
      "Free to research"
    ],
    cons: [
      "B2B software only",
      "Reviews can be gamed",
      "Seller tools expensive",
      "Limited outside software"
    ],
    useCases: ["Product marketers", "Competitive analysts", "Sales teams", "Software buyers"]
  },
  {
    id: 16,
    name: "BuiltWith",
    category: "Technical Intelligence",
    bestFor: "Technology stack analysis",
    pricing: "Freemium",
    pricingDetails: "Free limited / $295/mo (Basic) to $995/mo (Pro)",
    website: "https://builtwith.com",
    rating: 4.4,
    difficulty: "Intermediate",
    description: "BuiltWith reveals the technology stack behind any website. See what CMS, analytics, marketing tools, hosting, and frameworks competitors use. Invaluable for understanding competitor tech investments and finding sales leads based on technology usage.",
    keyFeatures: [
      "Technology detection",
      "Historical tech tracking",
      "Technology trends",
      "Lead generation lists",
      "Market share reports",
      "API access"
    ],
    pros: [
      "Comprehensive tech detection",
      "Historical data",
      "Great for sales prospecting",
      "Regular updates"
    ],
    cons: [
      "Expensive premium plans",
      "Can miss some technologies",
      "Interface dated",
      "Learning curve for advanced features"
    ],
    useCases: ["Sales prospecting", "Technology research", "Market analysis", "Agency research"]
  },
  {
    id: 17,
    name: "Wappalyzer",
    category: "Technical Intelligence",
    bestFor: "Technology profiler",
    pricing: "Freemium",
    pricingDetails: "Free browser extension / $250/mo (Pro) to $900/mo (Business)",
    website: "https://www.wappalyzer.com",
    rating: 4.5,
    difficulty: "Beginner",
    description: "Wappalyzer is a technology profiler that identifies software and tools used on websites. With a popular browser extension and API, it's an accessible way to quickly understand competitor technology stacks, from CMS and frameworks to analytics and marketing tools.",
    keyFeatures: [
      "Browser extension",
      "Technology detection",
      "Lead lists by technology",
      "API access",
      "CRM integration",
      "Bulk lookup"
    ],
    pros: [
      "Free browser extension",
      "Easy to use",
      "Good accuracy",
      "Quick insights"
    ],
    cons: [
      "Less comprehensive than BuiltWith",
      "Limited free lookups",
      "No historical data (free)",
      "Expensive at scale"
    ],
    useCases: ["Quick tech checks", "Sales intelligence", "Developer research", "Competitive analysis"]
  },
  {
    id: 18,
    name: "Visualping",
    category: "Technical Intelligence",
    bestFor: "Website change monitoring",
    pricing: "Freemium",
    pricingDetails: "Free (5 pages) / $14/mo (Starter) to $100+/mo (Business)",
    website: "https://visualping.io",
    rating: 4.4,
    difficulty: "Beginner",
    description: "Visualping monitors websites for changes and sends alerts when updates occur. Track competitor pricing pages, product updates, job postings, and messaging changes automatically. Simple but powerful for staying on top of competitor movements.",
    keyFeatures: [
      "Visual change detection",
      "Email/Slack alerts",
      "Screenshot comparisons",
      "Scheduling options",
      "Multiple page monitoring",
      "Team collaboration"
    ],
    pros: [
      "Very easy to use",
      "Affordable pricing",
      "Good free tier",
      "Reliable alerts"
    ],
    cons: [
      "Basic compared to CI platforms",
      "No analysis features",
      "Limited to web pages",
      "Manual interpretation needed"
    ],
    useCases: ["Pricing monitoring", "Job posting tracking", "Content change alerts", "Competitor website tracking"]
  }
];

// FAQ Data
const faqs = [
  {
    question: "What is competitive intelligence (CI)?",
    answer: "Competitive intelligence is the systematic process of gathering, analyzing, and using information about competitors, market trends, and the business environment to make better strategic decisions. It includes tracking competitor products, pricing, marketing, hiring, funding, and market positioning to identify opportunities and threats."
  },
  {
    question: "What's the difference between competitive intelligence and corporate espionage?",
    answer: "Competitive intelligence uses legal, ethical methods to gather publicly available information - monitoring websites, press releases, social media, reviews, and public filings. Corporate espionage involves illegal activities like hacking, bribery, or theft of trade secrets. Proper CI relies only on ethical information gathering from legitimate sources."
  },
  {
    question: "How much do competitive intelligence tools cost?",
    answer: "CI tool pricing varies widely. Free/freemium options like SimilarWeb, Owler, and Crunchbase offer basic insights. Mid-range tools like SpyFu ($39/mo) and Mention ($49/mo) suit small teams. Enterprise platforms like Crayon, Klue, and Brandwatch typically cost $20,000-$100,000+ per year and include dedicated support."
  },
  {
    question: "What's the best free competitive intelligence tool?",
    answer: "For website traffic: SimilarWeb's free tier. For company info: Owler and Crunchbase free versions. For technology analysis: Wappalyzer browser extension. For social monitoring: Mention's free trial. For SEO competition: Google Search Console (for your own data) combined with free tools. Combining several free tools can provide solid basic coverage."
  },
  {
    question: "Do I need an enterprise CI platform?",
    answer: "Enterprise CI platforms (Crayon, Klue, Kompyte) are worth it if you have: a dedicated CI or product marketing team, an active sales team that needs battle cards, multiple competitors to track systematically, or budget of $20K+ annually. Smaller teams can often combine affordable tools like Semrush, SimilarWeb, and Visualping effectively."
  },
  {
    question: "What should I track about competitors?",
    answer: "Key areas to monitor include: 1) Product changes and launches, 2) Pricing and packaging updates, 3) Marketing messaging and positioning, 4) Website and content changes, 5) Social media activity, 6) Customer reviews and sentiment, 7) Hiring patterns (indicates investment areas), 8) Funding and financial news, 9) Partnerships and integrations, 10) Executive changes."
  },
  {
    question: "How do I create competitive battle cards?",
    answer: "Effective battle cards include: your key differentiators, competitor weaknesses to highlight, common objections and responses, pricing comparisons, feature comparison matrices, customer proof points, and competitive positioning statements. Tools like Klue and Crayon have built-in battle card builders, or use templates in Google Docs/Notion and update regularly."
  },
  {
    question: "SimilarWeb vs Semrush for competitive analysis?",
    answer: "SimilarWeb excels at traffic estimates, market share, and audience demographics - great for market research and investor analysis. Semrush is better for SEO/SEM competitive analysis including keywords, backlinks, and advertising. Many teams use both: SimilarWeb for traffic intelligence and Semrush for search/content competitive analysis."
  },
  {
    question: "How often should I update competitive intelligence?",
    answer: "Set up automated alerts for daily monitoring of critical changes. Review competitor websites and social media weekly. Conduct deeper competitive analysis monthly. Update battle cards and competitive positioning quarterly. Run comprehensive competitive landscape reviews annually. The right cadence depends on how fast your market moves."
  },
  {
    question: "What's the best way to organize competitive intelligence?",
    answer: "Create a central repository (Notion, Confluence, or CI platform) with: individual competitor profiles, battle cards for sales, competitive comparison matrices, a news feed of updates, win/loss analysis, and market landscape overview. Make it easily accessible to sales, marketing, and product teams with clear ownership for updates."
  }
];

export default function BestCompetitiveIntelligenceToolsPage() {
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");

  const categories = ["All", ...Array.from(new Set(ciTools.map(tool => tool.category)))];

  const filteredTools = selectedCategory === "All"
    ? ciTools
    : ciTools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "18 Best Competitive Intelligence Tools for 2026 - Complete Guide",
            "description": "Comprehensive guide to the best competitive intelligence tools in 2026. Compare features, pricing, pros & cons of top CI platforms including Crayon, Klue, SimilarWeb, and more.",
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
            "itemListElement": ciTools.slice(0, 10).map((tool, index) => ({
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
            <Link href="/" className="hover:text-indigo-900 flex items-center transition-colors">
              <Home className="w-3.5 h-3.5 mr-1" />
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/marketing" className="hover:text-indigo-900 transition-colors">Marketing</Link>
            <span className="text-gray-300">/</span>
            <span className="text-indigo-900 font-medium">Best Competitive Intelligence Tools</span>
          </nav>
        </div>
      </div>

      {/* Premium Hero Section */}
      <section className="relative overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #312e81 0%, #4338ca 50%, #312e81 100%)' }}>
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
              <span className="block text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #a5b4fc, #c4b5fd, #a5b4fc)' }}>
                Competitive Intelligence Tools
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
              18 meticulously reviewed tools to track, analyze, and outmaneuver your competitors.
              From free essentials to enterprise platforms—build your competitive advantage.
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
                <div className="text-4xl font-bold text-emerald-400">6</div>
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
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best Enterprise CI</p>
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">Crayon</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="#tool-5"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best Freemium</p>
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">SimilarWeb</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="#tool-6"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-violet-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-violet-50 text-violet-600 mb-3">
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best All-in-One</p>
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">Semrush</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="#tool-7"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 text-amber-600 mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best Budget Option</p>
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">SpyFu</p>
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
                  {ciTools.map((tool, idx) => (
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
                              ? { backgroundColor: '#e0e7ff', color: '#4338ca', border: '1px solid #c7d2fe' }
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
                style={selectedCategory === category ? { backgroundColor: '#4338ca', color: '#ffffff' } : {}}
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
                                ? { backgroundColor: '#e0e7ff', color: '#4338ca' }
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
                      <span key={idx} className="px-3 py-1.5 text-sm rounded-full font-medium" style={{ backgroundColor: '#e0e7ff', color: '#4338ca' }}>
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
            <p className="text-gray-500">Expert answers to common competitive intelligence questions.</p>
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
              { href: "/marketing/best-seo-tools", title: "Best SEO Tools", desc: "32 top SEO tools for rankings and traffic." },
              { href: "/marketing/ai-marketing-tools", title: "AI Marketing Tools", desc: "35+ AI tools for modern marketers." },
              { href: "/marketing/best-keyword-research-tools", title: "Keyword Research Tools", desc: "Find the right keywords for your content." }
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
