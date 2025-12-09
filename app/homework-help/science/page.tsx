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
  FlaskConical,
  Upload,
  Shield,
  Award,
  Zap,
  GraduationCap,
  Target,
  Brain,
  Lightbulb,
  ChevronRight,
  Atom,
  Dna,
  Globe,
  Microscope,
  Beaker,
  Waves,
  Sun,
  Leaf
} from "lucide-react"

export const metadata: Metadata = {
  title: "Science Homework Help | Physics, Chemistry, Biology | Grades 6-12 | The Tutor Bridge",
  description: "Expert science homework help for middle school and high school. Get step-by-step solutions for Physics, Chemistry, Biology, and Earth Science. Lab reports, problem sets, and concept explanations from $15.",
  keywords: [
    "science homework help",
    "physics homework help",
    "chemistry homework help",
    "biology homework help",
    "earth science help",
    "lab report help",
    "science tutor online",
    "AP physics help",
    "AP chemistry help",
    "AP biology help",
    "chemistry equations",
    "physics problems",
    "biology homework",
    "science fair help",
    "middle school science",
    "high school science",
    "scientific method help",
    "chemistry balancing equations",
    "physics word problems",
    "biology cell structure",
    "environmental science",
    "anatomy homework help",
    "genetics help",
    "organic chemistry help"
  ],
  alternates: {
    canonical: "https://www.thetutorbridge.com/homework-help/science",
  },
  openGraph: {
    title: "Science Homework Help | Physics, Chemistry, Biology | Grades 6-12",
    description: "Expert step-by-step science solutions from U.S.-certified tutors. Physics, Chemistry, Biology & more.",
    url: "https://www.thetutorbridge.com/homework-help/science",
    siteName: "The Tutor Bridge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Science Homework Help | Grades 6-12 | The Tutor Bridge",
    description: "Expert science homework help with step-by-step explanations from U.S.-certified tutors.",
  }
}

// JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Science Homework Help",
  "description": "Expert science homework help for grades 6-12 including Physics, Chemistry, Biology, and Earth Science",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "The Tutor Bridge",
    "url": "https://www.thetutorbridge.com"
  },
  "educationalLevel": ["Middle School", "High School"],
  "teaches": ["Physics", "Chemistry", "Biology", "Earth Science", "Environmental Science"],
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
      "name": "What science subjects do you cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We cover all middle school and high school science subjects including Physics, Chemistry, Biology, Earth Science, Environmental Science, and Anatomy. We also support AP Physics, AP Chemistry, and AP Biology."
      }
    },
    {
      "@type": "Question",
      "name": "Can you help with lab reports?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Our tutors help with all aspects of lab reports including hypothesis formation, data analysis, calculations, error analysis, and writing conclusions that demonstrate understanding of the experiment."
      }
    },
    {
      "@type": "Question",
      "name": "Do you help with science fair projects?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! We can help with project planning, hypothesis development, experimental design, data collection methods, analysis, and presentation preparation."
      }
    }
  ]
}

const scienceTopics = [
  {
    category: "Physics",
    icon: Atom,
    color: "blue",
    topics: ["Motion & Forces", "Energy & Work", "Waves & Sound", "Electricity & Magnetism", "Optics & Light", "Thermodynamics", "Modern Physics", "AP Physics 1 & 2"]
  },
  {
    category: "Chemistry",
    icon: Beaker,
    color: "green",
    topics: ["Atomic Structure", "Chemical Bonding", "Stoichiometry", "Chemical Reactions", "Acids & Bases", "Thermochemistry", "Organic Chemistry", "AP Chemistry"]
  },
  {
    category: "Biology",
    icon: Dna,
    color: "purple",
    topics: ["Cell Biology", "Genetics & DNA", "Evolution", "Ecology", "Human Anatomy", "Plant Biology", "Microbiology", "AP Biology"]
  },
  {
    category: "Earth Science",
    icon: Globe,
    color: "teal",
    topics: ["Geology", "Weather & Climate", "Oceanography", "Astronomy", "Natural Resources", "Plate Tectonics", "Rock Cycle", "Earth's Atmosphere"]
  },
  {
    category: "Environmental Science",
    icon: Leaf,
    color: "emerald",
    topics: ["Ecosystems", "Biodiversity", "Pollution", "Climate Change", "Sustainability", "Energy Resources", "Conservation", "AP Environmental"]
  },
  {
    category: "Lab Skills",
    icon: Microscope,
    color: "orange",
    topics: ["Lab Reports", "Data Analysis", "Scientific Method", "Error Analysis", "Graphing Data", "Lab Safety", "Experimental Design", "Conclusions"]
  }
]

export default function ScienceHomeworkHelp() {
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
                <span className="text-[#1A3D7C] font-medium">Science</span>
              </nav>
            </div>
          </div>

          {/* Hero Section - Subtle & Center Aligned */}
          <section className="relative py-16 sm:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] leading-tight mb-4">
                  Science Homework Help
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
                  Step-by-step solutions for Physics, Chemistry, Biology & more. Our expert tutors break down complex concepts into clear explanations.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Link href="/homework-help/submit">
                    <Button
                      size="lg"
                      className="bg-[#2BAE66] text-white rounded-xl px-8 py-4 hover:bg-[#2BAE66]/90 transition-all font-semibold w-full sm:w-auto"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Submit Science Question
                    </Button>
                  </Link>
                  <Link href="/tutoring/science">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-[#1A3D7C] text-[#1A3D7C] rounded-xl px-8 py-4 hover:bg-[#1A3D7C] hover:text-white transition-all font-semibold w-full sm:w-auto"
                    >
                      Explore Science Tutoring
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
                    <span>Lab reports in 24hr</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#2BAE66]" />
                    <span>4.9/5 student rating</span>
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
                  Science Topics We Cover
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Comprehensive support across all science disciplines for grades 6-12, including AP courses.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {scienceTopics.map((topic, index) => {
                  const IconComponent = topic.icon
                  const colorClasses: Record<string, string> = {
                    blue: "bg-blue-100 text-blue-600",
                    green: "bg-green-100 text-green-600",
                    purple: "bg-purple-100 text-purple-600",
                    teal: "bg-teal-100 text-teal-600",
                    emerald: "bg-emerald-100 text-emerald-600",
                    orange: "bg-orange-100 text-orange-600"
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

          {/* Sample Problem Section */}
          <section className="py-16 sm:py-20 bg-[#F8FAFC]">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  See How We Solve Science Problems
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Every solution includes clear explanations that help you understand the underlying concepts.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <Card className="p-6 sm:p-8 bg-white">
                  <CardContent className="p-0">
                    <div className="mb-6">
                      <span className="text-sm font-semibold text-[#2BAE66] bg-green-100 px-3 py-1 rounded-full">
                        Sample: Chemistry
                      </span>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <h3 className="font-poppins font-bold text-[#1A3D7C] mb-2">Problem:</h3>
                      <p className="text-gray-700">
                        Balance the following chemical equation: Fe + O₂ → Fe₂O₃
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-poppins font-bold text-[#1A3D7C]">Step-by-Step Solution:</h3>

                      <div className="border-l-4 border-[#2BAE66] pl-4">
                        <p className="font-semibold text-[#1A3D7C]">Step 1: Count atoms on each side</p>
                        <p className="text-gray-600">Left side: Fe = 1, O = 2</p>
                        <p className="text-gray-600">Right side: Fe = 2, O = 3</p>
                      </div>

                      <div className="border-l-4 border-[#2BAE66] pl-4">
                        <p className="font-semibold text-[#1A3D7C]">Step 2: Balance Iron (Fe) first</p>
                        <p className="text-gray-600">We need 2 Fe atoms on the left to match the right</p>
                        <p className="text-gray-600 font-mono">2Fe + O₂ → Fe₂O₃</p>
                      </div>

                      <div className="border-l-4 border-[#2BAE66] pl-4">
                        <p className="font-semibold text-[#1A3D7C]">Step 3: Balance Oxygen (O)</p>
                        <p className="text-gray-600">Right side has 3 O atoms. We need a common multiple of 2 and 3, which is 6.</p>
                        <p className="text-gray-600">Multiply Fe₂O₃ by 2: gives us 6 O atoms on right</p>
                        <p className="text-gray-600">Multiply O₂ by 3: gives us 6 O atoms on left</p>
                      </div>

                      <div className="border-l-4 border-[#2BAE66] pl-4">
                        <p className="font-semibold text-[#1A3D7C]">Step 4: Re-balance Iron</p>
                        <p className="text-gray-600">Now right side has 4 Fe atoms (2 × 2), so adjust left side</p>
                        <p className="text-gray-600 font-mono">4Fe + 3O₂ → 2Fe₂O₃</p>
                      </div>

                      <div className="bg-[#2BAE66] text-white rounded-lg p-4">
                        <p className="font-semibold">Balanced Equation: 4Fe + 3O₂ → 2Fe₂O₃</p>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="font-semibold text-[#1A3D7C] mb-1">💡 Verification:</p>
                        <p className="text-gray-600 text-sm">Left: Fe = 4, O = 6 | Right: Fe = 4, O = 6 ✓</p>
                        <p className="text-gray-600 text-sm mt-2">Always verify by counting atoms on both sides!</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-8">
                <Link href="/homework-help/submit">
                  <Button
                    size="lg"
                    className="bg-[#2BAE66] text-white rounded-xl px-8 py-4 hover:shadow-lg transition-all font-semibold"
                  >
                    Get Help With Your Science Problem
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Lab Report Help Section */}
          <section className="py-16 sm:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] mb-6">
                      Lab Report Assistance
                    </h2>
                    <p className="text-gray-700 mb-6">
                      Writing a lab report can be challenging. Our tutors help you understand each section and communicate your findings effectively.
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Abstract & Introduction</span>
                          <p className="text-gray-600 text-sm">Clear hypothesis formation and background context</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Methods & Procedures</span>
                          <p className="text-gray-600 text-sm">Documenting your experimental process accurately</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Data Analysis</span>
                          <p className="text-gray-600 text-sm">Tables, graphs, calculations, and error analysis</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Results & Conclusion</span>
                          <p className="text-gray-600 text-sm">Interpreting results and drawing meaningful conclusions</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-[#2BAE66] to-[#1A3D7C] p-8 rounded-2xl text-white">
                    <h3 className="text-2xl font-poppins font-bold mb-4">Lab Report Pricing</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-white/20">
                        <span>Short Lab Report (2-3 pages)</span>
                        <span className="font-bold">From $40</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-white/20">
                        <span>Standard Lab Report (4-6 pages)</span>
                        <span className="font-bold">From $60</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-white/20">
                        <span>Advanced/AP Lab Report</span>
                        <span className="font-bold">From $80</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Data Analysis Only</span>
                        <span className="font-bold">From $25</span>
                      </div>
                    </div>
                    <Link href="/homework-help/submit" className="block mt-6">
                      <Button className="w-full bg-[#FFC857] text-[#1A3D7C] hover:bg-[#FFC857]/90">
                        Submit Your Lab Report
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Grade-Specific Help Section */}
          <section className="py-16 sm:py-20 bg-[#F8FAFC]">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  Science Help by Grade Level
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Our tutors understand the specific science curriculum for each grade level.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Middle School */}
                <Card className="p-6 sm:p-8 border-t-4 border-[#2BAE66]">
                  <CardContent className="p-0">
                    <h3 className="text-2xl font-poppins font-bold text-[#1A3D7C] mb-4">Middle School Science (Grades 6-8)</h3>
                    <p className="text-gray-600 mb-6">
                      Building scientific foundations and developing inquiry skills.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Grade 6:</span>
                          <span className="text-gray-600"> Earth science, basic life science, introduction to scientific method</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Grade 7:</span>
                          <span className="text-gray-600"> Life science, cells, ecosystems, human body systems</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Grade 8:</span>
                          <span className="text-gray-600"> Physical science, motion, forces, energy, matter properties</span>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* High School */}
                <Card className="p-6 sm:p-8 border-t-4 border-[#1A3D7C]">
                  <CardContent className="p-0">
                    <h3 className="text-2xl font-poppins font-bold text-[#1A3D7C] mb-4">High School Science (Grades 9-12)</h3>
                    <p className="text-gray-600 mb-6">
                      Specialized courses and AP-level rigor.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Grade 9:</span>
                          <span className="text-gray-600"> Biology fundamentals, cell biology, genetics basics</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Grade 10:</span>
                          <span className="text-gray-600"> Chemistry, atomic structure, chemical reactions, stoichiometry</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Grade 11:</span>
                          <span className="text-gray-600"> Physics, mechanics, waves, electricity, AP courses</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Grade 12:</span>
                          <span className="text-gray-600"> AP Biology, AP Chemistry, AP Physics, AP Environmental</span>
                        </div>
                      </li>
                    </ul>
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
                  Science Success Stories
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
                      "Chemistry was my worst subject until I found The Tutor Bridge. The way they explain balancing equations and stoichiometry finally clicked. Got an A on my midterm!"
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#1A3D7C] rounded-full flex items-center justify-center text-white font-bold mr-3">
                        A
                      </div>
                      <div>
                        <div className="font-semibold text-[#1A3D7C]">Alex R.</div>
                        <div className="text-sm text-gray-600">10th Grade, Arizona</div>
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
                      "Needed help with my AP Biology lab report at the last minute. The tutor helped me understand the data analysis and my conclusion was much stronger. Highly recommend!"
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#2BAE66] rounded-full flex items-center justify-center text-white font-bold mr-3">
                        K
                      </div>
                      <div>
                        <div className="font-semibold text-[#1A3D7C]">Kayla M.</div>
                        <div className="text-sm text-gray-600">11th Grade, Michigan</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-purple-50 to-white">
                  <CardContent className="p-0">
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 text-[#FFC857] fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">
                      "Physics problems used to stress me out. Now I actually understand how to set up free body diagrams and solve motion problems. My confidence has totally changed!"
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        T
                      </div>
                      <div>
                        <div className="font-semibold text-[#1A3D7C]">Tyler W.</div>
                        <div className="text-sm text-gray-600">12th Grade, Colorado</div>
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
                  Science Homework Help FAQs
                </h2>
              </div>

              <div className="max-w-3xl mx-auto space-y-4">
                {[
                  {
                    question: "What science subjects do you cover?",
                    answer: "We cover all middle school and high school science subjects including Physics, Chemistry, Biology, Earth Science, Environmental Science, and Anatomy. We also support AP Physics (1, 2, C), AP Chemistry, AP Biology, and AP Environmental Science."
                  },
                  {
                    question: "Can you help with lab reports?",
                    answer: "Yes! Our tutors help with all aspects of lab reports including hypothesis formation, data analysis, calculations, error analysis, and writing conclusions that demonstrate understanding of the experiment."
                  },
                  {
                    question: "Do you help with science fair projects?",
                    answer: "Absolutely! We can help with project planning, hypothesis development, experimental design, data collection methods, analysis, and presentation preparation."
                  },
                  {
                    question: "How do you handle physics word problems?",
                    answer: "We break down every physics problem systematically: identifying given information, drawing diagrams when helpful, selecting the right formulas, and showing every calculation step with clear explanations of the physics concepts involved."
                  },
                  {
                    question: "Can you help me understand concepts, not just solve problems?",
                    answer: "That's exactly our approach! Every solution includes conceptual explanations that help you understand the 'why' behind the science, not just the mechanical steps to solve a problem."
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
          <section className="py-16 sm:py-20 bg-gradient-to-r from-[#2BAE66] to-[#1A3D7C] text-white">
            <div className="container mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold mb-6">
                Ready to Master Science?
              </h2>
              <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto opacity-90">
                Don't let science homework stress you out. Get expert help that makes complex concepts clear.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/homework-help/submit">
                  <Button
                    size="lg"
                    className="bg-[#FFC857] text-[#1A3D7C] rounded-xl px-8 py-6 hover:shadow-lg hover:bg-[#FFC857]/90 transition-all text-lg font-semibold w-full sm:w-auto"
                  >
                    Submit Your Science Question
                  </Button>
                </Link>
                <Link href="/tutoring/science">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white rounded-xl px-8 py-6 hover:bg-white hover:text-[#1A3D7C] transition-all text-lg font-semibold w-full sm:w-auto"
                  >
                    Explore Weekly Science Tutoring
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
                <Link href="/homework-help/math">
                  <Button variant="outline" className="rounded-full">
                    Math Homework Help →
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
