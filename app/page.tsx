import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { BookOpen, CheckCircle, ArrowRight, Calculator, Brain, Map, Wrench, Gamepad2, Zap, Trophy, Target, TrendingUp, Clock, Sparkles, BookMarked, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { ComprehensiveFooter } from "@/components/comprehensive-footer"
import { createAdminClient } from "@/lib/supabase"

// Revalidate every hour
export const revalidate = 3600

export const metadata: Metadata = {
  title: "The Tutor Bridge - Your 24/7 Digital Tutor for Self-Learning | Free Tools & Games",
  description: "Learn math, science & more at your own pace. Your digital tutor offers 100+ interactive tools, brain games, calculators and study guides. 100% free self-learning platform.",
  keywords: [
    "digital tutor",
    "online learning platform",
    "self-learning tools",
    "interactive learning",
    "brain games for students",
    "educational tools",
    "math calculators",
    "learning games",
    "study tools",
    "free learning platform",
    "educational calculators",
    "student resources"
  ],
  alternates: {
    canonical: "https://www.thetutorbridge.com",
  },
  openGraph: {
    title: "The Tutor Bridge - Your 24/7 Digital Tutor for Self-Learning",
    description: "Learn at your own pace with 100+ interactive tools, brain games, and study guides. Your free digital tutor is always available.",
    url: "https://www.thetutorbridge.com",
    siteName: "The Tutor Bridge",
    type: "website",
  }
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "The Tutor Bridge",
  description: "Free interactive learning platform with 100+ calculators, brain games, study resources and developer tools. Your 24/7 digital tutor for self-paced learning.",
  url: "https://www.thetutorbridge.com",
  logo: "https://www.thetutorbridge.com/TheTutorBridge Logo New.png",
  applicationCategory: "EducationalApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "100+ Free Calculators & Tools",
    "Interactive Brain Games",
    "Study Guides & Resources",
    "Developer Tools",
    "Career Roadmaps",
    "Self-Paced Learning"
  ],
  sameAs: [
    "https://www.linkedin.com/company/thetutorbridge/"
  ]
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
        {/* Hero Section - New Digital Tutor Positioning */}
        <section className="relative py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-[#2BAE66]/10 text-[#2BAE66] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                Your 24/7 Digital Tutor
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-poppins font-bold text-[#1A3D7C] leading-tight mb-6">
                Learn Smarter with Interactive
                <br />
                <span className="text-[#2BAE66]">Tools & Brain Games</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10">
                Master math, science, and more through engaging calculators, brain games, and step-by-step guides.
                Learn at your own pace—always free, no signup required.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <Link href="/tools">
                  <Button
                    size="lg"
                    className="bg-[#1A3D7C] text-white rounded-xl px-8 py-6 hover:bg-[#1A3D7C]/90 transition-all font-semibold text-lg w-full sm:w-auto"
                  >
                    <Gamepad2 className="w-5 h-5 mr-2" />
                    Explore Tools & Games
                  </Button>
                </Link>
                <Link href="/calculators">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-[#1A3D7C] text-[#1A3D7C] rounded-xl px-8 py-6 hover:bg-[#1A3D7C] hover:text-white transition-all font-semibold text-lg w-full sm:w-auto"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Browse Calculators
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                  <span>100% Free Forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                  <span>No Signup Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                  <span>Learn At Your Pace</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Categories Section */}
        <section className="py-16 sm:py-20 bg-[#F8FAFC]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                How Your Digital Tutor Helps You Learn
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Interactive tools, games, and resources designed to help you master concepts through practice.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Brain Games */}
              <Link href="/brain-games">
                <Card className="p-8 border-2 border-[#2BAE66]/20 hover:border-[#2BAE66] transition-all hover:shadow-xl group cursor-pointer h-full">
                  <CardContent className="p-0">
                    <div className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Gamepad2 className="w-12 h-12 text-[#2BAE66]" />
                    </div>
                    <h3 className="text-2xl font-poppins font-bold text-[#1A3D7C] mb-3">Brain Games</h3>
                    <p className="text-gray-600 mb-4">
                      Test your skills with fun, interactive games. Perfect for practicing mental math, times tables, and more.
                    </p>
                    <div className="text-[#2BAE66] font-semibold flex items-center gap-2">
                      Play Now <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Calculators */}
              <Link href="/calculators">
                <Card className="p-8 border-2 border-[#1A3D7C]/20 hover:border-[#1A3D7C] transition-all hover:shadow-xl group cursor-pointer h-full">
                  <CardContent className="p-0">
                    <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Calculator className="w-12 h-12 text-[#1A3D7C]" />
                    </div>
                    <h3 className="text-2xl font-poppins font-bold text-[#1A3D7C] mb-3">100+ Calculators</h3>
                    <p className="text-gray-600 mb-4">
                      From GPA calculators to scientific converters. Get instant solutions with step-by-step explanations.
                    </p>
                    <div className="text-[#1A3D7C] font-semibold flex items-center gap-2">
                      Browse Tools <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Career Roadmaps */}
              <Link href="/roadmap">
                <Card className="p-8 border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-xl group cursor-pointer h-full">
                  <CardContent className="p-0">
                    <div className="w-20 h-20 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Map className="w-12 h-12 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-poppins font-bold text-[#1A3D7C] mb-3">Career Roadmaps</h3>
                    <p className="text-gray-600 mb-4">
                      Explore tech career paths from frontend to data science. Plan your learning journey.
                    </p>
                    <div className="text-purple-600 font-semibold flex items-center gap-2">
                      View Roadmaps <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Developer Tools */}
              <Link href="/tools">
                <Card className="p-8 border-2 border-indigo-200 hover:border-indigo-400 transition-all hover:shadow-xl group cursor-pointer h-full">
                  <CardContent className="p-0">
                    <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Wrench className="w-12 h-12 text-indigo-600" />
                    </div>
                    <h3 className="text-2xl font-poppins font-bold text-[#1A3D7C] mb-3">Developer Tools</h3>
                    <p className="text-gray-600 mb-4">
                      80+ tools for developers. JSON formatters, converters, generators, and more.
                    </p>
                    <div className="text-indigo-600 font-semibold flex items-center gap-2">
                      Explore Tools <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Blog & Guides */}
              <Link href="/blog">
                <Card className="p-8 border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-xl group cursor-pointer h-full">
                  <CardContent className="p-0">
                    <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <BookMarked className="w-12 h-12 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-poppins font-bold text-[#1A3D7C] mb-3">Study Tips & Blog</h3>
                    <p className="text-gray-600 mb-4">
                      Expert advice on studying, exam prep, and learning strategies for students.
                    </p>
                    <div className="text-red-600 font-semibold flex items-center gap-2">
                      Read Articles <ArrowRight className="w-4 h-4" />
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
                <div className="text-3xl md:text-4xl font-poppins font-bold text-[#1A3D7C]">100+</div>
                <div className="text-gray-600">Free Tools</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-poppins font-bold text-[#2BAE66]">60+</div>
                <div className="text-gray-600">Career Roadmaps</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-poppins font-bold text-[#FFC857]">24/7</div>
                <div className="text-gray-600">Always Available</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-poppins font-bold text-[#1A3D7C]">100%</div>
                <div className="text-gray-600">Free Forever</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 sm:py-20 bg-[#F8FAFC]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                Your Digital Tutor Works 24/7
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Learn independently with tools designed to teach you step-by-step.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="p-6 text-center">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-[#1A3D7C]" />
                  </div>
                  <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-3">1. Learn</h3>
                  <p className="text-gray-600">
                    Use interactive tools and calculators to understand concepts with instant feedback.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 text-center">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-[#2BAE66]" />
                  </div>
                  <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-3">2. Practice</h3>
                  <p className="text-gray-600">
                    Reinforce learning with brain games and quizzes. Make studying fun and engaging.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 text-center">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-[#D4A84B]" />
                  </div>
                  <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-3">3. Master</h3>
                  <p className="text-gray-600">
                    Build confidence and improve grades through consistent practice and self-learning.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                Why Students Love The Tutor Bridge
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Clock,
                  title: "Learn Anytime, Anywhere",
                  description: "Your digital tutor is available 24/7. No scheduling, no waiting—start learning instantly.",
                  color: "bg-blue-50",
                  iconColor: "text-[#1A3D7C]"
                },
                {
                  icon: Zap,
                  title: "Instant Feedback",
                  description: "Get immediate results and explanations. See your mistakes and learn from them right away.",
                  color: "bg-green-50",
                  iconColor: "text-[#2BAE66]"
                },
                {
                  icon: Trophy,
                  title: "Learn By Doing",
                  description: "Interactive tools and games make learning engaging. Practice concepts until you master them.",
                  color: "bg-yellow-50",
                  iconColor: "text-[#D4A84B]"
                },
                {
                  icon: Sparkles,
                  title: "Always Free",
                  description: "No subscriptions, no hidden fees, no credit card required. Everything is 100% free forever.",
                  color: "bg-purple-50",
                  iconColor: "text-purple-600"
                },
                {
                  icon: Target,
                  title: "Self-Paced Learning",
                  description: "Go as fast or slow as you need. Review concepts multiple times without pressure.",
                  color: "bg-red-50",
                  iconColor: "text-red-500"
                },
                {
                  icon: GraduationCap,
                  title: "Comprehensive Resources",
                  description: "From calculators to career guides, everything you need to succeed in one place.",
                  color: "bg-indigo-50",
                  iconColor: "text-indigo-600"
                }
              ].map((item, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all">
                  <CardContent className="p-0">
                    <div className={`w-14 h-14 ${item.color} rounded-full flex items-center justify-center mb-4`}>
                      <item.icon className={`w-8 h-8 ${item.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-poppins font-bold text-[#1A3D7C] mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Latest From Our Blog Section */}
        {latestPosts.length > 0 && (
          <section className="py-16 sm:py-20 bg-[#F8FAFC]">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  Latest Study Tips & Guides
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Expert advice to help you study smarter and achieve your academic goals.
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
              Ready to Start Learning?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Your digital tutor is ready. Start exploring tools, playing brain games, and mastering new concepts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/tools">
                <Button
                  size="lg"
                  className="bg-[#FFC857] text-[#1A3D7C] rounded-xl px-8 py-6 hover:shadow-lg hover:bg-[#FFC857]/90 transition-all text-lg font-semibold w-full sm:w-auto"
                >
                  <Gamepad2 className="w-5 h-5 mr-2" />
                  Explore Tools & Games
                </Button>
              </Link>
              <Link href="/calculators">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white rounded-xl px-8 py-6 hover:bg-white hover:text-[#1A3D7C] transition-all text-lg font-semibold w-full sm:w-auto"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Browse Calculators
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-white/90">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FFC857]" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#FFC857]" />
                <span>Available 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#FFC857]" />
                <span>No signup required</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ComprehensiveFooter />
    </div>
  )
}
