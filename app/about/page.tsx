import { Navigation } from "@/components/navigation"
import Image from "next/image"
import Link from "next/link"

export default function About() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden font-merriweather">
      {/* Background gradient reflecting brand palette */}
      <div className="fixed inset-0 -z-10 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A3D7C]/5 via-[#2BAE66]/5 to-[#FFC857]/10" />
      </div>

      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center">
          <div className="container px-6 py-16 grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-poppins font-bold leading-tight text-[#1A3D7C]">
                About
                <br />
                <span className="text-[#2BAE66]">The Tutor Bridge</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-2xl">
                The Tutor Bridge is India’s leading online tutoring platform. Our mission is to empower students with
                personalized learning, expert guidance, and 24/7 support. With 10,000+ success stories, we’re committed
                to academic excellence and holistic growth.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Instant doubt solving via Telegram community</li>
                <li>Career guidance and mentorship</li>
                <li>Premium study resources</li>
              </ul>
              <div className="flex gap-4">
                <Link href="/study-resources" className="inline-block">
                  <span className="inline-block bg-[#1A3D7C] text-white rounded-xl px-6 py-3 hover:shadow-lg hover:bg-[#2BAE66] transition-all">
                    Explore Resources
                  </span>
                </Link>
                <Link href="/contact" className="inline-block">
                  <span className="inline-block border-2 border-[#2BAE66] text-[#2BAE66] rounded-xl px-6 py-3 hover:bg-[#2BAE66] hover:text-white transition-all">
                    Contact Us
                  </span>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/banner.png"
                width={480}
                height={360}
                alt="About The Tutor Bridge"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-[#F5F5F5]">
          <div className="container px-6 grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-2">Guidance</h3>
              <p className="text-gray-700">Personalized attention that helps students discover and stay on their path.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-2">Growth</h3>
              <p className="text-gray-700">Building skills and confidence through consistent support and feedback.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-2">Support</h3>
              <p className="text-gray-700">A friendly mentor community always available to help you move forward.</p>
            </div>
          </div>
        </section>

        {/* Footer (same as other pages) */}
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
              <div>
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
      </main>
    </div>
  )
}