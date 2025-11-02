'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, Home, BarChart3, TrendingUp, Lightbulb, HelpCircle, CheckCircle2, AlertCircle, ArrowRight, BookOpen } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface StatisticalResult {
  mean: number;
  median: number;
  mode: number[];
  range: number;
  minimum: number;
  maximum: number;
  count: number;
  sum: number;
  q1: number;
  q2: number;
  q3: number;
  iqr: number;
  outliers: number[];
  sortedData: number[];
}

export default function MeanMedianModeCalculator() {
  const [dataInput, setDataInput] = useState<string>('');
  const [result, setResult] = useState<StatisticalResult | null>(null);

  const calculateStatistics = (data: number[]): StatisticalResult => {
    const sortedData = [...data].sort((a, b) => a - b);
    const n = data.length;

    // Calculate Mean
    const sum = data.reduce((acc, val) => acc + val, 0);
    const mean = sum / n;

    // Calculate Median
    let median: number;
    if (n % 2 === 0) {
      median = (sortedData[n / 2 - 1] + sortedData[n / 2]) / 2;
    } else {
      median = sortedData[Math.floor(n / 2)];
    }

    // Calculate Mode
    const frequency: { [key: number]: number } = {};
    data.forEach(val => {
      frequency[val] = (frequency[val] || 0) + 1;
    });
    const maxFreq = Math.max(...Object.values(frequency));
    const mode = maxFreq > 1 ? Object.keys(frequency).filter(key => frequency[Number(key)] === maxFreq).map(Number) : [];

    // Calculate Range
    const minimum = Math.min(...data);
    const maximum = Math.max(...data);
    const range = maximum - minimum;

    // Calculate Quartiles
    const getQuartile = (arr: number[], quartile: number): number => {
      const pos = (arr.length - 1) * quartile;
      const base = Math.floor(pos);
      const rest = pos - base;
      if (arr[base + 1] !== undefined) {
        return arr[base] + rest * (arr[base + 1] - arr[base]);
      } else {
        return arr[base];
      }
    };

    const q1 = getQuartile(sortedData, 0.25);
    const q2 = median; // Q2 is the median
    const q3 = getQuartile(sortedData, 0.75);
    const iqr = q3 - q1;

    // Calculate Outliers
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;
    const outliers = sortedData.filter(val => val < lowerBound || val > upperBound);

    return {
      mean,
      median,
      mode,
      range,
      minimum,
      maximum,
      count: n,
      sum,
      q1,
      q2,
      q3,
      iqr,
      outliers,
      sortedData,
    };
  };

  const handleCalculate = () => {
    // Parse input - accept comma, space, or newline separated values
    const input = dataInput.trim();
    if (!input) {
      alert('Please enter a data set');
      return;
    }

    // Parse numbers from input (handle commas, spaces, newlines)
    const numbers = input
      .split(/[\s,]+/)
      .map(str => str.trim())
      .filter(str => str !== '')
      .map(str => parseFloat(str));

    // Validate
    if (numbers.some(isNaN)) {
      alert('Please enter valid numbers only');
      return;
    }

    if (numbers.length < 2) {
      alert('Please enter at least 2 numbers');
      return;
    }

    const stats = calculateStatistics(numbers);
    setResult(stats);
  };

  const handleClear = () => {
    setDataInput('');
    setResult(null);
  };

  const formatNumber = (num: number): string => {
    return Number.isInteger(num) ? num.toString() : num.toFixed(2);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-teal-50">
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
            <span className="text-gray-900 font-medium">Mean Median Mode Calculator</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <BarChart3 className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Mean Median Mode Calculator
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Calculate mean, median, mode, range, quartiles, and identify outliers with complete statistical analysis. Perfect for students learning descriptive statistics.
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
                  Enter Data Set
                </h2>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="dataInput" className="text-sm font-semibold text-gray-700 mb-3 block">
                      Numbers (comma or space separated)
                    </Label>
                    <textarea
                      id="dataInput"
                      placeholder="9, 10, 12, 13, 13, 13, 15, 15, 16, 16, 18, 22, 23, 24, 24, 25"
                      value={dataInput}
                      onChange={(e) => setDataInput(e.target.value)}
                      className="w-full h-32 px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-[#2BAE66] focus:ring-2 focus:ring-[#2BAE66]/20 focus:outline-none transition-colors resize-none font-mono"
                      rows={6}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Enter numbers separated by commas, spaces, or new lines
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={handleCalculate}
                    className="flex-1 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] hover:from-[#152f5f] hover:to-[#239b56] text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
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
                <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">Quick Examples:</h3>
                  <button
                    onClick={() => setDataInput('9, 10, 12, 13, 13, 13, 15, 15, 16, 16, 18, 22, 23, 24, 24, 25')}
                    className="text-xs text-[#1A3D7C] hover:text-[#2BAE66] underline"
                  >
                    Example 1: Test Scores
                  </button>
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
                      Statistical Results
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Mean */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <p className="text-sm text-blue-100 mb-1">Mean <span className="italic">x̄</span></p>
                        <p className="text-3xl font-bold">{formatNumber(result.mean)}</p>
                      </div>

                      {/* Median */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <p className="text-sm text-blue-100 mb-1">Median <span className="italic">x̃</span></p>
                        <p className="text-3xl font-bold">{formatNumber(result.median)}</p>
                      </div>

                      {/* Mode */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <p className="text-sm text-blue-100 mb-1">Mode</p>
                        <p className="text-3xl font-bold">
                          {result.mode.length > 0 ? result.mode.map(formatNumber).join(', ') : 'No mode'}
                        </p>
                      </div>

                      {/* Range */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <p className="text-sm text-blue-100 mb-1">Range</p>
                        <p className="text-3xl font-bold">{formatNumber(result.range)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Statistics */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Detailed Analysis
                    </h3>

                    <div className="space-y-4">
                      {/* Basic Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Minimum</p>
                          <p className="text-2xl font-bold text-[#1A3D7C]">{formatNumber(result.minimum)}</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Maximum</p>
                          <p className="text-2xl font-bold text-[#1A3D7C]">{formatNumber(result.maximum)}</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Count <span className="italic">n</span></p>
                          <p className="text-2xl font-bold text-[#1A3D7C]">{result.count}</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Sum Σ</p>
                          <p className="text-2xl font-bold text-[#1A3D7C]">{formatNumber(result.sum)}</p>
                        </div>
                      </div>

                      {/* Quartiles */}
                      <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6">
                        <h4 className="font-bold text-gray-900 mb-4">Quartiles</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">First Quartile (Q₁)</span>
                            <span className="text-xl font-bold text-[#1A3D7C]">{formatNumber(result.q1)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">Second Quartile (Q₂)</span>
                            <span className="text-xl font-bold text-[#1A3D7C]">{formatNumber(result.q2)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">Third Quartile (Q₃)</span>
                            <span className="text-xl font-bold text-[#1A3D7C]">{formatNumber(result.q3)}</span>
                          </div>
                          <div className="border-t-2 border-gray-300 pt-3 mt-3">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700 font-semibold">Interquartile Range (IQR)</span>
                              <span className="text-xl font-bold text-[#2BAE66]">{formatNumber(result.iqr)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Outliers */}
                      <div className={`rounded-xl p-6 ${result.outliers.length > 0 ? 'bg-yellow-50 border-2 border-yellow-400' : 'bg-green-50 border-2 border-green-400'}`}>
                        <div className="flex items-center gap-2 mb-3">
                          {result.outliers.length > 0 ? (
                            <AlertCircle className="w-5 h-5 text-yellow-600" />
                          ) : (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          )}
                          <h4 className="font-bold text-gray-900">Outliers</h4>
                        </div>
                        {result.outliers.length > 0 ? (
                          <div>
                            <p className="text-yellow-800 mb-2">
                              {result.outliers.length} outlier{result.outliers.length > 1 ? 's' : ''} detected:
                            </p>
                            <p className="text-xl font-bold text-yellow-900">
                              {result.outliers.map(formatNumber).join(', ')}
                            </p>
                          </div>
                        ) : (
                          <p className="text-green-800">No outliers detected in the data set</p>
                        )}
                      </div>

                      {/* Sorted Data */}
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="font-bold text-gray-900 mb-3">Sorted Data Set</h4>
                        <p className="text-gray-700 font-mono text-sm break-words">
                          {result.sortedData.map(formatNumber).join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Formulas */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-[#FFC857]" />
                      Formulas Used
                    </h3>

                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg p-4">
                        <p className="font-semibold text-gray-900 mb-2">Mean (Average)</p>
                        <p className="text-gray-700 font-mono text-sm">
                          x̄ = (Σx) / n = {formatNumber(result.sum)} / {result.count} = {formatNumber(result.mean)}
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg p-4">
                        <p className="font-semibold text-gray-900 mb-2">Median (Middle Value)</p>
                        <p className="text-gray-700 text-sm">
                          {result.count % 2 === 0
                            ? `Middle two values: ${formatNumber(result.sortedData[result.count / 2 - 1])} and ${formatNumber(result.sortedData[result.count / 2])}, Average = ${formatNumber(result.median)}`
                            : `Middle value at position ${Math.floor(result.count / 2) + 1} = ${formatNumber(result.median)}`}
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg p-4">
                        <p className="font-semibold text-gray-900 mb-2">Mode (Most Frequent)</p>
                        <p className="text-gray-700 text-sm">
                          {result.mode.length > 0
                            ? `Value(s) appearing most frequently: ${result.mode.map(formatNumber).join(', ')}`
                            : 'All values appear with equal frequency (no mode)'}
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg p-4">
                        <p className="font-semibold text-gray-900 mb-2">Range</p>
                        <p className="text-gray-700 text-sm">
                          Range = Maximum − Minimum = {formatNumber(result.maximum)} − {formatNumber(result.minimum)} = {formatNumber(result.range)}
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg p-4">
                        <p className="font-semibold text-gray-900 mb-2">Interquartile Range (IQR)</p>
                        <p className="text-gray-700 text-sm">
                          IQR = Q₃ − Q₁ = {formatNumber(result.q3)} − {formatNumber(result.q1)} = {formatNumber(result.iqr)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    Enter a data set to calculate mean, median, mode, and other statistical measures
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
          <div className="max-w-4xl mx-auto prose prose-lg">

            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Understanding Mean, Median, and Mode
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Mean, median, and mode are the three measures of central tendency in statistics, fundamental concepts used to describe and analyze data sets. These statistical measures help us understand the typical or central value in a dataset, making them essential tools for students, researchers, data analysts, and anyone working with numerical data.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The <strong>mean</strong> (or average) is the sum of all values divided by the number of values. The <strong>median</strong> is the middle value when data is arranged in order. The <strong>mode</strong> is the value that appears most frequently. Each measure provides different insights into your data, and understanding when to use each one is crucial for accurate data analysis.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our comprehensive calculator not only computes these three measures but also provides additional statistical information including range, quartiles, interquartile range (IQR), and outlier detection—giving you a complete statistical analysis in seconds.
              </p>
            </section>

            {/* How It Works */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Use This Calculator
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6 mb-6">
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <strong className="text-gray-900">Enter Your Data Set:</strong>
                      <p className="text-gray-700 mt-1">Type or paste your numbers into the input field. You can separate numbers with commas, spaces, or new lines. For example: 5, 10, 15, 20, 25</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <strong className="text-gray-900">Click Calculate:</strong>
                      <p className="text-gray-700 mt-1">Press the Calculate button to instantly compute all statistical measures including mean, median, mode, range, quartiles, and outliers.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <strong className="text-gray-900">Review Results:</strong>
                      <p className="text-gray-700 mt-1">Examine the comprehensive statistical analysis including central tendency measures, spread measures, and detailed formulas showing how each value was calculated.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#1A3D7C] text-white rounded-full flex items-center justify-center font-bold">4</span>
                    <div>
                      <strong className="text-gray-900">Check for Outliers:</strong>
                      <p className="text-gray-700 mt-1">Review the outliers section to identify any unusual values in your dataset that fall outside the normal range based on IQR calculations.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            {/* Detailed Explanations */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Understanding Each Measure
              </h2>

              <div className="space-y-6">
                <div className="bg-white border-2 border-[#1A3D7C] rounded-xl p-6">
                  <h3 className="text-xl font-bold text-[#1A3D7C] mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Mean (Average)
                  </h3>
                  <p className="text-gray-700 mb-3">
                    The <strong>mean</strong>, denoted as <span className="italic">x̄</span> (x-bar), is calculated by adding all values and dividing by the number of values. It represents the arithmetic average of the dataset.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg mb-3">
                    <p className="font-mono text-sm text-gray-800">
                      Formula: x̄ = (Σx) / n
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Where Σx is the sum of all values and n is the count
                    </p>
                  </div>
                  <p className="text-gray-700">
                    <strong>When to use:</strong> The mean is best used when data is evenly distributed without extreme outliers. It's ideal for continuous data like heights, weights, or test scores.
                  </p>
                </div>

                <div className="bg-white border-2 border-[#2BAE66] rounded-xl p-6">
                  <h3 className="text-xl font-bold text-[#2BAE66] mb-3">
                    Median (Middle Value)
                  </h3>
                  <p className="text-gray-700 mb-3">
                    The <strong>median</strong>, denoted as <span className="italic">x̃</span>, is the middle value when data is arranged in order. If there's an even number of values, the median is the average of the two middle values.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg mb-3">
                    <p className="text-sm text-gray-800 mb-2">
                      <strong>For odd n:</strong> Middle value at position (n+1)/2
                    </p>
                    <p className="text-sm text-gray-800">
                      <strong>For even n:</strong> Average of values at positions n/2 and (n/2)+1
                    </p>
                  </div>
                  <p className="text-gray-700">
                    <strong>When to use:</strong> The median is more resistant to outliers than the mean, making it better for skewed distributions or data with extreme values, such as income or house prices.
                  </p>
                </div>

                <div className="bg-white border-2 border-[#FFC857] rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Mode (Most Frequent)
                  </h3>
                  <p className="text-gray-700 mb-3">
                    The <strong>mode</strong> is the value that appears most frequently in the dataset. A dataset can have one mode (unimodal), two modes (bimodal), multiple modes (multimodal), or no mode if all values appear with equal frequency.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg mb-3">
                    <p className="text-sm text-gray-800">
                      The mode is found by counting the frequency of each value and identifying the value(s) with the highest frequency count.
                    </p>
                  </div>
                  <p className="text-gray-700">
                    <strong>When to use:</strong> The mode is most useful for categorical data or when you want to know the most common value, such as the most popular shoe size or the most frequent grade on a test.
                  </p>
                </div>
              </div>
            </section>

            {/* Additional Statistics */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Additional Statistical Measures
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-[#1A3D7C] mb-3">Range</h3>
                  <p className="text-gray-700 mb-2">
                    The difference between the maximum and minimum values in the dataset. It provides a simple measure of data spread.
                  </p>
                  <p className="text-sm font-mono text-gray-800 bg-white p-2 rounded">
                    Range = Max − Min
                  </p>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-[#2BAE66] mb-3">Quartiles</h3>
                  <p className="text-gray-700 mb-2">
                    Values that divide the data into four equal parts. Q₁ (25th percentile), Q₂ (median, 50th percentile), and Q₃ (75th percentile).
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-700 mb-3">Interquartile Range (IQR)</h3>
                  <p className="text-gray-700 mb-2">
                    The range of the middle 50% of the data, calculated as Q₃ − Q₁. It's a robust measure of variability.
                  </p>
                  <p className="text-sm font-mono text-gray-800 bg-white p-2 rounded">
                    IQR = Q₃ − Q₁
                  </p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-700 mb-3">Outliers</h3>
                  <p className="text-gray-700 mb-2">
                    Values that fall more than 1.5 × IQR below Q₁ or above Q₃. These are unusually low or high values that may warrant investigation.
                  </p>
                </div>
              </div>
            </section>

            {/* Real-World Applications */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Real-World Applications
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-[#1A3D7C] mb-3">📊 Education & Grading</h3>
                  <p className="text-gray-700">
                    Teachers use mean, median, and mode to analyze test scores, understand class performance, identify grade distributions, and determine if adjustments to teaching methods are needed.
                  </p>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-[#2BAE66] mb-3">💼 Business & Economics</h3>
                  <p className="text-gray-700">
                    Companies analyze sales data, customer satisfaction scores, pricing strategies, and market research using these measures to make informed business decisions.
                  </p>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-600 mb-3">🏥 Healthcare & Medicine</h3>
                  <p className="text-gray-700">
                    Medical professionals use statistical measures to analyze patient data, track treatment effectiveness, understand population health trends, and conduct clinical research.
                  </p>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-600 mb-3">⚽ Sports Analytics</h3>
                  <p className="text-gray-700">
                    Coaches and analysts use these statistics to evaluate player performance, team statistics, scoring patterns, and to develop game strategies based on data.
                  </p>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-600 mb-3">🌡️ Weather & Climate</h3>
                  <p className="text-gray-700">
                    Meteorologists analyze temperature data, rainfall patterns, and climate trends using statistical measures to make predictions and understand weather patterns.
                  </p>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-600 mb-3">🏠 Real Estate</h3>
                  <p className="text-gray-700">
                    Real estate professionals use mean and median to analyze property prices, market values, rental rates, and to advise clients on pricing strategies.
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
                  <h3 className="text-lg font-bold text-red-900 mb-2">Using Mean with Skewed Data</h3>
                  <p className="text-red-800 mb-2">
                    <strong>Wrong:</strong> Using mean for highly skewed data like income, where extreme values significantly affect the average ❌
                  </p>
                  <p className="text-green-800">
                    <strong>Correct:</strong> Use median for skewed distributions as it's not affected by extreme values. For income data, median provides a better representation ✓
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">Forgetting to Sort Data for Median</h3>
                  <p className="text-red-800 mb-2">
                    <strong>Wrong:</strong> Finding the middle value without arranging data in order first ❌
                  </p>
                  <p className="text-green-800">
                    <strong>Correct:</strong> Always sort your data in ascending order before finding the median. The middle value only makes sense when data is ordered ✓
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">Confusing Mode with Median</h3>
                  <p className="text-red-800 mb-2">
                    <strong>Wrong:</strong> Thinking mode is always in the middle of the data ❌
                  </p>
                  <p className="text-green-800">
                    <strong>Correct:</strong> Mode is the most frequent value, which can be anywhere in the data range. It has nothing to do with position ✓
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">Ignoring Outliers</h3>
                  <p className="text-red-800 mb-2">
                    <strong>Wrong:</strong> Not checking for outliers before analysis, which can drastically skew results ❌
                  </p>
                  <p className="text-green-800">
                    <strong>Correct:</strong> Always identify and investigate outliers. Decide whether to include or exclude them based on context and whether they're genuine data points ✓
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">Using Wrong Formula for Even Data Sets</h3>
                  <p className="text-red-800 mb-2">
                    <strong>Wrong:</strong> Taking just one middle value when you have an even number of data points ❌
                  </p>
                  <p className="text-green-800">
                    <strong>Correct:</strong> For even data sets, median = average of the two middle values. For odd sets, it's the single middle value ✓
                  </p>
                </div>
              </div>
            </section>

            {/* Tips and Tricks */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Tips and Tricks for Statistics
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-[#1A3D7C] mb-3">Quick Mental Math for Mean</h3>
                  <p className="text-gray-700">
                    For small datasets, estimate by rounding numbers to nearest 5 or 10, calculate the average, then adjust. Example: 12, 15, 18 → think 15, 15, 15 = average ~15.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-[#2BAE66] mb-3">Finding Median Quickly</h3>
                  <p className="text-gray-700">
                    Use the formula position = (n+1)/2 to find the median position. For n=7, position = 4, so the 4th value is the median. For even n, average positions n/2 and (n/2)+1.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-700 mb-3">Spotting Mode at a Glance</h3>
                  <p className="text-gray-700">
                    Create a frequency table or tally chart. The value with the most marks is your mode. If values appear equally, you have no mode or multiple modes.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-700 mb-3">Check Your Work</h3>
                  <p className="text-gray-700">
                    The mean should be between min and max. If it's outside this range, you made an error. Also, median should be close to mean for symmetric data.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-700 mb-3">Visual Representations Help</h3>
                  <p className="text-gray-700">
                    Draw a number line and plot your data. This helps visualize the spread, identify clusters, spot outliers, and understand which measure of central tendency is most appropriate.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-700 mb-3">Use Technology Wisely</h3>
                  <p className="text-gray-700">
                    Calculators and tools like ours are great for checking work and handling large datasets, but understanding the concepts is crucial for interpreting results correctly.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <HelpCircle className="w-8 h-8 text-[#2BAE66]" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What's the difference between mean and median?
                  </h3>
                  <p className="text-gray-700">
                    Mean is the arithmetic average (sum ÷ count), while median is the middle value when data is ordered. Mean is affected by extreme values (outliers), but median is resistant to them. Use mean for symmetric data and median for skewed data or data with outliers.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can a data set have more than one mode?
                  </h3>
                  <p className="text-gray-700">
                    Yes! A dataset can be unimodal (one mode), bimodal (two modes), multimodal (more than two modes), or have no mode at all if all values appear with equal frequency. For example, {1, 2, 2, 3, 3, 4} is bimodal with modes 2 and 3.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How do you find the median with an even number of values?
                  </h3>
                  <p className="text-gray-700">
                    With an even number of values, there are two middle values. Take the average of these two middle values. For example, in {1, 3, 5, 7}, the middle values are 3 and 5, so the median is (3 + 5) / 2 = 4.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What are outliers and why are they important?
                  </h3>
                  <p className="text-gray-700">
                    Outliers are data points that are significantly different from other observations. They're identified using the IQR method: values below Q₁ − 1.5×IQR or above Q₃ + 1.5×IQR. Outliers can indicate data errors, special cases, or important anomalies worth investigating.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What is the interquartile range (IQR)?
                  </h3>
                  <p className="text-gray-700">
                    IQR is the range of the middle 50% of the data, calculated as Q₃ − Q₁. It measures the spread of the central portion of the data and is resistant to outliers, making it a robust measure of variability. A smaller IQR indicates data is more clustered around the median.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    When should I use mean vs median?
                  </h3>
                  <p className="text-gray-700">
                    Use mean when data is symmetrically distributed without outliers (like heights in a large population). Use median when data is skewed or has outliers (like income, house prices, or test scores with a few very high or low values). Median better represents the "typical" value in these cases.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What do Q₁, Q₂, and Q₃ represent?
                  </h3>
                  <p className="text-gray-700">
                    Q₁ (first quartile) is the 25th percentile, Q₂ (second quartile) is the median (50th percentile), and Q₃ (third quartile) is the 75th percentile. Together with minimum and maximum, they form the five-number summary used in box plots to visualize data distribution.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Can the mean, median, and mode be the same value?
                  </h3>
                  <p className="text-gray-700">
                    Yes, in a perfectly symmetric distribution (like a normal distribution), the mean, median, and mode will all be equal. However, in skewed distributions, these three measures will differ, with the degree of difference indicating the amount of skewness.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How many data points do I need to calculate these statistics?
                  </h3>
                  <p className="text-gray-700">
                    You need at least 2 data points for meaningful calculations. However, for more reliable statistical analysis, larger sample sizes are better. Generally, 30 or more data points provide more robust results, especially for understanding distribution patterns.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What if my data set has no repeating values?
                  </h3>
                  <p className="text-gray-700">
                    If no values repeat, there is no mode. This is common in continuous data or unique measurements. Our calculator will indicate "No mode" in such cases. You'll rely on mean and median to describe the central tendency of your data.
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
                Understanding and calculating mean, median, and mode are fundamental skills in statistics and data analysis. These measures of central tendency help us summarize large datasets into meaningful single values, making data interpretation easier and more accessible.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our comprehensive calculator goes beyond just computing these three measures—it provides a complete statistical analysis including range, quartiles, interquartile range, outlier detection, and visual representations. Whether you're a student learning statistics, a teacher grading assignments, a researcher analyzing data, or a professional making data-driven decisions, this tool provides accurate results instantly.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The key to using these measures effectively is understanding which one best represents your data. Remember: mean for symmetric data, median for skewed data or outliers, and mode for categorical data or finding the most common value. By combining all three measures with quartiles and outlier analysis, you gain a comprehensive understanding of your dataset's characteristics.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Start using our Mean Median Mode Calculator today to analyze your data quickly and accurately. Whether you're checking homework, conducting research, or making business decisions, let our tool handle the calculations while you focus on interpreting the results and drawing meaningful conclusions from your data.
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
              Need Help with Statistics?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Our expert tutors can help you master mean, median, mode, and statistical analysis. Get personalized one-on-one guidance tailored to your learning style.
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
