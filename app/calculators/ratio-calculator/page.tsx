'use client';

import { useState } from 'react';
import { Scale, ArrowRight, BookOpen, GraduationCap, Lightbulb, CheckCircle2, Info, XCircle } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

interface RatioResult {
  isEqual: boolean;
  simplifiedFirst: string;
  simplifiedSecond: string;
  crossProduct1: number;
  crossProduct2: number;
  steps: string[];
}

export default function RatioCalculator() {
  const [a, setA] = useState<string>('2');
  const [b, setB] = useState<string>('3');
  const [c, setC] = useState<string>('4');
  const [d, setD] = useState<string>('6');
  const [result, setResult] = useState<RatioResult | null>(null);

  const calculateRatio = () => {
    const aVal = parseFloat(a);
    const bVal = parseFloat(b);
    const cVal = parseFloat(c);
    const dVal = parseFloat(d);

    if (isNaN(aVal) || isNaN(bVal) || isNaN(cVal) || isNaN(dVal)) {
      alert('Please enter valid numbers for all fields');
      return;
    }

    if (bVal === 0 || dVal === 0) {
      alert('Denominators (B and D) cannot be zero');
      return;
    }

    const steps: string[] = [];
    steps.push(`Given ratios: ${aVal} : ${bVal} = ${cVal} : ${dVal}`);

    // Simplify first ratio
    const gcd1 = gcd(aVal, bVal);
    const simplifiedA = aVal / gcd1;
    const simplifiedB = bVal / gcd1;
    const simplifiedFirst = `${simplifiedA} : ${simplifiedB}`;

    if (gcd1 > 1) {
      steps.push(`Simplify first ratio: ${aVal} : ${bVal} = ${simplifiedFirst} (divided by GCD ${gcd1})`);
    } else {
      steps.push(`First ratio ${aVal} : ${bVal} is already in simplest form`);
    }

    // Simplify second ratio
    const gcd2 = gcd(cVal, dVal);
    const simplifiedC = cVal / gcd2;
    const simplifiedD = dVal / gcd2;
    const simplifiedSecond = `${simplifiedC} : ${simplifiedD}`;

    if (gcd2 > 1) {
      steps.push(`Simplify second ratio: ${cVal} : ${dVal} = ${simplifiedSecond} (divided by GCD ${gcd2})`);
    } else {
      steps.push(`Second ratio ${cVal} : ${dVal} is already in simplest form`);
    }

    // Cross multiplication check
    const crossProduct1 = aVal * dVal;
    const crossProduct2 = bVal * cVal;

    steps.push(`\nVerify using cross multiplication:`);
    steps.push(`A × D = ${aVal} × ${dVal} = ${crossProduct1}`);
    steps.push(`B × C = ${bVal} × ${cVal} = ${crossProduct2}`);

    const isEqual = Math.abs(crossProduct1 - crossProduct2) < 0.0001;

    if (isEqual) {
      steps.push(`\nSince ${crossProduct1} = ${crossProduct2}, the ratios are EQUAL`);
      steps.push(`Therefore: ${aVal} : ${bVal} = ${cVal} : ${dVal} is TRUE`);
    } else {
      steps.push(`\nSince ${crossProduct1} ≠ ${crossProduct2}, the ratios are NOT EQUAL`);
      steps.push(`Therefore: ${aVal} : ${bVal} = ${cVal} : ${dVal} is FALSE`);
    }

    setResult({
      isEqual,
      simplifiedFirst,
      simplifiedSecond,
      crossProduct1,
      crossProduct2,
      steps
    });
  };

  const clearCalculator = () => {
    setA('');
    setB('');
    setC('');
    setD('');
    setResult(null);
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Scale className="h-12 w-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Ratio Calculator</h1>
            </div>
            <p className="text-xl text-center text-purple-100 max-w-3xl mx-auto">
              Solve and verify ratios A:B = C:D with step-by-step solutions and comprehensive ratio analysis
            </p>
          </div>
        </div>

        {/* Calculator Section */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-2 border-purple-200">
            <div className="bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-lg mb-6">
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                Ratio Solver
              </h2>
            </div>

            {/* Ratio Input Section - A : B = C : D */}
            <div className="mb-6">
              <div className="flex items-center justify-center gap-3 flex-wrap mb-4">
                <div className="text-center">
                  <Label className="text-lg font-bold text-gray-700 mb-2 block">A</Label>
                  <Input
                    type="number"
                    step="any"
                    value={a}
                    onChange={(e) => setA(e.target.value)}
                    className="w-32 text-lg text-center font-semibold"
                  />
                </div>

                <span className="text-4xl font-bold text-gray-600 mt-6">:</span>

                <div className="text-center">
                  <Label className="text-lg font-bold text-gray-700 mb-2 block">B</Label>
                  <Input
                    type="number"
                    step="any"
                    value={b}
                    onChange={(e) => setB(e.target.value)}
                    className="w-32 text-lg text-center font-semibold"
                  />
                </div>

                <span className="text-4xl font-bold text-gray-600 mt-6">=</span>

                <div className="text-center">
                  <Label className="text-lg font-bold text-gray-700 mb-2 block">C</Label>
                  <Input
                    type="number"
                    step="any"
                    value={c}
                    onChange={(e) => setC(e.target.value)}
                    className="w-32 text-lg text-center font-semibold"
                  />
                </div>

                <span className="text-4xl font-bold text-gray-600 mt-6">:</span>

                <div className="text-center">
                  <Label className="text-lg font-bold text-gray-700 mb-2 block">D</Label>
                  <Input
                    type="number"
                    step="any"
                    value={d}
                    onChange={(e) => setD(e.target.value)}
                    className="w-32 text-lg text-center font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mb-6">
              <Button
                onClick={clearCalculator}
                variant="outline"
                className="flex-1 py-6 text-lg"
              >
                Clear
              </Button>
              <Button
                onClick={calculateRatio}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-6 text-lg"
              >
                Calculate
              </Button>
            </div>

            {/* Results */}
            {result && (
              <div className="space-y-6">
                {/* Answer */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-blue-200">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Answer:</h3>
                  <div className="text-center space-y-3">
                    <p className="text-2xl font-bold text-gray-800">
                      {a} : {b} = {c} : {d}
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-xl font-semibold text-gray-700">is</span>
                      {result.isEqual ? (
                        <span className="text-3xl font-bold text-green-600 flex items-center">
                          <CheckCircle2 className="h-8 w-8 mr-2" />
                          TRUE
                        </span>
                      ) : (
                        <span className="text-3xl font-bold text-red-600 flex items-center">
                          <XCircle className="h-8 w-8 mr-2" />
                          FALSE
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Simplified Ratios */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm font-semibold text-gray-600 mb-2">First Ratio (Simplified)</p>
                    <p className="text-2xl font-bold text-green-700 text-center">{result.simplifiedFirst}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm font-semibold text-gray-600 mb-2">Second Ratio (Simplified)</p>
                    <p className="text-2xl font-bold text-blue-700 text-center">{result.simplifiedSecond}</p>
                  </div>
                </div>

                {/* Cross Products */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-sm font-semibold text-gray-600 mb-2">Cross Multiplication Verification</p>
                  <div className="grid md:grid-cols-2 gap-3 text-center">
                    <p className="text-lg font-semibold text-gray-800">
                      A × D = {result.crossProduct1}
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      B × C = {result.crossProduct2}
                    </p>
                  </div>
                </div>

                {/* Step-by-Step Solution */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <CheckCircle2 className="h-6 w-6 mr-2 text-green-600" />
                    Step-by-Step Solution
                  </h3>
                  <div className="space-y-3">
                    {result.steps.map((step, index) => (
                      <div key={index} className={step.startsWith('\n') ? 'mt-4 pt-4 border-t border-gray-300' : ''}>
                        {step.startsWith('\n') ? (
                          <p className="text-gray-700 font-semibold">{step.replace('\n', '')}</p>
                        ) : (
                          <div className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold text-sm mr-3">
                              {index + 1}
                            </div>
                            <p className="text-gray-700 pt-1">{step}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Educational Content */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <BookOpen className="h-8 w-8 mr-3 text-purple-600" />
              Understanding Ratios and Proportions
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                A ratio is a comparison of two or more quantities showing the relative sizes of these quantities. Ratios
                are fundamental in mathematics and appear everywhere in real life—from cooking recipes and map scales to
                financial analysis and scientific research.
              </p>

              <div className="bg-purple-50 border-l-4 border-purple-600 p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">What is a Ratio?</h3>
                <p className="text-gray-700 mb-3">
                  A ratio compares two quantities by division. If you have 2 apples and 3 oranges, the ratio of apples
                  to oranges is written as:
                </p>
                <div className="text-center my-4">
                  <p className="text-2xl font-bold text-purple-600">2 : 3</p>
                  <p className="text-sm text-gray-600 mt-2">Read as "2 to 3"</p>
                </div>
                <p className="text-gray-700">
                  This can also be written as the fraction 2/3 or using the word "to" (2 to 3). All three notations
                  represent the same relationship.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Ratio Notation and Terminology</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Three Ways to Write Ratios</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><strong>Colon notation:</strong> 2 : 3</li>
                    <li><strong>Word form:</strong> 2 to 3</li>
                    <li><strong>Fraction form:</strong> 2/3</li>
                  </ul>
                  <p className="text-gray-600 mt-3 text-sm italic">
                    All three forms express the same relationship between quantities.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Parts of a Ratio</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><strong>Terms:</strong> The numbers being compared</li>
                    <li><strong>Antecedent:</strong> The first term (before the colon)</li>
                    <li><strong>Consequent:</strong> The second term (after the colon)</li>
                  </ul>
                  <p className="text-gray-600 mt-3 text-sm">
                    In 5 : 8, the antecedent is 5 and the consequent is 8.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">What is a Proportion?</h3>
              <p className="text-gray-700 mb-4">
                A proportion states that two ratios are equal. When we write A : B = C : D, we're saying that the ratio
                of A to B is the same as the ratio of C to D.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-bold text-blue-900 mb-3">Proportion Equation</h4>
                <div className="text-center my-3">
                  <p className="text-3xl font-bold text-blue-600">A : B = C : D</p>
                </div>
                <p className="text-gray-700 mb-2">This means:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>A/B = C/D (as fractions)</li>
                  <li>A × D = B × C (cross multiplication property)</li>
                </ul>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">How to Verify if Two Ratios are Equal</h3>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-bold text-gray-800 mb-3">Method 1: Cross Multiplication</h4>
                <p className="text-gray-700 mb-3">
                  Two ratios A : B and C : D are equal if and only if A × D = B × C.
                </p>
                <div className="bg-white p-4 rounded border border-green-200">
                  <p className="text-gray-700 mb-2"><strong>Example:</strong> Check if 2 : 3 = 4 : 6</p>
                  <p className="text-gray-700">Cross multiply: 2 × 6 = 12 and 3 × 4 = 12</p>
                  <p className="text-gray-700"><strong>Since 12 = 12, the ratios are EQUAL</strong></p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-bold text-gray-800 mb-3">Method 2: Simplify Both Ratios</h4>
                <p className="text-gray-700 mb-3">
                  Reduce both ratios to their simplest form. If they simplify to the same ratio, they are equal.
                </p>
                <div className="bg-white p-4 rounded border border-green-200">
                  <p className="text-gray-700 mb-2"><strong>Example:</strong> Check if 4 : 6 = 6 : 9</p>
                  <p className="text-gray-700">Simplify 4 : 6 → Divide by GCD(4,6) = 2 → 2 : 3</p>
                  <p className="text-gray-700">Simplify 6 : 9 → Divide by GCD(6,9) = 3 → 2 : 3</p>
                  <p className="text-gray-700"><strong>Both simplify to 2 : 3, so they are EQUAL</strong></p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">How to Simplify Ratios</h3>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-bold text-gray-800 mb-3">Step-by-Step Process</h4>
                <ol className="list-decimal list-inside text-gray-700 space-y-3">
                  <li>
                    <strong>Find the GCD:</strong> Determine the greatest common divisor (GCD) of both terms in the ratio.
                  </li>
                  <li>
                    <strong>Divide both terms:</strong> Divide both the antecedent and consequent by the GCD.
                  </li>
                  <li>
                    <strong>Write the simplified ratio:</strong> The result is the ratio in its simplest form.
                  </li>
                </ol>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Examples of Ratio Problems</h3>

              <div className="space-y-6">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-purple-900 mb-3">Example 1: Verifying Equal Ratios</h4>
                  <div className="bg-white p-4 rounded border border-purple-200">
                    <p className="text-gray-700 mb-2"><strong>Question:</strong> Is 3 : 4 = 9 : 12?</p>
                    <p className="text-gray-700 mb-2"><strong>Solution using cross multiplication:</strong></p>
                    <p className="text-gray-700">3 × 12 = 36</p>
                    <p className="text-gray-700">4 × 9 = 36</p>
                    <p className="text-gray-700 mt-2"><strong>Answer:</strong> Yes, since 36 = 36, the ratios are equal (TRUE)</p>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-purple-900 mb-3">Example 2: Non-Equal Ratios</h4>
                  <div className="bg-white p-4 rounded border border-purple-200">
                    <p className="text-gray-700 mb-2"><strong>Question:</strong> Is 2 : 5 = 3 : 7?</p>
                    <p className="text-gray-700 mb-2"><strong>Solution using cross multiplication:</strong></p>
                    <p className="text-gray-700">2 × 7 = 14</p>
                    <p className="text-gray-700">5 × 3 = 15</p>
                    <p className="text-gray-700 mt-2"><strong>Answer:</strong> No, since 14 ≠ 15, the ratios are not equal (FALSE)</p>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-purple-900 mb-3">Example 3: Simplifying a Ratio</h4>
                  <div className="bg-white p-4 rounded border border-purple-200">
                    <p className="text-gray-700 mb-2"><strong>Question:</strong> Simplify the ratio 18 : 24</p>
                    <p className="text-gray-700 mb-2"><strong>Solution:</strong></p>
                    <p className="text-gray-700">Find GCD(18, 24) = 6</p>
                    <p className="text-gray-700">18 ÷ 6 = 3</p>
                    <p className="text-gray-700">24 ÷ 6 = 4</p>
                    <p className="text-gray-700 mt-2"><strong>Answer:</strong> 18 : 24 = 3 : 4 (simplest form)</p>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-purple-900 mb-3">Example 4: Finding a Missing Value</h4>
                  <div className="bg-white p-4 rounded border border-purple-200">
                    <p className="text-gray-700 mb-2"><strong>Question:</strong> Find x if 5 : 8 = x : 24</p>
                    <p className="text-gray-700 mb-2"><strong>Solution:</strong></p>
                    <p className="text-gray-700">Using cross multiplication: 5 × 24 = 8 × x</p>
                    <p className="text-gray-700">120 = 8x</p>
                    <p className="text-gray-700">x = 120 ÷ 8</p>
                    <p className="text-gray-700 mt-2"><strong>Answer:</strong> x = 15</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Types of Ratios</h3>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                  <h4 className="text-lg font-bold text-blue-900 mb-2">Part-to-Part Ratio</h4>
                  <p className="text-gray-700 mb-2">
                    Compares one part to another part of the whole.
                  </p>
                  <p className="text-gray-600 text-sm italic">
                    Example: In a class of 12 boys and 15 girls, the ratio of boys to girls is 12 : 15 or 4 : 5.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                  <h4 className="text-lg font-bold text-green-900 mb-2">Part-to-Whole Ratio</h4>
                  <p className="text-gray-700 mb-2">
                    Compares one part to the total amount.
                  </p>
                  <p className="text-gray-600 text-sm italic">
                    Example: 12 boys out of 27 total students gives a ratio of 12 : 27 or 4 : 9.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Real-World Applications of Ratios</h3>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
                  <h4 className="text-lg font-bold text-orange-900 mb-2">Cooking and Recipes</h4>
                  <p className="text-gray-700">
                    Recipes use ratios to maintain the correct proportions of ingredients. If a recipe calls for a 2:1
                    ratio of flour to sugar, doubling the recipe requires maintaining that same ratio.
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
                  <h4 className="text-lg font-bold text-purple-900 mb-2">Maps and Scale</h4>
                  <p className="text-gray-700">
                    Map scales use ratios to represent distances. A scale of 1:50,000 means 1 cm on the map represents
                    50,000 cm (500 m) in real life.
                  </p>
                </div>

                <div className="bg-pink-50 border border-pink-200 rounded-lg p-5">
                  <h4 className="text-lg font-bold text-pink-900 mb-2">Finance and Business</h4>
                  <p className="text-gray-700">
                    Financial ratios like debt-to-equity ratio, profit margins, and price-earnings ratios are crucial for
                    analyzing business performance and making investment decisions.
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-5">
                  <h4 className="text-lg font-bold text-red-900 mb-2">Speed and Density</h4>
                  <p className="text-gray-700">
                    Speed is a ratio of distance to time (miles per hour). Density is a ratio of mass to volume. These
                    ratios help us understand and compare different physical properties.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Converting Between Ratios, Fractions, and Percentages</h3>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-bold text-yellow-900 mb-3">Conversion Methods</h4>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <p className="font-semibold">Ratio to Fraction:</p>
                    <p className="text-sm">The ratio a : b can be written as the fraction a/b</p>
                    <p className="text-xs italic text-gray-600">Example: 3 : 4 = 3/4</p>
                  </div>
                  <div>
                    <p className="font-semibold">Fraction to Ratio:</p>
                    <p className="text-sm">The fraction a/b can be written as the ratio a : b</p>
                    <p className="text-xs italic text-gray-600">Example: 5/8 = 5 : 8</p>
                  </div>
                  <div>
                    <p className="font-semibold">Ratio to Percentage:</p>
                    <p className="text-sm">Convert to fraction, then multiply by 100%</p>
                    <p className="text-xs italic text-gray-600">Example: 3 : 4 = 3/4 = 0.75 = 75%</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Common Mistakes to Avoid</h3>

              <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-6">
                <h4 className="text-lg font-bold text-red-900 mb-3">Watch Out For These Errors:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-3">
                  <li>
                    <strong>Reversing the order:</strong> The ratio 2 : 3 is not the same as 3 : 2. Order matters in ratios!
                  </li>
                  <li>
                    <strong>Adding or subtracting ratios incorrectly:</strong> You cannot add or subtract ratios directly
                    like you would numbers. Convert to fractions first.
                  </li>
                  <li>
                    <strong>Forgetting to simplify:</strong> Always simplify ratios to their lowest terms for clarity.
                    12 : 18 should be written as 2 : 3.
                  </li>
                  <li>
                    <strong>Mixing units:</strong> Ensure both quantities are in the same units before comparing them.
                    Don't compare 2 feet : 3 inches directly—convert to the same unit first.
                  </li>
                  <li>
                    <strong>Incorrect cross multiplication:</strong> When checking if A : B = C : D, multiply A × D and
                    B × C, not A × B and C × D.
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Properties of Proportions</h3>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-bold text-blue-900 mb-3">Important Properties</h4>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <p className="font-semibold">1. Cross Product Property:</p>
                    <p>If A : B = C : D, then A × D = B × C</p>
                  </div>
                  <div>
                    <p className="font-semibold">2. Alternation Property:</p>
                    <p>If A : B = C : D, then A : C = B : D</p>
                  </div>
                  <div>
                    <p className="font-semibold">3. Inversion Property:</p>
                    <p>If A : B = C : D, then B : A = D : C</p>
                  </div>
                  <div>
                    <p className="font-semibold">4. Addition Property:</p>
                    <p>If A : B = C : D, then (A + B) : B = (C + D) : D</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Extended Ratios</h3>
              <p className="text-gray-700 mb-4">
                Ratios can compare more than two quantities. For example, A : B : C = 2 : 3 : 5 means that for every 2
                parts of A, there are 3 parts of B and 5 parts of C.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-5 mb-6">
                <h4 className="text-lg font-bold text-green-900 mb-2">Example with Three Terms</h4>
                <p className="text-gray-700 mb-2">
                  A recipe calls for ingredients in the ratio 2 : 3 : 5 (flour : sugar : milk).
                </p>
                <p className="text-gray-700 mb-2">
                  If you use 6 cups of flour:
                </p>
                <ul className="list-disc list-inside text-gray-700 ml-4">
                  <li>Flour: 2 parts × 3 = 6 cups</li>
                  <li>Sugar: 3 parts × 3 = 9 cups</li>
                  <li>Milk: 5 parts × 3 = 15 cups</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6 mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                  <Lightbulb className="h-6 w-6 mr-2 text-yellow-600" />
                  Key Takeaways
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>A ratio compares two or more quantities using division</li>
                  <li>Ratios can be written as a : b, a to b, or a/b</li>
                  <li>Two ratios are equal (form a proportion) if their cross products are equal</li>
                  <li>Always simplify ratios by dividing both terms by their GCD</li>
                  <li>Use cross multiplication to verify if A : B = C : D (check if A × D = B × C)</li>
                  <li>Order matters in ratios: 2 : 3 ≠ 3 : 2</li>
                  <li>Ratios are used everywhere in daily life, from cooking to finance to science</li>
                  <li>Make sure units are consistent before comparing quantities</li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <Info className="h-8 w-8 mr-3 text-purple-600" />
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              <details className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <summary className="cursor-pointer font-semibold text-gray-800 text-lg">
                  What is the difference between a ratio and a fraction?
                </summary>
                <p className="text-gray-700 mt-3">
                  While ratios and fractions are closely related, they have different meanings. A fraction represents a
                  part of a whole, while a ratio compares two separate quantities. For example, 3/4 as a fraction means
                  3 parts out of 4 total parts. As a ratio (3 : 4), it means for every 3 of one thing, there are 4 of
                  another. However, ratios can be written as fractions mathematically.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <summary className="cursor-pointer font-semibold text-gray-800 text-lg">
                  How do I know if two ratios are equivalent?
                </summary>
                <p className="text-gray-700 mt-3">
                  Use cross multiplication: for A : B = C : D to be true, A × D must equal B × C. Alternatively, simplify
                  both ratios to their lowest terms—if they simplify to the same ratio, they're equivalent. Our calculator
                  above does both checks automatically.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <summary className="cursor-pointer font-semibold text-gray-800 text-lg">
                  Can ratios be greater than 1?
                </summary>
                <p className="text-gray-700 mt-3">
                  Yes! Ratios can be any positive number. A ratio of 5 : 2 means the first quantity is 2.5 times the
                  second. Ratios greater than 1 (when written as fractions) simply mean the first quantity is larger than
                  the second.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <summary className="cursor-pointer font-semibold text-gray-800 text-lg">
                  What does it mean to simplify a ratio?
                </summary>
                <p className="text-gray-700 mt-3">
                  Simplifying a ratio means reducing it to its smallest whole number terms by dividing both parts by their
                  greatest common divisor (GCD). For example, 10 : 15 simplifies to 2 : 3 by dividing both by 5. The
                  simplified ratio represents the same relationship but with smaller, easier-to-work-with numbers.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <summary className="cursor-pointer font-semibold text-gray-800 text-lg">
                  How do I find a missing value in a proportion?
                </summary>
                <p className="text-gray-700 mt-3">
                  Use cross multiplication. If you have A : B = C : x and need to find x, cross multiply: A × x = B × C,
                  then solve for x by dividing: x = (B × C) / A. For example, in 3 : 4 = 6 : x, we get 3x = 24, so x = 8.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <summary className="cursor-pointer font-semibold text-gray-800 text-lg">
                  Why is order important in ratios?
                </summary>
                <p className="text-gray-700 mt-3">
                  The order in a ratio matters because it specifies which quantity comes first. A ratio of boys to girls
                  of 2 : 3 is different from a ratio of girls to boys of 3 : 2. Always make sure you understand what the
                  first and second quantities represent in the context of the problem.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <summary className="cursor-pointer font-semibold text-gray-800 text-lg">
                  Can ratios have decimal numbers?
                </summary>
                <p className="text-gray-700 mt-3">
                  While ratios can technically involve decimals (like 2.5 : 3.7), it's standard practice to convert them
                  to whole numbers for simplicity. Multiply both terms by the same power of 10 to eliminate decimals.
                  For example, 2.5 : 3.7 becomes 25 : 37 when multiplied by 10.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <summary className="cursor-pointer font-semibold text-gray-800 text-lg">
                  How are ratios used in real life?
                </summary>
                <p className="text-gray-700 mt-3">
                  Ratios appear everywhere: cooking recipes (ingredient proportions), map scales (1:50,000), finance
                  (debt-to-equity ratios), photography (aspect ratios like 16:9), medicine (dosage calculations),
                  construction (concrete mix ratios), and sports statistics (win-loss ratios). Understanding ratios is
                  essential for many practical applications.
                </p>
              </details>
            </div>
          </div>

          {/* Book Your Session CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg p-8 text-white text-center">
            <GraduationCap className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Need Help with Ratios and Proportions?</h2>
            <p className="text-xl text-purple-100 mb-6 max-w-2xl mx-auto">
              Our expert tutors can help you master ratios, proportions, and all aspects of mathematics. Get personalized
              one-on-one instruction tailored to your learning style.
            </p>
            <Link href="https://www.thetutorbridge.com/book-session">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-purple-50 text-lg px-8 py-6 h-auto font-semibold"
              >
                Book Your Session Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
