'use client';

import React from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import {
  Link2,
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
  Globe,
  Linkedin,
  BookOpen,
  Users
} from 'lucide-react';

// Local logo paths for link building tools
const localLogoPaths: { [key: string]: string } = {
  "Ahrefs": "/ahrefs logo.png",
  "Semrush": "/Semrush logo.png",
  "Moz Link Explorer": "/Moz Pro Logo.jpeg",
  "Ubersuggest": "/Ubersuggest logo.png",
  "Linkody": "/linkody logo.jpeg",
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

// Link Building Tools Data - 5 Tools
const linkBuildingTools = [
  {
    id: 1,
    name: "Ahrefs",
    category: "Backlink Research & Analysis",
    bestFor: "Comprehensive backlink intelligence & competitor analysis",
    pricing: "Paid",
    pricingDetails: "$129/mo (Lite) to $449/mo (Advanced)",
    website: "https://ahrefs.com",
    rating: 4.9,
    difficulty: "Intermediate",
    description: "Ahrefs is the gold standard for backlink analysis and link building research in 2026. With the largest backlink index of over 35 trillion links, Ahrefs provides unmatched data for analyzing competitor backlink profiles, finding link building opportunities, and monitoring your own backlink growth. The Site Explorer tool reveals every referring domain, anchor text distribution, and link velocity trends. For SEO link building tools, Ahrefs remains the top choice for serious link builders who need accurate, comprehensive backlink data. The Content Explorer helps discover linkable content ideas, while Link Intersect finds sites linking to competitors but not to you.",
    keyFeatures: [
      "35+ trillion link index - largest in industry",
      "Competitor backlink gap analysis",
      "Broken link finder for outreach opportunities",
      "Content Explorer for linkable asset research",
      "Link Intersect to find sites linking to competitors",
      "Referring domains tracking & alerts"
    ],
    pros: [
      "Most comprehensive and accurate backlink database",
      "Excellent broken link building features",
      "Content Explorer finds link-worthy content ideas",
      "Real-time backlink monitoring and alerts"
    ],
    cons: [
      "No built-in email outreach functionality",
      "Higher price point than some alternatives",
      "Credit system limits on some plans"
    ],
    useCases: ["Backlink research", "Competitor link analysis", "Link gap identification", "Broken link building"]
  },
  {
    id: 2,
    name: "Semrush",
    category: "All-in-One Link Building Suite",
    bestFor: "Complete link building workflow in one platform",
    pricing: "Paid",
    pricingDetails: "$139.95/mo (Pro) to $499.95/mo (Business)",
    website: "https://semrush.com",
    rating: 4.8,
    difficulty: "Intermediate",
    description: "Semrush offers the most comprehensive all-in-one link building software available in 2026. Unlike standalone backlink tools, Semrush combines prospect research, backlink gap analysis, outreach email sequences, and link tracking under a single subscription. The Link Building Tool automatically generates prospect lists based on your target keywords, lets you send templated outreach emails directly from the platform, and tracks link acquisition status. For teams wanting backlink building tools with integrated outreach capabilities, Semrush delivers exceptional value with its complete SEO link building workflow.",
    keyFeatures: [
      "Automated link prospect generation",
      "Backlink gap analysis vs competitors",
      "Built-in outreach email sequences",
      "Link status tracking (Sent, In Progress, Acquired)",
      "Toxic backlink identification & disavow",
      "Gmail integration for outreach"
    ],
    pros: [
      "Complete link building workflow in one tool",
      "Built-in email outreach saves tool switching",
      "Excellent backlink audit and toxic link detection",
      "Combines SEO tools with link building features"
    ],
    cons: [
      "Can feel overwhelming with many features",
      "Outreach features less robust than dedicated tools",
      "Higher cost for full feature access"
    ],
    useCases: ["All-in-one link building", "Backlink audits", "Integrated outreach campaigns", "SEO agencies"]
  },
  {
    id: 3,
    name: "Moz Link Explorer",
    category: "Domain Authority & Link Research",
    bestFor: "Domain Authority analysis and link quality assessment",
    pricing: "Paid",
    pricingDetails: "$99/mo (Standard) to $299/mo (Large)",
    website: "https://moz.com/link-explorer",
    rating: 4.6,
    difficulty: "Beginner",
    description: "Moz Link Explorer is the home of Domain Authority (DA), the most widely recognized link quality metric in SEO. The tool provides comprehensive backlink analysis with Moz's proprietary metrics including Page Authority, Spam Score, and link equity estimates. For SEO link building tool users who need to quickly assess link quality and find opportunities, Moz offers an intuitive interface with clear actionable data. The Link Intersect feature reveals sites linking to competitors but not to you—prime link building targets. Moz's Spam Score helps identify toxic backlinks that could harm your rankings.",
    keyFeatures: [
      "Domain Authority & Page Authority scores",
      "Spam Score for toxic link detection",
      "Link Intersect for competitor analysis",
      "Discovered & Lost links tracking",
      "Anchor text analysis",
      "Top pages by links report"
    ],
    pros: [
      "Industry-standard DA metric widely understood",
      "Beginner-friendly interface",
      "Excellent spam detection capabilities",
      "Free limited access available"
    ],
    cons: [
      "Smaller link index than Ahrefs",
      "DA can be manipulated by PBNs",
      "Less frequent data updates"
    ],
    useCases: ["Link quality assessment", "DA-based prospecting", "Spam link detection", "Competitor link analysis"]
  },
  {
    id: 4,
    name: "Ubersuggest",
    category: "Budget-Friendly Link Building Tool",
    bestFor: "Affordable backlink analysis for beginners",
    pricing: "Freemium",
    pricingDetails: "Free (limited) to $29/mo or $290 lifetime",
    website: "https://neilpatel.com/ubersuggest",
    rating: 4.4,
    difficulty: "Beginner",
    description: "Ubersuggest by Neil Patel democratizes link building software by offering professional-grade backlink analysis at a fraction of the cost. The tool provides backlink data, referring domains, anchor text analysis, and competitor backlink research—all features typically reserved for expensive enterprise tools. For beginners and small businesses starting their link building journey, Ubersuggest is the most accessible entry point. The lifetime deal option at $290 makes it exceptionally cost-effective for long-term use. While the database is smaller than Ahrefs or Semrush, Ubersuggest provides sufficient data for most small to medium link building campaigns.",
    keyFeatures: [
      "Backlink overview with referring domains",
      "Competitor backlink analysis",
      "New & lost backlinks tracking",
      "Anchor text distribution",
      "Domain Authority scores",
      "Chrome extension for quick analysis"
    ],
    pros: [
      "Most affordable paid backlink tool",
      "Lifetime deal available ($290 one-time)",
      "Free tier for basic backlink research",
      "Simple, beginner-friendly interface"
    ],
    cons: [
      "Smaller backlink database than premium tools",
      "Less accurate data for some metrics",
      "Limited advanced features"
    ],
    useCases: ["Beginner link building", "Small business SEO", "Budget-friendly backlink analysis", "Quick competitor research"]
  },
  {
    id: 5,
    name: "Linkody",
    category: "Backlink Monitoring & Tracking",
    bestFor: "Monitoring backlink gains and losses",
    pricing: "Paid",
    pricingDetails: "$14.90/mo (Webmaster) to $153.90/mo (Agency XL)",
    website: "https://linkody.com",
    rating: 4.4,
    difficulty: "Beginner",
    description: "Linkody is a specialized backlink monitor that tracks your link profile changes in real-time—alerting you when you gain or lose backlinks. While link building tools help you acquire links, Linkody ensures you keep them. The tool sends instant notifications when high-value backlinks disappear, giving you time to reach out and recover them before rankings suffer. Linkody also monitors competitor backlinks, helping you discover new link opportunities. For backlinks tracking software that complements your link building efforts, Linkody provides affordable, focused monitoring without the complexity of all-in-one suites.",
    keyFeatures: [
      "Real-time backlink monitoring",
      "Instant gain/loss email alerts",
      "Competitor backlink tracking",
      "Disavow file generation",
      "Link metrics (DA, PA, spam score)",
      "White-label reports for agencies"
    ],
    pros: [
      "Most affordable dedicated link monitor",
      "Instant alerts for lost backlinks",
      "Simple, focused functionality",
      "30-day free trial available"
    ],
    cons: [
      "Not for prospecting or outreach",
      "Smaller link index than Ahrefs",
      "Limited to monitoring only"
    ],
    useCases: ["Backlink monitoring", "Link loss recovery", "Competitor link alerts", "Agency reporting"]
  }
];

// FAQ Data for link building
const faqs = [
  {
    question: "What are the best link building tools in 2026?",
    answer: "The best link building tools depend on your needs and budget. For comprehensive backlink research, Ahrefs leads with the largest database of 35+ trillion links. Semrush offers the best all-in-one solution with built-in outreach. Moz Link Explorer provides the industry-standard Domain Authority metric. Ubersuggest is best for beginners on a budget, and Linkody excels at backlink monitoring."
  },
  {
    question: "What is link building and why is it important for SEO?",
    answer: "Link building is the process of acquiring hyperlinks from other websites to your own. It remains one of the top ranking factors in Google's algorithm because links act as 'votes of confidence' from other sites. Quality backlinks signal to search engines that your content is valuable and trustworthy. Effective link building improves domain authority, increases referral traffic, and helps pages rank higher for target keywords."
  },
  {
    question: "What's the difference between link building tools and backlink checkers?",
    answer: "Backlink checkers (like Ahrefs, Moz, Ubersuggest) analyze existing backlink profiles—showing who links to you or competitors. Link building tools encompass the full workflow: prospecting for opportunities, finding contact information, sending outreach emails, and tracking responses. Semrush combines both in one platform, while specialized tools like Linkody focus on monitoring."
  },
  {
    question: "Are free link building tools effective?",
    answer: "Yes, free link building tools can be effective for beginners. Ubersuggest offers a free tier with limited backlink data. Moz provides 10 free queries monthly. Google Search Console shows your existing backlinks for free. However, paid tools like Ahrefs or Semrush provide significantly more data, accuracy, and features that make link building more efficient at scale."
  },
  {
    question: "How do I choose the right link building software?",
    answer: "Consider your budget, team size, and primary needs. Beginners should start with Ubersuggest (free/$29 mo) or Moz ($99/mo). Growing teams benefit from Semrush's all-in-one approach ($139/mo). Enterprise users needing maximum data choose Ahrefs ($129-449/mo). Add Linkody ($14.90/mo) for dedicated backlink monitoring regardless of your main tool."
  },
  {
    question: "What is Domain Authority and why does it matter?",
    answer: "Domain Authority (DA) is Moz's metric predicting how likely a website is to rank in search results, scored 1-100. Higher DA sites pass more 'link juice' when they link to you. While not a Google ranking factor directly, DA helps prioritize link building targets—getting links from high-DA sites typically impacts rankings more than low-DA links. Ahrefs uses a similar metric called Domain Rating (DR)."
  },
  {
    question: "How many backlinks do I need to rank?",
    answer: "There's no universal number—it depends on your niche's competition. Use Ahrefs or Semrush to analyze top-ranking pages for your target keywords and see their backlink profiles. Focus on link quality over quantity: one link from a relevant DR 70+ site often outweighs 100 low-quality links. Build links consistently over time rather than in suspicious spikes."
  },
  {
    question: "What are toxic backlinks and how do I find them?",
    answer: "Toxic backlinks come from spammy, low-quality, or irrelevant sites that can harm your rankings. Signs include: links from link farms, PBNs, foreign gambling/pharma sites, or sites with high spam scores. Semrush's Backlink Audit, Moz's Spam Score, and Ahrefs identify potentially toxic links. If you find harmful links you can't remove, use Google's Disavow Tool as a last resort."
  },
  {
    question: "What is the best free backlink checker?",
    answer: "Ubersuggest offers the best free backlink checker with limited daily searches. Ahrefs Webmaster Tools provides free backlink data for sites you own. Moz Link Explorer offers 10 free queries monthly. Google Search Console shows backlinks Google has discovered for your site. For comprehensive data without limits, paid tools are necessary."
  },
  {
    question: "How often should I monitor my backlinks?",
    answer: "Monitor backlinks at least weekly for active sites. Use Linkody or similar tools for real-time alerts on lost backlinks—quick action can recover valuable links before rankings drop. Monthly audits with Semrush or Ahrefs help identify toxic links. After link building campaigns, monitor daily to track which outreach efforts resulted in new backlinks."
  }
];

// What is Link Building Section Data
const linkBuildingBenefits = [
  {
    icon: TrendingUp,
    title: "Improve Rankings",
    description: "Quality backlinks remain one of Google's top ranking factors, directly boosting your search visibility."
  },
  {
    icon: Globe,
    title: "Build Authority",
    description: "Links from trusted sites increase your domain authority, making all your pages easier to rank."
  },
  {
    icon: Users,
    title: "Drive Referral Traffic",
    description: "Beyond SEO, backlinks send qualified visitors directly from relevant sites in your industry."
  },
  {
    icon: Target,
    title: "Competitive Edge",
    description: "Outpace competitors by building a stronger, more diverse backlink profile than theirs."
  }
];

export default function BestLinkBuildingToolsPage() {
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
            "headline": "5 Best Link Building Tools in 2026 (Free & Paid) - Complete Guide",
            "description": "Comprehensive guide to the best link building tools and backlink software in 2026. Compare features, pricing, pros & cons of top SEO link building tools including Ahrefs, Semrush, Moz, Ubersuggest, and Linkody.",
            "author": {
              "@type": "Person",
              "name": "Rishabh Jain",
              "url": "https://www.linkedin.com/in/rishabh-jain-33b946214/"
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
            "keywords": "link building tools, backlink tools, seo link building tools, best link building tools, backlink software, link building software, backlink checker"
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
            "name": "Best Link Building Tools 2026",
            "description": "Ranked list of the best link building tools and backlink software for SEO",
            "itemListElement": linkBuildingTools.map((tool, index) => ({
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
            <span className="text-slate-900 font-medium">Best Link Building Tools</span>
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
              Best Link Building Tools
              <span className="block text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #60a5fa, #a78bfa, #60a5fa)' }}>
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
              Discover the top <strong className="text-white">link building software</strong> to acquire quality backlinks, analyze competitor links, and boost your domain authority. Compare the best <strong className="text-white">backlink tools</strong> for every budget.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">5</div>
                <div className="text-sm text-gray-400 mt-1">Tools Reviewed</div>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-4xl font-bold text-white">35T+</div>
                <div className="text-sm text-gray-400 mt-1">Links Indexed</div>
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

      {/* Quick Picks */}
      <section className="py-12 px-4 sm:px-6 -mt-8 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-5 gap-4">
            <a href="#tool-1" className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 mb-3">
                <Award className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best Overall</p>
              <p className="font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">Ahrefs</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a href="#tool-2" className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 mb-3">
                <Target className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best All-in-One</p>
              <p className="font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">Semrush</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a href="#tool-3" className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-violet-200 transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-violet-50 text-violet-600 mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best for DA</p>
              <p className="font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">Moz</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a href="#tool-4" className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 text-amber-600 mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best Budget</p>
              <p className="font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">Ubersuggest</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a href="#tool-5" className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-rose-200 transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-rose-50 text-rose-600 mb-3">
                <Link2 className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best Monitoring</p>
              <p className="font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">Linkody</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
          </div>
        </div>
      </section>

      {/* What is Link Building Section */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Understanding Link Building
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What is Link Building?</h2>
            <p className="text-gray-600 leading-relaxed">
              Link building is the process of acquiring hyperlinks from other websites to your own. These <strong>backlinks</strong> act as votes of confidence, signaling to search engines that your content is valuable. Using <strong>link building tools</strong> helps you discover opportunities, analyze competitor backlinks, track your <strong>backlink profile</strong>, and build <strong>domain authority</strong> more efficiently. Quality <strong>SEO link building</strong> remains one of the most impactful ranking factors in 2026.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {linkBuildingBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center mb-4">
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Link Building Tools Comparison</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Compare the best <strong>backlink tools</strong> and <strong>link building software</strong> side-by-side.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50/80">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Link Building Tool</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Best For</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Pricing</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {linkBuildingTools.map((tool) => (
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">In-Depth Link Building Tool Reviews</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Detailed analysis of each <strong>backlink tool</strong> including features, pricing, and expert recommendations.</p>
          </div>

          <div className="space-y-8">
            {linkBuildingTools.map((tool) => (
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
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Key Link Building Features</h4>
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">How to Choose the Best Link Building Tool</h2>
            <p className="text-gray-500">Key factors to consider when selecting <strong>backlink software</strong> for your SEO strategy.</p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">1. Backlink Database Size & Accuracy</h3>
              <p className="text-gray-600 text-sm">The best <strong>backlink analysis tools</strong> have large, frequently updated link indexes. Ahrefs leads with 35+ trillion links, followed by Semrush. Larger databases mean more complete competitor analysis and better link opportunity discovery for your <strong>link building campaigns</strong>.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">2. Link Quality Metrics</h3>
              <p className="text-gray-600 text-sm">Different tools use different quality metrics: Moz's Domain Authority (DA), Ahrefs' Domain Rating (DR), or spam scores. Understand which metrics matter for your <strong>backlink building</strong> strategy and choose tools that provide reliable quality signals.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">3. Budget Considerations</h3>
              <p className="text-gray-600 text-sm">Beginners should start with Ubersuggest (free/$29 mo). Growing teams benefit from Semrush ($139/mo). Enterprise users needing maximum data choose Ahrefs ($129-449/mo). Add Linkody ($14.90/mo) for dedicated <strong>backlink monitoring</strong> regardless of your main tool.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">4. Additional Features Needed</h3>
              <p className="text-gray-600 text-sm">Consider if you need just <strong>backlink checking</strong> or a complete workflow. Semrush offers built-in outreach. Ahrefs excels at research. Linkody focuses purely on monitoring. Match tool capabilities to your actual <strong>link building</strong> needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Link Building Tools FAQs</h2>
            <p className="text-gray-500">Expert answers to common questions about <strong>link building software</strong> and <strong>backlink tools</strong>.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 border ${
                  expandedFaq === index ? 'ring-2 ring-slate-200 border-slate-200' : 'border-gray-100'
                }`}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
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
            <Link2 className="w-4 h-4 text-amber-400" />
            Start building quality backlinks today
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Build Authority Backlinks?</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: '#d1d5db' }}>
            Start with Ubersuggest&apos;s free tier for basic <strong className="text-white">backlink analysis</strong>, then scale up with Ahrefs or Semrush as your <strong className="text-white">link building strategy</strong> grows.
          </p>
          <a
            href="https://neilpatel.com/ubersuggest"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-all shadow-xl hover:-translate-y-0.5"
            style={{ backgroundColor: '#ffffff', color: '#0f172a' }}
          >
            Try Ubersuggest Free
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
              { href: "/marketing/best-keyword-research-tools", title: "Best Keyword Research Tools", desc: "7 top keyword research tools for finding profitable keywords." },
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
