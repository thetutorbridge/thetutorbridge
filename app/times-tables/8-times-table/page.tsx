import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Calculator, ArrowRight, BookOpen, Gamepad2 } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { TimesTablePractice } from '@/components/times-table-practice';

export const metadata: Metadata = {
  title: '8 Times Table - Learn Multiplication by 8 | Free Practice & Chart',
  description: 'Master the 8 times table easily! Just double the 4 times table answers. Free interactive practice with the triple-double trick and fun octopus-themed learning.',
  keywords: [
    '8 times table',
    '8 multiplication table',
    'times table 8',
    'multiply by 8',
    '8x table',
    'learn 8 times table',
    '8 times table chart',
    '8 times table practice',
    'multiplication by 8',
    '8 times table worksheet',
    'eight times table',
    'table of 8',
    '8 ka table'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/times-tables/8-times-table',
  },
  openGraph: {
    title: '8 Times Table - Free Practice & Chart',
    description: 'Learn the 8 times table by doubling the 4s! Interactive practice and printable charts.',
    url: 'https://www.thetutorbridge.com/times-tables/8-times-table',
    type: 'website',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": "8 Times Table Practice",
  "description": "Interactive learning tool for mastering the 8 times table with practice quizzes and printable charts",
  "educationalLevel": "Elementary School",
  "educationalUse": "practice",
  "learningResourceType": "interactive tool",
  "isAccessibleForFree": true,
  "inLanguage": "en",
  "teaches": "Multiplication by 8, 8 times table facts",
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student"
  }
};

export default function EightTimesTable() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50">
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
            <span className="text-gray-600 font-medium">8 Times Table</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="w-12 h-12 text-cyan-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                8 Times Table
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-cyan-600 font-semibold mb-4">
              Learn Multiplication by 8
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              The 8 times table is easy if you know the 4s! Just double every 4 times table answer.
              Or think of octopuses with 8 legs each! 🐙
            </p>
          </div>

          {/* Interactive Practice Component */}
          <TimesTablePractice table={8} />

          {/* Educational Content for SEO */}
          <div className="mt-16 max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                What is the 8 Times Table?
              </h2>

              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  The 8 times table shows multiplication by 8. Here's the magic trick: if you already know
                  the 4 times table, you can instantly know the 8s by doubling! Since 8 = 4 × 2, just take
                  any 4 times table answer and double it. For example: 4 × 5 = 20, so 8 × 5 = 40 (double of 20).
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Complete 8 Times Table Chart (1-12)
                </h3>
                <div className="bg-gradient-to-br from-cyan-50 to-sky-50 rounded-xl p-6 mb-6">
                  <ul className="space-y-2 text-lg">
                    <li className="font-semibold">8 × 1 = 8</li>
                    <li className="font-semibold">8 × 2 = 16</li>
                    <li className="font-semibold">8 × 3 = 24</li>
                    <li className="font-semibold">8 × 4 = 32</li>
                    <li className="font-semibold">8 × 5 = 40</li>
                    <li className="font-semibold">8 × 6 = 48</li>
                    <li className="font-semibold">8 × 7 = 56</li>
                    <li className="font-semibold">8 × 8 = 64</li>
                    <li className="font-semibold">8 × 9 = 72</li>
                    <li className="font-semibold">8 × 10 = 80</li>
                    <li className="font-semibold">8 × 11 = 88</li>
                    <li className="font-semibold">8 × 12 = 96</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  The "Double the 4s" Super Trick
                </h3>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
                  <p className="text-gray-700 mb-4 font-semibold">
                    8 = 4 × 2, so multiply by 4 first, then double the answer!
                  </p>
                  <ul className="text-gray-700 space-y-3">
                    <li>✨ <strong>Example 1:</strong> 8 × 6 = ?</li>
                    <li className="ml-6">Step 1: 4 × 6 = 24</li>
                    <li className="ml-6">Step 2: Double it: 24 × 2 = 48</li>
                    <li className="ml-6">Answer: 8 × 6 = 48 ✓</li>
                    <li className="mt-4">✨ <strong>Example 2:</strong> 8 × 9 = ?</li>
                    <li className="ml-6">Step 1: 4 × 9 = 36</li>
                    <li className="ml-6">Step 2: Double it: 36 × 2 = 72</li>
                    <li className="ml-6">Answer: 8 × 9 = 72 ✓</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  The "Triple Double" Trick
                </h3>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                  <p className="text-gray-700 mb-4">
                    Another amazing way: Double, then double again, then double one more time!
                  </p>
                  <ul className="text-gray-700 space-y-2">
                    <li><strong>Example: 8 × 5 = ?</strong></li>
                    <li className="ml-6">Start with 5</li>
                    <li className="ml-6">Double: 5 × 2 = 10</li>
                    <li className="ml-6">Double again: 10 × 2 = 20</li>
                    <li className="ml-6">Double once more: 20 × 2 = 40</li>
                    <li className="ml-6">Answer: 8 × 5 = 40 ✓</li>
                    <li className="mt-3"><em>Because 8 = 2 × 2 × 2!</em></li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  More Easy Tricks for the 8 Times Table
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-6">
                  <li>
                    <strong>All Even Numbers:</strong> Every answer in the 8 times table is even
                  </li>
                  <li>
                    <strong>Skip Counting:</strong> Count by 8s: 8, 16, 24, 32, 40, 48, 56, 64, 72, 80...
                  </li>
                  <li>
                    <strong>Ones Place Pattern:</strong> 8, 6, 4, 2, 0 (then repeats) - always even digits!
                  </li>
                  <li>
                    <strong>Octopus Method:</strong> Each octopus has 8 legs - count octopuses! 🐙
                  </li>
                  <li>
                    <strong>Perfect Square:</strong> 8 × 8 = 64 is an easy one to remember
                  </li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Connection to Other Times Tables
                </h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6">
                  <ul className="text-gray-700 space-y-2">
                    <li>🔗 <strong>8 = 2 × 4:</strong> Double the 4 times table (easiest method!)</li>
                    <li>🔗 <strong>8 = 2 × 2 × 2:</strong> Triple doubling works too</li>
                    <li>🔗 <strong>Half of 16:</strong> If you know 16s, halve them for 8s</li>
                    <li>🔗 <strong>Connection to 4 and 2:</strong> 8 connects these easier tables</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Why Learn the 8 Times Table?
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Used frequently in measurement (8 ounces in a cup)</li>
                  <li>Common in music (octave = 8 notes)</li>
                  <li>Important for understanding powers of 2 (2, 4, 8, 16...)</li>
                  <li>Essential for division by 8</li>
                  <li>Helps with understanding computer science (bytes)</li>
                  <li>Builds advanced multiplication skills</li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Real-World Examples
                </h3>
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6">
                  <ul className="text-gray-700 space-y-2">
                    <li>🐙 <strong>Octopuses:</strong> 5 octopuses with 8 legs each = 8 × 5 = 40 legs</li>
                    <li>🕷️ <strong>Spiders:</strong> 7 spiders with 8 legs each = 8 × 7 = 56 legs</li>
                    <li>🥤 <strong>Measurement:</strong> 8 ounces in a cup. 6 cups = 8 × 6 = 48 ounces</li>
                    <li>🖍️ <strong>Crayons:</strong> Small crayon boxes have 8. So 9 boxes = 8 × 9 = 72 crayons</li>
                    <li>🎵 <strong>Music:</strong> An octave has 8 notes. 4 octaves = 8 × 4 = 32 notes</li>
                    <li>⏰ <strong>Time:</strong> 8 hours per workday. 12 workdays = 8 × 12 = 96 hours</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Practice Tips for Parents & Teachers
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Start by reviewing the 4 times table - it's the foundation!</li>
                  <li>Emphasize the "double the 4s" trick repeatedly</li>
                  <li>Use octopus toys or drawings for visual learning 🐙</li>
                  <li>Practice skip counting by 8s during daily activities</li>
                  <li>Point out the ones place pattern (8, 6, 4, 2, 0)</li>
                  <li>Use measuring cups to show 8 ounces = 1 cup</li>
                  <li>Try the "triple double" method for understanding</li>
                  <li>Use our interactive quiz for focused daily practice</li>
                </ul>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mt-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">
                    🎯 Quick Learning Shortcut
                  </h4>
                  <p className="text-gray-700">
                    If you've mastered the 4 times table, the 8 times table is a piece of cake! Just
                    double every answer. This connection makes learning twice as fast. And here's a bonus:
                    once you know 8s, you can learn 16s the same way (just double the 8s). It's like
                    unlocking a whole chain of multiplication tables!
                  </p>
                </div>
              </div>
            </div>

            {/* Related Times Tables */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <ArrowRight className="w-6 h-6 text-cyan-600 mr-2" />
                Practice Other Times Tables
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[2, 3, 4, 5, 6, 7, 9, 10, 11, 12].map((table) => (
                  <Link
                    key={table}
                    href={`/times-tables/${table}-times-table`}
                    className="bg-gradient-to-br from-cyan-50 to-sky-50 hover:from-cyan-100 hover:to-sky-100 rounded-xl p-4 text-center transition-all border-2 border-transparent hover:border-cyan-300"
                  >
                    <p className="text-2xl font-bold text-gray-800">{table}×</p>
                    <p className="text-sm text-gray-600">Times Table</p>
                  </Link>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href="/brain-games/times-table-speed-test"
                  className="block bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700 text-white font-bold py-3 px-6 rounded-xl transition-all text-center"
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
