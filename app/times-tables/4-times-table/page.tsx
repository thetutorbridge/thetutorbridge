import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Calculator, ArrowRight, BookOpen, Gamepad2 } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { TimesTablePractice } from '@/components/times-table-practice';

export const metadata: Metadata = {
  title: '4 Times Table - Learn Multiplication by 4 | Free Practice & Chart',
  description: 'Master the 4 times table with our free interactive practice tool. Learn multiplication by 4 with the double-double trick, printable charts, and fun quizzes for kids!',
  keywords: [
    '4 times table',
    '4 multiplication table',
    'times table 4',
    'multiply by 4',
    '4x table',
    'learn 4 times table',
    '4 times table chart',
    '4 times table practice',
    'multiplication by 4',
    '4 times table worksheet',
    'four times table',
    'table of 4'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/times-tables/4-times-table',
  },
  openGraph: {
    title: '4 Times Table - Free Practice & Chart',
    description: 'Learn the 4 times table with the double-double trick, interactive practice, and printable charts!',
    url: 'https://www.thetutorbridge.com/times-tables/4-times-table',
    type: 'website',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": "4 Times Table Practice",
  "description": "Interactive learning tool for mastering the 4 times table with practice quizzes and printable charts",
  "educationalLevel": "Elementary School",
  "educationalUse": "practice",
  "learningResourceType": "interactive tool",
  "isAccessibleForFree": true,
  "inLanguage": "en",
  "teaches": "Multiplication by 4, 4 times table facts",
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student"
  }
};

export default function FourTimesTable() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
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
            <span className="text-gray-600 font-medium">4 Times Table</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="w-12 h-12 text-green-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                4 Times Table
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-green-600 font-semibold mb-4">
              Learn Multiplication by 4
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Master the 4 times table with the famous "double-double" trick! Learn to multiply by 4
              quickly using doubling and other easy patterns.
            </p>
          </div>

          {/* Interactive Practice Component */}
          <TimesTablePractice table={4} />

          {/* Educational Content for SEO */}
          <div className="mt-16 max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                What is the 4 Times Table?
              </h2>

              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  The 4 times table shows multiplication by 4. Here's the secret: multiplying by 4 is the
                  same as doubling a number twice! For example: 4 × 5 = (5 × 2) × 2 = 10 × 2 = 20. This
                  "double-double" trick makes the 4 times table super easy to learn!
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Complete 4 Times Table Chart (1-12)
                </h3>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 mb-6">
                  <ul className="space-y-2 text-lg">
                    <li className="font-semibold">4 × 1 = 4</li>
                    <li className="font-semibold">4 × 2 = 8</li>
                    <li className="font-semibold">4 × 3 = 12</li>
                    <li className="font-semibold">4 × 4 = 16</li>
                    <li className="font-semibold">4 × 5 = 20</li>
                    <li className="font-semibold">4 × 6 = 24</li>
                    <li className="font-semibold">4 × 7 = 28</li>
                    <li className="font-semibold">4 × 8 = 32</li>
                    <li className="font-semibold">4 × 9 = 36</li>
                    <li className="font-semibold">4 × 10 = 40</li>
                    <li className="font-semibold">4 × 11 = 44</li>
                    <li className="font-semibold">4 × 12 = 48</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  The Famous "Double-Double" Trick
                </h3>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                  <p className="text-gray-700 mb-4 font-semibold">
                    To multiply any number by 4, just double it, then double it again!
                  </p>
                  <ul className="text-gray-700 space-y-3">
                    <li>✨ <strong>Example 1:</strong> 4 × 7 = ?</li>
                    <li className="ml-6">Step 1: Double 7 = 14</li>
                    <li className="ml-6">Step 2: Double 14 = 28</li>
                    <li className="ml-6">Answer: 4 × 7 = 28 ✓</li>
                    <li className="mt-4">✨ <strong>Example 2:</strong> 4 × 9 = ?</li>
                    <li className="ml-6">Step 1: Double 9 = 18</li>
                    <li className="ml-6">Step 2: Double 18 = 36</li>
                    <li className="ml-6">Answer: 4 × 9 = 36 ✓</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  More Easy Tricks for the 4 Times Table
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-6">
                  <li>
                    <strong>All Even Numbers:</strong> Every answer in the 4 times table is an even number
                  </li>
                  <li>
                    <strong>Skip Counting:</strong> Count by 4s: 4, 8, 12, 16, 20, 24, 28, 32, 36, 40...
                  </li>
                  <li>
                    <strong>Double the 2s:</strong> If you know the 2 times table, just double those answers!
                  </li>
                  <li>
                    <strong>Quarters Connection:</strong> 4 quarters = $1, so 4 × any number is like counting quarters
                  </li>
                  <li>
                    <strong>Last Digit Pattern:</strong> The last digits repeat: 4, 8, 2, 6, 0 (then repeats)
                  </li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Why Learn the 4 Times Table?
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Essential for learning the 8 times table (just double the 4s!)</li>
                  <li>Helps with telling time (quarters of an hour)</li>
                  <li>Used in measuring (4 quarts in a gallon, 4 cups in a quart)</li>
                  <li>Important for understanding fractions (1/4, quarters)</li>
                  <li>Common in sports (4 quarters in basketball/football)</li>
                  <li>Builds mental math speed and confidence</li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Real-World Examples
                </h3>
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6">
                  <ul className="text-gray-700 space-y-2">
                    <li>🪑 If each table has 4 legs, 6 tables have 4 × 6 = 24 legs</li>
                    <li>🚗 If each car has 4 wheels, 8 cars have 4 × 8 = 32 wheels</li>
                    <li>💰 If you have 4 quarters, that's $1. So 7 sets = 4 × 7 = 28 quarters = $7</li>
                    <li>🏀 In 4 basketball games with 12 points each = 4 × 12 = 48 points total</li>
                    <li>📦 If each box holds 4 items, 9 boxes hold 4 × 9 = 36 items</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Practice Tips for Parents & Teachers
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Emphasize the "double-double" trick - it really works!</li>
                  <li>Use quarters (25 cent coins) to make it real and tangible</li>
                  <li>Count car wheels, table legs, and other groups of 4</li>
                  <li>Practice skip counting by 4s during walks or drives</li>
                  <li>Connect to the 2 times table they already know</li>
                  <li>Use our interactive quiz for daily 5-10 minute practice</li>
                  <li>Once mastered, the 8 times table will be much easier!</li>
                </ul>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mt-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">
                    🎯 Quick Mastery Tip
                  </h4>
                  <p className="text-gray-700">
                    The 4 times table is your gateway to the 8 times table! Once you master multiplying by 4,
                    you can instantly learn 8s by doubling your 4s answers. For example: If 4 × 6 = 24,
                    then 8 × 6 = 48 (double of 24). Two tables for the price of one!
                  </p>
                </div>
              </div>
            </div>

            {/* Related Times Tables */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <ArrowRight className="w-6 h-6 text-green-600 mr-2" />
                Practice Other Times Tables
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[2, 3, 5, 6, 7, 8, 9, 10, 11, 12].map((table) => (
                  <Link
                    key={table}
                    href={`/times-tables/${table}-times-table`}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl p-4 text-center transition-all border-2 border-transparent hover:border-green-300"
                  >
                    <p className="text-2xl font-bold text-gray-800">{table}×</p>
                    <p className="text-sm text-gray-600">Times Table</p>
                  </Link>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href="/brain-games/times-table-speed-test"
                  className="block bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all text-center"
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
