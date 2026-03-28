'use client';

import Link from 'next/link';
import { Home, BookOpen, Calculator, Shapes, TrendingUp, BarChart3, Atom, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { getAllFormulas, getFormulasByCategory } from '@/lib/formulas-data';

export default function FormulasMainPage() {
  const allFormulas = getAllFormulas();

  // Get formulas by category
  const algebraFormulas = getFormulasByCategory('algebra').slice(0, 24);
  const geometryFormulas = getFormulasByCategory('geometry').slice(0, 24);
  const trigFormulas = getFormulasByCategory('trigonometry').slice(0, 20);
  const calculusFormulas = getFormulasByCategory('calculus').slice(0, 20);
  const statsFormulas = getFormulasByCategory('statistics').slice(0, 16);
  const physicsFormulas = getFormulasByCategory('physics').slice(0, 16);
  const chemFormulas = getFormulasByCategory('chemistry').slice(0, 16);

  const categories = [
    {
      name: 'Algebra',
      icon: Calculator,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      count: getFormulasByCategory('algebra').length,
      formulas: algebraFormulas,
    },
    {
      name: 'Geometry',
      icon: Shapes,
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      count: getFormulasByCategory('geometry').length,
      formulas: geometryFormulas,
    },
    {
      name: 'Trigonometry',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      count: getFormulasByCategory('trigonometry').length,
      formulas: trigFormulas,
    },
    {
      name: 'Calculus',
      icon: BookOpen,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      count: getFormulasByCategory('calculus').length,
      formulas: calculusFormulas,
    },
    {
      name: 'Statistics',
      icon: BarChart3,
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      textColor: 'text-indigo-700',
      count: getFormulasByCategory('statistics').length,
      formulas: statsFormulas,
    },
    {
      name: 'Physics',
      icon: Atom,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700',
      count: getFormulasByCategory('physics').length,
      formulas: physicsFormulas,
    },
    {
      name: 'Chemistry',
      icon: Atom,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      textColor: 'text-pink-700',
      count: getFormulasByCategory('chemistry').length,
      formulas: chemFormulas,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Math Formulas Database - 500+ Formulas',
            description: 'Comprehensive database of mathematical formulas covering algebra, geometry, trigonometry, calculus, statistics, physics, and chemistry.',
            url: 'https://www.thetutorbridge.com/formulas',
            publisher: {
              '@type': 'Organization',
              name: 'The Tutor Bridge',
            },
          }),
        }}
      />
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 px-6">
        <div className="container mx-auto max-w-7xl">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Math Formulas</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="w-16 h-16 mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold">Math Formulas Database</h1>
            </div>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto mb-8">
              Complete reference for 500+ mathematical formulas with step-by-step examples and real-world applications
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <p className="text-3xl font-bold text-[#FFC857]">{allFormulas.length}+</p>
                <p className="text-sm text-blue-100">Formulas</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <p className="text-3xl font-bold text-[#FFC857]">7 Categories</p>
                <p className="text-sm text-blue-100">Math & Science</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <p className="text-3xl font-bold text-[#FFC857]">100% Free</p>
                <p className="text-sm text-blue-100">With Examples</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {categories.map((category, idx) => (
            <div key={idx} className="mb-16">
              <div className="flex items-center mb-6">
                <category.icon className={`w-8 h-8 mr-3 ${category.textColor}`} />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {category.name} Formulas
                </h2>
                <span className={`ml-4 px-4 py-1 rounded-full text-sm font-semibold ${category.bgColor} ${category.textColor}`}>
                  {category.count} formulas
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.formulas.map((formula) => (
                  <Link
                    key={formula.slug}
                    href={`/formulas/${formula.slug}`}
                    className={`block ${category.bgColor} rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-200 border-2 ${category.borderColor} hover:border-opacity-100`}
                  >
                    <div className="mb-3">
                      <h3 className={`text-lg font-bold ${category.textColor} mb-1`}>
                        {formula.name}
                      </h3>
                      <div className={`inline-block px-2 py-1 rounded text-xs font-semibold ${category.bgColor} border ${category.borderColor}`}>
                        {formula.difficulty}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 mb-3 border-2 border-gray-200">
                      <p className="font-mono text-base text-gray-900 text-center">
                        {formula.formula}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {formula.description}
                    </p>
                    <div className={`flex items-center ${category.textColor} font-semibold text-sm`}>
                      <span>View Formula</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Educational Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Use Our Formula Database?
            </h2>

            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Comprehensive Coverage
                </h3>
                <p className="leading-relaxed">
                  Access 500+ carefully curated formulas across all major branches of mathematics and science. Each formula is verified and includes complete explanations, making it your one-stop reference for academic success.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl">
                  <h4 className="font-bold text-blue-700 mb-2">Step-by-Step Examples</h4>
                  <p className="text-sm">
                    Every formula includes worked examples showing exactly how to apply it, helping you understand not just what the formula is, but how to use it effectively.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-teal-50 p-5 rounded-xl">
                  <h4 className="font-bold text-green-700 mb-2">Practice Problems</h4>
                  <p className="text-sm">
                    Test your understanding with practice problems for each formula. Perfect for homework, test preparation, and mastering mathematical concepts.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl">
                  <h4 className="font-bold text-purple-700 mb-2">Real-World Applications</h4>
                  <p className="text-sm">
                    Learn where each formula is used in real life - from engineering and physics to economics and computer science.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-5 rounded-xl">
                  <h4 className="font-bold text-orange-700 mb-2">Common Mistakes Explained</h4>
                  <p className="text-sm">
                    Avoid typical errors with our guide to common mistakes students make with each formula, helping you learn faster and more effectively.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-2xl shadow-xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help Understanding a Formula?</h2>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Get personalized 1-on-1 tutoring with expert math and science tutors. Master any formula, solve complex problems, and ace your exams!
            </p>
            <Link
              href="/"
              className="inline-flex items-center bg-white text-[#1A3D7C] px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg"
            >
              Find Your Tutor
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
