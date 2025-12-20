'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Home, TrendingUp, RotateCcw, CheckCircle, Lightbulb, BookOpen, Target, BarChart3, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PercentageIncreaseCalculator() {
  const [startValue, setStartValue] = useState<string>('');
  const [finalValue, setFinalValue] = useState<string>('');
  const [result, setResult] = useState<{
    percentageChange: number;
    absoluteChange: number;
    isIncrease: boolean;
    steps: string[];
  } | null>(null);

  const calculatePercentageChange = () => {
    const start = parseFloat(startValue);
    const final = parseFloat(finalValue);

    if (isNaN(start) || isNaN(final)) {
      alert('Please enter valid numbers for both values');
      return;
    }

    if (start === 0) {
      alert('Starting value cannot be 0');
      return;
    }

    const absoluteChange = final - start;
    const percentageChange = (absoluteChange / Math.abs(start)) * 100;
    const isIncrease = absoluteChange > 0;

    // Generate step-by-step solution
    const steps = [
      `Calculate percentage change from Starting Value = ${start}`,
      `to Final Value = ${final}`,
      '',
      `Formula: [(Final - Start) / |Start|] × 100`,
      '',
      `Step 1: Calculate the difference`,
      `Final - Start = ${final} - ${start} = ${absoluteChange}`,
      '',
      `Step 2: Divide by absolute value of starting value`,
      `${absoluteChange} / |${start}| = ${absoluteChange} / ${Math.abs(start)} = ${(absoluteChange / Math.abs(start)).toFixed(6)}`,
      '',
      `Step 3: Multiply by 100 to get percentage`,
      `${(absoluteChange / Math.abs(start)).toFixed(6)} × 100 = ${percentageChange.toFixed(4)}%`,
      '',
      `Result: ${Math.abs(percentageChange).toFixed(4)}% ${isIncrease ? 'increase' : 'decrease'}`,
    ];

    setResult({
      percentageChange,
      absoluteChange,
      isIncrease,
      steps,
    });
  };

  const handleClear = () => {
    setStartValue('');
    setFinalValue('');
    setResult(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
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
            <Link href="/calculators" className="text-[#1A3D7C] hover:text-[#2BAE66]">
              Calculators
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Percentage Increase Calculator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-orange-50 via-white to-red-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Percentage Increase Calculator</h1>
            </div>
            <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
              Calculate percentage increase or decrease between two values instantly. Get step-by-step solutions with proper mathematical notation for understanding percentage change calculations.
            </p>
          </div>
        </div>

        {/* Main Calculator Section */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Calculator Card */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl border-2 border-gray-200 mb-8">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-4 rounded-lg mb-6 flex items-center justify-center">
              <h2 className="text-2xl md:text-3xl font-bold">Percentage Increase Calculator</h2>
            </div>

            <div className="space-y-6">
              {/* Starting Value */}
              <div>
                <Label htmlFor="startValue" className="text-gray-700 font-semibold mb-3 block text-base md:text-lg">
                  Starting Value:
                </Label>
                <Input
                  id="startValue"
                  type="number"
                  step="any"
                  value={startValue}
                  onChange={(e) => setStartValue(e.target.value)}
                  placeholder="Enter starting value"
                  className="text-center text-lg py-6 border-2 border-[#2BAE66] focus:ring-2 focus:ring-[#2BAE66]"
                />
              </div>

              {/* Final Value */}
              <div>
                <Label htmlFor="finalValue" className="text-gray-700 font-semibold mb-3 block text-base md:text-lg">
                  Final Value:
                </Label>
                <Input
                  id="finalValue"
                  type="number"
                  step="any"
                  value={finalValue}
                  onChange={(e) => setFinalValue(e.target.value)}
                  placeholder="Enter final value"
                  className="text-center text-lg py-6 border-2 border-[#2BAE66] focus:ring-2 focus:ring-[#2BAE66]"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="flex-1 py-6 text-lg font-semibold border-2 border-gray-300 hover:bg-gray-50"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Clear
                </Button>
                <Button
                  onClick={calculatePercentageChange}
                  className="flex-1 py-6 text-lg font-semibold bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] hover:opacity-90"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate
                </Button>
              </div>
            </div>

            {/* Results Section */}
            {result && (
              <div className="mt-8 space-y-6">
                {/* Answer */}
                <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-lg p-6 text-white">
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Answer:
                  </h3>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border-2 border-white/20">
                    <p className="text-3xl md:text-4xl font-bold text-center">
                      = {Math.abs(result.percentageChange).toFixed(4)}% {result.isIncrease ? 'increase' : 'decrease'}
                    </p>
                  </div>
                </div>

                {/* Solution Steps */}
                <div className="border-2 border-[#2BAE66]/30 rounded-lg p-6 bg-gradient-to-br from-orange-50 to-red-50">
                  <h3 className="text-xl font-bold text-[#1A3D7C] mb-4 flex items-center">
                    <BookOpen className="w-6 h-6 mr-2 text-[#2BAE66]" />
                    Solution:
                  </h3>
                  <div className="space-y-3">
                    <p className="text-gray-800 font-semibold">
                      Calculate percentage change
                    </p>
                    <p className="text-gray-800">
                      from Starting Value = {startValue}
                    </p>
                    <p className="text-gray-800 mb-4">
                      to Final Value = {finalValue}
                    </p>

                    {/* Mathematical Formula Display */}
                    <div className="bg-white rounded-lg p-6 my-6 border-2 border-gray-200">
                      <p className="text-center text-xl md:text-2xl font-bold text-gray-900 mb-4">
                        <span className="inline-flex flex-col items-center">
                          <span className="border-b-2 border-gray-900 pb-1">
                            (Final − Start)
                          </span>
                          <span className="mt-1">|Start|</span>
                        </span>
                        <span className="mx-3">×</span>
                        <span>100</span>
                      </p>

                      <div className="space-y-3 mt-6">
                        <p className="text-center text-lg">
                          = <span className="inline-flex flex-col items-center">
                            <span className="border-b-2 border-gray-900 pb-1">
                              ({finalValue} − {startValue})
                            </span>
                            <span className="mt-1">|{startValue}|</span>
                          </span>
                          <span className="mx-2">×</span>
                          <span>100</span>
                        </p>

                        <p className="text-center text-lg">
                          = <span className="inline-flex flex-col items-center">
                            <span className="border-b-2 border-gray-900 pb-1">
                              {result.absoluteChange}
                            </span>
                            <span className="mt-1">{Math.abs(parseFloat(startValue))}</span>
                          </span>
                          <span className="mx-2">×</span>
                          <span>100</span>
                        </p>

                        <p className="text-center text-lg">
                          = {(result.absoluteChange / Math.abs(parseFloat(startValue))).toFixed(6)} × 100
                        </p>

                        <p className="text-center text-lg font-bold text-gray-900">
                          = {result.percentageChange.toFixed(4)}% change
                        </p>

                        <p className="text-center text-xl font-bold text-[#2BAE66] mt-4">
                          = {Math.abs(result.percentageChange).toFixed(4)}% {result.isIncrease ? 'increase' : 'decrease'}
                        </p>
                      </div>
                    </div>

                    {/* Note */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6 rounded-r-lg">
                      <p className="text-gray-700 italic">
                        <strong>Note:</strong> A positive change is an increase. A negative change is a decrease.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SEO Content */}
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 mb-8">
            <article className="prose prose-gray max-w-none">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                What is Percentage Increase?
              </h2>
              <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
                Percentage increase is a measure of how much a value has grown relative to its original amount, expressed as a percentage. It's calculated using the formula: <strong>Percentage Increase = [(New Value - Original Value) / Original Value] × 100</strong>. This calculation is fundamental in mathematics, finance, business, economics, and everyday life for understanding growth, inflation, price changes, and various other comparative measurements.
              </p>
              <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
                The percentage increase formula compares the difference between two values against the original starting value. For example, if a product's price increases from $50 to $75, the percentage increase is 50% because the price grew by $25, which is 50% of the original $50. The formula works by first finding the absolute change (final minus initial), then dividing by the original value to get the relative change, and finally multiplying by 100 to express it as a percentage.
              </p>
              <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
                Understanding percentage increase is crucial for making informed financial decisions, comparing investment returns, analyzing business growth, tracking salary increases, monitoring inflation rates, and evaluating price changes. Unlike absolute changes that only show the raw difference between numbers, percentage increase provides context by showing how significant that change is relative to the starting point. A $10 increase means very different things when starting from $20 (50% increase) versus starting from $1,000 (1% increase).
              </p>
              <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
                Our Percentage Increase Calculator simplifies this process by automatically computing the percentage change and providing step-by-step solutions with proper mathematical notation. Whether you're calculating price increases, salary raises, population growth, stock price changes, or any other percentage increase scenario, this tool delivers accurate results instantly while helping you understand the underlying mathematics.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-10">
                How to Calculate Percentage Increase
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg mb-6 border-l-4 border-[#2BAE66]">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Step-by-Step Formula
                </h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-2">Step 1: Find the Difference</p>
                    <p className="text-gray-700">Subtract the original value from the new value</p>
                    <p className="font-mono bg-gray-50 p-2 rounded mt-2">Difference = New Value - Original Value</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-2">Step 2: Divide by Original Value</p>
                    <p className="text-gray-700">Divide the difference by the absolute value of the original amount</p>
                    <p className="font-mono bg-gray-50 p-2 rounded mt-2">Relative Change = Difference / |Original Value|</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-2">Step 3: Convert to Percentage</p>
                    <p className="text-gray-700">Multiply by 100 to express as a percentage</p>
                    <p className="font-mono bg-gray-50 p-2 rounded mt-2">Percentage Increase = Relative Change × 100</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-10">
                Worked Examples with Solutions
              </h2>
              <div className="space-y-6 mb-8">
                <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-green-50 to-emerald-50">
                  <h3 className="text-xl font-bold text-green-700 mb-4">
                    Example 1: Price Increase
                  </h3>
                  <p className="font-semibold mb-3">A shirt's price increased from $40 to $50. What is the percentage increase?</p>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Step 1:</strong> Find the difference: $50 - $40 = $10</p>
                    <p><strong>Step 2:</strong> Divide by original: $10 / $40 = 0.25</p>
                    <p><strong>Step 3:</strong> Convert to percentage: 0.25 × 100 = 25%</p>
                    <p className="text-lg font-bold text-green-700 mt-4">Answer: 25% increase</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">
                    Example 2: Salary Raise
                  </h3>
                  <p className="font-semibold mb-3">Your salary increased from $50,000 to $57,500. Calculate the percentage increase.</p>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Step 1:</strong> Find the difference: $57,500 - $50,000 = $7,500</p>
                    <p><strong>Step 2:</strong> Divide by original: $7,500 / $50,000 = 0.15</p>
                    <p><strong>Step 3:</strong> Convert to percentage: 0.15 × 100 = 15%</p>
                    <p className="text-lg font-bold text-blue-700 mt-4">Answer: 15% increase</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-purple-50 to-pink-50">
                  <h3 className="text-xl font-bold text-purple-700 mb-4">
                    Example 3: Population Growth
                  </h3>
                  <p className="font-semibold mb-3">A town's population grew from 25,000 to 32,000. Find the percentage increase.</p>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Step 1:</strong> Find the difference: 32,000 - 25,000 = 7,000</p>
                    <p><strong>Step 2:</strong> Divide by original: 7,000 / 25,000 = 0.28</p>
                    <p><strong>Step 3:</strong> Convert to percentage: 0.28 × 100 = 28%</p>
                    <p className="text-lg font-bold text-purple-700 mt-4">Answer: 28% increase</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-orange-50 to-red-50">
                  <h3 className="text-xl font-bold text-orange-700 mb-4">
                    Example 4: Percentage Decrease
                  </h3>
                  <p className="font-semibold mb-3">A laptop price dropped from $1,200 to $900. What is the percentage change?</p>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Step 1:</strong> Find the difference: $900 - $1,200 = -$300</p>
                    <p><strong>Step 2:</strong> Divide by original: -$300 / $1,200 = -0.25</p>
                    <p><strong>Step 3:</strong> Convert to percentage: -0.25 × 100 = -25%</p>
                    <p className="text-lg font-bold text-orange-700 mt-4">Answer: 25% decrease (negative change)</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-10">
                Why Use Our Percentage Increase Calculator?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">✓</span>
                    Instant Accurate Results
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    Get immediate, precise percentage calculations without manual computation errors. Perfect for quick financial decisions and comparisons.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">✓</span>
                    Step-by-Step Solutions
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    Understand the mathematics behind percentage calculations with detailed working shown at every step.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">✓</span>
                    Mathematical Notation
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    Proper mathematical symbols and fraction notation for professional-quality results and educational value.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <span className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">✓</span>
                    Handles Decrease Too
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    Automatically detects and correctly labels both increases (positive) and decreases (negative percentage changes).
                  </p>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">✓</span>
                    Mobile Optimized
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    Fully responsive design works perfectly on smartphones, tablets, and desktop computers for calculations on the go.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <span className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">✓</span>
                    100% Free to Use
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    No registration, no fees, unlimited calculations. Use as many times as you need for personal or professional purposes.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-10">
                Real-World Applications
              </h2>
              <div className="space-y-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <TrendingUp className="w-6 h-6 mr-2 text-[#2BAE66]" />
                    Finance and Investing
                  </h3>
                  <p className="text-gray-700 mb-3 text-sm md:text-base">
                    Calculate stock price increases, investment returns, portfolio growth, and compare mutual fund performance. Essential for tracking ROI (Return on Investment) and making informed investment decisions. Example: If your investment grows from $10,000 to $12,500, that's a 25% increase.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    Use Case: "My stock portfolio went from $50,000 to $62,000. What's my return?"
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <BarChart3 className="w-6 h-6 mr-2 text-[#2BAE66]" />
                    Business and Sales
                  </h3>
                  <p className="text-gray-700 mb-3 text-sm md:text-base">
                    Track sales growth, revenue increases, profit margins, customer acquisition, and market share expansion. Businesses use percentage increase to measure quarter-over-quarter growth, year-over-year performance, and set realistic growth targets.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    Use Case: "Sales increased from $250,000 to $312,500. What's the growth rate?"
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <Target className="w-6 h-6 mr-2 text-[#2BAE66]" />
                    Salary and Wages
                  </h3>
                  <p className="text-gray-700 mb-3 text-sm md:text-base">
                    Calculate salary raises, wage increases, bonus percentages, and compare job offers. Understanding percentage increases helps in salary negotiations and evaluating the real value of raises considering inflation and cost of living adjustments.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    Use Case: "I got a raise from $60,000 to $66,000. What percentage increase is that?"
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    💰 Retail and Shopping
                  </h3>
                  <p className="text-gray-700 mb-3 text-sm md:text-base">
                    Compare price increases, calculate markup percentages, understand inflation impact on everyday goods, and evaluate whether price increases are justified. Helps consumers make smart purchasing decisions by quantifying price changes.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    Use Case: "Gas prices went from $3.50 to $4.20 per gallon. What's the percentage increase?"
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    🏠 Real Estate
                  </h3>
                  <p className="text-gray-700 mb-3 text-sm md:text-base">
                    Calculate property value appreciation, rental rate increases, home price growth, and market trend analysis. Real estate investors use percentage increase to evaluate investment performance and predict future returns based on historical data.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    Use Case: "My home value increased from $350,000 to $420,000. What's the appreciation?"
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    📚 Education and Testing
                  </h3>
                  <p className="text-gray-700 mb-3 text-sm md:text-base">
                    Track grade improvements, test score increases, GPA growth, and academic progress. Students and teachers use percentage increase to measure learning progress and the effectiveness of study strategies or teaching methods.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    Use Case: "My test score improved from 75 to 90. What percentage increase did I achieve?"
                  </p>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-10">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6 mb-8">
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    What is the difference between percentage increase and percentage change?
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    Percentage increase specifically refers to growth (positive change), while percentage change can be either positive (increase) or negative (decrease). The formula is the same: <strong>[(New - Old) / Old] × 100</strong>. If the result is positive, it's an increase; if negative, it's a decrease. Our calculator handles both automatically.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Why do we divide by the original value?
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    Dividing by the original value provides context by showing how significant the change is relative to the starting point. A $10 increase represents 100% when starting from $10 but only 1% when starting from $1,000. The relative comparison is more meaningful than the absolute difference.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Can I calculate percentage decrease with this calculator?
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    Yes! The calculator automatically detects both increases and decreases. Simply enter your starting and final values. If the final value is less than the starting value, the calculator will show a negative percentage and label it as a "decrease" rather than an "increase."
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    What if the starting value is 0?
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    Percentage increase cannot be calculated when the starting value is 0 because you cannot divide by zero mathematically. If you're going from 0 to any positive number, that represents an infinite percentage increase. Instead, report the absolute change (e.g., "increased by 50 units" rather than a percentage).
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    How do I convert percentage increase to a multiplier?
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    To convert a percentage increase to a multiplier, divide the percentage by 100 and add 1. For example, a 25% increase = 1.25x multiplier (25/100 + 1 = 1.25). To find the new value, multiply the original by this multiplier: $100 × 1.25 = $125.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Can percentage increases exceed 100%?
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    Yes! A percentage increase can be any positive number. If a value doubles, that's a 100% increase. If it triples, that's a 200% increase. If a stock goes from $10 to $50, that's a 400% increase. There's no upper limit to percentage increases.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Is percentage increase the same as compound interest?
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    No, they're different concepts. Percentage increase measures a single change from one value to another. Compound interest involves repeated percentage increases over multiple time periods, where each period's interest is calculated on the new total including previous interest. Compound interest uses the formula: <strong>A = P(1 + r)ⁿ</strong>.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    How accurate is this calculator?
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    Our calculator provides results accurate to 4 decimal places (e.g., 25.1765%), which is more than sufficient for virtually all practical applications. The underlying JavaScript calculations use double-precision floating-point arithmetic, ensuring mathematical accuracy for financial, business, and educational purposes.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Can I use negative numbers in the calculator?
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    Yes, the calculator handles negative numbers correctly by using absolute value in the denominator. This ensures proper percentage calculations even when dealing with negative starting values, such as losses, debts, or temperatures below zero.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    How do I reverse calculate the original value from a percentage increase?
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    To find the original value when you know the final value and percentage increase, use: <strong>Original = Final / (1 + Percentage/100)</strong>. For example, if the final value is $150 after a 25% increase: $150 / 1.25 = $120 original value.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-10">
                Percentage Increase vs Percentage Point Increase
              </h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Important Distinction
                </h3>
                <p className="text-gray-700 mb-4 text-sm md:text-base">
                  It's crucial to understand the difference between <strong>percentage increase</strong> and <strong>percentage point increase</strong>, as they are often confused:
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-2">Percentage Increase (Relative)</p>
                    <p className="text-gray-700 mb-2">Measures the <em>relative</em> change as a percentage of the original value.</p>
                    <p className="text-sm text-gray-600">Example: Interest rate goes from 4% to 5%. That's a <strong>25% increase</strong> (because 1 is 25% of 4).</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-2">Percentage Point Increase (Absolute)</p>
                    <p className="text-gray-700 mb-2">Measures the <em>absolute</em> difference between two percentages.</p>
                    <p className="text-sm text-gray-600">Example: Interest rate goes from 4% to 5%. That's a <strong>1 percentage point increase</strong> (simply 5% - 4%).</p>
                  </div>
                </div>
                <p className="text-gray-700 mt-4 text-sm">
                  <strong>Rule of thumb:</strong> Use "percentage increase" for relative comparisons and "percentage point increase" when both values are already percentages.
                </p>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-10">
                Quick Reference Table
              </h2>
              <div className="overflow-x-auto mb-8">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg text-sm md:text-base">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left font-bold text-gray-900 border-b">Original Value</th>
                      <th className="px-6 py-3 text-left font-bold text-gray-900 border-b">New Value</th>
                      <th className="px-6 py-3 text-left font-bold text-gray-900 border-b">Difference</th>
                      <th className="px-6 py-3 text-left font-bold text-gray-900 border-b">Percentage Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-6 py-4">100</td>
                      <td className="px-6 py-4">110</td>
                      <td className="px-6 py-4">+10</td>
                      <td className="px-6 py-4 text-green-600 font-semibold">+10% increase</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-6 py-4">100</td>
                      <td className="px-6 py-4">125</td>
                      <td className="px-6 py-4">+25</td>
                      <td className="px-6 py-4 text-green-600 font-semibold">+25% increase</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4">100</td>
                      <td className="px-6 py-4">150</td>
                      <td className="px-6 py-4">+50</td>
                      <td className="px-6 py-4 text-green-600 font-semibold">+50% increase</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-6 py-4">100</td>
                      <td className="px-6 py-4">200</td>
                      <td className="px-6 py-4">+100</td>
                      <td className="px-6 py-4 text-green-600 font-semibold">+100% increase (doubled)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4">100</td>
                      <td className="px-6 py-4">90</td>
                      <td className="px-6 py-4">-10</td>
                      <td className="px-6 py-4 text-red-600 font-semibold">-10% decrease</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-6 py-4">100</td>
                      <td className="px-6 py-4">75</td>
                      <td className="px-6 py-4">-25</td>
                      <td className="px-6 py-4 text-red-600 font-semibold">-25% decrease</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4">100</td>
                      <td className="px-6 py-4">50</td>
                      <td className="px-6 py-4">-50</td>
                      <td className="px-6 py-4 text-red-600 font-semibold">-50% decrease (halved)</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-6 py-4">50</td>
                      <td className="px-6 py-4">100</td>
                      <td className="px-6 py-4">+50</td>
                      <td className="px-6 py-4 text-green-600 font-semibold">+100% increase (doubled)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Ready to Calculate Percentage Increases?
                </h2>
                <p className="text-gray-700 mb-6 text-sm md:text-base max-w-3xl mx-auto">
                  Use our free percentage increase calculator for instant, accurate results with step-by-step solutions. Perfect for students, professionals, investors, and anyone needing percentage calculations!
                </p>
                <Button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] hover:opacity-90 text-white px-8 py-6 text-lg font-semibold rounded-xl"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Start Calculating Now
                </Button>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Book Your Session CTA */}
      <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Need Help with Percentages?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you master percentage calculations, understand percentage changes, and excel in mathematics. Get personalized one-on-one guidance tailored to your learning style.
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
