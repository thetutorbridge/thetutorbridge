'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, Home, CheckCircle, HelpCircle, Lightbulb, BookOpen, Divide, Plus, TrendingUp, Target, ArrowRight } from 'lucide-react';
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
                  {/* First Number Input */}
                  <div>
                    <Label htmlFor="number1" className="text-gray-700 font-semibold mb-3 block text-sm md:text-base">
                      First Number:
                    </Label>
                    <Input
                      id="number1"
                      type="text"
                      value={input1}
                      onChange={(e) => setInput1(e.target.value)}
                      placeholder="1 3/4"
                      className="text-center font-bold text-lg border-2 border-[#2BAE66] focus:ring-2 focus:ring-[#2BAE66] py-6"
                    />
                  </div>

                  {/* Operation Selector */}
                  <div>
                    <Label htmlFor="operation" className="text-gray-700 font-semibold mb-3 block text-sm md:text-base">
                      Operation:
                    </Label>
                    <Select value={operator} onValueChange={(value: any) => setOperator(value)}>
                      <SelectTrigger id="operation" className="w-full border-2 border-[#2BAE66] text-lg py-6">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+">+ Addition</SelectItem>
                        <SelectItem value="-">− Subtraction</SelectItem>
                        <SelectItem value="*">× Multiplication</SelectItem>
                        <SelectItem value="/">÷ Division</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Second Number Input */}
                  <div>
                    <Label htmlFor="number2" className="text-gray-700 font-semibold mb-3 block text-sm md:text-base">
                      Second Number:
                    </Label>
                    <Input
                      id="number2"
                      type="text"
                      value={input2}
                      onChange={(e) => setInput2(e.target.value)}
                      placeholder="-2 3/8"
                      className="text-center font-bold text-lg border-2 border-[#2BAE66] focus:ring-2 focus:ring-[#2BAE66] py-6"
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
                    <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-lg p-6 border-2 border-[#2BAE66]/20">
                      <h3 className="font-bold text-lg mb-3 text-white flex items-center">
                        <Calculator className="w-5 h-5 mr-2" />
                        Answer:
                      </h3>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 border-2 border-white/20">
                        <p className="text-white/80 text-xs md:text-sm mb-2">Result</p>
                        <p className="text-3xl md:text-4xl font-bold text-white text-center">
                          {result}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Solution Steps */}
                  {steps.length > 0 && (
                    <div className="border-2 border-[#2BAE66]/30 rounded-lg p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                      <h3 className="font-bold text-lg mb-4 text-[#1A3D7C] flex items-center">
                        <BookOpen className="w-5 h-5 mr-2 text-[#2BAE66]" />
                        Solution by Separating Parts:
                      </h3>
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
                    <div className="border-2 border-[#2BAE66] rounded-lg p-6 bg-gradient-to-r from-green-50 to-emerald-50">
                      <h3 className="font-bold text-lg mb-4 text-[#1A3D7C] flex items-center">
                        <Calculator className="w-5 h-5 mr-2 text-[#2BAE66]" />
                        Solution by Formulas:
                      </h3>
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
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-[#2BAE66]/20">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 flex items-center text-base md:text-lg">
                    <HelpCircle className="w-5 h-5 mr-2 text-[#2BAE66]" />
                    How to Enter Numbers
                  </h3>
                  <ul className="space-y-2 text-sm md:text-base text-gray-700">
                    <li>✓ <strong>Mixed Numbers:</strong> Use space between whole and fraction (e.g., 1 3/4)</li>
                    <li>✓ <strong>Fractions:</strong> Use forward slash (e.g., 3/4)</li>
                    <li>✓ <strong>Whole Numbers:</strong> Just type the number (e.g., 5)</li>
                    <li>✓ <strong>Negative Numbers:</strong> Add minus sign before (e.g., -2 3/8)</li>
                    <li>✓ <strong>Decimals:</strong> Use decimal point (e.g., 1.75)</li>
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

            {/* How Mixed Numbers Work */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                How to Use Mixed Numbers in Calculations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg flex items-center">
                    <Plus className="w-5 h-5 mr-2 text-[#2BAE66]" />
                    Addition & Subtraction
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Method 1 - Separate Parts:</strong> Add/subtract whole numbers and fractions separately. Find common denominators for fractions.
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Method 2 - Improper Fractions:</strong> Convert mixed numbers to improper fractions, find LCD, then add/subtract.
                  </p>
                  <div className="bg-white p-3 rounded mt-3">
                    <p className="text-sm font-mono">Example: 2 ¾ + 1 ½</p>
                    <p className="text-sm font-mono">= 2 + 1 + ¾ + ½</p>
                    <p className="text-sm font-mono">= 3 + ¾ + 2/4</p>
                    <p className="text-sm font-mono">= 3 + 5/4 = 4 ¼</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg flex items-center">
                    <Calculator className="w-5 h-5 mr-2 text-[#2BAE66]" />
                    Multiplication & Division
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Always convert to improper fractions first.</strong> Then multiply numerators and denominators, or flip and multiply for division.
                  </p>
                  <div className="bg-white p-3 rounded mt-3">
                    <p className="text-sm font-mono">Multiply: 2 ½ × 1 ⅓</p>
                    <p className="text-sm font-mono">= 5/2 × 4/3</p>
                    <p className="text-sm font-mono">= 20/6 = 10/3 = 3 ⅓</p>
                  </div>
                  <div className="bg-white p-3 rounded mt-3">
                    <p className="text-sm font-mono">Divide: 3 ¾ ÷ 1 ¼</p>
                    <p className="text-sm font-mono">= 15/4 ÷ 5/4</p>
                    <p className="text-sm font-mono">= 15/4 × 4/5 = 3</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                <Target className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                Benefits of Using Mixed Numbers Calculator
              </h2>
              <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white p-8 rounded-2xl">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Step-by-Step Learning
                    </h3>
                    <p className="text-white/90">
                      See exactly how to solve each problem with detailed steps. Two different methods help you understand which approach works best for each situation - perfect for homework and exam preparation.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Instant Homework Checker
                    </h3>
                    <p className="text-white/90">
                      Verify your answers immediately and understand mistakes. The calculator shows the correct process, helping students learn from errors rather than just getting marked wrong.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Multiple Input Formats
                    </h3>
                    <p className="text-white/90">
                      Enter mixed numbers (2 ¾), fractions (¾), decimals (0.75), or whole numbers (3). The calculator handles all formats, making it flexible for any problem type or personal preference.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Automatic Simplification
                    </h3>
                    <p className="text-white/90">
                      Results are automatically reduced to lowest terms. No need to manually find GCD or simplify - the calculator does it for you and shows the simplification process.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Real-World Applications
                    </h3>
                    <p className="text-white/90">
                      Perfect for cooking (recipe adjustments), construction (measurements), sewing (fabric calculations), and any task requiring fractional calculations. Practical beyond just schoolwork.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <h3 className="font-semibold text-[#FFC857] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Teacher-Approved Methods
                    </h3>
                    <p className="text-white/90">
                      Uses standard mathematical approaches taught in schools. Both solution methods align with Common Core standards and traditional fraction instruction methodologies.
                    </p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-[#FFC857] text-[#1A3D7C] rounded-lg">
                  <p className="font-semibold">
                    💡 Pro Tip: When adding or subtracting, use Method 1 (separate parts) for easier mental math. For multiplication and division, Method 2 (improper fractions) is always required!
                  </p>
                </div>
              </div>
            </section>

            {/* Real-World Use Cases */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                Real-World Applications
              </h2>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-red-50 to-white p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    🍳 Cooking & Baking
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Problem:</strong> A recipe calls for 2 ¾ cups flour, but you want to make 1 ½ times the recipe.
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Solution:</strong> 2 ¾ × 1 ½ = 11/4 × 3/2 = 33/8 = 4 ⅛ cups flour needed
                  </p>
                  <p className="text-[#2BAE66] font-semibold">
                    <strong>Result:</strong> You need 4 ⅛ cups of flour for the adjusted recipe
                  </p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-white p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    🏗️ Construction & Carpentry
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Problem:</strong> You need to cut boards that are 5 ¾ inches wide. How many can you cut from a 46-inch wide plank?
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Solution:</strong> 46 ÷ 5 ¾ = 46 ÷ 23/4 = 46 × 4/23 = 184/23 = 8 boards
                  </p>
                  <p className="text-[#2BAE66] font-semibold">
                    <strong>Result:</strong> You can cut exactly 8 boards from the plank
                  </p>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-white p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    🧵 Sewing & Fabric Work
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Problem:</strong> You have 12 ½ yards of fabric. Each dress requires 3 ¾ yards. How many dresses can you make?
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Solution:</strong> 12 ½ ÷ 3 ¾ = 25/2 ÷ 15/4 = 25/2 × 4/15 = 100/30 = 3 ⅓ → 3 complete dresses
                  </p>
                  <p className="text-[#2BAE66] font-semibold">
                    <strong>Result:</strong> You can make 3 complete dresses with fabric left over
                  </p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-white p-6 rounded-lg border-l-4 border-[#2BAE66]">
                  <h3 className="font-bold text-[#1A3D7C] mb-3 text-lg">
                    📐 School Math Homework
                  </h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Problem:</strong> Sarah walked 2 ⅔ miles on Monday and 1 ¾ miles on Tuesday. How far did she walk total?
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Solution:</strong> 2 ⅔ + 1 ¾ = (2+1) + (⅔ + ¾) = 3 + (8/12 + 9/12) = 3 + 17/12 = 4 5/12 miles
                  </p>
                  <p className="text-[#2BAE66] font-semibold">
                    <strong>Result:</strong> Sarah walked 4 5/12 miles in total
                  </p>
                </div>
              </div>
            </section>

            {/* FAQs Section */}
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    How do I add mixed numbers with different denominators?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    <strong>Method 1:</strong> Add whole numbers separately, then add fractions by finding the LCD (Least Common Denominator). For example, 2 ¾ + 1 ½: Add wholes (2+1=3), find LCD of 4 and 2 (which is 4), convert ½ to 2/4, add fractions (¾ + 2/4 = 5/4 = 1¼), then combine (3 + 1¼ = 4¼).
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    What's the easiest way to multiply mixed numbers?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Always <strong>convert to improper fractions first</strong>, then multiply numerators together and denominators together. For example: 2 ½ × 1 ⅓ = 5/2 × 4/3 = (5×4)/(2×3) = 20/6 = 10/3 = 3 ⅓. Never try to multiply mixed numbers directly without converting first.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    How do I convert a mixed number to an improper fraction?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Use the formula: <strong>(whole number × denominator) + numerator</strong>, keep the same denominator. Example: 2 ¾ = (2 × 4 + 3) / 4 = (8 + 3) / 4 = 11/4. For negative numbers, apply the negative sign to the final result: -2 ¾ = -11/4.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    Why do I need to find the LCD for addition and subtraction?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    You can only add or subtract fractions with the <strong>same denominator</strong>. The LCD (Least Common Denominator) is the smallest number that both denominators divide into evenly. For example, to add ¾ + ⅔, find LCD of 4 and 3 (which is 12), convert to 9/12 + 8/12 = 17/12 = 1 5/12.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    Can I enter decimals in this calculator?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Yes! Enter decimals like <strong>1.75 or 0.5</strong> and the calculator automatically converts them to fractions. For example, 1.75 becomes 1 ¾ and 0.5 becomes ½. This is useful when you have decimal measurements that need to be calculated with fractions.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    How do I simplify an improper fraction back to a mixed number?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Divide the numerator by the denominator. The <strong>quotient is the whole number</strong>, the <strong>remainder is the new numerator</strong>, and the <strong>denominator stays the same</strong>. Example: 17/4 → 17 ÷ 4 = 4 remainder 1, so 17/4 = 4 ¼.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    What if my answer is an improper fraction?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    The calculator <strong>automatically converts improper fractions to mixed numbers</strong> in the final answer. However, if the improper fraction is already in lowest terms (like 5/4), it will show as a mixed number (1 ¼). In mathematics, either form is correct, but mixed numbers are usually preferred for final answers.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    How do I handle negative mixed numbers?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Put a <strong>minus sign before the number</strong> (e.g., -2 ¾). When calculating, the negative applies to the entire mixed number. For example: -2 ¾ = -11/4 (not -2 and ¾ separately). The calculator handles all negative number operations automatically.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    Why are there two different solution methods shown?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Different students learn differently! <strong>Method 1 (Separating Parts)</strong> is intuitive for beginners and good for mental math with addition/subtraction. <strong>Method 2 (Formulas)</strong> is the standard algebraic approach, required for multiplication/division, and preferred for complex problems. Both methods give the same answer.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2 border-l-4 border-[#2BAE66] pl-4">
                    Can this calculator help with reducing fractions?
                  </h3>
                  <p className="text-gray-700 pl-6">
                    Yes! The calculator <strong>automatically reduces all fractions to lowest terms</strong> using the GCD (Greatest Common Divisor). For example, 6/8 automatically becomes ¾. This ensures all answers are in their simplest, most readable form as required in mathematics.
                  </p>
                </div>
              </div>
            </section>

            {/* Smart Tips Section */}
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
                <Lightbulb className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-[#2BAE66]" />
                Smart Tips for Working with Mixed Numbers
              </h2>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl border border-gray-200">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Always simplify your final answer:</strong> Teachers expect fractions in lowest terms. Use GCD to reduce: for 12/16, find GCD(12,16)=4, divide both by 4 to get ¾. The calculator does this automatically, but knowing how helps you check your work.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>For multiplication/division, convert first:</strong> Never multiply or divide mixed numbers directly. Always convert to improper fractions first. This prevents errors and makes the calculation much simpler. Example: 2½ × 3 = 5/2 × 3/1 = 15/2 = 7½ (not 6½!).
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Check if you can reduce before calculating:</strong> Sometimes simplifying fractions before operating makes calculation easier. For 8/12 + 6/12, notice both have 12 as denominator AND can be reduced: 8/12=⅔, 6/12=½. But actually here, just add first: 14/12 = 7/6 = 1⅙.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Use cross-multiplication shortcut for common denominators:</strong> When adding fractions with denominators that are multiples (like 4 and 2), you don't need LCD. Just multiply the smaller denominator: ¾ + ½ = ¾ + 2/4 = 5/4. This saves time!
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Estimate before calculating:</strong> Round mixed numbers to check if your answer makes sense. 2¾ × 1½ should be close to 3×2=6? No, closer to 3×1.5=4.5, actual is 4⅛. This catches big mistakes like forgetting to convert or using wrong operations.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Know when whole numbers dominate:</strong> In 100¼ + 50⅛, the fractions (¼+⅛=⅜) barely affect the answer (150⅜). But in ¾ + ⅝, the fraction IS the answer (11/8=1⅜). Understanding scale helps with estimation and confidence.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Practice the conversion formula:</strong> Memorize "multiply whole by denominator, add numerator": 3¾ = (3×4+3)/4 = 15/4. This becomes automatic with practice and is essential for all fraction operations. Write it down until it's second nature.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#2BAE66] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Use visual aids for understanding:</strong> Draw pie charts or rectangles divided into parts. Seeing 2¾ as 2 whole pies plus ¾ of a third pie makes the concept concrete, especially for addition and subtraction. This builds intuition beyond just formulas.
                    </p>
                  </li>
                </ul>
              </div>
            </section>

            {/* Fraction Reference Table */}
            <section className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3D7C] mb-6">
                Common Fractions Quick Reference
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white">
                      <th className="border border-gray-300 p-3 text-left">Mixed Number</th>
                      <th className="border border-gray-300 p-3 text-left">Improper Fraction</th>
                      <th className="border border-gray-300 p-3 text-left">Decimal</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">1 ½</td>
                      <td className="border border-gray-300 p-3">3/2</td>
                      <td className="border border-gray-300 p-3">1.5</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">1 ⅓</td>
                      <td className="border border-gray-300 p-3">4/3</td>
                      <td className="border border-gray-300 p-3">1.333...</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">1 ¼</td>
                      <td className="border border-gray-300 p-3">5/4</td>
                      <td className="border border-gray-300 p-3">1.25</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">2 ⅔</td>
                      <td className="border border-gray-300 p-3">8/3</td>
                      <td className="border border-gray-300 p-3">2.666...</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">2 ¾</td>
                      <td className="border border-gray-300 p-3">11/4</td>
                      <td className="border border-gray-300 p-3">2.75</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">3 ½</td>
                      <td className="border border-gray-300 p-3">7/2</td>
                      <td className="border border-gray-300 p-3">3.5</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">4 ⅕</td>
                      <td className="border border-gray-300 p-3">21/5</td>
                      <td className="border border-gray-300 p-3">4.2</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">5 ⅜</td>
                      <td className="border border-gray-300 p-3">43/8</td>
                      <td className="border border-gray-300 p-3">5.375</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 p-4 bg-red-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Conversion Formula:</strong> To convert mixed number to improper: (whole × denominator) + numerator, keep same denominator. To convert back: divide numerator by denominator, quotient = whole, remainder = new numerator.
                </p>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-xl md:rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Explore More Calculators
              </h2>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                Check out our other educational and financial calculators
              </p>
              <Link href="/calculators">
                <Button className="bg-white text-[#1A3D7C] hover:bg-gray-100 font-semibold px-8 py-6 text-lg">
                  View All Calculators
                </Button>
              </Link>
            </section>
          </div>
        </div>

        {/* Book Your Session CTA */}
        <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                Need Help with Fractions & Mixed Numbers?
              </h2>
              <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                Our expert tutors can help you master fraction operations, mixed numbers, and excel in mathematics. Get personalized one-on-one guidance tailored to your learning style.
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

        {/* Footer */}
        <footer className="bg-[#1A3D7C] text-white py-8 md:py-12 mt-12 md:mt-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">The Tutor Bridge</h3>
                <p className="text-white/80 text-sm">
                  Your trusted partner for mathematical calculations and learning tools.
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
                <h3 className="text-lg font-bold mb-4">Disclaimer</h3>
                <p className="text-white/80 text-sm">
                  This calculator provides step-by-step solutions for educational purposes. Always verify critical calculations and consult with teachers for proper learning.
                </p>
              </div>
            </div>
            <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
              <p>&copy; 2026 The Tutor Bridge. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
