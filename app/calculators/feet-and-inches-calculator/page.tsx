'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

// Helper function to parse fraction or decimal input
function parseFractionOrDecimal(input: string): number {
  if (!input || input.trim() === '') return 0;

  // Check if it's a fraction
  if (input.includes('/')) {
    const parts = input.split('/');
    if (parts.length === 2) {
      const numerator = parseFloat(parts[0].trim());
      const denominator = parseFloat(parts[1].trim());
      if (denominator !== 0) {
        return numerator / denominator;
      }
    }
  }

  // Check if it's a mixed fraction (e.g., "3 1/2")
  const mixedMatch = input.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (mixedMatch) {
    const whole = parseFloat(mixedMatch[1]);
    const numerator = parseFloat(mixedMatch[2]);
    const denominator = parseFloat(mixedMatch[3]);
    if (denominator !== 0) {
      return whole + (numerator / denominator);
    }
  }

  return parseFloat(input) || 0;
}

// Helper function to convert decimal to fraction
function decimalToFraction(decimal: number): string {
  const tolerance = 1.0E-6;
  let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
  let b = decimal;

  do {
    const a = Math.floor(b);
    let aux = h1;
    h1 = a * h1 + h2;
    h2 = aux;
    aux = k1;
    k1 = a * k1 + k2;
    k2 = aux;
    b = 1 / (b - a);
  } while (Math.abs(decimal - h1 / k1) > decimal * tolerance);

  return `${h1}/${k1}`;
}

// Helper function to format inches with fraction
function formatInches(inches: number): string {
  const wholeInches = Math.floor(inches);
  const fractionalPart = inches - wholeInches;

  if (fractionalPart < 0.001) {
    return `${wholeInches}`;
  }

  // Common fractions
  const eighths = Math.round(fractionalPart * 8);
  if (eighths === 8) return `${wholeInches + 1}`;
  if (eighths === 0) return `${wholeInches}`;

  // Simplify fraction
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const divisor = gcd(eighths, 8);
  const num = eighths / divisor;
  const den = 8 / divisor;

  if (wholeInches === 0) {
    return `${num}/${den}`;
  }

  return `${wholeInches} ${num}/${den}`;
}

export default function FeetAndInchesCalculator() {
  const [operation, setOperation] = useState<string>('+');
  const [feet1, setFeet1] = useState<string>('');
  const [inches1, setInches1] = useState<string>('61 3/4');
  const [feet2, setFeet2] = useState<string>('21');
  const [inches2, setInches2] = useState<string>('7 3/8');
  const [result, setResult] = useState<{
    feet: number;
    inches: number;
    totalFeet: number;
    totalInches: number;
    operation: string;
  } | null>(null);

  const handleCalculate = () => {
    const f1 = parseFloat(feet1) || 0;
    const i1 = parseFractionOrDecimal(inches1);
    const f2 = parseFloat(feet2) || 0;
    const i2 = parseFractionOrDecimal(inches2);

    // Convert to total inches
    const totalInches1 = (f1 * 12) + i1;
    const totalInches2 = (f2 * 12) + i2;

    let resultInches = 0;

    switch (operation) {
      case '+':
        resultInches = totalInches1 + totalInches2;
        break;
      case '-':
        resultInches = totalInches1 - totalInches2;
        break;
      case '*':
        resultInches = totalInches1 * totalInches2;
        break;
      case '/':
        if (totalInches2 === 0) {
          alert('Cannot divide by zero');
          return;
        }
        resultInches = totalInches1 / totalInches2;
        break;
    }

    const resultFeet = Math.floor(Math.abs(resultInches) / 12) * (resultInches < 0 ? -1 : 1);
    const resultInchesRemainder = Math.abs(resultInches) % 12;

    setResult({
      feet: resultFeet,
      inches: resultInchesRemainder,
      totalFeet: resultInches / 12,
      totalInches: resultInches,
      operation: operation,
    });
  };

  const handleClear = () => {
    setFeet1('');
    setInches1('61 3/4');
    setFeet2('21');
    setInches2('7 3/8');
    setResult(null);
  };

  const getOperationSymbol = () => {
    switch (operation) {
      case '+': return '+';
      case '-': return '−';
      case '*': return '×';
      case '/': return '÷';
      default: return '+';
    }
  };

  const getOperationName = () => {
    switch (operation) {
      case '+': return 'Addition';
      case '-': return 'Subtraction';
      case '*': return 'Multiplication';
      case '/': return 'Division';
      default: return 'Addition';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-8 mt-20 mb-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A3D7C] mb-4">
            Feet and Inches Calculator
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Calculator to add, subtract, multiply, divide, or convert feet and inches with fractions and decimals. Perfect for construction, carpentry, and home improvement projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Calculator Section */}
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 border-t-4 border-orange-600">
            <div className="bg-gradient-to-r from-orange-700 to-red-700 text-white text-center py-3 rounded-lg mb-6">
              <h2 className="text-xl md:text-2xl font-bold">Feet & Inches Calculator</h2>
            </div>

            <p className="text-center text-gray-600 italic mb-6">
              Use feet or inches or both, fractions or decimals
            </p>

            {/* First Input Row */}
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="feet1" className="text-base font-semibold text-gray-700 mb-2 block text-center">
                    feet
                  </Label>
                  <Input
                    id="feet1"
                    type="text"
                    value={feet1}
                    onChange={(e) => setFeet1(e.target.value)}
                    className="text-lg p-3 border-2 border-gray-300 focus:border-orange-500 text-center"
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="inches1" className="text-base font-semibold text-gray-700 mb-2 block text-center">
                    inches
                  </Label>
                  <Input
                    id="inches1"
                    type="text"
                    value={inches1}
                    onChange={(e) => setInches1(e.target.value)}
                    className="text-lg p-3 border-2 border-gray-300 focus:border-orange-500 text-center"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Operation Selector */}
            <div className="mb-6">
              <Select value={operation} onValueChange={setOperation}>
                <SelectTrigger className="w-full text-2xl font-bold border-2 border-gray-300 focus:border-orange-500 py-6">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+" className="text-2xl py-3">+</SelectItem>
                  <SelectItem value="-" className="text-2xl py-3">−</SelectItem>
                  <SelectItem value="*" className="text-2xl py-3">×</SelectItem>
                  <SelectItem value="/" className="text-2xl py-3">÷</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Second Input Row */}
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="feet2" className="text-base font-semibold text-gray-700 mb-2 block text-center">
                    feet
                  </Label>
                  <Input
                    id="feet2"
                    type="text"
                    value={feet2}
                    onChange={(e) => setFeet2(e.target.value)}
                    className="text-lg p-3 border-2 border-gray-300 focus:border-orange-500 text-center"
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="inches2" className="text-base font-semibold text-gray-700 mb-2 block text-center">
                    inches
                  </Label>
                  <Input
                    id="inches2"
                    type="text"
                    value={inches2}
                    onChange={(e) => setInches2(e.target.value)}
                    className="text-lg p-3 border-2 border-gray-300 focus:border-orange-500 text-center"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button
                onClick={handleClear}
                variant="outline"
                className="py-6 text-lg font-semibold border-2 border-gray-300 hover:bg-gray-100"
              >
                Clear
              </Button>
              <Button
                onClick={handleCalculate}
                className="py-6 text-lg font-semibold bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-800 hover:to-red-800"
              >
                Calculate
              </Button>
            </div>

            {/* Answer Section */}
            {result && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Answer:</h3>
                <div className="space-y-3">
                  <p className="text-xl font-bold text-blue-600">
                    = {result.feet} ft {formatInches(result.inches)} in
                  </p>
                  <p className="text-lg text-gray-700">
                    = {result.totalFeet.toFixed(4)} ft
                  </p>
                  <p className="text-lg text-gray-700">
                    = {formatInches(result.totalInches)} in
                  </p>
                  <p className="text-lg text-gray-700">
                    = {result.totalInches.toFixed(3)} in
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Solution Section */}
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8">
            <h3 className="text-2xl font-bold text-[#1A3D7C] mb-6 pb-3 border-b-2 border-gray-200">
              Solution:
            </h3>

            {result && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">
                    Calculate {getOperationName().toLowerCase()}
                  </h4>

                  <div className="space-y-4 text-lg">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                      <p className="font-semibold mb-2">Step 1: Convert to inches</p>
                      <p>First value: {feet1 || '0'} ft {inches1} in = {((parseFloat(feet1) || 0) * 12).toFixed(2)} + {parseFractionOrDecimal(inches1).toFixed(4)} = {((parseFloat(feet1) || 0) * 12 + parseFractionOrDecimal(inches1)).toFixed(4)} in</p>
                      <p>Second value: {feet2} ft {inches2} in = {(parseFloat(feet2) * 12).toFixed(2)} + {parseFractionOrDecimal(inches2).toFixed(4)} = {(parseFloat(feet2) * 12 + parseFractionOrDecimal(inches2)).toFixed(4)} in</p>
                    </div>

                    <div className="bg-green-50 border-l-4 border-green-500 p-4">
                      <p className="font-semibold mb-2">Step 2: Perform {getOperationName().toLowerCase()}</p>
                      <p className="text-lg">
                        {((parseFloat(feet1) || 0) * 12 + parseFractionOrDecimal(inches1)).toFixed(4)} {getOperationSymbol()} {(parseFloat(feet2) * 12 + parseFractionOrDecimal(inches2)).toFixed(4)} = {result.totalInches.toFixed(4)} in
                      </p>
                    </div>

                    <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                      <p className="font-semibold mb-2">Step 3: Convert back to feet and inches</p>
                      <div className="space-y-2">
                        <p>Total inches: {result.totalInches.toFixed(4)} in</p>
                        <p>Feet: {result.totalInches.toFixed(4)} ÷ 12 = {result.totalFeet.toFixed(4)} ft</p>
                        <p>Feet (whole): {result.feet} ft</p>
                        <p>Inches (remainder): {result.inches.toFixed(4)} in ≈ {formatInches(result.inches)} in</p>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                      <p className="text-xl font-bold text-gray-800">
                        Final Answer: {result.feet} ft {formatInches(result.inches)} in
                      </p>
                      <p className="text-base text-gray-700 mt-2">
                        = {result.totalFeet.toFixed(4)} ft = {result.totalInches.toFixed(3)} in
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!result && (
              <div className="text-center text-gray-500 py-12">
                <p className="text-lg">Enter values and click Calculate to see the step-by-step solution</p>
              </div>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">What is the Feet and Inches Calculator?</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p className="text-lg leading-relaxed">
              The Feet and Inches Calculator is a powerful tool designed for performing arithmetic operations with imperial measurements. It allows you to add, subtract, multiply, and divide measurements expressed in feet and inches, including support for both fractions (like 3/4, 1/2, 5/8) and decimals (like 0.75, 0.5, 0.625).
            </p>
            <p className="text-lg leading-relaxed">
              This calculator is essential for professionals in construction, carpentry, architecture, engineering, and home improvement who work with imperial measurements daily. It eliminates the complexity of manual conversions and calculations, reducing errors and saving valuable time on job sites and in workshops.
            </p>
            <p className="text-lg leading-relaxed">
              Whether you're measuring lumber dimensions, calculating room sizes, planning deck construction, determining flooring requirements, or working on any project that uses feet and inches, this calculator provides accurate results with step-by-step solutions that show exactly how the calculation was performed.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">How to Use the Feet and Inches Calculator</h2>
          <div className="prose max-w-none text-gray-700">
            <ol className="space-y-6 text-lg">
              <li className="pl-2">
                <span className="font-bold text-[#1A3D7C]">Step 1: Enter First Measurement</span>
                <p className="mt-2 ml-4">Enter the feet and inches for your first measurement. You can use:</p>
                <ul className="ml-8 mt-2 space-y-1">
                  <li>• Whole numbers: 5 feet, 8 inches</li>
                  <li>• Fractions: 3/4, 1/2, 5/8</li>
                  <li>• Mixed numbers: 7 3/8, 61 3/4</li>
                  <li>• Decimals: 0.75, 0.625</li>
                  <li>• You can leave feet or inches blank if not needed</li>
                </ul>
              </li>

              <li className="pl-2">
                <span className="font-bold text-[#1A3D7C]">Step 2: Select Operation</span>
                <p className="mt-2 ml-4">Choose the mathematical operation from the dropdown:</p>
                <ul className="ml-8 mt-2 space-y-1">
                  <li>• <span className="font-semibold">+</span> for Addition</li>
                  <li>• <span className="font-semibold">−</span> for Subtraction</li>
                  <li>• <span className="font-semibold">×</span> for Multiplication</li>
                  <li>• <span className="font-semibold">÷</span> for Division</li>
                </ul>
              </li>

              <li className="pl-2">
                <span className="font-bold text-[#1A3D7C]">Step 3: Enter Second Measurement</span>
                <p className="mt-2 ml-4">Enter the feet and inches for your second measurement using the same format options as the first measurement.</p>
              </li>

              <li className="pl-2">
                <span className="font-bold text-[#1A3D7C]">Step 4: Calculate</span>
                <p className="mt-2 ml-4">Click the Calculate button to see the result in multiple formats:</p>
                <ul className="ml-8 mt-2 space-y-1">
                  <li>• Feet and inches with fractions (26 ft 9 1/8 in)</li>
                  <li>• Total feet as a decimal (26.7604 ft)</li>
                  <li>• Total inches with fractions (321 1/8 in)</li>
                  <li>• Total inches as a decimal (321.125 in)</li>
                </ul>
              </li>

              <li className="pl-2">
                <span className="font-bold text-[#1A3D7C]">Step 5: Review Solution</span>
                <p className="mt-2 ml-4">Check the step-by-step solution to understand how the result was calculated, including the conversion to inches, the operation performed, and the conversion back to feet and inches.</p>
              </li>
            </ol>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Understanding Feet and Inches Calculations</h2>
          <div className="prose max-w-none text-gray-700 space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Basic Conversion</h3>
              <p className="text-lg mb-3">
                The fundamental relationship between feet and inches:
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-xl text-center">1 foot = 12 inches</p>
                <p className="font-semibold text-xl text-center mt-2">1 inch = 1/12 foot ≈ 0.0833 feet</p>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Addition Process</h3>
              <p className="text-lg mb-3">To add feet and inches:</p>
              <ol className="space-y-2 ml-6">
                <li>1. Convert both measurements to total inches</li>
                <li>2. Add the total inches together</li>
                <li>3. Divide by 12 to get feet (whole number part)</li>
                <li>4. The remainder is the inches</li>
              </ol>
              <div className="bg-white p-4 rounded-lg mt-4">
                <p className="font-semibold">Example:</p>
                <p>5 ft 8 in + 3 ft 9 in</p>
                <p>= (5×12 + 8) + (3×12 + 9)</p>
                <p>= 68 in + 45 in = 113 in</p>
                <p>= 9 ft 5 in</p>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Working with Fractions</h3>
              <p className="text-lg mb-3">
                When working with fractional inches (common in carpentry):
              </p>
              <ul className="space-y-2 ml-6">
                <li>• 1/2 inch = 0.5 inches</li>
                <li>• 1/4 inch = 0.25 inches</li>
                <li>• 3/4 inch = 0.75 inches</li>
                <li>• 1/8 inch = 0.125 inches</li>
                <li>• 3/8 inch = 0.375 inches</li>
                <li>• 5/8 inch = 0.625 inches</li>
                <li>• 7/8 inch = 0.875 inches</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Common Applications</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border-2 border-orange-200">
              <h3 className="text-xl font-bold text-orange-800 mb-3">Construction & Building</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Measuring wall lengths and heights</li>
                <li>• Calculating floor and ceiling dimensions</li>
                <li>• Determining stud spacing (16" or 24" on center)</li>
                <li>• Planning door and window openings</li>
                <li>• Calculating total material lengths</li>
                <li>• Foundation measurements</li>
                <li>• Roofing calculations</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-3">Carpentry & Woodworking</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Cutting lumber to precise lengths</li>
                <li>• Cabinet and furniture dimensions</li>
                <li>• Trim and molding measurements</li>
                <li>• Deck board spacing and layout</li>
                <li>• Stair tread and riser calculations</li>
                <li>• Shelf spacing and sizing</li>
                <li>• Door and drawer measurements</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-3">Home Improvement</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Flooring and tile layout planning</li>
                <li>• Paint coverage area calculations</li>
                <li>• Wallpaper measurements</li>
                <li>• Furniture placement and spacing</li>
                <li>• Room dimension verification</li>
                <li>• Countertop measurements</li>
                <li>• Window treatment sizing</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-200">
              <h3 className="text-xl font-bold text-purple-800 mb-3">Professional Trades</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• HVAC duct sizing and layout</li>
                <li>• Plumbing pipe measurements</li>
                <li>• Electrical conduit runs</li>
                <li>• Concrete formwork dimensions</li>
                <li>• Landscaping and fencing</li>
                <li>• Pool and spa installations</li>
                <li>• Equipment spacing requirements</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Common Fraction Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-gray-300">
              <thead>
                <tr className="bg-gradient-to-r from-orange-700 to-red-700 text-white">
                  <th className="border-2 border-gray-300 p-4 text-left">Fraction</th>
                  <th className="border-2 border-gray-300 p-4 text-left">Decimal</th>
                  <th className="border-2 border-gray-300 p-4 text-left">Common Use</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 p-4 font-semibold">1/16"</td>
                  <td className="border-2 border-gray-300 p-4">0.0625"</td>
                  <td className="border-2 border-gray-300 p-4">Fine woodworking, precision cuts</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 p-4 font-semibold">1/8"</td>
                  <td className="border-2 border-gray-300 p-4">0.125"</td>
                  <td className="border-2 border-gray-300 p-4">Common measurement increment</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 p-4 font-semibold">3/16"</td>
                  <td className="border-2 border-gray-300 p-4">0.1875"</td>
                  <td className="border-2 border-gray-300 p-4">Detailed carpentry work</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 p-4 font-semibold">1/4"</td>
                  <td className="border-2 border-gray-300 p-4">0.25"</td>
                  <td className="border-2 border-gray-300 p-4">Standard spacing, drill bits</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 p-4 font-semibold">3/8"</td>
                  <td className="border-2 border-gray-300 p-4">0.375"</td>
                  <td className="border-2 border-gray-300 p-4">Bolt sizes, lumber thickness</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 p-4 font-semibold">1/2"</td>
                  <td className="border-2 border-gray-300 p-4">0.5"</td>
                  <td className="border-2 border-gray-300 p-4">Plywood, drywall thickness</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 p-4 font-semibold">5/8"</td>
                  <td className="border-2 border-gray-300 p-4">0.625"</td>
                  <td className="border-2 border-gray-300 p-4">Drywall, plywood thickness</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 p-4 font-semibold">3/4"</td>
                  <td className="border-2 border-gray-300 p-4">0.75"</td>
                  <td className="border-2 border-gray-300 p-4">Standard lumber, plywood</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 p-4 font-semibold">7/8"</td>
                  <td className="border-2 border-gray-300 p-4">0.875"</td>
                  <td className="border-2 border-gray-300 p-4">Specialty applications</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Tips for Accurate Measurements</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Use Quality Measuring Tools</h4>
                  <p className="text-gray-700">Invest in a good quality tape measure with clear markings. Check that it's properly calibrated.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Measure Twice, Cut Once</h4>
                  <p className="text-gray-700">Always verify measurements before cutting materials. Double-check calculations to avoid costly mistakes.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Account for Material Thickness</h4>
                  <p className="text-gray-700">Remember to factor in the thickness of materials when calculating cuts and joints.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Keep Consistent Units</h4>
                  <p className="text-gray-700">Stick to feet and inches throughout a project to avoid confusion and calculation errors.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">5</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Mark Clearly</h4>
                  <p className="text-gray-700">Use clear, precise markings on materials. Label measurements to avoid mix-ups.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <div className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">6</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Account for Tolerances</h4>
                  <p className="text-gray-700">Leave appropriate gaps for expansion, especially with wood products that can swell with moisture.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">7</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Check Square and Level</h4>
                  <p className="text-gray-700">Ensure corners are square (90°) and surfaces are level before final measurements.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
                <div className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">8</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Document Everything</h4>
                  <p className="text-gray-700">Keep written records of all measurements and calculations for reference and verification.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Frequently Asked Questions (FAQ)</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">How do I add feet and inches with fractions?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To add feet and inches with fractions, first convert both measurements to total inches (multiply feet by 12 and add inches). Add the two total inch values together. Then divide the result by 12 to get feet (the whole number) and the remainder is the inches. For fractions, convert to decimals (e.g., 3/4 = 0.75), perform the calculation, then convert back to the nearest fraction if needed.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Can I enter just inches or just feet?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Yes! You can leave either the feet or inches field blank. If you're measuring something that's only in inches (like 61 3/4 inches), just enter that in the inches field and leave feet blank. If you have a measurement that's only whole feet with no extra inches, enter the feet and leave inches blank or enter 0.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">What fractions can I use?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                You can use any fraction, but common carpentry fractions work best: 1/2, 1/4, 3/4, 1/8, 3/8, 5/8, 7/8, and 1/16. You can also use mixed numbers like "7 3/8" or "61 3/4". The calculator will convert these to decimals, perform the calculation, and convert back to fractional form in the answer.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">How accurate is the calculator?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                The calculator performs all calculations with high precision (up to 10 decimal places internally) and displays results to 4 decimal places for feet and 3 decimal places for inches. Fractions are approximated to the nearest 1/8 inch for practical use in construction and carpentry, which is the standard precision for most tape measures.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Why do I get negative results in subtraction?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                You'll get a negative result when subtracting a larger measurement from a smaller one. For example, 5 ft 3 in minus 8 ft 7 in = -3 ft -4 in. This indicates the second measurement is larger by that amount. In practical applications, you may need to reverse the order of subtraction or interpret the negative result as a deficit or shortage.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">When would I multiply or divide feet and inches?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Multiplication is useful when calculating total lengths of multiple identical pieces (e.g., 5 boards each 8 ft 3 in long). Division is helpful for splitting measurements into equal parts (e.g., dividing a 10 ft board into 3 equal pieces) or calculating unit rates. Note that multiplication and division results may need interpretation based on your specific application.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">How do I convert between feet and inches?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To convert feet to inches, multiply by 12 (e.g., 5 ft = 5 × 12 = 60 inches). To convert inches to feet, divide by 12 (e.g., 36 inches = 36 ÷ 12 = 3 feet). For mixed measurements like 5 ft 8 in, convert the feet to inches first (5 × 12 = 60), then add the inches (60 + 8 = 68 total inches).
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">What if my inches exceed 12?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                The calculator automatically handles inches greater than 12 by converting them to feet. For example, if you enter 0 feet and 25 inches, the calculator will show the result as 2 ft 1 in (since 25 ÷ 12 = 2 with remainder 1). This is helpful when you're working with measurements from a tape measure that shows total inches.
              </p>
            </div>
          </div>
        </div>

        {/* Book Your Session CTA */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-xl shadow-2xl p-8 md:p-12 text-center text-white mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help with Math or Measurements?</h2>
          <p className="text-xl mb-6 text-gray-100">
            Our expert tutors can help you master calculations, conversions, and mathematical concepts
          </p>
          <Link
            href="/tutoring/free-consultation"
            className="inline-block bg-white text-[#1A3D7C] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Book Your Free Demo Session
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
