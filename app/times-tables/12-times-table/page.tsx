import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Calculator, ArrowRight, BookOpen, Gamepad2 } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { TimesTablePractice } from '@/components/times-table-practice';

export const metadata: Metadata = {
  title: '12 Times Table - Learn Multiplication by 12 | Free Practice & Chart',
  description: 'Master the 12 times table with our free interactive practice tool. Learn multiplication by 12 with tips, tricks, printable charts, and fun quizzes. Perfect for mastering dozens!',
  keywords: [
    '12 times table',
    '12 multiplication table',
    'times table 12',
    'multiply by 12',
    '12x table',
    'learn 12 times table',
    '12 times table chart',
    '12 times table practice',
    'multiplication by 12',
    '12 times table worksheet',
    'twelve times table',
    'table of 12',
    'dozen multiplication'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/times-tables/12-times-table',
  },
  openGraph: {
    title: '12 Times Table - Free Practice & Chart',
    description: 'Learn the 12 times table with interactive practice, tips & tricks, and printable charts!',
    url: 'https://www.thetutorbridge.com/times-tables/12-times-table',
    type: 'website',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": "12 Times Table Practice",
  "description": "Interactive learning tool for mastering the 12 times table with practice quizzes and printable charts",
  "educationalLevel": "Elementary School",
  "educationalUse": "practice",
  "learningResourceType": "interactive tool",
  "isAccessibleForFree": true,
  "inLanguage": "en",
  "teaches": "Multiplication by 12, 12 times table facts, dozen calculations",
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student"
  }
};

export default function TwelveTimesTable() {
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
            <span className="text-gray-600 font-medium">12 Times Table</span>
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
                12 Times Table
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-blue-600 font-semibold mb-4">
              Learn Multiplication by 12
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Master the 12 times table with our interactive practice tool. Learn about dozens and discover clever tricks to quickly multiply any number by 12!
            </p>
          </div>

          {/* Interactive Practice Component */}
          <TimesTablePractice table={12} />

          {/* Educational Content for SEO */}
          <div className="mt-16 max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                What is the 12 Times Table?
              </h2>

              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  The 12 times table is the final and most challenging of the basic multiplication tables.
                  It's extremely useful in everyday life because 12 appears frequently (dozens, months, hours, inches in a foot).
                  Learning this table completes your multiplication foundation!
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Complete 12 Times Table Chart (1-12)
                </h3>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 mb-6">
                  <ul className="space-y-2 text-lg">
                    <li className="font-semibold">12 × 1 = 12</li>
                    <li className="font-semibold">12 × 2 = 24</li>
                    <li className="font-semibold">12 × 3 = 36</li>
                    <li className="font-semibold">12 × 4 = 48</li>
                    <li className="font-semibold">12 × 5 = 60</li>
                    <li className="font-semibold">12 × 6 = 72</li>
                    <li className="font-semibold">12 × 7 = 84</li>
                    <li className="font-semibold">12 × 8 = 96</li>
                    <li className="font-semibold">12 × 9 = 108</li>
                    <li className="font-semibold">12 × 10 = 120</li>
                    <li className="font-semibold">12 × 11 = 132</li>
                    <li className="font-semibold">12 × 12 = 144</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Smart Tricks for the 12 Times Table
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-6">
                  <li>
                    <strong>Break it Down:</strong> Add the 10 times table and 2 times table! 12 × 6 = (10 × 6) + (2 × 6) = 60 + 12 = 72
                  </li>
                  <li>
                    <strong>Think in Dozens:</strong> 12 is a dozen, so 3 × 12 = 3 dozen = 36
                  </li>
                  <li>
                    <strong>Double the 6 Times Table:</strong> Since 12 = 2 × 6, you can double any answer from the 6 times table
                  </li>
                  <li>
                    <strong>Famous Facts:</strong> Memorize key ones like 12 × 5 = 60 (5 dozen) and 12 × 12 = 144 (a gross/dozen dozen)
                  </li>
                  <li>
                    <strong>Pattern in Ones:</strong> The ones digit follows the pattern: 2, 4, 6, 8, 0, 2, 4, 6, 8, 0...
                  </li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Why Learn the 12 Times Table?
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Extremely common in everyday life (dozens, time, measurements)</li>
                  <li>Completes your basic multiplication knowledge</li>
                  <li>Essential for fractions and division</li>
                  <li>Appears in many standardized tests</li>
                  <li>Useful for understanding imperial measurements</li>
                  <li>Builds strong mental math skills</li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Real-World Examples
                </h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                  <ul className="text-gray-700 space-y-2">
                    <li>🥚 If each carton has 12 eggs, 6 cartons have 12 × 6 = 72 eggs</li>
                    <li>📅 12 months in a year × 5 years = 12 × 5 = 60 months</li>
                    <li>🕐 There are 12 hours on a clock face (12 × 2 = 24 hours in a day)</li>
                    <li>📏 12 inches in a foot × 8 feet = 12 × 8 = 96 inches</li>
                    <li>🍩 Buying 4 dozen donuts = 12 × 4 = 48 donuts</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Practice Tips for Parents & Teachers
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Teach the "10 + 2" breakdown method first</li>
                  <li>Connect to real-life dozen situations (eggs, donuts, months)</li>
                  <li>Use our interactive quiz tool daily for 5-10 minutes</li>
                  <li>Practice alongside the 6 times table (double strategy)</li>
                  <li>Make flashcards for the trickier facts (12×7, 12×8, 12×9)</li>
                  <li>Celebrate mastering all 12 times tables as a major milestone!</li>
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
                {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((table) => (
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
