import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Brain, Gamepad2, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { MentalMathGame } from '@/components/mental-math-game';

export const metadata: Metadata = {
  title: 'Mental Math Practice 6th Grade - Free Middle School Math Challenge',
  description: 'Quick math game for middle school students! Practice mental math with challenging problems including negative numbers. Build speed and confidence for 6th grade math.',
  keywords: [
    'mental math practice 6th grade',
    'sixth grade math games',
    'mental math for grade 6',
    'quick math games for middle school',
    'middle school math challenge',
    'math speed test grade 6',
    'free math games for 6th grade',
    '6th grade math practice',
    'pre-algebra mental math',
    'integer practice grade 6'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/brain-games/mental-math-grade-6',
  },
  openGraph: {
    title: 'Mental Math Practice 6th Grade - Middle School Math Game',
    description: 'Challenge yourself with 6th grade mental math! Perfect for middle school students.',
    url: 'https://www.thetutorbridge.com/brain-games/mental-math-grade-6',
    type: 'website',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Game",
  "name": "Mental Math Practice - 6th Grade",
  "description": "Middle school mental math game for 6th grade students with advanced problems",
  "educationalLevel": "Grade 6",
  "educationalUse": "practice",
  "learningResourceType": "game",
  "isAccessibleForFree": true,
  "inLanguage": "en",
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student",
    "audienceType": "6th grade students"
  }
};

export default function MentalMathGrade6() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
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
            <span className="text-gray-600 font-medium">Mental Math Grade 6</span>
          </nav>
        </div>
      </div>

      <section className="py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Brain className="w-12 h-12 text-indigo-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Mental Math Practice
              </h1>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-indigo-600 mb-4">
              6th Grade Edition
            </p>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Master middle school mental math! Challenge yourself with advanced operations
              and larger numbers in this fast-paced 60-second challenge.
            </p>
          </div>

          <MentalMathGame grade={6} gradeTitle="6th Grade" />

          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Middle School Mental Math Challenge
              </h2>

              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Our 6th grade mental math game provides the perfect challenge for middle school students.
                  Practice with larger numbers and more complex operations to build the computational
                  skills needed for pre-algebra and beyond.
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  What You'll Practice
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li><strong>Advanced Operations:</strong> All four operations with numbers up to 1,000</li>
                  <li><strong>Larger Multiplication:</strong> Extended multiplication tables up to 20×20</li>
                  <li><strong>Complex Division:</strong> Multi-digit division practice</li>
                  <li><strong>Mental Strategies:</strong> Learn efficient calculation methods</li>
                  <li><strong>Pre-Algebra Prep:</strong> Build skills for algebraic thinking</li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Benefits for Middle School Students
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Strengthens foundation for pre-algebra and algebra</li>
                  <li>Improves test-taking speed and accuracy</li>
                  <li>Builds confidence in mathematical abilities</li>
                  <li>Develops critical thinking and problem-solving skills</li>
                  <li>Makes math practice engaging and fun</li>
                  <li>Tracks progress with personal leaderboards</li>
                </ul>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mt-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    📚 Perfect for Pre-Algebra
                  </h3>
                  <p className="text-gray-700">
                    Strong mental math skills are essential for success in pre-algebra and algebra.
                    This game helps you build the computational fluency you need to focus on
                    understanding algebraic concepts rather than getting stuck on basic calculations!
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <ArrowRight className="w-6 h-6 text-indigo-600 mr-2" />
                Try Other Grade Levels
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[3, 4, 5, 7, 8].map((grade) => (
                  <Link
                    key={grade}
                    href={`/brain-games/mental-math-grade-${grade}`}
                    className="bg-gradient-to-br from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 rounded-xl p-4 text-center transition-all border-2 border-transparent hover:border-indigo-300"
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
