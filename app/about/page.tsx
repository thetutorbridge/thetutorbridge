import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { ComprehensiveFooter } from "@/components/comprehensive-footer"
import Link from "next/link"
import { Target, Zap, Users, Heart, BookOpen, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us - Your 24/7 Digital Learning Platform | The Tutor Bridge",
  description: "Learn about The Tutor Bridge's mission to provide free interactive learning tools, brain games, and study resources. Empowering self-directed learners worldwide.",
  keywords: [
    "about us",
    "digital learning platform",
    "free educational tools",
    "self-learning platform",
    "interactive learning",
    "educational resources",
    "learning tools",
    "student resources"
  ],
  alternates: {
    canonical: "https://www.thetutorbridge.com/about",
  },
  openGraph: {
    title: "About Us - Your 24/7 Digital Learning Platform",
    description: "Free interactive learning tools, brain games, and study resources for self-directed learners.",
    url: "https://www.thetutorbridge.com/about",
    siteName: "The Tutor Bridge",
    type: "website",
  },
}

export default function About() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden font-merriweather">
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A3D7C]/5 via-[#2BAE66]/5 to-[#FFC857]/10" />
      </div>

      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-white">
          <div className="container px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 bg-[#2BAE66]/10 text-[#2BAE66] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Sparkles className="w-4 h-4" />
                About The Tutor Bridge
              </div>

              <h1 className="text-4xl md:text-6xl font-poppins font-bold text-[#1A3D7C]">
                Empowering Learners,<br />
                <span className="text-[#2BAE66]">One Tool at a Time</span>
              </h1>

              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                We're building the world's most comprehensive free learning platform—where anyone can master new skills through interactive tools, brain games, and self-paced resources.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-[#F8FAFC]">
          <div className="container px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#1A3D7C]">
                    Our Story
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    The Tutor Bridge started with a simple belief: <span className="font-semibold text-[#1A3D7C]">learning should be accessible to everyone, anytime, anywhere.</span>
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    What began as a collection of educational calculators has evolved into a comprehensive platform with <strong>100+ interactive tools</strong>, brain games, career roadmaps, and study resources—all completely free, with no signup required.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Today, we're proud to serve learners worldwide who want to take control of their education through self-paced, interactive learning.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                    <div className="text-4xl font-bold text-[#1A3D7C] mb-2">100+</div>
                    <div className="text-gray-600">Free Tools</div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                    <div className="text-4xl font-bold text-[#2BAE66] mb-2">60+</div>
                    <div className="text-gray-600">Career Roadmaps</div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                    <div className="text-4xl font-bold text-[#FFC857] mb-2">24/7</div>
                    <div className="text-gray-600">Always Available</div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
                    <div className="text-gray-600">Free Forever</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-20 bg-white">
          <div className="container px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  Our Mission
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  To democratize education by providing free, high-quality learning tools that empower self-directed learners to achieve their goals.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Target className="w-8 h-8 text-[#1A3D7C]" />
                  </div>
                  <h3 className="text-xl font-poppins font-bold text-[#1A3D7C]">Accessible</h3>
                  <p className="text-gray-600">
                    No paywalls, no signups, no barriers. Learning should be free and available to everyone.
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Zap className="w-8 h-8 text-[#2BAE66]" />
                  </div>
                  <h3 className="text-xl font-poppins font-bold text-[#1A3D7C]">Interactive</h3>
                  <p className="text-gray-600">
                    Learn by doing with tools, games, and calculators that provide instant feedback.
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                    <Heart className="w-8 h-8 text-[#FFC857]" />
                  </div>
                  <h3 className="text-xl font-poppins font-bold text-[#1A3D7C]">Empowering</h3>
                  <p className="text-gray-600">
                    Build confidence through self-paced learning. Go at your own speed, review as needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="py-20 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white">
          <div className="container px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
                  What We Offer
                </h2>
                <p className="text-xl opacity-90 max-w-3xl mx-auto">
                  Everything you need for self-directed learning, all in one place.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                  <div className="text-4xl mb-4">🧮</div>
                  <h3 className="text-xl font-poppins font-bold mb-2">100+ Calculators</h3>
                  <p className="opacity-90">
                    From GPA to scientific calculations—get instant solutions with step-by-step explanations.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                  <div className="text-4xl mb-4">🎮</div>
                  <h3 className="text-xl font-poppins font-bold mb-2">Brain Games</h3>
                  <p className="opacity-90">
                    Make learning fun with interactive games that test and improve your skills.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                  <div className="text-4xl mb-4">🔧</div>
                  <h3 className="text-xl font-poppins font-bold mb-2">Developer Tools</h3>
                  <p className="opacity-90">
                    80+ tools for developers—JSON formatters, converters, generators, and more.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                  <div className="text-4xl mb-4">📚</div>
                  <h3 className="text-xl font-poppins font-bold mb-2">Study Guides</h3>
                  <p className="opacity-90">
                    Comprehensive NCERT resources and learning materials for all subjects.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                  <div className="text-4xl mb-4">🗺️</div>
                  <h3 className="text-xl font-poppins font-bold mb-2">Career Roadmaps</h3>
                  <p className="opacity-90">
                    60+ tech career paths with step-by-step guidance from beginner to expert.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                  <div className="text-4xl mb-4">📝</div>
                  <h3 className="text-xl font-poppins font-bold mb-2">Blog & Tips</h3>
                  <p className="opacity-90">
                    Expert study tips, learning strategies, and educational insights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-20 bg-white">
          <div className="container px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  Our Core Values
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-[#1A3D7C]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-2">Free for Everyone</h3>
                    <p className="text-gray-600">
                      Education is a right, not a privilege. Every tool, every game, every resource—completely free, forever.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-[#2BAE66]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-2">Learner-Centered</h3>
                    <p className="text-gray-600">
                      We build tools based on what learners actually need, not what's profitable.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-2">Continuous Improvement</h3>
                    <p className="text-gray-600">
                      We're constantly adding new tools, games, and resources based on user feedback.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Zap className="w-6 h-6 text-[#FFC857]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-2">Instant Value</h3>
                    <p className="text-gray-600">
                      No waiting, no forms, no delays. Click a tool and start learning immediately.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#F8FAFC]">
          <div className="container px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#1A3D7C]">
                Join Thousands of Self-Directed Learners
              </h2>
              <p className="text-xl text-gray-600">
                Your digital tutor is ready. Start exploring tools and mastering new skills today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tools">
                  <button className="bg-[#2BAE66] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#2BAE66]/90 transition-all">
                    Explore Tools
                  </button>
                </Link>
                <Link href="/calculators">
                  <button className="border-2 border-[#1A3D7C] text-[#1A3D7C] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#1A3D7C] hover:text-white transition-all">
                    Browse Calculators
                  </button>
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
