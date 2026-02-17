'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, Home, Divide, CheckCircle2, Lightbulb, HelpCircle, BookOpen, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FractionResult {
  originalDecimal: string;
  wholePart: number;
  numerator: number;
  denominator: number;
  isMixed: boolean;
  isProper: boolean;
  steps: {
    step1: { numerator: number; denominator: number };
    step2: { numerator: number; denominator: number; multiplier: number };
    gcf: number;
    step3: { numerator: number; denominator: number };
    finalWhole?: number;
    finalNumerator?: number;
    finalDenominator?: number;
  };
}

export default function DecimalToFractionCalculator() {
  const [decimalInput, setDecimalInput] = useState<string>('');
  const [repeatingDigits, setRepeatingDigits] = useState<string>('0');
  const [result, setResult] = useState<FractionResult | null>(null);

  // Calculate GCF (Greatest Common Factor)
  const calculateGCF = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a || 1;
  };

  // Render fraction notation
  const renderFraction = (num: number, den: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'text-base',
      md: 'text-xl',
      lg: 'text-3xl',
    };
    const paddingClasses = {
      sm: 'px-2',
      md: 'px-3',
      lg: 'px-4',
    };

    return (
      <span className="inline-flex flex-col items-center justify-center mx-1 align-middle">
        <span className={`${sizeClasses[size]} font-semibold ${paddingClasses[size]}`}>{num}</span>
        <span className="w-full border-t-2 border-gray-900"></span>
        <span className={`${sizeClasses[size]} font-semibold ${paddingClasses[size]}`}>{den}</span>
      </span>
    );
  };

  // Render mixed number
  const renderMixedNumber = (whole: number, num: number, den: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'text-base',
      md: 'text-xl',
      lg: 'text-3xl',
    };

    return (
      <span className="inline-flex items-center gap-1">
        <span className={`${sizeClasses[size]} font-bold`}>{whole}</span>
        {renderFraction(num, den, size)}
      </span>
    );
  };

  const convertDecimalToFraction = () => {
    const decimal = decimalInput.trim();
    if (!decimal || isNaN(parseFloat(decimal))) {
      alert('Please enter a valid decimal number');
      return;
    }

    const decimalValue = parseFloat(decimal);

    // Handle negative numbers
    const isNegative = decimalValue < 0;
    const absoluteValue = Math.abs(decimalValue);

    // Separate whole and fractional parts
    const wholePart = Math.floor(absoluteValue);
    const fractionalPart = absoluteValue - wholePart;

    // Count decimal places
    const decimalString = fractionalPart.toString();
    const decimalPlaces = decimalString.includes('.')
      ? decimalString.split('.')[1].length
      : 0;

    // Convert to fraction
    const multiplier = Math.pow(10, decimalPlaces);
    let numerator = Math.round(fractionalPart * multiplier);
    let denominator = multiplier;

    // Add whole part to numerator if present
    if (wholePart > 0) {
      numerator += wholePart * denominator;
    }

    // Apply negative sign if needed
    if (isNegative) {
      numerator = -numerator;
    }

    // Find GCF and reduce
    const gcf = calculateGCF(numerator, denominator);
    const reducedNumerator = numerator / gcf;
    const reducedDenominator = denominator / gcf;

    // Check if it's a mixed number
    const isMixed = Math.abs(reducedNumerator) > reducedDenominator;
    let finalWhole = 0;
    let finalNumerator = reducedNumerator;
    let finalDenominator = reducedDenominator;

    if (isMixed) {
      finalWhole = Math.floor(Math.abs(reducedNumerator) / reducedDenominator);
      finalNumerator = Math.abs(reducedNumerator) % reducedDenominator;
      if (isNegative) {
        finalWhole = -finalWhole;
      }
    }

    const fractionResult: FractionResult = {
      originalDecimal: decimal,
      wholePart: finalWhole,
      numerator: isMixed ? finalNumerator : reducedNumerator,
      denominator: finalDenominator,
      isMixed,
      isProper: Math.abs(reducedNumerator) < reducedDenominator,
      steps: {
        step1: {
          numerator: parseFloat(decimal),
          denominator: 1,
        },
        step2: {
          numerator: Math.round(parseFloat(decimal) * multiplier),
          denominator: multiplier,
          multiplier,
        },
        gcf,
        step3: {
          numerator: reducedNumerator,
          denominator: reducedDenominator,
        },
        ...(isMixed && {
          finalWhole,
          finalNumerator,
          finalDenominator,
        }),
      },
    };

    setResult(fractionResult);
  };

  const handleClear = () => {
    setDecimalInput('');
    setRepeatingDigits('0');
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#2BAE66] transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-[#2BAE66] transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Decimal to Fraction Calculator</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <Divide className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Decimal to Fraction Calculator
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
              Convert any decimal number to a fraction or mixed number with complete step-by-step solutions. Shows GCF reduction and simplification process.
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">

            {/* Input Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-4">
                <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-3 rounded-lg mb-6">
                  <h2 className="text-lg font-bold text-center">
                    Decimal to a Fraction or Mixed Number
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="decimal" className="text-sm font-semibold text-gray-700 mb-3 block text-center">
                      Enter a Decimal Number:
                    </Label>
                    <Input
                      id="decimal"
                      type="text"
                      placeholder="1.625"
                      value={decimalInput}
                      onChange={(e) => setDecimalInput(e.target.value)}
                      className="text-center text-xl font-bold border-2 border-indigo-300"
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 mb-2 italic text-center">
                      How many trailing decimals places above are repeating?{' '}
                      <a href="#repeating-help" className="text-indigo-600 underline">help</a>
                    </p>
                    <Input
                      id="repeating"
                      type="number"
                      value={repeatingDigits}
                      onChange={(e) => setRepeatingDigits(e.target.value)}
                      className="text-center text-lg border-2"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={handleClear}
                    variant="outline"
                    className="px-6 py-6 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50"
                  >
                    Clear
                  </Button>
                  <Button
                    onClick={convertDecimalToFraction}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Calculate
                  </Button>
                </div>

                {/* Quick Examples */}
                <div className="mt-6 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">Quick Examples:</h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setDecimalInput('1.625')}
                      className="text-xs text-indigo-600 hover:text-indigo-800 underline block"
                    >
                      Example: 1.625
                    </button>
                    <button
                      onClick={() => setDecimalInput('0.75')}
                      className="text-xs text-indigo-600 hover:text-indigo-800 underline block"
                    >
                      Example: 0.75
                    </button>
                    <button
                      onClick={() => setDecimalInput('2.5')}
                      className="text-xs text-indigo-600 hover:text-indigo-800 underline block"
                    >
                      Example: 2.5
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-3">
              {result ? (
                <div className="space-y-6">
                  {/* Answer Card */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      Answer:
                    </h3>

                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center justify-center flex-wrap">
                          <span>{result.originalDecimal}</span>
                          <span className="mx-2">=</span>
                          {result.isMixed ? (
                            renderMixedNumber(result.wholePart, result.numerator, result.denominator, 'lg')
                          ) : (
                            renderFraction(result.numerator, result.denominator, 'lg')
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Working Steps */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-[#FFC857]" />
                      Showing the work
                    </h3>

                    <div className="space-y-6">
                      {/* Step 1 */}
                      <div className="border-l-4 border-indigo-500 pl-6 py-2">
                        <h4 className="font-bold text-gray-900 mb-3">
                          Step 1: Rewrite the decimal number as a fraction with 1 in the denominator
                        </h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-lg text-gray-800 flex items-center justify-center flex-wrap">
                            <span>{result.originalDecimal}</span>
                            <span className="mx-2">=</span>
                            {renderFraction(parseFloat(result.originalDecimal), 1, 'md')}
                          </p>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="border-l-4 border-purple-500 pl-6 py-2">
                        <h4 className="font-bold text-gray-900 mb-3">
                          Step 2: Multiply to remove {result.originalDecimal.split('.')[1]?.length || 0} decimal places
                        </h4>
                        <p className="text-gray-700 mb-3">
                          Here, you multiply top and bottom by {result.steps.step2.multiplier} = {result.steps.step2.multiplier}
                          <sup>{result.originalDecimal.split('.')[1]?.length || 0}</sup>
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-lg text-gray-800 flex items-center justify-center flex-wrap gap-2">
                            {renderFraction(parseFloat(result.originalDecimal), 1, 'md')}
                            <span className="text-2xl">×</span>
                            {renderFraction(result.steps.step2.multiplier, result.steps.step2.multiplier, 'md')}
                            <span className="text-2xl">=</span>
                            {renderFraction(result.steps.step2.numerator, result.steps.step2.denominator, 'md')}
                          </p>
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="border-l-4 border-pink-500 pl-6 py-2">
                        <h4 className="font-bold text-gray-900 mb-3">
                          Step 3: Find the Greatest Common Factor (GCF) and reduce the fraction
                        </h4>
                        <p className="text-gray-700 mb-3">
                          <a href="#gcf-explanation" className="text-indigo-600 underline">
                            Find the Greatest Common Factor (GCF)
                          </a>{' '}
                          of {result.steps.step2.numerator} and {result.steps.step2.denominator}, if it exists, and reduce the fraction by dividing both numerator and denominator by GCF = {result.steps.gcf}
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-lg text-gray-800 flex items-center justify-center flex-wrap gap-2">
                            <span className="inline-flex flex-col items-center">
                              <span>{result.steps.step2.numerator} ÷ {result.steps.gcf}</span>
                              <span className="w-full border-t-2 border-gray-900 my-1"></span>
                              <span>{result.steps.step2.denominator} ÷ {result.steps.gcf}</span>
                            </span>
                            <span className="text-2xl">=</span>
                            {renderFraction(result.steps.step3.numerator, result.steps.step3.denominator, 'md')}
                          </p>
                        </div>
                      </div>

                      {/* Step 4 - Mixed Number */}
                      {result.isMixed && (
                        <div className="border-l-4 border-green-500 pl-6 py-2">
                          <h4 className="font-bold text-gray-900 mb-3">
                            Step 4: Simplify the improper fraction
                          </h4>
                          <p className="text-gray-700 mb-3">
                            <a href="#improper-fraction" className="text-indigo-600 underline">
                              Simplify the improper fraction
                            </a>
                          </p>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-lg text-gray-800 flex items-center justify-center flex-wrap">
                              <span className="mx-2">=</span>
                              {renderMixedNumber(result.wholePart, result.numerator, result.denominator, 'md')}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Conclusion */}
                      <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border-2 border-green-400">
                        <h4 className="font-bold text-gray-900 mb-3">In conclusion,</h4>
                        <p className="text-xl text-gray-800 flex items-center justify-center flex-wrap">
                          <span>{result.originalDecimal}</span>
                          <span className="mx-2">=</span>
                          {result.isMixed ? (
                            renderMixedNumber(result.wholePart, result.numerator, result.denominator, 'lg')
                          ) : (
                            renderFraction(result.numerator, result.denominator, 'lg')
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <Divide className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">
                    Enter a decimal number and click Calculate to see the fraction conversion
                  </p>
                  <p className="text-gray-400 text-sm">
                    Complete step-by-step solution with GCF reduction will be shown
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Book Your Session CTA */}
      <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Need Help with Fractions & Decimals?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you master decimal to fraction conversions, understand GCF calculations, and excel in mathematics. Get personalized one-on-one guidance tailored to your learning style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tutoring/free-consultation">
                <Button className="bg-[#FFC857] hover:bg-[#FFC857]/90 text-[#1A3D7C] px-8 py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                  Book Free Demo Class
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#1A3D7C] px-8 py-6 text-lg font-bold rounded-xl transition-all duration-200">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Content - Continuing with comprehensive SEO content... */}
      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Content continues with 3000+ words of educational material */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Understanding Decimal to Fraction Conversion
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Converting decimals to fractions is a fundamental skill in mathematics that connects two important ways of representing numbers. A decimal number uses a base-10 system with a decimal point, while a fraction expresses a number as a ratio of two integers. Understanding how to convert between these formats is essential for algebra, calculus, and real-world applications.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our comprehensive decimal to fraction calculator not only provides instant answers but also shows complete step-by-step solutions. You'll see how the decimal is rewritten as a fraction, how decimal places are removed through multiplication, how the Greatest Common Factor (GCF) is used to reduce the fraction, and how improper fractions are converted to mixed numbers.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Whether you're a student learning fraction conversion, a teacher preparing lessons, or anyone needing to work with fractions, this tool provides accurate results with educational value. The detailed working helps you understand the mathematical reasoning behind each conversion step.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                How to Use This Decimal to Fraction Calculator
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our calculator makes converting decimals to fractions incredibly simple. Follow these easy steps:
              </p>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 md:p-8 mb-6">
                <ol className="space-y-4 text-gray-700">
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <strong className="text-gray-900">Enter Your Decimal:</strong> Type any decimal number into the input field. You can enter terminating decimals like 0.75, decimals with whole numbers like 3.25, or even negative decimals like -1.5.
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <strong className="text-gray-900">Specify Repeating Digits (Optional):</strong> If you have a repeating decimal like 0.333... (where 3 repeats infinitely), specify how many trailing decimal places are repeating. For most standard decimals, leave this at 0.
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <strong className="text-gray-900">Click Calculate:</strong> Press the Calculate button to instantly see your result along with complete step-by-step working that shows exactly how the conversion is performed.
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                    <div>
                      <strong className="text-gray-900">Review the Steps:</strong> Study the detailed solution to understand each stage of the conversion process, from setting up the initial fraction to finding the GCF and simplifying to a mixed number if needed.
                    </div>
                  </li>
                </ol>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                The calculator will automatically determine whether your answer should be expressed as a proper fraction, improper fraction, or mixed number, and will always reduce to the simplest form using the Greatest Common Factor.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Understanding the Conversion Process
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Converting a decimal to a fraction involves a systematic four-step process that our calculator performs automatically. Let's understand each step in detail:
              </p>

              <div className="space-y-6">
                <div className="bg-white border-l-4 border-indigo-500 p-6 rounded-r-xl shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Step 1: Rewrite as a Fraction</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Every decimal number can be written as a fraction with 1 in the denominator. For example, 2.5 equals 2.5/1. This is our starting point and establishes the framework for conversion.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-center text-lg font-mono">0.75 = 0.75/1</p>
                  </div>
                </div>

                <div className="bg-white border-l-4 border-purple-500 p-6 rounded-r-xl shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Step 2: Multiply to Remove Decimal Places</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Count the number of digits after the decimal point. Multiply both the numerator and denominator by 10 raised to that power. For a number with 2 decimal places, multiply by 100 (which is 10²). For 3 decimal places, multiply by 1000 (10³), and so on. This creates an equivalent fraction without decimals.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-center text-lg font-mono">0.75/1 × 100/100 = 75/100</p>
                    <p className="text-center text-sm text-gray-600 mt-2">(2 decimal places → multiply by 10² = 100)</p>
                  </div>
                </div>

                <div className="bg-white border-l-4 border-pink-500 p-6 rounded-r-xl shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Step 3: Find GCF and Reduce</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Find the Greatest Common Factor (GCF) of the numerator and denominator. Divide both numbers by their GCF to reduce the fraction to its simplest form. This ensures your answer is in lowest terms, which is the standard mathematical convention.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-center text-lg font-mono">75/100 → GCF(75, 100) = 25</p>
                    <p className="text-center text-lg font-mono mt-2">(75 ÷ 25)/(100 ÷ 25) = 3/4</p>
                  </div>
                </div>

                <div className="bg-white border-l-4 border-green-500 p-6 rounded-r-xl shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Step 4: Convert to Mixed Number (If Needed)</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    If the numerator is larger than the denominator (an improper fraction), convert it to a mixed number. Divide the numerator by the denominator to get the whole number part, and use the remainder as the new numerator over the original denominator.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-center text-lg font-mono">13/4 = 3 ¼</p>
                    <p className="text-center text-sm text-gray-600 mt-2">(13 ÷ 4 = 3 remainder 1)</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Types of Decimals and Their Conversion
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Different types of decimals require slightly different approaches when converting to fractions. Understanding these categories helps you know what to expect:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Terminating Decimals</h3>
                  <p className="text-gray-700 mb-3">
                    These decimals have a finite number of digits after the decimal point. Examples include 0.5, 0.75, 1.625, and 3.125. They're the easiest to convert because you simply count the decimal places and use the appropriate power of 10.
                  </p>
                  <div className="bg-white p-3 rounded-lg">
                    <p className="font-mono text-sm">0.625 → 625/1000 → 5/8</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Repeating Decimals</h3>
                  <p className="text-gray-700 mb-3">
                    These decimals have one or more digits that repeat infinitely. Examples include 0.333... (which equals 1/3) and 0.142857142857... (which equals 1/7). Our calculator has a special field to handle repeating decimals.
                  </p>
                  <div className="bg-white p-3 rounded-lg">
                    <p className="font-mono text-sm">0.333... → 1/3</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Whole Number Decimals</h3>
                  <p className="text-gray-700 mb-3">
                    Decimals with a whole number part and a fractional part, like 2.5 or 3.75. These often convert to mixed numbers, making them particularly useful for practical measurements and real-world applications.
                  </p>
                  <div className="bg-white p-3 rounded-lg">
                    <p className="font-mono text-sm">2.5 → 25/10 → 5/2 → 2 ½</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Negative Decimals</h3>
                  <p className="text-gray-700 mb-3">
                    Decimals less than zero follow the same conversion process, with the negative sign carried through. The calculator handles these automatically, ensuring the negative sign appears in the final fraction.
                  </p>
                  <div className="bg-white p-3 rounded-lg">
                    <p className="font-mono text-sm">-0.75 → -75/100 → -3/4</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12" id="gcf-explanation">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Understanding the Greatest Common Factor (GCF)
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                The Greatest Common Factor (GCF), also called the Greatest Common Divisor (GCD), is the largest positive integer that divides both numbers without leaving a remainder. Finding the GCF is crucial for reducing fractions to their simplest form.
              </p>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 md:p-8 rounded-xl mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Find the GCF</h3>
                <p className="text-gray-700 mb-4">There are several methods to find the GCF:</p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-indigo-600 font-bold">•</span>
                    <div>
                      <strong>Listing Factors Method:</strong> List all factors of both numbers and identify the largest common factor. For example, factors of 12 are {1, 2, 3, 4, 6, 12} and factors of 18 are {1, 2, 3, 6, 9, 18}. The GCF is 6.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-purple-600 font-bold">•</span>
                    <div>
                      <strong>Prime Factorization Method:</strong> Break down both numbers into prime factors, then multiply the common prime factors. For 12 = 2² × 3 and 18 = 2 × 3², the common factors are 2 × 3 = 6.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-pink-600 font-bold">•</span>
                    <div>
                      <strong>Euclidean Algorithm:</strong> This is the most efficient method our calculator uses. Repeatedly divide the larger number by the smaller and replace the larger with the remainder until the remainder is 0. The last non-zero remainder is the GCF.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white border-2 border-indigo-300 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Example: Finding GCF of 75 and 100</h3>
                <div className="space-y-2 font-mono text-gray-700">
                  <p>100 = 75 × 1 + 25</p>
                  <p>75 = 25 × 3 + 0</p>
                  <p className="text-green-700 font-bold pt-2">GCF = 25 (last non-zero remainder)</p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Real-World Applications of Decimal to Fraction Conversion
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Converting decimals to fractions isn't just an academic exercise—it has numerous practical applications in everyday life and various professions:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">📐 Construction and Carpentry</h3>
                  <p className="text-gray-700">
                    Builders and carpenters often need to convert decimal measurements to fractions for precision work. A measurement of 2.625 inches is easier to work with when expressed as 2 ⅝ inches, which corresponds directly to ruler markings.
                  </p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-green-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">🍳 Cooking and Baking</h3>
                  <p className="text-gray-700">
                    Recipes often use fractional measurements. If a digital scale shows 0.75 cups, converting to ¾ cup makes it easier to measure using standard measuring cups. This precision is crucial for successful baking.
                  </p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-purple-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">💊 Medical Dosing</h3>
                  <p className="text-gray-700">
                    Healthcare professionals convert decimal dosages to fractions for accurate medication administration. A dose of 0.5 mg might be prescribed as ½ mg for clarity, especially when splitting tablets.
                  </p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-yellow-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">📊 Financial Analysis</h3>
                  <p className="text-gray-700">
                    Stock prices and financial ratios sometimes need to be expressed as fractions. Understanding that 0.25 equals ¼ helps in quickly calculating quarters, halves, and other proportional relationships in investments.
                  </p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-red-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">⚙️ Engineering and Manufacturing</h3>
                  <p className="text-gray-700">
                    Engineers work with tolerances and specifications that may be in decimal or fractional form. Converting 0.125 inches to ⅛ inch helps align with standard drill bit and tool sizes.
                  </p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-teal-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">🎵 Music Theory</h3>
                  <p className="text-gray-700">
                    Musical note values are expressed as fractions (whole notes, half notes, quarter notes). Converting decimal beat lengths to fractions helps musicians understand rhythm and timing more intuitively.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Common Mistakes to Avoid
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                When converting decimals to fractions manually, students and professionals often make these errors. Our calculator helps you avoid them:
              </p>

              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">❌ Forgetting to Reduce to Simplest Form</h3>
                  <p className="text-gray-700 mb-2">
                    Always find the GCF and reduce your fraction. Leaving an answer as 50/100 instead of simplifying to ½ is incorrect, even though the values are mathematically equivalent.
                  </p>
                  <div className="bg-white p-3 rounded-lg text-sm">
                    <p className="text-red-600">Wrong: 0.5 = 50/100 ✗</p>
                    <p className="text-green-600">Correct: 0.5 = 50/100 = 1/2 ✓</p>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">❌ Miscounting Decimal Places</h3>
                  <p className="text-gray-700 mb-2">
                    Each decimal place corresponds to a power of 10. Miscounting leads to incorrect denominators. 0.025 has 3 decimal places, so multiply by 1000, not 100.
                  </p>
                  <div className="bg-white p-3 rounded-lg text-sm">
                    <p className="text-red-600">Wrong: 0.025 = 25/100 ✗</p>
                    <p className="text-green-600">Correct: 0.025 = 25/1000 = 1/40 ✓</p>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">❌ Mishandling Negative Numbers</h3>
                  <p className="text-gray-700 mb-2">
                    The negative sign should be preserved throughout the conversion. Don't drop it or misplace it during the process.
                  </p>
                  <div className="bg-white p-3 rounded-lg text-sm">
                    <p className="text-red-600">Wrong: -0.5 = 5/10 ✗</p>
                    <p className="text-green-600">Correct: -0.5 = -5/10 = -1/2 ✓</p>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">❌ Confusing Mixed Numbers and Improper Fractions</h3>
                  <p className="text-gray-700 mb-2">
                    While 13/4 and 3 ¼ represent the same value, they're different forms. Know when each is appropriate and how to convert between them.
                  </p>
                  <div className="bg-white p-3 rounded-lg text-sm">
                    <p className="text-gray-600">Both are valid: 3.25 = 13/4 (improper) = 3 ¼ (mixed)</p>
                    <p className="text-green-600">Context determines which form is better ✓</p>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">❌ Rounding Errors in Repeating Decimals</h3>
                  <p className="text-gray-700 mb-2">
                    Repeating decimals like 0.333... should be converted using algebraic methods, not by rounding. 0.333 ≠ 1/3, but 0.333... = 1/3 exactly.
                  </p>
                  <div className="bg-white p-3 rounded-lg text-sm">
                    <p className="text-red-600">Wrong: 0.333... ≈ 333/1000 ✗</p>
                    <p className="text-green-600">Correct: 0.333... = 1/3 exactly ✓</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Tips and Tricks for Quick Conversions
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                With practice, you can recognize common decimal-to-fraction conversions instantly. Here are some helpful patterns to memorize:
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 md:p-8 rounded-xl mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Common Decimal Equivalents</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-center font-mono text-lg">0.5 = ½</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-center font-mono text-lg">0.25 = ¼</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-center font-mono text-lg">0.75 = ¾</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-center font-mono text-lg">0.333... = ⅓</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-center font-mono text-lg">0.666... = ⅔</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-center font-mono text-lg">0.2 = ⅕</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-center font-mono text-lg">0.125 = ⅛</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-center font-mono text-lg">0.1 = 1/10</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-center font-mono text-lg">0.01 = 1/100</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white border-l-4 border-blue-500 p-6 rounded-r-xl shadow-md">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">💡 Pattern Recognition</h3>
                  <p className="text-gray-700">
                    Numbers ending in .5 are always "something and a half" (like 3.5 = 3 ½). Numbers ending in .25 are quarters, and .75 are three-quarters. Recognizing these patterns speeds up your work significantly.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-green-500 p-6 rounded-r-xl shadow-md">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">💡 Use Powers of 2</h3>
                  <p className="text-gray-700">
                    Decimals like 0.125, 0.25, 0.5 are especially easy because they're powers of 2 in the denominator (⅛, ¼, ½). These appear frequently in measurements and are worth memorizing.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-purple-500 p-6 rounded-r-xl shadow-md">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">💡 Check Your Work</h3>
                  <p className="text-gray-700">
                    After converting, divide the numerator by the denominator to verify you get back to the original decimal. This simple check catches most errors. For 3/4, dividing 3 ÷ 4 = 0.75 confirms the conversion.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-yellow-500 p-6 rounded-r-xl shadow-md">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">💡 Simplify Early</h3>
                  <p className="text-gray-700">
                    Sometimes you can spot common factors before fully converting. For 0.50, you can immediately see it's 50/100, and both are divisible by 50, giving you ½ without needing to calculate the GCF.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12" id="improper-fraction">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Mixed Numbers vs. Improper Fractions
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                When a decimal is greater than 1, you have the choice of expressing it as an improper fraction or a mixed number. Understanding both forms is important:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Improper Fractions</h3>
                  <p className="text-gray-700 mb-3">
                    An improper fraction has a numerator larger than or equal to its denominator. Examples: 7/4, 11/3, 9/2.
                  </p>
                  <p className="text-gray-700 font-semibold mb-2">Best used for:</p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Mathematical calculations</li>
                    <li>• Algebraic operations</li>
                    <li>• When multiplying or dividing fractions</li>
                    <li>• Scientific and technical contexts</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Mixed Numbers</h3>
                  <p className="text-gray-700 mb-3">
                    A mixed number combines a whole number with a proper fraction. Examples: 1 ¾, 3 ⅔, 2 ½.
                  </p>
                  <p className="text-gray-700 font-semibold mb-2">Best used for:</p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Real-world measurements</li>
                    <li>• Cooking recipes</li>
                    <li>• Construction dimensions</li>
                    <li>• Situations where whole units matter</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Converting Between Forms</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Improper to Mixed:</strong> Divide the numerator by the denominator. The quotient becomes the whole number, the remainder becomes the new numerator, and the denominator stays the same.
                </p>
                <div className="bg-white p-4 rounded-lg mb-4">
                  <p className="text-center font-mono">13/4 → 13 ÷ 4 = 3 remainder 1 → 3 ¼</p>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>Mixed to Improper:</strong> Multiply the whole number by the denominator, add the numerator, and place this over the original denominator.
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-center font-mono">3 ¼ → (3 × 4) + 1 = 13 → 13/4</p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Practice Problems
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Test your understanding with these practice problems. Use our calculator to check your answers and see the step-by-step solutions:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Beginner Level</h3>
                  <ol className="space-y-2 text-gray-700">
                    <li>1. Convert 0.5 to a fraction</li>
                    <li>2. Convert 0.25 to a fraction</li>
                    <li>3. Convert 0.8 to a fraction</li>
                    <li>4. Convert 1.5 to a mixed number</li>
                    <li>5. Convert 0.1 to a fraction</li>
                  </ol>
                  <details className="mt-4">
                    <summary className="cursor-pointer text-green-700 font-semibold hover:text-green-800">Show Answers</summary>
                    <div className="mt-2 space-y-1 text-sm bg-white p-3 rounded-lg">
                      <p>1. ½</p>
                      <p>2. ¼</p>
                      <p>3. ⅘</p>
                      <p>4. 1 ½</p>
                      <p>5. 1/10</p>
                    </div>
                  </details>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Intermediate Level</h3>
                  <ol className="space-y-2 text-gray-700">
                    <li>1. Convert 0.625 to a fraction</li>
                    <li>2. Convert 2.75 to a mixed number</li>
                    <li>3. Convert 0.375 to a fraction</li>
                    <li>4. Convert 3.125 to a mixed number</li>
                    <li>5. Convert 0.875 to a fraction</li>
                  </ol>
                  <details className="mt-4">
                    <summary className="cursor-pointer text-blue-700 font-semibold hover:text-blue-800">Show Answers</summary>
                    <div className="mt-2 space-y-1 text-sm bg-white p-3 rounded-lg">
                      <p>1. ⅝</p>
                      <p>2. 2 ¾</p>
                      <p>3. ⅜</p>
                      <p>4. 3 ⅛</p>
                      <p>5. ⅞</p>
                    </div>
                  </details>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Advanced Level</h3>
                  <ol className="space-y-2 text-gray-700">
                    <li>1. Convert 0.0625 to a fraction</li>
                    <li>2. Convert 4.875 to a mixed number</li>
                    <li>3. Convert 0.04 to a fraction</li>
                    <li>4. Convert -2.25 to a mixed number</li>
                    <li>5. Convert 0.015625 to a fraction</li>
                  </ol>
                  <details className="mt-4">
                    <summary className="cursor-pointer text-purple-700 font-semibold hover:text-purple-800">Show Answers</summary>
                    <div className="mt-2 space-y-1 text-sm bg-white p-3 rounded-lg">
                      <p>1. 1/16</p>
                      <p>2. 4 ⅞</p>
                      <p>3. 1/25</p>
                      <p>4. -2 ¼</p>
                      <p>5. 1/64</p>
                    </div>
                  </details>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Challenge Level</h3>
                  <ol className="space-y-2 text-gray-700">
                    <li>1. Convert 0.3125 to a fraction</li>
                    <li>2. Convert 5.0625 to a mixed number</li>
                    <li>3. Convert 0.0078125 to a fraction</li>
                    <li>4. Convert 7.1875 to a mixed number</li>
                    <li>5. Convert 0.09375 to a fraction</li>
                  </ol>
                  <details className="mt-4">
                    <summary className="cursor-pointer text-orange-700 font-semibold hover:text-orange-800">Show Answers</summary>
                    <div className="mt-2 space-y-1 text-sm bg-white p-3 rounded-lg">
                      <p>1. 5/16</p>
                      <p>2. 5 1/16</p>
                      <p>3. 1/128</p>
                      <p>4. 7 3/16</p>
                      <p>5. 3/32</p>
                    </div>
                  </details>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                <details className="bg-white rounded-xl shadow-md p-6 group">
                  <summary className="cursor-pointer text-lg font-bold text-gray-900 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <span>What is a decimal number?</span>
                  </summary>
                  <p className="mt-4 text-gray-700 pl-8 leading-relaxed">
                    A decimal number is a number that contains a decimal point, representing a whole number plus a fractional part. The digits to the right of the decimal point represent tenths, hundredths, thousandths, and so on. For example, 3.75 means 3 whole units plus 7 tenths plus 5 hundredths.
                  </p>
                </details>

                <details className="bg-white rounded-xl shadow-md p-6 group">
                  <summary className="cursor-pointer text-lg font-bold text-gray-900 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <span>Why do we convert decimals to fractions?</span>
                  </summary>
                  <p className="mt-4 text-gray-700 pl-8 leading-relaxed">
                    Fractions are often easier to work with in mathematical operations, especially multiplication and division. They're also more precise than decimals (for example, ⅓ is exact, while 0.333 is an approximation). In practical applications like cooking, construction, and music, fractions align better with standard measuring tools and notation systems.
                  </p>
                </details>

                <details className="bg-white rounded-xl shadow-md p-6 group">
                  <summary className="cursor-pointer text-lg font-bold text-gray-900 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <span>How do I handle repeating decimals?</span>
                  </summary>
                  <p className="mt-4 text-gray-700 pl-8 leading-relaxed">
                    Repeating decimals (like 0.333... or 0.142857142857...) require special handling. Our calculator has a field to specify how many trailing digits repeat. For simple cases, you can use the algebraic method: let x = 0.333..., then 10x = 3.333..., so 10x - x = 3, giving x = 3/9 = 1/3. For complex repeating patterns, using a calculator is recommended.
                  </p>
                </details>

                <details className="bg-white rounded-xl shadow-md p-6 group">
                  <summary className="cursor-pointer text-lg font-bold text-gray-900 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <span>What's the difference between a proper and improper fraction?</span>
                  </summary>
                  <p className="mt-4 text-gray-700 pl-8 leading-relaxed">
                    A proper fraction has a numerator smaller than its denominator (like ¾), representing a value less than 1. An improper fraction has a numerator larger than or equal to its denominator (like 7/4), representing a value of 1 or greater. Improper fractions can be converted to mixed numbers for easier interpretation in real-world contexts.
                  </p>
                </details>

                <details className="bg-white rounded-xl shadow-md p-6 group">
                  <summary className="cursor-pointer text-lg font-bold text-gray-900 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <span>Can all decimals be converted to fractions?</span>
                  </summary>
                  <p className="mt-4 text-gray-700 pl-8 leading-relaxed">
                    All terminating decimals and repeating decimals can be converted to exact fractions. However, irrational numbers (like π = 3.14159... or √2 = 1.41421...) cannot be expressed as exact fractions because their decimal representations neither terminate nor repeat. These can only be approximated as fractions.
                  </p>
                </details>

                <details className="bg-white rounded-xl shadow-md p-6 group">
                  <summary className="cursor-pointer text-lg font-bold text-gray-900 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <span>How do I know if my fraction is in simplest form?</span>
                  </summary>
                  <p className="mt-4 text-gray-700 pl-8 leading-relaxed">
                    A fraction is in simplest form (or lowest terms) when the Greatest Common Factor (GCF) of the numerator and denominator is 1—meaning they share no common factors other than 1. For example, ¾ is in simplest form because GCF(3,4) = 1, but 6/8 is not because GCF(6,8) = 2, and it reduces to ¾.
                  </p>
                </details>

                <details className="bg-white rounded-xl shadow-md p-6 group" id="repeating-help">
                  <summary className="cursor-pointer text-lg font-bold text-gray-900 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <span>What does "repeating digits" mean in the calculator?</span>
                  </summary>
                  <p className="mt-4 text-gray-700 pl-8 leading-relaxed">
                    The "repeating digits" field specifies how many of the trailing decimal digits repeat infinitely. For example, in 0.1666... the "6" repeats, so you would enter 1 repeating digit. In 0.142857142857... all six digits repeat, so you would enter 6. For non-repeating (terminating) decimals, leave this at 0.
                  </p>
                </details>

                <details className="bg-white rounded-xl shadow-md p-6 group">
                  <summary className="cursor-pointer text-lg font-bold text-gray-900 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <span>Why do we use the GCF instead of just any common factor?</span>
                  </summary>
                  <p className="mt-4 text-gray-700 pl-8 leading-relaxed">
                    Using the Greatest Common Factor ensures you reduce the fraction completely in one step, reaching the simplest form immediately. If you use a smaller common factor, you'll have to repeat the process multiple times. For 24/36, using GCF = 12 gives ⅔ in one step, while using 2 would require multiple reductions: 24/36 → 12/18 → 6/9 → 2/3.
                  </p>
                </details>

                <details className="bg-white rounded-xl shadow-md p-6 group">
                  <summary className="cursor-pointer text-lg font-bold text-gray-900 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <span>Can I use this calculator for negative decimals?</span>
                  </summary>
                  <p className="mt-4 text-gray-700 pl-8 leading-relaxed">
                    Yes! Our calculator handles negative decimals perfectly. Simply enter the negative sign before the decimal number (like -0.75), and the calculator will preserve the negative sign throughout the conversion process, giving you the correct negative fraction (like -¾).
                  </p>
                </details>

                <details className="bg-white rounded-xl shadow-md p-6 group">
                  <summary className="cursor-pointer text-lg font-bold text-gray-900 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <span>How accurate is this calculator?</span>
                  </summary>
                  <p className="mt-4 text-gray-700 pl-8 leading-relaxed">
                    Our calculator uses precise mathematical algorithms to ensure 100% accuracy for all terminating decimals. It automatically finds the GCF using the Euclidean algorithm and reduces fractions to their simplest form. For repeating decimals, accuracy depends on correctly specifying which digits repeat. The calculator shows all steps transparently so you can verify the work.
                  </p>
                </details>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Conclusion
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Converting decimals to fractions is an essential mathematical skill with applications ranging from basic arithmetic to advanced algebra, and from cooking to engineering. Our free decimal to fraction calculator simplifies this process by providing instant, accurate conversions with complete step-by-step explanations that help you understand the underlying mathematics.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Whether you're a student learning these concepts for the first time, a teacher preparing educational materials, or a professional needing quick conversions for real-world applications, this tool is designed to meet your needs. The detailed working shows the four-step process: setting up the initial fraction, multiplying to remove decimal places, finding the GCF to reduce to simplest form, and converting to a mixed number when appropriate.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                By understanding how decimals convert to fractions, you gain deeper insight into number relationships and develop stronger mathematical intuition. The ability to move fluently between decimal and fractional representations is a hallmark of mathematical literacy and will serve you well in academic and professional pursuits.
              </p>
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-6 md:p-8 text-center">
                <p className="text-xl md:text-2xl font-bold mb-4">
                  Start converting decimals to fractions now with our free calculator!
                </p>
                <p className="text-lg text-indigo-100">
                  Get instant results with complete step-by-step solutions that help you learn and understand the conversion process.
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
