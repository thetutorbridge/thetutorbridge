'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight, BookOpen, Lightbulb, HelpCircle } from 'lucide-react';
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
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

interface Fraction {
  numerator: number;
  denominator: number;
}

interface CalculationResult {
  result: Fraction;
  steps: string[];
  formula: string;
  mixedNumber?: string;
  lcd?: number;
  simplified?: Fraction;
}

export default function FractionsCalculator() {
  const [fraction1Num, setFraction1Num] = useState<string>('');
  const [fraction1Den, setFraction1Den] = useState<string>('');
  const [fraction2Num, setFraction2Num] = useState<string>('');
  const [fraction2Den, setFraction2Den] = useState<string>('');
  const [operation, setOperation] = useState<string>('+');
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Calculate GCD (Greatest Common Divisor)
  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a || 1;
  };

  // Calculate LCM (Least Common Multiple)
  const lcm = (a: number, b: number): number => {
    return Math.abs(a * b) / gcd(a, b);
  };

  // Simplify a fraction
  const simplifyFraction = (num: number, den: number): Fraction => {
    if (den === 0) return { numerator: num, denominator: den };
    const divisor = gcd(num, den);
    let simplifiedNum = num / divisor;
    let simplifiedDen = den / divisor;

    // Keep denominator positive
    if (simplifiedDen < 0) {
      simplifiedNum = -simplifiedNum;
      simplifiedDen = -simplifiedDen;
    }

    return { numerator: simplifiedNum, denominator: simplifiedDen };
  };

  // Convert improper fraction to mixed number
  const toMixedNumber = (num: number, den: number): string => {
    if (den === 0) return 'Undefined';
    const isNegative = (num < 0) !== (den < 0);
    const absNum = Math.abs(num);
    const absDen = Math.abs(den);

    const whole = Math.floor(absNum / absDen);
    const remainder = absNum % absDen;

    if (remainder === 0) {
      return (isNegative ? -whole : whole).toString();
    } else if (whole === 0) {
      const simplified = simplifyFraction(num, den);
      return `${simplified.numerator}/${simplified.denominator}`;
    } else {
      const simplified = simplifyFraction(remainder, absDen);
      const sign = isNegative ? '-' : '';
      return `${sign}${whole} ${simplified.numerator}/${simplified.denominator}`;
    }
  };

  // Add fractions
  const addFractions = (f1: Fraction, f2: Fraction): CalculationResult => {
    const lcd = lcm(f1.denominator, f2.denominator);
    const steps: string[] = [];

    steps.push(`Step 1: Find the LCD of ${f1.denominator} and ${f2.denominator}`);
    steps.push(`LCD = ${lcd}`);

    const mult1 = lcd / f1.denominator;
    const mult2 = lcd / f2.denominator;

    steps.push(`Step 2: Rewrite fractions with LCD as denominator`);
    steps.push(`${f1.numerator}/${f1.denominator} = (${f1.numerator} × ${mult1})/(${f1.denominator} × ${mult1}) = ${f1.numerator * mult1}/${lcd}`);
    steps.push(`${f2.numerator}/${f2.denominator} = (${f2.numerator} × ${mult2})/(${f2.denominator} × ${mult2}) = ${f2.numerator * mult2}/${lcd}`);

    const newNum1 = f1.numerator * mult1;
    const newNum2 = f2.numerator * mult2;
    const resultNum = newNum1 + newNum2;

    steps.push(`Step 3: Add the numerators`);
    steps.push(`${newNum1}/${lcd} + ${newNum2}/${lcd} = (${newNum1} + ${newNum2})/${lcd} = ${resultNum}/${lcd}`);

    const simplified = simplifyFraction(resultNum, lcd);
    if (simplified.numerator !== resultNum || simplified.denominator !== lcd) {
      steps.push(`Step 4: Simplify the fraction`);
      const divisor = gcd(resultNum, lcd);
      steps.push(`GCD(${Math.abs(resultNum)}, ${lcd}) = ${divisor}`);
      steps.push(`${resultNum}/${lcd} = ${simplified.numerator}/${simplified.denominator}`);
    }

    const formula = `(a/b) + (c/d) = (ad + bc)/(bd)`;
    const mixedNumber = toMixedNumber(simplified.numerator, simplified.denominator);

    return {
      result: simplified,
      steps,
      formula,
      mixedNumber,
      lcd,
      simplified
    };
  };

  // Subtract fractions
  const subtractFractions = (f1: Fraction, f2: Fraction): CalculationResult => {
    const lcd = lcm(f1.denominator, f2.denominator);
    const steps: string[] = [];

    steps.push(`Step 1: Find the LCD of ${f1.denominator} and ${f2.denominator}`);
    steps.push(`LCD = ${lcd}`);

    const mult1 = lcd / f1.denominator;
    const mult2 = lcd / f2.denominator;

    steps.push(`Step 2: Rewrite fractions with LCD as denominator`);
    steps.push(`${f1.numerator}/${f1.denominator} = (${f1.numerator} × ${mult1})/(${f1.denominator} × ${mult1}) = ${f1.numerator * mult1}/${lcd}`);
    steps.push(`${f2.numerator}/${f2.denominator} = (${f2.numerator} × ${mult2})/(${f2.denominator} × ${mult2}) = ${f2.numerator * mult2}/${lcd}`);

    const newNum1 = f1.numerator * mult1;
    const newNum2 = f2.numerator * mult2;
    const resultNum = newNum1 - newNum2;

    steps.push(`Step 3: Subtract the numerators`);
    steps.push(`${newNum1}/${lcd} − ${newNum2}/${lcd} = (${newNum1} − ${newNum2})/${lcd} = ${resultNum}/${lcd}`);

    const simplified = simplifyFraction(resultNum, lcd);
    if (simplified.numerator !== resultNum || simplified.denominator !== lcd) {
      steps.push(`Step 4: Simplify the fraction`);
      const divisor = gcd(resultNum, lcd);
      steps.push(`GCD(${Math.abs(resultNum)}, ${lcd}) = ${divisor}`);
      steps.push(`${resultNum}/${lcd} = ${simplified.numerator}/${simplified.denominator}`);
    }

    const formula = `(a/b) − (c/d) = (ad − bc)/(bd)`;
    const mixedNumber = toMixedNumber(simplified.numerator, simplified.denominator);

    return {
      result: simplified,
      steps,
      formula,
      mixedNumber,
      lcd,
      simplified
    };
  };

  // Multiply fractions
  const multiplyFractions = (f1: Fraction, f2: Fraction): CalculationResult => {
    const steps: string[] = [];

    steps.push(`Step 1: Multiply the numerators`);
    steps.push(`${f1.numerator} × ${f2.numerator} = ${f1.numerator * f2.numerator}`);

    steps.push(`Step 2: Multiply the denominators`);
    steps.push(`${f1.denominator} × ${f2.denominator} = ${f1.denominator * f2.denominator}`);

    const resultNum = f1.numerator * f2.numerator;
    const resultDen = f1.denominator * f2.denominator;

    steps.push(`Step 3: Write the result`);
    steps.push(`${f1.numerator}/${f1.denominator} × ${f2.numerator}/${f2.denominator} = ${resultNum}/${resultDen}`);

    const simplified = simplifyFraction(resultNum, resultDen);
    if (simplified.numerator !== resultNum || simplified.denominator !== resultDen) {
      steps.push(`Step 4: Simplify the fraction`);
      const divisor = gcd(resultNum, resultDen);
      steps.push(`GCD(${Math.abs(resultNum)}, ${Math.abs(resultDen)}) = ${divisor}`);
      steps.push(`${resultNum}/${resultDen} = ${simplified.numerator}/${simplified.denominator}`);
    }

    const formula = `(a/b) × (c/d) = (a × c)/(b × d)`;
    const mixedNumber = toMixedNumber(simplified.numerator, simplified.denominator);

    return {
      result: simplified,
      steps,
      formula,
      mixedNumber,
      simplified
    };
  };

  // Divide fractions
  const divideFractions = (f1: Fraction, f2: Fraction): CalculationResult => {
    const steps: string[] = [];

    if (f2.numerator === 0) {
      return {
        result: { numerator: 0, denominator: 0 },
        steps: ['Error: Division by zero'],
        formula: '',
        mixedNumber: 'Undefined'
      };
    }

    steps.push(`Step 1: Multiply by the reciprocal`);
    steps.push(`${f1.numerator}/${f1.denominator} ÷ ${f2.numerator}/${f2.denominator} = ${f1.numerator}/${f1.denominator} × ${f2.denominator}/${f2.numerator}`);

    const resultNum = f1.numerator * f2.denominator;
    const resultDen = f1.denominator * f2.numerator;

    steps.push(`Step 2: Multiply the fractions`);
    steps.push(`${f1.numerator} × ${f2.denominator} = ${resultNum}`);
    steps.push(`${f1.denominator} × ${f2.numerator} = ${resultDen}`);
    steps.push(`Result: ${resultNum}/${resultDen}`);

    const simplified = simplifyFraction(resultNum, resultDen);
    if (simplified.numerator !== resultNum || simplified.denominator !== resultDen) {
      steps.push(`Step 3: Simplify the fraction`);
      const divisor = gcd(resultNum, resultDen);
      steps.push(`GCD(${Math.abs(resultNum)}, ${Math.abs(resultDen)}) = ${divisor}`);
      steps.push(`${resultNum}/${resultDen} = ${simplified.numerator}/${simplified.denominator}`);
    }

    const formula = `(a/b) ÷ (c/d) = (a/b) × (d/c) = (a × d)/(b × c)`;
    const mixedNumber = toMixedNumber(simplified.numerator, simplified.denominator);

    return {
      result: simplified,
      steps,
      formula,
      mixedNumber,
      simplified
    };
  };

  const handleCalculate = () => {
    const f1n = parseInt(fraction1Num);
    const f1d = parseInt(fraction1Den);
    const f2n = parseInt(fraction2Num);
    const f2d = parseInt(fraction2Den);

    if (isNaN(f1n) || isNaN(f1d) || isNaN(f2n) || isNaN(f2d)) {
      alert('Please enter valid numbers for all fields');
      return;
    }

    if (f1d === 0 || f2d === 0) {
      alert('Denominator cannot be zero');
      return;
    }

    const fraction1: Fraction = { numerator: f1n, denominator: f1d };
    const fraction2: Fraction = { numerator: f2n, denominator: f2d };

    let calcResult: CalculationResult;

    switch (operation) {
      case '+':
        calcResult = addFractions(fraction1, fraction2);
        break;
      case '−':
        calcResult = subtractFractions(fraction1, fraction2);
        break;
      case '×':
        calcResult = multiplyFractions(fraction1, fraction2);
        break;
      case '÷':
        calcResult = divideFractions(fraction1, fraction2);
        break;
      default:
        return;
    }

    setResult(calcResult);
  };

  const handleClear = () => {
    setFraction1Num('');
    setFraction1Den('');
    setFraction2Num('');
    setFraction2Den('');
    setOperation('+');
    setResult(null);
  };

  const renderFraction = (num: number, den: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'text-lg',
      md: 'text-2xl',
      lg: 'text-4xl'
    };

    const paddingClasses = {
      sm: 'px-2',
      md: 'px-3',
      lg: 'px-4'
    };

    return (
      <span className="inline-flex flex-col items-center justify-center mx-1">
        <span className={`${sizeClasses[size]} font-semibold ${paddingClasses[size]}`}>{num}</span>
        <span className="w-full border-t-2 border-gray-900"></span>
        <span className={`${sizeClasses[size]} font-semibold ${paddingClasses[size]}`}>{den}</span>
      </span>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" className="hover:text-indigo-600 transition-colors">Home</a>
            <span>/</span>
            <a href="/calculators" className="hover:text-indigo-600 transition-colors">Calculators</a>
            <span>/</span>
            <span className="text-gray-900 font-medium">Fractions Calculator</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <Calculator className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Fractions Calculator
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
              Add, subtract, multiply, and divide fractions with step-by-step solutions. Calculate LCD, simplify fractions, and convert to mixed numbers instantly.
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
                  <Calculator className="w-6 h-6 text-indigo-600" />
                  Enter Fractions
                </h2>

                {/* Fraction 1 */}
                <div className="mb-6">
                  <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                    First Fraction
                  </Label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="Numerator"
                        value={fraction1Num}
                        onChange={(e) => setFraction1Num(e.target.value)}
                        className="text-center text-lg font-medium"
                      />
                    </div>
                    <span className="text-2xl font-bold text-gray-400">/</span>
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="Denominator"
                        value={fraction1Den}
                        onChange={(e) => setFraction1Den(e.target.value)}
                        className="text-center text-lg font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Operation Selector */}
                <div className="mb-6">
                  <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                    Operation
                  </Label>
                  <Select value={operation} onValueChange={setOperation}>
                    <SelectTrigger className="text-lg font-medium">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+" className="text-lg">+ Addition</SelectItem>
                      <SelectItem value="−" className="text-lg">− Subtraction</SelectItem>
                      <SelectItem value="×" className="text-lg">× Multiplication</SelectItem>
                      <SelectItem value="÷" className="text-lg">÷ Division</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Fraction 2 */}
                <div className="mb-6">
                  <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                    Second Fraction
                  </Label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="Numerator"
                        value={fraction2Num}
                        onChange={(e) => setFraction2Num(e.target.value)}
                        className="text-center text-lg font-medium"
                      />
                    </div>
                    <span className="text-2xl font-bold text-gray-400">/</span>
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="Denominator"
                        value={fraction2Den}
                        onChange={(e) => setFraction2Den(e.target.value)}
                        className="text-center text-lg font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
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

            {/* Results Section */}
            <div className="lg:col-span-3">
              {result ? (
                <div className="space-y-6">
                  {/* Answer */}
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <ArrowRight className="w-5 h-5" />
                      Answer
                    </h3>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-4">
                      <p className="text-sm text-indigo-100 mb-2">Fraction Form:</p>
                      <div className="text-center">
                        {renderFraction(result.result.numerator, result.result.denominator, 'lg')}
                      </div>
                    </div>
                    {result.mixedNumber && (
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                        <p className="text-sm text-indigo-100 mb-2">Mixed Number:</p>
                        <p className="text-4xl font-bold text-center">{result.mixedNumber}</p>
                      </div>
                    )}
                  </div>

                  {/* Solution with Steps */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-indigo-600" />
                      Solution with Steps
                    </h3>
                    <div className="space-y-3">
                      {result.steps.map((step, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                          <p className="text-gray-700 leading-relaxed flex-1">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Solution by Formula */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-indigo-600" />
                      Solution by Formula
                    </h3>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="text-lg font-mono text-gray-800 text-center mb-4">
                        {result.formula}
                      </p>
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Where <strong>a</strong> = {fraction1Num}, <strong>b</strong> = {fraction1Den},
                          <strong> c</strong> = {fraction2Num}, <strong>d</strong> = {fraction2Den}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    Enter two fractions and click Calculate to see the result with detailed steps
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
                Understanding Fractions Calculator
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                A fractions calculator is an essential mathematical tool that performs arithmetic operations on fractions,
                providing accurate results with step-by-step solutions. Whether you need to add, subtract, multiply, or
                divide fractions, our calculator simplifies the process by automatically finding the least common denominator
                (LCD), performing the operation, and simplifying the result to its lowest terms.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Fractions represent parts of a whole and are fundamental in mathematics, cooking, construction, science,
                and everyday life. Understanding how to work with fractions is crucial for students, professionals, and
                anyone dealing with measurements, ratios, or proportions. Our calculator not only provides answers but
                also teaches the methodology through detailed step-by-step solutions.
              </p>
            </section>

            {/* What is a Fraction */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                What is a Fraction?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                A fraction represents a part of a whole or a ratio between two numbers. It consists of two components:
              </p>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    <div>
                      <strong className="text-gray-900">Numerator:</strong>
                      <span className="text-gray-700"> The top number that represents how many parts we have</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    <div>
                      <strong className="text-gray-900">Denominator:</strong>
                      <span className="text-gray-700"> The bottom number that represents the total number of equal parts</span>
                    </div>
                  </li>
                </ul>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                For example, in the fraction 3/4, the numerator is 3 (we have three parts) and the denominator is 4
                (the whole is divided into four equal parts). This means we have three out of four parts, or three-quarters.
              </p>
            </section>

            {/* Types of Fractions */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Types of Fractions
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-indigo-100 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-indigo-600 mb-3">Proper Fractions</h3>
                  <p className="text-gray-700 mb-3">
                    The numerator is less than the denominator (e.g., 3/4, 2/5, 7/10). The value is always less than 1.
                  </p>
                  <div className="bg-indigo-50 rounded-lg p-3 text-center">
                    <span className="text-lg font-semibold">Example: </span>
                    {renderFraction(3, 4, 'sm')}
                    <span className="text-lg">, </span>
                    {renderFraction(5, 8, 'sm')}
                  </div>
                </div>

                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-purple-600 mb-3">Improper Fractions</h3>
                  <p className="text-gray-700 mb-3">
                    The numerator is greater than or equal to the denominator (e.g., 7/4, 9/5). The value is 1 or greater.
                  </p>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <span className="text-lg font-semibold">Example: </span>
                    {renderFraction(7, 4, 'sm')}
                    <span className="text-lg">, </span>
                    {renderFraction(11, 3, 'sm')}
                  </div>
                </div>

                <div className="bg-white border-2 border-blue-100 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-blue-600 mb-3">Mixed Numbers</h3>
                  <p className="text-gray-700 mb-3">
                    A whole number combined with a proper fraction (e.g., 2 1/3, 5 3/4). Represents improper fractions in a more readable form.
                  </p>
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <span className="text-lg font-semibold">Example: 2 1/4, 3 2/5</span>
                  </div>
                </div>

                <div className="bg-white border-2 border-green-100 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-600 mb-3">Equivalent Fractions</h3>
                  <p className="text-gray-700 mb-3">
                    Different fractions that represent the same value (e.g., 1/2 = 2/4 = 4/8). Created by multiplying or dividing both parts by the same number.
                  </p>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <span className="text-lg font-semibold">
                      {renderFraction(1, 2, 'sm')} = {renderFraction(2, 4, 'sm')} = {renderFraction(4, 8, 'sm')}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* How to Add Fractions */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Add Fractions
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Adding fractions requires finding a common denominator. Here's the step-by-step process:
              </p>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <strong className="text-gray-900">Find the LCD (Least Common Denominator):</strong>
                      <p className="text-gray-700 mt-1">Determine the smallest number that both denominators divide into evenly.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <strong className="text-gray-900">Rewrite each fraction:</strong>
                      <p className="text-gray-700 mt-1">Convert both fractions to equivalent fractions with the LCD as the denominator.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <strong className="text-gray-900">Add the numerators:</strong>
                      <p className="text-gray-700 mt-1">Keep the common denominator and add only the numerators.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                    <div>
                      <strong className="text-gray-900">Simplify the result:</strong>
                      <p className="text-gray-700 mt-1">Reduce the fraction to its lowest terms by dividing by the GCD.</p>
                    </div>
                  </li>
                </ol>
              </div>
              <div className="bg-white border-2 border-indigo-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Example: Adding 1/4 + 2/3</h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Step 1:</strong> LCD of 4 and 3 = 12</p>
                  <p><strong>Step 2:</strong> Convert: 1/4 = 3/12, 2/3 = 8/12</p>
                  <p><strong>Step 3:</strong> Add: 3/12 + 8/12 = 11/12</p>
                  <p><strong>Step 4:</strong> Result is already in simplest form: 11/12</p>
                </div>
              </div>
            </section>

            {/* How to Subtract Fractions */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Subtract Fractions
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Subtracting fractions follows the same process as addition, except you subtract the numerators instead of adding them:
              </p>
              <div className="bg-white border-2 border-purple-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Example: Subtracting 5/6 − 1/4</h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Step 1:</strong> LCD of 6 and 4 = 12</p>
                  <p><strong>Step 2:</strong> Convert: 5/6 = 10/12, 1/4 = 3/12</p>
                  <p><strong>Step 3:</strong> Subtract: 10/12 − 3/12 = 7/12</p>
                  <p><strong>Step 4:</strong> Result is already in simplest form: 7/12</p>
                </div>
              </div>
            </section>

            {/* How to Multiply Fractions */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Multiply Fractions
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Multiplying fractions is simpler than adding or subtracting because you don't need to find a common denominator:
              </p>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <strong className="text-gray-900">Multiply the numerators:</strong>
                      <p className="text-gray-700 mt-1">Multiply the top numbers together.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <strong className="text-gray-900">Multiply the denominators:</strong>
                      <p className="text-gray-700 mt-1">Multiply the bottom numbers together.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <strong className="text-gray-900">Simplify the result:</strong>
                      <p className="text-gray-700 mt-1">Reduce to lowest terms.</p>
                    </div>
                  </li>
                </ol>
              </div>
              <div className="bg-white border-2 border-purple-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Example: Multiplying 2/3 × 3/4</h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Step 1:</strong> Multiply numerators: 2 × 3 = 6</p>
                  <p><strong>Step 2:</strong> Multiply denominators: 3 × 4 = 12</p>
                  <p><strong>Step 3:</strong> Result: 6/12</p>
                  <p><strong>Step 4:</strong> Simplify: 6/12 = 1/2 (divide both by 6)</p>
                </div>
              </div>
            </section>

            {/* How to Divide Fractions */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Divide Fractions
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Dividing fractions uses the "multiply by the reciprocal" method:
              </p>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 mb-6">
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <strong className="text-gray-900">Keep the first fraction as is</strong>
                      <p className="text-gray-700 mt-1">Don't change the first fraction (the dividend).</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <strong className="text-gray-900">Find the reciprocal of the second fraction:</strong>
                      <p className="text-gray-700 mt-1">Flip the second fraction (the divisor) by swapping numerator and denominator.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <strong className="text-gray-900">Multiply the fractions:</strong>
                      <p className="text-gray-700 mt-1">Follow the multiplication steps.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                    <div>
                      <strong className="text-gray-900">Simplify the result:</strong>
                      <p className="text-gray-700 mt-1">Reduce to lowest terms.</p>
                    </div>
                  </li>
                </ol>
              </div>
              <div className="bg-white border-2 border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Example: Dividing 3/4 ÷ 2/5</h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Step 1:</strong> Keep first fraction: 3/4</p>
                  <p><strong>Step 2:</strong> Reciprocal of 2/5 is 5/2</p>
                  <p><strong>Step 3:</strong> Multiply: 3/4 × 5/2 = 15/8</p>
                  <p><strong>Step 4:</strong> Convert to mixed number: 1 7/8</p>
                </div>
              </div>
            </section>

            {/* LCD and GCD */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Understanding LCD and GCD
              </h2>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-indigo-600 mb-4">
                  LCD (Least Common Denominator)
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  The LCD is the smallest positive number that is a multiple of all denominators. It's essential for
                  adding and subtracting fractions with different denominators.
                </p>
                <div className="bg-indigo-50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-3">Methods to find LCD:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>• Listing multiples:</strong> List multiples of each denominator until you find the smallest common one</li>
                    <li><strong>• Prime factorization:</strong> Break denominators into prime factors and multiply the highest powers</li>
                    <li><strong>• Using LCM formula:</strong> LCD = (a × b) / GCD(a, b)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-4">
                  GCD (Greatest Common Divisor)
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  The GCD (also called GCF - Greatest Common Factor) is the largest positive number that divides both
                  the numerator and denominator evenly. It's used to simplify fractions to their lowest terms.
                </p>
                <div className="bg-purple-50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-3">Methods to find GCD:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>• Listing factors:</strong> List all factors of both numbers and find the largest common one</li>
                    <li><strong>• Euclidean algorithm:</strong> Repeatedly divide and take remainders until remainder is 0</li>
                    <li><strong>• Prime factorization:</strong> Find common prime factors and multiply the lowest powers</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Simplifying Fractions */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Simplifying Fractions
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Simplifying (or reducing) a fraction means writing it in its lowest terms by dividing both the numerator
                and denominator by their greatest common divisor (GCD). A fraction is in simplest form when the GCD of
                the numerator and denominator is 1.
              </p>
              <div className="bg-white border-2 border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Example: Simplifying 24/36</h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Step 1:</strong> Find GCD of 24 and 36</p>
                  <p className="ml-6">Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24</p>
                  <p className="ml-6">Factors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36</p>
                  <p className="ml-6">GCD = 12</p>
                  <p><strong>Step 2:</strong> Divide both numerator and denominator by GCD</p>
                  <p className="ml-6">24 ÷ 12 = 2</p>
                  <p className="ml-6">36 ÷ 12 = 3</p>
                  <p><strong>Result:</strong> 24/36 = 2/3</p>
                </div>
              </div>
            </section>

            {/* Converting Between Forms */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Converting Between Improper Fractions and Mixed Numbers
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-indigo-600 mb-4">
                    Improper Fraction → Mixed Number
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Step 1:</strong> Divide numerator by denominator</p>
                    <p><strong>Step 2:</strong> Quotient becomes the whole number</p>
                    <p><strong>Step 3:</strong> Remainder becomes new numerator</p>
                    <p><strong>Step 4:</strong> Keep same denominator</p>
                  </div>
                  <div className="mt-4 bg-white rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">Example: 11/4</p>
                    <p className="text-gray-700">11 ÷ 4 = 2 remainder 3</p>
                    <p className="text-gray-700">Result: 2 3/4</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-purple-600 mb-4">
                    Mixed Number → Improper Fraction
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Step 1:</strong> Multiply whole number by denominator</p>
                    <p><strong>Step 2:</strong> Add the numerator to result</p>
                    <p><strong>Step 3:</strong> New number is numerator</p>
                    <p><strong>Step 4:</strong> Keep same denominator</p>
                  </div>
                  <div className="mt-4 bg-white rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">Example: 3 2/5</p>
                    <p className="text-gray-700">(3 × 5) + 2 = 17</p>
                    <p className="text-gray-700">Result: 17/5</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Real-World Applications */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Real-World Applications of Fractions
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-indigo-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-indigo-600 mb-3">Cooking and Baking</h3>
                  <p className="text-gray-700">
                    Recipes often use fractions for measurements. If you need to double a recipe calling for 2/3 cup
                    of flour, you multiply: 2/3 × 2 = 4/3 = 1 1/3 cups.
                  </p>
                </div>

                <div className="bg-white border-2 border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">Construction and Carpentry</h3>
                  <p className="text-gray-700">
                    Measuring materials requires fraction arithmetic. If you need three boards each 5 3/4 inches long,
                    you calculate: 3 × 5 3/4 = 17 1/4 inches total.
                  </p>
                </div>

                <div className="bg-white border-2 border-blue-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-600 mb-3">Time Management</h3>
                  <p className="text-gray-700">
                    Hours are divided into fractions. If a task takes 1/4 hour and another takes 1/3 hour, total time
                    is: 1/4 + 1/3 = 3/12 + 4/12 = 7/12 hour (35 minutes).
                  </p>
                </div>

                <div className="bg-white border-2 border-green-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-600 mb-3">Financial Planning</h3>
                  <p className="text-gray-700">
                    Budgeting uses fractions. If you save 1/5 of your income for retirement and 1/10 for emergencies,
                    you're saving: 1/5 + 1/10 = 2/10 + 1/10 = 3/10 of your income.
                  </p>
                </div>

                <div className="bg-white border-2 border-yellow-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-yellow-600 mb-3">Medicine and Healthcare</h3>
                  <p className="text-gray-700">
                    Medication dosages often involve fractions. A prescription might call for 1/2 tablet twice daily,
                    meaning 1/2 × 2 = 1 tablet per day total.
                  </p>
                </div>

                <div className="bg-white border-2 border-red-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-600 mb-3">Sports and Statistics</h3>
                  <p className="text-gray-700">
                    Batting averages, shooting percentages, and win rates are fractions. A baseball player with 45 hits
                    in 120 at-bats has an average of 45/120 = 3/8 = 0.375.
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
                  <h3 className="text-lg font-bold text-red-900 mb-2">Adding/Subtracting Without Common Denominator</h3>
                  <p className="text-red-800 mb-2">
                    <strong>Wrong:</strong> 1/2 + 1/3 = 2/5 ❌
                  </p>
                  <p className="text-green-800">
                    <strong>Correct:</strong> 1/2 + 1/3 = 3/6 + 2/6 = 5/6 ✓
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">Forgetting to Simplify</h3>
                  <p className="text-red-800 mb-2">
                    <strong>Incomplete:</strong> 2/3 × 3/4 = 6/12 (stopping here)
                  </p>
                  <p className="text-green-800">
                    <strong>Complete:</strong> 2/3 × 3/4 = 6/12 = 1/2 ✓
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">Dividing by Dividing Instead of Reciprocal</h3>
                  <p className="text-red-800 mb-2">
                    <strong>Wrong:</strong> (1/2) ÷ (1/3) = (1÷1)/(2÷3) ❌
                  </p>
                  <p className="text-green-800">
                    <strong>Correct:</strong> (1/2) ÷ (1/3) = (1/2) × (3/1) = 3/2 ✓
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">Confusing Numerator and Denominator</h3>
                  <p className="text-gray-700">
                    Always remember: numerator is on top, denominator is on bottom. The denominator tells you how many
                    parts the whole is divided into.
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
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Addition</h3>
                  <ol className="space-y-2 text-gray-700">
                    <li>1. 1/6 + 1/4 = ?</li>
                    <li>2. 3/8 + 5/12 = ?</li>
                    <li>3. 2/5 + 3/10 = ?</li>
                  </ol>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Subtraction</h3>
                  <ol className="space-y-2 text-gray-700">
                    <li>1. 5/6 − 1/3 = ?</li>
                    <li>2. 7/8 − 3/4 = ?</li>
                    <li>3. 4/5 − 2/15 = ?</li>
                  </ol>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Multiplication</h3>
                  <ol className="space-y-2 text-gray-700">
                    <li>1. 2/3 × 3/5 = ?</li>
                    <li>2. 5/8 × 4/15 = ?</li>
                    <li>3. 3/4 × 2/9 = ?</li>
                  </ol>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Division</h3>
                  <ol className="space-y-2 text-gray-700">
                    <li>1. 1/2 ÷ 1/4 = ?</li>
                    <li>2. 3/5 ÷ 2/3 = ?</li>
                    <li>3. 7/8 ÷ 3/4 = ?</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <HelpCircle className="w-8 h-8 text-indigo-600" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What is the difference between LCD and LCM?
                  </h3>
                  <p className="text-gray-700">
                    LCD (Least Common Denominator) and LCM (Least Common Multiple) are the same concept applied to
                    different contexts. LCD specifically refers to the LCM of the denominators when working with fractions.
                    The calculation method is identical.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do I add fractions with different denominators?
                  </h3>
                  <p className="text-gray-700">
                    Find the LCD of both denominators, convert each fraction to an equivalent fraction with the LCD as
                    the denominator, then add the numerators while keeping the denominator the same. Finally, simplify
                    the result if possible.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Why do we flip the second fraction when dividing?
                  </h3>
                  <p className="text-gray-700">
                    Dividing by a fraction is the same as multiplying by its reciprocal. This is because division is
                    the inverse operation of multiplication. For example, dividing by 2/3 is the same as multiplying
                    by 3/2 (the reciprocal).
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    When should I use improper fractions vs. mixed numbers?
                  </h3>
                  <p className="text-gray-700">
                    Use improper fractions when performing calculations (they're easier to work with mathematically).
                    Convert to mixed numbers for final answers or when the result needs to be more intuitive to understand.
                    For example, 1 1/2 cups is clearer than 3/2 cups in a recipe.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can the denominator be zero?
                  </h3>
                  <p className="text-gray-700">
                    No, a denominator cannot be zero. Division by zero is undefined in mathematics. A fraction with a
                    zero denominator has no mathematical meaning. However, a numerator can be zero (e.g., 0/5 = 0).
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do I work with negative fractions?
                  </h3>
                  <p className="text-gray-700">
                    The negative sign can be placed in the numerator, denominator, or in front of the entire fraction
                    (they're all equivalent: -3/4 = 3/-4 = -(3/4)). By convention, we usually keep the denominator
                    positive and place the negative sign in the numerator or in front. When adding or subtracting,
                    treat the negative sign like you would with regular numbers.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What's the fastest way to simplify a fraction?
                  </h3>
                  <p className="text-gray-700">
                    Find the GCD (Greatest Common Divisor) of the numerator and denominator, then divide both by that
                    number. The Euclidean algorithm is the fastest method for finding the GCD, especially with large numbers.
                    Our calculator does this automatically for you.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do I convert a fraction to a decimal?
                  </h3>
                  <p className="text-gray-700">
                    Divide the numerator by the denominator. For example, 3/4 = 3 ÷ 4 = 0.75. Some fractions result in
                    repeating decimals (e.g., 1/3 = 0.333...), while others terminate (e.g., 1/2 = 0.5).
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What are equivalent fractions and why are they important?
                  </h3>
                  <p className="text-gray-700">
                    Equivalent fractions are different fractions that represent the same value (e.g., 1/2 = 2/4 = 4/8).
                    They're created by multiplying or dividing both numerator and denominator by the same number. They're
                    crucial for adding and subtracting fractions with different denominators.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How accurate is this fractions calculator?
                  </h3>
                  <p className="text-gray-700">
                    Our calculator is 100% accurate for all fraction operations. It uses precise mathematical algorithms
                    to calculate GCD, LCD, perform operations, and simplify results. The step-by-step solutions show
                    exactly how each calculation is performed, allowing you to verify the results and learn the process.
                  </p>
                </div>
              </div>
            </section>

            {/* Tips and Tricks */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Tips and Tricks for Working with Fractions
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-indigo-600 mb-3">Cross-Multiplication for Comparison</h3>
                  <p className="text-gray-700">
                    To compare 3/4 and 5/7, cross-multiply: 3×7=21 and 4×5=20. Since 21 &gt; 20, we know 3/4 &gt; 5/7.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">Benchmark Fractions</h3>
                  <p className="text-gray-700">
                    Memorize common fractions: 1/2=0.5, 1/4=0.25, 1/3≈0.33, 3/4=0.75. This helps with quick mental math.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-600 mb-3">Simplify Before Multiplying</h3>
                  <p className="text-gray-700">
                    For 4/5 × 15/8, simplify first: cancel 4 and 8 (÷4), cancel 5 and 15 (÷5) = 1/1 × 3/2 = 3/2.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-600 mb-3">Converting Whole Numbers</h3>
                  <p className="text-gray-700">
                    Any whole number can be written as a fraction with 1 as denominator: 5 = 5/1. This helps when
                    mixing whole numbers with fractions.
                  </p>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Master Fractions with Confidence
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Understanding fractions is a fundamental skill that extends far beyond the classroom. Whether you're
                scaling a recipe, measuring materials for a project, managing your finances, or helping your children
                with homework, fraction skills are invaluable. Our Fractions Calculator not only provides instant,
                accurate results but also teaches you the methodology through detailed step-by-step solutions.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                By showing both the LCD method for addition/subtraction and the formula-based approach, our calculator
                helps you understand multiple solution strategies. The automatic simplification and mixed number
                conversion features ensure your answers are always in the most usable form.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Remember, practice makes perfect. Use our calculator to check your work, verify your methods, and build
                confidence in your fraction skills. Whether you're a student learning fractions for the first time, a
                professional needing quick calculations, or anyone in between, our tool is here to help you succeed.
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
              Our expert tutors can help you master fraction operations, simplification, and excel in mathematics. Get personalized one-on-one guidance tailored to your learning style.
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
