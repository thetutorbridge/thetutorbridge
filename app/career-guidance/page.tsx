import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, Target, Users, TrendingUp, Award, BookOpen, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CareerGuidance() {
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
            <Link href="#" className="text-sm font-medium text-purple-600">
              Career Guidance
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
            <Button className="bg-gradient-to-r from-purple-600 to-brand-orange hover:from-purple-700 hover:to-brand-orange-dark">
              Book Session
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-orange-50">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container px-4 py-20 md:py-32">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  <Target className="h-4 w-4" />
                  Expert Career Mentorship
                </div>
                <div className="space-y-6">
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    Shape Your
                    <span className="bg-gradient-to-r from-purple-600 to-brand-orange bg-clip-text text-transparent">
                      {" "}
                      Future Career
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                    Get personalized career guidance from industry experts. Make informed decisions about stream
                    selection, college choices, and career paths with our comprehensive mentorship program.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-lg px-8 py-4"
                  >
                    Book Free Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2">
                    View Success Stories
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-3xl blur-3xl opacity-20"></div>
                <Image
                  src="/success.jpg?height=600&width=600"
                  width={600}
                  height={600}
                  alt="Career guidance session"
                  className="relative rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-white">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our Career
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {" "}
                  Services
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive career guidance tailored to your goals and aspirations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Stream Selection</h3>
                  <p className="text-gray-600">
                    Get expert advice on choosing between Science, Commerce, or Humanities based on your interests and
                    career goals.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-indigo-50 to-indigo-100">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">College Roadmap</h3>
                  <p className="text-gray-600">
                    Detailed guidance on entrance exams, college applications, and roadmaps to top institutions like
                    IIT, AIIMS, and more.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <Briefcase className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Career Planning</h3>
                  <p className="text-gray-600">
                    Explore various career options, understand industry trends, and create a personalized career
                    development plan.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Skill Development</h3>
                  <p className="text-gray-600">
                    Identify key skills needed for your chosen career and get guidance on internships, certifications,
                    and projects.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-orange-100">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">LinkedIn & Networking</h3>
                  <p className="text-gray-600">
                    Learn how to build a professional online presence and network effectively for future opportunities.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-pink-50 to-pink-100">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Goal Setting</h3>
                  <p className="text-gray-600">
                    Set SMART career goals and create actionable plans to achieve your short-term and long-term
                    objectives.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Investment in Your
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {" "}
                  Future
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Choose the mentorship plan that fits your needs</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-2 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Single Session</h3>
                  <div className="text-4xl font-bold text-purple-600 mb-6">
                    ₹199-999
                    <span className="text-lg font-normal text-gray-600">/session</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                      <span>1-hour personalized session</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                      <span>Expert career counselor</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                      <span>Detailed career assessment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                      <span>Personalized action plan</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                      <span>Resource recommendations</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Book Single Session</Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-500 hover:shadow-xl transition-all duration-300 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Best Value
                  </span>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">3-Month Mentorship</h3>
                  <div className="text-4xl font-bold text-purple-600 mb-6">
                    ₹2,499
                    <span className="text-lg font-normal text-gray-600">/3 months</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                      <span>6 one-on-one sessions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                      <span>Dedicated career mentor</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                      <span>Comprehensive career roadmap</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                      <span>Monthly progress reviews</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                      <span>WhatsApp support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                      <span>LinkedIn profile optimization</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Start Mentorship</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="container px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Plan Your Career?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Take the first step towards a successful career with expert guidance
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Book Free Consultation
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Image src="/success.jpg" width={32} height={32} alt="The Tutor Bridge Logo" className="h-8 w-8" />
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
