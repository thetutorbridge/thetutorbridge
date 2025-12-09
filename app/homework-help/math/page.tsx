import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  CheckCircle,
  Clock,
  Star,
  ArrowRight,
  Calculator,
  Upload,
  Shield,
  Award,
  Zap,
  GraduationCap,
  Target,
  Brain,
  Lightbulb,
  BadgeCheck,
  ChevronRight,
  BookOpen,
  PieChart,
  Triangle,
  Sigma,
  TrendingUp,
  Grid3X3,
  Percent
} from "lucide-react"

export const metadata: Metadata = {
  title: "Math Homework Help | Algebra, Geometry, Calculus | Grades 6-12 | The Tutor Bridge",
  description: "Expert math homework help for middle school and high school. Get step-by-step solutions for Algebra, Geometry, Pre-Calculus, Calculus, Statistics & more. U.S.-certified math tutors, fast turnaround from $15.",
  keywords: [
    "math homework help",
    "algebra homework help",
    "geometry homework help",
    "calculus homework help",
    "pre-calculus help",
    "statistics homework help",
    "trigonometry help",
    "math tutor online",
    "math problem solver",
    "step by step math solutions",
    "algebra 1 help",
    "algebra 2 help",
    "AP calculus help",
    "AP statistics help",
    "math word problems",
    "quadratic equations help",
    "linear equations help",
    "polynomial help",
    "fractions help",
    "equations solver",
    "middle school math help",
    "high school math help",
    "Common Core math",
    "grade 6 math",
    "grade 7 math",
    "grade 8 math",
    "grade 9 math",
    "grade 10 math",
    "grade 11 math",
    "grade 12 math"
  ],
  alternates: {
    canonical: "https://www.thetutorbridge.com/homework-help/math",
  },
  openGraph: {
    title: "Math Homework Help | Algebra, Geometry, Calculus | Grades 6-12",
    description: "Expert step-by-step math solutions from U.S.-certified tutors. Algebra, Geometry, Calculus & more.",
    url: "https://www.thetutorbridge.com/homework-help/math",
    siteName: "The Tutor Bridge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Math Homework Help | Grades 6-12 | The Tutor Bridge",
    description: "Expert math homework help with step-by-step explanations from U.S.-certified tutors.",
  }
}

// JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Math Homework Help",
  "description": "Expert math homework help for grades 6-12 including Algebra, Geometry, Calculus, and Statistics",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "The Tutor Bridge",
    "url": "https://www.thetutorbridge.com"
  },
  "educationalLevel": ["Middle School", "High School"],
  "teaches": ["Algebra", "Geometry", "Trigonometry", "Pre-Calculus", "Calculus", "Statistics"],
  "offers": {
    "@type": "Offer",
    "price": "15",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
}

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What math topics do you cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We cover all middle school and high school math topics including Pre-Algebra, Algebra 1 & 2, Geometry, Trigonometry, Pre-Calculus, Calculus (including AP Calculus AB/BC), Statistics, and Probability."
      }
    },
    {
      "@type": "Question",
      "name": "How do I get help with a math problem?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Simply upload a photo of your math problem or type it out on our submission form. Our expert math tutors will provide a detailed step-by-step solution within your chosen timeframe."
      }
    },
    {
      "@type": "Question",
      "name": "Do you just give answers or explain the method?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We always explain the method. Every solution includes detailed steps showing exactly how to solve the problem, so you understand the underlying concepts and can solve similar problems on your own."
      }
    }
  ]
}

const mathTopics = [
  {
    category: "Pre-Algebra & Algebra 1",
    icon: Grid3X3,
    color: "blue",
    topics: ["Order of Operations", "Fractions & Decimals", "Variables & Expressions", "Linear Equations", "Inequalities", "Ratios & Proportions", "Percents", "Graphing Lines"]
  },
  {
    category: "Algebra 2",
    icon: Sigma,
    color: "green",
    topics: ["Quadratic Equations", "Polynomials", "Factoring", "Rational Expressions", "Exponential Functions", "Logarithms", "Complex Numbers", "Systems of Equations"]
  },
  {
    category: "Geometry",
    icon: Triangle,
    color: "yellow",
    topics: ["Angles & Lines", "Triangles & Congruence", "Circles", "Area & Perimeter", "Volume & Surface Area", "Proofs", "Transformations", "Coordinate Geometry"]
  },
  {
    category: "Trigonometry",
    icon: PieChart,
    color: "purple",
    topics: ["Sine, Cosine, Tangent", "Unit Circle", "Trigonometric Identities", "Law of Sines/Cosines", "Graphing Trig Functions", "Inverse Trig Functions", "Applications"]
  },
  {
    category: "Pre-Calculus",
    icon: TrendingUp,
    color: "red",
    topics: ["Functions & Graphs", "Polynomial Functions", "Rational Functions", "Conic Sections", "Sequences & Series", "Limits Introduction", "Vectors"]
  },
  {
    category: "Calculus",
    icon: Brain,
    color: "indigo",
    topics: ["Limits & Continuity", "Derivatives", "Chain Rule", "Applications of Derivatives", "Integrals", "Fundamental Theorem", "Area Between Curves", "AP Calculus AB/BC"]
  },
  {
    category: "Statistics & Probability",
    icon: Percent,
    color: "teal",
    topics: ["Mean, Median, Mode", "Standard Deviation", "Probability", "Combinations & Permutations", "Normal Distribution", "Hypothesis Testing", "Regression", "AP Statistics"]
  }
]

export default function MathHomeworkHelp() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <div className="relative min-h-screen flex flex-col overflow-x-hidden font-merriweather">
        {/* Background */}
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
                <Link href="/homework-help" className="hover:text-[#1A3D7C]">Homework Help</Link>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="text-[#1A3D7C] font-medium">Math</span>
              </nav>
            </div>
          </div>

          {/* Hero Section - Subtle & Center Aligned */}
          <section className="relative py-16 sm:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] leading-tight mb-4">
                  Math Homework Help
                </h1>

                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
                  Step-by-step solutions for Algebra, Geometry, Calculus & more. Our U.S.-certified math tutors help you understand the concepts, not just get the answers.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Link href="/homework-help/submit">
                    <Button
                      size="lg"
                      className="bg-[#1A3D7C] text-white rounded-xl px-8 py-4 hover:bg-[#1A3D7C]/90 transition-all font-semibold w-full sm:w-auto"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Submit Math Problem
                    </Button>
                  </Link>
                  <Link href="/tutoring/math">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-[#1A3D7C] text-[#1A3D7C] rounded-xl px-8 py-4 hover:bg-[#1A3D7C] hover:text-white transition-all font-semibold w-full sm:w-auto"
                    >
                      Explore Math Tutoring
                    </Button>
                  </Link>
                </div>

                {/* Quick Stats */}
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#2BAE66]" />
                    <span>From $15 per problem</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#2BAE66]" />
                    <span>Fast turnaround</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#FFC857]" />
                    <span>4.9/5 rating</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Topics We Cover Section */}
          <section className="py-16 sm:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  Math Topics We Cover
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  From basic arithmetic to advanced calculus — we help with every math subject across grades 6-12.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {mathTopics.map((topic, index) => {
                  const IconComponent = topic.icon
                  const colorClasses: Record<string, string> = {
                    blue: "bg-blue-100 text-blue-600",
                    green: "bg-green-100 text-green-600",
                    yellow: "bg-yellow-100 text-yellow-600",
                    purple: "bg-purple-100 text-purple-600",
                    red: "bg-red-100 text-red-600",
                    indigo: "bg-indigo-100 text-indigo-600",
                    teal: "bg-teal-100 text-teal-600"
                  }
                  return (
                    <Card key={index} className="p-6 hover:shadow-lg transition-all">
                      <CardContent className="p-0">
                        <div className={`w-12 h-12 ${colorClasses[topic.color]} rounded-xl flex items-center justify-center mb-4`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-poppins font-bold text-[#1A3D7C] mb-3">{topic.category}</h3>
                        <div className="flex flex-wrap gap-2">
                          {topic.topics.map((t, i) => (
                            <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              {t}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Sample Problems Section */}
          <section className="py-16 sm:py-20 bg-[#F8FAFC]">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  See How We Solve Math Problems
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Every solution comes with clear, step-by-step explanations that teach you the method.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <Card className="p-6 sm:p-8 bg-white">
                  <CardContent className="p-0">
                    <div className="mb-6">
                      <span className="text-sm font-semibold text-[#2BAE66] bg-green-100 px-3 py-1 rounded-full">
                        Sample: Algebra 2
                      </span>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <h3 className="font-poppins font-bold text-[#1A3D7C] mb-2">Problem:</h3>
                      <p className="text-gray-700 font-mono">
                        Solve for x: 2x² + 5x - 3 = 0
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-poppins font-bold text-[#1A3D7C]">Step-by-Step Solution:</h3>

                      <div className="border-l-4 border-[#2BAE66] pl-4">
                        <p className="font-semibold text-[#1A3D7C]">Step 1: Identify the equation type</p>
                        <p className="text-gray-600">This is a quadratic equation in standard form ax² + bx + c = 0, where a=2, b=5, c=-3</p>
                      </div>

                      <div className="border-l-4 border-[#2BAE66] pl-4">
                        <p className="font-semibold text-[#1A3D7C]">Step 2: Apply the quadratic formula</p>
                        <p className="text-gray-600 font-mono">x = (-b ± √(b² - 4ac)) / 2a</p>
                      </div>

                      <div className="border-l-4 border-[#2BAE66] pl-4">
                        <p className="font-semibold text-[#1A3D7C]">Step 3: Substitute values</p>
                        <p className="text-gray-600 font-mono">x = (-5 ± √(25 - 4(2)(-3))) / 2(2)</p>
                        <p className="text-gray-600 font-mono">x = (-5 ± √(25 + 24)) / 4</p>
                        <p className="text-gray-600 font-mono">x = (-5 ± √49) / 4</p>
                      </div>

                      <div className="border-l-4 border-[#2BAE66] pl-4">
                        <p className="font-semibold text-[#1A3D7C]">Step 4: Solve for both values</p>
                        <p className="text-gray-600 font-mono">x = (-5 + 7) / 4 = 2/4 = 1/2</p>
                        <p className="text-gray-600 font-mono">x = (-5 - 7) / 4 = -12/4 = -3</p>
                      </div>

                      <div className="bg-[#1A3D7C] text-white rounded-lg p-4">
                        <p className="font-semibold">Answer: x = 1/2 or x = -3</p>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="font-semibold text-[#1A3D7C] mb-1">💡 Pro Tip:</p>
                        <p className="text-gray-600 text-sm">You can verify your answers by substituting them back into the original equation. Both values should make the equation equal zero.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-8">
                <Link href="/homework-help/submit">
                  <Button
                    size="lg"
                    className="bg-[#1A3D7C] text-white rounded-xl px-8 py-4 hover:shadow-lg transition-all font-semibold"
                  >
                    Get Help With Your Math Problem
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Grade-Specific Help Section */}
          <section className="py-16 sm:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  Math Help by Grade Level
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Our tutors specialize in grade-specific math curriculum aligned with Common Core and state standards.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Middle School */}
                <Card className="p-6 sm:p-8 border-t-4 border-[#2BAE66]">
                  <CardContent className="p-0">
                    <h3 className="text-2xl font-poppins font-bold text-[#1A3D7C] mb-4">Middle School Math (Grades 6-8)</h3>
                    <p className="text-gray-600 mb-6">
                      Building strong foundations with arithmetic, pre-algebra, and introductory geometry concepts.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Grade 6:</span>
                          <span className="text-gray-600"> Ratios, rates, fractions, decimals, basic equations</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Grade 7:</span>
                          <span className="text-gray-600"> Proportions, integers, expressions, probability</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Grade 8:</span>
                          <span className="text-gray-600"> Linear equations, functions, Pythagorean theorem, transformations</span>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* High School */}
                <Card className="p-6 sm:p-8 border-t-4 border-[#1A3D7C]">
                  <CardContent className="p-0">
                    <h3 className="text-2xl font-poppins font-bold text-[#1A3D7C] mb-4">High School Math (Grades 9-12)</h3>
                    <p className="text-gray-600 mb-6">
                      Advanced coursework from Algebra through AP Calculus and Statistics.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Grade 9:</span>
                          <span className="text-gray-600"> Algebra 1, linear functions, systems, quadratics intro</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Grade 10:</span>
                          <span className="text-gray-600"> Geometry, proofs, trigonometry fundamentals</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Grade 11:</span>
                          <span className="text-gray-600"> Algebra 2, advanced functions, pre-calculus</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Grade 12:</span>
                          <span className="text-gray-600"> Calculus, AP Calculus AB/BC, AP Statistics</span>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Why Choose Our Math Help Section */}
          <section className="py-16 sm:py-20 bg-[#F8FAFC]">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  Why Students Trust Our Math Help
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                <Card className="p-6 text-center bg-white">
                  <CardContent className="p-0">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="w-7 h-7 text-[#1A3D7C]" />
                    </div>
                    <h3 className="font-poppins font-bold text-[#1A3D7C] mb-2">Math Specialists</h3>
                    <p className="text-gray-600 text-sm">
                      Tutors with degrees in Mathematics, Engineering, or related fields
                    </p>
                  </CardContent>
                </Card>

                <Card className="p-6 text-center bg-white">
                  <CardContent className="p-0">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lightbulb className="w-7 h-7 text-[#2BAE66]" />
                    </div>
                    <h3 className="font-poppins font-bold text-[#1A3D7C] mb-2">Clear Explanations</h3>
                    <p className="text-gray-600 text-sm">
                      Every step explained in plain language you can understand
                    </p>
                  </CardContent>
                </Card>

                <Card className="p-6 text-center bg-white">
                  <CardContent className="p-0">
                    <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-7 h-7 text-[#FFC857]" />
                    </div>
                    <h3 className="font-poppins font-bold text-[#1A3D7C] mb-2">Curriculum Aligned</h3>
                    <p className="text-gray-600 text-sm">
                      Solutions that match Common Core, state standards, and AP requirements
                    </p>
                  </CardContent>
                </Card>

                <Card className="p-6 text-center bg-white">
                  <CardContent className="p-0">
                    <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-7 h-7 text-purple-600" />
                    </div>
                    <h3 className="font-poppins font-bold text-[#1A3D7C] mb-2">Accuracy Guaranteed</h3>
                    <p className="text-gray-600 text-sm">
                      Double-checked solutions with free revisions if needed
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-16 sm:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  Math Success Stories
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-white">
                  <CardContent className="p-0">
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 text-[#FFC857] fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">
                      "I was failing Algebra 2 until I found The Tutor Bridge. The step-by-step explanations finally made quadratics click for me. Brought my grade up from a D to a B+!"
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#1A3D7C] rounded-full flex items-center justify-center text-white font-bold mr-3">
                        M
                      </div>
                      <div>
                        <div className="font-semibold text-[#1A3D7C]">Marcus D.</div>
                        <div className="text-sm text-gray-600">10th Grade, Ohio</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-green-50 to-white">
                  <CardContent className="p-0">
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 text-[#FFC857] fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">
                      "AP Calculus was overwhelming until I started using this service. The tutors explain derivatives better than my textbook. Scored a 5 on my AP exam!"
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#2BAE66] rounded-full flex items-center justify-center text-white font-bold mr-3">
                        E
                      </div>
                      <div>
                        <div className="font-semibold text-[#1A3D7C]">Emma L.</div>
                        <div className="text-sm text-gray-600">12th Grade, New York</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-yellow-50 to-white">
                  <CardContent className="p-0">
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 text-[#FFC857] fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">
                      "My son struggled with geometry proofs. The detailed explanations helped him understand the logic behind each step. His confidence has improved so much!"
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#FFC857] rounded-full flex items-center justify-center text-white font-bold mr-3">
                        R
                      </div>
                      <div>
                        <div className="font-semibold text-[#1A3D7C]">Rachel T.</div>
                        <div className="text-sm text-gray-600">Parent, Georgia</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 sm:py-20 bg-[#F8FAFC]">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  Math Homework Help FAQs
                </h2>
              </div>

              <div className="max-w-3xl mx-auto space-y-4">
                {[
                  {
                    question: "What math topics do you cover?",
                    answer: "We cover all middle school and high school math topics including Pre-Algebra, Algebra 1 & 2, Geometry, Trigonometry, Pre-Calculus, Calculus (including AP Calculus AB/BC), Statistics, and Probability."
                  },
                  {
                    question: "How do I submit a math problem?",
                    answer: "You can upload a photo of your math problem, type the equation, or describe the word problem on our submission form. Include any specific instructions from your teacher for the best results."
                  },
                  {
                    question: "Do you show all the work?",
                    answer: "Absolutely! Every solution includes complete step-by-step work with explanations for each step. We believe in teaching the method so you can solve similar problems independently."
                  },
                  {
                    question: "Can you help with word problems?",
                    answer: "Yes! Word problems are one of our specialties. We show you how to translate the words into equations and solve systematically."
                  },
                  {
                    question: "Do you help with AP math courses?",
                    answer: "Yes, we have specialized tutors for AP Calculus AB, AP Calculus BC, and AP Statistics who understand the curriculum and exam format."
                  }
                ].map((faq, index) => (
                  <Card key={index} className="p-6 bg-white">
                    <CardContent className="p-0">
                      <h3 className="text-lg font-poppins font-bold text-[#1A3D7C] mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 sm:py-20 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white">
            <div className="container mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold mb-6">
                Ready to Conquer Your Math Homework?
              </h2>
              <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto opacity-90">
                Don't let math problems stress you out. Get expert help that teaches you how to solve them yourself.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/homework-help/submit">
                  <Button
                    size="lg"
                    className="bg-[#FFC857] text-[#1A3D7C] rounded-xl px-8 py-6 hover:shadow-lg hover:bg-[#FFC857]/90 transition-all text-lg font-semibold w-full sm:w-auto"
                  >
                    Submit Your Math Problem
                  </Button>
                </Link>
                <Link href="/tutoring/math">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white rounded-xl px-8 py-6 hover:bg-white hover:text-[#1A3D7C] transition-all text-lg font-semibold w-full sm:w-auto"
                  >
                    Explore Weekly Math Tutoring
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Related Subjects */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-8">
                <h3 className="text-xl font-poppins font-bold text-[#1A3D7C]">Need Help with Other Subjects?</h3>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/homework-help/science">
                  <Button variant="outline" className="rounded-full">
                    Science Homework Help →
                  </Button>
                </Link>
                <Link href="/homework-help/english">
                  <Button variant="outline" className="rounded-full">
                    English Homework Help →
                  </Button>
                </Link>
                <Link href="/homework-help">
                  <Button variant="outline" className="rounded-full">
                    All Subjects →
                  </Button>
                </Link>
              </div>
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
                <p className="text-gray-400 leading-relaxed">
                  Expert homework help and tutoring for grades 6-12. We teach the method, not just the answer.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Homework Help</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/homework-help/math" className="hover:text-white transition-colors">Math Help</Link></li>
                  <li><Link href="/homework-help/science" className="hover:text-white transition-colors">Science Help</Link></li>
                  <li><Link href="/homework-help/english" className="hover:text-white transition-colors">English Help</Link></li>
                  <li><Link href="/homework-help/submit" className="hover:text-white transition-colors">Submit Homework</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Tutoring</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/tutoring" className="hover:text-white transition-colors">Tutoring Programs</Link></li>
                  <li><Link href="/tutoring/free-consultation" className="hover:text-white transition-colors">Free Consultation</Link></li>
                  <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                  <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
              <p>© {new Date().getFullYear()} The Tutor Bridge. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
