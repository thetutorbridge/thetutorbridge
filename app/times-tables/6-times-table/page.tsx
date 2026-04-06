import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Calculator, ArrowRight, BookOpen, Gamepad2 } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { TimesTablePractice } from '@/components/times-table-practice';

export const metadata: Metadata = {
  title: '6 Times Table - Learn Multiplication by 6 | Free Practice & Chart',
  description: 'Master the 6 times table with our free interactive tool. Learn the double-3 trick - just double your 3 times table answers! Printable charts and fun quizzes for kids.',
  keywords: [
    '6 times table',
    '6 multiplication table',
    'times table 6',
    'multiply by 6',
    '6x table',
    'learn 6 times table',
    '6 times table chart',
    '6 times table practice',
    'multiplication by 6',
    '6 times table worksheet',
    'six times table',
    'table of 6',
    '6x games'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/times-tables/6-times-table',
  },
  openGraph: {
    title: '6 Times Table - Free Practice & Chart',
    description: 'Learn the 6 times table by doubling the 3s! Interactive practice and printable charts.',
    url: 'https://www.thetutorbridge.com/times-tables/6-times-table',
    type: 'website',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": "6 Times Table Practice",
  "description": "Interactive learning tool for mastering the 6 times table with practice quizzes and printable charts",
  "educationalLevel": "Elementary School",
  "educationalUse": "practice",
  "learningResourceType": "interactive tool",
  "isAccessibleForFree": true,
  "inLanguage": "en",
  "teaches": "Multiplication by 6, 6 times table facts",
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student"
  }
};

export default function SixTimesTable() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
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
            <span className="text-gray-600 font-medium">6 Times Table</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="w-12 h-12 text-indigo-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                6 Times Table
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-indigo-600 font-semibold mb-4">
              Learn Multiplication by 6
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Master the 6 times table easily! If you know the 3 times table, just double those answers.
              6 is simply 3 × 2!
            </p>
          </div>

          {/* Interactive Practice Component */}
          <TimesTablePractice table={6} />

          {/* Educational Content for SEO */}
          <div className="mt-16 max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                What is the 6 Times Table?
              </h2>

              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  The 6 times table shows multiplication by 6. Here's an amazing shortcut: if you already
                  know the 3 times table, you already know half of the 6 times table! Just double each
                  answer from the 3s table. For example: 3 × 4 = 12, so 6 × 4 = 24 (double of 12).
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Complete 6 Times Table Chart (1-12)
                </h3>
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
                  <ul className="space-y-2 text-lg">
                    <li className="font-semibold">6 × 1 = 6</li>
                    <li className="font-semibold">6 × 2 = 12</li>
                    <li className="font-semibold">6 × 3 = 18</li>
                    <li className="font-semibold">6 × 4 = 24</li>
                    <li className="font-semibold">6 × 5 = 30</li>
                    <li className="font-semibold">6 × 6 = 36</li>
                    <li className="font-semibold">6 × 7 = 42</li>
                    <li className="font-semibold">6 × 8 = 48</li>
                    <li className="font-semibold">6 × 9 = 54</li>
                    <li className="font-semibold">6 × 10 = 60</li>
                    <li className="font-semibold">6 × 11 = 66</li>
                    <li className="font-semibold">6 × 12 = 72</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  The "Double the 3s" Trick
                </h3>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-6">
                  <p className="text-gray-700 mb-4 font-semibold">
                    6 = 3 × 2, so multiply by 3 first, then double it!
                  </p>
                  <ul className="text-gray-700 space-y-3">
                    <li>✨ <strong>Example 1:</strong> 6 × 7 = ?</li>
                    <li className="ml-6">Step 1: 3 × 7 = 21</li>
                    <li className="ml-6">Step 2: Double it: 21 × 2 = 42</li>
                    <li className="ml-6">Answer: 6 × 7 = 42 ✓</li>
                    <li className="mt-4">✨ <strong>Example 2:</strong> 6 × 9 = ?</li>
                    <li className="ml-6">Step 1: 3 × 9 = 27</li>
                    <li className="ml-6">Step 2: Double it: 27 × 2 = 54</li>
                    <li className="ml-6">Answer: 6 × 9 = 54 ✓</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  More Easy Tricks for the 6 Times Table
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-6">
                  <li>
                    <strong>All Even Numbers:</strong> Every answer in the 6 times table is an even number
                  </li>
                  <li>
                    <strong>Skip Counting:</strong> Count by 6s: 6, 12, 18, 24, 30, 36, 42, 48, 54, 60...
                  </li>
                  <li>
                    <strong>Add 6 Each Time:</strong> Start at 6, keep adding 6: 6 → 12 → 18 → 24...
                  </li>
                  <li>
                    <strong>Half of 12:</strong> Multiply by 12, then divide by 2 (useful for larger numbers)
                  </li>
                  <li>
                    <strong>Egg Carton Method:</strong> 6 eggs per half carton - great visual!
                  </li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Connection to Other Times Tables
                </h3>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
                  <ul className="text-gray-700 space-y-2">
                    <li>🔗 <strong>6 = 2 × 3:</strong> Multiply by 2, then by 3 (or vice versa)</li>
                    <li>🔗 <strong>6 = half of 12:</strong> Know your 12s? Halve them for 6s!</li>
                    <li>🔗 <strong>3 doubled = 6:</strong> Double your 3 times table answers</li>
                    <li>🔗 Learning 6s makes learning 12s much easier later!</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Why Learn the 6 Times Table?
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Foundation for learning the 12 times table</li>
                  <li>Common in real life (6-packs, half-dozen, hexagons)</li>
                  <li>Important for division and fraction work</li>
                  <li>Used in time calculations (6 × 10 = 60 seconds/minutes)</li>
                  <li>Builds multiplication confidence and speed</li>
                  <li>Essential for advanced mathematics</li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Real-World Examples
                </h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                  <ul className="text-gray-700 space-y-2">
                    <li>🥚 Eggs: Half a carton has 6 eggs. 5 half-cartons = 6 × 5 = 30 eggs</li>
                    <li>🍪 Cookie packs: 6 cookies per pack. 8 packs = 6 × 8 = 48 cookies</li>
                    <li>⚽ Soccer: If a hexagon has 6 sides, 7 hexagons = 6 × 7 = 42 sides</li>
                    <li>🎲 Dice: Standard die has 6 sides. 9 dice = 6 × 9 = 54 total sides</li>
                    <li>📦 6-pack sodas: 12 six-packs = 6 × 12 = 72 cans</li>
                    <li>🎸 Guitar: 6 strings per guitar. 4 guitars = 6 × 4 = 24 strings</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Practice Tips for Parents & Teachers
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Emphasize the connection to the 3 times table (double it!)</li>
                  <li>Use egg cartons to visualize - 6 eggs in half a carton</li>
                  <li>Practice with 6-packs of soda, juice boxes, or other items</li>
                  <li>Skip count by 6s during car rides or walks</li>
                  <li>Point out hexagons (6 sides) in shapes and nature</li>
                  <li>Use our interactive quiz for daily 5-10 minute practice</li>
                  <li>Connect to music - many instruments have 6 strings</li>
                </ul>

                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 mt-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">
                    🎯 Pro Tip for Quick Learning
                  </h4>
                  <p className="text-gray-700">
                    If you've already mastered the 3 times table, you're halfway there! The 6 times table
                    is literally just doubling those answers. And once you know both 6 and 3, you can
                    easily learn 9 (add 3+6) and 12 (double 6). Four tables for the effort of two!
                  </p>
                </div>
              </div>
            </div>

            {/* Related Times Tables */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <ArrowRight className="w-6 h-6 text-indigo-600 mr-2" />
                Practice Other Times Tables
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[2, 3, 4, 5, 7, 8, 9, 10, 11, 12].map((table) => (
                  <Link
                    key={table}
                    href={`/times-tables/${table}-times-table`}
                    className="bg-gradient-to-br from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 rounded-xl p-4 text-center transition-all border-2 border-transparent hover:border-indigo-300"
                  >
                    <p className="text-2xl font-bold text-gray-800">{table}×</p>
                    <p className="text-sm text-gray-600">Times Table</p>
                  </Link>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href="/brain-games/times-table-speed-test"
                  className="block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all text-center"
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
