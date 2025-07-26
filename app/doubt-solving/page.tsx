import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  Clock,
  MessageSquare,
  Zap,
  Upload,
  Calculator,
  Beaker,
  PenTool,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"

export const metadata: Metadata = {
  title: "Instant Doubt Solving - Get Answers in 30 Minutes | The Tutor Bridge",
  description:
    "Upload your questions via WhatsApp and get detailed step-by-step solutions within 30-60 minutes from expert tutors. Math, Science, English doubts solved instantly. Try free doubt now!",
  keywords: [
    "doubt solving",
    "instant homework help",
    "question answers",
    "math doubts",
    "science doubts",
    "english doubts",
    "whatsapp tutoring",
    "step by step solutions",
    "homework assistance",
    "quick answers",
  ],
  alternates: {
    canonical: "https://thetutorbridge.com/doubt-solving",
  },
}

export default function DoubtSolving() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section - Similar to Turito */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white">
          <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10"></div>
          <div className="container px-4 py-20 md:py-32 relative">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-medium">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  Get answers in 30-60 minutes guaranteed
                </div>
                <div className="space-y-6">
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    Our goal is achieved when you
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                      {" "}
                      succeed!
                    </span>
                  </h1>
                  <p className="text-xl text-blue-100 leading-relaxed max-w-2xl">
                    We aim to empower students with personalized & all-inclusive learning while guiding them to
                    remarkable success. Upload your doubts via WhatsApp and get detailed solutions instantly.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
  asChild
  size="lg"
  className="bg-gradient-to-r from-brand-orange to-brand-red hover:from-brand-orange-dark hover:to-brand-red-dark text-lg px-8 py-4"
>
  <Link href="/doubt-solving/ask-doubt">
    Ask Your First Doubt Free
    <ArrowRight className="ml-2 h-5 w-5" />
  </Link>
</Button>
                  {/* <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-700"
                  >
                    See Sample Solutions
                  </Button> */}
                </div>
                <div className="flex items-center gap-8 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-blue-100">30-60 min response</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-blue-100">Step-by-step solutions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-blue-100">Expert tutors</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-3xl blur-3xl opacity-30"></div>
                <Image
                  src="/doubt.jpg?height=600&width=600"
                  width={600}
                  height={600}
                  alt="Student getting instant doubt solving help via WhatsApp with step-by-step solutions from expert tutors"
                  className="relative rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Get Your Doubts Solved in
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {" "}
                  3 Simple Steps
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From question to solution in under an hour - it's that simple!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Upload className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">1. Upload Your Question</h3>
                <p className="text-gray-600 leading-relaxed">
                  Take a clear photo of your question or type it out and send it to our WhatsApp number. Include your
                  grade and subject for faster processing.
                </p>
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700 font-medium">📱 WhatsApp: +91-9310096171</p>
                </div>
              </div>
              <div className="text-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Clock className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">2. Expert Review & Solution</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our subject experts (IIT/NIT graduates) review your question and prepare a detailed, step-by-step
                  solution with explanations.
                </p>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700 font-medium">⏱️ Average response: 45 minutes</p>
                </div>
              </div>
              <div className="text-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">3. Get Detailed Solution</h3>
                <p className="text-gray-600 leading-relaxed">
                  Receive your solution with step-by-step explanations, key concepts, and tips to solve similar problems
                  in the future.
                </p>
                <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-700 font-medium">📚 Includes: Steps + Concepts + Tips</p>
                </div>
              </div>
            </div>

            <div className="text-center">
             <Button
  asChild
  size="lg"
  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg px-8 py-4"
>
  <Link href="/doubt-solving/ask-doubt">
    Try Your First Doubt Free
    <ArrowRight className="ml-2 h-5 w-5" />
  </Link>
</Button>
            </div>
          </div>
        </section>

        {/* Subject Coverage */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                All Subjects
                <span className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">
                  {" "}
                  Covered
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get expert help in Math, Science, and English for grades 6-12
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calculator className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Mathematics</h3>
                  <p className="text-gray-600 mb-6">
                    Algebra, Geometry, Trigonometry, Calculus, Statistics, and more. Get step-by-step solutions with
                    clear explanations.
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>✓ Algebra & Linear Equations</div>
                    <div>✓ Geometry & Mensuration</div>
                    <div>✓ Trigonometry & Calculus</div>
                    <div>✓ Statistics & Probability</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Beaker className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Science</h3>
                  <p className="text-gray-600 mb-6">
                    Physics, Chemistry, and Biology doubts solved with diagrams, formulas, and practical examples.
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>✓ Physics - Mechanics, Optics, etc.</div>
                    <div>✓ Chemistry - Organic, Inorganic</div>
                    <div>✓ Biology - Botany, Zoology</div>
                    <div>✓ Diagrams & Illustrations</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <PenTool className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">English</h3>
                  <p className="text-gray-600 mb-6">
                    Grammar, Literature, Essay writing, and comprehension doubts solved with detailed explanations.
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>✓ Grammar & Vocabulary</div>
                    <div>✓ Literature Analysis</div>
                    <div>✓ Essay & Letter Writing</div>
                    <div>✓ Reading Comprehension</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        {/* <section className="py-20 bg-white">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Simple & Affordable
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {" "}
                  Pricing
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose the plan that works best for your learning needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-2 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">Starter Pack</h3>
                    <p className="text-gray-600">Perfect for trying out our service</p>
                  </div>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-green-600 mb-2">₹99</div>
                    <div className="text-gray-600">5 doubt solutions</div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>5 doubt solutions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>30-60 min response time</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Step-by-step solutions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>WhatsApp support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Valid for 30 days</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Get Started</Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-500 hover:shadow-xl transition-all duration-300 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">Unlimited Monthly</h3>
                    <p className="text-gray-600">Best value for regular students</p>
                  </div>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-green-600 mb-2">₹499</div>
                    <div className="text-gray-600">Unlimited doubts for 1 month</div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Unlimited doubt solutions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Priority 30 min response</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Detailed explanations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>24/7 WhatsApp support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Follow-up questions allowed</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Start Free Trial</Button>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">Annual Plan</h3>
                    <p className="text-gray-600">Maximum savings for serious students</p>
                  </div>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-green-600 mb-2">₹999</div>
                    <div className="text-gray-600">Unlimited doubts for 1 year</div>
                    <div className="text-sm text-green-600 font-medium">Save ₹4,989!</div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Unlimited solutions for 1 year</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>15 min priority response</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Video explanations included</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Dedicated support manager</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Progress tracking & reports</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Contact Sales</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section> */}

        {/* Student Success Stories */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Student Success
                <span className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">
                  {" "}
                  Stories
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how instant doubt solving helped students improve their grades
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "I was struggling with calculus problems. The step-by-step solutions helped me understand the
                    concepts clearly. My math grades improved from C to A!"
                  </p>
                  <div className="flex items-center gap-3">
                    <Image
                      src="/female.png?height=40&width=40"
                      width={40}
                      height={40}
                      alt="Student testimonial"
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-medium">Priya Sharma</div>
                      <div className="text-sm text-gray-600">Class 12, CBSE</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "Chemistry reactions were my nightmare. The detailed explanations with diagrams made everything so
                    clear. Highly recommend!"
                  </p>
                  <div className="flex items-center gap-3">
                    <Image
                      src="/male.png?height=40&width=40"
                      width={40}
                      height={40}
                      alt="Student testimonial"
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-medium">Rahul Verma</div>
                      <div className="text-sm text-gray-600">Class 11, Science</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "Quick responses and excellent explanations. Helped me complete my homework on time and understand
                    concepts better."
                  </p>
                  <div className="flex items-center gap-3">
                    <Image
                      src="/female.png?height=40&width=40"
                      width={40}
                      height={40}
                      alt="Student testimonial"
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-medium">Anjali Patel</div>
                      <div className="text-sm text-gray-600">Class 10, ICSE</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <div className="container px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Solve Your Doubts Instantly?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of students who get their questions answered within 30-60 minutes. Try your first doubt for
              free!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
  asChild
  size="lg"
  variant="secondary"
  className="text-lg px-8 py-4 bg-white text-green-600 hover:bg-gray-100"
>
  <Link href="/doubt-solving/ask-doubt">
    Ask Your First Doubt Free
  </Link>
</Button>
             <Button
  asChild
  size="lg"
  variant="outline"
  className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-green-600"
>
  <a
    href="https://t.me/thetutorbridge"
    target="_blank"
    rel="noopener noreferrer"
  >
    Join us on Telegram
  </a>
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
              <p className="text-gray-400">
                Get instant doubt solving help from expert tutors. Upload questions via WhatsApp and get solutions in
                30-60 minutes.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/tutoring" className="hover:text-white transition-colors">
                    One-on-One Tutoring
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
              <h4 className="font-bold mb-4">Subjects</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Mathematics Doubts</li>
                <li>Physics Doubts</li>
                <li>Chemistry Doubts</li>
                <li>Biology Doubts</li>
                <li>English Doubts</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📱 WhatsApp: +91-98765-43210</li>
                <li>📧 doubts@thetutorbridge.com</li>
                <li>🕒 Available: 24/7</li>
                <li>⚡ Response: 30-60 minutes</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} The Tutor Bridge. All rights reserved. | Instant doubt solving since 2020
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
