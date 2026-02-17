"use client"

import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { 
  ArrowRight, 
  CheckCircle, 
  Target, 
  Users, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Briefcase,
  Globe,
  GraduationCap,
  Lightbulb,
  FileText,
  Star,
  Brain,
  Heart,
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  Compass,
  UserCheck,
  BookMarked,
  Zap,
  Play,
  Calendar,
  Video,
  MessageSquare,
  Shield,
  Trophy
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import FloaterMessenger from "@/app/components/FloaterMessenger"
import MotivationalSessionsFAQ from "@/components/MotivationalSessionsFAQ"


export default function MotivationalSessions() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden font-merriweather">
      {/* Background */}
      <div className="fixed inset-0 -z-10 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A3D7C]/5 via-[#FFC857]/10 to-[#2BAE66]/5" />
      </div>

      <Navigation />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-[#FFC857] to-[#1A3D7C] text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-poppins font-bold leading-tight mb-6">
              Inspiration That
              <br />
              <span className="text-[#FFC857]">Transforms Learning.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 font-merriweather">
              Our motivational sessions empower students with confidence, focus, and resilience — helping them dream bigger and achieve more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/tutoring/free-consultation">
                <Button
                  size="lg"
                  className="bg-[#FFC857] text-[#1A3D7C] rounded-xl px-8 py-4 hover:shadow-lg hover:bg-[#FFC857]/90 transition-all text-lg font-semibold"
                >
                  Book a Session
                </Button>
              </Link>
              <Link href="#impact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white rounded-xl px-8 py-4 hover:bg-white hover:text-[#1A3D7C] transition-all text-lg font-semibold"
                >
                  View Impact Stories
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#FFC857]" />
                <span>Interactive Sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#FFC857]" />
                <span>Expert Speakers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#FFC857]" />
                <span>Proven Results</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Why Motivation Matters */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-6">
                Why Motivation Matters
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Students often struggle with stress, procrastination, or self-doubt. Our motivational sessions address these challenges and help students unlock their true potential.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-yellow-50 to-yellow-100">
                <CardContent>
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3">Boost Confidence</h3>
                  <p className="text-gray-600">Build self-belief and overcome fear of failure through inspiring stories and practical strategies.</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3">Improve Focus & Discipline</h3>
                  <p className="text-gray-600">Learn time management techniques and develop the discipline needed for academic success.</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100">
                <CardContent>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3">Unlock Inner Potential</h3>
                  <p className="text-gray-600">Discover hidden talents and develop a growth mindset that leads to continuous improvement.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 3. Our Sessions (How They Work) */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-6">
                Our Sessions
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Our structured approach ensures every student gets maximum value from our motivational sessions.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center relative">
                <div className="w-20 h-20 bg-gradient-to-br from-[#FFC857] to-[#1A3D7C] rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <MessageSquare className="w-10 h-10 text-white" />
                </div>
                <div className="absolute top-10 left-1/2 transform translate-x-8 hidden lg:block">
                  <ArrowRight className="w-6 h-6 text-[#FFC857]" />
                </div>
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-3">1. Interactive Talks</h3>
                <p className="text-gray-600">Real-life examples, storytelling, and engaging presentations that connect with students emotionally.</p>
        </div>

              <div className="text-center relative">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <div className="absolute top-10 left-1/2 transform translate-x-8 hidden lg:block">
                  <ArrowRight className="w-6 h-6 text-[#FFC857]" />
                </div>
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-3">2. Practical Strategies</h3>
                <p className="text-gray-600">Time management, stress handling, study hacks, and actionable techniques for immediate implementation.</p>
              </div>

              <div className="text-center relative">
                <div className="w-20 h-20 bg-gradient-to-br from-[#2BAE66] to-[#FFC857] rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="absolute top-10 left-1/2 transform translate-x-8 hidden lg:block">
                  <ArrowRight className="w-6 h-6 text-[#FFC857]" />
                </div>
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-3">3. Activities & Engagement</h3>
                <p className="text-gray-600">Games, group discussions, reflections, and interactive exercises that make learning fun and memorable.</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#FFC857] to-[#1A3D7C] rounded-full flex items-center justify-center mx-auto mb-6">
                  <UserCheck className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-3">4. Personalized Guidance</h3>
                <p className="text-gray-600">Tailored takeaways, individual attention, and customized action plans for every student's unique needs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Types of Sessions We Offer */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-6">
                Types of Sessions We Offer
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Choose from our diverse range of motivational sessions designed to address different aspects of student development.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-yellow-50 to-yellow-100">
                <CardContent className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#1A3D7C]">Student Motivation Workshops</h3>
                  <p className="text-gray-600">Focus on growth mindset, resilience, and building positive attitudes towards learning and challenges.</p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-red-50 to-red-100">
                <CardContent className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#1A3D7C]">Exam Stress-Busting Sessions</h3>
                  <p className="text-gray-600">Build confidence before board exams and competitive tests with proven stress management techniques.</p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#1A3D7C]">Future Vision Talks</h3>
                  <p className="text-gray-600">Career inspiration, life skills development, and leadership training for holistic student growth.</p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
                <CardContent className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#1A3D7C]">1:1 Motivational Counseling</h3>
                  <p className="text-gray-600">Personal mentoring sessions for individual attention and customized guidance for specific challenges.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 5. Impact Section */}
        <section id="impact" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-6">
                Impact & Results
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Our motivational sessions have transformed thousands of students' lives. Here's what we've achieved together.
              </p>
            </div>
            
            {/* Success Metrics */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-16 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#2BAE66] mb-2">90%</div>
                  <p className="text-lg text-gray-700">of students reported increased confidence after attending our motivational sessions.</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#FFC857] mb-2">85%</div>
                  <p className="text-lg text-gray-700">of parents shared that their children showed better focus and reduced exam anxiety.</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 bg-white/80 backdrop-blur-sm">
                <CardContent>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "The motivational session completely changed my perspective on studies. I went from being afraid of exams to actually looking forward to them!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-yellow-600 font-semibold">S</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Sneha Sharma</div>
                      <div className="text-sm text-gray-600">Class 12 Student</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm">
                <CardContent>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "My son's attitude towards studies completely transformed after the session. He's more focused, confident, and actually enjoys learning now."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 font-semibold">M</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Mrs. Meera Patel</div>
                      <div className="text-sm text-gray-600">Parent of Class 10 Student</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm">
                <CardContent>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "The time management techniques I learned in the session helped me balance my studies, sports, and social life perfectly."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-semibold">A</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Arjun Kumar</div>
                      <div className="text-sm text-gray-600">Class 11 Student</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 6. Highlights from Past Sessions */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-6">
                Highlights from Past Sessions
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Real stories of transformation and success from our motivational sessions.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-yellow-50 to-yellow-100">
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#1A3D7C]">Class 10 Exam Fear Overcome</h3>
                      <p className="text-sm text-gray-600">Success Story</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    "How Class 10 students overcame exam fear in our workshop. 95% of participants reported feeling more confident and prepared for their board exams after just one session."
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100">
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Zap className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#1A3D7C]">JEE Aspirants' Mindset Shift</h3>
                      <p className="text-sm text-gray-600">Transformation Story</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    "A group of JEE aspirants transformed their approach to preparation after our motivation session. They learned to embrace challenges and view failures as stepping stones to success."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 7. Testimonials */}
        <section className="py-20 bg-gradient-to-br from-[#F8FAFC] to-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-6">
                What Students & Parents Say
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Hear from the students and parents whose lives have been transformed by our motivational sessions.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 bg-white/80 backdrop-blur-sm">
                <CardContent>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "The session helped me understand that failure is not the end, but a beginning of something better. I'm now more resilient and confident."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-semibold">R</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Riya Gupta</div>
                      <div className="text-sm text-gray-600">Class 12 Student</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm">
                <CardContent>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "As a parent, I was amazed to see how the session changed my daughter's perspective. She's now more motivated and takes ownership of her studies."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-semibold">D</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Mr. Deepak Singh</div>
                      <div className="text-sm text-gray-600">Parent of Class 11 Student</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm">
                <CardContent>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "The time management techniques and study strategies shared in the session have been game-changers for my academic performance."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 font-semibold">V</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Vikram Joshi</div>
                      <div className="text-sm text-gray-600">Class 10 Student</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 8. Call-to-Action Block */}
        <section className="py-20 bg-gradient-to-r from-[#FFC857] to-[#1A3D7C] text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6">
              Every Student Has a Spark
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Our sessions ignite it into confidence and success. Join thousands of students who have transformed their mindset and achieved their goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/tutoring/free-consultation">
                <Button
                  size="lg"
                  className="bg-white text-[#1A3D7C] rounded-xl px-8 py-4 hover:shadow-lg hover:bg-white/90 transition-all text-lg font-semibold"
                >
                  Book a Motivational Session
              </Button>
              </Link>
              <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                  className="border-2 border-white text-white rounded-xl px-8 py-4 hover:bg-white hover:text-[#1A3D7C] transition-all text-lg font-semibold"
              >
                  Contact Us
              </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-white" />
                <span>Proven Methods</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-white" />
                <span>Success Stories</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-white" />
                <span>Personal Touch</span>
              </div>
            </div>
          </div>
        </section>

        {/* 9. FAQ Section */}
        <MotivationalSessionsFAQ />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Image src="/TheTutorBridge Logo New.png" width={32} height={32} alt="The Tutor Bridge Logo" className="h-8 w-8" />
                <span className="text-xl font-bold">The Tutor Bridge</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Expert online tutoring platform helping students achieve academic excellence. Personalized homework help and 1-on-1 tutoring for grades 6-12.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/thetutorbridge/" target="_blank" rel="noopener noreferrer nofollow" className="text-gray-400 hover:text-white transition-colors">
                  LinkedIn
                </a>
                <a href="https://t.me/thetutorbridge" target="_blank" rel="noopener noreferrer nofollow" className="text-gray-400 hover:text-white transition-colors">
                  Telegram
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/homework-help" className="hover:text-white transition-colors">
                    Homework Help
                  </Link>
                </li>
                <li>
                  <Link href="/career-guidance" className="hover:text-white transition-colors">
                    Career Guidance
                  </Link>
                </li>
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
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>info@thetutorbridge.com</li>
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

      <FloaterMessenger />
    </div>
  )
}
