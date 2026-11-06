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
  Link2,
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

// Local logo paths for Affiliate Marketing tools
const localLogoPaths: { [key: string]: string } = {
  "ShareASale": "/shareasale logo.png",
  "CJ Affiliate": "/cj affiliate logo.png",
  "Impact": "/impact logo.png",
  "Rakuten Advertising": "/rakuten advertising logo.png",
  "Awin": "/awin logo.png",
  "PartnerStack": "/partnerstack logo.png",
  "Post Affiliate Pro": "/post affiliate pro logo.png",
  "Tapfiliate": "/tapfiliate logo.png",
  "Refersion": "/refersion logo.png",
  "Everflow": "/everflow logo.png",
  "TUNE": "/tune logo.png",
  "ThirstyAffiliates": "/thirstyaffiliates logo.png",
  "Pretty Links": "/pretty links logo.png",
  "Geniuslink": "/geniuslink logo.png",
  "Ahrefs": "/ahrefs logo.png",
  "Semrush": "/semrush logo.png",
  "Lasso": "/lasso logo.png",
  "Affilimate": "/affilimate logo.png",
};

// Custom domain mappings for fallback
const customLogoDomains: { [key: string]: string } = {
  "ShareASale": "shareasale.com",
  "CJ Affiliate": "cj.com",
  "Impact": "impact.com",
  "Rakuten Advertising": "rakutenadvertising.com",
  "Awin": "awin.com",
  "PartnerStack": "partnerstack.com",
  "Post Affiliate Pro": "postaffiliatepro.com",
  "Tapfiliate": "tapfiliate.com",
  "Refersion": "refersion.com",
  "Everflow": "everflow.io",
  "TUNE": "tune.com",
  "ThirstyAffiliates": "thirstyaffiliates.com",
  "Pretty Links": "prettylinks.com",
  "Geniuslink": "geniuslink.com",
  "Ahrefs": "ahrefs.com",
  "Semrush": "semrush.com",
  "Lasso": "getlasso.co",
  "Affilimate": "affilimate.com",
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
        className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center text-white font-semibold shadow-sm"
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

// Affiliate Marketing Tools Data - 18 Tools
const affiliateTools = [
  {
    id: 1,
    name: "ShareASale",
    category: "Affiliate Network",
    bestFor: "Mid-market affiliate programs",
    pricing: "Free",
    pricingDetails: "Free for affiliates / $625 one-time + $125/mo for merchants",
    website: "https://www.shareasale.com",
    rating: 4.5,
    difficulty: "Beginner",
    description: "ShareASale is one of the largest and most established affiliate networks, hosting over 25,000 merchant programs across diverse categories. Known for its reliable tracking, timely payments, and user-friendly interface, it's a top choice for both new and experienced affiliate marketers.",
    keyFeatures: [
      "25,000+ merchant programs",
      "Real-time tracking & reporting",
      "Deep linking tools",
      "Product datafeed access",
      "Reliable monthly payments",
      "Merchant recruitment tools"
    ],
    pros: [
      "Large variety of merchants",
      "Reliable payment history",
      "Easy to use interface",
      "Good reporting tools"
    ],
    cons: [
      "Dated interface design",
      "Minimum $50 payout threshold",
      "Some low-quality merchants",
      "Limited international options"
    ],
    useCases: ["Affiliate marketers", "Content creators", "Bloggers", "Niche website owners"]
  },
  {
    id: 2,
    name: "CJ Affiliate",
    category: "Affiliate Network",
    bestFor: "Enterprise & premium brands",
    pricing: "Free",
    pricingDetails: "Free for affiliates / Custom pricing for advertisers",
    website: "https://www.cj.com",
    rating: 4.6,
    difficulty: "Intermediate",
    description: "CJ Affiliate (formerly Commission Junction) is a premium affiliate network connecting publishers with major global brands. It offers sophisticated tracking, deep analytics, and access to high-profile advertisers like Barnes & Noble, Office Depot, and GoPro.",
    keyFeatures: [
      "Premium brand partnerships",
      "Advanced tracking technology",
      "Cross-device tracking",
      "Deep link automation",
      "Situational commissioning",
      "Real-time analytics"
    ],
    pros: [
      "Access to major brands",
      "Excellent tracking accuracy",
      "Professional platform",
      "Strong advertiser relationships"
    ],
    cons: [
      "Strict publisher approval",
      "Complex for beginners",
      "Higher competition",
      "Slow support response"
    ],
    useCases: ["Professional affiliates", "Media companies", "Large publishers", "Influencers"]
  },
  {
    id: 3,
    name: "Impact",
    category: "Affiliate Network",
    bestFor: "Partnership automation",
    pricing: "Paid",
    pricingDetails: "Custom pricing based on partnership volume",
    website: "https://impact.com",
    rating: 4.7,
    difficulty: "Intermediate",
    description: "Impact is a modern partnership automation platform that goes beyond traditional affiliate marketing. It helps brands manage affiliates, influencers, strategic partners, and mobile apps in one platform with advanced automation and attribution capabilities.",
    keyFeatures: [
      "Partnership automation",
      "Multi-touch attribution",
      "Contract management",
      "Fraud protection",
      "Performance forecasting",
      "API integrations"
    ],
    pros: [
      "Modern, intuitive interface",
      "Comprehensive partnership tools",
      "Strong automation features",
      "Excellent fraud detection"
    ],
    cons: [
      "Premium pricing",
      "Can be complex",
      "Learning curve",
      "Better for larger programs"
    ],
    useCases: ["Enterprise brands", "DTC companies", "SaaS businesses", "E-commerce brands"]
  },
  {
    id: 4,
    name: "Rakuten Advertising",
    category: "Affiliate Network",
    bestFor: "Global affiliate marketing",
    pricing: "Paid",
    pricingDetails: "Custom pricing for advertisers / Free for publishers",
    website: "https://rakutenadvertising.com",
    rating: 4.4,
    difficulty: "Intermediate",
    description: "Rakuten Advertising is a global affiliate network with strong presence in retail and fashion. Backed by Rakuten's e-commerce ecosystem, it offers access to premium brands, advanced commissioning options, and international reach across multiple markets.",
    keyFeatures: [
      "Global network reach",
      "Premium retail brands",
      "Commissioning flexibility",
      "Curated publisher network",
      "Brand protection tools",
      "Multi-currency support"
    ],
    pros: [
      "Premium brand access",
      "Strong in retail/fashion",
      "Global presence",
      "Quality publisher base"
    ],
    cons: [
      "Selective acceptance",
      "Complex reporting",
      "Higher minimums",
      "Slower innovation"
    ],
    useCases: ["Fashion affiliates", "Retail content sites", "International publishers", "Coupon sites"]
  },
  {
    id: 5,
    name: "Awin",
    category: "Affiliate Network",
    bestFor: "International affiliate programs",
    pricing: "Paid",
    pricingDetails: "$5 publisher signup fee (refunded) / Custom for advertisers",
    website: "https://www.awin.com",
    rating: 4.5,
    difficulty: "Beginner",
    description: "Awin is a global affiliate network operating in 180+ countries with over 21,000 advertisers. It acquired Affilinet and ShareASale's parent company, making it one of the largest networks. Strong in European markets with growing US presence.",
    keyFeatures: [
      "21,000+ advertisers",
      "180+ country reach",
      "Cross-device tracking",
      "Publisher MasterTag",
      "Opportunity marketplace",
      "Payment flexibility"
    ],
    pros: [
      "Massive global reach",
      "Strong European brands",
      "Good payment terms",
      "Modern interface"
    ],
    cons: [
      "$5 signup fee",
      "US market still growing",
      "Variable merchant quality",
      "Support can be slow"
    ],
    useCases: ["International affiliates", "European publishers", "Travel bloggers", "Finance affiliates"]
  },
  {
    id: 6,
    name: "PartnerStack",
    category: "Affiliate Network",
    bestFor: "B2B SaaS affiliate programs",
    pricing: "Paid",
    pricingDetails: "Custom pricing for vendors / Free for partners",
    website: "https://partnerstack.com",
    rating: 4.6,
    difficulty: "Beginner",
    description: "PartnerStack is the leading B2B SaaS partnership platform, connecting software vendors with affiliates, referral partners, and resellers. It's the network of choice for SaaS companies like Monday.com, Webflow, and Notion with recurring commission structures.",
    keyFeatures: [
      "SaaS-focused network",
      "Recurring commissions",
      "Partner marketplace",
      "Automated payouts",
      "Integration ecosystem",
      "Co-marketing tools"
    ],
    pros: [
      "High-quality SaaS programs",
      "Recurring revenue potential",
      "Modern platform",
      "Fast payments"
    ],
    cons: [
      "SaaS niche only",
      "Limited product variety",
      "Requires B2B audience",
      "Competitive programs"
    ],
    useCases: ["Tech bloggers", "SaaS reviewers", "B2B content creators", "Software consultants"]
  },
  {
    id: 7,
    name: "Post Affiliate Pro",
    category: "Affiliate Tracking & Management",
    bestFor: "Self-hosted affiliate tracking",
    pricing: "Paid",
    pricingDetails: "$129/mo (Pro) to $249/mo (Ultimate)",
    website: "https://www.postaffiliatepro.com",
    rating: 4.5,
    difficulty: "Intermediate",
    description: "Post Affiliate Pro is a comprehensive affiliate tracking software that lets you run your own affiliate program. It offers advanced tracking, multiple commission structures, and extensive customization options for businesses wanting full control.",
    keyFeatures: [
      "Self-hosted solution",
      "Multi-tier commissions",
      "Fraud protection",
      "200+ integrations",
      "Custom commission rules",
      "White-label options"
    ],
    pros: [
      "Full control & ownership",
      "Highly customizable",
      "One-time payment option",
      "Excellent support"
    ],
    cons: [
      "Requires setup effort",
      "Need technical knowledge",
      "No built-in network",
      "Self-managed affiliates"
    ],
    useCases: ["E-commerce stores", "SaaS companies", "Digital products", "Membership sites"]
  },
  {
    id: 8,
    name: "Tapfiliate",
    category: "Affiliate Tracking & Management",
    bestFor: "Cloud-based affiliate tracking",
    pricing: "Paid",
    pricingDetails: "$89/mo (Essential) to $149/mo (Pro)",
    website: "https://tapfiliate.com",
    rating: 4.4,
    difficulty: "Beginner",
    description: "Tapfiliate is a cloud-based affiliate tracking software designed for ease of use. It enables businesses to create, track, and optimize their affiliate programs with minimal technical setup, integrating with popular e-commerce and SaaS platforms.",
    keyFeatures: [
      "Easy setup wizard",
      "Automated workflows",
      "Branded affiliate portals",
      "Multi-level marketing",
      "30+ integrations",
      "Real-time reporting"
    ],
    pros: [
      "Very easy to set up",
      "Clean interface",
      "Good integrations",
      "Affordable pricing"
    ],
    cons: [
      "Limited advanced features",
      "No built-in network",
      "Basic customization",
      "Fewer payment options"
    ],
    useCases: ["Startups", "Small businesses", "SaaS companies", "E-commerce stores"]
  },
  {
    id: 9,
    name: "Refersion",
    category: "Affiliate Tracking & Management",
    bestFor: "E-commerce affiliate tracking",
    pricing: "Paid",
    pricingDetails: "$99/mo (Professional) to $249/mo (Enterprise)",
    website: "https://www.refersion.com",
    rating: 4.3,
    difficulty: "Beginner",
    description: "Refersion is an affiliate and influencer marketing platform built specifically for e-commerce brands. It integrates seamlessly with Shopify, BigCommerce, and WooCommerce, making it easy to launch and manage affiliate programs for online stores.",
    keyFeatures: [
      "E-commerce integrations",
      "Influencer tracking",
      "Coupon code tracking",
      "Custom commission rules",
      "Marketplace access",
      "Automated payouts"
    ],
    pros: [
      "E-commerce focused",
      "Easy Shopify integration",
      "Influencer features",
      "Good marketplace"
    ],
    cons: [
      "Limited to e-commerce",
      "Can get expensive",
      "Basic reporting",
      "Limited customization"
    ],
    useCases: ["Shopify stores", "DTC brands", "E-commerce businesses", "Influencer programs"]
  },
  {
    id: 10,
    name: "Everflow",
    category: "Affiliate Tracking & Management",
    bestFor: "Partner marketing platform",
    pricing: "Paid",
    pricingDetails: "$750/mo (Starter) to custom (Enterprise)",
    website: "https://www.everflow.io",
    rating: 4.6,
    difficulty: "Advanced",
    description: "Everflow is a sophisticated partner marketing platform for managing affiliates, influencers, and strategic partnerships at scale. It offers advanced analytics, fraud prevention, and automation tools used by performance marketing teams and networks.",
    keyFeatures: [
      "Advanced analytics",
      "Fraud prevention",
      "Direct linking",
      "Granular tracking",
      "API access",
      "Custom integrations"
    ],
    pros: [
      "Powerful analytics",
      "Excellent fraud tools",
      "Flexible tracking",
      "Great for scale"
    ],
    cons: [
      "Expensive pricing",
      "Complex for beginners",
      "Steep learning curve",
      "Overkill for small programs"
    ],
    useCases: ["Performance networks", "Enterprise brands", "Affiliate managers", "Media buyers"]
  },
  {
    id: 11,
    name: "TUNE",
    category: "Affiliate Tracking & Management",
    bestFor: "Mobile & performance marketing",
    pricing: "Paid",
    pricingDetails: "$599/mo (Bootstrap) to custom (Enterprise)",
    website: "https://www.tune.com",
    rating: 4.4,
    difficulty: "Advanced",
    description: "TUNE is a flexible partner marketing platform originally known for mobile app tracking. It provides customizable affiliate management with strong mobile capabilities, real-time reporting, and enterprise-grade fraud prevention.",
    keyFeatures: [
      "Mobile app tracking",
      "Real-time data",
      "Fraud prevention",
      "Custom workflows",
      "White-label options",
      "API-first platform"
    ],
    pros: [
      "Strong mobile tracking",
      "Highly customizable",
      "Enterprise features",
      "Real-time reporting"
    ],
    cons: [
      "Premium pricing",
      "Complex setup",
      "Technical expertise needed",
      "Dated interface"
    ],
    useCases: ["Mobile app marketers", "Performance networks", "Enterprise programs", "Agencies"]
  },
  {
    id: 12,
    name: "ThirstyAffiliates",
    category: "Link Management & Cloaking",
    bestFor: "WordPress affiliate link management",
    pricing: "Freemium",
    pricingDetails: "Free / $79.50/year (Basic) to $199.50/year (Pro)",
    website: "https://thirstyaffiliates.com",
    rating: 4.6,
    difficulty: "Beginner",
    description: "ThirstyAffiliates is the leading WordPress plugin for managing affiliate links. It helps bloggers and content creators cloak, organize, and track affiliate links directly within WordPress with easy link insertion and automatic keyword linking.",
    keyFeatures: [
      "Link cloaking",
      "Link categorization",
      "Click tracking",
      "Auto keyword linking",
      "Geolocation redirects",
      "Amazon import"
    ],
    pros: [
      "Easy WordPress integration",
      "Clean link management",
      "Good free version",
      "Auto-linking saves time"
    ],
    cons: [
      "WordPress only",
      "Limited analytics",
      "Pro features require paid",
      "No multi-site support (free)"
    ],
    useCases: ["WordPress bloggers", "Affiliate marketers", "Content creators", "Niche site owners"]
  },
  {
    id: 13,
    name: "Pretty Links",
    category: "Link Management & Cloaking",
    bestFor: "Link shortening & tracking",
    pricing: "Freemium",
    pricingDetails: "Free / $99.50/year (Beginner) to $199.50/year (Super)",
    website: "https://prettylinks.com",
    rating: 4.5,
    difficulty: "Beginner",
    description: "Pretty Links is a WordPress link management plugin that creates short, branded links for affiliate URLs. It provides click tracking, link cloaking, and redirect management while keeping your affiliate links clean and professional.",
    keyFeatures: [
      "Link shortening",
      "Click tracking",
      "Redirect types (301, 302, 307)",
      "Link grouping",
      "QR code generation",
      "Link health checker"
    ],
    pros: [
      "Simple to use",
      "Clean branded links",
      "Good free version",
      "Multiple redirect types"
    ],
    cons: [
      "WordPress only",
      "Basic analytics",
      "No auto-linking (free)",
      "Limited integrations"
    ],
    useCases: ["Bloggers", "Social media marketers", "Email marketers", "Podcasters"]
  },
  {
    id: 14,
    name: "Geniuslink",
    category: "Link Management & Cloaking",
    bestFor: "Intelligent affiliate links",
    pricing: "Paid",
    pricingDetails: "$5/mo (Starter) to $75/mo (Pro)",
    website: "https://geniuslink.com",
    rating: 4.4,
    difficulty: "Beginner",
    description: "Geniuslink creates intelligent affiliate links that automatically route users to the correct local store (Amazon, iTunes, Microsoft) based on their location. It maximizes international affiliate earnings with automatic geo-targeting.",
    keyFeatures: [
      "Global link localization",
      "Amazon OneLink alternative",
      "iTunes affiliate support",
      "Click analytics",
      "Choice pages",
      "API access"
    ],
    pros: [
      "Automatic geo-routing",
      "Maximizes global earnings",
      "Easy setup",
      "Multiple store support"
    ],
    cons: [
      "Focused on major retailers",
      "Monthly click limits",
      "Limited customization",
      "Can get expensive at scale"
    ],
    useCases: ["Amazon affiliates", "International publishers", "iTunes affiliates", "Global content creators"]
  },
  {
    id: 15,
    name: "Ahrefs",
    category: "Content & Research",
    bestFor: "Affiliate keyword research",
    pricing: "Paid",
    pricingDetails: "$29/mo (Starter) to $374/mo (Advanced)",
    website: "https://ahrefs.com",
    rating: 4.8,
    difficulty: "Intermediate",
    description: "Ahrefs is an essential SEO tool for affiliate marketers doing keyword research and competitive analysis. It helps identify profitable affiliate keywords, analyze competitor content strategies, and find link building opportunities to grow organic traffic.",
    keyFeatures: [
      "Keyword research",
      "Competitor analysis",
      "Content gap analysis",
      "Backlink research",
      "Rank tracking",
      "Site audit"
    ],
    pros: [
      "Best keyword data",
      "Excellent content tools",
      "Accurate traffic estimates",
      "Regular updates"
    ],
    cons: [
      "Expensive for beginners",
      "Credit-based system",
      "No free trial",
      "Learning curve"
    ],
    useCases: ["SEO affiliates", "Content marketers", "Niche site builders", "Authority sites"]
  },
  {
    id: 16,
    name: "Semrush",
    category: "Content & Research",
    bestFor: "Competitive affiliate research",
    pricing: "Paid",
    pricingDetails: "$139.95/mo (Pro) to $499.95/mo (Business)",
    website: "https://www.semrush.com",
    rating: 4.7,
    difficulty: "Intermediate",
    description: "Semrush is an all-in-one marketing toolkit valuable for affiliate marketers researching niches, finding keywords, and analyzing competitors. Its competitive analysis features reveal what's working for successful affiliate sites in any niche.",
    keyFeatures: [
      "Keyword magic tool",
      "Competitor analysis",
      "Content template",
      "Position tracking",
      "Site audit",
      "Traffic analytics"
    ],
    pros: [
      "Comprehensive toolkit",
      "Great competitor insights",
      "Content optimization",
      "Regular new features"
    ],
    cons: [
      "Expensive pricing",
      "Can be overwhelming",
      "Limits on lower plans",
      "Learning required"
    ],
    useCases: ["Affiliate researchers", "Content strategists", "SEO professionals", "Niche site builders"]
  },
  {
    id: 17,
    name: "Lasso",
    category: "Content & Research",
    bestFor: "Affiliate link & display management",
    pricing: "Paid",
    pricingDetails: "$39/mo (Starter) to $99/mo (Pro)",
    website: "https://getlasso.co",
    rating: 4.7,
    difficulty: "Beginner",
    description: "Lasso is a WordPress plugin designed specifically for affiliate marketers. It creates beautiful product displays, manages affiliate links, and provides click analytics. Its product boxes and comparison tables help increase affiliate conversions.",
    keyFeatures: [
      "Product display boxes",
      "Comparison tables",
      "Link management",
      "Click tracking",
      "Amazon auto-import",
      "Link opportunity finder"
    ],
    pros: [
      "Beautiful displays",
      "Increases conversions",
      "Easy to use",
      "Great for reviews"
    ],
    cons: [
      "WordPress only",
      "Monthly subscription",
      "Limited to displays/links",
      "Newer platform"
    ],
    useCases: ["Product reviewers", "Comparison sites", "Niche bloggers", "Affiliate content creators"]
  },
  {
    id: 18,
    name: "Affilimate",
    category: "Content & Research",
    bestFor: "Affiliate analytics & optimization",
    pricing: "Paid",
    pricingDetails: "$29/mo (Starter) to $119/mo (Scale)",
    website: "https://affilimate.com",
    rating: 4.5,
    difficulty: "Intermediate",
    description: "Affilimate aggregates affiliate data from multiple networks into one dashboard, showing which content and links drive the most revenue. It provides heatmaps, revision tracking, and optimization insights to help affiliates increase earnings.",
    keyFeatures: [
      "Multi-network aggregation",
      "Content performance analytics",
      "Link click heatmaps",
      "Revenue attribution",
      "Revision tracking",
      "SubID management"
    ],
    pros: [
      "Unified analytics",
      "Content-level insights",
      "Heatmap visualization",
      "Saves reporting time"
    ],
    cons: [
      "Requires existing earnings",
      "Limited network support",
      "No link management",
      "Learning curve"
    ],
    useCases: ["Multi-network affiliates", "Content publishers", "Affiliate analysts", "Data-driven marketers"]
  }
];

// FAQ Data
const faqs = [
  {
    question: "What is affiliate marketing?",
    answer: "Affiliate marketing is a performance-based marketing model where you earn commissions by promoting other companies' products or services. When someone makes a purchase through your unique affiliate link, you receive a percentage of the sale. It's one of the most popular ways to monetize blogs, YouTube channels, and social media."
  },
  {
    question: "How do I start affiliate marketing as a beginner?",
    answer: "Start by choosing a niche you're passionate about, then create content (blog, YouTube, social media) around that topic. Join affiliate programs relevant to your niche through networks like ShareASale, CJ Affiliate, or directly with brands. Focus on providing value to your audience and naturally recommend products you genuinely believe in."
  },
  {
    question: "What's the best affiliate network for beginners?",
    answer: "ShareASale and Awin are excellent for beginners due to their easy approval processes and wide variety of merchants. Amazon Associates is also beginner-friendly but has lower commission rates. For B2B/SaaS content, PartnerStack offers high-quality programs with recurring commissions."
  },
  {
    question: "How much can I earn from affiliate marketing?",
    answer: "Earnings vary dramatically based on your traffic, niche, and promotion methods. Beginners might earn $0-$1,000/month, while established affiliates can earn $10,000-$100,000+/month. High-ticket niches (finance, software, courses) typically offer higher commissions than physical products."
  },
  {
    question: "Do I need a website for affiliate marketing?",
    answer: "While not strictly required, a website significantly increases your affiliate success. It provides a platform for content, builds trust with audiences, and allows for SEO traffic. Alternatives include YouTube, TikTok, email newsletters, or social media, though websites typically convert better for most niches."
  },
  {
    question: "What's the difference between affiliate networks and affiliate programs?",
    answer: "Affiliate networks (ShareASale, CJ Affiliate, Impact) are platforms that host multiple merchant programs in one place, providing unified tracking and payments. Affiliate programs are individual brand partnerships, either through networks or directly with companies (like Amazon Associates or Shopify Affiliates)."
  },
  {
    question: "What tools do successful affiliate marketers use?",
    answer: "Successful affiliates typically use: an affiliate network or tracking platform, SEO tools (Ahrefs/Semrush) for keyword research, link management plugins (ThirstyAffiliates/Lasso), analytics tools, and email marketing software. The specific stack depends on your business model and scale."
  },
  {
    question: "How do I track affiliate link performance?",
    answer: "Use SubIDs in your affiliate links to track which content drives sales. Tools like Affilimate aggregate data from multiple networks. Link management plugins provide click tracking. Google Analytics with UTM parameters helps understand traffic sources. Most affiliate networks also provide basic reporting."
  },
  {
    question: "What are recurring commissions in affiliate marketing?",
    answer: "Recurring commissions pay you every month a referred customer remains subscribed, common with SaaS and subscription products. For example, if you refer someone to a $100/month software with 20% recurring commission, you earn $20/month for as long as they stay subscribed. PartnerStack specializes in these programs."
  },
  {
    question: "How do I choose the right affiliate products to promote?",
    answer: "Choose products that: 1) Align with your audience's needs, 2) You've personally used or thoroughly researched, 3) Have good commission rates and cookie duration, 4) Come from reputable companies with good conversion rates, 5) Offer proper affiliate support and creatives. Quality matters more than commission rate."
  }
];

export default function BestAffiliateMarketingToolsPage() {
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");

  const categories = ["All", ...Array.from(new Set(affiliateTools.map(tool => tool.category)))];

  const filteredTools = selectedCategory === "All"
    ? affiliateTools
    : affiliateTools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "18 Best Affiliate Marketing Tools for 2026 - Complete Guide",
            "description": "Comprehensive guide to the best affiliate marketing tools in 2026. Compare features, pricing, pros & cons of top platforms including ShareASale, CJ Affiliate, Impact, and more.",
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
            "itemListElement": affiliateTools.slice(0, 10).map((tool, index) => ({
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
            <Link href="/" className="hover:text-emerald-700 flex items-center transition-colors">
              <Home className="w-3.5 h-3.5 mr-1" />
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/marketing" className="hover:text-emerald-700 transition-colors">Marketing</Link>
            <span className="text-gray-300">/</span>
            <span className="text-emerald-700 font-medium">Best Affiliate Marketing Tools</span>
          </nav>
        </div>
      </div>

      {/* Premium Hero Section */}
      <section className="relative overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #064e3b 0%, #059669 50%, #064e3b 100%)' }}>
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
              <span className="block text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #6ee7b7, #a7f3d0, #6ee7b7)' }}>
                Affiliate Marketing Tools
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
                  className="font-semibold text-white hover:text-emerald-200 transition-colors flex items-center gap-1"
                >
                  Rishabh Jain
                  <Linkedin className="w-4 h-4" />
                </a>
                <span className="text-gray-400">·</span>
                <span className="text-gray-400">Nov 2026</span>
              </div>
            </div>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
              18 meticulously reviewed tools for affiliate networks, tracking, and optimization.
              From beginner-friendly platforms to enterprise solutions—maximize your commissions.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">18</div>
                <div className="text-sm text-gray-400 mt-1">Tools Reviewed</div>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-4xl font-bold text-white">4</div>
                <div className="text-sm text-gray-400 mt-1">Categories</div>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-300">5</div>
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
                <Award className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best for Beginners</p>
              <p className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">ShareASale</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="#tool-3"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best Modern Platform</p>
              <p className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">Impact</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="#tool-6"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-violet-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-violet-50 text-violet-600 mb-3">
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best for SaaS</p>
              <p className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">PartnerStack</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="#tool-17"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 text-amber-600 mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best for WordPress</p>
              <p className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">Lasso</p>
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
                  {affiliateTools.map((tool, idx) => (
                    <tr key={tool.id} className="hover:bg-emerald-50/30 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a href={`#tool-${tool.id}`} className="flex items-center gap-3 font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">
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
                style={selectedCategory === category ? { backgroundColor: '#059669', color: '#ffffff' } : {}}
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
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
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
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 mb-8 border border-emerald-100">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-emerald-600" />
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
                      <span key={idx} className="px-3 py-1.5 text-sm rounded-full font-medium" style={{ backgroundColor: '#d1fae5', color: '#047857' }}>
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
            <p className="text-gray-500">Expert answers to common affiliate marketing questions.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-gray-50 rounded-2xl overflow-hidden transition-all duration-300 ${
                  expandedFaq === index ? 'ring-2 ring-emerald-200' : ''
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
              { href: "/marketing/best-link-building-tools", title: "Link Building Tools", desc: "Top tools for building quality backlinks." },
              { href: "/marketing/ai-marketing-tools", title: "AI Marketing Tools", desc: "35+ AI tools for modern marketers." }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 mb-2 transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
                <div className="mt-4 text-emerald-600 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
