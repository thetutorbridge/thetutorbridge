'use client';

import Link from 'next/link';
import { Home, ArrowLeft, Calculator, CheckCircle, BookOpen, ArrowRight, Percent } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { MathExpression } from '@/components/math-expression';
import { FractionData, getAllFractionSlugs } from '@/lib/fractions-data';

interface FractionPageContentProps {
  fractionData: FractionData;
  fractionSlug: string;
}

export function FractionPageContent({ fractionData, fractionSlug }: FractionPageContentProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: `${fractionData.fraction} as a Decimal - Conversion & Examples`,
            description: `Learn how to convert ${fractionData.fraction} to decimal form: ${fractionData.decimal}`,
            author: {
              '@type': 'Organization',
              name: 'The Tutor Bridge',
            },
            publisher: {
              '@type': 'Organization',
              name: 'The Tutor Bridge',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.thetutorbridge.com/TheTutorBridge Logo New.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://www.thetutorbridge.com/fraction-to-decimal/${fractionSlug}`,
            },
          }),
        }}
      />
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 px-6">
        <div className="container mx-auto max-w-6xl">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/fraction-to-decimal" className="text-[#1A3D7C] hover:text-[#2BAE66]">
              Fraction to Decimal
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{fractionData.fraction}</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">
                {fractionData.fraction} as a Decimal
              </h1>
            </div>
            <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
              Convert {fractionData.fraction} to decimal form with step-by-step explanation
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Quick Answer */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Quick Answer</h2>
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-8">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                  <MathExpression expression={`\\frac{${fractionData.numerator}}{${fractionData.denominator}}`} displayMode={true} />
                </div>
                <div className="text-4xl font-bold text-gray-600 mb-2">=</div>
                <div className="text-5xl md:text-6xl font-bold text-green-700 mb-4">
                  {fractionData.decimal}
                </div>
                <div className="flex items-center justify-center gap-4 text-lg text-gray-700">
                  <div className="flex items-center">
                    <Percent className="w-5 h-5 mr-2" />
                    <span className="font-semibold">{fractionData.percentage}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="font-medium">{fractionData.decimalType === 'terminating' ? 'Terminating Decimal' : 'Repeating Decimal'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Conversion Steps */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Step-by-Step Conversion
            </h2>
            <div className="space-y-6">
              {fractionData.steps.map((step, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg border-l-4 ${
                    index === fractionData.steps.length - 1
                      ? 'bg-green-50 border-green-500'
                      : 'bg-blue-50 border-blue-500'
                  }`}
                >
                  <div className="flex items-start">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 ${
                        index === fractionData.steps.length - 1
                          ? 'bg-green-500 text-white'
                          : 'bg-blue-500 text-white'
                      }`}
                    >
                      {index === fractionData.steps.length - 1 ? '✓' : index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-gray-900 mb-2">
                        {step.description}
                      </p>
                      {step.calculation && (
                        <div className="bg-white rounded-lg p-4 mb-2 border border-gray-200">
                          <div className="text-xl text-gray-800">
                            {step.calculation}
                          </div>
                        </div>
                      )}
                      {step.result && (
                        <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
                          <div className="text-lg md:text-xl font-bold text-blue-600">
                            {step.result}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Decimal Type Explanation */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Understanding the Result
            </h2>
            <div className={`p-6 rounded-lg ${fractionData.decimalType === 'terminating' ? 'bg-green-50 border-l-4 border-green-500' : 'bg-purple-50 border-l-4 border-purple-500'}`}>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {fractionData.decimalType === 'terminating' ? 'Terminating Decimal' : 'Repeating Decimal'}
              </h3>
              {fractionData.decimalType === 'terminating' ? (
                <p className="text-gray-700 leading-relaxed">
                  The fraction <strong>{fractionData.fraction}</strong> converts to a <strong>terminating decimal</strong>.
                  This means the decimal has a finite number of digits and doesn't repeat. The decimal representation
                  <strong> {fractionData.decimal}</strong> is exact and complete.
                </p>
              ) : (
                <p className="text-gray-700 leading-relaxed">
                  The fraction <strong>{fractionData.fraction}</strong> converts to a <strong>repeating decimal</strong>.
                  This means the decimal has digits that repeat infinitely. The decimal representation
                  <strong> {fractionData.repeatEnd}</strong> shows that the pattern repeats forever.
                  In practice, we often round to a few decimal places.
                </p>
              )}
            </div>
          </div>

          {/* Equivalent Fractions */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Equivalent Fractions
            </h2>
            <p className="text-gray-700 mb-4">
              The fraction <strong>{fractionData.fraction}</strong> can also be expressed as:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {fractionData.equivalentFractions.map((equiv, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 text-center border-2 border-blue-200"
                >
                  <div className="text-2xl font-bold text-gray-900">
                    <MathExpression expression={`\\frac{${equiv.split('/')[0]}}{${equiv.split('/')[1]}}`} displayMode={true} />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-4">
              All these fractions are equal to <strong>{fractionData.fraction}</strong> and have the same decimal value of <strong>{fractionData.decimal}</strong>.
            </p>
          </div>

          {/* Percentage */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Percent className="w-8 h-8 mr-3 text-green-600" />
              As a Percentage
            </h2>
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6 text-center border-2 border-green-500">
              <p className="text-xl text-gray-700 mb-2">
                <strong>{fractionData.fraction}</strong> equals:
              </p>
              <div className="text-5xl font-bold text-green-700">
                {fractionData.asPercentage}
              </div>
              <p className="text-gray-600 mt-3">
                To convert a decimal to a percentage, multiply by 100
              </p>
            </div>
          </div>

          {/* Common Uses */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Common Uses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {fractionData.commonUses.map((use, index) => (
                <div
                  key={index}
                  className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500"
                >
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{use}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Similar Fractions */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Practice with Similar Fractions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {fractionData.similarFractions.slice(0, 3).map((slug, index) => {
                const parts = slug.split('-');
                const displayFraction = `${parts[0]}/${parts[1]}`;

                return (
                  <Link
                    key={index}
                    href={`/fraction-to-decimal/${slug}`}
                    className="block bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border-2 border-transparent hover:border-blue-500 transition-all duration-200 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-600">Fraction {index + 1}</span>
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                      <MathExpression expression={`\\frac{${parts[0]}}{${parts[1]}}`} displayMode={true} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* SEO Content */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <article className="prose prose-gray max-w-none">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Convert {fractionData.fraction} to a Decimal
              </h2>

              <p className="text-gray-700 mb-4 text-base leading-relaxed">
                Converting the fraction <strong>{fractionData.fraction}</strong> to a decimal is a fundamental math skill that students learn in elementary and middle school. The process is straightforward: divide the numerator ({fractionData.numerator}) by the denominator ({fractionData.denominator}) to get the decimal value of <strong>{fractionData.decimal}</strong>.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">
                Understanding Fractions and Decimals
              </h3>
              <p className="text-gray-700 mb-4 text-base leading-relaxed">
                A fraction represents a part of a whole, with the numerator showing how many parts we have and the denominator showing how many equal parts make up the whole. When we convert <strong>{fractionData.fraction}</strong> to a decimal, we're expressing the same value in a different form. The decimal <strong>{fractionData.decimal}</strong> represents exactly the same quantity as the fraction <strong>{fractionData.fraction}</strong>.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">
                {fractionData.decimalType === 'terminating' ? 'Why This Decimal Terminates' : 'Why This Decimal Repeats'}
              </h3>
              {fractionData.decimalType === 'terminating' ? (
                <p className="text-gray-700 mb-4 text-base leading-relaxed">
                  The fraction <strong>{fractionData.fraction}</strong> results in a <strong>terminating decimal</strong> ({fractionData.decimal}). This happens when the denominator, after simplifying the fraction, has only factors of 2 and 5. These special denominators allow for exact decimal representations without any repeating digits.
                </p>
              ) : (
                <p className="text-gray-700 mb-4 text-base leading-relaxed">
                  The fraction <strong>{fractionData.fraction}</strong> results in a <strong>repeating decimal</strong> ({fractionData.repeatEnd}). This occurs when the denominator has prime factors other than 2 and 5. The digits in the decimal repeat in a pattern that continues infinitely, though we often round or use notation to indicate the repeating portion.
                </p>
              )}

              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">
                Practical Applications
              </h3>
              <p className="text-gray-700 mb-4 text-base leading-relaxed">
                Understanding that <strong>{fractionData.fraction} = {fractionData.decimal}</strong> is useful in many real-world situations. From calculating percentages to measuring ingredients in cooking, from understanding sports statistics to working with money, being comfortable converting between fractions and decimals is an essential life skill. When we know that <strong>{fractionData.fraction}</strong> equals <strong>{fractionData.percentage}</strong>, we can quickly make mental calculations and better understand proportions in everyday contexts.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">
                Tips for Memorization
              </h3>
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">✓</span>
                    <span>Practice the division regularly: {fractionData.numerator} ÷ {fractionData.denominator} = {fractionData.decimal}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">✓</span>
                    <span>Remember that {fractionData.fraction} equals {fractionData.percentage} as a percentage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">✓</span>
                    <span>Use equivalent fractions to check your understanding</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">✓</span>
                    <span>Relate it to real-world examples from the common uses section</span>
                  </li>
                </ul>
              </div>
            </article>
          </div>

          {/* Back Link */}
          <div className="text-center">
            <Link href="/fraction-to-decimal">
              <Button
                variant="outline"
                className="border-2 border-[#1A3D7C] text-[#1A3D7C] hover:bg-[#1A3D7C] hover:text-white px-8 py-6 text-lg font-bold rounded-xl"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to All Fractions
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Need Help with Fractions?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you master fractions, decimals, and all math concepts. Get personalized one-on-one guidance tailored to your learning style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tutoring/free-consultation">
                <Button className="bg-[#FFC857] hover:bg-[#FFC857]/90 text-[#1A3D7C] px-8 py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                  Book Free Demo Class
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#1A3D7C] px-8 py-6 text-lg font-bold rounded-xl transition-all duration-200"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
