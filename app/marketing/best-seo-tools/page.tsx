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
  ArrowRight
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

// Local logo paths for SEO tools
const localLogoPaths: { [key: string]: string } = {
  "Google Search Console": "/Google Search Console Logo.png",
  "Ahrefs": "/ahrefs logo.png",
  "Semrush": "/Semrush logo.png",
  "Surfer SEO": "/Surfer SEO logo.jpeg",
  "Moz Pro": "/Moz Pro Logo.jpeg",
  "Screaming Frog": "/screaming frog logo.png",
  "Google Keyword Planner": "/google keyword planner logo.png",
  "Ubersuggest": "/Ubersuggest logo.png",
  "SE Ranking": "/se ranking logo.png",
  "Clearscope": "/clearscope logo.jpeg",
  "Mangools (KWFinder)": "/mangools (KWFinder) logo.jpeg",
  "Majestic": "/majestic logo.png",
  "SpyFu": "/spyfu logo.webp",
  "Yoast SEO": "/yoast logo.jpeg",
  "Rank Math": "/rankmath logo.jpeg",
  "AnswerThePublic": "/answerthepublic logo.png",
  "Google Trends": "/googletrends logo.png",
  "BrightLocal": "/Brightlocal logo.jpeg",
  "Sitebulb": "/sitebulb logo.jpeg",
  "Bing Webmaster Tools": "/bing webmaster tools logo.jpeg",
  "Frase": "/frase logo.png",
  "Keywords Everywhere": "/keywords everywhere logo.png",
  "Google Analytics 4": "/google analytics 4 logo.png",
  "Serpstat": "/serpsat logo.jpeg",
  "PageSpeed Insights": "/pagespeed insights logo.png",
  "Ahrefs Webmaster Tools": "/ahrefs webmaster tools logo.png",
  "GTmetrix": "/gtmetrix logo.png",
  "Nightwatch": "/nightwatch logo.jpeg",
  "Copyscape": "/copyscape logo.png",
  "Schema Pro": "/schema pro logo.png",
  "Linkody": "/linkody logo.jpeg",
  "Perplexity AI": "/perplexity ai logo.png",
};

// Custom domain mappings for fallback
const customLogoDomains: { [key: string]: string } = {
  "Google Search Console": "google.com",
  "Google Keyword Planner": "google.com",
  "Google Trends": "google.com",
  "Google Analytics 4": "google.com",
  "Bing Webmaster Tools": "microsoft.com",
  "PageSpeed Insights": "google.com",
  "Ahrefs Webmaster Tools": "ahrefs.com",
  "Looker Studio": "google.com",
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

// SEO Tools Data - 32 Tools
const seoTools = [
  {
    id: 1,
    name: "Google Search Console",
    category: "Technical SEO",
    bestFor: "First-party data & indexing",
    pricing: "Free",
    pricingDetails: "Completely free forever",
    website: "https://search.google.com/search-console",
    rating: 4.8,
    difficulty: "Beginner",
    description: "Google Search Console is the source of truth for understanding how Google sees your website. It provides first-party data directly from Google about your search performance, indexing status, and technical issues.",
    keyFeatures: [
      "Track keyword rankings and clicks",
      "Monitor indexing status",
      "Submit sitemaps",
      "Identify crawl errors",
      "Core Web Vitals monitoring",
      "Mobile usability reports"
    ],
    pros: [
      "100% free with no limitations",
      "Direct data from Google",
      "Essential for any website owner",
      "Helps fix technical issues quickly"
    ],
    cons: [
      "Data delayed by 24-48 hours",
      "No competitor analysis",
      "Limited historical data (16 months)"
    ],
    useCases: ["Website owners", "SEO beginners", "Technical SEO audits", "Performance monitoring"]
  },
  {
    id: 2,
    name: "Ahrefs",
    category: "All-in-One SEO Suite",
    bestFor: "Backlink analysis & competitor research",
    pricing: "Paid",
    pricingDetails: "$29/mo (Starter) to $374/mo (Advanced)",
    website: "https://ahrefs.com",
    rating: 4.8,
    difficulty: "Intermediate",
    description: "Ahrefs is widely considered the gold standard for backlink analysis. With the largest backlink index in the industry, it's the go-to tool for competitive research, keyword research, and understanding your link profile.",
    keyFeatures: [
      "Site Explorer for backlink analysis",
      "Keywords Explorer with 10B+ keywords",
      "Content Explorer for content ideas",
      "Rank Tracker",
      "Site Audit tool",
      "Competitor traffic analysis"
    ],
    pros: [
      "Most accurate backlink data",
      "Intuitive user interface",
      "Excellent content research tools",
      "Regular feature updates"
    ],
    cons: [
      "Expensive for beginners",
      "Credits system can be limiting",
      "No free trial available"
    ],
    useCases: ["Link building", "Competitor analysis", "Content marketing", "SEO agencies"]
  },
  {
    id: 3,
    name: "Semrush",
    category: "All-in-One SEO Suite",
    bestFor: "Complete digital marketing toolkit",
    pricing: "Paid",
    pricingDetails: "$139.95/mo (Pro) to $499.95/mo (Business)",
    website: "https://semrush.com",
    rating: 4.7,
    difficulty: "Intermediate",
    description: "Semrush is the Swiss Army knife of digital marketing. Beyond SEO, it covers PPC, social media, content marketing, and competitive research. It's ideal for agencies and in-house marketing teams who need one platform for everything.",
    keyFeatures: [
      "Keyword Magic Tool (25B+ keywords)",
      "Position Tracking",
      "Site Audit with 140+ checks",
      "Backlink Analytics",
      "Content Marketing Platform",
      "Social Media Management"
    ],
    pros: [
      "Most comprehensive feature set",
      "Excellent for PPC research",
      "Great educational resources",
      "AI writing assistant included"
    ],
    cons: [
      "Can be overwhelming for beginners",
      "Expensive pricing",
      "Some features need add-ons"
    ],
    useCases: ["Digital marketing agencies", "Enterprise SEO", "PPC campaigns", "Content strategy"]
  },
  {
    id: 4,
    name: "Surfer SEO",
    category: "Content Optimization",
    bestFor: "On-page SEO & content writing",
    pricing: "Paid",
    pricingDetails: "$99/mo (Essential) to $219/mo (Scale)",
    website: "https://surferseo.com",
    rating: 4.7,
    difficulty: "Beginner",
    description: "Surfer SEO analyzes top-ranking pages and gives you a content optimization blueprint. It tells you exactly which keywords to include, optimal word count, headings structure, and more to outrank competitors.",
    keyFeatures: [
      "Content Editor with real-time scoring",
      "SERP Analyzer",
      "Keyword Research tool",
      "AI writing assistant (Surfer AI)",
      "Google Docs integration",
      "Audit existing content"
    ],
    pros: [
      "Easy to understand content scores",
      "Integrates with Google Docs",
      "AI writer saves time",
      "Great for content teams"
    ],
    cons: [
      "Limited to content optimization",
      "No backlink analysis",
      "Can encourage keyword stuffing"
    ],
    useCases: ["Content writers", "SEO content teams", "Blog optimization", "Freelance writers"]
  },
  {
    id: 5,
    name: "Moz Pro",
    category: "All-in-One SEO Suite",
    bestFor: "Domain authority & link metrics",
    pricing: "Paid",
    pricingDetails: "$99/mo (Standard) to $599/mo (Premium)",
    website: "https://moz.com",
    rating: 4.5,
    difficulty: "Beginner",
    description: "Moz pioneered the concept of Domain Authority (DA), which remains an industry-standard metric. Moz Pro offers a complete SEO toolkit with excellent educational resources and a supportive community.",
    keyFeatures: [
      "Domain Authority metric",
      "Keyword Explorer",
      "Link Explorer",
      "Site Crawl",
      "Rank Tracking",
      "On-page optimization"
    ],
    pros: [
      "Trusted DA metric",
      "Beginner-friendly interface",
      "Excellent learning resources",
      "Active community"
    ],
    cons: [
      "Smaller link index than Ahrefs",
      "Slower crawling speed",
      "Less frequent data updates"
    ],
    useCases: ["SEO beginners", "Link building outreach", "Client reporting", "Local SEO"]
  },
  {
    id: 6,
    name: "Screaming Frog",
    category: "Technical SEO",
    bestFor: "Website crawling & technical audits",
    pricing: "Freemium",
    pricingDetails: "Free (500 URLs) / $259/year (Unlimited)",
    website: "https://screamingfrog.co.uk",
    rating: 4.9,
    difficulty: "Advanced",
    description: "Screaming Frog is the industry-standard desktop crawler for technical SEO audits. It crawls websites like search engines do, finding broken links, duplicate content, redirect chains, and other technical issues.",
    keyFeatures: [
      "Website crawling",
      "Find broken links (404s)",
      "Audit redirects",
      "Analyze page titles & meta descriptions",
      "Generate XML sitemaps",
      "Extract data with XPath"
    ],
    pros: [
      "Extremely thorough audits",
      "Fast crawling speed",
      "Exports to multiple formats",
      "Regular updates"
    ],
    cons: [
      "Steep learning curve",
      "Desktop app (no cloud version)",
      "Can be resource-intensive"
    ],
    useCases: ["Technical SEO audits", "Site migrations", "Large websites", "Finding duplicate content"]
  },
  {
    id: 7,
    name: "Google Keyword Planner",
    category: "Keyword Research",
    bestFor: "Search volume & CPC data",
    pricing: "Free",
    pricingDetails: "Free (requires Google Ads account)",
    website: "https://ads.google.com/keyword-planner",
    rating: 4.4,
    difficulty: "Beginner",
    description: "Google Keyword Planner provides keyword ideas and search volume estimates directly from Google. While designed for advertisers, it's invaluable for SEO keyword research with accurate Google data.",
    keyFeatures: [
      "Search volume estimates",
      "Keyword suggestions",
      "Competition levels",
      "CPC estimates",
      "Seasonal trends",
      "Location-based data"
    ],
    pros: [
      "Data directly from Google",
      "Completely free",
      "Accurate CPC data",
      "Great for local keyword research"
    ],
    cons: [
      "Volume ranges (not exact numbers)",
      "Buried in Google Ads interface",
      "Limited without ad spend"
    ],
    useCases: ["Keyword research", "PPC planning", "Content ideation", "Local SEO"]
  },
  {
    id: 8,
    name: "Ubersuggest",
    category: "All-in-One SEO Suite",
    bestFor: "Budget-friendly SEO toolkit",
    pricing: "Freemium",
    pricingDetails: "Free (limited) / $29/mo or $290 lifetime",
    website: "https://neilpatel.com/ubersuggest",
    rating: 4.3,
    difficulty: "Beginner",
    description: "Ubersuggest by Neil Patel offers a solid SEO toolkit at an affordable price. It's perfect for small businesses and beginners who want essential SEO features without the enterprise price tag.",
    keyFeatures: [
      "Keyword research",
      "Site audit",
      "Backlink data",
      "Competitor analysis",
      "Content ideas",
      "Rank tracking"
    ],
    pros: [
      "Very affordable pricing",
      "Lifetime deal available",
      "Easy to use",
      "Good for beginners"
    ],
    cons: [
      "Less accurate than premium tools",
      "Limited daily searches on free plan",
      "Smaller database"
    ],
    useCases: ["Small businesses", "Bloggers", "SEO beginners", "Freelancers on budget"]
  },
  {
    id: 9,
    name: "SE Ranking",
    category: "All-in-One SEO Suite",
    bestFor: "Agencies managing multiple clients",
    pricing: "Paid",
    pricingDetails: "$65/mo (Essential) to $259/mo (Business)",
    website: "https://seranking.com",
    rating: 4.6,
    difficulty: "Intermediate",
    description: "SE Ranking is built for agencies and businesses managing multiple websites. It offers white-label reports, client management features, and a comprehensive SEO toolkit at competitive pricing.",
    keyFeatures: [
      "Accurate rank tracking",
      "Website audit",
      "Backlink checker",
      "Competitor research",
      "White-label reports",
      "Marketing plan templates"
    ],
    pros: [
      "Great value for agencies",
      "White-label capabilities",
      "Accurate rank tracking",
      "Lead generation tools"
    ],
    cons: [
      "Interface can be cluttered",
      "Learning curve for all features",
      "Support response times vary"
    ],
    useCases: ["SEO agencies", "Multi-site management", "Client reporting", "Local businesses"]
  },
  {
    id: 10,
    name: "Clearscope",
    category: "Content Optimization",
    bestFor: "Enterprise content optimization",
    pricing: "Paid",
    pricingDetails: "$189/mo (Essentials) to custom pricing",
    website: "https://clearscope.io",
    rating: 4.8,
    difficulty: "Beginner",
    description: "Clearscope is a premium content optimization platform used by major brands like IBM, Shopify, and Conde Nast. It analyzes top-ranking content and provides data-driven recommendations for creating comprehensive articles.",
    keyFeatures: [
      "Content grade scoring",
      "Keyword recommendations",
      "Competitor content analysis",
      "Google Docs integration",
      "WordPress plugin",
      "Content inventory tracking"
    ],
    pros: [
      "Extremely accurate recommendations",
      "Clean, intuitive interface",
      "Great for large content teams",
      "Excellent customer support"
    ],
    cons: [
      "Very expensive",
      "Limited reports per month",
      "No keyword research tool"
    ],
    useCases: ["Enterprise content teams", "SaaS companies", "Publishing houses", "Content agencies"]
  },
  {
    id: 11,
    name: "Mangools (KWFinder)",
    category: "Keyword Research",
    bestFor: "Finding low-competition keywords",
    pricing: "Paid",
    pricingDetails: "$29/mo (Basic) to $79/mo (Agency)",
    website: "https://mangools.com",
    rating: 4.6,
    difficulty: "Beginner",
    description: "Mangools suite includes KWFinder, one of the most user-friendly keyword research tools available. It excels at finding long-tail keywords with low difficulty that are easier to rank for.",
    keyFeatures: [
      "KWFinder for keyword research",
      "SERPChecker for SERP analysis",
      "SERPWatcher for rank tracking",
      "LinkMiner for backlinks",
      "SiteProfiler for domain analysis"
    ],
    pros: [
      "Beautiful, intuitive interface",
      "Excellent keyword difficulty metric",
      "Affordable pricing",
      "Great for beginners"
    ],
    cons: [
      "Limited daily searches",
      "Smaller database than competitors",
      "Basic backlink analysis"
    ],
    useCases: ["Finding easy-to-rank keywords", "Niche site builders", "Affiliate marketers", "Bloggers"]
  },
  {
    id: 12,
    name: "Majestic",
    category: "Link Analysis",
    bestFor: "Backlink analysis & Trust Flow",
    pricing: "Paid",
    pricingDetails: "$49.99/mo (Lite) to $399.99/mo (API)",
    website: "https://majestic.com",
    rating: 4.5,
    difficulty: "Intermediate",
    description: "Majestic specializes in backlink analysis with its proprietary Trust Flow and Citation Flow metrics. It has one of the largest link indexes and is trusted by SEO professionals worldwide for link audits.",
    keyFeatures: [
      "Trust Flow metric",
      "Citation Flow metric",
      "Historic Index",
      "Fresh Index",
      "Topical Trust Flow",
      "Bulk backlink checker"
    ],
    pros: [
      "Massive link database",
      "Unique Trust Flow metric",
      "Historical backlink data",
      "API access available"
    ],
    cons: [
      "Outdated interface",
      "Only focused on links",
      "Learning curve for metrics"
    ],
    useCases: ["Link audits", "Link building", "Competitor link analysis", "Penalty recovery"]
  },
  {
    id: 13,
    name: "SpyFu",
    category: "Competitor Analysis",
    bestFor: "Competitor PPC & SEO research",
    pricing: "Paid",
    pricingDetails: "$39/mo (Basic) to $299/mo (Team)",
    website: "https://spyfu.com",
    rating: 4.4,
    difficulty: "Beginner",
    description: "SpyFu lets you spy on your competitors' SEO and PPC strategies. See every keyword they've ever ranked for, every ad they've run, and their ranking history going back years.",
    keyFeatures: [
      "Competitor keyword research",
      "PPC competitor analysis",
      "Ranking history",
      "Backlink research",
      "Keyword grouping",
      "SERP analysis"
    ],
    pros: [
      "Excellent competitor insights",
      "Years of historical data",
      "Affordable pricing",
      "Unlimited searches"
    ],
    cons: [
      "US-focused data",
      "Interface feels dated",
      "Less accurate than Ahrefs/Semrush"
    ],
    useCases: ["Competitor research", "PPC strategy", "Keyword gap analysis", "Content planning"]
  },
  {
    id: 14,
    name: "Yoast SEO",
    category: "WordPress SEO",
    bestFor: "WordPress on-page optimization",
    pricing: "Freemium",
    pricingDetails: "Free / $99/year (Premium)",
    website: "https://yoast.com",
    rating: 4.6,
    difficulty: "Beginner",
    description: "Yoast SEO is the most popular WordPress SEO plugin with over 5 million active installations. It provides real-time content analysis, XML sitemaps, and schema markup without needing technical knowledge.",
    keyFeatures: [
      "Content readability analysis",
      "Focus keyword optimization",
      "XML sitemap generation",
      "Schema markup",
      "Social media previews",
      "Redirect manager (Premium)"
    ],
    pros: [
      "Beginner-friendly",
      "Comprehensive free version",
      "Regular updates",
      "Excellent documentation"
    ],
    cons: [
      "Can slow down WordPress",
      "Premium features expensive",
      "Limited keyword suggestions"
    ],
    useCases: ["WordPress websites", "Bloggers", "Small businesses", "Content optimization"]
  },
  {
    id: 15,
    name: "Rank Math",
    category: "WordPress SEO",
    bestFor: "Feature-rich WordPress SEO",
    pricing: "Freemium",
    pricingDetails: "Free / $59/year (Pro)",
    website: "https://rankmath.com",
    rating: 4.7,
    difficulty: "Beginner",
    description: "Rank Math is a powerful Yoast alternative that offers more features in its free version. It includes built-in schema markup, keyword tracking, and integration with Google Search Console.",
    keyFeatures: [
      "Multiple focus keywords (free)",
      "Built-in schema generator",
      "Google Search Console integration",
      "404 monitor",
      "Redirect manager",
      "Local SEO module"
    ],
    pros: [
      "More free features than Yoast",
      "Modern interface",
      "Fast and lightweight",
      "Schema markup builder"
    ],
    cons: [
      "Newer, less proven",
      "Can conflict with other plugins",
      "Overwhelming for beginners"
    ],
    useCases: ["WordPress websites", "Advanced users", "Schema markup", "Local businesses"]
  },
  {
    id: 16,
    name: "AnswerThePublic",
    category: "Keyword Research",
    bestFor: "Question-based keyword research",
    pricing: "Freemium",
    pricingDetails: "Free (limited) / $11/mo to $199/mo",
    website: "https://answerthepublic.com",
    rating: 4.5,
    difficulty: "Beginner",
    description: "AnswerThePublic visualizes search questions and autocomplete suggestions in a unique format. It's perfect for understanding what questions your audience is asking and creating content that answers them.",
    keyFeatures: [
      "Question visualization",
      "Preposition queries",
      "Comparison queries",
      "Alphabetical queries",
      "Data export",
      "Search listening alerts"
    ],
    pros: [
      "Unique visual format",
      "Great for content ideas",
      "Easy to understand",
      "Multiple platforms (Google, YouTube, Bing)"
    ],
    cons: [
      "Limited free searches",
      "No search volume data",
      "Basic functionality"
    ],
    useCases: ["Content ideation", "FAQ creation", "Blog topics", "Video content planning"]
  },
  {
    id: 17,
    name: "Google Trends",
    category: "Keyword Research",
    bestFor: "Trend analysis & seasonal keywords",
    pricing: "Free",
    pricingDetails: "Completely free",
    website: "https://trends.google.com",
    rating: 4.6,
    difficulty: "Beginner",
    description: "Google Trends shows you the popularity of search queries over time. It's essential for identifying seasonal trends, comparing keyword popularity, and spotting emerging topics before they peak.",
    keyFeatures: [
      "Search trend graphs",
      "Regional interest data",
      "Related queries",
      "Comparison tool",
      "Real-time trending searches",
      "Category filtering"
    ],
    pros: [
      "Completely free",
      "Data directly from Google",
      "Real-time trending data",
      "Compare up to 5 terms"
    ],
    cons: [
      "Relative data, not absolute",
      "No search volume numbers",
      "Limited to trend analysis"
    ],
    useCases: ["Trend spotting", "Seasonal content planning", "News jacking", "Market research"]
  },
  {
    id: 18,
    name: "BrightLocal",
    category: "Local SEO",
    bestFor: "Local search & citation management",
    pricing: "Paid",
    pricingDetails: "$39/mo (Single) to $79/mo (Multi)",
    website: "https://brightlocal.com",
    rating: 4.6,
    difficulty: "Intermediate",
    description: "BrightLocal is the leading local SEO platform. It helps businesses manage citations, monitor local rankings, audit Google Business Profiles, and generate reviews across multiple locations.",
    keyFeatures: [
      "Local rank tracking",
      "Citation building & audit",
      "Google Business Profile audit",
      "Review management",
      "Local search audit",
      "White-label reports"
    ],
    pros: [
      "Comprehensive local SEO suite",
      "Excellent citation management",
      "Accurate local rankings",
      "Great for agencies"
    ],
    cons: [
      "Only for local SEO",
      "Can be expensive for single location",
      "Learning curve"
    ],
    useCases: ["Local businesses", "Multi-location brands", "Local SEO agencies", "Franchise SEO"]
  },
  {
    id: 19,
    name: "Sitebulb",
    category: "Technical SEO",
    bestFor: "Visual technical SEO audits",
    pricing: "Paid",
    pricingDetails: "$13.50/mo (Lite) to $35/mo (Pro)",
    website: "https://sitebulb.com",
    rating: 4.8,
    difficulty: "Advanced",
    description: "Sitebulb is a desktop crawler that turns complex technical SEO data into visual, easy-to-understand reports. It prioritizes issues by impact and provides clear explanations for every finding.",
    keyFeatures: [
      "Visual crawl maps",
      "Prioritized hints",
      "JavaScript rendering",
      "URL explorer",
      "PDF reports",
      "Accessibility audits"
    ],
    pros: [
      "Beautiful visualizations",
      "Prioritizes issues clearly",
      "Great explanations",
      "Affordable pricing"
    ],
    cons: [
      "Desktop only",
      "Slower than Screaming Frog",
      "Less customization options"
    ],
    useCases: ["Technical audits", "Client presentations", "Site migrations", "Accessibility audits"]
  },
  {
    id: 20,
    name: "Bing Webmaster Tools",
    category: "Technical SEO",
    bestFor: "Bing optimization & AI search visibility",
    pricing: "Free",
    pricingDetails: "Completely free",
    website: "https://bing.com/webmasters",
    rating: 4.3,
    difficulty: "Beginner",
    description: "Bing Webmaster Tools is essential for optimizing for Bing and increasingly important for AI search visibility. Since ChatGPT uses Bing for web searches, ranking on Bing helps with AI discoverability.",
    keyFeatures: [
      "Search performance data",
      "Site scanning",
      "URL submission",
      "Backlink data",
      "SEO reports",
      "Import from GSC"
    ],
    pros: [
      "Free and comprehensive",
      "Important for AI search",
      "Unique backlink data",
      "Easy GSC import"
    ],
    cons: [
      "Smaller market share",
      "Less detailed than GSC",
      "Fewer third-party integrations"
    ],
    useCases: ["Bing optimization", "AI search visibility", "Alternative search engines", "Technical audits"]
  },
  {
    id: 21,
    name: "Frase",
    category: "Content Optimization",
    bestFor: "AI-powered content briefs",
    pricing: "Paid",
    pricingDetails: "$15/mo (Solo) to $115/mo (Team)",
    website: "https://frase.io",
    rating: 4.5,
    difficulty: "Beginner",
    description: "Frase uses AI to research, write, and optimize content. It analyzes top-ranking pages and generates comprehensive content briefs, outlines, and even full drafts in minutes.",
    keyFeatures: [
      "AI content briefs",
      "SERP analysis",
      "Content optimization",
      "AI writing assistant",
      "Question research",
      "Content analytics"
    ],
    pros: [
      "Fast content research",
      "Affordable AI writing",
      "Good content briefs",
      "Saves hours of research"
    ],
    cons: [
      "AI content needs editing",
      "Limited keyword research",
      "Smaller database"
    ],
    useCases: ["Content briefs", "AI content writing", "Content research", "Blog optimization"]
  },
  {
    id: 22,
    name: "Keywords Everywhere",
    category: "Keyword Research",
    bestFor: "In-browser keyword metrics",
    pricing: "Paid",
    pricingDetails: "$1.25/mo (10K credits) to $80/mo (1M credits)",
    website: "https://keywordseverywhere.com",
    rating: 4.5,
    difficulty: "Beginner",
    description: "Keywords Everywhere is a browser extension that shows search volume, CPC, and competition data directly in Google search results. It saves time by eliminating the need to switch between tools.",
    keyFeatures: [
      "Search volume in SERPs",
      "Related keywords",
      "People Also Ask data",
      "Trend data",
      "Competitor analysis",
      "Works on multiple sites"
    ],
    pros: [
      "Extremely convenient",
      "Very affordable",
      "Data in Google SERPs",
      "Works on YouTube, Amazon, etc."
    ],
    cons: [
      "Credit-based system",
      "Less accurate than premium tools",
      "Limited features"
    ],
    useCases: ["Quick keyword research", "Content planning", "YouTube SEO", "Amazon keyword research"]
  },
  {
    id: 23,
    name: "Google Analytics 4",
    category: "Analytics",
    bestFor: "Website traffic analysis",
    pricing: "Free",
    pricingDetails: "Free (GA4 360 for enterprise)",
    website: "https://analytics.google.com",
    rating: 4.4,
    difficulty: "Intermediate",
    description: "Google Analytics 4 is the latest version of Google's analytics platform. It tracks user behavior, traffic sources, conversions, and provides insights to measure your SEO and marketing efforts.",
    keyFeatures: [
      "Traffic acquisition reports",
      "User behavior analysis",
      "Conversion tracking",
      "Audience insights",
      "Custom reports",
      "BigQuery integration"
    ],
    pros: [
      "Free and powerful",
      "Event-based tracking",
      "AI-powered insights",
      "Cross-platform tracking"
    ],
    cons: [
      "Steep learning curve",
      "Different from Universal Analytics",
      "Complex setup"
    ],
    useCases: ["Traffic analysis", "Conversion tracking", "User behavior", "Marketing attribution"]
  },
  {
    id: 24,
    name: "Serpstat",
    category: "All-in-One SEO Suite",
    bestFor: "Affordable all-in-one SEO",
    pricing: "Paid",
    pricingDetails: "$69/mo (Lite) to $499/mo (Enterprise)",
    website: "https://serpstat.com",
    rating: 4.4,
    difficulty: "Intermediate",
    description: "Serpstat is a cost-effective alternative to Semrush and Ahrefs. It offers keyword research, rank tracking, backlink analysis, and site auditing at a more accessible price point.",
    keyFeatures: [
      "Keyword research",
      "Rank tracking",
      "Site audit",
      "Backlink analysis",
      "Competitor research",
      "API access"
    ],
    pros: [
      "Affordable pricing",
      "Comprehensive features",
      "Good for small teams",
      "Batch analysis"
    ],
    cons: [
      "Smaller database",
      "Interface not as polished",
      "Slower updates"
    ],
    useCases: ["Budget-conscious teams", "Small agencies", "Freelancers", "Startups"]
  },
  {
    id: 25,
    name: "PageSpeed Insights",
    category: "Technical SEO",
    bestFor: "Page speed & Core Web Vitals",
    pricing: "Free",
    pricingDetails: "Completely free",
    website: "https://pagespeed.web.dev",
    rating: 4.6,
    difficulty: "Intermediate",
    description: "PageSpeed Insights analyzes page loading speed and provides specific recommendations for improvement. It reports Core Web Vitals scores which are now a Google ranking factor.",
    keyFeatures: [
      "Core Web Vitals scores",
      "Performance score",
      "Specific recommendations",
      "Mobile & desktop analysis",
      "Field data from real users",
      "Lab data diagnostics"
    ],
    pros: [
      "Free Google tool",
      "Actionable recommendations",
      "Real user data",
      "Core Web Vitals focus"
    ],
    cons: [
      "Can be overwhelming",
      "Scores fluctuate",
      "Technical knowledge needed"
    ],
    useCases: ["Speed optimization", "Core Web Vitals", "Performance audits", "Developer handoffs"]
  },
  {
    id: 26,
    name: "Ahrefs Webmaster Tools",
    category: "Technical SEO",
    bestFor: "Free site audits & backlink monitoring",
    pricing: "Free",
    pricingDetails: "Free for verified site owners",
    website: "https://ahrefs.com/webmaster-tools",
    rating: 4.7,
    difficulty: "Beginner",
    description: "Ahrefs Webmaster Tools gives verified site owners free access to Site Audit and Site Explorer for their own websites. It's one of the most generous free SEO tools available.",
    keyFeatures: [
      "Site audit (100+ SEO issues)",
      "Backlink profile",
      "Referring domains",
      "Organic keywords",
      "Top pages",
      "Email alerts"
    ],
    pros: [
      "Premium features for free",
      "Comprehensive audits",
      "Backlink monitoring",
      "No credit card required"
    ],
    cons: [
      "Only for your own sites",
      "No competitor analysis",
      "Limited to verified properties"
    ],
    useCases: ["Site audits", "Backlink monitoring", "Technical SEO", "Small websites"]
  },
  {
    id: 27,
    name: "GTmetrix",
    category: "Technical SEO",
    bestFor: "Page speed testing & monitoring",
    pricing: "Freemium",
    pricingDetails: "Free (limited) / $10/mo to $47/mo",
    website: "https://gtmetrix.com",
    rating: 4.5,
    difficulty: "Intermediate",
    description: "GTmetrix provides detailed page speed reports with waterfall charts, video playback of page loading, and monitoring capabilities. It's more detailed than PageSpeed Insights for diagnosing speed issues.",
    keyFeatures: [
      "Performance scores",
      "Waterfall charts",
      "Video playback",
      "Monitoring & alerts",
      "Multiple test locations",
      "Historical data"
    ],
    pros: [
      "Detailed waterfall charts",
      "Video playback helpful",
      "Multiple test locations",
      "Monitoring included"
    ],
    cons: [
      "Free version limited",
      "Can be slow",
      "Complex reports"
    ],
    useCases: ["Speed diagnostics", "Performance monitoring", "Developer debugging", "Client reports"]
  },
  {
    id: 28,
    name: "Nightwatch",
    category: "Rank Tracking",
    bestFor: "Accurate local rank tracking",
    pricing: "Paid",
    pricingDetails: "$39/mo (250 keywords) to $699/mo (10,000 keywords)",
    website: "https://nightwatch.io",
    rating: 4.6,
    difficulty: "Intermediate",
    description: "Nightwatch is a dedicated rank tracking tool known for its accuracy, especially for local SEO. It tracks rankings across multiple locations and devices with daily updates.",
    keyFeatures: [
      "Daily rank tracking",
      "Local rank tracking",
      "Multiple search engines",
      "Competitor tracking",
      "White-label reports",
      "API access"
    ],
    pros: [
      "Very accurate tracking",
      "Excellent for local SEO",
      "Clean interface",
      "Affordable per-keyword pricing"
    ],
    cons: [
      "Only rank tracking",
      "No keyword research",
      "Limited additional features"
    ],
    useCases: ["Local SEO", "Multi-location businesses", "Rank monitoring", "Agency reporting"]
  },
  {
    id: 29,
    name: "Copyscape",
    category: "Content Analysis",
    bestFor: "Plagiarism detection",
    pricing: "Paid",
    pricingDetails: "$0.03/search (pay-per-use)",
    website: "https://copyscape.com",
    rating: 4.4,
    difficulty: "Beginner",
    description: "Copyscape detects plagiarism and duplicate content across the web. It's essential for protecting your content from scrapers and ensuring your content is original before publishing.",
    keyFeatures: [
      "Plagiarism detection",
      "Duplicate content finder",
      "Batch search",
      "API access",
      "Copysentry monitoring",
      "WordPress plugin"
    ],
    pros: [
      "Industry standard",
      "Pay-per-use pricing",
      "Very accurate",
      "Automated monitoring available"
    ],
    cons: [
      "Basic interface",
      "Only checks for duplicates",
      "No content optimization"
    ],
    useCases: ["Content verification", "Plagiarism checking", "Content protection", "Editorial workflows"]
  },
  {
    id: 30,
    name: "Schema Pro",
    category: "Technical SEO",
    bestFor: "Schema markup generation",
    pricing: "Paid",
    pricingDetails: "$79/year (single site) to $249/year (unlimited)",
    website: "https://wpschema.com",
    rating: 4.5,
    difficulty: "Beginner",
    description: "Schema Pro makes adding schema markup to WordPress sites easy. It automatically generates schema for posts, pages, products, and custom content types without coding.",
    keyFeatures: [
      "Automatic schema generation",
      "20+ schema types",
      "Custom field mapping",
      "WooCommerce support",
      "Yoast/Rank Math compatible",
      "Review schema"
    ],
    pros: [
      "No coding required",
      "Automatic implementation",
      "Many schema types",
      "Works with page builders"
    ],
    cons: [
      "WordPress only",
      "Annual subscription",
      "Can conflict with theme schema"
    ],
    useCases: ["WordPress schema", "Rich snippets", "Local business markup", "Product schema"]
  },
  {
    id: 31,
    name: "Linkody",
    category: "Link Analysis",
    bestFor: "Backlink monitoring & alerts",
    pricing: "Paid",
    pricingDetails: "$14.90/mo (Webmaster) to $147.90/mo (Agency Plus)",
    website: "https://linkody.com",
    rating: 4.3,
    difficulty: "Beginner",
    description: "Linkody monitors your backlinks 24/7 and alerts you when links are gained, lost, or changed. It's perfect for tracking link building campaigns and protecting your link profile.",
    keyFeatures: [
      "Backlink monitoring",
      "Lost link alerts",
      "Competitor link tracking",
      "Disavow file generator",
      "Link metrics",
      "White-label reports"
    ],
    pros: [
      "Affordable monitoring",
      "Real-time alerts",
      "Easy to use",
      "Disavow file helper"
    ],
    cons: [
      "Smaller link index",
      "Limited research features",
      "Basic interface"
    ],
    useCases: ["Link monitoring", "Outreach tracking", "Disavow management", "Competitor monitoring"]
  },
  {
    id: 32,
    name: "Perplexity AI",
    category: "AI Search & Research",
    bestFor: "AI-powered research & GEO optimization",
    pricing: "Freemium",
    pricingDetails: "Free / $20/mo (Pro)",
    website: "https://perplexity.ai",
    rating: 4.7,
    difficulty: "Beginner",
    description: "Perplexity AI is an AI-powered search engine that cites sources. Understanding how your content appears in Perplexity helps with Generative Engine Optimization (GEO) as AI search grows.",
    keyFeatures: [
      "AI-powered search",
      "Source citations",
      "Follow-up questions",
      "Collections for research",
      "Pro Search (deep research)",
      "API access"
    ],
    pros: [
      "See how AI cites content",
      "Great for research",
      "Transparent sources",
      "Growing user base"
    ],
    cons: [
      "Not a traditional SEO tool",
      "Requires mindset shift",
      "GEO is still emerging"
    ],
    useCases: ["GEO optimization", "Content research", "AI visibility testing", "Competitor analysis in AI"]
  }
];

// FAQ Data
const faqs = [
  {
    question: "What is the best free SEO tool in 2026?",
    answer: "Google Search Console is the best free SEO tool available. It provides direct data from Google about your website's search performance, indexing status, and technical issues. Other excellent free tools include Google Analytics 4, Google Keyword Planner, Google Trends, Bing Webmaster Tools, and Ahrefs Webmaster Tools (for your own sites)."
  },
  {
    question: "Ahrefs vs Semrush: Which is better?",
    answer: "Both are excellent tools with different strengths. Ahrefs has a larger backlink index and is preferred for link building and competitor backlink analysis. Semrush offers a broader marketing toolkit including PPC, social media, and content marketing features. Choose Ahrefs for link-focused SEO; choose Semrush for all-in-one digital marketing."
  },
  {
    question: "What SEO tools do professionals use?",
    answer: "Professional SEOs typically use a combination of tools: Google Search Console (essential), Ahrefs or Semrush (for research), Screaming Frog (for technical audits), Surfer or Clearscope (for content optimization), and Google Analytics 4 (for traffic analysis). The exact stack depends on budget and specific needs."
  },
  {
    question: "How much should I spend on SEO tools?",
    answer: "Beginners can start with free tools like Google Search Console, GA4, and Google Keyword Planner. Small businesses should budget $100-200/month for tools like Ahrefs Lite or Semrush Pro. Agencies and enterprises typically spend $300-1,000+/month on comprehensive toolsets."
  },
  {
    question: "What is the best SEO tool for beginners?",
    answer: "For beginners, start with Google Search Console (free) to understand your site's performance. Add Ubersuggest ($29/month) or Mangools ($29/month) for affordable keyword research. For WordPress users, Rank Math or Yoast SEO (both free versions) help with on-page optimization."
  },
  {
    question: "Do I need multiple SEO tools?",
    answer: "Yes, most SEO professionals use multiple tools because no single tool does everything well. A typical stack includes: a technical crawler (Screaming Frog), an all-in-one suite (Ahrefs/Semrush), a content optimization tool (Surfer/Clearscope), and analytics (GA4). Free tools like GSC are essential additions."
  },
  {
    question: "What are the best SEO tools for local businesses?",
    answer: "Local businesses should prioritize: Google Business Profile (free), Google Search Console (free), BrightLocal (for citation management and local rank tracking), and a WordPress SEO plugin like Rank Math. Ahrefs or Semrush help with competitive research if budget allows."
  },
  {
    question: "What is GEO (Generative Engine Optimization)?",
    answer: "GEO is optimizing content to appear in AI-generated search results from tools like ChatGPT, Perplexity, Claude, and Google's AI Overviews. This involves creating comprehensive, well-structured content with clear answers that AI can easily cite. Tools like Perplexity AI help you understand how AI systems reference your content."
  },
  {
    question: "How do I choose the right SEO tool?",
    answer: "Consider: 1) Your budget (free vs paid), 2) Your primary needs (keyword research, technical SEO, content, links), 3) Team size (individual vs agency features), 4) Learning curve (beginner vs advanced), and 5) Integration needs (WordPress, Google Docs, etc.). Start with free trials before committing."
  },
  {
    question: "Are AI SEO tools worth it?",
    answer: "AI SEO tools like Surfer AI, Frase, and Clearscope can significantly speed up content creation and optimization. They're worth it if you create content regularly. However, AI-generated content still needs human editing and expertise. Use AI tools to assist, not replace, your SEO strategy."
  }
];

export default function BestSEOToolsPage() {
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");

  const categories = ["All", ...Array.from(new Set(seoTools.map(tool => tool.category)))];

  const filteredTools = selectedCategory === "All"
    ? seoTools
    : seoTools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "32 Best SEO Tools for 2026 (Free & Paid) - Complete Guide",
            "description": "Comprehensive guide to the best SEO tools in 2026. Compare features, pricing, pros & cons of 32 top SEO tools including Ahrefs, Semrush, Moz, and more.",
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
            "itemListElement": seoTools.slice(0, 10).map((tool, index) => ({
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
            <span className="text-slate-900 font-medium">Best SEO Tools</span>
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
              <span className="block text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #60a5fa, #34d399, #60a5fa)' }}>
                SEO Tools
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
              32 meticulously reviewed tools to elevate your search rankings.
              From free essentials to enterprise solutions—find your perfect stack.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">32</div>
                <div className="text-sm text-gray-400 mt-1">Tools Reviewed</div>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-4xl font-bold text-white">12</div>
                <div className="text-sm text-gray-400 mt-1">Categories</div>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400">10</div>
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
              href="#tool-2"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 mb-3">
                <Award className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best All-in-One</p>
              <p className="font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">Ahrefs</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="#tool-4"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-violet-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-violet-50 text-violet-600 mb-3">
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best for Content</p>
              <p className="font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">Surfer SEO</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="#tool-8"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 text-amber-600 mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best Budget Option</p>
              <p className="font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">Ubersuggest</p>
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
                  {seoTools.map((tool, idx) => (
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
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
            <p className="text-gray-500">Expert answers to common SEO tool questions.</p>
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
            <Zap className="w-4 h-4 text-amber-400" />
            Start optimizing today
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Elevate Your SEO?</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: '#d1d5db' }}>
            Begin with free tools like Google Search Console, then scale your stack as your needs grow.
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
              { href: "/blog/best-ai-chatbots", title: "Best AI Chatbots", desc: "Top AI chatbots for productivity and learning." },
              { href: "/calculators", title: "Free Calculators", desc: "100+ free calculators for math, finance, and more." },
              { href: "/roadmap", title: "Career Roadmaps", desc: "Step-by-step guides to launch your tech career." }
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
