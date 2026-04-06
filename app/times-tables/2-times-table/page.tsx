import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Calculator, ArrowRight, BookOpen, Gamepad2 } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { TimesTablePractice } from '@/components/times-table-practice';

export const metadata: Metadata = {
  title: '2 Times Table - Learn Multiplication by 2 | Free Practice & Chart',
  description: 'Master the 2 times table with our free interactive practice tool. Learn multiplication by 2 with tips, tricks, printable charts, and fun quizzes. Perfect for kids learning math!',
  keywords: [
    '2 times table',
    '2 multiplication table',
    'times table 2',
    'multiply by 2',
    '2x table',
    'learn 2 times table',
    '2 times table chart',
    '2 times table practice',
    'multiplication by 2',
    '2 times table worksheet',
    'two times table',
    'table of 2'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/times-tables/2-times-table',
  },
  openGraph: {
    title: '2 Times Table - Free Practice & Chart',
    description: 'Learn the 2 times table with interactive practice, tips & tricks, and printable charts!',
    url: 'https://www.thetutorbridge.com/times-tables/2-times-table',
    type: 'website',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": "2 Times Table Practice",
  "description": "Interactive learning tool for mastering the 2 times table with practice quizzes and printable charts",
  "educationalLevel": "Elementary School",
  "educationalUse": "practice",
  "learningResourceType": "interactive tool",
  "isAccessibleForFree": true,
  "inLanguage": "en",
  "teaches": "Multiplication by 2, 2 times table facts",
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student"
  }
};

export default function TwoTimesTable() {
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
            <Link href="/times-tables" className="text-blue-600 hover:text-blue-800">
              Times Tables
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 font-medium">2 Times Table</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="w-12 h-12 text-blue-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                2 Times Table
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-blue-600 font-semibold mb-4">
              Learn Multiplication by 2
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Master the 2 times table with our interactive practice tool. Learn tips, tricks, and
              patterns to quickly multiply any number by 2!
            </p>
          </div>

          {/* Interactive Practice Component */}
          <TimesTablePractice table={2} />

          {/* Educational Content for SEO */}
          <div className="mt-16 max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                What is the 2 Times Table?
              </h2>

              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  The 2 times table is one of the easiest and most important multiplication tables to learn.
                  It's simply doubling numbers! When you multiply any number by 2, you're adding that number
                  to itself. For example: 2 × 5 means 5 + 5 = 10.
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Complete 2 Times Table Chart (1-12)
                </h3>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 mb-6">
                  <ul className="space-y-2 text-lg">
                    <li className="font-semibold">2 × 1 = 2</li>
                    <li className="font-semibold">2 × 2 = 4</li>
                    <li className="font-semibold">2 × 3 = 6</li>
                    <li className="font-semibold">2 × 4 = 8</li>
                    <li className="font-semibold">2 × 5 = 10</li>
                    <li className="font-semibold">2 × 6 = 12</li>
                    <li className="font-semibold">2 × 7 = 14</li>
                    <li className="font-semibold">2 × 8 = 16</li>
                    <li className="font-semibold">2 × 9 = 18</li>
                    <li className="font-semibold">2 × 10 = 20</li>
                    <li className="font-semibold">2 × 11 = 22</li>
                    <li className="font-semibold">2 × 12 = 24</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Easy Tricks for the 2 Times Table
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-6">
                  <li>
                    <strong>Doubling:</strong> Just add the number to itself! 2 × 7 = 7 + 7 = 14
                  </li>
                  <li>
                    <strong>Even Numbers:</strong> All answers in the 2 times table are even numbers (end in 0, 2, 4, 6, or 8)
                  </li>
                  <li>
                    <strong>Skip Counting:</strong> Count by 2s: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20...
                  </li>
                  <li>
                    <strong>Pairs:</strong> Think of pairs of things - 2 shoes, 2 gloves, 2 eyes
                  </li>
                  <li>
                    <strong>Pattern:</strong> The answers increase by 2 each time (2, 4, 6, 8...)
                  </li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Why Learn the 2 Times Table?
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Foundation for learning other multiplication tables</li>
                  <li>Essential for understanding even and odd numbers</li>
                  <li>Used in everyday life (pairs, doubles, half calculations)</li>
                  <li>Helps with mental math and quick calculations</li>
                  <li>Required for division and fractions</li>
                  <li>Builds confidence in mathematics</li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Real-World Examples
                </h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                  <ul className="text-gray-700 space-y-2">
                    <li>🧦 If you have 5 pairs of socks, you have 2 × 5 = 10 socks</li>
                    <li>👟 6 pairs of shoes = 2 × 6 = 12 individual shoes</li>
                    <li>🎮 If a game costs $2, then 8 games cost 2 × 8 = $16</li>
                    <li>🍕 If each pizza has 2 slices, 7 pizzas have 2 × 7 = 14 slices</li>
                    <li>📚 Reading 2 pages per day for 12 days = 2 × 12 = 24 pages</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Practice Tips for Parents & Teachers
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Start with physical objects - count pairs of items</li>
                  <li>Practice skip counting by 2s during daily activities</li>
                  <li>Use our interactive quiz tool daily for 5-10 minutes</li>
                  <li>Make it fun with games and real-life examples</li>
                  <li>Celebrate progress and mastery of each multiplication fact</li>
                  <li>Once mastered, move to the 3 times table</li>
                </ul>
              </div>
            </div>

            {/* Related Times Tables */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <ArrowRight className="w-6 h-6 text-blue-600 mr-2" />
                Practice Other Times Tables
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((table) => (
                  <Link
                    key={table}
                    href={`/times-tables/${table}-times-table`}
                    className="bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 rounded-xl p-4 text-center transition-all border-2 border-transparent hover:border-blue-300"
                  >
                    <p className="text-2xl font-bold text-gray-800">{table}×</p>
                    <p className="text-sm text-gray-600">Times Table</p>
                  </Link>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href="/brain-games/times-table-speed-test"
                  className="block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl transition-all text-center"
                >
                  <Gamepad2 className="w-5 h-5 inline mr-2" />
                  Try Our Times Tables Speed Test Game!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
