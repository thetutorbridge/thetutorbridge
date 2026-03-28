'use client';

import Link from 'next/link';
import { Home, Calculator, TrendingUp, CheckCircle, BookOpen, ArrowRight, Percent } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { PercentageData } from '@/lib/percentage-data';

interface PercentagePageContentProps {
  data: PercentageData;
}

export default function PercentagePageContent({ data }: PercentagePageContentProps) {
  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `What is ${data.percent}% of ${data.of}?`,
    description: `Learn how to calculate ${data.percent}% of ${data.of}. The answer is ${data.resultFormatted} with step-by-step solutions and real-world examples.`,
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
  };

  // HowTo Schema for SEO
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Calculate ${data.percent}% of ${data.of}`,
    description: `Step-by-step guide to calculate ${data.percent} percent of ${data.of}`,
    step: data.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.description,
      text: step.calculation || step.result || step.description,
    })),
    totalTime: 'PT2M',
    tool: [{
      '@type': 'HowToTool',
      name: 'Calculator (optional)',
    }],
    supply: [],
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.thetutorbridge.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Percentage Calculator',
        item: 'https://www.thetutorbridge.com/percentage',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${data.percent}% of ${data.of}`,
        item: `https://www.thetutorbridge.com/percentage/${data.slug}`,
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
            <Link href="/percentage" className="text-[#1A3D7C] hover:text-[#2BAE66]">
              Percentage Calculator
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{data.percent}% of {data.of}</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Percent className="w-12 h-12 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-center">
                What is {data.percent}% of {data.of}?
              </h1>
            </div>
          </div>
        </div>

        {/* Quick Answer */}
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-gradient-to-r from-[#2BAE66] to-[#1A3D7C] rounded-2xl shadow-xl p-8 text-white mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <CheckCircle className="w-8 h-8 mr-3 text-[#FFC857]" />
              Quick Answer
            </h2>
            <div className="text-center py-6">
              <p className="text-xl mb-4">
                {data.percent}% of {data.of} is:
              </p>
              <p className="text-7xl font-bold text-[#FFC857]">{data.resultFormatted}</p>
            </div>
          </div>

          {/* Step-by-Step Solution */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Step-by-Step Solution
            </h2>

            <div className="space-y-6">
              {data.steps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.description}
                    </h3>
                    {step.calculation && (
                      <p className="text-lg text-gray-700 bg-gray-50 p-4 rounded-lg font-mono">
                        {step.calculation}
                      </p>
                    )}
                    {step.result && !step.calculation && (
                      <p className="text-lg font-bold text-[#2BAE66]">
                        {step.result}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Two Methods */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#2BAE66]">
              <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">Method 1: Decimal Method</h3>
              <p className="text-gray-700 leading-relaxed">{data.method1}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-500">
              <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">Method 2: Fraction Method</h3>
              <p className="text-gray-700 leading-relaxed">{data.method2}</p>
            </div>
          </div>

          {/* Real-World Examples */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Real-World Examples
            </h2>
            <div className="space-y-4">
              {data.realWorldExamples.map((example, index) => (
                <div key={index} className="flex items-start bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl border-l-4 border-[#2BAE66]">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 flex-shrink-0 mt-1" />
                  <p className="text-gray-800 leading-relaxed">{example}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Formula Explanation */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-lg p-8 mb-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">
              Understanding the Percentage Formula
            </h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold text-[#2BAE66] mb-3">General Formula</h3>
                <p className="text-2xl font-mono bg-gray-100 p-4 rounded-lg text-center">
                  (Percentage ÷ 100) × Number = Result
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold text-[#2BAE66] mb-3">For This Problem</h3>
                <p className="text-2xl font-mono bg-gray-100 p-4 rounded-lg text-center">
                  ({data.percent} ÷ 100) × {data.of} = {data.resultFormatted}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold text-[#2BAE66] mb-3">Key Concepts</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#2BAE66] mr-2">•</span>
                    <span>A percentage is a fraction out of 100</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#2BAE66] mr-2">•</span>
                    <span>Converting to decimal makes multiplication easier</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#2BAE66] mr-2">•</span>
                    <span>{data.percent}% means "{data.percent} out of every 100"</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Calculations */}
          {data.relatedCalculations.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                <BookOpen className="w-8 h-8 mr-3 text-[#2BAE66]" />
                Practice with Similar Problems
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {data.relatedCalculations.map((slug, index) => {
                  const match = slug.match(/^(\d+)-percent-of-(\d+)$/);
                  if (!match) return null;
                  const [, percent, of] = match;
                  return (
                    <Link
                      key={index}
                      href={`/percentage/${slug}`}
                      className="block bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl hover:shadow-lg transition-all border-2 border-transparent hover:border-[#2BAE66]"
                    >
                      <p className="text-xl font-semibold text-[#1A3D7C] flex items-center">
                        What is {percent}% of {of}?
                        <ArrowRight className="w-5 h-5 ml-auto text-[#2BAE66]" />
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Educational Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">
              Why Learn Percentage Calculations?
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Understanding how to calculate percentages is an essential life skill that you'll use constantly in everyday situations. From calculating discounts while shopping to understanding test scores, tips at restaurants, tax rates, and investment returns - percentages are everywhere.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl">
                  <h3 className="font-bold text-xl text-[#1A3D7C] mb-3">Shopping & Finance</h3>
                  <p className="text-gray-700">
                    Calculate discounts, sales tax, tips, interest rates, and compare prices to make smart financial decisions.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                  <h3 className="font-bold text-xl text-[#1A3D7C] mb-3">School & Testing</h3>
                  <p className="text-gray-700">
                    Understand test scores, grade calculations, attendance rates, and academic performance metrics.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl">
                  <h3 className="font-bold text-xl text-[#1A3D7C] mb-3">Data & Statistics</h3>
                  <p className="text-gray-700">
                    Interpret survey results, population data, growth rates, and statistical information in news and research.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl">
                  <h3 className="font-bold text-xl text-[#1A3D7C] mb-3">Health & Fitness</h3>
                  <p className="text-gray-700">
                    Calculate nutritional information, body composition, workout intensity, and health metrics.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-2xl shadow-xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help with Math?</h2>
            <p className="text-xl mb-6 text-blue-100">
              Our expert tutors can help you master percentages, fractions, algebra, and more!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tutoring/free-consultation">
                <button className="bg-[#FFC857] text-[#1A3D7C] px-8 py-4 rounded-xl font-bold text-lg hover:bg-white transition-colors">
                  Book Free Consultation
                </button>
              </Link>
              <Link href="/percentage">
                <button className="bg-white/10 border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#1A3D7C] transition-colors">
                  More Percentage Calculations
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
