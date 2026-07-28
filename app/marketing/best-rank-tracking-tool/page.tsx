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
  ExternalLink,
  ChevronDown,
  Home,
  Zap,
  Award,
  Shield,
  Sparkles,
  ArrowRight,
  Target,
  BarChart3
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

// Local logo paths for rank tracking tools
const localLogoPaths: { [key: string]: string } = {
  "Semrush Position Tracking": "/Semrush logo.png",
  "Ahrefs Rank Tracker": "/ahrefs logo.png",
  "SE Ranking": "/se ranking logo.png",
  "Nightwatch": "/nightwatch logo.jpeg",
  "SERPWatcher (Mangools)": "/mangools (KWFinder) logo.jpeg",
  "Moz Pro Rank Tracker": "/Moz Pro Logo.jpeg",
  "Serpstat Rank Tracker": "/serpsat logo.jpeg",
  "Google Search Console": "/Google Search Console Logo.png",
  "AccuRanker": "/accuranker logo.png",
  "Wincher": "/Wincher logo.jpeg",
  "ProRankTracker": "/prorank tracker logo.png",
  "Advanced Web Ranking": "/advanced web ranking logo.jpeg",
  "Authority Labs": "/authority labs logo.png",
  "AgencyAnalytics": "/agency analytics logo.png",
  "Rank Tracker (SEO PowerSuite)": "/seo powersuite logo.png",
  "KeySearch": "/KeySearch Logo.png",
  "Ranktracker": "/Ranktracker logo.jpeg",
  "LowFruits": "/LowFruits Logo.jpeg",
  "MonsterInsights": "/monsterinsights logo.webp",
  "Peec AI": "/peec ai logo.png",
  "Looker Studio": "/looker studio logo.png",
};

// Custom domain mappings for fallback
const customLogoDomains: { [key: string]: string } = {
  "Google Search Console": "google.com",
  "Looker Studio": "google.com",
  "SERPWatcher (Mangools)": "mangools.com",
  "Semrush Position Tracking": "semrush.com",
  "Ahrefs Rank Tracker": "ahrefs.com",
  "Moz Pro Rank Tracker": "moz.com",
  "Rank Tracker (SEO PowerSuite)": "link-assistant.com",
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
        className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center text-white font-semibold shadow-sm"
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

// Rank Tracking Tools Data - 21 Tools
const rankTrackingTools = [
  {
    id: 1,
    name: "Semrush Position Tracking",
    category: "All-in-One Suite",
    bestFor: "Comprehensive rank tracking with marketing features",
    pricing: "Paid",
    pricingDetails: "$139.95/mo (Pro) to $499.95/mo (Business)",
    website: "https://semrush.com/position-tracking",
    rating: 4.8,
    difficulty: "Intermediate",
    description: "Semrush Position Tracking is part of the most comprehensive SEO suite available. It tracks daily rankings across devices and locations, monitors SERP features, and even tracks ChatGPT search visibility. Perfect for teams needing rank tracking plus full marketing capabilities.",
    keyFeatures: [
      "Daily rank updates for all plans",
      "Track desktop, mobile & tablet separately",
      "SERP feature tracking (featured snippets, PAA)",
      "ChatGPT search tracking",
      "Competitor position monitoring",
      "Looker Studio integration",
      "Automated PDF reports",
      "Local pack tracking"
    ],
    pros: [
      "Most comprehensive feature set",
      "Tracks AI search (ChatGPT)",
      "Excellent competitor analysis",
      "Integrates with full marketing suite"
    ],
    cons: [
      "Expensive for rank tracking alone",
      "Can be overwhelming for beginners",
      "Keyword limits on lower plans"
    ],
    useCases: ["Digital agencies", "Enterprise SEO teams", "Marketing departments", "Full-service marketers"]
  },
  {
    id: 2,
    name: "Ahrefs Rank Tracker",
    category: "All-in-One Suite",
    bestFor: "Backlink-focused SEOs who need rank tracking",
    pricing: "Paid",
    pricingDetails: "$29/mo (Starter) to $374/mo (Advanced)",
    website: "https://ahrefs.com/rank-tracker",
    rating: 4.7,
    difficulty: "Intermediate",
    description: "Ahrefs Rank Tracker combines accurate position monitoring with the industry's best backlink analysis. It's ideal for discovering keywords you're already ranking for that you didn't know about, and tracking competitors' rankings alongside your own.",
    keyFeatures: [
      "Discover unknown ranking keywords",
      "Track rankings across 170+ countries",
      "SERP feature monitoring",
      "Competitor rank comparison",
      "Visibility & traffic metrics",
      "Desktop & mobile tracking",
      "Scheduled email reports",
      "Historical ranking data"
    ],
    pros: [
      "Best for finding hidden rankings",
      "Excellent backlink + rank combo",
      "Intuitive interface",
      "Great educational resources"
    ],
    cons: [
      "Not the most accurate tracker",
      "Expensive for rank tracking only",
      "Updates not always daily"
    ],
    useCases: ["Link builders", "Content marketers", "SEO professionals", "Competitive analysis"]
  },
  {
    id: 3,
    name: "SE Ranking",
    category: "Agency Solution",
    bestFor: "Agencies managing multiple clients",
    pricing: "Paid",
    pricingDetails: "$65/mo (Essential) to $259/mo (Business)",
    website: "https://seranking.com",
    rating: 4.7,
    difficulty: "Intermediate",
    description: "SE Ranking offers one of the most accurate rank trackers on the market with 100% accuracy guarantee. It tracks 37+ SERP features, monitors AI Overviews, and provides traffic forecasts. Built specifically for agencies with white-label capabilities.",
    keyFeatures: [
      "100% ranking accuracy guarantee",
      "37+ SERP feature tracking",
      "AI Overview monitoring",
      "Traffic potential forecasts",
      "Share of voice metrics",
      "White-label reports",
      "Competitor tracking",
      "Local rank tracking"
    ],
    pros: [
      "Highly accurate tracking",
      "Excellent for agencies",
      "Tracks AI Overviews",
      "Competitive pricing"
    ],
    cons: [
      "Interface can feel cluttered",
      "Learning curve for all features",
      "Support response times vary"
    ],
    useCases: ["SEO agencies", "Multi-client management", "Local businesses", "Enterprise teams"]
  },
  {
    id: 4,
    name: "AccuRanker",
    category: "Dedicated Rank Tracker",
    bestFor: "High-volume, enterprise rank tracking",
    pricing: "Paid",
    pricingDetails: "$129/mo (1,000 keywords) to custom enterprise pricing",
    website: "https://accuranker.com",
    rating: 4.9,
    difficulty: "Intermediate",
    description: "AccuRanker is the fastest and most accurate dedicated rank tracker available. It refreshes rankings on-demand in seconds and handles massive keyword volumes with ease. Used by enterprises and programmatic SEO sites tracking 100,000+ keywords.",
    keyFeatures: [
      "On-demand rank refresh (seconds)",
      "Dynamic keyword tagging",
      "Share of voice tracking",
      "SERP feature analysis",
      "Landing page tracking",
      "Competitor discovery",
      "API access included",
      "Google Data Studio connector"
    ],
    pros: [
      "Fastest rank tracker available",
      "Handles massive keyword volumes",
      "On-demand refresh capability",
      "Excellent API"
    ],
    cons: [
      "Expensive for small sites",
      "Overkill for simple needs",
      "Dedicated tracker only (no other SEO features)"
    ],
    useCases: ["Enterprise SEO", "Programmatic SEO sites", "Large e-commerce", "SEO agencies"]
  },
  {
    id: 5,
    name: "Nightwatch",
    category: "Local Rank Tracker",
    bestFor: "Local and international rank tracking",
    pricing: "Paid",
    pricingDetails: "$39/mo (250 keywords) to $699/mo (10,000 keywords)",
    website: "https://nightwatch.io",
    rating: 4.6,
    difficulty: "Intermediate",
    description: "Nightwatch specializes in accurate local rank tracking across multiple locations and languages. It tracks Google, Bing, YouTube, and even DuckDuckGo. Known as one of the most accurate trackers for local search results.",
    keyFeatures: [
      "Hyper-local rank tracking",
      "Multi-search engine support",
      "YouTube rank tracking",
      "Automated SEO audits",
      "White-label reporting",
      "API access",
      "Competitor monitoring",
      "SERP screenshots"
    ],
    pros: [
      "Excellent local tracking accuracy",
      "Supports multiple search engines",
      "Clean, modern interface",
      "Good value per keyword"
    ],
    cons: [
      "Learning curve",
      "Non-US based (slower support)",
      "Limited additional SEO features"
    ],
    useCases: ["Local businesses", "Multi-location brands", "International SEO", "YouTube SEO"]
  },
  {
    id: 6,
    name: "SERPWatcher (Mangools)",
    category: "Beginner-Friendly",
    bestFor: "Beginners and small businesses",
    pricing: "Paid",
    pricingDetails: "$29/mo (Basic) to $79/mo (Agency)",
    website: "https://mangools.com/serpwatcher",
    rating: 4.5,
    difficulty: "Beginner",
    description: "SERPWatcher is part of the Mangools suite and offers the most user-friendly rank tracking experience. It provides daily updates, interactive shareable reports, and a unique Performance Index metric that simplifies understanding your ranking progress.",
    keyFeatures: [
      "Daily ranking updates",
      "Performance Index score",
      "Interactive report sharing",
      "Desktop & mobile tracking",
      "Estimated traffic metrics",
      "Competitor tracking",
      "Email alerts",
      "Rank distribution charts"
    ],
    pros: [
      "Most beginner-friendly interface",
      "Interactive shareable reports",
      "Affordable pricing",
      "Part of complete SEO suite"
    ],
    cons: [
      "Limited keyword allowance",
      "Less accurate for local",
      "Basic compared to enterprise tools"
    ],
    useCases: ["SEO beginners", "Freelancers", "Small businesses", "Bloggers"]
  },
  {
    id: 7,
    name: "Moz Pro Rank Tracker",
    category: "All-in-One Suite",
    bestFor: "Domain Authority-focused tracking",
    pricing: "Paid",
    pricingDetails: "$99/mo (Standard) to $599/mo (Premium)",
    website: "https://moz.com/products/pro/rank-tracking",
    rating: 4.4,
    difficulty: "Beginner",
    description: "Moz Pro's rank tracker integrates Domain Authority metrics with position tracking. It's ideal for SEOs who want to correlate ranking changes with authority metrics. The tool includes search visibility scores and comprehensive SERP analysis.",
    keyFeatures: [
      "Domain Authority integration",
      "Search visibility score",
      "Weekly rank updates",
      "SERP feature tracking",
      "Competitor comparisons",
      "Custom reporting",
      "Mobile rankings",
      "Local rank tracking"
    ],
    pros: [
      "DA metrics integration",
      "Beginner-friendly",
      "Strong educational resources",
      "Established reputation"
    ],
    cons: [
      "Weekly updates (not daily)",
      "Smaller keyword database",
      "Higher price for features offered"
    ],
    useCases: ["Link builders", "SEO beginners", "Client reporting", "Authority tracking"]
  },
  {
    id: 8,
    name: "Wincher",
    category: "Budget-Friendly",
    bestFor: "Best value rank tracker",
    pricing: "Paid",
    pricingDetails: "$29/mo (Starter) to $249/mo (Business)",
    website: "https://wincher.com",
    rating: 4.5,
    difficulty: "Beginner",
    description: "Wincher offers exceptional value with accurate daily rank tracking at affordable prices. It's a Swedish tool known for data accuracy and a clean, no-nonsense interface. Perfect for those who need reliable rank tracking without enterprise complexity.",
    keyFeatures: [
      "Daily rank updates",
      "Unlimited domains",
      "Competitor tracking",
      "On-page SEO suggestions",
      "Local rank tracking",
      "White-label reports",
      "Google Search Console integration",
      "Keyword grouping"
    ],
    pros: [
      "Excellent value for money",
      "Accurate tracking",
      "Clean, simple interface",
      "Unlimited domains"
    ],
    cons: [
      "Less known brand",
      "Limited advanced features",
      "Smaller user community"
    ],
    useCases: ["Budget-conscious teams", "Freelancers", "Small agencies", "Startups"]
  },
  {
    id: 9,
    name: "ProRankTracker",
    category: "White-Label Solution",
    bestFor: "Agencies needing white-label reports",
    pricing: "Paid",
    pricingDetails: "$49/mo (Starter) to $179/mo (Agency)",
    website: "https://proranktracker.com",
    rating: 4.4,
    difficulty: "Beginner",
    description: "ProRankTracker specializes in white-label rank tracking and reporting. It offers extensive customization for agency branding, supports 187 countries, and tracks Google, Bing, Yahoo, YouTube, and Amazon rankings.",
    keyFeatures: [
      "Full white-label customization",
      "187 country support",
      "Multi-search engine tracking",
      "Amazon rank tracking",
      "YouTube rank tracking",
      "Automated client reports",
      "Keyword grouping",
      "Historical data"
    ],
    pros: [
      "Best white-label capabilities",
      "Tracks Amazon & YouTube",
      "Many country options",
      "Affordable for agencies"
    ],
    cons: [
      "Interface feels dated",
      "Limited beyond rank tracking",
      "Support can be slow"
    ],
    useCases: ["SEO agencies", "White-label resellers", "E-commerce SEO", "YouTube marketers"]
  },
  {
    id: 10,
    name: "Advanced Web Ranking",
    category: "Enterprise Solution",
    bestFor: "Enterprise and large agencies",
    pricing: "Paid",
    pricingDetails: "$99/mo (Starter) to $499/mo (Enterprise)",
    website: "https://advancedwebranking.com",
    rating: 4.6,
    difficulty: "Advanced",
    description: "Advanced Web Ranking (AWR) has been in the rank tracking business since 2002. It offers enterprise-grade features including scheduled checks, flexible data aggregation, and one of the most comprehensive reporting systems available.",
    keyFeatures: [
      "Flexible scheduling options",
      "SERP feature tracking",
      "Data Studio integration",
      "Custom data aggregation",
      "Competitor intelligence",
      "White-label reports",
      "API access",
      "Historical data since 2002"
    ],
    pros: [
      "20+ years of experience",
      "Highly customizable",
      "Enterprise-ready features",
      "Excellent data accuracy"
    ],
    cons: [
      "Steep learning curve",
      "Expensive for small teams",
      "Complex interface"
    ],
    useCases: ["Enterprise SEO", "Large agencies", "Data analysts", "Long-term tracking"]
  },
  {
    id: 11,
    name: "Serpstat Rank Tracker",
    category: "All-in-One Suite",
    bestFor: "Budget-friendly all-in-one solution",
    pricing: "Paid",
    pricingDetails: "$69/mo (Lite) to $499/mo (Enterprise)",
    website: "https://serpstat.com/rank-tracker",
    rating: 4.4,
    difficulty: "Intermediate",
    description: "Serpstat offers a comprehensive SEO suite with solid rank tracking capabilities at a more affordable price than Semrush or Ahrefs. It includes keyword research, site audit, and competitor analysis alongside position tracking.",
    keyFeatures: [
      "Daily rank updates",
      "SERP feature monitoring",
      "Competitor tracking",
      "Market share analysis",
      "Keyword clustering",
      "Site audit included",
      "API access",
      "Team collaboration"
    ],
    pros: [
      "Affordable all-in-one solution",
      "Good for small teams",
      "Comprehensive features",
      "Batch analysis"
    ],
    cons: [
      "Smaller database than leaders",
      "Interface less polished",
      "Updates can be slower"
    ],
    useCases: ["Small agencies", "Startups", "Freelancers", "Budget teams"]
  },
  {
    id: 12,
    name: "Authority Labs",
    category: "Simple Rank Tracker",
    bestFor: "Straightforward, reliable tracking",
    pricing: "Paid",
    pricingDetails: "$49/mo (Plus) to $450/mo (Enterprise)",
    website: "https://authoritylabs.com",
    rating: 4.3,
    difficulty: "Beginner",
    description: "Authority Labs focuses on doing one thing well: accurate, reliable rank tracking. It offers daily tracking, local rank monitoring, and clean reports without the complexity of all-in-one suites. Great for those who need a dedicated tracker.",
    keyFeatures: [
      "Daily rank tracking",
      "Local rank monitoring",
      "Mobile rank tracking",
      "Competitor tracking",
      "White-label reports",
      "API access",
      "Historical data",
      "Automated alerts"
    ],
    pros: [
      "Simple and reliable",
      "Good local tracking",
      "Clean reports",
      "API for integrations"
    ],
    cons: [
      "Limited additional features",
      "Higher price for basic tracking",
      "Interface could be modernized"
    ],
    useCases: ["Simple tracking needs", "Local businesses", "API integrations", "Reporting focus"]
  },
  {
    id: 13,
    name: "AgencyAnalytics",
    category: "Client Reporting",
    bestFor: "Marketing agencies needing client dashboards",
    pricing: "Paid",
    pricingDetails: "$79/mo (Freelancer) to $399/mo (Agency)",
    website: "https://agencyanalytics.com",
    rating: 4.6,
    difficulty: "Beginner",
    description: "AgencyAnalytics is a complete client reporting platform with built-in rank tracking. It combines data from 80+ marketing platforms into beautiful, automated client dashboards. Rank tracking is just one of many integrated features.",
    keyFeatures: [
      "80+ marketing integrations",
      "Automated client dashboards",
      "Rank tracking included",
      "White-label everything",
      "Client access portals",
      "Automated report sending",
      "Custom widgets",
      "Staff task management"
    ],
    pros: [
      "All-in-one reporting platform",
      "Beautiful dashboards",
      "Client-friendly portals",
      "Time-saving automation"
    ],
    cons: [
      "Rank tracking not the focus",
      "Expensive for rank tracking alone",
      "Requires multiple data sources"
    ],
    useCases: ["Marketing agencies", "Client reporting", "Multi-channel tracking", "Freelancers"]
  },
  {
    id: 14,
    name: "Rank Tracker (SEO PowerSuite)",
    category: "Desktop Solution",
    bestFor: "Desktop-based unlimited tracking",
    pricing: "Freemium",
    pricingDetails: "Free (limited) / $29.10/mo (Professional)",
    website: "https://link-assistant.com/rank-tracker",
    rating: 4.3,
    difficulty: "Intermediate",
    description: "Rank Tracker by SEO PowerSuite is a powerful desktop application that offers unlimited keyword tracking. Unlike cloud tools, you pay once and track as many keywords as your computer can handle. It supports Google, Bing, Yahoo, and Yandex.",
    keyFeatures: [
      "Unlimited keyword tracking",
      "Desktop application",
      "Multiple search engines",
      "Local rank tracking",
      "SERP history tracking",
      "Competitor monitoring",
      "Customizable workspaces",
      "Scheduled checks"
    ],
    pros: [
      "Unlimited keywords",
      "One-time purchase option",
      "Tracks multiple search engines",
      "Full data ownership"
    ],
    cons: [
      "Desktop only (no cloud)",
      "Steep learning curve",
      "Can be resource-intensive"
    ],
    useCases: ["High-volume tracking", "Desktop preference", "Budget-conscious", "Data privacy focus"]
  },
  {
    id: 15,
    name: "KeySearch",
    category: "Budget All-in-One",
    bestFor: "Startups and solo SEOs on a budget",
    pricing: "Paid",
    pricingDetails: "$24/mo (Starter) to $49/mo (Pro)",
    website: "https://keysearch.co",
    rating: 4.2,
    difficulty: "Beginner",
    description: "KeySearch is one of the most affordable all-in-one SEO tools that includes rank tracking. It combines keyword research, competitor analysis, and content optimization with position tracking at a fraction of the cost of premium tools.",
    keyFeatures: [
      "Daily rank tracking",
      "Keyword research included",
      "Competitor analysis",
      "AI content optimization",
      "Backlink checker",
      "YouTube rank tracking",
      "Difficulty scores",
      "Keyword grouping"
    ],
    pros: [
      "Most affordable option",
      "Full SEO suite included",
      "Good for beginners",
      "YouTube tracking"
    ],
    cons: [
      "Older codebase (can be slow)",
      "Interface not intuitive",
      "Limited accuracy for local"
    ],
    useCases: ["Startups", "Solo SEOs", "Bloggers", "Budget-limited teams"]
  },
  {
    id: 16,
    name: "Ranktracker",
    category: "GBP Focused",
    bestFor: "Google Business Profile tracking",
    pricing: "Paid",
    pricingDetails: "$24/mo (Starter) to $374/mo (Enterprise)",
    website: "https://ranktracker.com",
    rating: 4.3,
    difficulty: "Beginner",
    description: "Ranktracker specializes in Google Business Profile rank tracking alongside traditional SERP tracking. It monitors rankings across Google, Yahoo, and Bing with visual dashboards showing visibility percentages and competitor comparisons.",
    keyFeatures: [
      "Google Business Profile tracking",
      "Multi-search engine support",
      "Visual dashboards",
      "Visibility percentage",
      "Competitor monitoring",
      "Daily updates",
      "White-label reports",
      "Keyword discovery"
    ],
    pros: [
      "Excellent for local SEO",
      "GBP rank tracking",
      "Simple interface",
      "Affordable entry price"
    ],
    cons: [
      "Interface feels dated",
      "Includes features you may not need",
      "Support can be slow"
    ],
    useCases: ["Local businesses", "GBP optimization", "Multi-location brands", "Local SEO agencies"]
  },
  {
    id: 17,
    name: "LowFruits",
    category: "SERP Analysis",
    bestFor: "Finding easy-to-rank keywords",
    pricing: "Paid",
    pricingDetails: "$29.90/mo (Standard) to $99.90/mo (Unlimited)",
    website: "https://lowfruits.io",
    rating: 4.5,
    difficulty: "Intermediate",
    description: "LowFruits is unique in that it focuses on SERP weakness analysis alongside rank tracking. It helps you find keywords where weak competitors are ranking, making it easier to identify quick win opportunities and track your progress on them.",
    keyFeatures: [
      "SERP weakness analysis",
      "Keyword clustering",
      "Competitor strength scoring",
      "Rank tracking",
      "Keyword discovery",
      "Domain authority checks",
      "Bulk analysis",
      "Export capabilities"
    ],
    pros: [
      "Finds easy ranking opportunities",
      "Unique SERP analysis",
      "Good keyword clustering",
      "Identifies weak competitors"
    ],
    cons: [
      "Not focused on rank tracking",
      "Learning curve for features",
      "Credit-based system"
    ],
    useCases: ["Content strategists", "Niche site builders", "Affiliate marketers", "Keyword research"]
  },
  {
    id: 18,
    name: "MonsterInsights",
    category: "WordPress Plugin",
    bestFor: "WordPress users wanting simple tracking",
    pricing: "Paid",
    pricingDetails: "$99.60/year (Plus) to $399.60/year (Agency)",
    website: "https://monsterinsights.com",
    rating: 4.2,
    difficulty: "Beginner",
    description: "MonsterInsights is the leading Google Analytics plugin for WordPress that includes search ranking reports. It brings your SEO data directly into the WordPress dashboard, making it easy to monitor rankings without leaving your site.",
    keyFeatures: [
      "WordPress-native dashboard",
      "Google Analytics integration",
      "Search Console integration",
      "E-commerce tracking",
      "Page-level insights",
      "Real-time stats",
      "Custom dimensions",
      "WooCommerce support"
    ],
    pros: [
      "No separate tool needed",
      "WordPress integration",
      "E-commerce features",
      "Beginner-friendly"
    ],
    cons: [
      "WordPress only",
      "Basic rank tracking",
      "Annual subscription",
      "UI feels dated"
    ],
    useCases: ["WordPress sites", "E-commerce stores", "WooCommerce users", "Simple tracking needs"]
  },
  {
    id: 19,
    name: "Google Search Console",
    category: "Free Tool",
    bestFor: "Essential free rank data",
    pricing: "Free",
    pricingDetails: "Completely free forever",
    website: "https://search.google.com/search-console",
    rating: 4.7,
    difficulty: "Beginner",
    description: "Google Search Console is the essential free tool every website needs. It provides first-party ranking data directly from Google, showing average positions, impressions, clicks, and CTR. It's the source of truth for how Google sees your rankings.",
    keyFeatures: [
      "First-party Google data",
      "Average position tracking",
      "Click and impression data",
      "CTR analysis",
      "Query performance",
      "Page-level rankings",
      "Mobile vs desktop",
      "16 months historical data"
    ],
    pros: [
      "100% free",
      "Direct data from Google",
      "Essential for any website",
      "Reliable and accurate"
    ],
    cons: [
      "Shows averages (not exact positions)",
      "Data delayed 24-48 hours",
      "Limited to 16 months",
      "No competitor data"
    ],
    useCases: ["Every website owner", "SEO beginners", "Verification of paid tools", "Performance baselines"]
  },
  {
    id: 20,
    name: "Peec AI",
    category: "AI Search Tracking",
    bestFor: "Tracking visibility in AI search engines",
    pricing: "Paid",
    pricingDetails: "$89/mo (Starter) to custom enterprise pricing",
    website: "https://peec.ai",
    rating: 4.4,
    difficulty: "Intermediate",
    description: "Peec AI is a specialized tool for tracking your visibility in AI search engines like ChatGPT, Claude, and Perplexity. As AI search grows, knowing if your brand is being cited becomes crucial. Peec generates relevant prompts and tracks mentions.",
    keyFeatures: [
      "ChatGPT search tracking",
      "Claude AI monitoring",
      "Perplexity visibility",
      "Auto-generated prompts",
      "Source URL tracking",
      "Competitor AI visibility",
      "Trend analysis",
      "CSV export"
    ],
    pros: [
      "Unique AI search tracking",
      "Auto-generates test prompts",
      "Clean interface",
      "Unlimited seats"
    ],
    cons: [
      "New and evolving space",
      "Best for established brands",
      "No retroactive data",
      "Premium pricing"
    ],
    useCases: ["Brand monitoring", "AI search optimization", "Enterprise marketing", "Future-proofing SEO"]
  },
  {
    id: 21,
    name: "Looker Studio",
    category: "Free Dashboard",
    bestFor: "Custom free rank tracking dashboards",
    pricing: "Free",
    pricingDetails: "Completely free",
    website: "https://lookerstudio.google.com",
    rating: 4.5,
    difficulty: "Advanced",
    description: "Looker Studio (formerly Google Data Studio) lets you create custom rank tracking dashboards using Google Search Console data for free. With community templates and connectors, you can build sophisticated reporting without any subscription costs.",
    keyFeatures: [
      "Free custom dashboards",
      "GSC direct integration",
      "GA4 integration",
      "Shareable reports",
      "Community templates",
      "Third-party connectors",
      "Auto-refresh",
      "Collaboration features"
    ],
    pros: [
      "Completely free",
      "Uses first-party data",
      "Highly customizable",
      "Easy sharing"
    ],
    cons: [
      "Steep learning curve",
      "Requires setup time",
      "Can be slow with big data",
      "Limited to GSC data"
    ],
    useCases: ["Budget-conscious teams", "Data analysts", "Custom reporting", "Client dashboards"]
  }
];

// FAQ Data
const faqs = [
  {
    question: "What is the best free rank tracking tool in 2026?",
    answer: "Google Search Console is the best free rank tracking tool as it provides first-party data directly from Google. For custom dashboards, Looker Studio (free) can visualize GSC data beautifully. Rank Tracker by SEO PowerSuite also offers a free version with limited features but unlimited keywords."
  },
  {
    question: "How often should I check my keyword rankings?",
    answer: "Daily rank tracking is ideal for active SEO campaigns, but weekly tracking is sufficient for most websites. Avoid checking multiple times per day as rankings naturally fluctuate. Focus on trends over 2-4 weeks rather than daily changes."
  },
  {
    question: "AccuRanker vs Semrush: Which rank tracker is better?",
    answer: "AccuRanker is better if you need dedicated, fast rank tracking with on-demand refresh for high keyword volumes. Semrush is better if you need rank tracking as part of a complete SEO and marketing suite. Choose AccuRanker for speed and accuracy; choose Semrush for all-in-one capabilities."
  },
  {
    question: "What is local rank tracking and do I need it?",
    answer: "Local rank tracking monitors your rankings in specific geographic locations (cities, zip codes, or even neighborhoods). You need it if you're a local business, have physical locations, or target customers in specific areas. Tools like Nightwatch and SE Ranking excel at local tracking."
  },
  {
    question: "How accurate are rank tracking tools?",
    answer: "Modern rank trackers are generally 90-98% accurate. Variations occur due to personalization, location differences, and Google's constantly changing SERPs. AccuRanker and SE Ranking are considered the most accurate. Always use Google Search Console to verify trends from paid tools."
  },
  {
    question: "Can I track rankings for AI search like ChatGPT?",
    answer: "Yes, tools like Semrush Position Tracking now track ChatGPT search visibility. Dedicated tools like Peec AI specialize in monitoring your brand's presence across ChatGPT, Claude, and Perplexity. This is becoming increasingly important as AI search grows."
  },
  {
    question: "How many keywords should I track?",
    answer: "Track 50-100 keywords for small sites, 200-500 for medium businesses, and 1,000+ for large sites or e-commerce. Focus on keywords that drive business value: high-intent terms, branded searches, and top-performing content pages."
  },
  {
    question: "What's the difference between rank tracking and SERP tracking?",
    answer: "Rank tracking monitors your position for specific keywords. SERP tracking analyzes the entire search results page including featured snippets, People Also Ask, local packs, and other SERP features. Most modern tools include both capabilities."
  },
  {
    question: "Should I track desktop and mobile rankings separately?",
    answer: "Yes, always track both. Mobile rankings often differ from desktop due to different algorithms and local factors. With mobile-first indexing, mobile rankings are typically more important. Most tools allow separate tracking for both devices."
  },
  {
    question: "What is share of voice in rank tracking?",
    answer: "Share of voice measures your visibility compared to competitors for a set of keywords. If you rank #1 for 20% of your tracked keywords and competitors have the rest, your share of voice is ~20%. Tools like SE Ranking and AccuRanker provide this metric."
  }
];

export default function BestRankTrackingToolPage() {
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");

  const categories = ["All", ...Array.from(new Set(rankTrackingTools.map(tool => tool.category)))];

  const filteredTools = selectedCategory === "All"
    ? rankTrackingTools
    : rankTrackingTools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "21 Best Rank Tracking Tools for 2026 (Free & Paid) - Complete Guide",
            "description": "Comprehensive guide to the best rank tracking tools in 2026. Compare features, pricing, pros & cons of 21 top tools including Semrush, Ahrefs, AccuRanker, and more.",
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
            "datePublished": "2026-07-28",
            "dateModified": "2026-07-28"
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
            "itemListElement": rankTrackingTools.slice(0, 10).map((tool, index) => ({
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
            <Link href="/" className="hover:text-slate-900 flex items-center transition-colors">
              <Home className="w-3.5 h-3.5 mr-1" />
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/marketing" className="hover:text-slate-900 transition-colors">Marketing</Link>
            <span className="text-gray-300">/</span>
            <span className="text-slate-900 font-medium">Best Rank Tracking Tools</span>
          </nav>
        </div>
      </div>

      {/* Premium Hero Section */}
      <section className="relative overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
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
              <span className="block text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #60a5fa, #a78bfa, #60a5fa)' }}>
                Rank Tracking Tools
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
              21 expert-reviewed tools to monitor your keyword rankings.
              From free essentials to enterprise solutions—find your perfect tracker.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">21</div>
                <div className="text-sm text-gray-400 mt-1">Tools Reviewed</div>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-4xl font-bold text-white">10</div>
                <div className="text-sm text-gray-400 mt-1">Categories</div>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400">3</div>
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
              href="#tool-19"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best Free Tool</p>
              <p className="font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">Google Search Console</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="#tool-4"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 mb-3">
                <Target className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Most Accurate</p>
              <p className="font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">AccuRanker</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="#tool-1"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-violet-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-violet-50 text-violet-600 mb-3">
                <Award className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best All-in-One</p>
              <p className="font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">Semrush</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="#tool-8"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 text-amber-600 mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best Value</p>
              <p className="font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">Wincher</p>
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
                  {rankTrackingTools.map((tool, idx) => (
                    <tr key={tool.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a href={`#tool-${tool.id}`} className="flex items-center gap-3 font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
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
                              ? { backgroundColor: '#dbeafe', color: '#1d4ed8', border: '1px solid #bfdbfe' }
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
                style={selectedCategory === category ? { backgroundColor: '#0f172a', color: '#ffffff' } : {}}
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
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
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
                                ? { backgroundColor: '#dbeafe', color: '#1d4ed8' }
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
                    <a
                      href={tool.website}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-colors shadow-lg shrink-0"
                      style={{ backgroundColor: '#0f172a', color: '#ffffff' }}
                    >
                      Visit Website
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 md:p-8">
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-8">{tool.description}</p>

                  {/* Pricing Banner */}
                  <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-4 mb-8 border border-gray-100">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-slate-600" />
                      <div>
                        <span className="font-semibold text-gray-900">Pricing: </span>
                        <span className="text-gray-600">{tool.pricingDetails}</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Key Features</h4>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {tool.keyFeatures.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2.5">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
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
                      <span key={idx} className="px-3 py-1.5 text-sm rounded-full font-medium" style={{ backgroundColor: '#f1f5f9', color: '#475569' }}>
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
            <p className="text-gray-500">Expert answers to common rank tracking questions.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-gray-50 rounded-2xl overflow-hidden transition-all duration-300 ${
                  expandedFaq === index ? 'ring-2 ring-slate-200' : ''
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

      {/* CTA Section - Premium Design */}
      <section className="py-20 px-4 sm:px-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

        <div className="container mx-auto max-w-3xl text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-6" style={{ color: '#d1d5db' }}>
            <BarChart3 className="w-4 h-4 text-amber-400" />
            Start tracking today
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Track Your Rankings?</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: '#d1d5db' }}>
            Start with free Google Search Console, then upgrade to premium tools as your needs grow.
          </p>
          <a
            href="https://search.google.com/search-console"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-all shadow-xl hover:-translate-y-0.5"
            style={{ backgroundColor: '#ffffff', color: '#0f172a' }}
          >
            Start with Search Console
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Related Content - Premium Grid */}
      <section className="py-16 px-4 sm:px-6 bg-[#FAFBFC]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">Explore More Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { href: "/marketing/best-seo-tools", title: "Best SEO Tools", desc: "Complete guide to 32 top SEO tools for 2026." },
              { href: "/blog/best-ai-chatbots", title: "Best AI Chatbots", desc: "Top AI chatbots for productivity and learning." },
              { href: "/calculators", title: "Free Calculators", desc: "100+ free calculators for math, finance, and more." }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2 transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
                <div className="mt-4 text-blue-600 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
