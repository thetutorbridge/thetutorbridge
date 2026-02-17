'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, Home, Divide, BookOpen, Lightbulb, HelpCircle, Grid3x3, CheckCircle2, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DivisionStep {
  dividend: string;
  subtraction: string;
  result: string;
  bringDown: string;
}

interface DivisionResult {
  quotient: number;
  remainder: number;
  steps: DivisionStep[];
  quotientDigits: string[];
}

export default function LongDivisionCalculator() {
  const [dividend, setDividend] = useState<string>('');
  const [divisor, setDivisor] = useState<string>('');
  const [result, setResult] = useState<DivisionResult | null>(null);

  const performLongDivision = (dividendNum: number, divisorNum: number): DivisionResult => {
    const dividendStr = dividendNum.toString();
    const steps: DivisionStep[] = [];
    const quotientDigits: string[] = [];

    let currentDividend = 0;
    let position = 0;

    while (position < dividendStr.length) {
      // Bring down the next digit
      currentDividend = currentDividend * 10 + parseInt(dividendStr[position]);

      // Calculate how many times divisor goes into current dividend
      const quotientDigit = Math.floor(currentDividend / divisorNum);
      quotientDigits.push(quotientDigit.toString());

      // Calculate the product and remainder
      const product = quotientDigit * divisorNum;
      const remainder = currentDividend - product;

      // Create step
      steps.push({
        dividend: currentDividend.toString(),
        subtraction: product.toString(),
        result: remainder.toString(),
        bringDown: position < dividendStr.length - 1 ? dividendStr[position + 1] : '',
      });

      currentDividend = remainder;
      position++;
    }

    const finalQuotient = parseInt(quotientDigits.join(''));
    const finalRemainder = currentDividend;

    return {
      quotient: finalQuotient,
      remainder: finalRemainder,
      steps,
      quotientDigits,
    };
  };

  const handleCalculate = () => {
    const dividendNum = parseInt(dividend);
    const divisorNum = parseInt(divisor);

    if (isNaN(dividendNum) || isNaN(divisorNum)) {
      alert('Please enter valid numbers for both dividend and divisor');
      return;
    }

    if (divisorNum === 0) {
      alert('Cannot divide by zero');
      return;
    }

    if (dividendNum < 0 || divisorNum < 0) {
      alert('Please enter positive numbers');
      return;
    }

    const divisionResult = performLongDivision(dividendNum, divisorNum);
    setResult(divisionResult);
  };

  const handleClear = () => {
    setDividend('');
    setDivisor('');
    setResult(null);
  };

  const formatNumberWithCommas = (num: number): string => {
    return num.toLocaleString('en-US');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the difference between short division and long division?","acceptedAnswer":{"@type":"Answer","text":"Short division is a mental calculation method used for simple division with small divisors (usually single digits). Long division is a written algorithm that shows all steps clearly and works for any size numbers. Long division is more systematic and reliable for complex problems, while short division is faster for simple calculations."}},{"@type":"Question","name":"Why do we need to show all the steps in long division?","acceptedAnswer":{"@type":"Answer","text":"Showing all steps helps you understand the division process, catch errors early, and learn the underlying mathematical concepts. It also makes it easier for teachers to identify where you might be struggling and helps you build confidence in your mathematical reasoning. The detailed process ensures accuracy with large numbers."}},{"@type":"Question","name":"What does the remainder mean in division?","acceptedAnswer":{"@type":"Answer","text":"The remainder is what\'s left over after dividing when the divisor doesn\'t go evenly into the dividend. For example, 17 ÷ 5 = 3 with a remainder of 2, because 5 goes into 17 three times (5 × 3 = 15), leaving 2 left over. The remainder must always be less than the divisor."}},{"@type":"Question","name":"How do I know if my quotient digit is too big or too small?","acceptedAnswer":{"@type":"Answer","text":"When you multiply the quotient digit by the divisor, the product should be less than or equal to the current working number. If your subtraction gives a negative number, your quotient digit is too large— reduce it by 1. If the remainder after subtraction is larger than the divisor, your quotient digit was too small—increase it by 1."}},{"@type":"Question","name":"Can you use long division with decimals?","acceptedAnswer":{"@type":"Answer","text":"Yes! Long division works with decimals. When the divisor has a decimal, multiply both the divisor and dividend by 10, 100, or 1000 to make the divisor a whole number first. When the dividend has a decimal, keep the decimal point in the same position in your quotient. You can also continue division past the decimal point to get a more precise answer."}},{"@type":"Question","name":"What if the dividend is smaller than the divisor?","acceptedAnswer":{"@type":"Answer","text":"If the dividend is smaller than the divisor (like 25 ÷ 50), the quotient is 0 and the remainder equals the original dividend. In decimal form, you would write 0. followed by decimal places. For example, 25 ÷ 50 = 0 remainder 25, or 0.5 in decimal form."}},{"@type":"Question","name":"How do I check if my long division answer is correct?","acceptedAnswer":{"@type":"Answer","text":"Use the division verification formula: (Quotient × Divisor) + Remainder = Dividend. Multiply your quotient by the divisor, add any remainder, and you should get back to your original dividend. If you don\'t, there\'s an error somewhere in your working. Our calculator shows this verification for every solution."}},{"@type":"Question","name":"When should I stop dividing in long division?","acceptedAnswer":{"@type":"Answer","text":"You stop when you\'ve brought down all digits from the dividend and completed the final subtraction. At this point, what\'s left is your remainder. If you\'re finding a decimal answer, you can continue adding zeros and dividing until you reach the desired precision or until the pattern repeats."}}]}' }}
      />
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
            <span className="text-gray-900 font-medium">Long Division Calculator</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <Divide className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Long Division Calculator
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Solve long division problems with visual step-by-step solutions. See the complete working process with quotient, remainder, and detailed division grid.
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-[#1A3D7C]" />
                  Long Division
                </h2>

                {/* Visual Division Notation */}
                <div className="mb-6 p-6 bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl">
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                      <Label className="text-xs text-gray-600 mb-2 block">Divisor</Label>
                      <Input
                        type="number"
                        placeholder="50"
                        value={divisor}
                        onChange={(e) => setDivisor(e.target.value)}
                        className="w-24 text-center text-xl font-bold border-2 border-[#1A3D7C]"
                      />
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="text-4xl font-bold text-[#1A3D7C]">)</div>
                      <div className="w-0.5 h-12 bg-[#1A3D7C]"></div>
                    </div>

                    <div className="text-center">
                      <Label className="text-xs text-gray-600 mb-2 block">Dividend</Label>
                      <Input
                        type="number"
                        placeholder="3000"
                        value={dividend}
                        onChange={(e) => setDividend(e.target.value)}
                        className="w-32 text-center text-xl font-bold border-2 border-[#2BAE66]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-blue-50 border-l-4 border-[#1A3D7C] p-4 rounded">
                    <p className="text-sm text-gray-700">
                      <strong>Dividend:</strong> The number being divided
                    </p>
                  </div>
                  <div className="bg-teal-50 border-l-4 border-[#2BAE66] p-4 rounded">
                    <p className="text-sm text-gray-700">
                      <strong>Divisor:</strong> The number you're dividing by
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleCalculate}
                    className="flex-1 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] hover:from-[#152f63] hover:to-[#239454] text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
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

            {/* Results Section */}
            <div className="lg:col-span-3">
              {result ? (
                <div className="space-y-6">
                  {/* Answer Card */}
                  <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Answer
                    </h3>

                    <div className="space-y-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                        <p className="text-4xl md:text-5xl font-bold text-center">
                          = {result.quotient} R {result.remainder}
                        </p>
                      </div>

                      {result.remainder === 0 && (
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                          <p className="text-3xl md:text-4xl font-bold text-center">
                            = {result.quotient}
                          </p>
                        </div>
                      )}

                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <p className="text-lg text-center leading-relaxed">
                          {formatNumberWithCommas(parseInt(dividend))} divided by {formatNumberWithCommas(parseInt(divisor))} equals{' '}
                          <strong className="text-[#FFC857]">{result.quotient}</strong>
                          {result.remainder > 0 && (
                            <>
                              {' '}with a remainder of <strong className="text-[#FFC857]">{result.remainder}</strong>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Solution Grid */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Grid3x3 className="w-5 h-5 text-[#1A3D7C]" />
                      Visual Long Division Tree
                    </h3>

                    {/* Traditional Long Division Tree */}
                    <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-8 mb-6 overflow-x-auto">
                      <div className="inline-block min-w-full">
                        <div className="font-mono text-lg md:text-xl space-y-1">
                          {/* Quotient Line */}
                          <div className="flex items-start">
                            <div className="w-20 md:w-24"></div>
                            <div className="flex gap-1">
                              {result.quotientDigits.map((digit, idx) => (
                                <div key={idx} className="w-10 md:w-12 text-center">
                                  <span className="text-2xl md:text-3xl font-bold text-[#1A3D7C] bg-white px-2 py-1 rounded">{digit}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Division Symbol Line */}
                          <div className="flex items-center">
                            <div className="w-20 md:w-24 text-right pr-3 text-xl md:text-2xl font-bold text-[#1A3D7C]">
                              {divisor}
                            </div>
                            <div className="flex items-center">
                              <div className="text-3xl md:text-4xl font-bold text-gray-700">⟌</div>
                              <div className="border-t-4 border-gray-700 flex">
                                {dividend.split('').map((digit, idx) => (
                                  <div key={idx} className="w-10 md:w-12 text-center pt-2">
                                    <span className="text-2xl md:text-3xl font-bold text-[#2BAE66]">{digit}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Working Steps */}
                          {result.steps.map((step, stepIdx) => (
                            <div key={stepIdx} className="mt-3">
                              {/* Subtraction line */}
                              <div className="flex items-center">
                                <div className="w-20 md:w-24"></div>
                                <div className="w-10 md:w-12 text-center text-xl text-gray-600">−</div>
                                <div className="text-xl md:text-2xl font-semibold text-gray-700 ml-2">
                                  {step.subtraction}
                                </div>
                              </div>

                              {/* Horizontal line */}
                              <div className="flex items-center mt-1">
                                <div className="w-20 md:w-24"></div>
                                <div className="border-t-2 border-gray-600" style={{ width: `${Math.max(step.subtraction.length, step.result.length) * 2.5}rem` }}></div>
                              </div>

                              {/* Result and Bring Down */}
                              <div className="flex items-center mt-1">
                                <div className="w-20 md:w-24"></div>
                                <div className="flex items-center gap-1">
                                  <span className="text-xl md:text-2xl font-bold text-[#2BAE66]">{step.result}</span>
                                  {step.bringDown && (
                                    <>
                                      <span className="text-lg text-[#1A3D7C] font-bold mx-1">↓</span>
                                      <span className="text-xl md:text-2xl font-bold text-[#1A3D7C] bg-yellow-100 px-2 rounded">{step.bringDown}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}

                          {/* Final Remainder */}
                          {result.remainder > 0 && (
                            <div className="flex items-center mt-4 bg-yellow-100 py-2 px-4 rounded-lg">
                              <div className="w-20 md:w-24"></div>
                              <div className="text-xl font-bold text-gray-900">
                                Remainder: <span className="text-[#FFC857] text-2xl">{result.remainder}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Step-by-Step Explanation */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-gray-900 mb-3 text-lg">Detailed Explanation:</h4>

                      {result.steps.map((step, stepIdx) => (
                        <div key={stepIdx} className="bg-white border-2 border-gray-200 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold text-sm">
                              {stepIdx + 1}
                            </div>
                            <p className="font-semibold text-gray-900">Step {stepIdx + 1}</p>
                          </div>

                          <div className="ml-10 space-y-2 text-sm md:text-base">
                            <p>
                              <span className="font-semibold">Divide:</span> {step.dividend} ÷ {divisor} = <span className="text-[#1A3D7C] font-bold">{result.quotientDigits[stepIdx]}</span>
                            </p>
                            <p>
                              <span className="font-semibold">Multiply:</span> {result.quotientDigits[stepIdx]} × {divisor} = <span className="text-gray-700 font-bold">{step.subtraction}</span>
                            </p>
                            <p>
                              <span className="font-semibold">Subtract:</span> {step.dividend} − {step.subtraction} = <span className="text-[#2BAE66] font-bold">{step.result}</span>
                            </p>
                            {step.bringDown && (
                              <p className="text-[#1A3D7C]">
                                <span className="font-semibold">Bring down:</span> {step.bringDown} → New number is {step.result}{step.bringDown}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Formula */}
                    <div className="mt-6 bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-[#FFC857]" />
                        Division Formula
                      </h4>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <p className="text-lg font-mono text-gray-800 mb-2">
                          Dividend = (Divisor × Quotient) + Remainder
                        </p>
                        <p className="text-base text-gray-600">
                          {dividend} = ({divisor} × {result.quotient}) + {result.remainder}
                        </p>
                        <p className="text-base text-gray-600 mt-2">
                          {dividend} = {parseInt(divisor) * result.quotient} + {result.remainder}
                        </p>
                        <p className="text-base font-bold text-[#2BAE66] mt-2">
                          {dividend} = {dividend} ✓
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <Divide className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    Enter dividend and divisor to see the long division solution with step-by-step working
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Understanding Long Division
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                A long division calculator is an essential educational tool that helps you divide large numbers systematically
                while showing every step of the process. Long division is one of the fundamental arithmetic operations that
                breaks down complex division problems into smaller, manageable steps, making it easier to understand how
                division works at a deeper level.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our calculator not only provides the final answer (quotient and remainder) but also displays the complete
                working in a traditional long division format with a visual grid. This step-by-step approach helps students
                learn the methodology, verify their manual calculations, and understand the logic behind each step of the
                division algorithm.
              </p>
            </section>

            {/* What is Long Division */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                What is Long Division?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Long division is a method for dividing large numbers by breaking down the division process into a series of
                easier steps. Unlike simple division where you might divide small numbers mentally, long division provides a
                structured algorithm that works for any size numbers, ensuring accuracy and understanding.
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Key Terms in Division:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    <div>
                      <strong className="text-gray-900">Dividend:</strong>
                      <p className="text-gray-700 mt-1">The number being divided. This is the larger number that you want to split into parts.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#2BAE66] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    <div>
                      <strong className="text-gray-900">Divisor:</strong>
                      <p className="text-gray-700 mt-1">The number you're dividing by. This tells you how many parts or groups you want to create.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#FFC857] text-gray-900 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    <div>
                      <strong className="text-gray-900">Quotient:</strong>
                      <p className="text-gray-700 mt-1">The result or answer of the division. This is how many times the divisor fits into the dividend.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                    <div>
                      <strong className="text-gray-900">Remainder:</strong>
                      <p className="text-gray-700 mt-1">What's left over after division when the divisor doesn't divide evenly into the dividend.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white border-2 border-[#1A3D7C] rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Example:</h3>
                <p className="text-gray-700 mb-2">In the problem: <strong>3000 ÷ 50</strong></p>
                <ul className="space-y-2 text-gray-700 ml-4">
                  <li>• <strong>Dividend:</strong> 3000 (the number being divided)</li>
                  <li>• <strong>Divisor:</strong> 50 (the number we're dividing by)</li>
                  <li>• <strong>Quotient:</strong> 60 (the answer)</li>
                  <li>• <strong>Remainder:</strong> 0 (nothing left over)</li>
                </ul>
              </div>
            </section>

            {/* How to Perform Long Division */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Perform Long Division: Step-by-Step Guide
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Long division follows a systematic process often remembered by the acronym <strong>DMSB</strong>: Divide,
                Multiply, Subtract, Bring down. Here's how it works:
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                <ol className="space-y-6">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-10 h-10 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center font-bold text-lg">1</span>
                    <div>
                      <strong className="text-gray-900 text-lg">Divide:</strong>
                      <p className="text-gray-700 mt-2">Look at the first digit(s) of the dividend. Ask: "How many times does the divisor fit into this number?" Write that digit above the division bar.</p>
                      <div className="mt-2 bg-white rounded p-3 text-sm">
                        <strong>Example:</strong> In 3000 ÷ 50, ask "How many times does 50 go into 30?" Answer: 0 times. Try 300: "How many times does 50 go into 300?" Answer: 6 times.
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-10 h-10 bg-[#2BAE66] text-white rounded-full flex items-center justify-center font-bold text-lg">2</span>
                    <div>
                      <strong className="text-gray-900 text-lg">Multiply:</strong>
                      <p className="text-gray-700 mt-2">Multiply the quotient digit you just wrote by the divisor. Write the product below the digits you were dividing into.</p>
                      <div className="mt-2 bg-white rounded p-3 text-sm">
                        <strong>Example:</strong> 6 × 50 = 300. Write 300 below the 300 in the dividend.
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-10 h-10 bg-[#FFC857] text-gray-900 rounded-full flex items-center justify-center font-bold text-lg">3</span>
                    <div>
                      <strong className="text-gray-900 text-lg">Subtract:</strong>
                      <p className="text-gray-700 mt-2">Subtract the product from the number above it. Write the difference below. This is your remainder for this step.</p>
                      <div className="mt-2 bg-white rounded p-3 text-sm">
                        <strong>Example:</strong> 300 − 300 = 0
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">4</span>
                    <div>
                      <strong className="text-gray-900 text-lg">Bring Down:</strong>
                      <p className="text-gray-700 mt-2">Bring down the next digit from the dividend and place it next to the remainder. This creates a new number to divide.</p>
                      <div className="mt-2 bg-white rounded p-3 text-sm">
                        <strong>Example:</strong> Bring down the next 0, making it 00. Repeat the process.
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">5</span>
                    <div>
                      <strong className="text-gray-900 text-lg">Repeat:</strong>
                      <p className="text-gray-700 mt-2">Continue the DMSB process (Divide, Multiply, Subtract, Bring down) until you've brought down all digits from the dividend. The final remainder is what's left at the end.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            {/* Worked Example */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Complete Worked Example: 3000 ÷ 50
              </h2>

              <div className="bg-white border-2 border-[#2BAE66] rounded-xl p-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded">
                    <p className="font-bold text-gray-900 mb-2">Setup:</p>
                    <p className="text-gray-700">Write 50 (divisor) outside the division bracket and 3000 (dividend) inside.</p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded">
                    <p className="font-bold text-gray-900 mb-2">Step 1:</p>
                    <p className="text-gray-700">50 doesn't go into 3, so try 30. Still doesn't fit. Try 300.</p>
                    <p className="text-gray-700 mt-1">50 goes into 300 <strong>6 times</strong> (50 × 6 = 300)</p>
                    <p className="text-gray-700 mt-1">Write <strong>6</strong> above the division bar over the last 0 of 300.</p>
                  </div>

                  <div className="bg-teal-50 p-4 rounded">
                    <p className="font-bold text-gray-900 mb-2">Step 2:</p>
                    <p className="text-gray-700">Multiply: 6 × 50 = 300</p>
                    <p className="text-gray-700 mt-1">Subtract: 300 − 300 = 0</p>
                    <p className="text-gray-700 mt-1">Bring down the next 0, making it 00.</p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded">
                    <p className="font-bold text-gray-900 mb-2">Step 3:</p>
                    <p className="text-gray-700">50 goes into 00 <strong>0 times</strong></p>
                    <p className="text-gray-700 mt-1">Write <strong>0</strong> above the division bar.</p>
                    <p className="text-gray-700 mt-1">Multiply: 0 × 50 = 0</p>
                    <p className="text-gray-700 mt-1">Subtract: 0 − 0 = 0</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded border-2 border-[#2BAE66]">
                    <p className="font-bold text-gray-900 mb-2">Final Answer:</p>
                    <p className="text-xl text-[#2BAE66] font-bold">Quotient: 60, Remainder: 0</p>
                    <p className="text-gray-700 mt-2">Therefore: 3000 ÷ 50 = 60</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Real-World Applications */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Real-World Applications of Long Division
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-blue-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-[#1A3D7C] mb-3">Sharing and Distribution</h3>
                  <p className="text-gray-700">
                    Dividing items equally among people. If you have 3000 cookies to distribute among 50 classrooms, each
                    room gets 60 cookies. Long division helps ensure fair distribution in real-life scenarios.
                  </p>
                </div>

                <div className="bg-white border-2 border-teal-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-[#2BAE66] mb-3">Unit Price Calculation</h3>
                  <p className="text-gray-700">
                    Finding cost per unit when shopping. If 50 items cost $3000, each item costs $60. This helps compare
                    prices and find the best deals when shopping in bulk.
                  </p>
                </div>

                <div className="bg-white border-2 border-yellow-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-[#FFC857] mb-3">Time and Speed Calculations</h3>
                  <p className="text-gray-700">
                    Calculating average speed, time per task, or rate of work. If you travel 3000 miles in 50 hours, your
                    average speed is 60 mph. Essential for trip planning and productivity tracking.
                  </p>
                </div>

                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">Construction and Measurements</h3>
                  <p className="text-gray-700">
                    Dividing materials or measurements. If you have 3000 square feet to cover with tiles that are 50 square
                    feet each, you need 60 tiles. Critical for accurate material estimation.
                  </p>
                </div>

                <div className="bg-white border-2 border-red-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-600 mb-3">Finance and Budgeting</h3>
                  <p className="text-gray-700">
                    Splitting costs or calculating payments. If a $3000 expense is shared among 50 people, each person pays
                    $60. Useful for group expenses, bill splitting, and financial planning.
                  </p>
                </div>

                <div className="bg-white border-2 border-green-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-600 mb-3">Data Analysis and Statistics</h3>
                  <p className="text-gray-700">
                    Calculating averages and rates. If 3000 students are divided into 50 classes, each class has 60 students
                    on average. Important for analyzing data sets and finding patterns.
                  </p>
                </div>
              </div>
            </section>

            {/* Common Mistakes */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Common Mistakes in Long Division
              </h2>
              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">Incorrect Placement of Quotient Digits</h3>
                  <p className="text-red-800 mb-2">
                    <strong>Wrong:</strong> Writing quotient digits in the wrong position above the dividend ❌
                  </p>
                  <p className="text-green-800">
                    <strong>Correct:</strong> Always place each quotient digit directly above the last digit of the number you're currently dividing ✓
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">Forgetting to Bring Down</h3>
                  <p className="text-red-800 mb-2">
                    <strong>Wrong:</strong> Not bringing down the next digit after subtraction ❌
                  </p>
                  <p className="text-green-800">
                    <strong>Correct:</strong> Always bring down the next digit before continuing to the next division step ✓
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">Subtraction Errors</h3>
                  <p className="text-red-800 mb-2">
                    <strong>Wrong:</strong> Making mistakes when subtracting in the middle steps ❌
                  </p>
                  <p className="text-green-800">
                    <strong>Correct:</strong> Double-check each subtraction. The result should always be less than the divisor ✓
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">Using Wrong Quotient Digit</h3>
                  <p className="text-red-800 mb-2">
                    <strong>Wrong:</strong> Guessing a quotient digit that's too large, resulting in a negative remainder ❌
                  </p>
                  <p className="text-green-800">
                    <strong>Correct:</strong> If subtraction gives a negative result, reduce your quotient digit by one ✓
                  </p>
                </div>
              </div>
            </section>

            {/* Tips and Tricks */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Tips and Tricks for Long Division
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-[#1A3D7C] mb-3">Estimate Before You Divide</h3>
                  <p className="text-gray-700">
                    Round numbers to estimate the answer. For 3000 ÷ 50, think "3000 ÷ 50 is about 60." This helps you
                    catch major errors and know what range your answer should be in.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-[#2BAE66] mb-3">Check Your Work</h3>
                  <p className="text-gray-700">
                    Use multiplication to verify: (Quotient × Divisor) + Remainder should equal the Dividend. For example:
                    (60 × 50) + 0 = 3000 ✓
                  </p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-[#FFC857] mb-3">Practice Times Tables</h3>
                  <p className="text-gray-700">
                    Strong multiplication facts make division faster. If you know 50 × 6 = 300 instantly, you'll complete
                    long division steps much quicker and with fewer errors.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">Write Neatly and Align</h3>
                  <p className="text-gray-700">
                    Keep your work organized with proper alignment. This prevents place value errors and makes it easier to
                    spot mistakes. Line up your digits carefully in columns.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <HelpCircle className="w-8 h-8 text-[#1A3D7C]" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What is the difference between short division and long division?
                  </h3>
                  <p className="text-gray-700">
                    Short division is a mental calculation method used for simple division with small divisors (usually single
                    digits). Long division is a written algorithm that shows all steps clearly and works for any size numbers.
                    Long division is more systematic and reliable for complex problems, while short division is faster for
                    simple calculations.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Why do we need to show all the steps in long division?
                  </h3>
                  <p className="text-gray-700">
                    Showing all steps helps you understand the division process, catch errors early, and learn the underlying
                    mathematical concepts. It also makes it easier for teachers to identify where you might be struggling and
                    helps you build confidence in your mathematical reasoning. The detailed process ensures accuracy with large
                    numbers.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What does the remainder mean in division?
                  </h3>
                  <p className="text-gray-700">
                    The remainder is what's left over after dividing when the divisor doesn't go evenly into the dividend. For
                    example, 17 ÷ 5 = 3 with a remainder of 2, because 5 goes into 17 three times (5 × 3 = 15), leaving 2 left
                    over. The remainder must always be less than the divisor.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do I know if my quotient digit is too big or too small?
                  </h3>
                  <p className="text-gray-700">
                    When you multiply the quotient digit by the divisor, the product should be less than or equal to the
                    current working number. If your subtraction gives a negative number, your quotient digit is too large—
                    reduce it by 1. If the remainder after subtraction is larger than the divisor, your quotient digit was too
                    small—increase it by 1.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can you use long division with decimals?
                  </h3>
                  <p className="text-gray-700">
                    Yes! Long division works with decimals. When the divisor has a decimal, multiply both the divisor and
                    dividend by 10, 100, or 1000 to make the divisor a whole number first. When the dividend has a decimal,
                    keep the decimal point in the same position in your quotient. You can also continue division past the
                    decimal point to get a more precise answer.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What if the dividend is smaller than the divisor?
                  </h3>
                  <p className="text-gray-700">
                    If the dividend is smaller than the divisor (like 25 ÷ 50), the quotient is 0 and the remainder equals the
                    original dividend. In decimal form, you would write 0. followed by decimal places. For example, 25 ÷ 50 =
                    0 remainder 25, or 0.5 in decimal form.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do I check if my long division answer is correct?
                  </h3>
                  <p className="text-gray-700">
                    Use the division verification formula: (Quotient × Divisor) + Remainder = Dividend. Multiply your quotient
                    by the divisor, add any remainder, and you should get back to your original dividend. If you don't, there's
                    an error somewhere in your working. Our calculator shows this verification for every solution.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    When should I stop dividing in long division?
                  </h3>
                  <p className="text-gray-700">
                    You stop when you've brought down all digits from the dividend and completed the final subtraction. At this
                    point, what's left is your remainder. If you're finding a decimal answer, you can continue adding zeros and
                    dividing until you reach the desired precision or until the pattern repeats.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Why is long division important to learn?
                  </h3>
                  <p className="text-gray-700">
                    Long division teaches critical thinking, logical reasoning, and problem-solving skills. It's fundamental to
                    understanding fractions, algebra, and higher mathematics. Even with calculators available, understanding
                    long division helps you estimate answers, catch errors, and grasp mathematical relationships that are
                    essential in many careers and everyday situations.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can this calculator help me with homework?
                  </h3>
                  <p className="text-gray-700">
                    Absolutely! Our calculator is designed as a learning tool. It shows every step of the long division process
                    in a clear visual grid, just like you would write it on paper. Use it to check your answers, understand
                    where you made mistakes, and learn the correct process. The step-by-step solution helps you see the logic
                    behind each stage of division.
                  </p>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Master Long Division with Confidence
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Long division is a foundational mathematical skill that opens doors to understanding more complex mathematical
                concepts. While it may seem challenging at first, following the systematic DMSB process (Divide, Multiply,
                Subtract, Bring down) makes even the most complicated division problems manageable and solvable.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our Long Division Calculator provides more than just answers—it's a comprehensive learning tool that shows you
                the complete working in a traditional long division format. By seeing every step laid out clearly in the visual
                grid, you can understand not just what the answer is, but why it's correct. This deep understanding builds
                mathematical confidence and problem-solving skills that last a lifetime.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Whether you're a student learning division for the first time, a parent helping with homework, or anyone
                needing to verify calculations, our calculator guides you through the process with clarity and precision.
                Practice regularly, check your work, and soon long division will become second nature. Remember: mathematics is
                not about memorization—it's about understanding patterns and processes. With this tool and consistent practice,
                you'll master long division with confidence!
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
              Need Help with Division?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you master long division, understand the process, and excel in mathematics. Get personalized one-on-one guidance tailored to your learning style.
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
