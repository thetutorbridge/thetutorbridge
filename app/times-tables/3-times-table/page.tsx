import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Calculator, ArrowRight, BookOpen, Gamepad2 } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { TimesTablePractice } from '@/components/times-table-practice';

export const metadata: Metadata = {
  title: '3 Times Table - Learn Multiplication by 3 | Free Practice & Chart',
  description: 'Master the 3 times table with our free interactive practice tool. Learn multiplication by 3 with tips, tricks, printable charts, and fun quizzes. Perfect for elementary students!',
  keywords: [
    '3 times table',
    '3 multiplication table',
    'times table 3',
    'multiply by 3',
    '3x table',
    'learn 3 times table',
    '3 times table chart',
    '3 times table practice',
    'multiplication by 3',
    '3 times table worksheet',
    'three times table',
    'table of 3'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/times-tables/3-times-table',
  },
  openGraph: {
    title: '3 Times Table - Free Practice & Chart',
    description: 'Learn the 3 times table with interactive practice, tips & tricks, and printable charts!',
    url: 'https://www.thetutorbridge.com/times-tables/3-times-table',
    type: 'website',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": "3 Times Table Practice",
  "description": "Interactive learning tool for mastering the 3 times table with practice quizzes and printable charts",
  "educationalLevel": "Elementary School",
  "educationalUse": "practice",
  "learningResourceType": "interactive tool",
  "isAccessibleForFree": true,
  "inLanguage": "en",
  "teaches": "Multiplication by 3, 3 times table facts",
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student"
  }
};

export default function ThreeTimesTable() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
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
            <span className="text-gray-600 font-medium">3 Times Table</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="w-12 h-12 text-purple-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                3 Times Table
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-purple-600 font-semibold mb-4">
              Learn Multiplication by 3
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Master the 3 times table with our interactive practice tool. Discover patterns, learn skip
              counting by 3s, and become a multiplication expert!
            </p>
          </div>

          {/* Interactive Practice Component */}
          <TimesTablePractice table={3} />

          {/* Educational Content for SEO */}
          <div className="mt-16 max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                What is the 3 Times Table?
              </h2>

              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  The 3 times table shows the result of multiplying numbers by 3. It's like adding the same
                  number three times! For example: 3 × 4 means 4 + 4 + 4 = 12. Learning the 3 times table
                  is essential for building strong multiplication skills.
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Complete 3 Times Table Chart (1-12)
                </h3>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
                  <ul className="space-y-2 text-lg">
                    <li className="font-semibold">3 × 1 = 3</li>
                    <li className="font-semibold">3 × 2 = 6</li>
                    <li className="font-semibold">3 × 3 = 9</li>
                    <li className="font-semibold">3 × 4 = 12</li>
                    <li className="font-semibold">3 × 5 = 15</li>
                    <li className="font-semibold">3 × 6 = 18</li>
                    <li className="font-semibold">3 × 7 = 21</li>
                    <li className="font-semibold">3 × 8 = 24</li>
                    <li className="font-semibold">3 × 9 = 27</li>
                    <li className="font-semibold">3 × 10 = 30</li>
                    <li className="font-semibold">3 × 11 = 33</li>
                    <li className="font-semibold">3 × 12 = 36</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Easy Tricks for the 3 Times Table
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-6">
                  <li>
                    <strong>Triple It:</strong> Add the number three times! 3 × 5 = 5 + 5 + 5 = 15
                  </li>
                  <li>
                    <strong>Skip Counting:</strong> Count by 3s: 3, 6, 9, 12, 15, 18, 21, 24, 27, 30...
                  </li>
                  <li>
                    <strong>Digit Sum Pattern:</strong> The sum of digits in the answers follows a pattern (3→3, 6→6, 9→9, 12→3, 15→6...)
                  </li>
                  <li>
                    <strong>Even-Odd Pattern:</strong> Answers alternate: odd (3), even (6), odd (9), even (12)...
                  </li>
                  <li>
                    <strong>Use Your Fingers:</strong> Count groups of three on your fingers for smaller numbers
                  </li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Special Patterns in the 3 Times Table
                </h3>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                  <ul className="text-gray-700 space-y-2">
                    <li>✨ <strong>Divisibility Rule:</strong> All multiples of 3 have digits that add up to a multiple of 3</li>
                    <li>✨ <strong>Example:</strong> 3 × 8 = 24, and 2 + 4 = 6 (which is divisible by 3)</li>
                    <li>✨ <strong>Another:</strong> 3 × 12 = 36, and 3 + 6 = 9 (which is divisible by 3)</li>
                    <li>✨ This pattern works for ALL multiples of 3!</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Why Learn the 3 Times Table?
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Essential foundation for learning harder multiplication tables</li>
                  <li>Used frequently in division and fractions</li>
                  <li>Helps understand patterns and number relationships</li>
                  <li>Common in real-world situations (groups of three)</li>
                  <li>Improves mental math abilities</li>
                  <li>Prepares students for advanced mathematics</li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Real-World Examples
                </h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                  <ul className="text-gray-700 space-y-2">
                    <li>🎭 If each team has 3 players, 5 teams have 3 × 5 = 15 players</li>
                    <li>🍕 If each pizza has 3 slices, 8 pizzas have 3 × 8 = 24 slices</li>
                    <li>📦 Eggs come in dozens, but if you buy 3-packs: 4 packs = 3 × 4 = 12 eggs</li>
                    <li>🚗 If a tricycle has 3 wheels, 6 tricycles have 3 × 6 = 18 wheels</li>
                    <li>⚽ In 3 soccer matches with 2 goals each = 3 × 2 = 6 total goals</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Practice Tips for Parents & Teachers
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Use physical objects in groups of three to visualize</li>
                  <li>Practice skip counting by 3s during car rides or walks</li>
                  <li>Make it musical - sing the 3 times table to a tune</li>
                  <li>Use our interactive practice tool for 5-10 minutes daily</li>
                  <li>Look for groups of 3 in everyday life (triangle sides, tricycle wheels)</li>
                  <li>Once mastered, connect it to the 6 times table (double of 3)</li>
                </ul>

                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 mt-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">
                    💡 Quick Mastery Tip
                  </h4>
                  <p className="text-gray-700">
                    The 3 times table is the foundation for understanding the 6, 9, and 12 times tables!
                    Master this one, and you're well on your way to multiplication mastery. Remember:
                    6 is double 3, 9 is triple 3, and 12 is quadruple 3!
                  </p>
                </div>
              </div>
            </div>

            {/* Related Times Tables */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <ArrowRight className="w-6 h-6 text-purple-600 mr-2" />
                Practice Other Times Tables
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[2, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((table) => (
                  <Link
                    key={table}
                    href={`/times-tables/${table}-times-table`}
                    className="bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-xl p-4 text-center transition-all border-2 border-transparent hover:border-purple-300"
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
