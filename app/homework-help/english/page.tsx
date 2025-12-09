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
  PenTool,
  Upload,
  Shield,
  Award,
  Zap,
  GraduationCap,
  Target,
  Lightbulb,
  ChevronRight,
  BookOpen,
  FileText,
  MessageSquare,
  Quote,
  Pencil,
  BookMarked,
  Type,
  AlignLeft,
  Edit3
} from "lucide-react"

export const metadata: Metadata = {
  title: "English Homework Help | Essay Writing, Grammar, Literature | Grades 6-12 | The Tutor Bridge",
  description: "Expert English homework help for middle school and high school. Essay writing, grammar, literature analysis, reading comprehension. U.S.-certified tutors, fast turnaround from $15.",
  keywords: [
    "english homework help",
    "essay writing help",
    "grammar help",
    "literature analysis",
    "reading comprehension help",
    "english tutor online",
    "essay editing",
    "writing tutor",
    "english paper help",
    "thesis statement help",
    "persuasive essay help",
    "argumentative essay help",
    "book report help",
    "literary analysis help",
    "AP english help",
    "AP literature help",
    "AP language help",
    "grammar check",
    "punctuation help",
    "sentence structure",
    "paragraph writing",
    "research paper help",
    "MLA format help",
    "APA format help",
    "creative writing help",
    "poetry analysis",
    "shakespeare help",
    "high school english",
    "middle school english"
  ],
  alternates: {
    canonical: "https://www.thetutorbridge.com/homework-help/english",
  },
  openGraph: {
    title: "English Homework Help | Essay Writing, Grammar, Literature | Grades 6-12",
    description: "Expert essay writing, grammar, and literature help from U.S.-certified tutors.",
    url: "https://www.thetutorbridge.com/homework-help/english",
    siteName: "The Tutor Bridge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "English Homework Help | Grades 6-12 | The Tutor Bridge",
    description: "Expert English homework help with detailed feedback from U.S.-certified tutors.",
  }
}

// JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "English Homework Help",
  "description": "Expert English homework help for grades 6-12 including Essay Writing, Grammar, Literature Analysis, and Reading Comprehension",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "The Tutor Bridge",
    "url": "https://www.thetutorbridge.com"
  },
  "educationalLevel": ["Middle School", "High School"],
  "teaches": ["Essay Writing", "Grammar", "Literature Analysis", "Reading Comprehension", "Creative Writing"],
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
      "name": "What English topics do you cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We cover all middle school and high school English topics including Essay Writing (persuasive, argumentative, narrative, expository), Grammar & Mechanics, Literature Analysis, Reading Comprehension, Research Papers, Creative Writing, and AP English Language & Literature."
      }
    },
    {
      "@type": "Question",
      "name": "Can you help edit my essay?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Our tutors provide comprehensive essay feedback including structure, thesis strength, argument development, evidence usage, grammar, punctuation, and style. We also explain why changes are recommended so you improve your writing skills."
      }
    },
    {
      "@type": "Question",
      "name": "Do you write essays for students?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, we don't write essays for you. We help you become a better writer by providing guidance, feedback, and teaching proper techniques. We can help with brainstorming, outlining, thesis development, and revision - but the writing is yours."
      }
    }
  ]
}

const englishTopics = [
  {
    category: "Essay Writing",
    icon: Pencil,
    color: "blue",
    topics: ["Persuasive Essays", "Argumentative Essays", "Narrative Writing", "Expository Essays", "Compare & Contrast", "Thesis Statements", "Introductions & Conclusions", "Evidence & Citations"]
  },
  {
    category: "Grammar & Mechanics",
    icon: Type,
    color: "green",
    topics: ["Sentence Structure", "Punctuation", "Subject-Verb Agreement", "Pronoun Usage", "Verb Tenses", "Comma Rules", "Apostrophes", "Active vs Passive Voice"]
  },
  {
    category: "Literature Analysis",
    icon: BookOpen,
    color: "purple",
    topics: ["Theme Analysis", "Character Analysis", "Symbolism", "Literary Devices", "Point of View", "Plot Structure", "Setting Analysis", "Author's Purpose"]
  },
  {
    category: "Reading Comprehension",
    icon: BookMarked,
    color: "yellow",
    topics: ["Main Idea", "Supporting Details", "Inference", "Context Clues", "Summarizing", "Cause & Effect", "Sequencing", "Drawing Conclusions"]
  },
  {
    category: "Research & Citations",
    icon: FileText,
    color: "red",
    topics: ["Research Papers", "MLA Format", "APA Format", "Works Cited", "In-text Citations", "Source Evaluation", "Thesis Development", "Outlining"]
  },
  {
    category: "AP English",
    icon: Award,
    color: "indigo",
    topics: ["AP Language", "AP Literature", "Rhetorical Analysis", "Synthesis Essays", "Argument Essays", "Poetry Analysis", "Prose Analysis", "Timed Writing"]
  }
]

export default function EnglishHomeworkHelp() {
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
                <span className="text-[#1A3D7C] font-medium">English</span>
              </nav>
            </div>
          </div>

          {/* Hero Section - Subtle & Center Aligned */}
          <section className="relative py-16 sm:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] leading-tight mb-4">
                  English Homework Help
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
                  Essay writing, grammar, literature analysis & more. Our expert tutors help you become a stronger writer and more confident reader.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Link href="/homework-help/submit">
                    <Button
                      size="lg"
                      className="bg-[#FFC857] text-[#1A3D7C] rounded-xl px-8 py-4 hover:bg-[#FFC857]/90 transition-all font-semibold w-full sm:w-auto"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Submit Your Essay
                    </Button>
                  </Link>
                  <Link href="/tutoring/english">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-[#1A3D7C] text-[#1A3D7C] rounded-xl px-8 py-4 hover:bg-[#1A3D7C] hover:text-white transition-all font-semibold w-full sm:w-auto"
                    >
                      Explore English Tutoring
                    </Button>
                  </Link>
                </div>

                {/* Quick Stats */}
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#FFC857]" />
                    <span>From $15 per essay review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#FFC857]" />
                    <span>24-hour turnaround</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#FFC857]" />
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
                  English Topics We Cover
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Comprehensive support for all English and Language Arts skills across grades 6-12.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {englishTopics.map((topic, index) => {
                  const IconComponent = topic.icon
                  const colorClasses: Record<string, string> = {
                    blue: "bg-blue-100 text-blue-600",
                    green: "bg-green-100 text-green-600",
                    purple: "bg-purple-100 text-purple-600",
                    yellow: "bg-yellow-100 text-yellow-600",
                    red: "bg-red-100 text-red-600",
                    indigo: "bg-indigo-100 text-indigo-600"
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

          {/* Essay Help Process Section */}
          <section className="py-16 sm:py-20 bg-[#F8FAFC]">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  How We Help With Your Essay
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Our feedback goes beyond fixing errors — we teach you why changes matter and how to improve.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <Card className="p-6 sm:p-8 bg-white">
                  <CardContent className="p-0">
                    <div className="mb-6">
                      <span className="text-sm font-semibold text-[#FFC857] bg-yellow-100 px-3 py-1 rounded-full">
                        Sample: Essay Feedback
                      </span>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <h3 className="font-poppins font-bold text-[#1A3D7C] mb-2">Original Paragraph:</h3>
                      <p className="text-gray-700 italic">
                        "Social media is bad for teenagers. They spend too much time on it. It makes them feel bad about themselves. Parents should limit screen time."
                      </p>
                    </div>

                    <div className="space-y-6">
                      <h3 className="font-poppins font-bold text-[#1A3D7C]">Our Detailed Feedback:</h3>

                      <div className="border-l-4 border-red-400 pl-4 bg-red-50 py-3 rounded-r">
                        <p className="font-semibold text-red-700">Issue: Weak thesis statement</p>
                        <p className="text-gray-700 text-sm mt-1">
                          "Social media is bad" is vague and doesn't preview your argument. A strong thesis should state your specific claim and hint at your supporting points.
                        </p>
                      </div>

                      <div className="border-l-4 border-yellow-400 pl-4 bg-yellow-50 py-3 rounded-r">
                        <p className="font-semibold text-yellow-700">Issue: Lacking evidence</p>
                        <p className="text-gray-700 text-sm mt-1">
                          Each claim needs supporting evidence. What research shows social media affects teen mental health? Include specific statistics or expert quotes.
                        </p>
                      </div>

                      <div className="border-l-4 border-blue-400 pl-4 bg-blue-50 py-3 rounded-r">
                        <p className="font-semibold text-blue-700">Issue: Short, choppy sentences</p>
                        <p className="text-gray-700 text-sm mt-1">
                          Vary your sentence structure. Combine related ideas using transitions and subordinate clauses to create flow.
                        </p>
                      </div>

                      <div className="bg-[#2BAE66] text-white rounded-lg p-4">
                        <p className="font-semibold mb-2">Revised Version:</p>
                        <p className="italic text-sm">
                          "Excessive social media use poses significant risks to teenage mental health, including increased anxiety, depression, and negative self-image. According to a 2023 study by the American Psychological Association, teens who spend more than three hours daily on social media are twice as likely to report symptoms of depression. To protect adolescent well-being, parents and educators must establish healthy boundaries around screen time."
                        </p>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="font-semibold text-[#1A3D7C] mb-1">💡 What improved:</p>
                        <ul className="text-gray-600 text-sm space-y-1">
                          <li>• Specific thesis with clear argument</li>
                          <li>• Credible evidence (APA study)</li>
                          <li>• Varied sentence structure</li>
                          <li>• Logical flow between ideas</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-8">
                <Link href="/homework-help/submit">
                  <Button
                    size="lg"
                    className="bg-[#FFC857] text-[#1A3D7C] rounded-xl px-8 py-4 hover:shadow-lg transition-all font-semibold"
                  >
                    Get Feedback on Your Essay
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* What We Help With Section */}
          <section className="py-16 sm:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] mb-6">
                      Types of English Help We Provide
                    </h2>
                    <p className="text-gray-700 mb-6">
                      Whether you need essay feedback, grammar help, or literature analysis support — we've got you covered.
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Edit3 className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Essay Feedback & Editing</span>
                          <p className="text-gray-600 text-sm">Structure, thesis, arguments, evidence, grammar, and style</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Type className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Grammar Questions</span>
                          <p className="text-gray-600 text-sm">Sentence structure, punctuation, verb tenses, and more</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <BookOpen className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Literature Analysis</span>
                          <p className="text-gray-600 text-sm">Theme, character, symbolism, and literary devices</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <AlignLeft className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Reading Comprehension</span>
                          <p className="text-gray-600 text-sm">Understanding passages, answering questions, summarizing</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <FileText className="w-4 h-4 text-red-600" />
                        </div>
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Research Papers</span>
                          <p className="text-gray-600 text-sm">MLA/APA format, citations, thesis development</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] p-8 rounded-2xl text-white">
                    <h3 className="text-2xl font-poppins font-bold mb-4">English Help Pricing</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-white/20">
                        <span>Grammar Question</span>
                        <span className="font-bold">From $15</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-white/20">
                        <span>Essay Review (1-2 pages)</span>
                        <span className="font-bold">From $25</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-white/20">
                        <span>Essay Review (3-5 pages)</span>
                        <span className="font-bold">From $45</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-white/20">
                        <span>Literature Analysis Help</span>
                        <span className="font-bold">From $30</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Research Paper Review</span>
                        <span className="font-bold">From $60</span>
                      </div>
                    </div>
                    <Link href="/homework-help/submit" className="block mt-6">
                      <Button className="w-full bg-[#FFC857] text-[#1A3D7C] hover:bg-[#FFC857]/90">
                        Submit Your English Assignment
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Important Note Section */}
          <section className="py-12 bg-blue-50">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-3xl mx-auto text-center">
                <div className="w-16 h-16 bg-[#1A3D7C] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  Our Academic Integrity Promise
                </h3>
                <p className="text-gray-700">
                  We don't write essays for you. Our tutors provide feedback, guidance, and teaching — but the writing is always yours. We help you become a better writer, not bypass the learning process. This approach ensures you develop real skills that help on tests and in college.
                </p>
              </div>
            </div>
          </section>

          {/* Grade-Specific Help Section */}
          <section className="py-16 sm:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  English Help by Grade Level
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Our tutors understand the specific expectations for each grade level.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Middle School */}
                <Card className="p-6 sm:p-8 border-t-4 border-[#FFC857]">
                  <CardContent className="p-0">
                    <h3 className="text-2xl font-poppins font-bold text-[#1A3D7C] mb-4">Middle School English (Grades 6-8)</h3>
                    <p className="text-gray-600 mb-6">
                      Building foundational writing and analysis skills.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Grade 6:</span>
                          <span className="text-gray-600"> Paragraph writing, basic essays, grammar fundamentals</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Grade 7:</span>
                          <span className="text-gray-600"> Five-paragraph essays, literary elements, reading responses</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Grade 8:</span>
                          <span className="text-gray-600"> Research papers, argumentative writing, novel analysis</span>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* High School */}
                <Card className="p-6 sm:p-8 border-t-4 border-[#1A3D7C]">
                  <CardContent className="p-0">
                    <h3 className="text-2xl font-poppins font-bold text-[#1A3D7C] mb-4">High School English (Grades 9-12)</h3>
                    <p className="text-gray-600 mb-6">
                      Advanced analysis and college-prep writing skills.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Grade 9:</span>
                          <span className="text-gray-600"> Literary analysis, persuasive essays, MLA basics</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Grade 10:</span>
                          <span className="text-gray-600"> World literature, research papers, rhetorical analysis</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Grade 11:</span>
                          <span className="text-gray-600"> American literature, AP Language, synthesis essays</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#2BAE66] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-[#1A3D7C]">Grade 12:</span>
                          <span className="text-gray-600"> AP Literature, college essays, advanced analysis</span>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-16 sm:py-20 bg-[#F8FAFC]">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  English Success Stories
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <Card className="p-6 bg-gradient-to-br from-yellow-50 to-white">
                  <CardContent className="p-0">
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 text-[#FFC857] fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">
                      "I used to dread essay assignments. The feedback I got helped me understand how to structure my arguments. My writing has improved so much — even my teacher noticed!"
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#FFC857] rounded-full flex items-center justify-center text-white font-bold mr-3">
                        S
                      </div>
                      <div>
                        <div className="font-semibold text-[#1A3D7C]">Sophia L.</div>
                        <div className="text-sm text-gray-600">10th Grade, Virginia</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-blue-50 to-white">
                  <CardContent className="p-0">
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 text-[#FFC857] fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">
                      "AP Literature was killing me until I got help analyzing poetry and prose. The tutor taught me how to find themes and use evidence properly. Got a 4 on my AP exam!"
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#1A3D7C] rounded-full flex items-center justify-center text-white font-bold mr-3">
                        D
                      </div>
                      <div>
                        <div className="font-semibold text-[#1A3D7C]">David C.</div>
                        <div className="text-sm text-gray-600">12th Grade, Illinois</div>
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
                      "My daughter struggled with grammar and sentence structure. The tutors not only fixed her mistakes but explained the rules. She's writing so much more confidently now."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#2BAE66] rounded-full flex items-center justify-center text-white font-bold mr-3">
                        M
                      </div>
                      <div>
                        <div className="font-semibold text-[#1A3D7C]">Michelle P.</div>
                        <div className="text-sm text-gray-600">Parent, North Carolina</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 sm:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
                  English Homework Help FAQs
                </h2>
              </div>

              <div className="max-w-3xl mx-auto space-y-4">
                {[
                  {
                    question: "What English topics do you cover?",
                    answer: "We cover all middle school and high school English topics including Essay Writing (persuasive, argumentative, narrative, expository), Grammar & Mechanics, Literature Analysis, Reading Comprehension, Research Papers, Creative Writing, and AP English Language & Literature."
                  },
                  {
                    question: "Can you help edit my essay?",
                    answer: "Yes! Our tutors provide comprehensive essay feedback including structure, thesis strength, argument development, evidence usage, grammar, punctuation, and style. We explain why changes are recommended so you improve your writing skills."
                  },
                  {
                    question: "Do you write essays for students?",
                    answer: "No, we don't write essays for you. We help you become a better writer by providing guidance, feedback, and teaching proper techniques. We can help with brainstorming, outlining, thesis development, and revision — but the writing is yours."
                  },
                  {
                    question: "Can you help with AP English?",
                    answer: "Absolutely! We have specialized tutors for both AP English Language and AP English Literature who understand the exam format, scoring rubrics, and skills needed to succeed."
                  },
                  {
                    question: "How do you help with literature analysis?",
                    answer: "Our tutors guide you through analyzing themes, characters, symbolism, and literary devices. We teach you how to support your interpretations with textual evidence and write strong analytical paragraphs."
                  }
                ].map((faq, index) => (
                  <Card key={index} className="p-6 bg-[#F8FAFC]">
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
          <section className="py-16 sm:py-20 bg-gradient-to-r from-[#FFC857] to-[#FFC857]/90 text-[#1A3D7C]">
            <div className="container mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold mb-6">
                Ready to Improve Your Writing?
              </h2>
              <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto opacity-90">
                Get expert feedback that helps you become a stronger writer and more confident student.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/homework-help/submit">
                  <Button
                    size="lg"
                    className="bg-[#1A3D7C] text-white rounded-xl px-8 py-6 hover:shadow-lg hover:bg-[#1A3D7C]/90 transition-all text-lg font-semibold w-full sm:w-auto"
                  >
                    Submit Your English Assignment
                  </Button>
                </Link>
                <Link href="/tutoring/english">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-[#1A3D7C] text-[#1A3D7C] rounded-xl px-8 py-6 hover:bg-[#1A3D7C] hover:text-white transition-all text-lg font-semibold w-full sm:w-auto"
                  >
                    Explore Weekly English Tutoring
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
                <Link href="/homework-help/science">
                  <Button variant="outline" className="rounded-full">
                    Science Homework Help →
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
