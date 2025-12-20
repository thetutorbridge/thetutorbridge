'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Home, RotateCw, CheckCircle, BookOpen, Lightbulb, HelpCircle, Target, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RoundingResult {
  originalNumber: number;
  roundedNumber: number;
  placeValue: string;
  decimalPlaces: number;
  explanation: {
    numberString: string;
    targetDigitIndex: number;
    nextDigitIndex: number;
    targetDigit: string;
    nextDigit: string;
    roundsUp: boolean;
  };
}

export default function RoundingNumbersCalculator() {
  const [inputNumber, setInputNumber] = useState<string>('');
  const [roundTo, setRoundTo] = useState<string>('hundredths');
  const [result, setResult] = useState<RoundingResult | null>(null);

  const roundingOptions = [
    { value: 'ones', label: 'Ones (Whole Number)', decimals: 0 },
    { value: 'tenths', label: 'Tenths (1 decimal place)', decimals: 1 },
    { value: 'hundredths', label: 'Hundredths (2 decimal places, cents)', decimals: 2 },
    { value: 'thousandths', label: 'Thousandths (3 decimal places)', decimals: 3 },
    { value: 'ten-thousandths', label: 'Ten Thousandths (4 decimal places)', decimals: 4 },
    { value: 'hundred-thousandths', label: 'Hundred Thousandths (5 decimal places)', decimals: 5 },
  ];

  const handleCalculate = () => {
    const num = parseFloat(inputNumber);

    if (isNaN(num)) {
      alert('Please enter a valid number');
      return;
    }

    const selectedOption = roundingOptions.find(opt => opt.value === roundTo);
    if (!selectedOption) return;

    const decimals = selectedOption.decimals;
    const multiplier = Math.pow(10, decimals);
    const rounded = Math.round(num * multiplier) / multiplier;

    // Get explanation details
    const numStr = num.toString();
    const decimalIndex = numStr.indexOf('.');

    let targetDigitIndex: number;
    let nextDigitIndex: number;

    if (decimals === 0) {
      // Rounding to whole number
      targetDigitIndex = decimalIndex === -1 ? numStr.length - 1 : decimalIndex - 1;
      nextDigitIndex = decimalIndex === -1 ? -1 : decimalIndex + 1;
    } else {
      // Rounding to decimal places
      if (decimalIndex === -1) {
        targetDigitIndex = numStr.length - 1;
        nextDigitIndex = -1;
      } else {
        targetDigitIndex = decimalIndex + decimals;
        nextDigitIndex = decimalIndex + decimals + 1;
      }
    }

    const targetDigit = nextDigitIndex === -1 || nextDigitIndex >= numStr.length ? '0' :
                        (targetDigitIndex >= 0 && targetDigitIndex < numStr.length ? numStr[targetDigitIndex] : '0');
    const nextDigit = nextDigitIndex === -1 || nextDigitIndex >= numStr.length ? '0' : numStr[nextDigitIndex];
    const roundsUp = parseInt(nextDigit) >= 5;

    setResult({
      originalNumber: num,
      roundedNumber: rounded,
      placeValue: selectedOption.label,
      decimalPlaces: decimals,
      explanation: {
        numberString: numStr,
        targetDigitIndex,
        nextDigitIndex,
        targetDigit,
        nextDigit,
        roundsUp,
      },
    });
  };

  const handleClear = () => {
    setInputNumber('');
    setRoundTo('hundredths');
    setResult(null);
  };

  const formatNumberWithCommas = (num: number): string => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 10
    });
  };

  const renderNumberWithHighlights = (numStr: string, targetIdx: number, nextIdx: number) => {
    return (
      <div className="inline-flex items-baseline gap-0.5 text-3xl md:text-4xl font-bold font-mono">
        {numStr.split('').map((char, idx) => {
          let className = 'px-0.5';
          if (idx === targetIdx) {
            className += ' bg-green-200 text-green-900 rounded px-1';
          } else if (idx === nextIdx) {
            className += ' bg-red-200 text-red-900 rounded px-1';
          }
          return (
            <span key={idx} className={className}>
              {char}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-white to-red-50">
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
            <span className="text-gray-900 font-medium">Rounding Numbers Calculator</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <RotateCw className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Rounding Numbers Calculator
            </h1>
            <p className="text-lg md:text-xl text-orange-100 max-w-2xl mx-auto leading-relaxed">
              Round any number to the nearest whole number, tenth, hundredth, or any decimal place with visual step-by-step explanations and digit highlighting.
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
                  <Calculator className="w-6 h-6 text-orange-600" />
                  Round Numbers
                </h2>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="number" className="text-sm font-semibold text-gray-700 mb-3 block">
                      Number to Round
                    </Label>
                    <Input
                      id="number"
                      type="number"
                      step="any"
                      placeholder="Enter number (e.g., 3266.528)"
                      value={inputNumber}
                      onChange={(e) => setInputNumber(e.target.value)}
                      className="text-center text-lg font-medium"
                    />
                  </div>

                  <div>
                    <Label htmlFor="round-to" className="text-sm font-semibold text-gray-700 mb-3 block">
                      Round To
                    </Label>
                    <Select value={roundTo} onValueChange={setRoundTo}>
                      <SelectTrigger id="round-to" className="text-base font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {roundingOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="text-base">
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={handleCalculate}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
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
                  <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Answer
                    </h3>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-4">
                      <p className="text-4xl md:text-5xl font-bold text-center">
                        {formatNumberWithCommas(result.roundedNumber)}
                      </p>
                    </div>
                    <p className="text-center text-lg text-orange-100">
                      Rounded to the nearest <strong className="text-white">{result.decimalPlaces === 0 ? 'whole number' : result.placeValue.toLowerCase()}</strong>.
                    </p>
                  </div>

                  {/* Visual Explanation */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-orange-600" />
                      Visual Explanation
                    </h3>

                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                      <div className="text-center mb-4">
                        {renderNumberWithHighlights(
                          result.explanation.numberString,
                          result.explanation.targetDigitIndex,
                          result.explanation.nextDigitIndex
                        )}
                      </div>

                      <div className="space-y-3 text-gray-700">
                        <p className="text-base leading-relaxed">
                          You rounded to the nearest <strong>{result.placeValue.toLowerCase()}</strong>.
                        </p>

                        {result.explanation.nextDigit !== '0' && result.explanation.nextDigitIndex !== -1 ? (
                          <>
                            <p className="text-base leading-relaxed">
                              The{' '}
                              <span className="inline-block bg-green-200 text-green-900 font-bold px-2 py-0.5 rounded">
                                {result.explanation.targetDigit}
                              </span>
                              {' '}in the {result.placeValue.toLowerCase()} place{' '}
                              {result.explanation.roundsUp ? 'rounds up to' : 'stays as'}{' '}
                              <strong>
                                {result.explanation.roundsUp
                                  ? (parseInt(result.explanation.targetDigit) + 1).toString()
                                  : result.explanation.targetDigit}
                              </strong>
                              {' '}because the digit to the right in the{' '}
                              {result.decimalPlaces === 0 ? 'tenths' :
                               result.decimalPlaces === 1 ? 'hundredths' :
                               result.decimalPlaces === 2 ? 'thousandths' :
                               result.decimalPlaces === 3 ? 'ten-thousandths' : 'next'}{' '}
                              place is{' '}
                              <span className="inline-block bg-red-200 text-red-900 font-bold px-2 py-0.5 rounded">
                                {result.explanation.nextDigit}
                              </span>.
                            </p>

                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                              <p className="text-base font-semibold text-blue-900">
                                {result.explanation.roundsUp
                                  ? `When the digit to the right is 5 or greater, we round away from 0.`
                                  : `When the digit to the right is less than 5, we round toward 0.`}
                              </p>
                            </div>
                          </>
                        ) : (
                          <p className="text-base leading-relaxed">
                            The number is already rounded to the {result.placeValue.toLowerCase()} or has no digits beyond this place.
                          </p>
                        )}

                        <div className="pt-4 border-t border-gray-200">
                          <p className="text-lg font-semibold text-gray-900">
                            {formatNumberWithCommas(result.originalNumber)} was rounded{' '}
                            {result.explanation.roundsUp ? 'up and away from zero' : 'down toward zero'} to{' '}
                            <span className="text-orange-600">{formatNumberWithCommas(result.roundedNumber)}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Rounding Rule Reminder */}
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-orange-600" />
                        Rounding Rules
                      </h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-orange-600 font-bold">•</span>
                          <span>If the digit to the right is <strong>5, 6, 7, 8, or 9</strong>, round up (away from zero)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-600 font-bold">•</span>
                          <span>If the digit to the right is <strong>0, 1, 2, 3, or 4</strong>, round down (toward zero)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-600 font-bold">•</span>
                          <span>Drop all digits to the right of the rounding place</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    Enter a number and select a place value to see the rounded result with visual explanation
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
                Understanding Rounding Numbers
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                A rounding numbers calculator is an essential educational tool that helps you round any decimal or whole number
                to a specified place value. Whether you need to round to the nearest whole number, tenth, hundredth, or any
                other decimal place, our calculator provides instant, accurate results with visual step-by-step explanations
                that highlight exactly which digits are being considered in the rounding process.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Rounding is a fundamental mathematical concept used daily in finance, science, statistics, and everyday
                calculations. It allows us to simplify numbers while maintaining reasonable accuracy, making complex calculations
                easier and results more readable. Our calculator not only provides the rounded answer but also teaches you the
                methodology through color-coded digit highlighting and clear explanations of the rounding rules being applied.
              </p>
            </section>

            {/* What is Rounding */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                What is Rounding?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Rounding is the process of replacing a number with another number that is approximately equal but has fewer
                digits, making it simpler to work with. When we round a number, we reduce its precision to a specific place
                value while maintaining a value that is close to the original number.
              </p>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 mb-4">
                <h3 className="font-bold text-gray-900 mb-3">Key Concepts:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    <div>
                      <strong className="text-gray-900">Place Value:</strong>
                      <p className="text-gray-700 mt-1">The position of a digit in a number determines its value. From right to left: ones, tens, hundreds; from the decimal point right: tenths, hundredths, thousandths.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    <div>
                      <strong className="text-gray-900">Rounding Digit:</strong>
                      <p className="text-gray-700 mt-1">The digit in the place you're rounding to. This digit either stays the same or increases by one.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    <div>
                      <strong className="text-gray-900">Test Digit:</strong>
                      <p className="text-gray-700 mt-1">The digit immediately to the right of the rounding digit. This determines whether we round up or down.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* How to Round Numbers */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Round Numbers: Step-by-Step Guide
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <strong className="text-gray-900">Identify the rounding place:</strong>
                      <p className="text-gray-700 mt-1">Determine which place value you need to round to (ones, tenths, hundredths, etc.). Locate this digit in your number.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <strong className="text-gray-900">Look at the digit to the right:</strong>
                      <p className="text-gray-700 mt-1">Find the digit immediately after your rounding place. This is your "test digit" that determines the rounding direction.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <strong className="text-gray-900">Apply the rounding rule:</strong>
                      <p className="text-gray-700 mt-1">If the test digit is 5 or greater (5, 6, 7, 8, 9), round up by adding 1 to the rounding digit. If it's less than 5 (0, 1, 2, 3, 4), keep the rounding digit as is.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                    <div>
                      <strong className="text-gray-900">Drop the remaining digits:</strong>
                      <p className="text-gray-700 mt-1">Remove all digits to the right of the rounding place. If rounding a whole number, replace them with zeros; if rounding decimals, simply drop them.</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Example: Round 3266.528 to the hundredths place</h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Step 1:</strong> The hundredths place is the second digit after the decimal: <strong>2</strong> in 3266.5<strong>2</strong>8</p>
                  <p><strong>Step 2:</strong> The digit to the right is <strong>8</strong></p>
                  <p><strong>Step 3:</strong> Since 8 ≥ 5, we round up: 2 becomes 3</p>
                  <p><strong>Step 4:</strong> Drop the 8: <strong>3266.53</strong></p>
                  <p className="pt-3 border-t border-gray-200 text-lg font-semibold">Answer: <span className="text-orange-600">3,266.53</span></p>
                </div>
              </div>
            </section>

            {/* Place Values Explained */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Understanding Place Values
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Each digit in a number has a specific place value based on its position. Understanding place values is crucial
                for accurate rounding. Here's a breakdown of common place values:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border-2 border-blue-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-600 mb-4">Whole Number Places</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Ones:</strong> First digit to the left of decimal (or last digit if no decimal)</li>
                    <li><strong>Tens:</strong> Second digit from the right</li>
                    <li><strong>Hundreds:</strong> Third digit from the right</li>
                    <li><strong>Thousands:</strong> Fourth digit from the right</li>
                    <li><strong>Ten Thousands:</strong> Fifth digit from the right</li>
                  </ul>
                  <div className="mt-4 bg-blue-50 rounded-lg p-3 text-center font-mono text-lg">
                    <span className="text-sm text-gray-600">Example:</span><br />
                    <strong>3,266</strong> = 3 thousands, 2 hundreds, 6 tens, 6 ones
                  </div>
                </div>

                <div className="bg-white border-2 border-orange-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-600 mb-4">Decimal Places</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Tenths:</strong> First digit after the decimal point</li>
                    <li><strong>Hundredths:</strong> Second digit after the decimal point</li>
                    <li><strong>Thousandths:</strong> Third digit after the decimal point</li>
                    <li><strong>Ten Thousandths:</strong> Fourth digit after the decimal point</li>
                    <li><strong>Hundred Thousandths:</strong> Fifth digit after the decimal point</li>
                  </ul>
                  <div className="mt-4 bg-orange-50 rounded-lg p-3 text-center font-mono text-lg">
                    <span className="text-sm text-gray-600">Example:</span><br />
                    <strong>0.528</strong> = 5 tenths, 2 hundredths, 8 thousandths
                  </div>
                </div>
              </div>
            </section>

            {/* Rounding Rules in Detail */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                The Five-or-More Rule Explained
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                The fundamental rule of rounding is based on the digit to the right of your rounding place. This is often
                called the "5 or more" rule or "round half up" convention:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-700 mb-4">Round UP (Away from Zero)</h3>
                  <p className="text-gray-700 mb-4">When the test digit is <strong>5, 6, 7, 8, or 9</strong>:</p>
                  <ul className="space-y-2 text-gray-700 mb-4">
                    <li>• Increase the rounding digit by 1</li>
                    <li>• Drop all digits to the right</li>
                    <li>• Move away from zero</li>
                  </ul>
                  <div className="bg-white rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">Examples:</p>
                    <p className="text-gray-700">3.7<strong className="text-green-700">5</strong> → <strong>3.8</strong> (to tenths)</p>
                    <p className="text-gray-700">12.4<strong className="text-green-700">8</strong> → <strong>12.5</strong> (to tenths)</p>
                    <p className="text-gray-700">99.<strong className="text-green-700">6</strong> → <strong>100</strong> (to ones)</p>
                  </div>
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-700 mb-4">Round DOWN (Toward Zero)</h3>
                  <p className="text-gray-700 mb-4">When the test digit is <strong>0, 1, 2, 3, or 4</strong>:</p>
                  <ul className="space-y-2 text-gray-700 mb-4">
                    <li>• Keep the rounding digit the same</li>
                    <li>• Drop all digits to the right</li>
                    <li>• Move toward zero</li>
                  </ul>
                  <div className="bg-white rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">Examples:</p>
                    <p className="text-gray-700">3.7<strong className="text-blue-700">4</strong> → <strong>3.7</strong> (to tenths)</p>
                    <p className="text-gray-700">12.4<strong className="text-blue-700">2</strong> → <strong>12.4</strong> (to tenths)</p>
                    <p className="text-gray-700">99.<strong className="text-blue-700">4</strong> → <strong>99</strong> (to ones)</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Real-World Applications */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Real-World Applications of Rounding
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-green-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-600 mb-3">Money and Finance</h3>
                  <p className="text-gray-700">
                    Currency always rounds to the hundredths place (cents). When calculating totals, interest, taxes, or
                    splitting bills, amounts are rounded to two decimal places. For example, $45.678 becomes $45.68.
                  </p>
                </div>

                <div className="bg-white border-2 border-blue-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-600 mb-3">Measurements and Engineering</h3>
                  <p className="text-gray-700">
                    Construction, manufacturing, and engineering require rounding measurements to practical precision.
                    A board measuring 8.347 feet might be rounded to 8.35 feet or even 8.3 feet depending on tolerance requirements.
                  </p>
                </div>

                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">Scientific Calculations</h3>
                  <p className="text-gray-700">
                    Scientists round to significant figures to indicate measurement precision. Temperature readings, chemical
                    concentrations, and experimental data are rounded to appropriate decimal places based on instrument accuracy.
                  </p>
                </div>

                <div className="bg-white border-2 border-orange-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-600 mb-3">Statistics and Data Analysis</h3>
                  <p className="text-gray-700">
                    Percentages, averages, and statistical values are rounded for clarity in reports and presentations.
                    Survey results showing 47.3% agreement are easier to communicate than 47.28394%.
                  </p>
                </div>

                <div className="bg-white border-2 border-red-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-600 mb-3">Grades and Scoring</h3>
                  <p className="text-gray-700">
                    Educational institutions round scores and GPAs. A student with an average of 89.5% might receive an A
                    if the school rounds to the nearest whole number, while 89.4% would round to 89%.
                  </p>
                </div>

                <div className="bg-white border-2 border-yellow-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-yellow-600 mb-3">Sports Statistics</h3>
                  <p className="text-gray-700">
                    Batting averages, shooting percentages, and completion rates are rounded to standardized decimal places.
                    A batting average of 0.32478 is typically rounded to .325 (three decimal places).
                  </p>
                </div>
              </div>
            </section>

            {/* Common Mistakes */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Common Rounding Mistakes to Avoid
              </h2>
              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">Rounding Multiple Times</h3>
                  <p className="text-red-800 mb-2">
                    <strong>Wrong:</strong> Round 3.4567 to tenths by first rounding to hundredths (3.46), then to tenths (3.5) ❌
                  </p>
                  <p className="text-green-800">
                    <strong>Correct:</strong> Round directly to the target place: 3.4567 → 3.5 ✓
                  </p>
                  <p className="text-gray-700 mt-2 text-sm">
                    Multiple rounding introduces cumulative errors. Always round directly from the original number.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">Looking at the Wrong Digit</h3>
                  <p className="text-red-800 mb-2">
                    <strong>Wrong:</strong> To round 45.67 to ones, look at 6: 45.67 → 46 ❌
                  </p>
                  <p className="text-green-800">
                    <strong>Correct:</strong> Look at the digit immediately to the right of ones (6): 45.67 → 46 ✓
                  </p>
                  <p className="text-gray-700 mt-2 text-sm">
                    Always check only the digit directly to the right of your rounding place.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">Forgetting to Drop Digits</h3>
                  <p className="text-red-800 mb-2">
                    <strong>Wrong:</strong> Round 3.456 to tenths: 3.456 → 3.456 or 3.5456 ❌
                  </p>
                  <p className="text-green-800">
                    <strong>Correct:</strong> Round and drop all digits to the right: 3.456 → 3.5 ✓
                  </p>
                  <p className="text-gray-700 mt-2 text-sm">
                    After rounding, remove all digits beyond the rounding place.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">Confusing Rounding with Truncating</h3>
                  <p className="text-red-800 mb-2">
                    <strong>Wrong (Truncating):</strong> 3.89 to ones → 3 ❌
                  </p>
                  <p className="text-green-800">
                    <strong>Correct (Rounding):</strong> 3.89 to ones → 4 ✓
                  </p>
                  <p className="text-gray-700 mt-2 text-sm">
                    Truncating simply cuts off digits. Rounding considers the following digit and adjusts accordingly.
                  </p>
                </div>
              </div>
            </section>

            {/* Tips and Tricks */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Tips and Tricks for Rounding
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-600 mb-3">Use Your Fingers</h3>
                  <p className="text-gray-700">
                    Physically point to the rounding digit and the test digit. This visual aid helps ensure you're looking
                    at the correct positions, especially with long decimal numbers.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-600 mb-3">Underline Place Values</h3>
                  <p className="text-gray-700">
                    When working on paper, underline the rounding place and circle the test digit. This creates a visual
                    reference that prevents confusion during calculation.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-600 mb-3">Remember "5 and Up"</h3>
                  <p className="text-gray-700">
                    The simple phrase "5 and up, give it a shove; 4 and below, let it go" helps remember the rounding rule.
                    Five or greater means round up; four or less means stay the same.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">Check with Estimation</h3>
                  <p className="text-gray-700">
                    Before rounding, estimate what the answer should be. If you're rounding 3.89 to ones, you know it's
                    closer to 4 than 3, so your answer should be 4.
                  </p>
                </div>
              </div>
            </section>

            {/* Practice Problems */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Practice Problems
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Test your understanding with these practice problems. Use our calculator to check your answers!
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Round to Nearest Whole Number</h3>
                  <ol className="space-y-2 text-gray-700">
                    <li>1. 45.7 = ?</li>
                    <li>2. 123.4 = ?</li>
                    <li>3. 89.5 = ?</li>
                    <li>4. 999.9 = ?</li>
                  </ol>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Round to Nearest Tenth</h3>
                  <ol className="space-y-2 text-gray-700">
                    <li>1. 3.456 = ?</li>
                    <li>2. 12.85 = ?</li>
                    <li>3. 0.049 = ?</li>
                    <li>4. 7.951 = ?</li>
                  </ol>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Round to Nearest Hundredth</h3>
                  <ol className="space-y-2 text-gray-700">
                    <li>1. 2.3456 = ?</li>
                    <li>2. 15.6789 = ?</li>
                    <li>3. 0.9999 = ?</li>
                    <li>4. 10.005 = ?</li>
                  </ol>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Challenge Problems</h3>
                  <ol className="space-y-2 text-gray-700">
                    <li>1. Round 99.999 to tenths = ?</li>
                    <li>2. Round 0.0005 to thousandths = ?</li>
                    <li>3. Round 1234.56789 to tens = ?</li>
                    <li>4. Round 0.5555 to hundredths = ?</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <HelpCircle className="w-8 h-8 text-orange-600" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What does it mean to round to the nearest tenth?
                  </h3>
                  <p className="text-gray-700">
                    Rounding to the nearest tenth means rounding to one decimal place. You look at the digit in the tenths
                    place (first digit after the decimal) and the digit in the hundredths place (second digit after the decimal)
                    to determine whether to round up or down. For example, 3.47 rounds to 3.5, while 3.43 rounds to 3.4.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Why do we round 5 up instead of down?
                  </h3>
                  <p className="text-gray-700">
                    The standard rounding convention (round half up) treats 5 as the midpoint and rounds it upward. This is
                    the most commonly used method in education, finance, and general mathematics. While other rounding methods
                    exist (like round half to even), the "5 rounds up" rule is the accepted standard for most applications
                    and ensures consistency across calculations.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What's the difference between rounding and truncating?
                  </h3>
                  <p className="text-gray-700">
                    Rounding considers the digits being removed and adjusts the last remaining digit accordingly, while
                    truncating simply cuts off digits without any adjustment. For example, truncating 3.89 to one decimal
                    gives 3.8, but rounding 3.89 to one decimal gives 3.9. Rounding provides a more accurate approximation
                    of the original value.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can you round negative numbers?
                  </h3>
                  <p className="text-gray-700">
                    Yes, the same rounding rules apply to negative numbers. When rounding -3.7 to ones, you look at the 7
                    (which is ≥ 5), so you round away from zero to -4. Similarly, -3.4 rounds to -3. The key is that "rounding
                    up" for negative numbers means moving away from zero (becoming more negative), not toward positive numbers.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What happens when you round 99.9 to the nearest whole number?
                  </h3>
                  <p className="text-gray-700">
                    When you round 99.9 to the nearest whole number, you look at the tenths digit (9), which is ≥ 5, so you
                    round up. The 99 becomes 100. This demonstrates that rounding can change the number of digits in your
                    answer, which is perfectly normal. The answer is 100.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do you round money amounts?
                  </h3>
                  <p className="text-gray-700">
                    Money is typically rounded to the hundredths place (cents) since most currencies have two decimal places.
                    For example, $45.678 becomes $45.68, and $32.342 becomes $32.34. Some countries without cent denominations
                    round to the nearest nickel (0.05) or to the nearest whole currency unit.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What is the difference between rounding to decimal places and significant figures?
                  </h3>
                  <p className="text-gray-700">
                    Rounding to decimal places counts positions after the decimal point (e.g., 3.456 to two decimal places is
                    3.46). Rounding to significant figures counts all meaningful digits from the first non-zero digit (e.g.,
                    3.456 to two significant figures is 3.5, and 0.003456 to two significant figures is 0.0035). Our calculator
                    focuses on decimal place rounding, which is more common in everyday applications.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Should I round during calculations or only at the end?
                  </h3>
                  <p className="text-gray-700">
                    It's best to keep full precision throughout your calculations and only round the final answer. Rounding
                    intermediate steps can introduce rounding errors that compound, leading to less accurate final results.
                    Modern calculators and computers maintain high precision internally for this reason.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How accurate is this rounding calculator?
                  </h3>
                  <p className="text-gray-700">
                    Our calculator is 100% accurate for all rounding operations up to the precision limits of standard
                    floating-point arithmetic. It follows the standard "round half up" convention used in mathematics
                    education and most real-world applications. The visual explanations show exactly which digits are
                    considered and how the rounding rule is applied.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can this calculator help me learn rounding for homework?
                  </h3>
                  <p className="text-gray-700">
                    Absolutely! Our calculator is specifically designed as an educational tool. It not only provides the
                    answer but also shows detailed step-by-step explanations with color-coded digit highlighting. You can
                    see exactly which digit is the rounding place, which digit determines the rounding direction, and why
                    the answer is what it is. Use it to check your homework answers and understand the process.
                  </p>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Master Rounding with Confidence
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Understanding how to round numbers is a fundamental skill that you'll use throughout your education and in
                countless real-world situations. Whether you're working with money, measurements, statistics, or scientific
                data, the ability to round accurately and confidently is essential.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our Rounding Numbers Calculator provides more than just answers—it's a comprehensive learning tool that shows
                you the complete process with visual explanations and color-coded digit highlighting. By seeing exactly which
                digits matter and why the rounding rule applies, you develop a deeper understanding that helps you solve
                rounding problems independently.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Practice regularly with different numbers and place values, use the visual explanations to verify your
                understanding, and soon rounding will become second nature. Remember: identify the place, check the digit to
                the right, apply the 5-or-more rule, and drop the remaining digits. With these four simple steps and our
                calculator as your guide, you'll master rounding with confidence!
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
              Need Help with Number Rounding?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you understand rounding rules, place values, and excel in mathematics. Get personalized one-on-one guidance tailored to your learning style.
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
