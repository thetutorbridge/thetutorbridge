import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BookOpen, Star, Users, Award, MessageSquare, Target, Play, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import FloaterMessenger from "@/app/components/FloaterMessenger"
import PhotoSlider from "@/app/components/PhotoSlider"

export const metadata: Metadata = {
  title: "The Tutor Bridge - #1 Online Tutoring Platform for Grades 6-12 | Math, Science, English",
  description:
    "India's leading online tutoring platform offering personalized 1-on-1 sessions, instant doubt solving, career guidance & study resources for grades 6-12. 95% success rate. Book free trial today!",
  alternates: {
    canonical: "https://thetutorbridge.com",
  },
}

export default function Home() {

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      {/* Full-width background image with overlay */}
      <div className="fixed inset-0 -z-10 w-full h-full">
        <Image
          src="/banner.png"
          alt="Background"
          fill
          className="object-cover object-center w-full h-full opacity-10 blur-xl"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-brand-blue/5 to-brand-amber/10" />
      </div>
      <Navigation />
      <main className="flex-1">
        {/* Hero Section - Modern and Beautiful */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-brand-blue/10 min-h-[90vh] flex items-start pt-0">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-brand-blue/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-brand-teal/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-brand-amber/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
          </div>

          <div className="container px-4 pt-8 relative z-10">
            <div className="grid gap-16 lg:grid-cols-2 items-start">
              <div className="space-y-8">
                {/* Trust Badge */}
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
                  <div className="flex -space-x-2">
                    <Image
                      src="/male.png?height=32&width=32"
                      width={32}
                      height={32}
                      alt="Student"
                      className="rounded-full border-2 border-white"
                    />
                    <Image
                      src="/female.png?height=32&width=32"
                      width={32}
                      height={32}
                      alt="Student"
                      className="rounded-full border-2 border-white"
                    />
                    <Image
                      src="/male.png?height=32&width=32"
                      width={32}
                      height={32}
                      alt="Student"
                      className="rounded-full border-2 border-white"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Trusted by 1000+ students</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-brand-amber text-brand-amber" />
                    <span className="text-sm font-medium text-gray-700">4.7/5</span>
                  </div>
                </div>

                {/* Main Headline */}
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                    <span className="text-gray-900">Transform Your</span>
                    <br />
                    <span className="bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent">
                      Academic Journey
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl font-light">
                    Get personalized 1-on-1 tutoring from IIT/NIT graduates. Join 1000+ students who improved their
                    grades by
                    <span className="font-semibold text-brand-blue"> 40% in just 3 months</span>.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/book-demo-class">
                    <Button
                      size="lg"
                      className="text-white text-lg px-8 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    >
                      Book Free Demo Class
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-3 gap-8 pt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-blue mb-1">95%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-teal mb-1">100+</div>
                    <div className="text-sm text-gray-600">Expert Tutors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-amber mb-1">24/7</div>
                    <div className="text-sm text-gray-600">Support</div>
                  </div>
                </div>
              </div>

              {/* Photo Slider */}
              <PhotoSlider />


            </div>
          </div>
        </section>

        {/* Services Section - Premium Design */}
        <section className="py-24 bg-white">
          <div className="container px-4">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-amber/20 text-brand-amber rounded-full text-sm font-medium mb-6">
                <Award className="h-4 w-4" />
                Complete Learning Ecosystem
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                <span className="text-gray-900">Everything You Need for</span>
                <br />
                <span className="bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent">
                  Academic Excellence
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                From personalized tutoring to career guidance - we provide comprehensive support for grades 6-12
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Instant Doubt Solving */}
              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-brand-teal/5 to-brand-blue/10 relative overflow-hidden transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/10 to-brand-blue/10"></div>
                <CardContent className="p-8 relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-teal to-brand-blue rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Instant Doubt Solving</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Upload questions via WhatsApp and get detailed solutions within 30-60 minutes.
                  </p>
                  <Link href="/doubt-solving">
                    <Button className="w-full rounded-xl py-3">
                      Try Free Doubt
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Career Guidance */}
              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-brand-blue/5 to-brand-amber/10 relative overflow-hidden transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-brand-amber/10"></div>
                <CardContent className="p-8 relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-teal rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Career Guidance</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Expert mentorship for stream selection, college roadmaps, and career planning.
                  </p>
                  <Link href="/career-guidance">
                    <Button className="w-full rounded-xl py-3">
                      Book Consultation
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Study Resources */}
              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-brand-blue/5 to-white relative overflow-hidden transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-white"></div>
                <CardContent className="p-8 relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-teal rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Study Resources</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Premium notes, formula sheets, mock tests, and revision materials.
                  </p>
                  <div className="space-y-3 mb-6"></div>
                  <Link href="/study-resources">
                    <Button className="w-full rounded-xl py-3">
                      Download Sample
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-brand-blue/10">
          <div className="container px-4">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-teal/10 text-brand-teal rounded-full text-sm font-medium mb-6">
                <TrendingUp className="h-4 w-4" />
                Real Results from Real Students
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                <span className="text-gray-900">Success Stories That</span>
                <br />
                <span className="bg-gradient-to-r from-brand-teal to-brand-blue bg-clip-text text-transparent">
                  Inspire Excellence
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Priya Sharma",
                  grade: "Class 12, CBSE",
                  improvement: "Math: 65% → 92%",
                  quote:
                    "The personalized attention helped me understand calculus concepts I was struggling with for months.",
                  image: "/female.png",
                },
                {
                  name: "Rahul Verma",
                  grade: "Class 11, Science",
                  improvement: "Physics: 58% → 89%",
                  quote:
                    "The doubt solving feature is amazing! I get answers within 30 minutes and understand every step.",
                  image: "/male.png",
                },
                {
                  name: "Anjali Patel",
                  grade: "Class 10, ICSE",
                  improvement: "Overall: 72% → 94%",
                  quote:
                    "Career guidance sessions helped me choose the right stream. Now I'm confident about my future!",
                  image: "/female.png",
                },
              ].map((story, index) => (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
                >
                  <CardContent className="p-8">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-brand-amber text-brand-amber" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed italic">"{story.quote}"</p>
                    <div className="flex items-center gap-4">
                      <Image
                        src={story.image || "/placeholder.svg"}
                        width={60}
                        height={60}
                        alt={story.name}
                        className="rounded-full border-2 border-gray-200"
                      />
                      <div>
                        <div className="font-bold text-gray-900">{story.name}</div>
                        <div className="text-sm text-gray-600">{story.grade}</div>
                        <div className="text-sm font-medium text-brand-teal">{story.improvement}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-brand-blue to-brand-teal text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-10"></div>
          </div>
          <div className="container px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Ready to Transform Your
              <br />
              <span className="bg-gradient-to-r from-brand-amber to-white/90 bg-clip-text text-transparent">
                Academic Journey?
              </span>
            </h2>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
              Join 10,000+ students who improved their grades by 40% with The Tutor Bridge. Start your transformation
              today with a free demo class!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/book-demo-class">
              <Button
                size="lg"
                className="bg-white text-brand-blue hover:bg-gray-100 text-lg px-10 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Book Free Demo Class
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-6 rounded-2xl border-2 border-white text-white hover:bg-white hover:text-brand-blue transition-all duration-300 font-semibold"
              >
                Call +91-93100-96171
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
              <p className="text-gray-400 leading-relaxed">
                India's leading online tutoring platform helping students achieve academic excellence since 2020.
              </p>
              <div className="flex space-x-4">
                {/* <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Facebook
                </a> */}
                {/* <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Instagram
                </a> */}
                <a href="https://www.linkedin.com/company/thetutorbridge/" className="text-gray-400 hover:text-white transition-colors">
                  LinkedIn
                </a>
                <a href="https://t.me/thetutorbridge" className="text-gray-400 hover:text-white transition-colors">
                  Telegram
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                {/* <li>
                  <Link href="/tutoring" className="hover:text-white transition-colors">
                    One-on-One Tutoring
                  </Link>
                </li> */}
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
                {/* <li>
                  <Link href="/motivational-sessions" className="hover:text-white transition-colors">
                    Motivational Sessions
                  </Link>
                </li> */}
                <li>
                  <Link href="/study-resources" className="hover:text-white transition-colors">
                    Study Resources
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
                  <Link href="https://thetutorbridge.com/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 info@thetutorbridge.com</li>
                <li>📞 +91-93100-96171</li>
                <li>🕒 Mon-Sat: 9 AM - 8 PM</li>
                <li>📍 India (Online Services)</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} The Tutor Bridge. All rights reserved. | Helping students excel since 2020
            </p>
          </div>
        </div>
      </footer>
      {/* Static Messenger (no useState, no interactivity) */}
      <FloaterMessenger />
    </div>
  )
}
