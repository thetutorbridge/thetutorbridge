'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, Hash, TrendingUp, CheckCircle, HelpCircle, Lightbulb, Home, BookOpen, ArrowRight, BarChart3, Target, ListOrdered, Percent, AlertTriangle, Plus, Trash2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import Link from 'next/link';

interface AverageResult {
  mean: number;
  median: number;
  mode: number[] | null;
  range: number;
  sum: number;
  count: number;
  min: number;
  max: number;
  sortedValues: number[];
  variance: number;
  standardDeviation: number;
}

export default function AverageCalculatorPage() {
  // Input state
  const [inputText, setInputText] = useState<string>('');
  const [result, setResult] = useState<AverageResult | null>(null);
  const [error, setError] = useState<string>('');

  // Parse numbers from input string
  const parseNumbers = (text: string): number[] => {
    if (!text.trim()) return [];

    // Split by commas, spaces, newlines, or tabs
    const parts = text.split(/[,\s\n\t]+/).filter(part => part.trim() !== '');
    const numbers: number[] = [];

    for (const part of parts) {
      const num = parseFloat(part.trim());
      if (!isNaN(num)) {
        numbers.push(num);
      }
    }

    return numbers;
  };

  // Calculate mean
  const calculateMean = (numbers: number[]): number => {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, val) => acc + val, 0);
    return sum / numbers.length;
  };

  // Calculate median
  const calculateMedian = (numbers: number[]): number => {
    if (numbers.length === 0) return 0;
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      return (sorted[mid - 1] + sorted[mid]) / 2;
    }
    return sorted[mid];
  };

  // Calculate mode
  const calculateMode = (numbers: number[]): number[] | null => {
    if (numbers.length === 0) return null;

    const frequency: { [key: number]: number } = {};
    let maxFreq = 0;

    for (const num of numbers) {
      frequency[num] = (frequency[num] || 0) + 1;
      if (frequency[num] > maxFreq) {
        maxFreq = frequency[num];
      }
    }

    // If all values appear only once, there's no mode
    if (maxFreq === 1) return null;

    const modes = Object.entries(frequency)
      .filter(([, freq]) => freq === maxFreq)
      .map(([num]) => parseFloat(num));

    // If all values have same frequency, no mode
    if (modes.length === numbers.length) return null;

    return modes.sort((a, b) => a - b);
  };

  // Calculate variance
  const calculateVariance = (numbers: number[], mean: number): number => {
    if (numbers.length === 0) return 0;
    const squaredDiffs = numbers.map(num => Math.pow(num - mean, 2));
    return squaredDiffs.reduce((acc, val) => acc + val, 0) / numbers.length;
  };

  // Main calculation function
  const calculateAverage = () => {
    setError('');
    const numbers = parseNumbers(inputText);

    if (numbers.length === 0) {
      setError('Please enter at least one valid number');
      setResult(null);
      return;
    }

    const sorted = [...numbers].sort((a, b) => a - b);
    const sum = numbers.reduce((acc, val) => acc + val, 0);
    const mean = calculateMean(numbers);
    const median = calculateMedian(numbers);
    const mode = calculateMode(numbers);
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    const range = max - min;
    const variance = calculateVariance(numbers, mean);
    const standardDeviation = Math.sqrt(variance);

    setResult({
      mean,
      median,
      mode,
      range,
      sum,
      count: numbers.length,
      min,
      max,
      sortedValues: sorted,
      variance,
      standardDeviation,
    });
  };

  // Auto-calculate on input change
  useEffect(() => {
    if (inputText.trim()) {
      calculateAverage();
    } else {
      setResult(null);
      setError('');
    }
  }, [inputText]);

  const handleClear = () => {
    setInputText('');
    setResult(null);
    setError('');
  };

  const formatNumber = (num: number): string => {
    if (Number.isInteger(num)) {
      return num.toLocaleString('en-IN');
    }
    return num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 px-6">
        <div className="container mx-auto max-w-6xl">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/calculators" className="text-[#1A3D7C] hover:text-[#2BAE66]">
              Calculators
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Average Calculator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <BarChart3 className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Average Calculator</h1>
            </div>
            <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
              Calculate the average (mean), median, mode, and range of any set of numbers. Enter values separated by spaces or commas for instant results.
            </p>
          </div>
        </div>

        {/* Main Calculator Section */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Calculator Card */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-2 border-gray-200 mb-8">
            {/* Data Entry Instructions */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Data entry and instructions</h2>
              <p className="text-gray-700">
                Enter a list of numbers you would like to calculate the average of. You can <strong>separate</strong> the values with either <strong>spaces</strong> or <strong>commas</strong>.
              </p>
            </div>

            {/* Input Field */}
            <div className="mb-6">
              <Label className="text-lg font-semibold text-gray-700 mb-3 block">
                List of numbers to average
              </Label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="e.g., 10 20 30 40 50 or 10, 20, 30, 40, 50"
                className="w-full h-32 p-4 text-lg border-2 border-gray-200 rounded-lg focus:border-[#2BAE66] focus:ring-2 focus:ring-[#2BAE66]/20 transition-all resize-none"
              />
              {error && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {error}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-6">
              <Button
                onClick={calculateAverage}
                className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white px-8 py-6 text-lg font-semibold rounded-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Calculate Average
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                className="px-8 py-6 text-lg font-semibold rounded-lg border-gray-400 text-gray-600 hover:bg-gray-100"
              >
                Clear all
              </Button>
            </div>

            {/* Results Section */}
            <div className="border-t-2 border-gray-200 pt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Results</h2>

              {result ? (
                <div className="space-y-6">
                  {/* Primary Result - Mean */}
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg border-2 border-blue-200">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-1">Average (Mean)</p>
                        <p className="text-4xl md:text-5xl font-bold text-[#1A3D7C]">
                          {formatNumber(result.mean)}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-1">Sum of Values</p>
                        <p className="text-4xl md:text-5xl font-bold text-[#2BAE66]">
                          {formatNumber(result.sum)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 bg-white p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-600">Formula:</p>
                      <p className="font-mono text-lg">
                        x̄ = <span className="inline-flex flex-col items-center mx-1">
                          <span className="border-b border-gray-800 px-2">Σx</span>
                          <span className="px-2">n</span>
                        </span> = <span className="inline-flex flex-col items-center mx-1">
                          <span className="border-b border-gray-800 px-2">{formatNumber(result.sum)}</span>
                          <span className="px-2">{result.count}</span>
                        </span> = {formatNumber(result.mean)}
                      </p>
                    </div>
                  </div>

                  {/* Other Statistics */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white border-2 border-gray-200 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Median</p>
                      <p className="text-2xl font-bold text-[#1A3D7C]">{formatNumber(result.median)}</p>
                      <p className="text-xs text-gray-500 mt-1">Middle value</p>
                    </div>
                    <div className="bg-white border-2 border-gray-200 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Mode</p>
                      <p className="text-2xl font-bold text-[#1A3D7C]">
                        {result.mode ? result.mode.join(', ') : 'None'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Most frequent</p>
                    </div>
                    <div className="bg-white border-2 border-gray-200 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Range</p>
                      <p className="text-2xl font-bold text-[#1A3D7C]">{formatNumber(result.range)}</p>
                      <p className="text-xs text-gray-500 mt-1">Max - Min</p>
                    </div>
                    <div className="bg-white border-2 border-gray-200 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Count</p>
                      <p className="text-2xl font-bold text-[#1A3D7C]">{result.count}</p>
                      <p className="text-xs text-gray-500 mt-1">Number of values</p>
                    </div>
                  </div>

                  {/* Additional Statistics */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Minimum</p>
                      <p className="text-xl font-bold text-gray-800">{formatNumber(result.min)}</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Maximum</p>
                      <p className="text-xl font-bold text-gray-800">{formatNumber(result.max)}</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Variance (σ²)</p>
                      <p className="text-xl font-bold text-gray-800">{formatNumber(result.variance)}</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Std. Deviation (σ)</p>
                      <p className="text-xl font-bold text-gray-800">{formatNumber(result.standardDeviation)}</p>
                    </div>
                  </div>

                  {/* Sorted Values */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                    <p className="text-sm text-gray-600 mb-2">Sorted Values (ascending):</p>
                    <p className="font-mono text-gray-800 break-all">
                      {result.sortedValues.map(v => formatNumber(v)).join(', ')}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-xl font-semibold text-gray-600">Enter some values!</p>
                  <p className="text-gray-500 mt-2">Type numbers above to see results</p>
                </div>
              )}
            </div>
          </div>

          {/* What is Average Calculator Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">What is an Average Calculator?</h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p className="text-lg leading-relaxed">
                An <strong>Average Calculator</strong> is a mathematical tool that computes the central tendency of a set of numbers. The most common type of average is the <strong>arithmetic mean</strong>, which is found by summing all values and dividing by the number of values.
              </p>
              <p className="text-lg leading-relaxed">
                The mathematical formula for calculating the arithmetic mean is:
              </p>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200 my-4">
                <p className="text-center text-2xl font-mono">
                  x̄ = <span className="inline-flex flex-col items-center mx-2">
                    <span className="border-b-2 border-gray-800 px-3">x₁ + x₂ + x₃ + ... + xₙ</span>
                    <span className="px-3 mt-1">n</span>
                  </span> = <span className="inline-flex flex-col items-center mx-2">
                    <span className="border-b-2 border-gray-800 px-3">Σx</span>
                    <span className="px-3 mt-1">n</span>
                  </span>
                </p>
                <p className="text-center mt-3 text-gray-600">
                  Where x̄ is the mean, Σx is the sum of all values, and n is the count
                </p>
              </div>
              <p className="text-lg leading-relaxed">
                This calculator also computes other important statistical measures including <strong>median</strong> (middle value), <strong>mode</strong> (most frequent value), and <strong>range</strong> (difference between max and min), providing a complete picture of your data's central tendency.
              </p>
            </div>
          </div>

          {/* Types of Averages Section */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl border-2 border-indigo-200 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Types of Averages Explained</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-[#2BAE66]" />
                  Mean (Arithmetic Average)
                </h3>
                <p className="text-gray-700 mb-3">
                  The sum of all values divided by the count of values. Most commonly used average.
                </p>
                <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                  <p>Mean = Σx ÷ n</p>
                  <p className="text-gray-600 mt-1">Example: (10+20+30) ÷ 3 = 20</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3 flex items-center">
                  <ListOrdered className="w-5 h-5 mr-2 text-[#2BAE66]" />
                  Median
                </h3>
                <p className="text-gray-700 mb-3">
                  The middle value when data is sorted. If even count, average of two middle values.
                </p>
                <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                  <p>Sorted: 5, 10, <strong>15</strong>, 20, 25</p>
                  <p className="text-gray-600 mt-1">Median = 15 (middle value)</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3 flex items-center">
                  <Hash className="w-5 h-5 mr-2 text-[#2BAE66]" />
                  Mode
                </h3>
                <p className="text-gray-700 mb-3">
                  The value that appears most frequently in the dataset. Can have multiple modes.
                </p>
                <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                  <p>Data: 5, 10, 10, 15, 10, 20</p>
                  <p className="text-gray-600 mt-1">Mode = 10 (appears 3 times)</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-[#2BAE66]" />
                  Range
                </h3>
                <p className="text-gray-700 mb-3">
                  The difference between the largest and smallest values in the dataset.
                </p>
                <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                  <p>Range = Max - Min</p>
                  <p className="text-gray-600 mt-1">Example: 100 - 20 = 80</p>
                </div>
              </div>
            </div>
          </div>

          {/* How to Use Section */}
          <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-xl border-2 border-blue-200 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">How to Use the Average Calculator</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-[#2BAE66] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Enter Your Numbers</h3>
                  <p className="text-gray-700">Type your numbers in the text box. Separate them with spaces, commas, or new lines. Example: "10 20 30 40" or "10, 20, 30, 40"</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#2BAE66] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">View Instant Results</h3>
                  <p className="text-gray-700">The calculator automatically computes and displays the mean, median, mode, range, and other statistics as you type.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#2BAE66] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Analyze the Statistics</h3>
                  <p className="text-gray-700">Review all computed values including mean, median, mode, range, variance, and standard deviation for comprehensive data analysis.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Practical Examples Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Practical Examples</h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Example 1: Test Scores Average</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Given:</strong></p>
                    <p className="text-gray-600">Test scores: 85, 90, 78, 92, 88</p>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Solution:</strong></p>
                    <div className="bg-white p-3 rounded font-mono text-sm">
                      <p>Sum = 85 + 90 + 78 + 92 + 88 = 433</p>
                      <p>Count = 5</p>
                      <p className="text-[#2BAE66] font-bold">Mean = 433 ÷ 5 = 86.6</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Example 2: Finding Median</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Given:</strong></p>
                    <p className="text-gray-600">Values: 12, 5, 22, 30, 7, 36, 14</p>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Solution:</strong></p>
                    <div className="bg-white p-3 rounded font-mono text-sm">
                      <p>Sorted: 5, 7, 12, <strong>14</strong>, 22, 30, 36</p>
                      <p>Middle position = (7+1)/2 = 4th</p>
                      <p className="text-[#2BAE66] font-bold">Median = 14</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Example 3: Mode with Multiple Values</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Given:</strong></p>
                    <p className="text-gray-600">Values: 2, 4, 4, 6, 6, 8, 8, 8</p>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Solution:</strong></p>
                    <div className="bg-white p-3 rounded font-mono text-sm">
                      <p>4 appears 2 times</p>
                      <p>6 appears 2 times</p>
                      <p>8 appears 3 times (most frequent)</p>
                      <p className="text-[#2BAE66] font-bold">Mode = 8</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#1A3D7C] mb-4">Example 4: Impact of Outliers</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Scenario:</strong></p>
                    <p className="text-gray-600">Salaries: ₹30,000, ₹35,000, ₹32,000, ₹28,000, ₹5,00,000</p>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Analysis:</strong></p>
                    <div className="bg-white p-3 rounded font-mono text-sm">
                      <p>Mean = ₹1,25,000 (distorted by outlier)</p>
                      <p className="text-[#2BAE66] font-bold">Median = ₹32,000 (more representative)</p>
                      <p className="text-xs text-gray-500 mt-2">Median is better when outliers exist!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* When to Use Each Type */}
          <div className="bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] text-white p-8 md:p-12 rounded-xl mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center">
              <Info className="w-8 h-8 mr-3" />
              When to Use Each Type of Average
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Use Mean When...</h3>
                <ul className="space-y-2 text-blue-100">
                  <li>• Data is evenly distributed</li>
                  <li>• No significant outliers</li>
                  <li>• Calculating grades or scores</li>
                  <li>• Financial averages (prices)</li>
                  <li>• Scientific measurements</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Use Median When...</h3>
                <ul className="space-y-2 text-blue-100">
                  <li>• Data has outliers</li>
                  <li>• Skewed distribution</li>
                  <li>• Income/salary analysis</li>
                  <li>• House prices in an area</li>
                  <li>• Any data with extremes</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Use Mode When...</h3>
                <ul className="space-y-2 text-blue-100">
                  <li>• Finding most popular item</li>
                  <li>• Categorical data</li>
                  <li>• Survey responses</li>
                  <li>• Best-selling product</li>
                  <li>• Most common size/color</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Important Warning About Averages */}
          <div className="bg-red-50 border-2 border-red-200 p-6 rounded-xl mb-8">
            <h2 className="text-2xl font-bold text-red-700 mb-4 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2" />
              Caution: When Averages Can Be Misleading
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                <strong>Averages can be distorted by extreme values (outliers).</strong> A single very high or very low value can significantly shift the mean away from what most data points represent.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold mb-2">Example: Average Income Distortion</p>
                <p className="font-mono text-sm">
                  Room with 10 people earning ₹50,000 each + 1 billionaire<br />
                  Mean income = ₹9,09,09,545 (misleading!)<br />
                  Median income = ₹50,000 (accurate representation)
                </p>
              </div>
              <p>
                <strong>Tip:</strong> Always check for outliers and consider using the median when your data might have extreme values.
              </p>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-[#1A3D7C] mb-8">
              Benefits of Using Our Average Calculator
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Multiple Statistics',
                  description: 'Get mean, median, mode, range, variance, and standard deviation all at once.',
                  icon: BarChart3,
                },
                {
                  title: 'Instant Calculation',
                  description: 'Results update automatically as you type - no need to click calculate.',
                  icon: TrendingUp,
                },
                {
                  title: 'Flexible Input',
                  description: 'Enter numbers separated by spaces, commas, or new lines - whatever works for you.',
                  icon: ListOrdered,
                },
                {
                  title: 'Large Data Sets',
                  description: 'Handle dozens or hundreds of values with ease.',
                  icon: Hash,
                },
                {
                  title: 'Educational Display',
                  description: 'Shows formulas and step-by-step calculation process.',
                  icon: BookOpen,
                },
                {
                  title: 'No Sign-up Required',
                  description: 'Free to use, no registration, and your data stays private.',
                  icon: CheckCircle,
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg border-2 border-blue-200 hover:border-[#2BAE66] transition-all hover:shadow-lg"
                >
                  <div className="flex items-start">
                    <benefit.icon className="w-6 h-6 text-[#2BAE66] mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">{benefit.title}</h3>
                      <p className="text-gray-700">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-[#1A3D7C] mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {[
                {
                  question: 'What is the difference between mean and average?',
                  answer: 'In common usage, "average" and "mean" refer to the same thing - the arithmetic mean. However, technically "average" can refer to any measure of central tendency (mean, median, or mode). When people say "average," they usually mean the arithmetic mean: sum of all values divided by count.',
                },
                {
                  question: 'How do I calculate the average of percentages?',
                  answer: 'If all percentages represent equal-sized groups, you can simply average them. However, if they represent different-sized groups, you need a weighted average. For example, if Class A (30 students) averaged 80% and Class B (20 students) averaged 90%, the overall average is (30×80 + 20×90)/(30+20) = 84%, not simply (80+90)/2 = 85%.',
                },
                {
                  question: 'Why is my average different from the median?',
                  answer: 'The mean is affected by every value, including outliers, while the median only looks at the middle position. If your mean and median are very different, it usually indicates your data is skewed or has outliers. Symmetric data will have similar mean and median values.',
                },
                {
                  question: 'Can I calculate the average of averages?',
                  answer: 'You can only average averages if each group has the same size. Otherwise, you need the weighted average. For example, averaging exam scores from different sections only works if each section has the same number of students.',
                },
                {
                  question: 'What does "no mode" mean?',
                  answer: 'When no mode is displayed, it means either all values appear only once (no repetition) or all values appear the same number of times. In either case, there\'s no single value that\'s more common than others.',
                },
                {
                  question: 'How do I calculate average in Excel?',
                  answer: 'Use the AVERAGE function: =AVERAGE(A1:A10) for cells A1 to A10. For median, use =MEDIAN(A1:A10). For mode, use =MODE(A1:A10) or =MODE.MULT(A1:A10) for multiple modes.',
                },
                {
                  question: 'What is standard deviation?',
                  answer: 'Standard deviation (σ) measures how spread out the data is from the mean. A low standard deviation means values are close to the mean; a high standard deviation means they\'re spread over a wider range. It\'s calculated as the square root of variance.',
                },
                {
                  question: 'When should I use median instead of mean?',
                  answer: 'Use median when: (1) Your data has outliers that could skew the mean, (2) The distribution is not symmetric, (3) You\'re dealing with income, house prices, or any data where extreme values are common, (4) You want the "typical" value that 50% of data falls above and below.',
                },
                {
                  question: 'How many decimal places should I use?',
                  answer: 'Generally, use one more decimal place than your original data. For whole numbers, one or two decimal places is usually sufficient. For scientific or financial calculations, you may need more precision. Our calculator shows up to 4 decimal places.',
                },
                {
                  question: 'Is my data stored or shared?',
                  answer: 'No! All calculations happen in your browser. We don\'t store, track, or transmit any numbers you enter. Your data privacy is completely protected.',
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border-l-4 border-[#2BAE66] shadow-md">
                  <div className="flex items-start">
                    <HelpCircle className="w-6 h-6 text-[#1A3D7C] mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">{faq.question}</h3>
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border-2 border-purple-200 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Tips for Using Averages Effectively</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Always Check for Outliers',
                  tip: 'Before relying on the mean, scan your data for extreme values that might distort the result.',
                },
                {
                  title: 'Report Multiple Measures',
                  tip: 'When presenting data, show both mean and median to give a fuller picture.',
                },
                {
                  title: 'Consider the Context',
                  tip: 'An average of 50 means different things for test scores (failing) vs. age (middle-aged).',
                },
                {
                  title: 'Use Range with Average',
                  tip: 'Average alone doesn\'t tell the whole story. Include range to show data spread.',
                },
                {
                  title: 'Watch Sample Size',
                  tip: 'Averages from small samples may not be reliable. Larger samples give more stable results.',
                },
                {
                  title: 'Don\'t Average Averages Blindly',
                  tip: 'Only average averages if groups are equal size; otherwise use weighted averages.',
                },
              ].map((tip, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <Lightbulb className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">{tip.title}</h3>
                      <p className="text-gray-700">{tip.tip}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Calculators */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 text-center">Explore More Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/calculators/mean-mode-median-calculator" className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg border-2 border-blue-200 hover:border-[#2BAE66] transition-all hover:shadow-lg">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">Mean Mode Median Calculator</h3>
                <p className="text-gray-700 text-sm">Detailed analysis of mean, mode, median with frequency distribution.</p>
              </Link>
              <Link href="/calculators/standard-deviation-calculator" className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg border-2 border-blue-200 hover:border-[#2BAE66] transition-all hover:shadow-lg">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">Standard Deviation Calculator</h3>
                <p className="text-gray-700 text-sm">Calculate standard deviation, variance with population/sample options.</p>
              </Link>
              <Link href="/calculators/percentage-calculator" className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg border-2 border-blue-200 hover:border-[#2BAE66] transition-all hover:shadow-lg">
                <h3 className="text-lg font-semibold text-[#1A3D7C] mb-2">Percentage Calculator</h3>
                <p className="text-gray-700 text-sm">Calculate percentages, percentage of a number, and solve percentage problems.</p>
              </Link>
            </div>
          </div>

          {/* Book Your Session CTA */}
          <section className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] py-12 md:py-16 rounded-2xl">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center text-white">
                <BookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-[#FFC857]" />
                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                  Need Help with Statistics & Mathematics?
                </h2>
                <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                  Our expert tutors can help you master statistics, understand averages, and excel in data analysis. Get personalized one-on-one guidance tailored to your learning style.
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
        </div>
      </div>

      <Footer />
    </div>
  );
}
