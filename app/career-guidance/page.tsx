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
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import FloaterMessenger from "@/app/components/FloaterMessenger"
import CareerGuidanceFAQ from "@/components/CareerGuidanceFAQ"

// Metadata is handled in layout.tsx for client components


export default function CareerGuidance() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden font-merriweather">
      {/* Background */}
      <div className="fixed inset-0 -z-10 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A3D7C]/5 via-[#2BAE66]/5 to-[#FFC857]/10" />
      </div>

      <Navigation />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-poppins font-bold leading-tight mb-6">
              Find Your Path.
              <br />
              <span className="text-[#FFC857]">Shape Your Future.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 font-merriweather">
              From subject choices to scholarships and career planning — we guide students at every step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/tutoring/free-consultation">
                <Button
                  size="lg"
                  className="bg-[#FFC857] text-[#1A3D7C] rounded-xl px-8 py-4 hover:shadow-lg hover:bg-[#FFC857]/90 transition-all text-lg font-semibold"
                >
                  Book a Free Guidance Session
                </Button>
              </Link>
              <Link href="#success-stories">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white rounded-xl px-8 py-4 hover:bg-white hover:text-[#1A3D7C] transition-all text-lg font-semibold"
                >
                  View Success Stories
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#FFC857]" />
                <span>Expert Career Counselors</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#FFC857]" />
                <span>Personalized Roadmaps</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#FFC857]" />
                <span>Study Abroad Guidance</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Why Career Guidance Matters */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-6">
                Why Career Guidance Matters
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Today's students face more choices than ever before. Without proper guidance, these decisions can become overwhelming and lead to career paths that don't align with their true potential.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-red-50 to-red-100">
                <CardContent>
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3">Confusion about Subject Choices</h3>
                  <p className="text-gray-600">Students often struggle to choose between Science, Commerce, and Arts streams without understanding their long-term career implications.</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-orange-100">
                <CardContent>
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3">Lack of Clarity about Future Careers</h3>
                  <p className="text-gray-600">Many students have limited exposure to various career options and don't understand what different professions actually involve.</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-yellow-50 to-yellow-100">
                <CardContent>
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3">Stress in Planning for Higher Studies</h3>
                  <p className="text-gray-600">The complexity of college applications, entrance exams, and study abroad processes creates significant stress for students and parents.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 3. Our Approach */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-6">
                Our Approach
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Our proven 4-step process ensures you get comprehensive career guidance tailored to your unique needs and aspirations.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center relative">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <div className="absolute top-10 left-1/2 transform translate-x-8 hidden lg:block">
                  <ArrowRight className="w-6 h-6 text-[#2BAE66]" />
                </div>
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-3">1. Assess</h3>
                <p className="text-gray-600">Understanding student's interests, strengths, learning style, and career goals through comprehensive assessment tools.</p>
              </div>

              <div className="text-center relative">
                <div className="w-20 h-20 bg-gradient-to-br from-[#2BAE66] to-[#FFC857] rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <Compass className="w-10 h-10 text-white" />
                </div>
                <div className="absolute top-10 left-1/2 transform translate-x-8 hidden lg:block">
                  <ArrowRight className="w-6 h-6 text-[#2BAE66]" />
                </div>
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-3">2. Explore</h3>
                <p className="text-gray-600">Sharing academic pathways, career options, industry insights, and real-world opportunities that align with your profile.</p>
              </div>

              <div className="text-center relative">
                <div className="w-20 h-20 bg-gradient-to-br from-[#FFC857] to-[#1A3D7C] rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <div className="absolute top-10 left-1/2 transform translate-x-8 hidden lg:block">
                  <ArrowRight className="w-6 h-6 text-[#2BAE66]" />
                </div>
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-3">3. Plan</h3>
                <p className="text-gray-600">Subject selection, exam strategies, scholarship opportunities, and creating a personalized roadmap for success.</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-3">4. Support</h3>
                <p className="text-gray-600">Continuous mentorship, progress tracking, and ongoing support to ensure you stay on track towards your goals.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Services Offered */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-6">
                Services Offered
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Comprehensive career guidance services designed to help you make informed decisions at every stage of your academic journey.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#1A3D7C]">Subject & Stream Selection</h3>
                  <p className="text-gray-600">Expert guidance for Class 6-12 students on choosing the right subjects and streams based on interests, strengths, and career goals.</p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#1A3D7C]">Career Path Mapping</h3>
                  <p className="text-gray-600">Explore diverse career options in STEM, Commerce, Arts, and Humanities with detailed insights into industry trends and opportunities.</p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
                <CardContent className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#1A3D7C]">Study Abroad Guidance</h3>
                  <p className="text-gray-600">Complete support for international education including university selection, scholarships, application processes, and visa guidance.</p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-yellow-50 to-yellow-100">
                <CardContent className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#1A3D7C]">Skill & Personality Development</h3>
                  <p className="text-gray-600">Identify and develop essential skills, personality traits, and competencies needed for your chosen career path.</p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-red-50 to-red-100">
                <CardContent className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#1A3D7C]">Resume Building & Applications</h3>
                  <p className="text-gray-600">Professional resume building, college application support, and interview preparation to help you stand out.</p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-indigo-50 to-indigo-100">
                <CardContent className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#1A3D7C]">Ongoing Mentorship</h3>
                  <p className="text-gray-600">Continuous support and guidance throughout your academic journey with regular check-ins and progress tracking.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 5. Success Stories */}
        <section id="success-stories" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-6">
                Success Stories
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Don't just take our word for it. Here's what our students have achieved with our career guidance.
              </p>
            </div>
            
            {/* Success Metrics */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-16 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="text-4xl md:text-5xl font-bold text-[#2BAE66] mb-2">95%</div>
                <p className="text-lg text-gray-700">of students reported improved clarity in career direction after just 3 sessions with The Tutor Bridge.</p>
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
                    "The career guidance helped me discover my passion for computer science. I was confused between engineering and medicine, but the counselor helped me understand my strengths and interests clearly."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-semibold">A</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Arjun Sharma</div>
                      <div className="text-sm text-gray-600">IIT Computer Science Student</div>
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
                    "The study abroad guidance was exceptional. They helped me secure a full scholarship to study in Canada and guided me through the entire application process."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 font-semibold">P</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Priya Patel</div>
                      <div className="text-sm text-gray-600">University of Toronto</div>
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
                    "As a parent, I was worried about my daughter's career choices. The counselor helped both of us understand the options and made the decision-making process much clearer."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-semibold">R</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Rajesh Kumar</div>
                      <div className="text-sm text-gray-600">Parent of Class 11 Student</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 6. Tools & Resources */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-6">
                Tools & Resources
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Access our comprehensive collection of career guidance tools and resources to support your journey.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100 h-full flex flex-col">                                                                                    
                <CardContent className="text-center flex flex-col h-full">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">                                                                                                   
                    <BookOpen className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#1A3D7C]">Career Roadmaps</h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">Detailed career pathways and roadmaps for various fields and industries.</p>                                                                              
                  <div className="text-blue-600 font-semibold">Coming Soon</div>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100 h-full flex flex-col">                                                                                  
                <CardContent className="text-center flex flex-col h-full">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">                                                                                                   
                    <Brain className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#1A3D7C]">Aptitude Tests</h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">Comprehensive assessments to identify your strengths, interests, and career inclinations.</p>                                                               
                  <div className="text-green-600 font-semibold">Coming Soon</div>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100 h-full flex flex-col">                                                                                
                <CardContent className="text-center flex flex-col h-full">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">                                                                                                  
                    <Award className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#1A3D7C]">Guidance Webinars</h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">Recorded sessions and live webinars on various career topics and industry insights.</p>                                                                     
                  <div className="text-purple-600 font-semibold">Coming Soon</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 7. Meet Our Mentors */}
        <section className="py-20 bg-gradient-to-br from-[#F8FAFC] to-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-6">
                Meet Our Mentors
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Our team of experienced career counselors and industry experts are here to guide you on your journey.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="p-6 text-center hover:shadow-xl transition-all duration-300">
                <CardContent>
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1A3D7C] mb-2">Industry Experts</h3>
                  <p className="text-gray-600">Our mentors come from diverse backgrounds including technology, healthcare, finance, and education sectors.</p>
                </CardContent>
              </Card>

              <Card className="p-6 text-center hover:shadow-xl transition-all duration-300">
                <CardContent>
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1A3D7C] mb-2">Academic Excellence</h3>
                  <p className="text-gray-600">Many of our counselors have advanced degrees and extensive experience in academic counseling and career development.</p>
                </CardContent>
              </Card>

              <Card className="p-6 text-center hover:shadow-xl transition-all duration-300">
                <CardContent>
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1A3D7C] mb-2">Passionate Mentors</h3>
                  <p className="text-gray-600">Our team is passionate about helping students discover their potential and achieve their career dreams.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 8. Call-to-Action */}
        <section className="py-20 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6">
              Your Career Journey Shouldn't Be Confusing
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Let us help you build clarity and confidence today. Book your free guidance session and take the first step towards a successful career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/tutoring/free-consultation">
                <Button
                  size="lg"
                  className="bg-[#FFC857] text-[#1A3D7C] rounded-xl px-8 py-4 hover:shadow-lg hover:bg-[#FFC857]/90 transition-all text-lg font-semibold"
                >
                  Book Your Guidance Session
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
                <CheckCircle className="w-5 h-5 text-[#FFC857]" />
                <span>Free Initial Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#FFC857]" />
                <span>Personalized Approach</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#FFC857]" />
                <span>Proven Results</span>
              </div>
            </div>
          </div>
        </section>

        {/* 9. FAQ Section */}
        <CareerGuidanceFAQ />
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
