'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Home, BookOpen, ArrowRight, Divide, Check } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SimplifyResult {
  originalNumerator: number;
  originalDenominator: number;
  simplifiedNumerator: number;
  simplifiedDenominator: number;
  gcf: number;
  isAlreadySimplified: boolean;
  steps: string[];
  mixedNumber?: {
    whole: number;
    numerator: number;
    denominator: number;
  };
}

export default function SimplifyingFractionsCalculator() {
  const [numerator, setNumerator] = useState<string>('');
  const [denominator, setDenominator] = useState<string>('');
  const [result, setResult] = useState<SimplifyResult | null>(null);

  // Calculate GCD using Euclidean algorithm
  const calculateGCD = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a || 1;
  };

  // Find all factors of a number
  const findFactors = (n: number): number[] => {
    const factors: number[] = [];
    const absN = Math.abs(n);
    for (let i = 1; i <= absN; i++) {
      if (absN % i === 0) {
        factors.push(i);
      }
    }
    return factors;
  };

  const handleSimplify = () => {
    const num = parseInt(numerator);
    const denom = parseInt(denominator);

    if (isNaN(num) || isNaN(denom)) {
      alert('Please enter valid whole numbers for both numerator and denominator');
      return;
    }

    if (denom === 0) {
      alert('Denominator cannot be zero');
      return;
    }

    // Calculate GCF
    const gcf = calculateGCD(num, denom);
    const simplifiedNum = num / gcf;
    const simplifiedDenom = denom / gcf;
    const isAlreadySimplified = gcf === 1;

    // Build steps
    const steps: string[] = [];

    steps.push(`Original fraction: ${num}/${denom}`);

    if (isAlreadySimplified) {
      steps.push(`This fraction is already in its simplest form because the only common factor of ${Math.abs(num)} and ${Math.abs(denom)} is 1.`);
    } else {
      const numFactors = findFactors(num);
      const denomFactors = findFactors(denom);

      steps.push(`Find all factors of the numerator (${Math.abs(num)}): ${numFactors.join(', ')}`);
      steps.push(`Find all factors of the denominator (${Math.abs(denom)}): ${denomFactors.join(', ')}`);

      const commonFactors = numFactors.filter(f => denomFactors.includes(f));
      steps.push(`Common factors: ${commonFactors.join(', ')}`);
      steps.push(`Greatest Common Factor (GCF): ${gcf}`);
      steps.push(`Divide both numerator and denominator by the GCF (${gcf}):`);
      steps.push(`${num} ÷ ${gcf} = ${simplifiedNum}`);
      steps.push(`${denom} ÷ ${gcf} = ${simplifiedDenom}`);
      steps.push(`Simplified fraction: ${simplifiedNum}/${simplifiedDenom}`);
    }

    // Check if improper fraction and convert to mixed number
    let mixedNumber = undefined;
    if (Math.abs(simplifiedNum) >= Math.abs(simplifiedDenom)) {
      const whole = Math.floor(Math.abs(simplifiedNum) / Math.abs(simplifiedDenom)) * (simplifiedNum < 0 ? -1 : 1);
      const remainder = Math.abs(simplifiedNum) % Math.abs(simplifiedDenom);

      if (remainder !== 0) {
        mixedNumber = {
          whole,
          numerator: remainder,
          denominator: Math.abs(simplifiedDenom),
        };
        steps.push(`\nConverting to mixed number:`);
        steps.push(`${Math.abs(simplifiedNum)} ÷ ${Math.abs(simplifiedDenom)} = ${Math.abs(whole)} remainder ${remainder}`);
        steps.push(`As a mixed number: ${whole} ${remainder}/${Math.abs(simplifiedDenom)}`);
      } else {
        steps.push(`\nThis improper fraction simplifies to a whole number: ${whole}`);
      }
    }

    setResult({
      originalNumerator: num,
      originalDenominator: denom,
      simplifiedNumerator: simplifiedNum,
      simplifiedDenominator: simplifiedDenom,
      gcf,
      isAlreadySimplified,
      steps,
      mixedNumber,
    });
  };

  const handleClear = () => {
    setNumerator('');
    setDenominator('');
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What does it mean to simplify a fraction?","acceptedAnswer":{"@type":"Answer","text":"Simplifying a fraction means reducing it to its lowest terms by dividing both the numerator and denominator by their greatest common factor (GCF). The simplified fraction has the same value but uses the smallest possible whole numbers. For example, 8/12 simplified is 2/3."}},{"@type":"Question","name":"How do I know when a fraction is fully simplified?","acceptedAnswer":{"@type":"Answer","text":"A fraction is fully simplified when the only common factor between the numerator and denominator is 1. In other words, there\'s no number (except 1) that divides evenly into both numbers. For example, 3/7 is fully simplified because 3 and 7 share no common factors except 1."}},{"@type":"Question","name":"What is the GCF and why is it important?","acceptedAnswer":{"@type":"Answer","text":"The GCF (Greatest Common Factor) is the largest number that divides evenly into both the numerator and denominator. It\'s important because dividing by the GCF gives you the simplified fraction in one step, rather than repeatedly dividing by smaller factors. For 24 and 36, the GCF is 12, so 24/36 = 2/3."}},{"@type":"Question","name":"Can all fractions be simplified?","acceptedAnswer":{"@type":"Answer","text":"No, not all fractions can be simplified. Fractions that are already in lowest terms cannot be reduced further. Examples include 1/2, 2/3, 3/5, 7/11, and any fraction where the numerator and denominator are relatively prime (share no common factors except 1). These fractions are already in their simplest form."}},{"@type":"Question","name":"What\'s the difference between simplifying and converting to a mixed number?","acceptedAnswer":{"@type":"Answer","text":"Simplifying means reducing the fraction to lowest terms (dividing by the GCF), while converting to a mixed number means expressing an improper fraction (where numerator ≥ denominator) as a whole number plus a proper fraction. For example, 14/4 simplifies to 7/2, and 7/2 converts to the mixed number 3½."}},{"@type":"Question","name":"How do I simplify fractions with large numbers?","acceptedAnswer":{"@type":"Answer","text":"For large numbers, start by dividing by small common factors (2, 3, 5) or use the Euclidean algorithm to find the GCF. You can also use prime factorization: break both numbers into prime factors, then cancel common primes. Our calculator handles this automatically for any size numbers."}},{"@type":"Question","name":"Can I simplify a fraction with a negative number?","acceptedAnswer":{"@type":"Answer","text":"Yes! When simplifying fractions with negative numbers, simplify the absolute values normally, then apply the negative sign to the result. Convention is to place the negative sign in the numerator. For example, -8/12 or 8/-12 both simplify to -2/3. Never leave the negative in the denominator."}},{"@type":"Question","name":"Why is simplifying fractions important?","acceptedAnswer":{"@type":"Answer","text":"Simplified fractions are easier to understand, compare, and work with in calculations. They\'re the standard form expected in mathematics, make pattern recognition easier, and are required for correct answers in many contexts. Teachers expect answers in simplest form, and simplified fractions clearly communicate the relationship between numerator and denominator."}}]}' }}
      />
      <Navigation />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-orange-600 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Simplifying Fractions Calculator</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <Divide className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Simplifying Fractions Calculator
            </h1>
            <p className="text-lg md:text-xl text-orange-100 max-w-2xl mx-auto leading-relaxed">
              Reduce fractions to simplest form with step-by-step GCF method. Convert improper fractions to mixed numbers instantly.
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">

            {/* Input Section (Left Side - 2 columns) */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-orange-600" />
                  Simplify Fraction
                </h2>

                {/* Input Fields */}
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="numerator" className="text-sm font-semibold text-gray-700 mb-3 block">
                      Numerator (Top Number)
                    </Label>
                    <Input
                      id="numerator"
                      type="number"
                      placeholder="Enter numerator"
                      value={numerator}
                      onChange={(e) => setNumerator(e.target.value)}
                      className="text-center text-lg font-medium border-2"
                    />
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="w-full h-0.5 bg-gray-300"></div>
                  </div>

                  <div>
                    <Label htmlFor="denominator" className="text-sm font-semibold text-gray-700 mb-3 block">
                      Denominator (Bottom Number)
                    </Label>
                    <Input
                      id="denominator"
                      type="number"
                      placeholder="Enter denominator"
                      value={denominator}
                      onChange={(e) => setDenominator(e.target.value)}
                      className="text-center text-lg font-medium border-2"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={handleSimplify}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Simplify
                  </Button>
                  <Button
                    onClick={handleClear}
                    variant="outline"
                    className="px-6 py-6 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50"
                  >
                    Clear
                  </Button>
                </div>

                {/* Quick Example */}
                <div className="mt-6 p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">Quick Example:</h3>
                  <div className="text-sm text-gray-700">
                    <p>14/3 simplifies to 4⅔</p>
                    <p className="mt-1">GCF(14, 3) = 1 (already simplified)</p>
                    <p className="mt-1">Converts to mixed number: 4 2/3</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section (Right Side - 3 columns) */}
            <div className="lg:col-span-3">
              {result ? (
                <div className="space-y-6">
                  {/* Answer Card */}
                  <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4">Simplified Fraction</h3>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <div className="flex items-center justify-center gap-4 text-2xl md:text-3xl font-bold">
                        <div className="inline-flex flex-col items-center justify-center">
                          <span className="text-3xl md:text-4xl font-semibold px-3">{result.originalNumerator}</span>
                          <span className="w-full border-t-2 border-white my-1"></span>
                          <span className="text-3xl md:text-4xl font-semibold px-3">{result.originalDenominator}</span>
                        </div>
                        <span>=</span>
                        <div className="inline-flex flex-col items-center justify-center">
                          <span className="text-4xl md:text-5xl font-semibold px-3">{result.simplifiedNumerator}</span>
                          <span className="w-full border-t-2 border-white my-2"></span>
                          <span className="text-4xl md:text-5xl font-semibold px-3">{result.simplifiedDenominator}</span>
                        </div>
                      </div>

                      {result.isAlreadySimplified && (
                        <div className="mt-4 flex items-center justify-center gap-2 text-green-200">
                          <Check className="w-5 h-5" />
                          <span className="text-sm font-medium">Already in simplest form!</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mixed Number Card (if applicable) */}
                  {result.mixedNumber && (
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">As Mixed Number</h3>
                      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 text-center">
                        <div className="flex items-center justify-center gap-3 text-4xl md:text-5xl font-bold text-orange-600">
                          <span>{result.mixedNumber.whole}</span>
                          <div className="inline-flex flex-col items-center justify-center text-2xl md:text-3xl">
                            <span className="px-2">{result.mixedNumber.numerator}</span>
                            <span className="w-full border-t-2 border-orange-600"></span>
                            <span className="px-2">{result.mixedNumber.denominator}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* GCF Info */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Greatest Common Factor (GCF)
                    </h3>
                    <div className="bg-gray-50 rounded-xl p-6 text-center">
                      <p className="text-5xl font-bold text-orange-600">{result.gcf}</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Divided both numerator and denominator by {result.gcf}
                      </p>
                    </div>
                  </div>

                  {/* Step-by-Step Solution */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-orange-600" />
                      Step-by-Step Solution
                    </h3>
                    <div className="space-y-4">
                      {result.steps.map((step, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold mt-1">
                            {index + 1}
                          </div>
                          <p className="text-gray-700 leading-relaxed flex-1 whitespace-pre-line">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <Divide className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    Enter a fraction and click Simplify to see the simplified form
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Educational Content Section */}
      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Understanding Fraction Simplification
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Simplifying fractions, also called reducing fractions, is the process of making a fraction as simple as possible by dividing both the numerator and denominator by their greatest common factor (GCF). A simplified fraction has the smallest possible whole numbers in the numerator and denominator while maintaining the same value.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                For example, the fraction 8/12 can be simplified to 2/3 by dividing both numbers by 4 (their GCF). Both fractions represent the same amount, but 2/3 is easier to work with and understand. This is why teachers and mathematicians prefer fractions in their simplest form.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our Simplifying Fractions Calculator makes this process instant and educational. It not only gives you the simplified fraction but also shows you the complete step-by-step process, including finding all factors, identifying the GCF, and converting improper fractions to mixed numbers when applicable.
              </p>
            </section>

            {/* How to Simplify Fractions */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Simplify Fractions: Step-by-Step Method
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                There are several methods to simplify fractions. The most reliable and commonly taught method uses the Greatest Common Factor (GCF):
              </p>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">GCF Method (Most Common)</h3>
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <strong className="text-gray-900">Find all factors of the numerator:</strong>
                      <p className="text-gray-700 mt-1">List all numbers that divide evenly into the numerator. For 12: 1, 2, 3, 4, 6, 12</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <strong className="text-gray-900">Find all factors of the denominator:</strong>
                      <p className="text-gray-700 mt-1">List all numbers that divide evenly into the denominator. For 18: 1, 2, 3, 6, 9, 18</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <strong className="text-gray-900">Identify common factors:</strong>
                      <p className="text-gray-700 mt-1">Find factors that appear in both lists. Common factors of 12 and 18: 1, 2, 3, 6</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                    <div>
                      <strong className="text-gray-900">Select the Greatest Common Factor:</strong>
                      <p className="text-gray-700 mt-1">Choose the largest common factor. GCF of 12 and 18 is 6</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">5</span>
                    <div>
                      <strong className="text-gray-900">Divide both by the GCF:</strong>
                      <p className="text-gray-700 mt-1">12 ÷ 6 = 2 and 18 ÷ 6 = 3, so 12/18 = 2/3</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Alternative: Divide by Common Factors</h3>
                <p className="text-gray-700 mb-3">
                  If you can't find the GCF immediately, you can repeatedly divide by common factors:
                </p>
                <div className="bg-white p-4 rounded-lg text-sm font-mono">
                  <p>12/18 ÷ 2 = 6/9</p>
                  <p>6/9 ÷ 3 = 2/3</p>
                  <p className="mt-2 text-gray-600">Continue until no common factors remain (except 1)</p>
                </div>
              </div>
            </section>

            {/* How to Use Calculator */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Use This Calculator
              </h2>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <strong className="text-gray-900">Enter the Numerator:</strong>
                      <p className="text-gray-700 mt-1">Type the top number of your fraction in the first field.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <strong className="text-gray-900">Enter the Denominator:</strong>
                      <p className="text-gray-700 mt-1">Type the bottom number of your fraction in the second field.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <strong className="text-gray-900">Click Simplify:</strong>
                      <p className="text-gray-700 mt-1">The calculator will instantly show the simplified fraction, GCF, and complete working steps.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                    <div>
                      <strong className="text-gray-900">Review the Solution:</strong>
                      <p className="text-gray-700 mt-1">Study the step-by-step explanation to understand the simplification process. If applicable, see the mixed number conversion too.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            {/* Common Examples */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Common Fraction Simplification Examples
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-orange-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-600 mb-3">Easy Examples</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 2/4 = 1/2 (GCF: 2)</li>
                    <li>• 3/6 = 1/2 (GCF: 3)</li>
                    <li>• 4/8 = 1/2 (GCF: 4)</li>
                    <li>• 5/10 = 1/2 (GCF: 5)</li>
                    <li>• 6/12 = 1/2 (GCF: 6)</li>
                    <li>• 10/20 = 1/2 (GCF: 10)</li>
                  </ul>
                </div>
                <div className="bg-white border-2 border-red-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-600 mb-3">Medium Difficulty</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 12/16 = 3/4 (GCF: 4)</li>
                    <li>• 15/25 = 3/5 (GCF: 5)</li>
                    <li>• 18/24 = 3/4 (GCF: 6)</li>
                    <li>• 20/30 = 2/3 (GCF: 10)</li>
                    <li>• 24/36 = 2/3 (GCF: 12)</li>
                    <li>• 27/45 = 3/5 (GCF: 9)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Related Calculators */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Related Fraction Calculators
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/calculators/fractions-calculator" className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-4 hover:border-orange-400 transition-all">
                  <h3 className="text-lg font-bold text-orange-600 mb-2">Fractions Calculator</h3>
                  <p className="text-gray-700 text-sm">Add, subtract, multiply, and divide fractions with step-by-step solutions.</p>
                </Link>
                <Link href="/calculators/mixed-numbers-calculator" className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-4 hover:border-orange-400 transition-all">
                  <h3 className="text-lg font-bold text-orange-600 mb-2">Mixed Numbers Calculator</h3>
                  <p className="text-gray-700 text-sm">Work with mixed numbers and convert between improper fractions.</p>
                </Link>
                <Link href="/calculators/decimal-to-fraction-calculator" className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-4 hover:border-orange-400 transition-all">
                  <h3 className="text-lg font-bold text-orange-600 mb-2">Decimal to Fraction Calculator</h3>
                  <p className="text-gray-700 text-sm">Convert decimals to fractions in simplest form with detailed steps.</p>
                </Link>
                <Link href="/calculators/fraction-to-decimal-calculator" className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-4 hover:border-orange-400 transition-all">
                  <h3 className="text-lg font-bold text-orange-600 mb-2">Fraction to Decimal Calculator</h3>
                  <p className="text-gray-700 text-sm">Convert fractions to decimals with GCF reduction and precision control.</p>
                </Link>
              </div>
            </section>

            {/* Real-World Applications */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Real-World Applications of Simplifying Fractions
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-orange-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-600 mb-3">🍳 Cooking and Baking</h3>
                  <p className="text-gray-700">
                    Recipes often require fraction simplification. If a recipe calls for 6/8 cup of flour, it's easier to measure 3/4 cup. Doubling or halving recipes also requires simplified fractions.
                  </p>
                </div>
                <div className="bg-white border-2 border-red-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-600 mb-3">🏗️ Construction & Carpentry</h3>
                  <p className="text-gray-700">
                    Builders simplify measurements for clarity. A board measuring 12/16 inches is better expressed as 3/4 inches. This prevents measurement errors and improves communication.
                  </p>
                </div>
                <div className="bg-white border-2 border-orange-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-600 mb-3">📊 Data Analysis</h3>
                  <p className="text-gray-700">
                    When presenting survey results or statistics, simplified fractions are clearer. Instead of saying 40/100 people agreed, saying 2/5 is more concise and easier to understand.
                  </p>
                </div>
                <div className="bg-white border-2 border-red-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-600 mb-3">🎵 Music Theory</h3>
                  <p className="text-gray-700">
                    Musical time signatures use fractions. Complex signatures like 8/8 are simplified to 4/4 (common time) for easier reading and understanding by musicians.
                  </p>
                </div>
                <div className="bg-white border-2 border-orange-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-600 mb-3">💰 Financial Calculations</h3>
                  <p className="text-gray-700">
                    When splitting costs or calculating shares, simplified fractions make math easier. Dividing $120 by 8 people is simpler when expressed as 1/8 of the total rather than 15/120.
                  </p>
                </div>
                <div className="bg-white border-2 border-red-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-600 mb-3">📐 Engineering & Design</h3>
                  <p className="text-gray-700">
                    Engineers and designers use simplified fractions for precision. Gear ratios, scale models, and proportional designs all benefit from fractions in lowest terms.
                  </p>
                </div>
              </div>
            </section>

            {/* Common Mistakes */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Common Mistakes When Simplifying Fractions
              </h2>
              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Dividing by Different Numbers</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> 12/18 → Divide top by 2 and bottom by 3 = 6/6 ✗
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> 12/18 → Divide both by GCF (6) = 2/3 ✓
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Always divide both numerator and denominator by the same number.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Not Finding the GCF</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Incomplete:</strong> 24/36 → Divide by 2 = 12/18 (still not simplest form)
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> 24/36 → Divide by GCF (12) = 2/3 ✓
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Using the GCF ensures you reach the simplest form in one step.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Subtracting Instead of Dividing</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> 10/15 → Subtract 5 from both = 5/10 ✗
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> 10/15 → Divide both by 5 = 2/3 ✓
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Simplification requires division, not subtraction.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Changing the Fraction's Value</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> 3/4 → Adding 1 to both = 4/5 ✗ (Different value!)
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> 3/4 stays 3/4 if already simplified ✓
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    The simplified fraction must equal the original fraction.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Stopping Too Early</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Incomplete:</strong> 48/72 → Divide by 2 = 24/36 → Divide by 2 = 12/18 (not done!)
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> 48/72 → Divide by GCF (24) = 2/3 ✓
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Continue simplifying until no common factors remain except 1.
                  </p>
                </div>
              </div>
            </section>

            {/* Tips and Tricks */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Tips and Tricks for Simplifying Fractions
              </h2>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Quick Divisibility Check:</strong>
                      <p className="text-gray-700 mt-1">
                        If both numbers are even, divide by 2. If both end in 0 or 5, divide by 5. If digits of both numbers sum to a multiple of 3, divide by 3.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Use Prime Factorization:</strong>
                      <p className="text-gray-700 mt-1">
                        Break both numbers into prime factors. Cancel common primes. For 24/36: (2×2×2×3)/(2×2×3×3) = 2/3 after canceling 2×2×3.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Recognize Common Patterns:</strong>
                      <p className="text-gray-700 mt-1">
                        Memorize that any number over itself equals 1 (5/5 = 1), and that numerator over twice itself equals 1/2 (4/8 = 1/2).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Start with Small Numbers:</strong>
                      <p className="text-gray-700 mt-1">
                        Try dividing by 2, then 3, then 5. These are the most common factors and will often lead you to the answer quickly.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Check Your Answer:</strong>
                      <p className="text-gray-700 mt-1">
                        Multiply the simplified numerator and denominator by the GCF. You should get back your original fraction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What does it mean to simplify a fraction?
                  </h3>
                  <p className="text-gray-700">
                    Simplifying a fraction means reducing it to its lowest terms by dividing both the numerator and denominator by their greatest common factor (GCF). The simplified fraction has the same value but uses the smallest possible whole numbers. For example, 8/12 simplified is 2/3.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do I know when a fraction is fully simplified?
                  </h3>
                  <p className="text-gray-700">
                    A fraction is fully simplified when the only common factor between the numerator and denominator is 1. In other words, there's no number (except 1) that divides evenly into both numbers. For example, 3/7 is fully simplified because 3 and 7 share no common factors except 1.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What is the GCF and why is it important?
                  </h3>
                  <p className="text-gray-700">
                    The GCF (Greatest Common Factor) is the largest number that divides evenly into both the numerator and denominator. It's important because dividing by the GCF gives you the simplified fraction in one step, rather than repeatedly dividing by smaller factors. For 24 and 36, the GCF is 12, so 24/36 = 2/3.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can all fractions be simplified?
                  </h3>
                  <p className="text-gray-700">
                    No, not all fractions can be simplified. Fractions that are already in lowest terms cannot be reduced further. Examples include 1/2, 2/3, 3/5, 7/11, and any fraction where the numerator and denominator are relatively prime (share no common factors except 1). These fractions are already in their simplest form.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What's the difference between simplifying and converting to a mixed number?
                  </h3>
                  <p className="text-gray-700">
                    Simplifying means reducing the fraction to lowest terms (dividing by the GCF), while converting to a mixed number means expressing an improper fraction (where numerator ≥ denominator) as a whole number plus a proper fraction. For example, 14/4 simplifies to 7/2, and 7/2 converts to the mixed number 3½.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do I simplify fractions with large numbers?
                  </h3>
                  <p className="text-gray-700">
                    For large numbers, start by dividing by small common factors (2, 3, 5) or use the Euclidean algorithm to find the GCF. You can also use prime factorization: break both numbers into prime factors, then cancel common primes. Our calculator handles this automatically for any size numbers.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can I simplify a fraction with a negative number?
                  </h3>
                  <p className="text-gray-700">
                    Yes! When simplifying fractions with negative numbers, simplify the absolute values normally, then apply the negative sign to the result. Convention is to place the negative sign in the numerator. For example, -8/12 or 8/-12 both simplify to -2/3. Never leave the negative in the denominator.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Why is simplifying fractions important?
                  </h3>
                  <p className="text-gray-700">
                    Simplified fractions are easier to understand, compare, and work with in calculations. They're the standard form expected in mathematics, make pattern recognition easier, and are required for correct answers in many contexts. Teachers expect answers in simplest form, and simplified fractions clearly communicate the relationship between numerator and denominator.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What if the numerator is larger than the denominator?
                  </h3>
                  <p className="text-gray-700">
                    If the numerator is larger than the denominator, you have an improper fraction. You should still simplify it first by dividing by the GCF, then you can optionally convert it to a mixed number. For example, 18/12 simplifies to 3/2, which equals 1½ as a mixed number.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Does this calculator work with mixed numbers?
                  </h3>
                  <p className="text-gray-700">
                    This calculator works with improper fractions and will show you the mixed number equivalent if applicable. If you start with a mixed number, convert it to an improper fraction first (multiply the whole number by the denominator, add the numerator, keep the same denominator), then use this calculator. For dedicated mixed number operations, try our Mixed Numbers Calculator.
                  </p>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Conclusion
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Simplifying fractions is a fundamental mathematical skill that makes working with fractions easier and more intuitive. Whether you're a student learning fraction operations, a teacher preparing lessons, or anyone needing quick fraction simplification, our calculator provides instant, accurate results with detailed explanations.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                By showing the complete step-by-step process including factor identification, GCF calculation, and mixed number conversion, this tool serves as both a practical calculator and an educational resource. Understanding how to simplify fractions builds a strong foundation for more advanced mathematical concepts including algebra, ratios, proportions, and beyond.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Use this calculator regularly to check your work, learn the simplification process, and develop your mathematical intuition. Remember that practice makes perfect—the more you work with fractions, the easier simplification becomes. Our calculator is here to support your learning journey every step of the way!
              </p>
            </section>

          </div>
        </div>
      </div>

      {/* Book Your Session CTA */}
      <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Need Help with Fractions?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you master fraction simplification, understand GCF, and excel in mathematics. Get personalized one-on-one guidance tailored to your learning style.
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

      <Footer />
    </div>
  );
}
