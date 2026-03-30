import type { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { ComprehensiveFooter } from "@/components/comprehensive-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronRight,
  HelpCircle,
  Calculator,
  Brain,
  BookOpen,
  Code2,
  Sparkles,
  Shield,
  Mail
} from "lucide-react"

export const metadata: Metadata = {
  title: "FAQ | Frequently Asked Questions | The Tutor Bridge",
  description: "Get answers to common questions about The Tutor Bridge learning platform. Learn about our free tools, calculators, brain games, study resources, and more.",
  keywords: [
    "learning platform FAQ",
    "digital tutor questions",
    "free learning tools",
    "online tools FAQ",
    "brain games questions",
    "calculator FAQ",
    "study resources help"
  ],
  alternates: {
    canonical: "https://www.thetutorbridge.com/faq",
  },
  openGraph: {
    title: "FAQ | Frequently Asked Questions",
    description: "Common questions about our free learning platform answered.",
    url: "https://www.thetutorbridge.com/faq",
    siteName: "The Tutor Bridge",
    type: "website",
  }
}

const faqs = {
  general: {
    title: "General Questions",
    icon: HelpCircle,
    questions: [
      {
        q: "What is The Tutor Bridge?",
        a: "The Tutor Bridge is your 24/7 digital tutor—a free learning platform with 100+ interactive tools, calculators, brain games, study resources, and career roadmaps. We help learners of all ages master new skills through self-paced, interactive learning. No signup required, completely free forever."
      },
      {
        q: "Is The Tutor Bridge really free?",
        a: "Yes, 100% free. No hidden costs, no premium features, no paywalls, no trials that expire. Every single tool, game, calculator, and resource is completely free to use, forever. We believe education should be accessible to everyone."
      },
      {
        q: "Do I need to create an account?",
        a: "Nope! No signup, no email, no password required. Just visit our site, click on any tool or game, and start learning immediately. Your digital tutor is ready 24/7 with zero barriers."
      },
      {
        q: "Who is this platform for?",
        a: "Everyone! Students, professionals, self-learners, developers, job seekers—anyone who wants to learn or improve their skills. While we started with students in mind, our tools serve learners of all ages and backgrounds."
      },
      {
        q: "What makes The Tutor Bridge different from other learning platforms?",
        a: "We focus on interactive, hands-on learning with instant feedback. No video lectures to sit through, no courses to enroll in. Just tools you can use immediately to practice and improve. Plus, everything is 100% free with no signup required—truly barrier-free learning."
      },
      {
        q: "How often do you add new tools?",
        a: "We constantly add new tools, games, and resources based on user needs and feedback. Follow us on LinkedIn to stay updated on new releases!"
      }
    ]
  },
  toolsAndCalculators: {
    title: "Tools & Calculators",
    icon: Calculator,
    questions: [
      {
        q: "What types of calculators do you offer?",
        a: "We have 100+ calculators covering Math (GPA, Percentage, Scientific, Algebra, Geometry), Science (Physics, Chemistry, Density), Finance (Loan, Interest, Discount), Health (BMI, Calorie, Body Fat), and more. Each provides instant results with step-by-step explanations."
      },
      {
        q: "Are the calculator results accurate?",
        a: "Yes! All our calculators use verified formulas and algorithms. However, for critical decisions (medical, financial, legal), always consult a qualified professional. Our tools are educational aids, not substitutes for professional advice."
      },
      {
        q: "Can I use these tools on my phone?",
        a: "Absolutely! All our tools are fully responsive and work perfectly on phones, tablets, and computers. Learn on the go, anytime, anywhere."
      },
      {
        q: "Do you save my inputs or calculations?",
        a: "No. Since we don't require accounts, we don't store any of your data. Your inputs stay private on your device. This means maximum privacy but also means you'll need to bookmark results if you want to save them."
      },
      {
        q: "Can I suggest a new tool or calculator?",
        a: "Yes! We love feedback. Email us at info@thetutorbridge.com with your suggestion. We prioritize tools that serve the most learners and fill gaps in available resources."
      }
    ]
  },
  brainGames: {
    title: "Brain Games",
    icon: Brain,
    questions: [
      {
        q: "What are brain games?",
        a: "Brain games are interactive, fun exercises that test and improve your skills in areas like math, memory, typing, logic, and problem-solving. They provide instant feedback and often include difficulty levels or scoring to track improvement."
      },
      {
        q: "Do brain games actually help with learning?",
        a: "Yes! Active practice with immediate feedback is one of the most effective learning methods. Brain games make practice engaging and help build automaticity—the ability to recall information or perform tasks quickly and accurately."
      },
      {
        q: "Are brain games suitable for all ages?",
        a: "Most of our brain games are suitable for ages 10+, though younger children may enjoy some with adult guidance. Games have varying difficulty levels, so everyone from beginners to experts can find appropriate challenges."
      },
      {
        q: "How do I track my progress in brain games?",
        a: "Many games show your score, time, or accuracy immediately after playing. Since we don't require accounts, progress isn't saved between sessions—but you can track your personal bests manually or challenge yourself to beat previous scores."
      },
      {
        q: "Which brain game should I start with?",
        a: "Try the Times Tables Speed Test for math practice, Memory Match for cognitive skills, or Typing Speed Test for practical keyboard skills. Pick what aligns with your goals!"
      }
    ]
  },
  developerTools: {
    title: "Developer Tools",
    icon: Code2,
    questions: [
      {
        q: "What developer tools do you offer?",
        a: "We have 80+ tools for developers including JSON formatters, Base64 encoder/decoder, URL encoder, MD5/SHA generators, UUID generator, regex tester, color picker, code minifiers, and many converters. All tools work entirely in your browser for privacy."
      },
      {
        q: "Are developer tools safe to use with sensitive data?",
        a: "Yes. All our developer tools run locally in your browser—no data is sent to our servers. Your code, API keys, and sensitive information never leave your device. However, as always, exercise caution with truly sensitive data."
      },
      {
        q: "Can I use these tools for commercial projects?",
        a: "Absolutely! All our tools are free for personal and commercial use. Use them in your development workflow, at work, or for client projects—no attribution required."
      },
      {
        q: "Why should I use your tools instead of npm packages?",
        a: "Quick tasks don't need installations! Our tools are instant, browser-based, and perfect for one-off operations. No package.json bloat, no dependencies, no setup. For repeated automated tasks, npm packages are still the way to go."
      }
    ]
  },
  studyResources: {
    title: "Study Resources & Roadmaps",
    icon: BookOpen,
    questions: [
      {
        q: "What study resources do you provide?",
        a: "We offer comprehensive NCERT study guides for Classes 6-12, covering all major subjects. Each resource includes chapter summaries, key concepts, important questions, and learning tips to help students prepare for exams and understand difficult topics."
      },
      {
        q: "What are career roadmaps?",
        a: "Career roadmaps are step-by-step guides showing the skills, technologies, and learning path to become a professional in various tech fields (Frontend Developer, Data Scientist, DevOps Engineer, etc.). Each roadmap includes beginner to expert progression with resources and milestones."
      },
      {
        q: "Are career roadmaps updated regularly?",
        a: "Yes! Tech evolves fast, and we update our roadmaps regularly to reflect current industry standards, trending technologies, and employer requirements. We base updates on job market analysis and industry feedback."
      },
      {
        q: "Can I use study resources for exam preparation?",
        a: "Absolutely! Our study resources are designed to help students prepare for school exams, board exams, and competitive tests. They complement textbooks and classroom learning with clear summaries and practice questions."
      },
      {
        q: "Which career roadmap should I follow?",
        a: "It depends on your interests! If you love design and user interfaces, try Frontend Developer. If you enjoy data and analysis, explore Data Scientist. If you're interested in systems and automation, check DevOps. Read a few roadmaps to see what excites you!"
      }
    ]
  },
  technical: {
    title: "Technical & Privacy",
    icon: Shield,
    questions: [
      {
        q: "Do you collect any personal data?",
        a: "We collect minimal analytics (page views, tool usage) to understand what's helpful and improve the platform. We don't collect names, emails, or personal information since you don't need accounts. No data is sold to third parties. See our Privacy Policy for full details."
      },
      {
        q: "Do tools work offline?",
        a: "Most tools require an internet connection to load, but many (especially developer tools like JSON formatter, Base64 encoder) continue working once loaded since they run in your browser. We're exploring progressive web app features for better offline support."
      },
      {
        q: "Why do some tools ask for browser permissions?",
        a: "Some tools need specific permissions to function—for example, the Pomodoro Timer may request notification permissions to alert you when time's up. We only request necessary permissions and explain why. You can always deny and the tool will work with reduced features."
      },
      {
        q: "Is the website accessible for users with disabilities?",
        a: "We strive to make our platform accessible to all learners. We follow WCAG guidelines for keyboard navigation, screen reader support, and color contrast. If you encounter accessibility issues, please email us so we can improve."
      },
      {
        q: "Which browsers are supported?",
        a: "All modern browsers work great: Chrome, Firefox, Safari, Edge. We recommend keeping your browser updated for the best experience. Some older browsers (IE11) may have compatibility issues with certain tools."
      }
    ]
  }
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: Object.values(faqs).flatMap(category =>
    category.questions.map(faq => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a
      }
    }))
  )
}

export default function FAQ() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden font-merriweather">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="fixed inset-0 -z-10 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A3D7C]/5 via-[#2BAE66]/5 to-[#FFC857]/10" />
      </div>

      <Navigation />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 py-3">
            <nav className="flex items-center text-sm text-gray-600">
              <Link href="/" className="hover:text-[#1A3D7C]">Home</Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-[#1A3D7C] font-medium">FAQ</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-[#2BAE66]/10 text-[#2BAE66] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                Your Questions Answered
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] leading-tight mb-4">
                Frequently Asked Questions
              </h1>

              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Everything you need to know about your digital tutor. Can't find what you're looking for? Email us at info@thetutorbridge.com
              </p>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-8 bg-white border-b sticky top-0 z-20 shadow-sm">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap justify-center gap-3">
              {Object.entries(faqs).map(([key, category]) => (
                <a
                  key={key}
                  href={`#${key}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-[#1A3D7C] hover:text-white transition-colors text-sm font-medium"
                >
                  <category.icon className="w-4 h-4" />
                  {category.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-12 sm:py-16 bg-[#F8FAFC]">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            {Object.entries(faqs).map(([key, category]) => (
              <div key={key} id={key} className="mb-12 scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#1A3D7C] rounded-full flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-[#1A3D7C]">
                    {category.title}
                  </h2>
                </div>

                <div className="space-y-4">
                  {category.questions.map((faq, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <h3 className="font-poppins font-semibold text-[#1A3D7C] mb-3 flex items-start gap-2">
                          <span className="w-6 h-6 bg-[#FFC857] text-[#1A3D7C] rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                            Q
                          </span>
                          {faq.q}
                        </h3>
                        <div className="pl-8">
                          <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                Still Have Questions?
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                We're here to help! Send us an email and we'll get back to you as soon as possible.
              </p>

              <div className="flex justify-center mb-8">
                <Card className="p-6 text-center hover:shadow-lg transition-shadow max-w-sm w-full">
                  <CardContent className="p-0">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-7 h-7 text-[#1A3D7C]" />
                    </div>
                    <h3 className="font-poppins font-bold text-[#1A3D7C] mb-2">Email Us</h3>
                    <a href="mailto:info@thetutorbridge.com" className="text-[#2BAE66] hover:text-[#1A3D7C] font-semibold">
                      info@thetutorbridge.com
                    </a>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tools">
                  <Button size="lg" className="bg-[#1A3D7C] text-white rounded-xl px-8 py-6 text-lg font-semibold hover:bg-[#1A3D7C]/90">
                    <Brain className="w-5 h-5 mr-2" />
                    Explore Tools & Games
                  </Button>
                </Link>
                <Link href="/calculators">
                  <Button size="lg" className="bg-[#2BAE66] text-white rounded-xl px-8 py-6 text-lg font-semibold hover:bg-[#2BAE66]/90">
                    <Calculator className="w-5 h-5 mr-2" />
                    Browse Calculators
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ComprehensiveFooter />
    </div>
  )
}
