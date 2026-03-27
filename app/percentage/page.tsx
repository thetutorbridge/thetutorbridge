'use client';

import Link from 'next/link';
import { Home, Calculator, TrendingUp, Percent, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { percentageData } from '@/lib/percentage-data';

export default function PercentageMainPage() {
  // Group by percentage ranges
  const popularPercentages = percentageData.filter(p =>
    [10, 15, 20, 25, 50, 75].includes(p.percent)
  );
  const testScores = percentageData.filter(p =>
    p.of >= 100 && p.of <= 500 && p.percent >= 60
  );
  const discounts = percentageData.filter(p =>
    p.of <= 200 && p.percent >= 10 && p.percent <= 40
  );
  const allOthers = percentageData.filter(p =>
    !popularPercentages.includes(p) && !testScores.includes(p) && !discounts.includes(p)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Percentage Calculator - 100+ Common Calculations',
            description: 'Calculate percentages with step-by-step solutions for 100+ popular problems. What is X% of Y? Find answers instantly with detailed explanations.',
            url: 'https://www.thetutorbridge.com/percentage',
            publisher: {
              '@type': 'Organization',
              name: 'The Tutor Bridge',
            },
          }),
        }}
      />
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 px-6">
        <div className="container mx-auto max-w-7xl">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Percentage Calculator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Percent className="w-16 h-16 mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold">Percentage Calculator</h1>
            </div>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto mb-8">
              Calculate percentages with step-by-step solutions for 100+ popular problems
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <p className="text-3xl font-bold text-[#FFC857]">100+</p>
                <p className="text-sm text-blue-100">Problems Solved</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <p className="text-3xl font-bold text-[#FFC857]">Step-by-Step</p>
                <p className="text-sm text-blue-100">Detailed Solutions</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <p className="text-3xl font-bold text-[#FFC857]">100% Free</p>
                <p className="text-sm text-blue-100">No Signup Required</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Most Popular */}
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <TrendingUp className="w-8 h-8 mr-3 text-[#2BAE66]" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Most Popular Calculations
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {popularPercentages.slice(0, 12).map((item) => (
                <Link
                  key={item.slug}
                  href={`/percentage/${item.slug}`}
                  className="block bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-[#2BAE66]"
                >
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">What is</p>
                    <p className="text-3xl font-bold text-[#1A3D7C] mb-1">
                      {item.percent}%
                    </p>
                    <p className="text-sm text-gray-600 mb-2">of</p>
                    <p className="text-2xl font-bold text-gray-900 mb-3">
                      {item.of}
                    </p>
                    <div className="text-sm text-gray-400 mb-1">=</div>
                    <div className="text-2xl font-bold text-green-600">
                      {item.resultFormatted}
                    </div>
                  </div>
                  <div className="flex items-center justify-center mt-4 text-[#2BAE66]">
                    <span className="text-sm font-medium">View Solution</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Test Scores & Grades */}
          {testScores.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <Calculator className="w-8 h-8 mr-3 text-purple-600" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Test Scores & Grades
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                Common percentage calculations for test scores, grades, and academic performance.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {testScores.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/percentage/${item.slug}`}
                    className="block bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-purple-500"
                  >
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">{item.percent}% of {item.of}</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {item.resultFormatted}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Shopping Discounts */}
          {discounts.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <TrendingUp className="w-8 h-8 mr-3 text-green-600" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Shopping & Discounts
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                Calculate discounts, sales, and savings on your purchases.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {discounts.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/percentage/${item.slug}`}
                    className="block bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-4 hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-green-500"
                  >
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">{item.percent}% of {item.of}</p>
                      <p className="text-2xl font-bold text-green-600">
                        {item.resultFormatted}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* More Calculations */}
          {allOthers.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <Calculator className="w-8 h-8 mr-3 text-[#1A3D7C]" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  More Calculations
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {allOthers.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/percentage/${item.slug}`}
                    className="block bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-blue-500"
                  >
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">{item.percent}% of {item.of}</p>
                      <p className="text-2xl font-bold text-[#1A3D7C]">
                        {item.resultFormatted}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Educational Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How to Calculate Percentages
            </h2>

            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Simple 3-Step Method
                </h3>
                <ol className="space-y-3">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold mr-3">1</span>
                    <div>
                      <strong>Convert percentage to decimal:</strong> Divide the percentage by 100. For example, 25% becomes 0.25
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold mr-3">2</span>
                    <div>
                      <strong>Multiply by the number:</strong> Take your decimal and multiply it by the number. For example, 0.25 × 80 = 20
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold mr-3">3</span>
                    <div>
                      <strong>You have your answer!</strong> That's it - simple multiplication gives you the result
                    </div>
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Quick Tips for Mental Math
                </h3>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2">✓</span>
                      <span><strong>10%:</strong> Just move the decimal point one place left</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2">✓</span>
                      <span><strong>50%:</strong> Simply divide by 2 (half the number)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2">✓</span>
                      <span><strong>25%:</strong> Divide by 4 (one quarter)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2">✓</span>
                      <span><strong>20%:</strong> Divide by 5 (one fifth)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Common Uses of Percentages
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-teal-50 p-5 rounded-xl">
                    <h4 className="font-bold text-green-700 mb-2">Shopping & Sales</h4>
                    <p className="text-sm">Calculate discounts, sales tax, and total prices</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl">
                    <h4 className="font-bold text-purple-700 mb-2">School & Testing</h4>
                    <p className="text-sm">Convert test scores and calculate grades</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl">
                    <h4 className="font-bold text-blue-700 mb-2">Finance & Tips</h4>
                    <p className="text-sm">Calculate tips, interest rates, and investments</p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-5 rounded-xl">
                    <h4 className="font-bold text-orange-700 mb-2">Statistics & Data</h4>
                    <p className="text-sm">Understand polls, surveys, and data analysis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
