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

  // FAQ Schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How do you calculate ${data.percent}% of ${data.of}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Multiply ${data.of} by ${data.percent}/100 (or ${(data.percent / 100).toFixed(4)}). The calculation is: ${data.of} × ${(data.percent / 100).toFixed(4)} = ${data.resultFormatted}.`
        }
      },
      {
        '@type': 'Question',
        name: 'What is the formula for finding a percentage of a number?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The formula is: (Percentage ÷ 100) × Number = Result. For this problem: ${data.of} × (${data.percent}/100) = ${data.resultFormatted}.`
        }
      },
      {
        '@type': 'Question',
        name: `How do you convert ${data.percent}% to a decimal?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `To convert any percentage to a decimal, divide by 100. ${data.percent}% = ${data.percent} ÷ 100 = ${(data.percent / 100).toFixed(4)}.`
        }
      },
      {
        '@type': 'Question',
        name: `What is ${data.percent}% as a fraction?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${data.percent}% as a fraction is ${data.percent}/100. This represents ${data.percent} parts out of 100 equal parts.`
        }
      },
      {
        '@type': 'Question',
        name: 'Where are percentage calculations used in real life?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Percentages are used in calculating discounts, tips at restaurants, tax calculations, interest rates on loans and savings, test scores, nutritional information, and business metrics like profit margins and growth rates.'
        }
      }
    ]
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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

          {/* Mathematical Background */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">
              The Mathematics Behind Percentages
            </h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                The word "percent" comes from the Latin "per centum," meaning "by the hundred." A percentage is simply a way of expressing a number as a fraction of 100. When we say {data.percent}%, we mean {data.percent} parts out of every 100 parts.
              </p>
              <p className="mb-4">
                The concept of percentages has been used for centuries because base-100 calculations are intuitive for humans (likely because we have 10 fingers, making base-10 and base-100 systems natural). Ancient Romans used fractions with denominators of 100, and by the 15th century, the % symbol emerged in Italian manuscripts.
              </p>
              <p className="mb-4">
                There are three main types of percentage problems:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong>Finding a percentage of a number</strong> (like this problem: What is {data.percent}% of {data.of}?)</li>
                <li><strong>Finding what percentage one number is of another</strong> (e.g., What percentage is 25 of 50?)</li>
                <li><strong>Finding the whole when given a part and percentage</strong> (e.g., 30 is 15% of what number?)</li>
              </ul>
              <p>
                Mastering these three types of percentage problems will help you handle virtually any percentage calculation you encounter in daily life, academics, or professional work.
              </p>
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="bg-red-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-red-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-red-600 mr-2">⚠️</span> Common Mistakes to Avoid
            </h2>
            <div className="space-y-4">
              <div className="flex items-start bg-white p-4 rounded-lg">
                <span className="text-red-600 font-bold mr-3">✗</span>
                <div>
                  <p className="font-semibold text-gray-900">Moving the decimal point incorrectly</p>
                  <p className="text-gray-600 text-sm">When converting {data.percent}% to a decimal, divide by 100 (move decimal 2 places left). {data.percent}% = {(data.percent / 100).toFixed(4)}. Many students move it only one place.</p>
                </div>
              </div>
              <div className="flex items-start bg-white p-4 rounded-lg">
                <span className="text-red-600 font-bold mr-3">✗</span>
                <div>
                  <p className="font-semibold text-gray-900">Confusing percentage increase/decrease with the percentage of</p>
                  <p className="text-gray-600 text-sm">"A {data.percent}% increase" means adding {data.percent}% to the original. "What is {data.percent}% of something" is just {data.percent}% × that number.</p>
                </div>
              </div>
              <div className="flex items-start bg-white p-4 rounded-lg">
                <span className="text-red-600 font-bold mr-3">✗</span>
                <div>
                  <p className="font-semibold text-gray-900">Forgetting that percentages over 100 are valid</p>
                  <p className="text-gray-600 text-sm">You can have percentages greater than 100%. 200% of 50 = 100. This represents more than the whole, which is common when discussing growth or multiples.</p>
                </div>
              </div>
              <div className="flex items-start bg-white p-4 rounded-lg">
                <span className="text-red-600 font-bold mr-3">✗</span>
                <div>
                  <p className="font-semibold text-gray-900">Not checking if the answer makes sense</p>
                  <p className="text-gray-600 text-sm">If {data.percent}% is less than 50%, your answer should be less than half of {data.of}. If more than 50%, it should be more than half. Quick checks prevent big errors.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tips for Success */}
          <div className="bg-green-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-green-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-green-600 mr-2">💡</span> Tips for Mastering Percentages
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Know Your Benchmarks</h3>
                <p className="text-gray-600 text-sm">Memorize that 10% is ÷10, 25% is ÷4, 50% is ÷2, and 1% is ÷100. These benchmarks make mental math easier.</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Use the Commutative Property</h3>
                <p className="text-gray-600 text-sm">{data.percent}% of {data.of} equals {data.of}% of {data.percent}. Sometimes one calculation is easier! Try both ways.</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Break Down Complex Percentages</h3>
                <p className="text-gray-600 text-sm">Calculate 15% as 10% + 5%. Calculate 35% as 25% + 10%. Breaking down makes calculations manageable.</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Convert to Fractions When Helpful</h3>
                <p className="text-gray-600 text-sm">25% = ¼, 20% = ⅕, 50% = ½. Sometimes fraction multiplication is easier than decimal multiplication.</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Estimate First</h3>
                <p className="text-gray-600 text-sm">Before calculating {data.percent}% of {data.of}, estimate: Is {data.percent}% close to 10%, 25%, 50%? This helps verify your final answer.</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Practice with Real Prices</h3>
                <p className="text-gray-600 text-sm">Calculate discounts while shopping. Figure out tips mentally at restaurants. Real practice builds lasting skills.</p>
              </div>
            </div>
          </div>

          {/* FAQ Section with Schema */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <span className="mr-2">❓</span> Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">How do you calculate {data.percent}% of {data.of}?</h3>
                <p className="text-gray-600">Multiply {data.of} by {data.percent}/100 (or {(data.percent / 100).toFixed(4)}). The calculation is: {data.of} × {(data.percent / 100).toFixed(4)} = {data.resultFormatted}. You can also use the fraction method: {data.of} × {data.percent}/100.</p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">What is the formula for finding a percentage of a number?</h3>
                <p className="text-gray-600">The formula is: (Percentage ÷ 100) × Number = Result. Or equivalently: Number × (Percentage/100) = Result. For this problem: {data.of} × ({data.percent}/100) = {data.resultFormatted}.</p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">How do you convert {data.percent}% to a decimal?</h3>
                <p className="text-gray-600">To convert any percentage to a decimal, divide by 100 (or move the decimal point two places to the left). {data.percent}% = {data.percent} ÷ 100 = {(data.percent / 100).toFixed(4)}.</p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">What is {data.percent}% as a fraction?</h3>
                <p className="text-gray-600">{data.percent}% as a fraction is {data.percent}/100. This can potentially be simplified depending on the numbers. The fraction represents {data.percent} parts out of 100 equal parts.</p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">How can I check if my percentage calculation is correct?</h3>
                <p className="text-gray-600">Use estimation: If the percentage is less than 50%, your answer should be less than half the original number. If it's 100%, your answer equals the original. For {data.percent}% of {data.of}, since {data.percent}% is {data.percent > 50 ? 'more' : 'less'} than half, {data.resultFormatted} should be {data.percent > 50 ? 'more' : 'less'} than {data.of / 2}.</p>
              </div>

              <div className="pb-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Where are percentage calculations used in real life?</h3>
                <p className="text-gray-600">Percentages are used in calculating discounts (e.g., {data.percent}% off sale), tips at restaurants, tax calculations, interest rates on loans and savings, test scores and grades, nutritional information on food labels, statistical data, and business metrics like profit margins and growth rates.</p>
              </div>
            </div>
          </div>

          {/* Additional Practice */}
          <div className="bg-blue-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Build Your Percentage Skills</h2>
            <p className="text-gray-700 mb-4">
              To become confident with percentages, practice these types of problems:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Calculate tips (15%, 18%, 20%) on restaurant bills</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Find sale prices with various discount percentages</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Convert test scores to percentages and letter grades</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Calculate percentage increase and decrease in prices or values</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Work with compound percentages (e.g., 20% off, then additional 10% off)</span>
              </li>
            </ul>
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
