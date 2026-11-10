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
  Linkedin,
  Settings,
  Bug,
  Gauge
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

// Local logo paths for Technical SEO tools
const localLogoPaths: { [key: string]: string } = {
  "Screaming Frog SEO Spider": "/screaming frog logo.png",
  "Google Search Console": "/Google Search Console Logo.png",
  "Sitebulb": "/sitebulb logo.jpeg",
  "DeepCrawl (Lumar)": "/lumar logo.png",
  "Botify": "/Botify logo.png",
  "PageSpeed Insights": "/pagespeed insights logo.png",
  "GTmetrix": "/gtmetrix logo.png",
  "Google Lighthouse": "/lighthouse logo.png",
  "Ahrefs Site Audit": "/ahrefs logo.png",
  "Semrush Site Audit": "/Semrush logo.png",
  "Google Rich Results Test": "/google rich results logo.png",
  "Schema Markup Validator": "/google rich results logo.png",
  "Bing Webmaster Tools": "/bing webmaster tools logo.jpeg",
  "Cloudflare": "/cloudflare logo.png",
  "Ahrefs Webmaster Tools": "/ahrefs webmaster tools logo.png",
  "Oncrawl": "/oncrawl logo.png",
  "ContentKing": "/contentking logo.png",
  "JetOctopus": "/jetoctopus logo.png",
  "Ryte": "/ryte logo.png",
  "Conductor": "/conductor logo.jpeg",
  "seoClarity": "/seoclarity logo.png",
  "Little Warden": "/little warden logo.png",
  "Merkle Technical SEO Tools": "/merkle logo.png",
  "Screaming Frog Log Analyzer": "/screaming frog logo.png",
  "SEOlyzer": "/seolyzer logo.png",
};

// Custom domain mappings for fallback
const customLogoDomains: { [key: string]: string } = {
  "Google Search Console": "google.com",
  "PageSpeed Insights": "google.com",
  "Google Lighthouse": "google.com",
  "Google Rich Results Test": "google.com",
  "Schema Markup Validator": "schema.org",
  "Bing Webmaster Tools": "microsoft.com",
  "Ahrefs Webmaster Tools": "ahrefs.com",
  "Ahrefs Site Audit": "ahrefs.com",
  "Semrush Site Audit": "semrush.com",
  "Merkle Technical SEO Tools": "merkle.com",
  "DeepCrawl (Lumar)": "lumar.io",
  "Cloudflare": "cloudflare.com",
  "Oncrawl": "oncrawl.com",
  "ContentKing": "contentkingapp.com",
  "JetOctopus": "jetoctopus.com",
  "Ryte": "ryte.com",
  "Conductor": "conductor.com",
  "seoClarity": "seoclarity.net",
  "Little Warden": "littlewarden.com",
  "SEOlyzer": "seolyzer.io",
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

// Technical SEO Tools Data - 25 Tools
const technicalSEOTools = [
  {
    id: 1,
    name: "Screaming Frog SEO Spider",
    category: "Website Crawler",
    bestFor: "Comprehensive technical audits",
    pricing: "Freemium",
    pricingDetails: "Free (500 URLs) / $259/year (Unlimited)",
    website: "https://screamingfrog.co.uk/seo-spider",
    rating: 4.9,
    difficulty: "Advanced",
    description: "Screaming Frog is the industry-standard desktop crawler for technical SEO audits. It crawls websites like search engines do, finding broken links, duplicate content, redirect chains, missing meta tags, and hundreds of other technical issues in minutes.",
    keyFeatures: [
      "Crawl up to 500 URLs free",
      "Find broken links & errors",
      "Audit redirects & chains",
      "Analyze page titles & meta descriptions",
      "Generate XML sitemaps",
      "Extract data with XPath/CSS"
    ],
    pros: [
      "Extremely thorough technical audits",
      "Fastest crawler available",
      "Exports to multiple formats",
      "Regular updates & new features"
    ],
    cons: [
      "Steep learning curve for beginners",
      "Desktop app only (no cloud)",
      "Can be resource-intensive on large sites"
    ],
    useCases: ["Technical SEO audits", "Site migrations", "Large websites", "Finding duplicate content"]
  },
  {
    id: 2,
    name: "Google Search Console",
    category: "Indexing & Monitoring",
    bestFor: "First-party indexing data",
    pricing: "Free",
    pricingDetails: "Completely free forever",
    website: "https://search.google.com/search-console",
    rating: 4.8,
    difficulty: "Beginner",
    description: "Google Search Console is essential for any technical SEO work. It provides direct data from Google about your website's indexing status, crawl errors, Core Web Vitals, mobile usability issues, and security problems.",
    keyFeatures: [
      "Index coverage reports",
      "URL inspection tool",
      "Core Web Vitals monitoring",
      "Mobile usability reports",
      "Crawl stats & errors",
      "Submit & test sitemaps"
    ],
    pros: [
      "100% free with no limitations",
      "Direct data from Google",
      "Essential for indexing issues",
      "Real-time URL inspection"
    ],
    cons: [
      "Data delayed by 24-48 hours",
      "Limited historical data (16 months)",
      "No competitor analysis"
    ],
    useCases: ["Index monitoring", "Crawl error fixing", "Core Web Vitals", "Sitemap management"]
  },
  {
    id: 3,
    name: "Sitebulb",
    category: "Website Crawler",
    bestFor: "Visual technical audits",
    pricing: "Paid",
    pricingDetails: "$13.50/mo (Lite) to $35/mo (Pro)",
    website: "https://sitebulb.com",
    rating: 4.8,
    difficulty: "Intermediate",
    description: "Sitebulb is a desktop crawler that turns complex technical SEO data into beautiful, easy-to-understand visualizations. It prioritizes issues by impact and provides clear explanations for every finding, making it perfect for client reports.",
    keyFeatures: [
      "Visual crawl maps",
      "Prioritized hints system",
      "JavaScript rendering",
      "Accessibility audits",
      "PDF report generation",
      "URL path analysis"
    ],
    pros: [
      "Beautiful data visualizations",
      "Prioritizes issues by impact",
      "Excellent explanations for each issue",
      "Affordable pricing"
    ],
    cons: [
      "Desktop only (no cloud version)",
      "Slower than Screaming Frog",
      "Less customization options"
    ],
    useCases: ["Client presentations", "Technical audits", "Site migrations", "Accessibility audits"]
  },
  {
    id: 4,
    name: "DeepCrawl (Lumar)",
    category: "Enterprise Crawler",
    bestFor: "Enterprise-scale crawling",
    pricing: "Paid",
    pricingDetails: "Custom pricing (starts ~$500/mo)",
    website: "https://www.lumar.io",
    rating: 4.7,
    difficulty: "Advanced",
    description: "DeepCrawl (now Lumar) is an enterprise-grade cloud crawler used by large organizations. It handles millions of URLs, integrates with CI/CD pipelines, and provides automated monitoring to catch issues before they impact rankings.",
    keyFeatures: [
      "Cloud-based crawling",
      "Handles millions of URLs",
      "CI/CD integration",
      "Automated monitoring",
      "Custom dashboards",
      "API access"
    ],
    pros: [
      "Handles enterprise-scale sites",
      "Automated issue detection",
      "Excellent for DevOps integration",
      "Historical trend tracking"
    ],
    cons: [
      "Expensive for small businesses",
      "Complex setup required",
      "Overkill for small sites"
    ],
    useCases: ["Enterprise SEO", "E-commerce sites", "DevOps teams", "Large publishers"]
  },
  {
    id: 5,
    name: "Botify",
    category: "Enterprise Crawler",
    bestFor: "SEO automation at scale",
    pricing: "Paid",
    pricingDetails: "Custom pricing (enterprise only)",
    website: "https://botify.com",
    rating: 4.6,
    difficulty: "Advanced",
    description: "Botify is a comprehensive technical SEO platform for enterprise websites. It combines crawling, log file analysis, and search data to provide actionable insights. Used by major brands like Expedia, L'Oreal, and The New York Times.",
    keyFeatures: [
      "Unified crawl & log analysis",
      "Search intent insights",
      "Automated recommendations",
      "JavaScript rendering",
      "Revenue impact tracking",
      "ActionBoard automation"
    ],
    pros: [
      "All-in-one enterprise solution",
      "Combines multiple data sources",
      "Automation capabilities",
      "Excellent support"
    ],
    cons: [
      "Very expensive",
      "Long implementation time",
      "Enterprise-only focus"
    ],
    useCases: ["Fortune 500 companies", "Large e-commerce", "Publishers", "Travel sites"]
  },
  {
    id: 6,
    name: "PageSpeed Insights",
    category: "Performance",
    bestFor: "Core Web Vitals testing",
    pricing: "Free",
    pricingDetails: "Completely free",
    website: "https://pagespeed.web.dev",
    rating: 4.7,
    difficulty: "Beginner",
    description: "PageSpeed Insights analyzes page loading speed and provides specific recommendations. It reports Core Web Vitals scores directly from Chrome User Experience data, making it essential for performance optimization.",
    keyFeatures: [
      "Core Web Vitals scores",
      "Real user data (CrUX)",
      "Lab data diagnostics",
      "Specific recommendations",
      "Mobile & desktop testing",
      "Opportunity prioritization"
    ],
    pros: [
      "Free Google tool",
      "Uses real user data",
      "Actionable recommendations",
      "Core Web Vitals focus"
    ],
    cons: [
      "Scores can fluctuate",
      "Limited to single page testing",
      "Technical knowledge needed to act"
    ],
    useCases: ["Speed optimization", "Core Web Vitals", "Performance audits", "Developer handoffs"]
  },
  {
    id: 7,
    name: "GTmetrix",
    category: "Performance",
    bestFor: "Detailed speed analysis",
    pricing: "Freemium",
    pricingDetails: "Free (limited) / $10/mo to $47/mo",
    website: "https://gtmetrix.com",
    rating: 4.6,
    difficulty: "Intermediate",
    description: "GTmetrix provides detailed page speed reports with waterfall charts and video playback of page loading. It offers more granular diagnostics than PageSpeed Insights and monitoring capabilities to track performance over time.",
    keyFeatures: [
      "Waterfall charts",
      "Video playback",
      "Monitoring & alerts",
      "Multiple test locations",
      "Core Web Vitals",
      "Historical data"
    ],
    pros: [
      "Detailed waterfall analysis",
      "Video playback helps debugging",
      "Multiple global test locations",
      "Performance monitoring"
    ],
    cons: [
      "Free version limited",
      "Can be slow to generate reports",
      "Complex for beginners"
    ],
    useCases: ["Speed diagnostics", "Performance monitoring", "Developer debugging", "Client reports"]
  },
  {
    id: 8,
    name: "Google Lighthouse",
    category: "Performance",
    bestFor: "Automated auditing",
    pricing: "Free",
    pricingDetails: "Completely free",
    website: "https://developer.chrome.com/docs/lighthouse",
    rating: 4.7,
    difficulty: "Intermediate",
    description: "Lighthouse is Google's open-source automated auditing tool built into Chrome DevTools. It audits performance, accessibility, best practices, SEO, and PWA criteria, providing scores and recommendations for improvement.",
    keyFeatures: [
      "Performance scoring",
      "Accessibility audits",
      "SEO checklist",
      "Best practices check",
      "PWA validation",
      "CI/CD integration"
    ],
    pros: [
      "Built into Chrome DevTools",
      "Comprehensive audits",
      "Can be automated in CI/CD",
      "Open source"
    ],
    cons: [
      "Lab data only (no real users)",
      "Scores vary between runs",
      "Technical to interpret"
    ],
    useCases: ["Development workflow", "CI/CD pipelines", "Accessibility audits", "PWA development"]
  },
  {
    id: 9,
    name: "Ahrefs Site Audit",
    category: "Website Crawler",
    bestFor: "All-in-one SEO with technical",
    pricing: "Paid",
    pricingDetails: "$29/mo (Starter) to $374/mo (Advanced)",
    website: "https://ahrefs.com/site-audit",
    rating: 4.7,
    difficulty: "Intermediate",
    description: "Ahrefs Site Audit is a cloud-based crawler included in Ahrefs subscriptions. It checks 100+ technical SEO issues, monitors site health over time, and integrates with Ahrefs' backlink and keyword data for comprehensive analysis.",
    keyFeatures: [
      "100+ SEO issue checks",
      "Scheduled crawls",
      "Health score tracking",
      "Internal link analysis",
      "JavaScript rendering",
      "Export & API access"
    ],
    pros: [
      "Integrated with Ahrefs ecosystem",
      "Cloud-based (no installation)",
      "Automatic scheduled crawls",
      "Great for ongoing monitoring"
    ],
    cons: [
      "Requires Ahrefs subscription",
      "Less granular than Screaming Frog",
      "Limited customization"
    ],
    useCases: ["Ongoing site monitoring", "Quick audits", "Client reporting", "SEO agencies"]
  },
  {
    id: 10,
    name: "Semrush Site Audit",
    category: "Website Crawler",
    bestFor: "Marketing suite with technical",
    pricing: "Paid",
    pricingDetails: "$139.95/mo (Pro) to $499.95/mo (Business)",
    website: "https://semrush.com/siteaudit",
    rating: 4.6,
    difficulty: "Intermediate",
    description: "Semrush Site Audit checks 140+ technical and on-page SEO issues. It provides thematic reports, tracks issues over time, and integrates with Semrush's marketing toolkit for a comprehensive digital marketing solution.",
    keyFeatures: [
      "140+ issue checks",
      "Thematic reports",
      "Crawl comparison",
      "Core Web Vitals",
      "HTTPS migration checks",
      "International SEO"
    ],
    pros: [
      "Part of complete marketing suite",
      "140+ issue types",
      "Excellent visualizations",
      "Automatic scheduling"
    ],
    cons: [
      "Expensive for technical SEO only",
      "Can be overwhelming",
      "Credit-based system"
    ],
    useCases: ["Digital marketing teams", "Agencies", "Enterprise SEO", "Marketing managers"]
  },
  {
    id: 11,
    name: "Google Rich Results Test",
    category: "Schema & Structured Data",
    bestFor: "Testing structured data",
    pricing: "Free",
    pricingDetails: "Completely free",
    website: "https://search.google.com/test/rich-results",
    rating: 4.6,
    difficulty: "Beginner",
    description: "The Rich Results Test validates your structured data markup and shows which rich results are eligible for your page. Essential for implementing and debugging schema markup for enhanced search appearances.",
    keyFeatures: [
      "Validates structured data",
      "Shows eligible rich results",
      "Renders JavaScript",
      "Tests live URLs or code",
      "Detailed error messages",
      "Mobile & desktop testing"
    ],
    pros: [
      "Official Google tool",
      "Shows exact rich result preview",
      "JavaScript rendering",
      "Free and easy to use"
    ],
    cons: [
      "Single page testing only",
      "No bulk testing",
      "No historical data"
    ],
    useCases: ["Schema validation", "Rich snippet testing", "Debugging markup", "Pre-launch checks"]
  },
  {
    id: 12,
    name: "Schema Markup Validator",
    category: "Schema & Structured Data",
    bestFor: "Schema.org validation",
    pricing: "Free",
    pricingDetails: "Completely free",
    website: "https://validator.schema.org",
    rating: 4.5,
    difficulty: "Intermediate",
    description: "The Schema Markup Validator (formerly Google Structured Data Testing Tool) validates structured data against Schema.org vocabulary. It checks syntax and warns about deprecated or incorrect properties.",
    keyFeatures: [
      "Schema.org validation",
      "JSON-LD, Microdata, RDFa",
      "Detailed error reports",
      "Property suggestions",
      "Code snippet testing",
      "URL testing"
    ],
    pros: [
      "Comprehensive validation",
      "Supports all schema formats",
      "Detailed property checking",
      "Free to use"
    ],
    cons: [
      "Doesn't show Google eligibility",
      "Technical error messages",
      "No JavaScript rendering"
    ],
    useCases: ["Schema development", "Debugging markup", "Learning schema", "Quality assurance"]
  },
  {
    id: 13,
    name: "Bing Webmaster Tools",
    category: "Indexing & Monitoring",
    bestFor: "Bing optimization & AI visibility",
    pricing: "Free",
    pricingDetails: "Completely free",
    website: "https://bing.com/webmasters",
    rating: 4.4,
    difficulty: "Beginner",
    description: "Bing Webmaster Tools provides indexing insights and technical SEO data for Bing search. With ChatGPT using Bing for web searches, optimizing for Bing is increasingly important for AI search visibility.",
    keyFeatures: [
      "URL submission",
      "Crawl control",
      "Site scanning",
      "Backlink data",
      "SEO reports",
      "IndexNow support"
    ],
    pros: [
      "Free and comprehensive",
      "Important for AI search",
      "IndexNow instant indexing",
      "Unique backlink data"
    ],
    cons: [
      "Smaller market share than Google",
      "Less detailed than GSC",
      "Fewer third-party integrations"
    ],
    useCases: ["Bing optimization", "AI search visibility", "IndexNow implementation", "Alternative search data"]
  },
  {
    id: 14,
    name: "Cloudflare",
    category: "Performance & Security",
    bestFor: "CDN & performance optimization",
    pricing: "Freemium",
    pricingDetails: "Free / $20/mo (Pro) to $200/mo (Business)",
    website: "https://cloudflare.com",
    rating: 4.8,
    difficulty: "Intermediate",
    description: "Cloudflare is a CDN and security platform that significantly impacts technical SEO. It improves page speed through caching, provides SSL certificates, protects against attacks, and offers edge computing capabilities.",
    keyFeatures: [
      "Global CDN caching",
      "Free SSL certificates",
      "DDoS protection",
      "Image optimization",
      "Automatic minification",
      "Edge computing"
    ],
    pros: [
      "Significant speed improvements",
      "Free tier is generous",
      "Easy setup via DNS",
      "Security included"
    ],
    cons: [
      "Can cause caching issues",
      "Advanced features are paid",
      "Learning curve for optimization"
    ],
    useCases: ["Speed optimization", "Security", "Global performance", "Image optimization"]
  },
  {
    id: 15,
    name: "Ahrefs Webmaster Tools",
    category: "Website Crawler",
    bestFor: "Free site audits",
    pricing: "Free",
    pricingDetails: "Free for verified site owners",
    website: "https://ahrefs.com/webmaster-tools",
    rating: 4.7,
    difficulty: "Beginner",
    description: "Ahrefs Webmaster Tools gives verified site owners free access to Site Audit and Site Explorer for their own websites. It's one of the most generous free technical SEO tools available.",
    keyFeatures: [
      "Site audit (100+ issues)",
      "Backlink profile",
      "Referring domains",
      "Organic keywords",
      "Top pages data",
      "Email alerts"
    ],
    pros: [
      "Premium features completely free",
      "Comprehensive technical audits",
      "Backlink monitoring included",
      "No credit card required"
    ],
    cons: [
      "Only for your own sites",
      "No competitor analysis",
      "Limited to verified properties"
    ],
    useCases: ["Free site audits", "Backlink monitoring", "Small business SEO", "Personal websites"]
  },
  {
    id: 16,
    name: "Oncrawl",
    category: "Enterprise Crawler",
    bestFor: "Data science approach to SEO",
    pricing: "Paid",
    pricingDetails: "From $69/mo to custom enterprise",
    website: "https://oncrawl.com",
    rating: 4.5,
    difficulty: "Advanced",
    description: "Oncrawl combines crawling with log file analysis and data science capabilities. It helps understand how search engines interact with your site and identifies patterns in ranking factors using segmentation and correlation analysis.",
    keyFeatures: [
      "Crawl & log analysis",
      "Data segmentation",
      "Correlation analysis",
      "Custom dashboards",
      "JavaScript rendering",
      "API & integrations"
    ],
    pros: [
      "Advanced data analysis",
      "Log file integration",
      "Custom segmentation",
      "Great for data-driven SEO"
    ],
    cons: [
      "Steep learning curve",
      "Expensive for small sites",
      "Complex setup"
    ],
    useCases: ["Data-driven SEO", "Large sites", "Log analysis", "Technical research"]
  },
  {
    id: 17,
    name: "ContentKing",
    category: "Real-time Monitoring",
    bestFor: "24/7 SEO monitoring",
    pricing: "Paid",
    pricingDetails: "From $99/mo to custom pricing",
    website: "https://contentkingapp.com",
    rating: 4.6,
    difficulty: "Intermediate",
    description: "ContentKing monitors your website 24/7 and alerts you to changes that could impact SEO. It catches issues like removed pages, changed titles, or noindex tags before they affect your rankings.",
    keyFeatures: [
      "Real-time monitoring",
      "Instant alerts",
      "Change tracking",
      "Issue detection",
      "Team collaboration",
      "Integration with tools"
    ],
    pros: [
      "Catches issues immediately",
      "Prevents ranking drops",
      "Great for large sites",
      "Change history tracking"
    ],
    cons: [
      "Expensive for small sites",
      "Not a traditional crawler",
      "Requires setup time"
    ],
    useCases: ["E-commerce sites", "Publishers", "Agencies", "Enterprise SEO"]
  },
  {
    id: 18,
    name: "JetOctopus",
    category: "Enterprise Crawler",
    bestFor: "Fast enterprise crawling",
    pricing: "Paid",
    pricingDetails: "From $55/mo to custom enterprise",
    website: "https://jetoctopus.com",
    rating: 4.5,
    difficulty: "Advanced",
    description: "JetOctopus is a cloud-based technical SEO platform known for its speed. It can crawl millions of pages quickly and combines crawl data with Google Search Console and log files for comprehensive analysis.",
    keyFeatures: [
      "Ultra-fast crawling",
      "GSC integration",
      "Log file analysis",
      "Visualization tools",
      "Compare crawls",
      "JavaScript rendering"
    ],
    pros: [
      "Extremely fast crawler",
      "Affordable for enterprise",
      "Great visualizations",
      "GSC data integration"
    ],
    cons: [
      "Less known than competitors",
      "Learning curve",
      "Support can be slow"
    ],
    useCases: ["Large websites", "Fast audits", "E-commerce", "Technical teams"]
  },
  {
    id: 19,
    name: "Ryte",
    category: "Website Crawler",
    bestFor: "Content & technical SEO",
    pricing: "Paid",
    pricingDetails: "From $99/mo to enterprise",
    website: "https://ryte.com",
    rating: 4.4,
    difficulty: "Intermediate",
    description: "Ryte (formerly OnPage.org) combines technical SEO auditing with content optimization. It provides comprehensive crawling, content quality analysis, and integrates Web Performance metrics for a holistic approach.",
    keyFeatures: [
      "Website crawling",
      "Content optimization",
      "TF-IDF analysis",
      "Core Web Vitals",
      "Keyword monitoring",
      "Custom reports"
    ],
    pros: [
      "Technical + content focus",
      "Good visualizations",
      "TF-IDF for content",
      "German engineering quality"
    ],
    cons: [
      "Pricey for features",
      "Interface can be complex",
      "Less popular than alternatives"
    ],
    useCases: ["Content-heavy sites", "Publishers", "German/EU market", "Agencies"]
  },
  {
    id: 20,
    name: "Conductor",
    category: "Enterprise SEO Platform",
    bestFor: "Enterprise SEO intelligence",
    pricing: "Paid",
    pricingDetails: "Custom enterprise pricing",
    website: "https://conductor.com",
    rating: 4.5,
    difficulty: "Advanced",
    description: "Conductor is an enterprise organic marketing platform that combines technical SEO with content intelligence. It provides site health monitoring, content recommendations, and competitive insights for large organizations.",
    keyFeatures: [
      "Site health monitoring",
      "Content recommendations",
      "Competitive intelligence",
      "Keyword tracking",
      "Workflow management",
      "Custom reporting"
    ],
    pros: [
      "Complete enterprise solution",
      "Content + technical combined",
      "Great for large teams",
      "Excellent support"
    ],
    cons: [
      "Very expensive",
      "Long implementation",
      "Overkill for SMBs"
    ],
    useCases: ["Enterprise marketing", "Large brands", "Multi-site management", "Agency clients"]
  },
  {
    id: 21,
    name: "seoClarity",
    category: "Enterprise SEO Platform",
    bestFor: "AI-powered enterprise SEO",
    pricing: "Paid",
    pricingDetails: "Custom enterprise pricing",
    website: "https://seoclarity.net",
    rating: 4.5,
    difficulty: "Advanced",
    description: "seoClarity is an enterprise SEO platform with AI-powered recommendations. It includes technical auditing, rank tracking, content optimization, and competitive analysis with patented AI technology called Clarity Grid.",
    keyFeatures: [
      "AI recommendations",
      "Technical auditing",
      "Rank tracking at scale",
      "Content optimization",
      "Competitive analysis",
      "API & integrations"
    ],
    pros: [
      "AI-powered insights",
      "Comprehensive platform",
      "Daily rank tracking",
      "Good for enterprises"
    ],
    cons: [
      "Enterprise pricing only",
      "Complex to master",
      "Long sales cycle"
    ],
    useCases: ["Fortune 1000 companies", "Large retailers", "Enterprise agencies", "Global brands"]
  },
  {
    id: 22,
    name: "Little Warden",
    category: "Monitoring",
    bestFor: "Affordable SEO monitoring",
    pricing: "Paid",
    pricingDetails: "From $29/mo",
    website: "https://littlewarden.com",
    rating: 4.3,
    difficulty: "Beginner",
    description: "Little Warden monitors your website for SEO issues and sends alerts when problems occur. It's more affordable than enterprise solutions while still catching critical issues like broken pages and SSL problems.",
    keyFeatures: [
      "Uptime monitoring",
      "SSL certificate checks",
      "Broken page alerts",
      "Robots.txt monitoring",
      "Sitemap monitoring",
      "Custom alerts"
    ],
    pros: [
      "Affordable pricing",
      "Easy to set up",
      "Essential monitoring",
      "Good for freelancers"
    ],
    cons: [
      "Limited features",
      "No crawling capability",
      "Basic reporting"
    ],
    useCases: ["Freelancers", "Small agencies", "Basic monitoring", "Multiple small sites"]
  },
  {
    id: 23,
    name: "Merkle Technical SEO Tools",
    category: "Free Tools Collection",
    bestFor: "Free technical SEO utilities",
    pricing: "Free",
    pricingDetails: "Completely free",
    website: "https://technicalseo.com/tools",
    rating: 4.4,
    difficulty: "Intermediate",
    description: "Merkle provides a collection of free technical SEO tools including a schema generator, hreflang tag generator, robots.txt tester, and more. Essential utilities for technical SEO professionals.",
    keyFeatures: [
      "Schema markup generator",
      "Hreflang tag generator",
      "Robots.txt tester",
      "XML sitemap validator",
      "Fetch & render",
      "Mobile-friendly test"
    ],
    pros: [
      "Completely free",
      "Useful utilities",
      "Schema generator is excellent",
      "No registration required"
    ],
    cons: [
      "Individual tools only",
      "No site-wide analysis",
      "Basic functionality"
    ],
    useCases: ["Schema creation", "Hreflang setup", "Quick testing", "Learning technical SEO"]
  },
  {
    id: 24,
    name: "Screaming Frog Log Analyzer",
    category: "Log File Analysis",
    bestFor: "Search engine log analysis",
    pricing: "Freemium",
    pricingDetails: "Free (1,000 events) / $99/year",
    website: "https://screamingfrog.co.uk/log-file-analyser",
    rating: 4.6,
    difficulty: "Advanced",
    description: "The Screaming Frog Log File Analyser processes server logs to reveal exactly how search engines crawl your site. Essential for understanding crawl budget, bot behavior, and identifying uncrawled pages.",
    keyFeatures: [
      "Bot identification",
      "Crawl frequency analysis",
      "Status code breakdown",
      "Uncrawled URLs",
      "Combined crawl + log view",
      "Multiple log formats"
    ],
    pros: [
      "See actual bot behavior",
      "Combine with crawl data",
      "Essential for large sites",
      "Affordable pricing"
    ],
    cons: [
      "Requires server log access",
      "Technical to interpret",
      "Desktop only"
    ],
    useCases: ["Crawl budget analysis", "Large sites", "Enterprise SEO", "Bot behavior analysis"]
  },
  {
    id: 25,
    name: "SEOlyzer",
    category: "Log File Analysis",
    bestFor: "Cloud-based log analysis",
    pricing: "Paid",
    pricingDetails: "From $29/mo to custom",
    website: "https://seolyzer.io",
    rating: 4.3,
    difficulty: "Advanced",
    description: "SEOlyzer is a cloud-based log file analysis tool that helps you understand search engine crawling patterns. It processes logs automatically and provides insights about crawler behavior and crawl budget usage.",
    keyFeatures: [
      "Cloud-based processing",
      "Real-time log analysis",
      "Crawler identification",
      "Crawl budget insights",
      "HTTP status analysis",
      "Custom segments"
    ],
    pros: [
      "No desktop software needed",
      "Automatic log processing",
      "Good visualizations",
      "Affordable starting price"
    ],
    cons: [
      "Less powerful than desktop tools",
      "Learning curve",
      "Requires log setup"
    ],
    useCases: ["Remote teams", "Cloud-native workflow", "SEO agencies", "Technical audits"]
  }
];

// FAQ Data
const faqs = [
  {
    question: "What is technical SEO?",
    answer: "Technical SEO refers to optimizing a website's infrastructure to help search engines crawl, index, and render your content effectively. It includes site speed optimization, mobile-friendliness, URL structure, XML sitemaps, robots.txt configuration, structured data, HTTPS security, Core Web Vitals, and fixing crawl errors."
  },
  {
    question: "What is the best free technical SEO tool?",
    answer: "Google Search Console is the best free technical SEO tool available. It provides essential data about indexing status, crawl errors, Core Web Vitals, and mobile usability directly from Google. Other excellent free tools include Screaming Frog (500 URLs free), Ahrefs Webmaster Tools (for your own sites), Google Lighthouse, and PageSpeed Insights."
  },
  {
    question: "Screaming Frog vs Sitebulb: Which is better?",
    answer: "Screaming Frog is faster, more customizable, and preferred by technical SEO experts who want raw data. Sitebulb is better for visual reports, client presentations, and users who want prioritized recommendations. For pure technical audits, choose Screaming Frog. For client-facing reports and easier interpretation, choose Sitebulb."
  },
  {
    question: "How do I fix crawl errors?",
    answer: "To fix crawl errors: 1) Check Google Search Console's Index Coverage report to identify issues, 2) Use a crawler like Screaming Frog to find broken links and redirect chains, 3) Fix 404 errors by restoring pages or implementing 301 redirects, 4) Update your XML sitemap to remove dead URLs, 5) Test fixes with the URL Inspection tool."
  },
  {
    question: "What are Core Web Vitals and how do I improve them?",
    answer: "Core Web Vitals are Google's metrics for user experience: LCP (Largest Contentful Paint) measures loading speed, INP (Interaction to Next Paint) measures interactivity, and CLS (Cumulative Layout Shift) measures visual stability. Improve them by optimizing images, reducing JavaScript, using a CDN, implementing lazy loading, and minimizing layout shifts."
  },
  {
    question: "How often should I run technical SEO audits?",
    answer: "Run comprehensive technical SEO audits quarterly for most sites. Large or frequently updated sites should run monthly audits. Use monitoring tools like ContentKing or Little Warden for 24/7 monitoring between audits. Always run audits before and after major site changes or redesigns."
  },
  {
    question: "What is crawl budget and why does it matter?",
    answer: "Crawl budget is the number of pages search engines crawl on your site within a given timeframe. It matters for large sites (10,000+ pages) where not all pages get crawled regularly. Optimize crawl budget by fixing errors, removing duplicate content, improving site speed, using proper internal linking, and managing crawl directives."
  },
  {
    question: "Do I need log file analysis?",
    answer: "Log file analysis is essential for large sites (50,000+ pages) to understand actual bot behavior. It reveals which pages search engines actually crawl vs. what you expect them to crawl. Smaller sites can usually rely on Google Search Console data, but log analysis provides deeper insights for crawl budget optimization."
  },
  {
    question: "What technical SEO tools do enterprises use?",
    answer: "Enterprise companies typically use cloud-based platforms like Botify, DeepCrawl (Lumar), Conductor, or seoClarity for scalability. These tools handle millions of URLs, integrate with CI/CD pipelines, provide automated monitoring, and offer team collaboration features. They often combine multiple data sources including crawl data, logs, and search console data."
  },
  {
    question: "How do I test structured data/schema markup?",
    answer: "Use Google's Rich Results Test to validate structured data and see which rich results you're eligible for. The Schema Markup Validator checks your markup against the Schema.org vocabulary. Test before publishing using code snippets, and after publishing using live URLs. Also check Google Search Console's Rich Results report for site-wide issues."
  }
];

export default function BestTechnicalSEOToolsPage() {
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");

  const categories = ["All", ...Array.from(new Set(technicalSEOTools.map(tool => tool.category)))];

  const filteredTools = selectedCategory === "All"
    ? technicalSEOTools
    : technicalSEOTools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "25 Best Technical SEO Tools for 2026 (Free & Paid) - Complete Guide",
            "description": "Comprehensive guide to the best technical SEO tools in 2026. Compare features, pricing, pros & cons of 25 top tools including Screaming Frog, Sitebulb, DeepCrawl, and more.",
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
            "datePublished": "2026-11-10",
            "dateModified": "2026-11-10"
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
            "itemListElement": technicalSEOTools.slice(0, 10).map((tool, index) => ({
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
            <span className="text-slate-900 font-medium">Best Technical SEO Tools</span>
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
              <span className="text-gray-100">Expert-Curated for 2026</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight text-white">
              The Ultimate Guide to
              <span className="block text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #f97316, #ef4444, #f97316)' }}>
                Technical SEO Tools
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
                  className="font-semibold text-white hover:text-orange-300 transition-colors flex items-center gap-1"
                >
                  Rishabh Jain
                  <Linkedin className="w-4 h-4" />
                </a>
                <span className="text-gray-400">·</span>
                <span className="text-gray-400">Nov 2026</span>
              </div>
            </div>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
              25 expert-reviewed tools to optimize your site's technical foundation.
              From free crawlers to enterprise platforms—build your perfect tech stack.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">25</div>
                <div className="text-sm text-gray-400 mt-1">Tools Reviewed</div>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-4xl font-bold text-white">10</div>
                <div className="text-sm text-gray-400 mt-1">Categories</div>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400">8</div>
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
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-orange-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-orange-50 text-orange-600 mb-3">
                <Settings className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best Overall</p>
              <p className="font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">Screaming Frog</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="#tool-2"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best Free</p>
              <p className="font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">Google Search Console</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="#tool-3"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-violet-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-violet-50 text-violet-600 mb-3">
                <Bug className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best Visualizations</p>
              <p className="font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">Sitebulb</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="#tool-6"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 mb-3">
                <Gauge className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best for Speed</p>
              <p className="font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">PageSpeed Insights</p>
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
            <p className="text-gray-500 max-w-xl mx-auto">Every technical SEO tool at a glance—pricing, ratings, and categories to help you decide.</p>
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
                  {technicalSEOTools.map((tool, idx) => (
                    <tr key={tool.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a href={`#tool-${tool.id}`} className="flex items-center gap-3 font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
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
            <p className="text-gray-500">Expert answers to common technical SEO tool questions.</p>
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

      {/* Related Content - Premium Grid */}
      <section className="py-16 px-4 sm:px-6 bg-[#FAFBFC]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">Explore More Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { href: "/marketing/best-seo-tools", title: "Best SEO Tools", desc: "32 complete SEO tools for all your needs." },
              { href: "/marketing/best-rank-tracking-tools", title: "Rank Tracking Tools", desc: "Monitor your keyword positions accurately." },
              { href: "/marketing/best-seo-automation-software", title: "SEO Automation", desc: "Automate your technical SEO workflows." }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 mb-2 transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
                <div className="mt-4 text-orange-600 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
