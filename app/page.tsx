import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { BookOpen, MessageSquare, Users, Award, Star, CheckCircle, ArrowRight, Target, TrendingUp, Clock, Shield, UserCheck, BookMarked, Brain, Calendar, Zap, Trophy, Calculator, Video, FileText } from "lucide-react"
import { HomeworkHelpIcon, WeeklyTutoringIcon, MathIcon, ScienceIcon, EnglishIcon, SubmitIcon, QuoteIcon, ApproveIcon, SuccessIcon, CertifiedIcon, GuaranteeIcon, LearnIcon, FastIcon, SameTutorIcon, ResultsIcon, AvatarFemale1, AvatarMale1, AvatarFemale2 } from "@/components/service-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { createAdminClient } from "@/lib/supabase"

// Revalidate every hour
export const revalidate = 3600

export const metadata: Metadata = {
  title: "Online Homework Help & Tutoring for Grades 6-12 | Math, Science, English | The Tutor Bridge",
  description: "Expert homework help & 1-on-1 tutoring for grades 6-12. Math, Science, English. U.S.-certified tutors. Free consultation!",
  keywords: [
    "homework help",
    "online tutoring",
    "math tutor",
    "science tutor",
    "english tutor",
    "homework help online",
    "tutoring for high school",
    "middle school tutoring",
    "algebra help",
    "chemistry tutor",
    "essay help"
  ],
  alternates: {
    canonical: "https://www.thetutorbridge.com",
  },
  openGraph: {
    title: "Online Homework Help & Tutoring for Grades 6-12",
    description: "Expert homework help and 1-on-1 online tutoring. Math, Science, English. U.S.-certified tutors.",
    url: "https://www.thetutorbridge.com",
    siteName: "The Tutor Bridge",
    type: "website",
  }
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "The Tutor Bridge",
  description: "Expert homework help and online tutoring for grades 6-12 in Math, Science, and English",
  url: "https://www.thetutorbridge.com",
  logo: "https://www.thetutorbridge.com/TheTutorBridge Logo New.png",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "500"
  },
  sameAs: [
    "https://www.linkedin.com/company/thetutorbridge/"
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "US"
  },
  areaServed: "US",
  serviceType: ["Homework Help", "Online Tutoring", "Academic Support"]
}

// Fetch latest blog posts for homepage
async function getLatestPosts() {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, featured_image, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(3)

    if (error) return []
    return data || []
  } catch {
    return []
  }
}

export default async function Home() {
  const latestPosts = await getLatestPosts()
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden font-merriweather">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background */}
      <div className="fixed inset-0 -z-10 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A3D7C]/5 via-[#2BAE66]/5 to-[#FFC857]/10" />
      </div>

      <Navigation />

      <main className="flex-1">
        {/* Hero Section - Subtle & Center Aligned */}
        <section className="relative py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] leading-tight mb-4">
                Homework Help & Expert Tutoring
                <br />
                <span className="text-2xl sm:text-3xl md:text-4xl text-gray-600 font-normal">for Grades 6-12</span>
              </h1>

              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
                Stuck on homework? Need ongoing support? Get expert help in Math, Science, and English from U.S.-certified tutors.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/homework-help/submit">
                  <Button
                    size="lg"
                    className="bg-[#1A3D7C] text-white rounded-xl px-8 py-4 hover:bg-[#1A3D7C]/90 transition-all font-semibold w-full sm:w-auto"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Submit Homework
                  </Button>
                </Link>
                <Link href="/tutoring/free-consultation">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-[#1A3D7C] text-[#1A3D7C] rounded-xl px-8 py-4 hover:bg-[#1A3D7C] hover:text-white transition-all font-semibold w-full sm:w-auto"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Free Consultation
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                  <span>Step-by-step explanations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                  <span>U.S.-certified tutors</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                  <span>Satisfaction guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Two Services Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                Two Ways to Get Help
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Choose what works best for you—quick homework help or ongoing tutoring support.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Homework Help Card */}
              <Card className="p-8 border-2 border-[#1A3D7C]/20 hover:border-[#1A3D7C] transition-all hover:shadow-xl group">
                <CardContent className="p-0">
                  <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <HomeworkHelpIcon className="w-14 h-14 text-[#1A3D7C]" />
                  </div>
                  <h3 className="text-2xl font-poppins font-bold text-[#1A3D7C] mb-3">Homework Help</h3>
                  <p className="text-gray-600 mb-6">
                    Need help with a specific assignment? Submit your homework and get expert solutions with step-by-step explanations. Pay only for what you need.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                      <span>On-demand, pay-per-task</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                      <span>Detailed explanations included</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                      <span>Custom quote within 2 hours</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                      <span>Starting at $15</span>
                    </li>
                  </ul>
                  <Link href="/homework-help">
                    <Button className="w-full bg-[#1A3D7C] hover:bg-[#1A3D7C]/90">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Tutoring Card */}
              <Card className="p-8 border-2 border-[#2BAE66]/20 hover:border-[#2BAE66] transition-all hover:shadow-xl group relative">
                <div className="absolute -top-4 right-4 bg-[#2BAE66] text-white text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
                <CardContent className="p-0">
                  <div className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <WeeklyTutoringIcon className="w-14 h-14 text-[#2BAE66]" />
                  </div>
                  <h3 className="text-2xl font-poppins font-bold text-[#1A3D7C] mb-3">Weekly Tutoring</h3>
                  <p className="text-gray-600 mb-6">
                    Want lasting improvement? Work with the same expert tutor each week. Build a relationship, track progress, and boost grades.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                      <span>Same tutor every session</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                      <span>Personalized lesson plans</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                      <span>Weekly progress reports</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                      <span>Starting at $25/hr</span>
                    </li>
                  </ul>
                  <Link href="/tutoring">
                    <Button className="w-full bg-[#2BAE66] hover:bg-[#2BAE66]/90">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Subjects Section */}
        <section className="py-16 sm:py-20 bg-[#F8FAFC]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                Subjects We Cover
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Comprehensive support for the three core subjects that matter most for academic success.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Math */}
              <Link href="/homework-help/math">
                <Card className="p-6 text-center hover:shadow-xl transition-all cursor-pointer group h-full">
                  <CardContent className="p-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#1A3D7C]/10 to-[#1A3D7C]/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <MathIcon className="w-16 h-16 text-[#1A3D7C]" />
                    </div>
                    <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-3">Math</h3>
                    <p className="text-gray-600 text-sm mb-4">Pre-Algebra through AP Calculus</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {["Algebra", "Geometry", "Calculus", "Statistics"].map((topic) => (
                        <span key={topic} className="px-3 py-1 bg-blue-50 text-[#1A3D7C] text-xs rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Science */}
              <Link href="/homework-help/science">
                <Card className="p-6 text-center hover:shadow-xl transition-all cursor-pointer group h-full">
                  <CardContent className="p-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#2BAE66]/10 to-[#2BAE66]/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <ScienceIcon className="w-16 h-16 text-[#2BAE66]" />
                    </div>
                    <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-3">Science</h3>
                    <p className="text-gray-600 text-sm mb-4">General Science through AP courses</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {["Physics", "Chemistry", "Biology", "Earth Science"].map((topic) => (
                        <span key={topic} className="px-3 py-1 bg-green-50 text-[#2BAE66] text-xs rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* English */}
              <Link href="/homework-help/english">
                <Card className="p-6 text-center hover:shadow-xl transition-all cursor-pointer group h-full">
                  <CardContent className="p-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#FFC857]/15 to-[#FFC857]/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <EnglishIcon className="w-16 h-16 text-[#D4A84B]" />
                    </div>
                    <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-3">English</h3>
                    <p className="text-gray-600 text-sm mb-4">Writing, Grammar, Literature</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {["Essays", "Grammar", "Literature", "AP English"].map((topic) => (
                        <span key={topic} className="px-3 py-1 bg-yellow-50 text-[#D4A84B] text-xs rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-poppins font-bold text-[#1A3D7C]">500+</div>
                <div className="text-gray-600">Families Served</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-poppins font-bold text-[#2BAE66]">95%</div>
                <div className="text-gray-600">Grade Improvement</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-poppins font-bold text-[#FFC857]">50+</div>
                <div className="text-gray-600">Expert Tutors</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-poppins font-bold text-[#1A3D7C]">4.9★</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section - Clean & Subtle */}
        <section className="py-16 sm:py-20 bg-[#F8FAFC]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Getting help is simple. Here's our 4-step process.
              </p>
            </div>

            {/* Process Steps */}
            <div className="max-w-4xl mx-auto">
              {/* Desktop: Horizontal with connecting line */}
              <div className="hidden md:block relative">
                {/* Connecting Line */}
                <div className="absolute top-10 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-[#1A3D7C] via-[#2BAE66] to-[#FFC857] opacity-30"></div>

                <div className="grid grid-cols-4 gap-4">
                  {[
                    { num: 1, icon: SubmitIcon, title: "Submit", desc: "Upload your homework with deadline", color: "#1A3D7C" },
                    { num: 2, icon: QuoteIcon, title: "Quote", desc: "Get a price within 2 hours", color: "#2BAE66" },
                    { num: 3, icon: ApproveIcon, title: "Approve", desc: "Review and pay to start", color: "#D4A84B" },
                    { num: 4, icon: SuccessIcon, title: "Success", desc: "Get step-by-step solutions", color: "#1A3D7C" }
                  ].map((step) => (
                    <div key={step.num} className="flex flex-col items-center text-center">
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center mb-4 relative bg-white shadow-sm border-2 transition-transform hover:scale-105"
                        style={{ borderColor: step.color }}
                      >
                        <step.icon className="w-10 h-10" style={{ color: step.color }} />
                        <div
                          className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ backgroundColor: step.color }}
                        >
                          {step.num}
                        </div>
                      </div>
                      <h3 className="font-poppins font-semibold text-[#1A3D7C] mb-1">{step.title}</h3>
                      <p className="text-gray-500 text-sm">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile: Vertical timeline */}
              <div className="md:hidden">
                <div className="relative pl-8">
                  {/* Vertical line */}
                  <div className="absolute left-3 top-3 bottom-3 w-0.5 bg-gradient-to-b from-[#1A3D7C] via-[#2BAE66] to-[#FFC857] opacity-30"></div>

                  <div className="space-y-6">
                    {[
                      { num: 1, icon: SubmitIcon, title: "Submit Your Work", desc: "Upload homework with your deadline", color: "#1A3D7C" },
                      { num: 2, icon: QuoteIcon, title: "Get a Quote", desc: "Receive a custom price within 2 hours", color: "#2BAE66" },
                      { num: 3, icon: ApproveIcon, title: "Approve & Pay", desc: "Review, approve, and we start immediately", color: "#D4A84B" },
                      { num: 4, icon: SuccessIcon, title: "Success!", desc: "Get step-by-step solutions you can learn from", color: "#1A3D7C" }
                    ].map((step) => (
                      <div key={step.num} className="flex gap-4 relative">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 relative z-10"
                          style={{ backgroundColor: step.color }}
                        >
                          {step.num}
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center gap-2 mb-1">
                            <step.icon className="w-4 h-4" style={{ color: step.color }} />
                            <h3 className="font-poppins font-semibold text-[#1A3D7C]">{step.title}</h3>
                          </div>
                          <p className="text-gray-500 text-sm">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <Link href="/homework-help/submit">
                <Button className="bg-[#1A3D7C] hover:bg-[#1A3D7C]/90 px-8">
                  Get Started Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                Why Families Trust Us
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: CertifiedIcon,
                  title: "Certified Tutors",
                  description: "All our tutors are U.S.-certified educators with teaching credentials or advanced degrees.",
                  color: "bg-blue-50",
                  iconColor: "text-[#1A3D7C]"
                },
                {
                  icon: GuaranteeIcon,
                  title: "Satisfaction Guaranteed",
                  description: "Not happy with your solution? We'll revise it for free or give you a full refund.",
                  color: "bg-green-50",
                  iconColor: "text-[#2BAE66]"
                },
                {
                  icon: LearnIcon,
                  title: "Learn, Don't Just Copy",
                  description: "Every solution includes step-by-step explanations so you understand the concepts.",
                  color: "bg-yellow-50",
                  iconColor: "text-[#D4A84B]"
                },
                {
                  icon: FastIcon,
                  title: "Fast Turnaround",
                  description: "Get quotes within 2 hours. Most homework delivered within 24-72 hours.",
                  color: "bg-purple-50",
                  iconColor: "text-purple-600"
                },
                {
                  icon: SameTutorIcon,
                  title: "Same Tutor Every Week",
                  description: "Build a relationship with a tutor who knows your learning style and tracks progress.",
                  color: "bg-red-50",
                  iconColor: "text-red-500"
                },
                {
                  icon: ResultsIcon,
                  title: "Proven Results",
                  description: "95% of our tutoring students improve by at least one letter grade within 3 months.",
                  color: "bg-indigo-50",
                  iconColor: "text-indigo-600"
                }
              ].map((item, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all">
                  <CardContent className="p-0">
                    <div className={`w-14 h-14 ${item.color} rounded-full flex items-center justify-center mb-4`}>
                      <item.icon className={`w-9 h-9 ${item.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-poppins font-bold text-[#1A3D7C] mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                What Parents Are Saying
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  quote: "The homework help service is a lifesaver! My daughter was struggling with algebra, and the step-by-step explanations helped her finally understand the concepts.",
                  name: "Jennifer M.",
                  role: "Parent of 9th grader",
                  Avatar: AvatarFemale1,
                  avatarColor: "text-[#8B6914]"
                },
                {
                  quote: "We started with homework help and upgraded to weekly tutoring. Our son's grades went from C's to A's in just two months. Worth every penny!",
                  name: "Michael T.",
                  role: "Parent of 11th grader",
                  Avatar: AvatarMale1,
                  avatarColor: "text-[#1A3D7C]"
                },
                {
                  quote: "The tutors are fantastic—patient, knowledgeable, and they really connect with kids. My daughter actually looks forward to her sessions now.",
                  name: "Sarah K.",
                  role: "Parent of 7th grader",
                  Avatar: AvatarFemale2,
                  avatarColor: "text-[#7B4B94]"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="p-6 bg-white">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-[#FFC857] fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 mr-3">
                        <testimonial.Avatar className={`w-full h-full ${testimonial.avatarColor}`} />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Preview Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                No hidden fees. No long-term contracts. Pay only for what you need.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Homework Help Pricing */}
              <Card className="p-8 border-2 border-gray-200">
                <CardContent className="p-0">
                  <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-4">Homework Help</h3>
                  <div className="text-4xl font-poppins font-bold text-[#1A3D7C] mb-2">
                    From $15
                  </div>
                  <p className="text-gray-600 mb-6">per task</p>

                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                      <span>Single problems: $15-50</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                      <span>Problem sets: $35-100</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                      <span>Essays: $40-130</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                      <span>Custom quote in 2 hours</span>
                    </li>
                  </ul>

                  <Link href="/homework-help/submit">
                    <Button className="w-full bg-[#1A3D7C]">
                      Submit Homework
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Tutoring Pricing */}
              <Card className="p-8 border-2 border-[#2BAE66] relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#2BAE66] text-white text-xs font-bold px-3 py-1 rounded-full">
                  BEST VALUE
                </div>
                <CardContent className="p-0">
                  <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-4">Weekly Tutoring</h3>
                  <div className="text-4xl font-poppins font-bold text-[#1A3D7C] mb-2">
                    From $25
                  </div>
                  <p className="text-gray-600 mb-6">per hour</p>

                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                      <span>4 sessions/mo: $30/hr</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                      <span>8 sessions/mo: $25/hr (popular)</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                      <span>12 sessions/mo: $29/hr</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                      <span>Cancel anytime</span>
                    </li>
                  </ul>

                  <Link href="/tutoring/free-consultation">
                    <Button className="w-full bg-[#2BAE66]">
                      Book Free Consultation
                    </Button>
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

        {/* FAQ Preview Section */}
        <section className="py-16 sm:py-20 bg-[#F8FAFC]">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Is this considered cheating?",
                  a: "No. Our homework help provides step-by-step explanations designed to teach concepts, not just answers. We follow academic integrity guidelines, and our goal is to help students understand material so they can succeed independently."
                },
                {
                  q: "How quickly can I get homework help?",
                  a: "You'll receive a quote within 2 hours. Most standard assignments are delivered within 24-72 hours. Rush and urgent delivery options are available for tighter deadlines."
                },
                {
                  q: "What if I'm not satisfied?",
                  a: "We offer free revisions if you're not completely satisfied. If we can't resolve the issue, we provide a full refund. Your satisfaction is guaranteed."
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

            <div className="text-center mt-8">
              <Link href="/faq" className="text-[#1A3D7C] font-semibold hover:underline">
                View All FAQs →
              </Link>
            </div>
          </div>
        </section>

        {/* Latest From Our Blog Section - Critical for SEO */}
        {latestPosts.length > 0 && (
          <section className="py-16 sm:py-20 bg-white">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  Latest From Our Blog
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Study tips, educational insights, and resources to help students succeed.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {latestPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <Card className="h-full hover:shadow-xl transition-all cursor-pointer group overflow-hidden">
                      {post.featured_image && (
                        <div className="relative w-full aspect-video bg-gray-100 overflow-hidden">
                          <Image
                            src={post.featured_image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardContent className="p-6">
                        <h3 className="text-lg font-poppins font-bold text-[#1A3D7C] mb-2 group-hover:text-[#2BAE66] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                          {post.excerpt}
                        </p>
                        <span className="text-[#2BAE66] text-sm font-semibold flex items-center gap-1">
                          Read More <ArrowRight className="w-4 h-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-10">
                <Link href="/blog">
                  <Button variant="outline" className="border-[#1A3D7C] text-[#1A3D7C]">
                    View All Articles
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Final CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">
              Ready to Get Help?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Whether you need quick homework help or ongoing tutoring support, we're here to help your student succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/homework-help/submit">
                <Button
                  size="lg"
                  className="bg-[#FFC857] text-[#1A3D7C] rounded-xl px-8 py-6 hover:shadow-lg hover:bg-[#FFC857]/90 transition-all text-lg font-semibold w-full sm:w-auto"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Submit Homework Now
                </Button>
              </Link>
              <Link href="/tutoring/free-consultation">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white rounded-xl px-8 py-6 hover:bg-white hover:text-[#1A3D7C] transition-all text-lg font-semibold w-full sm:w-auto"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Free Consultation
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-white/90">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#FFC857]" />
                <span>No obligation</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#FFC857]" />
                <span>Satisfaction guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#FFC857]" />
                <span>Fast turnaround</span>
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
                Expert homework help and online tutoring for grades 6-12. Helping students succeed in Math, Science, and English.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Homework Help</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/homework-help/math" className="hover:text-white">Math Help</Link></li>
                <li><Link href="/homework-help/science" className="hover:text-white">Science Help</Link></li>
                <li><Link href="/homework-help/english" className="hover:text-white">English Help</Link></li>
                <li><Link href="/homework-help/submit" className="hover:text-white">Submit Homework</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Tutoring</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/tutoring/math" className="hover:text-white">Math Tutoring</Link></li>
                <li><Link href="/tutoring/science" className="hover:text-white">Science Tutoring</Link></li>
                <li><Link href="/tutoring/english" className="hover:text-white">English Tutoring</Link></li>
                <li><Link href="/tutoring/free-consultation" className="hover:text-white">Free Consultation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-center md:text-left">
                © {new Date().getFullYear()} The Tutor Bridge. All rights reserved.
              </p>
              <div className="flex gap-6 text-gray-400">
                <Link href="/calculators" className="hover:text-white text-sm">Calculators</Link>
                <Link href="/roadmap" className="hover:text-white text-sm">Career Roadmaps</Link>
                <Link href="/blog" className="hover:text-white text-sm">Blog</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
