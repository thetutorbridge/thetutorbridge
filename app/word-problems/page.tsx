'use client';

import Link from 'next/link';
import { Home, BookOpen, Calculator, Clock, DollarSign, Percent, Shapes, Hash, ArrowRight, CheckCircle } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { getAllWordProblems, getWordProblemsByCategory } from '@/lib/word-problems-data';

export default function WordProblemsMainPage() {
  const allProblems = getAllWordProblems();

  // Get problems by category
  const ageProblems = getWordProblemsByCategory('age-problems').slice(0, 12);
  const distanceProblems = getWordProblemsByCategory('distance-speed-time').slice(0, 12);
  const moneyProblems = getWordProblemsByCategory('money-problems').slice(0, 12);
  const percentageProblems = getWordProblemsByCategory('percentage-problems').slice(0, 12);
  const numberProblems = getWordProblemsByCategory('number-problems').slice(0, 12);
  const geometryProblems = getWordProblemsByCategory('geometry-word-problems').slice(0, 12);

  const categories = [
    {
      name: 'Age Problems',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      count: getWordProblemsByCategory('age-problems').length,
      problems: ageProblems,
      description: 'Find ages, age differences, and future/past ages with clear step-by-step solutions',
    },
    {
      name: 'Distance, Speed & Time',
      icon: Clock,
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      count: getWordProblemsByCategory('distance-speed-time').length,
      problems: distanceProblems,
      description: 'Master distance = speed × time problems with cars, trains, and more',
    },
    {
      name: 'Money & Shopping',
      icon: DollarSign,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      count: getWordProblemsByCategory('money-problems').length,
      problems: moneyProblems,
      description: 'Calculate costs, change, and savings in real shopping scenarios',
    },
    {
      name: 'Percentage Problems',
      icon: Percent,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      count: getWordProblemsByCategory('percentage-problems').length,
      problems: percentageProblems,
      description: 'Solve discounts, sales tax, tips, and percentage increase/decrease problems',
    },
    {
      name: 'Number Problems',
      icon: Hash,
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      textColor: 'text-indigo-700',
      count: getWordProblemsByCategory('number-problems').length,
      problems: numberProblems,
      description: 'Basic addition, subtraction, multiplication, and division word problems',
    },
    {
      name: 'Geometry Word Problems',
      icon: Shapes,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      textColor: 'text-pink-700',
      count: getWordProblemsByCategory('geometry-word-problems').length,
      problems: geometryProblems,
      description: 'Find area, perimeter, and volume in real-world geometry scenarios',
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
            name: 'Word Problems Solver - 2000+ Problems with Solutions',
            description: 'Comprehensive collection of word problems with step-by-step solutions covering all major topics in math.',
            url: 'https://www.thetutorbridge.com/word-problems',
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
            <span className="text-gray-600">Word Problems</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Calculator className="w-16 h-16 mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold">Word Problems Solver</h1>
            </div>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto mb-8">
              Master word problems with 2,000+ step-by-step solutions covering all topics from Grade 1 to Grade 12
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <p className="text-3xl font-bold text-[#FFC857]">{allProblems.length}+</p>
                <p className="text-sm text-blue-100">Problems Solved</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <p className="text-3xl font-bold text-[#FFC857]">6 Categories</p>
                <p className="text-sm text-blue-100">All Major Topics</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <p className="text-3xl font-bold text-[#FFC857]">100% Free</p>
                <p className="text-sm text-blue-100">Step-by-Step Solutions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {categories.map((category, idx) => (
            <div key={idx} className="mb-16">
              <div className="flex items-center mb-4">
                <category.icon className={`w-8 h-8 mr-3 ${category.textColor}`} />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {category.name}
                </h2>
                <span className={`ml-4 px-4 py-1 rounded-full text-sm font-semibold ${category.bgColor} ${category.textColor}`}>
                  {category.count} problems
                </span>
              </div>
              <p className="text-gray-600 mb-6 text-lg">
                {category.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.problems.map((problem) => (
                  <Link
                    key={problem.slug}
                    href={`/word-problems/${problem.slug}`}
                    className={`block ${category.bgColor} rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-200 border-2 ${category.borderColor} hover:border-opacity-100`}
                  >
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${category.bgColor} border ${category.borderColor} capitalize`}>
                          {problem.difficulty}
                        </span>
                        <span className="text-xs text-gray-600">{problem.gradeLevel}</span>
                      </div>
                      <h3 className={`text-base font-bold ${category.textColor} mb-2`}>
                        {problem.title}
                      </h3>
                    </div>
                    <div className="bg-white rounded-lg p-4 mb-3 border-2 border-gray-200">
                      <p className="text-sm text-gray-700 line-clamp-3">
                        {problem.problem}
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 mb-3 border-2 border-green-200">
                      <p className="text-sm font-semibold text-green-700">
                        Answer: {problem.answerFormatted}
                      </p>
                    </div>
                    <div className={`flex items-center ${category.textColor} font-semibold text-sm`}>
                      <span>View Solution</span>
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
              Why Practice Word Problems?
            </h2>

            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Build Critical Thinking Skills
                </h3>
                <p className="leading-relaxed">
                  Word problems teach you to translate real-world situations into mathematical equations. This skill is essential for success in school, standardized tests, and everyday life.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl">
                  <CheckCircle className="w-8 h-8 text-blue-600 mb-3" />
                  <h4 className="font-bold text-blue-700 mb-2">Step-by-Step Solutions</h4>
                  <p className="text-sm">
                    Every problem includes detailed steps showing exactly how to solve it, helping you understand the process, not just the answer.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-teal-50 p-5 rounded-xl">
                  <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
                  <h4 className="font-bold text-green-700 mb-2">Real-World Applications</h4>
                  <p className="text-sm">
                    Learn how math applies to shopping, travel, savings, and everyday decisions - making learning practical and meaningful.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl">
                  <CheckCircle className="w-8 h-8 text-purple-600 mb-3" />
                  <h4 className="font-bold text-purple-700 mb-2">All Difficulty Levels</h4>
                  <p className="text-sm">
                    From easy problems for beginners to challenging questions for advanced students - progress at your own pace.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-5 rounded-xl">
                  <CheckCircle className="w-8 h-8 text-orange-600 mb-3" />
                  <h4 className="font-bold text-orange-700 mb-2">Tips & Common Mistakes</h4>
                  <p className="text-sm">
                    Learn from common errors and get expert tips to avoid mistakes - accelerating your learning and building confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-2xl shadow-xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Struggling with Word Problems?</h2>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Get personalized 1-on-1 tutoring with expert math tutors. Master word problems, build confidence, and excel in math!
            </p>
            <Link
              href="/"
              className="inline-flex items-center bg-white text-[#1A3D7C] px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg"
            >
              Find Your Math Tutor
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
