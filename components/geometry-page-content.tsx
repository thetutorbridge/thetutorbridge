'use client';

import Link from 'next/link';
import { Home, Calculator, Square, Circle, Box, Maximize2, BookOpen, ArrowRight, Check } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { GeometryData } from '@/lib/geometry-data';

interface GeometryPageContentProps {
  data: GeometryData;
}

export default function GeometryPageContent({ data }: GeometryPageContentProps) {
  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${data.formulaName}: ${Object.entries(data.parameters).map(([k, v]) => `${k} ${v}`).join(', ')}`,
    description: `Calculate ${data.formulaName.toLowerCase()} with ${Object.entries(data.parameters).map(([k, v]) => `${k}=${v}`).join(', ')}. Result: ${data.resultFormatted} ${data.unit}. Step-by-step solution with formula ${data.formula}.`,
    author: {
      '@type': 'Organization',
      name: 'The Tutor Bridge',
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Tutor Bridge',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.thetutorbridge.com/logo.png',
      },
    },
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString(),
  };

  // HowTo Schema for SEO
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Calculate ${data.formulaName}`,
    description: `Step-by-step guide to calculate ${data.formulaName.toLowerCase()} with ${Object.entries(data.parameters).map(([k, v]) => `${k}=${v}`).join(', ')}`,
    step: data.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.description,
      text: step.calculation || step.result || step.description,
    })),
    totalTime: 'PT3M',
    tool: {
      '@type': 'HowToTool',
      name: 'Geometry Calculator',
    },
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
        name: 'Geometry Calculator',
        item: 'https://www.thetutorbridge.com/geometry',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: data.formulaName,
        item: `https://www.thetutorbridge.com/geometry/${data.slug}`,
      },
    ],
  };

  const getCategoryIcon = () => {
    if (data.category === 'area') return <Square className="w-6 h-6 text-[#2BAE66]" />;
    if (data.category === 'perimeter') return <Maximize2 className="w-6 h-6 text-purple-600" />;
    if (data.category === 'volume') return <Box className="w-6 h-6 text-blue-600" />;
    if (data.category === 'surface-area') return <Circle className="w-6 h-6 text-green-600" />;
    return <Calculator className="w-6 h-6 text-[#1A3D7C]" />;
  };

  const getCategoryColor = () => {
    if (data.category === 'area') return 'text-[#2BAE66] bg-green-50 border-green-200';
    if (data.category === 'perimeter') return 'text-purple-600 bg-purple-50 border-purple-200';
    if (data.category === 'volume') return 'text-blue-600 bg-blue-50 border-blue-200';
    if (data.category === 'surface-area') return 'text-green-600 bg-green-50 border-green-200';
    return 'text-[#1A3D7C] bg-blue-50 border-blue-200';
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
            <Link href="/geometry" className="text-[#1A3D7C] hover:text-[#2BAE66]">
              Geometry Calculator
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{data.formulaName}</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center mb-4">
              {getCategoryIcon()}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 ml-3">
                {data.formulaName}
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              {Object.entries(data.parameters).map(([key, val], idx, arr) => (
                <span key={key}>
                  <span className="font-semibold text-[#1A3D7C]">{key}</span> = {val}
                  {idx < arr.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          </div>

          {/* Quick Answer */}
          <div className={`bg-gradient-to-br ${data.category === 'area' ? 'from-green-50 to-teal-50' : data.category === 'perimeter' ? 'from-purple-50 to-pink-50' : data.category === 'volume' ? 'from-blue-50 to-cyan-50' : 'from-green-50 to-emerald-50'} rounded-2xl shadow-xl p-8 mb-8 border-2 ${getCategoryColor()}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg text-gray-600 mb-2">Answer:</p>
                <p className="text-5xl font-bold ${getCategoryColor()}">
                  {data.resultFormatted} {data.unit}
                </p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-full p-6">
                <Check className="w-16 h-16 text-green-600" />
              </div>
            </div>
          </div>

          {/* Diagram Description */}
          {data.diagram && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Square className="w-6 h-6 mr-2 text-[#2BAE66]" />
                Shape Visualization
              </h2>
              <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                <p className="text-gray-700 text-lg leading-relaxed">{data.diagram}</p>
              </div>
            </div>
          )}

          {/* Step-by-Step Solution */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-[#2BAE66]" />
              Step-by-Step Solution
            </h2>
            <div className="space-y-4">
              {data.steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-l-4 border-[#2BAE66]"
                >
                  <div className="flex items-start">
                    <div className="bg-[#2BAE66] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-semibold text-lg mb-2">{step.description}</p>
                      {step.calculation && (
                        <div className="bg-white rounded-lg p-4 font-mono text-[#1A3D7C] border-2 border-blue-200">
                          {step.calculation}
                        </div>
                      )}
                      {step.result && !step.calculation && (
                        <div className="bg-green-50 rounded-lg p-4 font-semibold text-green-700 border-2 border-green-200">
                          {step.result}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formula Section */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-purple-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-6 h-6 mr-2 text-purple-600" />
              Formula Used
            </h2>
            <div className="bg-white rounded-xl p-6 border-2 border-purple-300">
              <p className="text-3xl font-bold text-center text-purple-700 font-mono">
                {data.formula}
              </p>
            </div>
            <div className="mt-4 text-gray-700">
              <p className="text-lg">
                This formula calculates the <strong>{data.category}</strong> of a <strong>{data.shape}</strong>.
              </p>
            </div>
          </div>

          {/* Real-World Applications */}
          {data.realWorldExamples.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Box className="w-6 h-6 mr-2 text-blue-600" />
                Real-World Applications
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {data.realWorldExamples.map((example, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-5 border-2 border-blue-200"
                  >
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-1">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 text-base leading-relaxed">{example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Problems */}
          {data.relatedProblems.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <ArrowRight className="w-6 h-6 mr-2 text-[#2BAE66]" />
                Related Geometry Problems
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.relatedProblems.map((slug, index) => (
                  <Link
                    key={index}
                    href={`/geometry/${slug}`}
                    className="block bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-5 hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-[#2BAE66]"
                  >
                    <p className="text-gray-700 text-sm font-medium">
                      {slug.replace(/-/g, ' ').replace(/\//g, ' - ')}
                    </p>
                    <div className="flex items-center mt-2 text-[#2BAE66]">
                      <span className="text-xs font-semibold">Solve this →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Educational Content */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-yellow-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Understanding {data.shape.charAt(0).toUpperCase() + data.shape.slice(1)} {data.category.replace('-', ' ').charAt(0).toUpperCase() + data.category.replace('-', ' ').slice(1)}
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="text-lg leading-relaxed">
                The <strong>{data.category.replace('-', ' ')}</strong> of a <strong>{data.shape}</strong> is a fundamental concept in geometry.
                {data.category === 'area' && ' Area measures the amount of space inside a 2D shape, typically expressed in square units.'}
                {data.category === 'perimeter' && ' Perimeter measures the total distance around the outside of a 2D shape, expressed in linear units.'}
                {data.category === 'volume' && ' Volume measures the amount of space inside a 3D object, expressed in cubic units.'}
                {data.category === 'surface-area' && ' Surface area measures the total area of all surfaces of a 3D object, expressed in square units.'}
              </p>
              <p className="text-base leading-relaxed">
                By using the formula <span className="font-mono bg-white px-2 py-1 rounded border border-yellow-300">{data.formula}</span>,
                we can quickly and accurately calculate the {data.category.replace('-', ' ')} for any {data.shape} when we know the required measurements.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-2xl shadow-xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Need More Help with Geometry?</h2>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Get personalized 1-on-1 tutoring with expert geometry tutors. Master formulas, solve complex problems, and ace your exams!
            </p>
            <Link
              href="/"
              className="inline-flex items-center bg-white text-[#1A3D7C] px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg"
            >
              Find Your Geometry Tutor
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
