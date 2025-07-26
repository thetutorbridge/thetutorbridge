import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, Play, Users, Calendar, Star, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function MotivationalSessions() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" width={40} height={40} alt="The Tutor Bridge Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">
              TheTutorBridge
            </span>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="#" className="text-sm font-medium text-orange-600">
              Motivational Sessions
            </Link>
            <Link
              href="https://thetutorbridge.com/blog"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:flex text-gray-700">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-brand-orange to-brand-red hover:from-brand-orange-dark hover:to-brand-red-dark">
              Join Session
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-red-50">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container px-4 py-20 md:py-32">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  <Star className="h-4 w-4" />
                  Inspiring Success Stories
                </div>
                <div className="space-y-6">
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    Unlock Your
                    <span className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">
                      {" "}
                      True Potential
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                    Join inspiring live sessions and access recorded webinars on study techniques, mindset development,
                    and success strategies from achievers who've been where you are.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-brand-orange to-brand-red hover:from-brand-orange-dark hover:to-brand-red-dark text-lg px-8 py-4"
                  >
                    Join Live Session
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2">
                    Watch Free Preview
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-3xl blur-3xl opacity-20"></div>
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  width={600}
                  height={600}
                  alt="Motivational session"
                  className="relative rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Session Topics */}
        <section className="py-20 bg-white">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Popular
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {" "}
                  Session Topics
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Learn from real experiences and proven strategies for academic and personal success
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-orange-100">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">How I Cracked 16 Internships During College</h3>
                  <p className="text-gray-600 mb-4">
                    Learn the exact strategies, networking techniques, and application processes that led to multiple
                    internship offers.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      2,500+ attended
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      4.9/5 rating
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-red-50 to-red-100">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Failing an Exam Isn't the End: What to Do Next</h3>
                  <p className="text-gray-600 mb-4">
                    Overcome setbacks, rebuild confidence, and create a comeback strategy that turns failure into
                    success.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      1,800+ attended
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      4.8/5 rating
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Smart Study Techniques for Board Toppers</h3>
                  <p className="text-gray-600 mb-4">
                    Discover proven study methods, time management strategies, and exam preparation techniques from top
                    scorers.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      3,200+ attended
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      4.9/5 rating
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Your Network is Your Net Worth: How to Start Early</h3>
                  <p className="text-gray-600 mb-4">
                    Build meaningful connections, leverage social media professionally, and create opportunities through
                    networking.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      1,500+ attended
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      4.7/5 rating
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Session Formats */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Choose Your
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {" "}
                  Learning Format
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Flexible options to fit your schedule and learning preferences
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-2 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
                      <Video className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Live Sessions</h3>
                      <p className="text-gray-600">Interactive webinars with Q&A</p>
                    </div>
                  </div>
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center">
                      <span>Single Session</span>
                      <span className="font-bold text-orange-600">₹49-199</span>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-orange-500" />
                        <span>Live interaction with speaker</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-orange-500" />
                        <span>Q&A session included</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-orange-500" />
                        <span>Session recording provided</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-orange-500" />
                        <span>Certificate of attendance</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">Join Next Live Session</Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-500 hover:shadow-xl transition-all duration-300 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Best Value
                  </span>
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">All-Access Pass</h3>
                      <p className="text-gray-600">Unlimited recorded sessions</p>
                    </div>
                  </div>
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center">
                      <span>Monthly Subscription</span>
                      <span className="font-bold text-red-600">₹499</span>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-red-500" />
                        <span>Access to all recorded sessions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-red-500" />
                        <span>New sessions added weekly</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-red-500" />
                        <span>Downloadable resources</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-red-500" />
                        <span>Priority access to live sessions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-red-500" />
                        <span>Community access</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700">Start Free Trial</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Upcoming Sessions */}
        <section className="py-20 bg-white">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Upcoming
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {" "}
                  Live Sessions
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Don't miss these inspiring sessions happening this month
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-orange-600 mb-3">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">June 25, 2024 • 7:00 PM</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">From Zero to Hero: My JEE Success Story</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Learn how I went from average scores to cracking JEE Advanced
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-600 font-bold">₹99</span>
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                      Register
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-orange-600 mb-3">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">June 28, 2024 • 6:30 PM</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Time Management Mastery for Students</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Proven techniques to balance studies, hobbies, and social life
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-600 font-bold">₹149</span>
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                      Register
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-orange-600 mb-3">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">July 2, 2024 • 8:00 PM</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Building Confidence for Board Exams</h3>
                  <p className="text-gray-600 text-sm mb-4">Overcome exam anxiety and perform at your best</p>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-600 font-bold">₹79</span>
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                      Register
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <div className="container px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Inspired?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of motivated students who are transforming their mindset and achieving their goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Join Next Session
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-orange-600"
              >
                Browse All Sessions
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" width={32} height={32} alt="The Tutor Bridge Logo" className="h-8 w-8" />
                <span className="text-xl font-bold">TheTutorBridge</span>
              </div>
              <p className="text-gray-400">Transforming education through personalized learning experiences.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    One-on-One Tutoring
                  </Link>
                </li>
                <li>
                  <Link href="/doubt-solving" className="hover:text-white transition-colors">
                    Doubt Solving
                  </Link>
                </li>
                <li>
                  <Link href="/career-guidance" className="hover:text-white transition-colors">
                    Career Guidance
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="https://thetutorbridge.com/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>info@thetutorbridge.com</li>
                <li>+91 98765 43210</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            © {new Date().getFullYear()} The Tutor Bridge. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
