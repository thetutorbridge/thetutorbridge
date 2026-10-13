'use client';

import React from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import {
  Search,
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
  TrendingUp,
  BarChart3,
  Lightbulb,
  BookOpen,
  Linkedin
} from 'lucide-react';

// Local logo paths for keyword research tools
const localLogoPaths: { [key: string]: string } = {
  "Semrush": "/Semrush logo.png",
  "Ahrefs": "/ahrefs logo.png",
  "Google Keyword Planner": "/google keyword planner logo.png",
  "Moz Keyword Explorer": "/Moz Pro Logo.jpeg",
  "Mangools (KWFinder)": "/mangools (KWFinder) logo.jpeg",
  "Ubersuggest": "/Ubersuggest logo.png",
  "Keywords Everywhere": "/keywords everywhere logo.png",
};

// Tool Logo component
const ToolLogo = ({ name, size = 40 }: { name: string; size?: number }) => {
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

  return (
    <div
      className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center text-white font-semibold shadow-sm"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {name.charAt(0)}
    </div>
  );
};

// Keyword Research Tools Data - 7 Tools
const keywordResearchTools = [
  {
    id: 1,
    name: "Semrush",
    category: "All-in-One Keyword Research Suite",
    bestFor: "Complete keyword research & competitor analysis",
    pricing: "Paid",
    pricingDetails: "$139.95/mo (Pro) to $499.95/mo (Business)",
    website: "https://semrush.com",
    rating: 4.8,
    difficulty: "Intermediate",
    description: "Semrush is widely considered the most comprehensive keyword research software available in 2026. Its Keyword Magic Tool provides access to over 26 billion keywords, making it the go-to keyword finder for SEO professionals. Whether you need to discover long-tail keywords, analyze search volume trends, or find keyword opportunities your competitors are ranking for, Semrush delivers actionable keyword data for any SEO strategy.",
    keyFeatures: [
      "Keyword Magic Tool with 26B+ keywords",
      "Keyword difficulty scores with SERP analysis",
      "Search volume data with monthly trends",
      "Keyword gap analysis vs competitors",
      "Intent classification (informational, commercial, transactional)",
      "Related keywords & question-based queries"
    ],
    pros: [
      "Largest keyword database for comprehensive research",
      "Accurate search volume and keyword difficulty metrics",
      "Excellent competitor keyword analysis features",
      "Keyword grouping and clustering tools"
    ],
    cons: [
      "Premium pricing may be high for beginners",
      "Can feel overwhelming with so many features",
      "Per-seat pricing adds up for teams"
    ],
    useCases: ["SEO agencies", "Enterprise keyword research", "Competitor keyword analysis", "Content strategy planning"]
  },
  {
    id: 2,
    name: "Ahrefs",
    category: "Premium Keyword Research & Analysis",
    bestFor: "Accurate keyword metrics & click data",
    pricing: "Paid",
    pricingDetails: "$29/mo (Starter) to $449/mo (Advanced)",
    website: "https://ahrefs.com",
    rating: 4.9,
    difficulty: "Intermediate",
    description: "Ahrefs Keywords Explorer is the gold standard for keyword research accuracy in 2026. With a database of 28.7 billion keywords across 217 countries, Ahrefs provides the most reliable search volume data and keyword difficulty scores. What sets Ahrefs apart as a keyword research tool is its unique Clicks metric, which shows actual click-through rates for keywords, helping you identify true search opportunities beyond just search volume.",
    keyFeatures: [
      "28.7 billion keyword database",
      "Clicks metric showing real CTR potential",
      "Parent topic grouping for keyword clusters",
      "SERP overview with ranking history",
      "Keyword difficulty based on backlink data",
      "Global & local search volume data"
    ],
    pros: [
      "Most accurate keyword difficulty scores",
      "Unique clicks data reveals true keyword opportunity",
      "Excellent keyword suggestions and related terms",
      "Superior SERP analysis features"
    ],
    cons: [
      "No free trial (only $7 for 7 days)",
      "Credit system limits keyword lookups",
      "Steeper learning curve for beginners"
    ],
    useCases: ["Professional SEO keyword research", "Finding low-competition keywords", "International keyword analysis", "Content gap discovery"]
  },
  {
    id: 3,
    name: "Google Keyword Planner",
    category: "Free Keyword Research Tool",
    bestFor: "Official Google search volume data",
    pricing: "Free",
    pricingDetails: "Free with Google Ads account (no spend required)",
    website: "https://ads.google.com/keyword-planner",
    rating: 4.5,
    difficulty: "Beginner",
    description: "Google Keyword Planner is the original free keyword research tool and remains essential for any SEO strategy in 2026. As the only tool providing search data directly from Google, it offers reliable keyword suggestions and search volume estimates. While primarily designed for PPC advertisers, smart SEOs use Google Keyword Planner to validate keyword research, discover new keyword ideas, and understand seasonal search trends for their target keywords.",
    keyFeatures: [
      "Direct search volume data from Google",
      "Keyword ideas based on seed keywords",
      "Competition level indicators",
      "CPC estimates for commercial keywords",
      "Seasonal search trend data",
      "Location-specific keyword research"
    ],
    pros: [
      "Completely free keyword research tool",
      "Data comes directly from Google",
      "Great for local keyword research",
      "Reliable seasonal trend data"
    ],
    cons: [
      "Shows volume ranges, not exact numbers",
      "Requires Google Ads account to access",
      "Limited keyword difficulty insights",
      "Primarily designed for advertisers"
    ],
    useCases: ["Free keyword research", "Validating search volume", "Local SEO keyword discovery", "Understanding seasonal trends"]
  },
  {
    id: 4,
    name: "Moz Keyword Explorer",
    category: "Keyword Research with Priority Scoring",
    bestFor: "Prioritized keyword opportunities",
    pricing: "Paid",
    pricingDetails: "$99/mo (Standard) to $299/mo (Large)",
    website: "https://moz.com/explorer",
    rating: 4.6,
    difficulty: "Beginner",
    description: "Moz Keyword Explorer stands out among keyword research tools with its innovative Priority Score, which combines search volume, keyword difficulty, and organic CTR into a single actionable metric. With a database of 1.2 billion keywords and AI-powered keyword suggestions, Moz makes keyword research accessible for beginners while providing the depth professionals need. The tool excels at finding keywords that balance search volume with ranking potential.",
    keyFeatures: [
      "Priority Score for keyword evaluation",
      "1.2 billion keyword database",
      "AI-powered keyword suggestions",
      "Organic CTR predictions",
      "SERP feature analysis",
      "Keyword lists and tracking"
    ],
    pros: [
      "Priority Score simplifies keyword selection",
      "Beginner-friendly interface",
      "95%+ search volume accuracy",
      "Excellent educational resources"
    ],
    cons: [
      "Smaller database than Semrush/Ahrefs",
      "Less frequent data updates",
      "Limited to Moz Pro subscribers"
    ],
    useCases: ["Beginners learning keyword research", "Quick keyword prioritization", "Content planning", "Educational SEO projects"]
  },
  {
    id: 5,
    name: "Mangools (KWFinder)",
    category: "Budget-Friendly Keyword Finder",
    bestFor: "Finding low-competition keywords",
    pricing: "Paid",
    pricingDetails: "$29/mo (Basic) to $89/mo (Agency)",
    website: "https://mangools.com",
    rating: 4.7,
    difficulty: "Beginner",
    description: "Mangools KWFinder is the best keyword research tool for finding low-competition, long-tail keywords that are easier to rank for. With its beautiful interface and straightforward keyword difficulty metric, KWFinder has become the favorite keyword finder for bloggers, affiliate marketers, and small businesses. The tool excels at surfacing keyword opportunities that bigger tools often miss, making it perfect for niche keyword research and building topical authority.",
    keyFeatures: [
      "Intuitive keyword difficulty scoring",
      "Long-tail keyword suggestions",
      "SERP analysis with competitor metrics",
      "Search volume with trend graphs",
      "Keyword lists organization",
      "Local keyword research support"
    ],
    pros: [
      "Best tool for finding easy-to-rank keywords",
      "Most user-friendly keyword research interface",
      "Affordable pricing for individuals",
      "Accurate keyword difficulty scores"
    ],
    cons: [
      "Limited daily keyword searches",
      "Smaller keyword database",
      "Basic compared to enterprise tools"
    ],
    useCases: ["Niche site keyword research", "Blog topic discovery", "Affiliate marketing keywords", "Small business SEO"]
  },
  {
    id: 6,
    name: "Ubersuggest",
    category: "Affordable All-in-One Keyword Tool",
    bestFor: "Budget-conscious keyword research",
    pricing: "Freemium",
    pricingDetails: "$12-$29/mo or $120-$290 lifetime",
    website: "https://neilpatel.com/ubersuggest",
    rating: 4.4,
    difficulty: "Beginner",
    description: "Ubersuggest by Neil Patel democratizes keyword research software by offering professional-grade features at a fraction of the cost. As both a free keyword research tool with limited searches and an affordable paid option, Ubersuggest is ideal for beginners and small businesses starting their keyword research journey. The tool provides keyword ideas, search volume data, SEO difficulty scores, and content suggestions, all in an easy-to-understand interface.",
    keyFeatures: [
      "Keyword ideas with search volume",
      "SEO difficulty scores",
      "Content ideas based on keywords",
      "Competitor keyword analysis",
      "Keyword trends over time",
      "Chrome extension for quick research"
    ],
    pros: [
      "Most affordable paid keyword research tool",
      "Lifetime deal available ($290 one-time)",
      "Free tier for basic keyword research",
      "Simple, beginner-friendly interface"
    ],
    cons: [
      "Less accurate than premium tools",
      "Smaller keyword database",
      "Limited features compared to Semrush/Ahrefs"
    ],
    useCases: ["Beginners learning SEO", "Small business keyword research", "Budget-friendly keyword analysis", "Quick keyword ideas"]
  },
  {
    id: 7,
    name: "Keywords Everywhere",
    category: "Browser-Based Keyword Research",
    bestFor: "In-browser keyword metrics",
    pricing: "Paid",
    pricingDetails: "$84/year (100K credits) to $1,440/year (8M credits)",
    website: "https://keywordseverywhere.com",
    rating: 4.5,
    difficulty: "Beginner",
    description: "Keywords Everywhere transforms your browser into a powerful keyword research tool by displaying search volume, CPC, and competition data directly in Google search results. This keyword research browser extension saves hours of switching between tools, providing instant keyword metrics as you search. With support for Google, YouTube, Amazon, and other platforms, Keywords Everywhere is essential for quick keyword research and content ideation on the fly.",
    keyFeatures: [
      "Keyword data in Google SERPs",
      "Related keywords panel",
      "People Also Ask data",
      "YouTube & Amazon keyword support",
      "Trend data visualization",
      "Bulk keyword upload"
    ],
    pros: [
      "Instant keyword data while browsing",
      "Works across multiple platforms",
      "Very affordable credit-based pricing",
      "Saves time switching between tools"
    ],
    cons: [
      "Credit-based system can run out",
      "Less comprehensive than full suites",
      "No keyword tracking features"
    ],
    useCases: ["Quick keyword research", "YouTube SEO keywords", "Amazon product keywords", "Content ideation while browsing"]
  }
];

// FAQ Data for keyword research
const faqs = [
  {
    question: "What is the best keyword research tool in 2026?",
    answer: "The best keyword research tool depends on your needs and budget. Semrush and Ahrefs are the top choices for comprehensive keyword research with the largest databases (26-28 billion keywords). For beginners, Mangools KWFinder offers excellent value with an intuitive interface. Google Keyword Planner remains the best free keyword research tool for getting official Google search data."
  },
  {
    question: "What is keyword research and why is it important for SEO?",
    answer: "Keyword research is the process of discovering and analyzing search terms that people enter into search engines. It's the foundation of SEO because it helps you understand what your target audience is searching for, allowing you to create content that matches search intent. Effective keyword research reveals search volume, competition levels, and ranking opportunities."
  },
  {
    question: "What's the difference between keyword research tools and keyword planners?",
    answer: "Keyword research tools (like Ahrefs, Semrush, KWFinder) are comprehensive platforms designed for SEO, providing keyword difficulty, SERP analysis, and competitor insights. Keyword planners (like Google Keyword Planner) are primarily designed for PPC advertising, focusing on search volume and CPC data. Most SEO professionals use both types together."
  },
  {
    question: "How do I find low-competition keywords?",
    answer: "To find low-competition keywords, use tools like Mangools KWFinder or Ahrefs that provide accurate keyword difficulty scores. Look for keywords with decent search volume (100-1000 monthly searches) but low difficulty scores (under 30). Focus on long-tail keywords (3+ words) and question-based queries, which typically have less competition than short, generic terms."
  },
  {
    question: "Are free keyword research tools good enough?",
    answer: "Free keyword research tools like Google Keyword Planner, Google Trends, and Ubersuggest's free tier can be sufficient for basic keyword research. However, paid tools provide more accurate data, larger keyword databases, competitor analysis, and keyword difficulty scores that free tools lack. As your SEO efforts grow, investing in premium keyword research software typically delivers better ROI."
  },
  {
    question: "What is keyword difficulty and how is it calculated?",
    answer: "Keyword difficulty (KD) is a metric that estimates how hard it would be to rank on the first page of Google for a specific keyword. It's typically calculated based on the backlink profiles, domain authority, and content quality of currently ranking pages. Each tool uses its own algorithm, so KD scores vary between platforms. Ahrefs' KD is considered most accurate as it's based on actual backlink data."
  },
  {
    question: "How many keywords should I target per page?",
    answer: "Best practice is to target one primary keyword per page, supported by 3-5 closely related secondary keywords (semantic variations and long-tail keywords). This approach, called keyword clustering, helps establish topical relevance while avoiding keyword cannibalization. Modern SEO focuses on covering topics comprehensively rather than stuffing multiple unrelated keywords."
  },
  {
    question: "What is search intent and why does it matter for keyword research?",
    answer: "Search intent is the purpose behind a user's search query. The four main types are: informational (seeking knowledge), navigational (finding a specific site), commercial (researching before purchase), and transactional (ready to buy). Matching your content to search intent is crucial because Google prioritizes pages that best satisfy user intent. Keyword research tools like Semrush now classify keywords by intent automatically."
  },
  {
    question: "How often should I do keyword research?",
    answer: "Keyword research should be an ongoing process, not a one-time activity. Conduct comprehensive keyword research quarterly to identify new opportunities and trends. Monthly reviews help you spot emerging keywords and seasonal changes. Additionally, research keywords before creating any new content to ensure you're targeting terms with actual search demand."
  },
  {
    question: "What are long-tail keywords and why are they important?",
    answer: "Long-tail keywords are longer, more specific search phrases (typically 3+ words) like 'best keyword research tools for beginners' versus short-tail keywords like 'keyword tools'. They're important because they have lower competition, higher conversion rates (more specific intent), and collectively account for the majority of search traffic. Targeting long-tail keywords is essential for newer websites building authority."
  }
];

// What is Keyword Research Section Data
const keywordResearchBenefits = [
  {
    icon: Target,
    title: "Discover Search Demand",
    description: "Find out exactly what your target audience is searching for and how often they search for it."
  },
  {
    icon: BarChart3,
    title: "Analyze Competition",
    description: "Understand how difficult it will be to rank for specific keywords and identify gaps in competitor strategies."
  },
  {
    icon: TrendingUp,
    title: "Drive Organic Traffic",
    description: "Target keywords that will bring qualified visitors to your website through organic search results."
  },
  {
    icon: Lightbulb,
    title: "Content Strategy",
    description: "Generate content ideas based on actual search queries and user intent to build topical authority."
  }
];

export default function BestKeywordResearchToolsPage() {
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "7 Best Keyword Research Tools in 2026 (Free & Paid) - Complete Guide",
            "description": "Comprehensive guide to the best keyword research tools and software in 2026. Compare features, pricing, pros & cons of top keyword research tools including Semrush, Ahrefs, Google Keyword Planner, and more.",
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
            "datePublished": "2026-10-13",
            "dateModified": "2026-10-13",
            "keywords": "keyword research tools, keyword research software, best keyword research tools, keyword finder, keyword planner, seo keyword research"
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
            "name": "Best Keyword Research Tools 2026",
            "description": "Ranked list of the best keyword research tools and software for SEO",
            "itemListElement": keywordResearchTools.map((tool, index) => ({
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
            <span className="text-slate-900 font-medium">Best Keyword Research Tools</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

        <div className="relative py-20 md:py-28 px-4 sm:px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-8">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-gray-100">Updated for 2026</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight text-white">
              Best Keyword Research Tools
              <span className="block text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #60a5fa, #34d399, #60a5fa)' }}>
                for SEO in 2026
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
                  className="font-semibold text-white hover:text-blue-300 transition-colors flex items-center gap-1"
                >
                  Rishabh Jain
                  <Linkedin className="w-4 h-4" />
                </a>
                <span className="text-gray-400">·</span>
                <span className="text-gray-400">Oct 13, 2026</span>
              </div>
            </div>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
              Discover the top keyword research software to find profitable keywords, analyze search volume, and outrank your competition. From free keyword planners to premium keyword finder tools.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">7</div>
                <div className="text-sm text-gray-400 mt-1">Tools Reviewed</div>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-4xl font-bold text-white">54B+</div>
                <div className="text-sm text-gray-400 mt-1">Keywords Combined</div>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400">2</div>
                <div className="text-sm text-gray-400 mt-1">Free Options</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Picks */}
      <section className="py-12 px-4 sm:px-6 -mt-8 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-4">
            <a href="#tool-1" className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 mb-3">
                <Award className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best Overall</p>
              <p className="font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">Semrush</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a href="#tool-2" className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 mb-3">
                <Target className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Most Accurate</p>
              <p className="font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">Ahrefs</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a href="#tool-3" className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-violet-200 transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-violet-50 text-violet-600 mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best Free Tool</p>
              <p className="font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">Google Keyword Planner</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a href="#tool-5" className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 text-amber-600 mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best for Beginners</p>
              <p className="font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">Mangools KWFinder</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
          </div>
        </div>
      </section>

      {/* What is Keyword Research Section */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Understanding Keyword Research
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What is Keyword Research?</h2>
            <p className="text-gray-600 leading-relaxed">
              Keyword research is the foundation of any successful SEO strategy. It involves discovering, analyzing, and selecting the best search terms that people enter into search engines like Google. Using keyword research tools helps you understand search volume, keyword difficulty, and user intent, allowing you to create content that ranks higher and drives targeted organic traffic.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keywordResearchBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="comparison-table" className="py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Keyword Research Tools Comparison</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Compare the best keyword research software side-by-side to find the perfect keyword finder for your needs.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50/80">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Keyword Research Tool</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Best For</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Pricing</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {keywordResearchTools.map((tool) => (
                    <tr key={tool.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a href={`#tool-${tool.id}`} className="flex items-center gap-3 font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          <ToolLogo name={tool.name} size={32} />
                          <span>{tool.name}</span>
                        </a>
                      </td>
                      <td className="px-6 py-4">
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

      {/* Tool Cards */}
      <section id="all-tools" className="py-16 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">In-Depth Keyword Research Tool Reviews</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Detailed analysis of each keyword research software including features, pricing, and expert recommendations.</p>
          </div>

          <div className="space-y-8">
            {keywordResearchTools.map((tool) => (
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
                        <ToolLogo name={tool.name} size={56} />
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
                        <p className="text-gray-500 text-sm mb-3">{tool.category} &middot; {tool.bestFor}</p>
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
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Key Keyword Research Features</h4>
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

      {/* How to Choose Section */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">How to Choose the Best Keyword Research Tool</h2>
            <p className="text-gray-500">Key factors to consider when selecting keyword research software for your SEO strategy.</p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">1. Database Size & Accuracy</h3>
              <p className="text-gray-600 text-sm">The best keyword research tools have large, frequently updated databases. Semrush and Ahrefs lead with 26-28 billion keywords. Larger databases mean more keyword ideas and long-tail keyword opportunities for your content strategy.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">2. Keyword Difficulty Accuracy</h3>
              <p className="text-gray-600 text-sm">Accurate keyword difficulty scores help you target keywords you can actually rank for. Ahrefs is considered most accurate as it calculates difficulty based on backlink data. Avoid tools with inflated or unreliable difficulty metrics.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">3. Search Volume Data</h3>
              <p className="text-gray-600 text-sm">Look for keyword research software that provides accurate monthly search volume data with historical trends. Google Keyword Planner offers official data but in ranges. Premium tools like Semrush provide more precise estimates.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">4. Budget & Pricing Model</h3>
              <p className="text-gray-600 text-sm">Keyword research tools range from free (Google Keyword Planner) to $500+/month (enterprise Semrush). Beginners can start with free tools or affordable options like Ubersuggest ($29/mo) or KWFinder ($29/mo) before upgrading.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">5. Additional Features</h3>
              <p className="text-gray-600 text-sm">Consider what else you need: competitor analysis, SERP tracking, content optimization, backlink data. All-in-one suites like Semrush offer everything but cost more. Focused tools like KWFinder excel at keyword research specifically.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Free vs Paid Section */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Free vs Paid Keyword Research Tools</h2>
            <p className="text-gray-500">Understanding when to use free keyword research tools and when to invest in premium software.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Free Keyword Research Tools</h3>
              <p className="text-gray-600 mb-4">Best for: Beginners, small projects, validating ideas</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> Google Keyword Planner - Official Google data</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> Google Trends - Trend analysis & seasonality</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> Ubersuggest Free - Limited daily searches</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> AnswerThePublic - Question-based keywords</li>
              </ul>
              <p className="text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">Limitations: Volume ranges, no difficulty scores, limited searches</p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-blue-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Paid Keyword Research Software</h3>
              <p className="text-gray-600 mb-4">Best for: Professionals, agencies, serious SEO</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" /> Semrush/Ahrefs - Enterprise-grade keyword data</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" /> Accurate keyword difficulty scores</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" /> Competitor keyword analysis</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" /> SERP analysis & ranking history</li>
              </ul>
              <p className="text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">Investment: $29-$500/month depending on features needed</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Keyword Research FAQs</h2>
            <p className="text-gray-500">Expert answers to common questions about keyword research tools and software.</p>
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

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

        <div className="container mx-auto max-w-3xl text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-6" style={{ color: '#d1d5db' }}>
            <Search className="w-4 h-4 text-amber-400" />
            Start your keyword research today
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Find Profitable Keywords?</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: '#d1d5db' }}>
            Begin with free keyword research tools like Google Keyword Planner, then upgrade to premium software as your SEO strategy grows.
          </p>
          <a
            href="https://ads.google.com/keyword-planner"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-all shadow-xl hover:-translate-y-0.5"
            style={{ backgroundColor: '#ffffff', color: '#0f172a' }}
          >
            Try Google Keyword Planner Free
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-16 px-4 sm:px-6 bg-[#FAFBFC]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">Explore More Marketing Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { href: "/marketing/best-seo-tools", title: "Best SEO Tools", desc: "32 best SEO tools for rankings, audits & analysis." },
              { href: "/marketing/ai-marketing-tools", title: "AI Marketing Tools", desc: "35 best AI tools for content, automation & analytics." },
              { href: "/marketing/best-rank-tracking-tools", title: "Rank Tracking Tools", desc: "Monitor keyword positions with the best SERP trackers." }
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
