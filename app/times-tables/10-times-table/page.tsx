import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Calculator, ArrowRight, BookOpen, Gamepad2 } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { TimesTablePractice } from '@/components/times-table-practice';

export const metadata: Metadata = {
  title: '10 Times Table - Learn Multiplication by 10 | Free Practice & Chart',
  description: 'Master the easiest times table! Just add a zero to multiply by 10. Free interactive practice, printable charts, and fun tricks for learning the 10 times table.',
  keywords: [
    '10 times table',
    '10 multiplication table',
    'times table 10',
    'multiply by 10',
    '10x table',
    'learn 10 times table',
    '10 times table chart',
    '10 times table practice',
    'multiplication by 10',
    '10 times table worksheet',
    'ten times table',
    'table of 10',
    '10 ka table'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/times-tables/10-times-table',
  },
  openGraph: {
    title: '10 Times Table - Free Practice & Chart',
    description: 'The easiest times table! Just add a zero. Interactive practice and printable charts.',
    url: 'https://www.thetutorbridge.com/times-tables/10-times-table',
    type: 'website',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": "10 Times Table Practice",
  "description": "Interactive learning tool for mastering the 10 times table with the add-zero trick and practice quizzes",
  "educationalLevel": "Elementary School",
  "educationalUse": "practice",
  "learningResourceType": "interactive tool",
  "isAccessibleForFree": true,
  "inLanguage": "en",
  "teaches": "Multiplication by 10, 10 times table facts, place value understanding",
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student"
  }
};

export default function TenTimesTable() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navigation />

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
            <span className="text-gray-600 font-medium">10 Times Table</span>
          </nav>
        </div>
      </div>

      <section className="py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="w-12 h-12 text-emerald-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                10 Times Table
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-emerald-600 font-semibold mb-4">
              Learn Multiplication by 10 - Just Add a Zero!
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              The 10 times table is the absolute easiest! Just add a zero to any number.
              It's the foundation for understanding place value and the metric system.
            </p>
          </div>

          <TimesTablePractice table={10} />

          <div className="mt-16 max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                What is the 10 Times Table?
              </h2>

              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  The 10 times table is universally known as the easiest multiplication table to learn!
                  The simple rule: just add a zero to the end of any number. This table is essential
                  for understanding place value, the decimal system, and mental math.
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Complete 10 Times Table Chart (1-12)
                </h3>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 mb-6">
                  <ul className="space-y-2 text-lg">
                    <li className="font-semibold">10 × 1 = <span className="text-emerald-600">10</span></li>
                    <li className="font-semibold">10 × 2 = <span className="text-emerald-600">20</span></li>
                    <li className="font-semibold">10 × 3 = <span className="text-emerald-600">30</span></li>
                    <li className="font-semibold">10 × 4 = <span className="text-emerald-600">40</span></li>
                    <li className="font-semibold">10 × 5 = <span className="text-emerald-600">50</span></li>
                    <li className="font-semibold">10 × 6 = <span className="text-emerald-600">60</span></li>
                    <li className="font-semibold">10 × 7 = <span className="text-emerald-600">70</span></li>
                    <li className="font-semibold">10 × 8 = <span className="text-emerald-600">80</span></li>
                    <li className="font-semibold">10 × 9 = <span className="text-emerald-600">90</span></li>
                    <li className="font-semibold">10 × 10 = <span className="text-emerald-600">100</span></li>
                    <li className="font-semibold">10 × 11 = <span className="text-emerald-600">110</span></li>
                    <li className="font-semibold">10 × 12 = <span className="text-emerald-600">120</span></li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  The "Just Add Zero" Rule
                </h3>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-6">
                  <p className="text-gray-700 mb-4 font-semibold text-lg">
                    The simplest multiplication trick ever!
                  </p>
                  <ul className="text-gray-700 space-y-3">
                    <li>✨ <strong>10 × 3 = ?</strong> → Just add a zero to 3 → <strong className="text-emerald-600">30</strong> ✓</li>
                    <li>✨ <strong>10 × 7 = ?</strong> → Just add a zero to 7 → <strong className="text-emerald-600">70</strong> ✓</li>
                    <li>✨ <strong>10 × 9 = ?</strong> → Just add a zero to 9 → <strong className="text-emerald-600">90</strong> ✓</li>
                    <li>✨ <strong>10 × 12 = ?</strong> → Just add a zero to 12 → <strong className="text-emerald-600">120</strong> ✓</li>
                    <li className="mt-4 font-semibold">That's it! You already know the entire 10 times table!</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Understanding Place Value
                </h3>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
                  <p className="text-gray-700 mb-4">
                    Multiplying by 10 moves every digit one place to the left:
                  </p>
                  <ul className="text-gray-700 space-y-3">
                    <li>• <strong>6</strong> is in the ones place → 10 × 6 → <strong>60</strong> (6 moved to tens place)</li>
                    <li>• <strong>25</strong> has 2 tens and 5 ones → 10 × 25 → <strong>250</strong> (2 in hundreds, 5 in tens, 0 in ones)</li>
                    <li>• This is why we "add a zero" - we're shifting digits left!</li>
                    <li>• Understanding this helps with decimals and the metric system later</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  More Patterns in the 10 Times Table
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-6">
                  <li>
                    <strong>All End in Zero:</strong> Every answer in the 10 times table ends in 0
                  </li>
                  <li>
                    <strong>Count by 10s:</strong> 10, 20, 30, 40, 50, 60, 70, 80, 90, 100...
                  </li>
                  <li>
                    <strong>Counting Fingers & Toes:</strong> 10 fingers, 10 toes per person
                  </li>
                  <li>
                    <strong>Decimal System:</strong> Our entire number system is based on 10!
                  </li>
                  <li>
                    <strong>Easy Division:</strong> To divide by 10, just remove the zero!
                  </li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Why Learn the 10 Times Table?
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Foundation of our decimal number system</li>
                  <li>Essential for understanding place value</li>
                  <li>Critical for money calculations (dimes = 10 cents)</li>
                  <li>Basis of the metric system (10 mm = 1 cm, etc.)</li>
                  <li>Makes mental math incredibly fast</li>
                  <li>Helps with percentages (10% calculations)</li>
                  <li>Builds confidence - guaranteed success!</li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Real-World Examples
                </h3>
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6">
                  <ul className="text-gray-700 space-y-2">
                    <li>💰 <strong>Dimes:</strong> Each dime = 10 cents. 8 dimes = 10 × 8 = 80 cents</li>
                    <li>✋ <strong>Fingers:</strong> Each person has 10 fingers. 6 people = 10 × 6 = 60 fingers</li>
                    <li>📏 <strong>Metric System:</strong> 10 millimeters = 1 centimeter. 5 cm = 10 × 5 = 50 mm</li>
                    <li>🏃 <strong>Running:</strong> 10 laps per mile. 4 miles = 10 × 4 = 40 laps</li>
                    <li>📦 <strong>Packaging:</strong> 10 items per box. 12 boxes = 10 × 12 = 120 items</li>
                    <li>🎯 <strong>Points:</strong> 10 points per goal. 7 goals = 10 × 7 = 70 points</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Practice Tips for Parents & Teachers
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Start here! The 10 times table builds confidence instantly</li>
                  <li>Use dimes to make it tangible - count by 10 cents</li>
                  <li>Practice counting by 10s forward and backward</li>
                  <li>Emphasize the place value concept, not just "add zero"</li>
                  <li>Connect to real-world metric system examples</li>
                  <li>Use this success to motivate learning harder tables</li>
                  <li>Practice skip counting: 10, 20, 30, 40...</li>
                  <li>Show how 10s connect to percentages (10% = divide by 10)</li>
                </ul>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mt-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">
                    🎓 The Perfect Starting Point
                  </h4>
                  <p className="text-gray-700">
                    The 10 times table is the perfect place to start learning multiplication! It's so
                    easy that students gain instant confidence and success. Understanding why we "add
                    a zero" (because we're shifting place value) builds a deep foundation for
                    understanding our entire number system. Once you master the 10s, you can use
                    it as a shortcut for other tables - like using 10 × 7 = 70, then subtracting
                    7 to get 9 × 7 = 63!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <ArrowRight className="w-6 h-6 text-emerald-600 mr-2" />
                Practice Other Times Tables
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[2, 3, 4, 5, 6, 7, 8, 9, 11, 12].map((table) => (
                  <Link
                    key={table}
                    href={`/times-tables/${table}-times-table`}
                    className="bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 rounded-xl p-4 text-center transition-all border-2 border-transparent hover:border-emerald-300"
                  >
                    <p className="text-2xl font-bold text-gray-800">{table}×</p>
                    <p className="text-sm text-gray-600">Times Table</p>
                  </Link>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href="/brain-games/times-table-speed-test"
                  className="block bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-xl transition-all text-center"
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
