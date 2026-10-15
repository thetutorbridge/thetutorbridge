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
  Database,
  Globe,
  Wrench,
  Terminal
} from 'lucide-react';

// Cover Letter Data
const coverLetterExample = {
  jobTitle: "Software Developer",
  company: "TechStart Solutions",
  applicantName: "Michael Torres",
  applicantEmail: "michael.torres@email.com",
  applicantPhone: "(555) 345-6789",
  applicantLocation: "Austin, TX",
  applicantLinkedIn: "linkedin.com/in/michaeltorres",
  applicantGitHub: "github.com/migueltorres",
  date: "October 15, 2026",
  hiringManager: "Lisa Chen",
  hiringManagerTitle: "Development Team Lead",
  companyAddress: "200 Innovation Drive, Austin, TX 78701",

  fullText: `Dear Ms. Chen,

I am writing to apply for the Software Developer position at TechStart Solutions. With 3 years of experience developing web applications and a strong foundation in both frontend and backend technologies, I am excited about the opportunity to contribute to your team's mission of building intuitive software solutions for small businesses.

At my current role as a Software Developer at WebCraft Agency, I have consistently delivered high-quality code while collaborating closely with designers, product managers, and clients:

• Developed a custom e-commerce platform using React, Node.js, and PostgreSQL that processes $2M+ in annual transactions for a retail client, with 99.5% uptime since launch
• Built and maintained RESTful APIs serving 15,000+ daily requests, implementing caching strategies that reduced average response time by 65%
• Created a reusable component library with Storybook documentation, adopted by 4 development teams and reducing new feature development time by 40%
• Implemented automated testing with Jest and Cypress, increasing code coverage from 45% to 85% and reducing production bugs by 50%

I am particularly drawn to TechStart Solutions because of your focus on helping small businesses succeed through technology. Having grown up watching my parents run their small bakery, I understand firsthand the challenges small business owners face and the impact that well-designed software can have on their daily operations. Your recent work on the inventory management module caught my attention, and I would love to contribute to making it even more powerful.

My approach to development emphasizes clean, maintainable code and clear communication with stakeholders. I believe that great software is built through collaboration, and I pride myself on translating complex technical concepts into language that clients and team members can understand. I am also committed to continuous learning—I recently completed certifications in AWS and have been exploring TypeScript to expand my skill set.

I would welcome the opportunity to discuss how my development skills and passion for creating impactful software align with TechStart's goals. Thank you for considering my application.

Best regards,
Michael Torres`,

  sections: {
    header: {
      title: "Professional Header",
      content: "Michael Torres\nmichael.torres@email.com | (555) 345-6789 | Austin, TX\nlinkedin.com/in/michaeltorres | github.com/migueltorres",
      tips: [
        "Include GitHub to showcase your code",
        "Use a professional email address",
        "Add location relevant to the job"
      ]
    },
    opening: {
      title: "Engaging Opening",
      content: "I am writing to apply for the Software Developer position at TechStart Solutions. With 3 years of experience developing web applications...",
      tips: [
        "State the position and company clearly",
        "Mention years of experience upfront",
        "Show alignment with company mission"
      ]
    },
    body: {
      title: "Achievement-Driven Body",
      content: "Developed a custom e-commerce platform using React, Node.js, and PostgreSQL that processes $2M+ in annual transactions...",
      tips: [
        "Use bullet points for readability",
        "Include specific technologies used",
        "Quantify business impact whenever possible"
      ]
    },
    connection: {
      title: "Personal Connection",
      content: "I am particularly drawn to TechStart Solutions because of your focus on helping small businesses succeed...",
      tips: [
        "Share a genuine connection to the company's mission",
        "Reference specific products or features",
        "Show you've done your research"
      ]
    },
    closing: {
      title: "Professional Closing",
      content: "I would welcome the opportunity to discuss how my development skills and passion for creating impactful software align...",
      tips: [
        "Express enthusiasm for next steps",
        "Reinforce your key value",
        "Thank them professionally"
      ]
    }
  }
};

// Key Skills for Software Developer
const keySkills = [
  {
    icon: Code,
    skill: "Programming Languages",
    description: "Proficiency in languages relevant to the role: JavaScript, Python, Java, C#, or others"
  },
  {
    icon: Globe,
    skill: "Web Development",
    description: "Experience with frontend frameworks (React, Vue, Angular) and backend technologies"
  },
  {
    icon: Database,
    skill: "Database Management",
    description: "Working knowledge of SQL and NoSQL databases, data modeling, and optimization"
  },
  {
    icon: Wrench,
    skill: "Development Tools",
    description: "Familiarity with Git, CI/CD, testing frameworks, and development workflows"
  },
  {
    icon: Users,
    skill: "Team Collaboration",
    description: "Ability to work effectively with designers, PMs, and other developers"
  },
  {
    icon: Lightbulb,
    skill: "Problem Solving",
    description: "Analytical mindset for debugging, optimization, and creative solutions"
  }
];

// Writing Tips
const writingTips = [
  {
    title: "Match Technologies to the Job Posting",
    description: "Carefully read the job description and highlight your experience with the specific languages, frameworks, and tools they mention."
  },
  {
    title: "Show Real-World Impact",
    description: "Don't just say what you built—explain who uses it and what business value it provides. Revenue, users, and efficiency gains are compelling."
  },
  {
    title: "Demonstrate Full-Stack Awareness",
    description: "Even if applying for a specialized role, showing understanding of the full development lifecycle makes you more valuable."
  },
  {
    title: "Highlight Your Learning Mindset",
    description: "Technology evolves rapidly. Mention recent courses, certifications, or new technologies you've been exploring."
  },
  {
    title: "Include Soft Skills",
    description: "Communication, teamwork, and client interaction matter. Show you can work well with non-technical stakeholders."
  },
  {
    title: "Keep It Concise",
    description: "Developers appreciate efficiency. Keep your cover letter to one page with clear, scannable bullet points."
  }
];

// Common Mistakes
const commonMistakes = [
  {
    mistake: "Listing every technology you've ever touched",
    fix: "Focus on technologies relevant to this role and where you have meaningful experience"
  },
  {
    mistake: "Using vague descriptions like 'worked on various projects'",
    fix: "Be specific: 'Built a React dashboard with TypeScript that tracks real-time analytics for 10K users'"
  },
  {
    mistake: "Ignoring the company's domain or products",
    fix: "Research their product and mention specific features or challenges you'd be excited to work on"
  },
  {
    mistake: "Only focusing on solo work",
    fix: "Include collaboration examples: code reviews, pair programming, working with designers or PMs"
  },
  {
    mistake: "Forgetting to proofread",
    fix: "Typos and bugs in your cover letter suggest you'll write buggy code. Review carefully!"
  }
];

// FAQ Data
const faqs = [
  {
    question: "What's the difference between a Software Developer and Software Engineer cover letter?",
    answer: "While the terms are often used interchangeably, Software Developer cover letters typically emphasize practical coding skills, project delivery, and working closely with clients or end-users. Software Engineer cover letters may focus more on system design, architecture, and scalability. Tailor your letter to match the job description's emphasis."
  },
  {
    question: "Should I include personal projects in my cover letter?",
    answer: "Yes, especially if you're early in your career or transitioning into development. Personal projects show initiative, passion, and practical skills. Briefly mention projects that demonstrate relevant technologies or problem-solving abilities, and link to your GitHub where they can see the code."
  },
  {
    question: "How do I write a cover letter as a self-taught developer?",
    answer: "Focus on what you've built rather than formal credentials. Highlight projects, contributions, bootcamp work, or freelance experience. Emphasize your self-motivation, learning ability, and practical results. Many companies value demonstrated skills over traditional education."
  },
  {
    question: "Should I mention my salary expectations?",
    answer: "No, avoid mentioning salary in your cover letter. Salary discussions should happen during the interview process, typically after both parties have established mutual interest. Focus your cover letter on demonstrating your qualifications and fit."
  },
  {
    question: "How technical should my cover letter be?",
    answer: "Strike a balance. Mention specific technologies to show credibility, but don't turn it into a technical specification. Remember that HR or recruiters may read it first. Use technical terms where relevant but ensure the overall letter is readable by non-developers."
  },
  {
    question: "Is a cover letter necessary for developer jobs?",
    answer: "While some companies say cover letters are optional, submitting one shows effort and genuine interest. A good cover letter helps you stand out, especially when your resume is similar to other candidates. It's your chance to show personality and explain why you want this specific role."
  },
  {
    question: "How do I address employment gaps in my cover letter?",
    answer: "Briefly acknowledge gaps if significant, but focus on what you did during that time: learning new technologies, personal projects, freelancing, or other productive activities. Emphasize your current readiness and enthusiasm for returning to full-time development."
  },
  {
    question: "Should I customize my cover letter for each application?",
    answer: "Absolutely. Generic cover letters are easy to spot and less effective. At minimum, customize the company name, reference their specific products or tech stack, and explain why you're interested in their mission. This extra effort significantly improves your chances."
  }
];

// Related Cover Letter Examples
const relatedExamples = [
  {
    title: "Software Engineer",
    href: "/cover-letter/example/tech/software-engineer",
    description: "For engineering-focused roles with system design emphasis"
  },
  {
    title: "Technical Program Manager",
    href: "/cover-letter/example/tech/technical-program-manager",
    description: "For developers moving into program management"
  },
  {
    title: "Full Stack Developer",
    href: "/cover-letter/example/tech/full-stack-developer",
    description: "Cover both frontend and backend expertise"
  }
];

export default function SoftwareDeveloperCoverLetterPage() {
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
        href="mailto:rishabhjain@gmail.com?subject=Cover Letter Help Request - Software Developer&body=Hi, I need help with my software developer cover letter..."
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
            "headline": "Software Developer Cover Letter Example (2026)",
            "description": "Professional Software Developer cover letter example with free template. Learn how to write a developer cover letter that showcases your coding skills and project experience.",
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
            <span className="text-slate-900 font-medium">Software Developer</span>
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
              Software Developer
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
              A professional cover letter template for Software Developers. Learn how to showcase your coding skills, project experience, and problem-solving abilities.
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
            <p className="text-gray-500">A complete Software Developer cover letter you can customize for your application.</p>
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
                href="mailto:rishabhjain@gmail.com?subject=Cover Letter Help Request - Software Developer&body=Hi, I need help with my software developer cover letter..."
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
            <p className="text-gray-500 max-w-xl mx-auto">These are the core competencies hiring managers look for in Software Developer candidates.</p>
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Software Developer Cover Letter Tips</h2>
            <p className="text-gray-500">Expert advice for crafting a standout developer cover letter.</p>
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
            <p className="text-gray-500">Avoid these pitfalls that can hurt your developer application.</p>
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
            <p className="text-gray-500">Expert answers to common software developer cover letter questions.</p>
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
            <Terminal className="w-4 h-4 text-amber-400" />
            Start your application today
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Land Your Developer Role?</h2>
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
              href="mailto:rishabhjain@gmail.com?subject=Cover Letter Help Request - Software Developer&body=Hi, I need help with my software developer cover letter..."
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
