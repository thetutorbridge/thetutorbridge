import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  Download,
  FileText,
  BookOpen,
  Calculator,
  Beaker,
  PenTool,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function StudyResources() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" width={40} height={40} alt="Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">
              TheTutorBridge
            </span>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600">Home</Link>
            <Link href="#" className="text-sm font-medium text-indigo-600">Study Resources</Link>
            <Link href="https://thetutorbridge.com/blog" className="text-sm font-medium text-gray-700 hover:text-blue-600">Blog</Link>
          </nav>
          <div className="flex items-center gap-4">
            {/* <Button variant="ghost" className="hidden md:flex text-gray-700">Sign In</Button>
            <Button className="bg-gradient-to-r from-indigo-600 to-brand-orange hover:from-indigo-700 hover:to-brand-orange-dark">
              <Link href="#resources-by-class">Browse Resources</Link>
            </Button> */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-indigo-50 via-white to-orange-50 overflow-hidden">
          <div className="container px-4 py-10">
            <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                  <Download className="h-4 w-4" /> 1000+ Resources Available
                </div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Premium Study <span className="bg-gradient-to-r from-indigo-600 to-brand-orange bg-clip-text text-transparent">Resources</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                  Access comprehensive study materials, formula sheets, mock tests, and revision notes created by expert educators for grades 6-12.
                </p>
                <Button asChild size="lg" className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 px-8 py-4">
  <Link href="#resources-by-class" className="flex items-center">
    Explore All Resources <ArrowRight className="ml-2 h-5 w-5" />
  </Link>
</Button>
              </div>
              <div className="flex-1 flex justify-center items-center relative overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-blue-400 blur-3xl opacity-20 pointer-events-none z-0" />
                <Image src="/resources.jpg" width={400} height={200} alt="Study resources" className="relative z-10 rounded-3xl shadow-2xl object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Class-wise Resources */}
        <section id="resources-by-class" className="py-20 bg-gradient-to-b from-orange-50 to-white">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Study Resources by
                <span className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">
                  {" "}Class
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Select your class to explore subject-wise resources tailored for your syllabus.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {/* {[6, 7, 8, 9, 10, 11, 12].map((grade) => ( */}
              {[9].map((grade) => (
                <Card key={grade} className="hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-indigo-700 mb-4">Class {grade}</h3>
                    <div className="flex flex-col gap-2">
                      {/* <Link href={`/study-resources/class-${grade}/math`} className="text-blue-700 hover:underline font-medium">
                        Math Resources
                      </Link> */}
                      <Link href={`/study-resources/class-${grade}/science`} className="text-green-700 hover:underline font-medium">
                        Science Resources
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

          {/* Resource Categories */}
        <section className="py-20 bg-white">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Study Materials by
                <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  {" "}
                  Subject
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive resources for all major subjects and grade levels
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <Calculator className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Mathematics</h3>
                  <p className="text-gray-600 mb-6">
                    Formula sheets, solved examples, practice problems, and step-by-step solutions for all math topics.
                  </p>
                  <div className="space-y-2 text-sm text-gray-600 mb-6">
                    <div>• Algebra & Geometry formulas</div>
                    <div>• Calculus quick reference</div>
                    <div>• Statistics & Probability notes</div>
                    <div>• Mock test papers</div>
                  </div>
                  <Button
                    asChild
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Link href="/study-resources/work-in-progress">
                      View Math Resources
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                    <Beaker className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Science</h3>
                  <p className="text-gray-600 mb-6">
                    Comprehensive notes for Physics, Chemistry, and Biology with diagrams and practical examples.
                  </p>
                  <div className="space-y-2 text-sm text-gray-600 mb-6">
                    <div>• Physics formulas & concepts</div>
                    <div>• Chemistry reaction sheets</div>
                    <div>• Biology diagrams & notes</div>
                    <div>• Lab experiment guides</div>
                  </div>
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                    <Link href="/study-resources/work-in-progress">
                      View Science Resources
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                    <PenTool className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">English</h3>
                  <p className="text-gray-600 mb-6">
                    Grammar guides, literature summaries, essay templates, and vocabulary builders for better English
                    skills.
                  </p>
                  <div className="space-y-2 text-sm text-gray-600 mb-6">
                    <div>• Grammar rules & exercises</div>
                    <div>• Literature chapter summaries</div>
                    <div>• Essay writing templates</div>
                    <div>• Vocabulary enhancement</div>
                  </div>
                  <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                    <Link href="/study-resources/work-in-progress">
                      View English Resources
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Resource Types */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Types of
                <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  {" "}
                  Resources
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need for effective studying and exam preparation
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-bold mb-2">Study Notes</h3>
                  <p className="text-sm text-gray-600">Comprehensive chapter-wise notes</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calculator className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold mb-2">Formula Sheets</h3>
                  <p className="text-sm text-gray-600">Quick reference for all formulas</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-bold mb-2">Mock Tests</h3>
                  <p className="text-sm text-gray-600">Practice papers with solutions</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold mb-2">Revision Notes</h3>
                  <p className="text-sm text-gray-600">Last-minute exam preparation</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing */}
        {/* <section className="py-20 bg-white">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Affordable
                <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  {" "}
                  Pricing
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                High-quality study materials at student-friendly prices
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-2 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Individual Packs</h3>
                  <div className="text-4xl font-bold text-indigo-600 mb-6">
                    ₹49-149
                    <span className="text-lg font-normal text-gray-600">/pack</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-indigo-500" />
                      <span>Subject-specific materials</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-indigo-500" />
                      <span>Grade-wise content</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-indigo-500" />
                      <span>Instant download</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-indigo-500" />
                      <span>PDF format</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Browse Packs</Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-indigo-500 hover:shadow-xl transition-all duration-300 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-medium">Popular</span>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Subject Bundle</h3>
                  <div className="text-4xl font-bold text-indigo-600 mb-6">
                    ₹299-399
                    <span className="text-lg font-normal text-gray-600">/subject</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-indigo-500" />
                      <span>Complete subject coverage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-indigo-500" />
                      <span>All grade levels included</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-indigo-500" />
                      <span>Regular updates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-indigo-500" />
                      <span>Bonus practice tests</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-indigo-500" />
                      <span>Save up to 40%</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Get Bundle</Button>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Complete Package</h3>
                  <div className="text-4xl font-bold text-indigo-600 mb-6">
                    ₹499
                    <span className="text-lg font-normal text-gray-600">/all subjects</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-indigo-500" />
                      <span>All subjects included</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-indigo-500" />
                      <span>Grades 6-12 coverage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-indigo-500" />
                      <span>Lifetime access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-indigo-500" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-indigo-500" />
                      <span>Maximum savings</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Get Everything</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
          <div className="container px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Excel in Your Studies?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Download premium study resources and boost your academic performance today
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Start Downloading
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
