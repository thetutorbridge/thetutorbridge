import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Brain, Gamepad2, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { MentalMathGame } from '@/components/mental-math-game';

export const metadata: Metadata = {
  title: 'Mental Math Practice 5th Grade - Free Middle School Math Game',
  description: 'Mental math practice for 5th graders with challenging problems! Master all operations with larger numbers. Perfect for middle school prep and building math confidence.',
  keywords: [
    'mental math practice 5th grade',
    'fifth grade math games',
    'mental math for grade 5',
    'quick math games for 5th graders',
    'middle school math practice',
    'math speed test grade 5',
    'free math games for 5th grade',
    '5th grade math facts',
    'upper elementary math',
    'math challenge grade 5'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/brain-games/mental-math-grade-5',
  },
  openGraph: {
    title: 'Mental Math Practice 5th Grade - Free Math Game',
    description: 'Challenging mental math for 5th graders. Master all operations with larger numbers!',
    url: 'https://www.thetutorbridge.com/brain-games/mental-math-grade-5',
    type: 'website',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Game",
  "name": "Mental Math Practice - 5th Grade",
  "description": "Advanced mental math game for 5th grade students with challenging problems",
  "educationalLevel": "Grade 5",
  "educationalUse": "practice",
  "learningResourceType": "game",
  "isAccessibleForFree": true,
  "inLanguage": "en",
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student",
    "audienceType": "5th grade students"
  }
};

export default function MentalMathGrade5() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
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
            <span className="text-gray-600 font-medium">Mental Math Grade 5</span>
          </nav>
        </div>
      </div>

      <section className="py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Brain className="w-12 h-12 text-green-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Mental Math Practice
              </h1>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-green-600 mb-4">
              5th Grade Edition
            </p>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Take on the challenge! Master all four operations with larger numbers and prepare
              for middle school math with our advanced mental math game.
            </p>
          </div>

          <MentalMathGame grade={5} gradeTitle="5th Grade" />

          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Advanced Mental Math for 5th Graders
              </h2>

              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Our 5th grade mental math game increases the challenge with larger numbers and more
                  complex operations. This prepares students for middle school mathematics while
                  building essential computational fluency.
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  5th Grade Math Skills Covered
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li><strong>Addition & Subtraction:</strong> Numbers up to 500 for advanced practice</li>
                  <li><strong>Multiplication:</strong> Extended tables up to 15×15</li>
                  <li><strong>Division:</strong> More complex division problems</li>
                  <li><strong>Mental Strategies:</strong> Develop shortcuts and calculation tricks</li>
                  <li><strong>Speed & Accuracy:</strong> Balance both for optimal performance</li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Why Mental Math Matters in 5th Grade
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Essential foundation for pre-algebra and middle school math</li>
                  <li>Improves performance on standardized tests</li>
                  <li>Builds confidence for more complex problem-solving</li>
                  <li>Develops number sense and mathematical reasoning</li>
                  <li>Prepares for real-world math applications</li>
                  <li>Enhances overall academic performance</li>
                </ul>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mt-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    🚀 Middle School Ready
                  </h3>
                  <p className="text-gray-700">
                    Strong mental math skills in 5th grade set students up for success in middle school
                    mathematics. Practice daily to build the computational fluency needed for algebra,
                    geometry, and advanced problem-solving!
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <ArrowRight className="w-6 h-6 text-green-600 mr-2" />
                Try Other Grade Levels
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[3, 4, 6, 7, 8].map((grade) => (
                  <Link
                    key={grade}
                    href={`/brain-games/mental-math-grade-${grade}`}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl p-4 text-center transition-all border-2 border-transparent hover:border-green-300"
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
