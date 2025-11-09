'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

export default function QuartileCalculator() {
  const [dataSet, setDataSet] = useState<string>('15, 16, 17, 17, 17, 18, 19');
  const [result, setResult] = useState<{
    sortedData: number[];
    q1: number;
    q2: number;
    q3: number;
    iqr: number;
    median: number;
    min: number;
    max: number;
    range: number;
    n: number;
  } | null>(null);

  const calculateQuartiles = (data: number[]) => {
    const sorted = [...data].sort((a, b) => a - b);
    const n = sorted.length;

    // Calculate Q2 (Median)
    const q2 = n % 2 === 0
      ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
      : sorted[Math.floor(n / 2)];

    // Calculate Q1 (Lower half median)
    const lowerHalf = n % 2 === 0
      ? sorted.slice(0, n / 2)
      : sorted.slice(0, Math.floor(n / 2));

    const q1 = lowerHalf.length % 2 === 0
      ? (lowerHalf[lowerHalf.length / 2 - 1] + lowerHalf[lowerHalf.length / 2]) / 2
      : lowerHalf[Math.floor(lowerHalf.length / 2)];

    // Calculate Q3 (Upper half median)
    const upperHalf = n % 2 === 0
      ? sorted.slice(n / 2)
      : sorted.slice(Math.ceil(n / 2));

    const q3 = upperHalf.length % 2 === 0
      ? (upperHalf[upperHalf.length / 2 - 1] + upperHalf[upperHalf.length / 2]) / 2
      : upperHalf[Math.floor(upperHalf.length / 2)];

    return {
      sortedData: sorted,
      q1,
      q2,
      q3,
      iqr: q3 - q1,
      median: q2,
      min: sorted[0],
      max: sorted[n - 1],
      range: sorted[n - 1] - sorted[0],
      n,
    };
  };

  const handleCalculate = () => {
    const numbers = dataSet
      .split(',')
      .map(num => num.trim())
      .filter(num => num !== '')
      .map(num => parseFloat(num));

    if (numbers.length === 0 || numbers.some(isNaN)) {
      alert('Please enter valid numbers separated by commas.');
      return;
    }

    if (numbers.length < 3) {
      alert('Please enter at least 3 numbers to calculate quartiles.');
      return;
    }

    const calculatedResult = calculateQuartiles(numbers);
    setResult(calculatedResult);
  };

  const handleClear = () => {
    setDataSet('15, 16, 17, 17, 17, 18, 19');
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-8 mt-20 mb-12 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A3D7C] mb-4">
            Quartile Calculator
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Calculate first quartile (Q₁), second quartile (Q₂), third quartile (Q₃), interquartile range (IQR), and complete statistical analysis with step-by-step solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 border-t-4 border-red-800">
            <div className="bg-gradient-to-r from-red-800 to-red-900 text-white text-center py-3 rounded-lg mb-6">
              <h2 className="text-xl md:text-2xl font-bold">Quartile Calculator</h2>
            </div>

            <div className="text-center text-xl font-semibold text-gray-800 mb-6">
              Enter Data Set
            </div>

            <div className="mb-6">
              <Textarea
                id="dataSet"
                value={dataSet}
                onChange={(e) => setDataSet(e.target.value)}
                className="text-lg p-4 border-2 border-gray-300 focus:border-red-500 font-semibold min-h-[120px]"
                placeholder="Enter numbers separated by commas (e.g., 15, 16, 17, 17, 17, 18, 19)"
              />
              <p className="text-sm text-gray-600 mt-2">
                Separate values with commas
              </p>
            </div>

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
                className="py-6 text-lg font-semibold bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-950"
              >
                Calculate
              </Button>
            </div>

            {result && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Answer:</h3>
                <div className="space-y-3">
                  <p className="text-lg font-semibold text-gray-800">
                    <span className="font-bold">Quartile Statistics</span>
                  </p>

                  <div className="border-2 border-gray-300 rounded-lg p-4 bg-white space-y-3">
                    <div className="flex justify-between items-center border-b-2 border-gray-300 pb-2">
                      <span className="text-base font-semibold">First Quartile</span>
                      <span className="text-base">
                        Q<sub>1</sub> = <span className="font-bold">{result.q1}</span>
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-b-2 border-gray-300 pb-2">
                      <span className="text-base font-semibold">Second Quartile</span>
                      <span className="text-base">
                        Q<sub>2</sub> = <span className="font-bold">{result.q2}</span>
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-b-2 border-gray-300 pb-2">
                      <span className="text-base font-semibold">Third Quartile</span>
                      <span className="text-base">
                        Q<sub>3</sub> = <span className="font-bold">{result.q3}</span>
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-b-2 border-gray-300 pb-2">
                      <span className="text-base font-semibold">Interquartile Range</span>
                      <span className="text-base">
                        IQR = <span className="font-bold">{result.iqr}</span>
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-b-2 border-gray-300 pb-2">
                      <span className="text-base font-semibold">Median = Q2</span>
                      <span className="text-base">
                        <span className="text-lg">x̄</span> = <span className="font-bold">{result.median}</span>
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-b-2 border-gray-300 pb-2">
                      <span className="text-base font-semibold">Minimum</span>
                      <span className="text-base">
                        Min = <span className="font-bold">{result.min}</span>
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-b-2 border-gray-300 pb-2">
                      <span className="text-base font-semibold">Maximum</span>
                      <span className="text-base">
                        Max = <span className="font-bold">{result.max}</span>
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-2">
                      <span className="text-base font-semibold">Range</span>
                      <span className="text-base">
                        R = <span className="font-bold">{result.range}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8">
            <h3 className="text-2xl font-bold text-[#1A3D7C] mb-6 pb-3 border-b-2 border-gray-200">
              Solution:
            </h3>

            {result ? (
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <p className="font-semibold mb-2">Step 1: Sort the Data</p>
                  <p className="text-base">
                    n = {result.n} values
                  </p>
                  <p className="text-base mt-2">
                    Sorted: {result.sortedData.join(', ')}
                  </p>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <p className="font-semibold mb-2">Step 2: Find Q₂ (Median)</p>
                  <p className="text-base">
                    Q<sub>2</sub> is the middle value of the dataset
                  </p>
                  <p className="text-base mt-2 font-semibold">
                    Q<sub>2</sub> = {result.q2}
                  </p>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                  <p className="font-semibold mb-2">Step 3: Find Q₁ (Lower Quartile)</p>
                  <p className="text-base">
                    Q<sub>1</sub> is the median of the lower half
                  </p>
                  <p className="text-base mt-2 font-semibold">
                    Q<sub>1</sub> = {result.q1}
                  </p>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
                  <p className="font-semibold mb-2">Step 4: Find Q₃ (Upper Quartile)</p>
                  <p className="text-base">
                    Q<sub>3</sub> is the median of the upper half
                  </p>
                  <p className="text-base mt-2 font-semibold">
                    Q<sub>3</sub> = {result.q3}
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <p className="font-semibold mb-2">Step 5: Calculate IQR</p>
                  <p className="text-base">
                    IQR = Q<sub>3</sub> − Q<sub>1</sub>
                  </p>
                  <p className="text-base mt-2">
                    IQR = {result.q3} − {result.q1} = {result.iqr}
                  </p>
                </div>

                <div className="bg-gray-50 border-l-4 border-gray-500 p-4">
                  <p className="font-semibold mb-2">Five Number Summary</p>
                  <p className="text-base">
                    Min: {result.min} | Q₁: {result.q1} | Q₂: {result.q2} | Q₃: {result.q3} | Max: {result.max}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <p className="text-lg">Enter a dataset and click Calculate to see quartile analysis</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">What are Quartiles?</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p className="text-lg leading-relaxed">
              Quartiles are values that divide a sorted dataset into four equal parts. They are useful in statistics for understanding the spread and distribution of data. The three quartiles (Q₁, Q₂, Q₃) along with the minimum and maximum form the five-number summary, which is essential for creating box plots and analyzing data dispersion.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
              <p className="text-lg font-semibold mb-2">Quartile Definitions:</p>
              <ul className="space-y-2 text-base">
                <li><strong>Q₁ (First Quartile):</strong> The median of the lower half of the dataset (25th percentile)</li>
                <li><strong>Q₂ (Second Quartile):</strong> The median of the entire dataset (50th percentile)</li>
                <li><strong>Q₃ (Third Quartile):</strong> The median of the upper half of the dataset (75th percentile)</li>
                <li><strong>IQR (Interquartile Range):</strong> Q₃ − Q₁, measures the spread of the middle 50% of data</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Quartile Formulas</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-gray-300">
              <thead>
                <tr className="bg-gradient-to-r from-red-800 to-red-900 text-white">
                  <th className="border-2 border-gray-300 p-4">Statistic</th>
                  <th className="border-2 border-gray-300 p-4">Formula</th>
                  <th className="border-2 border-gray-300 p-4">Description</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 p-3 font-semibold">Q₁</td>
                  <td className="border-2 border-gray-300 p-3">Median of lower half</td>
                  <td className="border-2 border-gray-300 p-3">First Quartile (25th percentile)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 p-3 font-semibold">Q₂</td>
                  <td className="border-2 border-gray-300 p-3">Median of dataset</td>
                  <td className="border-2 border-gray-300 p-3">Second Quartile (50th percentile)</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 p-3 font-semibold">Q₃</td>
                  <td className="border-2 border-gray-300 p-3">Median of upper half</td>
                  <td className="border-2 border-gray-300 p-3">Third Quartile (75th percentile)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 p-3 font-semibold">IQR</td>
                  <td className="border-2 border-gray-300 p-3">Q₃ − Q₁</td>
                  <td className="border-2 border-gray-300 p-3">Interquartile Range</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 p-3 font-semibold">Range</td>
                  <td className="border-2 border-gray-300 p-3">Max − Min</td>
                  <td className="border-2 border-gray-300 p-3">Total data spread</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">How to Calculate Quartiles</h2>
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-3">Step-by-Step Method</h3>
              <ol className="space-y-3 text-base list-decimal list-inside">
                <li><strong>Sort the Data:</strong> Arrange all values in ascending order</li>
                <li><strong>Find Q₂:</strong> Calculate the median (middle value) of the entire dataset</li>
                <li><strong>Find Q₁:</strong> Calculate the median of the lower half (below Q₂)</li>
                <li><strong>Find Q₃:</strong> Calculate the median of the upper half (above Q₂)</li>
                <li><strong>Calculate IQR:</strong> Subtract Q₁ from Q₃ (IQR = Q₃ − Q₁)</li>
              </ol>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-3">Example Calculation</h3>
              <p className="text-base mb-2">
                <strong>Dataset:</strong> 15, 16, 17, 17, 17, 18, 19 (already sorted)
              </p>
              <p className="text-base mb-2">
                <strong>Q₂ (Median):</strong> 17 (middle value)
              </p>
              <p className="text-base mb-2">
                <strong>Lower half:</strong> 15, 16, 17 → Q₁ = 16
              </p>
              <p className="text-base mb-2">
                <strong>Upper half:</strong> 17, 18, 19 → Q₃ = 18
              </p>
              <p className="text-base font-bold">
                <strong>IQR:</strong> 18 − 16 = 2
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Understanding the Interquartile Range (IQR)</h2>
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-gray-700">
              The Interquartile Range (IQR) is a measure of statistical dispersion that represents the range of the middle 50% of your data. It's calculated as IQR = Q₃ − Q₁ and is particularly useful because it's resistant to outliers, unlike the standard range.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-200">
                <h3 className="text-xl font-bold text-purple-800 mb-3">Uses of IQR</h3>
                <ul className="space-y-2 text-base">
                  <li>• Detecting outliers in datasets</li>
                  <li>• Creating box plots</li>
                  <li>• Measuring data variability</li>
                  <li>• Comparing spread across datasets</li>
                  <li>• Robust against extreme values</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border-2 border-orange-200">
                <h3 className="text-xl font-bold text-orange-800 mb-3">Outlier Detection</h3>
                <ul className="space-y-2 text-base">
                  <li>• Lower fence: Q₁ − 1.5 × IQR</li>
                  <li>• Upper fence: Q₃ + 1.5 × IQR</li>
                  <li>• Values below lower fence = outliers</li>
                  <li>• Values above upper fence = outliers</li>
                  <li>• IQR method is widely used</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Quartiles and Box Plots</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p className="text-lg leading-relaxed">
              Quartiles form the foundation of box plots (box-and-whisker plots), a powerful visualization tool in statistics. A box plot displays the five-number summary: minimum, Q₁, Q₂ (median), Q₃, and maximum. The "box" represents the IQR (middle 50% of data), while the "whiskers" extend to the minimum and maximum values.
            </p>
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 my-6">
              <p className="text-lg font-semibold mb-2">Five-Number Summary:</p>
              <p className="text-base">
                Minimum | Q₁ | Q₂ (Median) | Q₃ | Maximum
              </p>
              <p className="text-base mt-2">
                This summary provides a complete picture of data distribution, showing center, spread, and symmetry at a glance.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">What is the difference between quartiles and percentiles?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Quartiles are special cases of percentiles that divide data into four equal parts. Q₁ is the 25th percentile, Q₂ is the 50th percentile (median), and Q₃ is the 75th percentile. While percentiles can be any value from 1 to 99, quartiles specifically refer to the 25%, 50%, and 75% marks.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Why is the IQR useful?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                The IQR is useful because it measures the spread of the middle 50% of your data and is not affected by extreme outliers. Unlike the range (which uses the minimum and maximum), the IQR provides a more stable measure of variability, making it ideal for comparing datasets and identifying unusual observations.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">How do you handle even vs. odd number of data points?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                For odd-numbered datasets, the median (Q₂) is the middle value. For even-numbered datasets, the median is the average of the two middle values. When finding Q₁ and Q₃, different methods exist: some exclude Q₂ from both halves, others include it in both. Our calculator uses the exclusive method, which is commonly taught in statistics courses.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Can quartiles be used with small datasets?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                While quartiles can technically be calculated for any dataset with at least 4 values, they are most meaningful with larger datasets (n ≥ 20). With very small datasets, quartiles may not provide as much insight into data distribution, and other statistical measures might be more appropriate.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">What does it mean if Q₁ = Q₂ or Q₂ = Q₃?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                If Q₁ = Q₂, it means that at least 50% of your data values are the same (at or above Q₁). Similarly, if Q₂ = Q₃, at least 50% of values are at or below Q₃. This often indicates a skewed distribution or many repeated values in your dataset.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-xl shadow-2xl p-8 md:p-12 text-center text-white mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help with Statistics?</h2>
          <p className="text-xl mb-6 text-gray-100">
            Our expert tutors can help you master quartiles, data analysis, and all statistics concepts
          </p>
          <Link
            href="/book-demo-class"
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
