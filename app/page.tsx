import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { BookOpen, MessageSquare, Users, Award, Star, CheckCircle, ArrowRight, Play, Target, Lightbulb, TrendingUp, Clock, Shield, Globe, UserCheck, BookMarked, Brain, Phone, Mail, MapPin, ChevronDown, ChevronUp, Calendar, User, GraduationCap, Zap, Heart, Trophy, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import FloaterMessenger from "@/app/components/FloaterMessenger"
import FAQ from "@/components/FAQ"

export const metadata: Metadata = {
  title: "The Tutor Bridge – Guiding Students, Building Futures",
  description:
    "Academic support, career mentorship, and resources to help students from Class 6 to 12 discover their true path.",
  alternates: {
    canonical: "https://www.thetutorbridge.com",
  },
}

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden font-merriweather">
      {/* Background */}
      <div className="fixed inset-0 -z-10 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A3D7C]/5 via-[#2BAE66]/5 to-[#FFC857]/10" />
      </div>

      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-poppins font-bold leading-tight mb-6">
              Guiding Students.
            <br />
              <span className="text-[#FFC857]">Building Futures.</span>
          </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 font-merriweather">
              Trusted mentorship for confident learners. Personalized education, career guidance, and academic support for students from Class 6 to 12.
          </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/book-demo-class">
              <Button
                size="lg"
                  className="bg-[#FFC857] text-[#1A3D7C] rounded-xl px-8 py-4 hover:shadow-lg hover:bg-[#FFC857]/90 transition-all text-lg font-semibold"
              >
                  Book a Free Session
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                  className="border-2 border-white text-white rounded-xl px-8 py-4 hover:bg-white hover:text-[#1A3D7C] transition-all text-lg font-semibold"
              >
                  How It Works
              </Button>
            </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#FFC857]" />
                <span>Free Demo Sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#FFC857]" />
                <span>Expert Mentors</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#FFC857]" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-[#1A3D7C]">5000+</div>
                <div className="text-gray-600">Students Helped</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-[#2BAE66]">95%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-[#FFC857]">50+</div>
                <div className="text-gray-600">Expert Mentors</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-[#1A3D7C]">4.9★</div>
                <div className="text-gray-600">Student Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem/Challenge Section */}
        <section className="py-20 bg-[#F8FAFC]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-6">
                Feeling lost in the academic path?
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Many students and parents face these common challenges in their educational journey.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3">Overwhelmed with Subject Choices</h3>
                <p className="text-gray-600">Too many options, not sure which path to take for your future career.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3">Unclear Exam Preparation</h3>
                <p className="text-gray-600">Not sure how to prepare for competitive exams or board examinations effectively.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3">Lack of Guidance Leads to Stress</h3>
                <p className="text-gray-600">Without proper mentorship, academic pressure becomes overwhelming and stressful.</p>
              </div>
            </div>
            <div className="text-center mt-12">
              <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
                <div className="flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-[#FFC857] fill-current" />
                  <Star className="w-6 h-6 text-[#FFC857] fill-current" />
                  <Star className="w-6 h-6 text-[#FFC857] fill-current" />
                  <Star className="w-6 h-6 text-[#FFC857] fill-current" />
                  <Star className="w-6 h-6 text-[#FFC857] fill-current" />
                </div>
                <blockquote className="text-lg italic text-gray-700 mb-4">
                  "I was struggling with math and didn't know how to prepare for JEE. The Tutor Bridge helped me understand concepts clearly and gave me a clear roadmap to success."
                </blockquote>
                <cite className="text-[#1A3D7C] font-semibold">- Priya Sharma, Class 12 Student</cite>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-6">
                Why Choose The Tutor Bridge?
            </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                We provide comprehensive educational support that goes beyond traditional tutoring to help students excel academically and personally.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#1A3D7C]">Personalized Learning</h3>
                  <p className="text-gray-600">Customized study plans tailored to each student's learning style and pace.</p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#1A3D7C]">24/7 Doubt Support</h3>
                  <p className="text-gray-600">Get instant help with your academic questions anytime, anywhere.</p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#1A3D7C]">Career Guidance</h3>
                  <p className="text-gray-600">Expert mentorship to help you discover and pursue your passion.</p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#1A3D7C]">Proven Results</h3>
                  <p className="text-gray-600">95% of our students show significant improvement in their grades.</p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#1A3D7C]">Safe & Secure</h3>
                  <p className="text-gray-600">Your data and privacy are protected with enterprise-grade security.</p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#1A3D7C]">Flexible Learning</h3>
                  <p className="text-gray-600">Learn from anywhere with our online platform and mobile app.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-6">
                How We Help You
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Comprehensive educational support designed to help students excel in their academic journey.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Link href="/study-resources">
                <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <CardContent className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[#1A3D7C]">Study Resources</h3>
                    <p className="text-gray-600 text-sm mb-4">Comprehensive study materials, notes, and practice papers for classes 6-12.</p>
                    <div className="flex items-center justify-center text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                      Explore <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/doubt-solving">
                <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <CardContent className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <MessageSquare className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[#1A3D7C]">Doubt Solving</h3>
                    <p className="text-gray-600 text-sm mb-4">Get instant answers to your academic questions from expert tutors.</p>
                    <div className="flex items-center justify-center text-green-600 font-semibold group-hover:translate-x-1 transition-transform">
                      Ask Now <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/career-guidance">
                <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <CardContent className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[#1A3D7C]">Career Guidance</h3>
                    <p className="text-gray-600 text-sm mb-4">Expert mentorship to help you discover and pursue your passion.</p>
                    <div className="flex items-center justify-center text-yellow-600 font-semibold group-hover:translate-x-1 transition-transform">
                      Get Guidance <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/calculators">
                <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <CardContent className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Calculator className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[#1A3D7C]">Financial Calculators</h3>
                    <p className="text-gray-600 text-sm mb-4">Free SIP and EMI calculators to plan your investments and loans.</p>
                    <div className="flex items-center justify-center text-orange-600 font-semibold group-hover:translate-x-1 transition-transform">
                      Calculate <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/blog">
                <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <CardContent className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[#1A3D7C]">Educational Blog</h3>
                    <p className="text-gray-600 text-sm mb-4">Insights, tips, and articles on education and career development.</p>
                    <div className="flex items-center justify-center text-purple-600 font-semibold group-hover:translate-x-1 transition-transform">
                      Read Blog <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gradient-to-br from-[#F8FAFC] to-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-6">
                How It Works
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Our simple 4-step process ensures you get the best learning experience tailored to your needs.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center relative">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <Calendar className="w-10 h-10 text-white" />
                </div>
                <div className="absolute top-10 left-1/2 transform translate-x-8 hidden lg:block">
                  <ArrowRight className="w-6 h-6 text-[#2BAE66]" />
                </div>
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-3">1. Sign Up / Free Session</h3>
                <p className="text-gray-600">Book a free demo session to experience our teaching methodology and meet your potential mentor.</p>
              </div>

              <div className="text-center relative">
                <div className="w-20 h-20 bg-gradient-to-br from-[#2BAE66] to-[#FFC857] rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <UserCheck className="w-10 h-10 text-white" />
                </div>
                <div className="absolute top-10 left-1/2 transform translate-x-8 hidden lg:block">
                  <ArrowRight className="w-6 h-6 text-[#2BAE66]" />
                </div>
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-3">2. Assessment & Matching</h3>
                <p className="text-gray-600">We assess your learning style and match you with the perfect mentor based on your needs.</p>
              </div>

              <div className="text-center relative">
                <div className="w-20 h-20 bg-gradient-to-br from-[#FFC857] to-[#1A3D7C] rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <BookMarked className="w-10 h-10 text-white" />
                </div>
                <div className="absolute top-10 left-1/2 transform translate-x-8 hidden lg:block">
                  <ArrowRight className="w-6 h-6 text-[#2BAE66]" />
                </div>
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-3">3. Personalized Learning Plan</h3>
                <p className="text-gray-600">Get a customized study plan designed specifically for your academic goals and learning pace.</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-3">4. Ongoing Support & Progress</h3>
                <p className="text-gray-600">Receive continuous support, regular progress tracking, and adjustments to ensure your success.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-6">
                What Our Students Say
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Don't just take our word for it. Here's what our students have to say about their experience with The Tutor Bridge.
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
                    "The Tutor Bridge helped me improve my math grades from 60% to 95%. The personalized approach and 24/7 doubt support made all the difference!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-semibold">A</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Ananya Sharma</div>
                      <div className="text-sm text-gray-600">Class 12, CBSE</div>
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
                    "The career guidance sessions helped me discover my passion for computer science. Now I'm pursuing my dream course at IIT!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 font-semibold">R</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Rahul Kumar</div>
                      <div className="text-sm text-gray-600">IIT Student</div>
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
                    "The study resources are amazing! The notes are so well-structured and easy to understand. My physics concepts are now crystal clear."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-semibold">P</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Priya Patel</div>
                      <div className="text-sm text-gray-600">Class 11, ICSE</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ />

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6">
              Ready to Start Your Academic Journey?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Join thousands of successful students who have achieved their dreams with The Tutor Bridge. Book your free demo session today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/book-demo-class">
                <Button
                  size="lg"
                  className="bg-[#FFC857] text-[#1A3D7C] rounded-xl px-8 py-4 hover:shadow-lg hover:bg-[#FFC857]/90 transition-all text-lg font-semibold"
                >
                  Book Your Free Session Now
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
                <Shield className="w-5 h-5 text-[#FFC857]" />
                <span>No Obligation</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#FFC857]" />
                <span>Satisfaction Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#FFC857]" />
                <span>Instant Results</span>
              </div>
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
                <Image src="/TheTutorBridge Logo New.png" width={32} height={32} alt="The Tutor Bridge Logo" className="h-8 w-8" />
                <span className="text-xl font-bold">TheTutorBridge</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                India's leading online tutoring platform helping students achieve academic excellence since 2020.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/thetutorbridge/" className="text-gray-400 hover:text-white transition-colors">
                  LinkedIn
                </a>
                <a href="https://t.me/thetutorbridge" className="text-gray-400 hover:text-white transition-colors">
                  Telegram
                </a>
              </div>
            </div>
            {/* <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
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
                <li>
                  <Link href="/study-resources" className="hover:text-white transition-colors">
                    Study Resources
                  </Link>
                </li>
              </ul>
            </div> */}
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
                <li>+91 9310096171</li>
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