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
  ChevronRight,
  Users,
  Target,
  Calendar,
  Shield,
  GraduationCap,
  TrendingUp,
  Award,
  BookOpen,
  Zap,
  HelpCircle,
  MessageSquare,
  FileText
} from "lucide-react"

export const metadata: Metadata = {
  title: "Pricing | Homework Help & Tutoring Plans | The Tutor Bridge",
  description: "Affordable homework help starting at $15. Weekly tutoring packages from $120/month. No contracts, satisfaction guaranteed. See our transparent pricing for Math, Science & English.",
  keywords: [
    "tutoring prices",
    "homework help cost",
    "online tutoring rates",
    "affordable tutoring",
    "math tutor cost",
    "science tutor pricing",
    "english tutoring rates",
    "tutoring packages",
    "homework help pricing"
  ],
  alternates: {
    canonical: "https://www.thetutorbridge.com/pricing",
  },
  openGraph: {
    title: "Pricing | Homework Help & Tutoring Plans",
    description: "Affordable homework help from $15. Tutoring packages from $120/month. Transparent pricing, no hidden fees.",
    url: "https://www.thetutorbridge.com/pricing",
    siteName: "The Tutor Bridge",
    type: "website",
  }
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Pricing - The Tutor Bridge",
  description: "Transparent pricing for homework help and tutoring services",
  provider: {
    "@type": "EducationalOrganization",
    name: "The Tutor Bridge",
    url: "https://www.thetutorbridge.com"
  }
}

export default function Pricing() {
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
              <span className="text-[#1A3D7C] font-medium">Pricing</span>
            </nav>
          </div>
        </div>

        {/* Hero Section - Subtle & Center Aligned */}
        <section className="relative py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] leading-tight mb-4">
                Simple, Affordable Pricing
              </h1>

              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
                From quick homework help to comprehensive tutoring—choose the option that fits your needs and budget. No contracts required.
              </p>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                  <span>No long-term contracts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                  <span>Satisfaction guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Homework Help Pricing */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-[#1A3D7C] px-4 py-2 rounded-full mb-4">
                <FileText className="w-5 h-5" />
                <span className="text-sm font-semibold">ON-DEMAND SERVICE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                Homework Help Pricing
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Submit your homework, get a custom quote, and receive expert help within your deadline. Pay only for what you need.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              {/* Pricing Table */}
              <Card className="overflow-hidden shadow-lg mb-8">
                <div className="bg-[#1A3D7C] text-white p-4 text-center">
                  <h3 className="font-poppins font-bold text-lg">Homework Help Price Guide</h3>
                  <p className="text-sm text-white/80">Prices vary by complexity, length, and deadline</p>
                </div>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Task Type</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Standard (48-72hrs)</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Rush (24-48hrs)</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Urgent (&lt;24hrs)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-800">Single Problem</div>
                            <div className="text-sm text-gray-500">Math equation, short answer</div>
                          </td>
                          <td className="px-6 py-4 text-center text-[#1A3D7C] font-semibold">$15-25</td>
                          <td className="px-6 py-4 text-center text-[#1A3D7C] font-semibold">$20-35</td>
                          <td className="px-6 py-4 text-center text-[#1A3D7C] font-semibold">$30-50</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-800">Problem Set (5-10)</div>
                            <div className="text-sm text-gray-500">Homework worksheet, practice problems</div>
                          </td>
                          <td className="px-6 py-4 text-center text-[#1A3D7C] font-semibold">$35-60</td>
                          <td className="px-6 py-4 text-center text-[#1A3D7C] font-semibold">$50-80</td>
                          <td className="px-6 py-4 text-center text-[#1A3D7C] font-semibold">$70-100</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-800">Essay Review</div>
                            <div className="text-sm text-gray-500">Feedback, editing, structure help</div>
                          </td>
                          <td className="px-6 py-4 text-center text-[#1A3D7C] font-semibold">$40-75</td>
                          <td className="px-6 py-4 text-center text-[#1A3D7C] font-semibold">$60-100</td>
                          <td className="px-6 py-4 text-center text-[#1A3D7C] font-semibold">$80-130</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-800">Lab Report</div>
                            <div className="text-sm text-gray-500">Science lab analysis & write-up</div>
                          </td>
                          <td className="px-6 py-4 text-center text-[#1A3D7C] font-semibold">$50-90</td>
                          <td className="px-6 py-4 text-center text-[#1A3D7C] font-semibold">$75-120</td>
                          <td className="px-6 py-4 text-center text-[#1A3D7C] font-semibold">$100-150</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-800">Full Assignment</div>
                            <div className="text-sm text-gray-500">Complete project or chapter</div>
                          </td>
                          <td className="px-6 py-4 text-center text-[#1A3D7C] font-semibold">$75-150+</td>
                          <td className="px-6 py-4 text-center text-[#1A3D7C] font-semibold">$100-200+</td>
                          <td className="px-6 py-4 text-center text-[#1A3D7C] font-semibold">$150-300+</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="p-6 bg-green-50 border-[#2BAE66]">
                  <CardContent className="p-0">
                    <h4 className="font-poppins font-bold text-[#2BAE66] mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      What's Included
                    </h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] mt-0.5" />
                        <span>Step-by-step explanations (not just answers)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] mt-0.5" />
                        <span>Follow-up questions within 24 hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] mt-0.5" />
                        <span>Revision if you're not satisfied</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2BAE66] mt-0.5" />
                        <span>Tips to help learn the concept</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="p-6 bg-blue-50 border-[#1A3D7C]">
                  <CardContent className="p-0">
                    <h4 className="font-poppins font-bold text-[#1A3D7C] mb-3 flex items-center gap-2">
                      <HelpCircle className="w-5 h-5" />
                      How It Works
                    </h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
                        <span>Submit your homework with deadline</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
                        <span>Receive a custom quote within 2 hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
                        <span>Approve and pay—we get started immediately</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">4</span>
                        <span>Receive solution with full explanations</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Link href="/homework-help/submit">
                  <Button size="lg" className="bg-[#2BAE66] hover:bg-[#2BAE66]/90 px-8 py-6 text-lg font-semibold">
                    <FileText className="w-5 h-5 mr-2" />
                    Submit Homework for Quote
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Tutoring Packages */}
        <section className="py-16 sm:py-20 bg-[#F8FAFC]">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-green-100 text-[#2BAE66] px-4 py-2 rounded-full mb-4">
                <GraduationCap className="w-5 h-5" />
                <span className="text-sm font-semibold">WEEKLY TUTORING</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                Tutoring Packages
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Consistent weekly sessions with the same expert tutor. Build a relationship, track progress, and achieve lasting improvement.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
              {/* Starter Package */}
              <Card className="p-6 border-2 border-gray-200 hover:border-[#1A3D7C] transition-all">
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <h3 className="font-poppins font-bold text-gray-500 text-sm mb-2">STARTER</h3>
                    <div className="text-4xl font-poppins font-bold text-[#1A3D7C] mb-1">$120</div>
                    <div className="text-gray-500">per month</div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6 text-center">
                    <div className="text-2xl font-bold text-[#1A3D7C]">4 Sessions</div>
                    <div className="text-sm text-gray-600">1 hour each • 1x/week</div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] shrink-0" />
                      <span className="text-gray-700">Same dedicated tutor</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] shrink-0" />
                      <span className="text-gray-700">Personalized lesson plans</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] shrink-0" />
                      <span className="text-gray-700">Progress reports</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] shrink-0" />
                      <span className="text-gray-700">Email support</span>
                    </li>
                  </ul>

                  <div className="text-center text-sm text-gray-500 mb-4">
                    $30 per session
                  </div>

                  <Link href="/tutoring/free-consultation" className="block">
                    <Button variant="outline" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Standard Package - Most Popular */}
              <Card className="p-6 border-2 border-[#2BAE66] relative transform md:scale-105 shadow-xl">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#2BAE66] text-white text-xs font-bold px-4 py-1.5 rounded-full">
                  MOST POPULAR
                </div>
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <h3 className="font-poppins font-bold text-[#2BAE66] text-sm mb-2">STANDARD</h3>
                    <div className="text-4xl font-poppins font-bold text-[#1A3D7C] mb-1">$200</div>
                    <div className="text-gray-500">per month</div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 mb-6 text-center">
                    <div className="text-2xl font-bold text-[#2BAE66]">8 Sessions</div>
                    <div className="text-sm text-gray-600">1 hour each • 2x/week</div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] shrink-0" />
                      <span className="text-gray-700">Same dedicated tutor</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] shrink-0" />
                      <span className="text-gray-700">Personalized lesson plans</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] shrink-0" />
                      <span className="text-gray-700">Weekly progress reports</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] shrink-0" />
                      <span className="text-gray-700">Priority email & chat support</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] shrink-0" />
                      <span className="text-gray-700">Parent-tutor check-ins</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] shrink-0" />
                      <span className="text-gray-700">Free homework help between sessions</span>
                    </li>
                  </ul>

                  <div className="text-center text-sm text-[#2BAE66] font-semibold mb-4">
                    $25 per session • Save $40/mo
                  </div>

                  <Link href="/tutoring/free-consultation" className="block">
                    <Button className="w-full bg-[#2BAE66] hover:bg-[#2BAE66]/90">
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Premium Package */}
              <Card className="p-6 border-2 border-gray-200 hover:border-[#1A3D7C] transition-all">
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <h3 className="font-poppins font-bold text-[#FFC857] text-sm mb-2">PREMIUM</h3>
                    <div className="text-4xl font-poppins font-bold text-[#1A3D7C] mb-1">$350</div>
                    <div className="text-gray-500">per month</div>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-4 mb-6 text-center">
                    <div className="text-2xl font-bold text-[#FFC857]">12 Sessions</div>
                    <div className="text-sm text-gray-600">1 hour each • 3x/week</div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] shrink-0" />
                      <span className="text-gray-700">Everything in Standard, plus:</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] shrink-0" />
                      <span className="text-gray-700">Senior/master-level tutor</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] shrink-0" />
                      <span className="text-gray-700">Test prep materials included</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] shrink-0" />
                      <span className="text-gray-700">24/7 homework support</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66] shrink-0" />
                      <span className="text-gray-700">Monthly parent consultations</span>
                    </li>
                  </ul>

                  <div className="text-center text-sm text-[#FFC857] font-semibold mb-4">
                    $29 per session • Best for intensive prep
                  </div>

                  <Link href="/tutoring/free-consultation" className="block">
                    <Button variant="outline" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* All packages include */}
            <div className="max-w-4xl mx-auto">
              <Card className="p-6 sm:p-8 bg-gradient-to-r from-[#1A3D7C] to-[#1A3D7C]/90 text-white">
                <CardContent className="p-0">
                  <h3 className="font-poppins font-bold text-xl text-center mb-6">
                    All Tutoring Packages Include
                  </h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Users className="w-6 h-6 text-[#FFC857]" />
                      </div>
                      <div className="text-sm">Same Tutor Every Session</div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Calendar className="w-6 h-6 text-[#FFC857]" />
                      </div>
                      <div className="text-sm">Flexible Rescheduling</div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Shield className="w-6 h-6 text-[#FFC857]" />
                      </div>
                      <div className="text-sm">Satisfaction Guarantee</div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Zap className="w-6 h-6 text-[#FFC857]" />
                      </div>
                      <div className="text-sm">Cancel Anytime</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Multi-Subject Discount */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="p-6 sm:p-8 border-2 border-dashed border-[#FFC857] bg-yellow-50/50">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-20 h-20 bg-[#FFC857] rounded-full flex items-center justify-center shrink-0">
                      <Star className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-center md:text-left flex-1">
                      <h3 className="font-poppins font-bold text-[#1A3D7C] text-xl mb-2">
                        Multi-Subject Discount
                      </h3>
                      <p className="text-gray-700 mb-4">
                        Need help in more than one subject? Get <strong>10% off</strong> when you sign up for tutoring in 2+ subjects, or <strong>15% off</strong> for 3+ subjects.
                      </p>
                      <Link href="/tutoring/free-consultation">
                        <Button className="bg-[#FFC857] text-[#1A3D7C] hover:bg-[#FFC857]/90">
                          Ask About Discounts
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 sm:py-20 bg-[#F8FAFC]">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                Homework Help vs. Tutoring
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Not sure which option is right for you? Here's a quick comparison.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden shadow-lg">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 bg-gray-50">Feature</th>
                          <th className="px-6 py-4 text-center bg-blue-50">
                            <div className="text-[#1A3D7C] font-bold">Homework Help</div>
                            <div className="text-xs text-gray-500 font-normal">Pay-per-task</div>
                          </th>
                          <th className="px-6 py-4 text-center bg-green-50">
                            <div className="text-[#2BAE66] font-bold">Tutoring</div>
                            <div className="text-xs text-gray-500 font-normal">Monthly subscription</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 text-gray-700">Best for</td>
                          <td className="px-6 py-4 text-center text-sm">Quick help on specific assignments</td>
                          <td className="px-6 py-4 text-center text-sm">Long-term improvement & grade boost</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-6 py-4 text-gray-700">Same tutor</td>
                          <td className="px-6 py-4 text-center"><span className="text-gray-400">—</span></td>
                          <td className="px-6 py-4 text-center"><CheckCircle className="w-5 h-5 text-[#2BAE66] mx-auto" /></td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-gray-700">Live sessions</td>
                          <td className="px-6 py-4 text-center"><span className="text-gray-400">—</span></td>
                          <td className="px-6 py-4 text-center"><CheckCircle className="w-5 h-5 text-[#2BAE66] mx-auto" /></td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-6 py-4 text-gray-700">Step-by-step explanations</td>
                          <td className="px-6 py-4 text-center"><CheckCircle className="w-5 h-5 text-[#2BAE66] mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><CheckCircle className="w-5 h-5 text-[#2BAE66] mx-auto" /></td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-gray-700">Progress tracking</td>
                          <td className="px-6 py-4 text-center"><span className="text-gray-400">—</span></td>
                          <td className="px-6 py-4 text-center"><CheckCircle className="w-5 h-5 text-[#2BAE66] mx-auto" /></td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-6 py-4 text-gray-700">Curriculum-aligned lessons</td>
                          <td className="px-6 py-4 text-center"><span className="text-gray-400">—</span></td>
                          <td className="px-6 py-4 text-center"><CheckCircle className="w-5 h-5 text-[#2BAE66] mx-auto" /></td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-gray-700">Commitment</td>
                          <td className="px-6 py-4 text-center text-sm">None—pay as you go</td>
                          <td className="px-6 py-4 text-center text-sm">Month-to-month (cancel anytime)</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-6 py-4 text-gray-700">Starting price</td>
                          <td className="px-6 py-4 text-center font-bold text-[#1A3D7C]">$15</td>
                          <td className="px-6 py-4 text-center font-bold text-[#2BAE66]">$120/mo</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] text-center mb-12">
              Pricing FAQs
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "Are there any hidden fees?",
                  a: "No hidden fees, ever. The price you see is the price you pay. Homework help prices are quoted upfront before you commit, and tutoring packages are billed monthly with no signup fees."
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept all major credit cards (Visa, Mastercard, Amex, Discover), PayPal, and bank transfers. Tutoring packages can be set up for automatic monthly billing."
                },
                {
                  q: "Can I get a refund if I'm not satisfied?",
                  a: "Yes! For homework help, if you're not satisfied with the quality, we'll revise it for free or provide a full refund. For tutoring, you can cancel anytime with no penalties, and we'll refund unused sessions."
                },
                {
                  q: "Do you offer sibling discounts?",
                  a: "Yes! Get 10% off for a second child enrolled in tutoring, and 15% off for three or more children. Contact us to set up a family plan."
                },
                {
                  q: "Can I switch between packages?",
                  a: "Absolutely. You can upgrade or downgrade your tutoring package at any time. Changes take effect at the start of your next billing cycle."
                },
                {
                  q: "What if I need to cancel a session?",
                  a: "Sessions can be rescheduled up to 24 hours in advance at no charge. Last-minute cancellations (less than 24 hours) will count toward your monthly sessions."
                },
                {
                  q: "Is there a free trial?",
                  a: "We offer a free 20-minute consultation to discuss your needs and match you with a tutor. Many tutors also offer a discounted trial session so you can make sure it's a good fit."
                }
              ].map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-poppins font-semibold text-[#1A3D7C] mb-2">{faq.q}</h3>
                    <p className="text-gray-700">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Book a free consultation to discuss your child's needs and find the perfect plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tutoring/free-consultation">
                <Button size="lg" className="bg-[#FFC857] text-[#1A3D7C] rounded-xl px-8 py-6 text-lg font-semibold hover:bg-[#FFC857]/90">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Free Consultation
                </Button>
              </Link>
              <Link href="/homework-help/submit">
                <Button size="lg" variant="outline" className="border-2 border-white text-white rounded-xl px-8 py-6 text-lg font-semibold hover:bg-white hover:text-[#1A3D7C]">
                  Submit Homework Now
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
              <p className="text-gray-400">Expert homework help and tutoring for grades 6-12.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Homework Help</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/homework-help/math" className="hover:text-white">Math Help</Link></li>
                <li><Link href="/homework-help/science" className="hover:text-white">Science Help</Link></li>
                <li><Link href="/homework-help/english" className="hover:text-white">English Help</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Tutoring</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/tutoring/math" className="hover:text-white">Math Tutoring</Link></li>
                <li><Link href="/tutoring/science" className="hover:text-white">Science Tutoring</Link></li>
                <li><Link href="/tutoring/english" className="hover:text-white">English Tutoring</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} The Tutor Bridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
