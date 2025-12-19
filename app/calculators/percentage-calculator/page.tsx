'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, Home, Percent, CheckCircle2, Lightbulb, HelpCircle, BookOpen, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CalculationResult {
  question: string;
  answer: number;
  formula: string;
  steps: string[];
  type: 'what-is' | 'is-what-percent' | 'percent-of-what';
}

export default function PercentageCalculator() {
  const [calculationType, setCalculationType] = useState<string>('what-is');
  const [result, setResult] = useState<CalculationResult | null>(null);

  // What is X% of Y?
  const [percentValue1, setPercentValue1] = useState<string>('');
  const [ofValue1, setOfValue1] = useState<string>('');

  // X is what % of Y?
  const [numberValue2, setNumberValue2] = useState<string>('');
  const [ofValue2, setOfValue2] = useState<string>('');

  // X is Y% of what?
  const [numberValue3, setNumberValue3] = useState<string>('');
  const [percentValue3, setPercentValue3] = useState<string>('');

  const calculateWhatIs = () => {
    const percent = parseFloat(percentValue1);
    const ofNum = parseFloat(ofValue1);

    if (isNaN(percent) || isNaN(ofNum)) {
      alert('Please enter valid numbers');
      return;
    }

    const answer = (percent / 100) * ofNum;

    setResult({
      question: `What is ${percent}% of ${ofNum}?`,
      answer: answer,
      formula: `(${percent} ÷ 100) × ${ofNum} = ${answer}`,
      steps: [
        `Step 1: Convert percentage to decimal: ${percent}% = ${percent} ÷ 100 = ${percent / 100}`,
        `Step 2: Multiply by the number: ${percent / 100} × ${ofNum} = ${answer}`,
        `Step 3: Result: ${percent}% of ${ofNum} is ${answer}`,
      ],
      type: 'what-is',
    });
  };

  const calculateIsWhatPercent = () => {
    const number = parseFloat(numberValue2);
    const ofNum = parseFloat(ofValue2);

    if (isNaN(number) || isNaN(ofNum)) {
      alert('Please enter valid numbers');
      return;
    }

    if (ofNum === 0) {
      alert('Cannot divide by zero');
      return;
    }

    const answer = (number / ofNum) * 100;

    setResult({
      question: `${number} is what % of ${ofNum}?`,
      answer: answer,
      formula: `(${number} ÷ ${ofNum}) × 100 = ${answer}%`,
      steps: [
        `Step 1: Divide the number by the total: ${number} ÷ ${ofNum} = ${number / ofNum}`,
        `Step 2: Multiply by 100 to convert to percentage: ${number / ofNum} × 100 = ${answer}`,
        `Step 3: Result: ${number} is ${answer}% of ${ofNum}`,
      ],
      type: 'is-what-percent',
    });
  };

  const calculatePercentOfWhat = () => {
    const number = parseFloat(numberValue3);
    const percent = parseFloat(percentValue3);

    if (isNaN(number) || isNaN(percent)) {
      alert('Please enter valid numbers');
      return;
    }

    if (percent === 0) {
      alert('Percentage cannot be zero');
      return;
    }

    const answer = (number / percent) * 100;

    setResult({
      question: `${number} is ${percent}% of what?`,
      answer: answer,
      formula: `${number} ÷ (${percent} ÷ 100) = ${answer}`,
      steps: [
        `Step 1: Convert percentage to decimal: ${percent}% = ${percent} ÷ 100 = ${percent / 100}`,
        `Step 2: Divide the number by the decimal: ${number} ÷ ${percent / 100} = ${answer}`,
        `Step 3: Result: ${number} is ${percent}% of ${answer}`,
      ],
      type: 'percent-of-what',
    });
  };

  const handleClear = () => {
    setPercentValue1('');
    setOfValue1('');
    setNumberValue2('');
    setOfValue2('');
    setNumberValue3('');
    setPercentValue3('');
    setResult(null);
  };

  const handleQuickSolutionChange = (value: string) => {
    setCalculationType(value);
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
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
            <span className="text-gray-900 font-medium">Percentage Calculator</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <Percent className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Percentage Calculator
            </h1>
            <p className="text-lg md:text-xl text-orange-100 max-w-2xl mx-auto leading-relaxed">
              Calculate percentages instantly with 3 quick solutions. Perfect for students, business calculations, and everyday math with step-by-step explanations.
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
                    Percentage Calculator
                  </h2>
                </div>

                {/* Quick Solutions Dropdown */}
                <div className="mb-6">
                  <Label htmlFor="quick-solutions" className="text-sm font-semibold text-gray-700 mb-3 block">
                    Quick Solutions
                  </Label>
                  <Select value={calculationType} onValueChange={handleQuickSolutionChange}>
                    <SelectTrigger className="w-full border-2">
                      <SelectValue placeholder="Select calculation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="what-is">What is X% of Y?</SelectItem>
                      <SelectItem value="is-what-percent">X is what % of Y?</SelectItem>
                      <SelectItem value="percent-of-what">X is Y% of what?</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Calculation Type 1: What is X% of Y? */}
                {calculationType === 'what-is' && (
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                      What is <span className="text-orange-600">?</span> % of <span className="text-orange-600">?</span>
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-700 font-medium whitespace-nowrap">What is</span>
                        <Input
                          type="number"
                          placeholder="25"
                          value={percentValue1}
                          onChange={(e) => setPercentValue1(e.target.value)}
                          className="flex-1 text-center text-lg font-medium border-2"
                        />
                        <span className="text-gray-700 font-medium">%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-700 font-medium whitespace-nowrap">of</span>
                        <Input
                          type="number"
                          placeholder="200"
                          value={ofValue1}
                          onChange={(e) => setOfValue1(e.target.value)}
                          className="flex-1 text-center text-lg font-medium border-2"
                        />
                        <span className="text-gray-700 font-medium">?</span>
                      </div>
                    </div>
                    <Button
                      onClick={calculateWhatIs}
                      className="w-full mt-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Calculate
                    </Button>
                  </div>
                )}

                {/* Calculation Type 2: X is what % of Y? */}
                {calculationType === 'is-what-percent' && (
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                      <span className="text-orange-600">?</span> is what % of <span className="text-orange-600">?</span>
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Input
                          type="number"
                          placeholder="50"
                          value={numberValue2}
                          onChange={(e) => setNumberValue2(e.target.value)}
                          className="flex-1 text-center text-lg font-medium border-2"
                        />
                        <span className="text-gray-700 font-medium whitespace-nowrap">is what %</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-700 font-medium whitespace-nowrap">of</span>
                        <Input
                          type="number"
                          placeholder="200"
                          value={ofValue2}
                          onChange={(e) => setOfValue2(e.target.value)}
                          className="flex-1 text-center text-lg font-medium border-2"
                        />
                        <span className="text-gray-700 font-medium">?</span>
                      </div>
                    </div>
                    <Button
                      onClick={calculateIsWhatPercent}
                      className="w-full mt-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Calculate
                    </Button>
                  </div>
                )}

                {/* Calculation Type 3: X is Y% of what? */}
                {calculationType === 'percent-of-what' && (
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                      <span className="text-orange-600">?</span> is <span className="text-orange-600">?</span> % of what?
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Input
                          type="number"
                          placeholder="50"
                          value={numberValue3}
                          onChange={(e) => setNumberValue3(e.target.value)}
                          className="flex-1 text-center text-lg font-medium border-2"
                        />
                        <span className="text-gray-700 font-medium whitespace-nowrap">is</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Input
                          type="number"
                          placeholder="25"
                          value={percentValue3}
                          onChange={(e) => setPercentValue3(e.target.value)}
                          className="flex-1 text-center text-lg font-medium border-2"
                        />
                        <span className="text-gray-700 font-medium whitespace-nowrap">% of what?</span>
                      </div>
                    </div>
                    <Button
                      onClick={calculatePercentOfWhat}
                      className="w-full mt-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Calculate
                    </Button>
                  </div>
                )}

                {/* Clear Button */}
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="w-full px-6 py-6 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50"
                >
                  Clear All
                </Button>

                {/* Quick Examples */}
                <div className="mt-6 p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">Quick Examples:</h3>
                  <div className="space-y-1 text-xs text-gray-700">
                    <p>• What is 25% of 200? = 50</p>
                    <p>• 50 is what % of 200? = 25%</p>
                    <p>• 50 is 25% of what? = 200</p>
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

                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8">
                      <p className="text-lg text-gray-700 mb-4 text-center font-medium">
                        {result.question}
                      </p>
                      <div className="text-center">
                        <p className="text-5xl font-bold text-orange-600">
                          {result.type === 'is-what-percent' ? `${result.answer.toFixed(2)}%` : result.answer.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Formula Card */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-orange-600" />
                      Formula:
                    </h3>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="text-lg font-mono text-gray-800 text-center break-all">
                        {result.formula}
                      </p>
                    </div>
                  </div>

                  {/* Working Steps */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-[#FFC857]" />
                      Step-by-Step Solution
                    </h3>

                    <div className="space-y-4">
                      {result.steps.map((step, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <p className="text-gray-700 leading-relaxed flex-1 pt-1">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <Percent className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">
                    Select a calculation type and enter values
                  </p>
                  <p className="text-gray-400 text-sm">
                    Choose from the Quick Solutions dropdown and click Calculate
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
              Need Help with Percentages?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you master percentage calculations, understand formulas, and excel in mathematics. Get personalized one-on-one guidance tailored to your learning style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-demo-class">
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

      {/* Educational Content - Continued in next part due to length */}
      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Understanding Percentages
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                A percentage is a way of expressing a number as a fraction of 100. The word "percent" comes from the Latin "per centum," which means "by the hundred." Percentages are one of the most common ways to express proportions and are used extensively in everyday life, from calculating discounts and taxes to understanding statistics and financial data.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our comprehensive percentage calculator provides three essential calculation types that cover all common percentage scenarios. Whether you're a student learning mathematics, a business professional analyzing data, or someone making everyday calculations like calculating tips or discounts, this tool provides instant, accurate results with detailed step-by-step explanations.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                The calculator supports all three fundamental percentage calculations: finding what a percentage of a number is, determining what percentage one number is of another, and calculating the whole when you know a part and its percentage. Each calculation includes a clear formula and breakdown of the mathematical steps involved.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                How to Use This Percentage Calculator
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our calculator is designed for maximum ease of use. Simply select your calculation type from the Quick Solutions dropdown and enter your values:
              </p>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 md:p-8 mb-6">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Choose Calculation Type</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Select from the "Quick Solutions" dropdown: "What is X% of Y?", "X is what % of Y?", or "X is Y% of what?"
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Enter Your Values</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Fill in the input fields with your numbers. The calculator will guide you with placeholders showing example values.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Click Calculate</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Press the Calculate button to instantly see your answer along with the formula and detailed step-by-step solution.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">4</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Review the Solution</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Study the step-by-step breakdown to understand how the percentage was calculated. Use the Clear button to start a new calculation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                The Three Essential Percentage Calculations
              </h2>

              <div className="space-y-6">
                <div className="bg-white border-l-4 border-orange-500 p-6 rounded-r-xl shadow-md">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">1. What is X% of Y?</h3>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    This is the most common type of percentage calculation. Use this when you want to find a percentage of a number.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg mb-3">
                    <p className="font-semibold text-gray-900 mb-2">Formula:</p>
                    <p className="font-mono text-lg">(Percentage ÷ 100) × Number = Answer</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-2">Example:</p>
                    <p className="text-gray-700">What is 25% of 200?</p>
                    <p className="text-gray-700">(25 ÷ 100) × 200 = 0.25 × 200 = <strong>50</strong></p>
                  </div>
                  <p className="text-gray-700 mt-3 leading-relaxed">
                    <strong>Common Uses:</strong> Calculating discounts, tips, taxes, commission, interest rates, and marks in exams.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-red-500 p-6 rounded-r-xl shadow-md">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">2. X is what % of Y?</h3>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    This calculation finds what percentage one number represents of another number. Perfect for calculating ratios, portions, and comparisons.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg mb-3">
                    <p className="font-semibold text-gray-900 mb-2">Formula:</p>
                    <p className="font-mono text-lg">(Number ÷ Total) × 100 = Percentage</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-2">Example:</p>
                    <p className="text-gray-700">50 is what % of 200?</p>
                    <p className="text-gray-700">(50 ÷ 200) × 100 = 0.25 × 100 = <strong>25%</strong></p>
                  </div>
                  <p className="text-gray-700 mt-3 leading-relaxed">
                    <strong>Common Uses:</strong> Finding test scores, completion percentages, market share, conversion rates, and efficiency ratings.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-pink-500 p-6 rounded-r-xl shadow-md">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">3. X is Y% of what?</h3>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    This reverse calculation finds the whole when you know a part and its percentage. Useful for working backwards from partial information.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg mb-3">
                    <p className="font-semibold text-gray-900 mb-2">Formula:</p>
                    <p className="font-mono text-lg">Number ÷ (Percentage ÷ 100) = Whole</p>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-2">Example:</p>
                    <p className="text-gray-700">50 is 25% of what?</p>
                    <p className="text-gray-700">50 ÷ (25 ÷ 100) = 50 ÷ 0.25 = <strong>200</strong></p>
                  </div>
                  <p className="text-gray-700 mt-3 leading-relaxed">
                    <strong>Common Uses:</strong> Finding original prices before discounts, total budgets from partial spending, and full populations from sample data.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Real-World Applications of Percentages
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Percentages are everywhere in daily life. Understanding how to calculate them is an essential life skill:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">🛍️ Shopping & Discounts</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Calculate sale prices, compare deals, and understand how much you're saving. A 30% discount on a $100 item means you pay $70.
                  </p>
                  <div className="bg-blue-50 p-3 rounded-lg text-sm">
                    <p className="font-semibold">Example: What is 30% off $100?</p>
                    <p>30% of $100 = $30 discount</p>
                    <p>Final price = $100 - $30 = $70</p>
                  </div>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-green-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">💰 Finance & Banking</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Understand interest rates, loan payments, investment returns, and compound growth. A 5% annual interest on $1000 earns $50 per year.
                  </p>
                  <div className="bg-green-50 p-3 rounded-lg text-sm">
                    <p className="font-semibold">Example: 5% interest on $1000</p>
                    <p>5% of $1000 = $50</p>
                    <p>Balance after 1 year = $1050</p>
                  </div>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-purple-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">📊 Business & Analytics</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Track growth rates, profit margins, market share, and performance metrics. If sales grew from 100 to 150 units, that's a 50% increase.
                  </p>
                  <div className="bg-purple-50 p-3 rounded-lg text-sm">
                    <p className="font-semibold">Example: Sales growth</p>
                    <p>From 100 to 150 units</p>
                    <p>(150-100)/100 × 100 = 50% growth</p>
                  </div>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-yellow-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">📚 Education & Grades</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Calculate test scores, grade percentages, and academic performance. Scoring 45 out of 50 questions correct is 90%.
                  </p>
                  <div className="bg-yellow-50 p-3 rounded-lg text-sm">
                    <p className="font-semibold">Example: Test score</p>
                    <p>45 correct out of 50 questions</p>
                    <p>(45/50) × 100 = 90%</p>
                  </div>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-red-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">🍽️ Tips & Service Charges</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Calculate appropriate tips at restaurants and for services. A 15% tip on a $50 meal is $7.50.
                  </p>
                  <div className="bg-red-50 p-3 rounded-lg text-sm">
                    <p className="font-semibold">Example: Restaurant tip</p>
                    <p>15% tip on $50 bill</p>
                    <p>15% of $50 = $7.50</p>
                  </div>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-teal-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">📈 Statistics & Data</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Understand survey results, polls, and demographic data. If 250 out of 1000 people prefer option A, that's 25%.
                  </p>
                  <div className="bg-teal-50 p-3 rounded-lg text-sm">
                    <p className="font-semibold">Example: Survey results</p>
                    <p>250 out of 1000 respondents</p>
                    <p>(250/1000) × 100 = 25%</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Common Mistakes to Avoid
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                When working with percentages, watch out for these frequent errors:
              </p>

              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">❌ Forgetting to Divide by 100</h3>
                  <p className="text-gray-700 mb-3">
                    Many people forget that percent means "per hundred." You must divide the percentage by 100 before multiplying.
                  </p>
                  <div className="bg-white p-3 rounded-lg text-sm">
                    <p className="text-red-600 mb-1">Wrong: 25% of 200 = 25 × 200 = 5000 ✗</p>
                    <p className="text-green-600">Correct: 25% of 200 = (25 ÷ 100) × 200 = 50 ✓</p>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">❌ Confusing "Of" and "From"</h3>
                  <p className="text-gray-700 mb-3">
                    "X is Y% of Z" and "X is Y% from Z" are different. "Of" means multiply, "from" means the difference.
                  </p>
                  <div className="bg-white p-3 rounded-lg text-sm">
                    <p className="mb-1">50 is 25% <strong>of</strong> 200 (50 = 25% × 200) ✓</p>
                    <p>50 is 75% <strong>from</strong> 200 (200 - 50 = 150 = 75% of 200) ✓</p>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">❌ Reversing the Numbers</h3>
                  <p className="text-gray-700 mb-3">
                    Pay attention to which number is the part and which is the whole. Order matters in percentage calculations.
                  </p>
                  <div className="bg-white p-3 rounded-lg text-sm">
                    <p className="text-red-600 mb-1">Wrong: 50 is what % of 25? = 50% ✗</p>
                    <p className="text-green-600">Correct: 50 is what % of 25? = 200% ✓</p>
                    <p className="text-gray-600 text-xs mt-2">(50 can be more than 100% of a smaller number!)</p>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">❌ Adding/Subtracting Percentages Incorrectly</h3>
                  <p className="text-gray-700 mb-3">
                    You can't simply add or subtract percentages without considering their base values.
                  </p>
                  <div className="bg-white p-3 rounded-lg text-sm">
                    <p className="text-gray-700 mb-1">Price increases 50% then decreases 50%:</p>
                    <p className="text-red-600 mb-1">Wrong: Final price = Original (50% - 50% = 0% change) ✗</p>
                    <p className="text-green-600">Correct: $100 + 50% = $150, then $150 - 50% = $75 ✓</p>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">❌ Dividing by Zero</h3>
                  <p className="text-gray-700 mb-3">
                    You cannot calculate "X is what % of 0?" because division by zero is undefined.
                  </p>
                  <div className="bg-white p-3 rounded-lg text-sm">
                    <p className="text-red-600">50 is what % of 0? = Undefined ✗</p>
                    <p className="text-gray-600 text-xs mt-1">The denominator (total) cannot be zero</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Percentage Tips and Shortcuts
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Master these mental math tricks to calculate percentages quickly:
              </p>

              <div className="space-y-4">
                <div className="bg-white border-l-4 border-blue-500 p-6 rounded-r-xl shadow-md">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">💡 10% Shortcut</h3>
                  <p className="text-gray-700">
                    To find 10%, just move the decimal point one place to the left. Then multiply or divide for other percentages.
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg mt-3 text-sm">
                    <p>10% of 250 = 25 (move decimal left)</p>
                    <p>20% of 250 = 25 × 2 = 50</p>
                    <p>5% of 250 = 25 ÷ 2 = 12.5</p>
                  </div>
                </div>

                <div className="bg-white border-l-4 border-green-500 p-6 rounded-r-xl shadow-md">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">💡 1% Shortcut</h3>
                  <p className="text-gray-700">
                    To find 1%, move the decimal point two places to the left. Perfect for calculating tips and small percentages.
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg mt-3 text-sm">
                    <p>1% of 500 = 5 (move decimal left twice)</p>
                    <p>3% of 500 = 5 × 3 = 15</p>
                    <p>15% tip on $50 = ($0.50 × 15) = $7.50</p>
                  </div>
                </div>

                <div className="bg-white border-l-4 border-purple-500 p-6 rounded-r-xl shadow-md">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">💡 50% and 25% Shortcuts</h3>
                  <p className="text-gray-700">
                    50% is half, 25% is one quarter. Use division instead of percentage formula.
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg mt-3 text-sm">
                    <p>50% of 80 = 80 ÷ 2 = 40</p>
                    <p>25% of 80 = 80 ÷ 4 = 20</p>
                    <p>75% of 80 = (80 ÷ 4) × 3 = 60</p>
                  </div>
                </div>

                <div className="bg-white border-l-4 border-yellow-500 p-6 rounded-r-xl shadow-md">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">💡 Reversibility Trick</h3>
                  <p className="text-gray-700">
                    X% of Y = Y% of X. This symmetry can make mental calculations easier.
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg mt-3 text-sm">
                    <p>12% of 50 = 50% of 12 = 6</p>
                    <p>4% of 75 = 75% of 4 = 3</p>
                    <p>16% of 25 = 25% of 16 = 4</p>
                  </div>
                </div>

                <div className="bg-white border-l-4 border-red-500 p-6 rounded-r-xl shadow-md">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">💡 Building Up Method</h3>
                  <p className="text-gray-700">
                    Break complex percentages into simpler ones that are easier to calculate.
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg mt-3 text-sm">
                    <p>35% of 200:</p>
                    <p>= (10% × 3) + 5%</p>
                    <p>= (20 × 3) + 10 = 60 + 10 = 70</p>
                  </div>
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
                    <HelpCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <span>What is a percentage?</span>
                  </summary>
                  <p className="mt-4 text-gray-700 pl-8 leading-relaxed">
                    A percentage is a number or ratio expressed as a fraction of 100. It is denoted using the percent sign "%". For example, 45% (read as "forty-five percent") is equal to 45/100, or 0.45. Percentages are used to express how large or small one quantity is relative to another quantity.
                  </p>
                </details>

                <details className="bg-white rounded-xl shadow-md p-6 group">
                  <summary className="cursor-pointer text-lg font-bold text-gray-900 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <span>How do you calculate a percentage of a number?</span>
                  </summary>
                  <p className="mt-4 text-gray-700 pl-8 leading-relaxed">
                    To calculate a percentage of a number, convert the percentage to a decimal by dividing by 100, then multiply by the number. For example, to find 20% of 150: (20 ÷ 100) × 150 = 0.20 × 150 = 30. Alternatively, you can use the formula: (Percentage/100) × Number = Result.
                  </p>
                </details>

                <details className="bg-white rounded-xl shadow-md p-6 group">
                  <summary className="cursor-pointer text-lg font-bold text-gray-900 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <span>How do you convert a decimal to a percentage?</span>
                  </summary>
                  <p className="mt-4 text-gray-700 pl-8 leading-relaxed">
                    To convert a decimal to a percentage, multiply the decimal by 100 and add the percent sign. For example, 0.75 as a percentage is 0.75 × 100 = 75%. Similarly, 0.5 = 50%, 1.2 = 120%, and 0.03 = 3%. You can think of it as moving the decimal point two places to the right.
                  </p>
                </details>

                <details className="bg-white rounded-xl shadow-md p-6 group">
                  <summary className="cursor-pointer text-lg font-bold text-gray-900 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <span>How do you convert a fraction to a percentage?</span>
                  </summary>
                  <p className="mt-4 text-gray-700 pl-8 leading-relaxed">
                    To convert a fraction to a percentage, divide the numerator by the denominator, then multiply by 100. For example, 3/4 as a percentage: (3 ÷ 4) × 100 = 0.75 × 100 = 75%. Similarly, 1/2 = 50%, 1/4 = 25%, and 3/5 = 60%.
                  </p>
                </details>

                <details className="bg-white rounded-xl shadow-md p-6 group">
                  <summary className="cursor-pointer text-lg font-bold text-gray-900 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <span>Can a percentage be greater than 100%?</span>
                  </summary>
                  <p className="mt-4 text-gray-700 pl-8 leading-relaxed">
                    Yes! Percentages can be greater than 100%. This occurs when a value is larger than the reference value. For example, if sales increased from 50 to 150 units, the growth is 200% (150 is 200% more than the original 50, or 300% of the original value). Percentages over 100% are common in growth rates, returns on investment, and comparisons.
                  </p>
                </details>

                <details className="bg-white rounded-xl shadow-md p-6 group">
                  <summary className="cursor-pointer text-lg font-bold text-gray-900 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <span>What's the difference between percentage and percentile?</span>
                  </summary>
                  <p className="mt-4 text-gray-700 pl-8 leading-relaxed">
                    A percentage is a fraction of 100 (like scoring 80% on a test means 80 out of 100). A percentile is a value below which a certain percentage of observations fall (scoring in the 80th percentile means you scored better than 80% of people). They're related but different concepts used in different contexts.
                  </p>
                </details>

                <details className="bg-white rounded-xl shadow-md p-6 group">
                  <summary className="cursor-pointer text-lg font-bold text-gray-900 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <span>How do you calculate percentage increase or decrease?</span>
                  </summary>
                  <p className="mt-4 text-gray-700 pl-8 leading-relaxed">
                    To calculate percentage change: ((New Value - Old Value) / Old Value) × 100. If positive, it's an increase; if negative, it's a decrease. For example, if a price goes from $100 to $120: ((120 - 100) / 100) × 100 = 20% increase. If it goes from $100 to $80: ((80 - 100) / 100) × 100 = -20% decrease.
                  </p>
                </details>

                <details className="bg-white rounded-xl shadow-md p-6 group">
                  <summary className="cursor-pointer text-lg font-bold text-gray-900 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <span>How do you add or subtract percentages?</span>
                  </summary>
                  <p className="mt-4 text-gray-700 pl-8 leading-relaxed">
                    You cannot simply add or subtract percentages unless they're of the same base value. Convert each percentage to its actual value first, then add or subtract those values. For example, if product A increased 10% and product B increased 20%, you can't say the total increase is 30% without knowing the original values of A and B.
                  </p>
                </details>

                <details className="bg-white rounded-xl shadow-md p-6 group">
                  <summary className="cursor-pointer text-lg font-bold text-gray-900 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <span>What is the fastest way to calculate 15% for tips?</span>
                  </summary>
                  <p className="mt-4 text-gray-700 pl-8 leading-relaxed">
                    To quickly calculate a 15% tip: First find 10% by moving the decimal one place left, then find 5% by halving the 10% value, and add them together. For example, on a $60 bill: 10% = $6, 5% = $3, so 15% = $6 + $3 = $9. Or simply move the decimal left one place and add half that amount.
                  </p>
                </details>

                <details className="bg-white rounded-xl shadow-md p-6 group">
                  <summary className="cursor-pointer text-lg font-bold text-gray-900 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <span>How accurate is this percentage calculator?</span>
                  </summary>
                  <p className="mt-4 text-gray-700 pl-8 leading-relaxed">
                    Our percentage calculator is 100% accurate for all standard calculations. It uses precise mathematical formulas and displays results with appropriate decimal places. The step-by-step solutions show exactly how each calculation is performed, ensuring transparency and educational value. You can trust this calculator for homework, business, and everyday percentage calculations.
                  </p>
                </details>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Conclusion
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Mastering percentage calculations is an essential life skill that applies to countless situations in education, business, finance, and daily life. Whether you're calculating discounts while shopping, determining test scores, analyzing business metrics, or planning your finances, understanding percentages empowers you to make informed decisions.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our free percentage calculator simplifies all three fundamental types of percentage calculations with instant results and detailed step-by-step explanations. The Quick Solutions dropdown makes it easy to switch between calculation types, and the clear formula display helps you understand the mathematical reasoning behind each answer.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                By using this calculator regularly and studying the step-by-step solutions, you'll develop a deeper intuition for percentages and improve your mental math skills. Remember the shortcuts and tips we've shared to calculate percentages quickly in your head, and always double-check your work to avoid common mistakes.
              </p>
              <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl p-6 md:p-8 text-center">
                <p className="text-xl md:text-2xl font-bold mb-4">
                  Start calculating percentages now with our free calculator!
                </p>
                <p className="text-lg text-orange-100">
                  Get instant, accurate results with detailed explanations for all your percentage needs.
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* Related Articles Section */}
      <section className="bg-white py-12 px-6 border-t border-gray-200">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-orange-600" />
            Related Articles
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/blog/20-reasons-why-education-is-important" className="group">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all">
                <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 mb-2 line-clamp-2">
                  20 Reasons Why Education Is Important
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  Discover why mastering fundamental math skills like percentages is crucial for lifelong success.
                </p>
              </div>
            </Link>
            <Link href="/blog/what-is-stem-education" className="group">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all">
                <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 mb-2 line-clamp-2">
                  What Is STEM Education?
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  Learn how math foundations like percentages connect to science, technology, and engineering.
                </p>
              </div>
            </Link>
            <Link href="/blog/what-is-competency-based-education" className="group">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all">
                <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 mb-2 line-clamp-2">
                  What Is Competency-Based Education?
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  Explore mastery-based learning approaches that ensure students truly understand concepts.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
