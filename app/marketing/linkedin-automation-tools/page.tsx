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
  Users,
  Target,
  MessageSquare,
  Send,
  UserPlus,
  Search,
  BarChart3,
  Clock,
  Linkedin,
  Building2,
  Briefcase
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

// Local logo paths for LinkedIn automation tools
const localLogoPaths: { [key: string]: string } = {
  "LinkedIn Sales Navigator": "/linkedin logo.png",
  "Dripify": "/dripify logo.png",
  "Expandi": "/expandi logo.png",
  "Phantombuster": "/phantombuster logo.png",
  "Waalaxy": "/waalaxy logo.png",
  "Octopus CRM": "/octopus crm logo.png",
  "Dux-Soup": "/dux-soup logo.png",
  "Zopto": "/zopto logo.png",
  "MeetAlfred": "/meetalfred logo.png",
  "Skylead": "/skylead logo.png",
};

// Custom domain mappings for fallback
const customLogoDomains: { [key: string]: string } = {
  "LinkedIn Sales Navigator": "linkedin.com",
  "Dripify": "dripify.io",
  "Expandi": "expandi.io",
  "Phantombuster": "phantombuster.com",
  "Waalaxy": "waalaxy.com",
  "Octopus CRM": "octopuscrm.io",
  "Dux-Soup": "dux-soup.com",
  "Zopto": "zopto.com",
  "MeetAlfred": "meetalfred.com",
  "Skylead": "skylead.io",
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
        className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white font-semibold shadow-sm"
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

// LinkedIn Automation Tools Data - 10 Tools
const linkedinTools = [
  {
    id: 1,
    name: "LinkedIn Sales Navigator",
    category: "Official LinkedIn Tool",
    bestFor: "Enterprise sales teams and advanced lead search",
    pricing: "Paid",
    pricingDetails: "$99.99/mo (Core) / $149.99/mo (Advanced) / Custom (Advanced Plus)",
    website: "https://business.linkedin.com/sales-solutions/sales-navigator",
    rating: 4.8,
    difficulty: "Intermediate",
    description: "LinkedIn Sales Navigator is LinkedIn's official premium tool for sales professionals. It provides advanced lead and company search with 40+ filters, real-time insights, and InMail credits for direct outreach. As the native LinkedIn solution, it offers the deepest integration with LinkedIn's data and is 100% compliant with LinkedIn's terms of service. Sales Navigator is essential for B2B sales teams who need reliable, risk-free access to LinkedIn's professional network.",
    keyFeatures: [
      "Advanced lead search with 40+ filters",
      "Lead recommendations based on preferences",
      "Real-time sales updates and alerts",
      "InMail credits for direct messaging",
      "CRM integration (Salesforce, HubSpot)",
      "TeamLink for warm introductions"
    ],
    pros: [
      "100% LinkedIn compliant - no risk of account ban",
      "Best-in-class lead search filters",
      "Deep CRM integrations",
      "Access to extended network beyond connections"
    ],
    cons: [
      "Expensive for individuals",
      "No automation features built-in",
      "Limited InMail credits per month"
    ],
    useCases: ["Enterprise sales", "Account-based marketing", "B2B lead research", "Sales intelligence"]
  },
  {
    id: 2,
    name: "Dripify",
    category: "Cloud-Based Automation",
    bestFor: "Automated LinkedIn drip campaigns",
    pricing: "Paid",
    pricingDetails: "$59/mo (Basic) / $79/mo (Pro) / $99/mo (Advanced)",
    website: "https://dripify.io",
    rating: 4.7,
    difficulty: "Beginner",
    description: "Dripify is a cloud-based LinkedIn automation tool that runs 24/7 without keeping your computer on. It allows you to create sophisticated drip campaigns with automated connection requests, follow-ups, and messaging sequences. The platform's visual campaign builder makes it easy to set up multi-step outreach flows. Dripify's smart inbox consolidates all LinkedIn conversations, and its team management features make it ideal for sales teams coordinating outreach efforts.",
    keyFeatures: [
      "Automated drip campaigns with sequences",
      "Cloud-based - runs without your computer",
      "Smart inbox for managing conversations",
      "A/B testing for messages",
      "Team management and collaboration",
      "Advanced analytics and reporting"
    ],
    pros: [
      "True cloud automation - runs 24/7",
      "Excellent drip campaign builder",
      "Team collaboration features",
      "Comprehensive analytics dashboard"
    ],
    cons: [
      "No free tier available",
      "Limited integrations with other tools",
      "No email integration"
    ],
    useCases: ["Sales outreach", "Lead nurturing", "B2B prospecting", "Recruitment campaigns"]
  },
  {
    id: 3,
    name: "Expandi",
    category: "Cloud-Based Automation",
    bestFor: "Safe LinkedIn automation with smart limits",
    pricing: "Paid",
    pricingDetails: "$99/mo (Business) / Custom (Agency)",
    website: "https://expandi.io",
    rating: 4.8,
    difficulty: "Intermediate",
    description: "Expandi is widely considered the safest LinkedIn automation tool available, using dedicated country-based IP addresses and smart limits that mimic human behavior. The platform runs in the cloud and offers advanced targeting through LinkedIn and Sales Navigator searches. Expandi stands out for its omnichannel capabilities, allowing you to combine LinkedIn outreach with email sequences. Its dynamic personalization features include custom images and GIFs to boost response rates.",
    keyFeatures: [
      "Dedicated IP address per account",
      "Smart daily limits mimicking human behavior",
      "Omnichannel campaigns (LinkedIn + Email)",
      "Dynamic personalization with images/GIFs",
      "Connector campaigns for event attendees",
      "Webhooks and Zapier integration"
    ],
    pros: [
      "Industry-leading safety features",
      "Cloud-based with dedicated IPs",
      "Excellent personalization options",
      "Omnichannel with email integration"
    ],
    cons: [
      "Higher price point",
      "Learning curve for advanced features",
      "No free trial available"
    ],
    useCases: ["Safe outreach at scale", "Omnichannel campaigns", "Event-based outreach", "Agency client management"]
  },
  {
    id: 4,
    name: "Phantombuster",
    category: "Multi-Platform Automation",
    bestFor: "LinkedIn scraping and multi-platform automation",
    pricing: "Freemium",
    pricingDetails: "Free (trial) / $69/mo (Starter) / $159/mo (Pro) / $439/mo (Team)",
    website: "https://phantombuster.com",
    rating: 4.6,
    difficulty: "Advanced",
    description: "Phantombuster is a powerful automation and data extraction tool that works across multiple platforms including LinkedIn, Sales Navigator, Instagram, and Twitter. It offers 100+ pre-built automations called 'Phantoms' for scraping profiles, auto-connecting, messaging, and extracting data at scale. The platform is particularly strong for growth hackers and developers who need to build custom workflows by chaining multiple automations together.",
    keyFeatures: [
      "100+ pre-built automation scripts (Phantoms)",
      "LinkedIn profile scraper and enrichment",
      "Sales Navigator search export",
      "Auto-connect and message sequences",
      "Multi-platform support",
      "API access for developers"
    ],
    pros: [
      "Most versatile automation platform",
      "Powerful scraping capabilities",
      "Works across multiple social platforms",
      "API and developer-friendly"
    ],
    cons: [
      "Steep learning curve",
      "Can be risky if overused",
      "Credit-based pricing can get expensive"
    ],
    useCases: ["Data extraction", "Multi-platform automation", "Lead list building", "Growth hacking"]
  },
  {
    id: 5,
    name: "Waalaxy",
    category: "Cloud-Based Automation",
    bestFor: "LinkedIn + Email prospecting combined",
    pricing: "Freemium",
    pricingDetails: "Free (limited) / $56/mo (Advanced) / $80/mo (Business)",
    website: "https://waalaxy.com",
    rating: 4.6,
    difficulty: "Beginner",
    description: "Waalaxy (formerly ProspectIn) is a French-made LinkedIn automation tool that combines LinkedIn outreach with email finding and sequences. It offers a generous free plan that allows beginners to get started without commitment. The tool focuses on safety with realistic daily limits and stands out for its ability to automatically find and verify email addresses, enabling true multichannel campaigns that don't rely solely on LinkedIn.",
    keyFeatures: [
      "LinkedIn + Email combined sequences",
      "Built-in email finder and verifier",
      "Pre-built campaign templates",
      "Auto-import from LinkedIn searches",
      "CRM synchronization",
      "Cloud-based operation"
    ],
    pros: [
      "Generous free tier available",
      "Built-in email finder included",
      "Easy to use interface",
      "Good campaign templates"
    ],
    cons: [
      "Some features limited to paid plans",
      "Email credits cost extra",
      "Fewer integrations than competitors"
    ],
    useCases: ["SMB prospecting", "Multichannel outreach", "Lead generation", "Startup sales"]
  },
  {
    id: 6,
    name: "Octopus CRM",
    category: "Browser Extension",
    bestFor: "Simple LinkedIn automation with CRM features",
    pricing: "Paid",
    pricingDetails: "$9.99/mo (Starter) / $14.99/mo (Pro) / $21.99/mo (Advanced) / $39.99/mo (Unlimited)",
    website: "https://octopuscrm.io",
    rating: 4.5,
    difficulty: "Beginner",
    description: "Octopus CRM is an affordable Chrome extension for LinkedIn automation with built-in CRM capabilities. It automates connection requests, messaging, profile views, and skill endorsements directly from your browser. The tool is popular among freelancers and small businesses for its simplicity, low price point, and integrated CRM for managing leads without needing separate software.",
    keyFeatures: [
      "Auto connection requests",
      "Automated messaging sequences",
      "Profile viewing automation",
      "Skill endorsement automation",
      "Built-in mini CRM",
      "Campaign performance stats"
    ],
    pros: [
      "Very affordable pricing",
      "Simple and easy to learn",
      "Built-in CRM functionality",
      "Good for beginners"
    ],
    cons: [
      "Browser-based - needs Chrome open",
      "Limited advanced features",
      "Less sophisticated than cloud tools"
    ],
    useCases: ["Individual prospecting", "Freelancer outreach", "Small business sales", "Personal branding"]
  },
  {
    id: 7,
    name: "Dux-Soup",
    category: "Browser Extension",
    bestFor: "Veteran LinkedIn automation with proven track record",
    pricing: "Freemium",
    pricingDetails: "Free (Starter) / $14.99/mo (Pro) / $55/mo (Turbo)",
    website: "https://dux-soup.com",
    rating: 4.4,
    difficulty: "Beginner",
    description: "Dux-Soup is one of the original LinkedIn automation tools, launched in 2016 with over 70,000 users worldwide. As a Chrome extension, it automates profile visits, connection requests, and messaging sequences. Dux-Soup is known for its reliability and integrations with major CRMs like HubSpot, Pipedrive, and Salesforce, making it a solid choice for sales teams already using these platforms.",
    keyFeatures: [
      "Automated profile visiting",
      "Connection request automation",
      "Drip messaging campaigns",
      "CRM integrations (HubSpot, Pipedrive)",
      "Tag and manage leads",
      "Download profiles to CSV"
    ],
    pros: [
      "Free tier available",
      "Proven and reliable (since 2016)",
      "Good CRM integrations",
      "Active community and support"
    ],
    cons: [
      "Browser extension (needs Chrome running)",
      "Interface feels dated",
      "Slower than cloud-based tools"
    ],
    useCases: ["Lead generation", "CRM enrichment", "Sales prospecting", "Profile data export"]
  },
  {
    id: 8,
    name: "Zopto",
    category: "Cloud-Based Automation",
    bestFor: "Enterprise LinkedIn automation with advanced filtering",
    pricing: "Paid",
    pricingDetails: "$197/mo (Personal) / $297/mo (Grow) / $397/mo (Agency) / Custom (Enterprise)",
    website: "https://zopto.com",
    rating: 4.5,
    difficulty: "Intermediate",
    description: "Zopto is an enterprise-grade cloud-based LinkedIn automation platform designed for sales teams and agencies. It uses dedicated residential IPs for safety and offers advanced filtering options to precisely target ideal prospects. Zopto integrates deeply with Sales Navigator for enhanced targeting and includes A/B testing capabilities. Each customer gets a dedicated customer success manager for onboarding and optimization.",
    keyFeatures: [
      "Cloud-based with dedicated IPs",
      "Advanced prospect filtering",
      "Sales Navigator integration",
      "A/B testing for messages",
      "Real-time campaign dashboard",
      "Dedicated customer success manager"
    ],
    pros: [
      "Enterprise-grade security",
      "Excellent filtering options",
      "Full Sales Navigator support",
      "Dedicated customer success manager"
    ],
    cons: [
      "Expensive pricing",
      "Overkill for individuals",
      "Requires Sales Navigator for best results"
    ],
    useCases: ["Enterprise sales teams", "Account-based marketing", "Agency client campaigns", "High-volume outreach"]
  },
  {
    id: 9,
    name: "MeetAlfred",
    category: "Multi-Channel Automation",
    bestFor: "LinkedIn, Email, and Twitter combined automation",
    pricing: "Paid",
    pricingDetails: "$59/mo (Personal) / $99/mo (Business) / $79/user/mo (Enterprise)",
    website: "https://meetalfred.com",
    rating: 4.5,
    difficulty: "Intermediate",
    description: "MeetAlfred (formerly Leonard) is an all-in-one social selling platform that automates LinkedIn, Email, and Twitter outreach from a single dashboard. It allows you to create multi-channel sequences that engage prospects across platforms for maximum touchpoints. MeetAlfred includes a built-in CRM and unique features like LinkedIn Group and Event member targeting, making it powerful for community-based outreach strategies.",
    keyFeatures: [
      "Multi-channel campaigns (LinkedIn, Email, Twitter)",
      "Built-in CRM system",
      "Campaign sequence builder",
      "LinkedIn event and group outreach",
      "Team management and roles",
      "Performance analytics"
    ],
    pros: [
      "True multi-channel automation",
      "Built-in CRM included",
      "LinkedIn Groups & Events targeting",
      "Good team features"
    ],
    cons: [
      "Interface can be overwhelming",
      "Some features have learning curve",
      "Twitter automation limited"
    ],
    useCases: ["Multi-channel outreach", "Social selling", "Recruitment", "Event promotion"]
  },
  {
    id: 10,
    name: "Skylead",
    category: "Cloud-Based Automation",
    bestFor: "Smart LinkedIn + Email sequences with if/else logic",
    pricing: "Paid",
    pricingDetails: "$100/mo (All-in-One)",
    website: "https://skylead.io",
    rating: 4.6,
    difficulty: "Intermediate",
    description: "Skylead is a cloud-based LinkedIn automation tool that combines LinkedIn and email outreach with intelligent sequence logic. Its standout feature is the if/else campaign logic that automatically adjusts outreach based on prospect responses—for example, sending a different follow-up if someone accepts your connection versus if they don't respond. This makes campaigns more intelligent and responsive without manual intervention.",
    keyFeatures: [
      "Smart sequences with if/else logic",
      "LinkedIn + Email combined campaigns",
      "Cloud-based with dedicated IP",
      "Email discovery and verification",
      "Image and GIF personalization",
      "Unlimited email accounts"
    ],
    pros: [
      "Unique if/else sequence logic",
      "Unlimited email accounts",
      "Cloud-based and safe",
      "All-in-one pricing (no tiers)"
    ],
    cons: [
      "Single pricing tier may not fit all",
      "Newer tool with smaller community",
      "Limited integrations currently"
    ],
    useCases: ["Smart outreach automation", "Conditional campaigns", "Sales development", "Agency outreach"]
  }
];

// FAQ Data
const faqs = [
  {
    question: "What are LinkedIn automation tools?",
    answer: "LinkedIn automation tools are software applications that automate repetitive LinkedIn tasks like sending connection requests, messages, profile views, and follow-ups. They help sales professionals, recruiters, and marketers scale their LinkedIn outreach while saving time. These tools range from simple browser extensions to sophisticated cloud-based platforms with CRM integrations."
  },
  {
    question: "Is LinkedIn automation safe to use?",
    answer: "LinkedIn automation can be safe when used responsibly with the right tools. Cloud-based tools with dedicated IPs (like Expandi, Dripify, Zopto) are generally safer than browser extensions. Key safety practices include: staying within daily limits (50-100 connection requests), using personalized messages, warming up new accounts gradually, and choosing tools that mimic human behavior. However, aggressive automation violates LinkedIn's terms of service and risks account restrictions."
  },
  {
    question: "What's the difference between cloud-based and browser extension LinkedIn tools?",
    answer: "Cloud-based LinkedIn automation tools run on remote servers 24/7 without requiring your browser to be open. They typically offer dedicated IP addresses, better safety features, and more sophisticated automation. Browser extensions run locally in Chrome and require your computer to be on. While extensions are often cheaper, cloud-based tools are generally safer and more powerful for serious automation needs."
  },
  {
    question: "How many LinkedIn connection requests can I send per day?",
    answer: "LinkedIn officially limits connection requests to about 100-200 per week for most accounts, though this varies based on account age, activity, and acceptance rate. Most automation tools recommend staying under 50-100 requests per day with personalized notes to maintain safety. New accounts should start with 10-20 per day and gradually increase. Quality always beats quantity—higher acceptance rates allow for more outreach."
  },
  {
    question: "Do I need LinkedIn Sales Navigator for automation tools?",
    answer: "While not required, LinkedIn Sales Navigator significantly enhances automation results. It provides advanced search filters, access to prospects outside your network, InMail credits, and better targeting. Most premium automation tools integrate with Sales Navigator for optimal performance. However, basic automation works with free LinkedIn accounts—you'll just have more limited search and targeting capabilities."
  },
  {
    question: "What's the best LinkedIn automation tool for beginners?",
    answer: "For beginners, Octopus CRM and Waalaxy are excellent starting points. Octopus CRM offers the lowest price point with simple features, while Waalaxy has a free tier and intuitive interface. Dripify is also beginner-friendly with its visual campaign builder. Start with basic automation (connection requests and simple messages) before advancing to complex sequences and multi-channel campaigns."
  }
];

// Categories for filtering
const categories = [
  "All",
  "Official LinkedIn Tool",
  "Cloud-Based Automation",
  "Browser Extension",
  "Multi-Channel Automation",
  "Multi-Platform Automation"
];

// Use case categories
const useCaseCategories = [
  {
    title: "Best for Sales Teams",
    icon: Target,
    description: "Tools for B2B sales outreach and lead generation at scale.",
    tools: ["LinkedIn Sales Navigator", "Dripify", "Expandi", "Zopto"]
  },
  {
    title: "Best for Recruiters",
    icon: Users,
    description: "Tools for sourcing candidates and recruitment outreach.",
    tools: ["LinkedIn Sales Navigator", "Dripify", "MeetAlfred", "Dux-Soup"]
  },
  {
    title: "Best for Agencies",
    icon: Building2,
    description: "Tools with multi-account management for client campaigns.",
    tools: ["Expandi", "Zopto", "Skylead", "Phantombuster"]
  },
  {
    title: "Best for Beginners",
    icon: Sparkles,
    description: "Easy-to-use tools with gentle learning curves.",
    tools: ["Octopus CRM", "Waalaxy", "Dripify", "Dux-Soup"]
  },
  {
    title: "Best for Multi-Channel",
    icon: Send,
    description: "Tools that combine LinkedIn with email and other platforms.",
    tools: ["MeetAlfred", "Expandi", "Skylead", "Waalaxy"]
  },
  {
    title: "Best for Data Extraction",
    icon: BarChart3,
    description: "Tools for scraping and exporting LinkedIn data.",
    tools: ["Phantombuster", "Dux-Soup", "LinkedIn Sales Navigator", "Octopus CRM"]
  }
];

export default function LinkedInAutomationToolsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

  const filteredTools = selectedCategory === "All"
    ? linkedinTools
    : linkedinTools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "10 Best LinkedIn Automation Tools for 2026 (Free & Paid) - Complete Guide",
            "description": "Comprehensive guide to the best LinkedIn automation tools in 2026. Compare features, pricing, pros & cons of 10 top tools for LinkedIn lead generation, outreach, and sales automation.",
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
            "datePublished": "2026-11-15",
            "dateModified": "2026-11-15"
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
            "itemListElement": linkedinTools.map((tool, index) => ({
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
            <span className="text-slate-900 font-medium">LinkedIn Automation Tools</span>
          </nav>
        </div>
      </div>

      {/* Premium Hero Section */}
      <section className="relative overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #0a66c2 0%, #004182 50%, #0a66c2 100%)' }}>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

        <div className="relative py-20 md:py-28 px-4 sm:px-6">
          <div className="container mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-8">
              <Linkedin className="w-4 h-4 text-blue-200" />
              <span className="text-gray-100">The Complete Guide to LinkedIn Automation in 2026</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight text-white">
              The Definitive Guide to
              <span className="block text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #70b5f9, #a8d4ff, #70b5f9)' }}>
                LinkedIn Automation Tools
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
                  className="font-semibold text-white hover:text-blue-200 transition-colors flex items-center gap-1"
                >
                  Rishabh Jain
                  <Linkedin className="w-4 h-4" />
                </a>
                <span className="text-gray-400">·</span>
                <span className="text-gray-400">Nov 2026</span>
              </div>
            </div>

            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-10">
              10 expert-reviewed LinkedIn automation tools to supercharge your lead generation.
              From cloud-based platforms to browser extensions—find the perfect tools for LinkedIn outreach.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">10</div>
                <div className="text-sm text-blue-200 mt-1">Tools Reviewed</div>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-4xl font-bold text-white">5</div>
                <div className="text-sm text-blue-200 mt-1">Categories</div>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400">3</div>
                <div className="text-sm text-blue-200 mt-1">Free Options</div>
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
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Safest Choice</p>
              <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">Sales Navigator</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="#tool-2"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-purple-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-purple-50 text-purple-600 mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best for Drip Campaigns</p>
              <p className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">Dripify</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="#tool-3"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 mb-3">
                <Award className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Most Secure</p>
              <p className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">Expandi</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="#tool-6"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 text-amber-600 mb-3">
                <DollarSign className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Most Affordable</p>
              <p className="font-semibold text-gray-900 group-hover:text-amber-700 transition-colors">Octopus CRM</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
          </div>
        </div>
      </section>

      {/* What are LinkedIn Automation Tools Section */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What Are LinkedIn Automation Tools?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              <strong>LinkedIn automation tools</strong> are software applications that automate repetitive tasks on LinkedIn, such as sending connection requests, follow-up messages, profile views, and endorsements. These <strong>LinkedIn lead generation tools</strong> help sales teams, recruiters, and marketers scale their outreach efforts while saving hours of manual work.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">What They Automate</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                  <span><strong>Connection requests</strong> with personalized notes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                  <span><strong>Follow-up messages</strong> and drip sequences</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                  <span><strong>Profile viewing</strong> to trigger return visits</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                  <span><strong>Data extraction</strong> and lead export</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Key Benefits</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                  <span>Save <strong>10+ hours per week</strong> on manual outreach</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                  <span>Scale <strong>LinkedIn prospecting</strong> consistently</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                  <span>Improve <strong>response rates</strong> with personalization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                  <span>Track <strong>campaign analytics</strong> and optimize</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Types of LinkedIn Automation Tools */}
      <section className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Types of LinkedIn Automation Tools</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              <strong>LinkedIn automation software</strong> comes in different forms, each with unique advantages. Understanding these types helps you choose the right tool for your needs and risk tolerance.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Cloud-Based Tools</h3>
              <p className="text-gray-600 text-sm mb-4">
                <strong>Cloud-based LinkedIn automation</strong> tools run on remote servers 24/7 with dedicated IP addresses. They offer the best safety features and don't require your computer to be on. Examples: Expandi, Dripify, Zopto.
              </p>
              <p className="text-xs text-gray-500">Best for: Safety-conscious professionals</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <UserPlus className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Browser Extensions</h3>
              <p className="text-gray-600 text-sm mb-4">
                <strong>LinkedIn Chrome extensions</strong> run locally in your browser. They're more affordable but require Chrome to be open. Good for beginners with lower budgets. Examples: Octopus CRM, Dux-Soup.
              </p>
              <p className="text-xs text-gray-500">Best for: Budget-conscious users</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                <Send className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Multi-Channel Tools</h3>
              <p className="text-gray-600 text-sm mb-4">
                <strong>Omnichannel outreach tools</strong> combine LinkedIn with email and other platforms. They create sequences that engage prospects across multiple touchpoints. Examples: MeetAlfred, Skylead, Waalaxy.
              </p>
              <p className="text-xs text-gray-500">Best for: Comprehensive outreach</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="comparison-table" className="py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Complete LinkedIn Automation Tools Comparison</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Compare all 10 <strong>LinkedIn automation tools</strong> at a glance—pricing, ratings, and categories.</p>
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
                  {linkedinTools.map((tool) => (
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Best LinkedIn Automation Tools: In-Depth Reviews</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Detailed analysis of each <strong>LinkedIn automation tool</strong> with features, pricing, pros, cons, and expert recommendations.</p>
          </div>

          {/* Category Filter - Premium Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={selectedCategory === category ? { backgroundColor: '#0a66c2', color: '#ffffff' } : {}}
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
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
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
                  <p className="text-gray-600 leading-relaxed mb-8">
                    {tool.description}
                  </p>

                  {/* Pricing Banner */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-8 border border-blue-100">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-blue-600" />
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
                          <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
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
                      <span key={idx} className="px-3 py-1.5 text-sm rounded-full font-medium" style={{ backgroundColor: '#dbeafe', color: '#1d4ed8' }}>
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

      {/* Best LinkedIn Automation Tools by Use Case */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Best LinkedIn Automation Tools by Use Case</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Find the right <strong>LinkedIn automation tools</strong> for your specific needs.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCaseCategories.map((category, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm">{category.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.tools.map((tool, toolIdx) => (
                    <span key={toolIdx} className="px-3 py-1 text-xs rounded-full bg-white border border-gray-200 text-gray-700">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices Section */}
      <section className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">LinkedIn Automation Best Practices</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Follow these guidelines to use <strong>LinkedIn automation tools</strong> safely and effectively without risking your account.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-emerald-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Safety Guidelines</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                  <span>Keep connection requests under <strong>50-100 per day</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                  <span>Use <strong>personalized messages</strong>, not generic templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                  <span>Warm up new accounts <strong>gradually over 2-4 weeks</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                  <span>Choose tools with <strong>dedicated IP addresses</strong></span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-red-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900">What to Avoid</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1 font-bold">✕</span>
                  <span>Sending <strong>spam-like messages</strong> to cold prospects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1 font-bold">✕</span>
                  <span>Running automation <strong>24/7 without breaks</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1 font-bold">✕</span>
                  <span>Using <strong>multiple automation tools</strong> simultaneously</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1 font-bold">✕</span>
                  <span>Ignoring <strong>LinkedIn warning messages</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Premium Accordion */}
      <section id="faq" className="py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">LinkedIn Automation Tools: Frequently Asked Questions</h2>
            <p className="text-gray-500">Expert answers to common questions about <strong>LinkedIn automation</strong> and <strong>LinkedIn outreach tools</strong>.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-gray-50 rounded-2xl overflow-hidden transition-all duration-300 ${
                  expandedFaq === index ? 'ring-2 ring-blue-200' : ''
                }`}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  <div className={`w-8 h-8 rounded-full bg-blue-50 shadow-sm flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                    expandedFaq === index ? 'rotate-180' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4 text-blue-500" />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  expandedFaq === index ? 'max-h-[500px]' : 'max-h-0'
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
          <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">Explore More Marketing Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { href: "/marketing/ai-marketing-tools", title: "Best AI Marketing Tools", desc: "35 AI tools for content, SEO, and automation." },
              { href: "/marketing/best-pr-outreach-tools", title: "Best PR & Outreach Tools", desc: "18 tools for media relations and outreach." },
              { href: "/marketing/best-seo-tools", title: "Best SEO Tools", desc: "Complete guide to 32 top SEO tools for 2026." }
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
