'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

export default function PercentileCalculator() {
  const [dataSet, setDataSet] = useState<string>('15, 20, 35, 40, 50');
  const [percentileInput, setPercentileInput] = useState<string>('');
  const [displayEvery, setDisplayEvery] = useState<boolean>(false);
  const [nthPercentile, setNthPercentile] = useState<string>('5');
  const [result, setResult] = useState<{
    sortedData: number[];
    n: number;
    percentiles: { percentile: number; value: number; position: number }[];
  } | null>(null);

  const calculatePercentile = (data: number[], p: number) => {
    const sorted = [...data].sort((a, b) => a - b);
    const n = sorted.length;

    // Using the inclusive method: position = (p / 100) * (n + 1)
    const position = (p / 100) * (n + 1);

    if (position <= 1) {
      return { value: sorted[0], position };
    }
    if (position >= n) {
      return { value: sorted[n - 1], position };
    }

    const lower = Math.floor(position) - 1;
    const upper = Math.ceil(position) - 1;
    const fraction = position - Math.floor(position);

    const value = sorted[lower] + fraction * (sorted[upper] - sorted[lower]);

    return { value, position };
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

    if (numbers.length < 2) {
      alert('Please enter at least 2 numbers to calculate percentiles.');
      return;
    }

    const sorted = [...numbers].sort((a, b) => a - b);
    const percentiles: { percentile: number; value: number; position: number }[] = [];

    if (displayEvery) {
      // Display every nth percentile
      const step = parseInt(nthPercentile);
      for (let p = step; p < 100; p += step) {
        const result = calculatePercentile(numbers, p);
        percentiles.push({
          percentile: p,
          value: result.value,
          position: result.position,
        });
      }
    } else {
      // Display single percentile
      const p = parseFloat(percentileInput);
      if (isNaN(p) || p <= 0 || p >= 100) {
        alert('Please enter a percentile value between 1 and 99.');
        return;
      }
      const result = calculatePercentile(numbers, p);
      percentiles.push({
        percentile: p,
        value: result.value,
        position: result.position,
      });
    }

    setResult({
      sortedData: sorted,
      n: numbers.length,
      percentiles,
    });
  };

  const handleClear = () => {
    setDataSet('15, 20, 35, 40, 50');
    setPercentileInput('');
    setDisplayEvery(false);
    setNthPercentile('5');
    setResult(null);
  };

  const getOrdinalSuffix = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the difference between percentile and percentage?","acceptedAnswer":{"@type":"Answer","text":"A percentage represents a proportion out of 100, while a percentile indicates the position in a distribution. For example, scoring 80% on a test means you got 80 out of 100 points, but being in the 80th percentile means you scored better than 80% of test-takers."}},{"@type":"Question","name":"Is the 50th percentile the same as the median?","acceptedAnswer":{"@type":"Answer","text":"Yes, the 50th percentile (P₅₀) is exactly the same as the median. It represents the middle value of a dataset where 50% of values fall below and 50% fall above. The median is also known as the second quartile (Q₂)."}},{"@type":"Question","name":"Why can\'t we calculate the 0th or 100th percentile?","acceptedAnswer":{"@type":"Answer","text":"The 0th percentile would mean that 0% of data falls below that value (which would be less than the minimum), and the 100th percentile would mean 100% of data falls below it (which would be greater than the maximum). These aren\'t meaningful measures. Instead, we use the actual minimum and maximum values of the dataset."}},{"@type":"Question","name":"What does it mean to be in the 95th percentile?","acceptedAnswer":{"@type":"Answer","text":"Being in the 95th percentile means you scored better than 95% of the population. Only 5% scored higher than you. This is considered a very high ranking and is often used to identify exceptional performance or outliers in positive contexts."}},{"@type":"Question","name":"How do you interpolate when the position is not a whole number?","acceptedAnswer":{"@type":"Answer","text":"When the calculated position falls between two data points (e.g., position 3.5), we interpolate by taking a weighted average. For position 3.5, we\'d use 50% of the 3rd value and 50% of the 4th value. The formula is: value = lower_value + (fraction × (upper_value − lower_value))."}}]}' }}
      />
      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-8 mt-20 mb-12 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A3D7C] mb-4">
            Percentile Calculator
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Calculate any percentile (1st-99th) from your dataset with step-by-step solutions. Display single or multiple percentiles for comprehensive statistical analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 border-t-4 border-red-700">
            <div className="bg-gradient-to-r from-red-700 to-red-800 text-white text-center py-3 rounded-lg mb-6">
              <h2 className="text-xl md:text-2xl font-bold">Percentile Calculator</h2>
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
                placeholder="Enter numbers separated by commas (e.g., 15, 20, 35, 40, 50)"
              />
              <p className="text-sm text-gray-600 mt-2">
                Separate values with commas
              </p>
            </div>

            <div className="mb-6">
              <label className="text-base font-semibold text-gray-700 mb-2 block">
                Find Percentile:
              </label>
              <Input
                type="number"
                step="0.1"
                min="1"
                max="99"
                value={percentileInput}
                onChange={(e) => setPercentileInput(e.target.value)}
                disabled={displayEvery}
                className="text-xl p-4 border-2 border-gray-300 focus:border-red-500 text-center font-semibold"
                placeholder="Enter percentile (1-99)"
              />
            </div>

            <div className="mb-6 flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <Checkbox
                id="displayEvery"
                checked={displayEvery}
                onCheckedChange={(checked) => setDisplayEvery(checked as boolean)}
                className="w-5 h-5"
              />
              <label htmlFor="displayEvery" className="text-base text-gray-700 italic flex items-center gap-2">
                <span>display every</span>
                <Select value={nthPercentile} onValueChange={setNthPercentile} disabled={!displayEvery}>
                  <SelectTrigger className="w-24 border-2 border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st</SelectItem>
                    <SelectItem value="2">2nd</SelectItem>
                    <SelectItem value="5">5th</SelectItem>
                    <SelectItem value="10">10th</SelectItem>
                    <SelectItem value="20">20th</SelectItem>
                    <SelectItem value="25">25th</SelectItem>
                  </SelectContent>
                </Select>
                <span>percentile</span>
              </label>
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
                className="py-6 text-lg font-semibold bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900"
              >
                Calculate
              </Button>
            </div>

            {result && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Answer:</h3>
                <div className="space-y-3">
                  {result.percentiles.length === 1 ? (
                    <div>
                      <p className="text-lg font-semibold text-gray-800 mb-3">
                        The {getOrdinalSuffix(result.percentiles[0].percentile)} percentile:
                      </p>
                      <div className="bg-white border-2 border-gray-300 rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold text-blue-600">
                          P<sub>{result.percentiles[0].percentile}</sub> = {result.percentiles[0].value.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-lg font-semibold text-gray-800 mb-3">
                        Every {getOrdinalSuffix(parseInt(nthPercentile))} percentile:
                      </p>
                      <div className="bg-white border-2 border-gray-300 rounded-lg p-4 max-h-96 overflow-y-auto">
                        <div className="space-y-2">
                          {result.percentiles.map((p, index) => (
                            <div key={index} className="flex justify-between items-center border-b border-gray-200 pb-2">
                              <span className="text-base font-semibold">
                                P<sub>{p.percentile}</sub>
                              </span>
                              <span className="text-base font-bold text-blue-600">
                                {p.value.toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
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

                {result.percentiles.map((p, index) => (
                  <div key={index} className="bg-green-50 border-l-4 border-green-500 p-4">
                    <p className="font-semibold mb-2">
                      Step {index + 2}: Calculate {getOrdinalSuffix(p.percentile)} Percentile (P<sub>{p.percentile}</sub>)
                    </p>
                    <p className="text-base mb-2">
                      Position = (p / 100) × (n + 1)
                    </p>
                    <p className="text-base mb-2">
                      Position = ({p.percentile} / 100) × ({result.n} + 1) = {p.position.toFixed(2)}
                    </p>
                    <p className="text-base mt-3 font-semibold">
                      P<sub>{p.percentile}</sub> = {p.value.toFixed(2)}
                    </p>
                    {p.position % 1 !== 0 && (
                      <p className="text-sm mt-2 text-gray-600">
                        Value interpolated between positions {Math.floor(p.position)} and {Math.ceil(p.position)}
                      </p>
                    )}
                  </div>
                ))}

                <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                  <p className="font-semibold mb-2">Interpretation:</p>
                  {result.percentiles.length === 1 ? (
                    <p className="text-base">
                      {result.percentiles[0].percentile}% of the data values are less than or equal to {result.percentiles[0].value.toFixed(2)}.
                    </p>
                  ) : (
                    <p className="text-base">
                      The table shows the distribution of your data across multiple percentiles, helping you understand how values are spread throughout the dataset.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <p className="text-lg">Enter a dataset and click Calculate to see percentile analysis</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">What is a Percentile?</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p className="text-lg leading-relaxed">
              A percentile is a statistical measure that indicates the value below which a given percentage of observations in a dataset fall. For example, the 75th percentile (P₇₅) is the value below which 75% of the data falls. Percentiles are widely used in statistics, standardized testing, growth charts, and data analysis to understand the relative standing of a value within a dataset.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
              <p className="text-lg font-semibold mb-2">Percentile Formula:</p>
              <p className="text-base mb-2">Position = (p / 100) × (n + 1)</p>
              <p className="text-base">
                Where p = desired percentile (1-99) and n = number of data points
              </p>
              <p className="text-sm mt-3 text-gray-600">
                If the position is not a whole number, interpolate between the two nearest values.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Common Percentiles and Their Meanings</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-gray-300">
              <thead>
                <tr className="bg-gradient-to-r from-red-700 to-red-800 text-white">
                  <th className="border-2 border-gray-300 p-4">Percentile</th>
                  <th className="border-2 border-gray-300 p-4">Notation</th>
                  <th className="border-2 border-gray-300 p-4">Meaning</th>
                  <th className="border-2 border-gray-300 p-4">Also Known As</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 p-3 font-semibold text-center">25th</td>
                  <td className="border-2 border-gray-300 p-3 text-center">P₂₅</td>
                  <td className="border-2 border-gray-300 p-3">25% of data below this value</td>
                  <td className="border-2 border-gray-300 p-3">First Quartile (Q₁)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 p-3 font-semibold text-center">50th</td>
                  <td className="border-2 border-gray-300 p-3 text-center">P₅₀</td>
                  <td className="border-2 border-gray-300 p-3">50% of data below this value</td>
                  <td className="border-2 border-gray-300 p-3">Median (Q₂)</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 p-3 font-semibold text-center">75th</td>
                  <td className="border-2 border-gray-300 p-3 text-center">P₇₅</td>
                  <td className="border-2 border-gray-300 p-3">75% of data below this value</td>
                  <td className="border-2 border-gray-300 p-3">Third Quartile (Q₃)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 p-3 font-semibold text-center">90th</td>
                  <td className="border-2 border-gray-300 p-3 text-center">P₉₀</td>
                  <td className="border-2 border-gray-300 p-3">90% of data below this value</td>
                  <td className="border-2 border-gray-300 p-3">Top 10%</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 p-3 font-semibold text-center">95th</td>
                  <td className="border-2 border-gray-300 p-3 text-center">P₉₅</td>
                  <td className="border-2 border-gray-300 p-3">95% of data below this value</td>
                  <td className="border-2 border-gray-300 p-3">Top 5%</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 p-3 font-semibold text-center">99th</td>
                  <td className="border-2 border-gray-300 p-3 text-center">P₉₉</td>
                  <td className="border-2 border-gray-300 p-3">99% of data below this value</td>
                  <td className="border-2 border-gray-300 p-3">Top 1%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">How to Calculate Percentiles</h2>
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-3">Step-by-Step Method</h3>
              <ol className="space-y-3 text-base list-decimal list-inside">
                <li><strong>Sort the Data:</strong> Arrange all values in ascending order from smallest to largest</li>
                <li><strong>Calculate Position:</strong> Use the formula: Position = (p / 100) × (n + 1)</li>
                <li><strong>Find the Value:</strong>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>If position is a whole number, use the value at that position</li>
                    <li>If position is fractional, interpolate between the two nearest values</li>
                  </ul>
                </li>
                <li><strong>Interpret:</strong> The result tells you the value below which p% of the data falls</li>
              </ol>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-3">Example Calculation</h3>
              <p className="text-base mb-2">
                <strong>Dataset:</strong> 15, 20, 35, 40, 50 (already sorted, n = 5)
              </p>
              <p className="text-base mb-2">
                <strong>Find P₅₀ (50th percentile):</strong>
              </p>
              <p className="text-base mb-2">
                Position = (50 / 100) × (5 + 1) = 0.5 × 6 = 3
              </p>
              <p className="text-base mb-2">
                The 3rd value in the sorted list is 35
              </p>
              <p className="text-base font-bold">
                P₅₀ = 35 (This is also the median)
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Percentiles vs Quartiles vs Deciles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-200">
              <h3 className="text-xl font-bold text-purple-800 mb-3">Percentiles</h3>
              <ul className="space-y-2 text-base">
                <li>• Divide data into 100 parts</li>
                <li>• P₁, P₂, ..., P₉₉</li>
                <li>• Most granular measure</li>
                <li>• Used in standardized tests</li>
                <li>• Best for large datasets</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border-2 border-orange-200">
              <h3 className="text-xl font-bold text-orange-800 mb-3">Quartiles</h3>
              <ul className="space-y-2 text-base">
                <li>• Divide data into 4 parts</li>
                <li>• Q₁ (25th), Q₂ (50th), Q₃ (75th)</li>
                <li>• Special case of percentiles</li>
                <li>• Used in box plots</li>
                <li>• IQR = Q₃ − Q₁</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-lg border-2 border-teal-200">
              <h3 className="text-xl font-bold text-teal-800 mb-3">Deciles</h3>
              <ul className="space-y-2 text-base">
                <li>• Divide data into 10 parts</li>
                <li>• D₁, D₂, ..., D₉</li>
                <li>• D₁ = P₁₀, D₂ = P₂₀, etc.</li>
                <li>• Used in economics</li>
                <li>• Medium granularity</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Applications of Percentiles</h2>
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-gray-700">
              Percentiles are used extensively across many fields to understand data distribution and relative standing:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 mb-3">Education & Testing</h3>
                <ul className="space-y-2 text-base">
                  <li>• SAT, GRE, GMAT score interpretation</li>
                  <li>• Student performance ranking</li>
                  <li>• Grade distribution analysis</li>
                  <li>• Benchmark comparisons</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-3">Healthcare</h3>
                <ul className="space-y-2 text-base">
                  <li>• Growth charts for children</li>
                  <li>• Blood pressure ranges</li>
                  <li>• BMI percentiles by age</li>
                  <li>• Clinical test results</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg border-2 border-yellow-200">
                <h3 className="text-xl font-bold text-yellow-800 mb-3">Business & Finance</h3>
                <ul className="space-y-2 text-base">
                  <li>• Income distribution</li>
                  <li>• Sales performance metrics</li>
                  <li>• Risk assessment (VaR)</li>
                  <li>• Market analysis</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border-2 border-red-200">
                <h3 className="text-xl font-bold text-red-800 mb-3">Data Science</h3>
                <ul className="space-y-2 text-base">
                  <li>• Outlier detection</li>
                  <li>• Data distribution analysis</li>
                  <li>• Feature engineering</li>
                  <li>• Model evaluation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">What is the difference between percentile and percentage?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                A percentage represents a proportion out of 100, while a percentile indicates the position in a distribution. For example, scoring 80% on a test means you got 80 out of 100 points, but being in the 80th percentile means you scored better than 80% of test-takers.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Is the 50th percentile the same as the median?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Yes, the 50th percentile (P₅₀) is exactly the same as the median. It represents the middle value of a dataset where 50% of values fall below and 50% fall above. The median is also known as the second quartile (Q₂).
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Why can't we calculate the 0th or 100th percentile?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                The 0th percentile would mean that 0% of data falls below that value (which would be less than the minimum), and the 100th percentile would mean 100% of data falls below it (which would be greater than the maximum). These aren't meaningful measures. Instead, we use the actual minimum and maximum values of the dataset.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">What does it mean to be in the 95th percentile?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Being in the 95th percentile means you scored better than 95% of the population. Only 5% scored higher than you. This is considered a very high ranking and is often used to identify exceptional performance or outliers in positive contexts.
              </p>
            </div>

            <div className="border-l-4 border-[#2BAE66] pl-6 py-3">
              <h3 className="text-xl font-bold text-gray-800 mb-3">How do you interpolate when the position is not a whole number?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                When the calculated position falls between two data points (e.g., position 3.5), we interpolate by taking a weighted average. For position 3.5, we'd use 50% of the 3rd value and 50% of the 4th value. The formula is: value = lower_value + (fraction × (upper_value − lower_value)).
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] rounded-xl shadow-2xl p-8 md:p-12 text-center text-white mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help with Statistics?</h2>
          <p className="text-xl mb-6 text-gray-100">
            Our expert tutors can help you master percentiles, data analysis, and all statistics concepts
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
