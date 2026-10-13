'use client';

import Link from 'next/link';
import { Home, Calculator, TrendingUp, CheckCircle, BookOpen, ArrowRight, Repeat } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ConversionData } from '@/lib/conversions-data';

interface ConversionPageContentProps {
  data: ConversionData;
}

export default function ConversionPageContent({ data }: ConversionPageContentProps) {
  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Convert ${data.value} ${data.fromUnitFull} to ${data.toUnitFull}`,
    description: `Learn how to convert ${data.value} ${data.fromUnitFull} to ${data.toUnitFull}. The answer is ${data.resultFormatted} ${data.toUnit} with step-by-step conversion process.`,
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
    name: `How to Convert ${data.value} ${data.fromUnitFull} to ${data.toUnitFull}`,
    description: `Step-by-step guide to convert ${data.value} ${data.fromUnit} to ${data.toUnit}`,
    step: data.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.description,
      text: step.calculation || step.result || step.description,
    })),
    totalTime: 'PT1M',
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
        name: 'Unit Converter',
        item: 'https://www.thetutorbridge.com/convert',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${data.value} ${data.fromUnit} to ${data.toUnit}`,
        item: `https://www.thetutorbridge.com/convert/${data.slug}`,
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
        name: `How many ${data.toUnitFull} are in ${data.value} ${data.fromUnitFull}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${data.value} ${data.fromUnitFull} equals ${data.resultFormatted} ${data.toUnitFull}. This is calculated using the formula: ${data.formula}.`
        }
      },
      {
        '@type': 'Question',
        name: `How do you convert ${data.fromUnitFull} to ${data.toUnitFull}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `To convert ${data.fromUnitFull} to ${data.toUnitFull}, use the formula: ${data.formula}. For ${data.value} ${data.fromUnit}, the result is ${data.resultFormatted} ${data.toUnit}.`
        }
      },
      {
        '@type': 'Question',
        name: `What is the formula for converting ${data.fromUnit} to ${data.toUnit}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The formula for converting ${data.fromUnitFull} to ${data.toUnitFull} is: ${data.formula}. Simply multiply your value in ${data.fromUnit} by the conversion factor to get the equivalent in ${data.toUnit}.`
        }
      },
      {
        '@type': 'Question',
        name: `Is ${data.fromUnit} bigger than ${data.toUnit}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: parseFloat(data.resultFormatted.replace(/,/g, '')) > parseFloat(data.value)
            ? `No, ${data.fromUnit} is larger than ${data.toUnit}. That's why ${data.value} ${data.fromUnit} equals ${data.resultFormatted} ${data.toUnit} - you get more ${data.toUnit} because each unit is smaller.`
            : `Yes, ${data.fromUnit} is smaller than ${data.toUnit}. That's why ${data.value} ${data.fromUnit} equals ${data.resultFormatted} ${data.toUnit} - you get fewer ${data.toUnit} because each unit is larger.`
        }
      },
      {
        '@type': 'Question',
        name: `Why is unit conversion important?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Unit conversion is essential for international communication, scientific research, cooking, travel, construction, and many other everyday activities. Different countries use different measurement systems (metric vs imperial), so converting between units helps ensure accuracy and understanding across different contexts.'
        }
      }
    ]
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      length: 'from-[#2BAE66] to-[#1A3D7C]',
      weight: 'from-purple-600 to-pink-600',
      volume: 'from-blue-600 to-cyan-600',
      temperature: 'from-red-600 to-orange-600',
      area: 'from-green-600 to-teal-600',
      speed: 'from-yellow-600 to-orange-600',
    };
    return colors[category] || 'from-[#1A3D7C] to-[#2BAE66]';
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
            <Link href="/convert" className="text-[#1A3D7C] hover:text-[#2BAE66]">
              Unit Converter
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{data.value} {data.fromUnit} to {data.toUnit}</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header Section */}
        <div className={`bg-gradient-to-r ${getCategoryColor(data.category)} text-white py-12 px-4`}>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Repeat className="w-12 h-12 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-center">
                {data.value} {data.fromUnitFull} to {data.toUnitFull}
              </h1>
            </div>
            <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
              Convert {data.value} {data.fromUnit} to {data.toUnit} with step-by-step explanation
            </p>
          </div>
        </div>

        {/* Quick Answer */}
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className={`bg-gradient-to-r ${getCategoryColor(data.category)} rounded-2xl shadow-xl p-8 text-white mb-8`}>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <CheckCircle className="w-8 h-8 mr-3 text-[#FFC857]" />
              Quick Answer
            </h2>
            <div className="text-center py-6">
              <p className="text-xl mb-4">
                {data.value} {data.fromUnitFull} =
              </p>
              <p className="text-7xl font-bold text-[#FFC857]">{data.resultFormatted}</p>
              <p className="text-3xl mt-2">{data.toUnitFull}</p>
            </div>
          </div>

          {/* Reverse Conversion */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 mb-1">Looking for the reverse conversion?</p>
                <Link href={`/convert/${data.reverseConversion}`} className="text-blue-600 hover:text-blue-800 font-semibold flex items-center">
                  Convert {data.toUnit} to {data.fromUnit}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Step-by-Step Solution */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Step-by-Step Conversion
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

          {/* Conversion Formula */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-lg p-8 mb-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">
              Conversion Formula
            </h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold text-[#2BAE66] mb-3">General Formula</h3>
                <p className="text-2xl font-mono bg-gray-100 p-4 rounded-lg text-center">
                  {data.formula}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold text-[#2BAE66] mb-3">For This Conversion</h3>
                <p className="text-xl font-mono bg-gray-100 p-4 rounded-lg text-center">
                  {data.value} {data.fromUnit} = {data.resultFormatted} {data.toUnit}
                </p>
              </div>
            </div>
          </div>

          {/* Real-World Examples */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-[#2BAE66]" />
              Real-World Applications
            </h2>
            <div className="space-y-4">
              {data.commonUses.map((example, index) => (
                <div key={index} className="flex items-start bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl border-l-4 border-[#2BAE66]">
                  <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 flex-shrink-0 mt-1" />
                  <p className="text-gray-800 leading-relaxed">{example}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Conversions */}
          {data.relatedConversions.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                <BookOpen className="w-8 h-8 mr-3 text-[#2BAE66]" />
                Related {data.category.charAt(0).toUpperCase() + data.category.slice(1)} Conversions
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {data.relatedConversions.map((slug, index) => {
                  const match = slug.match(/^([0-9.]+)-(.+)-to-(.+)$/);
                  if (!match) return null;
                  const [, value, from, to] = match;
                  return (
                    <Link
                      key={index}
                      href={`/convert/${slug}`}
                      className="block bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl hover:shadow-lg transition-all border-2 border-transparent hover:border-[#2BAE66]"
                    >
                      <p className="text-xl font-semibold text-[#1A3D7C] flex items-center">
                        Convert {value} {from} to {to}
                        <ArrowRight className="w-5 h-5 ml-auto text-[#2BAE66]" />
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Common Mistakes to Avoid */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <span className="text-red-500 mr-3">⚠️</span>
              Common Mistakes to Avoid
            </h2>
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
                <h3 className="font-bold text-red-800 mb-2">Using the Wrong Conversion Factor</h3>
                <p className="text-gray-700">
                  Always double-check that you're using the correct conversion factor for {data.fromUnit} to {data.toUnit}.
                  The formula is: <strong>{data.formula}</strong>. Using a similar but incorrect factor can lead to significant errors.
                </p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
                <h3 className="font-bold text-red-800 mb-2">Multiplying When You Should Divide (or Vice Versa)</h3>
                <p className="text-gray-700">
                  When converting to larger units, divide. When converting to smaller units, multiply.
                  Since {data.resultFormatted} {data.toUnit} = {data.value} {data.fromUnit},
                  {parseFloat(data.resultFormatted.replace(/,/g, '')) > parseFloat(data.value)
                    ? ` you multiply because ${data.toUnit} is a smaller unit than ${data.fromUnit}.`
                    : ` you divide because ${data.toUnit} is a larger unit than ${data.fromUnit}.`}
                </p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
                <h3 className="font-bold text-red-800 mb-2">Forgetting to Include All Decimal Places</h3>
                <p className="text-gray-700">
                  When precision matters, ensure you keep enough decimal places during your calculation.
                  Rounding too early can lead to inaccurate results, especially when the converted value is used in further calculations.
                </p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
                <h3 className="font-bold text-red-800 mb-2">Confusing Similar Units</h3>
                <p className="text-gray-700">
                  Be careful not to confuse {data.fromUnit} with similar-sounding units. Different measurement systems
                  (metric, imperial, US customary) sometimes have units with similar names but different values.
                </p>
              </div>
            </div>
          </div>

          {/* Tips for Accurate Conversions */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <span className="text-green-500 mr-3">💡</span>
              Tips for Accurate Conversions
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
                <h3 className="font-bold text-green-800 mb-2">Memorize Common Conversions</h3>
                <p className="text-gray-700">
                  Learning frequently used conversion factors by heart saves time and reduces errors.
                  Practice converting {data.fromUnit} to {data.toUnit} until it becomes second nature.
                </p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
                <h3 className="font-bold text-green-800 mb-2">Use Estimation to Check</h3>
                <p className="text-gray-700">
                  Before accepting your answer, estimate whether it makes sense.
                  {data.value} {data.fromUnit} should logically convert to approximately {data.resultFormatted} {data.toUnit}.
                </p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
                <h3 className="font-bold text-green-800 mb-2">Show Your Work</h3>
                <p className="text-gray-700">
                  Write out each step of your conversion. This makes it easier to spot errors
                  and helps others understand your calculation process.
                </p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
                <h3 className="font-bold text-green-800 mb-2">Understand the Relationship</h3>
                <p className="text-gray-700">
                  Don't just memorize—understand why {data.fromUnitFull} and {data.toUnitFull} relate
                  the way they do. This deeper understanding helps prevent mistakes.
                </p>
              </div>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="group bg-gray-50 rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-gray-900">
                  How many {data.toUnitFull} are in {data.value} {data.fromUnitFull}?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-5 text-gray-700">
                  {data.value} {data.fromUnitFull} equals <strong>{data.resultFormatted} {data.toUnitFull}</strong>.
                  This is calculated using the formula: {data.formula}.
                </div>
              </details>
              <details className="group bg-gray-50 rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-gray-900">
                  How do you convert {data.fromUnit} to {data.toUnit}?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-5 text-gray-700">
                  To convert {data.fromUnitFull} to {data.toUnitFull}, use this formula: <strong>{data.formula}</strong>.
                  Simply apply this formula to your value. For example, {data.value} {data.fromUnit} = {data.resultFormatted} {data.toUnit}.
                </div>
              </details>
              <details className="group bg-gray-50 rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-gray-900">
                  What is the conversion formula for {data.fromUnit} to {data.toUnit}?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-5 text-gray-700">
                  The formula for converting {data.fromUnitFull} to {data.toUnitFull} is: <strong>{data.formula}</strong>.
                  This formula works for any value in {data.fromUnit} that you need to convert to {data.toUnit}.
                </div>
              </details>
              <details className="group bg-gray-50 rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-gray-900">
                  Which is larger: {data.fromUnit} or {data.toUnit}?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-5 text-gray-700">
                  {parseFloat(data.resultFormatted.replace(/,/g, '')) > parseFloat(data.value)
                    ? `${data.fromUnitFull} is larger than ${data.toUnitFull}. That's why ${data.value} ${data.fromUnit} equals ${data.resultFormatted} ${data.toUnit} - you get more ${data.toUnit} because each unit is smaller.`
                    : `${data.toUnitFull} is larger than ${data.fromUnitFull}. That's why ${data.value} ${data.fromUnit} equals ${data.resultFormatted} ${data.toUnit} - you get fewer ${data.toUnit} because each unit is larger.`}
                </div>
              </details>
              <details className="group bg-gray-50 rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-gray-900">
                  Why do we need different units of measurement?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-5 text-gray-700">
                  Different units exist for historical and practical reasons. The metric system (used by most countries)
                  is based on powers of 10, making conversions easier. The imperial/US customary system developed
                  historically in Britain and America. Having both systems means we need conversion skills for
                  international communication, travel, science, and everyday tasks.
                </div>
              </details>
              <details className="group bg-gray-50 rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-gray-900">
                  Can I convert {data.toUnit} back to {data.fromUnit}?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-5 text-gray-700">
                  Yes! To convert {data.resultFormatted} {data.toUnit} back to {data.fromUnit}, you would reverse
                  the formula. Check out our <a href={`/convert/${data.reverseConversion}`} className="text-blue-600 hover:underline">
                  {data.toUnit} to {data.fromUnit} converter</a> for the reverse calculation.
                </div>
              </details>
            </div>
          </div>

          {/* Educational Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">
              Why Unit Conversions Matter
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Understanding unit conversions is essential in today's interconnected world. Whether you're traveling internationally, following a recipe from another country, working on a science project, or shopping online, you'll frequently encounter different measurement systems.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl">
                  <h3 className="font-bold text-xl text-[#1A3D7C] mb-3">International Travel</h3>
                  <p className="text-gray-700">
                    Navigate foreign countries with confidence by converting distances, weights, and temperatures between metric and imperial systems.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                  <h3 className="font-bold text-xl text-[#1A3D7C] mb-3">Cooking & Recipes</h3>
                  <p className="text-gray-700">
                    Follow recipes from around the world by accurately converting ingredients between different measurement systems.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl">
                  <h3 className="font-bold text-xl text-[#1A3D7C] mb-3">Science & Education</h3>
                  <p className="text-gray-700">
                    Master scientific calculations and homework assignments by understanding how different units relate to each other.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl">
                  <h3 className="font-bold text-xl text-[#1A3D7C] mb-3">Construction & DIY</h3>
                  <p className="text-gray-700">
                    Measure materials accurately and work with international specifications in home improvement projects.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-2xl shadow-xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help with Math & Science?</h2>
            <p className="text-xl mb-6 text-blue-100">
              Our expert tutors can help you master unit conversions, measurement systems, and more!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tutoring/free-consultation">
                <button className="bg-[#FFC857] text-[#1A3D7C] px-8 py-4 rounded-xl font-bold text-lg hover:bg-white transition-colors">
                  Book Free Consultation
                </button>
              </Link>
              <Link href="/convert">
                <button className="bg-white/10 border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#1A3D7C] transition-colors">
                  More Unit Conversions
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
