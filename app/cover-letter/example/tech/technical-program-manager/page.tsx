'use client';

import React from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import {
  FileText,
  Download,
  Copy,
  CheckCircle,
  ChevronDown,
  Home,
  Sparkles,
  ArrowRight,
  Target,
  Users,
  Calendar,
  Code,
  BarChart3,
  Lightbulb,
  AlertCircle,
  BookOpen,
  Linkedin,
  Check,
  Building2,
  Briefcase,
  Mail
} from 'lucide-react';

// Cover Letter Data
const coverLetterExample = {
  jobTitle: "Technical Program Manager",
  company: "TechCorp Inc.",
  applicantName: "Sarah Chen",
  applicantEmail: "sarah.chen@email.com",
  applicantPhone: "(555) 123-4567",
  applicantLocation: "San Francisco, CA",
  applicantLinkedIn: "linkedin.com/in/sarahchen",
  date: "October 15, 2026",
  hiringManager: "Jennifer Martinez",
  hiringManagerTitle: "Director of Engineering",
  companyAddress: "100 Innovation Way, San Francisco, CA 94102",

  fullText: `Dear Ms. Martinez,

I am writing to express my strong interest in the Technical Program Manager position at TechCorp Inc. With over 6 years of experience leading complex technical programs at scale, including my current role at CloudScale Systems where I manage a portfolio of infrastructure modernization initiatives worth $25M, I am excited about the opportunity to drive strategic technical programs that align with TechCorp's mission to revolutionize enterprise software.

In my current role as Senior Technical Program Manager at CloudScale Systems, I have successfully delivered several high-impact programs that demonstrate my ability to drive results:

• Led the migration of 500+ microservices to Kubernetes, reducing infrastructure costs by 40% and improving deployment frequency from weekly to daily releases across 12 engineering teams
• Designed and implemented a cross-functional program governance framework that improved on-time delivery from 65% to 92% while maintaining engineering velocity
• Orchestrated the integration of three acquired companies' technical platforms, managing 150+ engineers across 8 time zones with zero production incidents during cutover

What particularly excites me about this role at TechCorp is your commitment to building developer-first products while maintaining enterprise-grade reliability. Having led programs that balance innovation speed with operational excellence, I understand the nuances of this challenge. My experience establishing technical roadmaps, driving alignment across product, engineering, and infrastructure teams, and implementing data-driven decision frameworks would enable me to contribute meaningfully from day one.

I am particularly drawn to TechCorp's recent expansion into AI-powered developer tools. In my previous role, I led the program management for our ML platform launch, coordinating between data science, platform engineering, and product teams to deliver a solution that now serves 200+ internal ML models. I would welcome the opportunity to bring this experience to your AI initiatives.

I would be thrilled to discuss how my technical background, program management expertise, and passion for building high-performing teams can contribute to TechCorp's continued success. Thank you for considering my application.

Sincerely,
Sarah Chen`,

  sections: {
    header: {
      title: "Professional Header",
      content: "Sarah Chen\nsarah.chen@email.com | (555) 123-4567 | San Francisco, CA\nlinkedin.com/in/sarahchen",
      tips: [
        "Include full name, professional email, phone, and location",
        "Add LinkedIn profile URL for tech roles",
        "Keep formatting clean and scannable"
      ]
    },
    opening: {
      title: "Compelling Opening Paragraph",
      content: "I am writing to express my strong interest in the Technical Program Manager position at TechCorp Inc. With over 6 years of experience leading complex technical programs at scale...",
      tips: [
        "Mention the specific role and company",
        "Lead with years of experience and scope",
        "Include a quantified achievement to hook the reader"
      ]
    },
    body: {
      title: "Achievement-Focused Body",
      content: "Led the migration of 500+ microservices to Kubernetes, reducing infrastructure costs by 40%...",
      tips: [
        "Use bullet points for key achievements",
        "Quantify impact with metrics (%, $, time saved)",
        "Show technical depth while highlighting leadership"
      ]
    },
    connection: {
      title: "Company Connection",
      content: "What particularly excites me about this role at TechCorp is your commitment to building developer-first products...",
      tips: [
        "Research the company's mission and recent news",
        "Connect your experience to their specific challenges",
        "Show genuine enthusiasm for their work"
      ]
    },
    closing: {
      title: "Strong Closing",
      content: "I would be thrilled to discuss how my technical background, program management expertise, and passion for building high-performing teams can contribute...",
      tips: [
        "Express enthusiasm for next steps",
        "Summarize your key value proposition",
        "Thank them for their consideration"
      ]
    }
  }
};

// Key Skills for TPM
const keySkills = [
  {
    icon: Target,
    skill: "Program Delivery",
    description: "Track record of delivering complex, multi-team technical programs on time and within budget"
  },
  {
    icon: Users,
    skill: "Cross-Functional Leadership",
    description: "Ability to align engineering, product, design, and business stakeholders toward common goals"
  },
  {
    icon: Code,
    skill: "Technical Depth",
    description: "Understanding of software architecture, system design, and engineering best practices"
  },
  {
    icon: Calendar,
    skill: "Roadmap Planning",
    description: "Experience creating and managing technical roadmaps with clear milestones and dependencies"
  },
  {
    icon: BarChart3,
    skill: "Data-Driven Decisions",
    description: "Using metrics and KPIs to track progress, identify risks, and drive continuous improvement"
  },
  {
    icon: Lightbulb,
    skill: "Strategic Thinking",
    description: "Ability to connect technical execution to business outcomes and company strategy"
  }
];

// Writing Tips
const writingTips = [
  {
    title: "Lead with Impact",
    description: "Open with your most impressive technical program achievement. TPM roles require demonstrating you can deliver results at scale."
  },
  {
    title: "Quantify Everything",
    description: "Use specific numbers: team sizes, budget amounts, percentage improvements, timeline reductions. TPMs are measured by metrics."
  },
  {
    title: "Show Technical Credibility",
    description: "Reference specific technologies, architectures, or methodologies (Kubernetes, microservices, Agile, etc.) to demonstrate technical depth."
  },
  {
    title: "Highlight Cross-Functional Skills",
    description: "TPMs work across many teams. Show examples of aligning engineering, product, design, and leadership stakeholders."
  },
  {
    title: "Research the Company",
    description: "Reference specific company initiatives, products, or challenges. Show you understand their technical landscape and business goals."
  },
  {
    title: "Balance Technical & Soft Skills",
    description: "While technical knowledge matters, also emphasize communication, influence without authority, and relationship building."
  }
];

// Common Mistakes
const commonMistakes = [
  {
    mistake: "Being too generic",
    fix: "Customize every cover letter to the specific company and role. Reference their tech stack, products, or recent news."
  },
  {
    mistake: "Listing responsibilities instead of achievements",
    fix: "Focus on outcomes and impact, not job duties. Use the CAR format: Challenge, Action, Result."
  },
  {
    mistake: "Ignoring the technical component",
    fix: "TPM roles require technical credibility. Include specific technologies, systems, or architectures you've worked with."
  },
  {
    mistake: "Writing too long",
    fix: "Keep it to one page (300-400 words). Hiring managers spend seconds on initial review, so be concise."
  },
  {
    mistake: "No clear connection to the company",
    fix: "Explain why THIS company and THIS role. Generic enthusiasm doesn't stand out."
  }
];

// FAQ Data
const faqs = [
  {
    question: "What should a Technical Program Manager cover letter include?",
    answer: "A TPM cover letter should include: a compelling opening that highlights your experience level and a key achievement, specific examples of programs you've delivered with quantified results, demonstration of technical knowledge, evidence of cross-functional leadership, and a clear connection to the company's specific challenges or mission. Keep it to one page and customize it for each application."
  },
  {
    question: "How do I show technical credibility without being an engineer?",
    answer: "Reference specific technologies, architectures, and methodologies you've worked with (e.g., 'led the migration to Kubernetes,' 'implemented CI/CD pipelines,' 'managed API platform development'). Describe technical decisions you've influenced and trade-offs you've navigated. Show you can communicate effectively with engineers while translating technical concepts for business stakeholders."
  },
  {
    question: "How long should a TPM cover letter be?",
    answer: "Keep your cover letter to one page, ideally 300-400 words. Hiring managers and recruiters review hundreds of applications, so being concise is essential. Focus on your 2-3 most impressive achievements rather than trying to cover everything. The goal is to generate enough interest for them to review your resume."
  },
  {
    question: "Should I use bullet points in my cover letter?",
    answer: "Yes, bullet points work well for TPM cover letters because they make achievements scannable and easy to digest. Use 3-4 bullet points to highlight your key accomplishments with metrics. Balance bullets with prose paragraphs for your opening, company connection, and closing sections."
  },
  {
    question: "How do I tailor my cover letter for FAANG companies?",
    answer: "Research each company's leadership principles (Amazon), core values (Google), or cultural tenets (Meta). Reference specific products, technical challenges, or initiatives that excite you. Use metrics that demonstrate FAANG-level scale (millions of users, hundreds of engineers, global systems). Emphasize data-driven decision making and customer obsession."
  },
  {
    question: "What metrics should I include in a TPM cover letter?",
    answer: "Strong TPM metrics include: number of engineers/teams managed, program budget or revenue impact, delivery timeline improvements, cost savings percentages, system performance gains, team velocity improvements, and scale indicators (users, transactions, services). Always pair metrics with context to show the challenge you overcame."
  },
  {
    question: "How do I address career transitions to TPM?",
    answer: "If transitioning from engineering, emphasize technical depth and highlight any informal program management you've done (leading initiatives, coordinating releases, mentoring). From product management, focus on technical products and engineering collaboration. From project management, emphasize technical projects and your ability to engage with engineering discussions. Always show you understand what makes TPM different from your current role."
  },
  {
    question: "Should I mention specific tools and methodologies?",
    answer: "Yes, mentioning relevant tools and methodologies demonstrates practical experience. Reference project management tools (Jira, Asana, Linear), collaboration platforms (Confluence, Notion), communication tools (Slack, Teams), and methodologies (Agile, Scrum, SAFe, Kanban). However, focus on outcomes rather than just listing tools."
  }
];

// Related Cover Letter Examples
const relatedExamples = [
  {
    title: "Software Engineering Manager",
    href: "/cover-letter/example/tech/software-engineering-manager",
    description: "Lead engineering teams with this manager cover letter template"
  },
  {
    title: "Product Manager",
    href: "/cover-letter/example/tech/product-manager",
    description: "Showcase product strategy and execution skills"
  },
  {
    title: "Senior Software Engineer",
    href: "/cover-letter/example/tech/senior-software-engineer",
    description: "Technical individual contributor cover letter example"
  }
];

export default function TechnicalProgramManagerCoverLetterPage() {
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [expandedSection, setExpandedSection] = React.useState<string | null>('opening');
  const [showFloatingTag, setShowFloatingTag] = React.useState(false);
  const faqSectionRef = React.useRef<HTMLElement>(null);

  // Track scroll position to show/hide floating tag
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const faqSection = faqSectionRef.current;

      if (faqSection) {
        const faqBottom = faqSection.offsetTop + faqSection.offsetHeight;
        // Show after scrolling 400px, hide after FAQ section ends
        setShowFloatingTag(scrollY > 400 && scrollY < faqBottom - 200);
      } else {
        setShowFloatingTag(scrollY > 400);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetterExample.fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      {/* Floating Help Tag */}
      <a
        href="mailto:rishabhjain@gmail.com?subject=Cover Letter Help Request&body=Hi, I need help with my cover letter for..."
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 transition-all duration-500 ease-out ${
          showFloatingTag
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0'
        }`}
      >
        <div className="relative group">
          {/* Main Tag */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-l-2xl shadow-2xl flex items-center gap-3 hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer">
            <div className="flex flex-col items-start">
              <span className="text-xs font-medium text-blue-100">Need Help?</span>
              <span className="text-sm font-bold whitespace-nowrap">Get Expert Review</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          {/* Pulse animation */}
          <span className="absolute -left-1 top-1/2 -translate-y-1/2 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
        </div>
      </a>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Technical Program Manager Cover Letter Example (2026)",
            "description": "Professional Technical Program Manager cover letter example with free template. Learn how to write a TPM cover letter that highlights your technical leadership and program delivery skills.",
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
            "datePublished": "2026-10-15",
            "dateModified": "2026-10-15",
            "keywords": "technical program manager cover letter, TPM cover letter example, program manager cover letter sample"
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
            "@type": "HowTo",
            "name": "How to Write a Technical Program Manager Cover Letter",
            "description": "Step-by-step guide to writing an effective TPM cover letter",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Write a Professional Header",
                "text": "Include your full name, professional email, phone number, location, and LinkedIn profile URL."
              },
              {
                "@type": "HowToStep",
                "name": "Create a Compelling Opening",
                "text": "Lead with years of experience, scope of programs managed, and a quantified achievement."
              },
              {
                "@type": "HowToStep",
                "name": "Highlight Key Achievements",
                "text": "Use bullet points with metrics to showcase 3-4 major program successes."
              },
              {
                "@type": "HowToStep",
                "name": "Connect to the Company",
                "text": "Research the company and explain why their specific mission or challenges excite you."
              },
              {
                "@type": "HowToStep",
                "name": "Close Strongly",
                "text": "Express enthusiasm for next steps and summarize your key value proposition."
              }
            ]
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
            <Link href="/cover-letter" className="hover:text-slate-900 transition-colors">Cover Letters</Link>
            <span className="text-gray-300">/</span>
            <Link href="/cover-letter/example/tech" className="hover:text-slate-900 transition-colors">Tech</Link>
            <span className="text-gray-300">/</span>
            <span className="text-slate-900 font-medium">Technical Program Manager</span>
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
              Technical Program Manager
              <span className="block text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #60a5fa, #34d399, #60a5fa)' }}>
                Cover Letter Example
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
                <span className="text-gray-400">Oct 15, 2026</span>
              </div>
            </div>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
              A professional cover letter template for Technical Program Managers. Learn how to showcase your program delivery, technical leadership, and cross-functional collaboration skills.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">5</div>
                <div className="text-sm text-gray-400 mt-1">Key Sections</div>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-4xl font-bold text-white">6</div>
                <div className="text-sm text-gray-400 mt-1">Essential Skills</div>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400">Free</div>
                <div className="text-sm text-gray-400 mt-1">Template</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-6 px-4 sm:px-6 -mt-8 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ backgroundColor: copied ? '#059669' : '#0f172a', color: '#ffffff' }}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Cover Letter'}
            </button>
            <a
              href="#full-example"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
              style={{ color: '#374151' }}
            >
              <FileText className="w-4 h-4" />
              View Full Example
            </a>
            <a
              href="#breakdown"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
              style={{ color: '#374151' }}
            >
              <BookOpen className="w-4 h-4" />
              Section Breakdown
            </a>
          </div>
        </div>
      </section>

      {/* Full Cover Letter Example */}
      <section id="full-example" className="py-16 px-4 sm:px-6 bg-white scroll-mt-20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Full Cover Letter Example</h2>
            <p className="text-gray-500">A complete Technical Program Manager cover letter you can customize for your application.</p>
          </div>

          {/* Cover Letter Display */}
          <div className="bg-gray-50 rounded-2xl p-6 md:p-10 border border-gray-200 shadow-sm">
            {/* Header */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <p className="font-semibold text-gray-900 text-lg">{coverLetterExample.applicantName}</p>
              <p className="text-gray-600 text-sm mt-1">
                {coverLetterExample.applicantEmail} | {coverLetterExample.applicantPhone} | {coverLetterExample.applicantLocation}
              </p>
              <p className="text-gray-600 text-sm">{coverLetterExample.applicantLinkedIn}</p>
            </div>

            {/* Date & Recipient */}
            <div className="mb-6">
              <p className="text-gray-600 text-sm mb-4">{coverLetterExample.date}</p>
              <p className="text-gray-900 font-medium">{coverLetterExample.hiringManager}</p>
              <p className="text-gray-600 text-sm">{coverLetterExample.hiringManagerTitle}</p>
              <p className="text-gray-600 text-sm">{coverLetterExample.company}</p>
              <p className="text-gray-600 text-sm">{coverLetterExample.companyAddress}</p>
            </div>

            {/* Body */}
            <div className="prose prose-gray max-w-none">
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {coverLetterExample.fullText}
              </div>
            </div>
          </div>

          {/* Copy Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all shadow-lg hover:-translate-y-0.5"
              style={{ backgroundColor: copied ? '#059669' : '#0f172a', color: '#ffffff' }}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? 'Copied to Clipboard!' : 'Copy This Cover Letter'}
            </button>
          </div>

          {/* Help Contact Box */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Need help with your cover letter?</p>
                  <p className="text-sm text-gray-600">Get personalized feedback from our experts</p>
                </div>
              </div>
              <a
                href="mailto:rishabhjain@gmail.com?subject=Cover Letter Help Request&body=Hi, I need help with my cover letter for..."
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Mail className="w-4 h-4" />
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section Breakdown */}
      <section id="breakdown" className="py-16 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50 scroll-mt-20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Section-by-Section Guide
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Cover Letter Breakdown</h2>
            <p className="text-gray-500">Understand what makes each section effective and how to write your own.</p>
          </div>

          <div className="space-y-4">
            {Object.entries(coverLetterExample.sections).map(([key, section]) => (
              <div
                key={key}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  expandedSection === key ? 'border-blue-200 shadow-lg' : 'border-gray-100 shadow-sm'
                }`}
              >
                <button
                  onClick={() => setExpandedSection(expandedSection === key ? null : key)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      expandedSection === key ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <FileText className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{section.title}</h3>
                  </div>
                  <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-transform duration-300 ${
                    expandedSection === key ? 'rotate-180' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </div>
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${
                  expandedSection === key ? 'max-h-[500px]' : 'max-h-0'
                }`}>
                  <div className="px-6 pb-6">
                    {/* Example Text */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-4 border-l-4 border-blue-500">
                      <p className="text-sm text-gray-600 italic">"{section.content}"</p>
                    </div>

                    {/* Tips */}
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Key Tips:</p>
                      {section.tips.map((tip, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-600">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Skills Section */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Key Skills to Highlight</h2>
            <p className="text-gray-500 max-w-xl mx-auto">These are the core competencies hiring managers look for in Technical Program Manager candidates.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keySkills.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.skill}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Writing Tips Section */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">TPM Cover Letter Writing Tips</h2>
            <p className="text-gray-500">Expert advice for crafting a standout Technical Program Manager cover letter.</p>
          </div>

          <div className="space-y-4">
            {writingTips.map((tip, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                    <p className="text-sm text-gray-600">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Mistakes Section */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-700 text-sm font-medium mb-4">
              <AlertCircle className="w-4 h-4" />
              Mistakes to Avoid
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Common Cover Letter Mistakes</h2>
            <p className="text-gray-500">Avoid these pitfalls that can sink your TPM application.</p>
          </div>

          <div className="space-y-4">
            {commonMistakes.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-600 font-bold text-xs">✕</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-red-700">Mistake:</p>
                      <p className="text-sm text-gray-700">{item.mistake}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-emerald-700">Fix:</p>
                      <p className="text-sm text-gray-700">{item.fix}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqSectionRef} id="faq" className="py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-500">Expert answers to common TPM cover letter questions.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 border ${
                  expandedFaq === index ? 'border-blue-200 shadow-lg' : 'border-gray-100 shadow-sm'
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
            <FileText className="w-4 h-4 text-amber-400" />
            Start your application today
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Land Your TPM Role?</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: '#d1d5db' }}>
            Use this cover letter template as a starting point, customize it with your achievements, and stand out from other candidates.
          </p>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-all shadow-xl hover:-translate-y-0.5"
            style={{ backgroundColor: '#ffffff', color: '#0f172a' }}
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            {copied ? 'Copied!' : 'Copy Cover Letter Template'}
          </button>

          {/* Help Contact */}
          <p className="mt-8 text-gray-400 text-sm">
            Need personalized help with your cover letter?{' '}
            <a
              href="mailto:rishabhjain@gmail.com?subject=Cover Letter Help Request&body=Hi, I need help with my cover letter for..."
              className="text-white underline underline-offset-2 hover:text-blue-300 transition-colors inline-flex items-center gap-1"
            >
              <Mail className="w-4 h-4" />
              Get in touch
            </a>
          </p>
        </div>
      </section>

      {/* Related Examples */}
      <section className="py-16 px-4 sm:px-6 bg-[#FAFBFC]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">Explore More Cover Letter Examples</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedExamples.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <Briefcase className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2 transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
                <div className="mt-4 text-blue-600 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  View example <ArrowRight className="w-4 h-4" />
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
