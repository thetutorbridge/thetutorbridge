'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, Home, CheckCircle, HelpCircle, Lightbulb, BookOpen, Divide, Plus, TrendingUp, Target } from 'lucide-react';
import { Navigation } from '@/components/navigation';
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

// Helper functions for fraction calculations
const gcd = (a: number, b: number): number => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

const lcm = (a: number, b: number): number => {
  return Math.abs(a * b) / gcd(a, b);
};

interface Fraction {
  whole: number;
  numerator: number;
  denominator: number;
  isNegative: boolean;
}

export default function MixedNumbersCalculatorPage() {
  const [input1, setInput1] = useState('1 3/4');
  const [input2, setInput2] = useState('-2 3/8');
  const [operator, setOperator] = useState<'+' | '-' | '*' | '/'>('+');
  const [result, setResult] = useState<string>('');
  const [steps, setSteps] = useState<string[]>([]);
  const [formulaSteps, setFormulaSteps] = useState<string[]>([]);

  const parseMixedNumber = (input: string): Fraction | null => {
    try {
      const trimmed = input.trim();
      let isNegative = false;
      let workingInput = trimmed;

      // Check for negative sign
      if (workingInput.startsWith('-')) {
        isNegative = true;
        workingInput = workingInput.substring(1).trim();
      }

      // Check if it's a mixed number (e.g., "1 3/4")
      const mixedMatch = workingInput.match(/^(\d+)\s+(\d+)\/(\d+)$/);
      if (mixedMatch) {
        return {
          whole: parseInt(mixedMatch[1]),
          numerator: parseInt(mixedMatch[2]),
          denominator: parseInt(mixedMatch[3]),
          isNegative
        };
      }

      // Check if it's just a fraction (e.g., "3/4")
      const fractionMatch = workingInput.match(/^(\d+)\/(\d+)$/);
      if (fractionMatch) {
        return {
          whole: 0,
          numerator: parseInt(fractionMatch[1]),
          denominator: parseInt(fractionMatch[2]),
          isNegative
        };
      }

      // Check if it's a whole number
      const wholeMatch = workingInput.match(/^(\d+)$/);
      if (wholeMatch) {
        return {
          whole: parseInt(wholeMatch[1]),
          numerator: 0,
          denominator: 1,
          isNegative
        };
      }

      // Check if it's a decimal
      const decimalMatch = workingInput.match(/^(\d+)\.(\d+)$/);
      if (decimalMatch) {
        const whole = parseInt(decimalMatch[1]);
        const decimal = decimalMatch[2];
        const denominator = Math.pow(10, decimal.length);
        const numerator = parseInt(decimal);
        return {
          whole,
          numerator,
          denominator,
          isNegative
        };
      }

      return null;
    } catch (e) {
      return null;
    }
  };

  const toImproperFraction = (frac: Fraction): { num: number; den: number } => {
    let numerator = frac.whole * frac.denominator + frac.numerator;
    if (frac.isNegative) numerator = -numerator;
    return { num: numerator, den: frac.denominator };
  };

  const simplifyFraction = (numerator: number, denominator: number): { num: number; den: number; whole: number } => {
    const divisor = gcd(numerator, denominator);
    let num = numerator / divisor;
    let den = denominator / divisor;

    // Handle negative denominators
    if (den < 0) {
      num = -num;
      den = -den;
    }

    // Extract whole number
    const whole = Math.floor(Math.abs(num) / den);
    const remainder = Math.abs(num) % den;

    return {
      num: remainder,
      den: den,
      whole: num < 0 ? -whole : whole
    };
  };

  const fractionToString = (simplified: { num: number; den: number; whole: number }): string => {
    const { whole, num, den } = simplified;

    if (num === 0) {
      return whole === 0 ? '0' : `${whole}`;
    }

    if (whole === 0) {
      return `${num}/${den}`;
    }

    const sign = whole < 0 ? '-' : '';
    return `${sign}${Math.abs(whole)} ${num}/${den}`;
  };

  const calculateResult = () => {
    const frac1 = parseMixedNumber(input1);
    const frac2 = parseMixedNumber(input2);

    if (!frac1 || !frac2) {
      setResult('Invalid input. Please use format like: 1 3/4, 3/4, or 5');
      setSteps([]);
      setFormulaSteps([]);
      return;
    }

    if (frac1.denominator === 0 || frac2.denominator === 0) {
      setResult('Error: Division by zero');
      setSteps([]);
      setFormulaSteps([]);
      return;
    }

    // Convert to improper fractions
    const imp1 = toImproperFraction(frac1);
    const imp2 = toImproperFraction(frac2);

    let resultNum = 0;
    let resultDen = 1;
    const stepsArray: string[] = [];
    const formulaStepsArray: string[] = [];

    // Add formula steps header
    formulaStepsArray.push('First: Convert mixed numbers to improper fractions');
    formulaStepsArray.push(`${input1} = ${imp1.num}/${imp1.den}`);
    formulaStepsArray.push(`${input2} = ${imp2.num}/${imp2.den}`);
    formulaStepsArray.push('');

    switch (operator) {
      case '+':
        // Addition
        const commonDenAdd = lcm(imp1.den, imp2.den);
        const num1Add = imp1.num * (commonDenAdd / imp1.den);
        const num2Add = imp2.num * (commonDenAdd / imp2.den);
        resultNum = num1Add + num2Add;
        resultDen = commonDenAdd;

        // Steps for separating parts
        stepsArray.push('Solution by Separating Parts:');
        stepsArray.push('');
        stepsArray.push('Step 1: Add the whole numbers');
        stepsArray.push(`${frac1.isNegative ? '-' : ''}${frac1.whole} + ${frac2.isNegative ? '-' : ''}${frac2.whole} = ${(frac1.isNegative ? -1 : 1) * frac1.whole + (frac2.isNegative ? -1 : 1) * frac2.whole}`);
        stepsArray.push('');
        stepsArray.push('Step 2: Add the fractions');
        stepsArray.push(`Find LCD of ${frac1.denominator} and ${frac2.denominator}: ${commonDenAdd}`);
        stepsArray.push(`${frac1.isNegative ? '-' : ''}${frac1.numerator}/${frac1.denominator} + ${frac2.isNegative ? '-' : ''}${frac2.numerator}/${frac2.denominator} = ${num1Add}/${commonDenAdd} + ${num2Add}/${commonDenAdd} = ${resultNum}/${resultDen}`);

        // Formula steps
        formulaStepsArray.push('Applying the addition formula:');
        formulaStepsArray.push(`(${imp1.num} × ${imp2.den} + ${imp2.num} × ${imp1.den}) / (${imp1.den} × ${imp2.den})`);
        formulaStepsArray.push(`= ${num1Add + num2Add} / ${commonDenAdd}`);
        break;

      case '-':
        // Subtraction
        const commonDenSub = lcm(imp1.den, imp2.den);
        const num1Sub = imp1.num * (commonDenSub / imp1.den);
        const num2Sub = imp2.num * (commonDenSub / imp2.den);
        resultNum = num1Sub - num2Sub;
        resultDen = commonDenSub;

        // Steps
        stepsArray.push('Solution by Separating Parts:');
        stepsArray.push('');
        stepsArray.push('Step 1: Subtract the whole numbers');
        stepsArray.push(`${frac1.isNegative ? '-' : ''}${frac1.whole} - ${frac2.isNegative ? '-' : ''}${frac2.whole} = ${(frac1.isNegative ? -1 : 1) * frac1.whole - (frac2.isNegative ? -1 : 1) * frac2.whole}`);
        stepsArray.push('');
        stepsArray.push('Step 2: Subtract the fractions');
        stepsArray.push(`Find LCD of ${frac1.denominator} and ${frac2.denominator}: ${commonDenSub}`);
        stepsArray.push(`${frac1.isNegative ? '-' : ''}${frac1.numerator}/${frac1.denominator} - ${frac2.isNegative ? '-' : ''}${frac2.numerator}/${frac2.denominator} = ${num1Sub}/${commonDenSub} - ${num2Sub}/${commonDenSub} = ${resultNum}/${resultDen}`);

        // Formula steps
        formulaStepsArray.push('Applying the subtraction formula:');
        formulaStepsArray.push(`(${imp1.num} × ${imp2.den} - ${imp2.num} × ${imp1.den}) / (${imp1.den} × ${imp2.den})`);
        formulaStepsArray.push(`= ${num1Sub - num2Sub} / ${commonDenSub}`);
        break;

      case '*':
        // Multiplication
        resultNum = imp1.num * imp2.num;
        resultDen = imp1.den * imp2.den;

        // Steps
        stepsArray.push('Solution by Converting to Improper Fractions:');
        stepsArray.push('');
        stepsArray.push(`Convert: ${input1} = ${imp1.num}/${imp1.den}`);
        stepsArray.push(`Convert: ${input2} = ${imp2.num}/${imp2.den}`);
        stepsArray.push('');
        stepsArray.push('Multiply numerators and denominators:');
        stepsArray.push(`${imp1.num}/${imp1.den} × ${imp2.num}/${imp2.den} = ${resultNum}/${resultDen}`);

        // Formula steps
        formulaStepsArray.push('Applying the multiplication formula:');
        formulaStepsArray.push(`(${imp1.num} × ${imp2.num}) / (${imp1.den} × ${imp2.den})`);
        formulaStepsArray.push(`= ${resultNum} / ${resultDen}`);
        break;

      case '/':
        // Division
        if (imp2.num === 0) {
          setResult('Error: Division by zero');
          setSteps([]);
          setFormulaSteps([]);
          return;
        }
        resultNum = imp1.num * imp2.den;
        resultDen = imp1.den * imp2.num;

        // Steps
        stepsArray.push('Solution by Converting to Improper Fractions:');
        stepsArray.push('');
        stepsArray.push(`Convert: ${input1} = ${imp1.num}/${imp1.den}`);
        stepsArray.push(`Convert: ${input2} = ${imp2.num}/${imp2.den}`);
        stepsArray.push('');
        stepsArray.push('Multiply by reciprocal:');
        stepsArray.push(`${imp1.num}/${imp1.den} ÷ ${imp2.num}/${imp2.den} = ${imp1.num}/${imp1.den} × ${imp2.den}/${imp2.num} = ${resultNum}/${resultDen}`);

        // Formula steps
        formulaStepsArray.push('Applying the division formula:');
        formulaStepsArray.push(`(${imp1.num} × ${imp2.den}) / (${imp1.den} × ${imp2.num})`);
        formulaStepsArray.push(`= ${resultNum} / ${resultDen}`);
        break;
    }

    // Simplify the result
    const simplified = simplifyFraction(resultNum, resultDen);
    const resultStr = fractionToString(simplified);

    // Add simplification step
    if (gcd(Math.abs(resultNum), Math.abs(resultDen)) > 1) {
      const divisor = gcd(Math.abs(resultNum), Math.abs(resultDen));
      formulaStepsArray.push('');
      formulaStepsArray.push(`Simplifying by dividing by GCD(${Math.abs(resultNum)}, ${Math.abs(resultDen)}) = ${divisor}:`);
      formulaStepsArray.push(`= ${simplified.whole !== 0 || simplified.num !== 0 ? resultStr : '0'}`);
    }

    setResult(resultStr);
    setSteps(stepsArray);
    setFormulaSteps(formulaStepsArray);
  };

  const handleClear = () => {
    setInput1('');
    setInput2('');
    setResult('');
    setSteps([]);
    setFormulaSteps([]);
  };

  return (
    <>
      <Navigation />
      <div className="bg-gradient-to-br from-red-50 via-orange-50 to-red-100 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white py-8 md:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <Link
              href="/calculators"
              className="inline-flex items-center text-white/90 hover:text-white mb-4 md:mb-6 transition-colors text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Calculators
            </Link>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                  Mixed Numbers Calculator
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl">
                  Add, subtract, multiply, and divide mixed numbers, fractions, and whole numbers with detailed step-by-step solutions. Perfect for students, teachers, and anyone learning fractions.
                </p>
              </div>
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                <Calculator className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Calculator Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {/* Left Column - Calculator */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-8 lg:p-10">
                <div className="bg-[#B85C4E] text-white text-center py-4 rounded-lg mb-6">
                  <h2 className="text-xl md:text-2xl font-bold">
                    Mixed Numbers Calculator
                  </h2>
                  <p className="text-sm mt-2 italic">
                    Use mixed numbers, fractions, integers or decimals
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Input Fields */}
                  <div className="flex items-center gap-3">
                    <Input
                      type="text"
                      value={input1}
                      onChange={(e) => setInput1(e.target.value)}
                      placeholder="1 3/4"
                      className="flex-1 text-center font-bold text-lg border-2 border-gray-300 focus:ring-2 focus:ring-[#2BAE66] py-6"
                    />
                    <Select value={operator} onValueChange={(value: any) => setOperator(value)}>
                      <SelectTrigger className="w-20 border-2 border-gray-300 text-lg py-6">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+">+</SelectItem>
                        <SelectItem value="-">−</SelectItem>
                        <SelectItem value="*">×</SelectItem>
                        <SelectItem value="/">÷</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="text"
                      value={input2}
                      onChange={(e) => setInput2(e.target.value)}
                      placeholder="-2 3/8"
                      className="flex-1 text-center font-bold text-lg border-2 border-gray-300 focus:ring-2 focus:ring-[#2BAE66] py-6"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4">
                    <Button
                      onClick={handleClear}
                      variant="outline"
                      className="flex-1 py-6 text-lg font-semibold border-2 border-gray-300 hover:bg-gray-50"
                    >
                      Clear
                    </Button>
                    <Button
                      onClick={calculateResult}
                      className="flex-1 py-6 text-lg font-semibold bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] hover:opacity-90"
                    >
                      Calculate
                    </Button>
                  </div>

                  {/* Answer Section */}
                  {result && (
                    <div className="border-2 border-gray-300 rounded-lg p-6">
                      <h3 className="font-bold text-lg mb-3">Answer:</h3>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-[#1A3D7C]">
                          {result}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Solution Steps */}
                  {steps.length > 0 && (
                    <div className="border-2 border-gray-300 rounded-lg p-6 bg-gray-50">
                      <h3 className="font-bold text-lg mb-4 text-[#1A3D7C]">Solution by Separating Parts:</h3>
                      <div className="space-y-2">
                        {steps.map((step, index) => (
                          <p key={index} className={`text-gray-700 ${step === '' ? 'mb-2' : ''}`}>
                            {step}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Formula Steps */}
                  {formulaSteps.length > 0 && (
                    <div className="border-2 border-[#2BAE66] rounded-lg p-6 bg-green-50">
                      <h3 className="font-bold text-lg mb-4 text-[#1A3D7C]">Solution by Formulas:</h3>
                      <div className="space-y-2">
                        {formulaSteps.map((step, index) => (
                          <p key={index} className={`text-gray-700 ${step === '' ? 'mb-2' : ''}`}>
                            {step}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Info Display */}
                <div className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border-2 border-orange-200">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 flex items-center text-base md:text-lg">
                    <Calculator className="w-5 h-5 mr-2" />
                    How to Enter Numbers
                  </h3>
                  <ul className="space-y-2 text-sm md:text-base text-gray-700">
                    <li>• <strong>Mixed Numbers:</strong> Use space between whole and fraction (e.g., 1 3/4)</li>
                    <li>• <strong>Fractions:</strong> Use forward slash (e.g., 3/4)</li>
                    <li>• <strong>Whole Numbers:</strong> Just type the number (e.g., 5)</li>
                    <li>• <strong>Negative Numbers:</strong> Add minus sign before (e.g., -2 3/8)</li>
                    <li>• <strong>Decimals:</strong> Use decimal point (e.g., 1.75)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column - Quick Reference */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 text-white sticky top-6">
                <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3" />
                  Quick Guide
                </h2>

                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="font-semibold text-[#FFC857] mb-2">Operations</h3>
                    <ul className="text-sm space-y-1">
                      <li>+ Addition</li>
                      <li>− Subtraction</li>
                      <li>× Multiplication</li>
                      <li>÷ Division</li>
                    </ul>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="font-semibold text-[#FFC857] mb-2">Examples</h3>
                    <ul className="text-sm space-y-1">
                      <li>1 3/4 + 2 1/2</li>
                      <li>5/8 − 1/4</li>
                      <li>2 1/3 × 3/4</li>
                      <li>4 1/2 ÷ 1 1/4</li>
                    </ul>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="font-semibold text-[#FFC857] mb-2">Features</h3>
                    <ul className="text-sm space-y-1">
                      <li>✓ Step-by-step solutions</li>
                      <li>✓ Two solving methods</li>
                      <li>✓ Automatic simplification</li>
                      <li>✓ Handles negatives</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections - Will add comprehensive SEO content */}
          <div className="mt-12 md:mt-16 space-y-8 md:space-y-12">
            {/* What is Mixed Numbers Calculator */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                What is a Mixed Numbers Calculator?
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  A <strong>mixed numbers calculator</strong> is a mathematical tool that helps you perform arithmetic operations (addition, subtraction, multiplication, and division) with mixed numbers, proper fractions, improper fractions, whole numbers, and decimals. Mixed numbers consist of a whole number and a proper fraction, like 2 ¾ or 5 ⅓.
                </p>
                <p>
                  Our calculator provides <strong>step-by-step solutions</strong> using two different methods: separating parts (breaking down whole numbers and fractions separately) and using formulas (converting to improper fractions first). This educational approach helps students understand not just the answer, but the complete solving process.
                </p>
                <p>
                  The calculator automatically simplifies fractions to their lowest terms, finds the least common denominator (LCD) for addition and subtraction, handles negative numbers correctly, and displays results in the most readable format. Whether you're checking homework, teaching fractions, or solving real-world problems involving measurements and quantities, this tool provides accurate results with detailed explanations.
                </p>
              </div>
            </section>

            {/* Continue with more comprehensive content sections... */}
            {/* I'll add more sections in the next part due to length */}
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-[#1A3D7C] text-white py-8 md:py-12 mt-12 md:mt-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">The Tutor Bridge</h3>
                <p className="text-white/80 text-sm">
                  Your trusted partner for mathematical calculations and learning.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/calculators" className="text-white/80 hover:text-white transition-colors">
                      All Calculators
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="text-white/80 hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Note</h3>
                <p className="text-white/80 text-sm">
                  This calculator provides step-by-step solutions for educational purposes. Always verify critical calculations.
                </p>
              </div>
            </div>
            <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
              <p>&copy; 2025 The Tutor Bridge. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
