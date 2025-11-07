'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Home, BookOpen, ArrowRight, GitMerge, List } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GCFResult {
  numbers: number[];
  gcf: number;
  lcm: number;
  steps: string[];
  factors: { [key: number]: number[] };
  primeFactorization: { [key: number]: { [key: number]: number } };
  method: string;
}

export default function GCFCalculator() {
  const [input, setInput] = useState<string>('');
  const [method, setMethod] = useState<string>('prime');
  const [result, setResult] = useState<GCFResult | null>(null);

  // Calculate GCD using Euclidean algorithm
  const calculateGCD = (a: number, b: number): number => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  // Calculate GCD of multiple numbers
  const calculateGCDMultiple = (numbers: number[]): number => {
    return numbers.reduce((acc, num) => calculateGCD(acc, num));
  };

  // Get all factors of a number
  const getFactors = (n: number): number[] => {
    const factors: number[] = [];
    for (let i = 1; i <= Math.abs(n); i++) {
      if (n % i === 0) {
        factors.push(i);
      }
    }
    return factors.sort((a, b) => a - b);
  };

  // Get prime factorization
  const getPrimeFactorization = (n: number): { [key: number]: number } => {
    const factors: { [key: number]: number } = {};
    let num = Math.abs(n);

    for (let i = 2; i <= num; i++) {
      while (num % i === 0) {
        factors[i] = (factors[i] || 0) + 1;
        num = num / i;
      }
    }

    return factors;
  };

  // Calculate LCM
  const calculateLCM = (numbers: number[]): number => {
    const lcm = numbers.reduce((acc, num) => {
      return (acc * num) / calculateGCD(acc, num);
    });
    return Math.abs(lcm);
  };

  // Calculate GCF using prime factorization
  const calculateGCFPrime = (numbers: number[]): GCFResult => {
    const steps: string[] = [];
    const primeFactorization: { [key: number]: { [key: number]: number } } = {};
    const factors: { [key: number]: number[] } = {};

    steps.push(`Finding GCF of ${numbers.join(', ')} using Prime Factorization Method:`);
    steps.push('');

    // Get prime factorization and all factors for each number
    numbers.forEach(num => {
      const primeFactors = getPrimeFactorization(num);
      primeFactorization[num] = primeFactors;
      factors[num] = getFactors(num);

      const factorStr = Object.entries(primeFactors)
        .map(([prime, power]) => power > 1 ? `${prime}^${power}` : prime)
        .join(' × ');
      steps.push(`${num} = ${factorStr || '1'}`);
      steps.push(`Factors of ${num}: ${factors[num].join(', ')}`);
    });

    steps.push('');
    steps.push('To find GCF, take the lowest power of each common prime factor:');

    // Find all unique prime factors
    const allPrimes = new Set<number>();
    Object.values(primeFactorization).forEach(pf => {
      Object.keys(pf).forEach(prime => allPrimes.add(Number(prime)));
    });

    // Calculate GCF by taking lowest power of common primes
    let gcf = 1;
    const gcfFactors: { [key: number]: number } = {};

    Array.from(allPrimes).sort((a, b) => a - b).forEach(prime => {
      let minPower = Infinity;
      let isCommon = true;

      Object.values(primeFactorization).forEach(pf => {
        if (pf[prime]) {
          minPower = Math.min(minPower, pf[prime]);
        } else {
          isCommon = false;
        }
      });

      if (isCommon && minPower !== Infinity) {
        gcfFactors[prime] = minPower;
        gcf *= Math.pow(prime, minPower);
        steps.push(`Prime ${prime}: appears in all numbers, lowest power is ${minPower}`);
      } else {
        steps.push(`Prime ${prime}: does not appear in all numbers, skip`);
      }
    });

    steps.push('');
    if (Object.keys(gcfFactors).length > 0) {
      const gcfFactorStr = Object.entries(gcfFactors)
        .map(([prime, power]) => power > 1 ? `${prime}^${power}` : prime)
        .join(' × ');
      steps.push(`GCF = ${gcfFactorStr} = ${gcf}`);
    } else {
      steps.push(`GCF = 1 (no common prime factors)`);
    }

    const lcm = calculateLCM(numbers);

    return {
      numbers,
      gcf,
      lcm,
      steps,
      factors,
      primeFactorization,
      method: 'Prime Factorization Method',
    };
  };

  // Calculate GCF using listing factors
  const calculateGCFFactors = (numbers: number[]): GCFResult => {
    const steps: string[] = [];
    const factors: { [key: number]: number[] } = {};
    const primeFactorization: { [key: number]: { [key: number]: number } } = {};

    steps.push(`Finding GCF of ${numbers.join(', ')} using Listing Factors Method:`);
    steps.push('');

    // Get factors for each number
    numbers.forEach(num => {
      factors[num] = getFactors(num);
      primeFactorization[num] = getPrimeFactorization(num);
      steps.push(`Factors of ${num}: ${factors[num].join(', ')}`);
    });

    steps.push('');
    steps.push('Finding common factors:');

    // Find common factors
    const firstFactors = factors[numbers[0]];
    const commonFactors = firstFactors.filter(factor =>
      numbers.every(num => factors[num].includes(factor))
    );

    steps.push(`Common factors: ${commonFactors.join(', ')}`);
    steps.push('');

    const gcf = Math.max(...commonFactors);
    steps.push(`Greatest common factor = ${gcf}`);

    const lcm = calculateLCM(numbers);

    return {
      numbers,
      gcf,
      lcm,
      steps,
      factors,
      primeFactorization,
      method: 'Listing Factors Method',
    };
  };

  // Calculate GCF using Euclidean algorithm (for 2 numbers)
  const calculateGCFEuclidean = (numbers: number[]): GCFResult => {
    const steps: string[] = [];
    const factors: { [key: number]: number[] } = {};
    const primeFactorization: { [key: number]: { [key: number]: number } } = {};

    if (numbers.length === 2) {
      let [a, b] = numbers.map(Math.abs);
      const originalA = a;
      const originalB = b;

      steps.push(`Finding GCF of ${originalA} and ${originalB} using Euclidean Algorithm:`);
      steps.push('');
      steps.push('The Euclidean Algorithm uses repeated division:');
      steps.push('GCF(a, b) = GCF(b, a mod b) until remainder is 0');
      steps.push('');

      let stepCount = 1;
      while (b !== 0) {
        const remainder = a % b;
        steps.push(`Step ${stepCount}: ${a} = ${b} × ${Math.floor(a / b)} + ${remainder}`);
        a = b;
        b = remainder;
        stepCount++;
      }

      steps.push('');
      steps.push(`When remainder is 0, the GCF is ${a}`);

      numbers.forEach(num => {
        factors[num] = getFactors(num);
        primeFactorization[num] = getPrimeFactorization(num);
      });

      const lcm = calculateLCM(numbers);

      return {
        numbers,
        gcf: a,
        lcm,
        steps,
        factors,
        primeFactorization,
        method: 'Euclidean Algorithm',
      };
    } else {
      // Use prime factorization for 3+ numbers
      return calculateGCFPrime(numbers);
    }
  };

  const handleCalculate = () => {
    if (!input.trim()) {
      alert('Please enter numbers to calculate GCF');
      return;
    }

    try {
      // Parse input
      const numbers = input
        .split(/[,\s]+/)
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .map(s => parseInt(s));

      // Validate
      if (numbers.length < 2) {
        alert('Please enter at least 2 numbers');
        return;
      }

      if (numbers.some(n => isNaN(n))) {
        alert('Please enter valid integers only');
        return;
      }

      if (numbers.some(n => n === 0)) {
        alert('Cannot calculate GCF with 0. Please enter non-zero integers.');
        return;
      }

      if (numbers.length > 10) {
        alert('Please enter 10 or fewer numbers');
        return;
      }

      // Calculate based on selected method
      let calculationResult: GCFResult;
      switch (method) {
        case 'prime':
          calculationResult = calculateGCFPrime(numbers);
          break;
        case 'factors':
          calculationResult = calculateGCFFactors(numbers);
          break;
        case 'euclidean':
          calculationResult = calculateGCFEuclidean(numbers);
          break;
        default:
          calculationResult = calculateGCFPrime(numbers);
      }

      setResult(calculationResult);
    } catch (error) {
      alert('An error occurred during calculation. Please check your input.');
    }
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Navigation />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-orange-600 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">GCF Calculator</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <GitMerge className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Greatest Common Factor Calculator
            </h1>
            <p className="text-lg md:text-xl text-orange-100 max-w-2xl mx-auto leading-relaxed">
              Find the GCF, HCF, or GCD of 2 or more numbers with step-by-step solutions. Three calculation methods available.
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
                  <Calculator className="w-6 h-6 text-orange-600" />
                  Calculate GCF
                </h2>

                {/* Method Selector */}
                <div className="mb-6">
                  <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                    Calculation Method
                  </Label>
                  <Select value={method} onValueChange={setMethod}>
                    <SelectTrigger className="border-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prime">Prime Factorization</SelectItem>
                      <SelectItem value="factors">Listing Factors</SelectItem>
                      <SelectItem value="euclidean">Euclidean Algorithm (2 numbers)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Input Field */}
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="numbers" className="text-sm font-semibold text-gray-700 mb-3 block">
                      Enter Numbers (2-10 numbers)
                    </Label>
                    <Input
                      id="numbers"
                      type="text"
                      placeholder="e.g., 8, 12, 20 or 8 12 20"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="text-center text-lg font-medium border-2"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleCalculate();
                        }
                      }}
                    />
                    <p className="text-xs text-gray-500 mt-2">Separate numbers with commas or spaces</p>
                  </div>
                </div>

                {/* Buttons */}
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

                {/* Quick Examples */}
                <div className="mt-6 p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">Quick Examples:</h3>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>• GCF(8, 12, 20) = 4</p>
                    <p>• GCF(18, 30, 42) = 6</p>
                    <p>• GCF(24, 36) = 12</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section (Right Side - 3 columns) */}
            <div className="lg:col-span-3">
              {result ? (
                <div className="space-y-6">
                  {/* Answer Card */}
                  <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4">Greatest Common Factor</h3>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <div className="text-center">
                        <p className="text-sm mb-2">GCF({result.numbers.join(', ')})</p>
                        <p className="text-5xl md:text-6xl font-bold">{result.gcf}</p>
                        <p className="text-sm mt-3 text-orange-100 italic">
                          {result.gcf === 1 ? 'Numbers are relatively prime (coprime)' : 'Greatest Common Factor'}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 text-center text-orange-100">
                      <p className="text-sm">Method: {result.method}</p>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Additional Information
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 text-center">
                        <p className="text-sm text-gray-600 mb-2">LCM (Least Common Multiple)</p>
                        <p className="text-3xl font-bold text-orange-600">{result.lcm}</p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 text-center">
                        <p className="text-sm text-gray-600 mb-2">Count of Numbers</p>
                        <p className="text-3xl font-bold text-red-600">{result.numbers.length}</p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 text-center">
                        <p className="text-sm text-gray-600 mb-2">GCF × LCM</p>
                        <p className="text-3xl font-bold text-orange-600">
                          {result.numbers.length === 2 ? (result.gcf * result.lcm) : '—'}
                        </p>
                      </div>
                    </div>
                    {result.numbers.length === 2 && (
                      <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-4">
                        <p className="text-sm text-gray-700">
                          <strong>Note:</strong> For two numbers a and b: GCF(a,b) × LCM(a,b) = a × b<br />
                          {result.gcf} × {result.lcm} = {result.numbers[0]} × {result.numbers[1]} = {result.numbers[0] * result.numbers[1]}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* All Factors */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      All Factors
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(result.factors).map(([num, factorList]) => (
                        <div key={num} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex flex-col gap-2">
                            <span className="text-lg font-bold text-gray-900">
                              Factors of {num}:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {factorList.map((factor, idx) => (
                                <span
                                  key={idx}
                                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    result.gcf === factor
                                      ? 'bg-orange-100 text-orange-700 border-2 border-orange-500'
                                      : 'bg-gray-200 text-gray-700'
                                  }`}
                                >
                                  {factor}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prime Factorization */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Prime Factorization
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(result.primeFactorization).map(([num, factors]) => (
                        <div key={num} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <span className="text-lg font-bold text-gray-900">{num} =</span>
                            <span className="text-lg text-gray-700">
                              {Object.keys(factors).length > 0
                                ? Object.entries(factors)
                                    .map(([prime, power]) =>
                                      power > 1 ? (
                                        <span key={prime}>
                                          {prime}
                                          <sup>{power}</sup>
                                        </span>
                                      ) : (
                                        prime
                                      )
                                    )
                                    .reduce((prev, curr, idx) => (
                                      <>
                                        {prev}
                                        {idx > 0 ? ' × ' : ''}
                                        {curr}
                                      </>
                                    ))
                                : '1'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step-by-Step Solution */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-orange-600" />
                      Step-by-Step Solution
                    </h3>
                    <div className="space-y-2">
                      {result.steps.map((step, index) => (
                        <div key={index}>
                          {step === '' ? (
                            <div className="h-2"></div>
                          ) : (
                            <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg font-mono text-sm">
                              {step}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <GitMerge className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">
                    Enter 2 or more numbers and click Calculate
                  </p>
                  <p className="text-gray-400 text-sm">
                    Separate numbers with commas or spaces
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
                Understanding Greatest Common Factor (GCF)
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The Greatest Common Factor (GCF), also called the Greatest Common Divisor (GCD) or Highest Common Factor (HCF), is the largest positive integer that divides evenly into all given numbers without leaving a remainder. For example, the GCF of 8, 12, and 20 is 4, because 4 is the largest number that divides into all three numbers evenly.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                GCF is a fundamental concept in number theory and has practical applications in simplifying fractions, finding equivalent ratios, dividing items into equal groups, and solving real-world distribution problems. Understanding how to find the GCF helps develop mathematical reasoning and problem-solving skills essential for algebra and higher mathematics.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our GCF Calculator provides three different methods to find the Greatest Common Factor: Prime Factorization (most comprehensive), Listing Factors (most visual), and Euclidean Algorithm (fastest for 2 numbers). Each method includes complete step-by-step explanations to help you understand the process thoroughly.
              </p>
            </section>

            {/* What is GCF */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                What is the Greatest Common Factor?
              </h2>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 mb-6">
                <p className="text-lg text-gray-700 mb-4">
                  The GCF of a set of whole numbers is the <strong>largest positive integer</strong> that divides evenly into all numbers with zero remainder.
                </p>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Example: Find GCF(8, 12, 20)</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• Factors of 8: 1, 2, 4, <strong className="text-orange-600">8</strong></p>
                    <p>• Factors of 12: 1, 2, 3, 4, 6, <strong>12</strong></p>
                    <p>• Factors of 20: 1, 2, 4, 5, 10, <strong>20</strong></p>
                    <p className="pt-2 border-t-2 border-gray-200 mt-3">
                      <strong>Common factors:</strong> 1, 2, <strong className="text-orange-600 text-lg">4</strong>
                    </p>
                    <p className="text-lg font-bold text-orange-600">
                      GCF = 4 (the greatest/largest common factor)
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-orange-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-600 mb-3">Key Properties:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Always a positive integer</li>
                    <li>• At minimum, equals 1</li>
                    <li>• At maximum, equals the smallest input number</li>
                    <li>• GCF = 1 means numbers are coprime (relatively prime)</li>
                    <li>• Divides evenly into all input numbers</li>
                  </ul>
                </div>
                <div className="bg-white border-2 border-red-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-600 mb-3">Alternate Names:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>GCF</strong> - Greatest Common Factor</li>
                    <li>• <strong>GCD</strong> - Greatest Common Divisor</li>
                    <li>• <strong>HCF</strong> - Highest Common Factor</li>
                    <li>• <strong>GCM</strong> - Greatest Common Measure</li>
                    <li className="text-sm italic">All refer to the same concept!</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Methods to Calculate GCF */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Methods to Calculate GCF
              </h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 md:p-8">
                  <h3 className="text-xl font-bold text-orange-700 mb-4">1. Prime Factorization Method (Recommended)</h3>
                  <p className="text-gray-700 mb-4">
                    This method is most reliable and works well for any quantity of numbers.
                  </p>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <h4 className="font-bold text-gray-900 mb-2">Steps:</h4>
                    <ol className="space-y-2 text-gray-700">
                      <li>1. Find the prime factorization of each number</li>
                      <li>2. Identify the prime factors common to all numbers</li>
                      <li>3. For each common prime, take the lowest power</li>
                      <li>4. Multiply these together to get the GCF</li>
                    </ol>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Example: GCF(12, 18, 24)</h4>
                    <div className="space-y-1 text-sm text-gray-700 font-mono">
                      <p>12 = 2² × 3</p>
                      <p>18 = 2 × 3²</p>
                      <p>24 = 2³ × 3</p>
                      <p className="mt-2 pt-2 border-t border-gray-300">Common primes: 2 and 3</p>
                      <p>Lowest power of 2: 2¹</p>
                      <p>Lowest power of 3: 3¹</p>
                      <p className="mt-2 font-bold text-orange-600">GCF = 2¹ × 3¹ = 2 × 3 = 6</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 md:p-8">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">2. Listing Factors Method</h3>
                  <p className="text-gray-700 mb-4">
                    This method is visual and intuitive, great for understanding what GCF means.
                  </p>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <h4 className="font-bold text-gray-900 mb-2">Steps:</h4>
                    <ol className="space-y-2 text-gray-700">
                      <li>1. List all factors of each number</li>
                      <li>2. Identify the factors common to all numbers</li>
                      <li>3. The largest common factor is the GCF</li>
                    </ol>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Example: GCF(18, 30)</h4>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p>Factors of 18: 1, 2, 3, <strong>6</strong>, 9, 18</p>
                      <p>Factors of 30: 1, 2, 3, 5, <strong>6</strong>, 10, 15, 30</p>
                      <p className="mt-2 pt-2 border-t border-gray-300">Common factors: 1, 2, 3, <strong className="text-blue-600">6</strong></p>
                      <p className="mt-2 font-bold text-blue-600">GCF = 6 (largest common factor)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 md:p-8">
                  <h3 className="text-xl font-bold text-purple-700 mb-4">3. Euclidean Algorithm (For 2 Numbers)</h3>
                  <p className="text-gray-700 mb-4">
                    This is the fastest method for finding GCF of exactly two numbers.
                  </p>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <h4 className="font-bold text-gray-900 mb-2">Steps:</h4>
                    <ol className="space-y-2 text-gray-700">
                      <li>1. Divide the larger number by the smaller number</li>
                      <li>2. Replace the larger with the smaller, and the smaller with the remainder</li>
                      <li>3. Repeat until remainder is 0</li>
                      <li>4. The last non-zero remainder is the GCF</li>
                    </ol>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Example: GCF(48, 18)</h4>
                    <div className="space-y-1 text-sm text-gray-700 font-mono">
                      <p>48 = 18 × 2 + 12</p>
                      <p>18 = 12 × 1 + 6</p>
                      <p>12 = 6 × 2 + 0</p>
                      <p className="mt-2 pt-2 border-t border-gray-300 font-bold text-purple-600">
                        GCF = 6 (last non-zero remainder)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* How to Use Calculator */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Use This Calculator
              </h2>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <strong className="text-gray-900">Choose a Method:</strong>
                      <p className="text-gray-700 mt-1">Select Prime Factorization, Listing Factors, or Euclidean Algorithm from the dropdown. Prime Factorization is recommended for most cases.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <strong className="text-gray-900">Enter Your Numbers:</strong>
                      <p className="text-gray-700 mt-1">Type 2-10 positive or negative integers separated by commas or spaces. Example: "8, 12, 20" or "8 12 20".</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <strong className="text-gray-900">Calculate:</strong>
                      <p className="text-gray-700 mt-1">Click Calculate button (or press Enter) to see the GCF, LCM, all factors, prime factorizations, and complete step-by-step solution.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                    <div>
                      <strong className="text-gray-900">Study the Results:</strong>
                      <p className="text-gray-700 mt-1">Review all factors, prime factorizations, and step-by-step explanation to fully understand how the GCF was calculated.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            {/* GCF vs LCM */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                GCF vs LCM: What's the Difference?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-orange-600 mb-4">GCF - Greatest Common Factor</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Largest</strong> number that divides all given numbers</li>
                    <li>• Always ≤ the smallest input number</li>
                    <li>• Used for simplifying fractions</li>
                    <li>• Found by taking <strong>lowest powers</strong> of common prime factors</li>
                    <li>• Example: GCF(12, 18) = 6</li>
                    <li>• Application: Dividing items into equal groups</li>
                  </ul>
                </div>
                <div className="bg-white border-2 border-blue-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-blue-600 mb-4">LCM - Least Common Multiple</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Smallest</strong> number divisible by all given numbers</li>
                    <li>• Always ≥ the largest input number</li>
                    <li>• Used for adding/subtracting fractions</li>
                    <li>• Found by taking <strong>highest powers</strong> of all prime factors</li>
                    <li>• Example: LCM(12, 18) = 36</li>
                    <li>• Application: Finding common schedules/cycles</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-xl p-6">
                <h4 className="font-bold text-gray-900 mb-2">Important Relationship:</h4>
                <p className="text-gray-700 mb-2">
                  For any two numbers a and b: <strong>GCF(a,b) × LCM(a,b) = a × b</strong>
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  Example: GCF(12, 18) × LCM(12, 18) = 6 × 36 = 216 = 12 × 18 ✓
                </p>
                <p className="text-gray-600 text-sm">
                  This relationship is useful for finding one value when you know the other.
                </p>
              </div>
            </section>

            {/* Real-World Applications */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Real-World Applications of GCF
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-orange-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-600 mb-3">📐 Simplifying Fractions</h3>
                  <p className="text-gray-700">
                    To reduce a fraction to lowest terms, divide both numerator and denominator by their GCF. Example: 18/24 = (18÷6)/(24÷6) = 3/4, where GCF(18, 24) = 6.
                  </p>
                </div>

                <div className="bg-white border-2 border-red-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-600 mb-3">📦 Dividing Items Equally</h3>
                  <p className="text-gray-700">
                    To divide items into equal groups with no leftovers, use GCF. Example: 24 apples and 36 oranges can be divided into GCF(24, 36) = 12 equal gift baskets.
                  </p>
                </div>

                <div className="bg-white border-2 border-orange-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-600 mb-3">🎨 Arranging Objects</h3>
                  <p className="text-gray-700">
                    To arrange items in rows and columns with the same layout, use GCF. Example: 48 desks and 36 chairs can be arranged in GCF(48, 36) = 12 rows.
                  </p>
                </div>

                <div className="bg-white border-2 border-red-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-600 mb-3">📏 Cutting Materials</h3>
                  <p className="text-gray-700">
                    To cut materials into largest equal pieces with no waste, use GCF. Example: Boards of 120cm and 180cm can be cut into GCF(120, 180) = 60cm pieces.
                  </p>
                </div>

                <div className="bg-white border-2 border-orange-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-600 mb-3">🔢 Finding Equivalent Ratios</h3>
                  <p className="text-gray-700">
                    To simplify ratios, divide by GCF. Example: The ratio 18:24 simplifies to (18÷6):(24÷6) = 3:4, where GCF(18, 24) = 6.
                  </p>
                </div>

                <div className="bg-white border-2 border-red-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-600 mb-3">🏗️ Construction & Design</h3>
                  <p className="text-gray-700">
                    To find the largest tile size that fits perfectly in different areas, use GCF. Example: A 240×360 cm room uses GCF(240, 360) = 120cm tiles with no cutting.
                  </p>
                </div>
              </div>
            </section>

            {/* Common Mistakes */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Common Mistakes When Finding GCF
              </h2>
              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Confusing GCF with LCM</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> GCF(12, 18) = 36 (that's the LCM!)
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> GCF(12, 18) = 6 ✓
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Remember: GCF is always ≤ the smallest number, LCM is always ≥ the largest number.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Using Highest Powers Instead of Lowest</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> For 2² and 2³, use 2³ in GCF ✗
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> For 2² and 2³, use 2² in GCF ✓
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    GCF uses lowest powers of common primes (LCM uses highest powers).
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Including Non-Common Factors</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> GCF(12, 18) includes factor 5 because it's prime ✗
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> Only use factors that appear in ALL numbers ✓
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    A prime must divide ALL numbers to be included in the GCF.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Incomplete Prime Factorization</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> 12 = 2 × 6 (6 is not prime) ✗
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> 12 = 2² × 3 (fully factored to primes) ✓
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Always break down completely into prime factors only.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Stopping at First Common Factor</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> GCF(12, 18) = 2 (first common factor) ✗
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> GCF(12, 18) = 6 (GREATEST common factor) ✓
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Find ALL common factors, then choose the largest one.
                  </p>
                </div>
              </div>
            </section>

            {/* Tips and Tricks */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Tips and Tricks for Finding GCF
              </h2>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Quick Check for Divisibility:</strong>
                      <p className="text-gray-700 mt-1">
                        If one number divides evenly into all others, that number IS the GCF. Example: GCF(6, 12, 18) = 6 because 6 divides all three.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Use Euclidean Algorithm for 2 Numbers:</strong>
                      <p className="text-gray-700 mt-1">
                        For just 2 numbers, the Euclidean Algorithm is faster and doesn't require factorization.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Co-prime Numbers:</strong>
                      <p className="text-gray-700 mt-1">
                        If numbers share no common factors except 1 (co-prime), their GCF is 1. Example: GCF(7, 11) = 1.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Consecutive Numbers:</strong>
                      <p className="text-gray-700 mt-1">
                        The GCF of consecutive integers is always 1. Example: GCF(15, 16) = 1.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Verify Your Answer:</strong>
                      <p className="text-gray-700 mt-1">
                        The GCF should divide evenly into each original number. Quickly divide each number by your answer to check.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Even/Odd Pattern:</strong>
                      <p className="text-gray-700 mt-1">
                        If all numbers are even, the GCF is at least 2. If any number is odd, the GCF cannot contain 2.
                      </p>
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
                    What is the GCF of 0 and any number?
                  </h3>
                  <p className="text-gray-700">
                    The GCF involving 0 is mathematically defined as the absolute value of the non-zero number, since every integer divides 0. However, for practical purposes, most calculators (including ours) don't accept 0 as an input. In standard elementary mathematics, we work only with positive integers for GCF.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can GCF be larger than the smallest number?
                  </h3>
                  <p className="text-gray-700">
                    No, the GCF can never be larger than the smallest number in the set. The GCF must divide evenly into all numbers, so it cannot exceed the smallest one. In fact, the GCF is at most equal to the smallest number (when that number divides all others).
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What does it mean if GCF = 1?
                  </h3>
                  <p className="text-gray-700">
                    When GCF = 1, the numbers are called "relatively prime" or "coprime." This means they share no common factors except 1. For example, GCF(8, 15) = 1. This is common with prime numbers or consecutive integers. It doesn't mean the numbers themselves are prime—just that they don't share prime factors.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What's the GCF of two prime numbers?
                  </h3>
                  <p className="text-gray-700">
                    The GCF of two different prime numbers is always 1. Prime numbers have no factors other than 1 and themselves, so they can't share any common factors except 1. For example, GCF(7, 11) = 1, GCF(3, 5) = 1. However, GCF(7, 7) = 7 since a number and itself have that number as their GCF.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How is GCF used to simplify fractions?
                  </h3>
                  <p className="text-gray-700">
                    To simplify a fraction, divide both the numerator and denominator by their GCF. For example, to simplify 18/24: find GCF(18, 24) = 6, then divide: 18÷6 = 3 and 24÷6 = 4, giving 3/4 in lowest terms. This ensures the fraction is reduced as much as possible.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can you find GCF of negative numbers?
                  </h3>
                  <p className="text-gray-700">
                    Yes, but GCF is defined as a positive integer. When calculating GCF of negative numbers, use their absolute values. For example, GCF(-12, -18) = GCF(12, 18) = 6. The GCF itself is always positive, even when the original numbers are negative.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What if all numbers are the same?
                  </h3>
                  <p className="text-gray-700">
                    If all numbers are identical, the GCF is that number itself. For example, GCF(5, 5, 5) = 5. This makes sense because the number divides itself and is the largest number that does so. Similarly, GCF(n, n) = n for any number n.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do I find GCF of fractions or decimals?
                  </h3>
                  <p className="text-gray-700">
                    GCF is defined only for integers, not fractions or decimals. If you have fractions, you can find the GCF of the numerators and denominators separately. For decimals, convert them to fractions first, or multiply by a power of 10 to make them whole numbers, find the GCF, then adjust accordingly.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Which method is fastest for finding GCF?
                  </h3>
                  <p className="text-gray-700">
                    For 2 numbers, the Euclidean Algorithm is fastest. For 3+ numbers, prime factorization is most efficient and reliable. Listing factors works well for small numbers but becomes tedious with larger numbers or many inputs. Our calculator uses the most appropriate method based on your selection.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What's the relationship between GCF and LCM?
                  </h3>
                  <p className="text-gray-700">
                    For any two numbers a and b: GCF(a,b) × LCM(a,b) = a × b. This beautiful relationship allows you to find one if you know the other. For example, if GCF(12, 18) = 6 and LCM(12, 18) = 36, then 6 × 36 = 216 = 12 × 18. This relationship only holds for exactly two numbers.
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
                Understanding the Greatest Common Factor is fundamental to mastering fractions, ratios, and many real-world mathematical applications. Whether you're a student learning to simplify fractions, a teacher preparing lessons, or someone solving practical division and distribution problems, finding the GCF is an essential skill.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our GCF Calculator provides three powerful methods—Prime Factorization, Listing Factors, and Euclidean Algorithm—each with complete step-by-step explanations. This not only gives you quick, accurate answers but also helps you understand the underlying mathematics and learn the most efficient approaches for different situations.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Use this calculator to check your homework, learn new methods, solve real-world problems, or explore the fascinating relationships in number theory. Remember that understanding comes with practice—the more you work with GCF, the more intuitive it becomes. Master this concept, and you'll have a solid foundation for algebra, number theory, and practical problem-solving. Happy calculating!
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
              Need Help with GCF, LCM, and Number Theory?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you master GCF, LCM, prime factorization, fractions, and excel in mathematics. Get personalized one-on-one guidance tailored to your learning style.
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

      <Footer />
    </div>
  );
}
