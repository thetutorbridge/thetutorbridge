'use client';

import Link from 'next/link';
import { Home, BookOpen, Calculator, AlertCircle, TrendingUp, ArrowRight, CheckCircle, Lightbulb, History, Briefcase } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { FormulaData } from '@/lib/formulas-data';

interface FormulaPageContentProps {
  data: FormulaData;
}

export default function FormulaPageContent({ data }: FormulaPageContentProps) {
  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${data.name} Formula`,
    description: data.description,
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
    name: `How to Use ${data.name}`,
    description: `Step-by-step guide to understanding and applying ${data.name.toLowerCase()}`,
    step: data.examples.flatMap((example, exampleIdx) =>
      example.steps.map((step, stepIdx) => ({
        '@type': 'HowToStep',
        position: exampleIdx * 10 + stepIdx + 1,
        name: `Example ${exampleIdx + 1}: ${step}`,
        text: step,
      }))
    ),
    totalTime: 'PT5M',
    tool: {
      '@type': 'HowToTool',
      name: 'Calculator (optional)',
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
        name: 'Math Formulas',
        item: 'https://www.thetutorbridge.com/formulas',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: data.name,
        item: `https://www.thetutorbridge.com/formulas/${data.slug}`,
      },
    ],
  };

  const getDifficultyColor = () => {
    if (data.difficulty === 'beginner') return 'bg-green-100 text-green-700 border-green-300';
    if (data.difficulty === 'intermediate') return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    return 'bg-red-100 text-red-700 border-red-300';
  };

  const getCategoryColor = () => {
    if (data.category === 'algebra') return 'from-blue-500 to-cyan-500';
    if (data.category === 'geometry') return 'from-green-500 to-teal-500';
    if (data.category === 'trigonometry') return 'from-purple-500 to-pink-500';
    if (data.category === 'calculus') return 'from-orange-500 to-red-500';
    if (data.category === 'statistics') return 'from-indigo-500 to-blue-500';
    if (data.category === 'physics') return 'from-yellow-500 to-orange-500';
    if (data.category === 'chemistry') return 'from-pink-500 to-rose-500';
    return 'from-gray-500 to-slate-500';
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
            <Link href="/formulas" className="text-[#1A3D7C] hover:text-[#2BAE66]">
              Math Formulas
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/formulas" className="text-[#1A3D7C] hover:text-[#2BAE66] capitalize">
              {data.category}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{data.name}</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                  {data.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold border-2 ${getDifficultyColor()}`}>
                    {data.difficulty}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-700 border-2 border-gray-300 capitalize">
                    {data.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-50 text-gray-600 border-2 border-gray-200 capitalize">
                    {data.subcategory.replace('-', ' ')}
                  </span>
                </div>
              </div>
              <BookOpen className="w-12 h-12 text-[#2BAE66]" />
            </div>
            <p className="text-xl text-gray-600 mt-4">
              {data.description}
            </p>
          </div>

          {/* Formula Display */}
          <div className={`bg-gradient-to-r ${getCategoryColor()} rounded-2xl shadow-xl p-8 mb-8 text-white`}>
            <div className="flex items-center mb-4">
              <Calculator className="w-8 h-8 mr-3" />
              <h2 className="text-2xl font-bold">The Formula</h2>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border-2 border-white/30">
              <p className="text-4xl font-bold text-center font-mono">
                {data.formula}
              </p>
            </div>
          </div>

          {/* Variables Explanation */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-[#2BAE66]" />
              Variables & Symbols
            </h2>
            <div className="space-y-3">
              {data.variables.map((variable, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border-l-4 border-[#2BAE66]"
                >
                  <div className="flex items-start">
                    <span className="font-mono text-2xl font-bold text-[#1A3D7C] mr-4 min-w-[60px]">
                      {variable.symbol}
                    </span>
                    <div>
                      <p className="text-gray-900 font-semibold text-lg">{variable.meaning}</p>
                      {variable.unit && (
                        <p className="text-gray-600 text-sm mt-1">Unit: {variable.unit}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* When to Use */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-green-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Lightbulb className="w-6 h-6 mr-2 text-green-600" />
              When to Use This Formula
            </h2>
            <ul className="space-y-3">
              {data.whenToUse.map((use, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">{use}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Examples */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calculator className="w-6 h-6 mr-2 text-[#2BAE66]" />
              Worked Examples
            </h2>
            <div className="space-y-6">
              {data.examples.map((example, exampleIdx) => (
                <div key={exampleIdx} className="border-2 border-gray-200 rounded-xl p-6 bg-gray-50">
                  <div className="mb-4">
                    <span className="inline-block bg-[#2BAE66] text-white px-3 py-1 rounded-full text-sm font-bold mb-3">
                      Example {exampleIdx + 1}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">Problem:</h3>
                    <p className="text-lg text-gray-700 mt-2">{example.problem}</p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-green-700 flex items-center mb-2">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Solution: {example.solution}
                    </h3>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Step-by-Step:</h3>
                    <div className="space-y-3">
                      {example.steps.map((step, stepIdx) => (
                        <div key={stepIdx} className="flex items-start bg-white rounded-lg p-4 border-2 border-blue-200">
                          <div className="bg-[#1A3D7C] text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">
                            {stepIdx + 1}
                          </div>
                          <p className="text-gray-700">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes */}
          {data.commonMistakes.length > 0 && (
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-red-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <AlertCircle className="w-6 h-6 mr-2 text-red-600" />
                Common Mistakes to Avoid
              </h2>
              <ul className="space-y-3">
                {data.commonMistakes.map((mistake, index) => (
                  <li key={index} className="flex items-start bg-white rounded-lg p-4">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Historical Context */}
          {data.historicalContext && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-purple-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <History className="w-6 h-6 mr-2 text-purple-600" />
                Historical Context
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {data.historicalContext}
              </p>
            </div>
          )}

          {/* Real-World Applications */}
          {data.realWorldApplications.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Briefcase className="w-6 h-6 mr-2 text-blue-600" />
                Real-World Applications
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {data.realWorldApplications.map((app, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-5 border-2 border-blue-200"
                  >
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{app}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Practice Problems */}
          {data.practiceProblems.length > 0 && (
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-yellow-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-orange-600" />
                Practice Problems
              </h2>
              <div className="space-y-4">
                {data.practiceProblems.map((problem, index) => (
                  <div key={index} className="bg-white rounded-lg p-5 border-2 border-orange-300">
                    <p className="text-lg font-semibold text-gray-900 mb-2">
                      Problem {index + 1}: {problem.question}
                    </p>
                    <details className="mt-3">
                      <summary className="cursor-pointer text-[#2BAE66] font-semibold hover:text-[#1A3D7C]">
                        Show Answer
                      </summary>
                      <div className="mt-3 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                        <p className="text-green-700 font-semibold">Answer: {problem.answer}</p>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Formulas */}
          {data.relatedFormulas.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <ArrowRight className="w-6 h-6 mr-2 text-[#2BAE66]" />
                Related Formulas
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.relatedFormulas.map((slug, index) => (
                  <Link
                    key={index}
                    href={`/formulas/${slug}`}
                    className="block bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-5 hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-[#2BAE66]"
                  >
                    <p className="text-gray-700 font-medium capitalize">
                      {slug.replace(/-/g, ' ')}
                    </p>
                    <div className="flex items-center mt-2 text-[#2BAE66]">
                      <span className="text-xs font-semibold">View Formula →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm font-medium border-2 border-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-2xl shadow-xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help Mastering This Formula?</h2>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Get personalized 1-on-1 tutoring with expert {data.category} tutors. Master formulas, solve complex problems, and achieve academic excellence!
            </p>
            <Link
              href="/"
              className="inline-flex items-center bg-white text-[#1A3D7C] px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg"
            >
              Find Your {data.category.charAt(0).toUpperCase() + data.category.slice(1)} Tutor
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
