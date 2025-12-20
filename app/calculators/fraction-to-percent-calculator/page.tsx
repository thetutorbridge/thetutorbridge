'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Home, BookOpen, ArrowRight, Percent, Divide } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FractionToPercentResult {
  numerator: number;
  denominator: number;
  decimal: number;
  percent: number;
  percentRounded: string;
  roundedTo: number;
  steps: string[];
}

export default function FractionToPercentCalculator() {
  const [numerator, setNumerator] = useState<string>('');
  const [denominator, setDenominator] = useState<string>('');
  const [decimalPlaces, setDecimalPlaces] = useState<string>('2');
  const [result, setResult] = useState<FractionToPercentResult | null>(null);

  const handleCalculate = () => {
    const num = parseFloat(numerator);
    const den = parseFloat(denominator);

    // Validation
    if (isNaN(num) || isNaN(den)) {
      alert('Please enter valid numbers');
      return;
    }

    if (den === 0) {
      alert('Denominator cannot be zero');
      return;
    }

    const places = parseInt(decimalPlaces);

    // Calculate decimal
    const decimal = num / den;

    // Calculate percent
    const percent = decimal * 100;

    // Round to specified decimal places
    const percentRounded = percent.toFixed(places);

    // Build step-by-step solution
    const steps: string[] = [];

    steps.push('We know that the fraction');
    steps.push('');
    steps.push(`${num}/${den}`);
    steps.push('');
    steps.push('is the same as division');
    steps.push('');
    steps.push(`${num} ÷ ${den}`);
    steps.push('');
    steps.push('Then using');
    steps.push(`Long Division for ${num} divided by ${den}`);
    steps.push('gives us');
    steps.push('');
    steps.push(decimal.toString());
    steps.push('');
    steps.push('Converting our number to a percentage:');
    steps.push('');
    steps.push(`${decimal} × 100`);
    steps.push('');
    steps.push(`= ${percent}%`);
    steps.push('');
    steps.push(`Rounded to a Max of ${places} Decimal Places.`);

    setResult({
      numerator: num,
      denominator: den,
      decimal,
      percent,
      percentRounded,
      roundedTo: places,
      steps,
    });
  };

  const handleClear = () => {
    setNumerator('');
    setDenominator('');
    setResult(null);
  };

  // Render fraction notation
  const renderFraction = (num: number, den: number) => (
    <span className="inline-flex flex-col items-center justify-center mx-1">
      <span className="text-2xl md:text-3xl font-semibold px-3">{num}</span>
      <span className="w-full border-t-2 border-gray-900"></span>
      <span className="text-2xl md:text-3xl font-semibold px-3">{den}</span>
    </span>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 via-pink-50 to-rose-50">
      <Navigation />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-red-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-red-600 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Fraction to Percent Calculator</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <Percent className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Fraction to Percent Calculator
            </h1>
            <p className="text-lg md:text-xl text-red-100 max-w-2xl mx-auto leading-relaxed">
              Convert any fraction to percentage with step-by-step solutions. Shows decimal conversion, multiplication by 100, and customizable rounding options.
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Convert Fraction to Percent
                </h2>

                {/* Fraction Input */}
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="numerator" className="text-sm font-semibold text-gray-700 mb-3 block text-center">
                      Numerator
                    </Label>
                    <Input
                      id="numerator"
                      type="number"
                      placeholder="5"
                      value={numerator}
                      onChange={(e) => setNumerator(e.target.value)}
                      className="text-center text-lg font-medium"
                    />
                  </div>

                  <div>
                    <Label htmlFor="denominator" className="text-sm font-semibold text-gray-700 mb-3 block text-center">
                      Denominator
                    </Label>
                    <Input
                      id="denominator"
                      type="number"
                      placeholder="12"
                      value={denominator}
                      onChange={(e) => setDenominator(e.target.value)}
                      className="text-center text-lg font-medium"
                    />
                  </div>

                  <div>
                    <Label htmlFor="decimalPlaces" className="text-sm font-semibold text-gray-700 mb-3 block text-center">
                      Round Decimals to:
                    </Label>
                    <Select value={decimalPlaces} onValueChange={setDecimalPlaces}>
                      <SelectTrigger className="w-full text-center text-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={handleClear}
                    variant="outline"
                    className="flex-1 py-6 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50"
                  >
                    Clear
                  </Button>
                  <Button
                    onClick={handleCalculate}
                    className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Calculate
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Section (Right Side - 3 columns) */}
            <div className="lg:col-span-3">
              {result ? (
                <div className="space-y-6">
                  {/* Answer Card */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Answer:</h3>
                    <div className="flex items-center justify-center gap-3 text-center">
                      {renderFraction(result.numerator, result.denominator)}
                      <span className="text-3xl font-semibold">=</span>
                      <span className="text-4xl md:text-5xl font-bold text-red-600">{result.percentRounded}%</span>
                    </div>
                  </div>

                  {/* Showing the Work */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Showing the work
                    </h3>

                    <div className="space-y-4">
                      {result.steps.map((step, index) => {
                        // Check if step contains fraction format (num/den)
                        if (step.match(/^\d+\/\d+$/)) {
                          const [n, d] = step.split('/').map(Number);
                          return (
                            <div key={index} className="flex justify-center">
                              {renderFraction(n, d)}
                            </div>
                          );
                        }
                        // Check if step is a link
                        else if (step.includes('Long Division for')) {
                          return (
                            <p key={index} className="text-blue-600 underline cursor-pointer text-center">
                              {step}
                            </p>
                          );
                        }
                        // Regular text
                        else if (step === '') {
                          return <div key={index} className="h-2"></div>;
                        }
                        // Check if it's a formula or calculation
                        else if (step.includes('×') || step.includes('÷') || step.includes('=')) {
                          return (
                            <p key={index} className="text-xl md:text-2xl text-center font-semibold text-gray-800">
                              {step}
                            </p>
                          );
                        }
                        // Check if it's a decimal number
                        else if (!isNaN(parseFloat(step)) && step.includes('.')) {
                          return (
                            <p key={index} className="text-2xl text-center font-bold text-gray-900">
                              {step}
                            </p>
                          );
                        }
                        // Check if it's the rounding message
                        else if (step.includes('Rounded to')) {
                          return (
                            <p key={index} className="text-gray-600 italic text-center mt-6">
                              {step}
                            </p>
                          );
                        }
                        // Regular text
                        else {
                          return (
                            <p key={index} className="text-gray-700 text-center leading-relaxed">
                              {step}
                            </p>
                          );
                        }
                      })}
                    </div>
                  </div>

                  {/* Quick Reference */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Quick Reference
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
                        <p className="text-sm font-semibold text-red-900 mb-2">Original Fraction</p>
                        <div className="flex justify-center">
                          {renderFraction(result.numerator, result.denominator)}
                        </div>
                      </div>
                      <div className="bg-pink-50 rounded-xl p-4 border-2 border-pink-200">
                        <p className="text-sm font-semibold text-pink-900 mb-2">As Decimal</p>
                        <p className="text-2xl font-bold text-pink-600 text-center">{result.decimal.toFixed(6)}</p>
                      </div>
                      <div className="bg-rose-50 rounded-xl p-4 border-2 border-rose-200">
                        <p className="text-sm font-semibold text-rose-900 mb-2">As Percentage</p>
                        <p className="text-2xl font-bold text-rose-600 text-center">{result.percentRounded}%</p>
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <Percent className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">
                    Enter a fraction and click Calculate to see results
                  </p>
                  <p className="text-sm text-gray-400">
                    Convert any fraction to percentage with detailed steps
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
                Converting Fractions to Percentages
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Converting fractions to percentages is a fundamental mathematical skill used in everyday life, from calculating discounts and test scores to understanding statistics and financial data. Our comprehensive fraction to percent calculator helps you quickly convert any fraction to a percentage with detailed step-by-step solutions, making it perfect for students, teachers, shoppers, and anyone needing to work with fractions and percentages.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                A fraction represents a part of a whole, while a percentage expresses that same part as a number out of 100. The word "percent" literally means "per hundred," so converting a fraction to a percent means expressing it as a number of parts per 100. For example, 1/2 equals 50% because one-half is the same as 50 parts out of 100.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                This calculator provides not just the answer, but shows you the complete conversion process: dividing the numerator by the denominator to get a decimal, then multiplying by 100 to get the percentage. With customizable rounding options, you can control precision to match your specific needs.
              </p>
            </section>

            {/* How to Convert */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Convert Fractions to Percentages
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Converting a fraction to a percentage involves two simple steps: first convert the fraction to a decimal, then multiply the decimal by 100 to get the percentage.
              </p>
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 mb-4">
                <h3 className="text-lg font-bold text-red-900 mb-4">Step-by-Step Process:</h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                    <div>
                      <strong>Divide the numerator by the denominator</strong>
                      <p className="text-sm mt-1">This converts the fraction to a decimal. For example: 5 ÷ 12 = 0.41667</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                    <div>
                      <strong>Multiply the decimal by 100</strong>
                      <p className="text-sm mt-1">This converts the decimal to a percentage. For example: 0.41667 × 100 = 41.667%</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                    <div>
                      <strong>Round to desired decimal places</strong>
                      <p className="text-sm mt-1">Round the percentage to your preferred precision. For example: 41.667% rounded to 2 decimal places = 41.67%</p>
                    </div>
                  </li>
                </ol>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-xl p-6">
                <p className="text-gray-800 font-semibold mb-2">💡 Formula:</p>
                <p className="text-gray-700 mb-3">Percentage = (Numerator ÷ Denominator) × 100</p>
                <p className="text-gray-700">Or simply: Divide the top number by the bottom number, then multiply by 100.</p>
              </div>
            </section>

            {/* Common Fractions */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Common Fraction to Percent Conversions
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Here are some commonly used fractions and their percentage equivalents. Memorizing these can help you quickly estimate percentages in everyday situations:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-2 border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-gradient-to-r from-red-600 to-pink-600 text-white">
                    <tr>
                      <th className="p-4 text-left font-semibold">Fraction</th>
                      <th className="p-4 text-left font-semibold">Decimal</th>
                      <th className="p-4 text-left font-semibold">Percentage</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="border-b border-gray-200">
                      <td className="p-4 text-gray-700">1/2</td>
                      <td className="p-4 text-gray-700">0.5</td>
                      <td className="p-4 text-gray-700 font-semibold">50%</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="p-4 text-gray-700">1/4</td>
                      <td className="p-4 text-gray-700">0.25</td>
                      <td className="p-4 text-gray-700 font-semibold">25%</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-4 text-gray-700">3/4</td>
                      <td className="p-4 text-gray-700">0.75</td>
                      <td className="p-4 text-gray-700 font-semibold">75%</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="p-4 text-gray-700">1/3</td>
                      <td className="p-4 text-gray-700">0.3333...</td>
                      <td className="p-4 text-gray-700 font-semibold">33.33%</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-4 text-gray-700">2/3</td>
                      <td className="p-4 text-gray-700">0.6667...</td>
                      <td className="p-4 text-gray-700 font-semibold">66.67%</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="p-4 text-gray-700">1/5</td>
                      <td className="p-4 text-gray-700">0.2</td>
                      <td className="p-4 text-gray-700 font-semibold">20%</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-4 text-gray-700">2/5</td>
                      <td className="p-4 text-gray-700">0.4</td>
                      <td className="p-4 text-gray-700 font-semibold">40%</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="p-4 text-gray-700">3/5</td>
                      <td className="p-4 text-gray-700">0.6</td>
                      <td className="p-4 text-gray-700 font-semibold">60%</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-4 text-gray-700">4/5</td>
                      <td className="p-4 text-gray-700">0.8</td>
                      <td className="p-4 text-gray-700 font-semibold">80%</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-gray-700">1/10</td>
                      <td className="p-4 text-gray-700">0.1</td>
                      <td className="p-4 text-gray-700 font-semibold">10%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Real-World Applications */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Real-World Applications
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-red-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-600 mb-3">Shopping & Discounts</h3>
                  <p className="text-gray-700">Calculate sale prices and discounts. If a store offers 1/4 off, you're saving 25%. If an item is 3/5 of the original price, you're paying 60% and saving 40%.</p>
                </div>

                <div className="bg-white border-2 border-red-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-600 mb-3">Test Scores & Grades</h3>
                  <p className="text-gray-700">Convert test scores to percentages. If you got 17/20 questions correct, you scored 85%. Teachers often need to convert fraction scores to percentage grades.</p>
                </div>

                <div className="bg-white border-2 border-red-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-600 mb-3">Cooking & Recipes</h3>
                  <p className="text-gray-700">Scale recipes up or down. If a recipe calls for 2/3 cup and you want to know what percentage of a full cup that is, it's 66.67%. Useful for adjusting ingredient quantities.</p>
                </div>

                <div className="bg-white border-2 border-red-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-600 mb-3">Finance & Budgeting</h3>
                  <p className="text-gray-700">Track expenses and savings. If you save 1/10 of your income, you're saving 10%. Understanding fractions as percentages helps with budget planning and financial goals.</p>
                </div>

                <div className="bg-white border-2 border-red-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-600 mb-3">Sports Statistics</h3>
                  <p className="text-gray-700">Calculate batting averages, free throw percentages, and win rates. A basketball player who makes 7/10 free throws has a 70% free throw percentage.</p>
                </div>

                <div className="bg-white border-2 border-red-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-600 mb-3">Data Analysis</h3>
                  <p className="text-gray-700">Present survey results and statistics. If 3/4 of respondents prefer option A, you can report that 75% prefer option A, which is easier to understand.</p>
                </div>
              </div>
            </section>

            {/* Tips and Tricks */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Tips and Tricks
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-3">✨ Quick Halving</h3>
                  <p className="text-gray-700">Any fraction with denominator 2 is easy: just multiply the numerator by 50. Example: 3/2 = 3 × 50 = 150%.</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-3">✨ Denominator of 100</h3>
                  <p className="text-gray-700">If the denominator is 100, the numerator is already your percentage! 37/100 = 37%. Convert other fractions to have denominator 100 if possible.</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-3">✨ Simplify First</h3>
                  <p className="text-gray-700">Simplify fractions before converting. 50/200 simplifies to 1/4, which is easier to work with and equals 25%.</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-3">✨ Mental Math for Fifths</h3>
                  <p className="text-gray-700">Fractions with denominator 5 are easy: multiply numerator by 20. Example: 3/5 = 3 × 20 = 60%.</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-3">✨ Benchmark Fractions</h3>
                  <p className="text-gray-700">Memorize common conversions (1/2=50%, 1/4=25%, 1/3≈33%). Use these as reference points to estimate other fractions quickly.</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-3">✨ Greater Than 100%</h3>
                  <p className="text-gray-700">Improper fractions (numerator > denominator) convert to percentages greater than 100%. Example: 5/4 = 125%.</p>
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
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    ❌ Mistake 1: Forgetting to Multiply by 100
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> Converting 1/4 and getting 0.25 as the final answer.
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> 1/4 = 0.25 × 100 = 25%. You must multiply the decimal by 100 to get a percentage.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    ❌ Mistake 2: Dividing Backwards
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> Dividing denominator by numerator (12 ÷ 5 instead of 5 ÷ 12).
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> Always divide numerator by denominator (top ÷ bottom). 5/12 means 5 ÷ 12 = 0.4167.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    ❌ Mistake 3: Rounding Too Early
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> Rounding 0.4167 to 0.42, then multiplying: 0.42 × 100 = 42%.
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> Multiply first, then round: 0.4167 × 100 = 41.67%. Round only the final answer.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    ❌ Mistake 4: Confusion with Mixed Numbers
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> Converting 1 1/2 as (1 ÷ 1 ÷ 2) × 100.
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> Convert mixed number to improper fraction first: 1 1/2 = 3/2 = 150%.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    ❌ Mistake 5: Missing the Percent Sign
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> Writing 1/4 = 25 (missing the % symbol).
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> Always include the percent sign: 1/4 = 25%. The % symbol is essential to indicate a percentage.
                  </p>
                </div>
              </div>
            </section>

            {/* Practice Problems */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Practice Problems
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Test your understanding with these practice problems. Use our calculator to check your answers!
              </p>
              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <p className="font-semibold text-red-900 mb-2">Problem 1: Beginner</p>
                  <p className="text-gray-700">
                    Convert 1/2 to a percentage
                    <span className="block mt-2 text-sm text-gray-600 italic">Hint: This is one of the most common fractions.</span>
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <p className="font-semibold text-red-900 mb-2">Problem 2: Beginner</p>
                  <p className="text-gray-700">
                    Convert 3/10 to a percentage
                    <span className="block mt-2 text-sm text-gray-600 italic">Hint: Denominator 10 makes this easy!</span>
                  </p>
                </div>

                <div className="bg-pink-50 border-l-4 border-pink-500 rounded-xl p-6">
                  <p className="font-semibold text-pink-900 mb-2">Problem 3: Intermediate</p>
                  <p className="text-gray-700">
                    Convert 7/8 to a percentage
                    <span className="block mt-2 text-sm text-gray-600 italic">Hint: Divide 7 by 8, then multiply by 100.</span>
                  </p>
                </div>

                <div className="bg-pink-50 border-l-4 border-pink-500 rounded-xl p-6">
                  <p className="font-semibold text-pink-900 mb-2">Problem 4: Intermediate</p>
                  <p className="text-gray-700">
                    You scored 17 out of 25 on a test. What percentage did you score?
                    <span className="block mt-2 text-sm text-gray-600 italic">Hint: Write as fraction 17/25 first.</span>
                  </p>
                </div>

                <div className="bg-rose-50 border-l-4 border-rose-500 rounded-xl p-6">
                  <p className="font-semibold text-rose-900 mb-2">Problem 5: Advanced</p>
                  <p className="text-gray-700">
                    Convert 5/6 to a percentage rounded to 2 decimal places
                    <span className="block mt-2 text-sm text-gray-600 italic">Hint: This will be a repeating decimal.</span>
                  </p>
                </div>

                <div className="bg-rose-50 border-l-4 border-rose-500 rounded-xl p-6">
                  <p className="font-semibold text-rose-900 mb-2">Problem 6: Challenge</p>
                  <p className="text-gray-700">
                    A recipe calls for 2 3/4 cups of flour. Express this as a percentage of a gallon (16 cups).
                    <span className="block mt-2 text-sm text-gray-600 italic">Hint: Convert mixed number to improper fraction: 11/4, then divide by 16.</span>
                  </p>
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
                    How do you convert a fraction to a percentage?
                  </h3>
                  <p className="text-gray-700">
                    To convert a fraction to a percentage, divide the numerator (top number) by the denominator (bottom number) to get a decimal, then multiply the decimal by 100. Finally, add the percent sign (%). For example: 3/4 = 0.75 × 100 = 75%. This two-step process works for any fraction.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Why do we multiply by 100 to get a percentage?
                  </h3>
                  <p className="text-gray-700">
                    The word "percent" means "per hundred" or "out of 100." When you multiply a decimal by 100, you're converting it to an equivalent number of parts per 100. For example, 0.5 means 5 parts out of 10, and 0.5 × 100 = 50, meaning 50 parts out of 100, or 50%. Multiplying by 100 shifts the decimal point two places to the right.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can a fraction be more than 100%?
                  </h3>
                  <p className="text-gray-700">
                    Yes! When the numerator is larger than the denominator (improper fraction), the percentage will be greater than 100%. For example, 5/4 = 1.25 × 100 = 125%. This means 5 parts out of 4, which is more than one whole. Improper fractions and mixed numbers always convert to percentages above 100%.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do you convert a mixed number to a percentage?
                  </h3>
                  <p className="text-gray-700">
                    First convert the mixed number to an improper fraction, then follow the normal conversion process. For example, 2 1/4: Convert to improper fraction: (2 × 4 + 1)/4 = 9/4. Then divide: 9 ÷ 4 = 2.25. Multiply by 100: 2.25 × 100 = 225%. Alternatively, the whole number part is already 100% each, so 2 1/4 = 200% + 25% = 225%.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What if my fraction has a repeating decimal?
                  </h3>
                  <p className="text-gray-700">
                    Some fractions like 1/3 produce repeating decimals (0.3333...). In these cases, round to your desired precision. For example, 1/3 = 0.333... × 100 = 33.33% (rounded to 2 decimal places) or 33.333% (rounded to 3 decimal places). Our calculator lets you choose how many decimal places to round to. Common repeating fractions include thirds (1/3, 2/3), sixths, ninths, and sevenths.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do you convert a percentage back to a fraction?
                  </h3>
                  <p className="text-gray-700">
                    To convert a percentage to a fraction, write the percentage as a fraction over 100, then simplify. For example, 75% = 75/100 = 3/4 (divide both by 25). For percentages with decimals like 12.5%, first write as 12.5/100, then multiply both numerator and denominator by 10 to eliminate the decimal: 125/1000 = 1/8 (simplified).
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What's the easiest way to do this mentally?
                  </h3>
                  <p className="text-gray-700">
                    For mental math, try these shortcuts: (1) If denominator is 2, multiply numerator by 50. (2) If denominator is 4, multiply numerator by 25. (3) If denominator is 5, multiply numerator by 20. (4) If denominator is 10, multiply numerator by 10. (5) Memorize common fractions: 1/2=50%, 1/4=25%, 3/4=75%, 1/3≈33%, 2/3≈67%, 1/5=20%.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    When should I use fractions vs percentages?
                  </h3>
                  <p className="text-gray-700">
                    Use fractions for exact values and mathematical operations (adding, subtracting, multiplying). Use percentages for comparisons, describing portions in everyday contexts, and data presentation. For example, in recipes use fractions (1/2 cup), but for discounts use percentages (25% off). Percentages are often easier for people to understand and compare quickly.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How accurate should my percentage be?
                  </h3>
                  <p className="text-gray-700">
                    The required accuracy depends on context. For test scores, 2 decimal places is usually sufficient (98.75%). For financial calculations, 2-4 decimal places may be needed. For casual estimates, rounding to the nearest whole number is often fine (about 99%). Our calculator lets you choose from 0-6 decimal places to match your precision needs.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What if my denominator is zero?
                  </h3>
                  <p className="text-gray-700">
                    A fraction with zero in the denominator is undefined and cannot be converted to a percentage. Division by zero is mathematically undefined. If you encounter a fraction like 5/0, there is no valid percentage conversion. Always ensure your denominator is a non-zero number. Our calculator will alert you if you try to use zero as the denominator.
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
                Our Fraction to Percent Calculator provides a comprehensive, user-friendly tool for converting fractions to percentages with complete transparency and educational value. Whether you're a student learning about fractions and percentages, a teacher creating materials, a shopper calculating discounts, or anyone needing to work with proportions, this calculator delivers accurate results with detailed explanations.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Understanding how to convert fractions to percentages is a valuable life skill. By mastering this conversion, you can better understand statistics, calculate tips and discounts, interpret data, and communicate proportions clearly. The step-by-step solutions provided by our calculator help you learn the process, not just get the answer.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Start using our calculator today to convert fractions to percentages instantly, check your homework, verify calculations, or learn the conversion process. With customizable rounding options, proper mathematical notation, detailed working, and comprehensive explanations, mastering fraction to percent conversions has never been easier. Make this calculator your go-to tool for all your fraction and percentage needs!
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
              Need Help with Fractions and Percentages?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you master fractions, decimals, percentages, and proportions. Get personalized one-on-one guidance tailored to your learning style.
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
