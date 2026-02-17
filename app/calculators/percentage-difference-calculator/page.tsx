'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Home, BookOpen, ArrowRight, Percent, TrendingUp } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PercentageDifferenceResult {
  value1: number;
  value2: number;
  percentageDifference: number;
  absoluteDifference: number;
  average: number;
  steps: string[];
}

export default function PercentageDifferenceCalculator() {
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [result, setResult] = useState<PercentageDifferenceResult | null>(null);

  const calculatePercentageDifference = () => {
    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);

    if (isNaN(v1) || isNaN(v2)) {
      alert('Please enter valid numbers for both values');
      return;
    }

    if (v1 === 0 && v2 === 0) {
      alert('Both values cannot be zero');
      return;
    }

    // Calculate percentage difference using the symmetric formula
    const absoluteDiff = Math.abs(v1 - v2);
    const average = (v1 + v2) / 2;
    const percentDiff = (absoluteDiff / average) * 100;

    const steps: string[] = [];

    steps.push('Formula: Percentage Difference = |V₁ - V₂| / [(V₁ + V₂) / 2] × 100');
    steps.push('');
    steps.push(`Given Values:`);
    steps.push(`V₁ = ${v1}`);
    steps.push(`V₂ = ${v2}`);
    steps.push('');
    steps.push('Step 1: Calculate the absolute difference');
    steps.push(`|V₁ - V₂| = |${v1} - ${v2}|`);
    steps.push(`|V₁ - V₂| = |${v1 - v2}|`);
    steps.push(`|V₁ - V₂| = ${absoluteDiff}`);
    steps.push('');
    steps.push('Step 2: Calculate the average of the two values');
    steps.push(`Average = (V₁ + V₂) / 2`);
    steps.push(`Average = (${v1} + ${v2}) / 2`);
    steps.push(`Average = ${v1 + v2} / 2`);
    steps.push(`Average = ${average}`);
    steps.push('');
    steps.push('Step 3: Divide the absolute difference by the average');
    steps.push(`${absoluteDiff} / ${average} = ${(absoluteDiff / average).toFixed(6)}`);
    steps.push('');
    steps.push('Step 4: Multiply by 100 to get the percentage');
    steps.push(`${(absoluteDiff / average).toFixed(6)} × 100 = ${percentDiff.toFixed(4)}%`);
    steps.push('');
    steps.push(`Final Answer: ${percentDiff.toFixed(4)}% difference`);

    setResult({
      value1: v1,
      value2: v2,
      percentageDifference: percentDiff,
      absoluteDifference: absoluteDiff,
      average: average,
      steps,
    });
  };

  const handleClear = () => {
    setValue1('');
    setValue2('');
    setResult(null);
  };

  // Render fraction notation for the formula
  const renderFormula = () => (
    <div className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-bold text-gray-900 flex-wrap">
      <div className="inline-flex flex-col items-center">
        <span className="border-b-2 border-gray-900 pb-1 px-2">
          |V<sub>1</sub> − V<sub>2</sub>|
        </span>
        <div className="inline-flex flex-col items-center mt-1">
          <span className="text-lg px-2">(V<sub>1</sub> + V<sub>2</sub>)</span>
          <span className="w-full border-t-2 border-gray-900 mt-1"></span>
          <span className="text-lg px-2 mt-1">2</span>
        </div>
      </div>
      <span className="mx-2">×</span>
      <span>100</span>
      <span className="mx-2">=</span>
      <span>?</span>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the difference between percentage difference and percentage change?","acceptedAnswer":{"@type":"Answer","text":"Percentage difference is symmetric and compares two values equally using their average as the reference. Percentage change is asymmetric and measures the change from an initial value to a final value, using the initial value as the reference. Use percentage difference when comparing two equal measurements; use percentage change when tracking how a value changes over time."}},{"@type":"Question","name":"Can percentage difference be negative?","acceptedAnswer":{"@type":"Answer","text":"No, percentage difference is always non-negative (0% or positive) because we use the absolute value of the difference. The formula uses |V₁ - V₂|, which eliminates any negative sign. This is one key difference from percentage change, which can be negative (indicating a decrease)."}},{"@type":"Question","name":"Why do we use the average in the denominator?","acceptedAnswer":{"@type":"Answer","text":"Using the average ensures symmetry—you get the same result regardless of which value is V₁ and which is V₂. This makes percentage difference ideal for comparing two measurements where neither is more important than the other. If we used just one value, the order would matter and we\'d be calculating percentage change instead."}},{"@type":"Question","name":"What does a percentage difference of 0% mean?","acceptedAnswer":{"@type":"Answer","text":"A percentage difference of 0% means the two values are identical—there is no difference between them. This makes mathematical sense: if V₁ = V₂, then |V₁ - V₂| = 0, so the entire numerator becomes 0, resulting in 0%."}},{"@type":"Question","name":"What is the maximum percentage difference possible?","acceptedAnswer":{"@type":"Answer","text":"The maximum percentage difference is 200%. This occurs when comparing any positive number with 0 (e.g., 10 and 0), or when comparing a positive number with its negative (e.g., 10 and -10). The theoretical maximum is approached but never exceeded at 200%."}},{"@type":"Question","name":"Can I use percentage difference with negative numbers?","acceptedAnswer":{"@type":"Answer","text":"Yes, percentage difference works with negative numbers. The formula uses absolute value for the difference, so the sign doesn\'t affect the calculation. For example, the percentage difference between -10 and -20 is calculated the same way as positive numbers, using the average of -10 and -20 as the denominator."}},{"@type":"Question","name":"When should I use percentage difference instead of percentage change?","acceptedAnswer":{"@type":"Answer","text":"Use percentage difference when: (1) comparing two independent measurements with no inherent order, (2) neither value is a baseline or reference, (3) you want a symmetric comparison, or (4) you\'re comparing experimental results, survey data, or quality control measurements. Use percentage change when tracking changes over time or measuring growth/decline from a specific starting point."}},{"@type":"Question","name":"What if one of my values is 0?","acceptedAnswer":{"@type":"Answer","text":"If one value is 0 and the other is not, the calculation still works, giving you 200% as the result. However, if both values are 0, the calculation is undefined (division by zero). Our calculator will alert you if both values are zero."}}]}' }}
      />
      <Navigation />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-indigo-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-indigo-600 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Percentage Difference Calculator</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <Percent className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Percentage Difference Calculator
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
              Calculate the percentage difference between two values with step-by-step solutions and proper mathematical notation.
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
                  <Calculator className="w-6 h-6 text-indigo-600" />
                  Enter Values
                </h2>

                {/* Formula Display */}
                <div className="mb-6 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                  <p className="text-xs text-gray-600 mb-3 text-center font-semibold">FORMULA</p>
                  {renderFormula()}
                  <p className="text-xs text-gray-600 mt-3 text-center italic">
                    Difference between V<sub>1</sub> and V<sub>2</sub>
                  </p>
                </div>

                {/* Input Fields */}
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="value1" className="text-sm font-semibold text-gray-700 mb-3 block">
                      First Value (V<sub>1</sub>)
                    </Label>
                    <Input
                      id="value1"
                      type="number"
                      placeholder="e.g., 50"
                      value={value1}
                      onChange={(e) => setValue1(e.target.value)}
                      className="text-center text-lg font-medium border-2"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          calculatePercentageDifference();
                        }
                      }}
                    />
                  </div>

                  <div>
                    <Label htmlFor="value2" className="text-sm font-semibold text-gray-700 mb-3 block">
                      Second Value (V<sub>2</sub>)
                    </Label>
                    <Input
                      id="value2"
                      type="number"
                      placeholder="e.g., 29"
                      value={value2}
                      onChange={(e) => setValue2(e.target.value)}
                      className="text-center text-lg font-medium border-2"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          calculatePercentageDifference();
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={calculatePercentageDifference}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Calculate
                  </Button>
                  <Button
                    onClick={handleClear}
                    variant="outline"
                    className="px-6 py-6 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50"
                  >
                    Clear
                  </Button>
                </div>

                {/* Quick Examples */}
                <div className="mt-6 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">Quick Examples:</h3>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>• V₁ = 50, V₂ = 29 → 53.16%</p>
                    <p>• V₁ = 100, V₂ = 80 → 22.22%</p>
                    <p>• V₁ = 15, V₂ = 25 → 50.00%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section (Right Side - 3 columns) */}
            <div className="lg:col-span-3">
              {result ? (
                <div className="space-y-6">
                  {/* Answer Card */}
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4">Percentage Difference</h3>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <div className="text-center">
                        <p className="text-5xl md:text-6xl font-bold mb-2">
                          {result.percentageDifference.toFixed(4)}%
                        </p>
                        <p className="text-sm text-indigo-100">
                          difference between {result.value1} and {result.value2}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Calculation Details
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 text-center">
                        <p className="text-sm text-gray-600 mb-2">Absolute Difference</p>
                        <p className="text-3xl font-bold text-indigo-600">
                          {result.absoluteDifference.toFixed(2)}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 text-center">
                        <p className="text-sm text-gray-600 mb-2">Average</p>
                        <p className="text-3xl font-bold text-purple-600">
                          {result.average.toFixed(2)}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 text-center">
                        <p className="text-sm text-gray-600 mb-2">Values Compared</p>
                        <p className="text-3xl font-bold text-indigo-600">2</p>
                      </div>
                    </div>
                  </div>

                  {/* Formula Breakdown */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Formula Breakdown
                    </h3>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="space-y-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-3">General Formula:</p>
                          <div className="flex items-center justify-center gap-3 text-xl font-bold text-gray-900 flex-wrap">
                            <span>Percentage Difference =</span>
                            <div className="inline-flex flex-col items-center mx-2">
                              <span className="border-b-2 border-gray-900 pb-1 px-3">
                                |V<sub>1</sub> − V<sub>2</sub>|
                              </span>
                              <div className="inline-flex items-center gap-2 mt-1">
                                <span className="text-sm">[</span>
                                <div className="inline-flex flex-col items-center">
                                  <span className="text-sm px-2">(V<sub>1</sub> + V<sub>2</sub>)</span>
                                  <span className="w-full border-t-2 border-gray-900"></span>
                                  <span className="text-sm px-2">2</span>
                                </div>
                                <span className="text-sm">]</span>
                              </div>
                            </div>
                            <span>× 100</span>
                          </div>
                        </div>

                        <div className="border-t-2 border-gray-200 pt-4">
                          <p className="text-sm text-gray-600 mb-3 text-center">With Your Values:</p>
                          <div className="flex items-center justify-center gap-3 text-lg font-bold text-indigo-600 flex-wrap">
                            <div className="inline-flex flex-col items-center">
                              <span className="border-b-2 border-indigo-600 pb-1 px-3">
                                |{result.value1} − {result.value2}|
                              </span>
                              <div className="inline-flex items-center gap-2 mt-1">
                                <span className="text-sm">[</span>
                                <div className="inline-flex flex-col items-center">
                                  <span className="text-sm px-2">({result.value1} + {result.value2})</span>
                                  <span className="w-full border-t-2 border-indigo-600"></span>
                                  <span className="text-sm px-2">2</span>
                                </div>
                                <span className="text-sm">]</span>
                              </div>
                            </div>
                            <span>× 100</span>
                          </div>

                          <div className="mt-4 text-center">
                            <div className="flex items-center justify-center gap-3 text-lg font-bold text-purple-600">
                              <span>=</span>
                              <div className="inline-flex flex-col items-center">
                                <span className="border-b-2 border-purple-600 pb-1 px-3">
                                  {result.absoluteDifference}
                                </span>
                                <span className="mt-1 px-3">
                                  {result.average}
                                </span>
                              </div>
                              <span>× 100</span>
                              <span>=</span>
                              <span>{result.percentageDifference.toFixed(4)}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step-by-Step Solution */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-indigo-600" />
                      Step-by-Step Solution
                    </h3>
                    <div className="space-y-2">
                      {result.steps.map((step, index) => (
                        <div key={index}>
                          {step === '' ? (
                            <div className="h-2"></div>
                          ) : (
                            <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg font-mono text-sm">
                              {step}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <Percent className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">
                    Enter two values and click Calculate
                  </p>
                  <p className="text-gray-400 text-sm">
                    See the percentage difference with complete step-by-step solution
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
                Understanding Percentage Difference
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Percentage difference is a mathematical measure that quantifies the relative difference between two values. Unlike percentage change, which measures the change from an initial value to a final value, percentage difference treats both values symmetrically and calculates how different they are from their average.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The percentage difference formula divides the absolute difference between two values by their average, then multiplies by 100 to express the result as a percentage. This metric is particularly useful in scientific research, quality control, data analysis, and comparing experimental results where neither value is considered the "baseline" or "reference" value.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our Percentage Difference Calculator provides instant, accurate calculations with complete step-by-step mathematical solutions. Whether you're a student learning statistics, a researcher analyzing data, or a professional comparing measurements, this tool helps you understand not just the answer but the complete calculation process with proper mathematical notation.
              </p>
            </section>

            {/* What is Percentage Difference */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                What is Percentage Difference?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Percentage difference is a symmetric measure that expresses the difference between two values as a percentage of their average. The formula is:
              </p>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 my-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4 font-semibold">PERCENTAGE DIFFERENCE FORMULA</p>
                  <div className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-bold text-gray-900 flex-wrap">
                    <span>Percentage Difference =</span>
                    <div className="inline-flex flex-col items-center mx-2">
                      <span className="border-b-2 border-gray-900 pb-1 px-3">
                        |V<sub>1</sub> − V<sub>2</sub>|
                      </span>
                      <div className="inline-flex items-center gap-2 mt-1">
                        <span className="text-sm">[</span>
                        <div className="inline-flex flex-col items-center">
                          <span className="text-sm px-2">(V<sub>1</sub> + V<sub>2</sub>)</span>
                          <span className="w-full border-t-2 border-gray-900"></span>
                          <span className="text-sm px-2">2</span>
                        </div>
                        <span className="text-sm">]</span>
                      </div>
                    </div>
                    <span>× 100</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white border-2 border-indigo-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-indigo-600 mb-3">Key Components:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>|V₁ − V₂|</strong> = Absolute difference between values</li>
                    <li>• <strong>(V₁ + V₂) / 2</strong> = Average of the two values</li>
                    <li>• <strong>× 100</strong> = Convert to percentage</li>
                    <li>• <strong>Symmetric</strong> = Order doesn't matter</li>
                  </ul>
                </div>
                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">Important Properties:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Always non-negative (≥ 0%)</li>
                    <li>• Maximum value is 200%</li>
                    <li>• 0% means values are identical</li>
                    <li>• Result is the same regardless of order</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How to Use */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Use This Calculator
              </h2>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <strong className="text-gray-900">Enter First Value (V₁):</strong>
                      <p className="text-gray-700 mt-1">Type the first value you want to compare. This can be any positive or negative number, decimal values are supported.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <strong className="text-gray-900">Enter Second Value (V₂):</strong>
                      <p className="text-gray-700 mt-1">Type the second value. The order doesn't matter in percentage difference—you'll get the same result either way.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <strong className="text-gray-900">Calculate:</strong>
                      <p className="text-gray-700 mt-1">Click the Calculate button or press Enter to see the percentage difference, along with the absolute difference, average, and complete step-by-step solution.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                    <div>
                      <strong className="text-gray-900">Review Results:</strong>
                      <p className="text-gray-700 mt-1">Study the formula breakdown and step-by-step solution to understand exactly how the percentage difference was calculated.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            {/* Step-by-Step Calculation Guide */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Step-by-Step Calculation Guide
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Let's walk through a complete example: Calculate the percentage difference between 50 and 29.
              </p>

              <div className="bg-white border-2 border-indigo-200 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-indigo-600 mb-4">Example: V₁ = 50, V₂ = 29</h3>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-bold text-gray-900 mb-2">Step 1: Calculate the absolute difference</p>
                    <p className="text-gray-700 font-mono text-sm">|V₁ − V₂| = |50 − 29| = |21| = 21</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-bold text-gray-900 mb-2">Step 2: Calculate the average</p>
                    <p className="text-gray-700 font-mono text-sm">(V₁ + V₂) / 2 = (50 + 29) / 2 = 79 / 2 = 39.5</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-bold text-gray-900 mb-2">Step 3: Divide absolute difference by average</p>
                    <p className="text-gray-700 font-mono text-sm">21 / 39.5 = 0.531646</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-bold text-gray-900 mb-2">Step 4: Multiply by 100 to get percentage</p>
                    <p className="text-gray-700 font-mono text-sm">0.531646 × 100 = 53.1646%</p>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-lg p-4">
                    <p className="font-bold mb-2">Final Answer:</p>
                    <p className="text-2xl font-bold">53.16% difference</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-xl p-6">
                <h4 className="font-bold text-gray-900 mb-2">💡 Pro Tip:</h4>
                <p className="text-gray-700">
                  Always use absolute value (| |) for the difference to ensure a positive result. The order of V₁ and V₂ doesn't matter—you'll get the same percentage difference either way!
                </p>
              </div>
            </section>

            {/* Percentage Difference vs Other Metrics */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Percentage Difference vs. Percentage Change
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Understanding the distinction between percentage difference and percentage change is crucial for choosing the right metric for your analysis.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-indigo-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-indigo-600 mb-4">Percentage Difference</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span><strong>Symmetric:</strong> Order doesn't matter</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span><strong>Compares:</strong> Two equal values</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span><strong>Uses:</strong> Average as denominator</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span><strong>Best for:</strong> Comparing measurements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span><strong>Example:</strong> Comparing two test scores</span>
                    </li>
                  </ul>
                  <div className="mt-4 bg-indigo-50 rounded-lg p-3">
                    <p className="text-sm font-mono text-gray-700">
                      Diff(50,29) = |50-29|/[(50+29)/2] × 100
                    </p>
                  </div>
                </div>

                <div className="bg-white border-2 border-purple-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-purple-600 mb-4">Percentage Change</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span><strong>Asymmetric:</strong> Order matters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span><strong>Compares:</strong> Initial vs. final value</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span><strong>Uses:</strong> Initial value as denominator</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span><strong>Best for:</strong> Tracking changes over time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span><strong>Example:</strong> Stock price increase/decrease</span>
                    </li>
                  </ul>
                  <div className="mt-4 bg-purple-50 rounded-lg p-3">
                    <p className="text-sm font-mono text-gray-700">
                      Change(50→29) = (29-50)/50 × 100
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-4">Quick Comparison Example:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">Values: 50 and 29</p>
                    <p className="font-bold text-indigo-600">Percentage Difference:</p>
                    <p className="text-2xl font-bold text-gray-900">53.16%</p>
                    <p className="text-xs text-gray-600 mt-1">(Same regardless of order)</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">From 50 to 29</p>
                    <p className="font-bold text-purple-600">Percentage Change:</p>
                    <p className="text-2xl font-bold text-gray-900">-42%</p>
                    <p className="text-xs text-gray-600 mt-1">(29 to 50 would be +72.4%)</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Real-World Applications */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Real-World Applications of Percentage Difference
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-indigo-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-indigo-600 mb-3">🔬 Scientific Research</h3>
                  <p className="text-gray-700">
                    Comparing experimental results from two different trials or methods. For example, comparing the effectiveness of two different drug formulations where neither is the "control" and both are being evaluated equally.
                  </p>
                </div>

                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">🏭 Quality Control</h3>
                  <p className="text-gray-700">
                    Measuring variation between two manufacturing samples or comparing measurements from two different instruments. Useful when both measurements are treated as equally valid references.
                  </p>
                </div>

                <div className="bg-white border-2 border-indigo-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-indigo-600 mb-3">📊 Data Analysis</h3>
                  <p className="text-gray-700">
                    Comparing two datasets, survey results, or statistical measures where neither is considered the baseline. Example: Comparing average salaries between two similar cities.
                  </p>
                </div>

                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">⚖️ A/B Testing</h3>
                  <p className="text-gray-700">
                    Evaluating the performance difference between two versions of a website, app, or marketing campaign when both are tested simultaneously without a preferred baseline.
                  </p>
                </div>

                <div className="bg-white border-2 border-indigo-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-indigo-600 mb-3">🏃 Sports & Fitness</h3>
                  <p className="text-gray-700">
                    Comparing performance metrics between two athletes, two workout sessions, or two training methods. Example: Comparing running speeds of two athletes on the same track.
                  </p>
                </div>

                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">💰 Financial Analysis</h3>
                  <p className="text-gray-700">
                    Comparing revenue, costs, or other financial metrics between two time periods, departments, or companies where neither is a reference point. Example: Comparing Q1 vs Q3 sales.
                  </p>
                </div>
              </div>
            </section>

            {/* Common Mistakes */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Common Mistakes to Avoid
              </h2>
              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Using Only One Value as Denominator</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> (50 - 29) / 50 × 100 = 42% ✗
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> |50 - 29| / [(50 + 29) / 2] × 100 = 53.16% ✓
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Always use the average of both values as the denominator, not just one of them.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Forgetting Absolute Value</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> (29 - 50) / 39.5 × 100 = -53.16% ✗
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> |29 - 50| / 39.5 × 100 = 53.16% ✓
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Percentage difference is always positive because we use absolute value.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Confusing with Percentage Change</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> Using percentage change formula for symmetric comparison ✗
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> Use percentage difference when order doesn't matter ✓
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Percentage difference is symmetric; percentage change has direction (increase/decrease).
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Incorrect Average Calculation</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> Using (50 + 29) = 79 as denominator ✗
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> Using (50 + 29) / 2 = 39.5 as denominator ✓
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Don't forget to divide the sum by 2 to get the average!
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Forgetting to Multiply by 100</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> 21 / 39.5 = 0.5316 (expressing as decimal) ✗
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> 21 / 39.5 × 100 = 53.16% ✓
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Always multiply by 100 to convert the ratio to a percentage.
                  </p>
                </div>
              </div>
            </section>

            {/* Tips and Tricks */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Tips and Tricks for Percentage Difference
              </h2>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Symmetry Check:</strong>
                      <p className="text-gray-700 mt-1">
                        To verify your calculation, try switching V₁ and V₂. You should get exactly the same percentage difference. If not, you've made an error.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Identical Values:</strong>
                      <p className="text-gray-700 mt-1">
                        If two values are identical, the percentage difference is always 0%. This makes sense—there's no difference between identical values!
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Maximum Value:</strong>
                      <p className="text-gray-700 mt-1">
                        The maximum percentage difference is 200%, which occurs when comparing any positive number with 0, or a positive with its negative equivalent.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Quick Mental Check:</strong>
                      <p className="text-gray-700 mt-1">
                        If the two values are close together, the percentage difference should be relatively small. If they're vastly different, expect a high percentage.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Scientific Notation:</strong>
                      <p className="text-gray-700 mt-1">
                        For very large or very small numbers, use scientific notation to avoid calculation errors. The formula works the same way.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Rounding:</strong>
                      <p className="text-gray-700 mt-1">
                        For most applications, rounding to 2-4 decimal places is sufficient. Our calculator provides 4 decimal places for maximum precision.
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
                    What is the difference between percentage difference and percentage change?
                  </h3>
                  <p className="text-gray-700">
                    Percentage difference is symmetric and compares two values equally using their average as the reference. Percentage change is asymmetric and measures the change from an initial value to a final value, using the initial value as the reference. Use percentage difference when comparing two equal measurements; use percentage change when tracking how a value changes over time.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can percentage difference be negative?
                  </h3>
                  <p className="text-gray-700">
                    No, percentage difference is always non-negative (0% or positive) because we use the absolute value of the difference. The formula uses |V₁ - V₂|, which eliminates any negative sign. This is one key difference from percentage change, which can be negative (indicating a decrease).
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Why do we use the average in the denominator?
                  </h3>
                  <p className="text-gray-700">
                    Using the average ensures symmetry—you get the same result regardless of which value is V₁ and which is V₂. This makes percentage difference ideal for comparing two measurements where neither is more important than the other. If we used just one value, the order would matter and we'd be calculating percentage change instead.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What does a percentage difference of 0% mean?
                  </h3>
                  <p className="text-gray-700">
                    A percentage difference of 0% means the two values are identical—there is no difference between them. This makes mathematical sense: if V₁ = V₂, then |V₁ - V₂| = 0, so the entire numerator becomes 0, resulting in 0%.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What is the maximum percentage difference possible?
                  </h3>
                  <p className="text-gray-700">
                    The maximum percentage difference is 200%. This occurs when comparing any positive number with 0 (e.g., 10 and 0), or when comparing a positive number with its negative (e.g., 10 and -10). The theoretical maximum is approached but never exceeded at 200%.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can I use percentage difference with negative numbers?
                  </h3>
                  <p className="text-gray-700">
                    Yes, percentage difference works with negative numbers. The formula uses absolute value for the difference, so the sign doesn't affect the calculation. For example, the percentage difference between -10 and -20 is calculated the same way as positive numbers, using the average of -10 and -20 as the denominator.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    When should I use percentage difference instead of percentage change?
                  </h3>
                  <p className="text-gray-700">
                    Use percentage difference when: (1) comparing two independent measurements with no inherent order, (2) neither value is a baseline or reference, (3) you want a symmetric comparison, or (4) you're comparing experimental results, survey data, or quality control measurements. Use percentage change when tracking changes over time or measuring growth/decline from a specific starting point.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What if one of my values is 0?
                  </h3>
                  <p className="text-gray-700">
                    If one value is 0 and the other is not, the calculation still works, giving you 200% as the result. However, if both values are 0, the calculation is undefined (division by zero). Our calculator will alert you if both values are zero.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How accurate should my percentage difference calculation be?
                  </h3>
                  <p className="text-gray-700">
                    For most practical applications, rounding to 2 decimal places (e.g., 53.16%) is sufficient. In scientific or research contexts, you may want 3-4 decimal places for greater precision. Our calculator provides 4 decimal places, which you can round as needed for your specific use case.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Is percentage difference the same as relative difference?
                  </h3>
                  <p className="text-gray-700">
                    Percentage difference and relative difference are closely related but not identical. Percentage difference is expressed as a percentage (multiplied by 100), while relative difference is typically left as a decimal. Some fields use "relative percent difference" to mean the same thing as percentage difference. Context matters, so check which definition your field uses.
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
                Percentage difference is a powerful tool for symmetric comparison of two values, essential in scientific research, quality control, data analysis, and many other fields. Unlike percentage change, which has directionality, percentage difference treats both values equally and provides a symmetric measure of how different they are from their average.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our Percentage Difference Calculator makes it easy to perform these calculations with complete accuracy and transparency. By providing step-by-step solutions with proper mathematical notation, we help you not only get the right answer but also understand the underlying mathematics. This understanding is crucial whether you're a student learning statistics, a researcher analyzing experimental data, or a professional comparing performance metrics.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Remember to use percentage difference when both values are equally important and you want a symmetric comparison. Master this concept, and you'll have a valuable analytical tool for comparing data in countless real-world situations. Use our calculator to check your work, learn the method, and gain confidence in your percentage calculations!
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
              Need Help with Percentages and Statistics?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you master percentage calculations, statistical analysis, and data interpretation. Get personalized one-on-one guidance tailored to your learning style.
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
