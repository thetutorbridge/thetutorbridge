import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { BookOpen, MessageSquare, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import FloaterMessenger from "@/app/components/FloaterMessenger"

export const metadata: Metadata = {
  title: "The Tutor Bridge – Guiding Students, Building Futures",
  description:
    "Academic support, career mentorship, and resources to help students from Class 6 to 12 discover their true path.",
  alternates: {
    canonical: "https://thetutorbridge.com",
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
        <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-4xl md:text-6xl font-poppins font-bold leading-tight text-[#1A3D7C]">
            Guiding Students,
            <br />
            <span className="text-[#2BAE66]">Building Futures</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl">
            Academic support, career mentorship, and resources to help students from Class 6 to 12 discover their true path.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/study-resources">
              <Button
                size="lg"
                className="bg-[#1A3D7C] text-white rounded-xl px-8 py-4 hover:shadow-lg hover:bg-[#2BAE66] transition-all"
              >
                Explore Resources
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#2BAE66] text-[#2BAE66] rounded-xl px-8 py-4 hover:bg-[#2BAE66] hover:text-white transition-all"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </section>

        {/* Offerings Section */}
        <section className="py-20 bg-[#F5F5F5]">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-12">
              Our Offerings
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Blogs */}
              <Card className="p-6 hover:shadow-xl transition">
                <CardContent>
                  <BookOpen className="w-10 h-10 text-[#2BAE66] mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Blogs</h3>
                  <p className="text-gray-600 text-sm">Insights and articles on educational topics</p>
                </CardContent>
              </Card>

              {/* Study Resources */}
              <Card className="p-6 hover:shadow-xl transition">
                <CardContent>
                  <Award className="w-10 h-10 text-[#1A3D7C] mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Study Resources</h3>
                  <p className="text-gray-600 text-sm">Tailored study materials for classes 6 to 12</p>
                </CardContent>
              </Card>

              {/* Ask Doubts */}
              <Card className="p-6 hover:shadow-xl transition">
                <CardContent>
                  <MessageSquare className="w-10 h-10 text-[#FFC857] mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Ask Doubts</h3>
                  <p className="text-gray-600 text-sm">Get answers to your academic questions</p>
                </CardContent>
              </Card>

              {/* Career Mentorship */}
              <Card className="p-6 hover:shadow-xl transition">
                <CardContent>
                  <Users className="w-10 h-10 text-[#2BAE66] mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Career Mentorship</h3>
                  <p className="text-gray-600 text-sm">Guidance to help you pursue your passion</p>
                </CardContent>
              </Card>
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
                <li>+91 98765 43210</li>
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
