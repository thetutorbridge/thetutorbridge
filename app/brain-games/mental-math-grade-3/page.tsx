import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Brain, Gamepad2, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { MentalMathGame } from '@/components/mental-math-game';

export const metadata: Metadata = {
  title: 'Mental Math Practice 3rd Grade - Free Online Math Game for Kids',
  description: 'Fun mental math practice for 3rd graders! Master addition, subtraction, and multiplication with our free 60-second challenge. Build speed and accuracy in basic math facts.',
  keywords: [
    'mental math practice 3rd grade',
    'third grade math games',
    'mental math for grade 3',
    'quick math games for 3rd graders',
    'addition subtraction practice grade 3',
    'multiplication practice 3rd grade',
    'math speed test grade 3',
    'free math games for 3rd grade',
    'elementary mental math',
    '3rd grade math facts practice'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/brain-games/mental-math-grade-3',
  },
  openGraph: {
    title: 'Mental Math Practice 3rd Grade - Free Math Game',
    description: 'Fun 60-second mental math challenge for 3rd graders. Practice addition, subtraction, and multiplication!',
    url: 'https://www.thetutorbridge.com/brain-games/mental-math-grade-3',
    type: 'website',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Game",
  "name": "Mental Math Practice - 3rd Grade",
  "description": "Interactive mental math game for 3rd grade students covering addition, subtraction, and multiplication",
  "educationalLevel": "Grade 3",
  "educationalUse": "practice",
  "learningResourceType": "game",
  "isAccessibleForFree": true,
  "inLanguage": "en",
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student",
    "audienceType": "3rd grade students"
  },
  "applicationCategory": "EducationalApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

export default function MentalMathGrade3() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
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
            <Link href="/brain-games" className="text-blue-600 hover:text-blue-800 flex items-center">
              <Gamepad2 className="w-4 h-4 mr-1" />
              Brain Games
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 font-medium">Mental Math Grade 3</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Brain className="w-12 h-12 text-purple-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Mental Math Practice
              </h1>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-purple-600 mb-4">
              3rd Grade Edition
            </p>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Master mental math with our fun 60-second challenge! Practice addition, subtraction,
              and multiplication to build speed and confidence in 3rd grade math.
            </p>
          </div>

          {/* Game Component */}
          <MentalMathGame grade={3} gradeTitle="3rd Grade" />

          {/* Educational Content for SEO */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Why Mental Math Practice is Important for 3rd Graders
              </h2>

              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Mental math is a crucial skill for 3rd grade students as they build a strong foundation
                  in mathematics. Our mental math practice game helps children develop quick thinking and
                  number sense through engaging, timed challenges.
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  What Math Skills Does This Game Practice?
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li><strong>Addition:</strong> Numbers up to 100 for building mental calculation speed</li>
                  <li><strong>Subtraction:</strong> Basic subtraction with numbers up to 100</li>
                  <li><strong>Multiplication:</strong> Times tables 2-5 for early multiplication mastery</li>
                  <li><strong>Speed:</strong> Answer questions quickly to earn bonus points</li>
                  <li><strong>Accuracy:</strong> Build confidence through repeated practice</li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Benefits of Mental Math for Elementary Students
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Improves number fluency and mathematical reasoning</li>
                  <li>Builds confidence in math abilities</li>
                  <li>Develops concentration and focus skills</li>
                  <li>Prepares students for standardized tests</li>
                  <li>Makes math fun and engaging</li>
                  <li>Tracks progress with personal leaderboards</li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  How to Use This Mental Math Game
                </h3>
                <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Click "Start Challenge" to begin the 60-second timer</li>
                  <li>Read each math problem and calculate the answer mentally</li>
                  <li>Type your answer and press Enter to submit</li>
                  <li>Faster answers earn more points - up to 10 points per question!</li>
                  <li>Build streaks by answering multiple questions correctly in a row</li>
                  <li>Compare your scores and track improvement over time</li>
                </ol>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mt-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    💡 Tips for Parents and Teachers
                  </h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Practice for 5-10 minutes daily to build consistent skills</li>
                    <li>• Celebrate improvements in speed and accuracy</li>
                    <li>• Use this as a warm-up activity before homework</li>
                    <li>• Challenge students to beat their personal best scores</li>
                    <li>• Perfect for homeschool math practice and test prep</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Other Grade Levels */}
            <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <ArrowRight className="w-6 h-6 text-purple-600 mr-2" />
                Try Other Grade Levels
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[4, 5, 6, 7, 8].map((grade) => (
                  <Link
                    key={grade}
                    href={`/brain-games/mental-math-grade-${grade}`}
                    className="bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-xl p-4 text-center transition-all border-2 border-transparent hover:border-purple-300"
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
