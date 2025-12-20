'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function FactoringCalculator() {
  const [number, setNumber] = useState<string>('48');
  const [result, setResult] = useState<{
    factors: number[];
    factorPairs: [number, number][];
    count: number;
  } | null>(null);

  const findFactors = (num: number): number[] => {
    const factors: number[] = [];
    const absNum = Math.abs(num);

    for (let i = 1; i <= Math.sqrt(absNum); i++) {
      if (absNum % i === 0) {
        factors.push(i);
        if (i !== absNum / i) {
          factors.push(absNum / i);
        }
      }
    }

    return factors.sort((a, b) => a - b);
  };

  const findFactorPairs = (num: number): [number, number][] => {
    const pairs: [number, number][] = [];
    const absNum = Math.abs(num);

    for (let i = 1; i <= Math.sqrt(absNum); i++) {
      if (absNum % i === 0) {
        pairs.push([i, absNum / i]);
      }
    }

    return pairs;
  };

  const handleCalculate = () => {
    const num = parseInt(number);

    if (isNaN(num) || num === 0) {
      alert('Please enter a valid non-zero integer.');
      return;
    }

    const factors = findFactors(num);
    const factorPairs = findFactorPairs(num);

    setResult({
      factors,
      factorPairs,
      count: factors.length,
    });
  };

  const handleClear = () => {
    setNumber('48');
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-8 mt-20 mb-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A3D7C] mb-4">
            Factoring Calculator
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Find all factors and factor pairs of any number with step-by-step solutions. Perfect for homework, learning divisibility, and understanding number theory.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Calculator Section */}
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 border-t-4 border-orange-700">
            <div className="bg-gradient-to-r from-orange-700 to-red-700 text-white text-center py-3 rounded-lg mb-6">
              <h2 className="text-xl md:text-2xl font-bold">Factoring Calculator</h2>
            </div>

            <p className="text-center text-gray-700 font-semibold mb-6">
              Find the Factors of:
            </p>

            {/* Number Input */}
            <div className="mb-6">
              <Input
                id="number"
                type="number"
                step="1"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="text-2xl p-4 border-2 border-gray-300 focus:border-orange-500 text-center font-semibold"
                placeholder="Enter a number"
              />
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
                <div className="space-y-6">
                  {/* Factors List */}
                  <div>
                    <p className="text-lg font-semibold text-gray-800 mb-3">
                      The {result.count} factors of {number} are:
                    </p>
                    <p className="text-xl text-blue-600 font-semibold">
                      {result.factors.join(', ')}
                    </p>
                  </div>

                  {/* Factor Pairs */}
                  <div className="border-t-2 border-gray-300 pt-4">
                    <p className="text-lg font-semibold text-gray-800 mb-3">
                      The factor pairs of {number} are:
                    </p>
                    <div className="space-y-2">
                      {result.factorPairs.map((pair, index) => (
                        <p key={index} className="text-lg text-gray-700">
                          <span className="font-semibold">{pair[0]}</span> × <span className="font-semibold">{pair[1]}</span> = {number}
                        </p>
                      ))}
                    </div>
                  </div>
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
                    How to find the factors of {number}
                  </h4>

                  <div className="space-y-4 text-lg">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                      <p className="font-semibold mb-2">Step 1: Understanding Factors</p>
                      <p className="text-base">
                        Factors are whole numbers that divide evenly into {number} with no remainder. We test each number from 1 up to {number}.
                      </p>
                    </div>

                    <div className="bg-green-50 border-l-4 border-green-500 p-4">
                      <p className="font-semibold mb-2">Step 2: Testing Divisibility</p>
                      <div className="text-base space-y-2">
                        <p>We check which numbers divide {number} evenly:</p>
                        {result.factors.map((factor) => (
                          <p key={factor} className="ml-4">
                            {number} ÷ {factor} = {parseInt(number) / factor} ✓ (no remainder)
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                      <p className="font-semibold mb-2">Step 3: List All Factors</p>
                      <p className="text-base">
                        All numbers that divide {number} evenly are: <span className="font-semibold text-blue-600">{result.factors.join(', ')}</span>
                      </p>
                      <p className="text-base mt-2">
                        Total: <span className="font-semibold">{result.count} factors</span>
                      </p>
                    </div>

                    <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
                      <p className="font-semibold mb-2">Step 4: Factor Pairs</p>
                      <div className="text-base space-y-1">
                        <p className="mb-2">Factors can be paired to multiply back to {number}:</p>
                        {result.factorPairs.map((pair, index) => (
                          <p key={index} className="ml-4">
                            {pair[0]} × {pair[1]} = {number}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                      <p className="text-xl font-bold text-gray-800">
                        Final Answer: {result.count} factors
                      </p>
                      <p className="text-base text-gray-700 mt-2">
                        Factors: {result.factors.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!result && (
              <div className="text-center text-gray-500 py-12">
                <p className="text-lg">Enter a number and click Calculate to see all factors and factor pairs</p>
              </div>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">What are Factors?</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p className="text-lg leading-relaxed">
              Factors (also called divisors) are whole numbers that divide evenly into another number with no remainder. In other words, when you divide a number by one of its factors, the result is always a whole number. Every positive integer has at least two factors: 1 and itself.
            </p>
            <p className="text-lg leading-relaxed">
              Understanding factors is fundamental to number theory and is essential for learning about divisibility, prime numbers, greatest common factors (GCF), least common multiples (LCM), simplifying fractions, and solving many types of algebraic equations.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
              <h3 className="text-xl font-bold mb-3">Example:</h3>
              <p className="text-lg mb-3">
                The factors of 12 are: 1, 2, 3, 4, 6, and 12
              </p>
              <p className="text-base">
                This is because 12 can be divided evenly by each of these numbers:
              </p>
              <ul className="space-y-1 mt-2 ml-6">
                <li>12 ÷ 1 = 12</li>
                <li>12 ÷ 2 = 6</li>
                <li>12 ÷ 3 = 4</li>
                <li>12 ÷ 4 = 3</li>
                <li>12 ÷ 6 = 2</li>
                <li>12 ÷ 12 = 1</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">How to Find Factors</h2>
          <div className="prose max-w-none text-gray-700">
            <p className="text-lg mb-6">There are several methods to find all factors of a number:</p>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 mb-3">Method 1: Division Method</h3>
                <p className="text-base mb-3">
                  Test each number from 1 up to the number you're factoring:
                </p>
                <ol className="space-y-2 ml-6 text-base">
                  <li>1. Start with 1 (always a factor)</li>
                  <li>2. Try dividing by 2, 3, 4, 5, etc.</li>
                  <li>3. If the division results in a whole number, both the divisor and quotient are factors</li>
                  <li>4. Continue until you reach the number itself</li>
                </ol>
                <div className="bg-white p-4 rounded mt-4">
                  <p className="font-semibold">Example: Finding factors of 20</p>
                  <p className="text-sm mt-2">20 ÷ 1 = 20 → factors: 1, 20</p>
                  <p className="text-sm">20 ÷ 2 = 10 → factors: 2, 10</p>
                  <p className="text-sm">20 ÷ 4 = 5 → factors: 4, 5</p>
                  <p className="text-sm mt-2 font-semibold">All factors: 1, 2, 4, 5, 10, 20</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-3">Method 2: Pair Method (More Efficient)</h3>
                <p className="text-base mb-3">
                  Only test numbers up to the square root of the number:
                </p>
                <ol className="space-y-2 ml-6 text-base">
                  <li>1. Find the square root of the number</li>
                  <li>2. Test only numbers from 1 to the square root</li>
                  <li>3. When you find a factor, also record its pair (number ÷ factor)</li>
                  <li>4. This reduces the number of tests needed</li>
                </ol>
                <div className="bg-white p-4 rounded mt-4">
                  <p className="font-semibold">Example: Finding factors of 36</p>
                  <p className="text-sm mt-2">√36 = 6, so test 1 to 6</p>
                  <p className="text-sm mt-2">36 ÷ 1 = 36 → 1 and 36</p>
                  <p className="text-sm">36 ÷ 2 = 18 → 2 and 18</p>
                  <p className="text-sm">36 ÷ 3 = 12 → 3 and 12</p>
                  <p className="text-sm">36 ÷ 4 = 9 → 4 and 9</p>
                  <p className="text-sm">36 ÷ 6 = 6 → 6 (pair with itself)</p>
                  <p className="text-sm mt-2 font-semibold">All factors: 1, 2, 3, 4, 6, 9, 12, 18, 36</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-200">
                <h3 className="text-xl font-bold text-purple-800 mb-3">Method 3: Prime Factorization</h3>
                <p className="text-base mb-3">
                  Break the number into its prime factors, then find all combinations:
                </p>
                <ol className="space-y-2 ml-6 text-base">
                  <li>1. Find the prime factorization of the number</li>
                  <li>2. List all possible combinations of the prime factors</li>
                  <li>3. Each combination is a factor</li>
                </ol>
                <div className="bg-white p-4 rounded mt-4">
                  <p className="font-semibold">Example: Finding factors of 24</p>
                  <p className="text-sm mt-2">24 = 2³ × 3¹</p>
                  <p className="text-sm mt-2">Possible combinations:</p>
                  <p className="text-sm">2⁰ × 3⁰ = 1</p>
                  <p className="text-sm">2¹ × 3⁰ = 2</p>
                  <p className="text-sm">2² × 3⁰ = 4</p>
                  <p className="text-sm">2³ × 3⁰ = 8</p>
                  <p className="text-sm">2⁰ × 3¹ = 3</p>
                  <p className="text-sm">2¹ × 3¹ = 6</p>
                  <p className="text-sm">2² × 3¹ = 12</p>
                  <p className="text-sm">2³ × 3¹ = 24</p>
                  <p className="text-sm mt-2 font-semibold">All factors: 1, 2, 3, 4, 6, 8, 12, 24</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Factor Pairs</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p className="text-lg leading-relaxed">
              Factor pairs are two numbers that multiply together to give the original number. Every factor has a corresponding pair factor. Finding factor pairs is useful for understanding multiplication, division, and for working with rectangular arrays in geometry.
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 my-6">
              <h3 className="text-xl font-bold mb-3">How to Find Factor Pairs:</h3>
              <ol className="space-y-3 ml-6 text-lg">
                <li>1. Start with 1 and the number itself (always a pair)</li>
                <li>2. Find the next smallest factor</li>
                <li>3. Divide the number by that factor to find its pair</li>
                <li>4. Continue until factors start repeating</li>
              </ol>
              <div className="bg-white p-4 rounded mt-4">
                <p className="font-semibold text-lg">Example: Factor pairs of 48</p>
                <div className="space-y-1 mt-3 text-base">
                  <p>1 × 48 = 48</p>
                  <p>2 × 24 = 48</p>
                  <p>3 × 16 = 48</p>
                  <p>4 × 12 = 48</p>
                  <p>6 × 8 = 48</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Types of Numbers Based on Factors</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-3">Prime Numbers</h3>
              <p className="text-gray-700 mb-3">
                Numbers with exactly 2 factors: 1 and itself.
              </p>
              <div className="bg-white p-3 rounded">
                <p className="font-semibold text-sm">Examples:</p>
                <p className="text-sm mt-1">2 (factors: 1, 2)</p>
                <p className="text-sm">3 (factors: 1, 3)</p>
                <p className="text-sm">5 (factors: 1, 5)</p>
                <p className="text-sm">7 (factors: 1, 7)</p>
                <p className="text-sm">11 (factors: 1, 11)</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-3">Composite Numbers</h3>
              <p className="text-gray-700 mb-3">
                Numbers with more than 2 factors.
              </p>
              <div className="bg-white p-3 rounded">
                <p className="font-semibold text-sm">Examples:</p>
                <p className="text-sm mt-1">4 (factors: 1, 2, 4)</p>
                <p className="text-sm">6 (factors: 1, 2, 3, 6)</p>
                <p className="text-sm">8 (factors: 1, 2, 4, 8)</p>
                <p className="text-sm">9 (factors: 1, 3, 9)</p>
                <p className="text-sm">10 (factors: 1, 2, 5, 10)</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-200">
              <h3 className="text-xl font-bold text-purple-800 mb-3">Perfect Squares</h3>
              <p className="text-gray-700 mb-3">
                Numbers with an odd number of factors.
              </p>
              <div className="bg-white p-3 rounded">
                <p className="font-semibold text-sm">Examples:</p>
                <p className="text-sm mt-1">1 (factors: 1)</p>
                <p className="text-sm">4 (factors: 1, 2, 4)</p>
                <p className="text-sm">9 (factors: 1, 3, 9)</p>
                <p className="text-sm">16 (factors: 1, 2, 4, 8, 16)</p>
                <p className="text-sm">25 (factors: 1, 5, 25)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Applications of Factors</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border-2 border-orange-200">
              <h3 className="text-xl font-bold text-orange-800 mb-3">Mathematics</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Simplifying fractions</li>
                <li>• Finding GCF and LCM</li>
                <li>• Solving algebraic equations</li>
                <li>• Prime factorization</li>
                <li>• Number theory problems</li>
                <li>• Divisibility rules</li>
                <li>• Modular arithmetic</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border-2 border-red-200">
              <h3 className="text-xl font-bold text-red-800 mb-3">Real-World Uses</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Arranging objects in equal groups</li>
                <li>• Dividing items evenly</li>
                <li>• Creating rectangular arrays</li>
                <li>• Scheduling and time management</li>
                <li>• Resource allocation</li>
                <li>• Music theory (rhythm divisions)</li>
                <li>• Computer science algorithms</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-lg border-2 border-teal-200">
              <h3 className="text-xl font-bold text-teal-800 mb-3">Problem Solving</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Area and perimeter problems</li>
                <li>• Rectangular garden layouts</li>
                <li>• Tile arrangement patterns</li>
                <li>• Packaging and containers</li>
                <li>• Team formation</li>
                <li>• Time interval calculations</li>
                <li>• Measurement conversions</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-lg border-2 border-indigo-200">
              <h3 className="text-xl font-bold text-indigo-800 mb-3">Advanced Topics</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Cryptography and security</li>
                <li>• Number patterns and sequences</li>
                <li>• Optimization problems</li>
                <li>• Graph theory</li>
                <li>• Combinatorics</li>
                <li>• Digital signal processing</li>
                <li>• Error detection codes</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Common Factor Patterns</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-gray-300">
              <thead>
                <tr className="bg-gradient-to-r from-orange-700 to-red-700 text-white">
                  <th className="border-2 border-gray-300 p-4 text-left">Number</th>
                  <th className="border-2 border-gray-300 p-4 text-left">Factors</th>
                  <th className="border-2 border-gray-300 p-4 text-left">Count</th>
                  <th className="border-2 border-gray-300 p-4 text-left">Type</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 p-4 font-semibold">12</td>
                  <td className="border-2 border-gray-300 p-4">1, 2, 3, 4, 6, 12</td>
                  <td className="border-2 border-gray-300 p-4">6</td>
                  <td className="border-2 border-gray-300 p-4">Composite</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 p-4 font-semibold">24</td>
                  <td className="border-2 border-gray-300 p-4">1, 2, 3, 4, 6, 8, 12, 24</td>
                  <td className="border-2 border-gray-300 p-4">8</td>
                  <td className="border-2 border-gray-300 p-4">Composite</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 p-4 font-semibold">36</td>
                  <td className="border-2 border-gray-300 p-4">1, 2, 3, 4, 6, 9, 12, 18, 36</td>
                  <td className="border-2 border-gray-300 p-4">9</td>
                  <td className="border-2 border-gray-300 p-4">Perfect Square</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 p-4 font-semibold">48</td>
                  <td className="border-2 border-gray-300 p-4">1, 2, 3, 4, 6, 8, 12, 16, 24, 48</td>
                  <td className="border-2 border-gray-300 p-4">10</td>
                  <td className="border-2 border-gray-300 p-4">Composite</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 p-4 font-semibold">60</td>
                  <td className="border-2 border-gray-300 p-4">1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60</td>
                  <td className="border-2 border-gray-300 p-4">12</td>
                  <td className="border-2 border-gray-300 p-4">Highly Composite</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 p-4 font-semibold">100</td>
                  <td className="border-2 border-gray-300 p-4">1, 2, 4, 5, 10, 20, 25, 50, 100</td>
                  <td className="border-2 border-gray-300 p-4">9</td>
                  <td className="border-2 border-gray-300 p-4">Perfect Square</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Frequently Asked Questions (FAQ)</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">What is the difference between factors and multiples?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Factors divide into a number evenly (12 ÷ 3 = 4, so 3 is a factor of 12), while multiples are the result of multiplying a number by whole numbers (12 × 3 = 36, so 36 is a multiple of 12). Factors are smaller than or equal to the number, while multiples are larger than or equal to the number.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Can negative numbers have factors?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Yes, negative numbers have factors. The factors of -12 include both positive and negative divisors: ±1, ±2, ±3, ±4, ±6, ±12. However, when we talk about factors in elementary mathematics, we typically refer only to positive factors for simplicity. This calculator shows positive factors.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">What is the fastest way to find all factors?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                The most efficient method is to test only numbers up to the square root of the number. For example, for 100, you only need to test 1 through 10. When you find a factor (like 2), you automatically know its pair (100 ÷ 2 = 50). This cuts the work roughly in half and is the method used by this calculator.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">How many factors does a prime number have?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                A prime number has exactly 2 factors: 1 and itself. This is the defining characteristic of prime numbers. For example, 7 has only two factors (1 and 7), 13 has only two factors (1 and 13), and 29 has only two factors (1 and 29). The number 1 is special—it has only one factor (itself) and is neither prime nor composite.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Why do perfect squares have an odd number of factors?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Perfect squares have an odd number of factors because one factor pairs with itself. For example, 36 = 6 × 6. All other factors come in pairs (1 and 36, 2 and 18, 3 and 12, 4 and 9), but 6 pairs with itself, giving 36 a total of 9 factors (an odd number). This pattern applies to all perfect squares.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">What number has the most factors?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                There's no single answer—larger numbers tend to have more factors, but it depends on the number's prime factorization. Numbers with many small prime factors have more divisors. For example, 120 has 16 factors, and 840 has 32 factors. Highly composite numbers are defined as having more factors than any smaller positive integer.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">How do I find the GCF using factors?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To find the Greatest Common Factor (GCF) of two numbers, list all factors of each number, then identify the largest factor that appears in both lists. For example, factors of 12 are {1, 2, 3, 4, 6, 12} and factors of 18 are {1, 2, 3, 6, 9, 18}. The common factors are {1, 2, 3, 6}, so the GCF is 6.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Can 0 or 1 have factors?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Zero is divisible by every number (except zero itself), so it has infinitely many factors. The number 1 has exactly one factor: itself. Because 1 only has one factor rather than two or more, it is classified as neither prime nor composite—it's a special case called a unit in number theory.
              </p>
            </div>
          </div>
        </div>

        {/* Book Your Session CTA */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-xl shadow-2xl p-8 md:p-12 text-center text-white mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help with Math Concepts?</h2>
          <p className="text-xl mb-6 text-gray-100">
            Our expert tutors can help you master factors, divisibility, prime numbers, and all math topics
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
