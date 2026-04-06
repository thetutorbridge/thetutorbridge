import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Calculator, ArrowRight, BookOpen, Gamepad2 } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { TimesTablePractice } from '@/components/times-table-practice';

export const metadata: Metadata = {
  title: '9 Times Table - Learn Multiplication by 9 | Free Finger Trick & Chart',
  description: 'Master the 9 times table with the amazing finger trick! Learn the digit sum rule (always equals 9) and one-less-than-10 pattern. Free interactive practice and printable charts.',
  keywords: [
    '9 times table',
    '9 multiplication table',
    'times table 9',
    'multiply by 9',
    '9x table',
    'learn 9 times table',
    '9 times table chart',
    '9 times table practice',
    'multiplication by 9',
    '9 times table worksheet',
    'nine times table',
    'table of 9',
    '9 ka table',
    '9 times table finger trick'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/times-tables/9-times-table',
  },
  openGraph: {
    title: '9 Times Table - Free Finger Trick & Chart',
    description: 'Learn the 9 times table with the famous finger trick! Digits always add to 9.',
    url: 'https://www.thetutorbridge.com/times-tables/9-times-table',
    type: 'website',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": "9 Times Table Practice",
  "description": "Interactive learning tool for mastering the 9 times table with the finger trick and practice quizzes",
  "educationalLevel": "Elementary School",
  "educationalUse": "practice",
  "learningResourceType": "interactive tool",
  "isAccessibleForFree": true,
  "inLanguage": "en",
  "teaches": "Multiplication by 9, 9 times table facts, finger trick for 9s",
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student"
  }
};

export default function NineTimesTable() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
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
            <span className="text-gray-600 font-medium">9 Times Table</span>
          </nav>
        </div>
      </div>

      <section className="py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="w-12 h-12 text-violet-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                9 Times Table
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-violet-600 font-semibold mb-4">
              Learn Multiplication by 9 - The Magic Finger Trick! ✋
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              The 9 times table has amazing patterns! Use the famous finger trick, or notice that
              digits always add up to 9. It's like magic!
            </p>
          </div>

          <TimesTablePractice table={9} />

          <div className="mt-16 max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                What is the 9 Times Table?
              </h2>

              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  The 9 times table is full of magical patterns! It has the famous finger trick, the
                  digit-sum rule (digits always add to 9), and connects beautifully to the 10 times table.
                  Once you learn these tricks, the 9s become one of the easiest tables!
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Complete 9 Times Table Chart (1-12)
                </h3>
                <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-6 mb-6">
                  <ul className="space-y-2 text-lg">
                    <li className="font-semibold">9 × 1 = <span className="text-violet-600">09</span> (0+9=9) ✓</li>
                    <li className="font-semibold">9 × 2 = <span className="text-violet-600">18</span> (1+8=9) ✓</li>
                    <li className="font-semibold">9 × 3 = <span className="text-violet-600">27</span> (2+7=9) ✓</li>
                    <li className="font-semibold">9 × 4 = <span className="text-violet-600">36</span> (3+6=9) ✓</li>
                    <li className="font-semibold">9 × 5 = <span className="text-violet-600">45</span> (4+5=9) ✓</li>
                    <li className="font-semibold">9 × 6 = <span className="text-violet-600">54</span> (5+4=9) ✓</li>
                    <li className="font-semibold">9 × 7 = <span className="text-violet-600">63</span> (6+3=9) ✓</li>
                    <li className="font-semibold">9 × 8 = <span className="text-violet-600">72</span> (7+2=9) ✓</li>
                    <li className="font-semibold">9 × 9 = <span className="text-violet-600">81</span> (8+1=9) ✓</li>
                    <li className="font-semibold">9 × 10 = <span className="text-violet-600">90</span> (9+0=9) ✓</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  The Famous Finger Trick for 9s! ✋
                </h3>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-6">
                  <p className="text-gray-700 mb-4 font-semibold text-lg">
                    This is the most popular multiplication trick in the world!
                  </p>
                  <ol className="text-gray-700 space-y-3 list-decimal pl-6">
                    <li><strong>Hold both hands in front of you, palms facing you</strong></li>
                    <li><strong>Number your fingers 1-10 from left to right</strong> (left pinky = 1, right pinky = 10)</li>
                    <li><strong>To find 9 × N, bend down finger #N</strong></li>
                    <li><strong>Count fingers before the bent finger = TENS digit</strong></li>
                    <li><strong>Count fingers after the bent finger = ONES digit</strong></li>
                  </ol>

                  <div className="mt-6 p-4 bg-white rounded-lg">
                    <p className="font-bold text-gray-800 mb-2">Example: 9 × 7 = ?</p>
                    <ul className="text-gray-700 space-y-1 ml-4">
                      <li>• Bend down finger #7 (left index finger)</li>
                      <li>• Count fingers BEFORE: 6 fingers → TENS = 6</li>
                      <li>• Count fingers AFTER: 3 fingers → ONES = 3</li>
                      <li>• Answer: 9 × 7 = <strong className="text-violet-600">63</strong> ✓</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  The Digit Sum Rule (Magic Pattern!)
                </h3>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
                  <p className="text-gray-700 mb-4 font-semibold">
                    In ANY multiple of 9 (up to 9×10), the digits ALWAYS add up to 9!
                  </p>
                  <ul className="text-gray-700 space-y-2">
                    <li>✨ 9 × 2 = <strong>18</strong> → 1 + 8 = 9 ✓</li>
                    <li>✨ 9 × 5 = <strong>45</strong> → 4 + 5 = 9 ✓</li>
                    <li>✨ 9 × 8 = <strong>72</strong> → 7 + 2 = 9 ✓</li>
                    <li className="mt-3">This helps you check if your answer is correct!</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  The "One Less Than 10" Trick
                </h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6">
                  <p className="text-gray-700 mb-4">
                    Multiply by 10, then subtract the original number!
                  </p>
                  <ul className="text-gray-700 space-y-3">
                    <li><strong>Example: 9 × 6 = ?</strong></li>
                    <li className="ml-6">Step 1: 10 × 6 = 60</li>
                    <li className="ml-6">Step 2: 60 - 6 = 54</li>
                    <li className="ml-6">Answer: 9 × 6 = 54 ✓</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  More Amazing 9s Patterns
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-6">
                  <li>
                    <strong>Tens digit pattern:</strong> Goes up: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9...
                  </li>
                  <li>
                    <strong>Ones digit pattern:</strong> Goes down: 9, 8, 7, 6, 5, 4, 3, 2, 1, 0...
                  </li>
                  <li>
                    <strong>Together they always = 9:</strong> 18 (1+8), 27 (2+7), 36 (3+6)...
                  </li>
                  <li>
                    <strong>Mirror pattern:</strong> 18 vs 81, 27 vs 72, 36 vs 63, 45 vs 54
                  </li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Why Learn the 9 Times Table?
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>One of the most useful multiplication tables</li>
                  <li>Amazing patterns make it fun and memorable</li>
                  <li>Essential for division by 9</li>
                  <li>Helps with understanding place value</li>
                  <li>The finger trick impresses everyone!</li>
                  <li>Builds number sense and pattern recognition</li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Real-World Examples
                </h3>
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6">
                  <ul className="text-gray-700 space-y-2">
                    <li>⚾ Baseball: 9 innings per game. 7 games = 9 × 7 = 63 innings</li>
                    <li>⚽ Soccer: 9 field players (excluding goalie). 8 teams = 9 × 8 = 72 players</li>
                    <li>📦 Packs of 9: If packs have 9 items, 6 packs = 9 × 6 = 54 items</li>
                    <li>🎯 Darts: Hitting 9 points, 5 times = 9 × 5 = 45 points</li>
                    <li>🏃 Running: 9 laps per day for 4 days = 9 × 4 = 36 laps</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Practice Tips for Parents & Teachers
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>TEACH THE FINGER TRICK! Kids love it and never forget it</li>
                  <li>Point out the digit-sum pattern in every answer</li>
                  <li>Show the connection to 10 times table (subtract original number)</li>
                  <li>Make it fun - the patterns are genuinely magical!</li>
                  <li>Practice skip counting by 9s</li>
                  <li>Use the mirror pattern (18↔81, 27↔72) for extra practice</li>
                  <li>Our interactive quiz reinforces these patterns daily</li>
                </ul>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mt-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">
                    ✨ The Most Magical Times Table!
                  </h4>
                  <p className="text-gray-700">
                    The 9 times table is considered the most fascinating multiplication table because of its
                    beautiful patterns. The finger trick makes it easy to learn, the digit-sum rule helps you
                    check answers, and the patterns are so consistent they feel like magic. Show these tricks
                    to friends and family - they'll be amazed! Once you master the 9s, you'll have conquered
                    one of the most interesting tables in all of mathematics.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <ArrowRight className="w-6 h-6 text-violet-600 mr-2" />
                Practice Other Times Tables
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[2, 3, 4, 5, 6, 7, 8, 10, 11, 12].map((table) => (
                  <Link
                    key={table}
                    href={`/times-tables/${table}-times-table`}
                    className="bg-gradient-to-br from-violet-50 to-purple-50 hover:from-violet-100 hover:to-purple-100 rounded-xl p-4 text-center transition-all border-2 border-transparent hover:border-violet-300"
                  >
                    <p className="text-2xl font-bold text-gray-800">{table}×</p>
                    <p className="text-sm text-gray-600">Times Table</p>
                  </Link>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href="/brain-games/times-table-speed-test"
                  className="block bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all text-center"
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
