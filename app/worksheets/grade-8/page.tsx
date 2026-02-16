'use client';

import Link from 'next/link';
import {
  FileText,
  Download,
  CheckCircle,
  Clock,
  BookOpen,
  Calculator,
  ArrowRight,
  Home,
  Star,
  Play,
  ChevronDown,
  Shapes,
  Hash,
  TrendingUp,
  GitBranch,
  Move
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

// Grade 8 Math Topics Data
const grade8Data = {
  grade: 8,
  totalWorksheets: 98,
  totalDownloads: '61.5K',
  averageRating: 4.8,
  subjects: [
    {
      name: 'The Number System',
      slug: 'number-system',
      icon: Hash,
      color: 'from-blue-600 to-indigo-600',
      description: 'Rational and irrational numbers, radicals, and scientific notation',
      topics: [
        {
          id: 'rational-irrational',
          title: 'Rational & Irrational Numbers',
          slug: 'rational-irrational-numbers',
          description: 'Classify numbers as rational or irrational. Approximate irrational numbers and place on number line.',
          worksheetCount: 8,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '5.8K',
          rating: 4.7,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Classification', 'Number Line', 'Approximation']
        },
        {
          id: 'square-cube-roots',
          title: 'Square Roots & Cube Roots',
          slug: 'square-cube-roots',
          description: 'Evaluate square roots and cube roots. Perfect squares, perfect cubes, and estimating roots.',
          worksheetCount: 10,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '7.2K',
          rating: 4.8,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Perfect Squares', 'Perfect Cubes', 'Estimation']
        },
        {
          id: 'scientific-notation',
          title: 'Scientific Notation',
          slug: 'scientific-notation',
          description: 'Convert between standard form and scientific notation. Operations with scientific notation.',
          worksheetCount: 10,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '6.4K',
          rating: 4.7,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Conversion', 'Operations', 'Large Numbers']
        },
        {
          id: 'exponent-properties',
          title: 'Properties of Exponents',
          slug: 'exponent-properties',
          description: 'Apply exponent rules: product, quotient, power, zero, and negative exponents.',
          worksheetCount: 12,
          difficulty: 'Medium' as const,
          estimatedTime: '25-35 min',
          downloads: '8.1K',
          rating: 4.9,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Product Rule', 'Quotient Rule', 'Negative Exponents']
        },
      ]
    },
    {
      name: 'Expressions & Equations',
      slug: 'expressions-equations',
      icon: Calculator,
      color: 'from-purple-600 to-pink-600',
      description: 'Linear equations, systems, and algebraic expressions',
      topics: [
        {
          id: 'linear-equations-one-var',
          title: 'Linear Equations (One Variable)',
          slug: 'linear-equations-one-variable',
          description: 'Solve linear equations with one variable including special cases (no solution, infinitely many solutions).',
          worksheetCount: 14,
          difficulty: 'Medium' as const,
          estimatedTime: '25-35 min',
          downloads: '9.8K',
          rating: 4.9,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Multi-Step', 'Variables Both Sides', 'Special Cases']
        },
        {
          id: 'systems-of-equations',
          title: 'Systems of Linear Equations',
          slug: 'systems-of-equations',
          description: 'Solve systems by graphing, substitution, and elimination. Word problems with systems.',
          worksheetCount: 14,
          difficulty: 'Hard' as const,
          estimatedTime: '30-40 min',
          downloads: '8.5K',
          rating: 4.8,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Graphing', 'Substitution', 'Elimination']
        },
        {
          id: 'slope-intercept',
          title: 'Slope & Slope-Intercept Form',
          slug: 'slope-intercept-form',
          description: 'Calculate slope, write equations in slope-intercept form, and interpret slope and y-intercept.',
          worksheetCount: 12,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '10.2K',
          rating: 4.9,
          hasVideo: true,
          hasInteractive: true,
          tags: ['y = mx + b', 'Rise over Run', 'Graphing']
        },
        {
          id: 'graphing-linear-equations',
          title: 'Graphing Linear Equations',
          slug: 'graphing-linear-equations',
          description: 'Graph linear equations using tables, intercepts, and slope-intercept form. Parallel and perpendicular lines.',
          worksheetCount: 10,
          difficulty: 'Medium' as const,
          estimatedTime: '25-35 min',
          downloads: '7.6K',
          rating: 4.8,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Coordinate Plane', 'Intercepts', 'Parallel']
        },
      ]
    },
    {
      name: 'Functions',
      slug: 'functions',
      icon: GitBranch,
      color: 'from-green-600 to-emerald-600',
      description: 'Understanding and working with functions',
      topics: [
        {
          id: 'intro-functions',
          title: 'Introduction to Functions',
          slug: 'intro-to-functions',
          description: 'Define functions, identify inputs/outputs, determine if relations are functions. Function notation.',
          worksheetCount: 10,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '7.4K',
          rating: 4.8,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Definition', 'Notation', 'Vertical Line Test']
        },
        {
          id: 'comparing-functions',
          title: 'Comparing Functions',
          slug: 'comparing-functions',
          description: 'Compare functions represented in different ways (equations, graphs, tables, verbal descriptions).',
          worksheetCount: 8,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '5.2K',
          rating: 4.6,
          hasVideo: true,
          tags: ['Multiple Representations', 'Rate of Change']
        },
        {
          id: 'linear-functions',
          title: 'Linear Functions',
          slug: 'linear-functions',
          description: 'Model relationships with linear functions. Construct and analyze linear functions from real-world contexts.',
          worksheetCount: 10,
          difficulty: 'Medium' as const,
          estimatedTime: '25-35 min',
          downloads: '6.8K',
          rating: 4.7,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Modeling', 'Real-World', 'Rate of Change']
        },
        {
          id: 'nonlinear-functions',
          title: 'Introduction to Nonlinear Functions',
          slug: 'nonlinear-functions',
          description: 'Recognize and analyze nonlinear functions. Compare linear vs. nonlinear patterns.',
          worksheetCount: 6,
          difficulty: 'Hard' as const,
          estimatedTime: '25-35 min',
          downloads: '3.9K',
          rating: 4.5,
          hasVideo: true,
          tags: ['Quadratic', 'Exponential', 'Patterns']
        },
      ]
    },
    {
      name: 'Geometry',
      slug: 'geometry',
      icon: Shapes,
      color: 'from-orange-600 to-amber-600',
      description: 'Transformations, congruence, similarity, and Pythagorean theorem',
      topics: [
        {
          id: 'transformations',
          title: 'Transformations',
          slug: 'transformations',
          description: 'Perform and describe translations, reflections, rotations, and dilations on the coordinate plane.',
          worksheetCount: 14,
          difficulty: 'Medium' as const,
          estimatedTime: '25-35 min',
          downloads: '8.3K',
          rating: 4.8,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Translation', 'Reflection', 'Rotation', 'Dilation']
        },
        {
          id: 'congruence-similarity',
          title: 'Congruence & Similarity',
          slug: 'congruence-similarity',
          description: 'Understand congruence and similarity through transformations. Prove triangles congruent or similar.',
          worksheetCount: 10,
          difficulty: 'Medium' as const,
          estimatedTime: '25-35 min',
          downloads: '6.5K',
          rating: 4.7,
          hasVideo: true,
          tags: ['Congruent Triangles', 'Similar Figures', 'Scale Factor']
        },
        {
          id: 'pythagorean-theorem',
          title: 'Pythagorean Theorem',
          slug: 'pythagorean-theorem',
          description: 'Apply the Pythagorean theorem to find missing sides. Distance formula and 3D applications.',
          worksheetCount: 14,
          difficulty: 'Medium' as const,
          estimatedTime: '25-35 min',
          downloads: '11.8K',
          rating: 4.9,
          hasVideo: true,
          hasInteractive: true,
          tags: ['a² + b² = c²', 'Right Triangles', 'Distance']
        },
        {
          id: 'angle-relationships',
          title: 'Angle Relationships in Triangles',
          slug: 'angle-relationships-triangles',
          description: 'Interior and exterior angles of triangles. Angle-angle criterion for similarity.',
          worksheetCount: 8,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '5.4K',
          rating: 4.6,
          hasVideo: true,
          tags: ['Interior Angles', 'Exterior Angles', 'AA Similarity']
        },
        {
          id: 'volume',
          title: 'Volume of Cylinders, Cones & Spheres',
          slug: 'volume-3d-shapes',
          description: 'Calculate volume of cylinders, cones, and spheres. Solve real-world volume problems.',
          worksheetCount: 10,
          difficulty: 'Medium' as const,
          estimatedTime: '25-35 min',
          downloads: '7.1K',
          rating: 4.7,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Cylinders', 'Cones', 'Spheres', 'Formulas']
        },
      ]
    },
    {
      name: 'Statistics & Probability',
      slug: 'statistics-probability',
      icon: TrendingUp,
      color: 'from-cyan-600 to-blue-600',
      description: 'Bivariate data, scatter plots, and two-way tables',
      topics: [
        {
          id: 'scatter-plots',
          title: 'Scatter Plots & Associations',
          slug: 'scatter-plots',
          description: 'Create and interpret scatter plots. Describe patterns, clustering, and associations (positive, negative, none).',
          worksheetCount: 10,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '5.8K',
          rating: 4.7,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Correlation', 'Patterns', 'Clustering']
        },
        {
          id: 'line-of-best-fit',
          title: 'Line of Best Fit',
          slug: 'line-of-best-fit',
          description: 'Draw and interpret lines of best fit. Use equations to make predictions.',
          worksheetCount: 8,
          difficulty: 'Medium' as const,
          estimatedTime: '25-35 min',
          downloads: '4.9K',
          rating: 4.6,
          hasVideo: true,
          hasInteractive: true,
          tags: ['Trend Line', 'Prediction', 'Linear Model']
        },
        {
          id: 'two-way-tables',
          title: 'Two-Way Tables',
          slug: 'two-way-tables',
          description: 'Construct and interpret two-way tables. Calculate relative frequencies and identify associations.',
          worksheetCount: 8,
          difficulty: 'Medium' as const,
          estimatedTime: '20-30 min',
          downloads: '4.2K',
          rating: 4.5,
          hasVideo: true,
          tags: ['Frequency', 'Relative Frequency', 'Associations']
        },
      ]
    },
  ]
};

// FAQ data for Grade 8
const faqs = [
  {
    question: 'What are the main topics in Grade 8 math?',
    answer: 'Grade 8 math covers: the real number system (rational/irrational numbers, exponents, scientific notation), expressions and equations (linear equations, systems), functions, geometry (transformations, Pythagorean theorem, volume), and statistics (scatter plots, line of best fit). These topics prepare students for high school algebra.'
  },
  {
    question: 'Is Grade 8 math the same as pre-algebra?',
    answer: 'Grade 8 math includes many pre-algebra concepts but goes beyond traditional pre-algebra. It covers algebra topics like linear equations, systems of equations, and functions that are typically part of Algebra 1. Many students take Grade 8 math before moving directly to Algebra 1 or Geometry.'
  },
  {
    question: 'What should students master before Grade 8?',
    answer: 'Before Grade 8, students should be comfortable with: operations on rational numbers (including negatives), solving two-step equations, proportional relationships, basic geometry concepts (area, perimeter, angles), and graphing on the coordinate plane. Our Grade 7 worksheets cover all these prerequisites.'
  },
  {
    question: 'How do these worksheets prepare for Algebra 1?',
    answer: 'Our Grade 8 worksheets focus heavily on linear equations, graphing, functions, and systems of equations - all foundational topics for Algebra 1. By mastering these concepts, students will be well-prepared for the increased rigor of high school algebra.'
  },
  {
    question: 'What is the Pythagorean theorem and why is it important?',
    answer: 'The Pythagorean theorem (a² + b² = c²) relates the sides of a right triangle. It\'s one of the most important concepts in Grade 8 because it connects algebra and geometry, and is used extensively in high school math, physics, engineering, and real-world applications like construction and navigation.'
  },
];

export default function Grade8WorksheetsPage() {
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
            <span className="text-gray-600 font-medium">Grade 8</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 text-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <span className="text-3xl font-bold">8</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Grade 8 Math Worksheets
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-6">
            {grade8Data.totalWorksheets}+ free printable worksheets covering linear equations, functions,
            Pythagorean theorem, transformations, and statistics. Perfect Algebra 1 preparation with answer keys included.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <FileText className="w-5 h-5 mr-2 text-yellow-300" />
              <span className="font-medium">{grade8Data.totalWorksheets} Worksheets</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <Download className="w-5 h-5 mr-2 text-yellow-300" />
              <span className="font-medium">{grade8Data.totalDownloads} Downloads</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <Star className="w-5 h-5 mr-2 text-yellow-300" />
              <span className="font-medium">{grade8Data.averageRating} Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grade Navigation */}
      <div className="bg-white border-b border-gray-100 py-4 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <GradeNavigation currentGrade={8} />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Quick Actions */}
        <QuickActionsBar
          downloadAllHref="/worksheets/grade-8/download-all"
          practiceHref="/worksheets/grade-8/practice"
          tutorialHref="/worksheets/grade-8/tutorials"
        />

        {/* Stats Banner */}
        <StatsBanner
          totalWorksheets={grade8Data.totalWorksheets}
          totalDownloads={grade8Data.totalDownloads}
          averageRating={grade8Data.averageRating}
        />

        {/* Algebra 1 Readiness Banner */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6 mb-8">
          <div className="flex items-start">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
              <Calculator className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-purple-800 mb-2">Preparing for Algebra 1?</h3>
              <p className="text-purple-700 text-sm mb-3">
                Grade 8 is the bridge to high school math. Our worksheets focus on linear equations, functions,
                and graphing - the core skills needed for Algebra 1 success.
              </p>
              <Link
                href="/worksheets/grade-8/expressions-equations"
                className="text-purple-600 font-semibold text-sm hover:text-purple-800 flex items-center"
              >
                Start with Expressions & Equations
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Worksheet Categories */}
        {grade8Data.subjects.map((subject) => {
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
                    href={`/worksheets/grade-8/${subject.slug}/${topic.slug}`}
                    className="group bg-white rounded-xl p-5 border-2 border-gray-100 hover:border-purple-500 shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
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
                          <span key={tag} className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded">
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
            "name": "Grade 8 Math Worksheets",
            "description": "98+ free printable Grade 8 math worksheets with answer keys covering linear equations, functions, Pythagorean theorem, transformations, and statistics.",
            "url": "https://www.thetutorbridge.com/worksheets/grade-8",
            "provider": {
              "@type": "EducationalOrganization",
              "name": "The Tutor Bridge"
            },
            "audience": {
              "@type": "EducationalAudience",
              "educationalRole": "student",
              "audienceType": "Grade 8"
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
              <h4 className="font-semibold mb-4">Grade 8 Topics</h4>
              <ul className="space-y-2 text-sm">
                {grade8Data.subjects.map((s) => (
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
                {[6, 7, 9, 10].map((g) => (
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
                <li><Link href="/calculators/quadratic-formula-calculator" className="text-gray-300 hover:text-white">Quadratic Calculator</Link></li>
                <li><Link href="/study-resources" className="text-gray-300 hover:text-white">Study Resources</Link></li>
                <li><Link href="/tutoring" className="text-gray-300 hover:text-white">Online Tutoring</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Need Help?</h4>
              <p className="text-gray-300 text-sm mb-4">
                Our tutors are available 24/7 to help with Grade 8 math and Algebra 1 prep.
              </p>
              <Link
                href="/tutoring/free-consultation"
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
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
