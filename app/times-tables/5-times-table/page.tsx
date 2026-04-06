import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Calculator, ArrowRight, BookOpen, Gamepad2 } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { TimesTablePractice } from '@/components/times-table-practice';

export const metadata: Metadata = {
  title: '5 Times Table - Learn Multiplication by 5 | Free Practice & Chart',
  description: 'Master the 5 times table with our free interactive tool. Learn the easiest multiplication trick - all answers end in 0 or 5! Perfect for kids learning to count by 5s.',
  keywords: [
    '5 times table',
    '5 multiplication table',
    'times table 5',
    'multiply by 5',
    '5x table',
    'learn 5 times table',
    '5 times table chart',
    '5 times table practice',
    'multiplication by 5',
    '5 times table worksheet',
    'five times table',
    'table of 5',
    '5 ka table'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/times-tables/5-times-table',
  },
  openGraph: {
    title: '5 Times Table - Free Practice & Chart',
    description: 'Learn the easiest times table! All answers end in 0 or 5. Interactive practice and printable charts.',
    url: 'https://www.thetutorbridge.com/times-tables/5-times-table',
    type: 'website',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": "5 Times Table Practice",
  "description": "Interactive learning tool for mastering the 5 times table with practice quizzes and printable charts",
  "educationalLevel": "Elementary School",
  "educationalUse": "practice",
  "learningResourceType": "interactive tool",
  "isAccessibleForFree": true,
  "inLanguage": "en",
  "teaches": "Multiplication by 5, 5 times table facts",
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student"
  }
};

export default function FiveTimesTable() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
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
            <span className="text-gray-600 font-medium">5 Times Table</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="w-12 h-12 text-orange-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                5 Times Table
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-orange-600 font-semibold mb-4">
              Learn Multiplication by 5 - The Easiest Times Table!
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              The 5 times table is one of the easiest! All answers end in 0 or 5. Learn to count by 5s
              and master multiplication quickly with our interactive tool.
            </p>
          </div>

          {/* Interactive Practice Component */}
          <TimesTablePractice table={5} />

          {/* Educational Content for SEO */}
          <div className="mt-16 max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                What is the 5 Times Table?
              </h2>

              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  The 5 times table is famous for being one of the easiest multiplication tables to learn!
                  Every answer ends in either 0 or 5, making it simple to recognize and memorize. It's perfect
                  for learning to count by 5s and understanding multiplication patterns.
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Complete 5 Times Table Chart (1-12)
                </h3>
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 mb-6">
                  <ul className="space-y-2 text-lg">
                    <li className="font-semibold">5 × 1 = <span className="text-orange-600">5</span></li>
                    <li className="font-semibold">5 × 2 = <span className="text-orange-600">10</span></li>
                    <li className="font-semibold">5 × 3 = <span className="text-orange-600">15</span></li>
                    <li className="font-semibold">5 × 4 = <span className="text-orange-600">20</span></li>
                    <li className="font-semibold">5 × 5 = <span className="text-orange-600">25</span></li>
                    <li className="font-semibold">5 × 6 = <span className="text-orange-600">30</span></li>
                    <li className="font-semibold">5 × 7 = <span className="text-orange-600">35</span></li>
                    <li className="font-semibold">5 × 8 = <span className="text-orange-600">40</span></li>
                    <li className="font-semibold">5 × 9 = <span className="text-orange-600">45</span></li>
                    <li className="font-semibold">5 × 10 = <span className="text-orange-600">50</span></li>
                    <li className="font-semibold">5 × 11 = <span className="text-orange-600">55</span></li>
                    <li className="font-semibold">5 × 12 = <span className="text-orange-600">60</span></li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Super Easy Tricks for the 5 Times Table
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-6">
                  <li>
                    <strong>Ends in 0 or 5:</strong> Every answer ends in either 0 (even numbers) or 5 (odd numbers)
                  </li>
                  <li>
                    <strong>Half of 10:</strong> Multiply by 10, then divide by 2. Example: 5 × 6 = (10 × 6) ÷ 2 = 60 ÷ 2 = 30
                  </li>
                  <li>
                    <strong>Use Your Hand:</strong> Each finger represents 5! Hold up 7 fingers = 7 × 5 = 35
                  </li>
                  <li>
                    <strong>Skip Count by 5s:</strong> 5, 10, 15, 20, 25, 30, 35, 40, 45, 50...
                  </li>
                  <li>
                    <strong>Clock Connection:</strong> Minutes on a clock! 5 minutes, 10 minutes, 15 minutes...
                  </li>
                  <li>
                    <strong>Nickel Trick:</strong> Each nickel = 5 cents. 8 nickels = 8 × 5 = 40 cents
                  </li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  The 0 or 5 Pattern
                </h3>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                  <p className="text-gray-700 mb-4">
                    Notice the amazing pattern:
                  </p>
                  <ul className="text-gray-700 space-y-2">
                    <li>✨ <strong>Odd numbers</strong> × 5 always end in <strong>5</strong>: 5×1=5, 5×3=15, 5×5=25, 5×7=35...</li>
                    <li>✨ <strong>Even numbers</strong> × 5 always end in <strong>0</strong>: 5×2=10, 5×4=20, 5×6=30, 5×8=40...</li>
                    <li>✨ This makes checking your answer super easy!</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Why the 5 Times Table is So Important
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Essential for telling time (5-minute intervals on a clock)</li>
                  <li>Used for counting money (nickels = 5 cents)</li>
                  <li>Helps understand the 10 times table (5 is half of 10)</li>
                  <li>Foundation for understanding fractions (1/5, quarters)</li>
                  <li>Common in measurements (5 fingers, 5 toes per foot)</li>
                  <li>Builds confidence - it's one of the easiest tables!</li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Real-World Examples
                </h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                  <ul className="text-gray-700 space-y-2">
                    <li>✋ You have 5 fingers on each hand. 3 hands = 5 × 3 = 15 fingers</li>
                    <li>💰 Each nickel = 5 cents. 9 nickels = 5 × 9 = 45 cents</li>
                    <li>⏰ Reading a clock: 5 minutes, 10 minutes, 15 minutes (5 × 1, 5 × 2, 5 × 3...)</li>
                    <li>⭐ If each star has 5 points, 8 stars = 5 × 8 = 40 points</li>
                    <li>🎵 Music: If each song is 5 minutes, 12 songs = 5 × 12 = 60 minutes (1 hour!)</li>
                    <li>🏀 Basketball: 5 players per team. 6 teams = 5 × 6 = 30 players</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Practice Tips for Parents & Teachers
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Use a clock to practice - count by 5s around the clock face</li>
                  <li>Count nickels together to make it tangible and fun</li>
                  <li>Use hands and fingers - each hand = 5 fingers</li>
                  <li>Practice skip counting by 5s during any activity</li>
                  <li>Point out the 0 and 5 pattern in every answer</li>
                  <li>Use our interactive quiz tool for 5-10 minutes daily</li>
                  <li>Once mastered, connect it to the 10 times table</li>
                </ul>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mt-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">
                    ⏰ Clock Trick for Parents
                  </h4>
                  <p className="text-gray-700">
                    Use an analog clock to teach the 5 times table! Each number on the clock represents
                    minutes: 1 = 5 minutes, 2 = 10 minutes, 3 = 15 minutes, etc. When the minute hand
                    points to 7, it's 35 minutes past the hour (5 × 7 = 35). This makes learning both
                    time-telling and multiplication fun and practical!
                  </p>
                </div>
              </div>
            </div>

            {/* Related Times Tables */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <ArrowRight className="w-6 h-6 text-orange-600 mr-2" />
                Practice Other Times Tables
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[2, 3, 4, 6, 7, 8, 9, 10, 11, 12].map((table) => (
                  <Link
                    key={table}
                    href={`/times-tables/${table}-times-table`}
                    className="bg-gradient-to-br from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 rounded-xl p-4 text-center transition-all border-2 border-transparent hover:border-orange-300"
                  >
                    <p className="text-2xl font-bold text-gray-800">{table}×</p>
                    <p className="text-sm text-gray-600">Times Table</p>
                  </Link>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href="/brain-games/times-table-speed-test"
                  className="block bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold py-3 px-6 rounded-xl transition-all text-center"
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
