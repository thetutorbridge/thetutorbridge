'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Home, BookOpen, ArrowRight, Binary, List } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LCMResult {
  numbers: number[];
  lcm: number;
  gcf: number;
  steps: string[];
  primeFactorization: { [key: number]: { [key: number]: number } };
  multiples?: { [key: number]: number[] };
  method: string;
}

export default function LCMCalculator() {
  const [input, setInput] = useState<string>('');
  const [method, setMethod] = useState<string>('prime');
  const [result, setResult] = useState<LCMResult | null>(null);

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

  // Get prime factorization
  const getPrimeFactorization = (n: number): { [key: number]: number } => {
    const factors: { [key: number]: number } = {};
    let num = n;

    for (let i = 2; i <= num; i++) {
      while (num % i === 0) {
        factors[i] = (factors[i] || 0) + 1;
        num = num / i;
      }
    }

    return factors;
  };

  // Calculate LCM using prime factorization
  const calculateLCMPrime = (numbers: number[]): LCMResult => {
    const steps: string[] = [];
    const primeFactorization: { [key: number]: { [key: number]: number } } = {};

    steps.push(`Finding LCM of ${numbers.join(', ')} using Prime Factorization Method:`);
    steps.push('');

    // Get prime factorization for each number
    numbers.forEach(num => {
      const factors = getPrimeFactorization(num);
      primeFactorization[num] = factors;
      const factorStr = Object.entries(factors)
        .map(([prime, power]) => power > 1 ? `${prime}^${power}` : prime)
        .join(' × ');
      steps.push(`${num} = ${factorStr}`);
    });

    steps.push('');
    steps.push('To find LCM, take the highest power of each prime factor:');

    // Find all unique prime factors
    const allPrimes = new Set<number>();
    Object.values(primeFactorization).forEach(factors => {
      Object.keys(factors).forEach(prime => allPrimes.add(Number(prime)));
    });

    // Calculate LCM by taking highest power of each prime
    let lcm = 1;
    const lcmFactors: { [key: number]: number } = {};

    Array.from(allPrimes).sort((a, b) => a - b).forEach(prime => {
      let maxPower = 0;
      Object.values(primeFactorization).forEach(factors => {
        if (factors[prime]) {
          maxPower = Math.max(maxPower, factors[prime]);
        }
      });
      lcmFactors[prime] = maxPower;
      lcm *= Math.pow(prime, maxPower);
      steps.push(`Prime ${prime}: highest power is ${maxPower}`);
    });

    steps.push('');
    const lcmFactorStr = Object.entries(lcmFactors)
      .map(([prime, power]) => power > 1 ? `${prime}^${power}` : prime)
      .join(' × ');
    steps.push(`LCM = ${lcmFactorStr} = ${lcm}`);

    const gcf = calculateGCDMultiple(numbers);

    return {
      numbers,
      lcm,
      gcf,
      steps,
      primeFactorization,
      method: 'Prime Factorization Method',
    };
  };

  // Calculate LCM using listing multiples method
  const calculateLCMMultiples = (numbers: number[]): LCMResult => {
    const steps: string[] = [];
    const multiples: { [key: number]: number[] } = {};
    const maxIterations = 20;

    steps.push(`Finding LCM of ${numbers.join(', ')} using Listing Multiples Method:`);
    steps.push('');

    // Generate multiples for each number
    numbers.forEach(num => {
      multiples[num] = [];
      for (let i = 1; i <= maxIterations; i++) {
        multiples[num].push(num * i);
      }
      steps.push(`Multiples of ${num}: ${multiples[num].slice(0, 10).join(', ')}...`);
    });

    steps.push('');
    steps.push('Finding common multiples:');

    // Find LCM (first common multiple)
    let lcm = numbers[0];
    let found = false;

    for (let mult of multiples[numbers[0]]) {
      let isCommon = true;
      for (let i = 1; i < numbers.length; i++) {
        if (!multiples[numbers[i]].includes(mult)) {
          isCommon = false;
          break;
        }
      }
      if (isCommon) {
        lcm = mult;
        found = true;
        break;
      }
    }

    if (!found) {
      // Fallback to formula method
      lcm = numbers.reduce((acc, num) => (acc * num) / calculateGCD(acc, num));
    }

    steps.push(`First common multiple = LCM = ${lcm}`);

    const gcf = calculateGCDMultiple(numbers);
    const primeFactorization: { [key: number]: { [key: number]: number } } = {};
    numbers.forEach(num => {
      primeFactorization[num] = getPrimeFactorization(num);
    });

    return {
      numbers,
      lcm,
      gcf,
      steps,
      primeFactorization,
      multiples,
      method: 'Listing Multiples Method',
    };
  };

  // Calculate LCM using formula (for 2 numbers)
  const calculateLCMFormula = (numbers: number[]): LCMResult => {
    const steps: string[] = [];

    if (numbers.length === 2) {
      const [a, b] = numbers;
      const gcf = calculateGCD(a, b);
      const lcm = (a * b) / gcf;

      steps.push(`Finding LCM of ${a} and ${b} using Formula Method:`);
      steps.push('');
      steps.push('Formula: LCM(a,b) = (a × b) / GCF(a,b)');
      steps.push('');
      steps.push(`Step 1: Find GCF(${a}, ${b})`);
      steps.push(`GCF(${a}, ${b}) = ${gcf}`);
      steps.push('');
      steps.push(`Step 2: Apply formula`);
      steps.push(`LCM = (${a} × ${b}) / ${gcf}`);
      steps.push(`LCM = ${a * b} / ${gcf}`);
      steps.push(`LCM = ${lcm}`);

      const primeFactorization: { [key: number]: { [key: number]: number } } = {};
      numbers.forEach(num => {
        primeFactorization[num] = getPrimeFactorization(num);
      });

      return {
        numbers,
        lcm,
        gcf,
        steps,
        primeFactorization,
        method: 'Formula Method',
      };
    } else {
      // Use prime factorization for 3+ numbers
      return calculateLCMPrime(numbers);
    }
  };

  const handleCalculate = () => {
    if (!input.trim()) {
      alert('Please enter numbers to calculate LCM');
      return;
    }

    try {
      // Parse input - support comma, space, or both
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

      if (numbers.some(n => isNaN(n) || n <= 0)) {
        alert('Please enter valid positive integers only');
        return;
      }

      if (numbers.length > 10) {
        alert('Please enter 10 or fewer numbers');
        return;
      }

      // Calculate based on selected method
      let calculationResult: LCMResult;
      switch (method) {
        case 'prime':
          calculationResult = calculateLCMPrime(numbers);
          break;
        case 'multiples':
          calculationResult = calculateLCMMultiples(numbers);
          break;
        case 'formula':
          calculationResult = calculateLCMFormula(numbers);
          break;
        default:
          calculationResult = calculateLCMPrime(numbers);
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Navigation />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-green-600 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">LCM Calculator</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <Binary className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              LCM Calculator
            </h1>
            <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
              Find the Least Common Multiple (LCM) of 2 or more numbers with step-by-step solutions. Multiple calculation methods available.
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
                  <Calculator className="w-6 h-6 text-green-600" />
                  Calculate LCM
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
                      <SelectItem value="multiples">Listing Multiples</SelectItem>
                      <SelectItem value="formula">Formula (2 numbers)</SelectItem>
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
                      placeholder="e.g., 12, 15, 75 or 12 15 75"
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
                    className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
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
                <div className="mt-6 p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">Quick Examples:</h3>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>• LCM(12, 15, 75) = 300</p>
                    <p>• LCM(6, 8) = 24</p>
                    <p>• LCM(4, 6, 12) = 12</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section (Right Side - 3 columns) */}
            <div className="lg:col-span-3">
              {result ? (
                <div className="space-y-6">
                  {/* Answer Card */}
                  <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4">Least Common Multiple</h3>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <div className="text-center">
                        <p className="text-sm mb-2">LCM({result.numbers.join(', ')})</p>
                        <p className="text-5xl md:text-6xl font-bold">{result.lcm}</p>
                      </div>
                    </div>
                    <div className="mt-4 text-center text-green-100">
                      <p className="text-sm">Method: {result.method}</p>
                    </div>
                  </div>

                  {/* GCF Info */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Additional Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-4 text-center">
                        <p className="text-sm text-gray-600 mb-2">GCF (Greatest Common Factor)</p>
                        <p className="text-3xl font-bold text-green-600">{result.gcf}</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-4 text-center">
                        <p className="text-sm text-gray-600 mb-2">Count of Numbers</p>
                        <p className="text-3xl font-bold text-teal-600">{result.numbers.length}</p>
                      </div>
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
                              {Object.entries(factors)
                                .map(([prime, power]) =>
                                  power > 1 ? `${prime}^${power}` : prime
                                )
                                .join(' × ')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step-by-Step Solution */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-green-600" />
                      Step-by-Step Solution
                    </h3>
                    <div className="space-y-3">
                      {result.steps.map((step, index) => (
                        <div key={index}>
                          {step === '' ? (
                            <div className="h-2"></div>
                          ) : (
                            <p className="text-gray-700 leading-relaxed font-mono text-sm bg-gray-50 p-3 rounded-lg">
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
                  <Binary className="w-16 h-16 text-gray-300 mx-auto mb-4" />
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
                Understanding Least Common Multiple (LCM)
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The Least Common Multiple (LCM), also known as the Lowest Common Multiple, is the smallest positive integer that is divisible by all the given numbers without leaving a remainder. For example, the LCM of 4 and 6 is 12, because 12 is the smallest number that both 4 and 6 divide into evenly.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                LCM is fundamental in mathematics and has practical applications in adding and subtracting fractions, solving problems involving cycles or patterns, scheduling, and music theory. Understanding how to find the LCM helps develop number sense and problem-solving skills essential for algebra and higher mathematics.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our LCM Calculator provides three different methods to find the Least Common Multiple: Prime Factorization (most efficient), Listing Multiples (most visual), and Formula Method (fastest for 2 numbers). Each method includes complete step-by-step explanations to help you understand the process and learn the concept thoroughly.
              </p>
            </section>

            {/* Methods */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Methods to Calculate LCM
              </h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 md:p-8">
                  <h3 className="text-xl font-bold text-green-700 mb-4">1. Prime Factorization Method (Recommended)</h3>
                  <p className="text-gray-700 mb-4">
                    This is the most efficient method for finding LCM, especially with larger numbers or multiple numbers.
                  </p>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <h4 className="font-bold text-gray-900 mb-2">Steps:</h4>
                    <ol className="space-y-2 text-gray-700">
                      <li>1. Find the prime factorization of each number</li>
                      <li>2. Identify all unique prime factors</li>
                      <li>3. For each prime factor, take the highest power that appears</li>
                      <li>4. Multiply all these together to get the LCM</li>
                    </ol>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Example: LCM(12, 18, 24)</h4>
                    <div className="space-y-1 text-sm font-mono text-gray-700">
                      <p>12 = 2² × 3</p>
                      <p>18 = 2 × 3²</p>
                      <p>24 = 2³ × 3</p>
                      <p className="mt-2">LCM = 2³ × 3² = 8 × 9 = 72</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 md:p-8">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">2. Listing Multiples Method</h3>
                  <p className="text-gray-700 mb-4">
                    This method is more visual and helps understand what LCM actually means.
                  </p>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <h4 className="font-bold text-gray-900 mb-2">Steps:</h4>
                    <ol className="space-y-2 text-gray-700">
                      <li>1. List the first several multiples of each number</li>
                      <li>2. Identify the common multiples</li>
                      <li>3. The smallest common multiple is the LCM</li>
                    </ol>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Example: LCM(4, 6)</h4>
                    <div className="space-y-1 text-sm font-mono text-gray-700">
                      <p>Multiples of 4: 4, 8, <strong>12</strong>, 16, 20, <strong>24</strong>, 28...</p>
                      <p>Multiples of 6: 6, <strong>12</strong>, 18, <strong>24</strong>, 30...</p>
                      <p className="mt-2">First common multiple = LCM = 12</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 md:p-8">
                  <h3 className="text-xl font-bold text-purple-700 mb-4">3. Formula Method (For 2 Numbers Only)</h3>
                  <p className="text-gray-700 mb-4">
                    This is the fastest method when you only have two numbers.
                  </p>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <h4 className="font-bold text-gray-900 mb-2">Formula:</h4>
                    <div className="text-center py-4">
                      <p className="text-xl font-bold text-gray-900">LCM(a, b) = (a × b) / GCF(a, b)</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Example: LCM(12, 18)</h4>
                    <div className="space-y-1 text-sm font-mono text-gray-700">
                      <p>Step 1: Find GCF(12, 18) = 6</p>
                      <p>Step 2: LCM = (12 × 18) / 6</p>
                      <p>Step 3: LCM = 216 / 6 = 36</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* How to Use */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Use This Calculator
              </h2>
              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6">
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <strong className="text-gray-900">Choose a Method:</strong>
                      <p className="text-gray-700 mt-1">Select Prime Factorization, Listing Multiples, or Formula method from the dropdown. Prime Factorization is recommended for most cases.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <strong className="text-gray-900">Enter Your Numbers:</strong>
                      <p className="text-gray-700 mt-1">Type 2-10 positive integers separated by commas or spaces. Example: "12, 15, 75" or "12 15 75".</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <strong className="text-gray-900">Calculate:</strong>
                      <p className="text-gray-700 mt-1">Click Calculate button (or press Enter) to see the LCM, GCF, prime factorizations, and complete step-by-step solution.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                    <div>
                      <strong className="text-gray-900">Study the Results:</strong>
                      <p className="text-gray-700 mt-1">Review the prime factorizations, step-by-step explanation, and GCF to fully understand how the LCM was calculated.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            {/* LCM vs GCF */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                LCM vs GCF: What's the Difference?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-600 mb-4">LCM - Least Common Multiple</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Smallest</strong> number divisible by all given numbers</li>
                    <li>• Always ≥ the largest input number</li>
                    <li>• Used for adding/subtracting fractions</li>
                    <li>• Found by taking <strong>highest powers</strong> of prime factors</li>
                    <li>• Example: LCM(4, 6) = 12</li>
                  </ul>
                </div>
                <div className="bg-white border-2 border-blue-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-blue-600 mb-4">GCF - Greatest Common Factor</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Largest</strong> number that divides all given numbers</li>
                    <li>• Always ≤ the smallest input number</li>
                    <li>• Used for simplifying fractions</li>
                    <li>• Found by taking <strong>lowest powers</strong> of prime factors</li>
                    <li>• Example: GCF(4, 6) = 2</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-xl p-6">
                <h4 className="font-bold text-gray-900 mb-2">Important Relationship:</h4>
                <p className="text-gray-700">
                  For any two numbers a and b: <strong>LCM(a,b) × GCF(a,b) = a × b</strong>
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  This relationship is used in the formula method to quickly calculate LCM from GCF.
                </p>
              </div>
            </section>

            {/* Real-World Applications */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Real-World Applications of LCM
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-green-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-600 mb-3">🧮 Adding Fractions</h3>
                  <p className="text-gray-700">
                    To add fractions with different denominators, you need to find the LCM of the denominators to get a common denominator. Example: 1/4 + 1/6 requires LCM(4,6) = 12.
                  </p>
                </div>
                <div className="bg-white border-2 border-teal-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-teal-600 mb-3">⏰ Scheduling & Cycles</h3>
                  <p className="text-gray-700">
                    If two events occur at different intervals, LCM tells you when they'll coincide. Example: If bus A comes every 15 minutes and bus B every 20 minutes, they'll arrive together every LCM(15,20) = 60 minutes.
                  </p>
                </div>
                <div className="bg-white border-2 border-green-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-600 mb-3">🎵 Music Theory</h3>
                  <p className="text-gray-700">
                    LCM is used to find when different rhythmic patterns align. If one pattern repeats every 3 beats and another every 4 beats, they align every LCM(3,4) = 12 beats.
                  </p>
                </div>
                <div className="bg-white border-2 border-teal-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-teal-600 mb-3">🔧 Gear Ratios</h3>
                  <p className="text-gray-700">
                    In mechanical engineering, LCM helps calculate when gears with different tooth counts will return to the same position. Essential for designing gear systems and timing mechanisms.
                  </p>
                </div>
                <div className="bg-white border-2 border-green-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-600 mb-3">📦 Packaging Problems</h3>
                  <p className="text-gray-700">
                    Finding the smallest quantity that can be evenly divided into different package sizes. Example: Items sold in packs of 4 and 6 - LCM(4,6) = 12 is the smallest order that can be packaged either way.
                  </p>
                </div>
                <div className="bg-white border-2 border-teal-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-teal-600 mb-3">🌙 Astronomy</h3>
                  <p className="text-gray-700">
                    Calculating when celestial events align, such as when planets return to the same relative positions. LCM of their orbital periods determines synchronization points.
                  </p>
                </div>
              </div>
            </section>

            {/* Common Mistakes */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Common Mistakes When Finding LCM
              </h2>
              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Confusing LCM with GCF</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> LCM(4, 6) = 2 (that's the GCF!)
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> LCM(4, 6) = 12 ✓
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Remember: LCM is always ≥ the largest number, GCF is always ≤ the smallest number.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Just Multiplying All Numbers</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> LCM(4, 6) = 4 × 6 = 24 ✗
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> LCM(4, 6) = 12 ✓
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Multiplying gives a common multiple, but not necessarily the least one.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Missing Prime Factors</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> 12 = 2 × 6, so LCM(12, 18) uses 6 as a factor ✗
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> 12 = 2² × 3, fully factor into primes ✓
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Always break down completely into prime factors.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Using Lowest Powers Instead of Highest</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> For 2² and 2³, use 2² in LCM ✗
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> For 2² and 2³, use 2³ in LCM ✓
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    LCM uses highest powers (GCF uses lowest powers).
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">❌ Stopping at First Common Multiple in Listing Method</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Wrong:</strong> 24 is common to 4 and 6, so that's the LCM ✗
                  </p>
                  <p className="text-gray-700">
                    <strong>Correct:</strong> Check smaller multiples first; LCM(4,6) = 12 ✓
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Find the LEAST (smallest) common multiple, not just any common multiple.
                  </p>
                </div>
              </div>
            </section>

            {/* Tips and Tricks */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Tips and Tricks for Finding LCM
              </h2>
              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Quick Check for Multiples:</strong>
                      <p className="text-gray-700 mt-1">
                        If one number is a multiple of the other, the larger number IS the LCM. Example: LCM(6, 12) = 12.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Use the Formula for 2 Numbers:</strong>
                      <p className="text-gray-700 mt-1">
                        For just 2 numbers, LCM(a,b) = (a × b) / GCF(a,b) is faster than prime factorization.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Co-prime Numbers:</strong>
                      <p className="text-gray-700 mt-1">
                        If numbers share no common factors (co-prime), their LCM is simply their product. Example: LCM(7, 11) = 77.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Prime Number Trick:</strong>
                      <p className="text-gray-700 mt-1">
                        The LCM of any numbers with a prime number among them will always be a multiple of that prime.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <strong className="text-gray-900">Verify Your Answer:</strong>
                      <p className="text-gray-700 mt-1">
                        The LCM should be divisible by each of the original numbers. Quickly divide to check your work.
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
                    What is the LCM of 0 and any number?
                  </h3>
                  <p className="text-gray-700">
                    Technically, LCM is undefined for 0 because every number is a divisor of 0, so there's no "least" common multiple. In practice, we only find LCM of positive integers. Our calculator requires positive integers only.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can LCM be smaller than one of the numbers?
                  </h3>
                  <p className="text-gray-700">
                    No, the LCM is always greater than or equal to the largest number in the set. It must be a multiple of each number, so it can't be smaller than any of them. The only time LCM equals the largest number is when that number is already a multiple of all the others.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How is LCM different from LCD?
                  </h3>
                  <p className="text-gray-700">
                    LCD (Least Common Denominator) is the LCM of the denominators of two or more fractions. They're the same mathematical concept - LCD is just LCM applied specifically to fraction denominators. When adding fractions, you find the LCD to get a common denominator.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What's the LCM of two prime numbers?
                  </h3>
                  <p className="text-gray-700">
                    The LCM of two prime numbers is always their product. Since prime numbers share no common factors (their GCF is 1), you multiply them together. For example, LCM(7, 11) = 77, and LCM(3, 5) = 15.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Why do we need LCM for adding fractions?
                  </h3>
                  <p className="text-gray-700">
                    To add fractions, they must have the same denominator. The LCM of the denominators gives us the smallest common denominator, making the calculation easier and resulting in a simpler answer. For example, to add 1/4 + 1/6, we use LCM(4,6) = 12 as the common denominator.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What if all numbers are the same?
                  </h3>
                  <p className="text-gray-700">
                    If all numbers are identical, the LCM is that number itself. For example, LCM(5, 5, 5) = 5. This makes sense because the number is already a multiple of itself and is the smallest such multiple.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can I find LCM of negative numbers?
                  </h3>
                  <p className="text-gray-700">
                    LCM is typically defined only for positive integers. While you could extend the concept to negative numbers, the standard mathematical definition and most practical applications use only positive integers. Our calculator works with positive integers only.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How many numbers can I find the LCM of at once?
                  </h3>
                  <p className="text-gray-700">
                    Mathematically, you can find the LCM of any quantity of numbers. Our calculator supports 2-10 numbers at once, which covers the vast majority of practical applications. To find LCM of more numbers, you can find it in groups, then find the LCM of those results.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Is there a maximum value for LCM?
                  </h3>
                  <p className="text-gray-700">
                    The LCM can be as large as the product of all the numbers (which happens when the numbers are co-prime). For very large numbers or many numbers, the LCM can become extremely large. Our calculator handles numbers up to standard JavaScript integer limits.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Which method is fastest for finding LCM?
                  </h3>
                  <p className="text-gray-700">
                    For 2 numbers, the formula method (using GCF) is fastest. For 3+ numbers, prime factorization is most efficient. Listing multiples works well for small numbers but becomes tedious with larger numbers. Prime factorization is recommended as the general-purpose method.
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
                Understanding the Least Common Multiple is essential for mastering fractions, solving mathematical problems, and recognizing patterns in everyday situations. Whether you're a student learning to add fractions, a teacher preparing lessons, or someone working on scheduling or engineering problems, finding the LCM is a valuable skill.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our LCM Calculator provides three different methods—Prime Factorization, Listing Multiples, and Formula Method—each with complete step-by-step explanations. This not only gives you quick answers but helps you understand the underlying mathematics and learn the most efficient approaches for different situations.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Use this calculator to check your homework, learn new methods, solve real-world problems, or simply explore the fascinating patterns in number theory. Remember that practice and understanding go hand-in-hand—the more you work with LCM, the more intuitive it becomes. Happy calculating!
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
              Need Help with LCM, GCF, and Number Theory?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you master LCM, GCF, prime factorization, and excel in mathematics. Get personalized one-on-one guidance tailored to your learning style.
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
