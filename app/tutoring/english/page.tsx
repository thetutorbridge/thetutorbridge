import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  CheckCircle,
  Star,
  PenTool,
  ChevronRight,
  Users,
  Target,
  Calendar,
  TrendingUp,
  BookOpen,
  Edit3,
  FileText
} from "lucide-react"

export const metadata: Metadata = {
  title: "English Tutoring Online | Writing, Grammar, Literature | Grades 6-12 | The Tutor Bridge",
  description: "Expert 1-on-1 online English tutoring for middle school and high school. Essay writing, grammar, literature analysis, reading comprehension. U.S.-certified tutors. Free consultation.",
  keywords: [
    "english tutor",
    "online english tutoring",
    "writing tutor",
    "essay tutor",
    "grammar tutor",
    "literature tutor",
    "AP english tutor",
    "AP literature tutor",
    "high school english tutor",
    "middle school english tutor"
  ],
  alternates: {
    canonical: "https://www.thetutorbridge.com/tutoring/english",
  },
  openGraph: {
    title: "English Tutoring Online | Writing, Grammar, Literature | Grades 6-12",
    description: "Expert 1-on-1 online English tutoring with U.S.-certified tutors. Free consultation available.",
    url: "https://www.thetutorbridge.com/tutoring/english",
    siteName: "The Tutor Bridge",
    type: "website",
  }
}

export default function EnglishTutoring() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden font-merriweather">
      <div className="fixed inset-0 -z-10 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A3D7C]/5 via-[#2BAE66]/5 to-[#FFC857]/10" />
      </div>

      <Navigation />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 py-3">
            <nav className="flex items-center text-sm text-gray-600">
              <Link href="/" className="hover:text-[#1A3D7C]">Home</Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link href="/tutoring" className="hover:text-[#1A3D7C]">Tutoring</Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-[#1A3D7C] font-medium">English</span>
            </nav>
          </div>
        </div>

        {/* Hero Section - Subtle & Center Aligned */}
        <section className="relative py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] leading-tight mb-4">
                English Tutoring
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
                Weekly 1-on-1 sessions with expert English tutors. Essay skills, grammar mastery, and literature analysis to build confident writers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/tutoring/free-consultation">
                  <Button size="lg" className="bg-[#FFC857] text-[#1A3D7C] rounded-xl px-8 py-4 hover:bg-[#FFC857]/90 transition-all font-semibold w-full sm:w-auto">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Free Consultation
                  </Button>
                </Link>
                <Link href="/homework-help/english">
                  <Button size="lg" variant="outline" className="border-2 border-[#1A3D7C] text-[#1A3D7C] rounded-xl px-8 py-4 hover:bg-[#1A3D7C] hover:text-white transition-all font-semibold w-full sm:w-auto">
                    Need Quick English Help?
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#FFC857]" />
                  <span>Free trial session</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#FFC857]" />
                  <span>Essay feedback included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#FFC857]" />
                  <span>AP exam prep</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* English Skills */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                English Skills We Develop
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Edit3 className="w-7 h-7 text-[#1A3D7C]" />
                  </div>
                  <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-3">Essay Writing</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#2BAE66]" />Thesis Development</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#2BAE66]" />Argument Structure</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#2BAE66]" />Evidence & Analysis</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#2BAE66]" />Research Papers</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <FileText className="w-7 h-7 text-[#2BAE66]" />
                  </div>
                  <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-3">Grammar & Mechanics</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#2BAE66]" />Sentence Structure</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#2BAE66]" />Punctuation</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#2BAE66]" />Style & Voice</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#2BAE66]" />Editing Skills</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="w-7 h-7 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-3">Literature Analysis</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#2BAE66]" />Theme Analysis</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#2BAE66]" />Character Study</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#2BAE66]" />Literary Devices</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#2BAE66]" />Poetry & Prose</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 sm:py-20 bg-[#F8FAFC]">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                Why Choose Our English Tutoring?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="p-6 text-center">
                <CardContent className="p-0">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-7 h-7 text-[#1A3D7C]" />
                  </div>
                  <h3 className="font-poppins font-bold text-[#1A3D7C] mb-2">Writing Specialists</h3>
                  <p className="text-gray-600 text-sm">Tutors with English degrees who can teach writing as a craft, not just correct mistakes.</p>
                </CardContent>
              </Card>

              <Card className="p-6 text-center">
                <CardContent className="p-0">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-7 h-7 text-[#2BAE66]" />
                  </div>
                  <h3 className="font-poppins font-bold text-[#1A3D7C] mb-2">Ongoing Essay Support</h3>
                  <p className="text-gray-600 text-sm">Review essays between sessions, with detailed feedback to improve each draft.</p>
                </CardContent>
              </Card>

              <Card className="p-6 text-center">
                <CardContent className="p-0">
                  <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-7 h-7 text-[#FFC857]" />
                  </div>
                  <h3 className="font-poppins font-bold text-[#1A3D7C] mb-2">College Prep Focus</h3>
                  <p className="text-gray-600 text-sm">Build the writing skills needed for college applications and beyond.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                English Tutoring Packages
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="p-6 text-center border-2 border-gray-100">
                <CardContent className="p-0">
                  <div className="text-sm font-semibold text-gray-500 mb-2">4 SESSIONS/MONTH</div>
                  <div className="text-3xl font-poppins font-bold text-[#1A3D7C] mb-4">$120<span className="text-lg text-gray-500">/mo</span></div>
                  <Link href="/tutoring/free-consultation">
                    <Button variant="outline" className="w-full">Get Started</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="p-6 text-center border-2 border-[#2BAE66] relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2BAE66] text-white text-xs font-bold px-3 py-1 rounded-full">POPULAR</div>
                <CardContent className="p-0">
                  <div className="text-sm font-semibold text-[#2BAE66] mb-2">8 SESSIONS/MONTH</div>
                  <div className="text-3xl font-poppins font-bold text-[#1A3D7C] mb-4">$200<span className="text-lg text-gray-500">/mo</span></div>
                  <Link href="/tutoring/free-consultation">
                    <Button className="w-full bg-[#2BAE66]">Get Started</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="p-6 text-center border-2 border-gray-100">
                <CardContent className="p-0">
                  <div className="text-sm font-semibold text-gray-500 mb-2">12 SESSIONS/MONTH</div>
                  <div className="text-3xl font-poppins font-bold text-[#1A3D7C] mb-4">$350<span className="text-lg text-gray-500">/mo</span></div>
                  <Link href="/tutoring/free-consultation">
                    <Button variant="outline" className="w-full">Get Started</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Link href="/pricing" className="text-[#1A3D7C] font-semibold hover:underline">View Full Pricing →</Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-[#FFC857] to-[#FFC857]/90 text-[#1A3D7C]">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold mb-6">
              Ready to Become a Stronger Writer?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Book a free consultation and get matched with the perfect English tutor.
            </p>
            <Link href="/tutoring/free-consultation">
              <Button size="lg" className="bg-[#1A3D7C] text-white rounded-xl px-8 py-6 text-lg font-semibold">
                Book Free Consultation
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Image src="/TheTutorBridge Logo New.png" width={32} height={32} alt="The Tutor Bridge Logo" className="h-8 w-8" />
                <span className="text-xl font-bold">The Tutor Bridge</span>
              </div>
              <p className="text-gray-400">Expert homework help and tutoring for grades 6-12.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Homework Help</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/homework-help/math" className="hover:text-white">Math Help</Link></li>
                <li><Link href="/homework-help/science" className="hover:text-white">Science Help</Link></li>
                <li><Link href="/homework-help/english" className="hover:text-white">English Help</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Tutoring</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/tutoring/math" className="hover:text-white">Math Tutoring</Link></li>
                <li><Link href="/tutoring/science" className="hover:text-white">Science Tutoring</Link></li>
                <li><Link href="/tutoring/english" className="hover:text-white">English Tutoring</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} The Tutor Bridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
