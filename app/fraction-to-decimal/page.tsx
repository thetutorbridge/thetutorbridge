'use client';

import Link from 'next/link';
import { Home, Calculator, TrendingUp, Percent, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { MathExpression } from '@/components/math-expression';
import { fractionsData } from '@/lib/fractions-data';

export default function FractionToDecimalMainPage() {
  // Group fractions by denominator type
  const commonFractions = fractionsData.filter(f => [2, 3, 4, 5, 8, 10].includes(f.denominator));
  const preciseFractions = fractionsData.filter(f => [16, 32].includes(f.denominator));
  const otherFractions = fractionsData.filter(f => ![2, 3, 4, 5, 8, 10, 16, 32].includes(f.denominator));

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Fraction to Decimal Converter - 200+ Fractions',
            description: 'Convert fractions to decimals with comprehensive step-by-step guides for 200+ popular fractions.',
            url: 'https://www.thetutorbridge.com/fraction-to-decimal',
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
            <span className="text-gray-600">Fraction to Decimal</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Calculator className="w-16 h-16 mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold">Fraction to Decimal Converter</h1>
            </div>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto mb-8">
              Convert fractions to decimals with step-by-step explanations for 200+ popular fractions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <p className="text-3xl font-bold text-[#FFC857]">200+</p>
                <p className="text-sm text-blue-100">Fractions Covered</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <p className="text-3xl font-bold text-[#FFC857]">Step-by-Step</p>
                <p className="text-sm text-blue-100">Detailed Conversions</p>
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
          {/* Most Popular Fractions */}
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <TrendingUp className="w-8 h-8 mr-3 text-[#2BAE66]" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Most Popular Fractions
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {fractionsData.slice(0, 12).map((fraction) => (
                <Link
                  key={fraction.slug}
                  href={`/fraction-to-decimal/${fraction.slug}`}
                  className="block bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-[#2BAE66]"
                >
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      <MathExpression
                        expression={`\\frac{${fraction.numerator}}{${fraction.denominator}}`}
                        displayMode={true}
                      />
                    </div>
                    <div className="text-gray-400 text-sm mb-1">=</div>
                    <div className="text-2xl font-bold text-green-600">
                      {fraction.decimal}
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      {fraction.percentage}
                    </div>
                  </div>
                  <div className="flex items-center justify-center mt-4 text-[#2BAE66]">
                    <span className="text-sm font-medium">View Details</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Common Fractions (Halves, Thirds, Quarters, Fifths, Eighths, Tenths) */}
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <Calculator className="w-8 h-8 mr-3 text-[#1A3D7C]" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Common Fractions
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              These are the most frequently used fractions in everyday math, cooking, measurements, and more.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {commonFractions.map((fraction) => (
                <Link
                  key={fraction.slug}
                  href={`/fraction-to-decimal/${fraction.slug}`}
                  className="block bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-blue-500"
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      <MathExpression
                        expression={`\\frac{${fraction.numerator}}{${fraction.denominator}}`}
                        displayMode={true}
                      />
                    </div>
                    <div className="text-lg font-semibold text-green-600">
                      {fraction.decimal}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Precision Fractions (Sixteenths, Thirty-seconds) */}
          {preciseFractions.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <Percent className="w-8 h-8 mr-3 text-purple-600" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Precision Measurements
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                Sixteenths and thirty-seconds - commonly used in carpentry, engineering, and precision work.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {preciseFractions.map((fraction) => (
                  <Link
                    key={fraction.slug}
                    href={`/fraction-to-decimal/${fraction.slug}`}
                    className="block bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-purple-500"
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        <MathExpression
                          expression={`\\frac{${fraction.numerator}}{${fraction.denominator}}`}
                          displayMode={true}
                        />
                      </div>
                      <div className="text-sm font-semibold text-purple-600">
                        {fraction.decimal}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Other Fractions */}
          {otherFractions.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <Calculator className="w-8 h-8 mr-3 text-green-600" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  More Fractions
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                Additional fractions including sixths, sevenths, ninths, twelfths, and more.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {otherFractions.map((fraction) => (
                  <Link
                    key={fraction.slug}
                    href={`/fraction-to-decimal/${fraction.slug}`}
                    className="block bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-4 hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-green-500"
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        <MathExpression
                          expression={`\\frac{${fraction.numerator}}{${fraction.denominator}}`}
                          displayMode={true}
                        />
                      </div>
                      <div className="text-sm font-semibold text-green-600">
                        {fraction.decimal}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Educational Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Understanding Fraction to Decimal Conversion
            </h2>

            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  How to Convert Fractions to Decimals
                </h3>
                <p className="leading-relaxed">
                  Converting a fraction to a decimal is simple: divide the numerator (top number) by the denominator (bottom number).
                  For example, to convert 1/2 to a decimal, divide 1 by 2 to get 0.5. This fundamental skill is essential for success
                  in math, science, and many real-world applications.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Terminating vs Repeating Decimals
                </h3>
                <p className="leading-relaxed mb-3">
                  When you convert fractions to decimals, you'll encounter two types of results:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">•</span>
                    <span><strong>Terminating Decimals:</strong> These have a finite number of digits (e.g., 1/2 = 0.5, 3/4 = 0.75).
                    They occur when the denominator has only factors of 2 and 5.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 font-bold mr-2">•</span>
                    <span><strong>Repeating Decimals:</strong> These have digits that repeat infinitely (e.g., 1/3 = 0.333..., 1/7 = 0.142857...).
                    They occur when the denominator has prime factors other than 2 and 5.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Why Learn Fraction to Decimal Conversion?
                </h3>
                <p className="leading-relaxed">
                  Understanding how to convert fractions to decimals is crucial for many real-world situations: calculating
                  percentages, measuring ingredients in cooking, understanding sports statistics, working with money, reading
                  measurement tools, and solving problems in science and engineering. Many calculators and computers work with
                  decimals, so being able to quickly convert fractions helps you work more efficiently.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Tips for Quick Conversion
                </h3>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2">✓</span>
                      <span>Memorize common fractions (1/2, 1/4, 3/4, 1/3, 2/3, 1/5, etc.)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2">✓</span>
                      <span>Remember that fractions with denominators of 10, 100, 1000 are easy to convert</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2">✓</span>
                      <span>Use equivalent fractions to make division easier (e.g., 2/8 = 1/4 = 0.25)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2">✓</span>
                      <span>Practice regularly to build speed and confidence</span>
                    </li>
                  </ul>
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
