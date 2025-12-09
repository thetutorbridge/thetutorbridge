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
  Calculator,
  FlaskConical,
  PenTool,
  Users,
  Shield,
  Award,
  Zap,
  GraduationCap,
  Target,
  Calendar,
  Video,
  MessageSquare,
  TrendingUp,
  BadgeCheck,
  Heart
} from "lucide-react"

export const metadata: Metadata = {
  title: "Online Tutoring for Grades 6-12 | Math, Science & English | The Tutor Bridge",
  description: "Expert 1-on-1 online tutoring for middle school and high school students. Weekly sessions in Math, Science, and English with U.S.-certified tutors. Free consultation available.",
  keywords: [
    "online tutoring",
    "math tutor",
    "science tutor",
    "english tutor",
    "online tutor",
    "private tutor",
    "1 on 1 tutoring",
    "weekly tutoring",
    "homework tutor",
    "high school tutor",
    "middle school tutor",
    "AP tutor",
    "algebra tutor",
    "chemistry tutor",
    "physics tutor",
    "biology tutor",
    "writing tutor",
    "test prep tutor",
    "grade 6 tutor",
    "grade 7 tutor",
    "grade 8 tutor",
    "grade 9 tutor",
    "grade 10 tutor",
    "grade 11 tutor",
    "grade 12 tutor"
  ],
  alternates: {
    canonical: "https://www.thetutorbridge.com/tutoring",
  },
  openGraph: {
    title: "Online Tutoring for Grades 6-12 | Math, Science & English",
    description: "Expert 1-on-1 online tutoring with U.S.-certified tutors. Free consultation available.",
    url: "https://www.thetutorbridge.com/tutoring",
    siteName: "The Tutor Bridge",
    type: "website",
  }
}

// JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "The Tutor Bridge",
  "description": "Expert online tutoring services for grades 6-12 in Math, Science, and English",
  "url": "https://www.thetutorbridge.com/tutoring",
  "offers": {
    "@type": "Offer",
    "name": "Weekly Tutoring Programs",
    "description": "1-on-1 online tutoring sessions with expert tutors",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "price": "120",
      "priceCurrency": "USD",
      "unitText": "per month"
    }
  }
}

export default function Tutoring() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
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
                  1-on-1 Online Tutoring for Grades 6-12
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
                  Expert tutors who don't just help with homework — they build lasting understanding, confidence, and better grades.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Link href="/tutoring/free-consultation">
                    <Button
                      size="lg"
                      className="bg-[#1A3D7C] text-white rounded-xl px-8 py-4 hover:bg-[#1A3D7C]/90 transition-all font-semibold w-full sm:w-auto"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Book Free Consultation
                    </Button>
                  </Link>
                  <Link href="/homework-help">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-[#1A3D7C] text-[#1A3D7C] rounded-xl px-8 py-4 hover:bg-[#1A3D7C] hover:text-white transition-all font-semibold w-full sm:w-auto"
                    >
                      Need Quick Homework Help?
                    </Button>
                  </Link>
                </div>

                {/* Quick Stats */}
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                    <span>U.S.-Certified Tutors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                    <span>Flexible Scheduling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                    <span>Free Trial Session</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Tutoring vs Homework Help */}
          <section className="py-16 sm:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  Why Weekly Tutoring?
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Homework help fixes today's problem. Tutoring builds lasting skills for ongoing success.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Homework Help */}
                <Card className="p-6 sm:p-8 border-2 border-gray-200">
                  <CardContent className="p-0">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-8 h-8 text-gray-500" />
                      </div>
                      <h3 className="text-xl font-poppins font-bold text-gray-700">Homework Help</h3>
                      <p className="text-sm text-gray-500 mt-1">Best for occasional questions</p>
                    </div>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-gray-400" />
                        Quick answers to specific questions
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-gray-400" />
                        Pay per task
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-gray-400" />
                        No ongoing relationship
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-gray-400" />
                        Reactive support
                      </li>
                    </ul>
                    <Link href="/homework-help" className="block mt-6">
                      <Button variant="outline" className="w-full">
                        Explore Homework Help
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Weekly Tutoring */}
                <Card className="p-6 sm:p-8 border-2 border-[#2BAE66] relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2BAE66] text-white text-xs font-bold px-4 py-1 rounded-full">
                    RECOMMENDED
                  </div>
                  <CardContent className="p-0">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-[#2BAE66]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-[#2BAE66]" />
                      </div>
                      <h3 className="text-xl font-poppins font-bold text-[#1A3D7C]">Weekly Tutoring</h3>
                      <p className="text-sm text-[#2BAE66] mt-1">Best for lasting improvement</p>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                        <strong>Deep understanding</strong> of concepts
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                        <strong>Same tutor</strong> who knows your child
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                        <strong>Proactive</strong> test prep & review
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                        <strong>Track progress</strong> over time
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                        <strong>Build confidence</strong> & study skills
                      </li>
                    </ul>
                    <Link href="/tutoring/free-consultation" className="block mt-6">
                      <Button className="w-full bg-[#2BAE66] hover:bg-[#2BAE66]/90">
                        Book Free Consultation
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Subject Cards Section */}
          <section className="py-16 sm:py-20 bg-[#F8FAFC]">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  Tutoring by Subject
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Expert tutors for every core subject, grades 6-12. All aligned with Common Core and AP standards.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
                {/* Math Tutoring */}
                <Link href="/tutoring/math" className="group">
                  <Card className="h-full p-6 sm:p-8 hover:shadow-xl transition-all duration-300 border-0 bg-white group-hover:scale-[1.02]">
                    <CardContent className="p-0">
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                        <Calculator className="w-8 h-8 text-[#1A3D7C]" />
                      </div>
                      <h3 className="text-2xl font-poppins font-bold text-[#1A3D7C] mb-3">Math Tutoring</h3>
                      <p className="text-gray-600 mb-4">
                        From pre-algebra to AP Calculus. Build problem-solving skills that last.
                      </p>
                      <ul className="space-y-2 text-sm text-gray-600 mb-6">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                          Algebra 1 & 2
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                          Geometry & Trigonometry
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                          Pre-Calc & Calculus
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                          AP Math Courses
                        </li>
                      </ul>
                      <div className="flex items-center text-[#1A3D7C] font-semibold group-hover:translate-x-2 transition-transform">
                        Learn More <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                {/* Science Tutoring */}
                <Link href="/tutoring/science" className="group">
                  <Card className="h-full p-6 sm:p-8 hover:shadow-xl transition-all duration-300 border-0 bg-white group-hover:scale-[1.02]">
                    <CardContent className="p-0">
                      <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                        <FlaskConical className="w-8 h-8 text-[#2BAE66]" />
                      </div>
                      <h3 className="text-2xl font-poppins font-bold text-[#1A3D7C] mb-3">Science Tutoring</h3>
                      <p className="text-gray-600 mb-4">
                        Master scientific concepts and lab skills across all disciplines.
                      </p>
                      <ul className="space-y-2 text-sm text-gray-600 mb-6">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                          Physics & Mechanics
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                          Chemistry
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                          Biology & Life Science
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                          AP Science Courses
                        </li>
                      </ul>
                      <div className="flex items-center text-[#2BAE66] font-semibold group-hover:translate-x-2 transition-transform">
                        Learn More <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                {/* English Tutoring */}
                <Link href="/tutoring/english" className="group">
                  <Card className="h-full p-6 sm:p-8 hover:shadow-xl transition-all duration-300 border-0 bg-white group-hover:scale-[1.02]">
                    <CardContent className="p-0">
                      <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-200 transition-colors">
                        <PenTool className="w-8 h-8 text-[#FFC857]" />
                      </div>
                      <h3 className="text-2xl font-poppins font-bold text-[#1A3D7C] mb-3">English Tutoring</h3>
                      <p className="text-gray-600 mb-4">
                        Develop strong writing and analytical reading skills.
                      </p>
                      <ul className="space-y-2 text-sm text-gray-600 mb-6">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                          Essay Writing
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                          Grammar & Mechanics
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                          Literature Analysis
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2BAE66]" />
                          AP English Courses
                        </li>
                      </ul>
                      <div className="flex items-center text-[#FFC857] font-semibold group-hover:translate-x-2 transition-transform">
                        Learn More <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-16 sm:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  How Our Tutoring Works
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Getting started is easy. We match you with the perfect tutor for your child's needs.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#1A3D7C] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    1
                  </div>
                  <h3 className="font-poppins font-bold text-[#1A3D7C] mb-2">Free Consultation</h3>
                  <p className="text-gray-600 text-sm">
                    Tell us about your child's needs, goals, and schedule.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-[#2BAE66] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    2
                  </div>
                  <h3 className="font-poppins font-bold text-[#1A3D7C] mb-2">Tutor Matching</h3>
                  <p className="text-gray-600 text-sm">
                    We match you with an expert tutor who fits your student's learning style.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-[#FFC857] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    3
                  </div>
                  <h3 className="font-poppins font-bold text-[#1A3D7C] mb-2">Trial Session</h3>
                  <p className="text-gray-600 text-sm">
                    Meet your tutor in a free trial session to ensure it's a good fit.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-[#1A3D7C] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    4
                  </div>
                  <h3 className="font-poppins font-bold text-[#1A3D7C] mb-2">Weekly Sessions</h3>
                  <p className="text-gray-600 text-sm">
                    Begin regular sessions and watch your child's confidence grow.
                  </p>
                </div>
              </div>

              <div className="text-center mt-12">
                <Link href="/tutoring/free-consultation">
                  <Button
                    size="lg"
                    className="bg-[#1A3D7C] text-white rounded-xl px-8 py-6 text-lg font-semibold"
                  >
                    Start With Free Consultation
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Pricing Preview */}
          <section className="py-16 sm:py-20 bg-[#F8FAFC]">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  Tutoring Packages
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Flexible plans that fit your schedule and budget. All packages include session recordings and progress reports.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
                {/* Starter Package */}
                <Card className="p-6 sm:p-8 text-center border-2 border-gray-100">
                  <CardContent className="p-0">
                    <div className="text-sm font-semibold text-gray-500 mb-2">STARTER</div>
                    <div className="text-4xl font-poppins font-bold text-[#1A3D7C] mb-1">
                      $120<span className="text-lg text-gray-500 font-normal">/mo</span>
                    </div>
                    <p className="text-gray-600 mb-6">4 sessions per month</p>
                    <ul className="space-y-3 text-sm text-gray-600 text-left mb-6">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] flex-shrink-0" />
                        1 session per week (45 min)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] flex-shrink-0" />
                        1 subject
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] flex-shrink-0" />
                        Session recordings
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] flex-shrink-0" />
                        Monthly progress report
                      </li>
                    </ul>
                    <Link href="/tutoring/free-consultation">
                      <Button variant="outline" className="w-full">Get Started</Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Standard Package */}
                <Card className="p-6 sm:p-8 text-center border-2 border-[#2BAE66] relative shadow-lg">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2BAE66] text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                  <CardContent className="p-0">
                    <div className="text-sm font-semibold text-[#2BAE66] mb-2">STANDARD</div>
                    <div className="text-4xl font-poppins font-bold text-[#1A3D7C] mb-1">
                      $200<span className="text-lg text-gray-500 font-normal">/mo</span>
                    </div>
                    <p className="text-gray-600 mb-6">8 sessions per month</p>
                    <ul className="space-y-3 text-sm text-gray-600 text-left mb-6">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] flex-shrink-0" />
                        2 sessions per week (45 min)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] flex-shrink-0" />
                        1-2 subjects
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] flex-shrink-0" />
                        Session recordings
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] flex-shrink-0" />
                        Weekly progress updates
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] flex-shrink-0" />
                        Priority scheduling
                      </li>
                    </ul>
                    <Link href="/tutoring/free-consultation">
                      <Button className="w-full bg-[#2BAE66] hover:bg-[#2BAE66]/90">Get Started</Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Premium Package */}
                <Card className="p-6 sm:p-8 text-center border-2 border-gray-100">
                  <CardContent className="p-0">
                    <div className="text-sm font-semibold text-[#FFC857] mb-2">PREMIUM</div>
                    <div className="text-4xl font-poppins font-bold text-[#1A3D7C] mb-1">
                      $350<span className="text-lg text-gray-500 font-normal">/mo</span>
                    </div>
                    <p className="text-gray-600 mb-6">12 sessions per month</p>
                    <ul className="space-y-3 text-sm text-gray-600 text-left mb-6">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] flex-shrink-0" />
                        3 sessions per week (45 min)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] flex-shrink-0" />
                        Multiple subjects
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] flex-shrink-0" />
                        Session recordings
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] flex-shrink-0" />
                        Dedicated tutor team
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] flex-shrink-0" />
                        24/7 homework help included
                      </li>
                    </ul>
                    <Link href="/tutoring/free-consultation">
                      <Button variant="outline" className="w-full">Get Started</Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-8">
                <Link href="/pricing" className="text-[#1A3D7C] font-semibold hover:underline">
                  View Full Pricing Details →
                </Link>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-16 sm:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  What Parents Say
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-white">
                  <CardContent className="p-0">
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 text-[#FFC857] fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">
                      "After just two months of weekly tutoring, my daughter went from a C to an A in Algebra. The consistency and the relationship with her tutor made all the difference."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#1A3D7C] rounded-full flex items-center justify-center text-white font-bold mr-3">
                        J
                      </div>
                      <div>
                        <div className="font-semibold text-[#1A3D7C]">Jennifer M.</div>
                        <div className="text-sm text-gray-600">Parent, California</div>
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
                      "The tutor doesn't just help with homework — she's teaching my son how to study and think through problems. His confidence has skyrocketed."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#2BAE66] rounded-full flex items-center justify-center text-white font-bold mr-3">
                        R
                      </div>
                      <div>
                        <div className="font-semibold text-[#1A3D7C]">Robert T.</div>
                        <div className="text-sm text-gray-600">Parent, Texas</div>
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
                      "The flexibility is amazing. We can reschedule when needed, and the session recordings let us review concepts later. Worth every penny."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#FFC857] rounded-full flex items-center justify-center text-white font-bold mr-3">
                        A
                      </div>
                      <div>
                        <div className="font-semibold text-[#1A3D7C]">Amanda K.</div>
                        <div className="text-sm text-gray-600">Parent, Florida</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 sm:py-20 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white">
            <div className="container mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold mb-6">
                Ready to See Your Child Succeed?
              </h2>
              <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto opacity-90">
                Book a free consultation today. We'll discuss your child's needs and match them with the perfect tutor.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tutoring/free-consultation">
                  <Button
                    size="lg"
                    className="bg-[#FFC857] text-[#1A3D7C] rounded-xl px-8 py-6 hover:shadow-lg hover:bg-[#FFC857]/90 transition-all text-lg font-semibold w-full sm:w-auto"
                  >
                    Book Free Consultation
                  </Button>
                </Link>
                <Link href="/homework-help">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white rounded-xl px-8 py-6 hover:bg-white hover:text-[#1A3D7C] transition-all text-lg font-semibold w-full sm:w-auto"
                  >
                    Or Get Quick Homework Help
                  </Button>
                </Link>
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
              </div>
              <div>
                <h4 className="font-bold mb-4">Homework Help</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/homework-help/math" className="hover:text-white transition-colors">Math Help</Link></li>
                  <li><Link href="/homework-help/science" className="hover:text-white transition-colors">Science Help</Link></li>
                  <li><Link href="/homework-help/english" className="hover:text-white transition-colors">English Help</Link></li>
                  <li><Link href="/homework-help/submit" className="hover:text-white transition-colors">Submit Homework</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Tutoring</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/tutoring" className="hover:text-white transition-colors">Tutoring Programs</Link></li>
                  <li><Link href="/tutoring/free-consultation" className="hover:text-white transition-colors">Free Consultation</Link></li>
                  <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                  <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
              <p>© {new Date().getFullYear()} The Tutor Bridge. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
