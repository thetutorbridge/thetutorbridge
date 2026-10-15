'use client';

import React from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import {
  FileText,
  Copy,
  CheckCircle,
  ChevronDown,
  Home,
  Sparkles,
  ArrowRight,
  Target,
  Users,
  Code,
  BarChart3,
  Lightbulb,
  AlertCircle,
  BookOpen,
  Linkedin,
  Check,
  Briefcase,
  Mail,
  Cpu,
  GitBranch,
  Layers,
  Zap
} from 'lucide-react';

// Cover Letter Data
const coverLetterExample = {
  jobTitle: "Software Engineer",
  company: "InnovateTech Solutions",
  applicantName: "Alex Johnson",
  applicantEmail: "alex.johnson@email.com",
  applicantPhone: "(555) 234-5678",
  applicantLocation: "Seattle, WA",
  applicantLinkedIn: "linkedin.com/in/alexjohnson",
  applicantGitHub: "github.com/alexjohnson",
  date: "October 15, 2026",
  hiringManager: "David Park",
  hiringManagerTitle: "Engineering Manager",
  companyAddress: "500 Tech Boulevard, Seattle, WA 98101",

  fullText: `Dear Mr. Park,

I am excited to apply for the Software Engineer position at InnovateTech Solutions. As a software engineer with 4 years of experience building scalable web applications and distributed systems, I am drawn to InnovateTech's mission of creating developer tools that simplify complex workflows. My background in full-stack development and passion for clean, maintainable code align perfectly with your team's engineering culture.

In my current role as a Software Engineer at DataFlow Systems, I have delivered significant technical contributions:

• Architected and implemented a real-time data processing pipeline using Kafka and Apache Flink that handles 2M+ events per second, reducing data latency from 30 seconds to under 500ms
• Led the migration of a monolithic Rails application to a microservices architecture using Go and gRPC, improving deployment frequency by 300% and reducing production incidents by 60%
• Designed and built a React-based dashboard with TypeScript that serves 50,000+ daily active users, achieving 99.9% uptime and a 4.8/5 user satisfaction rating
• Mentored 3 junior engineers through code reviews, pair programming sessions, and technical documentation, helping them ramp up to full productivity in 6 weeks

What excites me most about InnovateTech is your commitment to developer experience and your recent open-source contributions to the Kubernetes ecosystem. I've been following your engineering blog and was particularly impressed by your approach to building the internal CLI tools. Having built similar developer productivity tools at DataFlow, I understand the impact of well-designed tooling on engineering velocity.

I am also drawn to InnovateTech's collaborative engineering culture. I thrive in environments where engineers own problems end-to-end and are encouraged to propose and implement innovative solutions. My experience working across frontend, backend, and infrastructure has given me a holistic view of system design that I would bring to your team.

I would love the opportunity to discuss how my technical skills and passion for building impactful software can contribute to InnovateTech's engineering team. Thank you for considering my application.

Best regards,
Alex Johnson`,

  sections: {
    header: {
      title: "Professional Header",
      content: "Alex Johnson\nalex.johnson@email.com | (555) 234-5678 | Seattle, WA\nlinkedin.com/in/alexjohnson | github.com/alexjohnson",
      tips: [
        "Include GitHub profile for engineering roles",
        "Add LinkedIn for professional credibility",
        "Keep contact info clean and scannable"
      ]
    },
    opening: {
      title: "Strong Opening Paragraph",
      content: "I am excited to apply for the Software Engineer position at InnovateTech Solutions. As a software engineer with 4 years of experience building scalable web applications...",
      tips: [
        "Lead with years of experience and specialization",
        "Mention specific technologies or domains",
        "Connect to the company's mission early"
      ]
    },
    body: {
      title: "Technical Achievement Body",
      content: "Architected and implemented a real-time data processing pipeline using Kafka and Apache Flink that handles 2M+ events per second...",
      tips: [
        "Use bullet points for technical achievements",
        "Include specific technologies and metrics",
        "Show both individual contributions and team impact"
      ]
    },
    connection: {
      title: "Company Research Connection",
      content: "What excites me most about InnovateTech is your commitment to developer experience and your recent open-source contributions...",
      tips: [
        "Reference specific company projects or blog posts",
        "Show you've researched their tech stack",
        "Connect your experience to their challenges"
      ]
    },
    closing: {
      title: "Confident Closing",
      content: "I would love the opportunity to discuss how my technical skills and passion for building impactful software can contribute...",
      tips: [
        "Express genuine enthusiasm",
        "Summarize your value proposition",
        "Keep it professional and forward-looking"
      ]
    }
  }
};

// Key Skills for Software Engineer
const keySkills = [
  {
    icon: Code,
    skill: "Technical Proficiency",
    description: "Strong command of programming languages, frameworks, and development tools relevant to the role"
  },
  {
    icon: Layers,
    skill: "System Design",
    description: "Ability to architect scalable, maintainable, and performant software systems"
  },
  {
    icon: GitBranch,
    skill: "Version Control & CI/CD",
    description: "Experience with Git workflows, code reviews, and deployment pipelines"
  },
  {
    icon: Users,
    skill: "Collaboration",
    description: "Effective communication with cross-functional teams including product, design, and other engineers"
  },
  {
    icon: Zap,
    skill: "Problem Solving",
    description: "Analytical thinking and debugging skills to tackle complex technical challenges"
  },
  {
    icon: Lightbulb,
    skill: "Continuous Learning",
    description: "Staying current with industry trends, new technologies, and best practices"
  }
];

// Writing Tips
const writingTips = [
  {
    title: "Showcase Technical Depth",
    description: "Name specific technologies, languages, and frameworks you've worked with. Hiring managers want to see if your stack aligns with theirs."
  },
  {
    title: "Quantify Your Impact",
    description: "Use metrics wherever possible: latency improvements, users served, uptime percentages, lines of code, PRs merged, bugs fixed."
  },
  {
    title: "Highlight End-to-End Ownership",
    description: "Show that you can take a feature from design to production. Companies value engineers who can own problems completely."
  },
  {
    title: "Include Open Source or Side Projects",
    description: "If you contribute to open source or have notable side projects, mention them. They demonstrate passion and initiative."
  },
  {
    title: "Show Team Collaboration",
    description: "Engineering is a team sport. Highlight code reviews, pair programming, mentoring, and cross-team collaboration."
  },
  {
    title: "Research Their Tech Stack",
    description: "Check their job posting, engineering blog, and GitHub. Reference specific technologies or projects they're working on."
  }
];

// Common Mistakes
const commonMistakes = [
  {
    mistake: "Listing technologies without context",
    fix: "Instead of 'I know Python, Java, React', say 'Built a React dashboard with TypeScript that serves 50K daily users'"
  },
  {
    mistake: "Being too generic about achievements",
    fix: "Replace 'improved performance' with 'reduced API response time from 2s to 200ms by implementing caching'"
  },
  {
    mistake: "Not mentioning the company specifically",
    fix: "Research the company and reference their products, tech blog, or open source work to show genuine interest"
  },
  {
    mistake: "Focusing only on individual work",
    fix: "Include collaboration examples: code reviews, mentoring, cross-team projects, and pair programming"
  },
  {
    mistake: "Writing more than one page",
    fix: "Keep it concise. Highlight 3-4 key achievements and save the details for the interview"
  }
];

// FAQ Data
const faqs = [
  {
    question: "What should a Software Engineer cover letter include?",
    answer: "A software engineer cover letter should include: your programming languages and tech stack, 2-4 quantified technical achievements, examples of system design or architecture work, evidence of collaboration and code review experience, and a clear connection to why you want to work at this specific company. Keep it to one page and customize for each application."
  },
  {
    question: "Should I list all programming languages I know?",
    answer: "No, don't just list technologies. Instead, show how you've used them to deliver results. Rather than 'I know Python, JavaScript, and Go', write 'Built a Go microservice that handles 1M requests/day and a React frontend with 99.9% uptime'. Focus on languages relevant to the job posting."
  },
  {
    question: "How do I stand out as a junior software engineer?",
    answer: "Focus on learning velocity, side projects, and internship achievements. Highlight hackathon wins, open source contributions, or personal projects with real users. Show you understand software engineering best practices like testing, code review, and documentation. Express eagerness to learn and grow."
  },
  {
    question: "Should I include my GitHub profile?",
    answer: "Yes, definitely include your GitHub if you have meaningful contributions. Clean up your profile first: pin your best repositories, add READMEs, and ensure code quality. If your GitHub is sparse, focus on one or two quality projects rather than many incomplete ones."
  },
  {
    question: "How do I write a cover letter for FAANG companies?",
    answer: "For FAANG companies, emphasize scale (millions of users, high throughput systems), impact (revenue, user growth, efficiency gains), and ownership (end-to-end feature delivery). Research their leadership principles or engineering values and demonstrate alignment. Be specific about which team or product excites you."
  },
  {
    question: "How important are soft skills in a software engineer cover letter?",
    answer: "Very important. Companies want engineers who can communicate clearly, collaborate effectively, and mentor others. Include examples of explaining technical concepts to non-technical stakeholders, resolving conflicts in code reviews, or helping junior engineers grow. Technical skills get you interviews; soft skills get you hired."
  },
  {
    question: "Should I mention salary expectations?",
    answer: "No, don't mention salary in your cover letter. Salary discussions should happen during or after the interview process. Focus your cover letter entirely on demonstrating your qualifications and fit for the role."
  },
  {
    question: "How do I address employment gaps or career changes?",
    answer: "Briefly address gaps by highlighting what you learned during that time (personal projects, courses, freelance work). For career changes, emphasize transferable skills and relevant self-study or bootcamp experience. Focus the majority of your letter on your current qualifications and enthusiasm for software engineering."
  }
];

// Related Cover Letter Examples
const relatedExamples = [
  {
    title: "Software Developer",
    href: "/cover-letter/example/tech/software-developer",
    description: "Similar role with focus on development skills"
  },
  {
    title: "Technical Program Manager",
    href: "/cover-letter/example/tech/technical-program-manager",
    description: "For engineers moving into program management"
  },
  {
    title: "Frontend Engineer",
    href: "/cover-letter/example/tech/frontend-engineer",
    description: "Specialized frontend development cover letter"
  }
];

export default function SoftwareEngineerCoverLetterPage() {
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
        href="mailto:rishabhjain@gmail.com?subject=Cover Letter Help Request - Software Engineer&body=Hi, I need help with my software engineer cover letter..."
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 transition-all duration-500 ease-out ${
          showFloatingTag
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0'
        }`}
      >
        <div className="relative group">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-l-2xl shadow-2xl flex items-center gap-3 hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer">
            <div className="flex flex-col items-start">
              <span className="text-xs font-medium text-blue-100">Need Help?</span>
              <span className="text-sm font-bold whitespace-nowrap">Get Expert Review</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <Mail className="w-5 h-5" />
            </div>
          </div>
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
            "headline": "Software Engineer Cover Letter Example (2026)",
            "description": "Professional Software Engineer cover letter example with free template. Learn how to write an SWE cover letter that highlights your technical skills and impactful projects.",
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
            "dateModified": "2026-10-15"
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
            <span className="text-slate-900 font-medium">Software Engineer</span>
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
              Software Engineer
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
              A professional cover letter template for Software Engineers. Learn how to showcase your technical skills, coding expertise, and impactful project contributions.
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
            <p className="text-gray-500">A complete Software Engineer cover letter you can customize for your application.</p>
          </div>

          {/* Cover Letter Display */}
          <div className="bg-gray-50 rounded-2xl p-6 md:p-10 border border-gray-200 shadow-sm">
            {/* Header */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <p className="font-semibold text-gray-900 text-lg">{coverLetterExample.applicantName}</p>
              <p className="text-gray-600 text-sm mt-1">
                {coverLetterExample.applicantEmail} | {coverLetterExample.applicantPhone} | {coverLetterExample.applicantLocation}
              </p>
              <p className="text-gray-600 text-sm">{coverLetterExample.applicantLinkedIn} | {coverLetterExample.applicantGitHub}</p>
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
                href="mailto:rishabhjain@gmail.com?subject=Cover Letter Help Request - Software Engineer&body=Hi, I need help with my software engineer cover letter..."
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
                    <div className="bg-gray-50 rounded-xl p-4 mb-4 border-l-4 border-blue-500">
                      <p className="text-sm text-gray-600 italic">"{section.content}"</p>
                    </div>
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
            <p className="text-gray-500 max-w-xl mx-auto">These are the core competencies hiring managers look for in Software Engineer candidates.</p>
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Software Engineer Cover Letter Tips</h2>
            <p className="text-gray-500">Expert advice for crafting a standout engineering cover letter.</p>
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
            <p className="text-gray-500">Avoid these pitfalls that can hurt your engineering application.</p>
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
            <p className="text-gray-500">Expert answers to common software engineer cover letter questions.</p>
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
            <Code className="w-4 h-4 text-amber-400" />
            Start your application today
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Land Your Dream SWE Role?</h2>
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

          <p className="mt-8 text-gray-400 text-sm">
            Need personalized help with your cover letter?{' '}
            <a
              href="mailto:rishabhjain@gmail.com?subject=Cover Letter Help Request - Software Engineer&body=Hi, I need help with my software engineer cover letter..."
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
