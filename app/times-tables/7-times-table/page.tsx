import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Calculator, ArrowRight, BookOpen, Gamepad2 } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { TimesTablePractice } from '@/components/times-table-practice';

export const metadata: Metadata = {
  title: '7 Times Table - Learn Multiplication by 7 | Free Practice & Chart',
  description: 'Master the 7 times table with our free interactive tool. Learn memory tricks, rhymes like "5-6-7-8" for 7×8=56, and practice with fun quizzes. The challenging table made easy!',
  keywords: [
    '7 times table',
    '7 multiplication table',
    'times table 7',
    'multiply by 7',
    '7x table',
    'learn 7 times table',
    '7 times table chart',
    '7 times table practice',
    'multiplication by 7',
    '7 times table worksheet',
    'seven times table',
    'table of 7',
    '7 ka table'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/times-tables/7-times-table',
  },
  openGraph: {
    title: '7 Times Table - Free Practice & Chart',
    description: 'Master the challenging 7 times table with memory tricks, rhymes, and interactive practice!',
    url: 'https://www.thetutorbridge.com/times-tables/7-times-table',
    type: 'website',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": "7 Times Table Practice",
  "description": "Interactive learning tool for mastering the 7 times table with practice quizzes and printable charts",
  "educationalLevel": "Elementary School",
  "educationalUse": "practice",
  "learningResourceType": "interactive tool",
  "isAccessibleForFree": true,
  "inLanguage": "en",
  "teaches": "Multiplication by 7, 7 times table facts",
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student"
  }
};

export default function SevenTimesTable() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50">
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
            <span className="text-gray-600 font-medium">7 Times Table</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="w-12 h-12 text-red-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                7 Times Table
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-red-600 font-semibold mb-4">
              Learn Multiplication by 7 - The Challenge Table!
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              The 7 times table is known as the most challenging! But with practice and memory tricks
              like the famous "5-6-7-8" rhyme, you'll master it in no time.
            </p>
          </div>

          {/* Interactive Practice Component */}
          <TimesTablePractice table={7} />

          {/* Educational Content for SEO */}
          <div className="mt-16 max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                What is the 7 Times Table?
              </h2>

              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  The 7 times table is often considered the hardest multiplication table to learn because
                  it doesn't have easy doubling tricks like other tables. But don't worry! With the right
                  memory tricks, rhymes, and regular practice, you'll master it just like the others.
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Complete 7 Times Table Chart (1-12)
                </h3>
                <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 mb-6">
                  <ul className="space-y-2 text-lg">
                    <li className="font-semibold">7 × 1 = 7</li>
                    <li className="font-semibold">7 × 2 = 14</li>
                    <li className="font-semibold">7 × 3 = 21</li>
                    <li className="font-semibold">7 × 4 = 28</li>
                    <li className="font-semibold">7 × 5 = 35</li>
                    <li className="font-semibold">7 × 6 = 42</li>
                    <li className="font-semibold">7 × 7 = 49</li>
                    <li className="font-semibold">7 × 8 = 56</li>
                    <li className="font-semibold">7 × 9 = 63</li>
                    <li className="font-semibold">7 × 10 = 70</li>
                    <li className="font-semibold">7 × 11 = 77</li>
                    <li className="font-semibold">7 × 12 = 84</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Famous Memory Tricks & Rhymes
                </h3>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
                  <ul className="text-gray-700 space-y-4">
                    <li>
                      <strong className="text-lg">🎵 "5, 6, 7, 8!" for 7 × 8 = 56</strong>
                      <p className="ml-6 mt-1">The most famous trick! Count 5-6-7-8, and there's your answer: 56</p>
                    </li>
                    <li>
                      <strong className="text-lg">🎵 "I ate and ate until I was sick on the floor" for 7 × 8 = 56</strong>
                      <p className="ml-6 mt-1">"I 8 and 8 until I was 56" (ate, ate, sick, floor sound like numbers)</p>
                    </li>
                    <li>
                      <strong className="text-lg">📅 7 × 7 = 49</strong>
                      <p className="ml-6 mt-1">7 weeks = 49 days (almost 7 weeks in a row!)</p>
                    </li>
                    <li>
                      <strong className="text-lg">🔢 Pattern in the ones place:</strong>
                      <p className="ml-6 mt-1">7, 14, 21, 28, 35, 42, 49, 56, 63, 70... The pattern goes: 7, 4, 1, 8, 5, 2, 9, 6, 3, 0</p>
                    </li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Learning Strategies for the 7 Times Table
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-6">
                  <li>
                    <strong>Skip Counting:</strong> Practice counting by 7s: 7, 14, 21, 28, 35, 42, 49, 56, 63, 70...
                  </li>
                  <li>
                    <strong>Add 7 Each Time:</strong> Start at 7, keep adding: 7 + 7 = 14, 14 + 7 = 21, 21 + 7 = 28...
                  </li>
                  <li>
                    <strong>Days of the Week:</strong> 7 days per week helps with smaller multiples
                  </li>
                  <li>
                    <strong>Use Known Facts:</strong> If you know 7 × 5 = 35, then 7 × 6 = 35 + 7 = 42
                  </li>
                  <li>
                    <strong>Practice Makes Perfect:</strong> The 7 times table requires more repetition - that's okay!
                  </li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Breaking Down the Tricky Ones
                </h3>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-6">
                  <ul className="text-gray-700 space-y-3">
                    <li>
                      <strong>7 × 6 = 42:</strong> Think "7 × 6 = forty-two" (sounds rhythmic)
                    </li>
                    <li>
                      <strong>7 × 7 = 49:</strong> Seven sevens are forty-nine (7 weeks = 49 days)
                    </li>
                    <li>
                      <strong>7 × 8 = 56:</strong> Use the "5-6-7-8" counting rhyme
                    </li>
                    <li>
                      <strong>7 × 9 = 63:</strong> Think "7 × 9 = sixty-three" (rhymes!)
                    </li>
                    <li>
                      <strong>7 × 12 = 84:</strong> One dozen weeks = 84 days
                    </li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Why Learn the 7 Times Table?
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Completes your multiplication table knowledge</li>
                  <li>Essential for division by 7</li>
                  <li>Common in weekly calculations (7 days per week)</li>
                  <li>Builds mental math resilience and problem-solving</li>
                  <li>Needed for fractions and advanced mathematics</li>
                  <li>Conquering the hardest table builds confidence!</li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Real-World Examples
                </h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                  <ul className="text-gray-700 space-y-2">
                    <li>📅 <strong>Weeks:</strong> 4 weeks = 4 × 7 = 28 days (February in non-leap years!)</li>
                    <li>📅 <strong>Weeks:</strong> 7 weeks = 7 × 7 = 49 days</li>
                    <li>🎵 <strong>Music:</strong> If you practice piano 7 hours per week for 8 weeks = 7 × 8 = 56 hours</li>
                    <li>🏃 <strong>Exercise:</strong> Run 7 miles per week for 9 weeks = 7 × 9 = 63 miles total</li>
                    <li>💰 <strong>Savings:</strong> Save $7 per day for 12 days = 7 × 12 = $84</li>
                    <li>📚 <strong>Reading:</strong> Read 7 pages per night for 11 nights = 7 × 11 = 77 pages</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Practice Tips for Parents & Teachers
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Be patient - this table takes more time and practice than others</li>
                  <li>Use the "5-6-7-8" rhyme repeatedly for 7×8</li>
                  <li>Practice skip counting by 7s daily (forward and backward!)</li>
                  <li>Connect to calendars and weeks for real-world context</li>
                  <li>Make up silly rhymes or stories for each fact</li>
                  <li>Celebrate small victories - each fact learned is progress!</li>
                  <li>Use our interactive quiz for focused daily practice</li>
                  <li>Mix with easier tables to build confidence</li>
                </ul>

                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 mt-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">
                    💪 You've Got This!
                  </h4>
                  <p className="text-gray-700">
                    The 7 times table has a reputation for being tough, but that just means mastering it
                    is even more impressive! Every student who conquers the 7s feels proud and confident.
                    With daily practice using our interactive tool and memory tricks like "5-6-7-8 = 56,"
                    you'll have it memorized before you know it. Remember: practice makes progress!
                  </p>
                </div>
              </div>
            </div>

            {/* Related Times Tables */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <ArrowRight className="w-6 h-6 text-red-600 mr-2" />
                Practice Other Times Tables
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[2, 3, 4, 5, 6, 8, 9, 10, 11, 12].map((table) => (
                  <Link
                    key={table}
                    href={`/times-tables/${table}-times-table`}
                    className="bg-gradient-to-br from-red-50 to-rose-50 hover:from-red-100 hover:to-rose-100 rounded-xl p-4 text-center transition-all border-2 border-transparent hover:border-red-300"
                  >
                    <p className="text-2xl font-bold text-gray-800">{table}×</p>
                    <p className="text-sm text-gray-600">Times Table</p>
                  </Link>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href="/brain-games/times-table-speed-test"
                  className="block bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold py-3 px-6 rounded-xl transition-all text-center"
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
