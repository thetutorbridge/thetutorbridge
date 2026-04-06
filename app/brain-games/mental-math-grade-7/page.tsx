import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Brain, Gamepad2, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { MentalMathGame } from '@/components/mental-math-game';

export const metadata: Metadata = {
  title: 'Mental Math Practice 7th Grade - Free Pre-Algebra Math Challenge',
  description: 'Advanced mental math for 7th graders! Practice with integers, larger numbers, and complex operations. Perfect for pre-algebra and building mathematical confidence.',
  keywords: [
    'mental math practice 7th grade',
    'seventh grade math games',
    'mental math for grade 7',
    'quick math games for middle school',
    'pre-algebra mental math',
    'integer practice grade 7',
    'math speed test grade 7',
    'free math games for 7th grade',
    '7th grade math challenge',
    'middle school math practice'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/brain-games/mental-math-grade-7',
  },
  openGraph: {
    title: 'Mental Math Practice 7th Grade - Pre-Algebra Math Game',
    description: 'Advanced mental math challenge for 7th graders. Master integers and complex operations!',
    url: 'https://www.thetutorbridge.com/brain-games/mental-math-grade-7',
    type: 'website',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Game",
  "name": "Mental Math Practice - 7th Grade",
  "description": "Advanced mental math game for 7th grade students with integers and complex operations",
  "educationalLevel": "Grade 7",
  "educationalUse": "practice",
  "learningResourceType": "game",
  "isAccessibleForFree": true,
  "inLanguage": "en",
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student",
    "audienceType": "7th grade students"
  }
};

export default function MentalMathGrade7() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
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
            <Link href="/brain-games" className="text-blue-600 hover:text-blue-800 flex items-center">
              <Gamepad2 className="w-4 h-4 mr-1" />
              Brain Games
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 font-medium">Mental Math Grade 7</span>
          </nav>
        </div>
      </div>

      <section className="py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Brain className="w-12 h-12 text-orange-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Mental Math Practice
              </h1>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-orange-600 mb-4">
              7th Grade Edition
            </p>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Advanced pre-algebra mental math! Challenge yourself with integers, larger numbers,
              and complex operations to build your mathematical power.
            </p>
          </div>

          <MentalMathGame grade={7} gradeTitle="7th Grade" />

          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Pre-Algebra Mental Math Training
              </h2>

              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Our 7th grade mental math game prepares students for algebra with advanced computational
                  practice. Work with integers, larger numbers, and complex multi-step calculations to
                  build the skills needed for high school mathematics.
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Advanced Skills for 7th Grade
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li><strong>Integer Operations:</strong> Practice with positive and negative numbers</li>
                  <li><strong>Large Numbers:</strong> Operations with numbers up to 2,000</li>
                  <li><strong>Extended Multiplication:</strong> Times tables up to 25×25</li>
                  <li><strong>Advanced Division:</strong> Complex division with larger divisors</li>
                  <li><strong>Mental Strategies:</strong> Develop advanced calculation shortcuts</li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Why This Matters for Algebra
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Strong computational skills free up mental energy for algebraic thinking</li>
                  <li>Confidence with integers is essential for solving equations</li>
                  <li>Quick calculations improve problem-solving efficiency</li>
                  <li>Mental math skills reduce reliance on calculators</li>
                  <li>Builds number sense needed for advanced mathematics</li>
                  <li>Prepares for high school math and standardized tests</li>
                </ul>

                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 mt-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    🎓 Algebra Ready
                  </h3>
                  <p className="text-gray-700">
                    Success in algebra depends on strong computational fluency. This mental math practice
                    ensures you can quickly and accurately perform basic operations, allowing you to focus
                    on understanding algebraic concepts and problem-solving strategies!
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <ArrowRight className="w-6 h-6 text-orange-600 mr-2" />
                Try Other Grade Levels
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[3, 4, 5, 6, 8].map((grade) => (
                  <Link
                    key={grade}
                    href={`/brain-games/mental-math-grade-${grade}`}
                    className="bg-gradient-to-br from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 rounded-xl p-4 text-center transition-all border-2 border-transparent hover:border-orange-300"
                  >
                    <p className="text-lg font-bold text-gray-800">Grade {grade}</p>
                    <p className="text-sm text-gray-600">Mental Math</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
