import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Calculator, BookOpen, Gamepad2, Printer, Target, Award } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Times Tables Practice - Free Interactive Multiplication Charts & Games',
  description: 'Master all multiplication times tables from 2-12 with our free interactive practice tools. Includes printable charts, tips & tricks, and fun quizzes for kids learning math!',
  keywords: [
    'times tables',
    'multiplication tables',
    'times table practice',
    'learn times tables',
    'multiplication chart',
    'times table games',
    'free times tables',
    'printable times tables',
    'multiplication practice',
    '2-12 times tables',
    'times table quiz',
    'multiplication facts'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/times-tables',
  },
  openGraph: {
    title: 'Times Tables Practice - Free Interactive Multiplication Tools',
    description: 'Master all multiplication times tables with interactive practice, printable charts, and fun games!',
    url: 'https://www.thetutorbridge.com/times-tables',
    type: 'website',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": "Times Tables Practice Hub",
  "description": "Complete collection of interactive times tables practice tools covering multiplication from 2-12",
  "educationalLevel": "Elementary School",
  "educationalUse": "practice",
  "learningResourceType": "interactive tool",
  "isAccessibleForFree": true,
  "inLanguage": "en",
  "teaches": "Multiplication tables, times tables facts from 2-12",
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student"
  }
};

const timesTables = [
  { number: 2, color: 'from-red-500 to-pink-500', description: 'Easiest! Learn doubling' },
  { number: 3, color: 'from-orange-500 to-amber-500', description: 'Count by threes' },
  { number: 4, color: 'from-yellow-500 to-orange-500', description: 'Double the doubles' },
  { number: 5, color: 'from-green-500 to-emerald-500', description: 'Always ends in 0 or 5' },
  { number: 6, color: 'from-teal-500 to-cyan-500', description: 'Double the 3s' },
  { number: 7, color: 'from-blue-500 to-indigo-500', description: 'Most challenging!' },
  { number: 8, color: 'from-purple-500 to-violet-500', description: 'Double the 4s' },
  { number: 9, color: 'from-pink-500 to-rose-500', description: 'Amazing finger trick' },
  { number: 10, color: 'from-emerald-500 to-teal-500', description: 'Just add a zero!' },
  { number: 11, color: 'from-cyan-500 to-blue-500', description: 'Repeating digits' },
  { number: 12, color: 'from-indigo-500 to-purple-500', description: 'Think in dozens' },
];

export default function TimesTablesHub() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm py-3 px-4 sm:px-6 shadow-sm">
        <div className="container mx-auto max-w-7xl">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 font-medium">Times Tables</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="w-16 h-16 text-blue-600 mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
                Times Tables Practice
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-blue-600 font-semibold mb-4">
              Master Multiplication Tables 2-12
            </p>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto">
              Learn all your times tables with free interactive practice tools, printable charts, tips & tricks, and fun quizzes. Perfect for elementary students mastering multiplication!
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <BookOpen className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">11 Tables</h3>
              <p className="text-gray-600">Complete coverage from 2-12</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <Target className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Interactive</h3>
              <p className="text-gray-600">Practice with instant feedback</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <Award className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">100% Free</h3>
              <p className="text-gray-600">No signup required</p>
            </div>
          </div>

          {/* Times Tables Grid */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Choose Your Times Table
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {timesTables.map((table) => (
                <Link
                  key={table.number}
                  href={`/times-tables/${table.number}-times-table`}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
                >
                  <div className={`bg-gradient-to-br ${table.color} p-8 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-6xl font-bold">{table.number}×</span>
                      <Calculator className="w-10 h-10 opacity-80" />
                    </div>
                    <p className="text-white/90 text-lg font-medium">
                      {table.description}
                    </p>
                    <div className="mt-4 flex items-center text-white/90">
                      <span className="text-sm font-semibold">Start Learning →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Speed Test CTA */}
            <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border-2 border-purple-300">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                    <Gamepad2 className="w-7 h-7 text-purple-600 mr-2" />
                    Ready for a Challenge?
                  </h3>
                  <p className="text-gray-700">Test your speed across all times tables!</p>
                </div>
                <Link
                  href="/brain-games/times-table-speed-test"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg"
                >
                  Play Speed Test Game
                </Link>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                What Are Times Tables?
              </h2>

              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                  Times tables are the foundation of multiplication. They show the results of multiplying a number by integers from 1 to 12. Learning your times tables is essential for success in mathematics, as they're used constantly in everyday calculations, advanced math, science, and real-world problem solving.
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Why Learn Times Tables?
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h4 className="font-bold text-gray-800 mb-3 text-lg">Academic Benefits</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>✓ Essential for division and fractions</li>
                      <li>✓ Required for algebra and advanced math</li>
                      <li>✓ Improves mental math speed</li>
                      <li>✓ Builds number sense and confidence</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 rounded-xl p-6">
                    <h4 className="font-bold text-gray-800 mb-3 text-lg">Real-World Uses</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>✓ Shopping and calculating costs</li>
                      <li>✓ Cooking and recipe measurements</li>
                      <li>✓ Time management calculations</li>
                      <li>✓ DIY projects and building</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  How to Master Times Tables
                </h3>
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 mb-6">
                  <ol className="list-decimal pl-6 text-gray-700 space-y-3">
                    <li>
                      <strong>Start with the easiest:</strong> Begin with 2, 10, and 5 times tables - they have clear patterns
                    </li>
                    <li>
                      <strong>Practice daily:</strong> Just 5-10 minutes per day with our interactive tools
                    </li>
                    <li>
                      <strong>Learn the tricks:</strong> Each times table has special patterns and shortcuts
                    </li>
                    <li>
                      <strong>Use in real life:</strong> Apply multiplication to everyday situations
                    </li>
                    <li>
                      <strong>Test yourself:</strong> Regular quizzes help reinforce memorization
                    </li>
                    <li>
                      <strong>Stay patient:</strong> Everyone learns at their own pace - celebrate progress!
                    </li>
                  </ol>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Recommended Learning Order
                </h3>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                  <div className="space-y-3 text-gray-700">
                    <p><strong className="text-green-600">Easy (Start here!):</strong> 2, 10, 5</p>
                    <p><strong className="text-yellow-600">Medium:</strong> 3, 4, 6, 9</p>
                    <p><strong className="text-orange-600">Challenging:</strong> 7, 8, 11, 12</p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Tips for Parents & Teachers
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Make practice fun and stress-free with games and challenges</li>
                  <li>Use visual aids like our printable charts and real objects</li>
                  <li>Celebrate small victories and track progress together</li>
                  <li>Connect multiplication to real-world situations kids understand</li>
                  <li>Practice in short, regular sessions rather than long cramming</li>
                  <li>Use songs, rhymes, and memory tricks for difficult facts</li>
                  <li>Encourage speed but prioritize accuracy first</li>
                </ul>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                What's Included
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <BookOpen className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Complete Charts</h3>
                    <p className="text-gray-600">Full multiplication charts from 1-12 for each times table</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Target className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Interactive Practice</h3>
                    <p className="text-gray-600">Real-time quizzes with instant feedback and scoring</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Printer className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Printable Charts</h3>
                    <p className="text-gray-600">Download and print any times table for offline study</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Gamepad2 className="w-8 h-8 text-pink-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Speed Test Game</h3>
                    <p className="text-gray-600">Timed challenges to test mastery across all tables</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
