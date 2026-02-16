'use client';

import Link from 'next/link';
import {
  FileText,
  Download,
  CheckCircle,
  Clock,
  BookOpen,
  Calculator,
  Beaker,
  Languages,
  GraduationCap,
  ArrowRight,
  Search,
  Star,
  Users,
  Award,
  Zap,
  MessageCircle,
  ChevronDown,
  Home,
  TrendingUp
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { useState } from 'react';

// Worksheet data organized by grade and subject
const worksheetData = {
  grades: [
    { grade: 6, worksheetCount: 85, subjects: ['Math', 'Science', 'English'], popular: ['Fractions', 'Decimals', 'Basic Algebra'] },
    { grade: 7, worksheetCount: 92, subjects: ['Math', 'Science', 'English'], popular: ['Pre-Algebra', 'Geometry', 'Ratios'] },
    { grade: 8, worksheetCount: 98, subjects: ['Math', 'Science', 'English'], popular: ['Algebra', 'Linear Equations', 'Polynomials'] },
    { grade: 9, worksheetCount: 76, subjects: ['Math', 'Physics', 'Chemistry'], popular: ['Quadratics', 'Trigonometry', 'Motion'] },
    { grade: 10, worksheetCount: 82, subjects: ['Math', 'Physics', 'Chemistry'], popular: ['Coordinate Geometry', 'Acids & Bases', 'Electricity'] },
    { grade: 11, worksheetCount: 68, subjects: ['Math', 'Physics', 'Chemistry'], popular: ['Calculus Basics', 'Thermodynamics', 'Organic Chemistry'] },
    { grade: 12, worksheetCount: 71, subjects: ['Math', 'Physics', 'Chemistry'], popular: ['Integration', 'Electromagnetism', 'Biomolecules'] },
  ],
  subjects: [
    {
      name: 'Mathematics',
      icon: Calculator,
      color: 'from-blue-600 to-indigo-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      worksheetCount: 280,
      topics: ['Algebra', 'Geometry', 'Trigonometry', 'Calculus', 'Statistics']
    },
    {
      name: 'Science',
      icon: Beaker,
      color: 'from-green-600 to-emerald-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      worksheetCount: 150,
      topics: ['Physics', 'Chemistry', 'Biology', 'Environmental Science']
    },
    {
      name: 'English',
      icon: Languages,
      color: 'from-purple-600 to-pink-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      worksheetCount: 90,
      topics: ['Grammar', 'Reading Comprehension', 'Writing', 'Vocabulary']
    },
  ],
  popularWorksheets: [
    {
      title: 'Quadratic Equations Practice',
      grade: 8,
      subject: 'Math',
      difficulty: 'Medium',
      downloads: '15.2K',
      rating: 4.8,
      href: '/worksheets/math/grade-8/algebra/quadratic-equations'
    },
    {
      title: 'Fractions & Decimals',
      grade: 6,
      subject: 'Math',
      difficulty: 'Easy',
      downloads: '12.8K',
      rating: 4.9,
      href: '/worksheets/math/grade-6/fractions'
    },
    {
      title: 'Linear Equations',
      grade: 7,
      subject: 'Math',
      difficulty: 'Medium',
      downloads: '11.5K',
      rating: 4.7,
      href: '/worksheets/math/grade-7/algebra/linear-equations'
    },
    {
      title: 'Trigonometry Basics',
      grade: 9,
      subject: 'Math',
      difficulty: 'Medium',
      downloads: '9.8K',
      rating: 4.8,
      href: '/worksheets/math/grade-9/trigonometry'
    },
    {
      title: 'Chemical Reactions',
      grade: 10,
      subject: 'Science',
      difficulty: 'Medium',
      downloads: '8.2K',
      rating: 4.6,
      href: '/worksheets/science/grade-10/chemistry/chemical-reactions'
    },
    {
      title: 'Grammar Fundamentals',
      grade: 6,
      subject: 'English',
      difficulty: 'Easy',
      downloads: '7.5K',
      rating: 4.7,
      href: '/worksheets/english/grade-6/grammar'
    },
  ]
};

const features = [
  {
    icon: CheckCircle,
    title: '100% Free',
    description: 'All worksheets are completely free. No hidden charges, no premium tiers.',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: FileText,
    title: 'Answer Keys Included',
    description: 'Every worksheet comes with detailed answer keys and step-by-step solutions.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Download,
    title: 'Instant PDF Download',
    description: 'Download and print immediately. No signup or email required.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    icon: Zap,
    title: 'Online Practice Mode',
    description: 'Practice interactively with instant feedback and scoring.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    icon: BookOpen,
    title: 'Step-by-Step Tutorials',
    description: 'Learn concepts before practicing with our embedded tutorials.',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50'
  },
  {
    icon: MessageCircle,
    title: 'Tutor Support',
    description: 'Stuck on a problem? Get help from our expert tutors anytime.',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50'
  },
];

const faqs = [
  {
    question: 'Are all worksheets really free?',
    answer: 'Yes! All worksheets on The Tutor Bridge are 100% free to download and use. We include answer keys and step-by-step solutions at no cost. Our mission is to make quality education accessible to everyone.'
  },
  {
    question: 'Do I need to create an account to download?',
    answer: 'No account is required to download worksheets. Simply click the download button and get your PDF instantly. However, creating a free account lets you track your progress and save favorites.'
  },
  {
    question: 'Are answer keys included with the worksheets?',
    answer: 'Yes, every worksheet includes a complete answer key. Most also include step-by-step solutions showing how to solve each problem, not just the final answers.'
  },
  {
    question: 'What grades and subjects do you cover?',
    answer: 'We cover grades 6 through 12 with worksheets in Mathematics, Science (Physics, Chemistry, Biology), and English. Our collection includes over 500 worksheets across all major topics.'
  },
  {
    question: 'Can I use these worksheets for my classroom?',
    answer: 'Absolutely! Teachers are welcome to print and distribute our worksheets to students. Many educators use our materials for homework assignments, extra practice, and test preparation.'
  },
  {
    question: 'How often do you add new worksheets?',
    answer: 'We add new worksheets weekly based on curriculum standards and student feedback. Subscribe to our newsletter or check back regularly for new content.'
  },
];

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const colors = {
    Easy: 'bg-green-100 text-green-700 border-green-200',
    Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Hard: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full border ${colors[difficulty as keyof typeof colors] || colors.Medium}`}>
      {difficulty}
    </span>
  );
}

export default function WorksheetsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const totalWorksheets = worksheetData.grades.reduce((sum, g) => sum + g.worksheetCount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm py-3 px-4 sm:px-6 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto max-w-7xl">
          <nav className="flex items-center space-x-2 text-xs sm:text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center">
              <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 font-medium">Worksheets</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border-4 border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 border-4 border-white rounded-lg rotate-45"></div>
        </div>

        <div className="container mx-auto text-center max-w-5xl relative z-10">
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-2xl mb-4">
              <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Free Math & Science Worksheets
            </h1>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            {totalWorksheets}+ printable worksheets for Grades 6-12 with
            <span className="text-yellow-300 font-semibold"> answer keys</span>,
            <span className="text-yellow-300 font-semibold"> step-by-step solutions</span>, and
            <span className="text-yellow-300 font-semibold"> online practice</span>
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
              <FileText className="w-5 h-5 mr-2 text-yellow-300" />
              <span className="font-semibold">{totalWorksheets}+ Worksheets</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
              <GraduationCap className="w-5 h-5 mr-2 text-yellow-300" />
              <span className="font-semibold">Grades 6-12</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
              <CheckCircle className="w-5 h-5 mr-2 text-yellow-300" />
              <span className="font-semibold">100% Free</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search worksheets... (e.g., 'quadratic equations', 'fractions grade 6')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-300/50 text-base sm:text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Grade */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Browse Worksheets by Grade
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Select your grade level to find worksheets tailored to your curriculum
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {worksheetData.grades.map((gradeData) => (
              <Link
                key={gradeData.grade}
                href={`/worksheets/grade-${gradeData.grade}`}
                className="group relative bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 hover:border-blue-500 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
                    {gradeData.grade}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">Grade {gradeData.grade}</h3>
                  <p className="text-xs text-gray-500">{gradeData.worksheetCount} worksheets</p>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Subject */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Browse by Subject
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore worksheets organized by subject and topic
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {worksheetData.subjects.map((subject) => {
              const Icon = subject.icon;
              return (
                <Link
                  key={subject.name}
                  href={`/worksheets/${subject.name.toLowerCase()}`}
                  className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500"
                >
                  <div className="flex items-start mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${subject.color} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.worksheetCount} worksheets</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Popular topics:</p>
                    <div className="flex flex-wrap gap-2">
                      {subject.topics.map((topic) => (
                        <span key={topic} className={`text-xs px-3 py-1 ${subject.bgColor} ${subject.textColor} rounded-full`}>
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                    <span>Explore {subject.name}</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Worksheets */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Most Popular Worksheets
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Top-rated worksheets loved by students and teachers
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {worksheetData.popularWorksheets.map((worksheet, index) => (
              <Link
                key={index}
                href={worksheet.href}
                className="group bg-white rounded-xl p-5 border-2 border-gray-100 hover:border-blue-500 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {worksheet.title}
                      </h3>
                      <p className="text-xs text-gray-500">Grade {worksheet.grade} | {worksheet.subject}</p>
                    </div>
                  </div>
                  <DifficultyBadge difficulty={worksheet.difficulty} />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <Download className="w-4 h-4 mr-1" />
                    <span>{worksheet.downloads}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-gray-700 font-medium">{worksheet.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/worksheets/all"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl font-semibold"
            >
              View All Worksheets
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Our Worksheets */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our Worksheets?
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              We're different from other worksheet sites. Here's why students and teachers love us.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all"
                >
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-white/80 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tutor CTA */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 sm:p-12 text-white text-center shadow-2xl">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Stuck on a Problem?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Our expert tutors are available 24/7 to help you understand concepts and solve problems.
              Get personalized 1-on-1 help when worksheets aren't enough.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tutoring/free-consultation"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 rounded-xl hover:bg-green-50 transition-all font-semibold text-lg shadow-lg"
              >
                Get Free Help Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/homework-help"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white border-2 border-white/30 rounded-xl hover:bg-white/20 transition-all font-semibold text-lg"
              >
                Homework Help
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg">
              Everything you need to know about our worksheets
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schema Markup (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Free Math & Science Worksheets for Grades 6-12",
            "description": "Download 500+ free printable worksheets with answer keys for grades 6-12. Math, Science, English worksheets with step-by-step solutions.",
            "url": "https://www.thetutorbridge.com/worksheets",
            "provider": {
              "@type": "EducationalOrganization",
              "name": "The Tutor Bridge",
              "url": "https://www.thetutorbridge.com"
            },
            "about": {
              "@type": "Thing",
              "name": "Educational Worksheets"
            },
            "audience": {
              "@type": "EducationalAudience",
              "educationalRole": "student",
              "audienceType": "Grades 6-12"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center mb-4">
                <FileText className="w-8 h-8 text-yellow-400 mr-3" />
                <span className="text-xl font-bold">Worksheets</span>
              </div>
              <p className="text-gray-300 text-sm">
                Free printable worksheets for students in grades 6-12. Download, print, and practice.
              </p>
            </div>

            {/* By Grade */}
            <div>
              <h4 className="font-semibold mb-4">By Grade</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {worksheetData.grades.map((g) => (
                  <Link
                    key={g.grade}
                    href={`/worksheets/grade-${g.grade}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Grade {g.grade}
                  </Link>
                ))}
              </div>
            </div>

            {/* By Subject */}
            <div>
              <h4 className="font-semibold mb-4">By Subject</h4>
              <ul className="space-y-2 text-sm">
                {worksheetData.subjects.map((s) => (
                  <li key={s.name}>
                    <Link
                      href={`/worksheets/${s.name.toLowerCase()}`}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {s.name} Worksheets
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/calculators" className="text-gray-300 hover:text-white transition-colors">
                    Calculators
                  </Link>
                </li>
                <li>
                  <Link href="/study-resources" className="text-gray-300 hover:text-white transition-colors">
                    Study Resources
                  </Link>
                </li>
                <li>
                  <Link href="/tutoring" className="text-gray-300 hover:text-white transition-colors">
                    Online Tutoring
                  </Link>
                </li>
                <li>
                  <Link href="/homework-help" className="text-gray-300 hover:text-white transition-colors">
                    Homework Help
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>© 2026 The Tutor Bridge. All worksheets are free for personal and educational use.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
