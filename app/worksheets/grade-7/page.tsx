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
  Home,
  Star,
  Play,
  MessageCircle,
  ChevronDown,
  Shapes,
  Percent,
  Hash,
  TrendingUp
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import {
  DifficultyBadge,
  TimeBadge,
  StatsBanner,
  GradeNavigation,
  TutorHelpCTA,
  QuickActionsBar
} from '@/components/worksheet-components';
import { useState } from 'react';

// Grade 7 Math Topics Data
const grade7Data = {
  grade: 7,
  totalWorksheets: 92,
  totalDownloads: '52.8K',
  averageRating: 4.8,
  subjects: [
    {
      name: 'Rational Numbers',
      slug: 'rational-numbers',
      icon: Hash,
      color: 'from-blue-600 to-indigo-600',
      description: 'Operations with integers, fractions, and decimals',
      topics: [
        {
          id: 'integers-operations',
          title: 'Integer Operations',
          slug: 'integers-operations',
          description: 'Add, subtract, multiply, and divide positive and negative integers. Absolute value and number line.',
          worksheetCount: 12,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '8.3K',
          rating: 4.9,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Negative Numbers', 'Absolute Value', 'Number Line']
        },
        {
          id: 'rational-number-operations',
          title: 'Rational Number Operations',
          slug: 'rational-number-operations',
          description: 'Add, subtract, multiply, and divide rational numbers (fractions and decimals) including negatives.',
          worksheetCount: 14,
          difficulty: 'Medium' as const,
          estimatedTime: '25-35 min',
          downloads: '7.6K',
          rating: 4.8,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Fractions', 'Decimals', 'Mixed Operations']
        },
        {
          id: 'converting-rational-numbers',
          title: 'Converting Rational Numbers',
          slug: 'converting-rational-numbers',
          description: 'Convert between fractions, decimals, and percents. Terminating and repeating decimals.',
          worksheetCount: 8,
          difficulty: 'Easy' as const,
          estimatedTime: '15-25 min',
          downloads: '5.4K',
          rating: 4.7,
          hasInteractive: true,
          tags: ['Conversions', 'Repeating Decimals', 'Percents']
        },
      ]
    },
    {
      name: 'Proportional Relationships',
      slug: 'proportional-relationships',
      icon: Percent,
      color: 'from-green-600 to-emerald-600',
      description: 'Ratios, rates, proportions, and percent applications',
      topics: [
        {
          id: 'ratios-proportions',
          title: 'Ratios & Proportions',
          slug: 'ratios-proportions',
          description: 'Write and solve proportions. Unit rates, constant of proportionality, and proportion word problems.',
          worksheetCount: 12,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '9.1K',
          rating: 4.8,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Cross Multiply', 'Unit Rate', 'Proportional']
        },
        {
          id: 'percent-applications',
          title: 'Percent Applications',
          slug: 'percent-applications',
          description: 'Percent increase/decrease, tax, tip, discount, simple interest, and markup/markdown.',
          worksheetCount: 14,
          difficulty: 'Medium' as const,
          estimatedTime: '25-35 min',
          downloads: '10.2K',
          rating: 4.9,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Tax & Tip', 'Discount', 'Simple Interest', 'Commission']
        },
        {
          id: 'proportional-graphs',
          title: 'Graphing Proportional Relationships',
          slug: 'proportional-graphs',
          description: 'Identify and graph proportional relationships. Find constant of proportionality from tables and graphs.',
          worksheetCount: 8,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '5.8K',
          rating: 4.6,
          hasInteractive: true,
          tags: ['Graphing', 'Origin', 'Constant Rate']
        },
        {
          id: 'scale-drawings',
          title: 'Scale Drawings & Maps',
          slug: 'scale-drawings',
          description: 'Use scale factors to solve problems with scale drawings, maps, and models.',
          worksheetCount: 6,
          difficulty: 'Easy' as const,
          estimatedTime: '15-25 min',
          downloads: '4.3K',
          rating: 4.7,
          hasVideo: true,
          tags: ['Scale Factor', 'Maps', 'Models']
        },
      ]
    },
    {
      name: 'Expressions & Equations',
      slug: 'expressions-equations',
      icon: Calculator,
      color: 'from-purple-600 to-pink-600',
      description: 'Algebraic expressions, equations, and inequalities',
      topics: [
        {
          id: 'algebraic-expressions',
          title: 'Algebraic Expressions',
          slug: 'algebraic-expressions',
          description: 'Write, evaluate, and simplify expressions with rational coefficients. Distributive property and combining like terms.',
          worksheetCount: 10,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '7.2K',
          rating: 4.8,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Like Terms', 'Distributive', 'Simplify']
        },
        {
          id: 'two-step-equations',
          title: 'Two-Step Equations',
          slug: 'two-step-equations',
          description: 'Solve two-step equations with integers and rational numbers. Word problems and checking solutions.',
          worksheetCount: 14,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '9.8K',
          rating: 4.9,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Solving', 'Variables', 'Word Problems']
        },
        {
          id: 'multi-step-equations',
          title: 'Multi-Step Equations',
          slug: 'multi-step-equations',
          description: 'Solve equations with variables on both sides, distributive property, and combining like terms.',
          worksheetCount: 10,
          difficulty: 'Hard' as const,
          estimatedTime: '25-35 min',
          downloads: '6.5K',
          rating: 4.7,
          hasVideo: true,
          tags: ['Variables Both Sides', 'Complex', 'Multi-Step']
        },
        {
          id: 'inequalities',
          title: 'Solving Inequalities',
          slug: 'inequalities',
          description: 'Solve and graph one and two-step inequalities. Compound inequalities introduction.',
          worksheetCount: 10,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '5.9K',
          rating: 4.6,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Graphing', 'Number Line', 'Compound']
        },
      ]
    },
    {
      name: 'Geometry',
      slug: 'geometry',
      icon: Shapes,
      color: 'from-orange-600 to-amber-600',
      description: 'Angles, triangles, circles, and 3D shapes',
      topics: [
        {
          id: 'angle-relationships',
          title: 'Angle Relationships',
          slug: 'angle-relationships',
          description: 'Supplementary, complementary, vertical, and adjacent angles. Angles formed by parallel lines and transversals.',
          worksheetCount: 10,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '6.8K',
          rating: 4.7,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Parallel Lines', 'Transversal', 'Corresponding']
        },
        {
          id: 'triangles',
          title: 'Triangles & Angle Sum',
          slug: 'triangles',
          description: 'Triangle angle sum theorem, exterior angles, and triangle inequality. Classify triangles.',
          worksheetCount: 8,
          difficulty: 'Medium' as const,
          estimatedTime: '20-25 min',
          downloads: '5.6K',
          rating: 4.8,
          hasVideo: true,
          tags: ['Angle Sum', 'Exterior Angles', 'Classification']
        },
        {
          id: 'circles',
          title: 'Circles: Circumference & Area',
          slug: 'circles',
          description: 'Calculate circumference and area of circles. Pi, radius, diameter relationships.',
          worksheetCount: 10,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '7.4K',
          rating: 4.8,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Circumference', 'Area', 'Pi']
        },
        {
          id: 'composite-figures',
          title: 'Area of Composite Figures',
          slug: 'composite-figures',
          description: 'Find area of composite shapes made from rectangles, triangles, and circles.',
          worksheetCount: 8,
          difficulty: 'Hard' as const,
          estimatedTime: '25-35 min',
          downloads: '4.9K',
          rating: 4.6,
          hasVideo: true,
          tags: ['Composite', 'Decompose', 'Complex Shapes']
        },
        {
          id: 'surface-area-volume',
          title: 'Surface Area & Volume',
          slug: 'surface-area-volume',
          description: 'Surface area and volume of prisms, pyramids, and cylinders. Cross-sections of 3D shapes.',
          worksheetCount: 12,
          difficulty: 'Hard' as const,
          estimatedTime: '30-40 min',
          downloads: '6.2K',
          rating: 4.7,
          hasVideo: true,
          tags: ['Prisms', 'Pyramids', 'Cylinders']
        },
      ]
    },
    {
      name: 'Statistics & Probability',
      slug: 'statistics-probability',
      icon: TrendingUp,
      color: 'from-cyan-600 to-blue-600',
      description: 'Data analysis, sampling, and probability',
      topics: [
        {
          id: 'sampling-inference',
          title: 'Random Sampling & Inference',
          slug: 'sampling-inference',
          description: 'Random sampling methods, making inferences about populations, and comparing samples.',
          worksheetCount: 8,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '4.2K',
          rating: 4.5,
          hasVideo: true,
          tags: ['Random Sample', 'Population', 'Inference']
        },
        {
          id: 'comparing-data',
          title: 'Comparing Data Distributions',
          slug: 'comparing-data',
          description: 'Compare centers and spreads of two populations. Box plots and measures of variability.',
          worksheetCount: 8,
          difficulty: 'Medium' as const,
          estimatedTime: '25-35 min',
          downloads: '3.8K',
          rating: 4.6,
          hasVideo: true,
          tags: ['Box Plots', 'MAD', 'IQR']
        },
        {
          id: 'probability',
          title: 'Probability',
          slug: 'probability',
          description: 'Theoretical and experimental probability. Compound events, tree diagrams, and simulations.',
          worksheetCount: 12,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '6.1K',
          rating: 4.8,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Simple', 'Compound', 'Tree Diagrams']
        },
      ]
    },
  ]
};

// FAQ data for Grade 7
const faqs = [
  {
    question: 'What topics are covered in Grade 7 math worksheets?',
    answer: 'Our Grade 7 math worksheets cover rational number operations, proportional relationships (ratios, rates, percent applications), expressions and equations (two-step and multi-step), geometry (angles, circles, 3D shapes), and statistics & probability. All aligned with Common Core standards.'
  },
  {
    question: 'How do Grade 7 worksheets build on Grade 6?',
    answer: 'Grade 7 expands on Grade 6 concepts by introducing negative rational numbers, more complex equations, deeper proportion applications (tax, tip, interest), more advanced geometry (circles, composite figures), and formal probability concepts.'
  },
  {
    question: 'Are these suitable for pre-algebra preparation?',
    answer: 'Yes! Grade 7 worksheets provide excellent pre-algebra preparation. Topics like two-step equations, expressions with rational coefficients, and graphing proportional relationships directly prepare students for Algebra 1.'
  },
  {
    question: 'What if my student finds Grade 7 topics too difficult?',
    answer: 'Each topic includes Easy, Medium, and Hard difficulty levels. Start with Easy worksheets to build confidence, then progress to harder problems. Our tutors are also available for personalized help with challenging concepts.'
  },
];

export default function Grade7WorksheetsPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

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
            <Link href="/worksheets" className="text-blue-600 hover:text-blue-800">
              Worksheets
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 font-medium">Grade 7</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 text-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <span className="text-3xl font-bold">7</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Grade 7 Math Worksheets
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-6">
            {grade7Data.totalWorksheets}+ free printable worksheets covering rational numbers, proportions,
            pre-algebra, geometry, and probability. Perfect pre-algebra preparation with answer keys included.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <FileText className="w-5 h-5 mr-2 text-yellow-300" />
              <span className="font-medium">{grade7Data.totalWorksheets} Worksheets</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <Download className="w-5 h-5 mr-2 text-yellow-300" />
              <span className="font-medium">{grade7Data.totalDownloads} Downloads</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <Star className="w-5 h-5 mr-2 text-yellow-300" />
              <span className="font-medium">{grade7Data.averageRating} Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grade Navigation */}
      <div className="bg-white border-b border-gray-100 py-4 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <GradeNavigation currentGrade={7} />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Quick Actions */}
        <QuickActionsBar
          downloadAllHref="/worksheets/grade-7/download-all"
          practiceHref="/worksheets/grade-7/practice"
          tutorialHref="/worksheets/grade-7/tutorials"
        />

        {/* Stats Banner */}
        <StatsBanner
          totalWorksheets={grade7Data.totalWorksheets}
          totalDownloads={grade7Data.totalDownloads}
          averageRating={grade7Data.averageRating}
        />

        {/* Worksheet Categories */}
        {grade7Data.subjects.map((subject) => {
          const Icon = subject.icon;
          return (
            <section key={subject.slug} className="mb-12" id={subject.slug}>
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${subject.color} rounded-xl flex items-center justify-center mr-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{subject.name}</h2>
                  <p className="text-sm text-gray-500">{subject.description}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {subject.topics.map((topic) => (
                  <Link
                    key={topic.id}
                    href={`/worksheets/grade-7/${subject.slug}/${topic.slug}`}
                    className="group bg-white rounded-xl p-5 border-2 border-gray-100 hover:border-green-500 shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                            {topic.title}
                          </h3>
                          <p className="text-xs text-gray-500">{topic.worksheetCount} worksheets</p>
                        </div>
                      </div>
                      <DifficultyBadge difficulty={topic.difficulty} />
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{topic.description}</p>

                    {/* Tags */}
                    {topic.tags && topic.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {topic.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Features */}
                    <div className="flex items-center gap-2 mb-3">
                      <TimeBadge time={topic.estimatedTime} />
                      {topic.hasVideo && (
                        <span className="inline-flex items-center text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                          <Play className="w-3 h-3 mr-1" /> Video
                        </span>
                      )}
                      {topic.hasInteractive && (
                        <span className="inline-flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          <CheckCircle className="w-3 h-3 mr-1" /> Interactive
                        </span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center text-sm text-gray-500">
                        <Download className="w-4 h-4 mr-1" />
                        <span>{topic.downloads}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium text-gray-700">{topic.rating}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* Tutor Help CTA */}
        <TutorHelpCTA />

        {/* FAQ Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
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
        </section>
      </main>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Grade 7 Math Worksheets",
            "description": "92+ free printable Grade 7 math worksheets with answer keys covering rational numbers, proportions, pre-algebra, geometry, and probability.",
            "url": "https://www.thetutorbridge.com/worksheets/grade-7",
            "provider": {
              "@type": "EducationalOrganization",
              "name": "The Tutor Bridge"
            },
            "audience": {
              "@type": "EducationalAudience",
              "educationalRole": "student",
              "audienceType": "Grade 7"
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
            <div>
              <h4 className="font-semibold mb-4">Grade 7 Topics</h4>
              <ul className="space-y-2 text-sm">
                {grade7Data.subjects.map((s) => (
                  <li key={s.slug}>
                    <Link href={`#${s.slug}`} className="text-gray-300 hover:text-white transition-colors">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Other Grades</h4>
              <ul className="space-y-2 text-sm">
                {[6, 8, 9, 10].map((g) => (
                  <li key={g}>
                    <Link href={`/worksheets/grade-${g}`} className="text-gray-300 hover:text-white transition-colors">
                      Grade {g} Worksheets
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/calculators" className="text-gray-300 hover:text-white">Calculators</Link></li>
                <li><Link href="/study-resources" className="text-gray-300 hover:text-white">Study Resources</Link></li>
                <li><Link href="/tutoring" className="text-gray-300 hover:text-white">Online Tutoring</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Need Help?</h4>
              <p className="text-gray-300 text-sm mb-4">
                Our tutors are available 24/7 to help with Grade 7 math.
              </p>
              <Link
                href="/tutoring/free-consultation"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                Get Free Help
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
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
