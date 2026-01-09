import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us - Expert Online Tutoring & Academic Support",
  description: "Learn about The Tutor Bridge's mission to provide personalized online tutoring, career guidance, and academic support for students in grades 6-12. Meet our expert mentors and discover our success stories.",
  keywords: [
    "about us",
    "online tutoring platform",
    "academic support",
    "career guidance",
    "expert mentors",
    "student success",
    "educational platform",
    "grades 6-12",
    "personalized learning",
    "tutoring mission"
  ],
  alternates: {
    canonical: "https://www.thetutorbridge.com/about",
  },
  openGraph: {
    title: "About Us - Expert Online Tutoring & Academic Support",
    description: "Learn about The Tutor Bridge's mission to provide personalized online tutoring, career guidance, and academic support for students in grades 6-12.",
    url: "https://www.thetutorbridge.com/about",
    siteName: "The Tutor Bridge",
    type: "website",
  },
}

export default function About() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden font-merriweather">
      {/* Background gradient reflecting brand palette */}
      <div className="fixed inset-0 -z-10 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A3D7C]/5 via-[#2BAE66]/5 to-[#FFC857]/10" />
      </div>

      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
          {/* Bridge Visual Background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A3D7C] via-[#2BAE66] to-[#FFC857] opacity-10"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFC857]/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#2BAE66]/20 rounded-full blur-3xl animate-float-slow"></div>
          </div>
          
          <div className="container px-6 py-20 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              <h1 className="text-5xl md:text-7xl font-poppins font-bold leading-tight text-[#1A3D7C] animate-fade-in">
                Guiding Students,<br />
                <span className="text-[#2BAE66]">Building Futures</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed animate-fade-in">
                We connect curious learners with trusted mentors to unlock their true potential.
              </p>
              <div className="pt-6 animate-fade-in">
                <Link href="/study-resources" className="inline-block">
                  <span className="btn-primary text-lg px-8 py-4 rounded-xl font-poppins font-semibold">
                    Explore Study Resources
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-white">
          <div className="container px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-6">
                  Who We Are
                </h2>
                <div className="w-24 h-1 bg-[#2BAE66] mx-auto rounded-full"></div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    Founded in 2020, The Tutor Bridge was born from one mission: to make quality education accessible,
                    personalized, and inspiring. From homework help to 1-on-1 tutoring, we've supported
                    <span className="font-semibold text-[#1A3D7C]"> thousands of students</span> in achieving academic success.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    What started as a simple idea to bridge the gap between students and quality education has grown
                    into a trusted online tutoring platform, helping K-12 students across the United States excel in Math, Science, and English.
                  </p>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] p-8 rounded-2xl text-white">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-2xl">🎯</span>
                        </div>
                        <div>
                          <h3 className="font-poppins font-bold text-lg">2020</h3>
                          <p className="text-white/90">Platform Founded</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-2xl">🚀</span>
                        </div>
                        <div>
                          <h3 className="font-poppins font-bold text-lg">2023</h3>
                          <p className="text-white/90">10,000+ Students</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-2xl">🌍</span>
                        </div>
                        <div>
                          <h3 className="font-poppins font-bold text-lg">2026</h3>
                          <p className="text-white/90">Global Reach</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20 bg-[#F5F5F5]">
          <div className="container px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Mission */}
                <div className="bg-white p-8 rounded-2xl shadow-lg card-hover">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-[#1A3D7C] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">🎯</span>
                    </div>
                    <h3 className="text-2xl font-poppins font-bold text-[#1A3D7C] mb-4">Our Mission</h3>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed text-center">
                    To empower students with clarity, confidence, and personalized guidance — every step of the way.
                  </p>
                </div>

                {/* Vision */}
                <div className="bg-white p-8 rounded-2xl shadow-lg card-hover">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-[#2BAE66] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">👁️</span>
                    </div>
                    <h3 className="text-2xl font-poppins font-bold text-[#1A3D7C] mb-4">Our Vision</h3>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed text-center">
                    To be the trusted academic partner for every learner, helping them discover pathways to success 
                    in school, career, and life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-20 bg-white">
          <div className="container px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-6">
                  Our Core Values
                </h2>
                <div className="w-24 h-1 bg-[#2BAE66] mx-auto rounded-full"></div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* Guidance */}
                <div className="bg-white p-8 rounded-2xl shadow-lg card-hover border-t-4 border-[#1A3D7C]">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-gray-600 text-lg">🧭</span>
                    </div>
                    <h3 className="text-2xl font-poppins font-bold text-[#1A3D7C] mb-4">Guidance</h3>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed text-center">
                    Personalized mentorship for every student, helping them discover their unique path to success.
                  </p>
                </div>

                {/* Growth */}
                <div className="bg-white p-8 rounded-2xl shadow-lg card-hover border-t-4 border-[#2BAE66]">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-gray-600 text-lg">📈</span>
                    </div>
                    <h3 className="text-2xl font-poppins font-bold text-[#1A3D7C] mb-4">Growth</h3>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed text-center">
                    Building skills & confidence through consistent support and personalized learning experiences.
                  </p>
                </div>

                {/* Support */}
                <div className="bg-white p-8 rounded-2xl shadow-lg card-hover border-t-4 border-[#FFC857]">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-gray-600 text-lg">🤝</span>
                    </div>
                    <h3 className="text-2xl font-poppins font-bold text-[#1A3D7C] mb-4">Support</h3>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed text-center">
                    Dedicated homework help & a friendly tutor community always ready to help you succeed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-20 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white">
          <div className="container px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-6">
                  Numbers That Speak
                </h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  Our impact in transforming students' academic journeys
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-poppins font-bold text-[#FFC857] mb-4">
                    95%
                  </div>
                  <div className="text-2xl font-poppins font-semibold mb-2">Satisfaction Rate</div>
                  <p className="text-white/90">Students and parents who recommend our services</p>
                </div>

                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-poppins font-bold text-[#FFC857] mb-4">
                    4.9/5
                  </div>
                  <div className="text-2xl font-poppins font-semibold mb-2">Tutor Rating</div>
                  <p className="text-white/90">Average rating from student feedback</p>
                </div>

                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-poppins font-bold text-[#FFC857] mb-4">
                    50
                  </div>
                  <div className="text-2xl font-poppins font-semibold mb-2">U.S. States</div>
                  <p className="text-white/90">Serving students across all 50 states</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Mentors Section */}
        <section className="py-20 bg-[#F5F5F5]">
          <div className="container px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-6">
                  Meet Our Community
                </h2>
                <div className="w-24 h-1 bg-[#2BAE66] mx-auto rounded-full mb-6"></div>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  Behind The Tutor Bridge is a passionate community of educators, mentors, and counselors — 
                  dedicated to ensuring every student succeeds.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 text-lg">👨‍🏫</span>
                      </div>
                      <div>
                        <h3 className="font-poppins font-bold text-lg text-[#1A3D7C]">Expert Educators</h3>
                        <p className="text-gray-600">Subject matter experts with years of teaching experience</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 text-lg">🎯</span>
                      </div>
                      <div>
                        <h3 className="font-poppins font-bold text-lg text-[#1A3D7C]">Career Counselors</h3>
                        <p className="text-gray-600">Guidance specialists helping students plan their future</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 text-lg">💬</span>
                      </div>
                      <div>
                        <h3 className="font-poppins font-bold text-lg text-[#1A3D7C]">Support Team</h3>
                        <p className="text-gray-600">Dedicated support for homework help and tutoring questions</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] p-8 rounded-2xl text-white">
                    <div className="text-center space-y-6">
                      <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-3xl opacity-80">🌉</span>
                      </div>
                      <h3 className="text-2xl font-poppins font-bold">Building Bridges</h3>
                      <p className="text-white/90 leading-relaxed">
                        We believe in the power of connection. Every mentor-student relationship we facilitate 
                        is a bridge to new possibilities, greater confidence, and brighter futures.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="container px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-6">
                  Success Stories
                </h2>
                <div className="w-24 h-1 bg-[#2BAE66] mx-auto rounded-full"></div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-[#F5F5F5] p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#1A3D7C] rounded-full flex items-center justify-center text-white font-bold">
                      E
                    </div>
                    <div className="ml-4">
                      <h4 className="font-poppins font-bold text-[#1A3D7C]">Emily T.</h4>
                      <p className="text-gray-600 text-sm">10th Grade Student, California</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "The homework help saved me during finals week! My tutor explained calculus concepts
                    so clearly that I finally understood what my teacher couldn't explain."
                  </p>
                  <div className="flex text-[#FFC857] mt-4">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>

                <div className="bg-[#F5F5F5] p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#2BAE66] rounded-full flex items-center justify-center text-white font-bold">
                      M
                    </div>
                    <div className="ml-4">
                      <h4 className="font-poppins font-bold text-[#1A3D7C]">Michael R.</h4>
                      <p className="text-gray-600 text-sm">Parent, Texas</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "My son's grades went from C's to A's in just two months of tutoring.
                    The personalized attention made all the difference."
                  </p>
                  <div className="flex text-[#FFC857] mt-4">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>

                <div className="bg-[#F5F5F5] p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#FFC857] rounded-full flex items-center justify-center text-white font-bold">
                      S
                    </div>
                    <div className="ml-4">
                      <h4 className="font-poppins font-bold text-[#1A3D7C]">Sarah M.</h4>
                      <p className="text-gray-600 text-sm">8th Grade Student, New York</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "I was struggling with chemistry, but my tutor made it fun and easy to understand.
                    Now it's my favorite subject!"
                  </p>
                  <div className="flex text-[#FFC857] mt-4">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join the Journey CTA */}
        <section className="py-20 text-white relative overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A3D7C] via-[#2BAE66] to-[#FFC857]"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="container px-4 sm:px-6 max-w-4xl mx-auto">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold mb-6 px-4">
                  Join the Journey
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 leading-relaxed px-4 max-w-3xl mx-auto">
                  Whether you're in 6th grade or preparing for college, The Tutor Bridge is here to guide your path.
                  Let's build your future, together.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
                  <Link href="/tutoring/free-consultation" className="w-full sm:w-auto">
                    <span className="inline-block bg-white text-[#1A3D7C] text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-poppins font-semibold hover:bg-gray-100 transition-all w-full text-center">
                      Book Free Consultation
                    </span>
                  </Link>
                  <Link href="/contact" className="w-full sm:w-auto">
                    <span className="inline-block border-2 border-white text-white text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-poppins font-semibold hover:bg-white hover:text-[#1A3D7C] transition-all w-full text-center">
                      Get in Touch
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer (same as other pages) */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="container px-4">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Image src="/TheTutorBridge Logo New.png" width={32} height={32} alt="The Tutor Bridge Logo" className="h-8 w-8" />
                  <span className="text-xl font-bold">TheTutorBridge</span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Expert homework help and 1-on-1 tutoring for grades 6-12 in Math, Science, and English.
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
              <div>
                <h4 className="font-bold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/homework-help" className="hover:text-white transition-colors">
                      Homework Help
                    </Link>
                  </li>
                  <li>
                    <Link href="/tutoring" className="hover:text-white transition-colors">
                      1-on-1 Tutoring
                    </Link>
                  </li>
                  <li>
                    <Link href="/tutoring/free-consultation" className="hover:text-white transition-colors">
                      Free Consultation
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
      </main>
    </div>
  )
}