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
