import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Brain, Gamepad2, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { MentalMathGame } from '@/components/mental-math-game';

export const metadata: Metadata = {
  title: 'Mental Math Practice 4th Grade - Free Quick Math Game for Kids',
  description: 'Quick mental math games for 4th graders! Practice all four operations - addition, subtraction, multiplication, and division. Free 60-second math challenge to build speed and accuracy.',
  keywords: [
    'mental math practice 4th grade',
    'fourth grade math games',
    'mental math for grade 4',
    'quick math games for 4th graders',
    'division practice 4th grade',
    'multiplication and division grade 4',
    'math speed test grade 4',
    'free math games for 4th grade',
    '4th grade math facts',
    'elementary math practice'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/brain-games/mental-math-grade-4',
  },
  openGraph: {
    title: 'Mental Math Practice 4th Grade - Free Math Game',
    description: 'Quick math games for 4th graders. Practice all four operations in 60 seconds!',
    url: 'https://www.thetutorbridge.com/brain-games/mental-math-grade-4',
    type: 'website',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Game",
  "name": "Mental Math Practice - 4th Grade",
  "description": "Interactive mental math game for 4th grade students covering all four operations",
  "educationalLevel": "Grade 4",
  "educationalUse": "practice",
  "learningResourceType": "game",
  "isAccessibleForFree": true,
  "inLanguage": "en",
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student",
    "audienceType": "4th grade students"
  }
};

export default function MentalMathGrade4() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50">
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
            <span className="text-gray-600 font-medium">Mental Math Grade 4</span>
          </nav>
        </div>
      </div>

      <section className="py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Brain className="w-12 h-12 text-blue-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Mental Math Practice
              </h1>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
              4th Grade Edition
            </p>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Challenge yourself with all four operations! Practice addition, subtraction, multiplication,
              and division in our fast-paced 60-second mental math game.
            </p>
          </div>

          <MentalMathGame grade={4} gradeTitle="4th Grade" />

          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Quick Math Games for 4th Graders
              </h2>

              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Our 4th grade mental math game introduces division alongside the operations students
                  learned in earlier grades. This quick math challenge helps students master all four
                  basic operations while building speed and accuracy.
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  What Makes This Perfect for 4th Grade?
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li><strong>Addition & Subtraction:</strong> Numbers up to 1,000</li>
                  <li><strong>Multiplication:</strong> Complete times tables 1-12</li>
                  <li><strong>Division:</strong> Basic division facts for building fluency</li>
                  <li><strong>Mixed Operations:</strong> Random problems to keep students thinking</li>
                  <li><strong>Timed Practice:</strong> Build speed without sacrificing accuracy</li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Benefits for 4th Grade Students
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Masters all four basic operations</li>
                  <li>Prepares for more advanced math concepts</li>
                  <li>Improves problem-solving speed</li>
                  <li>Builds confidence for standardized tests</li>
                  <li>Develops strong number sense</li>
                  <li>Makes math practice fun and engaging</li>
                </ul>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mt-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    🎯 Perfect for Test Prep
                  </h3>
                  <p className="text-gray-700">
                    This mental math practice aligns with 4th grade Common Core standards and helps
                    students prepare for state assessments. Regular practice improves both speed and
                    accuracy - two key components of test success!
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <ArrowRight className="w-6 h-6 text-blue-600 mr-2" />
                Try Other Grade Levels
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[3, 5, 6, 7, 8].map((grade) => (
                  <Link
                    key={grade}
                    href={`/brain-games/mental-math-grade-${grade}`}
                    className="bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 rounded-xl p-4 text-center transition-all border-2 border-transparent hover:border-blue-300"
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
