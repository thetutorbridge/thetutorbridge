'use client';

import Link from 'next/link';
import { Home, ArrowLeft, Calculator, CheckCircle, BookOpen, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { MathExpression } from '@/components/math-expression';
import { EquationData, getAllEquationSlugs } from '@/lib/equations-data';

interface EquationPageContentProps {
  equationData: EquationData;
  equationSlug: string;
}

export function EquationPageContent({ equationData, equationSlug }: EquationPageContentProps) {
  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Solve ${equationData.equationPlain} (Step-by-Step Solution)`,
    description: `Learn how to solve ${equationData.equationPlain} with our step-by-step guide.`,
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
      '@id': `https://www.thetutorbridge.com/solve/${equationSlug}`,
    },
  };

  // HowTo Schema
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Solve ${equationData.equationPlain}`,
    description: `Step-by-step guide to solve the equation ${equationData.equationPlain}`,
    step: equationData.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.explanation,
      text: `${step.equation}: ${step.explanation}`,
    })),
    totalTime: 'PT3M',
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
        name: 'Equation Solver',
        item: 'https://www.thetutorbridge.com/solve',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: equationData.equationPlain,
        item: `https://www.thetutorbridge.com/solve/${equationSlug}`,
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
        <div className="container mx-auto max-w-6xl">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/solve" className="text-[#1A3D7C] hover:text-[#2BAE66]">
              Equation Solver
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{equationData.equationPlain}</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold flex items-center">
                <span className="mr-3">Solve:</span>
                <MathExpression expression={equationData.equation} displayMode={false} className="text-4xl md:text-5xl" />
              </h1>
            </div>
            <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
              Step-by-step solution with detailed explanations and verification
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Problem Statement */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Problem</h2>
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-8 text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                <MathExpression expression={equationData.equation} displayMode={true} />
              </div>
              <p className="text-sm text-gray-600">Solve for x</p>
            </div>
          </div>

          {/* Solution Steps */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Step-by-Step Solution
            </h2>

            <div className="space-y-6">
              {equationData.steps.map((step, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg border-l-4 ${
                    index === equationData.steps.length - 1
                      ? 'bg-green-50 border-green-500'
                      : 'bg-blue-50 border-blue-500'
                  }`}
                >
                  <div className="flex items-start">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 ${
                        index === equationData.steps.length - 1
                          ? 'bg-green-500 text-white'
                          : 'bg-blue-500 text-white'
                      }`}
                    >
                      {index === equationData.steps.length - 1 ? '✓' : index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-gray-900 mb-2">
                        {step.description}
                      </p>
                      {step.math && (
                        <div className="bg-white rounded-lg p-4 mb-2 border border-gray-200">
                          <div className="text-xl md:text-2xl text-gray-800">
                            <MathExpression expression={step.math} displayMode={true} />
                          </div>
                        </div>
                      )}
                      {step.result && (
                        <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
                          <div className="text-lg md:text-xl font-bold text-blue-600">
                            <MathExpression expression={step.result} displayMode={true} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final Answer */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Final Answer</h2>
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-8 text-center border-2 border-green-500">
              <p className="text-xl text-gray-700 mb-2">Solution:</p>
              <div className="text-4xl md:text-5xl font-bold text-green-700">
                <MathExpression expression={equationData.solution} displayMode={true} />
              </div>
            </div>
          </div>

          {/* Verification */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircle className="w-8 h-8 mr-3 text-green-600" />
              Verification
            </h2>
            <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
              <p className="text-lg text-gray-800 leading-relaxed">{equationData.verification}</p>
            </div>
          </div>

          {/* Similar Problems */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Practice with Similar Problems
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {equationData.similarProblems.slice(0, 3).map((slug, index) => {
                const similarEq = getAllEquationSlugs().includes(slug);
                const displayEq = slug
                  .replace(/-plus-/g, ' + ')
                  .replace(/-minus-/g, ' - ')
                  .replace(/-equals-/g, ' = ')
                  .replace(/-divided-by-/g, ' / ')
                  .replace(/-times-/g, ' × ')
                  .replace(/-parenthesis-/g, '(')
                  .replace(/parenthesis-/g, ')');

                return (
                  <Link
                    key={index}
                    href={`/solve/${slug}`}
                    className="block bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border-2 border-transparent hover:border-blue-500 transition-all duration-200 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-600">Problem {index + 1}</span>
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-xl font-bold text-gray-900">{displayEq}</p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* SEO Content */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <article className="prose prose-gray max-w-none">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Solve {equationData.equationPlain}
              </h2>

              <p className="text-gray-700 mb-4 text-base leading-relaxed">
                Solving the equation <strong>{equationData.equationPlain}</strong> is a fundamental algebra problem that helps students understand linear equations and the concept of isolating variables. This type of equation appears frequently in middle school and high school mathematics, and mastering it builds a strong foundation for more advanced algebraic concepts.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">
                Understanding the Equation
              </h3>
              <p className="text-gray-700 mb-4 text-base leading-relaxed">
                The equation <strong>{equationData.equationPlain}</strong> is a linear equation in one variable (x). Our goal is to find the value of x that makes both sides of the equation equal. By following systematic algebraic steps—such as combining like terms, using inverse operations, and maintaining balance—we can determine that <strong>{equationData.solution}</strong>.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">
                Key Concepts
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>
                  <strong>Inverse Operations:</strong> Use opposite operations to isolate the variable (addition ↔ subtraction, multiplication ↔ division)
                </li>
                <li>
                  <strong>Balance Method:</strong> Whatever you do to one side of the equation, do to the other side to maintain equality
                </li>
                <li>
                  <strong>Order of Operations:</strong> Follow PEMDAS/BODMAS when simplifying expressions
                </li>
                <li>
                  <strong>Verification:</strong> Always check your answer by substituting it back into the original equation
                </li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">
                Why This Matters
              </h3>
              <p className="text-gray-700 mb-4 text-base leading-relaxed">
                Learning to solve equations like <strong>{equationData.equationPlain}</strong> is essential for success in algebra and beyond. These skills are used in science, engineering, economics, and everyday problem-solving. Whether you're calculating distances, determining costs, or analyzing data, the ability to set up and solve equations is invaluable.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">
                Common Mistakes to Avoid
              </h3>
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-600 font-bold mr-2">✗</span>
                    <span>Forgetting to perform the same operation on both sides of the equation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 font-bold mr-2">✗</span>
                    <span>Making arithmetic errors when combining like terms or calculating</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 font-bold mr-2">✗</span>
                    <span>Skipping the verification step to check if your solution is correct</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 font-bold mr-2">✗</span>
                    <span>Rushing through steps without understanding the underlying concepts</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">
                Tips for Success
              </h3>
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">✓</span>
                    <span>Write out each step clearly to avoid confusion and track your work</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">✓</span>
                    <span>Practice regularly with similar problems to build confidence and speed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">✓</span>
                    <span>Always verify your answer by substituting it back into the original equation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">✓</span>
                    <span>Understand the "why" behind each step, not just the mechanical process</span>
                  </li>
                </ul>
              </div>
            </article>
          </div>

          {/* Back to Solver Link */}
          <div className="text-center">
            <Link href="/solve">
              <Button
                variant="outline"
                className="border-2 border-[#1A3D7C] text-[#1A3D7C] hover:bg-[#1A3D7C] hover:text-white px-8 py-6 text-lg font-bold rounded-xl"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Equation Solver
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
              Need Help with Algebra?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you master equations, understand algebra concepts, and build confidence in math. Get personalized one-on-one guidance tailored to your learning style.
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
