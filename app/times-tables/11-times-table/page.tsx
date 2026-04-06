import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Calculator, ArrowRight, BookOpen, Gamepad2 } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { TimesTablePractice } from '@/components/times-table-practice';

export const metadata: Metadata = {
  title: '11 Times Table - Learn Multiplication by 11 | Free Practice & Chart',
  description: 'Master the 11 times table with our free interactive practice tool. Learn multiplication by 11 with tips, tricks, printable charts, and fun quizzes. Discover the repeating digit pattern!',
  keywords: [
    '11 times table',
    '11 multiplication table',
    'times table 11',
    'multiply by 11',
    '11x table',
    'learn 11 times table',
    '11 times table chart',
    '11 times table practice',
    'multiplication by 11',
    '11 times table worksheet',
    'eleven times table',
    'table of 11',
    '11 times table trick'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/times-tables/11-times-table',
  },
  openGraph: {
    title: '11 Times Table - Free Practice & Chart',
    description: 'Learn the 11 times table with interactive practice, tips & tricks, and printable charts!',
    url: 'https://www.thetutorbridge.com/times-tables/11-times-table',
    type: 'website',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": "11 Times Table Practice",
  "description": "Interactive learning tool for mastering the 11 times table with practice quizzes and printable charts",
  "educationalLevel": "Elementary School",
  "educationalUse": "practice",
  "learningResourceType": "interactive tool",
  "isAccessibleForFree": true,
  "inLanguage": "en",
  "teaches": "Multiplication by 11, 11 times table facts",
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student"
  }
};

export default function ElevenTimesTable() {
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
            <span className="text-gray-600 font-medium">11 Times Table</span>
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
                11 Times Table
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-blue-600 font-semibold mb-4">
              Learn Multiplication by 11
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Master the 11 times table with our interactive practice tool. Discover the amazing repeating digit pattern and tricks to quickly multiply any number by 11!
            </p>
          </div>

          {/* Interactive Practice Component */}
          <TimesTablePractice table={11} />

          {/* Educational Content for SEO */}
          <div className="mt-16 max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                What is the 11 Times Table?
              </h2>

              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  The 11 times table is one of the most fascinating multiplication tables because of its special pattern!
                  When multiplying single-digit numbers by 11, you get repeating digits (like 11 × 4 = 44).
                  There are clever tricks to make learning this table quick and easy.
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Complete 11 Times Table Chart (1-12)
                </h3>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 mb-6">
                  <ul className="space-y-2 text-lg">
                    <li className="font-semibold">11 × 1 = 11</li>
                    <li className="font-semibold">11 × 2 = 22</li>
                    <li className="font-semibold">11 × 3 = 33</li>
                    <li className="font-semibold">11 × 4 = 44</li>
                    <li className="font-semibold">11 × 5 = 55</li>
                    <li className="font-semibold">11 × 6 = 66</li>
                    <li className="font-semibold">11 × 7 = 77</li>
                    <li className="font-semibold">11 × 8 = 88</li>
                    <li className="font-semibold">11 × 9 = 99</li>
                    <li className="font-semibold">11 × 10 = 110</li>
                    <li className="font-semibold">11 × 11 = 121</li>
                    <li className="font-semibold">11 × 12 = 132</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Amazing Tricks for the 11 Times Table
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-6">
                  <li>
                    <strong>Repeating Digits (1-9):</strong> For single digits, just repeat the digit twice! 11 × 4 = 44, 11 × 7 = 77
                  </li>
                  <li>
                    <strong>Two-Digit Numbers Trick:</strong> For numbers like 11 × 23, place the sum of the digits (2+3=5) between them: 2_5_3 = 253
                  </li>
                  <li>
                    <strong>Pattern Recognition:</strong> Notice how 11 × 10 = 110, 11 × 11 = 121, 11 × 12 = 132
                  </li>
                  <li>
                    <strong>Add Shifted Number:</strong> 11 × 6 is the same as (6 × 10) + 6 = 60 + 6 = 66
                  </li>
                  <li>
                    <strong>Visual Pattern:</strong> The tens and ones digits increase together for 1-9
                  </li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Why Learn the 11 Times Table?
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Essential for higher-level math and algebra</li>
                  <li>Unique pattern makes it memorable and fun</li>
                  <li>Useful for mental math and quick calculations</li>
                  <li>Appears frequently in real-world problems</li>
                  <li>Builds confidence with larger numbers</li>
                  <li>Great for understanding number patterns</li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Real-World Examples
                </h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                  <ul className="text-gray-700 space-y-2">
                    <li>⚽ If each soccer team has 11 players, 5 teams have 11 × 5 = 55 players</li>
                    <li>🎯 Scoring 11 points per round for 8 rounds = 11 × 8 = 88 points</li>
                    <li>📦 Packing 11 items per box in 7 boxes = 11 × 7 = 77 items</li>
                    <li>💰 Saving $11 per week for 12 weeks = 11 × 12 = $132</li>
                    <li>📚 Reading 11 pages per day for 9 days = 11 × 9 = 99 pages</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Practice Tips for Parents & Teachers
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Start by emphasizing the repeating digit pattern for 1-9</li>
                  <li>Show the visual trick for two-digit multiplication</li>
                  <li>Use our interactive quiz tool daily for 5-10 minutes</li>
                  <li>Connect to real-world examples like sports teams (11 players)</li>
                  <li>Practice both recognition and recall</li>
                  <li>Combine with the 10 times table for comparison</li>
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
                {[2, 3, 4, 5, 6, 7, 8, 9, 10, 12].map((table) => (
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
