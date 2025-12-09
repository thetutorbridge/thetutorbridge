import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  CheckCircle,
  Clock,
  Star,
  ArrowRight,
  BookOpen,
  Calculator,
  FlaskConical,
  PenTool,
  Upload,
  MessageSquare,
  FileText,
  Shield,
  Award,
  Users,
  Zap,
  GraduationCap,
  Target,
  Brain,
  Lightbulb,
  BadgeCheck
} from "lucide-react"

export const metadata: Metadata = {
  title: "Homework Help for Grades 6-12 | Math, Science & English | The Tutor Bridge",
  description: "Get expert homework help for middle school and high school students. Our U.S.-certified tutors provide step-by-step explanations in Math, Science, and English. Fast turnaround, affordable pricing starting at $15.",
  keywords: [
    "homework help",
    "online homework help",
    "math homework help",
    "science homework help",
    "english homework help",
    "homework tutor",
    "homework assistance",
    "grade 6 homework help",
    "grade 7 homework help",
    "grade 8 homework help",
    "grade 9 homework help",
    "grade 10 homework help",
    "grade 11 homework help",
    "grade 12 homework help",
    "middle school homework help",
    "high school homework help",
    "algebra homework help",
    "geometry homework help",
    "chemistry homework help",
    "physics homework help",
    "biology homework help",
    "essay help",
    "Common Core homework help",
    "AP homework help",
    "homework answers with explanations",
    "step by step homework solutions"
  ],
  alternates: {
    canonical: "https://www.thetutorbridge.com/homework-help",
  },
  openGraph: {
    title: "Homework Help for Grades 6-12 | Math, Science & English",
    description: "Expert homework help with step-by-step explanations. U.S.-certified tutors, fast turnaround, affordable pricing from $15.",
    url: "https://www.thetutorbridge.com/homework-help",
    siteName: "The Tutor Bridge",
    type: "website",
    images: [
      {
        url: "https://www.thetutorbridge.com/og-homework-help.jpg",
        width: 1200,
        height: 630,
        alt: "The Tutor Bridge - Homework Help for Grades 6-12"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Homework Help for Grades 6-12 | The Tutor Bridge",
    description: "Expert homework help with step-by-step explanations from U.S.-certified tutors.",
  }
}

// JSON-LD Structured Data for SEO/AEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "The Tutor Bridge",
  "description": "Professional homework help and tutoring services for grades 6-12 in Math, Science, and English",
  "url": "https://www.thetutorbridge.com/homework-help",
  "logo": "https://www.thetutorbridge.com/TheTutorBridge Logo New.png",
  "sameAs": [
    "https://www.linkedin.com/company/thetutorbridge/"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  },
  "offers": {
    "@type": "Offer",
    "name": "Homework Help Services",
    "description": "Step-by-step homework solutions with expert explanations",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "price": "15",
      "priceCurrency": "USD",
      "minPrice": "15"
    }
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Homework Help Subjects",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "Math Homework Help",
        "description": "Algebra, Geometry, Calculus, Statistics, and more"
      },
      {
        "@type": "OfferCatalog",
        "name": "Science Homework Help",
        "description": "Physics, Chemistry, Biology, and Earth Science"
      },
      {
        "@type": "OfferCatalog",
        "name": "English Homework Help",
        "description": "Essay writing, Grammar, Literature analysis, and Reading comprehension"
      }
    ]
  }
}

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does The Tutor Bridge homework help work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Simply upload your homework question or assignment through our submission form. Our expert tutors review your request and provide detailed, step-by-step explanations within your chosen timeframe (60 minutes, 24 hours, or 48 hours). You'll receive solutions that teach you the method, not just the answer."
      }
    },
    {
      "@type": "Question",
      "name": "What subjects do you cover for homework help?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We provide comprehensive homework help for Math (Algebra, Geometry, Pre-Calculus, Calculus, Statistics), Science (Physics, Chemistry, Biology, Earth Science), and English (Essay Writing, Grammar, Literature Analysis, Reading Comprehension) for grades 6-12."
      }
    },
    {
      "@type": "Question",
      "name": "How much does homework help cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our homework help starts at $15 for simple questions. Pricing varies based on complexity and urgency. Multi-problem sets range from $40-80, and urgent delivery adds $10. We provide transparent quotes before you commit."
      }
    },
    {
      "@type": "Question",
      "name": "Are your tutors qualified?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all our tutors are U.S.-certified educators or subject matter experts with verified credentials. They have extensive experience teaching grades 6-12 and are familiar with Common Core standards, AP curriculum, and state-specific requirements."
      }
    },
    {
      "@type": "Question",
      "name": "Is the homework help just giving answers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Our philosophy is 'We teach the method, not just the answer.' Every solution includes detailed step-by-step explanations, showing you exactly how to solve similar problems on your own. This helps you learn and succeed on tests."
      }
    }
  ]
}

export default function HomeworkHelp() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <div className="relative min-h-screen flex flex-col overflow-x-hidden font-merriweather">
        {/* Background */}
        <div className="fixed inset-0 -z-10 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A3D7C]/5 via-[#2BAE66]/5 to-[#FFC857]/10" />
        </div>

        <Navigation />

        <main className="flex-1">
          {/* Hero Section - Subtle & Center Aligned */}
          <section className="relative py-16 sm:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] leading-tight mb-4">
                  Homework Help for Grades 6-12
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
                  Expert step-by-step solutions for Math, Science, and English. We don't just give answers — we teach the method so you truly understand.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Link href="/homework-help/submit">
                    <Button
                      size="lg"
                      className="bg-[#1A3D7C] text-white rounded-xl px-8 py-4 hover:bg-[#1A3D7C]/90 transition-all font-semibold w-full sm:w-auto"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Submit Your Homework
                    </Button>
                  </Link>
                  <Link href="/tutoring/free-consultation">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-[#1A3D7C] text-[#1A3D7C] rounded-xl px-8 py-4 hover:bg-[#1A3D7C] hover:text-white transition-all font-semibold w-full sm:w-auto"
                    >
                      Book Free Consultation
                    </Button>
                  </Link>
                </div>

                {/* Quick Stats */}
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                    <span>From $15/task</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#2BAE66]" />
                    <span>60-min Delivery Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#2BAE66]" />
                    <span>4.9/5 Student Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Social Proof Bar */}
          <section className="py-8 bg-white border-b">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex flex-wrap justify-center items-center gap-8 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-bold text-[#1A3D7C]">50,000+</span>
                  <span className="text-gray-600 text-sm">Homework Tasks Completed</span>
                </div>
                <div className="hidden sm:block w-px h-12 bg-gray-200"></div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-bold text-[#2BAE66]">98%</span>
                  <span className="text-gray-600 text-sm">Satisfaction Rate</span>
                </div>
                <div className="hidden sm:block w-px h-12 bg-gray-200"></div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-bold text-[#FFC857]">100+</span>
                  <span className="text-gray-600 text-sm">Expert Tutors</span>
                </div>
                <div className="hidden sm:block w-px h-12 bg-gray-200"></div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-bold text-[#1A3D7C]">Since 2020</span>
                  <span className="text-gray-600 text-sm">Helping Students Succeed</span>
                </div>
              </div>
            </div>
          </section>

          {/* Subject Cards Section */}
          <section className="py-16 sm:py-20 bg-[#F8FAFC]">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  Homework Help by Subject
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Expert assistance across core subjects for grades 6-12. Common Core aligned, AP-ready, and tailored to your curriculum.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                {/* Math Card */}
                <Link href="/homework-help/math" className="group">
                  <Card className="h-full p-6 sm:p-8 hover:shadow-xl transition-all duration-300 border-0 bg-white group-hover:scale-[1.02]">
                    <CardContent className="p-0">
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                        <Calculator className="w-8 h-8 text-[#1A3D7C]" />
                      </div>
                      <h3 className="text-2xl font-poppins font-bold text-[#1A3D7C] mb-3">Math Homework Help</h3>
                      <p className="text-gray-600 mb-4">
                        From pre-algebra to AP Calculus. Step-by-step solutions for equations, word problems, proofs, and more.
                      </p>
                      <ul className="space-y-2 text-sm text-gray-600 mb-6">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                          Algebra & Pre-Algebra
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                          Geometry & Trigonometry
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                          Pre-Calculus & Calculus
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                          Statistics & Probability
                        </li>
                      </ul>
                      <div className="flex items-center text-[#1A3D7C] font-semibold group-hover:translate-x-2 transition-transform">
                        Get Math Help <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                {/* Science Card */}
                <Link href="/homework-help/science" className="group">
                  <Card className="h-full p-6 sm:p-8 hover:shadow-xl transition-all duration-300 border-0 bg-white group-hover:scale-[1.02]">
                    <CardContent className="p-0">
                      <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                        <FlaskConical className="w-8 h-8 text-[#2BAE66]" />
                      </div>
                      <h3 className="text-2xl font-poppins font-bold text-[#1A3D7C] mb-3">Science Homework Help</h3>
                      <p className="text-gray-600 mb-4">
                        Lab reports, problem sets, and concept explanations across all science disciplines.
                      </p>
                      <ul className="space-y-2 text-sm text-gray-600 mb-6">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                          Physics & Mechanics
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                          Chemistry & Reactions
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                          Biology & Life Sciences
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                          Earth & Environmental Science
                        </li>
                      </ul>
                      <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform">
                        Get Science Help <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                {/* English Card */}
                <Link href="/homework-help/english" className="group">
                  <Card className="h-full p-6 sm:p-8 hover:shadow-xl transition-all duration-300 border-0 bg-white group-hover:scale-[1.02]">
                    <CardContent className="p-0">
                      <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-200 transition-colors">
                        <PenTool className="w-8 h-8 text-[#FFC857]" />
                      </div>
                      <h3 className="text-2xl font-poppins font-bold text-[#1A3D7C] mb-3">English Homework Help</h3>
                      <p className="text-gray-600 mb-4">
                        Essay feedback, grammar checks, literature analysis, and reading comprehension support.
                      </p>
                      <ul className="space-y-2 text-sm text-gray-600 mb-6">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                          Essay Writing & Editing
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                          Grammar & Composition
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                          Literature Analysis
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                          Reading Comprehension
                        </li>
                      </ul>
                      <div className="flex items-center text-[#FFC857] font-semibold group-hover:translate-x-2 transition-transform">
                        Get English Help <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-16 sm:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  How Our Homework Help Works
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Get expert help in three simple steps. Fast, easy, and designed to help you learn.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Step 1 */}
                <div className="text-center relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Upload className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute top-10 right-0 hidden md:block">
                    <ArrowRight className="w-8 h-8 text-[#2BAE66]/30" />
                  </div>
                  <div className="text-sm font-bold text-[#2BAE66] mb-2">STEP 1</div>
                  <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-3">Submit Your Question</h3>
                  <p className="text-gray-600">
                    Upload a photo or type your homework question. Include any relevant details about your assignment.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="text-center relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#2BAE66] to-[#FFC857] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute top-10 right-0 hidden md:block">
                    <ArrowRight className="w-8 h-8 text-[#2BAE66]/30" />
                  </div>
                  <div className="text-sm font-bold text-[#2BAE66] mb-2">STEP 2</div>
                  <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-3">Expert Solves It</h3>
                  <p className="text-gray-600">
                    A qualified tutor reviews your question and creates a detailed, step-by-step solution with explanations.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#FFC857] to-[#1A3D7C] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Lightbulb className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-sm font-bold text-[#2BAE66] mb-2">STEP 3</div>
                  <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-3">Learn & Succeed</h3>
                  <p className="text-gray-600">
                    Receive your solution with clear explanations. Understand the method so you can solve similar problems yourself.
                  </p>
                </div>
              </div>

              <div className="text-center mt-12">
                <Link href="/homework-help/submit">
                  <Button
                    size="lg"
                    className="bg-[#1A3D7C] text-white rounded-xl px-8 py-6 hover:shadow-lg hover:bg-[#1A3D7C]/90 transition-all text-lg font-semibold"
                  >
                    Get Started Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Pricing Preview Section */}
          <section className="py-16 sm:py-20 bg-gradient-to-br from-[#F8FAFC] to-white">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  Transparent, Affordable Pricing
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Quality homework help that fits your budget. No hidden fees, no surprises.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
                {/* Single Question */}
                <Card className="p-6 sm:p-8 text-center border-2 border-gray-100 hover:border-[#2BAE66] transition-colors">
                  <CardContent className="p-0">
                    <div className="text-sm font-semibold text-[#2BAE66] mb-2">SINGLE QUESTION</div>
                    <div className="text-4xl font-poppins font-bold text-[#1A3D7C] mb-2">
                      $15<span className="text-lg text-gray-500 font-normal">+</span>
                    </div>
                    <p className="text-gray-600 mb-6">Starting price for simple homework questions</p>
                    <ul className="space-y-3 text-sm text-gray-600 text-left mb-6">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] flex-shrink-0" />
                        Step-by-step explanation
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] flex-shrink-0" />
                        48-hour delivery
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] flex-shrink-0" />
                        One revision included
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Problem Set */}
                <Card className="p-6 sm:p-8 text-center border-2 border-[#2BAE66] shadow-lg relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2BAE66] text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                  <CardContent className="p-0">
                    <div className="text-sm font-semibold text-[#2BAE66] mb-2">PROBLEM SET</div>
                    <div className="text-4xl font-poppins font-bold text-[#1A3D7C] mb-2">
                      $40<span className="text-lg text-gray-500 font-normal">-$80</span>
                    </div>
                    <p className="text-gray-600 mb-6">Multiple problems or complex assignments</p>
                    <ul className="space-y-3 text-sm text-gray-600 text-left mb-6">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] flex-shrink-0" />
                        3-10 problems included
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] flex-shrink-0" />
                        24-hour delivery
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] flex-shrink-0" />
                        Detailed explanations
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] flex-shrink-0" />
                        Two revisions included
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Live Help */}
                <Card className="p-6 sm:p-8 text-center border-2 border-gray-100 hover:border-[#FFC857] transition-colors">
                  <CardContent className="p-0">
                    <div className="text-sm font-semibold text-[#FFC857] mb-2">LIVE SESSION</div>
                    <div className="text-4xl font-poppins font-bold text-[#1A3D7C] mb-2">
                      $30<span className="text-lg text-gray-500 font-normal">/hr</span>
                    </div>
                    <p className="text-gray-600 mb-6">Real-time help via whiteboard</p>
                    <ul className="space-y-3 text-sm text-gray-600 text-left mb-6">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] flex-shrink-0" />
                        45-min sessions
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] flex-shrink-0" />
                        Interactive whiteboard
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] flex-shrink-0" />
                        Ask questions live
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] flex-shrink-0" />
                        Session recording
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-8">
                <p className="text-gray-600 mb-4">
                  <Zap className="w-4 h-4 inline text-[#FFC857]" /> Need it faster? Add <strong>$10</strong> for urgent 60-minute delivery
                </p>
                <Link href="/pricing" className="text-[#1A3D7C] font-semibold hover:underline">
                  View Full Pricing Details →
                </Link>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="py-16 sm:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  Why Parents & Students Trust Us
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  We're not just another homework help site. We're education partners committed to your child's success.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                <Card className="p-6 border-0 bg-gradient-to-br from-blue-50 to-white">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 bg-[#1A3D7C] rounded-xl flex items-center justify-center mb-4">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-2">U.S.-Certified Tutors</h3>
                    <p className="text-gray-600">
                      Every tutor is a verified educator or subject expert with experience teaching American curriculum standards.
                    </p>
                  </CardContent>
                </Card>

                <Card className="p-6 border-0 bg-gradient-to-br from-green-50 to-white">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 bg-[#2BAE66] rounded-xl flex items-center justify-center mb-4">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-2">Curriculum Aligned</h3>
                    <p className="text-gray-600">
                      Solutions follow Common Core, state standards, and AP guidelines so you learn exactly what's tested.
                    </p>
                  </CardContent>
                </Card>

                <Card className="p-6 border-0 bg-gradient-to-br from-yellow-50 to-white">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 bg-[#FFC857] rounded-xl flex items-center justify-center mb-4">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-2">Learn the Method</h3>
                    <p className="text-gray-600">
                      We explain the "why" behind every step. You don't just get answers — you understand how to solve problems yourself.
                    </p>
                  </CardContent>
                </Card>

                <Card className="p-6 border-0 bg-gradient-to-br from-purple-50 to-white">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-2">100% Original Work</h3>
                    <p className="text-gray-600">
                      Every solution is created fresh by our tutors. No plagiarism, no copied answers — guaranteed academic integrity.
                    </p>
                  </CardContent>
                </Card>

                <Card className="p-6 border-0 bg-gradient-to-br from-red-50 to-white">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mb-4">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-2">Fast Turnaround</h3>
                    <p className="text-gray-600">
                      Need help tonight? Get solutions in as fast as 60 minutes with our urgent delivery option.
                    </p>
                  </CardContent>
                </Card>

                <Card className="p-6 border-0 bg-gradient-to-br from-indigo-50 to-white">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-2">Follow-Up Support</h3>
                    <p className="text-gray-600">
                      Have questions about your solution? Our tutors are here to clarify until you fully understand.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Grade Coverage Section */}
          <section className="py-16 sm:py-20 bg-[#F8FAFC]">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  Homework Help for Every Grade
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  From 6th grade fundamentals to 12th grade AP courses — we've got you covered.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 max-w-5xl mx-auto">
                {[6, 7, 8, 9, 10, 11, 12].map((grade) => (
                  <Card key={grade} className="p-4 text-center hover:shadow-lg transition-all hover:scale-105 cursor-pointer border-2 border-transparent hover:border-[#2BAE66]">
                    <CardContent className="p-0">
                      <div className="text-3xl font-poppins font-bold text-[#1A3D7C]">{grade}</div>
                      <div className="text-sm text-gray-600">Grade</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-lg">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-poppins font-bold text-[#1A3D7C] mb-3">Middle School (Grades 6-8)</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                        Pre-Algebra & Algebra Basics
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                        Life & Physical Science
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                        Grammar & Essay Writing
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-poppins font-bold text-[#1A3D7C] mb-3">High School (Grades 9-12)</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                        Algebra II, Pre-Calc, Calculus
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                        Physics, Chemistry, Biology
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                        AP English & Literature
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16 sm:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  What Parents & Students Say
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Real stories from families who've experienced the difference.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-white">
                  <CardContent className="p-0">
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 text-[#FFC857] fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">
                      "My daughter was struggling with Algebra II. The step-by-step explanations helped her understand concepts she'd been confused about for months. Her grade went from a C to an A-!"
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#1A3D7C] rounded-full flex items-center justify-center text-white font-bold mr-3">
                        S
                      </div>
                      <div>
                        <div className="font-semibold text-[#1A3D7C]">Sarah M.</div>
                        <div className="text-sm text-gray-600">Parent, Texas</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-green-50 to-white">
                  <CardContent className="p-0">
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 text-[#FFC857] fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">
                      "I needed help with a chemistry lab report at 10pm. Got my solution back in under 2 hours with every calculation explained. Lifesaver!"
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#2BAE66] rounded-full flex items-center justify-center text-white font-bold mr-3">
                        J
                      </div>
                      <div>
                        <div className="font-semibold text-[#1A3D7C]">Jason T.</div>
                        <div className="text-sm text-gray-600">11th Grade, California</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-yellow-50 to-white">
                  <CardContent className="p-0">
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 text-[#FFC857] fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">
                      "As a working mom, I can't always help with homework. The Tutor Bridge gives my son the support he needs, and the tutors actually teach him — not just give answers."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#FFC857] rounded-full flex items-center justify-center text-white font-bold mr-3">
                        L
                      </div>
                      <div>
                        <div className="font-semibold text-[#1A3D7C]">Linda K.</div>
                        <div className="text-sm text-gray-600">Parent, Florida</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 sm:py-20 bg-[#F8FAFC]">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Everything you need to know about our homework help services.
                </p>
              </div>

              <div className="max-w-3xl mx-auto space-y-4">
                {[
                  {
                    question: "How does The Tutor Bridge homework help work?",
                    answer: "Simply upload your homework question or assignment through our submission form. Our expert tutors review your request and provide detailed, step-by-step explanations within your chosen timeframe (60 minutes, 24 hours, or 48 hours). You'll receive solutions that teach you the method, not just the answer."
                  },
                  {
                    question: "What subjects do you cover for homework help?",
                    answer: "We provide comprehensive homework help for Math (Algebra, Geometry, Pre-Calculus, Calculus, Statistics), Science (Physics, Chemistry, Biology, Earth Science), and English (Essay Writing, Grammar, Literature Analysis, Reading Comprehension) for grades 6-12."
                  },
                  {
                    question: "How much does homework help cost?",
                    answer: "Our homework help starts at $15 for simple questions. Pricing varies based on complexity and urgency. Multi-problem sets range from $40-80, and urgent delivery adds $10. We provide transparent quotes before you commit."
                  },
                  {
                    question: "Are your tutors qualified?",
                    answer: "Yes, all our tutors are U.S.-certified educators or subject matter experts with verified credentials. They have extensive experience teaching grades 6-12 and are familiar with Common Core standards, AP curriculum, and state-specific requirements."
                  },
                  {
                    question: "Is the homework help just giving answers?",
                    answer: "No. Our philosophy is 'We teach the method, not just the answer.' Every solution includes detailed step-by-step explanations, showing you exactly how to solve similar problems on your own. This helps you learn and succeed on tests."
                  },
                  {
                    question: "How fast can I get help?",
                    answer: "We offer three delivery options: Standard (48 hours), Priority (24 hours), and Urgent (60 minutes). Most students choose 24-hour delivery for regular homework, and urgent for last-minute assignments."
                  }
                ].map((faq, index) => (
                  <Card key={index} className="p-6 bg-white">
                    <CardContent className="p-0">
                      <h3 className="text-lg font-poppins font-bold text-[#1A3D7C] mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <Link href="/faq" className="text-[#1A3D7C] font-semibold hover:underline">
                  View All FAQs →
                </Link>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 sm:py-20 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white">
            <div className="container mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold mb-6">
                Ready to Get Homework Help?
              </h2>
              <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto opacity-90">
                Join thousands of students who've improved their grades with expert help. Submit your first question today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/homework-help/submit">
                  <Button
                    size="lg"
                    className="bg-[#FFC857] text-[#1A3D7C] rounded-xl px-8 py-6 hover:shadow-lg hover:bg-[#FFC857]/90 transition-all text-lg font-semibold w-full sm:w-auto"
                  >
                    Submit Your Homework Now
                  </Button>
                </Link>
                <Link href="/tutoring/free-consultation">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white rounded-xl px-8 py-6 hover:bg-white hover:text-[#1A3D7C] transition-all text-lg font-semibold w-full sm:w-auto"
                  >
                    Book Free Consultation
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#FFC857]" />
                  <span>Satisfaction Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#FFC857]" />
                  <span>Expert Tutors</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#FFC857]" />
                  <span>Fast Turnaround</span>
                </div>
              </div>
            </div>
          </section>

          {/* Tutoring Upsell Section */}
          <section className="py-16 sm:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#F8FAFC] to-white rounded-2xl p-8 sm:p-12 border-2 border-[#2BAE66]/20">
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-[#1A3D7C] mb-4">
                    Need Ongoing Support?
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Homework help is great for quick fixes. But for lasting improvement, our weekly tutoring programs help students build confidence and master subjects over time.
                  </p>
                </div>
                <div className="grid sm:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#1A3D7C]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-[#1A3D7C]" />
                    </div>
                    <h3 className="font-semibold text-[#1A3D7C] mb-1">1-on-1 Sessions</h3>
                    <p className="text-sm text-gray-600">Personalized attention</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#2BAE66]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="w-6 h-6 text-[#2BAE66]" />
                    </div>
                    <h3 className="font-semibold text-[#1A3D7C] mb-1">Custom Plans</h3>
                    <p className="text-sm text-gray-600">Tailored to your goals</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#FFC857]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="w-6 h-6 text-[#FFC857]" />
                    </div>
                    <h3 className="font-semibold text-[#1A3D7C] mb-1">Grade Guarantee</h3>
                    <p className="text-sm text-gray-600">See real improvement</p>
                  </div>
                </div>
                <div className="text-center">
                  <Link href="/tutoring">
                    <Button
                      size="lg"
                      className="bg-[#2BAE66] text-white rounded-xl px-8 py-4 hover:shadow-lg hover:bg-[#2BAE66]/90 transition-all font-semibold"
                    >
                      Explore Tutoring Programs
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Image src="/TheTutorBridge Logo New.png" width={32} height={32} alt="The Tutor Bridge Logo" className="h-8 w-8" />
                  <span className="text-xl font-bold">The Tutor Bridge</span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Expert homework help and tutoring for grades 6-12. We teach the method, not just the answer.
                </p>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/company/thetutorbridge/" className="text-gray-400 hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-4">Homework Help</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/homework-help/math" className="hover:text-white transition-colors">
                      Math Help
                    </Link>
                  </li>
                  <li>
                    <Link href="/homework-help/science" className="hover:text-white transition-colors">
                      Science Help
                    </Link>
                  </li>
                  <li>
                    <Link href="/homework-help/english" className="hover:text-white transition-colors">
                      English Help
                    </Link>
                  </li>
                  <li>
                    <Link href="/homework-help/submit" className="hover:text-white transition-colors">
                      Submit Homework
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Tutoring</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/tutoring" className="hover:text-white transition-colors">
                      Tutoring Programs
                    </Link>
                  </li>
                  <li>
                    <Link href="/tutoring/free-consultation" className="hover:text-white transition-colors">
                      Free Consultation
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="hover:text-white transition-colors">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/about" className="hover:text-white transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/how-it-works" className="hover:text-white transition-colors">
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="hover:text-white transition-colors">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
              <p>
                © {new Date().getFullYear()} The Tutor Bridge. All rights reserved. | Helping students succeed since 2020
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
