import type { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { ComprehensiveFooter } from "@/components/comprehensive-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronRight,
  Sparkles,
  Search,
  Play,
  TrendingUp,
  Calculator,
  Brain,
  BookOpen,
  Code2,
  Map,
  Clock,
  Zap,
  Heart,
  Target,
  CheckCircle,
  Users,
  Gamepad2,
  Timer,
  Award
} from "lucide-react"

export const metadata: Metadata = {
  title: "How It Works - Your 24/7 Digital Tutor | The Tutor Bridge",
  description: "Learn how to use The Tutor Bridge's free learning platform. Explore 100+ tools, calculators, brain games, and study resources. Start learning in 3 simple steps—no signup required.",
  keywords: [
    "how to use learning platform",
    "digital tutor guide",
    "free learning tools",
    "self-learning platform",
    "interactive learning tools",
    "online study resources",
    "how to learn online",
    "educational tools guide"
  ],
  alternates: {
    canonical: "https://www.thetutorbridge.com/how-it-works",
  },
  openGraph: {
    title: "How It Works - Your 24/7 Digital Tutor",
    description: "Learn how to use our free platform with 100+ tools, calculators, and brain games. Start learning immediately—no signup required.",
    url: "https://www.thetutorbridge.com/how-it-works",
    siteName: "The Tutor Bridge",
    type: "website",
  }
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use The Tutor Bridge Learning Platform",
  description: "Learn how to use The Tutor Bridge's free digital learning platform with interactive tools, calculators, and brain games",
  step: [
    {
      "@type": "HowToStep",
      name: "Explore Our Tools",
      text: "Browse 100+ free learning tools, calculators, brain games, and study resources"
    },
    {
      "@type": "HowToStep",
      name: "Choose What to Learn",
      text: "Select the tool or game that matches your learning goal"
    },
    {
      "@type": "HowToStep",
      name: "Practice and Master",
      text: "Learn at your own pace with instant feedback and interactive exercises"
    }
  ]
}

export default function HowItWorks() {
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
              <span className="text-[#1A3D7C] font-medium">How It Works</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-[#2BAE66]/10 text-[#2BAE66] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                Your 24/7 Digital Tutor
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] leading-tight mb-4">
                Learning Made Simple<br />
                <span className="text-[#2BAE66]">Free, Interactive, Instant</span>
              </h1>

              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
                No signup, no paywalls, no waiting. Your digital tutor is ready 24/7 with interactive tools, brain games, and study resources. Here's how to get started.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tools">
                  <Button size="lg" className="bg-[#1A3D7C] text-white rounded-xl px-8 py-4 font-semibold hover:bg-[#1A3D7C]/90">
                    <Gamepad2 className="w-5 h-5 mr-2" />
                    Explore Tools & Games
                  </Button>
                </Link>
                <Link href="/calculators">
                  <Button size="lg" variant="outline" className="border-2 border-[#1A3D7C] text-[#1A3D7C] rounded-xl px-8 py-4 font-semibold hover:bg-[#1A3D7C] hover:text-white">
                    <Calculator className="w-5 h-5 mr-2" />
                    Browse Calculators
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3-Step Process */}
        <section className="py-16 sm:py-20 bg-[#F8FAFC]">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                Get Started in 3 Easy Steps
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Start learning immediately—no account creation, no downloads, no barriers.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 relative">
                {/* Connecting line (desktop only) */}
                <div className="hidden md:block absolute top-16 left-[16.6%] right-[16.6%] h-0.5 bg-gradient-to-r from-[#1A3D7C] via-[#2BAE66] to-[#FFC857]"></div>

                {[
                  {
                    step: 1,
                    icon: Search,
                    title: "Explore Our Tools",
                    description: "Browse 100+ free calculators, brain games, developer tools, and study resources. Use the search or navigate by category.",
                    color: "bg-blue-100",
                    iconColor: "text-[#1A3D7C]"
                  },
                  {
                    step: 2,
                    icon: Play,
                    title: "Choose What to Learn",
                    description: "Click any tool or game to start immediately. No signup required. Each tool is ready to use with clear instructions.",
                    color: "bg-green-100",
                    iconColor: "text-[#2BAE66]"
                  },
                  {
                    step: 3,
                    icon: TrendingUp,
                    title: "Practice & Master",
                    description: "Learn at your own pace with instant feedback. Come back anytime—your digital tutor is always available, 24/7.",
                    color: "bg-yellow-100",
                    iconColor: "text-[#FFC857]"
                  }
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <Card className="p-6 text-center h-full hover:shadow-lg transition-shadow bg-white">
                      <CardContent className="p-0">
                        <div className={`w-20 h-20 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 relative z-10`}>
                          <item.icon className={`w-10 h-10 ${item.iconColor}`} />
                        </div>
                        <div className="absolute -top-2 -left-2 w-10 h-10 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center font-bold text-lg">
                          {item.step}
                        </div>
                        <h3 className="font-poppins font-bold text-xl text-[#1A3D7C] mb-3">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What You Can Learn */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                What You Can Learn
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Your digital tutor offers five main learning categories—all completely free.
              </p>
            </div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: "Brain Games",
                  description: "Make learning fun with interactive games that test memory, math skills, typing speed, and more.",
                  color: "bg-purple-100",
                  iconColor: "text-purple-600",
                  link: "/tools",
                  examples: ["Times Tables Speed Test", "Memory Match Game", "Typing Speed Test"]
                },
                {
                  icon: Calculator,
                  title: "100+ Calculators",
                  description: "From GPA to scientific calculations—get instant solutions with step-by-step explanations.",
                  color: "bg-blue-100",
                  iconColor: "text-[#1A3D7C]",
                  link: "/calculators",
                  examples: ["GPA Calculator", "Percentage Calculator", "Scientific Calculator"]
                },
                {
                  icon: Code2,
                  title: "Developer Tools",
                  description: "80+ tools for developers—JSON formatters, converters, generators, regex testers, and more.",
                  color: "bg-green-100",
                  iconColor: "text-[#2BAE66]",
                  link: "/tools",
                  examples: ["JSON Formatter", "Base64 Encoder", "Color Picker"]
                },
                {
                  icon: BookOpen,
                  title: "Study Resources",
                  description: "Comprehensive NCERT study guides, learning materials, and educational content for all subjects.",
                  color: "bg-yellow-100",
                  iconColor: "text-[#FFC857]",
                  link: "/study-resources",
                  examples: ["Class 6-12 Resources", "Subject Guides", "Study Tips"]
                },
                {
                  icon: Map,
                  title: "Career Roadmaps",
                  description: "60+ tech career paths with step-by-step guidance from beginner to expert level.",
                  color: "bg-red-100",
                  iconColor: "text-red-600",
                  link: "/roadmap",
                  examples: ["Frontend Developer", "Data Scientist", "DevOps Engineer"]
                },
                {
                  icon: Timer,
                  title: "Productivity Tools",
                  description: "Study timers, Pomodoro techniques, word counters, and tools to boost your learning efficiency.",
                  color: "bg-indigo-100",
                  iconColor: "text-indigo-600",
                  link: "/tools",
                  examples: ["Study Timer", "Pomodoro Timer", "Word Counter"]
                }
              ].map((category, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0 space-y-4">
                    <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center`}>
                      <category.icon className={`w-8 h-8 ${category.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-poppins font-bold text-xl text-[#1A3D7C] mb-2">{category.title}</h3>
                      <p className="text-gray-600 mb-4">{category.description}</p>
                      <div className="space-y-1 mb-4">
                        {category.examples.map((example, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{example}</span>
                          </div>
                        ))}
                      </div>
                      <Link href={category.link}>
                        <Button variant="ghost" className="text-[#1A3D7C] hover:text-[#2BAE66] p-0 h-auto font-semibold">
                          Explore {category.title} →
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why This Works */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold mb-4">
                Why Self-Learning Works
              </h2>
              <p className="text-lg opacity-90 max-w-3xl mx-auto">
                The most effective learning happens when you're in control—learn what you need, when you need it.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Clock,
                  title: "Learn at Your Pace",
                  description: "No rushing, no falling behind. Spend as much time as you need on each concept."
                },
                {
                  icon: Zap,
                  title: "Instant Feedback",
                  description: "Get immediate results and corrections. Learn from mistakes in real-time."
                },
                {
                  icon: Heart,
                  title: "No Pressure",
                  description: "No judgment, no embarrassment. Practice until you're confident."
                },
                {
                  icon: Target,
                  title: "Focus on Gaps",
                  description: "Target exactly what you struggle with. Skip what you already know."
                }
              ].map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-[#FFC857]" />
                  </div>
                  <h3 className="font-poppins font-bold text-xl mb-2">{benefit.title}</h3>
                  <p className="text-white/90">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Benefits */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                The Tutor Bridge Advantage
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                What makes our digital tutor different from other learning platforms.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Award,
                  title: "100% Free Forever",
                  description: "No hidden costs, no premium features, no paywalls. Every tool is completely free.",
                  color: "bg-blue-100",
                  iconColor: "text-[#1A3D7C]"
                },
                {
                  icon: Users,
                  title: "No Signup Required",
                  description: "Start learning immediately. No email, no password, no personal information needed.",
                  color: "bg-green-100",
                  iconColor: "text-[#2BAE66]"
                },
                {
                  icon: Clock,
                  title: "Available 24/7",
                  description: "Learn at 3 AM or 3 PM—your digital tutor never sleeps and never takes a break.",
                  color: "bg-yellow-100",
                  iconColor: "text-[#FFC857]"
                },
                {
                  icon: Zap,
                  title: "Instant Access",
                  description: "No waiting for responses. Click a tool and start using it immediately.",
                  color: "bg-purple-100",
                  iconColor: "text-purple-600"
                },
                {
                  icon: Heart,
                  title: "Beginner Friendly",
                  description: "Clear instructions and intuitive interfaces. No tech skills required.",
                  color: "bg-red-100",
                  iconColor: "text-red-600"
                },
                {
                  icon: Sparkles,
                  title: "Always Growing",
                  description: "We constantly add new tools, games, and resources based on what learners need.",
                  color: "bg-indigo-100",
                  iconColor: "text-indigo-600"
                }
              ].map((feature, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                    </div>
                    <h3 className="font-poppins font-bold text-lg text-[#1A3D7C] mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tips for Success */}
        <section className="py-16 sm:py-20 bg-[#F8FAFC]">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  Tips for Effective Self-Learning
                </h2>
                <p className="text-lg text-gray-700">
                  Get the most out of your digital tutor with these proven strategies.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    title: "Start Small",
                    description: "Begin with one tool or game. Master it before moving to the next. Consistency beats intensity."
                  },
                  {
                    title: "Practice Daily",
                    description: "Even 10-15 minutes daily is more effective than cramming. Use our study timer to build habits."
                  },
                  {
                    title: "Use Multiple Tools",
                    description: "Combine calculators with games and study resources. Different approaches reinforce learning."
                  },
                  {
                    title: "Track Your Progress",
                    description: "Bookmark tools you use often. Notice improvements over time to stay motivated."
                  },
                  {
                    title: "Challenge Yourself",
                    description: "Try brain games at higher difficulty levels. Push beyond your comfort zone gradually."
                  },
                  {
                    title: "Learn with Purpose",
                    description: "Have a clear goal for each session. 'I want to improve typing speed' works better than vague practice."
                  }
                ].map((tip, index) => (
                  <Card key={index} className="p-6 border-l-4 border-[#2BAE66]">
                    <CardContent className="p-0">
                      <h3 className="font-poppins font-bold text-[#1A3D7C] mb-2 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                        {tip.title}
                      </h3>
                      <p className="text-gray-600">{tip.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] mb-6">
                Ready to Start Learning?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Your digital tutor is ready 24/7. No signup, no cost, no limits—just pure learning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tools">
                  <Button size="lg" className="bg-[#1A3D7C] text-white rounded-xl px-8 py-6 text-lg font-semibold hover:bg-[#1A3D7C]/90">
                    <Gamepad2 className="w-5 h-5 mr-2" />
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
