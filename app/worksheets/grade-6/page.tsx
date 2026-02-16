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
  Hash
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import {
  DifficultyBadge,
  TimeBadge,
  RatingDisplay,
  StatsBanner,
  GradeNavigation,
  TutorHelpCTA,
  QuickActionsBar
} from '@/components/worksheet-components';
import { useState } from 'react';

// Grade 6 Math Topics Data
const grade6Data = {
  grade: 6,
  totalWorksheets: 85,
  totalDownloads: '45.2K',
  averageRating: 4.7,
  subjects: [
    {
      name: 'Numbers & Operations',
      slug: 'numbers-operations',
      icon: Hash,
      color: 'from-blue-600 to-indigo-600',
      description: 'Master whole numbers, place value, and basic operations',
      topics: [
        {
          id: 'whole-numbers',
          title: 'Whole Numbers & Place Value',
          slug: 'whole-numbers',
          description: 'Practice with place value up to billions, comparing and ordering numbers, rounding to any place.',
          worksheetCount: 8,
          difficulty: 'Easy' as const,
          estimatedTime: '15-20 min',
          downloads: '5.2K',
          rating: 4.8,
          hasInteractive: true,
          tags: ['Place Value', 'Rounding', 'Comparing']
        },
        {
          id: 'operations',
          title: 'Multi-Digit Operations',
          slug: 'multi-digit-operations',
          description: 'Addition, subtraction, multiplication, and division with multi-digit numbers including word problems.',
          worksheetCount: 12,
          difficulty: 'Easy' as const,
          estimatedTime: '20-25 min',
          downloads: '6.8K',
          rating: 4.7,
          hasInteractive: true,
          tags: ['Addition', 'Subtraction', 'Multiplication', 'Division']
        },
        {
          id: 'factors-multiples',
          title: 'Factors & Multiples',
          slug: 'factors-multiples',
          description: 'Find factors, multiples, GCF, and LCM. Prime factorization and divisibility rules.',
          worksheetCount: 10,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '7.1K',
          rating: 4.6,
          hasVideo: true,
          hasInteractive: true,
          tags: ['GCF', 'LCM', 'Prime Numbers', 'Divisibility']
        },
        {
          id: 'order-of-operations',
          title: 'Order of Operations (PEMDAS)',
          slug: 'order-of-operations',
          description: 'Master PEMDAS/BODMAS with increasingly complex expressions including parentheses and exponents.',
          worksheetCount: 8,
          difficulty: 'Medium' as const,
          estimatedTime: '15-25 min',
          downloads: '5.9K',
          rating: 4.8,
          hasVideo: true,
          tags: ['PEMDAS', 'BODMAS', 'Expressions']
        },
      ]
    },
    {
      name: 'Fractions',
      slug: 'fractions',
      icon: Calculator,
      color: 'from-green-600 to-emerald-600',
      description: 'Complete fraction mastery from basics to operations',
      topics: [
        {
          id: 'fraction-basics',
          title: 'Understanding Fractions',
          slug: 'fraction-basics',
          description: 'Identify fractions, equivalent fractions, simplifying fractions, and comparing fractions.',
          worksheetCount: 10,
          difficulty: 'Easy' as const,
          estimatedTime: '15-20 min',
          downloads: '8.5K',
          rating: 4.9,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Equivalent', 'Simplifying', 'Comparing']
        },
        {
          id: 'adding-subtracting-fractions',
          title: 'Adding & Subtracting Fractions',
          slug: 'adding-subtracting-fractions',
          description: 'Add and subtract fractions with like and unlike denominators. Includes mixed numbers.',
          worksheetCount: 12,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '9.2K',
          rating: 4.8,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Like Denominators', 'Unlike Denominators', 'Mixed Numbers']
        },
        {
          id: 'multiplying-dividing-fractions',
          title: 'Multiplying & Dividing Fractions',
          slug: 'multiplying-dividing-fractions',
          description: 'Multiply and divide fractions and mixed numbers. Reciprocals and word problems.',
          worksheetCount: 10,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '7.8K',
          rating: 4.7,
          hasVideo: true,
          tags: ['Multiplication', 'Division', 'Reciprocals']
        },
        {
          id: 'fraction-word-problems',
          title: 'Fraction Word Problems',
          slug: 'fraction-word-problems',
          description: 'Real-world problems involving all fraction operations. Build problem-solving skills.',
          worksheetCount: 8,
          difficulty: 'Hard' as const,
          estimatedTime: '25-35 min',
          downloads: '4.5K',
          rating: 4.6,
          tags: ['Word Problems', 'Applications', 'Problem Solving']
        },
      ]
    },
    {
      name: 'Decimals',
      slug: 'decimals',
      icon: Hash,
      color: 'from-purple-600 to-pink-600',
      description: 'Decimal operations and conversions',
      topics: [
        {
          id: 'decimal-basics',
          title: 'Understanding Decimals',
          slug: 'decimal-basics',
          description: 'Place value, reading and writing decimals, comparing and ordering decimals.',
          worksheetCount: 8,
          difficulty: 'Easy' as const,
          estimatedTime: '15-20 min',
          downloads: '5.8K',
          rating: 4.8,
          hasInteractive: true,
          tags: ['Place Value', 'Comparing', 'Ordering']
        },
        {
          id: 'decimal-operations',
          title: 'Decimal Operations',
          slug: 'decimal-operations',
          description: 'Add, subtract, multiply, and divide decimals with step-by-step methods.',
          worksheetCount: 12,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '7.3K',
          rating: 4.7,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Add', 'Subtract', 'Multiply', 'Divide']
        },
        {
          id: 'fraction-decimal-conversion',
          title: 'Fractions & Decimals Conversion',
          slug: 'fraction-decimal-conversion',
          description: 'Convert between fractions and decimals. Repeating decimals and rounding.',
          worksheetCount: 8,
          difficulty: 'Medium' as const,
          estimatedTime: '20-25 min',
          downloads: '6.1K',
          rating: 4.6,
          hasVideo: true,
          tags: ['Conversion', 'Repeating Decimals']
        },
      ]
    },
    {
      name: 'Ratios & Proportions',
      slug: 'ratios-proportions',
      icon: Percent,
      color: 'from-orange-600 to-amber-600',
      description: 'Introduction to ratios, rates, and proportional relationships',
      topics: [
        {
          id: 'ratio-basics',
          title: 'Understanding Ratios',
          slug: 'ratio-basics',
          description: 'Write ratios in different forms, equivalent ratios, and ratio tables.',
          worksheetCount: 8,
          difficulty: 'Easy' as const,
          estimatedTime: '15-20 min',
          downloads: '5.4K',
          rating: 4.7,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Writing Ratios', 'Equivalent Ratios', 'Ratio Tables']
        },
        {
          id: 'unit-rates',
          title: 'Unit Rates',
          slug: 'unit-rates',
          description: 'Calculate unit rates from tables, graphs, and word problems. Real-world applications.',
          worksheetCount: 8,
          difficulty: 'Medium' as const,
          estimatedTime: '20-25 min',
          downloads: '4.8K',
          rating: 4.6,
          hasVideo: true,
          tags: ['Unit Rate', 'Speed', 'Price per Unit']
        },
        {
          id: 'percent-basics',
          title: 'Introduction to Percents',
          slug: 'percent-basics',
          description: 'Convert between fractions, decimals, and percents. Find percent of a number.',
          worksheetCount: 10,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '6.7K',
          rating: 4.8,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Conversions', 'Percent of Number', 'Applications']
        },
      ]
    },
    {
      name: 'Pre-Algebra',
      slug: 'pre-algebra',
      icon: Calculator,
      color: 'from-cyan-600 to-blue-600',
      description: 'Foundation for algebraic thinking',
      topics: [
        {
          id: 'variables-expressions',
          title: 'Variables & Expressions',
          slug: 'variables-expressions',
          description: 'Write and evaluate algebraic expressions. Combine like terms and use properties.',
          worksheetCount: 10,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '5.6K',
          rating: 4.7,
          hasVideo: true,
          tags: ['Variables', 'Expressions', 'Like Terms']
        },
        {
          id: 'one-step-equations',
          title: 'One-Step Equations',
          slug: 'one-step-equations',
          description: 'Solve equations using addition, subtraction, multiplication, and division.',
          worksheetCount: 12,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '7.2K',
          rating: 4.8,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Solving Equations', 'Inverse Operations']
        },
        {
          id: 'inequalities',
          title: 'Introduction to Inequalities',
          slug: 'inequalities',
          description: 'Write and graph inequalities. Solve one-step inequalities.',
          worksheetCount: 6,
          difficulty: 'Medium' as const,
          estimatedTime: '15-25 min',
          downloads: '3.9K',
          rating: 4.5,
          hasVideo: true,
          tags: ['Greater Than', 'Less Than', 'Number Line']
        },
        {
          id: 'coordinate-plane',
          title: 'Coordinate Plane',
          slug: 'coordinate-plane',
          description: 'Plot points in all four quadrants. Graph relationships and patterns.',
          worksheetCount: 8,
          difficulty: 'Easy' as const,
          estimatedTime: '15-25 min',
          downloads: '4.3K',
          rating: 4.7,
          hasInteractive: true,
          tags: ['Ordered Pairs', 'Quadrants', 'Graphing']
        },
      ]
    },
    {
      name: 'Geometry',
      slug: 'geometry',
      icon: Shapes,
      color: 'from-rose-600 to-pink-600',
      description: 'Shapes, area, perimeter, and volume',
      topics: [
        {
          id: 'area-perimeter',
          title: 'Area & Perimeter',
          slug: 'area-perimeter',
          description: 'Calculate area and perimeter of rectangles, triangles, parallelograms, and composite shapes.',
          worksheetCount: 12,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '8.1K',
          rating: 4.8,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Rectangle', 'Triangle', 'Parallelogram', 'Composite']
        },
        {
          id: 'volume-surface-area',
          title: 'Volume & Surface Area',
          slug: 'volume-surface-area',
          description: 'Find volume and surface area of rectangular prisms and cubes. Nets of 3D shapes.',
          worksheetCount: 10,
          difficulty: 'Medium' as const,
          estimatedTime: '25-35 min',
          downloads: '5.7K',
          rating: 4.6,
          hasVideo: true,
          tags: ['Prisms', 'Cubes', 'Nets', '3D Shapes']
        },
        {
          id: 'angles',
          title: 'Angles & Angle Relationships',
          slug: 'angles',
          description: 'Measure and classify angles. Complementary, supplementary, and vertical angles.',
          worksheetCount: 8,
          difficulty: 'Easy' as const,
          estimatedTime: '15-25 min',
          downloads: '4.6K',
          rating: 4.7,
          hasInteractive: true,
          tags: ['Acute', 'Obtuse', 'Right', 'Supplementary']
        },
      ]
    },
    {
      name: 'Statistics & Data',
      slug: 'statistics',
      icon: BookOpen,
      color: 'from-teal-600 to-cyan-600',
      description: 'Data analysis and statistical measures',
      topics: [
        {
          id: 'mean-median-mode',
          title: 'Mean, Median, Mode, Range',
          slug: 'mean-median-mode',
          description: 'Calculate and interpret measures of central tendency and spread.',
          worksheetCount: 8,
          difficulty: 'Easy' as const,
          estimatedTime: '15-25 min',
          downloads: '5.3K',
          rating: 4.7,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Average', 'Middle Value', 'Most Common']
        },
        {
          id: 'data-displays',
          title: 'Data Displays & Graphs',
          slug: 'data-displays',
          description: 'Create and interpret dot plots, histograms, and box plots.',
          worksheetCount: 8,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '4.1K',
          rating: 4.5,
          tags: ['Dot Plots', 'Histograms', 'Box Plots']
        },
      ]
    },
  ]
};

// FAQ data for Grade 6
const faqs = [
  {
    question: 'What topics are covered in Grade 6 math worksheets?',
    answer: 'Our Grade 6 math worksheets cover all major topics including: fractions and decimals operations, ratios and proportions, basic algebra (expressions and equations), geometry (area, perimeter, volume), statistics (mean, median, mode), and integers. All aligned with Common Core standards.'
  },
  {
    question: 'Are these worksheets aligned with school curriculum?',
    answer: 'Yes, all Grade 6 worksheets are aligned with Common Core State Standards (CCSS) and cover the typical 6th grade math curriculum. They\'re suitable for classroom use, homework, or independent practice.'
  },
  {
    question: 'What difficulty levels are available?',
    answer: 'Each topic has worksheets in Easy, Medium, and Hard difficulty levels. Easy worksheets focus on basic skill practice, Medium includes more complex problems, and Hard worksheets feature challenging word problems and multi-step exercises.'
  },
  {
    question: 'Can these worksheets help with test preparation?',
    answer: 'Absolutely! Our worksheets are excellent for preparing for standardized tests, chapter tests, and final exams. The variety of problem types and difficulty levels helps build comprehensive understanding and test-taking skills.'
  },
];

export default function Grade6WorksheetsPage() {
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
            <span className="text-gray-600 font-medium">Grade 6</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <span className="text-3xl font-bold">6</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Grade 6 Math Worksheets
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-6">
            {grade6Data.totalWorksheets}+ free printable worksheets covering fractions, decimals, ratios,
            pre-algebra, geometry, and statistics. All with answer keys and step-by-step solutions.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <FileText className="w-5 h-5 mr-2 text-yellow-300" />
              <span className="font-medium">{grade6Data.totalWorksheets} Worksheets</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <Download className="w-5 h-5 mr-2 text-yellow-300" />
              <span className="font-medium">{grade6Data.totalDownloads} Downloads</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <Star className="w-5 h-5 mr-2 text-yellow-300" />
              <span className="font-medium">{grade6Data.averageRating} Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grade Navigation */}
      <div className="bg-white border-b border-gray-100 py-4 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <GradeNavigation currentGrade={6} />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Quick Actions */}
        <QuickActionsBar
          downloadAllHref="/worksheets/grade-6/download-all"
          practiceHref="/worksheets/grade-6/practice"
          tutorialHref="/worksheets/grade-6/tutorials"
        />

        {/* Stats Banner */}
        <StatsBanner
          totalWorksheets={grade6Data.totalWorksheets}
          totalDownloads={grade6Data.totalDownloads}
          averageRating={grade6Data.averageRating}
        />

        {/* Worksheet Categories */}
        {grade6Data.subjects.map((subject) => {
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
                    href={`/worksheets/grade-6/${subject.slug}/${topic.slug}`}
                    className="group bg-white rounded-xl p-5 border-2 border-gray-100 hover:border-blue-500 shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
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
                          <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
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
            "name": "Grade 6 Math Worksheets",
            "description": "85+ free printable Grade 6 math worksheets with answer keys covering fractions, decimals, ratios, pre-algebra, geometry, and statistics.",
            "url": "https://www.thetutorbridge.com/worksheets/grade-6",
            "provider": {
              "@type": "EducationalOrganization",
              "name": "The Tutor Bridge"
            },
            "audience": {
              "@type": "EducationalAudience",
              "educationalRole": "student",
              "audienceType": "Grade 6"
            },
            "about": {
              "@type": "Thing",
              "name": "Grade 6 Mathematics"
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
              <h4 className="font-semibold mb-4">Grade 6 Topics</h4>
              <ul className="space-y-2 text-sm">
                {grade6Data.subjects.slice(0, 5).map((s) => (
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
                {[7, 8, 9, 10].map((g) => (
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
                Our tutors are available 24/7 to help with Grade 6 math.
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
