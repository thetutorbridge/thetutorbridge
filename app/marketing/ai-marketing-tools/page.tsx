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
  Brain,
  Lightbulb,
  Target,
  Users,
  Briefcase,
  Building2,
  PenTool,
  Mail,
  Share2,
  Search,
  BarChart3,
  MessageSquare,
  Video,
  Image,
  Megaphone
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

// Local logo paths for AI marketing tools
const localLogoPaths: { [key: string]: string } = {
  "ChatGPT": "/chatgpt logo.png",
  "Claude": "/claude logo.png",
  "Jasper": "/jasper ai logo.png",
  "Copy.ai": "/copy ai logo.png",
  "Surfer SEO": "/Surfer SEO logo.jpeg",
  "Semrush": "/Semrush logo.png",
  "Grammarly": "/grammarly logo.png",
  "Canva": "/canva logo.png",
  "Midjourney": "/midjourney logo.png",
  "DALL-E 3": "/dalle logo.png",
  "HubSpot": "/hubspot logo.png",
  "Mailchimp": "/mailchimp logo.png",
  "Hootsuite": "/hootsuite logo.png",
  "Buffer": "/buffer logo.png",
  "Sprout Social": "/sprout social logo.png",
  "Clearscope": "/clearscope logo.jpeg",
  "Frase": "/frase logo.png",
  "MarketMuse": "/marketmuse logo.png",
  "Writesonic": "/writesonic logo.png",
  "Rytr": "/rytr logo.png",
  "Notion AI": "/notion logo.png",
  "Zapier": "/zapier logo.png",
  "Knock AI": "/knock ai logo.png",
  "LovedByAI": "/lovedbyai logo.png",
  "Synthesia": "/synthesia logo.png",
  "Descript": "/descript logo.png",
  "Pictory": "/pictory logo.png",
  "Lumen5": "/lumen5 logo.png",
  "AdCreative.ai": "/adcreative logo.png",
  "Phrasee": "/phrasee logo.png",
  "Persado": "/persado logo.png",
  "Albert AI": "/albert ai logo.png",
  "Seventh Sense": "/seventh sense logo.png",
  "Brandwatch": "/brandwatch logo.png",
  "Sprinklr": "/sprinklr logo.png",
};

// Custom domain mappings for fallback
const customLogoDomains: { [key: string]: string } = {
  "ChatGPT": "openai.com",
  "Claude": "anthropic.com",
  "DALL-E 3": "openai.com",
  "Canva": "canva.com",
  "HubSpot": "hubspot.com",
  "Mailchimp": "mailchimp.com",
  "Hootsuite": "hootsuite.com",
  "Buffer": "buffer.com",
  "Notion AI": "notion.so",
  "Zapier": "zapier.com",
  "Semrush": "semrush.com",
  "Surfer SEO": "surferseo.com",
  "Copy.ai": "copy.ai",
  "Jasper": "jasper.ai",
  "Grammarly": "grammarly.com",
  "Midjourney": "midjourney.com",
  "Sprout Social": "sproutsocial.com",
  "Clearscope": "clearscope.io",
  "Frase": "frase.io",
  "MarketMuse": "marketmuse.com",
  "Writesonic": "writesonic.com",
  "Rytr": "rytr.me",
  "Knock AI": "knock-ai.com",
  "LovedByAI": "lovedby.ai",
  "Synthesia": "synthesia.io",
  "Descript": "descript.com",
  "Pictory": "pictory.ai",
  "Lumen5": "lumen5.com",
  "AdCreative.ai": "adcreative.ai",
  "Phrasee": "phrasee.co",
  "Persado": "persado.com",
  "Albert AI": "albert.ai",
  "Seventh Sense": "theseventhsense.com",
  "Brandwatch": "brandwatch.com",
  "Sprinklr": "sprinklr.com",
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
        className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center text-white font-semibold shadow-sm"
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

// AI Marketing Tools Data - 35 Tools
const aiMarketingTools = [
  {
    id: 1,
    name: "ChatGPT",
    category: "AI Content & Strategy",
    bestFor: "All-purpose AI marketing assistant",
    pricing: "Freemium",
    pricingDetails: "Free / $20/mo (Plus) / $200/mo (Pro)",
    website: "https://chat.openai.com",
    rating: 4.9,
    difficulty: "Beginner",
    description: "ChatGPT is the most versatile AI marketing tool available, capable of content creation, marketing strategy, copywriting, brainstorming, and more. With GPT-4o, it's become an indispensable AI tool for marketers who need a powerful AI marketing assistant for virtually any task.",
    keyFeatures: [
      "AI-powered content creation",
      "Marketing strategy development",
      "Ad copy and email writing",
      "Social media content generation",
      "Customer persona creation",
      "Competitive analysis assistance",
      "Code generation for marketing",
      "Image generation with DALL-E"
    ],
    pros: [
      "Most versatile AI marketing tool",
      "Constantly improving capabilities",
      "Excellent for brainstorming",
      "Free tier available"
    ],
    cons: [
      "Can produce generic content",
      "Requires good prompting skills",
      "Knowledge cutoff limitations",
      "No native marketing integrations"
    ],
    useCases: ["Content marketing", "Email marketing", "Social media marketing", "Marketing strategy"]
  },
  {
    id: 2,
    name: "Claude",
    category: "AI Content & Strategy",
    bestFor: "Long-form AI marketing content",
    pricing: "Freemium",
    pricingDetails: "Free / $20/mo (Pro) / $100/seat (Team)",
    website: "https://claude.ai",
    rating: 4.8,
    difficulty: "Beginner",
    description: "Claude by Anthropic excels at creating long-form AI marketing content, detailed marketing strategies, and nuanced copywriting. Its ability to handle longer contexts makes it ideal for comprehensive AI marketing campaigns and in-depth content creation.",
    keyFeatures: [
      "200K token context window",
      "Long-form content creation",
      "Document analysis for marketing",
      "Brand voice consistency",
      "Marketing research assistance",
      "Campaign planning",
      "Ethical AI guidelines",
      "Code generation"
    ],
    pros: [
      "Excellent for long content",
      "More nuanced responses",
      "Better at following guidelines",
      "Strong reasoning capabilities"
    ],
    cons: [
      "Less creative than GPT-4",
      "No image generation",
      "Smaller ecosystem",
      "Can be overly cautious"
    ],
    useCases: ["Long-form content", "Marketing strategy", "Brand guidelines", "Content repurposing"]
  },
  {
    id: 3,
    name: "Jasper",
    category: "AI Copywriting",
    bestFor: "Enterprise AI marketing content at scale",
    pricing: "Paid",
    pricingDetails: "$49/mo (Creator) to $125/mo (Pro)",
    website: "https://jasper.ai",
    rating: 4.7,
    difficulty: "Beginner",
    description: "Jasper is the leading AI marketing platform built specifically for marketing teams. It offers AI-powered copywriting, brand voice training, and marketing templates that help create on-brand AI marketing content at scale. Perfect for enterprises needing consistent AI marketing automation.",
    keyFeatures: [
      "Brand voice training",
      "50+ marketing templates",
      "AI marketing campaigns",
      "Team collaboration",
      "Chrome extension",
      "Jasper Art for images",
      "Marketing integrations",
      "Performance analytics"
    ],
    pros: [
      "Built for marketing teams",
      "Excellent brand consistency",
      "Many marketing templates",
      "Strong enterprise features"
    ],
    cons: [
      "Expensive for individuals",
      "Credits system limiting",
      "Learning curve for features",
      "Output quality varies"
    ],
    useCases: ["Enterprise marketing", "Brand marketing", "Content teams", "Marketing agencies"]
  },
  {
    id: 4,
    name: "Copy.ai",
    category: "AI Copywriting",
    bestFor: "Quick AI marketing copy generation",
    pricing: "Freemium",
    pricingDetails: "Free (2,000 words/mo) / $49/mo (Pro)",
    website: "https://copy.ai",
    rating: 4.5,
    difficulty: "Beginner",
    description: "Copy.ai is an AI marketing tool designed for rapid content creation. It offers 90+ AI copywriting templates for ads, emails, social posts, and more. Its workflow feature allows marketers to automate entire AI marketing content pipelines.",
    keyFeatures: [
      "90+ copywriting templates",
      "AI workflows automation",
      "Brand voice customization",
      "Bulk content generation",
      "Infobase for brand info",
      "Team collaboration",
      "API access",
      "Chrome extension"
    ],
    pros: [
      "Generous free tier",
      "Easy to use interface",
      "Good for short-form copy",
      "Workflow automation"
    ],
    cons: [
      "Long-form quality issues",
      "Limited customization",
      "Can be repetitive",
      "Features limited on free"
    ],
    useCases: ["Ad copywriting", "Email marketing", "Social media posts", "Product descriptions"]
  },
  {
    id: 5,
    name: "Surfer SEO",
    category: "AI SEO Tools",
    bestFor: "AI-powered SEO content optimization",
    pricing: "Paid",
    pricingDetails: "$99/mo (Essential) to $219/mo (Scale)",
    website: "https://surferseo.com",
    rating: 4.7,
    difficulty: "Intermediate",
    description: "Surfer SEO is the leading AI SEO tool that combines content optimization with AI writing. It analyzes top-ranking pages and provides data-driven recommendations for creating SEO-optimized AI marketing content that ranks higher in search results.",
    keyFeatures: [
      "AI content scoring",
      "SERP analysis",
      "Surfer AI writer",
      "Content optimization",
      "Keyword research",
      "Content audit",
      "Google Docs integration",
      "WordPress plugin"
    ],
    pros: [
      "Data-driven SEO recommendations",
      "AI writer included",
      "Real-time content scoring",
      "Excellent for SEO content"
    ],
    cons: [
      "Can encourage keyword stuffing",
      "Expensive for beginners",
      "Learning curve",
      "Limited to SEO use cases"
    ],
    useCases: ["SEO content marketing", "Blog optimization", "AI content creation", "Content strategy"]
  },
  {
    id: 6,
    name: "Semrush",
    category: "AI SEO Tools",
    bestFor: "Complete AI marketing suite",
    pricing: "Paid",
    pricingDetails: "$139.95/mo (Pro) to $499.95/mo (Business)",
    website: "https://semrush.com",
    rating: 4.8,
    difficulty: "Intermediate",
    description: "Semrush offers a comprehensive AI marketing platform with AI-powered features across SEO, content marketing, social media, and advertising. Its ContentShake AI creates AI marketing content optimized for search, making it a complete AI digital marketing solution.",
    keyFeatures: [
      "ContentShake AI writer",
      "AI SEO recommendations",
      "AI social media tools",
      "Keyword research AI",
      "Competitor AI analysis",
      "AI advertising insights",
      "Content optimization AI",
      "Position tracking"
    ],
    pros: [
      "All-in-one AI marketing platform",
      "Best-in-class SEO tools",
      "AI features across all tools",
      "Comprehensive data"
    ],
    cons: [
      "Expensive pricing",
      "Overwhelming for beginners",
      "AI features need add-ons",
      "Learning curve"
    ],
    useCases: ["Digital marketing agencies", "Enterprise SEO", "Content marketing", "Competitive research"]
  },
  {
    id: 7,
    name: "Grammarly",
    category: "AI Writing Assistant",
    bestFor: "AI-powered writing improvement",
    pricing: "Freemium",
    pricingDetails: "Free / $12/mo (Premium) / $15/member (Business)",
    website: "https://grammarly.com",
    rating: 4.7,
    difficulty: "Beginner",
    description: "Grammarly is an essential AI marketing tool for ensuring all marketing content is error-free and professionally written. Its AI suggestions improve clarity, engagement, and tone, making your AI marketing copy more effective.",
    keyFeatures: [
      "AI grammar checking",
      "Tone detection",
      "Clarity suggestions",
      "Plagiarism detection",
      "Brand tone settings",
      "GrammarlyGO AI writer",
      "Browser extension",
      "App integrations"
    ],
    pros: [
      "Essential for any marketer",
      "Improves content quality",
      "Works everywhere",
      "AI writing assistance"
    ],
    cons: [
      "Premium features costly",
      "Can over-correct style",
      "AI suggestions not always perfect",
      "Privacy concerns"
    ],
    useCases: ["Content editing", "Email marketing", "Marketing communications", "Brand consistency"]
  },
  {
    id: 8,
    name: "Canva",
    category: "AI Design Tools",
    bestFor: "AI marketing graphics creation",
    pricing: "Freemium",
    pricingDetails: "Free / $12.99/mo (Pro) / $29.99/mo (Teams)",
    website: "https://canva.com",
    rating: 4.8,
    difficulty: "Beginner",
    description: "Canva transforms marketing design with AI-powered features including Magic Design, text-to-image generation, background removal, and Magic Write. It's the most accessible AI marketing design tool for creating professional visuals without design skills.",
    keyFeatures: [
      "Magic Design AI",
      "Text-to-image AI",
      "Magic Write AI",
      "Background remover AI",
      "Brand kit",
      "Marketing templates",
      "Social media scheduler",
      "Video editing AI"
    ],
    pros: [
      "Most user-friendly design AI",
      "Comprehensive free tier",
      "Excellent templates",
      "AI features integrated"
    ],
    cons: [
      "AI images less quality",
      "Limited advanced editing",
      "Can look template-y",
      "Export limitations on free"
    ],
    useCases: ["Social media graphics", "Marketing materials", "Presentations", "Video marketing"]
  },
  {
    id: 9,
    name: "Midjourney",
    category: "AI Image Generation",
    bestFor: "Premium AI marketing visuals",
    pricing: "Paid",
    pricingDetails: "$10/mo (Basic) to $120/mo (Mega)",
    website: "https://midjourney.com",
    rating: 4.9,
    difficulty: "Intermediate",
    description: "Midjourney creates stunning AI-generated images for marketing campaigns. Its artistic quality surpasses other AI image generators, making it ideal for creating unique AI marketing visuals, ad creatives, and brand imagery.",
    keyFeatures: [
      "Photorealistic AI images",
      "Artistic style control",
      "Image variations",
      "Upscaling",
      "Custom style references",
      "Pan and zoom",
      "Blend images",
      "Discord community"
    ],
    pros: [
      "Highest quality AI images",
      "Unique artistic styles",
      "Active community",
      "Constant improvements"
    ],
    cons: [
      "Discord-only interface",
      "Learning curve for prompts",
      "No direct editing",
      "Public by default"
    ],
    useCases: ["Ad creatives", "Social media visuals", "Brand imagery", "Marketing campaigns"]
  },
  {
    id: 10,
    name: "DALL-E 3",
    category: "AI Image Generation",
    bestFor: "Integrated AI marketing images",
    pricing: "Paid",
    pricingDetails: "Included with ChatGPT Plus ($20/mo)",
    website: "https://openai.com/dall-e-3",
    rating: 4.6,
    difficulty: "Beginner",
    description: "DALL-E 3 generates AI marketing images directly within ChatGPT, allowing seamless creation of visuals while developing marketing content. Its text rendering and prompt understanding make it excellent for AI marketing graphics with text.",
    keyFeatures: [
      "ChatGPT integration",
      "Accurate text rendering",
      "Natural language prompts",
      "Multiple styles",
      "Image editing",
      "Variation generation",
      "API access",
      "Commercial rights"
    ],
    pros: [
      "Best text-in-image AI",
      "Easy ChatGPT integration",
      "Natural prompting",
      "Commercial use allowed"
    ],
    cons: [
      "Less artistic than Midjourney",
      "Limited style control",
      "Requires ChatGPT Plus",
      "Safety restrictions"
    ],
    useCases: ["Marketing graphics with text", "Social media images", "Blog illustrations", "Ad mockups"]
  },
  {
    id: 11,
    name: "HubSpot",
    category: "AI Marketing Automation",
    bestFor: "AI-powered marketing automation",
    pricing: "Freemium",
    pricingDetails: "Free CRM / $20/mo to $3,600/mo (Enterprise)",
    website: "https://hubspot.com",
    rating: 4.7,
    difficulty: "Intermediate",
    description: "HubSpot brings artificial intelligence to marketing automation, CRM, and content creation. Its AI features help with email writing, content generation, chatbots, and predictive analytics, making it a comprehensive AI marketing platform for growth.",
    keyFeatures: [
      "AI content assistant",
      "Predictive lead scoring",
      "AI chatbots",
      "Email AI optimization",
      "Smart CRM",
      "AI reporting",
      "Content recommendations",
      "Workflow automation"
    ],
    pros: [
      "Complete marketing platform",
      "AI integrated throughout",
      "Excellent free tier",
      "Strong ecosystem"
    ],
    cons: [
      "Expensive at scale",
      "Complex pricing",
      "Learning curve",
      "AI features vary by tier"
    ],
    useCases: ["Marketing automation", "Lead generation", "Email marketing", "CRM integration"]
  },
  {
    id: 12,
    name: "Knock AI",
    category: "AI SDR & Revenue Pipeline Conversion",
    bestFor: "Identify, qualify, engage, route, and convert high-intent B2B buyers",
    pricing: "Paid",
    pricingDetails: "$2,000/mo (Pipeline Foundation) to $3,500/mo (Pipeline Acceleration) to custom (Enterprise)",
    website: "https://www.knock-ai.com",
    rating: 5,
    difficulty: "Advanced",
    description: "Knock is a B2B pipeline conversion platform that helps companies identify, qualify, engage, route, and convert high-intent buyers in real time. It combines AI-powered buyer identification, real-time intent scoring, and an AI Inbound SDR that can detect sales, support, or partnership interactions and respond accordingly. The platform engages leads via Slack, WhatsApp, and LinkedIn, routes them intelligently to sales reps, and synchronizes all activity with CRM systems. Knock replaces traditional web forms with live conversations, improving conversion rates up to 10x and reducing lead-to-SQL time by 75%.",
    keyFeatures: [
      "Knock Reveal - identify anonymous website visitors",
      "Knock Enrich - enrich buyer data with firmographics and contact info",
      "Knock Intent and Score - real-time intent detection and lead scoring",
      "AI Inbound SDR - detect sales/support/partnership interactions, qualify and respond",
      "Knock Intent Agents - intent-triggered LinkedIn outreach automation",
      "Knock Chat - real-time Slack, WhatsApp, and LinkedIn messaging",
      "Knock Scheduling - in-chat meeting booking with automatic calendar sync",
      "Knock Routing - smart lead routing by territory, round robin, or custom rules",
      "Knock Outreach - AI follow-up sequences via email and LinkedIn",
      "Knock Links - trackable links with engagement analytics",
      "CRM synchronization - bi-directional sync with Salesforce, HubSpot, and others",
      "Revenue attribution and analytics - full pipeline and conversion reporting",
      "Advertising integrations - sync audiences for retargeting campaigns",
      "Workflow automation - trigger actions based on buyer behavior"
    ],
    pros: [
      "10x higher conversion rates than traditional web forms",
      "Real-time engagement while buyer intent is at its peak",
      "Multi-channel outreach via Slack, WhatsApp, LinkedIn, and email",
      "AI SDR handles qualification, routing, and follow-up automatically",
      "Reduces lead-to-SQL time by 75%",
      "Full CRM integration with Salesforce, HubSpot, and others",
      "Revenue attribution shows exact pipeline impact",
      "Intent-triggered LinkedIn outreach extends reach beyond website"
    ],
    cons: [
      "Premium pricing starts at $2,000/month - best for mid-market and enterprise",
      "Primarily designed for B2B companies with sales teams",
      "Requires sales team adoption and workflow changes",
      "Integration and setup time needed for full CRM synchronization",
      "Most advanced features require Pipeline Acceleration or Enterprise tiers"
    ],
    useCases: ["B2B pipeline conversion", "Inbound lead qualification", "Real-time buyer engagement", "Account-based marketing", "Sales acceleration", "Intent-based LinkedIn outreach", "CRM data enrichment"]
  },
  {
    id: 13,
    name: "Mailchimp",
    category: "AI Email Marketing",
    bestFor: "AI email marketing optimization",
    pricing: "Freemium",
    pricingDetails: "Free (500 contacts) / $13/mo to $350/mo",
    website: "https://mailchimp.com",
    rating: 4.5,
    difficulty: "Beginner",
    description: "Mailchimp enhances email marketing with AI-powered features including content generation, send time optimization, subject line testing, and predictive analytics. It's the most accessible AI email marketing tool for small businesses.",
    keyFeatures: [
      "AI content generator",
      "Send time optimization",
      "Subject line AI",
      "Predictive demographics",
      "Customer journey AI",
      "A/B testing AI",
      "Creative assistant",
      "Audience insights"
    ],
    pros: [
      "Easy to use",
      "Good free tier",
      "AI features accessible",
      "Strong automation"
    ],
    cons: [
      "Limited on free tier",
      "Pricing increases fast",
      "AI features basic",
      "Template limitations"
    ],
    useCases: ["Email marketing", "Small business marketing", "Newsletter automation", "E-commerce email"]
  },
  {
    id: 14,
    name: "Hootsuite",
    category: "AI Social Media",
    bestFor: "AI social media management",
    pricing: "Paid",
    pricingDetails: "$99/mo (Professional) to $249/mo (Team)",
    website: "https://hootsuite.com",
    rating: 4.4,
    difficulty: "Intermediate",
    description: "Hootsuite helps marketers manage social media with AI-powered content creation, optimal posting times, hashtag suggestions, and sentiment analysis. Its OwlyWriter AI generates AI marketing content for multiple social platforms.",
    keyFeatures: [
      "OwlyWriter AI content",
      "Best time to post AI",
      "Hashtag generator",
      "Sentiment analysis",
      "Social listening AI",
      "Performance analytics",
      "Content calendar",
      "Team collaboration"
    ],
    pros: [
      "Comprehensive social AI",
      "Multi-platform support",
      "AI content creation",
      "Strong analytics"
    ],
    cons: [
      "Expensive pricing",
      "Interface can be clunky",
      "AI features extra cost",
      "Learning curve"
    ],
    useCases: ["Social media marketing", "Multi-platform management", "Social listening", "Team collaboration"]
  },
  {
    id: 15,
    name: "Buffer",
    category: "AI Social Media",
    bestFor: "Simple AI social media scheduling",
    pricing: "Freemium",
    pricingDetails: "Free (3 channels) / $6/mo per channel",
    website: "https://buffer.com",
    rating: 4.5,
    difficulty: "Beginner",
    description: "Buffer Assistant helps create AI marketing content for social media with a clean, simple interface. It's perfect for solopreneurs and small teams who need straightforward AI social media marketing without complexity.",
    keyFeatures: [
      "AI Assistant for posts",
      "Optimal timing",
      "Content repurposing",
      "Analytics",
      "Link shortening",
      "Team features",
      "Browser extension",
      "Mobile app"
    ],
    pros: [
      "Simple and affordable",
      "Clean interface",
      "Good free tier",
      "AI assistant helpful"
    ],
    cons: [
      "Limited AI features",
      "Basic analytics",
      "Fewer platforms",
      "No social listening"
    ],
    useCases: ["Small business social media", "Content scheduling", "Solopreneurs", "Simple social marketing"]
  },
  {
    id: 16,
    name: "Sprout Social",
    category: "AI Social Media",
    bestFor: "Enterprise AI social media intelligence",
    pricing: "Paid",
    pricingDetails: "$199/mo (Standard) to $399/mo (Advanced)",
    website: "https://sproutsocial.com",
    rating: 4.6,
    difficulty: "Intermediate",
    description: "Sprout Social offers enterprise-grade AI social media marketing with AI-powered analytics, sentiment analysis, and competitive intelligence. Its AI features help large teams optimize their AI marketing campaigns across social platforms.",
    keyFeatures: [
      "AI-powered analytics",
      "Sentiment analysis",
      "Competitive benchmarking",
      "Smart inbox",
      "Publishing AI",
      "Listening tools",
      "Employee advocacy",
      "Custom reports"
    ],
    pros: [
      "Enterprise-ready",
      "Excellent analytics",
      "Strong listening features",
      "Great support"
    ],
    cons: [
      "Very expensive",
      "Overkill for small teams",
      "Complex setup",
      "Per-user pricing"
    ],
    useCases: ["Enterprise social media", "Brand monitoring", "Social analytics", "Customer care"]
  },
  {
    id: 17,
    name: "Clearscope",
    category: "AI SEO Tools",
    bestFor: "Premium AI content optimization",
    pricing: "Paid",
    pricingDetails: "$189/mo (Essentials) to custom enterprise",
    website: "https://clearscope.io",
    rating: 4.8,
    difficulty: "Intermediate",
    description: "Clearscope is a premium AI SEO tool used by major brands for content optimization. It analyzes top-ranking pages and provides AI-driven recommendations to create comprehensive AI marketing content that ranks.",
    keyFeatures: [
      "Content grading AI",
      "Keyword recommendations",
      "Competitor analysis",
      "Google Docs integration",
      "WordPress plugin",
      "Content inventory",
      "Team features",
      "Content reports"
    ],
    pros: [
      "Highly accurate AI recommendations",
      "Clean interface",
      "Enterprise-ready",
      "Excellent support"
    ],
    cons: [
      "Very expensive",
      "Limited monthly reports",
      "No keyword research",
      "Focused only on content"
    ],
    useCases: ["Enterprise content", "SEO content teams", "Content agencies", "SaaS marketing"]
  },
  {
    id: 18,
    name: "Frase",
    category: "AI SEO Tools",
    bestFor: "AI content briefs and writing",
    pricing: "Paid",
    pricingDetails: "$15/mo (Solo) to $115/mo (Team)",
    website: "https://frase.io",
    rating: 4.5,
    difficulty: "Beginner",
    description: "Frase combines AI content research, AI writing, and content optimization in one platform. It's excellent for creating AI marketing content briefs that writers can follow to create comprehensive, SEO-optimized articles.",
    keyFeatures: [
      "AI content briefs",
      "AI writing assistant",
      "SERP analysis",
      "Content optimization",
      "Question research",
      "Answer engine AI",
      "Content analytics",
      "Team collaboration"
    ],
    pros: [
      "Great content briefs",
      "Affordable pricing",
      "AI writer included",
      "Good for teams"
    ],
    cons: [
      "AI writing needs editing",
      "Interface could improve",
      "Smaller database",
      "Learning curve"
    ],
    useCases: ["Content briefs", "AI content writing", "SEO research", "Content marketing"]
  },
  {
    id: 19,
    name: "MarketMuse",
    category: "AI SEO Tools",
    bestFor: "AI content strategy and planning",
    pricing: "Paid",
    pricingDetails: "$149/mo (Standard) to custom enterprise",
    website: "https://marketmuse.com",
    rating: 4.4,
    difficulty: "Advanced",
    description: "MarketMuse uses AI to analyze your content inventory and identify opportunities to build topical authority. Its AI marketing intelligence helps plan comprehensive content strategies that establish expertise in your niche.",
    keyFeatures: [
      "AI content inventory analysis",
      "Topic modeling AI",
      "Content planning AI",
      "Personalized difficulty scores",
      "Content briefs",
      "Competitive analysis",
      "SERP X-ray",
      "Team features"
    ],
    pros: [
      "Sophisticated AI analysis",
      "Strategic content planning",
      "Topical authority focus",
      "Unique insights"
    ],
    cons: [
      "Expensive pricing",
      "Complex for beginners",
      "Steep learning curve",
      "Limited integrations"
    ],
    useCases: ["Content strategy", "Enterprise SEO", "Topical authority", "Content audits"]
  },
  {
    id: 20,
    name: "LovedByAI",
    category: "AI SEO Tools",
    bestFor: "GEO optimization for small businesses",
    pricing: "Freemium",
    pricingDetails: "Free / $29/mo (Pro) / $59/mo (Business)",
    website: "https://www.lovedby.ai",
    rating: 5,
    difficulty: "Advanced",
    description: "LovedByAI is a Generative Engine Optimization (GEO) platform that helps small businesses get discovered and recommended by AI assistants like ChatGPT, Claude, Perplexity, and Google AI Overviews. It optimizes your online presence to be AI-readable with structured data, BLUF-format content, and auto-generated FAQs. Studies show GEO-optimized businesses earn 11x more AI referral traffic.",
    keyFeatures: [
      "GEO optimization for AI search",
      "AI-readable content optimization",
      "Structured data automation",
      "BLUF content formatting",
      "Auto-generated FAQs",
      "LLMs.txt file generation",
      "AI traffic & citation tracking",
      "70+ language support"
    ],
    pros: [
      "11x more AI referral traffic",
      "Works with ChatGPT, Claude, Perplexity, Gemini",
      "Built for small businesses",
      "Free tier available"
    ],
    cons: [
      "New GEO optimization space",
      "Results take time to measure",
      "Page limits on lower tiers",
      "Requires content optimization mindset"
    ],
    useCases: ["GEO optimization", "AI search visibility", "Small business marketing", "Local business AI presence"]
  },
  {
    id: 21,
    name: "Writesonic",
    category: "AI Copywriting",
    bestFor: "Affordable AI marketing content",
    pricing: "Freemium",
    pricingDetails: "Free trial / $16/mo (Individual) to $499/mo (Enterprise)",
    website: "https://writesonic.com",
    rating: 4.4,
    difficulty: "Beginner",
    description: "Writesonic offers affordable AI marketing content creation with features for blogs, ads, emails, and more. Its Chatsonic feature adds real-time data capabilities, making it useful for current AI marketing content.",
    keyFeatures: [
      "AI article writer",
      "Chatsonic AI chat",
      "Real-time data access",
      "Ad copy generator",
      "Landing page copy",
      "Product descriptions",
      "API access",
      "Brand voice"
    ],
    pros: [
      "Affordable pricing",
      "Real-time data via Chatsonic",
      "Many templates",
      "Good for short content"
    ],
    cons: [
      "Quality inconsistent",
      "Credits system",
      "Long-form needs work",
      "Interface cluttered"
    ],
    useCases: ["Blog writing", "Ad copy", "Product descriptions", "Small business marketing"]
  },
  {
    id: 22,
    name: "Rytr",
    category: "AI Copywriting",
    bestFor: "Budget AI marketing writing",
    pricing: "Freemium",
    pricingDetails: "Free (10k chars/mo) / $9/mo (Saver) / $29/mo (Unlimited)",
    website: "https://rytr.me",
    rating: 4.2,
    difficulty: "Beginner",
    description: "Rytr is one of the most affordable AI marketing tools for content creation. While not as sophisticated as premium options, it's excellent for small businesses needing basic AI copywriting for marketing materials.",
    keyFeatures: [
      "40+ use cases",
      "20+ tones",
      "30+ languages",
      "SEO analyzer",
      "Plagiarism checker",
      "Chrome extension",
      "API access",
      "Custom use cases"
    ],
    pros: [
      "Very affordable",
      "Simple interface",
      "Good for basics",
      "Generous free tier"
    ],
    cons: [
      "Basic AI quality",
      "Limited features",
      "Repetitive outputs",
      "Not for long content"
    ],
    useCases: ["Budget marketing", "Small businesses", "Basic copywriting", "Email drafts"]
  },
  {
    id: 23,
    name: "Notion AI",
    category: "AI Productivity",
    bestFor: "AI marketing workflow management",
    pricing: "Paid",
    pricingDetails: "$10/member/mo (add-on to Notion plans)",
    website: "https://notion.so/ai",
    rating: 4.6,
    difficulty: "Beginner",
    description: "Notion AI brings artificial intelligence to marketing project management and documentation. It helps marketing teams brainstorm, draft content, summarize meetings, and manage AI marketing workflows all in one workspace.",
    keyFeatures: [
      "AI writing in documents",
      "Content summarization",
      "Brainstorming assistance",
      "Meeting notes AI",
      "Translation",
      "Action items extraction",
      "Q&A on workspace",
      "Writing improvement"
    ],
    pros: [
      "Integrated with workflows",
      "Great for documentation",
      "Team collaboration",
      "Versatile AI features"
    ],
    cons: [
      "Requires Notion subscription",
      "AI costs extra",
      "Limited to Notion",
      "Learning Notion required"
    ],
    useCases: ["Marketing documentation", "Team collaboration", "Content planning", "Meeting notes"]
  },
  {
    id: 24,
    name: "Zapier",
    category: "AI Marketing Automation",
    bestFor: "AI-powered marketing automation",
    pricing: "Freemium",
    pricingDetails: "Free (100 tasks/mo) / $19.99/mo to $799/mo",
    website: "https://zapier.com",
    rating: 4.7,
    difficulty: "Intermediate",
    description: "Zapier automates marketing workflows by connecting 6,000+ apps with AI-powered features. Its AI capabilities help create automated AI marketing pipelines that save hours of manual work.",
    keyFeatures: [
      "6,000+ app connections",
      "AI-powered actions",
      "Natural language automation",
      "AI chatbots",
      "Data formatting AI",
      "Lead enrichment",
      "Multi-step workflows",
      "Team features"
    ],
    pros: [
      "Connects everything",
      "AI enhances automation",
      "No-code friendly",
      "Massive app library"
    ],
    cons: [
      "Can get expensive",
      "Complex for beginners",
      "Task limits",
      "Debugging challenges"
    ],
    useCases: ["Marketing automation", "Lead workflows", "Data sync", "Cross-platform automation"]
  },
  {
    id: 25,
    name: "Synthesia",
    category: "AI Video Marketing",
    bestFor: "AI avatar video marketing",
    pricing: "Paid",
    pricingDetails: "$22/mo (Starter) to $67/mo (Creator)",
    website: "https://synthesia.io",
    rating: 4.6,
    difficulty: "Beginner",
    description: "Synthesia creates AI marketing videos with realistic AI avatars without filming. Perfect for creating personalized video marketing content, training videos, and multilingual AI marketing campaigns at scale.",
    keyFeatures: [
      "140+ AI avatars",
      "120+ languages",
      "Text-to-video",
      "Custom avatars",
      "Video templates",
      "Screen recording",
      "Brand kit",
      "API access"
    ],
    pros: [
      "No filming needed",
      "Multilingual support",
      "Professional quality",
      "Fast production"
    ],
    cons: [
      "Avatars look AI-generated",
      "Limited customization",
      "Can feel impersonal",
      "Minutes-based pricing"
    ],
    useCases: ["Marketing videos", "Product demos", "Training content", "Multilingual marketing"]
  },
  {
    id: 26,
    name: "Descript",
    category: "AI Video Marketing",
    bestFor: "AI video and podcast editing",
    pricing: "Freemium",
    pricingDetails: "Free / $12/mo (Creator) to $24/mo (Pro)",
    website: "https://descript.com",
    rating: 4.7,
    difficulty: "Beginner",
    description: "Descript revolutionizes video marketing with AI-powered editing that works like a text document. Its AI features include transcription, filler word removal, eye contact correction, and AI voice cloning for marketing content.",
    keyFeatures: [
      "Edit video like text",
      "AI transcription",
      "Filler word removal",
      "AI eye contact",
      "Voice cloning",
      "Screen recording",
      "Collaboration",
      "Publishing"
    ],
    pros: [
      "Revolutionary editing approach",
      "Excellent AI features",
      "Beginner-friendly",
      "Good free tier"
    ],
    cons: [
      "Processing time",
      "Advanced features paid",
      "Resource intensive",
      "Limited templates"
    ],
    useCases: ["Video marketing", "Podcast editing", "Content repurposing", "Social video clips"]
  },
  {
    id: 27,
    name: "Pictory",
    category: "AI Video Marketing",
    bestFor: "AI video creation from text",
    pricing: "Paid",
    pricingDetails: "$19/mo (Starter) to $99/mo (Teams)",
    website: "https://pictory.ai",
    rating: 4.4,
    difficulty: "Beginner",
    description: "Pictory transforms blog posts and scripts into AI marketing videos automatically. It's perfect for repurposing written AI marketing content into engaging video format for social media and YouTube.",
    keyFeatures: [
      "Blog-to-video AI",
      "Script-to-video",
      "Auto-captioning",
      "Stock media library",
      "AI voice-over",
      "Video summarization",
      "Brand templates",
      "Team collaboration"
    ],
    pros: [
      "Easy content repurposing",
      "Good stock library",
      "Auto-captions",
      "Simple interface"
    ],
    cons: [
      "Generic looking videos",
      "Limited customization",
      "Voice quality varies",
      "Rendering time"
    ],
    useCases: ["Blog to video", "Social media videos", "Content repurposing", "YouTube marketing"]
  },
  {
    id: 28,
    name: "Lumen5",
    category: "AI Video Marketing",
    bestFor: "AI social video creation",
    pricing: "Freemium",
    pricingDetails: "Free / $29/mo (Basic) to $199/mo (Business)",
    website: "https://lumen5.com",
    rating: 4.3,
    difficulty: "Beginner",
    description: "Lumen5 uses AI to transform marketing content into engaging videos. Its AI analyzes your text and automatically suggests relevant visuals, making it easy to create AI marketing videos for social media.",
    keyFeatures: [
      "Text-to-video AI",
      "AI media suggestions",
      "Brand kit",
      "Stock library",
      "Multiple formats",
      "Auto-sizing",
      "Voice-over",
      "Team features"
    ],
    pros: [
      "Easy to use",
      "AI media matching",
      "Good for social",
      "Free tier available"
    ],
    cons: [
      "Limited on free",
      "Template-based look",
      "Basic customization",
      "Watermarks on free"
    ],
    useCases: ["Social media videos", "Content marketing", "Brand awareness", "Quick video creation"]
  },
  {
    id: 29,
    name: "AdCreative.ai",
    category: "AI Advertising",
    bestFor: "AI ad creative generation",
    pricing: "Paid",
    pricingDetails: "$29/mo (Starter) to $149/mo (Professional)",
    website: "https://adcreative.ai",
    rating: 4.5,
    difficulty: "Beginner",
    description: "AdCreative.ai generates AI-powered ad creatives that are optimized for conversions. It creates multiple variations of AI marketing ads for social media and display advertising, saving hours of design time.",
    keyFeatures: [
      "AI ad generation",
      "Conversion-optimized designs",
      "Multiple ad formats",
      "Brand consistency",
      "Creative scoring",
      "A/B testing insights",
      "Stock photos included",
      "Team collaboration"
    ],
    pros: [
      "Fast ad creation",
      "Conversion-focused AI",
      "Multiple variations",
      "Easy to use"
    ],
    cons: [
      "Quality varies",
      "Limited creativity",
      "Can look generic",
      "Credits-based"
    ],
    useCases: ["Facebook ads", "Display advertising", "Social media ads", "Performance marketing"]
  },
  {
    id: 30,
    name: "Phrasee",
    category: "AI Advertising",
    bestFor: "Enterprise AI ad copy optimization",
    pricing: "Paid",
    pricingDetails: "Custom enterprise pricing",
    website: "https://phrasee.co",
    rating: 4.4,
    difficulty: "Advanced",
    description: "Phrasee uses AI to generate and optimize marketing language at scale. Used by major brands, it creates AI marketing copy for email subject lines, push notifications, and ads that outperform human-written content.",
    keyFeatures: [
      "AI language generation",
      "Performance prediction",
      "Brand language model",
      "A/B testing AI",
      "Multi-channel support",
      "Real-time optimization",
      "Enterprise integrations",
      "Reporting"
    ],
    pros: [
      "Proven performance lift",
      "Enterprise-grade",
      "Brand-safe AI",
      "Multi-channel"
    ],
    cons: [
      "Enterprise pricing only",
      "Complex setup",
      "Requires volume",
      "Long implementation"
    ],
    useCases: ["Enterprise email", "Push notifications", "Ad copy at scale", "CRM marketing"]
  },
  {
    id: 31,
    name: "Persado",
    category: "AI Advertising",
    bestFor: "Enterprise AI marketing language",
    pricing: "Paid",
    pricingDetails: "Custom enterprise pricing",
    website: "https://persado.com",
    rating: 4.3,
    difficulty: "Advanced",
    description: "Persado uses generative AI to create emotionally resonant marketing language that drives action. Its AI marketing technology is used by Fortune 500 companies to optimize messaging across all marketing channels.",
    keyFeatures: [
      "Motivation AI",
      "Emotional language AI",
      "Performance prediction",
      "Message optimization",
      "Multi-channel support",
      "Knowledge base",
      "Enterprise security",
      "Analytics"
    ],
    pros: [
      "Emotional intelligence AI",
      "Fortune 500 trusted",
      "Significant lift",
      "Strategic insights"
    ],
    cons: [
      "Very expensive",
      "Enterprise only",
      "Long sales cycle",
      "Complex integration"
    ],
    useCases: ["Enterprise marketing", "Financial services", "Retail marketing", "Cross-channel optimization"]
  },
  {
    id: 32,
    name: "Albert AI",
    category: "AI Advertising",
    bestFor: "Autonomous AI ad management",
    pricing: "Paid",
    pricingDetails: "Custom pricing (% of ad spend)",
    website: "https://albert.ai",
    rating: 4.2,
    difficulty: "Advanced",
    description: "Albert AI is an autonomous AI marketing platform that manages and optimizes paid advertising campaigns across channels. It handles bidding, targeting, creative testing, and budget allocation using AI without human intervention.",
    keyFeatures: [
      "Autonomous campaign management",
      "Cross-channel optimization",
      "AI bidding",
      "Creative testing AI",
      "Audience discovery",
      "Budget allocation",
      "Real-time optimization",
      "Reporting"
    ],
    pros: [
      "Truly autonomous AI",
      "Cross-channel optimization",
      "24/7 optimization",
      "Reduced manual work"
    ],
    cons: [
      "Expensive",
      "Black box AI",
      "Requires ad spend",
      "Less control"
    ],
    useCases: ["Paid media management", "Multi-channel advertising", "Performance marketing", "Enterprise ads"]
  },
  {
    id: 33,
    name: "Seventh Sense",
    category: "AI Email Marketing",
    bestFor: "AI email send time optimization",
    pricing: "Paid",
    pricingDetails: "$80/mo (HubSpot) / $450/mo (Marketo)",
    website: "https://theseventhsense.com",
    rating: 4.4,
    difficulty: "Intermediate",
    description: "Seventh Sense uses AI to determine the optimal send time for each individual recipient in your email list. This AI email marketing tool increases open rates and engagement by personalizing delivery times.",
    keyFeatures: [
      "Individual send time AI",
      "Engagement prediction",
      "Email throttling",
      "Deliverability optimization",
      "HubSpot integration",
      "Marketo integration",
      "Reporting",
      "A/B testing"
    ],
    pros: [
      "Proven engagement lift",
      "Individual personalization",
      "Easy HubSpot integration",
      "Deliverability improvement"
    ],
    cons: [
      "HubSpot/Marketo only",
      "Expensive",
      "Niche functionality",
      "Requires volume"
    ],
    useCases: ["Email optimization", "HubSpot users", "Marketo users", "B2B email marketing"]
  },
  {
    id: 34,
    name: "Brandwatch",
    category: "AI Marketing Analytics",
    bestFor: "AI social listening and analytics",
    pricing: "Paid",
    pricingDetails: "Custom pricing (starts ~$1,000/mo)",
    website: "https://brandwatch.com",
    rating: 4.5,
    difficulty: "Advanced",
    description: "Brandwatch uses AI to analyze billions of conversations across social media, news, and forums. Its AI marketing intelligence helps brands understand consumer sentiment, track trends, and identify opportunities.",
    keyFeatures: [
      "AI social listening",
      "Sentiment analysis AI",
      "Image recognition",
      "Trend detection",
      "Consumer research AI",
      "Influencer identification",
      "Crisis detection",
      "Competitive intelligence"
    ],
    pros: [
      "Comprehensive data",
      "Powerful AI analysis",
      "Image recognition",
      "Enterprise-ready"
    ],
    cons: [
      "Very expensive",
      "Complex platform",
      "Steep learning curve",
      "Overkill for small teams"
    ],
    useCases: ["Brand monitoring", "Consumer insights", "Competitive intelligence", "Crisis management"]
  },
  {
    id: 35,
    name: "Sprinklr",
    category: "AI Marketing Analytics",
    bestFor: "Unified AI marketing platform",
    pricing: "Paid",
    pricingDetails: "Custom enterprise pricing",
    website: "https://sprinklr.com",
    rating: 4.4,
    difficulty: "Advanced",
    description: "Sprinklr is a unified customer experience management platform with AI at its core. It combines social media, advertising, research, and care into one AI marketing platform used by the world's largest brands.",
    keyFeatures: [
      "Unified AI platform",
      "30+ channels",
      "AI-powered insights",
      "Social management",
      "Advertising AI",
      "Research AI",
      "Care AI",
      "Enterprise scale"
    ],
    pros: [
      "Truly unified platform",
      "AI throughout",
      "Enterprise scale",
      "Comprehensive features"
    ],
    cons: [
      "Very expensive",
      "Complex implementation",
      "Long sales cycle",
      "Enterprise only"
    ],
    useCases: ["Enterprise marketing", "Global brands", "Unified CXM", "Multi-channel marketing"]
  }
];

// Best AI Marketing Tools by Use Case
const useCaseCategories = [
  {
    title: "Best AI Marketing Tools for Content Creation",
    icon: PenTool,
    description: "AI marketing tools that help create blog posts, articles, and marketing copy at scale.",
    tools: ["ChatGPT", "Claude", "Jasper", "Copy.ai", "Writesonic"]
  },
  {
    title: "Best AI Marketing Tools for SEO & GEO",
    icon: Search,
    description: "AI-powered SEO and GEO tools that optimize content for search engines and AI assistants.",
    tools: ["Surfer SEO", "Semrush", "Clearscope", "Frase", "LovedByAI"]
  },
  {
    title: "Best AI Marketing Tools for Social Media",
    icon: Share2,
    description: "AI tools for social media content creation, scheduling, and analytics.",
    tools: ["Hootsuite", "Buffer", "Sprout Social", "Canva", "Lumen5"]
  },
  {
    title: "Best AI Marketing Tools for Email Marketing",
    icon: Mail,
    description: "AI email marketing tools for personalization, optimization, and automation.",
    tools: ["Mailchimp", "HubSpot", "Seventh Sense", "Phrasee", "Copy.ai"]
  },
  {
    title: "Best AI Marketing Tools for Video Marketing",
    icon: Video,
    description: "AI video tools for creating marketing videos without expensive production.",
    tools: ["Synthesia", "Descript", "Pictory", "Lumen5", "Canva"]
  },
  {
    title: "Best AI Marketing Tools for Advertising",
    icon: Megaphone,
    description: "AI advertising tools for creating and optimizing ad campaigns.",
    tools: ["AdCreative.ai", "Albert AI", "Phrasee", "Persado", "Semrush"]
  }
];

// Best AI Marketing Tools by Industry
const industryCategories = [
  {
    title: "AI Marketing Tools for E-commerce",
    icon: Building2,
    description: "AI marketing tools designed for online stores and e-commerce businesses.",
    tools: ["ChatGPT", "Jasper", "AdCreative.ai", "Mailchimp", "Canva"]
  },
  {
    title: "AI Marketing Tools for SaaS",
    icon: Briefcase,
    description: "AI tools for software companies focused on content and lead generation.",
    tools: ["Clearscope", "Surfer SEO", "HubSpot", "Knock AI", "LovedByAI"]
  },
  {
    title: "AI Marketing Tools for Agencies",
    icon: Users,
    description: "AI marketing platforms built for agencies managing multiple clients.",
    tools: ["Jasper", "Semrush", "Sprout Social", "Canva", "Zapier"]
  },
  {
    title: "AI Marketing Tools for Small Business",
    icon: Target,
    description: "Affordable AI marketing tools perfect for small business budgets.",
    tools: ["ChatGPT", "Canva", "Mailchimp", "Buffer", "Rytr"]
  }
];

// Best AI Marketing Tools by Role
const roleCategories = [
  {
    title: "AI Marketing Tools for Content Marketers",
    description: "AI tools for creating, optimizing, and scaling content marketing efforts.",
    tools: ["ChatGPT", "Claude", "Surfer SEO", "Jasper", "Frase"]
  },
  {
    title: "AI Marketing Tools for Social Media Managers",
    description: "AI tools for managing social media presence and creating engaging content.",
    tools: ["Hootsuite", "Buffer", "Canva", "Lumen5", "Sprout Social"]
  },
  {
    title: "AI Marketing Tools for SEO Specialists",
    description: "AI-powered tools for technical SEO, content optimization, GEO, and rankings.",
    tools: ["Semrush", "Surfer SEO", "Clearscope", "LovedByAI", "Frase"]
  },
  {
    title: "AI Marketing Tools for Marketing Managers",
    description: "AI platforms for overseeing marketing campaigns and team productivity.",
    tools: ["HubSpot", "Notion AI", "Zapier", "Sprinklr", "Brandwatch"]
  }
];

// FAQ Data
const faqs = [
  {
    question: "What are AI marketing tools?",
    answer: "AI marketing tools are software applications that use artificial intelligence and machine learning to automate, optimize, and enhance marketing activities. These AI tools can help with content creation, SEO optimization, social media management, email marketing, advertising, analytics, and more. AI marketing tools analyze data, learn patterns, and make intelligent recommendations or take automated actions to improve marketing performance."
  },
  {
    question: "What is the best AI marketing tool in 2026?",
    answer: "ChatGPT is widely considered the best overall AI marketing tool in 2026 due to its versatility in content creation, strategy development, and marketing assistance. For specific use cases, Jasper is best for enterprise content, Surfer SEO is best for SEO content optimization, and Canva is best for marketing design. The best AI marketing tool depends on your specific needs and budget."
  },
  {
    question: "How is AI used in marketing?",
    answer: "AI is used in marketing in numerous ways: content creation (writing blog posts, ad copy, emails), SEO optimization (analyzing keywords, optimizing content), social media management (scheduling, content generation, analytics), email marketing (personalization, send time optimization), advertising (creative generation, bid optimization, targeting), customer engagement (chatbots, personalization), and analytics (predictive modeling, sentiment analysis, consumer insights)."
  },
  {
    question: "Are AI marketing tools worth it?",
    answer: "Yes, AI marketing tools are worth the investment for most marketers. They can significantly increase productivity (creating content 10x faster), improve performance (better optimization and personalization), reduce costs (less manual work), and provide insights that would be impossible to discover manually. Even free AI marketing tools like ChatGPT's free tier can provide substantial value for small businesses."
  },
  {
    question: "What are the best free AI marketing tools?",
    answer: "The best free AI marketing tools include: ChatGPT (free tier for content and strategy), Canva (free design with AI features), Grammarly (free writing improvement), Mailchimp (free tier with AI features), Buffer (free social scheduling), Copy.ai (2,000 free words/month), and HubSpot (free CRM with AI). These free AI marketing tools provide excellent value for small businesses and individuals."
  },
  {
    question: "How do AI marketing tools help with content creation?",
    answer: "AI marketing tools help with content creation by generating first drafts of blog posts, articles, and marketing copy; suggesting headlines and hooks; optimizing content for SEO; repurposing content across formats (blog to video, long-form to social); editing and improving existing content; and creating multiple variations for A/B testing. Tools like ChatGPT, Jasper, and Claude can dramatically speed up the content creation process."
  },
  {
    question: "What is the difference between AI copywriting tools and AI marketing automation?",
    answer: "AI copywriting tools (like Jasper, Copy.ai, ChatGPT) focus on generating written content such as ad copy, emails, blog posts, and social media posts. AI marketing automation tools (like HubSpot, Zapier, Mailchimp) focus on automating marketing workflows, personalizing customer journeys, and optimizing campaign performance. Many AI marketing platforms combine both capabilities."
  },
  {
    question: "Can AI replace human marketers?",
    answer: "AI cannot fully replace human marketers, but it significantly augments their capabilities. AI excels at repetitive tasks, data analysis, content generation, and optimization. However, humans are still needed for strategy, creativity, brand voice, emotional intelligence, and complex decision-making. The most effective marketing combines AI tools with human expertise—using AI for efficiency and humans for strategy and creativity."
  },
  {
    question: "How do AI SEO tools work?",
    answer: "AI SEO tools analyze top-ranking content and search engine data to provide optimization recommendations. They use AI to identify relevant keywords, suggest content structure, analyze competitor content, predict ranking potential, and score content quality. Tools like Surfer SEO and Clearscope compare your content against top performers and provide specific AI-driven recommendations for improvement."
  },
  {
    question: "What AI marketing tools are best for small businesses?",
    answer: "The best AI marketing tools for small businesses are affordable yet powerful: ChatGPT (versatile free AI assistant), Canva (free design tool), Mailchimp (free email marketing), Buffer (affordable social scheduling), Rytr (budget AI writing), and Copy.ai (freemium copywriting). These AI marketing tools provide enterprise-level capabilities at small business prices."
  },
  {
    question: "How do I choose the right AI marketing tool?",
    answer: "To choose the right AI marketing tool: 1) Identify your primary need (content, SEO, social, email, ads), 2) Set a budget (free, mid-range, enterprise), 3) Evaluate ease of use vs. feature depth, 4) Check integrations with your existing tools, 5) Try free trials before committing, 6) Read reviews and case studies, 7) Consider scalability for future growth. Start with one or two AI marketing tools and expand as needed."
  },
  {
    question: "What is generative AI in marketing?",
    answer: "Generative AI in marketing refers to AI systems that create new content, images, videos, or other assets. Unlike traditional AI that analyzes or optimizes existing content, generative AI marketing tools (like ChatGPT, Midjourney, DALL-E, Synthesia) produce original marketing materials. Generative AI is transforming marketing by enabling rapid content creation, personalization at scale, and creative exploration."
  }
];

export default function AIMarketingToolsPage() {
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");

  const categories = ["All", ...Array.from(new Set(aiMarketingTools.map(tool => tool.category)))];

  const filteredTools = selectedCategory === "All"
    ? aiMarketingTools
    : aiMarketingTools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "35 Best AI Marketing Tools for 2026 (Free & Paid) - Complete Guide",
            "description": "Comprehensive guide to the best AI marketing tools in 2026. Compare features, pricing, pros & cons of 35 top AI tools for content creation, SEO, social media, and marketing automation.",
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
            "datePublished": "2026-10-09",
            "dateModified": "2026-10-09"
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
            "itemListElement": aiMarketingTools.slice(0, 10).map((tool, index) => ({
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
            <span className="text-slate-900 font-medium">AI Marketing Tools</span>
          </nav>
        </div>
      </div>

      {/* Premium Hero Section */}
      <section className="relative overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)' }}>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

        <div className="relative py-20 md:py-28 px-4 sm:px-6">
          <div className="container mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-8">
              <Brain className="w-4 h-4 text-violet-300" />
              <span className="text-gray-100">The Complete Guide to AI Marketing in 2026</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight text-white">
              The Definitive Guide to
              <span className="block text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #a78bfa, #c4b5fd, #a78bfa)' }}>
                AI Marketing Tools
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
              35 expert-reviewed AI marketing tools to transform your marketing strategy.
              From AI content creation to marketing automation—find the perfect AI tools for your needs.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">35</div>
                <div className="text-sm text-gray-400 mt-1">AI Tools Reviewed</div>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-4xl font-bold text-white">9</div>
                <div className="text-sm text-gray-400 mt-1">Categories</div>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400">12</div>
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
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-violet-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-violet-50 text-violet-600 mb-3">
                <Brain className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best Overall AI Tool</p>
              <p className="font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">ChatGPT</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="#tool-3"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 mb-3">
                <Award className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best for Enterprise</p>
              <p className="font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">Jasper</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="#tool-5"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 mb-3">
                <Search className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best for AI SEO</p>
              <p className="font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">Surfer SEO</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="#tool-8"
              className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-pink-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-pink-50 text-pink-600 mb-3">
                <Image className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Best for AI Design</p>
              <p className="font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">Canva</p>
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </a>
          </div>
        </div>
      </section>

      {/* What are AI Marketing Tools Section */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What Are AI Marketing Tools?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              <strong>AI marketing tools</strong> are software applications powered by artificial intelligence that help marketers automate, optimize, and scale their marketing efforts. These <strong>AI tools for marketing</strong> use machine learning, natural language processing, and other AI technologies to perform tasks that traditionally required human intelligence.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-violet-600" />
                </div>
                <h3 className="font-semibold text-gray-900">AI Marketing Capabilities</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-violet-500 mt-1 flex-shrink-0" />
                  <span><strong>AI content creation</strong> for blogs, ads, and social media</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-violet-500 mt-1 flex-shrink-0" />
                  <span><strong>AI SEO optimization</strong> for better search rankings</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-violet-500 mt-1 flex-shrink-0" />
                  <span><strong>AI marketing automation</strong> for workflows and campaigns</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-violet-500 mt-1 flex-shrink-0" />
                  <span><strong>AI analytics</strong> for predictive insights</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Benefits of AI in Marketing</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                  <span>10x faster content production with <strong>AI marketing tools</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                  <span>Data-driven optimization with <strong>AI marketing analytics</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                  <span>Personalization at scale using <strong>AI marketing automation</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                  <span>Reduced costs through <strong>AI-powered marketing</strong> efficiency</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use AI in Marketing Section */}
      <section className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How to Use AI in Marketing</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              <strong>Artificial intelligence marketing</strong> is transforming how businesses reach customers. Here's how to leverage <strong>AI marketing tools</strong> effectively across different marketing channels.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center mb-4">
                <PenTool className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">AI Content Marketing</h3>
              <p className="text-gray-600 text-sm mb-4">
                Use <strong>AI marketing tools</strong> like ChatGPT and Jasper to create blog posts, ad copy, and marketing content at scale. <strong>AI content marketing</strong> can produce first drafts 10x faster.
              </p>
              <p className="text-xs text-gray-500">Best tools: ChatGPT, Jasper, Copy.ai</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">AI SEO Marketing</h3>
              <p className="text-gray-600 text-sm mb-4">
                <strong>AI SEO tools</strong> analyze top-ranking content and provide optimization recommendations. Use <strong>AI in marketing</strong> to create content that ranks higher in search results.
              </p>
              <p className="text-xs text-gray-500">Best tools: Surfer SEO, Semrush, Clearscope</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <Share2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">AI Social Media Marketing</h3>
              <p className="text-gray-600 text-sm mb-4">
                <strong>AI social media marketing</strong> tools generate post ideas, optimize posting times, and analyze engagement. Scale your social presence with <strong>AI marketing automation</strong>.
              </p>
              <p className="text-xs text-gray-500">Best tools: Hootsuite, Buffer, Canva</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">AI Email Marketing</h3>
              <p className="text-gray-600 text-sm mb-4">
                <strong>AI email marketing tools</strong> personalize subject lines, optimize send times, and write email copy. <strong>AI marketing</strong> increases open rates and conversions automatically.
              </p>
              <p className="text-xs text-gray-500">Best tools: Mailchimp, HubSpot, Seventh Sense</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                <Megaphone className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">AI Advertising</h3>
              <p className="text-gray-600 text-sm mb-4">
                <strong>AI advertising tools</strong> create ad variations, optimize bidding, and target audiences. <strong>AI-powered marketing</strong> improves ROAS through intelligent automation.
              </p>
              <p className="text-xs text-gray-500">Best tools: AdCreative.ai, Albert AI, Phrasee</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">AI Chatbots & Engagement</h3>
              <p className="text-gray-600 text-sm mb-4">
                <strong>AI chatbot marketing</strong> qualifies leads and engages customers 24/7. Use <strong>conversational AI marketing</strong> to accelerate your sales pipeline.
              </p>
              <p className="text-xs text-gray-500">Best tools: Drift, Intercom, HubSpot</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table - Premium Design */}
      <section id="comparison-table" className="py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Complete AI Marketing Tools Comparison</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Compare all 35 <strong>AI marketing tools</strong> at a glance—pricing, ratings, and categories.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50/80">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">AI Marketing Tool</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Best For</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Pricing</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {aiMarketingTools.map((tool, idx) => (
                    <tr key={tool.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a href={`#tool-${tool.id}`} className="flex items-center gap-3 font-medium text-gray-900 group-hover:text-violet-600 transition-colors">
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
                              ? { backgroundColor: '#ede9fe', color: '#6d28d9', border: '1px solid #ddd6fe' }
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Best AI Marketing Tools: In-Depth Reviews</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Detailed analysis of each <strong>AI marketing tool</strong> with features, pricing, pros, cons, and expert recommendations.</p>
          </div>

          {/* Category Filter - Premium Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={selectedCategory === category ? { backgroundColor: '#4c1d95', color: '#ffffff' } : {}}
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
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
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
                                ? { backgroundColor: '#ede9fe', color: '#6d28d9' }
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
                      style={{ backgroundColor: '#4c1d95', color: '#ffffff' }}
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
                  <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-4 mb-8 border border-violet-100">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-violet-600" />
                      <div>
                        <span className="font-semibold text-gray-900">Pricing: </span>
                        <span className="text-gray-600">{tool.pricingDetails}</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Key AI Marketing Features</h4>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {tool.keyFeatures.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2.5">
                          <CheckCircle className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" />
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
                      <span key={idx} className="px-3 py-1.5 text-sm rounded-full font-medium" style={{ backgroundColor: '#ede9fe', color: '#6d28d9' }}>
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

      {/* Best AI Marketing Tools by Use Case */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Best AI Marketing Tools by Use Case</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Find the right <strong>AI marketing tools</strong> for your specific marketing needs.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCaseCategories.map((category, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-violet-600" />
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

      {/* Best AI Marketing Tools by Industry */}
      <section className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Best AI Marketing Tools by Industry</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Industry-specific <strong>AI marketing tools</strong> recommendations.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {industryCategories.map((category, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">{category.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.tools.map((tool, toolIdx) => (
                    <span key={toolIdx} className="px-3 py-1.5 text-sm rounded-full bg-blue-50 text-blue-700 font-medium">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best AI Marketing Tools by Role */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Best AI Marketing Tools by Job Role</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Find the best <strong>AI tools for marketing</strong> based on your role.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {roleCategories.map((category, idx) => (
              <div key={idx} className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-100">
                <h3 className="font-bold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.tools.map((tool, toolIdx) => (
                    <span key={toolIdx} className="px-3 py-1.5 text-sm rounded-full bg-white text-violet-700 font-medium border border-violet-200">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Premium Accordion */}
      <section id="faq" className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">AI Marketing Tools: Frequently Asked Questions</h2>
            <p className="text-gray-500">Expert answers to common questions about <strong>AI marketing</strong> and <strong>AI marketing tools</strong>.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 ${
                  expandedFaq === index ? 'ring-2 ring-violet-200' : ''
                }`}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  <div className={`w-8 h-8 rounded-full bg-violet-50 shadow-sm flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                    expandedFaq === index ? 'rotate-180' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4 text-violet-500" />
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

      {/* CTA Section - Premium Design */}
      <section className="py-20 px-4 sm:px-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)' }}>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

        <div className="container mx-auto max-w-3xl text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-6" style={{ color: '#d1d5db' }}>
            <Brain className="w-4 h-4 text-violet-300" />
            Start your AI marketing journey
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Marketing with AI?</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: '#d1d5db' }}>
            Start with free <strong className="text-white">AI marketing tools</strong> like ChatGPT and Canva, then scale up as your needs grow.
          </p>
          <a
            href="https://chat.openai.com"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-all shadow-xl hover:-translate-y-0.5"
            style={{ backgroundColor: '#ffffff', color: '#4c1d95' }}
          >
            Start with ChatGPT Free
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Related Content - Premium Grid */}
      <section className="py-16 px-4 sm:px-6 bg-[#FAFBFC]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">Explore More Marketing Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { href: "/marketing/best-seo-tools", title: "Best SEO Tools", desc: "Complete guide to 32 top SEO tools for 2026." },
              { href: "/marketing/best-rank-tracking-tool", title: "Best Rank Tracking Tools", desc: "21 tools to monitor your keyword rankings." },
              { href: "/blog/best-ai-chatbots", title: "Best AI Chatbots", desc: "Top AI chatbots for productivity and learning." }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-violet-600 mb-2 transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
                <div className="mt-4 text-violet-600 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
