import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Brain, Gamepad2, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { MentalMathGame } from '@/components/mental-math-game';

export const metadata: Metadata = {
  title: 'Mental Math Practice 8th Grade - Advanced Algebra Prep Math Challenge',
  description: 'Expert-level mental math for 8th graders! Master complex operations, integers, and large numbers. Perfect for algebra prep and high school readiness.',
  keywords: [
    'mental math practice 8th grade',
    'eighth grade math games',
    'mental math for grade 8',
    'quick math games for middle school',
    'algebra prep mental math',
    'advanced integer practice',
    'math speed test grade 8',
    'free math games for 8th grade',
    '8th grade math challenge',
    'high school math prep'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/brain-games/mental-math-grade-8',
  },
  openGraph: {
    title: 'Mental Math Practice 8th Grade - Algebra Prep Math Game',
    description: 'Expert-level mental math for 8th graders. Master complex operations for algebra success!',
    url: 'https://www.thetutorbridge.com/brain-games/mental-math-grade-8',
    type: 'website',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Game",
  "name": "Mental Math Practice - 8th Grade",
  "description": "Expert-level mental math game for 8th grade students preparing for algebra",
  "educationalLevel": "Grade 8",
  "educationalUse": "practice",
  "learningResourceType": "game",
  "isAccessibleForFree": true,
  "inLanguage": "en",
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student",
    "audienceType": "8th grade students"
  }
};

export default function MentalMathGrade8() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50">
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
            <span className="text-gray-600 font-medium">Mental Math Grade 8</span>
          </nav>
        </div>
      </div>

      <section className="py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Brain className="w-12 h-12 text-red-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Mental Math Practice
              </h1>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
              8th Grade Edition
            </p>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Master expert-level mental math! Tackle the most challenging problems with complex
              operations and large numbers. Perfect for algebra and high school preparation.
            </p>
          </div>

          <MentalMathGame grade={8} gradeTitle="8th Grade" />

          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Expert-Level Mental Math for Algebra Success
              </h2>

              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Our 8th grade mental math game provides the ultimate computational challenge. Master
                  complex operations with large numbers, integers, and advanced calculations to build
                  the mathematical foundation needed for algebra and high school mathematics.
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Expert-Level Skills Covered
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li><strong>Complex Integer Operations:</strong> Advanced practice with positive and negative numbers</li>
                  <li><strong>Large Number Calculations:</strong> Operations with numbers up to 5,000</li>
                  <li><strong>Advanced Multiplication:</strong> Extended tables up to 30×30</li>
                  <li><strong>Complex Division:</strong> Multi-digit division with large divisors</li>
                  <li><strong>Mental Shortcuts:</strong> Master efficient calculation strategies</li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  High School Readiness
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Essential preparation for Algebra I and Geometry</li>
                  <li>Builds confidence for high school mathematics</li>
                  <li>Improves performance on placement tests and standardized exams</li>
                  <li>Develops advanced problem-solving abilities</li>
                  <li>Strengthens mathematical reasoning and logic</li>
                  <li>Reduces dependence on calculators for basic operations</li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Perfect for Test Prep
                </h3>
                <p className="text-gray-700 mb-4">
                  Strong mental math skills give you a significant advantage on:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>State standardized tests and assessments</li>
                  <li>High school entrance exams</li>
                  <li>Algebra I placement tests</li>
                  <li>SAT and ACT preparation</li>
                  <li>Math competitions and academic challenges</li>
                </ul>

                <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl p-6 mt-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    🏆 High School Success
                  </h3>
                  <p className="text-gray-700">
                    Mastering mental math in 8th grade sets you up for success throughout high school
                    and beyond. Quick, accurate calculations allow you to focus on understanding complex
                    concepts in algebra, geometry, trigonometry, and calculus. Build your mathematical
                    superpower today!
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <ArrowRight className="w-6 h-6 text-red-600 mr-2" />
                Try Other Grade Levels
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[3, 4, 5, 6, 7].map((grade) => (
                  <Link
                    key={grade}
                    href={`/brain-games/mental-math-grade-${grade}`}
                    className="bg-gradient-to-br from-red-50 to-rose-50 hover:from-red-100 hover:to-rose-100 rounded-xl p-4 text-center transition-all border-2 border-transparent hover:border-red-300"
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
