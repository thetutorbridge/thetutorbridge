'use client';

import Link from 'next/link';
import { Home, Calculator, Search, TrendingUp, BookOpen, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { MathExpression } from '@/components/math-expression';
import { getAllEquationSlugs, equationsData } from '@/lib/equations-data';

export default function EquationSolverMainPage() {
  // Group equations by category
  const simpleEquations = equationsData.slice(0, 20);
  const intermediateEquations = equationsData.slice(20, 50);
  const advancedEquations = equationsData.slice(50, 100);

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Equation Solver - Step-by-Step Solutions',
            description: 'Solve algebra equations with comprehensive step-by-step guides for 100+ popular equations.',
            url: 'https://www.thetutorbridge.com/solve',
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
            <span className="text-gray-600">Equation Solver</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Calculator className="w-16 h-16 mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold">Equation Solver</h1>
            </div>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto mb-8">
              Master algebra with step-by-step solutions for 100+ popular equations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <p className="text-3xl font-bold text-[#FFC857]">100+</p>
                <p className="text-sm text-blue-100">Equations Covered</p>
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
          {/* Featured Equations */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <TrendingUp className="w-8 h-8 mr-3 text-[#2BAE66]" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Most Popular Equations
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {simpleEquations.slice(0, 6).map((eq) => (
                <Link
                  key={eq.slug}
                  href={`/solve/${eq.slug}`}
                  className="block bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-[#2BAE66]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Calculator className="w-6 h-6 text-[#1A3D7C]" />
                    <ArrowRight className="w-5 h-5 text-[#2BAE66]" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    <MathExpression expression={eq.equation} displayMode={false} />
                  </div>
                  <div className="text-sm text-gray-600 flex items-center">
                    <span>Solution: </span>
                    <span className="font-semibold text-[#2BAE66] ml-1">
                      <MathExpression expression={eq.solution} displayMode={false} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Simple & One-Step Equations */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Simple & One-Step Equations
            </h2>
            <p className="text-gray-600 mb-6">
              Perfect for beginners learning the basics of solving equations. These problems involve simple addition, subtraction, multiplication, or division.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {simpleEquations.map((eq) => (
                <Link
                  key={eq.slug}
                  href={`/solve/${eq.slug}`}
                  className="block bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center hover:from-blue-100 hover:to-blue-200 transition-all duration-200"
                >
                  <div className="text-lg font-bold text-gray-900">
                    <MathExpression expression={eq.equation} displayMode={false} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Two-Step & Multi-Step Equations */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Two-Step & Multi-Step Equations
            </h2>
            <p className="text-gray-600 mb-6">
              Build your skills with equations that require multiple operations. Learn to combine like terms and work with both sides of the equation.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {intermediateEquations.map((eq) => (
                <Link
                  key={eq.slug}
                  href={`/solve/${eq.slug}`}
                  className="block bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center hover:from-purple-100 hover:to-purple-200 transition-all duration-200"
                >
                  <div className="text-lg font-bold text-gray-900">
                    <MathExpression expression={eq.equation} displayMode={false} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Advanced Equations */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Advanced & Complex Equations
            </h2>
            <p className="text-gray-600 mb-6">
              Challenge yourself with equations involving variables on both sides, parentheses, and multiple steps. Master advanced algebraic techniques.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {advancedEquations.map((eq) => (
                <Link
                  key={eq.slug}
                  href={`/solve/${eq.slug}`}
                  className="block bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center hover:from-green-100 hover:to-green-200 transition-all duration-200"
                >
                  <div className="text-lg font-bold text-gray-900">
                    <MathExpression expression={eq.equation} displayMode={false} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* SEO Content */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <article className="prose prose-gray max-w-none">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Master Algebra with Our Comprehensive Equation Solver
              </h2>

              <p className="text-gray-700 mb-4 text-base leading-relaxed">
                Welcome to our comprehensive equation solver guide, featuring detailed step-by-step solutions for over 100 of the most commonly searched algebra equations. Whether you're a middle school student just starting with linear equations or a high school student preparing for exams, our free solver provides clear explanations that help you understand not just the answer, but the process behind it.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">
                Why Choose Our Equation Solver?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
                    Step-by-Step Solutions
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Every equation includes detailed steps showing exactly how to isolate the variable, combine like terms, and verify your answer. Learn the process, not just the result.
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
                    Clear Explanations
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Each step includes a description of what operation is being performed and why, helping you understand the underlying algebraic principles.
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">3</span>
                    Verification Included
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Learn to check your work! Every solution shows how to verify the answer by substituting it back into the original equation.
                  </p>
                </div>

                <div className="bg-yellow-50 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <span className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">4</span>
                    Practice Problems
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Each equation page includes links to similar problems so you can practice and reinforce your understanding of the concepts.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">
                Types of Equations Covered
              </h3>

              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>
                  <strong>One-Step Equations:</strong> Simple problems like x + 5 = 11 or 3x = 12 that require only one operation to solve
                </li>
                <li>
                  <strong>Two-Step Equations:</strong> Equations like 2x + 5 = 11 that need two operations (subtract then divide)
                </li>
                <li>
                  <strong>Multi-Step Equations:</strong> More complex problems involving multiple operations and combining like terms
                </li>
                <li>
                  <strong>Variables on Both Sides:</strong> Equations like 3x + 7 = 2x + 12 where the variable appears on both sides
                </li>
                <li>
                  <strong>Equations with Parentheses:</strong> Problems involving distribution like 2(x + 3) = 10
                </li>
                <li>
                  <strong>Equations with Fractions:</strong> Including problems like x/2 = 5 or 2x/3 = 6
                </li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">
                How to Use This Resource
              </h3>

              <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
                <li className="leading-relaxed">
                  <strong>Browse by Difficulty:</strong> Start with simple equations and progress to more challenging ones as you build confidence
                </li>
                <li className="leading-relaxed">
                  <strong>Study the Steps:</strong> Don't just look at the answer—read through each step carefully to understand the process
                </li>
                <li className="leading-relaxed">
                  <strong>Practice Similar Problems:</strong> Use the related problems links to find equations with similar structures
                </li>
                <li className="leading-relaxed">
                  <strong>Verify Your Understanding:</strong> Try solving the equation on your own before looking at the solution
                </li>
                <li className="leading-relaxed">
                  <strong>Learn the Concepts:</strong> Read the explanatory text to understand why each step works, not just how
                </li>
              </ol>

              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">
                Perfect for Students and Educators
              </h3>

              <p className="text-gray-700 mb-4 text-base leading-relaxed">
                Our equation solver is designed for middle school and high school students learning algebra, but it's also a valuable resource for parents helping with homework, tutors preparing lesson materials, and anyone looking to refresh their math skills. The detailed explanations make it easy to follow along even if it's been years since you last solved an equation.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">
                Common Algebra Mistakes to Avoid
              </h3>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-600 font-bold mr-2">✗</span>
                    <span>Not performing the same operation on both sides of the equation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 font-bold mr-2">✗</span>
                    <span>Forgetting to distribute when working with parentheses</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 font-bold mr-2">✗</span>
                    <span>Making sign errors when dealing with negative numbers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 font-bold mr-2">✗</span>
                    <span>Skipping the verification step to check your answer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 font-bold mr-2">✗</span>
                    <span>Combining terms that aren't like terms</span>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Need Extra Help with Algebra?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors provide personalized one-on-one instruction to help you master equations and excel in algebra. Get the support you need to succeed!
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
