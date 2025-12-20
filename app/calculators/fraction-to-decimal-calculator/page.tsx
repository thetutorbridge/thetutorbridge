'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Home, BookOpen, ArrowRight, Divide } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ConversionResult {
  decimal: string;
  originalNumerator: number;
  originalDenominator: number;
  reducedNumerator: number;
  reducedDenominator: number;
  gcf: number;
  steps: string[];
  isReduced: boolean;
}

export default function FractionToDecimalCalculator() {
  const [numerator, setNumerator] = useState<string>('');
  const [denominator, setDenominator] = useState<string>('');
  const [decimalPlaces, setDecimalPlaces] = useState<string>('3');
  const [result, setResult] = useState<ConversionResult | null>(null);

  // Calculate GCD
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

  const handleCalculate = () => {
    const num = parseFloat(numerator);
    const denom = parseFloat(denominator);

    if (isNaN(num) || isNaN(denom)) {
      alert('Please enter valid numbers for both numerator and denominator');
      return;
    }

    if (denom === 0) {
      alert('Denominator cannot be zero');
      return;
    }

    // Calculate GCF
    const gcf = calculateGCD(num, denom);
    const reducedNum = num / gcf;
    const reducedDenom = denom / gcf;
    const isReduced = gcf !== 1;

    // Calculate decimal
    const decimalValue = num / denom;
    const precision = parseInt(decimalPlaces);
    const roundedDecimal = decimalValue.toFixed(precision);

    // Build steps
    const steps: string[] = [];

    if (isReduced) {
      steps.push(
        `First, we can reduce this fraction by dividing both the numerator and denominator by the Greatest Common Factor (GCF) of ${num} and ${denom}.`
      );
      steps.push(
        `GCF(${num}, ${denom}) = ${gcf}`
      );
      steps.push(
        `Dividing both by ${gcf}: ${num} ÷ ${gcf} = ${reducedNum}, ${denom} ÷ ${gcf} = ${reducedDenom}`
      );
      steps.push(
        `Reduced fraction: ${reducedNum}/${reducedDenom}`
      );
    }

    steps.push(
      `We know that the fraction ${reducedNum}/${reducedDenom} is the same as division: ${reducedNum} ÷ ${reducedDenom}`
    );

    steps.push(
      `Performing long division of ${reducedNum} divided by ${reducedDenom}...`
    );

    steps.push(
      `The result of ${reducedNum} ÷ ${reducedDenom} = ${decimalValue}`
    );

    if (precision > 0) {
      steps.push(
        `Rounding to ${precision} decimal place${precision > 1 ? 's' : ''} (${getDecimalPlaceName(precision)}): ${roundedDecimal}`
      );
    }

    setResult({
      decimal: roundedDecimal,
      originalNumerator: num,
      originalDenominator: denom,
      reducedNumerator: reducedNum,
      reducedDenominator: reducedDenom,
      gcf,
      steps,
      isReduced,
    });
  };

  const getDecimalPlaceName = (places: number): string => {
    const names: { [key: number]: string } = {
      1: 'tenths',
      2: 'hundredths',
      3: 'thousandths',
      4: 'ten-thousandths',
      5: 'hundred-thousandths',
      6: 'millionths',
      7: 'ten-millionths',
      8: 'hundred-millionths',
      9: 'billionths',
      10: 'ten-billionths',
    };
    return names[places] || `${places} decimal places`;
  };

  const handleClear = () => {
    setNumerator('');
    setDenominator('');
    setDecimalPlaces('3');
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
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
            <span className="text-gray-900 font-medium">Fraction to Decimal Calculator</span>
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
              Fraction to Decimal Calculator
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
              Convert any fraction to decimal with step-by-step solutions, GCF reduction, and long division explanation. Perfect for learning decimal conversion.
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
                  Convert Fraction to Decimal
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

                  <div>
                    <Label htmlFor="decimalPlaces" className="text-sm font-semibold text-gray-700 mb-3 block">
                      Round Decimals To
                    </Label>
                    <Select value={decimalPlaces} onValueChange={setDecimalPlaces}>
                      <SelectTrigger className="w-full border-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 (tenths)</SelectItem>
                        <SelectItem value="2">2 (hundredths)</SelectItem>
                        <SelectItem value="3">3 (thousandths)</SelectItem>
                        <SelectItem value="4">4 (ten-thousandths)</SelectItem>
                        <SelectItem value="5">5 (hundred-thousandths)</SelectItem>
                        <SelectItem value="6">6 (millionths)</SelectItem>
                        <SelectItem value="7">7 (ten-millionths)</SelectItem>
                        <SelectItem value="8">8 (hundred-millionths)</SelectItem>
                        <SelectItem value="9">9 (billionths)</SelectItem>
                        <SelectItem value="10">10 (ten-billionths)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={handleCalculate}
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
              </div>
            </div>

            {/* Results Section (Right Side - 3 columns) */}
            <div className="lg:col-span-3">
              {result ? (
                <div className="space-y-6">
                  {/* Answer Card */}
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4">Answer</h3>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <div className="flex items-center justify-center gap-4 text-2xl md:text-3xl font-bold">
                        <div className="inline-flex flex-col items-center justify-center">
                          <span className="text-3xl md:text-4xl font-semibold px-3">{result.originalNumerator}</span>
                          <span className="w-full border-t-2 border-white my-1"></span>
                          <span className="text-3xl md:text-4xl font-semibold px-3">{result.originalDenominator}</span>
                        </div>
                        <span>=</span>
                        <span className="text-4xl md:text-5xl">{result.decimal}</span>
                      </div>
                    </div>
                  </div>

                  {/* Step-by-Step Solution */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-indigo-600" />
                      Showing the Work
                    </h3>
                    <div className="space-y-4">
                      {result.steps.map((step, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold mt-1">
                            {index + 1}
                          </div>
                          <p className="text-gray-700 leading-relaxed flex-1">{step}</p>
                        </div>
                      ))}
                    </div>

                    {result.isReduced && (
                      <div className="mt-6 p-4 bg-indigo-50 rounded-xl border-l-4 border-indigo-600">
                        <p className="text-sm font-semibold text-indigo-900 mb-2">Simplified Fraction:</p>
                        <div className="flex items-center gap-3">
                          <div className="inline-flex flex-col items-center justify-center">
                            <span className="text-2xl font-semibold px-2">{result.originalNumerator}</span>
                            <span className="w-full border-t-2 border-indigo-600"></span>
                            <span className="text-2xl font-semibold px-2">{result.originalDenominator}</span>
                          </div>
                          <span className="text-xl">=</span>
                          <div className="inline-flex flex-col items-center justify-center">
                            <span className="text-2xl font-semibold px-2">{result.reducedNumerator}</span>
                            <span className="w-full border-t-2 border-indigo-600"></span>
                            <span className="text-2xl font-semibold px-2">{result.reducedDenominator}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <Divide className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    Enter a fraction and click Calculate to convert it to decimal
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
                Understanding Fraction to Decimal Conversion
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Converting fractions to decimals is a fundamental mathematical skill that connects two important ways of representing numbers. A fraction represents a part of a whole using a numerator (top number) and a denominator (bottom number), while a decimal uses place value to represent the same quantity.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our Fraction to Decimal Calculator makes this conversion simple and educational. It not only gives you the answer but also shows you the complete step-by-step process, including fraction reduction using the Greatest Common Factor (GCF) and the long division method used to arrive at the decimal result.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Whether you're a student learning about decimal conversion, a teacher looking for a teaching tool, or anyone needing quick fraction-to-decimal calculations, this calculator provides accurate results with comprehensive explanations.
              </p>
            </section>

            {/* How It Works */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Convert Fractions to Decimals
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                The process of converting a fraction to a decimal involves treating the fraction as a division problem. Here's how it works:
              </p>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Basic Conversion Method</h3>
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <strong className="text-gray-900">Simplify the Fraction (Optional but Recommended):</strong>
                      <p className="text-gray-700 mt-1">Find the Greatest Common Factor (GCF) of the numerator and denominator, then divide both by this number to get the simplified fraction.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <strong className="text-gray-900">Divide the Numerator by the Denominator:</strong>
                      <p className="text-gray-700 mt-1">Treat the fraction as a division problem. The fraction bar means "divided by," so 3/4 means 3 ÷ 4.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <strong className="text-gray-900">Perform Long Division:</strong>
                      <p className="text-gray-700 mt-1">Divide the numerator by the denominator using long division or a calculator.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                    <div>
                      <strong className="text-gray-900">Round if Necessary:</strong>
                      <p className="text-gray-700 mt-1">If the decimal is repeating or very long, round to the desired number of decimal places.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            {/* How to Use This Calculator */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Use This Calculator
              </h2>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <strong className="text-gray-900">Enter the Numerator:</strong>
                      <p className="text-gray-700 mt-1">Type the top number of your fraction in the Numerator field.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <strong className="text-gray-900">Enter the Denominator:</strong>
                      <p className="text-gray-700 mt-1">Type the bottom number of your fraction in the Denominator field.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <strong className="text-gray-900">Choose Decimal Precision:</strong>
                      <p className="text-gray-700 mt-1">Select how many decimal places you want in your answer (1-10 places).</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                    <div>
                      <strong className="text-gray-900">Click Calculate:</strong>
                      <p className="text-gray-700 mt-1">View your result along with detailed step-by-step work showing how the conversion was done.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            {/* Conversion Examples */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Common Fraction to Decimal Conversions
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-indigo-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-indigo-600 mb-3">Simple Fractions</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 1/2 = 0.5</li>
                    <li>• 1/4 = 0.25</li>
                    <li>• 3/4 = 0.75</li>
                    <li>• 1/5 = 0.2</li>
                    <li>• 1/8 = 0.125</li>
                    <li>• 1/10 = 0.1</li>
                  </ul>
                </div>
                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">Thirds and Sixths</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 1/3 = 0.333...</li>
                    <li>• 2/3 = 0.666...</li>
                    <li>• 1/6 = 0.166...</li>
                    <li>• 5/6 = 0.833...</li>
                    <li>• 1/9 = 0.111...</li>
                    <li>• 7/8 = 0.875</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Types of Decimal Results */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Types of Decimal Results
              </h2>
              <div className="space-y-6">
                <div className="bg-white border-l-4 border-indigo-600 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Terminating Decimals</h3>
                  <p className="text-gray-700 mb-2">
                    These decimals end after a certain number of digits. Examples include 1/2 = 0.5, 3/4 = 0.75, and 7/8 = 0.875.
                  </p>
                  <p className="text-gray-700">
                    <strong>When to expect:</strong> When the denominator (in simplified form) only has prime factors of 2 and/or 5.
                  </p>
                </div>
                <div className="bg-white border-l-4 border-purple-600 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Repeating Decimals</h3>
                  <p className="text-gray-700 mb-2">
                    These decimals have one or more digits that repeat indefinitely. Examples include 1/3 = 0.333... and 1/7 = 0.142857142857...
                  </p>
                  <p className="text-gray-700">
                    <strong>When to expect:</strong> When the denominator (in simplified form) has prime factors other than 2 and 5.
                  </p>
                </div>
              </div>
            </section>

            {/* Real-World Applications */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Real-World Applications
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-indigo-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-indigo-600 mb-3">📊 Finance and Money</h3>
                  <p className="text-gray-700">
                    Converting fractions of a dollar to decimal form for financial calculations, splitting bills, calculating discounts, and understanding percentages.
                  </p>
                </div>
                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">📏 Measurements</h3>
                  <p className="text-gray-700">
                    Converting fractional measurements (like 3/4 inch or 2/3 cup) to decimal form for precision work in carpentry, cooking, and engineering.
                  </p>
                </div>
                <div className="bg-white border-2 border-indigo-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-indigo-600 mb-3">🎓 Academic Testing</h3>
                  <p className="text-gray-700">
                    Converting test scores and grades represented as fractions to decimal or percentage form. Understanding GPA calculations and grade point averages.
                  </p>
                </div>
                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">📈 Statistics and Data</h3>
                  <p className="text-gray-700">
                    Converting fractional data to decimals for easier comparison, graphing, and statistical analysis in research and business.
                  </p>
                </div>
                <div className="bg-white border-2 border-indigo-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-indigo-600 mb-3">🏗️ Construction</h3>
                  <p className="text-gray-700">
                    Converting architectural measurements from fractions to decimals for CAD software and precise building calculations.
                  </p>
                </div>
                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">🍳 Cooking and Baking</h3>
                  <p className="text-gray-700">
                    Converting recipe measurements when scaling recipes up or down, especially when using digital kitchen scales that display decimals.
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
                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Dividing Denominator by Numerator</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> For 3/4, dividing 4 ÷ 3 = 1.333...
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> Divide the numerator by the denominator: 3 ÷ 4 = 0.75
                  </p>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Not Simplifying First</h3>
                  <p className="text-gray-700 mb-2">
                    While not wrong mathematically, not simplifying can make division harder. For example, 20/24 should be reduced to 5/6 first.
                  </p>
                  <p className="text-gray-700">
                    <strong>Tip:</strong> Always find the GCF and simplify before dividing for easier calculations.
                  </p>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Rounding Too Early</h3>
                  <p className="text-gray-700 mb-2">
                    Rounding during intermediate steps can lead to less accurate final answers.
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> Complete the entire calculation first, then round the final answer.
                  </p>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Forgetting the Decimal Point</h3>
                  <p className="text-gray-700 mb-2">
                    When converting fractions less than 1, forgetting the 0 before the decimal point can cause confusion.
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> Write 0.75 instead of .75 for clarity.
                  </p>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Misunderstanding Repeating Decimals</h3>
                  <p className="text-gray-700 mb-2">
                    Thinking that 0.333 is the same as 1/3, when actually 1/3 = 0.333... (repeating forever).
                  </p>
                  <p className="text-gray-700">
                    <strong>Tip:</strong> Use proper notation with a bar over repeating digits or round appropriately.
                  </p>
                </div>
              </div>
            </section>

            {/* Tips and Tricks */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Tips and Tricks for Fraction to Decimal Conversion
              </h2>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Memorize Common Conversions:</strong>
                      <p className="text-gray-700 mt-1">Knowing that 1/2 = 0.5, 1/4 = 0.25, and 3/4 = 0.75 by heart saves time.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Use Equivalent Fractions:</strong>
                      <p className="text-gray-700 mt-1">Convert fractions to denominators of 10, 100, or 1000 when possible. For example, 1/5 = 2/10 = 0.2.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Check Your Work:</strong>
                      <p className="text-gray-700 mt-1">Convert the decimal back to a fraction to verify your answer is correct.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Understand Decimal Place Values:</strong>
                      <p className="text-gray-700 mt-1">Know that 0.5 = 5/10, 0.25 = 25/100, and 0.125 = 125/1000.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Practice with Patterns:</strong>
                      <p className="text-gray-700 mt-1">Notice that fractions with denominators of 9 create repeating single digits (1/9 = 0.111..., 2/9 = 0.222...).</p>
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
                    How do I convert a fraction to a decimal?
                  </h3>
                  <p className="text-gray-700">
                    Divide the numerator (top number) by the denominator (bottom number). For example, to convert 3/4 to a decimal, divide 3 by 4 to get 0.75.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What is a terminating decimal?
                  </h3>
                  <p className="text-gray-700">
                    A terminating decimal is a decimal that ends after a finite number of digits. Examples include 0.5 (from 1/2), 0.25 (from 1/4), and 0.875 (from 7/8).
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What is a repeating decimal?
                  </h3>
                  <p className="text-gray-700">
                    A repeating decimal has one or more digits that repeat infinitely. For example, 1/3 = 0.333... where the 3 repeats forever. This is often written as 0.3̄ with a bar over the repeating digit.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Should I simplify the fraction first?
                  </h3>
                  <p className="text-gray-700">
                    While not required, simplifying the fraction first makes the division easier and helps you understand the relationship better. For example, 20/24 simplified to 5/6 is easier to divide than working with the original numbers.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How many decimal places should I use?
                  </h3>
                  <p className="text-gray-700">
                    This depends on your needs. For money, use 2 decimal places. For scientific work, you might need 5-10 places. For everyday use, 2-3 decimal places is usually sufficient. Repeating decimals are often rounded to 3 decimal places.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can all fractions be converted to decimals?
                  </h3>
                  <p className="text-gray-700">
                    Yes! Every fraction can be converted to either a terminating decimal or a repeating decimal. No fraction will result in a random, non-repeating decimal.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What is the GCF and why is it important?
                  </h3>
                  <p className="text-gray-700">
                    The Greatest Common Factor (GCF) is the largest number that divides evenly into both the numerator and denominator. Using the GCF to simplify fractions makes them easier to work with and helps you see patterns in decimal conversion.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do I know if a fraction will give a terminating or repeating decimal?
                  </h3>
                  <p className="text-gray-700">
                    After simplifying the fraction, look at the denominator's prime factors. If it only has 2s and/or 5s, the decimal terminates. If it has any other prime factors (3, 7, 11, etc.), the decimal repeats.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can I convert mixed numbers to decimals?
                  </h3>
                  <p className="text-gray-700">
                    Yes! Convert the fraction part to a decimal, then add it to the whole number. For example, 2 3/4 = 2 + 0.75 = 2.75.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Is there a difference between 0.5 and .5?
                  </h3>
                  <p className="text-gray-700">
                    Mathematically, they're the same. However, it's better practice to include the leading zero (0.5) for clarity and to avoid confusion, especially in professional or academic contexts.
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
                Converting fractions to decimals is an essential mathematical skill with applications in everyday life, from cooking and shopping to advanced scientific calculations. Our Fraction to Decimal Calculator not only gives you instant, accurate results but also helps you understand the process through detailed step-by-step explanations.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                By showing the GCF reduction and long division process, this calculator serves as both a practical tool and an educational resource. Whether you're checking homework, solving real-world problems, or learning the fundamentals of decimal conversion, our calculator is designed to support your mathematical journey.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Remember that practice makes perfect. The more you work with fraction-to-decimal conversions, the more comfortable you'll become with recognizing patterns and performing quick mental calculations. Use this calculator as often as you need, and don't hesitate to explore the step-by-step solutions to deepen your understanding!
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
              Need Help with Fractions and Decimals?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you master fraction-to-decimal conversions, understand number systems, and excel in mathematics. Get personalized one-on-one guidance tailored to your learning style.
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
